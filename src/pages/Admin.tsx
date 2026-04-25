import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import {
  adminApi,
  type AdminUser,
  type AdminCreditRequest,
  type AdminCourse,
  type AuditEntry,
} from "../lib/courseApi";
import { Users, CreditCard, BookOpen, ScrollText, Check, X, Trash2, Plus, Minus } from "lucide-react";
import Footer from "../components/Footer";
import ConfirmModal from "../components/ConfirmModal";

type Tab = "users" | "requests" | "courses" | "audit";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    denied: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

// ── Users tab ─────────────────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creditInput, setCreditInput] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    adminApi.getUsers().then(r => setUsers(r.users)).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSetCredits = async (userId: string) => {
    const val = parseInt(creditInput);
    if (isNaN(val) || val < 0) return;
    setSaving(true);
    try {
      await adminApi.setCredits(userId, undefined, val);
      setEditingId(null);
      setCreditInput("");
      load();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{users.length} users</p>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-foreground">User</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Credits</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Courses</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Last seen</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {users.map(u => (
              <tr key={u.user_id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{u.fullname ?? "—"}</p>
                  <p className="text-xs text-muted-foreground">{u.email ?? u.user_id.slice(0, 16)}</p>
                  {u.is_admin && <span className="text-xs text-primary font-medium">admin</span>}
                </td>
                <td className="px-4 py-3">
                  {editingId === u.user_id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={creditInput}
                        onChange={e => setCreditInput(e.target.value)}
                        className="w-20 rounded-lg border border-border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={String(u.credits_remaining ?? 0)}
                        autoFocus
                      />
                      <button
                        onClick={() => handleSetCredits(u.user_id)}
                        disabled={saving}
                        className="p-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Check size={13} />
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setCreditInput(""); }}
                        className="p-1 rounded-lg border border-border hover:bg-muted"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums">{u.credits_remaining ?? "—"}</span>
                      <button
                        onClick={() => { setEditingId(u.user_id); setCreditInput(String(u.credits_remaining ?? 0)); }}
                        className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-muted text-muted-foreground"
                        title="Edit credits"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  )}
                  {u.credits_used != null && <p className="text-xs text-muted-foreground">{u.credits_used} used</p>}
                </td>
                <td className="px-4 py-3 tabular-nums">{u.course_count}</td>
                <td className="px-4 py-3 text-muted-foreground">{fmt(u.last_seen_at)}</td>
                <td className="px-4 py-3">
                  {editingId !== u.user_id && (
                    <button
                      onClick={() => { setEditingId(u.user_id); setCreditInput(String(u.credits_remaining ?? 0)); }}
                      className="text-xs text-primary hover:underline"
                    >
                      Set credits
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Credit requests tab ───────────────────────────────────────────────────────
function RequestsTab() {
  const [requests, setRequests] = useState<AdminCreditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<number | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminApi.getCreditRequests().then(r => setRequests(r.requests)).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handle = async (id: number, action: "approve" | "deny") => {
    setActing(id);
    try {
      action === "approve" ? await adminApi.approveRequest(id) : await adminApi.denyRequest(id);
      load();
    } finally {
      setActing(null);
    }
  };

  const pending = requests.filter(r => r.status === "pending");
  const resolved = requests.filter(r => r.status !== "pending");

  if (loading) return <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">{pending.length} pending</p>
          <div className="space-y-3">
            {pending.map(r => (
              <div key={r.id} className="rounded-xl border border-border bg-white p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{r.user?.fullname ?? "Unknown"}</p>
                  <p className="text-xs text-muted-foreground">{r.user?.email ?? r.user_id.slice(0, 16)}</p>
                  <p className="text-sm text-foreground mt-1.5 italic">"{r.reason}"</p>
                  <p className="text-xs text-muted-foreground mt-1">Requesting {r.amount_requested} credits · {fmt(r.created_at)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handle(r.id, "approve")}
                    disabled={acting === r.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Check size={12} /> Approve
                  </button>
                  <button
                    onClick={() => handle(r.id, "deny")}
                    disabled={acting === r.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium hover:bg-muted disabled:opacity-50"
                  >
                    <X size={12} /> Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pending.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No pending requests.</p>}

      {resolved.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Resolved</p>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">User</th>
                  <th className="text-left px-4 py-3 font-medium">Reason</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {resolved.map(r => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{r.user?.fullname ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">{r.user?.email ?? r.user_id.slice(0, 12)}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{r.reason}</td>
                    <td className="px-4 py-3 tabular-nums">{r.amount_requested}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{fmt(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Courses tab ───────────────────────────────────────────────────────────────
function CoursesTab() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminApi.getCourses().then(r => setCourses(r.courses)).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    if (!confirmSlug) return;
    setDeleting(confirmSlug);
    try {
      await adminApi.deleteCourse(confirmSlug);
      setConfirmSlug(null);
      load();
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div>;

  return (
    <>
    <ConfirmModal
      open={!!confirmSlug}
      title="Delete this course?"
      description="This will permanently remove the course and all its modules. This cannot be undone."
      confirmLabel="Delete"
      destructive
      loading={!!deleting}
      onConfirm={handleDelete}
      onCancel={() => setConfirmSlug(null)}
    />
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{courses.length} courses</p>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Owner</th>
              <th className="text-left px-4 py-3 font-medium">Level</th>
              <th className="text-left px-4 py-3 font-medium">Visibility</th>
              <th className="text-left px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {courses.map(c => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <a href={`/c/${c.slug}`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                    {c.title}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <p>{c.owner?.fullname ?? "—"}</p>
                  <p className="text-xs text-muted-foreground">{c.owner?.email ?? c.user_id.slice(0, 12)}</p>
                </td>
                <td className="px-4 py-3 capitalize">{c.level}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${c.is_public ? "text-emerald-700" : "text-muted-foreground"}`}>
                    {c.is_public ? "Public" : "Private"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{fmt(c.created_at)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setConfirmSlug(c.slug)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

// ── Audit log tab ─────────────────────────────────────────────────────────────
function AuditTab() {
  const [log, setLog] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getAuditLog().then(r => setLog(r.log)).finally(() => setLoading(false));
  }, []);

  const actionLabel: Record<string, string> = {
    update_credits: "Set credits",
    approve_credit_request: "Approved request",
    deny_credit_request: "Denied request",
    delete_course: "Deleted course",
  };

  if (loading) return <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div>;

  if (log.length === 0) return <p className="text-sm text-muted-foreground py-8 text-center">No audit entries yet.</p>;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 border-b border-border">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Action</th>
            <th className="text-left px-4 py-3 font-medium">By</th>
            <th className="text-left px-4 py-3 font-medium">Target</th>
            <th className="text-left px-4 py-3 font-medium">Details</th>
            <th className="text-left px-4 py-3 font-medium">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {log.map(e => (
            <tr key={e.id}>
              <td className="px-4 py-3 font-medium">{actionLabel[e.action] ?? e.action}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.admin?.email ?? e.admin_user_id.slice(0, 12)}</td>
              <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{e.target_user_id?.slice(0, 12) ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate">
                {e.details ? JSON.stringify(e.details) : "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{fmt(e.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main admin page ───────────────────────────────────────────────────────────
export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("users");
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/dashboard"); return; }
    // Verify admin by attempting a privileged call
    adminApi.getUsers()
      .then(() => setIsAdmin(true))
      .catch(() => navigate("/dashboard"))
      .finally(() => setChecking(false));
  }, [user, navigate]);

  if (checking) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "users", label: "Users", icon: <Users size={15} /> },
    { id: "requests", label: "Credit Requests", icon: <CreditCard size={15} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={15} /> },
    { id: "audit", label: "Audit Log", icon: <ScrollText size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-8 flex-1">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-2">Admin</p>
          <h1 className="text-4xl font-serif font-normal text-foreground tracking-tight">Control panel.</h1>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-1 border-b border-border"
        >
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {tab === "users" && <UsersTab />}
          {tab === "requests" && <RequestsTab />}
          {tab === "courses" && <CoursesTab />}
          {tab === "audit" && <AuditTab />}
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
