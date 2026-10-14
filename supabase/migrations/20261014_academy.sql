-- HAI DAT AI ACADEMY: apply only on a new, approved Supabase project.
create table if not exists public.profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '',
 created_at timestamptz not null default now(),
 constraint display_name_length check (char_length(display_name)<=80)
);
create table if not exists public.user_roles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'student' check(role in ('student','editor','admin')),
 assigned_at timestamptz not null default now()
);
create table if not exists public.lesson_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_key text not null,
 completed boolean not null default false,
 updated_at timestamptz not null default now(),
 primary key(user_id,lesson_key),
 constraint lesson_key_length check(char_length(lesson_key) between 3 and 160)
);
create index if not exists lesson_progress_user_idx on public.lesson_progress(user_id);
create table if not exists public.audit_logs (
 id bigint generated always as identity primary key,
 actor_id uuid references auth.users(id) on delete set null,
 action text not null,
 target_id uuid,
 created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.audit_logs enable row level security;
revoke all on public.audit_logs from anon,authenticated;
revoke insert,update,delete on public.user_roles from anon,authenticated;
grant select on public.user_roles to authenticated;
grant select,insert,update on public.profiles to authenticated;
grant select,insert,update,delete on public.lesson_progress to authenticated;
create policy "profile read own" on public.profiles for select to authenticated using ((select auth.uid())=user_id);
create policy "profile insert own" on public.profiles for insert to authenticated with check ((select auth.uid())=user_id);
create policy "profile update own" on public.profiles for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "role read own" on public.user_roles for select to authenticated using ((select auth.uid())=user_id);
create policy "progress read own" on public.lesson_progress for select to authenticated using ((select auth.uid())=user_id);
create policy "progress insert own" on public.lesson_progress for insert to authenticated with check ((select auth.uid())=user_id);
create policy "progress update own" on public.lesson_progress for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "progress delete own" on public.lesson_progress for delete to authenticated using ((select auth.uid())=user_id);
-- Explicit student-only bootstrap, never trust client-provided role.
create or replace function public.init_academy_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(user_id) values(new.id);
 insert into public.user_roles(user_id,role) values(new.id,'student');
 return new;
end $$;
revoke all on function public.init_academy_user() from public,anon,authenticated;
drop trigger if exists academy_user_created on auth.users;
create trigger academy_user_created after insert on auth.users for each row execute function public.init_academy_user();
-- Admin/editor promotion is manual privileged operation in Supabase dashboard.
-- NEVER expose service_role to browser. No browser-side admin modification allowed.
