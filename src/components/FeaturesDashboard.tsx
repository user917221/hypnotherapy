"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import gsap from "gsap";

export default function FeaturesDashboard() {
    return (
        <section className="py-32 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-[var(--theme-text)]/5 relative z-10">
            <div className="mb-16 text-center">
                <h2 className="font-serif-display italic text-5xl md:text-7xl text-[var(--theme-text)] mb-4 tracking-tight">Mon Accompagnement</h2>
                <p className="font-sans text-[var(--theme-text)]/50 max-w-2xl mx-auto font-light text-lg">Découvrez des solutions douces et durables pour chaque étape de votre vie.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 h-auto md:h-[550px]">
                {/* Card 1: Social Proof - Reviews */}
                <ReviewsShuffler />

                {/* Card 2: Empathy Stream */}
                <EmpathyStream />

                {/* Card 3: Interactive Booking */}
                <BookingSelector />
            </div>
        </section>
    );
}



const reviews = [
    { id: 1, name: "Antonella", text: "Me libérer de poids physique et émotionnel que je portais depuis trop longtemps.", stars: 5 },
    { id: 2, name: "ChrysB", text: "Professionnelle douce, investie et surprenante par la justesse de son accompagnement.", stars: 5 },
    { id: 3, name: "Paul", text: "Je prends à nouveau énormément plaisir à jouer, libéré de mes angoisses de performance.", stars: 5 },
    { id: 4, name: "Laurie", text: "Je me sens enfin libérée de vieux poids, plus légère et ancrée.", stars: 5 }
];

function ReviewsShuffler() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex((prev) => (prev + 1) % reviews.length), 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-ovni rounded-[4rem] p-12 flex flex-col justify-between h-full transition-all hover:scale-[1.02] duration-700">
            <div className="font-sans text-[11px] text-[var(--theme-text)] uppercase tracking-[0.5em] mb-8 font-bold opacity-40">Vos Métamorphoses</div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                >
                    <div className="flex gap-1.5 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="text-[var(--theme-accent)] scale-125">★</div>
                        ))}
                    </div>
                    <p className="font-serif-display italic text-3xl md:text-4xl text-[var(--theme-text)] mb-10 leading-[1.1]">
                        "{reviews[index].text}"
                    </p>
                    <span className="font-sans font-bold text-xs text-[var(--theme-text)] uppercase tracking-[0.3em]">— {reviews[index].name}</span>
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 font-sans text-[10px] text-[var(--theme-text)]/30 uppercase tracking-[0.3em] font-bold">87 Âmes accompagnées — 5/5 Google</div>
        </div>
    );
}

function EmpathyStream() {
    return (
        <div className="glass-ovni rounded-[4rem] p-12 flex flex-col justify-center h-full relative overflow-hidden group">
            <div className="absolute top-8 right-10 font-sans text-[10px] text-[var(--theme-accent)] uppercase tracking-widest font-black">Nouveau</div>
            <h3 className="font-serif-display italic text-5xl text-[var(--theme-text)] mb-6 leading-none">L'Essence <br /> <span className="text-[var(--theme-accent)]">du Bien-Être</span></h3>
            <p className="font-sans font-light text-[var(--theme-text)]/70 leading-relaxed text-lg mb-10 text-center md:text-left">
                Ma bibliothèque audio privée d'hypnose et sophrologie pour prolonger le voyage vers vous-même, à votre rythme.
            </p>
            <div className="mt-4 flex justify-center">
                <Link href="/voyage-auditif" className="no-underline">
                    <MagneticButton>
                        <div className="inline-block px-8 py-4 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-text)] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] transition-all duration-500 shadow-xl backdrop-blur-md">
                            Ouvrir la Bibliothèque
                        </div>
                    </MagneticButton>
                </Link>
            </div>
        </div>
    );
}

function BookingSelector() {
    return (
        <div className="glass-ovni rounded-[4rem] p-12 flex flex-col h-full bg-[var(--theme-accent)]/10 border-[var(--theme-accent)]/20 relative z-10">
            <h3 className="font-serif-display italic text-5xl text-[var(--theme-text)] mb-10 leading-none">Se retrouver</h3>

            <div className="space-y-6 mb-10">
                <div className="p-6 rounded-[2rem] bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 flex flex-col gap-2 cursor-pointer hover:bg-[var(--theme-text)]/10 transition-all duration-500 scale-100 hover:scale-[1.05]">
                    <span className="font-sans font-black text-[10px] text-[var(--theme-text)] uppercase tracking-[0.3em]">À Lannion</span>
                    <span className="font-sans text-sm text-[var(--theme-text)]/60 font-medium">1 bis Rue de la Madeleine</span>
                </div>
                <div className="p-6 rounded-[2rem] bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 flex flex-col gap-2 cursor-pointer hover:bg-[var(--theme-text)]/10 transition-all duration-500 scale-100 hover:scale-[1.05]">
                    <span className="font-sans font-black text-[10px] text-[var(--theme-text)] uppercase tracking-[0.3em]">En Visioconférence</span>
                    <span className="font-sans text-sm text-[var(--theme-text)]/60 font-medium">Partout dans le monde</span>
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4 justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse shadow-[0_0_10px_var(--theme-accent)]" />
                    <span className="font-sans text-[10px] uppercase font-black tracking-[0.3em] text-[var(--theme-accent)]">Créneau disponible demain</span>
                </div>
                <Link href="/reserver" className="no-underline">
                    <MagneticButton className="px-8 py-4 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-[var(--theme-accent)]/20">
                        Prendre Rendez-vous
                    </MagneticButton>
                </Link>
            </div>
        </div>
    );
}
