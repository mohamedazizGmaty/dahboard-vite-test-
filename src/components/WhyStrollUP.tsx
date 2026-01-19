import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function WhyStrollUP() {
  const benefits = [
    {
      title: "No Fragmented Tools",
      description: "Stop juggling multiple platforms. Everything you need is unified in one seamless system."
    },
    {
      title: "Built Specifically for Travel Agencies",
      description: "Purpose-built features designed around your workflow, not generic solutions adapted from other industries."
    },
    {
      title: "End-to-End Workflow Support",
      description: "From first inquiry to post-trip follow-up, manage every touchpoint of your customer journey."
    },
    {
      title: "Scales from Solo Agent to Large Agency",
      description: "Start small and grow without limits. Our platform adapts to your business size and complexity."
    }
  ]

  return (
    <section id="solutions" className="relative bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white sm:text-4xl md:text-5xl">
            Why StrollUP?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            Built to solve the unique challenges travel agencies face every day.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-white/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-lg shadow-lg shadow-blue-500/10 transition-all hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300/60 dark:hover:border-blue-500/50">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
