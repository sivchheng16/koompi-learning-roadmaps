import type { Course, CourseModule, OutlineModule, UserCredits, Block } from "../types/course";

const token = () => localStorage.getItem("kid_access_token") ?? "";

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
      ...options?.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "request_failed");
  return data as T;
}

export const courseApi = {
  getCredits(): Promise<UserCredits> {
    return api("/api/courses/credits");
  },

  requestCredits(reason: string, amount_requested = 10): Promise<{ ok: boolean }> {
    return api("/api/credits/request", {
      method: "POST",
      body: JSON.stringify({ reason, amount_requested }),
    });
  },

  generateOutline(params: {
    title: string;
    description: string;
    level: string;
    num_modules: number;
    purpose?: string;
  }): Promise<{ modules: OutlineModule[] }> {
    return api("/api/courses/generate/outline", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  generateModule(params: {
    course_title: string;
    course_level: string;
    module_title: string;
    module_description: string;
    purpose?: string;
  }): Promise<{ blocks: Block[] }> {
    return api("/api/courses/generate/module", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  saveCourse(params: {
    title: string;
    description: string;
    level: string;
    is_public: boolean;
    modules: Array<{ title: string; duration: string; blocks: Block[] }>;
  }): Promise<{ ok: boolean; course: Course & { modules: CourseModule[] } }> {
    return api("/api/courses", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  getMyCourses(): Promise<{ courses: Array<Course & { module_count: number }> }> {
    return api("/api/courses/mine");
  },

  getCourse(slug: string): Promise<{ course: Course & { modules: CourseModule[] } }> {
    return api(`/api/courses/${slug}`);
  },

  deleteCourse(slug: string): Promise<{ ok: boolean }> {
    return api(`/api/courses/${slug}`, { method: "DELETE" });
  },
};

export const adminApi = {
  getUsers(): Promise<{ users: AdminUser[] }> {
    return api("/api/admin/users");
  },
  setCredits(userId: string, delta?: number, set?: number): Promise<{ ok: boolean }> {
    return api(`/api/admin/users/${userId}/credits`, {
      method: "PATCH",
      body: JSON.stringify({ delta, set }),
    });
  },
  getCreditRequests(): Promise<{ requests: AdminCreditRequest[] }> {
    return api("/api/admin/credit-requests");
  },
  approveRequest(id: number): Promise<{ ok: boolean }> {
    return api(`/api/admin/credit-requests/${id}/approve`, { method: "POST" });
  },
  denyRequest(id: number): Promise<{ ok: boolean }> {
    return api(`/api/admin/credit-requests/${id}/deny`, { method: "POST" });
  },
  getCourses(): Promise<{ courses: AdminCourse[] }> {
    return api("/api/admin/courses");
  },
  deleteCourse(slug: string): Promise<{ ok: boolean }> {
    return api(`/api/admin/courses/${slug}`, { method: "DELETE" });
  },
  getAuditLog(): Promise<{ log: AuditEntry[] }> {
    return api("/api/admin/audit-log");
  },
};

export interface AdminUser {
  user_id: string;
  email: string | null;
  fullname: string | null;
  wallet_address: string | null;
  is_admin: boolean;
  first_seen_at: string;
  last_seen_at: string;
  credits_remaining: number | null;
  credits_used: number | null;
  course_count: number;
}

export interface AdminCreditRequest {
  id: number;
  user_id: string;
  reason: string;
  amount_requested: number;
  status: "pending" | "approved" | "denied";
  created_at: string;
  user: { user_id: string; email: string | null; fullname: string | null } | null;
}

export interface AdminCourse {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  level: string;
  is_public: boolean;
  user_id: string;
  created_at: string;
  owner: { user_id: string; email: string | null; fullname: string | null } | null;
}

export interface AuditEntry {
  id: number;
  admin_user_id: string;
  action: string;
  target_user_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
  admin: { user_id: string; email: string | null; fullname: string | null } | null;
}
