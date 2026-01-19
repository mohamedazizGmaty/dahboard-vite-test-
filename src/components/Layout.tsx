import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Outlet } from "react-router-dom"
import { ChatBot } from "@/components/ChatBot"

export function Layout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
            <ChatBot />
        </div>
    )
}
