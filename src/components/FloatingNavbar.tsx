"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Leaf, Sun, Moon, Headphones, UserRound, LogIn, UserPlus } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { useSession } from "next-auth/react";

type Tab = {
    id: string;
    href: string;
    label: string;
    icon: React.ReactNode;
};

const tabs: Tab[] = [
    { id: "hypnose", href: "/hypnose", label: "Hypnose", icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} /> },
    { id: "sophro", href: "/sophrologie", label: "Sophrologie", icon: <Wind className="w-5 h-5" strokeWidth={1.5} /> },
    { id: "igbas", href: "/ig-bas", label: "IG Bas", icon: <Leaf className="w-5 h-5" strokeWidth={1.5} /> },
    { id: "voyage", href: "/voyage-auditif", label: "Voyage Auditif", icon: <Headphones className="w-5 h-5" strokeWidth={1.5} /> }
];

const themes = [
    { id: "nature", icon: <Leaf className="w-5 h-5" strokeWidth={1.5} />, className: "" },
    { id: "soleil", icon: <Sun className="w-5 h-5" strokeWidth={1.5} />, className: "theme-soleil" },
    { id: "nuit", icon: <Moon className="w-5 h-5" strokeWidth={1.5} />, className: "theme-nuit" },
];

export default function FloatingNavbar() {
    const pathname = usePathname();
    const [themeIndex, setThemeIndex] = useState(1); // Default to Soleil (White)

    const currentTheme = themes[themeIndex];

    // Load saved theme from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("theme-index");
        if (saved !== null) {
            const idx = parseInt(saved);
            if (!isNaN(idx) && idx >= 0 && idx < themes.length) {
                setThemeIndex(idx);
            }
        }
    }, []);

    // Apply global theme class + persist to localStorage
    useEffect(() => {
        document.documentElement.className = currentTheme.className;
        localStorage.setItem("theme-index", String(themeIndex));
    }, [currentTheme, themeIndex]);

    // Smooth grain background
    const grainStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.08,
        mixBlendMode: "overlay" as const
    };

    return (
        <div className="fixed top-6 w-full flex justify-center z-[100] px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-auto relative flex items-center gap-2 sm:gap-4 p-2 rounded-full border border-[var(--theme-accent)]/20 backdrop-blur-2xl shadow-2xl transition-colors duration-500 max-w-[95%] overflow-x-auto no-scrollbar bg-[var(--theme-bg)]/80 text-[var(--theme-text)]"
            >
                {/* Radial ambient glow below grain */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,var(--theme-accent)_0%,transparent_60%)] opacity-10" />
                    <div className="absolute inset-0 saturate-50" style={grainStyle} />
                </div>

                <div className="hidden lg:flex pl-6 pr-2 items-center relative z-10 transition-opacity">
                    <Link href="/" className="font-sans font-black tracking-tighter text-lg uppercase opacity-90 whitespace-nowrap hover:opacity-100 transition-opacity">
                        Péguy Casteloot
                    </Link>
                </div>

                {/* Main Tabs Segment */}
                <div className="flex items-center rounded-full relative z-10">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link
                                key={tab.id}
                                href={tab.href}
                                className="relative flex items-center justify-center gap-2 px-5 py-2.5 text-base font-medium transition-colors whitespace-nowrap"
                            >
                                {isActive && <ActiveRingIndicator />}
                                <span className={`relative z-10 transition-all duration-300 flex items-center gap-2.5 ${isActive ? 'text-[var(--theme-accent)] drop-shadow-[0_0_8px_var(--theme-accent)] font-bold' : 'opacity-60 hover:opacity-100 font-medium'}`}>
                                    <span>{tab.label}</span>
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <div className="w-[1px] h-8 bg-current opacity-10 mx-2 z-10 hidden sm:block shrink-0" />

                {/* Control Panel: Toggle + Button */}
                <div className="relative z-10 px-2 flex items-center gap-3 shrink-0">
                    <ThemeToggle themeIndex={themeIndex} setThemeIndex={setThemeIndex} />

                    {/* Instagram Link */}
                    <Link
                        href="https://www.instagram.com/peguy.casteloot/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--theme-accent)]/25 text-[var(--theme-text)]/60 hover:text-[#E1306C] hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10 transition-all duration-300"
                        aria-label="Instagram Péguy Casteloot"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </Link>

                    {/* Login / Espace Membre */}
                    <DropdownAccount />

                    {/* CTA Button → Cfixé */}
                    <Link href="/reserver" className="hidden sm:block px-5 py-2.5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-[var(--theme-accent)]/20 whitespace-nowrap">
                        Prendre RDV
                    </Link>
                </div>
            </motion.nav>
        </div>
    );
}

