-- ========================================================================
-- GymGenie AI - Production Database Schema & Row Level Security (RLS)
-- Target: Supabase PostgreSQL
-- ========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------
-- 1. Profiles Table (linked to Supabase Auth)
-- ------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  age integer,
  weight_kg numeric(5,2),
  height_cm numeric(5,2),
  gender text default 'Other',
  experience_level text check (experience_level in ('Beginner', 'Intermediate', 'Advanced')),
  primary_goal text check (primary_goal in ('Hypertrophy', 'Strength', 'Fat Loss', 'Endurance')),
  equipment_access text default 'Full Gym',
  injuries_limitations text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------
-- 2. Workouts Table
-- ------------------------------------------------------------------------
create table if not exists public.workouts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  split_type text not null,
  exercises jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------
-- 3. Workout Logs Table (Active Sessions & Progress Tracking)
-- ------------------------------------------------------------------------
create table if not exists public.workout_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  workout_id uuid references public.workouts(id) on delete set null,
  session_date timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text,
  logged_data jsonb not null,
  total_volume_kg numeric(10,2) default 0,
  duration_minutes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------
-- 4. Nutrition Plans Table
-- ------------------------------------------------------------------------
create table if not exists public.nutrition_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_calories integer not null,
  protein_grams integer not null,
  carb_grams integer not null,
  fat_grams integer not null,
  meal_suggestions jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------
-- 5. Row Level Security (RLS) Configuration
-- ------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_logs enable row level security;
alter table public.nutrition_plans enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on public.profiles 
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles 
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles 
  for insert with check (auth.uid() = id);

-- Workouts Policies
create policy "Users can CRUD own workouts" on public.workouts 
  for all using (auth.uid() = user_id);

-- Workout Logs Policies
create policy "Users can CRUD own workout logs" on public.workout_logs 
  for all using (auth.uid() = user_id);

-- Nutrition Plans Policies
create policy "Users can CRUD own nutrition plans" on public.nutrition_plans 
  for all using (auth.uid() = user_id);

-- ------------------------------------------------------------------------
-- 6. Trigger for New User Profile Auto-Creation
-- ------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, experience_level, primary_goal)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'Beginner',
    'Hypertrophy'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution on auth.users creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
