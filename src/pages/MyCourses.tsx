import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { courseApi } from "../lib/courseApi";
import { useAuth } from "../context/AuthContext";
import type { Course, UserCredits } from "../types/course";
import { cn } from "@/lib/utils";
import { Trash2, Globe, Lock, Plus, Loader2 } from "lucide-react";
import Footer from "../components/Footer";
import ConfirmModal from "../components/ConfirmModal";

type CourseWithCount = Course & { module_count: number };

export default function MyCourses() {
  const { user, login } = useAuth();
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  const [showRequest, setShowRequest] = useState(false);
  const [reason, setReason] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([courseApi.getMyCourses(), courseApi.getCredits()])
      .then(([{ courses }, creds]) => {
        setCourses(courses);
        setCredits(creds);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async () => {
    if (!confirmSlug) return;
    setDeletingSlug(confirmSlug);
    try {
      await courseApi.deleteCourse(confirmSlug);
      setCourses(prev => prev.filter(c => c.slug !== confirmSlug));
      setConfirmSlug(null);
    } finally {
      setDeletingSlug(null);
    }
  };

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground text-sm">Sign in to view your courses.</p>
        <button onClick={login} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
          Sign In
        </button>
      </div>
    );
  }

  const coursesLeft = credits ? Math.floor(credits.credits_remaining / 10) : 0;
  const canCreate = credits ? credits.credits_remaining >= 10 : false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">My Courses</p>
            <h1 className="text-4xl font-serif font-normal text-foreground">Your created courses.</h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            {credits && (
              <p className="text-sm text-muted-foreground font-sans">
                <span className="font-semibold text-foreground">{credits.credits_remaining}</span> credits ·{" "}
                <span className="font-semibold text-foreground">{coursesLeft}</span> {coursesLeft === 1 ? "course" : "courses"} left
              </p>
            )}
            {canCreate ? (
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus size={14} /> Create course
              </Link>
            ) : (
              <button onClick={() => setShowRequest(true)} className="text-sm font-sans text-primary hover:underline">
                Request more credits
              </button>
            )}
          </div>
        </div>

        {/* Credit request form */}
        {showRequest && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-xl border border-border bg-muted/30"
          >
            <p className="text-sm font-semibold text-foreground mb-3">Request more credits</p>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Tell us why you need more credits (e.g. teaching a class, building curriculum…)"
              className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleRequestCredits}
                disabled={requesting || !reason.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
              >
                {requesting && <Loader2 size={12} className="animate-spin" />}
                Submit request
              </button>
              <button onClick={() => setShowRequest(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {requested && (
          <div className="mb-6 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            Request submitted — we'll review it shortly.
          </div>
        )}

        {canCreate && !showRequest && (
          <p className="text-xs text-muted-foreground mb-6">
            Need more credits?{" "}
            <button onClick={() => setShowRequest(true)} className="text-primary hover:underline">
              Request them here
            </button>
          </p>
        )}

        {/* Course grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="text-muted-foreground font-sans">You haven't created any courses yet.</p>
            {canCreate && (
              <Link to="/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                <Plus size={14} /> Create your first course
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map(course => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-xl border border-border bg-white p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border",
                      course.level === "beginner" ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : course.level === "intermediate" ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    )}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      {course.is_public ? <Globe size={10} /> : <Lock size={10} />}
                      {course.is_public ? "Public" : "Private"}
                    </span>
                  </div>
                  <button
                    onClick={() => setConfirmSlug(course.slug)}
                    disabled={deletingSlug === course.slug}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                  >
                    {deletingSlug === course.slug
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Trash2 size={14} />}
                  </button>
                </div>
                <Link to={`/c/${course.slug}`}>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {course.module_count} {course.module_count === 1 ? "module" : "modules"} ·{" "}
                  {new Date(course.created_at).toLocaleDateString()}
                </p>
                {course.is_public && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono truncate">/c/{course.slug}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        open={!!confirmSlug}
        title="Delete this course?"
        description="This will permanently remove the course and all its modules. This cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={!!deletingSlug}
        onConfirm={handleDelete}
        onCancel={() => setConfirmSlug(null)}
      />
      <Footer />
    </div>
  );
}
