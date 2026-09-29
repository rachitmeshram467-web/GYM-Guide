import { supabase, isSupabaseConfigured } from '../db/supabase.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Guest / Demo mode header support
  if (req.headers['x-guest-mode'] === 'true' || !authHeader) {
    req.user = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'athlete@gymgenie.ai',
      full_name: 'GymGenie Athlete'
    };
    return next();
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: error?.message || 'Invalid or expired authentication token'
        });
      }
      req.user = user;
      return next();
    } catch (err) {
      console.error('[Auth Middleware Error]:', err.message);
      return res.status(401).json({ error: 'Authentication verification failed' });
    }
  }

  // Fallback if token provided in development/demo
  req.user = {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'athlete@gymgenie.ai',
    full_name: 'GymGenie Athlete'
  };
  return next();
};
