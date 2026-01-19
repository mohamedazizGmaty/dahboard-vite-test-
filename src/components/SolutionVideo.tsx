import { Play, X } from "lucide-react"
import { useState } from "react"


interface SolutionVideoProps {
    videoUrl?: string; // URL for the video to play
}

export function SolutionVideo({ videoUrl = "https://www.youtube.com/watch?v=spWYjxGbcFU" }: SolutionVideoProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="relative w-full py-20 bg-white dark:bg-slate-950 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

            <div className="container relative mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-blue-950 dark:text-white sm:text-4xl md:text-5xl">
                        See the Solution in Action
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Watch how StrollUP streamlines your entire travel agency workflow in just a few clicks.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-gray-900 shadow-2xl group">
                        {/* Placeholder for video content */}
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-gray-900/40 group-hover:bg-gray-900/30 transition-all duration-300 cursor-pointer z-10"
                            onClick={() => setIsVideoOpen(true)}
                        >
                            {/* Pulse underlying circle */}
                            <div className="absolute h-20 w-20 rounded-full bg-blue-500/30 animate-ping opacity-75"></div>

                            {/* Play button */}
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50 group-hover:bg-blue-500">
                                <Play className="h-10 w-10 ml-1" fill="currentColor" />
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                            alt="Dashboard Preview"
                            className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Glow effect */}
                        <div className="absolute -inset-1 z-[-1] rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10">
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={videoUrl.replace("watch?v=", "embed/")}
                            title="Solution Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={() => setIsVideoOpen(false)}
                        aria-hidden="true"
                    ></div>
                </div>
            )}
        </section>
    )
}
