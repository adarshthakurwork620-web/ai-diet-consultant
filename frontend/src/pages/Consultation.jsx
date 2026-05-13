import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Consultation() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      text: 'Namaste! 🙏 Main tumhara personal AI diet consultant hoon.\n\nMujhe batao:\n- **Tumhara health goal** kya hai?\n- **Kya khate ho** aajkal?\n- **Koi health issue** hai?\n\nMain tumhare liye personalized plan banaunga! 🥗' 
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const msg = text || input
    if (!msg.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://nutriai-backend-xspo.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, kuch error aayi. Thodi der baad try karo! 🙏' }])
    }
    setLoading(false)
  }

  // Refined Markdown-ish Renderer
  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-2" />
      
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const content = line.replace(/^[-•]\s*/, '')
        return (
          <div key={i} className="flex items-start gap-3 my-2 group">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
            <span className="text-slate-700 leading-relaxed">{renderBold(content)}</span>
          </div>
        )
      }

      // Numbered list
      if (/^\d+\./.test(line.trim())) {
        const num = line.match(/^(\d+)\./)[1]
        const content = line.replace(/^\d+\.\s*/, '')
        return (
          <div key={i} className="flex items-start gap-3 my-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] flex items-center justify-center font-black flex-shrink-0 mt-0.5 border border-emerald-100">
              {num}
            </span>
            <span className="text-slate-700 leading-relaxed">{renderBold(content)}</span>
          </div>
        )
      }

      return <p key={i} className="my-1.5 leading-relaxed text-slate-700">{renderBold(line)}</p>
    })
  }

  const renderBold = (text) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-bold text-slate-900 bg-emerald-50/50 px-1 rounded">{part}</strong>
        : part
    )
  }

  const suggestions = [
    { icon: '⚖️', text: 'Weight loss plan' },
    { icon: '💪', text: 'Muscle gain diet' },
    { icon: '🍳', text: 'Healthy breakfast' },
    { icon: '🌙', text: 'Dinner options' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">

      {/* PREMIUM HEADER */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors group">
          <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-sm font-black text-slate-800 tracking-tight">NutriAI Intelligence</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Grade AI</span>
        </div>

        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100 font-bold text-xs">
          AI
        </div>
      </nav>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* INITIAL SUGGESTIONS */}
          {messages.length === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 animate-in-up">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s.text)}
                  className="bg-white border border-slate-100 p-4 rounded-2xl text-center hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-50 transition-all group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div className="text-[10px] font-black uppercase text-slate-500 tracking-tighter leading-tight">{s.text}</div>
                </button>
              ))}
            </div>
          )}

          {/* MESSAGES */}
          <div className="space-y-8">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in-up`}>
                
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-1">
                    🤖
                  </div>
                )}

                <div className={`relative max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-3xl shadow-sm border
                  ${msg.role === 'user'
                    ? 'bg-emerald-500 border-emerald-400 text-white rounded-tr-none'
                    : 'bg-white border-slate-100 text-slate-800 rounded-tl-none'}`}>
                  {renderText(msg.text)}
                  <span className={`absolute top-0 ${msg.role === 'user' ? '-right-2 text-emerald-500' : '-left-2 text-white'}`}>
                    {/* SVG tail can go here for extra polish */}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-emerald-600 flex-shrink-0 mt-1 border border-emerald-200">
                    S
                  </div>
                )}
              </div>
            ))}

            {/* LOADING STATE */}
            {loading && (
              <div className="flex gap-4 justify-start animate-pulse">
                <div className="w-8 h-8 bg-slate-200 rounded-lg" />
                <div className="bg-white border border-slate-100 px-6 py-4 rounded-3xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* INPUT BAR */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto flex items-end gap-3 bg-slate-50 rounded-[24px] p-2 border-2 border-transparent focus-within:border-emerald-500 focus-within:bg-white transition-all">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ask anything about your health..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-4 resize-none max-h-40 font-medium"
          />
          <button 
            onClick={() => sendMessage()} 
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 disabled:opacity-30 transition-all active:scale-90 shadow-lg shadow-emerald-100"
          >
            <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] font-bold text-slate-300 mt-4 uppercase tracking-[0.2em]">
          End-to-End Encrypted Health Consultation
        </p>
      </div>

      <style>{`
        @keyframes in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in-up {
          animation: in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  )
}

export default Consultation