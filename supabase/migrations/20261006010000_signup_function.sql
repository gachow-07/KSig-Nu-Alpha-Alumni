-- Lets the website (hosted as plain files on GitHub Pages) save sign-ups
-- straight from the browser, without opening up the alumni table.
--
-- Run this once in Supabase AFTER the create_alumni migration:
-- Dashboard → SQL Editor → New query → paste → Run.
--
-- How it stays safe:
--  - The browser uses the public "publishable" key, which can ONLY call this
--    function. It still can't read, list, or delete anything in `alumni`.
--  - The function validates every field again (never trust the browser).
--  - Same email = update that person's row instead of adding a duplicate.
--  - Spam trap: if the hidden "website" field is filled in, do nothing.
--  - Rate limit: at most 5 sign-ups per IP address per 10 minutes.

-- Remembers recent sign-up attempts per IP for rate limiting. Private.
create table if not exists public.signup_attempts (
  id         bigint generated always as identity primary key,
  ip         text not null,
  created_at timestamptz not null default now()
);

create index if not exists signup_attempts_ip_created_at_idx
  on public.signup_attempts (ip, created_at);

alter table public.signup_attempts enable row level security;
revoke all on table public.signup_attempts from anon, authenticated;

create or replace function public.submit_alumni_signup(
  p_full_name         text,
  p_pledge_class      text,
  p_email             text,
  p_city              text default null,
  p_current_role      text default null,
  p_open_to_mentoring boolean default false,
  p_website           text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_full_name    text := btrim(regexp_replace(coalesce(p_full_name, ''), '\s+', ' ', 'g'));
  v_pledge_class text := btrim(regexp_replace(coalesce(p_pledge_class, ''), '\s+', ' ', 'g'));
  v_email        text := lower(btrim(coalesce(p_email, '')));
  v_city         text := nullif(btrim(coalesce(p_city, '')), '');
  v_role         text := nullif(btrim(coalesce(p_current_role, '')), '');
  v_headers      json;
  v_ip           text;
begin
  -- Spam trap: bots fill in the hidden field. Pretend it worked.
  if btrim(coalesce(p_website, '')) <> '' then
    return;
  end if;

  -- Rate limit by the visitor's IP (Supabase passes request headers through).
  v_headers := nullif(current_setting('request.headers', true), '')::json;
  v_ip := coalesce(
    v_headers ->> 'cf-connecting-ip',
    btrim(split_part(v_headers ->> 'x-forwarded-for', ',', 1))
  );

  if v_ip is not null and v_ip <> '' then
    delete from public.signup_attempts where created_at < now() - interval '1 hour';

    if (
      select count(*) from public.signup_attempts
      where ip = v_ip and created_at > now() - interval '10 minutes'
    ) >= 5 then
      raise exception 'rate_limited' using errcode = 'P0001';
    end if;

    insert into public.signup_attempts (ip) values (v_ip);
  end if;

  -- Validate (same rules as lib/signup-validation.ts).
  if char_length(v_full_name) not between 1 and 120 then
    raise exception 'invalid_fullName' using errcode = '22023';
  end if;
  if char_length(v_pledge_class) not between 1 and 40 then
    raise exception 'invalid_pledgeClass' using errcode = '22023';
  end if;
  if char_length(v_email) > 254 or v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'invalid_email' using errcode = '22023';
  end if;
  if char_length(v_city) > 120 then
    raise exception 'invalid_city' using errcode = '22023';
  end if;
  if char_length(v_role) > 200 then
    raise exception 'invalid_currentRole' using errcode = '22023';
  end if;

  insert into public.alumni (full_name, pledge_class, email, city, "current_role", open_to_mentoring)
  values (v_full_name, v_pledge_class, v_email, v_city, v_role, coalesce(p_open_to_mentoring, false))
  on conflict (email) do update set
    full_name         = excluded.full_name,
    pledge_class      = excluded.pledge_class,
    city              = excluded.city,
    "current_role"    = excluded."current_role",
    open_to_mentoring = excluded.open_to_mentoring;
end;
$$;

-- Only this function is callable from the website.
revoke all on function public.submit_alumni_signup(text, text, text, text, text, boolean, text) from public;
grant execute on function public.submit_alumni_signup(text, text, text, text, text, boolean, text) to anon, authenticated;
