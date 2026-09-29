import React, { useState } from 'react';
import {
  Apple,
  Droplet,
  Flame,
  Sparkles,
  Coffee,
  Check,
  Plus,
  Minus,
  Utensils,
  Clock,
  Info
} from 'lucide-react';

export const NutritionCard = ({ nutritionData, onRefresh }) => {
  const [waterDrunkMl, setWaterDrunkMl] = useState(2250);
  const targetWaterMl = (nutritionData?.hydration_liters || 3.5) * 1000;

  const data = nutritionData || {
    target_calories: 2600,
    protein_grams: 165,
    carb_grams: 310,
    fat_grams: 65,
    hydration_liters: 3.5,
    chia_seed_water_instructions:
      'Stir 1.5 tablespoons of organic chia seeds into 500ml of water with a squeeze of fresh lemon juice. Allow to rest for 15 minutes to form a hydrophilic gel matrix. Drink 30-45 minutes before lifting to maintain cellular hydration and prevent intra-workout cramping.',
    pre_workout_fuel:
      '30-40g Roasted Chana (Bengal Gram) + 1 medium banana and 200ml black coffee or matcha green tea 45 minutes pre-training.',
    post_workout_recovery:
      '60-70g Rolled Oats cooked with milk/plant milk, stirred with 1 scoop protein powder, sliced berries, and soaked chia seeds.',
    daily_meal_breakdown: [
      {
        meal_name: 'Anabolic Power Breakfast',
        time: '08:00 AM',
        items: 'Warm Rolled Oats Porridge (70g) with low-fat or almond milk, 1 scoop protein powder, topped with soaked chia seeds and sliced banana.',
        macros: '490 kcal | 36g Protein | 64g Carbs | 10g Fats'
      },
      {
        meal_name: 'Mid-Morning Sustained Energy',
        time: '11:00 AM',
        items: 'Crispy Roasted Chana (40g) seasoned with pink rock salt + 500ml fresh lemon chia seed water.',
        macros: '185 kcal | 9g Protein | 25g Carbs | 4g Fats'
      },
      {
        meal_name: 'Performance Lunch',
        time: '01:30 PM',
        items: 'Grilled chicken breast or paneer & spiced tofu (180g), 1 cup steamed brown basmati rice, steamed broccoli, and mixed sprout salad.',
        macros: '560 kcal | 46g Protein | 55g Carbs | 14g Fats'
      },
      {
        meal_name: 'Pre-Workout Energizer',
        time: '05:00 PM',
        items: 'Handful of roasted chana (25g), 1 ripe banana, 1 shot espresso or black coffee.',
        macros: '160 kcal | 5g Protein | 32g Carbs | 2g Fats'
      },
      {
        meal_name: 'Recovery Dinner',
        time: '08:30 PM',
        items: 'Pan-seared fish or rich yellow lentil dal with quinoa or 2 multi-grain rotis, roasted vegetables, and cucumber yogurt raita.',
        macros: '520 kcal | 38g Protein | 48g Carbs | 16g Fats'
      }
    ]
  };

  const addWater = (amount) => {
    setWaterDrunkMl((prev) => Math.max(0, Math.min(6000, prev + amount)));
  };

  const waterPercent = Math.min(100, Math.round((waterDrunkMl / targetWaterMl) * 100));

  return (
    <div className="space-y-6">
      {/* Top Macros Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Calories */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Calories</span>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {data.target_calories} <span className="text-xs text-amber-400 font-sans font-normal">kcal</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-400 h-full w-[85%] rounded-full" />
          </div>
        </div>

        {/* Protein */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Daily Protein</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
            {data.protein_grams} <span className="text-xs text-slate-400 font-sans font-normal">g</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[90%] rounded-full" />
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Complex Carbs</span>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
            {data.carb_grams} <span className="text-xs text-slate-400 font-sans font-normal">g</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-500 h-full w-[75%] rounded-full" />
          </div>
        </div>

        {/* Healthy Fats */}
        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Essential Fats</span>
          <div className="text-2xl font-black text-rose-400 font-mono mt-1">
            {data.fat_grams} <span className="text-xs text-slate-400 font-sans font-normal">g</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-rose-500 h-full w-[65%] rounded-full" />
          </div>
        </div>
      </div>

      {/* HEALTHY DAILY FITNESS STAPLES (Oats, Roasted Chana, Pre-Workout, Chia Hydration) */}
      <div className="glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-8 space-y-6 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-900">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Core Daily Fitness Staples
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Optimized Whole-Food Nutrition Pillars
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            GymGenie incorporates scientifically validated daily staples that sustain workout intensity, prevent energy crashes, and maximize muscle protein synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Staple 1: Rolled Oats */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg font-bold">
                🥣
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Rolled Oats Fuel</h4>
                <span className="text-[11px] text-amber-400 font-medium">Complex Carbs & Beta-Glucan Fiber</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.post_workout_recovery || 'Provides steady glycogen replenishment without insulin spikes. Rich in magnesium and zinc for muscle contraction and hormonal support.'}
            </p>
          </div>

          {/* Staple 2: Roasted Chana */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg font-bold">
                🌰
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Roasted Chana (Bengal Gram)</h4>
                <span className="text-[11px] text-emerald-400 font-medium">Clean Plant Protein & Zero Bloat</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.pre_workout_fuel || 'Crunchy snack packed with 20g protein per 100g and low glycemic index carbohydrates, creating sustained fullness between training blocks.'}
            </p>
          </div>

          {/* Staple 3: Pre-Workout Nutrition Strategy */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg font-bold">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Pre-Workout Fueling Matrix</h4>
                <span className="text-[11px] text-cyan-400 font-medium">Fast-Absorbing Energy & Blood Flow</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consuming 30-40g roasted chana with a ripe banana and black coffee 45 minutes prior boosts adenosine receptor antagonism and nitric oxide delivery to active muscle beds.
            </p>
          </div>

          {/* Staple 4: Chia Seed Hydration Drink */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-blue-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg font-bold">
                💧
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Chia Seed Hydration Protocol</h4>
                <span className="text-[11px] text-blue-400 font-medium">Electrolyte Water & Hydrophilic Gel</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.chia_seed_water_instructions}
            </p>
          </div>
        </div>
      </div>

      {/* Hydration Tracker */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <Droplet className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-white text-base">Daily Hydration Target</h4>
              <span className="text-xs font-mono font-bold text-blue-400">{waterPercent}%</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Current: <span className="text-white font-mono font-bold">{(waterDrunkMl / 1000).toFixed(2)}L</span> / {data.hydration_liters}L
            </p>
            <div className="w-48 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addWater(-250)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Minus 250ml"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => addWater(250)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-extrabold text-xs shadow-cyan transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            +250ml (1 Glass)
          </button>
          <button
            onClick={() => addWater(500)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-xs border border-slate-700 transition"
          >
            +500ml Bottle
          </button>
        </div>
      </div>

      {/* Daily Meal Breakdown */}
      <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-extrabold text-white text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-400" />
              Daily Meal Timing Schedule
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Nutrient timing arranged around your training schedule.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {data.daily_meal_breakdown?.map((meal, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900/90 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    {meal.time}
                  </span>
                  <h5 className="font-bold text-white text-sm">{meal.meal_name}</h5>
                </div>
                <p className="text-xs text-slate-300">{meal.items}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                  {meal.macros}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
