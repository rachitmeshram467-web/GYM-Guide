import { z } from 'zod';

export const WorkoutRequestSchema = z.object({
  experience_level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  equipment_available: z.enum(['Full Gym', 'Dumbbells Only', 'Bodyweight']),
  primary_goal: z.enum(['Hypertrophy', 'Strength', 'Fat Loss', 'Endurance']),
  split_type: z.string().optional().default('Push/Pull/Legs'),
  days_per_week: z.number().int().min(2).max(7).optional().default(4),
  target_muscle_groups: z.array(z.string()).optional(),
  injuries_limitations: z.string().max(300).optional().default('')
});

export const FormGuideRequestSchema = z.object({
  exercise_name: z.string().min(2).max(100),
  user_experience: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional().default('Intermediate'),
  focus_area: z.string().optional()
});

export const NutritionAdviceRequestSchema = z.object({
  weight_kg: z.number().positive(),
  height_cm: z.number().positive(),
  age: z.number().int().min(12).max(100).optional().default(25),
  gender: z.enum(['Male', 'Female', 'Other']).optional().default('Male'),
  primary_goal: z.enum(['Hypertrophy', 'Strength', 'Fat Loss', 'Endurance']),
  dietary_preference: z.enum(['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian']).optional().default('Vegetarian'),
  training_day: z.boolean().optional().default(true)
});

export const ExerciseLogSchema = z.object({
  workout_id: z.string().optional(),
  session_date: z.string(),
  notes: z.string().max(500).optional().default(''),
  duration_minutes: z.number().int().nonnegative().optional().default(45),
  logged_data: z.array(
    z.object({
      exercise_name: z.string(),
      target_muscle: z.string().optional(),
      sets: z.array(
        z.object({
          set_number: z.number().int().positive(),
          weight_kg: z.number().nonnegative(),
          reps: z.number().int().positive(),
          completed: z.boolean().optional().default(true)
        })
      )
    })
  )
});
