import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthGuard } from './components/AuthGuard';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkoutGeneratePage } from './pages/WorkoutGeneratePage';
import { ActiveWorkoutPage } from './pages/ActiveWorkoutPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { NutritionPage } from './pages/NutritionPage';
import { ProfilePage } from './pages/ProfilePage';

import { Dumbbell, Heart, Sparkles } from 'lucide-react';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <DashboardPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/workout/generate"
                element={
                  <AuthGuard>
                    <WorkoutGeneratePage />
                  </AuthGuard>
                }
              />
              <Route
                path="/workout/active"
                element={
                  <AuthGuard>
                    <ActiveWorkoutPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-white/5 bg-[#0a0d14] py-8 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Dumbbell className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-slate-300">GymGenie AI</span>
                <span>• AI-Powered Personal Fitness Coach</span>
              </div>

              <div className="flex items-center gap-6">
                <span>Powered by @google/genai SDK</span>
                <span>Supabase PostgreSQL + RLS</span>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
