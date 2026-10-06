import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// This client uses the Supabase secret (service role) key, so it can write to
// the locked-down `alumni` table. The "server-only" import above makes the
// build fail if this file is ever imported into browser code.

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
