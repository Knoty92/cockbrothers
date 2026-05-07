import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  onMount,
  type JSX,
  type Accessor,
  type Setter,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createSupabaseClient } from "~/lib/supabase/client";

// ==========================================
// Types
// ==========================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  tier: string;
  subscriptionId: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextValue {
  state: AuthState;
  user: Accessor<User | null>;
  session: Accessor<Session | null>;
  isAuthenticated: Accessor<boolean>;
  loading: Accessor<boolean>;
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: "google" | "github" | "discord") => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// ==========================================
// Context
// ==========================================

const AuthContext = createContext<AuthContextValue>();

// ==========================================
// Provider
// ==========================================

export function AuthProvider(props: { children: JSX.Element }) {
  const supabase = createSupabaseClient();

  const [state, setState] = createStore<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  const user: Accessor<User | null> = () => state.user;
  const session: Accessor<Session | null> = () => state.session;
  const isAuthenticated: Accessor<boolean> = () => !!state.user;
  const loading: Accessor<boolean> = () => state.loading;

  // Map Supabase user to our User type
  function mapUser(supabaseUser: Record<string, unknown> | null): User | null {
    if (!supabaseUser) return null;
    return {
      id: supabaseUser.id as string,
      email: supabaseUser.email as string,
      name: (supabaseUser.user_metadata as Record<string, unknown>)?.full_name as string | null ?? null,
      avatarUrl: (supabaseUser.user_metadata as Record<string, unknown>)?.avatar_url as string | null ?? null,
      tier: (supabaseUser.user_metadata as Record<string, unknown>)?.tier as string ?? "free",
      subscriptionId: null,
      stripeCustomerId: null,
      createdAt: supabaseUser.created_at as string,
    };
  }

  // On mount — check existing session
  onMount(async () => {
    try {
      const { data: { session: supabaseSession }, error } = await supabase.auth.getSession();

      if (error) {
        setState({ error: error.message, loading: false });
        return;
      }

      if (supabaseSession) {
        const mappedUser = mapUser(supabaseSession.user as unknown as Record<string, unknown>);
        setState({
          user: mappedUser,
          session: {
            accessToken: supabaseSession.access_token,
            refreshToken: supabaseSession.refresh_token,
            expiresAt: supabaseSession.expires_at ?? 0,
            user: mappedUser,
          },
          loading: false,
          error: null,
        });

        // Fetch user details from our backend
        fetchUserProfile(mappedUser!.id);
      } else {
        setState({ loading: false });
      }
    } catch (e) {
      setState({ loading: false, error: (e as Error).message });
    }

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, supabaseSession) => {
      if (supabaseSession) {
        const mappedUser = mapUser(supabaseSession.user as unknown as Record<string, unknown>);
        setState({
          user: mappedUser,
          session: {
            accessToken: supabaseSession.access_token,
            refreshToken: supabaseSession.refresh_token,
            expiresAt: supabaseSession.expires_at ?? 0,
            user: mappedUser,
          },
          error: null,
        });
      } else {
        setState({ user: null, session: null, error: null });
      }
    });
  });

  // Fetch full user profile from backend
  async function fetchUserProfile(userId: string) {
    try {
      const response = await fetch(`/api/auth/me`);
      if (response.ok) {
        const data = await response.json();
        setState({
          user: { ...state.user!, ...data.data },
        });
      }
    } catch {
      // Silently fail — user is still authenticated via Supabase
    }
  }

  // ==========================================
  // Auth Actions
  // ==========================================

  async function login(email: string, password: string) {
    setState({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (e) {
      setState({ error: (e as Error).message, loading: false });
      throw e;
    }
  }

  async function loginWithProvider(provider: "google" | "github" | "discord") {
    setState({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (e) {
      setState({ error: (e as Error).message, loading: false });
      throw e;
    }
  }

  async function loginWithMagicLink(email: string) {
    setState({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      setState({ loading: false });
    } catch (e) {
      setState({ error: (e as Error).message, loading: false });
      throw e;
    }
  }

  async function register(email: string, password: string, name?: string) {
    setState({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name ?? email.split("@")[0],
            tier: "free",
          },
        },
      });
      if (error) throw error;
    } catch (e) {
      setState({ error: (e as Error).message, loading: false });
      throw e;
    }
  }

  async function logout() {
    setState({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setState({ user: null, session: null, loading: false, error: null });
    } catch (e) {
      setState({ error: (e as Error).message, loading: false });
      throw e;
    }
  }

  async function refreshSession() {
    try {
      const { data: { session: supabaseSession }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (supabaseSession) {
        const mappedUser = mapUser(supabaseSession.user as unknown as Record<string, unknown>);
        setState({
          user: mappedUser,
          session: {
            accessToken: supabaseSession.access_token,
            refreshToken: supabaseSession.refresh_token,
            expiresAt: supabaseSession.expires_at ?? 0,
            user: mappedUser,
          },
        });
      }
    } catch (e) {
      setState({ error: (e as Error).message });
    }
  }

  async function resetPassword(email: string) {
    setState({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setState({ loading: false });
    } catch (e) {
      setState({ error: (e as Error).message, loading: false });
      throw e;
    }
  }

  const value: AuthContextValue = {
    state,
    user,
    session,
    isAuthenticated,
    loading,
    login,
    loginWithProvider,
    loginWithMagicLink,
    register,
    logout,
    refreshSession,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
