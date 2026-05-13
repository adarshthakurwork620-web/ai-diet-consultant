import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
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
    { icon: '🤖', title: 'AI Diet Consultation', desc: 'Real-time personalized diet advice powered by LLaMA 3.1 AI with Indian food focus.', tag: 'Powered by Groq' },
    { icon: '📊', title: 'Smart Dashboard', desc: 'Track calories, protein, water intake and BMI with beautiful visual metrics.', tag: 'Real-time' },
    { icon: '🍽️', title: 'Weekly Meal Planner', desc: 'Get AI-generated 7-day Indian meal plans tailored to your health goals.', tag: 'Personalized' },
    { icon: '🔐', title: 'Secure & Private', desc: 'JWT authentication with encrypted passwords keeps your health data 100% safe.', tag: 'JWT Auth' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Built with React + Vite for blazing fast performance on all devices.', tag: 'Vite + React' },
    { icon: '🎯', title: 'Goal Tracking', desc: 'Set weight loss, muscle gain or fitness goals and track your progress daily.', tag: 'Smart Goals' },
  ]

  const steps = [
    { num: '01', title: 'Create Your Profile', desc: 'Sign up in 30 seconds and complete your health profile. Tell us about your age, weight, height, activity level, and nutrition goals.', points: ['Basic information', 'Health goals & preferences', 'Dietary restrictions'] },
    { num: '02', title: 'Get AI Diet Plan', desc: 'Our AI instantly creates a personalized Indian diet plan based on your profile and health goals.', points: ['Personalized meal plans', 'Indian food options', 'Calorie targets'] },
    { num: '03', title: 'Track & Improve', desc: 'Chat with AI consultant, track your meals and watch your health transform day by day.', points: ['AI consultation chat', 'Progress tracking', 'Daily health tips'] },
  ]

  const stats = [
    { value: '95%', label: 'AI Accuracy' },
    { value: '7-Day', label: 'Meal Plans' },
    { value: '500+', label: 'Indian Foods' },
    { value: '100%', label: 'Free Forever' },
  ]

  const benefits = [
    { icon: '🎯', title: '95% Accurate AI', desc: 'Our AI model classifies your diet with industry-leading accuracy.' },
    { icon: '⏰', title: 'Save 10+ Hours/Week', desc: 'Automated tracking and AI analysis saves you hours of manual work.' },
    { icon: '🔒', title: 'Bank-Level Security', desc: 'Your health data is encrypted and stored securely at all times.' },
    { icon: '📱', title: 'Works Everywhere', desc: 'Access NutriAI from any device, anytime, anywhere seamlessly.' },
  ]

  const footerLinks = {
    Product: ['Features', 'How It Works', 'Benefits', 'Pricing'],
    Company: ['About Us', 'Blog', 'Careers', 'Press Kit'],
    Resources: ['Documentation', 'API Reference', 'Community', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR Compliance'],
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🥗</span>
            </div>
            <span className="text-xl font-bold text-gray-900">NutriAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
            <a href="#features" className="hover:text-green-600 transition-colors duration-200">Features</a>
            <a href="#how" className="hover:text-green-600 transition-colors duration-200">How it works</a>
            <a href="#benefits" className="hover:text-green-600 transition-colors duration-200">Benefits</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setModal('login'); setError('') }}
              className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors px-4 py-2">
              Login
            </button>
            <button onClick={() => { setModal('register'); setStep(1); setError('') }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 hover:shadow-lg hover:shadow-green-200 transition-all duration-300">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-24 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Powered by Machine Learning
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Your Personal AI<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
              Nutrition Coach
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
            Track meals, analyze nutrition patterns, and receive personalized AI recommendations.
            Built with advanced machine learning for Indian lifestyle and food habits.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {['✅ Real-time calorie & macro tracking', '✅ AI-powered diet classification', '✅ Personalized nutrition insights'].map((t, i) => (
              <span key={i} className="text-sm text-gray-600 font-medium">{t}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => { setModal('register'); setStep(1); setError('') }}
              className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-green-200 active:scale-95 transition-all duration-300 shadow-lg shadow-green-200">
              Start Free Today 🚀
            </button>
            <button
              onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-gray-200 text-gray-600 px-10 py-4 rounded-2xl text-lg font-bold hover:border-green-400 hover:text-green-600 hover:scale-105 transition-all duration-300">
              See How It Works ↓
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 hover:scale-105 transition-all duration-300">
                <p className="text-3xl font-extrabold text-green-600">{s.value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 justify-center">
            {['100% Secure Data', 'Real-time Sync', 'Cross-Platform', 'Free Forever'].map((b, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need to transform your nutrition habits with artificial intelligence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className="p-8 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-2xl hover:shadow-green-50 hover:-translate-y-1 transition-all duration-300 group bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{f.icon}</div>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">{f.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn more <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              How NutriAI Works
            </h2>
            <p className="text-gray-500 text-lg">Get started in 3 simple steps and let AI do the rest</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold mb-6 shadow-lg shadow-green-200">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Why Choose NutriAI?
            </h2>
            <p className="text-gray-500 text-lg">Real benefits backed by science and technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((b, i) => (
              <div key={i} className="text-center p-6 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute top-5 left-1/4 w-20 h-20 bg-white/5 rounded-full"></div>
            <h2 className="text-4xl font-extrabold mb-4 relative z-10">Ready to Transform Your Nutrition with AI?</h2>
            <p className="text-green-100 text-lg mb-8 relative z-10 max-w-2xl mx-auto">
              Join thousands of users achieving their health goals with intelligent nutrition tracking
            </p>
            <button onClick={() => { setModal('register'); setStep(1); setError('') }}
              className="bg-white text-green-600 px-10 py-4 rounded-2xl text-lg font-extrabold hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 relative z-10 shadow-lg">
              Start Your Free Journey Today 🥗
            </button>
            <div className="flex justify-center gap-6 mt-6 relative z-10">
              {['No credit card required', 'Free forever', 'Cancel anytime'].map((t, i) => (
                <span key={i} className="text-green-100 text-sm flex items-center gap-1">
                  <span>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🥗</span>
                </div>
                <span className="text-xl font-bold text-white">NutriAI</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                AI-powered nutrition tracking platform built with cutting-edge machine learning technology.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['React', 'Flask', 'SQLite', 'Groq AI'].map((t, i) => (
                  <span key={i} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm hover:text-green-400 transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 NutriAI. All rights reserved. Built with ❤️ by Adarsh Thakur</p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-white/70 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all">✕</button>
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

              {modal === 'login' && (
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input name="email" value={loginForm.email} onChange={updateLogin} placeholder="adarsh@email.com" type="email"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <input name="password" value={loginForm.password} onChange={updateLogin} placeholder="••••••••" type="password"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-6 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-700" />
                  <button onClick={handleLogin} disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                    {loading ? '⏳ Logging in...' : 'Sign In →'}
                  </button>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Don't have an account?{' '}
                    <button onClick={() => { setModal('register'); setStep(1); setError('') }} className="text-green-500 font-bold hover:text-green-700">Register here</button>
                  </p>
                </div>
              )}

              {modal === 'register' && step === 1 && (
                <div className="animate-fadeIn">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input name="name" value={registerForm.name} onChange={updateRegister} placeholder="Adarsh Thakur"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-3 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input name="email" value={registerForm.email} onChange={updateRegister} placeholder="adarsh@email.com" type="email"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-3 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  <input name="password" value={registerForm.password} onChange={updateRegister} placeholder="••••••••" type="password"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-5 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700" />
                  <button onClick={() => { if (!registerForm.name || !registerForm.email || !registerForm.password) { setError('Sab fields bharo!'); return } setError(''); setStep(2) }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300">
                    Continue →
                  </button>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account?{' '}
                    <button onClick={() => { setModal('login'); setError('') }} className="text-green-500 font-bold">Login here</button>
                  </p>
                </div>
              )}

              {modal === 'register' && step === 2 && (
                <div className="animate-fadeIn">
                  <p className="text-gray-500 text-sm mb-4">Tell us about your body measurements</p>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[{ label: '🎂 Age', name: 'age', placeholder: '19' }, { label: '⚖️ Weight kg', name: 'weight', placeholder: '58' }, { label: '📏 Height cm', name: 'height', placeholder: '165' }].map(f => (
                      <div key={f.name}>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{f.label}</label>
                        <input name={f.name} value={registerForm[f.name]} onChange={updateRegister} placeholder={f.placeholder} type="number"
                          className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700 text-center font-bold" />
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

              {modal === 'register' && step === 3 && (
                <div className="animate-fadeIn">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">🥦 Diet Type</label>
                  <select name="diet_type" value={registerForm.diet_type} onChange={updateRegister}
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-all text-gray-700">
                    <option value="">Select your diet type</option>
                    <option value="Vegetarian">🥗 Vegetarian</option>
                    <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                    <option value="Vegan">🌱 Vegan</option>
                    <option value="Keto">🥑 Keto</option>
                  </select>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">🏆 Your Goal</label>
                  <div className="grid grid-cols-3 gap-2 mt-2 mb-5">
                    {[{ label: 'Weight Loss', icon: '⚖️' }, { label: 'Muscle Gain', icon: '💪' }, { label: 'Stay Fit', icon: '🏃' }].map(g => (
                      <button key={g.label} onClick={() => setRegisterForm({ ...registerForm, goal: g.label })}
                        className={`p-3 rounded-2xl border-2 text-sm font-bold transition-all duration-300 flex flex-col items-center gap-1 hover:scale-105 active:scale-95
                          ${registerForm.goal === g.label ? 'border-green-500 bg-green-50 text-green-700 shadow-lg shadow-green-100' : 'border-gray-100 text-gray-500 bg-gray-50 hover:border-green-200'}`}>
                        <span className="text-2xl">{g.icon}</span>
                        <span className="text-xs">{g.label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={handleRegister} disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                    {loading ? '⏳ Creating account...' : 'Get Started 🚀'}
                  </button>
                  <button onClick={() => setStep(2)} className="w-full text-gray-400 text-sm mt-3 hover:text-green-500 transition-colors">← Back</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

export default Login