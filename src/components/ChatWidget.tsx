import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import './ChatWidget.css'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I am your CRM Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isWorking, setIsWorking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isWorking, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Configuration Error: Please set VITE_GEMINI_API_KEY in your .env file.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsWorking(true)

    try {
      const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '')
      const genAI = new GoogleGenerativeAI(cleanKey)
      
      let result;
      
      const modelsToTry = [
        'gemini-2.0-flash',
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-1.5-flash',
        'gemini-pro'
      ];
      
      const systemPrompt = `You are a specialized CRM (Customer Relationship Management) Assistant.
      Strictly answer questions related to CRM, sales, leads, customers, and business strategies.
      Refuse non-business questions politely.
      Keep answers concise and suitable for a small chat window.
      User Query: ${inputValue}`;

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
          result = await model.generateContent(systemPrompt)
          break; 
        } catch (e) {
          console.warn(`Failed with ${modelName}`, e)
        }
      }

      if (!result) {
        throw new Error('All models failed.')
      }

      const response = await result.response
      const text = response.text()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error: any) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error.message || 'Something went wrong'}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        className="chat-widget-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Chat" : "Open AI Assistant"}
      >
        {isOpen ? '❌' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-widget-header">
            <h3>CRM Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">_</button>
          </div>
          
          <div className="chat-widget-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="chat-bubble">{msg.content}</div>
                <div className="chat-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isWorking && (
              <div className="chat-message assistant">
                <div className="chat-bubble working">Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-widget-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              disabled={isWorking}
            />
            <button type="submit" disabled={!inputValue.trim() || isWorking}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  )
}
