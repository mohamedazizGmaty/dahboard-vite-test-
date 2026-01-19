import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import supabase from "../../utils/supabase"
import { Loader2, CheckCircle2 } from "lucide-react"

interface FormData {
  full_name: string
  email: string
  company_name: string
  agency_size: string
  country: string
  message: string
}

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    company_name: "",
    agency_size: "",
    country: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.full_name || !formData.email) {
      setSubmitStatus("error")
      setErrorMessage("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const { error } = await supabase.from("leads").insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          company_name: formData.company_name,
          agency_size: formData.agency_size,
          country: formData.country,
          message: formData.message
        }
      ])

      if (error) {
        setSubmitStatus("error")
        setErrorMessage(error.message)
        return
      }

      setSubmitStatus("success")
      setFormData({
        full_name: "",
        email: "",
        company_name: "",
        agency_size: "",
        country: "",
        message: ""
      })

      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit form")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white sm:text-4xl md:text-5xl">
            Talk to Us About Your Travel Agency
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            Let us know how we can help transform your business with StrollUP.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="border-white/60 dark:border-white/10 bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">Get Started Today</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Fill out the form below and our team will reach out to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company / Agency Name</Label>
                    <Input
                      id="company_name"
                      type="text"
                      placeholder="Your Travel Agency"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agency_size">Agency Size</Label>
                    <Select
                      value={formData.agency_size}
                      onValueChange={(value) => setFormData({ ...formData, agency_size: value })}
                    >
                      <SelectTrigger id="agency_size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="2-5">2–5</SelectItem>
                        <SelectItem value="6-20">6–20</SelectItem>
                        <SelectItem value="20+">20+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your needs..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-800">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Thank you! We'll be in touch shortly.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-50 p-4 text-red-800">
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

