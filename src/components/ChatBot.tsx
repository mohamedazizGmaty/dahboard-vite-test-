import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
    id: number
    text: string
    sender: "bot" | "user" | "agent"
    senderName?: string
    avatar?: string
    actions?: { label: string; icon?: React.ReactNode; action: string }[]
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Nice!",
            sender: "bot",
            senderName: "StrollBot",
            avatar: "/bot-avatar.png"
        },
        {
            id: 2,
            text: "What is your role at your company?",
            sender: "bot",
            senderName: "StrollBot",
            avatar: "/bot-avatar.png",
            actions: [
                { label: "Marketing", action: "marketing" },
                { label: "Sales", action: "sales" },
                { label: "Support", action: "support" }
            ]
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim()) return

        // Add user message
        const userMsg: Message = { id: Date.now(), text: inputValue, sender: "user" }
        setMessages(prev => [...prev, userMsg])
        setInputValue("")

        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thanks for sharing! How large is your team?",
                sender: "bot",
                senderName: "StrollBot",
                avatar: "/bot-avatar.png"
            }])
        }, 1000)
    }

    const handleActionClick = (_action: string, label: string) => {
        // User clicks an option
        const userMsg: Message = { id: Date.now(), text: label, sender: "user" }
        setMessages(prev => [...prev, userMsg])

        // Determine bot response based on action
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Our tool is great for teams of all sizes! How many people are on yours?",
                sender: "bot",
                senderName: "StrollBot",
                avatar: "/bot-avatar.png",
                actions: [
                    { label: "1-10", action: "size-small" },
                    { label: "11-50", action: "size-medium" },
                    { label: "50+", action: "size-large" }
                ]
            }])
        }, 800)
    }

    return (
        <>
            {/* Floating Toggle Button - Hides when open */}
            <div
                className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
            >
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/50 transition-transform hover:scale-110"
                    size="icon"
                >
                    <MessageCircle className="h-6 w-6 text-white" />
                </Button>
            </div>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 w-[350px] md:w-[380px] z-50 transition-all duration-300 ease-in-out transform origin-bottom-right ${isOpen
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-10 opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <Card className="border-0 shadow-2xl overflow-hidden flex flex-col h-[600px] bg-[#F4F4F7] dark:bg-slate-950 rounded-xl font-sans">
                    {/* Header - Solid Blue */}
                    <div className="bg-blue-600 p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-10 w-10 border-2 border-blue-400">
                                    <AvatarImage src="/bot-avatar.png" />
                                    <AvatarFallback className="bg-white text-blue-600 font-bold">SB</AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-blue-600 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-none">StrollBot</h3>
                                <p className="text-xs text-blue-100 mt-1 opacity-90">Online Now</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-100 hover:bg-blue-700/50 hover:text-white rounded-full">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-100 hover:bg-blue-700/50 hover:text-white rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex w-full flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                            >
                                {/* Sender Name for Agent/Bot */}
                                {msg.sender !== "user" && msg.senderName && (
                                    <span className="text-[11px] text-gray-500 mb-1 ml-12 font-medium">{msg.senderName}</span>
                                )}

                                <div className={`flex max-w-[85%] gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    {msg.sender !== "user" && (
                                        <Avatar className="h-8 w-8 mt-1 border border-white shadow-sm">
                                            {msg.avatar ? (
                                                <AvatarImage src={msg.avatar} />
                                            ) : (
                                                <AvatarFallback className="bg-blue-100 text-blue-600">SB</AvatarFallback>
                                            )}
                                        </Avatar>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <div
                                            className={`p-3 px-4 rounded-xl text-[15px] leading-relaxed shadow-sm ${msg.sender === "user"
                                                ? "bg-blue-500 text-white rounded-br-none"
                                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-700"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>

                                        {/* Action Chips */}
                                        {msg.actions && (
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {msg.actions.map((action, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleActionClick(action.action, action.label)}
                                                        className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-blue-500 text-blue-500 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                                                    >
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                        <form onSubmit={handleSend} className="relative">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Reply to StrollBot..."
                                className="w-full pl-3 pr-10 py-5 bg-transparent border-0 focus-visible:ring-0 shadow-none text-sm placeholder:text-gray-400"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                        <div className="text-center mt-1">
                            <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                                <span>⚡</span> by StrollUP
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
