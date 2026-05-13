import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MealPlan() {
  const navigate = useNavigate()
  const [activeDay, setActiveDay] = useState(0)

  const days = [
    { day: 'Monday', kcal: 1470, macros: { p: '95g', c: '150g', f: '45g' }, meals: [{ type: 'Breakfast', food: 'Oats + Banana + Milk', cal: 320, tag: 'High Protein' }, { type: 'Lunch', food: 'Dal + Rice + Salad', cal: 580, tag: 'Balanced' }, { type: 'Snack', food: 'Roasted Chana + Green Tea', cal: 120, tag: 'Light' }, { type: 'Dinner', food: 'Roti + Sabzi + Curd', cal: 450, tag: 'Healthy' }] },
    { day: 'Tuesday', kcal: 1450, macros: { p: '88g', c: '160g', f: '40g' }, meals: [{ type: 'Breakfast', food: 'Poha + Sprouts', cal: 280, tag: 'Light' }, { type: 'Lunch', food: 'Paneer Sabzi + Roti', cal: 620, tag: 'High Protein' }, { type: 'Snack', food: 'Fruits + Nuts', cal: 150, tag: 'Healthy' }, { type: 'Dinner', food: 'Khichdi + Dahi', cal: 400, tag: 'Light' }] },
    { day: 'Wednesday', kcal: 1420, macros: { p: '92g', c: '145g', f: '42g' }, meals: [{ type: 'Breakfast', food: 'Idli + Sambar', cal: 300, tag: 'Balanced' }, { type: 'Lunch', food: 'Rajma + Rice', cal: 600, tag: 'High Protein' }, { type: 'Snack', food: 'Buttermilk + Biscuits', cal: 100, tag: 'Light' }, { type: 'Dinner', food: 'Moong Dal + Roti', cal: 420, tag: 'Healthy' }] },
    { day: 'Thursday', kcal: 1490, macros: { p: '110g', c: '140g', f: '50g' }, meals: [{ type: 'Breakfast', food: 'Egg Bhurji + Toast', cal: 350, tag: 'High Protein' }, { type: 'Lunch', food: 'Chicken Curry + Rice', cal: 650, tag: 'High Protein' }, { type: 'Snack', food: 'Green Tea + Biscuit', cal: 90, tag: 'Light' }, { type: 'Dinner', food: 'Sabzi + Roti', cal: 400, tag: 'Healthy' }] },
  ]

  const mealIcons = { Breakfast: '🌅', Lunch: '☀️', Snack: '🍎', Dinner: '🌙' }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      
      {/* GLOSSY NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors font-bold text-sm">
          <span>←</span> Dashboard
        </button>
        <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">Weekly Regimen</span>
        <div className="w-8 h-8 bg-emerald-50 rounded-lg" /> {/* Spacer */}
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-10">
        
        {/* PREMIUM PLAN HEADER */}
        <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-2">Weight Loss Strategy</h1>
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-6">Verified by NutriAI Engine</p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { label: 'Avg Kcal', val: '1,470' },
                { label: 'Diet Type', val: 'Non-Veg' },
                { label: 'Protein', val: 'High' }
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-[10px] text-slate-400 font-black uppercase mb-1">{stat.label}</div>
                  <div className="text-lg font-bold">{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DAY SELECTOR TABS */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeDay === i 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 scale-105' 
                : 'bg-white text-slate-400 hover:text-slate-600'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>

        {/* ACTIVE DAY DETAILS */}
        <div className="space-y-4 animate-in">
          {/* Day Macro Summary */}
          <div className="flex justify-between items-center bg-white border border-slate-100 p-6 rounded-[24px] mb-6">
            <div className="text-sm font-black text-slate-800 uppercase tracking-widest">Macro Breakdown</div>
            <div className="flex gap-4">
              {Object.entries(days[activeDay].macros).map(([key, val]) => (
                <div key={key} className="text-center">
                  <div className="text-xs font-bold text-slate-900">{val}</div>
                  <div className="text-[8px] font-black uppercase text-slate-400">{key === 'p' ? 'Prot' : key === 'c' ? 'Carb' : 'Fat'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MEAL LIST */}
          {days[activeDay].meals.map((meal, mi) => (
            <div key={mi} className="bg-white border border-slate-100 rounded-[28px] p-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-emerald-50 transition-colors">
                  {mealIcons[meal.type]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{meal.type}</span>
                    <span className="text-sm font-black text-slate-700">{meal.cal} kcal</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{meal.food}</div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500 uppercase">
                      {meal.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI CTA */}
        <div className="mt-12 bg-emerald-50 rounded-[32px] p-8 border-2 border-dashed border-emerald-200 text-center">
          <h3 className="text-xl font-black text-slate-900 mb-2">Not feeling these options?</h3>
          <p className="text-slate-500 text-sm mb-6">Our AI can swap any meal or regenerate the entire week based on what's in your fridge.</p>
          <button 
            onClick={() => navigate('/consultation')}
            className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95"
          >
            Ask AI to Re-balance →
          </button>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  )
}

export default MealPlan