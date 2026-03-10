"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Optimisation : Ne pas réafficher le preloader si déjà vu dans la session
        const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
        if (hasSeenPreloader) {
            setLoading(false);
            return;
        }

        let currentProgress = 0;
        const interval = setInterval(() => {
            // Progression beaucoup plus rapide pour améliorer le FCP/LCP
            currentProgress += Math.floor(Math.random() * 15) + 10;
            if (currentProgress >= 100) {
                setProgress(100);
                clearInterval(interval);
                sessionStorage.setItem("hasSeenPreloader", "true");
                setTimeout(() => setLoading(false), 300); // Délai réduit
            } else {
                setProgress(currentProgress);
            }
        }, 30); // Intervalle divisé par 2

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[10000] bg-[var(--theme-bg)] flex flex-col items-center justify-center text-[var(--theme-text)]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Cercle d'inspiration (respiration) */}
                    <motion.div
                        className="w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] rounded-full flex items-center justify-center relative overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {/* Le remplissage doux qui monte comme un souffle */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-[var(--theme-accent)]/20"
                            initial={{ height: "0%" }}
                            animate={{ height: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />

                        {/* Cercle bordure statique */}
                        <div className="absolute inset-0 border border-[var(--theme-accent)]/30 rounded-full" />

                        <span className="font-serif-display text-5xl md:text-7xl absolute z-10 italic drop-shadow-lg text-[var(--theme-accent)]">
                            {progress}
                            <span className="text-2xl md:text-3xl text-[var(--theme-text)]/50 ml-1">%</span>
                        </span>
                    </motion.div>
                    <motion.p
                        className="mt-12 font-sans text-xs md:text-sm tracking-[0.4em] uppercase opacity-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Inspiration profonde...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
