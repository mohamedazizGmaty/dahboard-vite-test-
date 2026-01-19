"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// --- Shaders ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.1;
    vec2 m = uMouse * 0.05;
    
    // Create a smooth, flowing liquid pattern
    float n = sin(uv.x * 5.0 + t + m.x * 8.0) * sin(uv.y * 5.0 - t + m.y * 8.0);
    float color = smoothstep(-0.5, 0.5, n);
    
    // Deep, rich colors for an "Elite" feel
    vec3 deepNavy = vec3(0.02, 0.04, 0.08); // Almost black blue
    vec3 royalBlue = vec3(0.05, 0.1, 0.3); // Rich dark blue
    
    // Subtle mixing
    vec3 finalColor = mix(deepNavy, royalBlue, color * 0.4); 
    
    // Add a very subtle grain/noise
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += noise * 0.02;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const LiquidBackground = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
    }), []);

    useFrame((state) => {
        const { clock, mouse } = state;
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                transparent
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
};

const FloatingObject = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={[2, 0, 0]}>
                <icosahedronGeometry args={[1, 2]} /> {/* Increased detail */}
                {/* Liquid Metal Look */}
                <MeshDistortMaterial
                    color="#3b82f6"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.9}
                    roughness={0.1}
                    distort={0.4}
                    speed={3}
                />
            </mesh>
        </Float>
    );
};





export const ExperienceCTA = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            gsap.fromTo(revealRef.current,
                { filter: "blur(20px)", opacity: 0, scale: 0.95 },
                { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
            );

            gsap.from(".stat-card", {
                y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.5
            });

            // Magnetic Button Effect
            const handleMouseMove = (e: MouseEvent) => {
                if (!ctaRef.current) return;
                const rect = ctaRef.current.getBoundingClientRect();
                const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));

                if (dist < 100) {
                    gsap.to(ctaRef.current, {
                        x: (e.clientX - (rect.left + rect.width / 2)) * 0.3,
                        y: (e.clientY - (rect.top + rect.height / 2)) * 0.3,
                        scale: 1.05,
                        duration: 0.3
                    });
                } else {
                    gsap.to(ctaRef.current, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                }
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[600px] w-full bg-[#020617] flex flex-col items-center justify-center overflow-hidden selection:bg-blue-500 selection:text-white">

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                    <Environment preset="city" /> {/* Adds realistic reflections */}
                    <LiquidBackground />
                    <FloatingObject />
                </Canvas>
            </div>

            {/* Content Layer */}
            <div ref={revealRef} className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Left: Typography & CTA */}
                <div className="flex-1 text-left space-y-8 max-w-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[2px] bg-blue-500"></div>
                        <span className="font-mono text-xs font-bold text-blue-400 tracking-[0.2em] uppercase">Enterprise Ready</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        TRANSFORM <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            YOUR AGENCY
                        </span>
                    </h1>

                    <p className="max-w-md text-lg text-blue-200/60 leading-relaxed font-light">
                        Stop managing chaos. Start engineering growth. The all-in-one operating system designed for modern travel agencies.
                    </p>

                    <div className="pt-4">
                        <button ref={ctaRef} className="group relative flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 pl-2 pr-8 py-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-white tracking-widest uppercase">Start Free Trial</span>
                        </button>
                    </div>
                </div>



            </div>
        </section>
    );
};
