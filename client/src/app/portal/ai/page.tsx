"use client"

import { useState, useRef, useEffect } from 'react'
import PortalHeader from "@/app/components/portal/portal-header"
import { Send, Sparkles, Loader2, Save } from "lucide-react"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI filmmaking assistant. I can help analyze and improve your scripts, shot lists, and other creative work. I can identify issues like:\n\n• Rule of 180 violations in shot lists\n• Continuity errors in scripts\n• Pacing and structure suggestions\n• Character development feedback\n• Technical filmmaking advice\n\nJust paste your script, shot list, or any creative text, and tell me what you'd like me to review!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`${API_BASE}/api/ai/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input, conversationHistory: messages }),
      })

      if (!res.ok) {
        throw new Error(`Server error (${res.status})`)
      }

      const data = await res.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveConversation() {
    if (messages.length <= 1) {
      alert('No conversation to save yet. Start chatting first!')
      return
    }

    const title = prompt('Enter a title for this conversation:')
    if (!title || !title.trim()) {
      return
    }

    setSaving(true)
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`${API_BASE}/api/ai/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          messages: messages
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to save conversation (${res.status})`)
      }

      const data = await res.json()
      alert('Conversation saved successfully! View it in your Projects tab.')
    } catch (err: any) {
      alert(`Failed to save conversation: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <PortalHeader />

      <div className="flex-1 max-w-5xl mx-auto w-full p-6 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-400 border-3 border-black rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <h1 className="text-3xl font-bold">AI Filmmaking Assistant</h1>
            </div>
            <button
              onClick={handleSaveConversation}
              disabled={saving || messages.length <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors border-2 border-blue-600 flex items-center gap-2"
              style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Conversation</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm">Get expert feedback on your scripts, shot lists, and creative work</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 border-2 border-gray-300 rounded-lg p-4 mb-4 overflow-y-auto bg-gray-50" style={{ minHeight: '500px', maxHeight: '600px' }}>
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white border-2 border-blue-600'
                    : 'bg-white border-2 border-gray-300'
                }`}
                style={message.role === 'assistant' ? { boxShadow: "2px 2px 0px rgba(0,0,0,0.1)" } : undefined}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-left mb-4">
              <div className="inline-block bg-white border-2 border-gray-300 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">AI is analyzing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-3 border-black bg-white p-4" style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your script, shot list, or ask for filmmaking advice..."
              className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-pink-400 transition-colors"
              rows={3}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors border-2 border-pink-600 flex items-center gap-2"
              style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
        </form>
      </div>
    </main>
  )
}
