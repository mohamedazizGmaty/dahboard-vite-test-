'use client'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Eye, EyeClosed, Check } from 'lucide-react';

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            {...props}
        />
    )
}

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    // For 3D card effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen w-full bg-background relative overflow-x-hidden flex items-center justify-center transition-colors duration-300 pt-32 pb-10">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background dark:from-primary/20 dark:via-primary/5" />

            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />

            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-primary/10 blur-[80px]" />
            <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-primary/10 blur-[60px]"
                animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [0.98, 1.02, 0.98]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm relative z-10 my-auto"
                style={{ perspective: 1500 }}
            >
                <motion.div
                    className="relative"
                    style={{ rotateX, rotateY }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ z: 10 }}
                >
                    <div className="relative group">
                        {/* Card Glow */}
                        <motion.div
                            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                            animate={{
                                boxShadow: [
                                    "0 0 10px 2px rgba(var(--primary),0.1)",
                                    "0 0 15px 5px rgba(var(--primary),0.2)",
                                    "0 0 10px 2px rgba(var(--primary),0.1)"
                                ],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }}
                        />

                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                        {/* Card Content */}
                        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-border shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, currentColor 0.5px, transparent 0.5px), linear-gradient(45deg, currentColor 0.5px, transparent 0.5px)`,
                                    backgroundSize: '30px 30px'
                                }}
                            />

                            {/* Header */}
                            <div className="text-center space-y-1 mb-5">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80"
                                >
                                    Sign Up
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-muted-foreground text-xs"
                                >
                                    Get your account ready to connect with your team.
                                </motion.p>
                            </div>

                            {/* Social Logins */}
                            <div className="space-y-3 mb-5">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full relative group/google"
                                >
                                    <div className="relative overflow-hidden bg-secondary text-secondary-foreground font-medium h-10 rounded-lg border border-border hover:border-primary/20 transition-all duration-300 flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 flex items-center justify-center text-current/80 group-hover/google:text-current transition-colors duration-300">G</div>
                                        <span className="text-secondary-foreground/80 group-hover/google:text-secondary-foreground transition-colors text-xs">
                                            Sign In With Google
                                        </span>
                                    </div>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full relative group/linkedin"
                                >
                                    <div className="relative overflow-hidden bg-secondary text-secondary-foreground font-medium h-10 rounded-lg border border-border hover:border-primary/20 transition-all duration-300 flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 flex items-center justify-center text-current/80 group-hover/linkedin:text-current transition-colors duration-300 font-bold">in</div>
                                        <span className="text-secondary-foreground/80 group-hover/linkedin:text-secondary-foreground transition-colors text-xs">
                                            Sign In With Linkedin
                                        </span>
                                    </div>
                                </motion.button>
                            </div>

                            {/* Divider */}
                            <div className="relative mb-5 flex items-center">
                                <div className="flex-grow border-t border-border"></div>
                                <span className="mx-3 text-xs text-muted-foreground uppercase font-medium">or</span>
                                <div className="flex-grow border-t border-border"></div>
                            </div>

                            {/* Sign Up Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* First Name */}
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-foreground ml-1">First Name</label>
                                    <div className={`relative flex items-center overflow-hidden rounded-lg transition-all duration-300 ${focusedInput === 'firstName' ? 'ring-1 ring-primary/50' : ''}`}>
                                        <Input
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onFocus={() => setFocusedInput("firstName")}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full bg-background/50 border-input focus:border-primary/50 text-foreground placeholder:text-muted-foreground h-10 pl-3 pr-3"
                                        />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-foreground ml-1">Last Name</label>
                                    <div className={`relative flex items-center overflow-hidden rounded-lg transition-all duration-300 ${focusedInput === 'lastName' ? 'ring-1 ring-primary/50' : ''}`}>
                                        <Input
                                            type="text"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onFocus={() => setFocusedInput("lastName")}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full bg-background/50 border-input focus:border-primary/50 text-foreground placeholder:text-muted-foreground h-10 pl-3 pr-3"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-foreground ml-1">Email</label>
                                    <div className={`relative flex items-center overflow-hidden rounded-lg transition-all duration-300 ${focusedInput === 'email' ? 'ring-1 ring-primary/50' : ''}`}>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setFocusedInput("email")}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full bg-background/50 border-input focus:border-primary/50 text-foreground placeholder:text-muted-foreground h-10 pl-3 pr-3"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-foreground ml-1">Password</label>
                                    <div className={`relative flex items-center overflow-hidden rounded-lg transition-all duration-300 ${focusedInput === 'password' ? 'ring-1 ring-primary/50' : ''}`}>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setFocusedInput("password")}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full bg-background/50 border-input focus:border-primary/50 text-foreground placeholder:text-muted-foreground h-10 pl-3 pr-10"
                                        />
                                        <div
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                                            ) : (
                                                <EyeClosed className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-foreground ml-1">Confirm Password</label>
                                    <div className={`relative flex items-center overflow-hidden rounded-lg transition-all duration-300 ${focusedInput === 'confirmPassword' ? 'ring-1 ring-primary/50' : ''}`}>
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-enter your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            onFocus={() => setFocusedInput("confirmPassword")}
                                            onBlur={() => setFocusedInput(null)}
                                            className="w-full bg-background/50 border-input focus:border-primary/50 text-foreground placeholder:text-muted-foreground h-10 pl-3 pr-10"
                                        />
                                        <div
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 cursor-pointer"
                                        >
                                            {showConfirmPassword ? (
                                                <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                                            ) : (
                                                <EyeClosed className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start space-x-2 pt-2">
                                    <div className="relative flex items-center pt-0.5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                                            className="peer appearance-none h-4 w-4 rounded border border-border bg-background/50 checked:bg-primary checked:border-primary focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-200"
                                        />
                                        <Check className="w-3 h-3 text-primary-foreground absolute left-0.5 top-1 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200" />
                                    </div>
                                    <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight">
                                        I have read and agree to the{' '}
                                        <a href="#" className="underline text-primary hover:text-primary/80 transition-colors">privacy policy and terms of service.</a>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full relative group/button mt-5"
                                >
                                    <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />

                                    <div className="relative overflow-hidden bg-primary text-primary-foreground font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <div className="w-4 h-4 border-2 border-primary-foreground/70 border-t-transparent rounded-full animate-spin" />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="button-text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-1 text-sm font-medium"
                                                >
                                                    Sign up
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.button>

                                {/* Bottom Link */}
                                <div className="text-center text-xs text-muted-foreground mt-4">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-primary hover:text-primary/80 underline transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
