import { TestimonialsSection } from "@/components/blocks/simple-animated-testimonials"

export function SocialProof() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Thompson",
            role: "Founder",
            company: "Wanderlust Travels",
            content: "StrollUP transformed how we manage our bookings. It's incredibly intuitive and the support is amazing.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Director",
            company: "Global Getaways",
            content: "Since switching to StrollUP, our operational efficiency has doubled. The AI insights are a game changer.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            role: "CEO",
            company: "Vista Voyages",
            content: "The best platform for travel agencies, hands down. It handles everything from payments to customer CRM.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
        },
    ]

    const stats = [
        { label: "Active Agencies", value: "500+" },
        { label: "Trips Planned", value: "50k+" },
        { label: "Happy Travelers", value: "100k+" },
    ]

    return (
        <section className="relative bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="container relative mx-auto px-4 md:px-6">
                <div className="mx-auto mb-6 max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white sm:text-4xl">
                        Trusted by Leading Travel Agencies
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Join hundreds of agencies that are scaling their business with StrollUP.
                    </p>
                </div>


                {/* Testimonials */}
                <div className="-mx-4 md:mx-0">
                    <TestimonialsSection
                        title=""
                        subtitle=""
                        testimonials={testimonials}
                        className="py-0 md:py-8 bg-transparent"
                        trustedCompanies={[]}
                        showVerifiedBadge={true}
                    />
                </div>
            </div>
        </section>
    )
}
