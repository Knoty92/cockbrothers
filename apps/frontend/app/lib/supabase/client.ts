import { createClient } from "@supabase/supabase-js";

// ==========================================
// Supabase client singleton
// ==========================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
  );
}

let client: ReturnType<typeof createClient> | null = null;

/**
 * Create or return the existing Supabase client instance.
 * Uses VITE_ prefixed env vars for client-side safety.
 */
export function createSupabaseClient() {
  if (client) return client;

  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  });

  return client;
}
