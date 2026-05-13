import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('Please fill all fields!')
      return
    }
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.error || 'Login failed!')
      }
    } catch (err) {
      setError('Server se connect nahi ho pa raha!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Navbar */}
      <nav className="bg-slate-900/98 border-b border-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition">
          <div className="w-6 sm:w-7 h-6 sm:h-7 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white text-xs sm:text-sm">N</div>
          <span className="text-sm sm:text-base font-semibold text-slate-100">NutriAI</span>
        </div>
        <span className="text-xs sm:text-sm text-slate-400 cursor-pointer hover:text-slate-200 transition" onClick={() => navigate('/')}>← Back to home</span>
      </nav>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-12 left-10 w-64 h-64 bg-green-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl w-full max-w-sm overflow-hidden relative z-10 shadow-2xl">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-b border-green-500/20 px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">N</div>
              <span className="text-base sm:text-lg font-semibold text-slate-100">NutriAI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">Welcome back!</h2>
            <p className="text-xs sm:text-sm text-green-300">Login to your NutriAI account</p>
          </div>

          {/* Card Body */}
          <div className="px-6 sm:px-8 py-8 space-y-6">

            {/* Tabs */}
            <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1">
              <div className="flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/30">Login</div>
              <div onClick={() => navigate('/register')} className="flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold text-slate-400 cursor-pointer hover:text-slate-200 transition">Register</div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-300">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Email</label>
              <input name="email" value={form.email} onChange={update} placeholder="siddhj@email.com" type="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:border-green-500 focus:outline-none transition-all" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Password</label>
              <input name="password" value={form.password} onChange={update} placeholder="••••••••" type="password" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:border-green-500 focus:outline-none transition-all" />
            </div>

            <div className="text-right">
              <button className="text-xs sm:text-sm text-green-400 hover:text-green-300 transition font-medium">Forgot password?</button>
            </div>

            <button onClick={handleLogin} disabled={loading} className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50 transition-all text-sm sm:text-base">
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-700/50" />
              <span className="text-xs text-slate-500">or continue with</span>
              <div className="flex-1 h-px bg-slate-700/50" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 px-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 text-xs sm:text-sm font-medium hover:border-slate-600 transition">🔵 Google</button>
              <button className="py-2 px-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 text-xs sm:text-sm font-medium hover:border-slate-600 transition">⚫ GitHub</button>
            </div>

            <p className="text-center text-xs sm:text-sm text-slate-400">
              Account nahi hai?{' '}
              <span onClick={() => navigate('/register')} className="text-green-400 cursor-pointer hover:text-green-300 font-medium transition">Register karo</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center absolute bottom-6 text-xs text-slate-600">
          <span>🔒 SSL Secured</span>
          <span>✓ Free to join</span>
          <span>No spam</span>
        </div>
      </div>
    </div>
  )
}

export default Login
