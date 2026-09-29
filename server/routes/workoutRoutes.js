import { Router } from 'express';
import {
  getWorkouts,
  saveWorkout,
  logWorkoutSession,
  getWorkoutLogs,
  getProfile,
  updateProfile
} from '../controllers/workoutController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getWorkouts);
router.post('/', saveWorkout);
router.post('/log', logWorkoutSession);
router.get('/logs', getWorkoutLogs);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
