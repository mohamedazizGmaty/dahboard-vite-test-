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
      content: 'Hello! I am your CRM Assistant. Ask me anything about managing your customer relationships, sales pipelines, or business contacts.',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isWorking, setIsWorking] = useState(false)
  const messagesAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight
    }
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
      const modelsToTry = [
        'gemini-2.0-flash',
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-1.5-flash',
        'gemini-pro'
      ];
      const errors: string[] = [];
      
      const systemPrompt = `You are a specialized CRM (Customer Relationship Management) Assistant for a company.
      Your role is to strictly answer questions related to CRM, sales, leads, customers, business strategies, and data management.
      
      IMPORTANT RULES:
      1. If the user asks about anything outside of CRM/Business context (like sports, general coding, jokes, weather, etc.), you must politely REFUSE to answer.
      2. Say something like: "I am a CRM Assistant. I can only help you with questions related to customer relationship management."
      3. Do not break character.
      4. FORMATTING: 
         - Use clear structure with headings, bullet points, and bold text.
         - Do NOT output large blocks of unstructured text.
         - Use newlines to separate sections.
         - When listing items, use bullet points (*) or numbered lists.
      
      User Query: ${inputValue}`;

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
          result = await model.generateContent(systemPrompt)
          usedModel = modelName;
          break; // Success!
        } catch (e: any) {
          console.warn(`Failed with ${modelName}`, e)
          errors.push(`${modelName}: ${e.message || e.toString()}`);
        }
      }

      if (!result) {
        // Debugging: List available models to help diagnose
        let availableModels = 'Unable to list models';
        try {
             const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
             const listData = await listResponse.json();
             if (listData.models) {
                 availableModels = listData.models.map((m: any) => m.name.replace('models/', '')).join(', ');
             } else if (listData.error) {
                 availableModels = `API Error: ${listData.error.message}`;
             }
        } catch (fetchError) {
            availableModels = 'Network error listing models';
        }

        throw new Error(`All models failed. Available models for your key: [${availableModels}]. Details: ${errors.join(' | ')}`)
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
          <h1>CRM AI Assistant</h1>
          <p className="page-description">
            Your expert guide for Customer Relationship Management
          </p>
        </div>
      </header>

      <div className="card chat-card">
        <div className="messages-area" ref={messagesAreaRef}>
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
                  <span>Processing request...</span>
                </div>
                <div className="working-steps">
                  <div className="step step-1">Analyzing query context</div>
                  <div className="step step-2">Searching CRM knowledge base</div>
                  <div className="step step-3">Formulating response</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form className="input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about leads, contacts, or sales strategies..."
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
