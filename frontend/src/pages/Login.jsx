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
      const response = await fetch('https://nutriai-backend-xspo.onrender.com/api/login', {
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

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '0.5px solid rgba(255,255,255,0.12)',
    borderRadius: 8,
    padding: '10px 12px',
    color: '#f0f0f8',
    fontSize: 13,
    outline: 'none',
    marginTop: 4,
    marginBottom: 14,
  }

  const labelStyle = {
    fontSize: 10,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  }

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ background: 'rgba(10,10,15,0.97)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff', fontSize: 12 }}>N</div>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#f0f0f8' }}>NutriAI</span>
        </div>
        <span style={{ fontSize: 12, color: '#555', cursor: 'pointer' }} onClick={() => navigate('/')}>← Back to home</span>
      </nav>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', position: 'relative' }}>
        {/* Glows */}
        <div style={{ position: 'absolute', top: 60, left: 60, width: 200, height: 200, background: 'rgba(34,197,94,0.05)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 60, right: 60, width: 180, height: 180, background: 'rgba(96,165,250,0.04)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 360, overflow: 'hidden', position: 'relative', zIndex: 1 }}>

          {/* Card Header */}
          <div style={{ background: 'rgba(22,101,52,0.35)', borderBottom: '0.5px solid rgba(34,197,94,0.2)', padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, background: '#22c55e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff', fontSize: 13 }}>N</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#f0f0f8' }}>NutriAI</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 500, color: '#f0f0f8', marginBottom: 4 }}>Welcome back!</h2>
            <p style={{ fontSize: 12, color: '#86efac' }}>Login to your NutriAI account</p>
          </div>

          {/* Card Body */}
          <div style={{ padding: 24 }}>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3, marginBottom: 18 }}>
              <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', borderRadius: 6, fontSize: 12, background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '0.5px solid rgba(34,197,94,0.3)', cursor: 'pointer' }}>Login</div>
              <div onClick={() => navigate('/register')} style={{ flex: 1, padding: '7px 0', textAlign: 'center', borderRadius: 6, fontSize: 12, color: '#555', cursor: 'pointer' }}>Register</div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '0.5px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#fca5a5', marginBottom: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <label style={labelStyle}>Email</label>
            <input name="email" value={form.email} onChange={update} placeholder="siddhj@email.com" type="email" style={inputStyle} />

            <label style={labelStyle}>Password</label>
            <input name="password" value={form.password} onChange={update} placeholder="••••••••" type="password" style={inputStyle} />

            <div style={{ textAlign: 'right', fontSize: 11, color: '#4ade80', marginBottom: 14, cursor: 'pointer', marginTop: -8 }}>Forgot password?</div>

            <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: 11, borderRadius: 9, background: '#22c55e', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 14, opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 0.5, background: 'rgba(255,255,255,0.07)' }} />
              <span style={{ fontSize: 11, color: '#333' }}>or continue with</span>
              <div style={{ flex: 1, height: 0.5, background: 'rgba(255,255,255,0.07)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              <div style={{ padding: 9, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', color: '#aaa', fontSize: 12, cursor: 'pointer', textAlign: 'center' }}>🔵 Google</div>
              <div style={{ padding: 9, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', color: '#aaa', fontSize: 12, cursor: 'pointer', textAlign: 'center' }}>⚫ GitHub</div>
            </div>

            <p style={{ textAlign: 'center', fontSize: 12, color: '#555' }}>
              Account nahi hai?{' '}
              <span onClick={() => navigate('/register')} style={{ color: '#4ade80', cursor: 'pointer' }}>Register karo</span>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 16, position: 'absolute', bottom: 24 }}>
          <span style={{ fontSize: 11, color: '#333' }}>🔒 SSL Secured</span>
          <span style={{ fontSize: 11, color: '#333' }}>✓ Free to join</span>
          <span style={{ fontSize: 11, color: '#333' }}>No spam</span>
        </div>
      </div>
    </div>
  )
}

export default Login
