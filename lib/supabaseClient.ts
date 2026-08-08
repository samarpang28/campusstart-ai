import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // This only throws at build/runtime if the env vars are missing,
  // which makes misconfiguration obvious instead of failing silently.
  console.warn(
    "Supabase env vars are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    // Next.js caches fetch() by default in Server Components, which was
    // making the news ticker's signup count go stale. This forces every
    // Supabase request (server and client) to always fetch fresh data.
    fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
  },
});
