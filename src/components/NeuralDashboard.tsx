"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Zones calibrées sur l'image réelle (vue latérale gauche du cerveau)
// Front = gauche image, Temporal = bas, Occipital = droite
const brainZones = [
    {
        id: "prefrontal",
        label: "Cortex Préfrontal",
        sublabel: "Conscience critique",
        description: "Le filtre analytique lâche prise.",
        fact: "Sous hypnose, l'activité du cortex préfrontal diminue de 40 %. Votre censeur intérieur s'estompe. Vous devenez réceptif(ve) à un niveau inédit, sans jamais perdre le contrôle.",
        left: "24%", top: "34%",
        color: "var(--theme-accent)",
    },
    {
        id: "amygdala",
        label: "Amygdale",
        sublabel: "Centre de la peur",
        description: "Les traumas se désarment doucement.",
        fact: "L'amygdale — siège de la peur et des réponses de survie — est modulée en profondeur. Les déclencheurs émotionnels perdent leur charge. Ce qui terrifiait devient neutre.",
        left: "33%", top: "64%",
        color: "var(--theme-accent-alt)",
    },
    {
        id: "cingulate",
        label: "Cortex Cingulaire",
        sublabel: "Perception de la douleur",
        description: "La souffrance physique et morale se dissout.",
        fact: "Le cortex cingulaire antérieur traite la douleur perçue. Sous hypnose, son activité chute — expliquant l'efficacité sur la douleur chronique, les migraines et l'anxiété somatique.",
        left: "50%", top: "16%",
        color: "var(--theme-accent)",
    },
    {
        id: "thalamus",
        label: "Thalamus",
        sublabel: "Relais sensoriel",
        description: "Les suggestions atteignent le centre de commande.",
        fact: "Le thalamus filtre toutes les perceptions. En état hypnotique, ce filtre s'ouvre — les suggestions de Péguy parviennent directement aux circuits comportementaux profonds.",
        left: "48%", top: "50%",
        color: "var(--theme-accent-alt)",
    },
    {
        id: "hippocampus",
        label: "Hippocampe",
        sublabel: "Mémoire émotionnelle",
        description: "Les vieux schémas se réécrivent à la source.",
        fact: "Gardien de la mémoire émotionnelle, l'hippocampe devient malléable sous transe. C'est là que les croyances limitantes sont remodelées et que les nouvelles identités s'ancrent.",
        left: "62%", top: "66%",
        color: "var(--theme-accent)",
    },
];

const CYCLE_MS = 6000;

