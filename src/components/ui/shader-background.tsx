"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
    children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseEnter = () => {
            // Future: Add interaction effects
        }
        const handleMouseLeave = () => {
            // Future: Add interaction effects
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener("mouseenter", handleMouseEnter)
            container.addEventListener("mouseleave", handleMouseLeave)
        }

        return () => {
            if (container) {
                container.removeEventListener("mouseenter", handleMouseEnter)
                container.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [])

    return (
        <div ref={containerRef} className="min-h-[650px] w-full relative overflow-hidden bg-black -mt-16">
            {/* SVG Filters */}
            <svg className="absolute inset-0 w-0 h-0">
                <defs>
                    <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
                            result="tint"
                        />
                    </filter>
                    <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Background Shaders */}
            <MeshGradient
                className="absolute inset-0 w-full h-full"
                colors={["#000000", "#5c83f6ff", "#0d3d86ff", "#1e1b4b", "#1152a2ff"]}
                speed={0.3}
            />
            <MeshGradient
                className="absolute inset-0 w-full h-full opacity-60"
                colors={["#000000", "#4453deff", "#3246e1ff", "#bcb5b5ff"]}
                speed={0.2}
            />

            {children}
        </div>
    )
}
