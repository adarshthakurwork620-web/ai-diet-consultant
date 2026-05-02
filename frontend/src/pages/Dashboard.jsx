import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const metrics = [
    { label: 'Calories', value: '1,340', goal: 'of 1,800', icon: '🔥', color: 'from-orange-400 to-red-400' },
    { label: 'Protein', value: '68g', goal: 'of 90g', icon: '💪', color: 'from-blue-400 to-indigo-400' },
    { label: 'Water', value: '1.8L', goal: 'of 2.5L', icon: '💧', color: 'from-cyan-400 to-blue-400' },
    { label: 'BMI', value: '24.1', goal: 'Normal', icon: '⚖️', color: 'from-green-400 to-emerald-400' },
  ]

  const meals = [
    { name: 'Oats with Banana', cal: '320 kcal', tag: 'Healthy', color: 'bg-green-100 text-green-700' },
    { name: 'Dal Rice (Lunch)', cal: '580 kcal', tag: 'Moderate', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Evening Snack', cal: '140 kcal', tag: 'Healthy', color: 'bg-green-100 text-green-700' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥗</span>
          <span className="text-xl font-bold text-green-600">NutriAI</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/consultation')}
            className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-200">
            💬 Ask AI
          </button>
          <button onClick={() => navigate('/mealplan')}
            className="border-2 border-green-500 text-green-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300">
            📋 Meal Plan
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">

        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Good morning, Adarsh! 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Here's your health summary for today</p>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-5 mb-6 text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-green-100 text-sm">Current Streak</p>
              <p className="text-4xl font-bold mt-1">18 🔥</p>
              <p className="text-green-100 text-sm mt-1">days in a row — keep going!</p>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">Goal Progress</p>
              <p className="text-2xl font-bold mt-1">42%</p>
              <div className="bg-white/20 rounded-full h-2 w-24 mt-2">
                <div className="bg-white rounded-full h-2 w-[42%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map(m => (
            <div key={m.label}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 border border-gray-50">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-lg mb-3`}>
                {m.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{m.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{m.goal}</p>
              <p className="text-sm font-semibold text-gray-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Today's Meals */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🍽️ Today's Meals</h2>
          {meals.map((meal, i) => (
            <div key={i}
              className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-xl px-2 transition-all duration-200">
              <div>
                <p className="font-semibold text-gray-700 text-sm">{meal.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{meal.cal}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meal.color}`}>
                {meal.tag}
              </span>
            </div>
          ))}
          <button className="w-full mt-3 text-green-500 text-sm font-semibold hover:text-green-700 transition-colors duration-200">
            + Log Dinner
          </button>
        </div>

        {/* AI Suggestion */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🤖</span>
            <h2 className="text-lg font-bold text-gray-800">AI Suggestion</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your protein intake is a bit low today. Try adding <strong>paneer, eggs, or dal</strong> at dinner to hit your 90g goal!
          </p>
          <button onClick={() => navigate('/consultation')}
            className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-200 transition-all duration-300">
            Ask AI More →
          </button>
        </div>

      </div>
    </div>
  )
}

export default Dashboard