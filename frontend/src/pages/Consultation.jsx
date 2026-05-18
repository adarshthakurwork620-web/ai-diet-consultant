import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://nutriai-backend-xspo.onrender.com'

export default function Consultation() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Namaste! 🙏 Main tumhara personal AI diet consultant hoon.\n\nMujhe batao:\n- **Tumhara health goal** kya hai?\n- **Kya khate ho** aajkal?\n- **Koi health issue** hai?\n\nMain tumhare liye bilkul personalized plan banaunga! 🥗',
      time: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [visible, setVisible] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (u) setUser(JSON.parse(u))
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const msg = text || input
    if (!msg.trim() || loading) return
    const userMsg = { role: 'user', text: msg, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    inputRef.current?.focus()

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'ai',
        text: data.reply || 'Sorry, kuch error aayi. Dobara try karo!',
        time: new Date()
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Server se connect nahi ho pa raha. Thodi der baad try karo! 🙏',
        time: new Date()
      }])
    }
    setLoading(false)
  }

  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-2" />

      if (/^\d+\./.test(line.trim())) {
        const num = line.match(/^(\d+)\./)[1]
        const content = line.replace(/^\d+\.\s*/, '')
        return (
          <div key={i} className="flex items-start gap-2.5 my-1.5">
            <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{num}</span>
            <span className="text-sm">{renderBold(content)}</span>
          </div>
        )
      }

      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const content = line.replace(/^[-•]\s*/, '')
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
            <span className="text-sm">{renderBold(content)}</span>
          </div>
        )
      }

      if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return <p key={i} className="font-bold text-sm my-1.5">{line.replace(/\*\*/g, '')}</p>
      }

      return <p key={i} className="text-sm my-0.5 leading-relaxed">{renderBold(line)}</p>
    })
  }

  const renderBold = (text) =>
    text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
    )

  const formatTime = (date) =>
    date?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) || ''

  const suggestions = [
    { icon: '⚖️', text: 'Weight loss plan for Indian diet' },
    { icon: '💪', text: 'High protein vegetarian foods' },
    { icon: '🌅', text: 'Healthy Indian breakfast ideas' },
    { icon: '🌙', text: 'Light dinner options for weight loss' },
    { icon: '🩺', text: 'Diabetes friendly Indian meals' },
    { icon: '⚡', text: 'Foods for energy and focus' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors font-semibold text-sm group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md shadow-green-200">
                <span className="text-lg">🤖</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                style={{ animation: 'pulse 2s ease infinite' }} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">NutriAI Assistant</p>
              <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" style={{ animation: 'pulse 1.5s ease infinite' }} />
                Online · Ready to help
              </p>
            </div>
          </div>

          <button onClick={() => navigate('/mealplan')}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-2 rounded-xl font-bold hover:bg-green-100 transition-colors">
            📋 Meal Plan
          </button>
        </div>
      </nav>

      {/* ── CHAT AREA ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">

          {/* Suggestions — only if 1 message */}
          {messages.length === 1 && (
            <div className="mb-6"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'all 0.5s ease' }}>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3 text-center">
                ✨ Quick Start — Choose a topic
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s.text)}
                    className="flex items-center gap-2.5 text-left text-sm bg-white border border-gray-100 rounded-2xl p-3.5 text-gray-600 hover:border-green-400 hover:text-green-700 hover:shadow-lg hover:shadow-green-50 hover:-translate-y-0.5 transition-all duration-200 group">
                    <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="font-semibold text-xs leading-tight">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animation: 'fadeUp 0.3s ease' }}>

                {/* AI Avatar */}
                {msg.role === 'ai' && (
                  <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0 mt-1 shadow-md shadow-green-200">
                    AI
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[82%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-5 py-4 rounded-3xl shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-lg'
                      : 'bg-white text-gray-700 rounded-tl-lg border border-gray-100'}`}>
                    {msg.role === 'ai' ? renderText(msg.text) : <p className="text-sm font-medium">{msg.text}</p>}
                  </div>
                  <span className="text-xs text-gray-300 px-1 font-medium">{formatTime(msg.time)}</span>
                </div>

                {/* User Avatar */}
                {msg.role === 'user' && (
                  <div className="w-9 h-9 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0 mt-1">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3 justify-start" style={{ animation: 'fadeUp 0.3s ease' }}>
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0 shadow-md shadow-green-200">
                  AI
                </div>
                <div className="bg-white border border-gray-100 px-5 py-4 rounded-3xl rounded-tl-lg shadow-sm">
                  <div className="flex gap-1.5 items-center h-5">
                    {[0, 150, 300].map(delay => (
                      <div key={delay} className="w-2.5 h-2.5 bg-green-400 rounded-full"
                        style={{ animation: `bounce 1s ease infinite`, animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* ── INPUT BAR ── */}
      <div className="bg-white border-t border-gray-100 sticky bottom-0 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">

          {/* Quick reply chips */}
          {messages.length > 1 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
              {['Tell me more', 'Give Indian examples', 'Make a meal plan', 'What should I avoid?'].map((chip, i) => (
                <button key={i} onClick={() => sendMessage(chip)}
                  className="flex-shrink-0 text-xs bg-gray-100 hover:bg-green-100 hover:text-green-700 text-gray-500 px-3 py-1.5 rounded-full font-semibold transition-colors border border-gray-100 hover:border-green-200">
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus-within:border-green-400 focus-within:shadow-lg focus-within:shadow-green-100 focus-within:bg-white transition-all duration-300">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Apna diet question poochho... (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none resize-none font-medium"
                style={{ maxHeight: '120px', overflowY: 'auto' }}
              />
            </div>

            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-green-200 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:scale-100 flex-shrink-0 shadow-lg shadow-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>

          <p className="text-center text-xs text-gray-300 mt-2 font-medium">
            Powered by NutriAI · Not a substitute for medical advice
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}