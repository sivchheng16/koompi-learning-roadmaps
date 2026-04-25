import React, { createContext, useContext, useEffect, useState } from "react";
import { getKidAuth, getStoredUser, getStoredToken, clearSession, KIDUser } from "../lib/kidAuth";
import { toast } from "sonner";

interface AuthContextType {
  user: KIDUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<KIDUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on mount
    const stored = getStoredUser();
    if (stored) setUser(stored);
    setLoading(false);

    // Listen for cross-tab logout
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kid_user" && !e.newValue) setUser(null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async () => {
    try {
      const auth = getKidAuth();
      const url = await auth.createLoginUrl({ scope: ["profile.basic", "profile.contact"] });
      window.location.href = url;
    } catch (err) {
      toast.error("Could not reach KOOMPI ID. Please try again.");
    }
  };

  const refreshUser = () => {
    setUser(getStoredUser());
  };

  const logout = () => {
    clearSession();
    setUser(null);
    toast.success("Signed out.");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Expose setUser so the callback page can push user in without re-mounting
export function useAuthSetter() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthSetter must be used within AuthProvider");
  return ctx;
}
