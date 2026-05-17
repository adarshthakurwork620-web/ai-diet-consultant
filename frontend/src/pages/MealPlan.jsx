import { useNavigate } from 'react-router-dom'

function MealPlan() {
  const navigate = useNavigate()

  const days = [
    {
      day: 'Monday', emoji: '🌅',
      meals: [
        { type: 'Breakfast', food: 'Oats + Banana + Milk', cal: 320, tag: 'High Protein' },
        { type: 'Lunch', food: 'Dal + Rice + Salad', cal: 580, tag: 'Balanced' },
        { type: 'Snack', food: 'Roasted Chana + Green Tea', cal: 120, tag: 'Light' },
        { type: 'Dinner', food: 'Roti + Sabzi + Curd', cal: 450, tag: 'Healthy' },
      ]
    },
    {
      day: 'Tuesday', emoji: '🌤️',
      meals: [
        { type: 'Breakfast', food: 'Poha + Sprouts', cal: 280, tag: 'Light' },
        { type: 'Lunch', food: 'Paneer Sabzi + Roti', cal: 620, tag: 'High Protein' },
        { type: 'Snack', food: 'Fruits + Nuts', cal: 150, tag: 'Healthy' },
        { type: 'Dinner', food: 'Khichdi + Dahi', cal: 400, tag: 'Light' },
      ]
    },
    {
      day: 'Wednesday', emoji: '⛅',
      meals: [
        { type: 'Breakfast', food: 'Idli + Sambar', cal: 300, tag: 'Balanced' },
        { type: 'Lunch', food: 'Rajma + Rice', cal: 600, tag: 'High Protein' },
        { type: 'Snack', food: 'Buttermilk + Biscuits', cal: 100, tag: 'Light' },
        { type: 'Dinner', food: 'Moong Dal + Roti', cal: 420, tag: 'Healthy' },
      ]
    },
  ]

  const tagColors = {
    'High Protein': 'bg-blue-100 text-blue-700',
    'Balanced': 'bg-green-100 text-green-700',
    'Light': 'bg-yellow-100 text-yellow-700',
    'Healthy': 'bg-emerald-100 text-emerald-700',
  }

  const mealIcons = {
    'Breakfast': '🌅',
    'Lunch': '☀️',
    'Snack': '🍎',
    'Dinner': '🌙',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => navigate('/dashboard')}
          className="text-gray-400 hover:text-green-500 transition-colors duration-200 font-medium">
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <span className="text-lg font-bold text-gray-800">Weekly Meal Plan</span>
        </div>
        <button onClick={() => navigate('/consultation')}
          className="bg-green-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-green-600 transition-all duration-300">
          💬 Ask AI
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4">

        {/* Header card */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-5 mb-6 text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/10 rounded-full"></div>
          <h2 className="text-xl font-bold relative z-10">Your 7-Day Plan 🗓️</h2>
          <p className="text-green-100 text-sm mt-1 relative z-10">Personalized for Weight Loss goal</p>
          <div className="flex gap-4 mt-3 relative z-10">
            <div className="bg-white/20 rounded-2xl px-3 py-1.5 text-sm font-semibold">~1,470 kcal/day</div>
            <div className="bg-white/20 rounded-2xl px-3 py-1.5 text-sm font-semibold">Non-Veg 🍗</div>
          </div>
        </div>

        {/* Days */}
        {days.map((day, di) => (
          <div key={di} className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-gray-50 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{day.emoji}</span>
              <h3 className="text-lg font-bold text-gray-800">{day.day}</h3>
              <span className="ml-auto text-sm text-gray-400 font-medium">
                {day.meals.reduce((a, m) => a + m.cal, 0)} kcal
              </span>
            </div>

            <div className="space-y-3">
              {day.meals.map((meal, mi) => (
                <div key={mi}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl hover:bg-green-50 hover:scale-[1.01] transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{mealIcons[meal.type]}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{meal.type}</p>
                      <p className="text-sm font-semibold text-gray-700">{meal.food}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[meal.tag]}`}>
                      {meal.tag}
                    </span>
                    <span className="text-xs text-gray-400">{meal.cal} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Generate new plan button */}
        <button onClick={() => navigate('/consultation')}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 mb-6">
          🤖 Generate New Plan with AI
        </button>

      </div>
    </div>
  )
}

export default MealPlan