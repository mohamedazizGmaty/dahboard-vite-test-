
import { BioluminescentGrid, BioluminescentGridItem } from '@/components/ui/bioluminescent-grid';
import { BrainCircuit, DatabaseZap, Share2, ShieldCheck, Zap, Code } from 'lucide-react';

export function ClaimSection() {
    const features = [
        {
            Icon: BrainCircuit,
            title: "Neural Synapse Mapping",
            description: "Visualize and interact with complex data relationships in real-time, just like a neural network.",
            className: "col-span-2 row-span-2",
        },
        {
            Icon: DatabaseZap,
            title: "Bio-Data Streams",
            description: "Connect to live data feeds with our high-throughput, low-latency streaming infrastructure.",
            className: "",
        },
        {
            Icon: ShieldCheck,
            title: "Quantum Encryption",
            description: "Secure your information with next-generation, quantum-resistant security protocols.",
            className: "",
        },
        {
            Icon: Share2,
            title: "Decentralized Network",
            description: "Built on a peer-to-peer network, ensuring uptime and data sovereignty.",
            className: "row-span-2",
        },
        {
            Icon: Code,
            title: "Evolvable API",
            description: "An API that learns and adapts to your query patterns, optimizing performance automatically.",
            className: "col-span-2",
        },
        {
            Icon: Zap,
            title: "Instant Scaling",
            description: "Our infrastructure scales from zero to infinity in milliseconds, handling any workload.",
            className: "",
        },
    ];

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50 py-20 min-h-screen flex items-center justify-center border-t border-blue-200/50">
            <div className="container mx-auto px-4 max-w-7xl">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-900">
                    The Claim Section: The Super-App
                </h1>
                <p className="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
                    A reactive grid with a futuristic, organic glow effect.
                </p>

                <BioluminescentGrid className="mt-12">
                    {features.map((feature, i) => (
                        <BioluminescentGridItem key={i} className={feature.className}>
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <feature.Icon className="h-10 w-10 text-blue-600 mb-4" />
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-blue-900">{feature.title}</h2>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        </BioluminescentGridItem>
                    ))}
                </BioluminescentGrid>
            </div>
        </section>
    );
}
