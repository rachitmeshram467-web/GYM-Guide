import React from 'react';
import { WorkoutWizard } from '../components/WorkoutWizard';
import { Sparkles } from 'lucide-react';

export const WorkoutGeneratePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google Gemini 2.5 SDK Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Workout Routine Generator
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Tailored volume, mechanical tension, and periodization built around your schedule, equipment, and biometrics.
        </p>
      </div>

      <WorkoutWizard />
    </div>
  );
};
