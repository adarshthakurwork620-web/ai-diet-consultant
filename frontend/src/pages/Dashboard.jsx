import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://nutriai-backend-xspo.onrender.com'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [time, setTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('today')
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (!u || !token) { navigate('/'); return }
    setUser(JSON.parse(u))
    fetchDashboard()
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/api/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const d = await res.json()
        setData(d)
        // Update localStorage user with latest data
        if (d.user) {
          const stored = JSON.parse(localStorage.getItem('user') || '{}')
          localStorage.setItem('user', JSON.stringify({ ...stored, ...d.user, ...d.today }))
          setUser(prev => ({ ...prev, ...d.user }))
        }
      }
    } catch (e) {
      console.error('Dashboard fetch error:', e)
    } finally {
      setLoading(false)
    }
  }

  const updateWater = async (glasses) => {
    try {
      await fetch(`${API}/api/water`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ glasses })
      })
      setData(prev => ({
        ...prev,
        today: { ...prev.today, water_glasses: glasses }
      }))
    } catch (e) { console.error(e) }
  }

  const greeting = () => {
    const h = time.getHours()
    if (h < 12) return { text: 'Good Morning', icon: '🌅', sub: 'Start your day healthy!' }
    if (h < 17) return { text: 'Good Afternoon', icon: '☀️', sub: 'Keep up the great work!' }
    return { text: 'Good Evening', icon: '🌙', sub: 'Time to wind down healthy!' }
  }

  const g = greeting()

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  )

  const today    = data?.today || {}
  const streak   = data?.streak || {}
  const meals    = data?.meals || []
  const water    = today.water_glasses || 0
  const calGoal  = today.cal_goal || 1800
  const protGoal = today.protein_goal || 90

  const metrics = [
    {
      label: 'Calories', value: today.calories || 0, goal: calGoal,
      unit: 'kcal', icon: '🔥', grad: 'from-orange-400 to-red-500',
      light: 'bg-orange-50', tc: 'text-orange-500',
      pct: Math.min(Math.round(((today.calories || 0) / calGoal) * 100), 100)
    },
    {
      label: 'Protein', value: today.protein || 0, goal: protGoal,
      unit: 'g', icon: '💪', grad: 'from-blue-400 to-indigo-500',
      light: 'bg-blue-50', tc: 'text-blue-500',
      pct: Math.min(Math.round(((today.protein || 0) / protGoal) * 100), 100)
    },
    {
      label: 'Water', value: (water * 0.25).toFixed(1), goal: today.water_goal || 2.5,
      unit: 'L', icon: '💧', grad: 'from-cyan-400 to-blue-500',
      light: 'bg-cyan-50', tc: 'text-cyan-500',
      pct: Math.min(Math.round((water / 8) * 100), 100)
    },
    {
      label: 'BMI', value: data?.bmi || '—', goal: 'Normal',
      unit: '', icon: '⚖️', grad: 'from-green-400 to-emerald-500',
      light: 'bg-green-50', tc: 'text-green-500', pct: 85
    },
  ]

  const quickActions = [
    { icon: '🤖', label: 'Ask AI', desc: 'Get diet advice', action: () => navigate('/consultation'), grad: 'from-violet-500 to-purple-600' },
    { icon: '📋', label: 'Meal Plan', desc: '7-day plan', action: () => navigate('/mealplan'), grad: 'from-green-500 to-emerald-600' },
    { icon: '⚖️', label: 'BMI Check', desc: 'Calculate BMI', action: () => navigate('/bmi'), grad: 'from-blue-500 to-cyan-600' },
    { icon: '👤', label: 'Profile', desc: 'Your settings', action: () => navigate('/profile'), grad: 'from-orange-500 to-red-500' },
  ]

  const mealIcons = { breakfast: '🌅', lunch: '☀️', snack: '🍎', dinner: '🌙' }
  const mealColors = {
    breakfast: { tc: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
    lunch:     { tc: 'text-blue-700',  bg: 'bg-blue-50',  border: 'border-blue-200' },
    snack:     { tc: 'text-yellow-700',bg: 'bg-yellow-50',border: 'border-yellow-200' },
    dinner:    { tc: 'text-purple-700',bg: 'bg-purple-50',border: 'border-purple-200' },
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-200">
              <span>🥗</span>
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">NutriAI</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-2xl p-1">
            {[['Dashboard', '/dashboard'], ['AI Chat', '/consultation'], ['Meal Plan', '/mealplan']].map(([l, path]) => (
              <button key={l} onClick={() => navigate(path)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  ${window.location.pathname === path ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}>
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              🔔
              {(data?.notifications?.length > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            <button onClick={() => navigate('/bmi')} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">⚖️</button>
            <button onClick={() => navigate('/profile')}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-xl px-3 py-2 transition-colors">
              <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-extrabold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden md:block">{user?.name?.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {g.icon} {g.text}, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {g.sub} · {time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-orange-200">
              🔥 {streak.current_streak || 0} Day Streak
            </div>
            <div className="bg-white border border-gray-100 text-gray-600 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm">
              🎯 {user?.goal || data?.user?.goal || 'Weight Loss'}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {quickActions.map((a, i) => (
            <button key={i} onClick={a.action}
              className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-50 hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className={`w-11 h-11 bg-gradient-to-br ${a.grad} rounded-xl flex items-center justify-center text-xl mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {a.icon}
              </div>
              <p className="font-bold text-gray-900 text-sm">{a.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
            </button>
          ))}
        </div>

        {/* STREAK BANNER */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-6 mb-7 text-white relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-4">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Current Streak 🔥</p>
              <p className="text-5xl font-extrabold tracking-tight">{streak.current_streak || 0} Days</p>
              <p className="text-green-100 text-sm mt-1">
                {(streak.current_streak || 0) > 5 ? "You're on fire! Keep going 💪" : "Start your streak today! 🚀"}
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-green-100 text-xs font-medium mb-1">Goal Progress</p>
                <p className="text-3xl font-extrabold">{streak.goal_progress || 0}%</p>
                <div className="bg-white/20 rounded-full h-2 w-28 mt-2">
                  <div className="bg-white rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${streak.goal_progress || 0}%` }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-green-100 text-xs font-medium mb-1">Total Days</p>
                <p className="text-3xl font-extrabold">{streak.total_days || 0}</p>
                <p className="text-green-100 text-xs mt-1">Days active</p>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 hover:-translate-y-0.5 transition-all duration-300">
              <div className={`w-11 h-11 ${m.light} rounded-xl flex items-center justify-center text-xl mb-3`}>
                {m.icon}
              </div>
              <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {m.value}<span className="text-sm font-normal text-gray-400 ml-1">{m.unit}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">of {m.goal}{m.unit} goal</p>
              <p className="text-sm font-bold text-gray-700 mt-1">{m.label}</p>
              <div className="mt-3 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className={`bg-gradient-to-r ${m.grad} rounded-full h-1.5 transition-all duration-1000`}
                  style={{ width: `${m.pct}%` }} />
              </div>
              <p className={`text-xs font-bold mt-1 ${m.tc}`}>{m.pct}%</p>
            </div>
          ))}
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* TODAY'S MEALS */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-gray-900">🍽️ Today's Meals</h2>
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {['today', 'week'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                      ${activeTab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>
                    {t === 'today' ? 'Today' : 'This Week'}
                  </button>
                ))}
              </div>
            </div>

            {meals.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-3">🍽️</div>
                <p className="text-gray-400 font-medium">No meals logged today</p>
                <p className="text-gray-300 text-sm mt-1">Start tracking your meals!</p>
                <button onClick={() => navigate('/consultation')}
                  className="mt-4 bg-green-50 text-green-600 border border-green-200 px-5 py-2 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors">
                  🤖 Get AI Meal Suggestions
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {meals.map((meal, i) => {
                  const type = meal.meal_type?.toLowerCase() || 'snack'
                  const colors = mealColors[type] || mealColors.snack
                  return (
                    <div key={i}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 hover:shadow-sm ${colors.bg} ${colors.border}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                          {mealIcons[type] || '🍽️'}
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-semibold capitalize">{meal.meal_type} · {meal.meal_time}</p>
                          <p className="text-sm font-bold text-gray-800 mt-0.5">{meal.food_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border bg-white ${colors.tc}`}>
                          {meal.tag || 'Healthy'}
                        </span>
                        <p className="text-xs text-gray-400 mt-1 font-medium">{meal.calories} kcal</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Calorie summary */}
            {meals.length > 0 && (
              <div className="mt-4 bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-400">Logged: </span>
                  <span className="font-extrabold text-gray-900">{today.calories || 0} kcal</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Remaining: </span>
                  <span className="font-extrabold text-green-600">{Math.max((calGoal - (today.calories || 0)), 0)} kcal</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Goal: </span>
                  <span className="font-extrabold text-gray-900">{calGoal} kcal</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-5">

            {/* WATER TRACKER */}
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-extrabold text-gray-900">💧 Water</h2>
                <span className="text-xs text-cyan-600 font-bold bg-cyan-50 px-2 py-1 rounded-lg border border-cyan-100">
                  {water}/8 glasses
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {Array(8).fill(0).map((_, i) => (
                  <button key={i} onClick={() => updateWater(i < water ? i : i + 1)}
                    className={`h-10 rounded-xl border-2 text-lg transition-all duration-200 hover:scale-110
                      ${i < water ? 'bg-cyan-100 border-cyan-300 text-cyan-600' : 'bg-gray-50 border-gray-100 text-gray-300'}`}>
                    💧
                  </button>
                ))}
              </div>
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${Math.min((water / 8) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center font-medium">
                {water >= 8 ? '🎉 Daily goal reached!' : `${8 - water} more glasses to go`}
              </p>
            </div>

            {/* AI TIP */}
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-200">
                  <span>🤖</span>
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900">AI Tip</h2>
                  <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" style={{ animation: 'pulse 1.5s ease infinite' }} />
                    Live analysis
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 mb-4 border border-violet-100">
                {data?.ai_tip ? (
                  <p className="text-sm text-gray-600 leading-relaxed">{data.ai_tip.message}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {(today.calories || 0) === 0
                        ? '🌟 Log your first meal today to get personalized AI tips!'
                        : `Great progress! Calories: ${today.calories}/${calGoal} kcal · Protein: ${today.protein || 0}g`}
                    </p>
                    <div className="space-y-2">
                      {['💧 Stay hydrated — drink water before each meal',
                        '🥗 Add more vegetables to your next meal',
                        '⏰ Try to eat dinner before 8 PM'].map((tip, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white rounded-xl p-2.5 text-xs text-gray-700 shadow-sm">
                          {tip}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => navigate('/consultation')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:scale-105 transition-all duration-200">
                  💬 Ask AI
                </button>
                <button onClick={() => navigate('/mealplan')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-xs font-bold transition-colors">
                  📋 Meal Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  )
}