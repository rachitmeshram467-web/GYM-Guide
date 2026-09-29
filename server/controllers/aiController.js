import { callGemini } from '../services/gemini.js';
import {
  WorkoutRequestSchema,
  FormGuideRequestSchema,
  NutritionAdviceRequestSchema
} from '../schemas/validation.js';

// Workout Generation JSON Schema for Gemini
const WORKOUT_SCHEMA = {
  type: 'object',
  properties: {
    split_name: { type: 'string' },
    overview: { type: 'string' },
    schedule: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'string' },
          focus: { type: 'string' },
          exercises: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                target_muscle: { type: 'string' },
                sets: { type: 'integer' },
                rep_range: { type: 'string' },
                rest_seconds: { type: 'integer' },
                cues: { type: 'string' }
              },
              required: ['name', 'sets', 'rep_range', 'rest_seconds', 'cues']
            }
          }
        },
        required: ['day', 'focus', 'exercises']
      }
    }
  },
  required: ['split_name', 'schedule']
};

// Form Guide JSON Schema for Gemini
const FORM_GUIDE_SCHEMA = {
  type: 'object',
  properties: {
    exercise_name: { type: 'string' },
    primary_muscle: { type: 'string' },
    secondary_muscles: { type: 'array', items: { type: 'string' } },
    setup: { type: 'string' },
    execution: { type: 'array', items: { type: 'string' } },
    common_mistakes: { type: 'array', items: { type: 'string' } },
    safety_cues: { type: 'array', items: { type: 'string' } }
  },
  required: ['exercise_name', 'primary_muscle', 'setup', 'execution', 'common_mistakes', 'safety_cues']
};

// Nutrition Advice JSON Schema for Gemini
const NUTRITION_SCHEMA = {
  type: 'object',
  properties: {
    target_calories: { type: 'integer' },
    protein_grams: { type: 'integer' },
    carb_grams: { type: 'integer' },
    fat_grams: { type: 'integer' },
    hydration_liters: { type: 'number' },
    chia_seed_water_instructions: { type: 'string' },
    pre_workout_fuel: { type: 'string' },
    post_workout_recovery: { type: 'string' },
    daily_meal_breakdown: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          meal_name: { type: 'string' },
          time: { type: 'string' },
          items: { type: 'string' },
          macros: { type: 'string' }
        },
        required: ['meal_name', 'time', 'items', 'macros']
      }
    }
  },
  required: [
    'target_calories',
    'protein_grams',
    'carb_grams',
    'fat_grams',
    'hydration_liters',
    'chia_seed_water_instructions',
    'pre_workout_fuel',
    'daily_meal_breakdown'
  ]
};

export const generateWorkout = async (req, res) => {
  try {
    const validated = WorkoutRequestSchema.parse(req.body);
    const {
      experience_level,
      equipment_available,
      primary_goal,
      split_type = 'Push/Pull/Legs',
      days_per_week = 4,
      injuries_limitations = ''
    } = validated;

    const promptText = `Generate a ${days_per_week}-day ${split_type} workout split tailored for a ${experience_level} with ${equipment_available} focusing on ${primary_goal}.${
      injuries_limitations ? ` Note medical/injury limitations to accommodate: ${injuries_limitations}.` : ''
    } Provide specific set counts, rep ranges, rest times in seconds, and biomechanical execution cues for each exercise.`;

    const plan = await callGemini(promptText, WORKOUT_SCHEMA);

    return res.status(200).json({
      success: true,
      data: plan
    });
  } catch (err) {
    console.error('[Generate Workout Error]:', err);
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }
    return res.status(500).json({ error: 'Failed to generate workout routine', message: err.message });
  }
};

export const getFormGuide = async (req, res) => {
  try {
    const validated = FormGuideRequestSchema.parse(req.body);
    const { exercise_name, user_experience = 'Intermediate' } = validated;

    const promptText = `Provide an in-depth biomechanical form breakdown, setup instructions, execution steps, common injuries/mistakes, and key coaching cues for the exercise: "${exercise_name}". Tailor cues for a ${user_experience} lifter.`;

    const guide = await callGemini(promptText, FORM_GUIDE_SCHEMA);

    return res.status(200).json({
      success: true,
      data: guide
    });
  } catch (err) {
    console.error('[Form Guide Error]:', err);
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }
    return res.status(500).json({ error: 'Failed to fetch form guide', message: err.message });
  }
};

export const getNutritionAdvice = async (req, res) => {
  try {
    const validated = NutritionAdviceRequestSchema.parse(req.body);
    const {
      weight_kg,
      height_cm,
      age = 25,
      gender = 'Male',
      primary_goal,
      dietary_preference = 'Vegetarian',
      training_day = true
    } = validated;

    const promptText = `Calculate customized daily caloric needs and macronutrient distribution (Protein, Carbs, Fats) for a ${age}-year-old ${gender} weighing ${weight_kg}kg, height ${height_cm}cm, pursuing ${primary_goal} on a ${training_day ? 'training day' : 'rest day'}. The athlete follows a ${dietary_preference} diet. 
    Crucial Requirement: You MUST explicitly include healthy fitness staples in the meal plan:
    1. Rolled oats (for sustained complex carbs and beta-glucan fiber).
    2. Roasted chana (Bengal gram for high satiety, fiber, and clean plant protein).
    3. Pre-workout fueling strategy.
    4. Chia seed hydration water (with exact preparation and optimal timing before training).`;

    const advice = await callGemini(promptText, NUTRITION_SCHEMA);

    return res.status(200).json({
      success: true,
      data: advice
    });
  } catch (err) {
    console.error('[Nutrition Advice Error]:', err);
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }
    return res.status(500).json({ error: 'Failed to calculate nutrition plan', message: err.message });
  }
};
