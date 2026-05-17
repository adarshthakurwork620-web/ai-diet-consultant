import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    age: '', weight: '', height: '',
    diet_type: '', goal: ''
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async () => {
    if (!form.diet_type || !form.goal) {
      setError('Please select diet type and goal!')
      return
    }
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://nutriai-backend-xspo.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: parseInt(form.age),
          weight: parseFloat(form.weight),
          height: parseFloat(form.height)
        })
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.error || 'Registration failed!')
      }
    } catch (err) {
      setError('Server se connect nahi ho pa raha!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">

      <div className="fixed top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/60 relative z-10">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="text-4xl mb-1">🥗</div>
          <h1 className="text-2xl font-bold">NutriAI</h1>
          <p className="text-green-100 text-sm">Create your account</p>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2 transition-all duration-700"
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
          </div>
          <p className="text-green-100 text-xs mt-1">Step {step} of 3</p>
        </div>

        <div className="p-6">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              ⚠️ {error}
            </div>
          )}

          {/* Step 1 — Account Info */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Account banao 🔐</h2>
              <p className="text-gray-400 text-sm mb-5">Login details set karo</p>

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
              <input name="name" value={form.name} onChange={update}
                placeholder="Adarsh Thakur"
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email</label>
              <input name="email" value={form.email} onChange={update}
                placeholder="adarsh@email.com" type="email"
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
              <input name="password" value={form.password} onChange={update}
                placeholder="••••••••" type="password"
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-6 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />

              <button onClick={() => {
                if (!form.name || !form.email || !form.password) { setError('Sab fields bharo!'); return }
                setError(''); setStep(2)
              }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300">
                Continue →
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Pehle se account hai?{' '}
                <button onClick={() => navigate('/')}
                  className="text-green-500 font-semibold hover:text-green-700">
                  Login karo
                </button>
              </p>
            </div>
          )}

          {/* Step 2 — Body Info */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Body info 💪</h2>
              <p className="text-gray-400 text-sm mb-5">Tumhare baare mein batao</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: '🎂 Age', name: 'age', placeholder: '19' },
                  { label: '⚖️ Weight kg', name: 'weight', placeholder: '58' },
                  { label: '📏 Height cm', name: 'height', placeholder: '165' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{field.label}</label>
                    <input name={field.name} value={form[field.name]} onChange={update}
                      placeholder={field.placeholder} type="number"
                      className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700 text-center font-semibold" />
                  </div>
                ))}
              </div>

              <button onClick={() => {
                if (!form.age || !form.weight || !form.height) { setError('Sab fields bharo!'); return }
                setError(''); setStep(3)
              }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300">
                Continue →
              </button>

              <button onClick={() => setStep(1)} className="w-full text-gray-400 text-sm mt-3 hover:text-green-500 transition-colors">
                ← Back
              </button>
            </div>
          )}

          {/* Step 3 — Preferences */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Preferences 🎯</h2>
              <p className="text-gray-400 text-sm mb-5">Diet aur goal select karo</p>

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">🥦 Diet Type</label>
              <select name="diet_type" value={form.diet_type} onChange={update}
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-5 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700">
                <option value="">Select diet type</option>
                <option value="Vegetarian">🥗 Vegetarian</option>
                <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                <option value="Vegan">🌱 Vegan</option>
                <option value="Keto">🥑 Keto</option>
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
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-lg shadow-green-100'
                        : 'border-gray-100 text-gray-500 hover:border-green-200 bg-gray-50'}`}>
                    <span className="text-2xl">{g.icon}</span>
                    <span className="text-xs">{g.label}</span>
                  </button>
                ))}
              </div>

              <button onClick={handleRegister} disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                {loading ? 'Creating account...' : 'Get Started 🚀'}
              </button>

              <button onClick={() => setStep(2)} className="w-full text-gray-400 text-sm mt-3 hover:text-green-500 transition-colors">
                ← Back
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
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  )
}

export default Register