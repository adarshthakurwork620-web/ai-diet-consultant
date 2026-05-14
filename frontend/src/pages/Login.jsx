import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://nutriai-backend-xspo.onrender.com'

export default function Login() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [reg, setReg] = useState({ name:'', email:'', password:'', age:'', weight:'', height:'', diet_type:'', goal:'' })

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const upL = e => setLoginForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const upR = e => setReg(p => ({ ...p, [e.target.name]: e.target.value }))

  const doLogin = async () => {
    if (!loginForm.email || !loginForm.password) return setError('Please fill all fields')
    setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(loginForm) })
      const d = await r.json()
      if (r.ok) { localStorage.setItem('token', d.token); localStorage.setItem('user', JSON.stringify(d.user)); navigate('/dashboard') }
      else setError(d.error || 'Login failed')
    } catch { setError('Cannot connect to server') }
    setLoading(false)
  }

  const doRegister = async () => {
    if (!reg.diet_type || !reg.goal) return setError('Select diet type and goal')
    setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/register`, { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...reg, age: parseInt(reg.age), weight: parseFloat(reg.weight), height: parseFloat(reg.height) }) })
      const d = await r.json()
      if (r.ok) { localStorage.setItem('token', d.token); localStorage.setItem('user', JSON.stringify(d.user)); navigate('/dashboard') }
      else setError(d.error || 'Registration failed')
    } catch { setError('Cannot connect to server') }
    setLoading(false)
  }

  const openModal = (type) => { setModal(type); setStep(1); setError('') }

  /* ─── DATA ─── */
  const features = [
    { icon:'🧠', title:'AI Diet Consultation', desc:'Real-time personalized diet advice powered by LLaMA 3.1 AI, focused on Indian cuisine and food culture.' },
    { icon:'⚖️', title:'BMI Calculator', desc:'Track your BMI in real-time with intelligent health insights and body-type specific recommendations.' },
    { icon:'🔥', title:'Calorie Tracker', desc:'Monitor daily calories, macros, and nutrients with our comprehensive Indian food database.' },
    { icon:'💡', title:'Smart Recommendations', desc:'AI-powered nutrition tips based on your activity level, health goals, and dietary preferences.' },
    { icon:'📈', title:'Progress Tracking', desc:'Visualize your health journey with charts, streaks, and personalized milestone celebrations.' },
    { icon:'🎯', title:'Goal-Based Diet Plans', desc:'Weight loss, muscle gain, or staying fit — get a custom plan that actually works for you.' },
  ]

  const steps = [
    { n:'01', icon:'👤', title:'Create Your Profile', desc:'Sign up in 30 seconds. Enter age, weight, height and health goals.', pts:['Personal health data','Dietary preferences','Health goals'] },
    { n:'02', icon:'🤖', title:'Get AI Diet Plan', desc:'Our AI instantly creates a personalized Indian diet plan tailored for you.', pts:['7-day meal plans','Indian food options','Macro targets'] },
    { n:'03', icon:'📈', title:'Track & Improve', desc:'Chat with AI, log meals, and watch your health transform daily.', pts:['AI chat consultation','Progress tracking','Daily health tips'] },
  ]

  const testimonials = [
    { name:'Priya Sharma', role:'Software Engineer, Bangalore', av:'PS', text:'NutriAI transformed my eating! Lost 8kg in 3 months with personalized Indian meal plans. The AI is incredibly accurate.', stars:5, result:'-8 kg in 3 months' },
    { name:'Rahul Verma', role:'Fitness Enthusiast, Mumbai', av:'RV', text:'Best diet app for Indians! It understands our food culture — dal, roti, sabzi in right proportions. Gained 5kg muscle!', stars:5, result:'+5 kg muscle' },
    { name:'Dr. Anita Patel', role:'Doctor, Ahmedabad', av:'AP', text:'As a doctor I recommend NutriAI to patients. Calorie tracking is accurate and AI gives evidence-based advice.', stars:5, result:'95% accuracy' },
  ]

  const stats = [
    { v:'10K+', l:'Active Users', i:'👥' },
    { v:'95%',  l:'Satisfaction', i:'⭐' },
    { v:'50K+', l:'Meal Plans',   i:'🍽️' },
    { v:'Free', l:'Forever',      i:'🎁' },
  ]

  const footer = {
    'Quick Links':['Home','About','Features','Pricing','Contact'],
    'Services':['Diet Plan Generator','BMI Calculator','Calorie Counter','Nutrition Tips','Weight Loss Plans'],
    'Legal':['Privacy Policy','Terms & Conditions','Cookie Policy','GDPR'],
    'Support':['FAQ','Help Center','Email Support','Community'],
  }

  /* ─── INPUT COMPONENT ─── */
  const Field = ({ label, name, type='text', placeholder, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className="input-field" />
    </div>
  )

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen bg-white" style={{fontFamily:"'Plus Jakarta Sans', sans-serif"}}>

      {/* ══ NAVBAR ══ */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200 anim-float">
              <span className="text-lg">🥗</span>
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">NutriAI</span>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">BETA</span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {[['Features','#features'],['How it Works','#how'],['Testimonials','#testi'],['Pricing','#pricing']].map(([l,h]) => (
              <a key={l} href={h} className="nav-link">{l}</a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <button onClick={() => openModal('login')} className="btn-secondary px-4 py-2 rounded-xl text-sm">Sign In</button>
            <button onClick={() => openModal('register')} className="btn-primary px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-green-200">Get Started →</button>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        {/* BG blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50/60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-100/40 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="section-label mb-6">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              AI-Powered Nutrition Platform
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Your Personal<br />
              <span className="shimmer-text">AI Diet</span><br />
              Consultant
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Smart meal plans, calorie tracking, and personalized nutrition powered by AI — built for Indian lifestyle and food habits.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => openModal('register')} className="btn-primary px-7 py-3.5 rounded-2xl text-base shadow-xl shadow-green-200">
                🚀 Get Started Free
              </button>
              <button onClick={() => openModal('register')} className="btn-secondary px-7 py-3.5 rounded-2xl text-base">
                🥗 Generate Diet Plan
              </button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['✅ No credit card','✅ Free forever','✅ Indian food DB','✅ AI-powered'].map(b => (
                <span key={b} className="text-sm text-gray-400 font-medium">{b}</span>
              ))}
            </div>
          </div>

          {/* Right — App mockup */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* Main card */}
              <div className="card p-6 shadow-2xl anim-float">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">NutriAI Assistant</p>
                    <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" style={{animation:'pulse-dot 1.5s ease infinite'}} />
                      Online
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-3">Namaste! Based on your profile, here's your plan:</p>
                  <div className="space-y-2">
                    {[
                      ['🌅','Breakfast','Oats + Banana + Milk','320 kcal'],
                      ['☀️','Lunch','Dal Rice + Salad','580 kcal'],
                      ['🌙','Dinner','Khichdi + Dahi','400 kcal'],
                    ].map(([ic,type,food,cal]) => (
                      <div key={type} className="flex items-center justify-between bg-white rounded-xl p-2.5 text-xs">
                        <span className="flex items-center gap-2">
                          <span>{ic}</span>
                          <span className="text-gray-400">{type}</span>
                          <span className="font-semibold text-gray-700">{food}</span>
                        </span>
                        <span className="text-green-600 font-bold">{cal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[['🔥','1,300','Calories','text-orange-500'],['💪','68g','Protein','text-blue-500'],['⚖️','22.4','BMI','text-green-500']].map(([ic,v,l,c]) => (
                    <div key={l} className="bg-gray-50 rounded-xl p-2.5 text-center">
                      <p className={`text-base font-extrabold ${c}`}>{v}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-5 -right-5 card px-3 py-2.5 shadow-lg flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-xs font-bold text-gray-900">4.9 / 5 Rating</p>
                  <p className="text-xs text-gray-400">10K+ users</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl px-4 py-2.5 text-white shadow-xl shadow-green-300">
                <p className="text-xs font-bold">🎯 Goal Achieved!</p>
                <p className="text-xs opacity-80">Lost 5 kg this month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-gray-100 bg-white/80 backdrop-blur py-5">
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

      {/* ══ FEATURES ══ */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4">Features</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Everything you need to take control of your nutrition and reach your health goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f,i) => (
              <div key={i} className="card p-8 cursor-default">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Start in 3 Simple Steps
            </h2>
            <p className="text-gray-400 text-lg">Get your personalized AI diet plan in under 2 minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s,i) => (
              <div key={i} className="card p-8 relative">
                <div className="absolute -top-3 left-6 w-7 h-7 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-extrabold shadow-lg shadow-green-200">
                  {s.n}
                </div>
                <div className="text-4xl mb-4 mt-2">{s.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.pts.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section id="testi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4">Testimonials</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Real Results, Real People
            </h2>
            <p className="text-gray-400 text-lg">Join thousands of Indians transforming their health</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t,i) => (
              <div key={i} className="testimonial-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array(t.stars).fill(0).map((_,j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <span className="badge bg-green-50 text-green-700 border border-green-100">{t.result}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-green-200">
                    {t.av}
                  </div>
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

      {/* ══ WHY US ══ */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4" style={{background:'rgba(16,185,129,0.1)',borderColor:'rgba(16,185,129,0.3)'}}>Why Choose Us</div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Why <span className="gradient-text">NutriAI</span> is Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              {i:'🇮🇳',t:'Built for India',d:'The only AI diet app that truly understands Indian cuisine, festivals, and food culture.'},
              {i:'🧬',t:'Science-Based',d:'All recommendations are based on peer-reviewed nutritional science and clinical data.'},
              {i:'🔒',t:'Privacy First',d:'Your health data is encrypted and never shared with third parties. 100% secure.'},
              {i:'⚡',t:'Instant Results',d:'Get your personalized diet plan in under 60 seconds. No waiting, no appointments.'},
            ].map((b,i) => (
              <div key={i} className="glass-dark rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">{b.i}</div>
                <h3 className="text-base font-bold mb-2">{b.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>

          {/* CTA box */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-px rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-2xl shadow-green-900/50">
              <div className="bg-gray-900 rounded-3xl px-10 py-10">
                <h3 className="text-3xl font-extrabold mb-3 tracking-tight">Ready to Transform?</h3>
                <p className="text-gray-400 mb-6 text-sm">Join 10,000+ Indians achieving their health goals with NutriAI</p>
                <button onClick={() => openModal('register')} className="btn-primary px-10 py-4 rounded-2xl text-base shadow-xl shadow-green-900/50">
                  🚀 Start Free Today
                </button>
                <p className="text-gray-600 text-xs mt-4">No credit card · Free forever · Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">

          {/* Newsletter */}
          <div className="rounded-2xl border border-green-900/40 bg-green-900/10 p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">Get Nutrition Tips in Your Inbox</h3>
              <p className="text-gray-400 text-sm">Weekly AI-powered insights, recipes, and health tips</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email..."
                className="flex-1 md:w-64 bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder-gray-500" />
              <button className="btn-primary px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">Subscribe →</button>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"><span>🥗</span></div>
                <span className="text-lg font-extrabold text-white">NutriAI</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                AI-powered nutrition consultation built for Indian lifestyle. Transform your health with science-backed personalized plans.
              </p>
              <div className="flex gap-2">
                {['𝕏','in','f','▶'].map((s,i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footer).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(l => (
                    <li key={l}><a href="#" className="footer-link">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="divider mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">© 2025 NutriAI. All rights reserved. Built with ❤️ by <span className="text-green-400 font-semibold">Adarsh Thakur</span></p>
            <div className="flex flex-wrap gap-2">
              {['React 18','Python Flask','SQLite','Groq AI','Vercel'].map(t => (
                <span key={t} className="text-xs bg-gray-800 text-gray-500 px-3 py-1 rounded-full border border-gray-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ MODAL ══ */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background:'rgba(0,0,0,0.65)',backdropFilter:'blur(8px)'}}
          onClick={e => e.target===e.currentTarget && setModal(null)}>

          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden anim-fade-up">
            {/* Modal header */}
            <div className="relative p-6 text-white overflow-hidden" style={{background:'linear-gradient(135deg,#10b981,#059669)'}}>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full" />
              <button onClick={()=>setModal(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-sm transition-colors">✕</button>
              <p className="text-2xl mb-1">🥗</p>
              <h2 className="text-xl font-extrabold tracking-tight">{modal==='login'?'Welcome Back!':'Create Free Account'}</h2>
              <p className="text-green-100 text-sm">{modal==='login'?'Sign in to NutriAI':`Step ${step} of 3`}</p>
              {modal==='register' && (
                <div className="mt-3 h-1.5 bg-white/20 rounded-full">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{width:`${step*33.3}%`}} />
                </div>
              )}
            </div>

            <div className="p-6">
              {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">⚠️ {error}</div>}

              {/* LOGIN */}
              {modal==='login' && (
                <>
                  <Field label="Email Address" name="email" type="email" placeholder="adarsh@email.com" value={loginForm.email} onChange={upL} />
                  <Field label="Password" name="password" type="password" placeholder="••••••••" value={loginForm.password} onChange={upL} />
                  <button onClick={doLogin} disabled={loading} className="btn-primary w-full py-3.5 rounded-2xl text-base mt-2">
                    {loading?'⏳ Signing in...':'Sign In →'}
                  </button>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    New here?{' '}
                    <button onClick={()=>openModal('register')} className="text-green-600 font-bold hover:text-green-700">Create free account</button>
                  </p>
                </>
              )}

              {/* REGISTER STEP 1 */}
              {modal==='register' && step===1 && (
                <>
                  <Field label="Full Name" name="name" placeholder="Adarsh Thakur" value={reg.name} onChange={upR} />
                  <Field label="Email Address" name="email" type="email" placeholder="adarsh@email.com" value={reg.email} onChange={upR} />
                  <Field label="Password" name="password" type="password" placeholder="Min 8 characters" value={reg.password} onChange={upR} />
                  <button onClick={()=>{if(!reg.name||!reg.email||!reg.password)return setError('Fill all fields');setError('');setStep(2)}}
                    className="btn-primary w-full py-3.5 rounded-2xl text-base mt-2">Continue →</button>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Already have an account?{' '}
                    <button onClick={()=>openModal('login')} className="text-green-600 font-bold">Sign in</button>
                  </p>
                </>
              )}

              {/* REGISTER STEP 2 */}
              {modal==='register' && step===2 && (
                <>
                  <p className="text-gray-400 text-sm mb-4">Help us personalize your plan</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[['🎂 Age','age','19'],['⚖️ Weight kg','weight','58'],['📏 Height cm','height','165']].map(([label,name,ph]) => (
                      <div key={name}>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
                        <input name={name} type="number" placeholder={ph} value={reg[name]} onChange={upR}
                          className="input-field text-center font-bold" />
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>{if(!reg.age||!reg.weight||!reg.height)return setError('Fill all fields');setError('');setStep(3)}}
                    className="btn-primary w-full py-3.5 rounded-2xl text-base">Continue →</button>
                  <button onClick={()=>setStep(1)} className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">← Back</button>
                </>
              )}

              {/* REGISTER STEP 3 */}
              {modal==='register' && step===3 && (
                <>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">🥦 Diet Preference</label>
                  <select name="diet_type" value={reg.diet_type} onChange={upR} className="input-field mb-4">
                    <option value="">Select diet type</option>
                    <option value="Vegetarian">🥗 Vegetarian</option>
                    <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                    <option value="Vegan">🌱 Vegan</option>
                    <option value="Keto">🥑 Keto</option>
                  </select>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">🏆 Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[['Lose Weight','⚖️'],['Build Muscle','💪'],['Stay Fit','🏃']].map(([l,ic]) => (
                      <button key={l} onClick={()=>setReg(p=>({...p,goal:l}))}
                        className={`py-3 px-2 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all duration-200 hover:scale-105
                          ${reg.goal===l?'border-green-500 bg-green-50 text-green-700':'border-gray-100 bg-gray-50 text-gray-500 hover:border-green-200'}`}>
                        <span className="text-xl">{ic}</span>{l}
                      </button>
                    ))}
                  </div>
                  <button onClick={doRegister} disabled={loading} className="btn-primary w-full py-3.5 rounded-2xl text-base">
                    {loading?'⏳ Creating account...':'🚀 Get Started Free'}
                  </button>
                  <button onClick={()=>setStep(2)} className="w-full text-center text-gray-400 text-sm mt-3 hover:text-green-600 transition-colors">← Back</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}