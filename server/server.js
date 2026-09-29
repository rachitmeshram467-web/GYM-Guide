import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import { isSupabaseConfigured } from './db/supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// 1. Security Headers via Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// 2. CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || origin === CORS_ORIGIN || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Dev-friendly permissive CORS
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-guest-mode']
  })
);

// 3. Request Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 5. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'GymGenie AI Server',
    version: '1.0.0',
    supabase_connected: isSupabaseConfigured(),
    timestamp: new Date().toISOString()
  });
});

// Auto-Confirm Email Endpoint (uses service role admin)
app.post('/api/auth/confirm-user', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  if (!isSupabaseConfigured()) {
    return res.status(200).json({ success: true, message: 'In mock mode, email auto-confirmed.' });
  }

  try {
    const { supabase } = await import('./db/supabase.js');
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;

    const targetUser = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase().trim());
    if (!targetUser) {
      return res.status(404).json({ error: 'No user registered with this email address' });
    }

    const { error: updateErr } = await supabase.auth.admin.updateUserById(targetUser.id, {
      email_confirm: true
    });
    if (updateErr) throw updateErr;

    console.log(`[Auth Admin] Auto-confirmed email for user: ${email}`);
    return res.status(200).json({ success: true, message: 'Email confirmed successfully' });
  } catch (err) {
    console.error('[Auto-confirm error]:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// 6. Routes
app.use('/api/ai', aiRoutes);
app.use('/api/workouts', workoutRoutes);

// 7. 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found', path: req.originalUrl });
});

// 8. Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// 9. Boot Server
app.listen(PORT, () => {
  console.log(`🚀 GymGenie AI Server running on http://localhost:${PORT}`);
  console.log(`   Database status: ${isSupabaseConfigured() ? 'Supabase Live' : 'In-Memory / Local Store'}`);
});
