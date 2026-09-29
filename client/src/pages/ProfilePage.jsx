import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Save,
  LogOut,
  Dumbbell,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Heart,
  Scale
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, profile, updateProfile, signOut } = useAuth();

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || 'GymGenie Athlete',
    age: profile?.age || 26,
    weight_kg: profile?.weight_kg || 76.5,
    height_cm: profile?.height_cm || 178,
    gender: profile?.gender || 'Male',
    experience_level: profile?.experience_level || 'Intermediate',
    primary_goal: profile?.primary_goal || 'Hypertrophy',
    equipment_access: profile?.equipment_access || 'Full Gym',
    injuries_limitations: profile?.injuries_limitations || ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculate BMI: weight / (height_m ^ 2)
  const heightM = (formData.height_cm || 175) / 100;
  const bmi = heightM > 0 ? (formData.weight_kg / (heightM * heightM)).toFixed(1) : 23.5;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Profile Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-neon">
            {formData.full_name?.charAt(0) || 'A'}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{formData.full_name}</h1>
            <p className="text-xs text-slate-400 font-mono">{user?.email || 'athlete@gymgenie.ai'}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                {formData.experience_level}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30">
                {formData.primary_goal}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={signOut}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-rose-500/30 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Biometrics & BMI Quick Glance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Bodyweight</span>
          <div className="text-xl font-black text-white font-mono mt-1">{formData.weight_kg} kg</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Height</span>
          <div className="text-xl font-black text-white font-mono mt-1">{formData.height_cm} cm</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Body Mass Index</span>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">{bmi} BMI</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Lifting Status</span>
          <div className="text-xl font-black text-cyan-400 font-mono mt-1">Active</div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Biometric Parameters & Training Preferences
        </h3>

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Profile preferences successfully updated!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Bodyweight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight_kg}
              onChange={(e) => setFormData({ ...formData, weight_kg: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Height (cm)</label>
            <input
              type="number"
              value={formData.height_cm}
              onChange={(e) => setFormData({ ...formData, height_cm: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Experience Level</label>
            <select
              value={formData.experience_level}
              onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Beginner">Beginner (0-6 months)</option>
              <option value="Intermediate">Intermediate (6 months - 2 years)</option>
              <option value="Advanced">Advanced (2+ years)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Primary Objective</label>
            <select
              value={formData.primary_goal}
              onChange={(e) => setFormData({ ...formData, primary_goal: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Hypertrophy">Muscle Hypertrophy</option>
              <option value="Strength">Maximal Strength</option>
              <option value="Fat Loss">Fat Loss & Definition</option>
              <option value="Endurance">General Conditioning</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">Equipment Access</label>
            <select
              value={formData.equipment_access}
              onChange={(e) => setFormData({ ...formData, equipment_access: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Full Gym">Full Commercial Gym (Barbells, Dumbbells, Cables, Machines)</option>
              <option value="Dumbbells Only">Dumbbells & Adjustable Bench</option>
              <option value="Bodyweight">Bodyweight / Calisthenics Only</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">
              Joint Sensitivities or Injuries
            </label>
            <input
              type="text"
              placeholder="e.g. Mild lumbar tightness, avoid overhead barbell presses"
              value={formData.injuries_limitations}
              onChange={(e) => setFormData({ ...formData, injuries_limitations: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-sm shadow-neon hover:opacity-95 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
