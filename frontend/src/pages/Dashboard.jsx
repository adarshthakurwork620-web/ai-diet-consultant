import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Siddh Jain' }

  const [bmi, setBmi] = useState({ w: 60, h: 165, a: 20 })
  const [bmiResult, setBmiResult] = useState({ val: 22.0, cat: 'Normal weight ✓', pct: 38, color: '#4ade80' })
  const [streakLogged, setStreakLogged] = useState(false)

  const calcBMI = () => {
    const val = bmi.w / ((bmi.h / 100) ** 2)
    const b = Math.round(val * 10) / 10
    let cat, pct, color
    if (b < 18.5) { cat = 'Underweight ⚠️'; pct = 10; color = '#60a5fa' }
    else if (b < 25) { cat = 'Normal weight ✓'; pct = 38; color = '#4ade80' }
    else if (b < 30) { cat = 'Overweight ⚠️'; pct = 63; color = '#facc15' }
    else { cat = 'Obese — consult doctor'; pct = 85; color = '#f87171' }
    setBmiResult({ val: b.toFixed(1), cat, pct, color })
  }

  const logDay = () => {
    setStreakLogged(true)
    setTimeout(() => setStreakLogged(false), 3000)
  }

  const metrics = [
    { label: 'Calories', value: '1,340', sub: 'of 1,800 kcal', color: '#fb923c', pct: 74 },
    { label: 'Protein', value: '68g', sub: 'of 90g', color: '#60a5fa', pct: 75 },
    { label: 'Water', value: '1.8L', sub: 'of 2.5L', color: '#38bdf8', pct: 72 },
    { label: 'BMI', value: bmiResult.val, sub: 'Normal', color: '#4ade80', pct: 55 },
  ]

  const meals = [
    { name: 'Oats with Banana', cal: '320 kcal', tag: 'Healthy', good: true },
    { name: 'Dal Rice (Lunch)', cal: '580 kcal', tag: 'Moderate', good: false },
    { name: 'Evening Snack', cal: '140 kcal', tag: 'Healthy', good: true },
  ]

  const s = (style) => style
  const card = { background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#f0f0f8', fontFamily: 'system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ background: 'rgba(10,10,15,0.97)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff', fontSize: 11 }}>N</div>
          <span style={{ fontSize: 13, fontWeight: 500 }}>NutriAI</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[['Dashboard', '/dashboard'], ['Meal Plan', '/mealplan'], ['AI Chat', '/consultation']].map(([label, path]) => (
            <button key={label} onClick={() => navigate(path)} style={{ padding: '5px 11px', borderRadius: 18, fontSize: 12, color: path === '/dashboard' ? '#22c55e' : '#aaa', background: path === '/dashboard' ? 'rgba(34,197,94,0.12)' : 'none', border: path === '/dashboard' ? '0.5px solid rgba(34,197,94,0.3)' : 'none', cursor: 'pointer' }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#aaa' }}>{user.name}</span>
          <div style={{ width: 28, height: 28, background: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#4ade80', fontWeight: 500 }}>SJ</div>
        </div>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: 20 }}>

        {/* Greeting */}
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 18, fontWeight: 500 }}>Good morning, {user.name}! 👋</h1>
          <p style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Here's your health summary for today</p>
        </div>

        {/* Stats 4 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 14 }}>
          {metrics.map((m, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: m.color }}>{m.value}</div>
              <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>{m.sub}</div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 3, marginTop: 6 }}>
                <div style={{ height: 3, width: `${m.pct}%`, background: m.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Streak + BMI row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>

          {/* Streak */}
          <div style={{ background: 'rgba(34,197,94,0.07)', border: '0.5px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 10, color: '#555' }}>Daily streak</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#4ade80', margin: '6px 0 2px' }}>18 days 🔥</div>
            <div style={{ fontSize: 11, color: '#555', marginBottom: 10 }}>Keep logging every day!</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, background: i === 5 ? '#22c55e' : i < 5 ? 'rgba(34,197,94,0.18)' : 'rgba(255,255,255,0.05)', color: i === 5 ? '#fff' : i < 5 ? '#4ade80' : '#555' }}>{d}</div>
              ))}
            </div>
            <button onClick={logDay} style={{ width: '100%', padding: 9, borderRadius: 8, background: streakLogged ? '#16a34a' : '#22c55e', color: '#fff', border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
              {streakLogged ? '✓ Logged! Streak continues 🔥' : '✓ Log today\'s meal'}
            </button>
          </div>

          {/* BMI Calculator */}
          <div style={card}>
            <div style={{ fontSize: 10, color: '#555', marginBottom: 10, fontWeight: 500 }}>BMI Calculator</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
              {[['Weight kg', 'w', 30, 200], ['Height cm', 'h', 100, 250], ['Age', 'a', 5, 100]].map(([lbl, key, min, max]) => (
                <div key={key}>
                  <div style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>{lbl}</div>
                  <input type="number" value={bmi[key]} min={min} max={max}
                    onChange={e => setBmi({ ...bmi, [key]: parseFloat(e.target.value) })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '7px 8px', color: '#f0f0f8', fontSize: 12, textAlign: 'center', outline: 'none' }} />
                </div>
              ))}
            </div>
            <button onClick={calcBMI} style={{ width: '100%', padding: 9, borderRadius: 8, background: '#22c55e', color: '#fff', border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer', marginBottom: 10 }}>Calculate BMI</button>
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '0.5px solid rgba(34,197,94,0.15)', borderRadius: 9, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 500, color: bmiResult.color }}>{bmiResult.val}</div>
              <div style={{ fontSize: 12, color: '#aaa', marginTop: 3 }}>{bmiResult.cat}</div>
              <div style={{ position: 'relative', marginTop: 10 }}>
                <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                  {[['20%', '#60a5fa'], ['25%', '#4ade80'], ['30%', '#facc15'], ['25%', '#f87171']].map(([w, bg], i) => (
                    <div key={i} style={{ width: w, height: 8, background: bg }} />
                  ))}
                </div>
                <div style={{ width: 3, height: 14, background: '#fff', borderRadius: 2, position: 'absolute', top: -3, left: `${bmiResult.pct}%`, transform: 'translateX(-50%)', transition: 'left 0.4s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#555', marginTop: 4 }}>
                <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meals + AI */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={card}>
            <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Today's meals</div>
            {meals.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#ccc' }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: '#555' }}>{m.cal}</div>
                </div>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 7, background: m.good ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)', color: m.good ? '#4ade80' : '#facc15' }}>{m.tag}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 11, color: '#4ade80', cursor: 'pointer' }}>+ Log dinner</div>
          </div>

          <div style={{ background: 'rgba(34,197,94,0.05)', border: '0.5px solid rgba(34,197,94,0.18)', borderRadius: 10, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, background: 'rgba(34,197,94,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#4ade80', fontWeight: 500 }}>AI</div>
              <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 500 }}>AI Suggestion</span>
              <div style={{ marginLeft: 'auto', width: 5, height: 5, background: '#4ade80', borderRadius: '50%' }} />
            </div>
            <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.6 }}>
              Protein thoda low hai aaj. Dinner mein <span style={{ color: '#f0f0f8' }}>paneer, eggs ya dal</span> add karo — 90g goal hit hoga!
            </p>
            <button onClick={() => navigate('/consultation')} style={{ width: '100%', padding: 9, borderRadius: 8, background: '#22c55e', color: '#fff', border: 'none', fontSize: 11, fontWeight: 500, cursor: 'pointer', marginTop: 12 }}>
              Ask AI more →
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
