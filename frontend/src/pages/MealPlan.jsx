import { useNavigate } from 'react-router-dom'

function MealPlan() {
  const navigate = useNavigate()

  const days = [
    { day: 'Monday', kcal: 1470, meals: [{ type: 'Breakfast', food: 'Oats + Banana + Milk', cal: 320, tag: 'High Protein' }, { type: 'Lunch', food: 'Dal + Rice + Salad', cal: 580, tag: 'Balanced' }, { type: 'Snack', food: 'Roasted Chana + Green Tea', cal: 120, tag: 'Light' }, { type: 'Dinner', food: 'Roti + Sabzi + Curd', cal: 450, tag: 'Healthy' }] },
    { day: 'Tuesday', kcal: 1450, meals: [{ type: 'Breakfast', food: 'Poha + Sprouts', cal: 280, tag: 'Light' }, { type: 'Lunch', food: 'Paneer Sabzi + Roti', cal: 620, tag: 'High Protein' }, { type: 'Snack', food: 'Fruits + Nuts', cal: 150, tag: 'Healthy' }, { type: 'Dinner', food: 'Khichdi + Dahi', cal: 400, tag: 'Light' }] },
    { day: 'Wednesday', kcal: 1420, meals: [{ type: 'Breakfast', food: 'Idli + Sambar', cal: 300, tag: 'Balanced' }, { type: 'Lunch', food: 'Rajma + Rice', cal: 600, tag: 'High Protein' }, { type: 'Snack', food: 'Buttermilk + Biscuits', cal: 100, tag: 'Light' }, { type: 'Dinner', food: 'Moong Dal + Roti', cal: 420, tag: 'Healthy' }] },
    { day: 'Thursday', kcal: 1490, meals: [{ type: 'Breakfast', food: 'Egg Bhurji + Toast', cal: 350, tag: 'High Protein' }, { type: 'Lunch', food: 'Chicken Curry + Rice', cal: 650, tag: 'High Protein' }, { type: 'Snack', food: 'Green Tea + Biscuit', cal: 90, tag: 'Light' }, { type: 'Dinner', food: 'Sabzi + Roti', cal: 400, tag: 'Healthy' }] },
  ]

  const tagColors = {
    'High Protein': { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
    'Balanced': { bg: 'rgba(34,197,94,0.12)', color: '#4ade80' },
    'Light': { bg: 'rgba(234,179,8,0.12)', color: '#facc15' },
    'Healthy': { bg: 'rgba(52,211,153,0.12)', color: '#34d399' },
  }

  const mealIcons = { Breakfast: '🌅', Lunch: '☀️', Snack: '🍎', Dinner: '🌙' }

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#f0f0f8', fontFamily: 'system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ background: 'rgba(10,10,15,0.97)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => navigate('/dashboard')} style={{ fontSize: 12, color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Weekly Meal Plan</span>
        <button onClick={() => navigate('/consultation')} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, color: '#fff', background: '#22c55e', border: 'none', cursor: 'pointer' }}>Ask AI</button>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: 20 }}>

        {/* Header Card */}
        <div style={{ background: 'rgba(22,101,52,0.35)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Siddh Jain's plan</div>
          <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>Your 7-Day Meal Plan</div>
          <div style={{ fontSize: 12, color: '#86efac', marginTop: 2 }}>Personalized for Weight Loss goal</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {['~1,470 kcal/day', 'Non-Veg 🍗', 'High Protein'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '3px 10px', fontSize: 11 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Day cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {days.map((day, di) => (
            <div key={di} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{day.day}</span>
                <span style={{ fontSize: 10, color: '#555' }}>{day.kcal} kcal</span>
              </div>
              {day.meals.map((meal, mi) => (
                <div key={mi} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13 }}>{mealIcons[meal.type]}</span>
                    <div>
                      <div style={{ fontSize: 9, color: '#555' }}>{meal.type}</div>
                      <div style={{ fontSize: 11, color: '#ccc' }}>{meal.food}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 6, background: tagColors[meal.tag]?.bg, color: tagColors[meal.tag]?.color }}>{meal.cal}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/consultation')} style={{ width: '100%', padding: 12, borderRadius: 10, background: '#22c55e', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginTop: 16 }}>
          🤖 Generate New Plan with AI →
        </button>

      </div>
    </div>
  )
}

export default MealPlan
