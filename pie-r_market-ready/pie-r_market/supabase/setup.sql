-- pie-r_market: create the products table and its access rules.
-- IMPORTANT: Replace OWNER_EMAIL_HERE with the exact email used by the shop owner to sign in.
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0 check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Visitors can only read products that the owner has chosen to display.
drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products" on public.products
for select to anon, authenticated using (active = true or lower(coalesce(auth.jwt() ->> 'email','')) = lower('OWNER_EMAIL_HERE'));

-- Only the configured owner email can add, edit, or delete products.
drop policy if exists "Owner can insert products" on public.products;
create policy "Owner can insert products" on public.products
for insert to authenticated with check (lower(coalesce(auth.jwt() ->> 'email','')) = lower('OWNER_EMAIL_HERE'));

drop policy if exists "Owner can update products" on public.products;
create policy "Owner can update products" on public.products
for update to authenticated using (lower(coalesce(auth.jwt() ->> 'email','')) = lower('OWNER_EMAIL_HERE'))
with check (lower(coalesce(auth.jwt() ->> 'email','')) = lower('OWNER_EMAIL_HERE'));

drop policy if exists "Owner can delete products" on public.products;
create policy "Owner can delete products" on public.products
for delete to authenticated using (lower(coalesce(auth.jwt() ->> 'email','')) = lower('OWNER_EMAIL_HERE'));
