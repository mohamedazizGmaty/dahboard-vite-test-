-- 1. Create a table to store Role Definitions
-- This table defines what "Admin", "Editor", etc. actually mean in terms of permissions.
create table if not exists public.roles_definitions (
  id text primary key, -- e.g. 'admin', 'editor' (slug)
  name text not null, -- e.g. 'Admin', 'Editor' (display name)
  description text,
  permissions jsonb default '{}'::jsonb, -- Stores { "aiModelTraining": true, ... }
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Enable RLS
alter table public.roles_definitions enable row level security;

-- 3. Policies for roles_definitions
-- Allow authenticated users to read roles (so the UI can load them)
create policy "Roles are viewable by authenticated users"
  on roles_definitions for select
  to authenticated
  using ( true );

-- Allow authenticated users (or just admins in a real app) to insert/update roles
-- For now, we allow all authenticated users to manage roles for simplicity of the demo
create policy "Authenticated users can manage roles"
  on roles_definitions for all
  to authenticated
  using ( true )
  with check ( true );

-- 4. Insert Default Roles
insert into public.roles_definitions (id, name, description, permissions)
values 
  ('admin', 'Admin', 'Full access to all features and settings', '{"aiModelTraining": true, "heatmapVisualization": true, "viewer": true, "arSceneDeployment": true, "dataExport": true}'),
  ('editor', 'Editor', 'Can edit content and view analytics', '{"aiModelTraining": false, "heatmapVisualization": true, "viewer": true, "arSceneDeployment": true, "dataExport": true}'),
  ('viewer', 'Viewer', 'Read-only access to published content', '{"aiModelTraining": false, "heatmapVisualization": true, "viewer": true, "arSceneDeployment": false, "dataExport": false}')
on conflict (id) do update 
set permissions = EXCLUDED.permissions;

-- 5. Update Profiles Policies (if not already done)
-- Ensure we can update profiles to assign roles
create policy "Authenticated users can update any profile"
  on profiles for update
  to authenticated
  using ( true )
  with check ( true );
