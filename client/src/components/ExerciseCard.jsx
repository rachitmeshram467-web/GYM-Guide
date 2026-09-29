import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Dumbbell,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  X,
  RefreshCw,
  Flame
} from 'lucide-react';

export const ExerciseCard = ({ exercise, onSelectForWorkout }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formGuide, setFormGuide] = useState(null);
  const [error, setError] = useState('');

  const handleOpenAiCoach = async () => {
    setModalOpen(true);
    if (formGuide) return; // Cached

    setLoading(true);
    setError('');
    try {
      const guide = await api.getFormGuide(exercise.name, exercise.difficulty);
      setFormGuide(guide);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate biomechanical cues with Gemini.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'Advanced':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <>
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between group">
        <div className="space-y-3">
          {/* Top badges */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 font-mono uppercase tracking-wider">
              {exercise.muscle}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-extrabold text-white text-lg group-hover:text-emerald-300 transition-colors">
              {exercise.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {exercise.description}
            </p>
          </div>

          {/* Quick Coach Cue */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Biomechanical Cue</span>
            </div>
            <p className="line-clamp-2 text-slate-400">{exercise.cues}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={handleOpenAiCoach}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-emerald-500/40 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Form Guide</span>
          </button>

          {onSelectForWorkout && (
            <button
              onClick={() => onSelectForWorkout(exercise)}
              className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/40 transition"
              title="Add to Active Session"
            >
              <Dumbbell className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* AI Form Coach Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-2xl bg-[#0c1017]">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold font-mono">
                  <Sparkles className="w-3 h-3" />
                  GEMINI BIOMECHANICS COACH
                </div>
                <h2 className="text-2xl font-black text-white">{exercise.name}</h2>
                <p className="text-xs text-slate-400">
                  Target: <span className="text-emerald-400 font-semibold">{exercise.muscle}</span> | Equipment: {exercise.equipment}
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            {loading && (
              <div className="py-16 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-sm text-slate-300 font-mono tracking-wider">
                  Analyzing joint angles & muscle recruitment vectors...
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                {error}
              </div>
            )}

            {formGuide && !loading && (
              <div className="space-y-5 text-sm">
                {/* Muscular Recruitment */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Muscle Anatomy Focus
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs">
                      Primary: {formGuide.primary_muscle}
                    </span>
                    {formGuide.secondary_muscles?.map((sec, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs">
                        Secondary: {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Setup */}
                <div className="space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Biomechanical Setup & Posture
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                    {formGuide.setup}
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    Execution & Movement Path
                  </h4>
                  <ol className="space-y-2">
                    {formGuide.execution?.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 font-mono mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Common Mistakes */}
                <div className="space-y-2">
                  <h4 className="font-bold text-rose-400 flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Common Pitfalls & Injury Risks
                  </h4>
                  <ul className="space-y-1.5">
                    {formGuide.common_mistakes?.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Cues */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Elite Safety Protocols
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-300">
                    {formGuide.safety_cues?.map((cue, idx) => (
                      <li key={idx}>{cue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
