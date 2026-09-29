import { Router } from 'express';
import { generateWorkout, getFormGuide, getNutritionAdvice } from '../controllers/aiController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// AI generation endpoints with rate limiting & auth protection
router.post('/generate-workout', aiRateLimiter, requireAuth, generateWorkout);
router.post('/form-guide', aiRateLimiter, requireAuth, getFormGuide);
router.post('/nutrition-advice', aiRateLimiter, requireAuth, getNutritionAdvice);

export default router;
