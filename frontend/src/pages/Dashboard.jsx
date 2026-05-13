import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Siddh Jain' }

  // BMI Logic remains same but UI is upgraded
  const [bmi, setBmi] = useState({ w: 60, h: 165, a: 20 })
  const [bmiResult, setBmiResult] = useState({ val: 22.0, cat: 'Normal', pct: 38, color: 'text-emerald-500' })
  const [streakLogged, setStreakLogged] = useState(false)

  const calcBMI = () => {
    const val = bmi.w / ((bmi.h / 100) ** 2)
    const b = Math.round(val * 10) / 10
    let cat, color
    if (b < 18.5) { cat = 'Underweight'; color = 'text-blue-400' }
    else if (b < 25) { cat = 'Normal'; color = 'text-emerald-500' }
    else if (b < 30) { cat = 'Overweight'; color = 'text-orange-400' }
    else { cat = 'Obese'; color = 'text-rose-500' }
    setBmiResult({ val: b.toFixed(1), cat, color })
  }

  const metrics = [
    { label: 'Energy', value: '1,340', unit: 'kcal', target: '1,800', color: 'bg-orange-500', pct: 74, icon: '🔥' },
    { label: 'Protein', value: '68', unit: 'g', target: '90', color: 'bg-blue-500', pct: 75, icon: '💪' },
    { label: 'Hydration', value: '1.8', unit: 'L', target: '2.5', color: 'bg-cyan-500', pct: 72, icon: '💧' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-12">
      
      {/* PREMIUM NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform">
              <span className="text-lg">🥗</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-800">NutriAI</span>
          </div>
          
          <div className="hidden md:flex bg-slate-100 p-1 rounded-2xl gap-1">
            {[['Insights', '/dashboard'], ['Meal Plan', '/mealplan'], ['AI Consultant', '/consultation']].map(([label, path]) => (
              <button 
                key={label} 
                onClick={() => navigate(path)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${path === '/dashboard' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-800">{user.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-emerald-500 font-black">Pro Member</div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
              {user.name?.charAt(0)}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-slate-500 font-medium mt-1">You're <span className="text-emerald-600 font-bold">85%</span> through your weekly fitness goal. Keep it up!</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setStreakLogged(true)} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                {streakLogged ? '✅ Logged' : '快速 Log Meal +'}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: MAIN METRICS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* BIG METRICS BENTO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((m, i) => (
                <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</span>
                   </div>
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">{m.value}</span>
                      <span className="text-slate-400 font-bold text-sm">{m.unit}</span>
                   </div>
                   <p className="text-xs font-medium text-slate-400 mt-1">Goal: {m.target} {m.unit}</p>
                   <div className="h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full transition-all duration-1000 group-hover:opacity-80`} style={{ width: `${m.pct}%` }} />
                   </div>
                </div>
              ))}
            </div>

            {/* MEAL PREVIEW & AI INSIGHT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center justify-between">
                    Today's Meals 
                    <span className="text-xs font-bold text-emerald-500 cursor-pointer">+ Add</span>
                  </h3>
                  <div className="space-y-6">
                    {[
                      { name: 'Oats with Banana', cal: '320', time: '08:30 AM', icon: '🥣' },
                      { name: 'Dal Rice & Salad', cal: '580', time: '01:45 PM', icon: '🍱' },
                      { name: 'Greek Yogurt', cal: '140', time: '05:00 PM', icon: '🥛' },
                    ].map((meal, idx) => (
                      <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-emerald-50 transition-colors">
                          {meal.icon}
                        </div>
                        <div className="flex-1">
                           <div className="text-sm font-bold text-slate-800">{meal.name}</div>
                           <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{meal.time}</div>
                        </div>
                        <div className="text-sm font-black text-slate-700">{meal.cal} kcal</div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full mb-6">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">AI Health Insight</span>
                    </div>
                    <p className="text-lg font-medium leading-relaxed text-emerald-50">
                      "You're a bit low on <span className="text-emerald-400 font-bold underline">Protein</span> today. Adding 2 boiled eggs or a bowl of Dal to your dinner will hit your 90g target perfectly!"
                    </p>
                  </div>
                  <button onClick={() => navigate('/consultation')} className="mt-8 w-full bg-white text-slate-900 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-colors">
                    Ask Consultant →
                  </button>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR TOOLS */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* STREAK CARD */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-100">
               <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Consistency Score</div>
               <div className="text-5xl font-black mb-4">18 <span className="text-2xl font-medium opacity-80 italic underline decoration-2 underline-offset-4">days</span> 🔥</div>
               <div className="grid grid-cols-7 gap-2">
                 {['M','T','W','T','F','S','S'].map((d, i) => (
                   <div key={i} className={`h-10 rounded-xl flex items-center justify-center text-xs font-black ${i === 5 ? 'bg-white text-emerald-600' : 'bg-white/20 text-white'}`}>
                     {d}
                   </div>
                 ))}
               </div>
            </div>

            {/* UPGRADED BMI CALCULATOR */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-6">Body Metrics</h3>
              <div className="space-y-4 mb-6">
                {[['Weight (kg)', 'w'], ['Height (cm)', 'h']].map(([lbl, key]) => (
                  <div key={key}>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">{lbl}</label>
                    <input 
                      type="number" 
                      value={bmi[key]}
                      onChange={e => setBmi({ ...bmi, [key]: parseFloat(e.target.value) })}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl px-4 py-3 outline-none font-bold transition-all"
                    />
                  </div>
                ))}
              </div>
              
              <button onClick={calcBMI} className="w-full bg-slate-100 text-slate-600 py-3 rounded-2xl font-bold hover:bg-emerald-500 hover:text-white transition-all mb-6">
                Update BMI
              </button>

              <div className="text-center p-6 bg-slate-50 rounded-[24px]">
                <div className={`text-5xl font-black tracking-tighter ${bmiResult.color}`}>{bmiResult.val}</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">{bmiResult.cat}</div>
                
                {/* Visual Gauge */}
                <div className="mt-4 flex h-1.5 rounded-full overflow-hidden bg-slate-200">
                  <div className="w-[20%] bg-blue-400" />
                  <div className="w-[30%] bg-emerald-500" />
                  <div className="w-[25%] bg-orange-400" />
                  <div className="w-[25%] bg-rose-500" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        main { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  )
}

export default Dashboard