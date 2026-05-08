import { useNavigate } from 'react-router-dom'

const s = {
  bg: '#060810', card: 'rgba(255,255,255,0.03)', b: '0.5px solid rgba(255,255,255,0.08)',
  g: '#22c55e', t: '#f0f0fa', tm: '#9999bb', ts: '#44445a',
  font: "'DM Sans', system-ui, sans-serif", serif: "'Playfair Display', Georgia, serif"
}

const meals = [
  { icon: '🥗', name: 'Dal Palak Bowl', cal: '280 kcal', bg: 'linear-gradient(135deg,#1a3a1a,#0d1a0d)' },
  { icon: '🍛', name: 'Chicken Curry', cal: '420 kcal', bg: 'linear-gradient(135deg,#3a2a0d,#1a1000)' },
  { icon: '🥘', name: 'Paneer Tikka', cal: '310 kcal', bg: 'linear-gradient(135deg,#1a1a3a,#0d0d1a)' },
  { icon: '🫓', name: 'Roti + Sabzi', cal: '350 kcal', bg: 'linear-gradient(135deg,#2a1a1a,#1a0808)' },
  { icon: '🥚', name: 'Egg Bhurji', cal: '220 kcal', bg: 'linear-gradient(135deg,#1a3a2a,#0a1a10)' },
  { icon: '🥣', name: 'Oats + Banana', cal: '320 kcal', bg: 'linear-gradient(135deg,#1a2a3a,#0a1020)' },
  { icon: '🧆', name: 'Rajma Chawal', cal: '480 kcal', bg: 'linear-gradient(135deg,#2a1a2a,#150a15)' },
  { icon: '🥤', name: 'Protein Lassi', cal: '180 kcal', bg: 'linear-gradient(135deg,#3a2a10,#1a1005)' },
]

const features = [
  { icon: '🤖', title: 'AI Diet Consultant', desc: 'Real-time personalized meal advice powered by AI trained on Indian nutrition data.', color: 'rgba(34,197,94,0.1)' },
  { icon: '💧', title: 'Water Tracker', desc: 'Track daily water intake with clickable glass tracker and smart reminders.', color: 'rgba(56,189,248,0.1)' },
  { icon: '⚖️', title: 'BMI Calculator', desc: 'Instant BMI with color-coded visual scale and personalized health tips.', color: 'rgba(251,146,60,0.1)' },
  { icon: '🔥', title: 'Daily Streak', desc: 'Build consistency by logging meals every day and watching your streak grow.', color: 'rgba(251,191,36,0.1)' },
  { icon: '🔄', title: 'Meal Customization', desc: 'Swap meals, adjust calories, add/remove food items to match your taste.', color: 'rgba(167,139,250,0.1)' },
  { icon: '📈', title: 'Progress Graphs', desc: 'Weekly visual charts for calories, water and weight — see your journey clearly.', color: 'rgba(52,211,153,0.1)' },
]

const testimonials = [
  { stars: '★★★★★', text: '"NutriAI ne mera 8 kilo weight loss karne mein help kiya — sirf 3 months mein! Meal swap feature bahut useful hai."', name: 'Rahul Gupta', sub: 'Lost 8kg · Delhi', color: 'linear-gradient(135deg,#22c55e,#16a34a)', init: 'R' },
  { stars: '★★★★★', text: '"Water reminders aur streak tracker ne meri daily routine completely badal di. Ab healthy rehna easy lagta hai!"', name: 'Priya Sharma', sub: '45-day streak · Mumbai', color: 'linear-gradient(135deg,#818cf8,#6366f1)', init: 'P' },
  { stars: '★★★★★', text: '"BMI tracker aur AI chat dono amazing hain. Indian food ke options diye jo actually tasty bhi hain!"', name: 'Amit Jain', sub: 'Muscle gain · Jaipur', color: 'linear-gradient(135deg,#fb923c,#f97316)', init: 'A' },
]

const plans = [
  { name: 'Free', price: '₹0', per: '/month', feats: ['Basic meal tracking', 'BMI calculator', '10 AI messages/day'], pop: false },
  { name: 'Pro', price: '₹199', per: '/month', feats: ['Unlimited AI chat', 'Meal customization', 'Streak tracker', 'Smart reminders'], pop: true },
  { name: 'Family', price: '₹499', per: '/month', feats: ['Up to 5 members', 'All Pro features', 'Family dashboard'], pop: false },
]

