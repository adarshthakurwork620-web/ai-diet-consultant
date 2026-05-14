import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [time, setTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('today')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) { navigate('/'); return }
    setUser(JSON.parse(userData))
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [navigate])

  const getGreeting = () => {
    const h = time.getHours()
    if (h < 12) return { text: 'Good Morning', icon: '🌅' }
    if (h < 17) return { text: 'Good Afternoon', icon: '☀️' }
    return { text: 'Good Evening', icon: '🌙' }
  }

  const metrics = [
    { label: 'Calories', value: '1,340', goal: '1,800', unit: 'kcal', icon: '🔥', color: 'from-orange-400 to-red-500', light: 'bg-orange-50', text: 'text-orange-500', percent: 74 },
    { label: 'Protein', value: '68', goal: '90', unit: 'g', icon: '💪', color: 'from-blue-400 to-indigo-500', light: 'bg-blue-50', text: 'text-blue-500', percent: 76 },
    { label: 'Water', value: '1.8', goal: '2.5', unit: 'L', icon: '💧', color: 'from-cyan-400 to-blue-500', light: 'bg-cyan-50', text: 'text-cyan-500', percent: 72 },
    { label: 'BMI', value: '22.4', goal: 'Normal', unit: '', icon: '⚖️', color: 'from-green-400 to-emerald-500', light: 'bg-green-50', text: 'text-green-500', percent: 85 },
  ]

  const meals = [
    { type: 'Breakfast', time: '8:00 AM', food: 'Oats + Banana + Milk', cal: 320, tag: 'Healthy', color: 'bg-green-100 text-green-700', icon: '🌅', done: true },
    { type: 'Lunch', time: '1:00 PM', food: 'Dal Rice + Salad', cal: 580, tag: 'Balanced', color: 'bg-blue-100 text-blue-700', icon: '☀️', done: true },
    { type: 'Snack', time: '4:00 PM', food: 'Roasted Chana + Green Tea', cal: 120, tag: 'Light', color: 'bg-yellow-100 text-yellow-700', icon: '🍎', done: true },
    { type: 'Dinner', time: '7:30 PM', food: 'Roti + Sabzi + Curd', cal: 450, tag: 'Pending', color: 'bg-gray-100 text-gray-600', icon: '🌙', done: false },
  ]

  const quickActions = [
    { icon: '🤖', label: 'Ask AI', desc: 'Get diet advice', action: () => navigate('/consultation'), color: 'from-violet-500 to-purple-600' },
    { icon: '📋', label: 'Meal Plan', desc: 'View 7-day plan', action: () => navigate('/mealplan'), color: 'from-green-500 to-emerald-600' },
    { icon: '📊', label: 'Progress', desc: 'Track goals', action: () => {}, color: 'from-blue-500 to-cyan-600' },
    { icon: '🍽️', label: 'Log Meal', desc: 'Add food entry', action: () => {}, color: 'from-orange-500 to-red-500' },
  ]

  if (!user) return null

  const greeting = getGreeting()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-200">
              <span className="text-lg">🥗</span>
            </div>
            <span className="text-lg font-bold text-gray-900" style={{fontFamily:'Syne, sans-serif'}}>NutriAI</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-2xl p-1">
            {['Dashboard', 'Consultation', 'Meal Plan'].map((item, i) => (
              <button key={i}
                onClick={() => navigate(item === 'Dashboard' ? '/dashboard' : item === 'Consultation' ? '/consultation' : '/mealplan')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  ${item === 'Dashboard' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              🔔
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => { localStorage.clear(); navigate('/') }}>
              <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden md:block">{user?.name}</span>
              <span className="text-xs text-gray-400">↩</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900" style={{fontFamily:'Syne, sans-serif'}}>
              {greeting.icon} {greeting.text}, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              {time.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-200">
              🔥 18 Day Streak
            </div>
            <div className="bg-white border border-gray-100 text-gray-600 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm">
              🎯 {user?.goal || 'Weight Loss'}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((a, i) => (
            <button key={i} onClick={a.action}
              className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 hover:-translate-y-0.5 transition-all duration-300 text-left group">
              <div className={`w-10 h-10 bg-gradient-to-br ${a.color} rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                {a.icon}
              </div>
              <p className="font-bold text-gray-800 text-sm">{a.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
            </button>
          ))}
        </div>

        {/* Streak Banner */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-4 right-16 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Current Streak 🔥</p>
              <p className="text-5xl font-extrabold" style={{fontFamily:'Syne, sans-serif'}}>18 Days</p>
              <p className="text-green-100 text-sm mt-1">Keep it up! You're on fire! 💪</p>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm font-medium mb-1">Goal Progress</p>
              <p className="text-4xl font-extrabold" style={{fontFamily:'Syne, sans-serif'}}>42%</p>
              <div className="bg-white/20 rounded-full h-2 w-32 mt-2">
                <div className="bg-white rounded-full h-2 transition-all duration-1000" style={{width:'42%'}}></div>
              </div>
              <p className="text-green-100 text-xs mt-1">Weight Loss Goal</p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 hover:-translate-y-0.5 transition-all duration-300">
              <div className={`w-10 h-10 ${m.light} rounded-xl flex items-center justify-center text-xl mb-3`}>
                {m.icon}
              </div>
              <p className="text-2xl font-extrabold text-gray-900" style={{fontFamily:'Syne, sans-serif'}}>
                {m.value}<span className="text-sm font-normal text-gray-400 ml-1">{m.unit}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">of {m.goal} {m.unit} goal</p>
              <p className="text-sm font-semibold text-gray-600 mt-1">{m.label}</p>
              {/* Progress bar */}
              <div className="mt-3 bg-gray-100 rounded-full h-1.5">
                <div className={`bg-gradient-to-r ${m.color} rounded-full h-1.5 transition-all duration-1000`}
                  style={{width:`${m.percent}%`}}></div>
              </div>
              <p className={`text-xs ${m.text} font-semibold mt-1`}>{m.percent}%</p>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Today's Meals */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800" style={{fontFamily:'Syne, sans-serif'}}>🍽️ Today's Meals</h2>
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {['today', 'week'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {meals.map((meal, i) => (
                <div key={i}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 hover:bg-gray-50 ${meal.done ? '' : 'opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${meal.done ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {meal.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{meal.type} · {meal.time}</p>
                      <p className="text-sm font-semibold text-gray-700">{meal.food}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${meal.color}`}>{meal.tag}</span>
                    <p className="text-xs text-gray-400 mt-1">{meal.cal} kcal</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-semibold text-gray-400 hover:border-green-400 hover:text-green-500 transition-all duration-300">
              + Log Dinner
            </button>
          </div>

          {/* AI Suggestion */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-200">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800" style={{fontFamily:'Syne, sans-serif'}}>AI Suggestion</h2>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Analyzing your data
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 mb-4 flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                Great progress today! 🎉 Your protein intake is a bit low. For dinner, try adding:
              </p>
              <div className="mt-3 space-y-2">
                {['🥚 2 boiled eggs (+12g protein)', '🧀 50g paneer (+9g protein)', '🫘 1 cup dal (+9g protein)'].map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white rounded-xl p-2.5 text-sm text-gray-700 shadow-sm">
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate('/consultation')}
                className="btn-primary py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                💬 Ask AI More
              </button>
              <button onClick={() => navigate('/mealplan')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                📋 View Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard