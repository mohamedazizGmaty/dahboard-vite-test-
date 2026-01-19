import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, Settings, Brain } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Globe,
      title: "Website Builder",
      description: "Create beautiful travel websites without code. Showcase destinations, packages, and testimonials with stunning templates built for conversion."
    },
    {
      icon: Users,
      title: "CRM",
      description: "Manage customers, bookings, and communication in one place. Track every interaction and never miss a follow-up opportunity."
    },
    {
      icon: Settings,
      title: "Admin Panel",
      description: "Control offers, trips, payments, and staff from a centralized dashboard. Streamline operations and reduce manual work."
    },
    {
      icon: Brain,
      title: "AI Analytics",
      description: "Smart insights to grow revenue and optimize operations. Predict trends, identify opportunities, and make data-driven decisions."
    }
  ]

  return (
    <section id="platform" className="relative bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white sm:text-4xl md:text-5xl">
            Platform Overview
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            Everything you need to run a modern travel agency, unified in one powerful platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-white/50 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl shadow-blue-500/10 transition-all hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-300/60 dark:hover:border-blue-500/50">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/50">
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl text-blue-900 dark:text-blue-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

