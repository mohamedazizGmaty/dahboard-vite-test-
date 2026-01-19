
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  User,
  Briefcase,
  Globe,
  Factory
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";

const steps = [
  {
    id: 1,
    title: "Agency Type",
    description: "Select your agency type"
  },
  {
    id: 2,
    title: "Agency Details",
    description: "Tell us about your agency"
  },
  {
    id: 3,
    title: "Niche & Services",
    description: "What do you offer?"
  },
  {
    id: 4,
    title: "Billing Details",
    description: "Setup payment method"
  },
  {
    id: 5,
    title: "Completed",
    description: "Your agency is ready"
  }
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    agencyType: "agency",
    agentCount: "1-5",
    agencyName: "",
    platformTier: "professional",
    legalName: "",
    primaryNiche: "",
    currentWebsite: "",
    nameOnCard: "Max Doe",
    cardNumber: "4111 1111 1111 1111",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    saveCard: true
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Choose Agency Type</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Help Page
                </a>
                .
              </CardDescription>
            </CardHeader>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card
                className={cn(
                  "cursor-pointer transition-all",
                  formData.agencyType === "solo"
                    ? "bg-purple-50 border-purple-500 ring-2 ring-purple-500"
                    : "border-gray-200 hover:shadow-md"
                )}
                onClick={() => updateFormData("agencyType", "solo")}>
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 font-semibold">Solo Agent</h3>
                    <p className="text-muted-foreground text-sm">
                      Best for independent travel agents
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer transition-all",
                  formData.agencyType === "agency"
                    ? "bg-purple-50 border-purple-500 ring-2 ring-purple-500"
                    : "border-gray-200 hover:shadow-md"
                )}
                onClick={() => updateFormData("agencyType", "agency")}>
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <Briefcase className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 font-semibold">Full Service Agency</h3>
                    <p className="text-muted-foreground text-sm">
                      Manage multiple agents and teams
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Agency Details</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Help Page
                </a>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label className="mb-4 block text-base">Number of Agents</Label>
                <div className="grid grid-cols-4 gap-3">
                  {["1-2", "3-10", "11-50", "50+"].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFormData("agentCount", size)}
                      className={cn(
                        "rounded-lg border-2 p-4 text-center transition-all",
                        formData.agentCount === size
                          ? "bg-purple-50 border-purple-500 ring-2 ring-purple-500"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="agencyName" className="text-base">
                  Agency Name
                </Label>
                <Input
                  id="agencyName"
                  value={formData.agencyName}
                  onChange={(e) => updateFormData("agencyName", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="mb-4 block text-base">Select Platform Tier</Label>
                <RadioGroup
                  value={formData.platformTier}
                  onValueChange={(value) => updateFormData("platformTier", value)}
                  className="space-y-3">
                  <div
                    className={cn(
                      "flex items-center space-x-3 rounded-lg border p-4 transition-all cursor-pointer",
                      formData.platformTier === "starter"
                        ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                        : "border-gray-200 hover:border-purple-200"
                    )}
                    onClick={() => updateFormData("platformTier", "starter")}>
                    <Factory className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Starter</div>
                      <div className="text-sm text-gray-500">
                        Essential tools for new agencies
                      </div>
                    </div>
                    <RadioGroupItem value="starter" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-3 rounded-lg border p-4 transition-all cursor-pointer",
                      formData.platformTier === "professional"
                        ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                        : "border-gray-200 hover:border-purple-200"
                    )}
                    onClick={() => updateFormData("platformTier", "professional")}>
                    <Briefcase className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Professional</div>
                      <div className="text-sm text-gray-500">Advanced automation & CRM features</div>
                    </div>
                    <RadioGroupItem value="professional" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-3 rounded-lg border p-4 transition-all cursor-pointer",
                      formData.platformTier === "enterprise"
                        ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                        : "border-gray-200 hover:border-purple-200"
                    )}
                    onClick={() => updateFormData("platformTier", "enterprise")}>
                    <Globe className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">Enterprise</div>
                      <div className="text-sm text-gray-500">
                        Full-suite solution for large agencies
                      </div>
                    </div>
                    <RadioGroupItem value="enterprise" />
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Niche & Services</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Help Page
                </a>
                .
              </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="legalName">Legal Business Name</Label>
                <Input
                  id="legalName"
                  placeholder="Official registered name"
                  className="mt-2"
                  value={formData.legalName}
                  onChange={(e) => updateFormData("legalName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="primaryNiche">Primary Niche</Label>
                <Select
                  value={formData.primaryNiche}
                  onValueChange={(value) => updateFormData("primaryNiche", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your primary niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury Travel</SelectItem>
                    <SelectItem value="adventure">Adventure & Outdoors</SelectItem>
                    <SelectItem value="corporate">Corporate / Business</SelectItem>
                    <SelectItem value="family">Family & Group</SelectItem>
                    <SelectItem value="weddings">Destination Weddings</SelectItem>
                    <SelectItem value="cruises">Cruises</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentWebsite">Current Website (Optional)</Label>
                <Input
                  id="currentWebsite"
                  placeholder="https://youragency.com"
                  className="mt-2"
                  value={formData.currentWebsite}
                  onChange={(e) => updateFormData("currentWebsite", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Billing Details</CardTitle>
              <CardDescription>
                If you need more info, please check out{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Help Page
                </a>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              <div>
                <Label htmlFor="nameOnCard" className="text-base font-medium">
                  Name On Card <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={(e) => updateFormData("nameOnCard", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber" className="text-base font-medium">
                  Card Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => updateFormData("cardNumber", e.target.value)}
                    className="pr-20"
                  />
                  <div className="absolute top-1/2 right-3 flex -translate-y-1/2 transform space-x-1">
                    <div className="flex h-5 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                      VISA
                    </div>
                    <div className="h-5 w-8 rounded bg-red-500"></div>
                    <div className="h-5 w-8 rounded bg-blue-400"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-medium">
                    Expiration Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Select
                      value={formData.expirationMonth || undefined}
                      onValueChange={(value) => updateFormData("expirationMonth", value || "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.expirationYear || undefined}
                      onValueChange={(value) => updateFormData("expirationYear", value || "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={2024 + i} value={String(2024 + i)}>
                            {2024 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-base font-medium">
                    CVV <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => updateFormData("cvv", e.target.value)}
                    placeholder="CVV"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Save Card for further billing?</div>
                  <div className="text-sm text-gray-500">
                    If you need more info, please check budget planning
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.saveCard}
                    onCheckedChange={(checked) => updateFormData("saveCard", checked)}
                  />
                  <span className="text-sm text-gray-600">Save Card</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle>You Are Done!</CardTitle>
              <CardDescription>
                If you need more info, please{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Sign In
                </a>
                .
              </CardDescription>
            </CardHeader>

            <div className="space-y-4">
              <p className="text-gray-700">
                Welcome to StrollUP! Your agency dashboard is being prepared. You can now start managing bookings, creating itineraries, and growing your business.
              </p>

              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Next Steps</strong>
                  <br />
                  To start using our AI tools, please{" "}
                  <a href="#" className="font-medium text-purple-600 hover:underline">
                    complete your profile verification
                  </a>
                  .
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-3xl shadow-2xl border-white/60 bg-white/85 backdrop-blur-xl shadow-purple-500/10">
          <CardHeader className="pb-0">
            {/* Step Indicator */}
            <div className="mb-6 flex items-center justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative flex flex-1 cursor-pointer flex-col items-center"
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 hover:bg-purple-400 hover:text-white",
                      currentStep > step.id
                        ? "bg-purple-600 text-white"
                        : currentStep === step.id
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    )}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <div
                    className={cn(
                      "mt-2 text-center text-sm font-medium",
                      currentStep >= step.id ? "text-purple-900" : "text-gray-500"
                    )}>
                    {step.title}
                  </div>
                  {step.id < steps.length && (
                    <div
                      className={cn(
                        "absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] -translate-y-1/2 bg-gray-200 transition-colors duration-300",
                        currentStep > step.id && "bg-purple-400"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {renderStepContent()}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep < 5 ? (
                <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <span>{currentStep === 4 ? "Submit" : "Continue"}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}