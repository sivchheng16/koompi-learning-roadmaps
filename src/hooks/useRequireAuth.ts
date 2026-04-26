import { useAuth } from "../context/AuthContext";

export function useRequireAuth() {
  const { user, login } = useAuth();

  const requireAuth = <T extends (...args: any[]) => any>(action: T) => {
    return ((...args: Parameters<T>) => {
      if (user) return action(...args);
      login();
    }) as T;
  };

  return { requireAuth, isAuthenticated: !!user };
}
