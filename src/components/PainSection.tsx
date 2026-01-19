
import { useState, useEffect, useRef } from 'react';

// --- Data ---
const slidesData = [
    {
        title: "Generate Code with AI",
        description: "Describe your logic in plain English and watch as the AI generates clean, efficient code in seconds. From Python scripts to complex algorithms.",
        image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070&auto=format&fit=crop",
        bgColor: "#ffffff",
        textColor: "#172554", // blue-950
    },
    {
        title: "Debug and Refactor Smarter",
        description: "Paste your buggy code and let the AI identify errors, suggest improvements, and refactor for better readability and performance.",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
        bgColor: "#eff6ff", // blue-50
        textColor: "#172554",
    },
    {
        title: "Learn New Languages, Instantly",
        description: "Translate code snippets between languages. Understand syntax and paradigms of a new language by seeing familiar code transformed.",
        image: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop",
        bgColor: "#ffffff",
        textColor: "#172554",
    },
    {
        title: "Automate Your Workflow",
        description: "From writing documentation to generating unit tests, let AI handle the repetitive tasks so you can focus on building great things.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        bgColor: "#f0f9ff", // sky-50
        textColor: "#172554",
    },
];

export function PainSection() {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const textElements = textRefs.current;

            // Find which text block is most visible in the center of the viewport
            let maxVisibility = 0;
            let mostVisibleIndex = 0;

            textElements.forEach((el, index) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Calculate intersection height
                const intersectionTop = Math.max(0, rect.top);
                const intersectionBottom = Math.min(viewportHeight, rect.bottom);
                const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);

                if (intersectionHeight > maxVisibility) {
                    maxVisibility = intersectionHeight;
                    mostVisibleIndex = index;
                }
            });

            if (maxVisibility > 0) {
                setActiveCard(mostVisibleIndex);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Grid pattern style for the sticky image container
    const gridPatternStyle = {
        '--grid-color': 'rgba(37, 99, 235, 0.1)', // blue-600 with low opacity
        backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
        backgroundSize: '3.5rem 3.5rem',
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-[var(--section-bg)] dark:bg-slate-950 transition-colors duration-700 ease-in-out"
            style={{ "--section-bg": slidesData[activeCard].bgColor } as React.CSSProperties}
        >
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="flex flex-col md:flex-row">

                    {/* Left Column: Scrolling Text Content */}
                    <div className="w-full md:w-1/2 py-20 md:py-0">
                        {slidesData.map((slide, index) => (
                            <div
                                key={index}
                                ref={(el) => { textRefs.current[index] = el; }}
                                className="flex min-h-[80vh] flex-col justify-center py-16"
                            >
                                <div className={`transition-all duration-500 ${activeCard === index ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'}`}>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-blue-900 dark:text-white mb-6">
                                        {slide.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg leading-relaxed">
                                        {slide.description}
                                    </p>

                                    {index === slidesData.length - 1 && (
                                        <div className="mt-10">
                                            <a
                                                href="#get-started"
                                                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                                            >
                                                Get Started
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Sticky Image Content */}
                    <div className="hidden md:block w-full md:w-1/2 h-screen sticky top-0">
                        <div className="h-full w-full flex items-center justify-center p-8" style={gridPatternStyle}>
                            <div className="relative w-full aspect-[4/5] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border-4 border-white/50 dark:border-white/10 bg-white dark:bg-slate-900">
                                {slidesData.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeCard === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                            }`}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = `https://placehold.co/800x1200/e2e8f0/4a5568?text=Image+Not+Found`;
                                            }}
                                        />
                                        {/* Overlay gradient for text readability if needed, though separate here */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}