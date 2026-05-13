import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Siddh Jain' }

  const [bmi, setBmi] = useState({ w: 60, h: 165, a: 20 })
  const [bmiResult, setBmiResult] = useState({ val: 22.0, cat: 'Normal weight ✓', pct: 38, color: 'text-green-400' })
  const [streakLogged, setStreakLogged] = useState(false)

  const calcBMI = () => {
    const val = bmi.w / ((bmi.h / 100) ** 2)
    const b = Math.round(val * 10) / 10
    let cat, pct, color
    if (b < 18.5) { cat = 'Underweight ⚠️'; pct = 10; color = 'text-blue-400' }
    else if (b < 25) { cat = 'Normal weight ✓'; pct = 38; color = 'text-green-400' }
    else if (b < 30) { cat = 'Overweight ⚠️'; pct = 63; color = 'text-yellow-400' }
    else { cat = 'Obese — consult doctor'; pct = 85; color = 'text-red-400' }
    setBmiResult({ val: b.toFixed(1), cat, pct, color })
  }

  const logDay = () => {
    setStreakLogged(true)
    setTimeout(() => setStreakLogged(false), 3000)
  }

  const metrics = [
    { label: 'Calories', value: '1,340', sub: 'of 1,800 kcal', color: 'from-orange-400', pct: 74 },
    { label: 'Protein', value: '68g', sub: 'of 90g', color: 'from-blue-400', pct: 75 },
    { label: 'Water', value: '1.8L', sub: 'of 2.5L', color: 'from-cyan-400', pct: 72 },
    { label: 'BMI', value: bmiResult.val, sub: 'Normal', color: 'from-green-400', pct: 55 },
  ]

  const meals = [
    { name: 'Oats with Banana', cal: '320 kcal', tag: 'Healthy', good: true },
    { name: 'Dal Rice (Lunch)', cal: '580 kcal', tag: 'Moderate', good: false },
    { name: 'Evening Snack', cal: '140 kcal', tag: 'Healthy', good: true },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-system">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/98 border-b border-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-6 sm:w-7 h-6 sm:h-7 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white text-xs sm:text-sm">N</div>
          <span className="text-sm sm:text-base font-semibold">NutriAI</span>
        </div>
        
        <div className="hidden sm:flex gap-1 sm:gap-2">
          {[['Dashboard', '/dashboard'], ['Meal Plan', '/mealplan'], ['AI Chat', '/consultation']].map(([label, path]) => (
            <button key={label} onClick={() => navigate(path)} className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${path === '/dashboard' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'text-slate-400 hover:text-slate-200'}`}>{label}</button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="text-xs sm:text-sm text-slate-400 hidden sm:inline">{user.name}</span>
          <div className="w-7 sm:w-8 h-7 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-green-300">{user.name?.charAt(0) || 'U'}</div>
        </div>
      </nav>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Greeting */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Good morning, {user.name}! 👋</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Here's your health summary for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 sm:p-4 hover:border-slate-600/50 transition-all">
              <div className="text-xs text-slate-400 mb-2">{m.label}</div>
              <div className={`text-lg sm:text-2xl font-semibold`} style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}>{m.value}</div>
              <div className="text-xs text-slate-500 mt-1">{m.sub}</div>
              <div className="h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${m.color} to-transparent rounded-full transition-all`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Streak + BMI row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">

          {/* Streak */}
          <div className="bg-gradient-to-br from-green-500/10 to-slate-900 border border-green-500/20 rounded-lg p-4 sm:p-6">
            <div className="text-xs text-slate-400 font-semibold mb-2">Daily streak</div>
            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-1">18 days 🔥</div>
            <div className="text-xs sm:text-sm text-slate-400 mb-4">Keep logging every day!</div>
            <div className="flex gap-2 flex-wrap mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold transition-all ${i === 5 ? 'bg-green-500 text-white' : i < 5 ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/50 text-slate-400'}`}>{d}</div>
              ))}
            </div>
            <button onClick={logDay} className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all ${streakLogged ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}>
              {streakLogged ? '✓ Logged! Streak continues 🔥' : '✓ Log today\'s meal'}
            </button>
          </div>

          {/* BMI Calculator */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 sm:p-6">
            <div className="text-xs text-slate-400 font-semibold mb-4">BMI Calculator</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['Weight kg', 'w', 30, 200], ['Height cm', 'h', 100, 250], ['Age', 'a', 5, 100]].map(([lbl, key, min, max]) => (
                <div key={key}>
                  <label className="text-xs text-slate-400 mb-1 block">{lbl}</label>
                  <input type="number" value={bmi[key]} min={min} max={max}
                    onChange={e => setBmi({ ...bmi, [key]: parseFloat(e.target.value) })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 text-center text-sm text-white focus:border-green-500 focus:outline-none transition-all" />
                </div>
              ))}
            </div>
            <button onClick={calcBMI} className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold text-sm mb-4 hover:bg-green-600 transition-all">Calculate BMI</button>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
              <div className={`text-4xl font-bold mb-2 ${bmiResult.color}`}>{bmiResult.val}</div>
              <div className="text-sm text-slate-400 mb-3">{bmiResult.cat}</div>
              <div className="flex h-2 rounded-full overflow-hidden bg-slate-700 mb-2">
                {[['20%', 'from-blue-400'], ['25%', 'from-green-400'], ['30%', 'from-yellow-400'], ['25%', 'from-red-400']].map(([w, bg], i) => (
                  <div key={i} className={`bg-gradient-to-r ${bg} to-transparent`} style={{ width: w }} />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meals + AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 sm:p-6">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">Today's meals</div>
            <div className="space-y-3">
              {meals.map((m, i) => (
                <div key={i} className="flex justify-between items-start pb-3 border-b border-slate-700/30 last:border-b-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium text-slate-200">{m.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{m.cal}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${m.good ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{m.tag}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-green-400 cursor-pointer hover:text-green-300 font-medium">+ Log dinner</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-slate-900 border border-green-500/20 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-green-500/30 rounded-lg flex items-center justify-center text-xs font-bold text-green-300">AI</div>
              <span className="text-xs font-semibold text-green-300">AI Suggestion</span>
              <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Protein thoda low hai aaj. Dinner mein <span className="text-white font-semibold">paneer, eggs ya dal</span> add karo — 90g goal hit hoga!
            </p>
            <button onClick={() => navigate('/consultation')} className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-all">
              Ask AI more →
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
