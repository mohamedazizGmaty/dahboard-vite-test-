import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for solo agents and small agencies",
      features: [
        "Custom website builder",
        "Up to 100 customers",
        "Basic CRM features",
        "Email support",
        "5 GB storage",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Growth",
      price: "$149",
      description: "Best for growing agencies and teams",
      features: [
        "Everything in Starter",
        "Unlimited customers",
        "Advanced CRM & automation",
        "Admin panel access",
        "AI Analytics dashboard",
        "Priority support",
        "50 GB storage",
        "Team collaboration tools",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large agencies with advanced needs",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "24/7 phone support",
        "Unlimited storage",
        "Advanced AI insights",
        "White-label options",
        "Custom development",
        "SLA guarantee",
        "Multi-location support"
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="relative bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white sm:text-4xl md:text-5xl">
            Pricing That Scales With You
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            Choose the perfect plan for your agency. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col bg-white/80 dark:bg-slate-900/60 backdrop-blur-lg border-white/60 dark:border-white/10 shadow-xl shadow-blue-500/10 transition-all hover:shadow-2xl hover:shadow-blue-500/20 ${plan.popular ? 'border-2 border-blue-400 dark:border-blue-500 shadow-blue-500/20 lg:scale-105 bg-gradient-to-br from-blue-100/80 to-white/80 dark:from-blue-900/30 dark:to-slate-900/80' : 'border'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 px-4 py-1 text-white shadow-lg shadow-blue-500/30">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-8 pt-6">
                <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-blue-900 dark:text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-2 text-gray-600 dark:text-gray-400">/month</span>}
                </div>
                <CardDescription className="mt-2 text-base dark:text-gray-400">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30' : 'border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

