import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, BookOpen, Award, ExternalLink, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { progressApi } from "../lib/progressApi";
import { TOPICS } from "../constants";
import Footer from "../components/Footer";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

interface CertRecord {
  tokenId: number;
  mintedAt: string;
  verificationUrl: string;
}

function loadCert(trackId: string): CertRecord | null {
  try {
    const raw = localStorage.getItem(`koompi_cert_${trackId}`);
    return raw ? (JSON.parse(raw) as CertRecord) : null;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const { user, login } = useAuth();
  const { progress } = useProgress();
  const navigate = useNavigate();

  // Soft gate — show a prompt if not signed in rather than hard redirect
  const isAnon = !user;

  const lastViewed = progress.lastViewed;
  const lastTopic = lastViewed ? TOPICS.find(t => t.id === lastViewed.topicId) : null;
  const lastLesson = lastTopic?.lessons.find(l => l.id === lastViewed?.lessonId);

  // Certificate claim state: { [trackId]: "idle" | "loading" | "claimed" | "error" }
  const [certState, setCertState] = useState<Record<string, "idle" | "loading" | "claimed" | "error">>({});
  const [certRecords, setCertRecords] = useState<Record<string, CertRecord>>(() => {
    const initial: Record<string, CertRecord> = {};
    TOPICS.forEach(t => {
      const c = loadCert(t.id);
      if (c) initial[t.id] = c;
    });
    return initial;
  });

  const claimCertificate = useCallback(async (trackId: string) => {
    if (!user) { login(); return; }
    if (!user.wallet_address) return;

    setCertState(prev => ({ ...prev, [trackId]: "loading" }));

    try {
      const res = await fetch("/api/certificate/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          trackId,
          walletAddress: user.wallet_address,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if ((err as { error?: string }).error === "certificates_not_configured") {
          setCertState(prev => ({ ...prev, [trackId]: "error" }));
          return;
        }
        setCertState(prev => ({ ...prev, [trackId]: "error" }));
        return;
      }

      const data = (await res.json()) as CertRecord;
      localStorage.setItem(`koompi_cert_${trackId}`, JSON.stringify(data));
      setCertRecords(prev => ({ ...prev, [trackId]: data }));
      setCertState(prev => ({ ...prev, [trackId]: "claimed" }));
    } catch {
      setCertState(prev => ({ ...prev, [trackId]: "error" }));
    }
  }, [user, login]);

  const recentlyCompleted = progressApi.recentlyCompleted(5);
  const totalCompleted = Object.keys(progress.completed).length;
  const totalLessons = TOPICS.reduce((acc, t) => acc + t.lessons.length, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 flex-1 w-full">

        {/* Header */}
        <motion.div {...fadeUp()} className="mb-12">
          {user ? (
            <>
              <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">
                Your Dashboard
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-normal text-foreground tracking-tight">
                Welcome back,{" "}
                <span className="text-primary italic">{user.fullname.split(" ")[0]}.</span>
              </h1>
            </>
          ) : (
            <>
              <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">
                Your Progress
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-normal text-foreground tracking-tight">
                Your learning journey.
              </h1>
              <div className="mt-5 flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15">
                <BookOpen size={16} className="text-primary shrink-0" />
                <p className="text-sm font-sans text-foreground">
                  Sign in to sync your progress across devices.
                </p>
                <button
                  onClick={login}
                  className="ml-auto text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
                >
                  Sign in →
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Lessons completed", value: totalCompleted },
            { label: "Total lessons", value: totalLessons },
            { label: "Courses available", value: TOPICS.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-border p-5">
              <p className="text-3xl font-serif font-normal text-foreground">{stat.value}</p>
              <p className="text-xs font-sans text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Continue where you left off */}
        <motion.div {...fadeUp(0.1)} className="mb-12">
          <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Continue learning
          </h2>
          {lastLesson && lastTopic ? (
            <Link
              to={`/document/${lastTopic.id}/${lastLesson.id}`}
              className="group flex items-center gap-5 bg-white border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center p-2.5 shrink-0 group-hover:bg-primary/8 transition-colors">
                <img src={lastTopic.logo} alt={lastTopic.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-sans text-muted-foreground mb-0.5">{lastTopic.title}</p>
                <p className="font-serif text-lg text-foreground group-hover:text-primary transition-colors truncate">
                  {lastLesson.title}
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-sans text-sm font-medium shrink-0">
                Continue
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ) : (
            <Link
              to="/document/computer-foundation"
              className="group flex items-center gap-5 bg-white border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0 group-hover:bg-primary/8 transition-colors">
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-sans text-muted-foreground mb-0.5">Start here</p>
                <p className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                  Foundation — Linux Terminal
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-sans text-sm font-medium shrink-0">
                Begin
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}
        </motion.div>

        {/* All courses with progress */}
        <motion.div {...fadeUp(0.15)} className="mb-12">
          <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            All courses
          </h2>
          <div className="bg-white rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {TOPICS.map((topic) => {
              const done = progressApi.completedInTopic(topic.id);
              const total = topic.lessons.length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              const isComplete = done === total && total > 0;
              const existingCert = certRecords[topic.id];
              const state = certState[topic.id] ?? "idle";

              return (
                <div key={topic.id} className="flex flex-col">
                  <Link
                    to={`/document/${topic.id}`}
                    className="group flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center p-1.5 shrink-0 group-hover:bg-primary/8 transition-colors">
                      <img src={topic.logo} alt={topic.title} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-sans font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {topic.title}
                        </p>
                        <span className="text-xs font-sans text-muted-foreground shrink-0 ml-3">
                          {done}/{total}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {isComplete ? (
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                    ) : (
                      <ArrowRight size={14} className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>

                  {/* Certificate claim row — only for completed tracks */}
                  {isComplete && (
                    <div className="flex items-center gap-3 px-5 pb-3 pt-0">
                      {existingCert || state === "claimed" ? (
                        <Link
                          to={`/cert/${existingCert?.tokenId ?? certRecords[topic.id]?.tokenId}`}
                          className="flex items-center gap-1.5 text-xs font-sans text-primary hover:text-primary/80 transition-colors"
                        >
                          <Award size={13} />
                          View Certificate
                          <ExternalLink size={11} className="opacity-60" />
                        </Link>
                      ) : (
                        <>
                          {!user ? (
                            <button
                              onClick={login}
                              className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Award size={13} />
                              Sign in to claim certificate
                            </button>
                          ) : !user.wallet_address ? (
                            <span className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
                              <Award size={13} />
                              No wallet address on your KID profile
                            </span>
                          ) : state === "loading" ? (
                            <span className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
                              <Loader2 size={13} className="animate-spin" />
                              Minting certificate…
                            </span>
                          ) : state === "error" ? (
                            <button
                              onClick={() => claimCertificate(topic.id)}
                              className="flex items-center gap-1.5 text-xs font-sans text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Award size={13} />
                              Minting failed — retry
                            </button>
                          ) : (
                            <button
                              onClick={() => claimCertificate(topic.id)}
                              className="flex items-center gap-1.5 text-xs font-sans font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                              <Award size={13} />
                              Claim Certificate
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recently completed */}
        {recentlyCompleted.length > 0 && (
          <motion.div {...fadeUp(0.2)}>
            <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Recently completed
            </h2>
            <div className="flex flex-col gap-2">
              {recentlyCompleted.map((entry) => {
                const topic = TOPICS.find(t => t.id === entry.topicId);
                const lesson = topic?.lessons.find(l => l.id === entry.lessonId);
                if (!topic || !lesson) return null;
                return (
                  <Link
                    key={entry.lessonId}
                    to={`/document/${topic.id}/${lesson.id}`}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span className="text-sm font-sans text-muted-foreground group-hover:text-foreground transition-colors flex-1 truncate">
                      {lesson.title}
                    </span>
                    <span className="text-[11px] font-sans text-muted-foreground shrink-0 hidden sm:block">
                      {topic.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
