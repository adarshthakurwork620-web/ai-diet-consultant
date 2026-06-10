import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://nutriai-backend-xspo.onrender.com'

// ── Field component OUTSIDE to prevent focus loss ──
const Field = ({ label, name, type = 'text', placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    <input
      name={name} type={type} placeholder={placeholder}
      value={value} onChange={onChange}
      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-md focus:shadow-green-100 transition-all duration-200 placeholder-gray-300"
    />
  </div>
)

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [reg, setReg] = useState({
    name: '', email: '', password: '',
    age: '', weight: '', height: '',
    diet_type: '', goal: ''
  })

  const up = e => setReg(p => ({ ...p, [e.target.name]: e.target.value }))

  const doRegister = async () => {
    if (!reg.diet_type || !reg.goal) return setError('Please select diet type and goal!')
    setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reg.name, email: reg.email, password: reg.password,
          age: parseInt(reg.age), weight: parseFloat(reg.weight), height: parseFloat(reg.height),
          diet_type: reg.diet_type, goal: reg.goal
        })
      })
      const d = await r.json()
      if (r.ok) {
        localStorage.setItem('token', d.token)
        localStorage.setItem('user', JSON.stringify(d.user))
        navigate('/dashboard')
      } else setError(d.error || 'Registration failed!')
    } catch { setError('Cannot connect to server!') }
    setLoading(false)
  }

  const pwdStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '' }
    if (pwd.length < 4) return { level: 1, label: 'Weak', color: 'bg-red-400' }
    if (pwd.length < 7) return { level: 2, label: 'Fair', color: 'bg-yellow-400' }
    if (pwd.length < 10) return { level: 3, label: 'Good', color: 'bg-blue-400' }
    return { level: 4, label: 'Strong', color: 'bg-green-400' }
  }

  const strength = pwdStrength(reg.password)

  const bmiPreview = reg.weight && reg.height
    ? (parseFloat(reg.weight) / ((parseFloat(reg.height) / 100) ** 2)).toFixed(1)
    : null

  const bmiLabel = (b) => {
    if (!b) return ''
    if (b < 18.5) return '🔵 Underweight'
    if (b < 25) return '🟢 Normal'
    if (b < 30) return '🟡 Overweight'
    return '🔴 Obese'
  }

  const steps = ['Account', 'Body Info', 'Preferences']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* BG Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
              <span className="text-xl">🥗</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900">NutriAI</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Create your free account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

            {/* Step indicators */}
            <div className="flex items-center gap-1 mb-4 relative z-10">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`flex items-center gap-1.5 transition-all ${i + 1 === step ? 'opacity-100' : i + 1 < step ? 'opacity-80' : 'opacity-40'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 transition-all
                      ${i + 1 < step ? 'bg-white text-green-600 border-white' :
                        i + 1 === step ? 'bg-white/20 text-white border-white' :
                        'bg-transparent text-white/60 border-white/40'}`}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    <span className="text-xs font-semibold hidden sm:block">{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-6 rounded-full mx-1 transition-all ${i + 1 < step ? 'bg-white' : 'bg-white/30'}`} />
                  )}
                </div>
              ))}
            </div>

            <h2 className="text-xl font-extrabold tracking-tight relative z-10">
              {step === 1 ? '👋 Create Account' : step === 2 ? '💪 Body Details' : '🎯 Preferences'}
            </h2>
            <p className="text-green-100 text-sm relative z-10">
              Step {step} of 3 — {step === 1 ? 'Set up your login' : step === 2 ? 'Help us personalize' : 'Almost done!'}
            </p>
            <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${(step / 3) * 100}%` }} />
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                ⚠️ {error}
              </div>
            )}

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div style={{ animation: 'fadeUp 0.4s ease' }}>
                <Field label="Full Name" name="name" placeholder="Full Name" value={reg.name} onChange={up} />
                <Field label="Email Address" name="email" type="email" placeholder="example@email.com" value={reg.email} onChange={up} />

                {/* Password with strength */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      name="password" value={reg.password} onChange={up}
                      type={showPwd ? 'text' : 'password'} placeholder="Min 6 characters"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 pr-12 text-gray-900 font-medium text-sm focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-md transition-all placeholder-gray-300"
                    />
                    <button type="button" onClick={() => setShowPwd(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg transition-colors">
                      {showPwd ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {reg.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(l => (
                          <div key={l} className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.level >= l ? strength.color : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400">{strength.label} password</p>
                    </div>
                  )}
                </div>

                <button onClick={() => {
                  if (!reg.name || !reg.email || !reg.password) return setError('Please fill all fields!')
                  if (reg.password.length < 6) return setError('Password must be at least 6 characters!')
                  setError(''); setStep(2)
                }} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300">
                  Continue →
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                  Already have an account?{' '}
                  <button onClick={() => navigate('/')} className="text-green-600 font-bold hover:text-green-700 transition-colors">Sign in</button>
                </p>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div style={{ animation: 'fadeUp 0.4s ease' }}>
                <p className="text-gray-400 text-sm mb-5">These details help us calculate your personalized nutrition targets.</p>

                <div className="grid grid-cols-3 gap-3 mb-2">
                  {[
                    { label: '🎂 Age', name: 'age', placeholder: '', unit: 'yrs' },
                    { label: '⚖️ Weight', name: 'weight(kg)', placeholder: '', unit: 'kg' },
                    { label: '📏 Height', name: 'height(cm)', placeholder: '', unit: 'cm' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</label>
                      <input
                        name={f.name} type="number" placeholder={f.placeholder}
                        value={reg[f.name]} onChange={up}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-3 py-3 text-gray-900 font-bold text-sm text-center focus:outline-none focus:border-green-400 focus:bg-white transition-all"
                      />
                      <p className="text-center text-[10px] text-gray-300 mt-1 font-medium">{f.unit}</p>
                    </div>
                  ))}
                </div>

                {/* BMI Preview */}
                {bmiPreview && (
                  <div className="mt-4 mb-5 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold">Estimated BMI</p>
                      <p className="text-2xl font-extrabold text-green-600">{bmiPreview}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-semibold">Status</p>
                      <p className="text-sm font-bold text-green-600">{bmiLabel(parseFloat(bmiPreview))}</p>
                    </div>
                  </div>
                )}

                <button onClick={() => {
                  if (!reg.age || !reg.weight || !reg.height) return setError('Please fill all fields!')
                  setError(''); setStep(3)
                }} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300">
                  Continue →
                </button>
                <button onClick={() => { setStep(1); setError('') }}
                  className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">← Back</button>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <div style={{ animation: 'fadeUp 0.4s ease' }}>

                {/* Diet Type */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🥦 Diet Preference</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { v: 'Vegetarian', i: '🥗', d: 'Plant-based foods' },
                      { v: 'Non-Vegetarian', i: '🍗', d: 'Includes meat & eggs' },
                    ].map(opt => (
                      <button key={opt.v}
                        onClick={() => setReg(p => ({ ...p, diet_type: opt.v }))}
                        className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02]
                          ${reg.diet_type === opt.v
                            ? 'border-green-500 bg-green-50 shadow-md shadow-green-100'
                            : 'border-gray-100 bg-gray-50 hover:border-green-200'}`}>
                        <span className="text-xl">{opt.i}</span>
                        <p className={`text-xs font-bold mt-1 ${reg.diet_type === opt.v ? 'text-green-700' : 'text-gray-700'}`}>{opt.v}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{opt.d}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🏆 Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: 'Lose Weight', i: '⚖️', d: 'Calorie deficit' },
                      { v: 'Build Muscle', i: '💪', d: 'High protein' },
                      { v: 'Stay Fit', i: '🏃', d: 'Maintain health' },
                    ].map(g => (
                      <button key={g.v}
                        onClick={() => setReg(p => ({ ...p, goal: g.v }))}
                        className={`py-3 px-2 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all hover:scale-105
                          ${reg.goal === g.v
                            ? 'border-green-500 bg-green-50 shadow-md shadow-green-100'
                            : 'border-gray-100 bg-gray-50 hover:border-green-200'}`}>
                        <span className="text-2xl">{g.i}</span>
                        <p className={`text-xs font-bold ${reg.goal === g.v ? 'text-green-700' : 'text-gray-600'}`}>{g.v}</p>
                        <p className="text-[10px] text-gray-400">{g.d}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={doRegister} disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : '🚀 Get Started Free'}
                </button>
                <button onClick={() => { setStep(2); setError('') }}
                  className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">← Back</button>
              </div>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-6 mt-5">
          {['🔒 Secure', '✅ Free Forever', '🇮🇳 Indian Foods'].map(b => (
            <span key={b} className="text-xs text-gray-400 font-medium">{b}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}