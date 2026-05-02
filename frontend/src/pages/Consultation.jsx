import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Consultation() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! 🙏 Main tumhara AI diet consultant hoon. Kya poochna chahte ho apni diet ke baare mein?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: 'You are NutriAI, a friendly and expert AI diet consultant. Give personalized, practical diet advice. Keep responses concise and helpful. Use emojis occasionally. Focus on Indian food options when relevant.',
          messages: [{ role: 'user', content: input }]
        })
      })
      const data = await response.json()
      const aiText = data.content[0].text
      setMessages(prev => [...prev, { role: 'ai', text: aiText }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, kuch error aayi. Thodi der baad try karo! 🙏' }])
    }
    setLoading(false)
  }

  const suggestions = ['Mera weight loss plan batao', 'Aaj dinner mein kya khaaun?', 'Protein ke liye best Indian foods?', 'Keto diet safe hai?']

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-green-500 transition-colors duration-200">
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="text-lg font-bold text-gray-800">AI Consultation</span>
        </div>
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">Quick questions</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)}
                  className="text-left text-sm bg-white border border-gray-100 rounded-2xl p-3 text-gray-600 hover:border-green-400 hover:text-green-600 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat messages */}
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 flex-shrink-0">
                  AI
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm'
                  : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                AI
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Apna diet question poochho..."
            className="flex-1 border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-100 transition-all duration-300 bg-gray-50 focus:bg-white" />
          <button onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm hover:scale-105 hover:shadow-lg hover:shadow-green-200 active:scale-95 transition-all duration-300 disabled:opacity-50">
            Send ↗
          </button>
        </div>
      </div>
    </div>
  )
}

export default Consultation