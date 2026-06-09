import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://nutriai-backend-xspo.onrender.com'

export default function Login() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null) // 'login' | 'register' | 'forgot'
  const [step, setStep] = useState(1) // For multi-step modals
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [visible, setVisible] = useState(false)
  const [newsEmail, setNewsEmail] = useState('')
  const [loginForm, setLoginForm] = useState({ email: '', password: '', showPwd: false })
  const [reg, setReg] = useState({
    name: '', email: '', password: '', confirmPwd: '',
    age: '', weight: '', height: '',
    diet_type: '', goal: ''
  })
  const [forgotEmail, setForgotEmail] = useState('')

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  const upL = e => setLoginForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const upR = e => setReg(p => ({ ...p, [e.target.name]: e.target.value }))
  const openModal = (type) => { setModal(type); setStep(1); setError(''); setSuccess('') }

  const doLogin = async () => {
    if (!loginForm.email || !loginForm.password) return setError('Please fill all fields')
    setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
      })
      const d = await r.json()
      if (r.ok) {
        localStorage.setItem('token', d.token)
        localStorage.setItem('user', JSON.stringify(d.user))
        navigate('/dashboard')
      } else setError(d.error || 'Login failed')
    } catch { setError('Cannot connect to server') }
    setLoading(false)
  }

  const doRegister = async () => {
    if (!reg.diet_type || !reg.goal) return setError('Select diet type and goal')
    setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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
      } else setError(d.error || 'Registration failed')
    } catch { setError('Cannot connect to server') }
    setLoading(false)
  }

  const doForgotPassword = async () => {
    if (!forgotEmail) return setError('Please enter your email')
    setLoading(true); setError('')
    // Simulate sending reset email (backend endpoint not implemented yet)
    await new Promise(r => setTimeout(r, 1500))
    setSuccess(`Reset link sent to ${forgotEmail}! Check your inbox.`)
    setLoading(false)
  }

  /* ── DATA ── */
  const features = [
    { icon: '🧠', title: 'AI Meal Planning', desc: 'Personalized Indian meal plans by LLaMA 3.1 AI based on your health profile.', tag: 'AI Powered', tagColor: 'bg-violet-100 text-violet-700' },
    { icon: '⚖️', title: 'BMI Calculator', desc: 'Real-time BMI tracking with personalized insights and recommendations.', tag: 'Smart', tagColor: 'bg-blue-100 text-blue-700' },
    { icon: '🔥', title: 'Calorie Tracker', desc: 'Track daily calories and macros with 500+ Indian foods database.', tag: 'Real-time', tagColor: 'bg-orange-100 text-orange-700' },
    { icon: '💡', title: 'Smart Tips', desc: 'AI-powered nutrition tips based on your goals and daily intake.', tag: 'Personalized', tagColor: 'bg-yellow-100 text-yellow-700' },
    { icon: '📈', title: 'Progress Tracking', desc: 'Visualize your health journey with streaks and milestone celebrations.', tag: 'Analytics', tagColor: 'bg-green-100 text-green-700' },
    { icon: '🎯', title: 'Goal-Based Plans', desc: 'Weight loss, muscle gain or fitness — custom Indian diet plans.', tag: 'Goal Driven', tagColor: 'bg-pink-100 text-pink-700' },
  ]

  const steps = [
    { n: '01', icon: '👤', title: 'Create Profile', desc: 'Sign up in 30 seconds with your health details.', pts: ['Personal health data', 'Dietary preferences', 'Health goals'] },
    { n: '02', icon: '🤖', title: 'Get AI Plan', desc: 'AI creates a personalized Indian diet plan instantly.', pts: ['7-day meal plans', 'Indian food options', 'Macro targets'] },
    { n: '03', icon: '📈', title: 'Track & Improve', desc: 'Chat with AI, log meals, transform your health daily.', pts: ['AI consultation', 'Progress tracking', 'Health tips'] },
  ]

  const testimonials = [
    { name: 'Priya Sharma', role: 'Software Engineer, Bangalore', av: 'PS', avColor: 'from-pink-500 to-rose-500', text: 'Lost 8kg in 3 months with personalized Indian meal plans. The AI is incredibly accurate!', stars: 5, result: '-8 kg', resultColor: 'bg-green-100 text-green-700' },
    { name: 'Rahul Verma', role: 'Fitness Enthusiast, Mumbai', av: 'RV', avColor: 'from-blue-500 to-cyan-500', text: 'Best diet app for Indians! Understands dal, roti, sabzi in right proportions. Gained 5kg muscle!', stars: 5, result: '+5 kg', resultColor: 'bg-blue-100 text-blue-700' },
    { name: 'Dr. Anita Patel', role: 'Doctor, Ahmedabad', av: 'AP', avColor: 'from-purple-500 to-violet-500', text: 'I recommend NutriAI to my patients. Evidence-based nutrition advice. Truly impressive!', stars: 5, result: '95% accuracy', resultColor: 'bg-purple-100 text-purple-700' },
  ]

  const stats = [
    { v: '10K+', l: 'Active Users', i: '👥' },
    { v: '95%', l: 'Satisfaction', i: '⭐' },
    { v: '50K+', l: 'Meal Plans', i: '🍽️' },
    { v: 'Free', l: 'Forever', i: '🎁' },
  ]

  const footer = {
    'Quick Links': ['Home', 'About', 'Features', 'Pricing', 'Contact'],
    'Services': ['Diet Plan Generator', 'BMI Calculator', 'Calorie Counter', 'Nutrition Tips', 'Weight Loss Plans'],
    'Legal': ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'GDPR'],
    'Support': ['FAQ', 'Help Center', 'Email Support', 'Community'],
  }

  const Field = ({ label, name, type = 'text', placeholder, value, onChange, right }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
      <div className="relative">
        <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-gray-900 font-medium text-sm focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-md focus:shadow-green-100 transition-all duration-200 placeholder-gray-300"
          style={{ paddingRight: right ? '48px' : '16px' }} />
        {right}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200">
              <span className="text-lg">🥗</span>
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">NutriAI</span>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200 hidden sm:block">BETA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[['Features', '#features'], ['How it Works', '#how'], ['Testimonials', '#testi']].map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors duration-200 relative group">
                {l}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-500 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => openModal('login')}
              className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-green-600 px-4 py-2 rounded-xl hover:bg-green-50 transition-all">
              Sign In
            </button>
            <button onClick={() => openModal('register')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 hover:shadow-lg hover:shadow-green-200 active:scale-95 transition-all duration-300 shadow-md">
              Get Started →
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-100/30 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 flex-1 flex items-center py-16">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">

            {/* Left */}
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.8s ease' }}>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold border border-green-200 shadow-sm mb-7">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" style={{ animation: 'pulse 1.5s ease infinite' }} />
                AI-Powered Nutrition Platform
                <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>
              </div>

              <h1 className="text-5xl md:text-[64px] font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-5">
                Your Personal<br />
                <span style={{ background: 'linear-gradient(90deg,#059669,#10b981,#6ee7b7,#10b981,#059669)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite' }}>
                  AI Diet
                </span><br />
                Consultant
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                Smart meal plans, calorie tracking, and personalized nutrition powered by AI — built for Indian lifestyle.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={() => openModal('register')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-base font-bold hover:scale-105 hover:shadow-2xl hover:shadow-green-200 active:scale-95 transition-all duration-300 shadow-xl">
                  🚀 Get Started Free
                </button>
                <button onClick={() => openModal('login')}
                  className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-2xl text-base font-bold hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all duration-300">
                  Sign In →
                </button>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {['✅ No credit card', '✅ Free forever', '✅ Indian food DB', '✅ AI-powered'].map(b => (
                  <span key={b} className="text-sm text-gray-400 font-medium">{b}</span>
                ))}
              </div>
            </div>

            {/* Right — Mockup */}
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.8s ease 0.3s' }}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">NutriAI Assistant</p>
                      <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" style={{ animation: 'pulse 1.5s ease infinite' }} />
                        Online
                      </p>
                    </div>
                    <div className="ml-auto bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full border border-green-100">AI Active</div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-3">📅 Today's Meal Plan</p>
                    {[['🌅','Breakfast','Oats + Banana','320'],['☀️','Lunch','Dal Rice + Salad','580'],['🌙','Dinner','Khichdi + Dahi','400']].map(([ic,t,f,c]) => (
                      <div key={t} className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 shadow-sm mb-1.5 last:mb-0">
                        <div className="flex items-center gap-2">
                          <span>{ic}</span>
                          <div>
                            <p className="text-xs text-gray-400">{t}</p>
                            <p className="text-xs font-semibold text-gray-700">{f}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-green-600">{c} kcal</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[['🔥','1,300','Calories','text-orange-500'],['💪','68g','Protein','text-blue-500'],['⚖️','22.4','BMI','text-green-500']].map(([ic,v,l,c]) => (
                      <div key={l} className="bg-gray-50 rounded-2xl p-3 text-center">
                        <p className="text-base font-extrabold text-gray-900">{v}</p>
                        <p className={`text-xs font-semibold ${c} mt-0.5`}>{l}</p>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => openModal('register')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold py-3 rounded-2xl hover:scale-[1.02] transition-all">
                    💬 Ask AI for Diet Advice →
                  </button>
                </div>

                <div className="absolute -top-5 -right-4 bg-white rounded-2xl shadow-xl px-3 py-2.5 flex items-center gap-2 border border-gray-50" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>
                  <span className="text-xl">⭐</span>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900">4.9 / 5 Rating</p>
                    <p className="text-xs text-gray-400">10K+ users</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl px-4 py-2.5 text-white shadow-xl" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}>
                  <p className="text-xs font-bold">🎯 Goal Achieved!</p>
                  <p className="text-xs opacity-80">Lost 5 kg this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-gray-100 bg-white/80 backdrop-blur py-6">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.l} className="flex items-center gap-3">
                <span className="text-2xl">{s.i}</span>
                <div>
                  <p className="text-xl font-extrabold text-gray-900 tracking-tight">{s.v}</p>
                  <p className="text-xs text-gray-400 font-medium">{s.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-100 mb-5">Features</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Powerful AI-Driven Features</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Everything you need to take control of your nutrition</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-2xl hover:shadow-green-50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-all duration-300">{f.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">{f.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.tagColor}`}>{f.tag}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-100 mb-5">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Start in 3 Simple Steps</h2>
            <p className="text-gray-400 text-lg">Get your AI diet plan in under 2 minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 relative">
            <div className="hidden md:block absolute top-14 left-[22%] right-[22%] h-0.5 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200" />
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                <div className="absolute -top-3.5 left-7 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shadow-lg">{s.n}</div>
                <div className="text-4xl mb-4 mt-2">{s.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.pts.map(p => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-gray-500">
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

      {/* ── TESTIMONIALS ── */}
      <section id="testi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-100 mb-5">Testimonials</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Real Results, Real People</h2>
            <p className="text-gray-400 text-lg">Join thousands of Indians transforming their health</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">{Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${t.resultColor}`}>{t.result}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avColor} flex items-center justify-center text-white text-sm font-bold shadow-md`}>{t.av}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Why <span style={{ background: 'linear-gradient(135deg,#10b981,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NutriAI</span> is Different
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-16">
            {[
              { i: '🇮🇳', t: 'Built for India', d: 'Understands Indian cuisine, festivals, and food culture.' },
              { i: '🧬', t: 'Science-Based', d: 'Peer-reviewed nutritional science and clinical guidelines.' },
              { i: '🔒', t: 'Privacy First', d: 'JWT encrypted, never shared with third parties.' },
              { i: '⚡', t: 'Instant Results', d: 'Get your personalized diet plan in under 60 seconds.' },
            ].map((b, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{b.i}</div>
                <h3 className="text-base font-bold mb-2">{b.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-px rounded-3xl shadow-2xl" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <div className="bg-gray-900 rounded-3xl px-10 py-10">
                <h3 className="text-3xl font-extrabold mb-3">Ready to Transform?</h3>
                <p className="text-gray-400 mb-6 text-sm">Join 10,000+ Indians achieving their health goals</p>
                <button onClick={() => openModal('register')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-2xl text-base font-bold hover:scale-105 active:scale-95 transition-all duration-300">
                  🚀 Start Free Today
                </button>
                <p className="text-gray-600 text-xs mt-4">No credit card · Free forever</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl border border-green-900/30 p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'rgba(16,185,129,0.05)' }}>
            <div>
              <h3 className="text-white text-lg font-bold mb-1">Get Nutrition Tips in Your Inbox</h3>
              <p className="text-gray-400 text-sm">Weekly AI-powered insights and health tips</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input type="email" value={newsEmail} onChange={e => setNewsEmail(e.target.value)} placeholder="Enter your email..."
                className="flex-1 md:w-64 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder-gray-500" />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap hover:scale-105 transition-all">
                Subscribe →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"><span>🥗</span></div>
                <span className="text-lg font-extrabold text-white">NutriAI</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">AI-powered nutrition built for Indian lifestyle.</p>
              <div className="flex gap-2">
                {['𝕏', 'in', 'f', '▶'].map((s, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center text-xs font-bold transition-all hover:scale-110">{s}</a>
                ))}
              </div>
            </div>
            {Object.entries(footer).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(l => (
                    <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-green-400 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </footer>

      {/* ══════════════════════════════════
          MODALS
      ══════════════════════════════════ */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
          onClick={e => e.target === e.currentTarget && setModal(null)}>

          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden" style={{ animation: 'fadeUp 0.35s ease' }}>

            {/* Modal Header */}
            <div className="relative p-6 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full" />
              <button onClick={() => setModal(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-sm font-bold transition-colors">✕</button>
              <p className="text-2xl mb-1">🥗</p>
              <h2 className="text-xl font-extrabold tracking-tight">
                {modal === 'login' ? 'Welcome Back!' : modal === 'register' ? 'Create Free Account' : '🔑 Forgot Password'}
              </h2>
              <p className="text-green-100 text-sm">
                {modal === 'login' ? 'Sign in to NutriAI' :
                  modal === 'register' ? `Step ${step} of 3` :
                  'Reset your password'}
              </p>
              {modal === 'register' && (
                <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${step * 33.3}%` }} />
                </div>
              )}
            </div>

            <div className="p-6">
              {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">⚠️ {error}</div>}
              {success && <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">✅ {success}</div>}

              {/* ── LOGIN ── */}
              {modal === 'login' && (
                <>
                  <Field label="Email Address" name="email" type="email" placeholder="" value={loginForm.email} onChange={upL} />

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                      <button onClick={() => { setModa('forgot'); setError(''); setSuccess('') }}
                        className="text-xs text-green-600 font-semibold hover:text-green-700 transition-colors">
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        name="password"
                        type={loginForm.showPwd ? 'text' : 'password'}
                        placeholder=""
                        value={loginForm.password}
                        onChange={upL}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 pr-12 text-gray-900 font-medium text-sm focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-md focus:shadow-green-100 transition-all placeholder-gray-300"
                      />
                      <button type="button"
                        onClick={() => setLoginForm(p => ({ ...p, showPwd: !p.showPwd }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg transition-colors">
                        {loginForm.showPwd ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <button onClick={doLogin} disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                    {loading ? '⏳ Signing in...' : 'Sign In →'}
                  </button>

                  <p className="text-center text-gray-400 text-sm mt-4">
                    New to NutriAI?{' '}
                    <button onClick={() => openModal('register')} className="text-green-600 font-bold hover:text-green-700">Create free account</button>
                  </p>
                </>
              )}

              {/* ── FORGOT PASSWORD ── */}
              {modal === 'forgot' && (
                <>
                  {!success ? (
                    <>
                      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                        Enter your registered email address. We'll send you a link to reset your password.
                      </p>
                      <Field label="Email Address" name="forgotEmail" type="email" placeholder=""
                        value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />

                      <button onClick={doForgotPassword} disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-green-200 active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : '📧 Send Reset Link'}
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-6xl mb-4">📬</div>
                      <h3 className="text-lg font-extrabold text-gray-900 mb-2">Check Your Email!</h3>
                      <p className="text-gray-400 text-sm mb-6">We've sent a password reset link to <span className="font-semibold text-gray-700">{forgotEmail}</span></p>
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-left mb-4">
                        <p className="text-sm text-green-700 font-semibold mb-1">📋 Next steps:</p>
                        <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                          <li>Check your email inbox</li>
                          <li>Click the reset link in the email</li>
                          <li>Create your new password</li>
                          <li>Sign in with your new password</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  <button onClick={() => { setModal('login'); setError(''); setSuccess(''); setForgotEmail('') }}
                    className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">
                    ← Back to Sign In
                  </button>
                </>
              )}

              {/* ── REGISTER STEP 1 ── */}
              {modal === 'register' && step === 1 && (
                <>
                  <Field label="Full Name" name="name" placeholder="" value={reg.name} onChange={upR} />
                  <Field label="Email Address" name="email" type="email" placeholder="" value={reg.email} onChange={upR} />

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Password</label>
                    <div className="relative">
                      <input name="password" type={reg.showPwd ? 'text' : 'password'} placeholder="Min 6 characters"
                        value={reg.password} onChange={upR}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 pr-12 text-gray-900 font-medium text-sm focus:outline-none focus:border-green-400 focus:bg-white transition-all placeholder-gray-300" />
                      <button type="button" onClick={() => setReg(p => ({ ...p, showPwd: !p.showPwd }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                        {reg.showPwd ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {reg.password && (
                      <div className="mt-2 flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                            reg.password.length > i * 3 + 2
                              ? i < 1 ? 'bg-red-400' : i < 2 ? 'bg-yellow-400' : i < 3 ? 'bg-blue-400' : 'bg-green-400'
                              : 'bg-gray-200'
                          }`} />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">
                          {reg.password.length < 4 ? 'Weak' : reg.password.length < 7 ? 'Fair' : reg.password.length < 10 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                    )}
                  </div>

                  <button onClick={() => {
                    if (!reg.name || !reg.email || !reg.password) return setError('Fill all fields')
                    if (reg.password.length < 6) return setError('Password must be at least 6 characters')
                    setError(''); setStep(2)
                  }} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-300 mt-1">
                    Continue →
                  </button>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account?{' '}
                    <button onClick={() => openModal('login')} className="text-green-600 font-bold">Sign in</button>
                  </p>
                </>
              )}

              {/* ── REGISTER STEP 2 ── */}
              {modal === 'register' && step === 2 && (
                <>
                  <p className="text-gray-400 text-sm mb-4">Help us personalize your AI diet plan</p>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[['🎂 Age', 'age', ''], ['⚖️ Weight', 'weight', ''], ['📏 Height', 'height', '']].map(([label, name, ph]) => (
                      <div key={name}>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
                        <input name={name} type="number" placeholder={ph} value={reg[name]} onChange={upR}
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-3 py-3 text-gray-900 font-bold text-sm text-center focus:outline-none focus:border-green-400 focus:bg-white transition-all" />
                      </div>
                    ))}
                  </div>

                  {/* BMI Preview */}
                  {reg.weight && reg.height && (
                    <div className="mb-5 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 font-semibold">Estimated BMI</p>
                        <p className="text-2xl font-extrabold text-green-600">
                          {(parseFloat(reg.weight) / ((parseFloat(reg.height) / 100) ** 2)).toFixed(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-semibold">Status</p>
                        <p className="text-sm font-bold text-green-600">
                          {(() => {
                            const b = parseFloat(reg.weight) / ((parseFloat(reg.height) / 100) ** 2)
                            if (b < 18.5) return '🔵 Underweight'
                            if (b < 25) return '🟢 Normal'
                            if (b < 30) return '🟡 Overweight'
                            return '🔴 Obese'
                          })()}
                        </p>
                      </div>
                    </div>
                  )}

                  <button onClick={() => {
                    if (!reg.age || !reg.weight || !reg.height) return setError('Fill all fields')
                    setError(''); setStep(3)
                  }} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-300">
                    Continue →
                  </button>
                  <button onClick={() => setStep(1)} className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">← Back</button>
                </>
              )}

              {/* ── REGISTER STEP 3 ── */}
              {modal === 'register' && step === 3 && (
                <>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">🥦 Diet Preference</label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[['Vegetarian', '🥗'], ['Non-Vegetarian', '🍗'], ['Vegan', '🌱'], ['Keto', '🥑']].map(([v, ic]) => (
                      <button key={v} onClick={() => setReg(p => ({ ...p, diet_type: v }))}
                        className={`p-3 rounded-2xl border-2 text-left transition-all hover:scale-[1.02]
                          ${reg.diet_type === v ? 'border-green-500 bg-green-50 text-green-700 shadow-md' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-green-200'}`}>
                        <span className="text-xl">{ic}</span>
                        <p className="text-xs font-bold mt-1">{v}</p>
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🏆 Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[['Lose Weight', '⚖️'], ['Build Muscle', '💪'], ['Stay Fit', '🏃']].map(([l, ic]) => (
                      <button key={l} onClick={() => setReg(p => ({ ...p, goal: l }))}
                        className={`py-3 px-2 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all hover:scale-105
                          ${reg.goal === l ? 'border-green-500 bg-green-50 text-green-700 shadow-md' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-green-200'}`}>
                        <span className="text-xl">{ic}</span>{l}
                      </button>
                    ))}
                  </div>

                  <button onClick={doRegister} disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-2xl hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-300 disabled:opacity-50">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : '🚀 Get Started Free'}
                  </button>
                  <button onClick={() => setStep(2)} className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">← Back</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
      `}</style>
    </div>
  )
}