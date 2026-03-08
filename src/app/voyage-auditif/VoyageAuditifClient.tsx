"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Shield, Target, Feather } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function VoyageAuditifClient() {
    const [showPrograms, setShowPrograms] = useState(false);
    const [activeProgram, setActiveProgram] = useState<number | null>(null);
    const programsRef = useRef<HTMLDivElement>(null);
    const activeProgramRef = useRef<HTMLDivElement>(null);

    const handleContinueClick = () => {
        setShowPrograms(true);
        setTimeout(() => {
            programsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    const handleProgramClick = (index: number) => {
        setActiveProgram(index === activeProgram ? null : index);
        setTimeout(() => {
            activeProgramRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

    const programmes = [
        {
            title: "Stop Compulsions",
            duration: "20 Min",
            result: "Reprogrammation des fringales",
            icon: <Shield strokeWidth={1.5} className="w-5 h-5 text-[var(--theme-accent)]" />,
            description: "Une séance coup de poing conçue pour être écoutée juste au moment où l'envie irrépressible de sucre ou de grignotage apparaît. Cette piste audio utilise des suggestions ciblées pour désamorcer l'ancrage émotionnel lié à l'aliment et restaurer votre contrôle immédiat."
        },
        {
            title: "Sommeil Profond",
            duration: "45 Min",
            result: "Nuit réparatrice & Cycle restauré",
            icon: <Feather strokeWidth={1.5} className="w-5 h-5 text-[var(--theme-accent-alt)]" />,
            description: "Endormez-vous en étant accompagné(e). Ce long voyage sonore commence par un balayage corporel (body scan) progressif qui désactive la boucle des pensées parasites, avant de vous guider vers un sommeil profond, récupérateur et sans micro-réveils."
        },
        {
            title: "Confiance & Aura",
            duration: "15 Min",
            result: "Recharge d'estime personnelle",
            icon: <Target strokeWidth={1.5} className="w-5 h-5 text-[var(--theme-accent)]" />,
            description: "Parfait le matin avant de commencer la journée, ou avant un rendez-vous important. Ce programme installe un ancrage de sécurité intérieure et déploie un bouclier de charisme et d'assurance autour de vous."
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[var(--theme-bg)] text-[var(--theme-text)]">
            {/* Grain Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Deep immersive glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--theme-accent)]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
                <h1 className="font-serif-display text-5xl md:text-8xl text-[var(--theme-text)] mb-6 tracking-tighter">
                    Bibliothèque <br /> <span className="text-[var(--theme-accent)] italic">Voyage Auditif</span>
                </h1>
                <p className="font-sans text-xl md:text-2xl text-[var(--theme-text)]/80 max-w-2xl mx-auto font-light leading-relaxed mb-20">
                    Fermez les yeux. Branchez vos écouteurs. Laissez ma voix vous guider vers un espace de ressourcement profond, où vous le souhaitez, quand vous le souhaitez.
                </p>

                <div className="max-w-3xl mx-auto">
                    {/* Audio Player Card - Placeholder */}
                    <div className="group relative flex items-center p-6 md:p-8 rounded-[2rem] bg-[var(--theme-text)]/5 border border-[var(--theme-accent)]/20 backdrop-blur-md hover:bg-[var(--theme-text)]/10 transition-all duration-500 cursor-pointer mb-16 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                        <div className="w-16 h-16 rounded-full bg-[var(--theme-accent)] flex items-center justify-center shrink-0 shadow-[0_0_30px_var(--theme-accent)]/50 group-hover:scale-110 transition-transform duration-500">
                            <Play className="w-6 h-6 text-[var(--theme-bg)] ml-1" fill="currentColor" />
                        </div>
                        <div className="ml-6 text-left flex-1">
                            <h3 className="font-serif-display text-2xl text-[var(--theme-text)] mb-1">Méditation du Matin</h3>
                            <p className="font-sans text-[var(--theme-text)]/60 text-sm font-light uppercase tracking-widest">12 Min • Ancrage & Énergie</p>
                        </div>
                        <div className="hidden md:flex gap-1 h-8 items-end">
                            {/* Audio Wave Placeholder */}
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [10, Math.random() * 20 + 10, 10] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                                    className="w-1 bg-[var(--theme-accent)]/40 rounded-full"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Continuer action */}
                    <AnimatePresence mode="wait">
                        {!showPrograms && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, height: 0, overflow: "hidden" }}
                                className="flex justify-center"
                            >
                                <MagneticButton onClick={handleContinueClick} className="group relative px-10 py-5 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-text)] backdrop-blur-md hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] flex items-center gap-4">
                                    <span className="relative z-10 font-sans font-black tracking-[0.3em] uppercase text-sm md:text-base flex items-center gap-4 pointer-events-none">
                                        Continuer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </MagneticButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Programmes Pop-ups */}
                <AnimatePresence>
                    {showPrograms && (
                        <motion.div
                            ref={programsRef}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
                            className="pt-32 pb-16 scroll-mt-24"
                        >
                            <h2 className="font-serif-display text-4xl md:text-6xl text-[var(--theme-text)] mb-16 text-center">Découvrir les <span className="italic text-[var(--theme-accent-alt)]">Packs</span></h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                                {programmes.map((prog, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                                        onClick={() => handleProgramClick(idx)}
                                        className={`relative group p-8 rounded-3xl glass-ovni border border-[var(--theme-accent)]/10 hover:border-[var(--theme-accent)]/40 transition-all duration-500 backdrop-blur-md cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)] text-left flex flex-col ${activeProgram === idx ? 'ring-2 ring-[var(--theme-accent)]/50 bg-[var(--theme-text)]/10' : 'bg-[var(--theme-text)]/5'}`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[var(--theme-text)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {prog.icon}
                                        </div>
                                        <h3 className="font-serif-display text-2xl mb-2">{prog.title}</h3>
                                        <div className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--theme-accent)] font-bold mb-4">{prog.duration}</div>
                                        <div className="w-8 h-px bg-[var(--theme-text)]/20 mb-4 group-hover:w-full transition-all duration-500"></div>
                                        <p className="font-sans font-light opacity-80 mt-auto">{prog.result}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Section Active Program Details */}
                            <AnimatePresence>
                                {activeProgram !== null && (
                                    <motion.div
                                        ref={activeProgramRef}
                                        initial={{ opacity: 0, height: 0, y: -20 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -20, overflow: "hidden" }}
                                        transition={{ duration: 0.5, ease: "anticipate" }}
                                        className="max-w-4xl mx-auto mt-12 px-4 shadow-2xl rounded-[3rem]"
                                    >
                                        <div className="glass-ovni rounded-[3rem] p-10 md:p-16 border border-[var(--theme-accent)]/30 bg-[var(--theme-text)]/5 backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />

                                            <div className="w-20 h-20 rounded-full bg-[var(--theme-accent)] flex items-center justify-center shadow-[0_0_50px_var(--theme-accent)] mb-8 cursor-pointer hover:scale-110 transition-transform duration-500">
                                                <Play className="w-8 h-8 text-[var(--theme-bg)] ml-2" fill="currentColor" />
                                            </div>

                                            <h3 className="font-serif-display text-4xl mb-4">{programmes[activeProgram].title}</h3>

                                            <div className="flex items-center gap-4 mb-8">
                                                <span className="font-sans text-sm uppercase tracking-[0.2em] text-[var(--theme-accent)] font-bold">{programmes[activeProgram].duration}</span>
                                                <div className="w-1 h-1 rounded-full bg-[var(--theme-text)]/30" />
                                                <span className="font-sans text-sm tracking-wide text-[var(--theme-text)]/70">Extrait Gratuit</span>
                                            </div>

                                            {/* Audio Wave Placeholder Lively */}
                                            <div className="flex gap-[3px] h-12 items-end justify-center mb-10 w-full max-w-sm">
                                                {[...Array(40)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ height: [15, Math.random() * 35 + 15, 15] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                                                        className="w-1.5 bg-[var(--theme-accent)]/40 rounded-full"
                                                        style={{ opacity: Math.sin(i * 0.2) * 0.5 + 0.5 }}
                                                    />
                                                ))}
                                            </div>

                                            <p className="font-sans text-xl opacity-80 font-light leading-relaxed max-w-2xl text-[var(--theme-text)]">
                                                {programmes[activeProgram].description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* CTA Réserver + Continuer l'aventure */}
            <div className="relative z-10 py-20 flex flex-col items-center gap-6 text-center border-t border-[var(--theme-text)]/5">
                <p className="font-sans text-[var(--theme-text)]/40 font-light text-sm uppercase tracking-widest">Envie d'aller plus loin ?</p>
                <h2 className="font-serif-display text-4xl md:text-6xl tracking-tighter text-[var(--theme-text)]">Continuez l'aventure.</h2>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <a
                        href="/bibliotheque"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-[var(--theme-accent)]/20"
                    >
                        Découvrir les audios
                    </a>
                    <a
                        href="https://peguycasteloot.fr/reserver"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-[var(--theme-text)]/20 text-[var(--theme-text)] font-sans font-medium text-sm hover:border-[var(--theme-accent)]/50 hover:scale-105 transition-all"
                    >
                        Réserver une séance
                    </a>
                </div>
                <a href="tel:+33749310590" className="font-sans text-sm text-[var(--theme-text)]/35 hover:text-[var(--theme-accent)] transition-colors mt-2">
                    +33 7 49 31 05 90
                </a>
            </div>
        </main>
    );
}
