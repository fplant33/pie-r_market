# pie-r_market starter
Next.js + Supabase Auth starter for a single-owner ecommerce store.

## Environment variables
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

## Authentication setup
Supabase Dashboard → Authentication → Providers:
- Enable Email (magic link)
- Enable Twitter provider (used for X login); configure the X developer app OAuth credentials in Supabase.
Set Supabase Site URL and Redirect URLs for your Vercel domain and local development URL.

## Important
This is a starter scaffold, not a finished production shop. Before accepting real orders/payments, implement database tables, Row Level Security, server-verified single-admin authorization, inventory/order workflows, payment gateway integration, and verified payment webhooks. Do not treat uploaded payment slips as confirmed payment.
