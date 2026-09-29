import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Dumbbell,
  Sparkles,
  Award,
  Flame,
  ArrowRight,
  Save,
  Clock,
  ChevronDown
} from 'lucide-react';

export const ActiveTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If passed from WorkoutWizard or default sample
  const initialWorkout = location.state || {
    title: 'Push Hypertrophy Session',
    exercises: [
      { name: 'Barbell Bench Press', target_muscle: 'Chest', sets: 4, rep_range: '6-8', rest_seconds: 90 },
      { name: 'Incline Dumbbell Press', target_muscle: 'Upper Chest', sets: 3, rep_range: '8-10', rest_seconds: 90 },
      { name: 'Standing Overhead Dumbbell Press', target_muscle: 'Shoulders', sets: 3, rep_range: '8-10', rest_seconds: 90 },
      { name: 'Cable Lateral Raises', target_muscle: 'Lateral Delts', sets: 4, rep_range: '12-15', rest_seconds: 60 },
      { name: 'Triceps Rope Pushdowns', target_muscle: 'Triceps', sets: 3, rep_range: '10-12', rest_seconds: 60 }
    ]
  };

  // Workout state
  const [workoutTitle, setWorkoutTitle] = useState(initialWorkout.title);
  const [exercises, setExercises] = useState(() => {
    return initialWorkout.exercises.map((ex, exIdx) => ({
      id: 'ex-' + exIdx,
      name: ex.name,
      target_muscle: ex.target_muscle || 'General',
      rest_seconds: ex.rest_seconds || 90,
      sets: Array.from({ length: ex.sets || 3 }).map((_, sIdx) => ({
        set_number: sIdx + 1,
        weight_kg: sIdx === 0 ? 60 : 65,
        reps: 8,
        completed: false
      }))
    }));
  });

  const [sessionNotes, setSessionNotes] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);

  // Rest Timer State
  const [restDuration, setRestDuration] = useState(90);
  const [restRemaining, setRestRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);

  // Finish Modal State
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Audio Context for Rest Timer Beep
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.warn('Audio feedback not available');
    }
  };

  // Workout Session Elapsed Timer
  useEffect(() => {
    let interval = null;
    if (isSessionActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  // Rest Countdown Timer
  useEffect(() => {
    let timer = null;
    if (isResting && restRemaining > 0) {
      timer = setInterval(() => {
        setRestRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResting(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResting, restRemaining]);

  // Format Seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // Start Rest Timer
  const triggerRestTimer = (seconds) => {
    const time = seconds || restDuration;
    setRestRemaining(time);
    setIsResting(true);
  };

  // Toggle Set Complete
  const toggleSetComplete = (exIdx, setIdx) => {
    setExercises((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const targetSet = clone[exIdx].sets[setIdx];
      const willBeCompleted = !targetSet.completed;
      targetSet.completed = willBeCompleted;

      // Auto-trigger rest timer on completion
      if (willBeCompleted) {
        triggerRestTimer(clone[exIdx].rest_seconds || 90);
      }
      return clone;
    });
  };

  // Update Set Value
  const updateSetValue = (exIdx, setIdx, field, val) => {
    setExercises((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      clone[exIdx].sets[setIdx][field] = Number(val) || 0;
      return clone;
    });
  };

  // Add Set to Exercise
  const addSet = (exIdx) => {
    setExercises((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const curSets = clone[exIdx].sets;
      const lastSet = curSets[curSets.length - 1] || { weight_kg: 50, reps: 10 };
      curSets.push({
        set_number: curSets.length + 1,
        weight_kg: lastSet.weight_kg,
        reps: lastSet.reps,
        completed: false
      });
      return clone;
    });
  };

  // Remove Set
  const removeSet = (exIdx, setIdx) => {
    setExercises((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      clone[exIdx].sets.splice(setIdx, 1);
      // re-index
      clone[exIdx].sets.forEach((s, idx) => {
        s.set_number = idx + 1;
      });
      return clone;
    });
  };

  // Add Exercise to Session
  const addNewExercise = () => {
    const newEx = {
      id: 'ex-' + Date.now(),
      name: 'Cable Tricep Pushdown',
      target_muscle: 'Triceps',
      rest_seconds: 60,
      sets: [
        { set_number: 1, weight_kg: 25, reps: 12, completed: false },
        { set_number: 2, weight_kg: 30, reps: 10, completed: false }
      ]
    };
    setExercises([...exercises, newEx]);
  };

  // Calculate Total Volume
  const calculateTotalVolume = () => {
    let total = 0;
    exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        if (set.completed) {
          total += (set.weight_kg || 0) * (set.reps || 0);
        }
      });
    });
    return total;
  };

  // Calculate Total Completed Sets
  const calculateCompletedSets = () => {
    let count = 0;
    exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        if (set.completed) count++;
      });
    });
    return count;
  };

  // Total Sets Available
  const calculateTotalSets = () => {
    let count = 0;
    exercises.forEach((ex) => {
      count += ex.sets.length;
    });
    return count;
  };

  // Save Session to Database
  const handleSaveSession = async () => {
    setSaving(true);
    try {
      const payload = {
        session_date: new Date().toISOString(),
        notes: sessionNotes,
        duration_minutes: Math.max(1, Math.round(elapsedSeconds / 60)),
        logged_data: exercises.map((ex) => ({
          exercise_name: ex.name,
          target_muscle: ex.target_muscle,
          sets: ex.sets
        }))
      };

      await api.logWorkout(payload);
      setSaveSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to log workout session: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const totalVolume = calculateTotalVolume();
  const completedSets = calculateCompletedSets();
  const totalSets = calculateTotalSets();
  const completionPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Session Bar (Sticky) */}
      <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/10 sticky top-20 z-40 shadow-xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        {/* Title and status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Dumbbell className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
              {workoutTitle}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(elapsedSeconds)}
              </span>
              <span>•</span>
              <span>{completedSets} of {totalSets} Sets Completed</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Pause / Resume Session */}
          <button
            onClick={() => setIsSessionActive(!isSessionActive)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title={isSessionActive ? 'Pause Session' : 'Resume Session'}
          >
            {isSessionActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Finish Workout Button */}
          <button
            onClick={() => setFinishModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-xs sm:text-sm shadow-neon hover:opacity-95 transition"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            Finish & Log
          </button>
        </div>
      </div>

      {/* Stats Quick HUD */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Volume</span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
            {totalVolume.toLocaleString()} <span className="text-xs text-emerald-400 font-sans font-normal">kg</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Completion</span>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-0.5">
            {completionPercent}%
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Active Time</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5">
            {Math.floor(elapsedSeconds / 60)} <span className="text-xs text-slate-400 font-sans font-normal">min</span>
          </div>
        </div>
      </div>

      {/* Floating Rest Timer Widget (When Active or triggered) */}
      {isResting && (
        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/40 bg-gradient-to-r from-cyan-950/50 to-slate-900/90 shadow-cyan flex flex-wrap items-center justify-between gap-4 animate-glow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono font-black text-lg">
              {restRemaining}s
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Rest Timer Active</div>
              <p className="text-xs text-slate-300">Recover ATP, hydrate, and prepare for the next set.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRestRemaining((prev) => prev + 15)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              +15s
            </button>
            <button
              onClick={() => {
                setIsResting(false);
                setRestRemaining(0);
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold shadow-sm"
            >
              Skip Rest
            </button>
          </div>
        </div>
      )}

      {/* Exercises List */}
      <div className="space-y-6">
        {exercises.map((ex, exIdx) => (
          <div
            key={ex.id || exIdx}
            className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-lg"
          >
            {/* Exercise Header */}
            <div className="px-6 py-4 bg-slate-900/90 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center font-mono">
                  {exIdx + 1}
                </span>
                <div>
                  <h3 className="font-extrabold text-white text-base sm:text-lg">{ex.name}</h3>
                  <span className="text-[11px] text-emerald-400 font-medium">{ex.target_muscle}</span>
                </div>
              </div>

              {/* Rest timer quick trigger for this exercise */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerRestTimer(ex.rest_seconds || 90)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono"
                  title="Trigger Rest Timer"
                >
                  <Timer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ex.rest_seconds || 90}s Rest</span>
                </button>
              </div>
            </div>

            {/* Set Table */}
            <div className="p-4 sm:p-6 space-y-3">
              {/* Header row */}
              <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                <div className="col-span-2 sm:col-span-2">Set</div>
                <div className="col-span-4 sm:col-span-3">Weight (kg)</div>
                <div className="col-span-4 sm:col-span-3">Reps</div>
                <div className="col-span-2 sm:col-span-4 text-center">Status</div>
              </div>

              {/* Set rows */}
              {ex.sets.map((set, setIdx) => {
                const isCompleted = set.completed;
                return (
                  <div
                    key={setIdx}
                    className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/70'
                    }`}
                  >
                    {/* Set Number */}
                    <div className="col-span-2 sm:col-span-2 font-mono font-bold text-sm text-slate-300 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
                        {set.set_number}
                      </span>
                    </div>

                    {/* Weight Input */}
                    <div className="col-span-4 sm:col-span-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={set.weight_kg}
                          onChange={(e) => updateSetValue(exIdx, setIdx, 'weight_kg', e.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-bold font-mono text-white focus:outline-none focus:border-emerald-400 text-center"
                        />
                      </div>
                    </div>

                    {/* Reps Input */}
                    <div className="col-span-4 sm:col-span-3">
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSetValue(exIdx, setIdx, 'reps', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm font-bold font-mono text-white focus:outline-none focus:border-emerald-400 text-center"
                      />
                    </div>

                    {/* Completion Checkmark */}
                    <div className="col-span-2 sm:col-span-4 flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleSetComplete(exIdx, setIdx)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-emerald-500 text-black shadow-neon scale-105'
                            : 'bg-slate-800 text-slate-500 hover:text-white hover:bg-slate-700 border border-slate-700'
                        }`}
                        title={isCompleted ? 'Mark set incomplete' : 'Mark set complete'}
                      >
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      {ex.sets.length > 1 && (
                        <button
                          onClick={() => removeSet(exIdx, setIdx)}
                          className="hidden sm:block p-1 text-slate-500 hover:text-rose-400 transition"
                          title="Delete set"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add Set Button */}
              <div className="pt-2">
                <button
                  onClick={() => addSet(exIdx)}
                  className="w-full py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-dashed border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Set to {ex.name}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Exercise */}
        <button
          onClick={addNewExercise}
          className="w-full py-4 rounded-3xl bg-slate-900/40 hover:bg-slate-900/80 border-2 border-dashed border-slate-800 hover:border-emerald-500/40 text-sm font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          Add Another Exercise to This Session
        </button>
      </div>

      {/* Workout Notes */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Session Reflection & Biofeedback Notes
        </label>
        <textarea
          rows={2}
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          placeholder="e.g. Great pump on bench press. Increased working weight by 2.5kg. Rest periods felt adequate."
          className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Finish Workout Summary Modal */}
      {finishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl bg-[#0c1017]">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto text-black shadow-neon">
                <Award className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-white">Workout Complete!</h3>
              <p className="text-xs text-slate-400">
                Outstanding dedication. Here are your performance metrics:
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tonnage Lifted</span>
                <div className="text-lg font-extrabold text-emerald-400 font-mono">{totalVolume} kg</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Duration</span>
                <div className="text-lg font-extrabold text-cyan-400 font-mono">
                  {Math.round(elapsedSeconds / 60)} mins
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Sets Logged</span>
                <div className="text-lg font-extrabold text-white font-mono">{completedSets} sets</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Overload Score</span>
                <div className="text-lg font-extrabold text-amber-400 font-mono">9.8 / 10</div>
              </div>
            </div>

            {saveSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-center text-sm font-bold">
                ✓ Logged successfully to Supabase! Redirecting to Dashboard...
              </div>
            ) : (
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setFinishModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Return to Edit
                </button>
                <button
                  onClick={handleSaveSession}
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs font-extrabold shadow-neon hover:opacity-95 transition"
                >
                  {saving ? 'Saving...' : 'Save to History'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
