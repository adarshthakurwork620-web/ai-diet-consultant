import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BMI() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ weight: '', height: '', age: '', gender: 'male' })
  const [result, setResult] = useState(null)
  const [calculating, setCalculating] = useState(false)

  const up = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const calculate = () => {
    const w = parseFloat(form.weight)
    const h = parseFloat(form.height) / 100
    if (!w || !h) return
    setCalculating(true)
    setTimeout(() => {
      const bmi = (w / (h * h)).toFixed(1)
      let cat, catColor, catBg, desc, tips, ideal

      if (bmi < 18.5) {
        cat = 'Underweight'; catColor = 'text-blue-600'; catBg = 'bg-blue-50 border-blue-200'
        desc = 'Your BMI is below the healthy range. Focus on nutrient-dense foods to gain healthy weight.'
        tips = [
          { icon: '🥛', text: 'Add dairy — milk, paneer, dahi daily' },
          { icon: '🥜', text: 'Eat nuts, seeds, and dry fruits' },
          { icon: '🍌', text: 'Increase healthy calorie intake by 300-500 kcal' },
          { icon: '💪', text: 'Do strength training 3x per week' },
        ]
        ideal = `${(18.5 * h * h).toFixed(0)}–${(24.9 * h * h).toFixed(0)} kg`
      } else if (bmi < 25) {
        cat = 'Normal Weight'; catColor = 'text-green-600'; catBg = 'bg-green-50 border-green-200'
        desc = 'Great! You have a healthy BMI. Maintain your current lifestyle and keep up the good work!'
        tips = [
          { icon: '🥗', text: 'Maintain balanced meals — dal, sabzi, roti' },
          { icon: '🏃', text: 'Exercise 30 minutes daily' },
          { icon: '💧', text: 'Drink 2.5L water every day' },
          { icon: '😴', text: 'Sleep 7-8 hours for recovery' },
        ]
        ideal = `${(18.5 * h * h).toFixed(0)}–${(24.9 * h * h).toFixed(0)} kg`
      } else if (bmi < 30) {
        cat = 'Overweight'; catColor = 'text-yellow-600'; catBg = 'bg-yellow-50 border-yellow-200'
        desc = 'Slightly above the healthy range. Small consistent changes in diet and activity can help!'
        tips = [
          { icon: '🚶', text: 'Walk 10,000 steps every day' },
          { icon: '🍚', text: 'Reduce refined carbs and sugar' },
          { icon: '🥦', text: 'Fill half your plate with vegetables' },
          { icon: '⏰', text: 'Avoid eating after 8 PM' },
        ]
        ideal = `${(18.5 * h * h).toFixed(0)}–${(24.9 * h * h).toFixed(0)} kg`
      } else {
        cat = 'Obese'; catColor = 'text-red-600'; catBg = 'bg-red-50 border-red-200'
        desc = 'Your BMI indicates obesity. Please consult a doctor and start a guided health program.'
        tips = [
          { icon: '👨‍⚕️', text: 'Consult a doctor or nutritionist' },
          { icon: '🏊', text: 'Start with low-impact exercise' },
          { icon: '📊', text: 'Track calories with NutriAI daily' },
          { icon: '🥗', text: 'Follow a calorie-deficit Indian diet' },
        ]
        ideal = `${(18.5 * h * h).toFixed(0)}–${(24.9 * h * h).toFixed(0)} kg`
      }

      setResult({ bmi, cat, catColor, catBg, desc, tips, ideal })
      setCalculating(false)
    }, 800)
  }

  const getMarkerPos = (bmi) => {
    const ranges = [
      { min: 10, max: 18.5 },
      { min: 18.5, max: 25 },
      { min: 25, max: 30 },
      { min: 30, max: 40 },
    ]
    const pct = ((Math.min(Math.max(bmi, 10), 40) - 10) / 30) * 100
    return Math.min(Math.max(pct, 2), 98)
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors font-semibold text-sm group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Dashboard
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-200">
              <span>⚖️</span>
            </div>
            <span className="font-extrabold text-gray-900">BMI Calculator</span>
          </div>
          <button onClick={() => navigate('/consultation')}
            className="text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-2 rounded-xl font-bold hover:bg-green-100 transition-colors">
            🤖 Ask AI
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-100 mb-4">
            Health Metric Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            BMI Calculator
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Calculate your Body Mass Index and get personalized health insights based on Indian health standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ── FORM ── */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Enter Your Details</h2>

            {/* Gender */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {[['male', '👨', 'Male'], ['female', '👩', 'Female']].map(([v, ic, l]) => (
                  <button key={v} onClick={() => setForm(p => ({ ...p, gender: v }))}
                    className={`py-3.5 rounded-2xl border-2 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]
                      ${form.gender === v
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-md shadow-green-100'
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-green-200'}`}>
                    {ic} {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            {[
              { label: '⚖️ Weight', name: 'weight', placeholder: 'e.g. 65', unit: 'kg', hint: 'Enter in kilograms' },
              { label: '📏 Height', name: 'height', placeholder: 'e.g. 170', unit: 'cm', hint: 'Enter in centimeters' },
              { label: '🎂 Age', name: 'age', placeholder: 'e.g. 22', unit: 'yrs', hint: 'Your current age' },
            ].map(f => (
              <div key={f.name} className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{f.label}</label>
                  <span className="text-xs text-gray-300 font-medium">{f.hint}</span>
                </div>
                <div className="relative">
                  <input name={f.name} type="number" placeholder={f.placeholder} value={form[f.name]} onChange={up}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-md focus:shadow-green-100 transition-all text-sm pr-12" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300">{f.unit}</span>
                </div>
              </div>
            ))}

            {/* Live BMI preview */}
            {form.weight && form.height && (
              <div className="mb-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-1">Live BMI Preview</p>
                    <p className="text-3xl font-extrabold text-green-600">
                      {(parseFloat(form.weight) / ((parseFloat(form.height)/100) ** 2)).toFixed(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Category</p>
                    <p className="text-sm font-extrabold text-green-600">
                      {(() => {
                        const b = parseFloat(form.weight) / ((parseFloat(form.height)/100) ** 2)
                        if (b < 18.5) return '🔵 Underweight'
                        if (b < 25) return '🟢 Normal'
                        if (b < 30) return '🟡 Overweight'
                        return '🔴 Obese'
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button onClick={calculate} disabled={calculating || !form.weight || !form.height}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-extrabold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-200">
              {calculating ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Calculating...</>
              ) : '⚖️ Calculate BMI'}
            </button>

            {/* BMI Table */}
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">BMI Reference Chart</p>
              <div className="space-y-2">
                {[
                  ['< 18.5', 'Underweight', 'bg-blue-50 text-blue-700 border-blue-100'],
                  ['18.5 – 24.9', 'Normal Weight', 'bg-green-50 text-green-700 border-green-100'],
                  ['25 – 29.9', 'Overweight', 'bg-yellow-50 text-yellow-700 border-yellow-100'],
                  ['≥ 30', 'Obese', 'bg-red-50 text-red-700 border-red-100'],
                ].map(([range, label, cls]) => (
                  <div key={label} className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold ${cls}`}>
                    <span>{label}</span>
                    <span className="font-extrabold">{range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RESULT ── */}
          <div>
            {!result && !calculating ? (
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
                <div className="text-7xl mb-5 opacity-20">⚖️</div>
                <h3 className="text-xl font-extrabold text-gray-300 mb-2">Your Result Awaits</h3>
                <p className="text-gray-300 text-sm max-w-xs">Fill in your details and click Calculate to see your BMI score, category, and personalized health tips</p>
              </div>
            ) : calculating ? (
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-5" />
                <p className="text-gray-600 font-bold">Calculating your BMI...</p>
                <p className="text-gray-400 text-sm mt-1">Analyzing your health data</p>
              </div>
            ) : (
              <div className="space-y-5" style={{ animation: 'fadeUp 0.5s ease' }}>

                {/* Score Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your BMI Score</p>

                  <div className="text-center mb-6">
                    <p className={`text-8xl font-extrabold tracking-tight ${result.catColor}`}>{result.bmi}</p>
                    <div className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-2xl border text-sm font-extrabold ${result.catBg} ${result.catColor}`}>
                      {result.cat}
                    </div>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-xs mx-auto">{result.desc}</p>
                  </div>

                  {/* BMI Scale */}
                  <div className="mb-4">
                    <div className="h-4 rounded-full overflow-hidden relative mb-1"
                      style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #22c55e 30%, #facc15 60%, #ef4444 100%)' }}>
                      <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-3 border-gray-800 rounded-full shadow-lg transition-all duration-1000 flex items-center justify-center"
                        style={{ left: `${getMarkerPos(result.bmi)}%`, transform: 'translate(-50%, -50%)', border: '3px solid #111827' }}>
                        <div className="w-2 h-2 bg-gray-900 rounded-full" />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300 font-semibold mt-1">
                      <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
                    </div>
                  </div>

                  {/* Ideal weight */}
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Ideal Weight Range</p>
                      <p className="text-lg font-extrabold text-gray-900 mt-0.5">{result.ideal}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-semibold">Current Weight</p>
                      <p className="text-lg font-extrabold text-gray-900 mt-0.5">{form.weight} kg</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    💡 Personalized Recommendations
                  </h3>
                  <div className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3.5 hover:bg-green-50 hover:border-green-100 border border-transparent transition-all duration-200">
                        <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                        <span className="text-sm text-gray-600 font-medium">{tip.text}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => navigate('/consultation')}
                    className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-extrabold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                    💬 Get Full AI Diet Plan →
                  </button>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-300 text-center font-medium px-4">
                  ⚕️ BMI is a screening tool, not a diagnostic measure. Consult a healthcare provider for medical advice.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}