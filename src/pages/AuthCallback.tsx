import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKidAuth, storeSession, KIDUser } from "../lib/kidAuth";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const handle = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        setError("No authorization code received.");
        return;
      }

      try {
        const auth = getKidAuth();
        const pkce = await auth.getStoredPkce();

        // Call our server-side proxy — client_secret stays on the server
        const res = await fetch("/api/auth/exchange", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            code_verifier: pkce?.codeVerifier,
            redirect_uri: import.meta.env.VITE_KID_REDIRECT_URI ?? `${window.location.origin}/auth/callback`,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error_description ?? err.error ?? "Exchange failed");
        }

        const data = await res.json();
        const user = data.user as KIDUser;

        storeSession(data.access_token, data.refresh_token, user);

        await auth.clearStoredPkce();
        await auth.clearStoredState();

        refreshUser();
        navigate("/dashboard", { replace: true });
      } catch (err: any) {
        console.error("KID callback error:", err);
        setError(err.message ?? "Sign-in failed. Please try again.");
      }
    };

    handle();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm font-sans text-destructive">{error}</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="text-sm font-sans text-primary hover:underline"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-7 h-7 border-2 border-border border-t-primary rounded-full animate-spin" />
        <p className="text-sm font-sans text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}
