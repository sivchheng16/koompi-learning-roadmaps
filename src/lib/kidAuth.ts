import { KoompiAuth } from "@koompi/oauth";

// Singleton KID OAuth client — PKCE flow, no client secret needed in browser
let _client: KoompiAuth | null = null;

export function getKidAuth(): KoompiAuth {
  if (!_client) {
    _client = new KoompiAuth({
      clientId: import.meta.env.VITE_KID_CLIENT_ID ?? "",
      redirectUri:
        import.meta.env.VITE_KID_REDIRECT_URI ??
        `${window.location.origin}/auth/callback`,
    });
  }
  return _client;
}

export const STORAGE_KEYS = {
  accessToken: "kid_access_token",
  refreshToken: "kid_refresh_token",
  user: "kid_user",
} as const;

export interface KIDUser {
  _id: string;
  fullname: string;
  email?: string;
  username?: string;
  avatar?: string;
  wallet_address?: string;
}

export function storeSession(accessToken: string, refreshToken: string | undefined, user: KIDUser) {
  localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

export function clearSession() {
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
}

export function getStoredUser(): KIDUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? (JSON.parse(raw) as KIDUser) : null;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}
