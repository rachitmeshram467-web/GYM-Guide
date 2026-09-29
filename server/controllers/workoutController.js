import { supabase, isSupabaseConfigured, localStore } from '../db/supabase.js';
import { ExerciseLogSchema } from '../schemas/validation.js';
import crypto from 'crypto';

export const getWorkouts = async (req, res) => {
  const userId = req.user.id;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) {
      console.error('[Get Workouts Error]:', err.message);
    }
  }

  // Fallback to local memory store
  const userWorkouts = Array.from(localStore.workouts.values())
    .filter(w => w.user_id === userId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return res.status(200).json({ success: true, data: userWorkouts });
};

export const saveWorkout = async (req, res) => {
  const userId = req.user.id;
  const { title, split_type, exercises } = req.body;

  if (!title || !split_type || !exercises) {
    return res.status(400).json({ error: 'Missing title, split_type, or exercises payload' });
  }

  const workoutPayload = {
    id: crypto.randomUUID(),
    user_id: userId,
    title,
    split_type,
    exercises,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert(workoutPayload)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ success: true, data });
    } catch (err) {
      console.error('[Save Workout Supabase Error]:', err.message);
    }
  }

  // Fallback in-memory save
  localStore.workouts.set(workoutPayload.id, workoutPayload);
  return res.status(201).json({ success: true, data: workoutPayload });
};

export const logWorkoutSession = async (req, res) => {
  const userId = req.user.id;

  try {
    const validated = ExerciseLogSchema.parse(req.body);
    const { workout_id, session_date, notes, duration_minutes = 45, logged_data } = validated;

    // Calculate total tonnage / volume in KG
    let totalVolumeKg = 0;
    logged_data.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed !== false) {
          totalVolumeKg += (set.weight_kg || 0) * (set.reps || 0);
        }
      });
    });

    const logPayload = {
      id: crypto.randomUUID(),
      user_id: userId,
      workout_id: workout_id || null,
      session_date,
      notes: notes || '',
      logged_data,
      total_volume_kg: Math.round(totalVolumeKg * 100) / 100,
      duration_minutes,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('workout_logs')
          .insert(logPayload)
          .select()
          .single();

        if (error) throw error;
        return res.status(201).json({ success: true, data });
      } catch (err) {
        console.error('[Log Session Supabase Error]:', err.message);
      }
    }

    // Fallback store
    localStore.workout_logs.set(logPayload.id, logPayload);
    return res.status(201).json({ success: true, data: logPayload });
  } catch (err) {
    console.error('[Log Workout Error]:', err);
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }
    return res.status(500).json({ error: 'Failed to record workout session', message: err.message });
  }
};

export const getWorkoutLogs = async (req, res) => {
  const userId = req.user.id;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', userId)
        .order('session_date', { ascending: false });

      if (error) throw error;
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) {
      console.error('[Get Logs Supabase Error]:', err.message);
    }
  }

  const logs = Array.from(localStore.workout_logs.values())
    .filter(l => l.user_id === userId)
    .sort((a, b) => new Date(b.session_date) - new Date(a.session_date));

  return res.status(200).json({ success: true, data: logs });
};

export const getProfile = async (req, res) => {
  const userId = req.user.id;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        return res.status(200).json({ success: true, data });
      }
    } catch (err) {
      console.error('[Get Profile Supabase Error]:', err.message);
    }
  }

  const profile = localStore.profiles.get(userId) || {
    id: userId,
    email: req.user.email,
    full_name: req.user.full_name || 'Gym Athlete',
    age: 26,
    weight_kg: 75.5,
    height_cm: 178,
    gender: 'Male',
    experience_level: 'Intermediate',
    primary_goal: 'Hypertrophy',
    equipment_access: 'Full Gym',
    injuries_limitations: ''
  };

  return res.status(200).json({ success: true, data: profile });
};

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const updates = {
    ...req.body,
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: userId, email: req.user.email, ...updates })
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('[Update Profile Supabase Error]:', err.message);
    }
  }

  const current = localStore.profiles.get(userId) || { id: userId, email: req.user.email };
  const updated = { ...current, ...updates };
  localStore.profiles.set(userId, updated);

  return res.status(200).json({ success: true, data: updated });
};
