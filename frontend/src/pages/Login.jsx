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
      const response = await fetch('http://localhost:5000/api/login', {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">

      {/* Blobs */}
      <div className="fixed top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/60 relative z-10">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="text-4xl mb-1">🥗</div>
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-green-100 text-sm">Login to your NutriAI account</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Login 👋</h2>
          <p className="text-gray-400 text-sm mb-5">Apna account access karo</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              ⚠️ {error}
            </div>
          )}

          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email</label>
          <input name="email" value={form.email} onChange={update}
            placeholder="adarsh@email.com" type="email"
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 text-gray-700 transition-all duration-300 hover:border-green-200 bg-gray-50 focus:bg-white" />

          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
          <input name="password" value={form.password} onChange={update}
            placeholder="••••••••" type="password"
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-6 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 text-gray-700 transition-all duration-300 hover:border-green-200 bg-gray-50 focus:bg-white" />

          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 text-lg disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login →'}
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Account nahi hai?{' '}
            <button onClick={() => navigate('/register')}
              className="text-green-500 font-semibold hover:text-green-700 transition-colors">
              Register karo
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 
