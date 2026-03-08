"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Network, Fingerprint } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import KineticText from "@/components/KineticText";
import HoverRevealGrid from "@/components/HoverRevealGrid";
import NeuralDashboard from "@/components/NeuralDashboard";
import HypnoseProgress from "@/components/HypnoseProgress";
import MagneticPhoneButton from "@/components/MagneticPhoneButton";

export default function HypnoseJourneyClient() {
    const targetRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <main className="relative theme-transition w-full text-[var(--theme-text)]">

            {/* Ambient Backgrounds */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--theme-accent-alt)]/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-2/3 w-[600px] h-[600px] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--theme-accent)]/5 rounded-full blur-[90px]" />
            </div>

            {/* 1. Hero Introduction */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative z-10 shrink-0">
                <motion.div style={{ opacity: heroOpacity }} className="flex flex-col items-center text-center px-6 max-w-4xl">
                    <h1 className="font-serif-display text-5xl md:text-[7vw] leading-[1] tracking-tighter mb-10">
                        Hypnose <br /> <span className="text-[var(--theme-accent)] italic drop-shadow-lg">Ericksonienne</span>
                    </h1>
                    <p className="font-sans text-xl md:text-2xl opacity-70 font-light leading-relaxed">
                        Oubliez la notion de perte de contrôle. <br className="hidden md:block" /> L'hypnose Ericksonienne est un voyage collaboratif au cœur de vous-même.
                    </p>
                </motion.div>
                {/* Scroll prompt */}
                <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-4 hidden md:flex">
                    <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold">Le Voyage Commence</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--theme-accent)] to-transparent" />
                </motion.div>
            </section>

            {/* 2. Horizontal Journey */}
            <section ref={targetRef} className="relative h-[400vh] w-full z-10">
                <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex w-[400vw] h-full items-center">

                        {/* PANEL 1: Le Seuil */}
                        <div className="w-screen h-full flex flex-col justify-center items-start px-8 sm:px-16 md:px-[12vw] relative group bg-[var(--theme-text)]/[0.03] backdrop-blur-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full pt-16">
                                <div className="relative">
                                    <span className="font-serif-display text-[120px] sm:text-[150px] md:text-[250px] leading-none text-[var(--theme-text)] opacity-[0.03] absolute -top-8 -left-4 sm:-left-10 md:-left-20 md:-top-20 pointer-events-none">01</span>
                                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--theme-accent)] mb-8 opacity-90 relative z-10" />
                                    <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl italic leading-tight mb-8 relative z-10">
                                        <KineticText text="Le Seuil" className="block mb-2 text-[var(--theme-text)]" />
                                        <KineticText text="La relaxation" delay={0.3} className="block opacity-40 text-3xl sm:text-4xl text-[var(--theme-text)]" />
                                    </h2>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light opacity-80 leading-[1.6] md:leading-relaxed mb-8 max-w-xl">
                                        Le corps s'alourdit délicatement. L'esprit s'allège. Nous franchissons ensemble la porte entre votre conscience analytique et votre profondeur intuitive.
                                    </p>
                                    <div className="w-16 md:w-24 h-px bg-[var(--theme-accent)] opacity-60" />
                                </div>
                            </div>
                        </div>

                        {/* PANEL 2: Les Mémoires */}
                        <div className="w-screen h-full flex flex-col justify-center items-start px-8 sm:px-16 md:px-[12vw] relative border-l border-[var(--theme-text)]/[0.03] bg-[var(--theme-text)]/[0.03] backdrop-blur-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full pt-16">
                                <div className="order-2 md:order-1 flex flex-col justify-center">
                                    <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light opacity-80 leading-[1.6] md:leading-relaxed mb-8 max-w-xl">
                                        Chaque émotion cristallisée remonte à la surface pour se libérer. Ce n'est pas l'oubli des événements, mais la <strong className="font-medium text-[var(--theme-accent)]">pacification totale</strong> de ce qui pesait silencieusement dans l'ombre de votre esprit.
                                    </p>
                                    <div className="w-16 md:w-24 h-px bg-[var(--theme-accent-alt)] opacity-60" />
                                </div>
                                <div className="order-1 md:order-2 relative">
                                    <span className="font-serif-display text-[120px] sm:text-[150px] md:text-[250px] leading-none text-[var(--theme-text)] opacity-[0.03] absolute -top-8 -right-4 sm:right-10 md:-right-20 md:-top-20 pointer-events-none">02</span>
                                    <Fingerprint className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--theme-accent-alt)] mb-8 opacity-90 relative z-10" />
                                    <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl italic leading-tight mb-8 text-[var(--theme-accent-alt)] relative z-10">
                                        <KineticText text="Les Mémoires" className="block mb-2" />
                                        <KineticText text="L'exploration" delay={0.3} className="block text-[var(--theme-text)] opacity-40 text-3xl sm:text-4xl" />
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* PANEL 3: Le Dialogue */}
                        <div className="w-screen h-full flex flex-col justify-center items-start px-8 sm:px-16 md:px-[12vw] relative group bg-[var(--theme-text)]/[0.03] backdrop-blur-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full pt-16">
                                <div className="relative">
                                    <span className="font-serif-display text-[120px] sm:text-[150px] md:text-[250px] leading-none text-[var(--theme-text)] opacity-[0.03] absolute -top-8 -left-4 sm:-left-10 md:-left-20 md:-top-20 pointer-events-none">03</span>
                                    <Network className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--theme-accent)] mb-8 opacity-90 relative z-10" />
                                    <h2 className="font-serif-display text-4xl sm:text-5xl md:text-7xl italic leading-tight mb-8 relative z-10">
                                        <KineticText text="Le Dialogue" className="block mb-2 text-[var(--theme-text)]" />
                                        <KineticText text="La reprogrammation" delay={0.3} className="block opacity-40 text-3xl sm:text-4xl text-[var(--theme-text)]" />
                                    </h2>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light opacity-80 leading-[1.6] md:leading-relaxed mb-8 max-w-xl">
                                        Dans cet espace de sécurité absolue, nous murmurons à votre inconscient. Il écoute, intègre et reconfigure vos schémas limitants en ressources inépuisables.
                                    </p>
                                    <div className="w-16 md:w-24 h-px bg-[var(--theme-accent)] opacity-60" />
                                </div>
                            </div>
                        </div>

                        {/* PANEL 4: La Renaissance */}
                        <div className="w-screen h-full flex flex-col justify-center items-center px-6 sm:px-12 text-center relative border-l border-[var(--theme-text)]/[0.03] bg-[var(--theme-bg)] backdrop-blur-3xl">
                            <h2 className="font-serif-display text-4xl sm:text-6xl md:text-8xl italic mb-6 sm:mb-8 text-glow-seafoam relative z-10">
                                La Renaissance.
                            </h2>
                            <p className="font-sans text-lg sm:text-xl md:text-2xl font-light opacity-80 max-w-2xl mb-12 sm:mb-16 leading-relaxed relative z-10">
                                Vous ouvrez les yeux, physiquement ici, mais fondamentalement transformé(e) de l'intérieur.
                            </p>

                            <Link href="/contact" className="z-10">
                                <MagneticButton className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/30 bg-[var(--theme-bg)] text-[var(--theme-text)] backdrop-blur-md hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] flex items-center gap-4">
                                    <span className="relative z-10 font-sans font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm flex items-center gap-4">
                                        Réserver ma séance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Contenu Narratif */}
            <div className="relative z-10 bg-[var(--theme-bg)] pb-24">
                <HypnoseProgress />
                <HoverRevealGrid />
                <NeuralDashboard />
            </div>

            {/* CTA Final Réserver */}
            <div className="relative z-10 bg-[var(--theme-bg)] py-20 flex flex-col items-center gap-6 text-center border-t border-[var(--theme-text)]/5">
                <p className="font-sans text-[var(--theme-text)]/40 font-light text-sm uppercase tracking-widest">Prêt(e) à commencer ?</p>
                <h2 className="font-serif-display text-4xl md:text-6xl tracking-tighter text-[var(--theme-text)]">Réservez votre séance.</h2>
                <Link
                    href="/reserver"
                    className="mt-6 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-[var(--theme-accent)]/20"
                >
                    <MagneticButton>
                        Prendre rendez-vous <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                </Link>
                <div className="mt-4">
                    <MagneticPhoneButton />
                </div>
            </div>

        </main>
    );
}
