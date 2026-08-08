-- Run this in Supabase SQL Editor AFTER supabase-schema.sql has already been run once.
-- This adds two new tables for the Contact page and the Services page partner-interest form.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null
);

alter table contact_messages enable row level security;

create policy "Public can send a contact message"
on contact_messages
for insert
to anon
with check (true);

create table if not exists partner_interest (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  partner_type text not null,
  organization_name text not null,
  contact_email text not null,
  details text
);

alter table partner_interest enable row level security;

create policy "Public can submit partner interest"
on partner_interest
for insert
to anon
with check (true);

-- To view messages: Supabase Dashboard -> Table Editor -> contact_messages / partner_interest
-- Same privacy model as waitlist_signups: public can only INSERT, never read others' data.
