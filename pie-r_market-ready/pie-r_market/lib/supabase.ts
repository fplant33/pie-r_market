import { createClient } from "@supabase/supabase-js";
// Fallback values allow the app to build before Vercel environment variables are configured.
// Real Supabase values must be added in Vercel before using login or product data.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-publishable-key";
export const supabase = createClient(url, key);
