-- Alumni sign-ups from the website form.
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.alumni (
  id                uuid primary key default gen_random_uuid(),
  full_name         text not null check (char_length(full_name) between 1 and 120),
  pledge_class      text not null check (char_length(pledge_class) between 1 and 40),
  email             text not null unique check (email = lower(email) and char_length(email) <= 254),
  city              text check (char_length(city) <= 120),
  -- current_role is also a built-in SQL keyword, so it has to be quoted here.
  "current_role"    text check (char_length("current_role") <= 200),
  open_to_mentoring boolean not null default false,
  created_at        timestamptz not null default now()
);

comment on table public.alumni is 'Nu Alpha alumni who signed up on the website. Written only by the site server.';

-- Lock the table down. With RLS on and no policies, the public (anon) and
-- logged-in (authenticated) API roles can't read or write anything. The
-- website writes with the secret/service_role key, which bypasses RLS.
alter table public.alumni enable row level security;

revoke all on table public.alumni from anon, authenticated;