// 4-Layers Indicator Ring Component
function ActiveRingIndicator() {
    // Relying on CSS variables for spinning gradient colors so it shifts natively.
    return (
        <motion.div
            layoutId="active-indicator-ring"
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            transition={{
                type: "tween",
                ease: [0.34, 1.2, 0.64, 1], // Bouncy overshoot easing
                duration: 0.5
            }}
            style={{ borderRadius: '9999px' }}
        >
            {/* Layer 1: Glow */}
            <div className="absolute inset-[-4px] bg-seafoam blur-[10px] opacity-[0.25]" />

            {/* Layer 2: Clip Container */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* Layer 3: Rotating Gradient */}
                {/* Dynamically uses the current theme colors (teal-deep vs mint-cream vs seafoam) */}
                <div
                    className="absolute left-1/2 top-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4.5s_linear_infinite]"
                    style={{ background: 'conic-gradient(from 0deg, var(--theme-bg) 0%, var(--theme-accent) 20%, var(--theme-text) 33%, #FFFFFF 34%, #FFFFFF 37%, var(--theme-accent-alt) 38.5%, var(--theme-bg) 50%, var(--theme-bg) 50%, var(--theme-accent) 70%, var(--theme-text) 83%, #FFFFFF 84%, #FFFFFF 87%, var(--theme-accent-alt) 88.5%, var(--theme-bg) 100%)' }}
                />
            </div>

            {/* Layer 4: Inner Plate */}
            <div
                className="absolute inset-[2px] rounded-full transition-colors duration-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] bg-[var(--theme-bg)] opacity-95"
            />
        </motion.div>
    );
}

function ThemeToggle({ themeIndex, setThemeIndex }: { themeIndex: number, setThemeIndex: (val: number) => void }) {
    const currentTheme = themes[themeIndex];

    return (
        <motion.button
            whileTap={{ scale: 1.25 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setThemeIndex((themeIndex + 1) % themes.length)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] transition-colors overflow-hidden shrink-0"
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentTheme.id}
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    {currentTheme.icon}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}

function DropdownAccount() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    if (status === "authenticated") {
        return (
            <Link
                href="/espace-membre"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--theme-accent)]/25 text-[var(--theme-text)]/60 hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/60 hover:bg-[var(--theme-accent)]/8 transition-all duration-300"
                aria-label="Espace membre"
            >
                <div className="relative">
                    <UserRound className="w-5 h-5" strokeWidth={1.5} />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--theme-accent)] rounded-full animate-pulse" />
                </div>
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--theme-accent)]/25 text-[var(--theme-text)]/60 hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/60 hover:bg-[var(--theme-accent)]/8 transition-all duration-300"
                aria-label="Menu compte"
            >
                <UserRound className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 bottom-full mb-4 w-48 p-2 rounded-2xl glass-ovni border border-[var(--theme-accent)]/20 shadow-2xl z-50 overflow-hidden"
                        >
                            <Link
                                href="/connexion"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-[var(--theme-accent)]/10 text-sm font-sans transition-colors group"
                            >
                                <LogIn className="w-4 h-4 text-[var(--theme-text)]/40 group-hover:text-[var(--theme-accent)]" />
                                <span className="text-[var(--theme-text)]/80 group-hover:text-[var(--theme-text)]">Se connecter</span>
                            </Link>
                            <Link
                                href="/inscription"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-[var(--theme-accent)]/10 text-sm font-sans transition-colors group"
                            >
                                <UserPlus className="w-4 h-4 text-[var(--theme-text)]/40 group-hover:text-[var(--theme-accent)]" />
                                <span className="text-[var(--theme-text)]/80 group-hover:text-[var(--theme-text)]">S&apos;inscrire</span>
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
