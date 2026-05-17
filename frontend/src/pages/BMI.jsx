import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BMI() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ weight: '', height: '', age: '', gender: 'male' })
  const [result, setResult] = useState(null)

  const up = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const calculate = () => {
    const w = parseFloat(form.weight)
    const h = parseFloat(form.height) / 100
    if (!w || !h) return
    const bmi = (w / (h * h)).toFixed(1)
    let cat, color, desc, tips
    if (bmi < 18.5) {
      cat = 'Underweight'; color = 'text-blue-500'; desc = 'You need to gain some weight for better health.'
      tips = ['Eat calorie-dense foods like nuts, dairy', 'Add protein-rich foods like paneer, eggs', 'Do strength training 3x/week']
    } else if (bmi < 25) {
      cat = 'Normal Weight'; color = 'text-green-500'; desc = 'Great! You have a healthy BMI. Keep it up!'
      tips = ['Maintain current diet habits', 'Exercise 30 min daily', 'Stay hydrated — 2.5L water/day']
    } else if (bmi < 30) {
      cat = 'Overweight'; color = 'text-yellow-500'; desc = 'Slightly above healthy range. Small changes help!'
      tips = ['Reduce refined carbs and sugar', 'Walk 10,000 steps daily', 'Eat more vegetables and fiber']
    } else {
      cat = 'Obese'; color = 'text-red-500'; desc = 'Please consult a doctor for a personalized plan.'
      tips = ['Consult a nutritionist', 'Start with low-impact exercise', 'Track calories daily']
    }
    setResult({ bmi, cat, color, desc, tips })
  }

  const getPercent = (bmi) => Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100)

  return (
    <div className="min-h-screen bg-gray-50" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors font-semibold text-sm">
            ← Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-sm">⚖️</span>
            </div>
            <span className="font-extrabold text-gray-900">BMI Calculator</span>
          </div>
          <div className="w-24" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-100 mb-4">
            Health Metric
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">BMI Calculator</h1>
          <p className="text-gray-400 text-lg">Calculate your Body Mass Index and get personalized health insights</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Your Details</h2>

            {/* Gender */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {['male','female'].map(g => (
                  <button key={g} onClick={() => setForm(p => ({...p, gender: g}))}
                    className={`py-3 rounded-2xl border-2 text-sm font-bold capitalize transition-all duration-200
                      ${form.gender === g ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-green-200'}`}>
                    {g === 'male' ? '👨 Male' : '👩 Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">⚖️ Weight (kg)</label>
              <input name="weight" type="number" placeholder="e.g. 65" value={form.weight} onChange={up}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all" />
            </div>

            {/* Height */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">📏 Height (cm)</label>
              <input name="height" type="number" placeholder="e.g. 170" value={form.height} onChange={up}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all" />
            </div>

            {/* Age */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🎂 Age (years)</label>
              <input name="age" type="number" placeholder="e.g. 22" value={form.age} onChange={up}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all" />
            </div>

            <button onClick={calculate}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 text-base shadow-lg shadow-green-200">
              Calculate BMI ⚖️
            </button>
          </div>

          {/* Result */}
          <div>
            {!result ? (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your BMI Result</h3>
                <p className="text-gray-400 text-sm">Fill in your details and click Calculate to see your BMI score and personalized health tips</p>
              </div>
            ) : (
              <div className="space-y-4">

                {/* BMI Score Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <div className="text-center mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your BMI Score</p>
                    <p className={`text-7xl font-extrabold ${result.color} mb-2`}>{result.bmi}</p>
                    <span className={`text-lg font-bold ${result.color}`}>{result.cat}</span>
                    <p className="text-gray-400 text-sm mt-2">{result.desc}</p>
                  </div>

                  {/* BMI Scale */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 font-semibold mb-2">
                      <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                    </div>
                    <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-gray-800 rounded-full shadow-lg transition-all duration-700"
                        style={{left:`${getPercent(result.bmi)}%`, transform:'translate(-50%,-50%)'}} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-300 mt-1">
                      <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
                    </div>
                  </div>

                  {/* BMI Categories */}
                  <div className="grid grid-cols-2 gap-2">
                    {[['< 18.5','Underweight','bg-blue-50 text-blue-700'],['18.5–24.9','Normal','bg-green-50 text-green-700'],['25–29.9','Overweight','bg-yellow-50 text-yellow-700'],['≥ 30','Obese','bg-red-50 text-red-700']].map(([range, label, cls]) => (
                      <div key={label} className={`${cls} rounded-xl px-3 py-2 text-xs font-semibold flex justify-between`}>
                        <span>{label}</span><span>{range}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    💡 Personalized Tips
                  </h3>
                  <ul className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/consultation')}
                    className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-green-200 transition-all duration-300 text-sm">
                    💬 Ask AI for Diet Plan →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
