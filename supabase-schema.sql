-- Run this once in Supabase: Dashboard -> SQL Editor -> New Query -> paste -> Run

create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique,
  segment text not null,
  destination_city text
);

-- Row Level Security: locked down by default, only specific access is opened up below
alter table waitlist_signups enable row level security;

-- Allow anyone (anonymous visitors on your landing page) to INSERT a signup.
-- They can never SELECT, UPDATE, or DELETE rows -- so no one can read other
-- people's emails through the public site.
create policy "Public can join the waitlist"
on waitlist_signups
for insert
to anon
with check (true);

-- Expose a safe, privacy-preserving COUNT only (not the actual rows) so the
-- landing page can show "N students already joined" without exposing any
-- personal data.
create or replace function get_waitlist_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from waitlist_signups;
$$;

grant execute on function get_waitlist_count() to anon;

-- To view your actual signups later, go to:
-- Supabase Dashboard -> Table Editor -> waitlist_signups
-- (you're logged in as the project owner, so RLS doesn't restrict you there)
