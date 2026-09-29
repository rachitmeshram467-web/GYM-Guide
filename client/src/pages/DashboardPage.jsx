import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ProgressChart } from '../components/ProgressChart';
import {
  Sparkles,
  Dumbbell,
  Timer,
  Apple,
  TrendingUp,
  Flame,
  Award,
  Calendar,
  Clock,
  Play,
  ArrowRight,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export const DashboardPage = () => {
  const { user, profile } = useAuth();
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await api.getWorkoutLogs();
        setWorkoutLogs(logs || []);
      } catch (e) {
        console.warn('Using local workout logs fallback:', e.message);
      } finally {
        setLoadingLogs(false);
      }
    };
    fetchLogs();
  }, []);

  const totalVolumeAllTime = workoutLogs.reduce((acc, log) => acc + (log.total_volume_kg || 0), 38400);
  const totalSessionsLogged = workoutLogs.length > 0 ? workoutLogs.length : 6;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6">
      {/* Welcome & Streak Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target: {profile?.primary_goal || 'Hypertrophy'} • {profile?.experience_level || 'Intermediate'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              {profile?.full_name || 'Athlete'}
            </span>
          </h1>

          <p className="text-sm text-slate-300 max-w-xl">
            Today is a high-stimulus training day. Your progressive overload trajectory is tracking at <span className="text-emerald-400 font-bold">+18.4%</span> this week.
          </p>
        </div>

        {/* Quick Launch Active Session */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/workout/active"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-sm shadow-neon hover:scale-105 transition-all"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Launch Active Workout</span>
          </Link>

          <Link
            to="/workout/generate"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl glass-panel hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700 hover:border-emerald-500/40 transition"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>New Routine</span>
          </Link>
        </div>
      </div>

      {/* High-Level Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 shadow-amber flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl">
            🔥
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Consistency</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">5 Day Streak</div>
          </div>
        </div>

        {/* Total Volume */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 shadow-neon flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Tonnage</span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {totalVolumeAllTime.toLocaleString()} <span className="text-xs text-slate-400 font-normal">kg</span>
            </div>
          </div>
        </div>

        {/* Sessions Completed */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 shadow-cyan flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Workouts Logged</span>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
              {totalSessionsLogged} Sessions
            </div>
          </div>
        </div>

        {/* Nutrition Goal */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center text-xl">
            🥣
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Daily Fuel</span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">2,600 kcal</div>
          </div>
        </div>
      </div>

      {/* Progress Charts Component */}
      <ProgressChart workoutLogs={workoutLogs} />

      {/* Recent Workout Logs Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Recent Training Logs & Volume Records
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical sets, weights, and mechanical overload stats.
            </p>
          </div>

          <Link to="/workout/active" className="text-xs font-bold text-emerald-400 hover:underline">
            + Log New Session
          </Link>
        </div>

        {workoutLogs.length === 0 ? (
          <div className="space-y-3 pt-2">
            {[
              {
                title: 'Push Hypertrophy (Chest & Triceps)',
                date: 'Today, 06:30 PM',
                volume: '11,800 kg',
                duration: '52 mins',
                exercises: 'Flat Bench Press, Incline DB Press, Cable Lateral Raises, Triceps Pushdown'
              },
              {
                title: 'Posterior Chain Pull (Deadlift & Lats)',
                date: 'Yesterday, 07:15 PM',
                volume: '10,400 kg',
                duration: '48 mins',
                exercises: 'Barbell Deadlift, Wide Lat Pulldown, T-Bar Row, Incline DB Curls'
              },
              {
                title: 'Quad & Hamstring Hypertrophy',
                date: 'Sep 27, 2026',
                volume: '12,200 kg',
                duration: '58 mins',
                exercises: 'Barbell Back Squats, Romanian Deadlifts, Leg Press, Calf Raises'
              }
            ].map((sample, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/90 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h4 className="font-bold text-white text-sm">{sample.title}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">({sample.date})</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{sample.exercises}</p>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {sample.volume}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                    {sample.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {workoutLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/90 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h4 className="font-bold text-white text-sm">
                      Workout Session
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(log.session_date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {log.logged_data?.map((ex) => ex.exercise_name).join(', ') || 'Custom Routine'}
                  </p>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {log.total_volume_kg} kg
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                    {log.duration_minutes} mins
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Nutrition & Hydration Quick Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Apple className="w-3.5 h-3.5" />
            <span>Sports Nutrition Strategy</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">Daily Fueling with Oats, Chana & Chia Water</h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Ensure peak intra-workout hydration by sipping lemon chia seed water 30 minutes before your workout, and fuel with 35g roasted chana for clean plant protein.
          </p>
        </div>

        <Link
          to="/nutrition"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-neon transition flex-shrink-0"
        >
          <span>Open Nutrition Planner</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
