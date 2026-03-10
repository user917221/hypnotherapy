"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Zap, Shield, Heart, Crown, ArrowDown } from "lucide-react";

const checkpoints = [
    {
        number: 1,
        title: "Le Déclic",
        effect: "Effet immédiat",
        description: "Dès la première séance, le système nerveux s'apaise. Vous ressentez une profonde détente et une clarté mentale retrouvée.",
        icon: <Zap className="w-6 h-6" />,
        benefits: ["Sommeil facilité", "Anxiété réduite", "Calme intérieur"],
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        number: 2,
        title: "L'Ancrage",
        effect: "Stabilisation",
        description: "Les schémas limitants commencent à s'effriter. Votre inconscient intègre de nouvelles ressources de sécurité.",
        icon: <Shield className="w-6 h-6" />,
        benefits: ["Confiance en soi", "Prise de recul", "Énergie stable"],
        gradient: "from-cyan-500/20 to-teal-500/20"
    },
    {
        number: 3,
        title: "La Transformation",
        effect: "Changement profond",
        description: "Libération des blocages émotionnels anciens. Vous agissez différemment face aux situations stressantes.",
        icon: <Sparkles className="w-6 h-6" />,
        benefits: ["Liberté émotionnelle", "Nouveaux automatismes", "Joie de vivre"],
        gradient: "from-teal-500/20 to-emerald-500/20"
    },
    {
        number: 4,
        title: "L'Harmonie",
        effect: "Alignement total",
        description: "Réconciliation profonde avec votre histoire. Vos comportements sont en accord parfait avec vos valeurs.",
        icon: <Heart className="w-6 h-6" />,
        benefits: ["Estime de soi renforcée", "Relations apaisées", "Sérénité globale"],
        gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
        number: 5,
        title: "La Maîtrise",
        effect: "Autonomie future",
        description: "Vous possédez désormais les clés de votre propre équilibre. Les résultats sont ancrés durablement.",
        icon: <Crown className="w-6 h-6" />,
        benefits: ["Rayonnement personnel", "Puissance intérieure", "Bien-être pérenne"],
        gradient: "from-green-500/20 to-yellow-500/20"
    }
];

export default function HypnoseProgress() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeStep, setActiveStep] = useState(0);

    // Smooth transform for the progress bar
    const scaleX = useSpring(useTransform(scrollYProgress, [0, 0.95], [0, 1]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Update active step based on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((v) => {
            const step = Math.min(Math.floor(v * 5), 4);
            setActiveStep(step);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative h-[600vh] bg-[var(--theme-bg)]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{
                            backgroundColor: activeStep % 2 === 0 ? "var(--theme-accent)" : "var(--theme-accent-alt)",
                            opacity: 0.05
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] transition-colors duration-1000"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 md:-translate-y-10">
                    {/* Header */}
                    <div className="mb-8 md:mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--theme-accent)] block mb-4"
                        >
                            Parcours d'évolution
                        </motion.span>
                        <h2 className="font-serif-display text-4xl md:text-6xl text-[var(--theme-text)]">
                            De la première séance à <span className="italic text-[var(--theme-accent)]">l'Harmonie Totale</span>
                        </h2>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative h-16 md:h-20 mb-8 md:mb-12 flex items-center">
                        {/* Static Track */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-[var(--theme-text)]/5 rounded-full" />

                        {/* Glowing Active Bar */}
                        <motion.div
                            style={{ scaleX, originX: 0 }}
                            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-alt)] rounded-full shadow-[0_0_20px_var(--theme-accent)]"
                        />

                        {/* Checkpoints bubbles */}
                        <div className="absolute inset-0 flex justify-between items-center px-2">
                            {checkpoints.map((cp, i) => (
                                <div key={cp.number} className="relative group">
                                    <motion.div
                                        animate={{
                                            scale: activeStep >= i ? 1.2 : 0.8,
                                            borderColor: activeStep >= i ? "var(--theme-accent)" : "rgba(var(--theme-text-rgb), 0.1)",
                                            backgroundColor: activeStep >= i ? "var(--theme-bg)" : "transparent"
                                        }}
                                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-20 bg-[var(--theme-bg)] transition-all duration-500"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: activeStep >= i ? 1 : 0,
                                                opacity: activeStep >= i ? 1 : 0
                                            }}
                                            className="w-3 h-3 rounded-full bg-[var(--theme-accent)] shadow-[0_0_10px_var(--theme-accent)]"
                                        />
                                    </motion.div>
                                    <motion.span
                                        animate={{ opacity: activeStep >= i ? 1 : 0.3 }}
                                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-[var(--theme-text)] opacity-40 group-hover:opacity-100 transition-opacity"
                                    >
                                        S{cp.number}
                                    </motion.span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Content Display */}
                    <div className="relative h-[480px] md:h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
                            >
                                {/* Content Card */}
                                <div className="glass-ovni p-6 md:p-12 rounded-[3rem] md:rounded-[3.5rem] border border-[var(--theme-text)]/10 shadow-2xl relative overflow-hidden group">
                                    {/* Inner Glow */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--theme-accent)]/10 blur-[60px] rounded-full pointer-events-none" />

                                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                        <div className="shrink-0">
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 5, -5, 0],
                                                    scale: [1, 1.05, 1]
                                                }}
                                                transition={{ repeat: Infinity, duration: 4 }}
                                                className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[var(--theme-accent)]/20 to-[var(--theme-accent-alt)]/20 flex items-center justify-center text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 shadow-inner"
                                            >
                                                {checkpoints[activeStep].icon}
                                            </motion.div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 text-[var(--theme-accent)] mb-4 md:mb-6">
                                                <span className="text-[10px] uppercase font-black tracking-widest">{checkpoints[activeStep].effect}</span>
                                            </div>
                                            <h3 className="font-serif-display text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 text-[var(--theme-text)] leading-tight">
                                                {checkpoints[activeStep].title}
                                            </h3>
                                            <p className="font-sans text-base md:text-xl font-light text-[var(--theme-text)]/60 max-w-xl leading-relaxed">
                                                {checkpoints[activeStep].description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Benefits with Staggered Reveal */}
                                    <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 relative z-10">
                                        {checkpoints[activeStep].benefits.map((benefit, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + (i * 0.1) }}
                                                className="group/benefit relative p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-[var(--theme-bg)] border border-[var(--theme-text)]/10 hover:border-[var(--theme-accent)]/30 transition-all duration-500 overflow-hidden"
                                            >
                                                {/* Card Background Glow */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent)]/0 to-[var(--theme-accent)]/5 opacity-0 group-hover/benefit:opacity-100 transition-opacity duration-500" />

                                                <div className="relative z-10 flex flex-col gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] shadow-[0_0_12px_var(--theme-accent)]" />
                                                    <span className="font-sans text-sm font-bold tracking-tight text-[var(--theme-text)]/80 leading-snug group-hover/benefit:text-[var(--theme-text)] transition-colors">
                                                        {benefit}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Scroll Prompt - Hidden on Mobile */}
                    <div className="absolute bottom-6 right-[10%] lg:right-[15%] hidden md:flex flex-col items-center gap-2 opacity-30 animate-bounce">
                        <span className="text-[8px] uppercase tracking-widest font-bold">Continuez de défiler</span>
                        <ArrowDown className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Final Section Marker to Anchor well */}
            <div className="h-[50vh] flex items-center justify-center relative">
                <div className="w-px h-full bg-gradient-to-b from-[var(--theme-text)]/10 to-transparent" />
            </div>
        </section>
    );
}