function Badge({ children }) {
  return <div style={{ display: 'inline-block', fontSize: 10, color: s.g, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(34,197,94,0.08)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: '3px 12px', marginBottom: 10 }}>{children}</div>
}

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ background: s.bg, minHeight: '100vh', color: s.t, fontFamily: s.font }}>

      {/* NAV */}
      <nav style={{ background: 'rgba(6,8,16,0.97)', borderBottom: s.b, padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: s.g, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13, boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}>N</div>
          <span style={{ fontFamily: s.serif, fontSize: 16 }}>NutriAI</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigate('/login')} style={{ padding: '7px 16px', borderRadius: 9, fontSize: 12, color: s.g, background: 'none', border: '0.5px solid rgba(34,197,94,0.4)', cursor: 'pointer', fontFamily: s.font }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ padding: '7px 16px', borderRadius: 9, fontSize: 12, color: '#fff', background: s.g, border: 'none', cursor: 'pointer', fontFamily: s.font, fontWeight: 600, boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}>Get Started →</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '64px 28px 48px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -60, left: -60, width: 280, height: 280, background: 'rgba(34,197,94,0.07)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 60, right: -40, width: 220, height: 220, background: 'rgba(129,140,248,0.05)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.08)', border: '0.5px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: '5px 14px', fontSize: 11, color: s.g, marginBottom: 22 }}>
            <span style={{ width: 6, height: 6, background: s.g, borderRadius: '50%', display: 'inline-block' }} />
            AI-Powered Nutrition Platform
          </div>
          <h1 style={{ fontFamily: s.serif, fontSize: 42, lineHeight: 1.15, marginBottom: 16 }}>
            Eat smart, live<br /><span style={{ color: s.g }}>healthier</span> with AI
          </h1>
          <p style={{ fontSize: 14, color: s.tm, lineHeight: 1.75, marginBottom: 30, maxWidth: 480, margin: '0 auto 30px' }}>
            Personalized meal plans, BMI tracking, daily streaks, water reminders — your complete nutrition companion. Built for Indian lifestyles.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
            <button onClick={() => navigate('/register')} style={{ padding: '13px 26px', borderRadius: 11, fontSize: 13, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg,#22c55e,#16a34a)', border: 'none', cursor: 'pointer', fontFamily: s.font, boxShadow: '0 8px 24px rgba(34,197,94,0.35)' }}>Start for free →</button>
            <button onClick={() => navigate('/login')} style={{ padding: '13px 26px', borderRadius: 11, fontSize: 13, color: s.tm, background: 'rgba(255,255,255,0.05)', border: s.b, cursor: 'pointer', fontFamily: s.font }}>Login</button>
          </div>
          <div style={{ display: 'flex', border: s.b, borderRadius: 14, overflow: 'hidden', background: s.card }}>
            {[['10k+', 'Active users'], ['200+', 'Indian meals'], ['98%', 'Goals achieved'], ['4.9★', 'User rating']].map(([n, l], i) => (
              <div key={i} style={{ flex: 1, padding: 16, textAlign: 'center', borderRight: i < 3 ? s.b : 'none' }}>
                <div style={{ fontFamily: s.serif, fontSize: 24, color: s.g }}>{n}</div>
                <div style={{ fontSize: 11, color: s.ts, marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MEAL SHOWCASE */}
      <div style={{ padding: '0 28px 44px', maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <Badge>200+ Indian Meals</Badge>
          <div style={{ fontFamily: s.serif, fontSize: 24, marginBottom: 6 }}>Delicious, nutritious & tracked</div>
          <p style={{ fontSize: 13, color: s.tm }}>Every meal comes with calorie counts, macros & swap suggestions</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {meals.map((m, i) => (
            <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: s.b, aspectRatio: '1', background: m.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', transition: 'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ fontSize: 44 }}>{m.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{m.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{m.cal}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: '0 28px 44px', maxWidth: 780, margin: '0 auto' }}>
        <Badge>Features</Badge>
        <div style={{ fontFamily: s.serif, fontSize: 24, marginBottom: 6 }}>Everything you need to stay healthy</div>
        <p style={{ fontSize: 13, color: s.tm, marginBottom: 24 }}>Smart AI tools for tracking, planning, and achieving your nutrition goals</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: s.card, border: s.b, borderRadius: 14, padding: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: s.tm, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div style={{ padding: '0 28px 44px', maxWidth: 780, margin: '0 auto' }}>
        <Badge>About NutriAI</Badge>
        <div style={{ fontFamily: s.serif, fontSize: 24, marginBottom: 20 }}>Built for real health goals</div>
        <div style={{ background: 'linear-gradient(135deg,rgba(22,101,52,0.3),rgba(16,74,49,0.15))', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(34,197,94,0.08)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: s.serif, fontSize: 22, marginBottom: 10 }}>Why <span style={{ color: s.g }}>NutriAI</span> is different?</h2>
              <p style={{ fontSize: 13, color: s.tm, lineHeight: 1.75, marginBottom: 12 }}>Most diet apps give generic plans. NutriAI uses advanced AI to understand YOUR unique body, lifestyle, and goals — then builds a plan that actually works for you, using foods you actually eat.</p>
              <div style={{ background: 'rgba(34,197,94,0.06)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, color: s.g, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>🎯 Our Mission</div>
                <p style={{ fontSize: 12, color: s.tm, lineHeight: 1.65, fontStyle: 'italic' }}>"To make healthy eating simple, personalized, and sustainable for every Indian household — one meal at a time."</p>
              </div>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 10 }}>
                {[['10k+', 'Happy users'], ['98%', 'Goals achieved'], ['200+', 'Indian meals']].map(([n, l]) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.04)', border: s.b, borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontFamily: s.serif, fontSize: 20, color: s.g }}>{n}</div>
                    <div style={{ fontSize: 10, color: s.ts, marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: s.card, border: s.b, borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: s.ts, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tech Stack</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {[['React', '#4ade80'], ['Python', '#60a5fa'], ['FastAPI', '#fb923c'], ['AI/ML', '#a78bfa'], ['MongoDB', '#fbbf24']].map(([t, c]) => (
                    <span key={t} style={{ background: c + '18', border: `0.5px solid ${c}44`, borderRadius: 6, padding: '3px 9px', fontSize: 10, color: c }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
            {[['🧠', 'AI-Powered', 'Smart recommendations based on your unique body & goals'],
              ['🇮🇳', 'India First', 'Dal, roti, paneer — built for Indian food culture'],
              ['🔒', 'Privacy', "Your data is yours. We never sell it, ever."],
              ['⚡', 'Real-time', 'Instant AI responses & live progress tracking']].map(([icon, title, desc]) => (
              <div key={title} style={{ background: s.card, border: s.b, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 11, color: s.tm, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: s.ts, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Meet the team</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[['S', 'Siddh Jain', 'Founder & Full Stack Dev', 'linear-gradient(135deg,#22c55e,#16a34a)'],
                ['A', 'AI Engine', 'Powered by Claude AI', 'linear-gradient(135deg,#818cf8,#6366f1)'],
                ['N', 'NutriAI', 'Version 2.0 — 2025', 'linear-gradient(135deg,#fb923c,#f97316)']].map(([init, name, role, bg]) => (
                <div key={name} style={{ background: s.card, border: s.b, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{init}</div>
                  <div><div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div><div style={{ fontSize: 10, color: s.ts, marginTop: 2 }}>{role}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: '0 28px 44px', maxWidth: 780, margin: '0 auto' }}>
        <Badge>Testimonials</Badge>
        <div style={{ fontFamily: s.serif, fontSize: 24, marginBottom: 20 }}>What users are saying</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: s.card, border: s.b, borderRadius: 14, padding: 18 }}>
              <div style={{ color: '#fbbf24', fontSize: 12, marginBottom: 8 }}>{t.stars}</div>
              <p style={{ fontSize: 12, color: s.tm, lineHeight: 1.65, marginBottom: 12, fontStyle: 'italic' }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{t.init}</div>
                <div><div style={{ fontSize: 11, fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: 10, color: s.ts }}>{t.sub}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div style={{ padding: '0 28px 44px', maxWidth: 780, margin: '0 auto' }}>
        <Badge>Pricing</Badge>
        <div style={{ fontFamily: s.serif, fontSize: 24, marginBottom: 6 }}>Simple, honest pricing</div>
        <p style={{ fontSize: 13, color: s.tm, marginBottom: 24 }}>Start free. Upgrade when ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ background: p.pop ? 'rgba(34,197,94,0.03)' : s.card, border: p.pop ? '1.5px solid rgba(34,197,94,0.45)' : s.b, borderRadius: 14, padding: 22 }}>
              {p.pop && <div style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', fontSize: 10, padding: '3px 10px', borderRadius: 10, display: 'inline-block', marginBottom: 10 }}>Most popular</div>}
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontFamily: s.serif, fontSize: 28, color: s.g, margin: '8px 0' }}>{p.price}<span style={{ fontFamily: s.font, fontSize: 11, color: s.tm }}>{p.per}</span></div>
              {p.feats.map(f => <div key={f} style={{ fontSize: 11, color: s.tm, padding: '5px 0', borderBottom: s.b, display: 'flex', gap: 6 }}><span style={{ color: s.g }}>✓</span>{f}</div>)}
              <button onClick={() => navigate('/register')} style={{ width: '100%', padding: 10, borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginTop: 14, border: 'none', fontFamily: s.font, background: p.pop ? s.g : 'rgba(255,255,255,0.05)', color: p.pop ? '#fff' : s.tm }}>
                {p.pop ? 'Get Pro →' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: s.b, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: s.serif, fontSize: 16, color: s.g }}>NutriAI</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'Support'].map(l => <span key={l} style={{ fontSize: 11, color: s.ts, cursor: 'pointer' }}>{l}</span>)}
        </div>
        <div style={{ fontSize: 11, color: s.ts }}>Made by Siddh Jain · 2025</div>
      </div>
    </div>
  )
}

export default Home
