-- ==========================================
-- 1. PROFILES TABLE SETUP
-- ==========================================

-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  roles text[] default '{}', -- Array of role IDs/Names e.g. ['admin']
  active boolean default true,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Authenticated users can update any profile" on public.profiles;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

-- Allow authenticated users to update any profile (for Admin/RBAC management)
-- In a stricter app, you'd check if auth.uid() has 'admin' role here.
create policy "Authenticated users can update any profile"
  on public.profiles for update
  to authenticated
  using ( true )
  with check ( true );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  user_count integer;
begin
  select count(*) into user_count from public.profiles;

  insert into public.profiles (id, email, full_name, avatar_url, roles)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    case 
      when user_count = 0 then ARRAY['Admin']::text[] -- First user is Admin
      else ARRAY['Viewer']::text[] -- Others are Viewers by default
    end
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ==========================================
-- 2. ROLES DEFINITIONS SETUP
-- ==========================================

-- Create a table to store Role Definitions
create table if not exists public.roles_definitions (
  id text primary key, -- e.g. 'admin', 'editor'
  name text not null, -- e.g. 'Admin', 'Editor'
  description text,
  permissions jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.roles_definitions enable row level security;

-- Drop existing policies
drop policy if exists "Roles are viewable by authenticated users" on public.roles_definitions;
drop policy if exists "Authenticated users can manage roles" on public.roles_definitions;

-- Create policies
create policy "Roles are viewable by authenticated users"
  on public.roles_definitions for select
  to authenticated
  using ( true );

create policy "Authenticated users can manage roles"
  on public.roles_definitions for all
  to authenticated
  using ( true )
  with check ( true );

-- Insert Default Roles with Updated Permissions
insert into public.roles_definitions (id, name, description, permissions)
values 
  ('admin', 'Admin', 'Full access to all features and settings', '{"view_dashboard": true, "view_builder": true, "view_contacts": true, "view_analytics": true, "view_roles": true, "view_settings": true}'),
  ('editor', 'Editor', 'Can edit content and view analytics', '{"view_dashboard": true, "view_builder": true, "view_contacts": true, "view_analytics": true, "view_roles": false, "view_settings": false}'),
  ('viewer', 'Viewer', 'Read-only access to published content', '{"view_dashboard": true, "view_builder": false, "view_contacts": false, "view_analytics": true, "view_roles": false, "view_settings": false}')
on conflict (id) do update 
set permissions = EXCLUDED.permissions;
