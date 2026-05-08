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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">

      {/* Floating background blobs */}
      <div className="fixed top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/60 relative z-10">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="text-4xl mb-1 animate-bounce">🥗</div>
          <h1 className="text-2xl font-bold tracking-tight">NutriAI</h1>
          <p className="text-green-100 text-sm">Your personal AI diet consultant</p>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2 transition-all duration-700 ease-in-out"
              style={{ width: step === 1 ? '50%' : '100%' }}></div>
          </div>
          <p className="text-green-100 text-xs mt-1.5">Step {step} of 2</p>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Tell us about you 👋</h2>
              <p className="text-gray-400 text-sm mb-5">Basic information to personalize your plan</p>

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
              <input name="name" value={form.name} onChange={update}
                placeholder="e.g. Siddh Jain"
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 text-gray-700 transition-all duration-300 hover:border-green-200 bg-gray-50 focus:bg-white" />

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Age', name: 'age', placeholder: '19', icon: '🎂' },
                  { label: 'Weight kg', name: 'weight', placeholder: '58', icon: '⚖️' },
                  { label: 'Height cm', name: 'height', placeholder: '165', icon: '📏' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <span>{field.icon}</span> {field.label}
                    </label>
                    <input name={field.name} value={form[field.name]} onChange={update}
                      placeholder={field.placeholder} type="number"
                      className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 text-gray-700 transition-all duration-300 hover:border-green-200 bg-gray-50 focus:bg-white text-center font-semibold" />
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 text-lg tracking-wide">
                Continue →
              </button>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Your preferences 🎯</h2>
              <p className="text-gray-400 text-sm mb-5">Help us build your perfect plan</p>

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">🥦 Diet Type</label>
              <select name="diet" value={form.diet} onChange={update}
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-5 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 text-gray-700 transition-all duration-300 hover:border-green-200 bg-gray-50 focus:bg-white">
                <option value="">Select your diet type</option>
                <option>🥗 Vegetarian</option>
                <option>🍗 Non-Vegetarian</option>
                <option>🌱 Vegan</option>
                <option>🥑 Keto</option>
              </select>

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">🏆 Your Goal</label>
              <div className="grid grid-cols-3 gap-2 mt-2 mb-6">
                {[
                  { label: 'Weight Loss', icon: '⚖️' },
                  { label: 'Muscle Gain', icon: '💪' },
                  { label: 'Stay Fit', icon: '🏃' },
                ].map(g => (
                  <button key={g.label} onClick={() => setForm({ ...form, goal: g.label })}
                    className={`p-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-300 flex flex-col items-center gap-1 hover:scale-105 active:scale-95
                      ${form.goal === g.label
                        ? 'border-green-500 bg-gradient-to-b from-green-50 to-emerald-50 text-green-700 shadow-lg shadow-green-100'
                        : 'border-gray-100 text-gray-500 hover:border-green-200 bg-gray-50'}`}>
                    <span className="text-2xl">{g.icon}</span>
                    <span className="text-xs">{g.label}</span>
                  </button>
                ))}
              </div>

              <button onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 text-lg tracking-wide">
                Get My Plan 🚀
              </button>

              <button onClick={() => setStep(1)}
                className="w-full text-gray-400 text-sm mt-3 hover:text-green-500 transition-colors duration-300 flex items-center justify-center gap-1">
                ← Go Back
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Onboarding