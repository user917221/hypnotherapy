"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const cases = [
    {
        id: 1,
        before: "L'esclavage de la cigarette. Un paquet par jour.",
        after: "Liberté totale dès la 1ère séance. Zéro manque.",
        theme: "Le Tabac",
    },
    {
        id: 2,
        before: "Nuits agitées, insomnies chroniques et réveils nocturnes.",
        after: "Sommeil profond, réparateur et réveil avec vitalité.",
        theme: "Le Sommeil",
    },
    {
        id: 3,
        before: "Charge mentale oppressante, stress permanent au travail.",
        after: "Lâcher prise immédiat. Sérénité absolue.",
        theme: "Le Stress",
    },
];

export default function HoverRevealGrid() {
    return (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--theme-text)]/5 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                    <h2 className="font-serif-display text-5xl md:text-7xl text-[var(--theme-text)] mb-6 tracking-tighter">
                        La <span className="italic text-[var(--theme-text)]/60">bascule.</span>
                    </h2>
                    <p className="text-[var(--theme-text)]/40 max-w-md font-sans text-lg">
                        Glissez sur les cartes pour découvrir la réalité de l'Après. L'hypnose agit là où la volonté s'épuise.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cases.map((c) => (
                    <RevealCard key={c.id} data={c} />
                ))}
            </div>
        </section>
    );
}

function RevealCard({ data }: { data: typeof cases[0] }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-[28rem] rounded-2xl overflow-hidden cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {/* Before State */}
            <div className="absolute inset-0 bg-[var(--theme-text)]/5 backdrop-blur-md border border-[var(--theme-text)]/10 p-10 flex flex-col justify-between">
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[var(--theme-text)]/40">
                    Avant
                </span>

                <div>
                    <h3 className="font-serif-display text-3xl text-[var(--theme-text)] mb-4">{data.theme}</h3>
                    <p className="text-lg text-[var(--theme-text)]/50 font-sans font-light leading-relaxed">
                        {data.before}
                    </p>
                </div>
            </div>

            {/* After State — accent color reveal */}
            <motion.div
                className="absolute inset-0 bg-[var(--theme-accent)] p-10 flex flex-col justify-between z-10"
                initial={false}
                animate={{
                    clipPath: isHovered
                        ? "circle(150% at 50% 50%)"
                        : "circle(0% at 50% 100%)",
                }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[var(--theme-bg)]/60">
                    Dès la 1ère séance
                </span>

                <div>
                    <h3 className="font-serif-display text-4xl text-[var(--theme-bg)] mb-6 leading-tight">
                        {data.after}
                    </h3>
                    <div className="w-12 h-[1px] bg-[var(--theme-bg)]/30" />
                </div>
            </motion.div>
        </div>
    );
}
