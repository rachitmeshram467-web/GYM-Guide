# GymGenie AI 🏋️‍♂️✨
> **AI-Powered Personal Fitness Coach, Biomechanical Form Analyst & Sports Nutritionist**

A production-grade full-stack fitness application engineered with **React (Vite)**, **Tailwind CSS**, **Node.js + Express.js**, **Google Gemini 2.5 SDK (`@google/genai`)**, and **Supabase PostgreSQL** with Row Level Security (RLS).

---

## 🌟 Key Application Features

1. **AI Workout Generator Wizard (`/workout/generate`)**
   - Multi-step questionnaire collecting experience level, equipment access (Full Gym, Dumbbells, Bodyweight), split preferences (PPL, Upper/Lower, Full Body), frequency, and injuries/limitations.
   - Powered by Gemini 2.5 generating structured routines with sets, rep ranges, rest times, and coaching cues.
   - 1-click action to launch any generated routine directly into the Active Tracker or save to Supabase.

2. **Interactive Active Workout Session Logger (`/workout/active`)**
   - Real-time session tracker recording sets, reps, and weights lifted.
   - Built-in **Rest Countdown Timer** (30s, 60s, 90s, 120s presets + auto-trigger on set completion) with **Audio Beep Feedback** via Web Audio API.
   - Real-time tonnage/volume calculation and completion rate.
   - Saves historical sessions directly to `public.workout_logs`.

3. **Biomechanical Form Coach & Directory (`/exercises`)**
   - 20+ foundational exercises categorized by muscle groups (Chest, Back, Quads, Hamstrings, Glutes, Shoulders, Biceps, Triceps, Calves, Core).
   - "AI Form Coach" modal analyzing joint angles, setup posture, step-by-step execution, common mistakes, and injury prevention safety cues.

4. **Sports Nutrition & Supplement Planner (`/nutrition`)**
   - Caloric and macronutrient calculator tailored for training days vs. rest days.
   - **Core Wholesome Fitness Staples Integrated**:
     - 🥣 **Rolled Oats Porridge**: Complex carbs for sustained glycogen and beta-glucan fiber.
     - 🌰 **Roasted Chana (Bengal Gram)**: High satiety, zero bloat, clean plant protein.
     - ⚡ **Pre-Workout Fueling Matrix**: Fast-absorbing carbs and adenosine antagonism timing.
     - 💧 **Chia Seed Hydration Protocol**: Hydrophilic electrolyte gel water preparation.
   - Interactive daily hydration tracker with 250ml increments and visual fill indicators.

5. **Progress Dashboard (`/dashboard`)**
   - Active streak tracker (🔥 5-Day Streak).
   - Progressive overload volume progression charts and weekly muscle group distribution.
   - Recent workout session history.

6. **Athlete Profile & Biometrics (`/profile`)**
   - Bodyweight, height, age, BMI calculator, fitness goals, and limitations.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **npm**: v9+ or v10+

### 2. Running Locally
Both backend and frontend can be run independently:

```bash
# Start Backend API Server (Port 5001)
cd server
npm start

# Start Frontend Client (Port 5173)
cd ../client
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🗄️ Supabase Database Setup

Your Supabase project URL is pre-configured:
**`https://imqpasfjwsgegpnfrcbw.supabase.co`**

### Step 1: Run Database Schema & RLS Migrations
1. Open the [Supabase SQL Editor](https://supabase.com/dashboard/project/imqpasfjwsgegpnfrcbw/sql).
2. Copy and execute the contents of [`supabase/migrations/20260929_init_gymgenie_schema.sql`](file:///c:/Users/ASUS/Downloads/GYM%20AntiGravity/supabase/migrations/20260929_init_gymgenie_schema.sql).
3. This creates:
   - `public.profiles` (linked to Supabase Auth `auth.users`)
   - `public.workouts`
   - `public.workout_logs`
   - `public.nutrition_plans`
   - Complete Row Level Security (RLS) isolation policies.

### Step 2: Configure Environment Variables
Copy your keys from [Supabase API Settings](https://supabase.com/dashboard/project/imqpasfjwsgegpnfrcbw/settings/api):

In [`client/.env`](file:///c:/Users/ASUS/Downloads/GYM%20AntiGravity/client/.env):
```env
VITE_SUPABASE_URL=https://imqpasfjwsgegpnfrcbw.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_BASE_URL=http://localhost:5001/api
```

In [`server/.env`](file:///c:/Users/ASUS/Downloads/GYM%20AntiGravity/server/.env):
```env
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

SUPABASE_URL=https://imqpasfjwsgegpnfrcbw.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

GEMINI_API_KEY=your-google-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash.
```

> **Note**: In development or demo mode before API keys are added, GymGenie includes an intelligent fallback generator and 1-click Demo Athlete mode so that all features, workout generation, form cues, and session logging work immediately!

---

## 📂 Project Structure

```text
GYM AntiGravity/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with logo, streak, mobile drawer
│   │   │   ├── AuthGuard.jsx       # Protected route wrapper
│   │   │   ├── WorkoutWizard.jsx   # Multi-step AI generator form
│   │   │   ├── ExerciseCard.jsx    # Card with AI Form Coach modal
│   │   │   ├── ActiveTracker.jsx   # Set/rep logger + rest audio timer
│   │   │   ├── NutritionCard.jsx   # Macros, oats, chana, chia water
│   │   │   └── ProgressChart.jsx   # Progressive overload SVG chart
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # High-conversion marketing view
│   │   │   ├── LoginPage.jsx       # Supabase email auth + 1-click Demo
│   │   │   ├── SignupPage.jsx      # Profile onboarding registration
│   │   │   ├── DashboardPage.jsx   # Streak, HUD, history, quick launch
│   │   │   ├── WorkoutGeneratePage.jsx
│   │   │   ├── ActiveWorkoutPage.jsx
│   │   │   ├── ExercisesPage.jsx   # Muscle group filter & search
│   │   │   ├── NutritionPage.jsx   # Macro calculator & diet advisor
│   │   │   └── ProfilePage.jsx     # Biometrics & BMI calculator
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state & session listener
│   │   ├── services/
│   │   │   ├── api.js              # REST endpoints client
│   │   │   └── supabase.js         # Supabase client initialization
│   │   ├── data/
│   │   │   └── defaultExercises.js # 20+ gym exercise database
│   │   ├── App.jsx                 # Routing configuration
│   │   ├── main.jsx
│   │   └── index.css               # Dark theme & glassmorphic tokens
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── controllers/
│   │   ├── aiController.js         # Workout, form, nutrition endpoints
│   │   └── workoutController.js    # Workouts, logs, profiles CRUD
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── workoutRoutes.js
│   ├── middleware/
│   │   ├── auth.js                 # Supabase JWT token verification
│   │   └── rateLimiter.js          # Express rate limiter
│   ├── services/
│   │   └── gemini.js               # @google/genai SDK + smart fallback
│   ├── db/
│   │   └── supabase.js             # Supabase server client
│   ├── schemas/
│   │   └── validation.js           # Strict Zod schemas
│   ├── server.js                   # Express entrypoint
│   └── package.json
├── supabase/
│   └── migrations/
│       └── 20260929_init_gymgenie_schema.sql # PostgreSQL DDL + RLS
├── package.json                    # Workspace root scripts
└── README.md
```
