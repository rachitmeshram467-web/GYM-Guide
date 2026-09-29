import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://imqpasfjwsgegpnfrcbw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-supabase') &&
    Boolean(supabaseAnonKey) &&
    supabaseAnonKey !== 'your-supabase-anon-key' &&
    supabaseAnonKey.length > 20
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://gymgenie-mock.supabase.co', 'mock-anon-key');
