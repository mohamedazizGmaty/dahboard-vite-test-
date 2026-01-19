import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ShaderBackground } from "@/components/ui/shader-background"

export function Hero() {
  const navigate = useNavigate()

  return (
    <div className="relative -mt-16">
      <ShaderBackground>
        <section className="relative z-10 container mx-auto px-4 pb-16 md:px-6 md:pb-24 lg:pb-32">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center pt-32 md:pt-40 lg:pt-48">
            <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border border-blue-400/30">
              All-In-One Travel Agency Platform
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Build Your Travel Agency's Entire Digital Stack — In One Platform
            </h1>
            <p className="mb-10 max-w-3xl text-lg text-gray-200 sm:text-xl md:text-2xl">
              StrollUP lets travel agencies create websites, manage customers, automate operations,
              and gain AI-powered insights — all from a single dashboard.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-blue-600 text-base hover:bg-blue-700 shadow-lg shadow-blue-500/50" onClick={() => navigate("/onboarding")}>
                Build Your Agency
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-blue-500/20 border-blue-400/50 text-white hover:bg-blue-500/30 hover:border-blue-400">
                <Play className="mr-2 h-5 w-5" />
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </ShaderBackground>
    </div>
  )
}

