import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', age: '', weight: '', height: '', diet_type: '', goal: ''
  });

  // Smooth scroll logic for landing page
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const updateLogin = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const updateRegister = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) { setError('Please fill all fields'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('https://nutriai-backend-xspo.onrender.com/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else { setError(data.error || 'Authentication failed'); }
    } catch { setError('Connection lost. Please check your internet.'); }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!registerForm.diet_type || !registerForm.goal) { setError('Final details required'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('https://nutriai-backend-xspo.onrender.com/api/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...registerForm, 
          age: parseInt(registerForm.age), 
          weight: parseFloat(registerForm.weight), 
          height: parseFloat(registerForm.height) 
        })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else { setError(data.error || 'Registration failed'); }
    } catch { setError('Server timeout. Try again.'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-100">
      
      {/* PREMIUM NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <span className="text-xl">🥗</span>
              </div>
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                NutriAI
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              {['Features', 'How It Works', 'Benefits'].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(/ /g, ''))} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-all">
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => { setModal('login'); setError('') }} className="text-sm font-bold text-slate-700 hover:text-emerald-600 px-4">
                Login
              </button>
              <button onClick={() => { setModal('register'); setStep(1); setError('') }} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-100 transition-all active:scale-95">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - REINVENTED */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm mb-8 animate-bounce-slow">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">v2.0 AI Nutrition Engine Live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-[0.9]">
            The Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
              Personalized Health
            </span>
          </h1>

          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Stop guessing your diet. Let AI analyze your bio-metrics and habits to build a plan that actually sticks.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button onClick={() => { setModal('register'); setStep(1); setError('') }} className="group relative bg-emerald-500 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-200 active:scale-95">
              Generate My Diet Plan
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => scrollTo('howitworks')} className="px-10 py-5 rounded-2xl text-lg font-bold text-slate-600 hover:bg-white transition-all">
              Watch Demo
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-16">
            {[
              { val: '98%', label: 'AI Prediction Accuracy' },
              { val: '10k+', label: 'Indian Recipes' },
              { val: '24/7', label: 'AI Consultation' },
              { val: 'Free', label: 'To Get Started' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-slate-900">{stat.val}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16">Built for results.</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Main Feature */}
          <div className="md:col-span-8 bg-white border border-slate-100 rounded-[32px] p-10 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
             <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6">🤖</div>
                <h3 className="text-3xl font-bold mb-4">Llama 3.1 Powered Consultant</h3>
                <p className="text-slate-500 max-w-md text-lg">Real-time health coaching that understands Indian cuisine, regional diets, and complex nutritional needs.</p>
             </div>
             <div className="absolute bottom-[-20px] right-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-[200px]">🥗</span>
             </div>
          </div>
          
          {/* Small Feature */}
          <div className="md:col-span-4 bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden">
             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl mb-6">⚡</div>
             <h3 className="text-2xl font-bold mb-2">Vite Speed</h3>
             <p className="text-slate-400">Zero lag experience across all platforms.</p>
          </div>

          <div className="md:col-span-4 bg-emerald-500 rounded-[32px] p-10 text-white">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-6">🍽️</div>
             <h3 className="text-2xl font-bold mb-2">Meal Planner</h3>
             <p className="text-emerald-100">7-day cycles tailored to your weight goals.</p>
          </div>

          <div className="md:col-span-8 bg-white border border-slate-100 rounded-[32px] p-10 shadow-sm">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold mb-2">Predictive Dashboards</h3>
                  <p className="text-slate-500">Visualize your progress before it even happens with our AI projection engine.</p>
                </div>
                <div className="flex-1 bg-slate-50 p-6 rounded-2xl w-full text-center font-mono text-sm text-emerald-600">
                  Calculating BMI... 22.4 (Normal)
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer className="bg-slate-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">🥗</div>
                <span className="text-2xl font-bold text-white tracking-tighter">NutriAI</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                The world's most advanced AI-first nutrition assistant. Built for accuracy, designed for simplicity.
              </p>
            </div>
            {['Product', 'Company', 'Support'].map((title) => (
              <div key={title}>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{title}</h4>
                <ul className="space-y-4">
                  {['Link One', 'Link Two', 'Link Three'].map(l => (
                    <li key={l}><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">© 2026 NutriAI Labs. Built by Adarsh Thakur.</p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-500 hover:text-white text-sm">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-white text-sm">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* THE MODERN MODAL */}
      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setModal(null)}></div>
          
          <div className="bg-white w-full max-w-[440px] rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative z-10 overflow-hidden animate-modal-in">
            
            {/* Modal Header */}
            <div className="bg-slate-900 p-8 text-white relative">
              <button onClick={() => setModal(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">✕</button>
              <h2 className="text-3xl font-bold mb-2">
                {modal === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-400 text-sm">
                {modal === 'login' ? 'Continue your health journey' : `Step ${step} of 3: Personalizing your experience`}
              </p>
              {modal === 'register' && (
                <div className="flex gap-2 mt-6">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8">
              {error && <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm font-medium">{error}</div>}

              {/* Login Form */}
              {modal === 'login' && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Email Address</label>
                    <input name="email" value={loginForm.email} onChange={updateLogin} placeholder="name@example.com"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl p-4 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Password</label>
                    <input name="password" type="password" value={loginForm.password} onChange={updateLogin} placeholder="••••••••"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl p-4 outline-none transition-all" />
                  </div>
                  <button onClick={handleLogin} disabled={loading} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-[0.98]">
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </div>
              )}

              {/* Registration Step 1 */}
              {modal === 'register' && step === 1 && (
                <div className="space-y-5 animate-in-right">
                  <input name="name" value={registerForm.name} onChange={updateRegister} placeholder="Full Name" className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 outline-none" />
                  <input name="email" value={registerForm.email} onChange={updateRegister} placeholder="Email Address" className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 outline-none" />
                  <input name="password" type="password" value={registerForm.password} onChange={updateRegister} placeholder="Create Password" className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 outline-none" />
                  <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all">Next Step</button>
                </div>
              )}

              {/* Registration Step 2 */}
              {modal === 'register' && step === 2 && (
                <div className="space-y-5 animate-in-right">
                   <div className="grid grid-cols-3 gap-3">
                      {['age', 'weight', 'height'].map(field => (
                        <div key={field}>
                           <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">{field}</label>
                           <input name={field} type="number" onChange={updateRegister} placeholder="--" className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl p-4 outline-none text-center font-bold" />
                        </div>
                      ))}
                   </div>
                   <button onClick={() => setStep(3)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl">Finalize</button>
                   <button onClick={() => setStep(1)} className="w-full text-slate-400 text-sm font-bold">Go Back</button>
                </div>
              )}

              {/* Registration Step 3 */}
              {modal === 'register' && step === 3 && (
                <div className="space-y-5 animate-in-right">
                  <select name="diet_type" value={registerForm.diet_type} onChange={updateRegister} className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-4 outline-none font-medium appearance-none">
                    <option value="">Select Diet Style</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>

                  <div className="grid grid-cols-3 gap-2">
                    {['Weight Loss', 'Muscle Gain', 'Stay Fit'].map(g => (
                      <button key={g} onClick={() => setRegisterForm({...registerForm, goal: g})} className={`py-3 px-1 rounded-xl border-2 text-[10px] font-black uppercase tracking-tighter transition-all ${registerForm.goal === g ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-100 text-slate-400'}`}>
                        {g}
                      </button>
                    ))}
                  </div>

                  <button onClick={handleRegister} disabled={loading} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-100">
                    {loading ? 'Generating Profile...' : 'Complete Registration'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modal-in { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-modal-in { animation: modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-in-right { animation: in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default Login;