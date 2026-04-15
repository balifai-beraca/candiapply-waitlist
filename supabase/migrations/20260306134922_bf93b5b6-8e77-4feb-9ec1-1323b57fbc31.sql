
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

create policy "Allow anonymous inserts" on public.waitlist
  for insert to anon, authenticated
  with check (true);
