import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // ... (keeping your existing state and handlers same) ...

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-100 overflow-x-hidden">
      
      {/* 1. NAVBAR - Fixed with Blur */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl shadow-slate-200/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">🥗</div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">NutriAI</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setModal('login')} className="text-sm font-bold text-slate-600 hover:text-emerald-600">Login</button>
            <button onClick={() => setModal('register')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">Join</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO PAGE (Centered Content) */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative pt-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm animate-bounce-slow">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">v2.0 AI Engine Active</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Perfect Body</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Personalized Indian diet plans powered by Llama 3.1. <br className="hidden md:block" /> 
            Real results, zero guesswork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={() => setModal('register')} className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-2xl shadow-emerald-200 hover:scale-105 transition-all">
              Start My Journey →
            </button>
            <button className="px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* 3. BENTO FEATURES PAGE */}
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Smart Features</h2>
            <p className="text-slate-500">Everything you need to reach your goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-slate-50 rounded-[40px] p-10 border border-slate-100 group overflow-hidden relative min-h-[400px] flex flex-col justify-end">
               <div className="absolute top-10 left-10 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-emerald-100">🤖</div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-4">AI Health Consultant</h3>
                 <p className="text-slate-500 text-lg max-w-md">Chat with our AI about Indian recipes, calorie counts, and regional food habits 24/7.</p>
               </div>
               <div className="absolute -right-10 -bottom-10 text-[240px] opacity-[0.03] group-hover:rotate-12 transition-transform">🥗</div>
            </div>

            <div className="md:col-span-4 bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-between">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-xl">⚡</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Real-time Tracking</h3>
                <p className="text-slate-400 text-sm">Instant BMI and macro calculations as you input your data.</p>
              </div>
            </div>

            <div className="md:col-span-4 bg-emerald-50 rounded-[40px] p-10 border border-emerald-100">
               <h3 className="text-2xl font-black text-emerald-900 mb-4">7-Day Dynamic Meal Plan</h3>
               <p className="text-emerald-700/70 text-sm">Automated schedules that adapt to your progress every week.</p>
            </div>

            <div className="md:col-span-8 bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex items-center gap-8">
               <div className="hidden md:block flex-shrink-0 w-32 h-32 bg-white rounded-3xl shadow-inner border border-slate-200 p-4">
                  <div className="w-full h-2 bg-emerald-100 rounded-full mb-4 animate-pulse" />
                  <div className="w-2/3 h-2 bg-slate-100 rounded-full mb-4" />
                  <div className="w-full h-8 bg-emerald-500 rounded-lg" />
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-2">Predictive Analytics</h3>
                  <p className="text-slate-500">See your future weight loss curve based on your current consistency.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER PAGE */}
      <footer className="bg-slate-950 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl font-black tracking-tight">Ready to start?</h2>
          <button onClick={() => setModal('register')} className="px-12 py-6 bg-white text-slate-950 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-colors">
            Get Your Free Plan
          </button>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
            <p>© 2026 NutriAI. Designed for Excellence.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL CSS FIX */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-10px); } 50% { transform: translateY(0); } }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}