export default function NeuralDashboard() {
    const [activeZone, setActiveZone] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setProgress(0);
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const pct = Math.min((elapsed / CYCLE_MS) * 100, 100);
            setProgress(pct);
            if (pct < 100) {
                progressRef.current = setTimeout(tick, 30);
            }
        };
        progressRef.current = setTimeout(tick, 30);
        const cycle = setTimeout(() => {
            setActiveZone(prev => (prev + 1) % brainZones.length);
        }, CYCLE_MS);
        return () => {
            clearTimeout(cycle);
            if (progressRef.current) clearTimeout(progressRef.current);
        };
    }, [activeZone]);

    const active = brainZones[activeZone];

    return (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-[var(--theme-text)]/5">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)] font-sans block mb-3">Neurologie de la Transe</span>
                    <h2 className="font-serif-display text-5xl md:text-7xl tracking-tighter leading-[0.9] text-[var(--theme-text)]">
                        Votre cerveau <br /><span className="italic text-[var(--theme-text)]/50">sous hypnose.</span>
                    </h2>
                </div>
                <p className="font-sans text-[var(--theme-text)]/40 max-w-sm text-lg font-light">
                    L'hypnose n'est pas magique. C'est de la neurologie appliquée — précise, reproductible, mesurable.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center">

                {/* LEFT — Real Brain Image with zone overlays */}
                <div className="flex flex-col items-center gap-8">
                    <div className="relative w-full max-w-[520px] mx-auto aspect-square">

                        {/* Brain image — mix-blend-screen strips the black background */}
                        <div className="relative w-full h-full">
                            <Image
                                src="/brain.png"
                                alt="Cerveau humain - zones actives sous hypnose"
                                fill
                                className="object-contain drop-shadow-2xl mix-blend-screen"
                                priority
                            />
                        </div>

                        {/* Zone hotspots — absolutely positioned over the image */}
                        {brainZones.map((zone, i) => {
                            const isActive = i === activeZone;
                            return (
                                <button
                                    key={zone.id}
                                    onClick={() => setActiveZone(i)}
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: zone.left, top: zone.top }}
                                    aria-label={zone.label}
                                >
                                    {/* Outer pulse rings */}
                                    {isActive && (
                                        <>
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ backgroundColor: zone.color, opacity: 0 }}
                                                animate={{ scale: [1, 2.5, 3.5], opacity: [0.5, 0.1, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ backgroundColor: zone.color, opacity: 0 }}
                                                animate={{ scale: [1, 2, 3], opacity: [0.3, 0.08, 0] }}
                                                transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
                                            />
                                        </>
                                    )}

                                    {/* Core dot */}
                                    <motion.div
                                        className="relative z-10 rounded-full border-2 shadow-lg"
                                        style={{
                                            width: isActive ? 16 : 10,
                                            height: isActive ? 16 : 10,
                                            backgroundColor: zone.color,
                                            borderColor: zone.color,
                                            boxShadow: isActive ? `0 0 20px 6px ${zone.color}60` : "none",
                                            transition: "all 0.5s ease",
                                        }}
                                        animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />

                                    {/* Label tooltip on active */}
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                        >
                                            <span className="block px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide font-sans shadow-xl"
                                                style={{ backgroundColor: zone.color, color: "var(--theme-bg)" }}>
                                                {zone.label}
                                            </span>
                                            <span className="block w-px h-3 mx-auto" style={{ backgroundColor: zone.color }} />
                                        </motion.div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Zone selector pills */}
                    <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                        {brainZones.map((zone, i) => (
                            <button
                                key={zone.id}
                                onClick={() => setActiveZone(i)}
                                className={`px-3 py-1.5 rounded-full text-[11px] font-medium font-sans border transition-all duration-400 ${i === activeZone
                                    ? "bg-[var(--theme-accent)]/15 border-[var(--theme-accent)]/50 text-[var(--theme-text)]"
                                    : "border-[var(--theme-text)]/10 text-[var(--theme-text)]/30 hover:text-[var(--theme-text)]/60"
                                    }`}
                            >
                                {zone.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Info Panel */}
                <div className="flex flex-col gap-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeZone}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-ovni p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden"
                        >
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                                style={{ background: active.color, opacity: 0.08 }} />

                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1"
                                    style={{ background: active.color, opacity: 0.15 }}>
                                    <motion.div
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ background: active.color, opacity: 1 }}
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.25em] font-bold font-sans mb-1" style={{ color: active.color }}>Zone Active</p>
                                    <h3 className="font-serif-display text-2xl text-[var(--theme-text)]">{active.label}</h3>
                                    <p className="font-sans text-sm text-[var(--theme-text)]/40">{active.sublabel}</p>
                                </div>
                            </div>

                            <p className="font-serif-display text-3xl md:text-[2rem] text-[var(--theme-text)] leading-tight mb-6 italic">
                                "{active.description}"
                            </p>

                            <p className="font-sans text-base font-light leading-relaxed text-[var(--theme-text)]/65">
                                {active.fact}
                            </p>

                            {/* Progress bar */}
                            <div className="mt-10">
                                <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-widest text-[var(--theme-text)]/25 mb-2">
                                    <span>Zone {activeZone + 1} / {brainZones.length}</span>
                                    <span>Cycle suivant…</span>
                                </div>
                                <div className="h-px w-full bg-[var(--theme-text)]/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-none"
                                        style={{ background: active.color, width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { value: "−40%", label: "Cortex préfrontal", sub: "activité réduite" },
                            { value: "3×", label: "Ondes Alpha", sub: "amplifiées" },
                            { value: "1ère", label: "Séance", sub: "effets mesurés" },
                        ].map((stat, i) => (
                            <div key={i} className="glass-ovni rounded-2xl p-4 text-center">
                                <p className="font-serif-display text-3xl text-[var(--theme-accent)] mb-1">{stat.value}</p>
                                <p className="font-sans text-[11px] font-bold text-[var(--theme-text)]/60 leading-tight">{stat.label}</p>
                                <p className="font-sans text-[10px] text-[var(--theme-text)]/30">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
