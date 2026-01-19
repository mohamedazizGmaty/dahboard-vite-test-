import { Badge } from "@/components/ui/badge"
import { Globe, Users, Settings, Brain } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Globe,
      title: "Build Your Website",
      description: "Choose from professional templates and customize your travel agency website in minutes. No coding required."
    },
    {
      number: "02",
      icon: Users,
      title: "Manage Customers & Bookings",
      description: "Track inquiries, manage bookings, and communicate with customers from a unified CRM dashboard."
    },
    {
      number: "03",
      icon: Settings,
      title: "Run Your Operations",
      description: "Handle payments, manage staff, create offers, and coordinate trips from your centralized admin panel."
    },
    {
      number: "04",
      icon: Brain,
      title: "Get AI-Powered Insights",
      description: "Unlock growth opportunities with smart analytics that predict trends and optimize your business decisions."
    }
  ]

  return (
    <section className="border-t border-blue-200/50 bg-gradient-to-br from-blue-50 via-white to-sky-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 md:text-xl">
            Get your travel agency online and operational in four simple steps.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2">
                    <Badge variant="outline" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-white text-lg font-bold text-blue-600">
                      {step.number}
                    </Badge>
                    <div className="hidden h-16 w-0.5 bg-blue-300/40 md:block" />
                  </div>
                  <div className="flex flex-1 gap-4 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/10 transition-all hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-300/60 md:p-8">
                    <div className="shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/50">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-blue-900 md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

