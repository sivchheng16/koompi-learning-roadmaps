// Production server: serves the built SPA + handles the KID token exchange proxy.
// The client_secret lives only here — never in the frontend bundle.
//
// Dev: run `node --env-file=.env server.js` on port 3001 alongside `bun dev`.
//       Vite proxies /api/* to this server.
// Prod: runs on PORT (default 3000), serves dist/ + the proxy endpoint.

import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const ai = new OpenAI({
  baseURL: process.env.AI_BASE_URL,
  apiKey:  process.env.AI_API_KEY,
});
const AI_MODEL = process.env.AI_MODEL ?? "moonshot-v1-32k";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT ?? (isDev ? 3001 : 3000);

const CLIENT_ID = process.env.KID_CLIENT_ID;
const CLIENT_SECRET = process.env.KID_CLIENT_SECRET;
const KID_TOKEN_URL = "https://oauth.koompi.org/v1/oauth/token";
const KID_USERINFO_URL = "https://oauth.koompi.org/v1/oauth/userinfo";

// ── Supabase client ──────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
);

const app = express();
app.use(express.json());

// ── Auth middleware ───────────────────────────────────────────────────────────
function extractUserId(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "missing_token" });
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    req.userId = payload.sub || payload._id || payload.id;
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}

// ── Token exchange proxy ─────────────────────────────────────────────────────
app.post("/api/auth/exchange", async (req, res) => {
  const { code, code_verifier, redirect_uri } = req.body;

  if (!code) return res.status(400).json({ error: "missing_code" });
  if (!CLIENT_SECRET) return res.status(500).json({ error: "server_misconfigured" });

  try {
    const tokenRes = await fetch(KID_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri,
        code_verifier,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) return res.status(tokenRes.status).json(tokenData);

    const userRes = await fetch(KID_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userRes.json();

    res.json({ ...tokenData, user: userData.user ?? null });
  } catch (err) {
    console.error("KID exchange error:", err);
    res.status(502).json({ error: "upstream_error" });
  }
});

// ── Progress API ─────────────────────────────────────────────────────────────

// GET /api/progress/:userId
app.get("/api/progress/:userId", extractUserId, async (req, res) => {
  const { userId } = req.params;

  try {
    const [{ data: records, error: err1 }, { data: lastViewed, error: err2 }] = await Promise.all([
      supabase.from("lesson_progress").select("*").eq("user_id", userId),
      supabase.from("last_viewed").select("*").eq("user_id", userId).maybeSingle(),
    ]);

    if (err1) throw err1;
    if (err2) throw err2;

    const completed = {};
    for (const r of records ?? []) {
      completed[r.lesson_id] = r;
    }

    res.json({ completed, lastViewed: lastViewed ?? null });
  } catch (err) {
    console.error("GET /api/progress error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

// POST /api/progress/complete
app.post("/api/progress/complete", extractUserId, async (req, res) => {
  const { lessonId, topicId, challengePassed } = req.body;
  if (!lessonId || !topicId) return res.status(400).json({ error: "missing_fields" });

  const userId = req.userId;

  try {
    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          topic_id: topicId,
          challenge_passed: challengePassed ?? false,
          completed_at: existing?.completed_at ?? now,
          attempts: (existing?.attempts ?? 0) + 1,
          updated_at: now,
        },
        { onConflict: "user_id,lesson_id" }
      )
      .select()
      .single();

    if (error) throw error;
    res.json({ ok: true, progress: data });
  } catch (err) {
    console.error("POST /api/progress/complete error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

// POST /api/progress/viewed
app.post("/api/progress/viewed", extractUserId, async (req, res) => {
  const { lessonId, topicId } = req.body;
  if (!lessonId || !topicId) return res.status(400).json({ error: "missing_fields" });

  const userId = req.userId;

  try {
    const { data, error } = await supabase
      .from("last_viewed")
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          topic_id: topicId,
          viewed_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error) throw error;
    res.json({ ok: true, lastViewed: data });
  } catch (err) {
    console.error("POST /api/progress/viewed error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

// ── Certificate minting ───────────────────────────────────────────────────────
const TRACK_TOKEN_IDS = {
  "computer-foundation": 1,
  "html": 2,
  "css": 3,
  "javascript": 4,
  "javascript-advanced": 5,
  "git": 6,
  "react": 7,
  "nextjs": 8,
};

const KID_MINT_URL = "https://oauth.koompi.org/v2/erc1155/mint";

app.post("/api/certificate/issue", async (req, res) => {
  const { userId, trackId, walletAddress } = req.body;

  const KID_API_KEY = process.env.KID_API_KEY;
  if (!KID_API_KEY) return res.status(503).json({ error: "certificates_not_configured" });
  if (!userId || !trackId || !walletAddress) return res.status(400).json({ error: "missing_fields" });

  const tokenId = TRACK_TOKEN_IDS[trackId];
  if (tokenId === undefined) return res.status(400).json({ error: "unknown_track", trackId });

  try {
    const mintRes = await fetch(KID_MINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": KID_API_KEY },
      body: JSON.stringify({ to_address: walletAddress, token_id: tokenId, amount: 1 }),
    });

    if (!mintRes.ok) {
      const err = await mintRes.json().catch(() => ({}));
      return res.status(mintRes.status).json({ error: "mint_failed", detail: err });
    }

    const mintedAt = new Date().toISOString();
    res.json({ tokenId, trackId, mintedAt, verificationUrl: `/cert/${tokenId}` });
  } catch (err) {
    console.error("Certificate mint error:", err);
    res.status(502).json({ error: "upstream_error" });
  }
});

// ── Course credits ────────────────────────────────────────────────────────────
app.get("/api/courses/credits", extractUserId, async (req, res) => {
  const userId = req.userId;
  try {
    // Try insert with default 30 credits (no-op if row exists)
    await supabase
      .from("user_credits")
      .upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true });

    const { data, error } = await supabase
      .from("user_credits")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("GET /api/courses/credits error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

app.post("/api/credits/request", extractUserId, async (req, res) => {
  const { reason, amount_requested = 10 } = req.body;
  if (!reason?.trim()) return res.status(400).json({ error: "reason_required" });

  const userId = req.userId;
  try {
    const { data, error } = await supabase
      .from("credit_requests")
      .insert({ user_id: userId, reason: reason.trim(), amount_requested })
      .select()
      .single();
    if (error) throw error;
    res.json({ ok: true, request: data });
  } catch (err) {
    console.error("POST /api/credits/request error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

// ── Static SPA (production only) ─────────────────────────────────────────────
if (!isDev) {
  const dist = path.join(__dirname, "dist");
  app.use(express.static(dist, { maxAge: "30d" }));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${isDev ? "dev proxy" : "production"}]`);
  console.log(`Supabase: ${process.env.SUPABASE_URL ?? "NOT SET"}`);
});
