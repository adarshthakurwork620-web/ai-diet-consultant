import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../api'

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', age: '', weight: '', height: '', diet_type: '', goal: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 12px', color: '#f0f0f8', fontSize: 13, outline: 'none', marginTop: 4, marginBottom: 12 }
  const labelStyle = { fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }

  const nextStep = () => {
    if (step === 1 && (!form.name || !form.email || !form.password)) { setError('Please fill all fields!'); return }
    if (step === 1 && form.password !== form.confirmPassword) { setError('Passwords do not match!'); return }
    setError(''); setStep(step + 1)
  }

  const handleRegister = async () => {
    if (!form.age || !form.weight || !form.height || !form.diet_type || !form.goal) { setError('Please fill all fields!'); return }
    setLoading(true); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await response.json()
      if (response.ok) { localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); navigate('/dashboard') }
      else { setError(data.error || 'Registration failed!') }
    } catch (err) { setError('Server se connect nahi ho pa raha!') }
    setLoading(false)
  }

  const goals = ['⚖️ Weight Loss', '💪 Muscle Gain', '🏃 Stay Fit']

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#f0f0f8', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: 'rgba(10,10,15,0.97)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff', fontSize: 12 }}>N</div>
          <span style={{ fontSize: 14, fontWeight: 500 }}>NutriAI</span>
        </div>
        <span style={{ fontSize: 12, color: '#555', cursor: 'pointer' }} onClick={() => navigate('/login')}>Already have account? Login</span>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 380, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(22,101,52,0.35)', borderBottom: '0.5px solid rgba(34,197,94,0.2)', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#fff', fontSize: 12 }}>N</div>
              <span style={{ fontSize: 14, fontWeight: 500 }}>NutriAI</span>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Create account</h2>
            <p style={{ fontSize: 12, color: '#86efac', marginBottom: 10 }}>Join NutriAI for free</p>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
              <div style={{ height: 3, background: '#22c55e', borderRadius: 3, width: `${(step / 3) * 100}%`, transition: 'width 0.4s' }} />
            </div>
            <div style={{ fontSize: 10, color: '#86efac', marginTop: 4 }}>Step {step} of 3</div>
          </div>

          <div style={{ padding: 24 }}>
            {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '0.5px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#fca5a5', marginBottom: 14 }}>⚠️ {error}</div>}

            {step === 1 && (
              <>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Account banao</div>
                <label style={labelStyle}>Full Name</label>
                <input name="name" value={form.name} onChange={update} placeholder="Siddh Jain" style={inputStyle} />
                <label style={labelStyle}>Email</label>
                <input name="email" value={form.email} onChange={update} placeholder="siddhj@email.com" type="email" style={inputStyle} />
                <label style={labelStyle}>Password</label>
                <input name="password" value={form.password} onChange={update} placeholder="••••••••" type="password" style={inputStyle} />
                <label style={labelStyle}>Confirm Password</label>
                <input name="confirmPassword" value={form.confirmPassword} onChange={update} placeholder="••••••••" type="password" style={inputStyle} />
                <button onClick={nextStep} style={{ width: '100%', padding: 11, borderRadius: 9, background: '#22c55e', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Continue →</button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Body info</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[['Age', 'age', 'number', '20'], ['Weight kg', 'weight', 'number', '60'], ['Height cm', 'height', 'number', '165']].map(([lbl, name, type, ph]) => (
                    <div key={name}>
                      <label style={labelStyle}>{lbl}</label>
                      <input name={name} value={form[name]} onChange={update} placeholder={ph} type={type} style={{ ...inputStyle, textAlign: 'center' }} />
                    </div>
                  ))}
                </div>
                <button onClick={nextStep} style={{ width: '100%', padding: 11, borderRadius: 9, background: '#22c55e', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 10 }}>Continue →</button>
                <p onClick={() => setStep(1)} style={{ textAlign: 'center', fontSize: 11, color: '#555', cursor: 'pointer' }}>← Back</p>
              </>
            )}

            {step === 3 && (
              <>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Preferences</div>
                <label style={labelStyle}>Diet Type</label>
                <select name="diet_type" value={form.diet_type} onChange={update} style={{ ...inputStyle, background: 'rgba(255,255,255,0.06)' }}>
                  <option value="">Select diet type</option>
                  {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Keto'].map(d => <option key={d}>{d}</option>)}
                </select>
                <label style={labelStyle}>Your Goal</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 6, marginBottom: 16 }}>
                  {goals.map(g => (
                    <div key={g} onClick={() => setForm({ ...form, goal: g })} style={{ background: form.goal === g ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)', border: form.goal === g ? '0.5px solid rgba(34,197,94,0.4)' : '0.5px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '10px 6px', textAlign: 'center', cursor: 'pointer', fontSize: 11, color: form.goal === g ? '#4ade80' : '#aaa' }}>{g}</div>
                  ))}
                </div>
                <button onClick={handleRegister} disabled={loading} style={{ width: '100%', padding: 11, borderRadius: 9, background: '#22c55e', color: '#fff', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 10, opacity: loading ? 0.6 : 1 }}>
                  {loading ? 'Creating account...' : 'Get Started →'}
                </button>
                <p onClick={() => setStep(2)} style={{ textAlign: 'center', fontSize: 11, color: '#555', cursor: 'pointer' }}>← Back</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
