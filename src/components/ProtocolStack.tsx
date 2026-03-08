"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        title: "Harmonie & Sérénité",
        subtitle: "L'Essence du Bien-être — 80€",
        description: "Dialogue subtil avec l'inconscient pour libérer les blocages profonds, le stress et les blessures enfouies. Une métamorphose douce, dès la première séance.",
        color: "bg-transparent",
        artifact: "waves"
    },
    {
        title: "Libération Tabac",
        subtitle: "Arrêt Tabac — Séance Unique",
        description: "Désactiver les automatismes ancrés dans la mémoire. Retrouver le souffle et la liberté sans sensation de manque, par la puissance du détachement.",
        color: "bg-transparent",
        artifact: "light"
    },
    {
        title: "Équilibre IG Bas",
        subtitle: "Accompagnement Corps & Esprit",
        description: "Doux détachement du sucre et réconciliation alimentaire. Allier la chimie du métabolisme à la reprogrammation mentale pour une transformation durable.",
        color: "bg-transparent",
        artifact: "glow"
    }
];

export default function ProtocolStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // Pin logic
                if (i < cardsRef.current.length - 1) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        endTrigger: containerRef.current,
                        end: "bottom bottom",
                        pin: true,
                        pinSpacing: false,
                    });

                    // Completely hide earlier cards to avoid ghosting texts like 'Équilibre'
                    gsap.to(card.querySelector('.card-inner'), {
                        scale: 0.90,
                        opacity: 0,
                        yPercent: -15,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: cardsRef.current[i + 1],
                            start: "top bottom",
                            end: "top 20%",
                            scrub: true,
                        },
                    });
                }

                // Text animation: Reveal title letters on enter
                const titleChars = card.querySelectorAll('.title-split-char');
                gsap.from(titleChars, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top center",
                    },
                    y: 100,
                    opacity: 0,
                    rotationX: -45,
                    duration: 1.2,
                    stagger: 0.04,
                    ease: "power4.out"
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to split title for animation
    const splitTitle = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} className="title-split-char inline-block whitespace-pre">
                {char}
            </span>
        ));
    };

    return (
        <section ref={containerRef} className="relative w-full bg-transparent">
            {protocols.map((protocol, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        cardsRef.current[i] = el;
                    }}
                    className={`h-screen w-full flex flex-col justify-center sticky top-0 ${protocol.color} overflow-hidden backdrop-blur-sm border-t border-mint-cream/5`}
                >
                    <div className="card-inner w-full h-full flex flex-col justify-center will-change-transform bg-teal-deep/[0.02]">
                        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                            {/* Left Content */}
                            <div className="z-10 pt-10">
                                {/* Leading-loose & py-2 fixes the cut-off circumflex */}
                                <span className="font-sans text-seafoam uppercase tracking-[0.5em] text-[10px] mb-8 block font-black opacity-60 leading-loose py-2">
                                    {protocol.subtitle}
                                </span>
                                <h2 className="font-serif-display italic text-6xl md:text-[5.5rem] text-mint-cream tracking-tighter leading-[0.9] mb-10 overflow-hidden py-4 drop-shadow-sm">
                                    {splitTitle(protocol.title)}
                                </h2>
                                <p className="font-sans font-light text-xl md:text-2xl text-mint-cream/80 max-w-md leading-relaxed">
                                    {protocol.description}
                                </p>
                            </div>

                            {/* Right Content - Visual Artifacts */}
                            <div className="flex justify-center items-center h-[40vh] md:h-[60vh] relative z-0">
                                {protocol.artifact === "waves" && <HypnoticWaves label="Confiance" />}
                                {protocol.artifact === "glow" && <HypnoticWaves label="Équilibre" />}
                                {protocol.artifact === "light" && <HypnoticWaves label="Déclic" />}
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

function HypnoticWaves({ label }: { label: string }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <svg className="absolute w-[400px] h-[400px] text-seafoam/20 mix-blend-multiply" viewBox="0 0 100 100">
                <motion.circle
                    cx="50" cy="50" r="20"
                    stroke="currentColor" strokeWidth="0.5" fill="none"
                    animate={{ r: [20, 60, 20], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.circle
                    cx="50" cy="50" r="30"
                    stroke="currentColor" strokeWidth="0.5" fill="none"
                    animate={{ r: [30, 80, 30], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                    cx="50" cy="50" r="40"
                    stroke="currentColor" strokeWidth="0.5" fill="none"
                    animate={{ r: [40, 100, 40], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                />
            </svg>

            {/* Glowing core */}
            <div className="absolute w-32 h-32 bg-seafoam/10 rounded-full blur-2xl animate-[pulse_4s_easeInOut_infinite]" />

            <motion.div
                className="font-serif-display italic text-mint-cream text-4xl relative z-10 drop-shadow-lg"
                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            >
                {label}
            </motion.div>
        </div>
    );
}
