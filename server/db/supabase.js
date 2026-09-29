import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const anonKey = process.env.SUPABASE_ANON_KEY || '';

const effectiveKey = serviceRoleKey || anonKey;

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-supabase') &&
    Boolean(effectiveKey) &&
    effectiveKey !== 'your-supabase-anon-key' &&
    effectiveKey !== 'your-supabase-service-role-key'
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, effectiveKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { transport: WebSocket }
    })
  : null;

if (supabase) {
  console.log('[Supabase Server] Connected to live Supabase project:', supabaseUrl);
} else {
  console.warn('[Supabase Server] Live Supabase keys not set. In-memory data store active.');
}

// In-memory fallback repository for zero-downtime operation
export const localStore = {
  profiles: new Map(),
  workouts: new Map(),
  workout_logs: new Map(),
  nutrition_plans: new Map()
};
