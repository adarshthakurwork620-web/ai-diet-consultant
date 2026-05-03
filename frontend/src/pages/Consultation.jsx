import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Consultation() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! 🙏 Main tumhara personal AI diet consultant hoon.\n\nMujhe batao:\n- **Tumhara health goal** kya hai?\n- **Kya khate ho** aajkal?\n- **Koi health issue** hai?\n\nMain tumhare liye personalized plan banaunga! 🥗' }
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
      const response = await fetch('http://localhost:5000/api/chat', {
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

  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return null
      
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const content = line.replace(/^[-•]\s*/, '')
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></span>
            <span>{renderBold(content)}</span>
          </div>
        )
      }

      // Numbered list
      if (/^\d+\./.test(line.trim())) {
        const num = line.match(/^(\d+)\./)[1]
        const content = line.replace(/^\d+\.\s*/, '')
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{num}</span>
            <span>{renderBold(content)}</span>
          </div>
        )
      }

      return <p key={i} className="my-1 leading-relaxed">{renderBold(line)}</p>
    })
  }

  const renderBold = (text) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-semibold">{part}</strong>
        : part
    )
  }

  const suggestions = [
    { icon: '⚖️', text: 'Weight loss plan batao' },
    { icon: '💪', text: 'Muscle gain diet chahiye' },
    { icon: '🍳', text: 'Healthy breakfast options' },
    { icon: '🌙', text: 'Dinner mein kya khaaun?' },
    { icon: '🩺', text: 'Diabetes friendly diet' },
    { icon: '⚡', text: 'Energy boost ke liye kya khaaun?' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Premium Navbar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-all duration-200 font-medium text-sm group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">NutriAI Assistant</p>
            <p className="text-xs text-green-500 font-medium">● Online</p>
          </div>
        </div>

        <button onClick={() => navigate('/mealplan')}
          className="text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded-xl font-semibold hover:bg-green-500 hover:text-white transition-all duration-300">
          📋 Meal Plan
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3 text-center">
              ✨ Quick Start
            </p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s.text)}
                  className="flex items-center gap-2 text-left text-sm bg-white border border-gray-100 rounded-2xl p-3 text-gray-600 hover:border-green-400 hover:text-green-600 hover:shadow-lg hover:shadow-green-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <span className="text-lg">{s.icon}</span>
                  <span className="font-medium text-xs">{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

              {/* AI Avatar */}
              {msg.role === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1 shadow-md shadow-green-200">
                  AI
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm shadow-sm
                ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm shadow-green-200'
                  : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'}`}>
                {renderText(msg.text)}
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                  A
                </div>
              )}
            </div>
          ))}

          {/* Loading dots */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md shadow-green-200">
                AI
              </div>
              <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Premium Input Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 sticky bottom-0">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 items-end bg-gray-50 border-2 border-gray-100 rounded-2xl p-2 focus-within:border-green-400 focus-within:shadow-lg focus-within:shadow-green-100 transition-all duration-300">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Apna diet question poochho... (Enter to send)"
              rows={1}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none px-2 py-1.5 max-h-32"
            />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-green-200 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:scale-100 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-300 mt-2">Powered by NutriAI • Not a substitute for medical advice</p>
        </div>
      </div>
    </div>
  )
}

export default Consultation