import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', age: '', weight: '', height: '', diet: '', goal: ''
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="text-3xl mb-1">🥗</div>
          <h1 className="text-2xl font-bold">NutriAI</h1>
          <p className="text-green-100 text-sm">Your personal diet consultant</p>
          {/* Progress bar */}
          <div className="mt-4 bg-green-400 rounded-full h-1.5">
            <div className="bg-white rounded-full h-1.5 transition-all duration-500"
              style={{ width: step === 1 ? '50%' : '100%' }}></div>
          </div>
          <p className="text-green-100 text-xs mt-1">Step {step} of 2</p>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Tell us about you 👋</h2>
              <p className="text-gray-400 text-sm mb-5">Basic information to get started</p>

              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
              <input name="name" value={form.name} onChange={update}
                placeholder="e.g. Adarsh Thakur"
                className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700" />

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Age</label>
                  <input name="age" value={form.age} onChange={update} placeholder="19"
                    className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weight kg</label>
                  <input name="weight" value={form.weight} onChange={update} placeholder="58"
                    className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Height cm</label>
                  <input name="height" value={form.height} onChange={update} placeholder="165"
                    className="w-full border border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700" />
                </div>
              </div>

              <button onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition shadow-lg shadow-green-200">
                Continue →
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Your preferences 🎯</h2>
              <p className="text-gray-400 text-sm mb-5">Help us personalize your plan</p>

              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Diet Type</label>
              <select name="diet" value={form.diet} onChange={update}
                className="w-full border border-gray-200 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700">
                <option value="">Select diet type</option>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Vegan</option>
                <option>Keto</option>
              </select>

              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Goal</label>
              <div className="grid grid-cols-3 gap-2 mt-1 mb-6">
                {['Weight Loss', 'Muscle Gain', 'Stay Fit'].map(g => (
                  <button key={g} onClick={() => setForm({ ...form, goal: g })}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition ${form.goal === g ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500'}`}>
                    {g === 'Weight Loss' ? '⚖️' : g === 'Muscle Gain' ? '💪' : '🏃'} {g}
                  </button>
                ))}
              </div>

              <button onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition shadow-lg shadow-green-200">
                Get My Plan 🚀
              </button>

              <button onClick={() => setStep(1)} className="w-full text-gray-400 text-sm mt-3 hover:text-gray-600">
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding