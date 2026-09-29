import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Dumbbell,
  Target,
  Flame,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Clock,
  Play,
  BookmarkPlus,
  RefreshCw
} from 'lucide-react';

export const WorkoutWizard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    primary_goal: profile?.primary_goal || 'Hypertrophy',
    experience_level: profile?.experience_level || 'Intermediate',
    equipment_available: profile?.equipment_access || 'Full Gym',
    split_type: 'Push/Pull/Legs',
    days_per_week: 4,
    injuries_limitations: profile?.injuries_limitations || ''
  });

  // Generated Plan State
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const goals = [
    {
      id: 'Hypertrophy',
      title: 'Hypertrophy & Muscle Growth',
      desc: 'Optimized mechanical tension, 8-12 rep ranges, and pump volume.',
      icon: Dumbbell,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400'
    },
    {
      id: 'Strength',
      title: 'Pure Strength & Power',
      desc: 'Heavy compound loads, neurological adaptation, 3-6 rep ranges.',
      icon: Target,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400'
    },
    {
      id: 'Fat Loss',
      title: 'Fat Loss & Conditioning',
      desc: 'Dense supersets, high metabolic burn, preserving lean muscle mass.',
      icon: Flame,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
    },
    {
      id: 'Endurance',
      title: 'General Fitness & Stamina',
      desc: 'Total work capacity, joint longevity, and functional stamina.',
      icon: Sparkles,
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400'
    }
  ];

  const splits = [
    { name: 'Push/Pull/Legs', desc: 'Separates horizontal/vertical pushing, pulling, and lower body days.' },
    { name: 'Upper/Lower', desc: 'Alternates upper body and lower body for ideal 4-day frequency.' },
    { name: 'Full Body', desc: 'Stimulates every major muscle group 3x per week with high efficiency.' },
    { name: 'Bro Split', desc: 'Focuses on 1-2 specific body parts per session with maximum localized volume.' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSavedSuccess(false);

    try {
      const plan = await api.generateWorkout(formData);
      setGeneratedPlan(plan);
      setStep(3); // Result step
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate workout with Gemini. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWorkout = async () => {
    if (!generatedPlan) return;
    try {
      await api.saveWorkout({
        title: `${generatedPlan.split_name} (${formData.days_per_week} Days)`,
        split_type: formData.split_type,
        exercises: generatedPlan.schedule
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      setError('Failed to save workout: ' + err.message);
    }
  };

  const handleStartActiveWorkout = (daySchedule) => {
    // Pass selected day's workout to the active session tracker via state
    navigate('/workout/active', {
      state: {
        title: `${generatedPlan.split_name} - ${daySchedule.day} (${daySchedule.focus})`,
        exercises: daySchedule.exercises
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Progress Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 glass-panel rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
              step >= 1 ? 'bg-emerald-500 text-black shadow-neon' : 'bg-slate-800 text-slate-400'
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium text-slate-300 hidden sm:inline">Goals & Level</span>
        </div>

        <div className={`h-0.5 flex-1 mx-4 ${step >= 2 ? 'bg-emerald-500/60' : 'bg-slate-800'}`} />

        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
              step >= 2 ? 'bg-emerald-500 text-black shadow-neon' : 'bg-slate-800 text-slate-400'
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium text-slate-300 hidden sm:inline">Split & Equipment</span>
        </div>

        <div className={`h-0.5 flex-1 mx-4 ${step >= 3 ? 'bg-emerald-500/60' : 'bg-slate-800'}`} />

        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
              step >= 3 ? 'bg-emerald-500 text-black shadow-neon' : 'bg-slate-800 text-slate-400'
            }`}
          >
            3
          </div>
          <span className="text-sm font-medium text-slate-300 hidden sm:inline">AI Routine</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Goal & Experience */}
      {step === 1 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-400" />
              Define Your Primary Objective
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              GymGenie AI will engineer volume, mechanical tension, and periodization around your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.map((g) => {
              const Icon = g.icon;
              const selected = formData.primary_goal === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setFormData({ ...formData, primary_goal: g.id })}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    selected
                      ? 'bg-gradient-to-br ' + g.color + ' ring-2 ring-emerald-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-6 h-6 text-emerald-400" />
                    {selected && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <h3 className="font-bold text-white text-base">{g.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{g.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Current Lifting Experience
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                const selected = formData.experience_level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience_level: lvl })}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition ${
                      selected
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm shadow-neon hover:opacity-95 transition"
            >
              Continue to Equipment & Schedule
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Equipment & Split */}
      {step === 2 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-cyan-400" />
              Equipment & Training Logistics
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Tell GymGenie what gear you have and how many days you can train.
            </p>
          </div>

          {/* Equipment Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-200">Equipment Access</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Full Gym', title: 'Full Commercial Gym', desc: 'Barbells, dumbbells, cables, selectorized machines.' },
                { id: 'Dumbbells Only', title: 'Dumbbells & Bench', desc: 'Ideal for home gyms or apartment fitness centers.' },
                { id: 'Bodyweight', title: 'Calisthenics / Minimal', desc: 'Pull-up bar, floor, and body resistance.' }
              ].map((eq) => {
                const selected = formData.equipment_available === eq.id;
                return (
                  <div
                    key={eq.id}
                    onClick={() => setFormData({ ...formData, equipment_available: eq.id })}
                    className={`p-4 rounded-xl cursor-pointer border transition ${
                      selected
                        ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{eq.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{eq.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Split Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-200">Split Style Preference</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {splits.map((s) => {
                const selected = formData.split_type === s.name;
                return (
                  <div
                    key={s.name}
                    onClick={() => setFormData({ ...formData, split_type: s.name })}
                    className={`p-4 rounded-xl cursor-pointer border transition ${
                      selected
                        ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300 ring-1 ring-emerald-400'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{s.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Days Per Week Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-200">Frequency (Days / Week)</label>
              <span className="text-sm font-extrabold text-emerald-400 font-mono">
                {formData.days_per_week} Training Days
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="6"
              value={formData.days_per_week}
              onChange={(e) => setFormData({ ...formData, days_per_week: parseInt(e.target.value) })}
              className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>2 Days (Minimalist)</span>
              <span>4 Days (Balanced)</span>
              <span>6 Days (Intense)</span>
            </div>
          </div>

          {/* Injuries or Limitations */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Injuries or Physical Limitations (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Lower back stiffness, avoiding barbell overhead press, right rotator cuff tweak..."
              value={formData.injuries_limitations}
              onChange={(e) => setFormData({ ...formData, injuries_limitations: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-extrabold text-sm shadow-neon hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  Generating Program with Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  Generate Custom Routine
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Generated Plan Preview & Action */}
      {step === 3 && generatedPlan && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini AI Generated Plan
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {generatedPlan.split_name}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {generatedPlan.overview || 'Engineered for progressive overload and optimal hypertrophy.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveWorkout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
              >
                <BookmarkPlus className="w-4 h-4 text-emerald-400" />
                {savedSuccess ? 'Saved to Profile!' : 'Save Routine'}
              </button>

              <button
                onClick={() => setStep(2)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Daily Schedule List */}
          <div className="space-y-6">
            {generatedPlan.schedule?.map((dayPlan, dayIdx) => (
              <div
                key={dayIdx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-lg"
              >
                {/* Day Header */}
                <div className="px-6 py-4 bg-slate-900/90 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                      {dayPlan.day}
                    </span>
                    <h3 className="text-lg font-bold text-white">{dayPlan.focus}</h3>
                  </div>

                  <button
                    onClick={() => handleStartActiveWorkout(dayPlan)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-neon transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Start This Workout Live
                  </button>
                </div>

                {/* Exercises Table / List */}
                <div className="divide-y divide-slate-800/80">
                  {dayPlan.exercises?.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-5 hover:bg-slate-900/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-md">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center font-mono">
                            {exIdx + 1}
                          </span>
                          <h4 className="font-bold text-white text-base">{ex.name}</h4>
                          {ex.target_muscle && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-cyan-300 font-medium">
                              {ex.target_muscle}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed pl-8">
                          💡 <span className="text-slate-300 font-medium">Coach Cue:</span> {ex.cues}
                        </p>
                      </div>

                      {/* Reps, Sets, Rest Badges */}
                      <div className="flex items-center gap-3 pl-8 md:pl-0">
                        <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[70px]">
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Sets</div>
                          <div className="text-sm font-extrabold text-white font-mono">{ex.sets}</div>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[75px]">
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Reps</div>
                          <div className="text-sm font-extrabold text-emerald-400 font-mono">{ex.rep_range}</div>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[75px]">
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Rest</div>
                          <div className="text-sm font-bold text-cyan-400 font-mono">{ex.rest_seconds}s</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setStep(2)}
              className="text-sm text-slate-400 hover:text-white"
            >
              Modify Constraints & Regenerate
            </button>
            <button
              onClick={() => handleStartActiveWorkout(generatedPlan.schedule[0])}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-sm shadow-neon hover:opacity-95 transition"
            >
              <Play className="w-4 h-4 fill-black" />
              Launch Active Session (Day 1)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
