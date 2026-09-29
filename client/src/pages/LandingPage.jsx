import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Dumbbell,
  Timer,
  Apple,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Flame,
  Award,
  Zap,
  Play
} from 'lucide-react';

export const LandingPage = () => {
  const { user, loginAsGuest } = useAuth();

  return (
    <div className="space-y-24 py-8 sm:py-16">
      {/* HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto px-4 space-y-8">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-neon animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Gemini 2.5 Fitness Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
          Architect Your Peak Physique with{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-200 bg-clip-text text-transparent">
            GymGenie AI
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The ultimate AI personal coach and biomechanical analyst. Generate tailored routines,
          receive millimeter-accurate exercise cues, master daily nutrition with wholesome staples,
          and track progressive overload in real time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to={user ? '/workout/generate' : '/signup'}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-extrabold text-base shadow-neon hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5 fill-black" />
            <span>Generate Free AI Workout</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <Link
            to="/workout/active"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl glass-panel hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-emerald-500/40 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Active Workout Tracker</span>
          </Link>
        </div>

        {/* Quick Trust Highlights */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Hallucinations (Strict Zod Validation)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Supabase Row-Level Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Integrated Rest Audio Timers</span>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase font-mono">
            ENGINEERED FOR ELITE ATHLETES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Everything Required for Muscle Hypertrophy & Longevity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI Workout Wizard */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4 hover:border-emerald-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Dynamic AI Workout Wizard</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Input your experience, available equipment (Full Gym, Dumbbells, Bodyweight), and schedule. Gemini generates a balanced split with exact rep ranges, sets, and rest intervals.
            </p>
            <div className="pt-2">
              <Link to="/workout/generate" className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                Try Workout Wizard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Biomechanical Form Cues */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4 hover:border-cyan-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Biomechanical Form Coach</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explore 25+ essential gym movements with step-by-step joint trajectories, safety cues, and injury prevention protocols designed by biomechanics specialists.
            </p>
            <div className="pt-2">
              <Link to="/exercises" className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore Exercise Library <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Whole-Food Nutrition */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4 hover:border-amber-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Apple className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Clean Nutrition & Hydration</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Macro planning featuring scientifically proven fitness staples: rolled oats for sustained glycogen, roasted chana for bloat-free plant protein, and chia seed electrolyte hydration.
            </p>
            <div className="pt-2">
              <Link to="/nutrition" className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                View Nutrition Planner <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
            <Flame className="w-8 h-8 fill-emerald-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Take Your Training to the Next Level?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Join athletes lifting smarter with precision AI routines, rest timer pacing, and validated sports nutrition.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={user ? '/dashboard' : '/signup'}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-sm shadow-neon hover:opacity-95 transition"
            >
              Start Your Free Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
