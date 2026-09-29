import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { NutritionCard } from '../components/NutritionCard';
import {
  Apple,
  Sparkles,
  Flame,
  Droplet,
  RefreshCw,
  Utensils,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const NutritionPage = () => {
  const { profile } = useAuth();

  const [weightKg, setWeightKg] = useState(profile?.weight_kg || 76);
  const [heightCm, setHeightCm] = useState(profile?.height_cm || 178);
  const [age, setAge] = useState(profile?.age || 26);
  const [goal, setGoal] = useState(profile?.primary_goal || 'Hypertrophy');
  const [dietaryPreference, setDietaryPreference] = useState('Vegetarian');
  const [isTrainingDay, setIsTrainingDay] = useState(true);

  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setLoading(true);
    setError('');

    try {
      const plan = await api.getNutritionAdvice({
        weight_kg: Number(weightKg),
        height_cm: Number(heightCm),
        age: Number(age),
        gender: profile?.gender || 'Male',
        primary_goal: goal,
        dietary_preference: dietaryPreference,
        training_day: isTrainingDay
      });
      setNutritionData(plan);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to calculate nutrition plan with Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Apple className="w-3.5 h-3.5" />
            <span>Sports Nutrition & Macronutrient Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Nutrition & Supplement Advisor
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Custom macros, whole-food fitness staples (oats, roasted chana), pre-workout fueling, and chia seed hydration.
          </p>
        </div>
      </div>

      {/* Input Calculator Bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          Athlete Metabolic Parameters
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Weight (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Height */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Hypertrophy">Hypertrophy</option>
              <option value="Strength">Strength</option>
              <option value="Fat Loss">Fat Loss</option>
              <option value="Endurance">Endurance</option>
            </select>
          </div>

          {/* Diet */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Diet</label>
            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>
          </div>

          {/* Day Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Training Day?</label>
            <button
              type="button"
              onClick={() => setIsTrainingDay(!isTrainingDay)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition border ${
                isTrainingDay
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {isTrainingDay ? 'Training Day (+Carbs)' : 'Rest Day'}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-sm shadow-neon hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                Calculating Bioenergetics with Gemini...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                Recalculate Macros & Meal Timing
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* Embedded Nutrition Card */}
      <NutritionCard nutritionData={nutritionData} onRefresh={handleCalculate} />
    </div>
  );
};
