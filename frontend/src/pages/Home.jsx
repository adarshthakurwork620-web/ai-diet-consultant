import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null) // 'login' or 'register'
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', age: '', weight: '', height: '', diet_type: '', goal: ''
  })

  const updateLogin = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  const updateRegister = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) { setError('Sab fields bharo!'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('https://nutriai-backend-xspo.onrender.com/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else { setError(data.error || 'Login failed!') }
    } catch { setError('Server se connect nahi ho pa raha!') }
    setLoading(false)
  }

  const handleRegister = async () => {
    if (!registerForm.diet_type || !registerForm.goal) { setError('Sab fields bharo!'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('https://nutriai-backend-xspo.onrender.com/api/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...registerForm, age: parseInt(registerForm.age), weight: parseFloat(registerForm.weight), height: parseFloat(registerForm.height) })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else { setError(data.error || 'Registration failed!') }
    } catch { setError('Server se connect nahi ho pa raha!') }
    setLoading(false)
  }

  const features = [
    { icon: '🤖', title: 'AI Diet Consultation', desc: 'Real-time personalized diet advice powered by LLaMA 3.1 AI with Indian food focus.' },
    { icon: '📊', title: 'Smart Dashboard', desc: 'Track calories, protein, water intake and BMI with beautiful visual metrics.' },
    { icon: '🍽️', title: 'Weekly Meal Planner', desc: 'Get AI-generated 7-day Indian meal plans tailored to your health goals.' },
    { icon: '🔐', title: 'Secure & Private', desc: 'JWT authentication with encrypted passwords keeps your health data safe.' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Built with React + Vite for blazing fast performance on all devices.' },
    { icon: '🎯', title: 'Goal Tracking', desc: 'Set weight loss, muscle gain or fitness goals and track your progress daily.' },
  ]

  const steps = [
    { num: '01', title: 'Create Profile', desc: 'Sign up in 30 seconds. Tell us your age, weight, height and health goals.' },
    { num: '02', title: 'Get AI Plan', desc: 'Our AI instantly creates a personalized diet plan based on your profile.' },
    { num: '03', title: 'Track & Improve', desc: 'Chat with AI, track meals and watch your health improve day by day.' },
  ]

  const stats = [
    { value: '95%', label: 'AI Accuracy' },
    { value: '7-Day', label: 'Meal Plans' },
    { value: '500+', label: 'Indian Foods' },
    { value: '100%', label: 'Free Forever' },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥗</span>
            <span className="text-xl font-bold text-green-600">NutriAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
            <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
            <a href="#how" className="hover:text-green-600 transition-colors">How it works</a>
            <a href="#benefits" className="hover:text-green-600 transition-colors">Benefits</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setModal('login'); setError('') }}
              className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors">
              Login
            </button>
            <button onClick={() => { setModal('register'); setStep(1); setError('') }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-200 transition-all duration-300">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="animate-pulse">●</span> Powered by LLaMA 3.1 AI
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Personal<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              AI Diet Coach
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track meals, get personalized Indian diet plans, and consult with AI for real-time nutrition advice. Built for Indian lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => { setModal('register'); setStep(1); setError('') }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-green-200 active:scale-95 transition-all duration-300">
              Start Free Today 🚀
            </button>
            <button onClick={() => { setModal('login'); setError('') }}
              className="border-2 border-green-200 text-green-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-green-50 hover:scale-105 transition-all duration-300">
              Login →
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300">
                <p className="text-3xl font-bold text-green-600">{s.value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
            <p className="text-gray-500 text-lg">Everything you need to transform your nutrition habits</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className="p-6 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-50 hover:scale-[1.02] transition-all duration-300 group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How NutriAI Works</h2>
            <p className="text-gray-500 text-lg">Get started in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-green-200">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <h2 className="text-4xl font-bold mb-4 relative z-10">Ready to Transform Your Health?</h2>
            <p className="text-green-100 text-lg mb-8 relative z-10">Join thousands of users achieving their health goals with AI-powered nutrition</p>
            <button onClick={() => { setModal('register'); setStep(1); setError('') }}
              className="bg-white text-green-600 px-10 py-4 rounded-2xl text-lg font-bold hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 relative z-10">
              Start Your Free Journey Today 🥗
            </button>
            <p className="text-green-100 text-sm mt-4 relative z-10">No credit card required • Free forever • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              <span className="text-xl font-bold text-green-600">NutriAI</span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 NutriAI.</p>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">React</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Flask</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">Groq AI</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-white/70 hover:text-white text-xl">✕</button>
              <div className="text-3xl mb-1">🥗</div>
              <h2 className="text-xl font-bold">{modal === 'login' ? 'Welcome Back!' : 'Create Account'}</h2>
              <p className="text-green-100 text-sm">{modal === 'login' ? 'Login to NutriAI' : `Step ${step} of 3`}</p>
              {modal === 'register' && (
                <div className="mt-3 bg-white/20 rounded-full h-1.5">
                  <div className="bg-white rounded-full h-1.5 transition-all duration-700"
                    style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
                </div>
              )}
            </div>

            <div className="p-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">⚠️ {error}</div>}

              {/* Login Form */}
              {modal === 'login' && (
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email</label>
                  <input name="email" value={loginForm.email} onChange={updateLogin} placeholder="adarsh@email.com" type="email"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                  <input name="password" value={loginForm.password} onChange={updateLogin} placeholder="••••••••" type="password"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-6 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                  <button onClick={handleLogin} disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                    {loading ? 'Logging in...' : 'Login →'}
                  </button>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Account nahi hai?{' '}
                    <button onClick={() => { setModal('register'); setStep(1); setError('') }} className="text-green-500 font-semibold">Register karo</button>
                  </p>
                </div>
              )}

              {/* Register Form */}
              {modal === 'register' && (
                <div>
                  {step === 1 && (
                    <div className="animate-fadeIn">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input name="name" value={registerForm.name} onChange={updateRegister} placeholder="Adarsh Thakur"
                        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-3 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email</label>
                      <input name="email" value={registerForm.email} onChange={updateRegister} placeholder="adarsh@email.com" type="email"
                        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-3 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                      <input name="password" value={registerForm.password} onChange={updateRegister} placeholder="••••••••" type="password"
                        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-5 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                      <button onClick={() => { if (!registerForm.name || !registerForm.email || !registerForm.password) { setError('Sab fields bharo!'); return } setError(''); setStep(2) }}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300">
                        Continue →
                      </button>
                      <p className="text-center text-gray-400 text-sm mt-4">
                        Pehle se account hai?{' '}
                        <button onClick={() => { setModal('login'); setError('') }} className="text-green-500 font-semibold">Login karo</button>
                      </p>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {[{ label: '🎂 Age', name: 'age', placeholder: '19' }, { label: '⚖️ Weight kg', name: 'weight', placeholder: '58' }, { label: '📏 Height cm', name: 'height', placeholder: '165' }].map(f => (
                          <div key={f.name}>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{f.label}</label>
                            <input name={f.name} value={registerForm[f.name]} onChange={updateRegister} placeholder={f.placeholder} type="number"
                              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700 text-center font-semibold" />
                          </div>
                        ))}
                      </div>
                      <button onClick={() => { if (!registerForm.age || !registerForm.weight || !registerForm.height) { setError('Sab fields bharo!'); return } setError(''); setStep(3) }}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300">
                        Continue →
                      </button>
                      <button onClick={() => setStep(1)} className="w-full text-gray-400 text-sm mt-3 hover:text-green-500 transition-colors">← Back</button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fadeIn">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">🥦 Diet Type</label>
                      <select name="diet_type" value={registerForm.diet_type} onChange={updateRegister}
                        className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700">
                        <option value="">Select diet type</option>
                        <option value="Vegetarian">🥗 Vegetarian</option>
                        <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                        <option value="Vegan">🌱 Vegan</option>
                        <option value="Keto">🥑 Keto</option>
                      </select>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">🏆 Your Goal</label>
                      <div className="grid grid-cols-3 gap-2 mt-2 mb-5">
                        {[{ label: 'Weight Loss', icon: '⚖️' }, { label: 'Muscle Gain', icon: '💪' }, { label: 'Stay Fit', icon: '🏃' }].map(g => (
                          <button key={g.label} onClick={() => setRegisterForm({ ...registerForm, goal: g.label })}
                            className={`p-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-300 flex flex-col items-center gap-1 hover:scale-105
                              ${registerForm.goal === g.label ? 'border-green-500 bg-green-50 text-green-700 shadow-lg shadow-green-100' : 'border-gray-100 text-gray-500 bg-gray-50'}`}>
                            <span className="text-2xl">{g.icon}</span>
                            <span className="text-xs">{g.label}</span>
                          </button>
                        ))}
                      </div>
                      <button onClick={handleRegister} disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                        {loading ? 'Creating account...' : 'Get Started 🚀'}
                      </button>
                      <button onClick={() => setStep(2)} className="w-full text-gray-400 text-sm mt-3 hover:text-green-500 transition-colors">← Back</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  )
}

export default Login