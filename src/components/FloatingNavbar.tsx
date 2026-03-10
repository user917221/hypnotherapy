"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Leaf, Sun, Moon, Headphones, UserRound, LogIn, UserPlus, Home, Menu, X, Instagram } from "lucide-react";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    // Removed heavy SVG grain for better performance on mobile
    const grainStyle = {
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 100%)",
        opacity: 0.5,
    };

    return (
        <div className="fixed top-6 w-full flex justify-center z-[100] px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-auto relative flex items-center gap-2 sm:gap-4 p-2 rounded-full border border-[var(--theme-accent)]/20 backdrop-blur-2xl shadow-2xl transition-colors duration-500 max-w-[95%] bg-[var(--theme-bg)]/80 text-[var(--theme-text)]"
            >
                {/* Radial ambient glow below grain */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,var(--theme-accent)_0%,transparent_60%)] opacity-10" />
                    <div className="absolute inset-0 saturate-50" style={grainStyle} />
                </div>

                {/* Mobile Home Button / Brand */}
                <div className="flex lg:hidden pl-4 pr-2 items-center relative z-10 transition-opacity">
                    <Link href="/" className="flex items-center gap-2 group" aria-label="Retour à l'accueil">
                        <Home className="w-5 h-5 text-[var(--theme-accent)] group-hover:scale-110 transition-transform" />
                        <span className="font-sans font-black tracking-tighter text-sm uppercase opacity-90 whitespace-nowrap">
                            Péguy Casteloot
                        </span>
                    </Link>
                </div>

                <div className="hidden lg:flex pl-6 pr-2 items-center relative z-10 transition-opacity">
                    <Link href="/" className="font-sans font-black tracking-tighter text-lg uppercase opacity-90 whitespace-nowrap hover:opacity-100 transition-opacity">
                        Péguy Casteloot
                    </Link>
                </div>

                {/* Main Tabs Segment - Desktop Only */}
                <div className="hidden lg:flex items-center rounded-full relative z-10">
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

                <div className="w-[1px] h-8 bg-current opacity-10 mx-2 z-10 hidden lg:block shrink-0" />

                {/* Control Panel: Toggle + Button */}
                <div className="relative z-10 px-2 flex items-center gap-1 sm:gap-3 shrink-0">
                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
                        <InstagramLink />
                        <DropdownAccount />
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                        <DropdownAccount />
                    </div>

                    <Link href="/reserver" className="hidden sm:block px-5 py-2.5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-[var(--theme-accent)]/20 whitespace-nowrap">
                        Prendre RDV
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 hover:bg-[var(--theme-accent)]/20 transition-colors pointer-events-auto"
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <MobileDrawer
                        onClose={() => setIsMenuOpen(false)}
                        themeIndex={themeIndex}
                        setThemeIndex={setThemeIndex}
                        pathname={pathname}
                    />
                )}
            </AnimatePresence>
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
        <Link
            href="/connexion"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--theme-accent)]/25 text-[var(--theme-text)]/60 hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/60 hover:bg-[var(--theme-accent)]/8 transition-all duration-300 shadow-sm"
            aria-label="Connexion"
        >
            <UserRound className="w-5 h-5" strokeWidth={1.5} />
        </Link>
    );
}
function InstagramLink() {
    return (
        <Link
            href="https://www.instagram.com/peguy.casteloot/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--theme-accent)]/25 text-[var(--theme-text)]/60 hover:text-[#E1306C] hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10 transition-all duration-300 shrink-0"
            aria-label="Instagram Péguy Casteloot"
        >
            <Instagram className="w-5 h-5" />
        </Link>
    );
}

function MobileDrawer({ onClose, themeIndex, setThemeIndex, pathname }: { onClose: () => void, themeIndex: number, setThemeIndex: (val: number) => void, pathname: string }) {
    return (
        <div className="fixed inset-0 z-[200] lg:hidden pointer-events-auto">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-[var(--theme-bg)]/95 backdrop-blur-3xl border-l border-[var(--theme-accent)]/20 shadow-2xl flex flex-col"
            >
                <div className="p-6 flex items-center justify-between border-b border-[var(--theme-accent)]/10">
                    <span className="font-sans font-black tracking-tighter text-lg uppercase text-[var(--theme-accent)]">Menu</span>
                    <button onClick={onClose} className="p-2 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                    {/* Main Links */}
                    <nav className="space-y-4">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] font-bold' : 'hover:bg-[var(--theme-accent)]/5 opacity-70'}`}
                                >
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[var(--theme-accent)] text-[var(--theme-bg)]' : 'bg-[var(--theme-accent)]/10'}`}>
                                        {tab.icon}
                                    </div>
                                    <span className="text-lg">{tab.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="h-[1px] bg-[var(--theme-accent)]/10" />

                    {/* Secondary Controls */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-40">Apparence</span>
                            <ThemeToggle themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-40">Réseaux</span>
                            <InstagramLink />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-[var(--theme-accent)]/10">
                    <Link
                        href="/reserver"
                        onClick={onClose}
                        className="w-full h-14 flex items-center justify-center rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase shadow-xl shadow-[var(--theme-accent)]/20 active:scale-95 transition-transform"
                    >
                        Prendre RDV
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
