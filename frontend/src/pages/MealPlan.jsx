import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MealPlan() {
  const navigate = useNavigate()
  const [activeDay, setActiveDay] = useState(0)
  const [generating, setGenerating] = useState(false)

  const days = [
    {
      day: 'Monday', short: 'Mon', emoji: '🌅', total: 1470,
      meals: [
        { type: 'Breakfast', time: '8:00 AM', icon: '🌅', food: 'Oats + Banana + Milk', cal: 320, protein: 12, carbs: 58, fat: 6, tag: 'High Protein', tagColor: 'bg-blue-50 text-blue-700 border-blue-100' },
        { type: 'Lunch', time: '1:00 PM', icon: '☀️', food: 'Dal Rice + Cucumber Salad', cal: 580, protein: 18, carbs: 95, fat: 8, tag: 'Balanced', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Snack', time: '4:30 PM', icon: '🍎', food: 'Roasted Chana + Green Tea', cal: 120, protein: 6, carbs: 18, fat: 2, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
        { type: 'Dinner', time: '7:30 PM', icon: '🌙', food: 'Roti + Paneer Sabzi + Curd', cal: 450, protein: 22, carbs: 52, fat: 14, tag: 'Healthy', tagColor: 'bg-purple-50 text-purple-700 border-purple-100' },
      ]
    },
    {
      day: 'Tuesday', short: 'Tue', emoji: '🌤️', total: 1450,
      meals: [
        { type: 'Breakfast', time: '8:00 AM', icon: '🌅', food: 'Poha + Sprouts Salad', cal: 280, protein: 10, carbs: 52, fat: 5, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
        { type: 'Lunch', time: '1:00 PM', icon: '☀️', food: 'Paneer Sabzi + 3 Rotis', cal: 620, protein: 24, carbs: 78, fat: 18, tag: 'High Protein', tagColor: 'bg-blue-50 text-blue-700 border-blue-100' },
        { type: 'Snack', time: '4:30 PM', icon: '🍎', food: 'Mixed Fruits + Nuts', cal: 150, protein: 4, carbs: 22, fat: 8, tag: 'Healthy', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Dinner', time: '7:30 PM', icon: '🌙', food: 'Moong Dal Khichdi + Dahi', cal: 400, protein: 16, carbs: 68, fat: 6, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
      ]
    },
    {
      day: 'Wednesday', short: 'Wed', emoji: '⛅', total: 1430,
      meals: [
        { type: 'Breakfast', time: '8:00 AM', icon: '🌅', food: 'Idli (4) + Sambar + Chutney', cal: 300, protein: 9, carbs: 62, fat: 3, tag: 'Balanced', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Lunch', time: '1:00 PM', icon: '☀️', food: 'Rajma Chawal + Salad', cal: 600, protein: 20, carbs: 98, fat: 8, tag: 'High Protein', tagColor: 'bg-blue-50 text-blue-700 border-blue-100' },
        { type: 'Snack', time: '4:30 PM', icon: '🍎', food: 'Chaas + 2 Whole Wheat Biscuits', cal: 130, protein: 5, carbs: 20, fat: 3, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
        { type: 'Dinner', time: '7:30 PM', icon: '🌙', food: 'Moong Dal + 2 Rotis + Sabzi', cal: 400, protein: 15, carbs: 62, fat: 7, tag: 'Healthy', tagColor: 'bg-purple-50 text-purple-700 border-purple-100' },
      ]
    },
    {
      day: 'Thursday', short: 'Thu', emoji: '🌞', total: 1480,
      meals: [
        { type: 'Breakfast', time: '8:00 AM', icon: '🌅', food: 'Besan Cheela + Mint Chutney', cal: 290, protein: 14, carbs: 38, fat: 8, tag: 'High Protein', tagColor: 'bg-blue-50 text-blue-700 border-blue-100' },
        { type: 'Lunch', time: '1:00 PM', icon: '☀️', food: 'Chole + 3 Rotis + Salad', cal: 620, protein: 22, carbs: 92, fat: 10, tag: 'Balanced', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Snack', time: '4:30 PM', icon: '🍎', food: 'Banana + Peanut Butter', cal: 170, protein: 5, carbs: 28, fat: 6, tag: 'Energy', tagColor: 'bg-orange-50 text-orange-700 border-orange-100' },
        { type: 'Dinner', time: '7:30 PM', icon: '🌙', food: 'Palak Dal + 2 Rotis + Curd', cal: 400, protein: 18, carbs: 58, fat: 8, tag: 'Healthy', tagColor: 'bg-purple-50 text-purple-700 border-purple-100' },
      ]
    },
    {
      day: 'Friday', short: 'Fri', emoji: '🎉', total: 1420,
      meals: [
        { type: 'Breakfast', time: '8:00 AM', icon: '🌅', food: 'Dalia + Mixed Veggies + Milk', cal: 270, protein: 10, carbs: 48, fat: 5, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
        { type: 'Lunch', time: '1:00 PM', icon: '☀️', food: 'Egg Curry + Rice + Salad', cal: 600, protein: 28, carbs: 72, fat: 16, tag: 'High Protein', tagColor: 'bg-blue-50 text-blue-700 border-blue-100' },
        { type: 'Snack', time: '4:30 PM', icon: '🍎', food: 'Apple + Handful Almonds', cal: 150, protein: 4, carbs: 20, fat: 8, tag: 'Healthy', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Dinner', time: '7:30 PM', icon: '🌙', food: 'Vegetable Soup + 2 Rotis', cal: 400, protein: 12, carbs: 62, fat: 6, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
      ]
    },
    {
      day: 'Saturday', short: 'Sat', emoji: '🏖️', total: 1500,
      meals: [
        { type: 'Breakfast', time: '9:00 AM', icon: '🌅', food: 'Aloo Paratha + Dahi + Pickle', cal: 380, protein: 10, carbs: 62, fat: 14, tag: 'Weekend', tagColor: 'bg-pink-50 text-pink-700 border-pink-100' },
        { type: 'Lunch', time: '1:30 PM', icon: '☀️', food: 'Dal Makhani + Rice + Salad', cal: 620, protein: 18, carbs: 88, fat: 16, tag: 'Balanced', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Snack', time: '5:00 PM', icon: '🍎', food: 'Samosa (1) + Mint Chutney', cal: 160, protein: 4, carbs: 22, fat: 8, tag: 'Treat', tagColor: 'bg-red-50 text-red-700 border-red-100' },
        { type: 'Dinner', time: '8:00 PM', icon: '🌙', food: 'Grilled Chicken + Roti + Sabzi', cal: 500, protein: 32, carbs: 42, fat: 14, tag: 'High Protein', tagColor: 'bg-blue-50 text-blue-700 border-blue-100' },
      ]
    },
    {
      day: 'Sunday', short: 'Sun', emoji: '😴', total: 1350,
      meals: [
        { type: 'Breakfast', time: '9:30 AM', icon: '🌅', food: 'Upma + Coconut Chutney', cal: 280, protein: 8, carbs: 52, fat: 6, tag: 'Light', tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
        { type: 'Lunch', time: '2:00 PM', icon: '☀️', food: 'Dal + Rice + Papad + Salad', cal: 520, protein: 16, carbs: 88, fat: 6, tag: 'Balanced', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Snack', time: '5:00 PM', icon: '🍎', food: 'Fruit Chaat (Mixed)', cal: 120, protein: 2, carbs: 28, fat: 1, tag: 'Healthy', tagColor: 'bg-green-50 text-green-700 border-green-100' },
        { type: 'Dinner', time: '7:30 PM', icon: '🌙', food: 'Khichdi + Ghee + Papad', cal: 430, protein: 14, carbs: 72, fat: 10, tag: 'Comfort', tagColor: 'bg-purple-50 text-purple-700 border-purple-100' },
      ]
    },
  ]

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      navigate('/consultation')
    }, 1500)
  }

  const today = days[activeDay]
  const totalProtein = today.meals.reduce((a, m) => a + m.protein, 0)
  const totalCarbs = today.meals.reduce((a, m) => a + m.carbs, 0)
  const totalFat = today.meals.reduce((a, m) => a + m.fat, 0)

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors font-semibold text-sm group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Dashboard
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-200">
              <span>📋</span>
            </div>
            <span className="font-extrabold text-gray-900">Weekly Meal Plan</span>
          </div>

          <button onClick={() => navigate('/consultation')}
            className="flex items-center gap-1.5 text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-2 rounded-xl font-bold hover:bg-green-100 transition-colors">
            🤖 Ask AI
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── HEADER BANNER ── */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-6 mb-7 text-white relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🗓️</span>
                <h1 className="text-2xl font-extrabold tracking-tight">Your 7-Day AI Diet Plan</h1>
              </div>
              <p className="text-green-100 text-sm">Personalized for your Weight Loss goal · Indian cuisine focused</p>
              <div className="flex gap-3 mt-3">
                <span className="bg-white/20 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">~1,470 kcal/day</span>
                <span className="bg-white/20 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">🥗 Balanced Diet</span>
                <span className="bg-white/20 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">🇮🇳 Indian Foods</span>
              </div>
            </div>
            <button onClick={handleGenerate} disabled={generating}
              className="flex-shrink-0 bg-white text-green-600 font-extrabold px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 disabled:opacity-70 flex items-center gap-2 shadow-lg">
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>🤖 Generate New Plan</>
              )}
            </button>
          </div>
        </div>

        {/* ── DAY SELECTOR ── */}
        <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {days.map((d, i) => (
              <button key={i} onClick={() => setActiveDay(i)}
                className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all duration-200 min-w-[60px]
                  ${activeDay === i
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md shadow-green-200'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'}`}>
                <span className="text-lg">{d.emoji}</span>
                <span className="text-xs font-extrabold">{d.short}</span>
                <span className={`text-[10px] font-semibold ${activeDay === i ? 'text-green-100' : 'text-gray-300'}`}>
                  {d.total}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── MEALS LIST ── */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                {today.emoji} {today.day}'s Meals
              </h2>
              <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl">
                {today.total} kcal total
              </span>
            </div>

            {today.meals.map((meal, i) => (
              <div key={i}
                className="bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="flex items-center p-5 gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    {meal.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{meal.type}</p>
                      <span className="text-gray-200">·</span>
                      <p className="text-xs text-gray-400 font-medium">{meal.time}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm truncate">{meal.food}</p>

                    {/* Macros */}
                    <div className="flex gap-3 mt-2">
                      {[
                        ['P', `${meal.protein}g`, 'text-blue-600 bg-blue-50'],
                        ['C', `${meal.carbs}g`, 'text-yellow-600 bg-yellow-50'],
                        ['F', `${meal.fat}g`, 'text-red-500 bg-red-50'],
                      ].map(([label, val, cls]) => (
                        <span key={label} className={`text-xs font-bold px-2 py-0.5 rounded-lg ${cls}`}>
                          {label}: {val}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cal + Tag */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-extrabold text-gray-900">{meal.cal}</p>
                    <p className="text-xs text-gray-400 mb-2">kcal</p>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${meal.tagColor}`}>
                      {meal.tag}
                    </span>
                  </div>
                </div>

                {/* Calorie bar */}
                <div className="px-5 pb-4">
                  <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full h-1.5 transition-all duration-700"
                      style={{ width: `${(meal.cal / today.total) * 100}%` }} />
                  </div>
                  <p className="text-xs text-gray-300 mt-1 font-medium">
                    {((meal.cal / today.total) * 100).toFixed(0)}% of daily calories
                  </p>
                </div>
              </div>
            ))}

            {/* Ask AI Button */}
            <button onClick={() => navigate('/consultation')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-extrabold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-200">
              🤖 Customize This Plan with AI →
            </button>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-5">

            {/* Nutrition Summary */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                📊 Daily Nutrition
              </h3>

              {[
                { label: 'Calories', val: today.total, max: 1800, unit: 'kcal', grad: 'from-orange-400 to-red-500', pct: Math.round((today.total/1800)*100) },
                { label: 'Protein', val: totalProtein, max: 90, unit: 'g', grad: 'from-blue-400 to-indigo-500', pct: Math.round((totalProtein/90)*100) },
                { label: 'Carbs', val: totalCarbs, max: 250, unit: 'g', grad: 'from-yellow-400 to-amber-500', pct: Math.round((totalCarbs/250)*100) },
                { label: 'Fat', val: totalFat, max: 60, unit: 'g', grad: 'from-red-400 to-pink-500', pct: Math.round((totalFat/60)*100) },
              ].map(m => (
                <div key={m.label} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-gray-500">{m.label}</span>
                    <span className="text-xs font-extrabold text-gray-900">{m.val}<span className="text-gray-400 font-normal"> / {m.max}{m.unit}</span></span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className={`bg-gradient-to-r ${m.grad} rounded-full h-2 transition-all duration-700`}
                      style={{ width: `${Math.min(m.pct, 100)}%` }} />
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5 font-medium text-right">{m.pct}%</p>
                </div>
              ))}
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-100">
              <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                💡 Today's Tips
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Eat breakfast within 1 hour of waking up',
                  'Drink a glass of water before each meal',
                  'Chew food slowly — aids digestion',
                  'Avoid screens while eating',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Water reminder */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-5 border border-cyan-100">
              <h3 className="font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                💧 Hydration Goal
              </h3>
              <p className="text-3xl font-extrabold text-cyan-600 mb-1">2.5 L</p>
              <p className="text-xs text-gray-400 font-medium">8-10 glasses per day</p>
              <div className="mt-3 bg-cyan-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full h-2" style={{ width: '60%' }} />
              </div>
              <p className="text-xs text-cyan-600 font-semibold mt-1">6/10 glasses today</p>
            </div>

            {/* Week overview mini */}
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-gray-900 mb-3">📅 Week Overview</h3>
              <div className="space-y-2">
                {days.map((d, i) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-200
                      ${activeDay === i ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{d.emoji}</span>
                      <span className={`text-sm font-bold ${activeDay === i ? 'text-green-700' : 'text-gray-600'}`}>{d.day}</span>
                    </div>
                    <span className={`text-xs font-extrabold ${activeDay === i ? 'text-green-600' : 'text-gray-400'}`}>
                      {d.total} kcal
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}