import { supabase, isSupabaseConfigured } from './supabase';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const getAuthHeaders = async () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (isSupabaseConfigured()) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
      return headers;
    }
  }

  // Fallback guest headers
  headers['x-guest-mode'] = 'true';
  headers['Authorization'] = 'Bearer guest-demo-token';
  return headers;
};

export const api = {
  // AI Endpoints
  async generateWorkout(params) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/ai/generate-workout`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to generate workout');
    }
    const data = await res.json();
    return data.data;
  },

  async getFormGuide(exerciseName, experience = 'Intermediate') {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/ai/form-guide`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        exercise_name: exerciseName,
        user_experience: experience
      })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch form guide');
    }
    const data = await res.json();
    return data.data;
  },

  async getNutritionAdvice(params) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/ai/nutrition-advice`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to get nutrition advice');
    }
    const data = await res.json();
    return data.data;
  },

  // Workouts & History Endpoints
  async getWorkouts() {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/workouts`, { headers });
    if (!res.ok) throw new Error('Failed to fetch workouts');
    const data = await res.json();
    return data.data;
  },

  async saveWorkout(workout) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/workouts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(workout)
    });
    if (!res.ok) throw new Error('Failed to save workout');
    const data = await res.json();
    return data.data;
  },

  async logWorkout(sessionData) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/workouts/log`, {
      method: 'POST',
      headers,
      body: JSON.stringify(sessionData)
    });
    if (!res.ok) throw new Error('Failed to log workout session');
    const data = await res.json();
    return data.data;
  },

  async getWorkoutLogs() {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/workouts/logs`, { headers });
    if (!res.ok) throw new Error('Failed to fetch workout logs');
    const data = await res.json();
    return data.data;
  }
};
