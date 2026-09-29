import React from 'react';
import { ActiveTracker } from '../components/ActiveTracker';

export const ActiveWorkoutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Active Workout Session Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Record your working sets, reps, and weights lifted. Rest timers trigger automatically on set completion.
        </p>
      </div>

      <ActiveTracker />
    </div>
  );
};
