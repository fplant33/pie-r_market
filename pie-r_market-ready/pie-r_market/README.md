# pie-r_market

A simple Thai storefront with a private owner dashboard. Customers browse products, add items to a cart, then send the order summary to the shop through LINE. The owner manages products and stock in `/admin`.

## What is included
- Public product catalog (`/`) with search and cart
- LINE order handoff (no online payment processing)
- Email OTP and X/Twitter sign-in page (`/login`)
- Owner-only product dashboard (`/admin`): create, edit, show/hide, delete products and adjust stock
- Supabase table/RLS setup SQL in `supabase/setup.sql`

## Setup
1. In Supabase, open **SQL Editor** and run `supabase/setup.sql` after replacing every `OWNER_EMAIL_HERE` with the exact owner email address.
2. In Supabase Authentication, enable Email. Enable Twitter only if you have configured X/Twitter OAuth credentials; otherwise customers/owner can use email login.
3. Set the Supabase Site URL and redirect URL to your deployed site URL, including `https://your-domain.vercel.app/auth/callback`.
4. In Vercel Project Settings > Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_OWNER_EMAIL` (same email as in SQL)
   - `NEXT_PUBLIC_LINE_URL` (your LINE Official Account chat/add-friend link)
5. Redeploy after setting environment variables.
6. Sign in using the owner email and visit `/admin` to add products.

## Important notes
- Never put a Supabase `service_role` or secret key in a `NEXT_PUBLIC_` variable or in browser code. Only use the publishable/anon key here.
- The SQL RLS policies are the actual database permission boundary. The email check in the page is only for the user interface.
- The LINE link must be your real LINE Official Account link. The app appends an encoded order summary as a `text` query parameter; whether that text is prefilled depends on the LINE client/platform. If it is not prefilled, customers can copy the order summary from the cart and send it manually.
- This starter does not accept payments, verify slips, reserve stock automatically, or store orders. The owner confirms payment and adjusts stock manually in the dashboard.
- The callback route forwards the Supabase auth code to the login/admin page; complete production auth callback/session handling should be tested with the selected Supabase client setup before launch.
