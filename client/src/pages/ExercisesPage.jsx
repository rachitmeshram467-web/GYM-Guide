import React, { useState } from 'react';
import { DEFAULT_EXERCISES } from '../data/defaultExercises';
import { ExerciseCard } from '../components/ExerciseCard';
import {
  Search,
  Dumbbell,
  Sparkles,
  Filter,
  Check
} from 'lucide-react';

export const ExercisesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');

  const muscleCategories = [
    'All',
    'Chest',
    'Back',
    'Quads',
    'Hamstrings',
    'Glutes',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Core',
    'Calves'
  ];

  const filteredExercises = DEFAULT_EXERCISES.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMuscle = selectedMuscle === 'All' || ex.muscle.toLowerCase() === selectedMuscle.toLowerCase();

    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biomechanical Anatomy & Form Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Exercise Directory & AI Technique Coach
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Master the compound and isolation movements that form the foundation of hypertrophic success.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises, barbells, cables..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 shadow-sm"
          />
        </div>
      </div>

      {/* Muscle Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {muscleCategories.map((muscle) => {
          const isSelected = selectedMuscle === muscle;
          return (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-black shadow-neon'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {muscle}
            </button>
          );
        })}
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-16 glass-panel rounded-3xl border border-white/10 p-8 space-y-3">
          <Dumbbell className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No exercises found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or switching muscle group filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMuscle('All');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/30 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
