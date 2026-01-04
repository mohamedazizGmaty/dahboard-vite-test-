import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function WebsiteBuilderPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Website Builder. Describe your dream travel agency website, and I will build it for you.',
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
    scrollToBottom()
  }, [messages, isWorking])

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
      // Ensure key is clean
      const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '')
      const genAI = new GoogleGenerativeAI(cleanKey)
      
      let result;
      let usedModel = '';
      
      // Try multiple models in sequence
      const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
      const errors: string[] = [];
      
      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
          result = await model.generateContent(inputValue)
          usedModel = modelName;
          break; // Success!
        } catch (e: any) {
          console.warn(`Failed with ${modelName}`, e)
          errors.push(`${modelName}: ${e.message || e.toString()}`);
        }
      }

      if (!result) {
        throw new Error(`All models failed. Details: ${errors.join(' | ')}`)
      }

      const response = await result.response
      const text = response.text()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text, // + `\n\n(Generated with ${usedModel})`, // Optional debug info
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error: any) {
      console.error('Error calling Gemini API:', error)
      
      let errorMessage = error.message || 'Unknown error occurred'
      
      // Only show the friendly 404 message if it's NOT the "All models failed" error
      if (!errorMessage.includes('All models failed') && errorMessage.includes('404') && errorMessage.includes('not found')) {
        errorMessage = 'Model not found. This usually means the API key is valid but has no access to the requested model.'
      } else if (errorMessage.includes('API key not valid')) {
        errorMessage = 'Invalid API Key. Please check your .env file.'
      }

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>AI Website Builder</h1>
          <p className="page-description">
            Create and manage your travel website with AI
          </p>
        </div>
      </header>

      <div className="card chat-card">
        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'assistant' ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isWorking && (
            <div className="message assistant working-state">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="working-indicator">
                  <div className="gear-spinner">⚙️</div>
                  <span>Analyzing requirements...</span>
                </div>
                <div className="working-steps">
                  <div className="step step-1">Generating layout structure</div>
                  <div className="step step-2">Selecting color palette</div>
                  <div className="step step-3">Writing copy</div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your website (e.g., 'A luxury safari travel agency for Kenya')..."
            disabled={isWorking}
          />
          <button type="submit" disabled={!inputValue.trim() || isWorking}>
            Send 🚀
          </button>
        </form>
      </div>
    </section>
  )
}
