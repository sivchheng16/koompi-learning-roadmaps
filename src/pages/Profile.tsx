import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { courseApi } from "../lib/courseApi";
import type { UserCredits } from "../types/course";
import { Coins, BookOpen, Plus, Mail, Wallet, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);

  const [showRequest, setShowRequest] = useState(false);
  const [reason, setReason] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!user) return;
    courseApi.getCredits()
      .then(setCredits)
      .finally(() => setLoadingCredits(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground text-sm">Sign in to view your profile.</p>
        <button
          onClick={login}
          className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
        >
          Sign In
        </button>
      </div>
    );
  }

  const coursesLeft = credits ? Math.floor(credits.credits_remaining / 10) : 0;
  const creditPct = credits ? Math.min((credits.credits_remaining / 30) * 100, 100) : 0;

  const handleRequestCredits = async () => {
    if (!reason.trim()) return;
    setRequesting(true);
    try {
      await courseApi.requestCredits(reason.trim());
      setRequested(true);
      setReason("");
      setShowRequest(false);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">Profile</p>
          <h1 className="text-4xl font-serif font-normal text-foreground tracking-tight">Your account.</h1>
        </motion.div>

        {/* Identity card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-border bg-white p-6 flex items-start gap-5"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold shrink-0">
            {user.avatar
              ? <img src={user.avatar} alt={user.fullname} className="w-full h-full rounded-full object-cover" />
              : user.fullname?.[0] ?? "?"}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground">{user.fullname}</h2>
            {user.email && (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <Mail size={13} />
                {user.email}
              </p>
            )}
            {user.wallet_address && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono mt-1.5 truncate">
                <Wallet size={12} />
                {user.wallet_address.slice(0, 8)}…{user.wallet_address.slice(-6)}
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <a
                href="https://dash.koompi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                Edit profile on KOOMPI ID <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Credit wallet */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-white p-6 space-y-5"
        >
          <div className="flex items-center gap-2">
            <Coins size={18} className="text-primary" />
            <h3 className="text-base font-semibold text-foreground">Credit Wallet</h3>
          </div>

          {loadingCredits ? (
            <div className="h-16 flex items-center">
              <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
            </div>
          ) : credits ? (
            <>
              {/* Balance */}
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold text-foreground tabular-nums">
                  {credits.credits_remaining}
                </span>
                <div className="pb-1.5 text-sm text-muted-foreground">
                  <span>credits remaining</span>
                  <br />
                  <span className="text-foreground font-medium">{coursesLeft} {coursesLeft === 1 ? "course" : "courses"}</span> left to create
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${creditPct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{credits.credits_used} used</span>
                  <span>30 total (free tier)</span>
                </div>
              </div>

              {/* Usage breakdown */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {[
                  { label: "Free credits", value: "30", sub: "on signup" },
                  { label: "Used", value: String(credits.credits_used), sub: `${credits.credits_used / 10} courses` },
                  { label: "Remaining", value: String(credits.credits_remaining), sub: `${coursesLeft} courses` },
                ].map(item => (
                  <div key={item.label} className="rounded-xl bg-muted/40 px-4 py-3">
                    <p className="text-xl font-bold text-foreground tabular-nums">{item.value}</p>
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Plus size={14} />
                  Create a course
                </Link>
                <button
                  onClick={() => setShowRequest(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Need more credits?
                </button>
              </div>

              {/* Credit request form */}
              {showRequest && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border bg-muted/30 p-4 space-y-3"
                >
                  <p className="text-sm font-semibold text-foreground">Request more credits</p>
                  <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Tell us why — e.g. I'm a teacher building a curriculum for 30 students…"
                    className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm resize-none h-20 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleRequestCredits}
                      disabled={requesting || !reason.trim()}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
                    >
                      {requesting ? "Sending…" : "Submit request"}
                    </button>
                    <button onClick={() => setShowRequest(false)} className="text-sm text-muted-foreground hover:text-foreground">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {requested && (
                <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                  Request submitted — we'll review it and add credits shortly.
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Could not load credit balance.</p>
          )}
        </motion.div>

        {/* My courses shortcut */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border bg-white p-6 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">My Courses</p>
              <p className="text-xs text-muted-foreground">View and manage courses you've created</p>
            </div>
          </div>
          <Link
            to="/my-courses"
            className="text-sm text-primary hover:underline shrink-0"
          >
            View →
          </Link>
        </motion.div>

        {/* Sign out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pt-2"
        >
          <button
            onClick={() => { logout(); navigate("/dashboard"); }}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Sign out
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
