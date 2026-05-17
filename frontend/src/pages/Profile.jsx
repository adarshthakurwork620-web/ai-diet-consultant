import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: '', age: '', weight: '', height: '', diet_type: '', goal: ''
  })

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (!u) { navigate('/'); return }
    const parsed = JSON.parse(u)
    setUser(parsed)
    setForm({
      name: parsed.name || '',
      age: parsed.age || '',
      weight: parsed.weight || '',
      height: parsed.height || '',
      diet_type: parsed.diet_type || '',
      goal: parsed.goal || '',
    })
  }, [navigate])

  const up = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const saveProfile = () => {
    const updated = { ...user, ...form }
    localStorage.setItem('user', JSON.stringify(updated))
    setUser(updated)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const getBMI = () => {
    if (!user?.weight || !user?.height) return null
    const h = user.height / 100
    return (user.weight / (h * h)).toFixed(1)
  }

  const getBMIcat = (bmi) => {
    if (!bmi) return { label: 'N/A', color: 'text-gray-400' }
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' }
    if (bmi < 25) return { label: 'Normal', color: 'text-green-500' }
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' }
    return { label: 'Obese', color: 'text-red-500' }
  }

  if (!user) return null

  const bmi = getBMI()
  const bmiCat = getBMIcat(bmi)

  const stats = [
    { label: 'Age', value: user.age || '—', unit: 'yrs', icon: '🎂' },
    { label: 'Weight', value: user.weight || '—', unit: 'kg', icon: '⚖️' },
    { label: 'Height', value: user.height || '—', unit: 'cm', icon: '📏' },
    { label: 'BMI', value: bmi || '—', unit: '', icon: '🏃', extra: bmiCat },
  ]

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
              <span className="text-sm">👤</span>
            </div>
            <span className="font-extrabold text-gray-900">My Profile</span>
          </div>
          <button onClick={logout}
            className="text-sm font-semibold text-red-400 hover:text-red-600 transition-colors">
            Logout ↩
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Success Toast */}
        {saved && (
          <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-2xl shadow-xl shadow-green-200 flex items-center gap-2 font-semibold text-sm">
            ✅ Profile saved successfully!
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 mb-6 text-white relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl font-extrabold border-2 border-white/30 shadow-lg">
              {user.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{user.name}</h1>
              <p className="text-green-100 text-sm mt-1">{user.email}</p>
              <div className="flex gap-2 mt-3">
                {user.diet_type && (
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    🥗 {user.diet_type}
                  </span>
                )}
                {user.goal && (
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    🎯 {user.goal}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-2xl font-extrabold text-gray-900">
                {s.value}<span className="text-sm font-normal text-gray-400 ml-1">{s.unit}</span>
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
              {s.extra && <p className={`text-xs font-bold mt-1 ${s.extra.color}`}>{s.extra.label}</p>}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Edit Profile */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
              <button onClick={() => setEditing(!editing)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200
                  ${editing ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'}`}>
                {editing ? '✕ Cancel' : '✏️ Edit'}
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Adarsh Thakur' },
                { label: 'Age (years)', name: 'age', type: 'number', placeholder: '19' },
                { label: 'Weight (kg)', name: 'weight', type: 'number', placeholder: '65' },
                { label: 'Height (cm)', name: 'height', type: 'number', placeholder: '170' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</label>
                  {editing ? (
                    <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={up}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all text-sm" />
                  ) : (
                    <p className="text-gray-700 font-semibold text-sm py-2.5 px-4 bg-gray-50 rounded-xl">
                      {form[f.name] || '—'}
                    </p>
                  )}
                </div>
              ))}

              {/* Diet Type */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Diet Type</label>
                {editing ? (
                  <select name="diet_type" value={form.diet_type} onChange={up}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 transition-all text-sm">
                    <option value="">Select diet</option>
                    <option value="Vegetarian">🥗 Vegetarian</option>
                    <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                    <option value="Vegan">🌱 Vegan</option>
                    <option value="Keto">🥑 Keto</option>
                  </select>
                ) : (
                  <p className="text-gray-700 font-semibold text-sm py-2.5 px-4 bg-gray-50 rounded-xl">
                    {form.diet_type || '—'}
                  </p>
                )}
              </div>

              {/* Goal */}
              {editing && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[['Lose Weight','⚖️'],['Build Muscle','💪'],['Stay Fit','🏃']].map(([l,ic]) => (
                      <button key={l} onClick={() => setForm(p => ({...p, goal: l}))}
                        className={`py-2.5 px-2 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all
                          ${form.goal === l ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>
                        <span className="text-lg">{ic}</span>{l}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {editing && (
                <button onClick={saveProfile}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 mt-2">
                  💾 Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Quick Links */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon:'📊', label:'View Dashboard', desc:'See your health metrics', action:() => navigate('/dashboard'), color:'hover:border-green-200' },
                  { icon:'🤖', label:'AI Consultation', desc:'Chat with your AI dietitian', action:() => navigate('/consultation'), color:'hover:border-purple-200' },
                  { icon:'📋', label:'Meal Plan', desc:'View your weekly diet plan', action:() => navigate('/mealplan'), color:'hover:border-blue-200' },
                  { icon:'⚖️', label:'BMI Calculator', desc:'Check your body mass index', action:() => navigate('/bmi'), color:'hover:border-orange-200' },
                ].map((item, i) => (
                  <button key={i} onClick={item.action}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 ${item.color} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left group`}>
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                    <span className="ml-auto text-gray-300 group-hover:text-green-500 transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Account</h2>
              <p className="text-gray-400 text-sm mb-4">Manage your account settings</p>
              <button onClick={logout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-2xl border border-red-200 transition-all duration-300 hover:scale-[1.02] text-sm">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
