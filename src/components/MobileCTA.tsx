"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const HIDDEN_ROUTES = ["/reserver", "/connexion", "/inscription"];

export default function MobileCTA() {
    const pathname = usePathname();
    const [scrolledPastHero, setScrolledPastHero] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolledPastHero(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHidden = HIDDEN_ROUTES.some((route) => pathname.startsWith(route));

    return (
        <AnimatePresence>
            {scrolledPastHero && !isHidden && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-[90] sm:hidden"
                >
                    <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-[var(--theme-bg)]/90 backdrop-blur-xl border-t border-[var(--theme-accent)]/15">
                        <Link
                            href="/reserver"
                            className="flex items-center justify-center w-full h-12 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-[var(--theme-accent)]/20 active:scale-95 transition-transform"
                        >
                            Prendre Rendez-vous
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
