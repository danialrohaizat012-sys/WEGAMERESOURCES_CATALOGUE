-- Cadangan skema Supabase untuk fasa seterusnya (BELUM digunakan dalam versi demo).
-- Bentuk lajur sepadan dengan objek produk & tetapan dalam js/seed.js.

create table if not exists public.products (
  id          text primary key,
  sku         text not null unique,
  name        text not null,
  brand       text default '',
  category    text not null check (category in ('konsol','controller','aksesori','sparepart')),
  platforms   text[] default '{}',
  condition   text default 'Baru' check (condition in ('Baru','Refurbished','OEM')),
  stock       integer not null default 0,
  preorder    boolean not null default false,
  unit        text not null default 'unit',
  moq         integer not null default 1,
  tiers       jsonb not null default '[]',   -- [{ "min": 1, "price": 269 }, ...]
  srp         numeric(10,2) default 0,
  "desc"      text default '',
  specs       text default '',
  image       text default '',               -- URL Supabase Storage
  featured    boolean not null default false,
  updated_at  timestamptz not null default now()
);

create table if not exists public.settings (
  id          int primary key default 1 check (id = 1),  -- satu baris sahaja
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.settings enable row level security;

-- Pelanggan (anon) boleh baca katalog
create policy "public read products" on public.products for select using (true);
create policy "public read settings" on public.settings for select using (true);

-- Hanya staf log masuk boleh ubah
create policy "staff write products" on public.products for all to authenticated using (true) with check (true);
create policy "staff write settings" on public.settings for all to authenticated using (true) with check (true);
