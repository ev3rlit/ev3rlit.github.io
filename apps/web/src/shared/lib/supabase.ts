import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

/**
 * Singleton Supabase client instance.
 * Used for all database operations and real-time subscriptions.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Factory function to create a new Supabase client instance.
 * Useful for server-side operations or testing.
 */
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
