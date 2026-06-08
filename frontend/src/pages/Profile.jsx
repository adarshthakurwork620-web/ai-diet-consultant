import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://nutriai-backend-xspo.onrender.com'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [streak, setStreak] = useState(null)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '', weight: '', height: '', target_weight: '',
    diet_type: '', fitness_goal: '', activity_level: '',
    daily_cal_goal: '', water_goal: ''
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (!u || !token) { navigate('/'); return }
    setUser(JSON.parse(u))
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API}/api/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const d = await res.json()
        setUser(d.user)
        setProfile(d.profile)
        setStreak(d.streak)
        setForm({
          name:           d.user.name || '',
          weight:         d.profile.current_weight || '',
          height:         d.profile.height || '',
          target_weight:  d.profile.target_weight || '',
          diet_type:      d.profile.diet_type || '',
          fitness_goal:   d.profile.fitness_goal || '',
          activity_level: d.profile.activity_level || '',
          daily_cal_goal: d.profile.daily_cal_goal || 1800,
          water_goal:     d.profile.water_goal || 2.5,
        })
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const up = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const saveProfile = async () => {
    try {
      const res = await fetch(`${API}/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name:           form.name,
          weight:         parseFloat(form.weight),
          height:         parseFloat(form.height),
          target_weight:  parseFloat(form.target_weight),
          diet_type:      form.diet_type,
          fitness_goal:   form.fitness_goal,
          activity_level: form.activity_level,
          daily_cal_goal: parseInt(form.daily_cal_goal),
          water_goal:     parseFloat(form.water_goal),
        })
      })
      if (res.ok) {
        const d = await res.json()
        setSaved(true)
        setEditing(false)
        setTimeout(() => setSaved(false), 3000)
        // Update localStorage
        const stored = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({ ...stored, name: form.name }))
        fetchProfile() // Refresh data
      }
    } catch (e) { console.error(e) }
  }

  const logout = () => { localStorage.clear(); navigate('/') }

  const getBMIcat = (bmi) => {
    if (!bmi) return { label: 'N/A', color: 'text-gray-400' }
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' }
    if (bmi < 25)   return { label: 'Normal ✅',   color: 'text-green-500' }
    if (bmi < 30)   return { label: 'Overweight',  color: 'text-yellow-500' }
    return { label: 'Obese', color: 'text-red-500' }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading profile...</p>
      </div>
    </div>
  )

  const bmiCat = getBMIcat(profile?.bmi)

  const stats = [
    { label: 'Weight',   value: profile?.current_weight || '—', unit: 'kg',  icon: '⚖️' },
    { label: 'Height',   value: profile?.height || '—',          unit: 'cm',  icon: '📏' },
    { label: 'BMI',      value: profile?.bmi || '—',             unit: '',    icon: '🏃', extra: bmiCat },
    { label: 'Streak',   value: streak?.current_streak || 0,     unit: 'days',icon: '🔥' },
  ]

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors font-semibold text-sm group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Dashboard
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <span className="font-extrabold text-gray-900">My Profile</span>
          </div>
          <button onClick={logout} className="text-sm font-semibold text-red-400 hover:text-red-600 transition-colors">
            Logout ↩
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Toast */}
        {saved && (
          <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-semibold text-sm">
            ✅ Profile saved successfully!
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 mb-6 text-white relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl font-extrabold border-2 border-white/30 shadow-lg">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{user?.name}</h1>
              <p className="text-green-100 text-sm mt-1">{user?.email}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {profile?.diet_type && (
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    🥗 {profile.diet_type}
                  </span>
                )}
                {profile?.fitness_goal && (
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    🎯 {profile.fitness_goal?.replace('_', ' ')}
                  </span>
                )}
                {profile?.activity_level && (
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    ⚡ {profile.activity_level}
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

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                {editing ? (
                  <input name="name" value={form.name} onChange={up}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all text-sm" />
                ) : (
                  <p className="text-gray-700 font-semibold text-sm py-2.5 px-4 bg-gray-50 rounded-xl">{form.name || '—'}</p>
                )}
              </div>

              {/* Weight & Height */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Weight (kg)', name: 'weight', placeholder: '65' },
                  { label: 'Height (cm)', name: 'height', placeholder: '170' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</label>
                    {editing ? (
                      <input name={f.name} type="number" placeholder={f.placeholder} value={form[f.name]} onChange={up}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-3 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all text-sm text-center" />
                    ) : (
                      <p className="text-gray-700 font-semibold text-sm py-2.5 px-3 bg-gray-50 rounded-xl text-center">{form[f.name] || '—'}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Target Weight (kg)</label>
                {editing ? (
                  <input name="target_weight" type="number" placeholder="60" value={form.target_weight} onChange={up}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all text-sm" />
                ) : (
                  <p className="text-gray-700 font-semibold text-sm py-2.5 px-4 bg-gray-50 rounded-xl">{form.target_weight || '—'}</p>
                )}
              </div>

              {/* Diet Type */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Diet Type</label>
                {editing ? (
                  <select name="diet_type" value={form.diet_type} onChange={up}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 transition-all text-sm">
                    <option value="">Select diet</option>
                    <option value="vegetarian">🥗 Vegetarian</option>
                    <option value="non_vegetarian">🍗 Non-Vegetarian</option>
                    <option value="vegan">🌱 Vegan</option>
                    <option value="keto">🥑 Keto</option>
                  </select>
                ) : (
                  <p className="text-gray-700 font-semibold text-sm py-2.5 px-4 bg-gray-50 rounded-xl">{form.diet_type || '—'}</p>
                )}
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Activity Level</label>
                {editing ? (
                  <select name="activity_level" value={form.activity_level} onChange={up}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 transition-all text-sm">
                    <option value="">Select level</option>
                    <option value="sedentary">🪑 Sedentary</option>
                    <option value="light">🚶 Light</option>
                    <option value="moderate">🏃 Moderate</option>
                    <option value="active">💪 Active</option>
                    <option value="very_active">🏋️ Very Active</option>
                  </select>
                ) : (
                  <p className="text-gray-700 font-semibold text-sm py-2.5 px-4 bg-gray-50 rounded-xl">{form.activity_level || '—'}</p>
                )}
              </div>

              {/* Goals */}
              {editing && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🏆 Fitness Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[['weight_loss','⚖️','Lose Weight'],['muscle_gain','💪','Build Muscle'],['maintenance','🏃','Stay Fit']].map(([v,ic,l]) => (
                        <button key={v} onClick={() => setForm(p => ({ ...p, fitness_goal: v }))}
                          className={`py-2.5 px-2 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all
                            ${form.fitness_goal === v ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-500'}`}>
                          <span className="text-lg">{ic}</span>{l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Cal Goal (kcal)</label>
                      <input name="daily_cal_goal" type="number" value={form.daily_cal_goal} onChange={up}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-3 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Water Goal (L)</label>
                      <input name="water_goal" type="number" step="0.5" value={form.water_goal} onChange={up}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-3 py-2.5 text-gray-900 font-semibold focus:outline-none focus:border-green-400 focus:bg-white transition-all text-sm" />
                    </div>
                  </div>

                  <button onClick={saveProfile}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 mt-2">
                    💾 Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Progress Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Progress</h2>
              <div className="space-y-4">
                {[
                  { label: 'Streak', value: streak?.current_streak || 0, max: Math.max(streak?.longest_streak || 7, 7), unit: 'days', color: 'from-orange-400 to-red-500' },
                  { label: 'Longest Streak', value: streak?.longest_streak || 0, max: Math.max(streak?.longest_streak || 7, 7), unit: 'days', color: 'from-purple-400 to-violet-500' },
                  { label: 'Total Active Days', value: streak?.total_days || 0, max: 100, unit: 'days', color: 'from-blue-400 to-cyan-500' },
                  { label: 'Goal Progress', value: streak?.goal_progress || 0, max: 100, unit: '%', color: 'from-green-400 to-emerald-500' },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-gray-500">{m.label}</span>
                      <span className="text-xs font-extrabold text-gray-900">{m.value} {m.unit}</span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`bg-gradient-to-r ${m.color} rounded-full h-2 transition-all duration-700`}
                        style={{ width: `${Math.min((m.value / m.max) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: '📊', label: 'Dashboard', desc: 'See health metrics', action: () => navigate('/dashboard') },
                  { icon: '🤖', label: 'AI Chat', desc: 'Get diet advice', action: () => navigate('/consultation') },
                  { icon: '📋', label: 'Meal Plan', desc: 'View weekly plan', action: () => navigate('/mealplan') },
                  { icon: '⚖️', label: 'BMI Check', desc: 'Calculate BMI', action: () => navigate('/bmi') },
                ].map((item, i) => (
                  <button key={i} onClick={item.action}
                    className="w-full flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left group">
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

            {/* Logout */}
            <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Account</h2>
              <p className="text-gray-400 text-sm mb-4">Manage your account</p>
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