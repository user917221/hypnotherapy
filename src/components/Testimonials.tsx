"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
    {
        name: "Sophie M.",
        age: 38,
        result: "Stop tabac — 6 mois de liberté",
        text: "J'ai tenté des dizaines de méthodes pour arrêter de fumer. Après seulement 3 séances avec Péguy, je n'ai plus aucune envie de cigarette. Ce n'est pas de la magie, c'est une vraie reprogrammation de mon rapport au tabac.",
        stars: 5,
    },
    {
        name: "Thomas R.",
        age: 45,
        result: "Anxiété chronique apaisée",
        text: "La sophrologie que je pratiquais avec Péguy m'a appris à reprendre le contrôle sur mes pensées anxieuses. Après 4 séances, je dors enfin sans somnifères. Je recommande les yeux fermés.",
        stars: 5,
    },
    {
        name: "Camille D.",
        age: 32,
        result: "Perte de 12 kg en 4 mois",
        text: "Grâce à la méthode IG Bas couplée aux séances d'hypnose, j'ai enfin arrêté de manger par stress. Je n'ai jamais eu faim, jamais souffert. C'est la première fois en 10 ans que je me réconcilie avec mon corps.",
        stars: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--theme-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20 relative z-10"
            >
                <span className="inline-block py-1 px-4 mb-6 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5 text-[var(--theme-accent)] text-sm font-medium tracking-wide">
                    Paroles de Personnes Transformées
                </span>
                <h2 className="font-serif-display text-5xl md:text-7xl tracking-tighter mb-6 text-[var(--theme-text)]">
                    Ils ont osé <span className="italic text-[var(--theme-accent)]">changer</span>.
                </h2>
                <p className="font-sans text-xl font-light opacity-70 max-w-2xl mx-auto leading-relaxed text-[var(--theme-text)]">
                    Chaque transformation commence par un premier pas. Voici ce qu'ils en disent.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {testimonials.map((t, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
                        className="glass-ovni p-8 rounded-[2.5rem] flex flex-col gap-6 relative group hover:border-[var(--theme-accent)]/40 transition-all duration-500 hover:-translate-y-2"
                    >
                        {/* Decorative Quote Icon */}
                        <div className="absolute top-6 right-8 text-[var(--theme-accent)]/10 group-hover:text-[var(--theme-accent)]/20 transition-colors duration-500">
                            <Quote className="w-16 h-16" strokeWidth={1} />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1">
                            {[...Array(t.stars)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-[var(--theme-accent)] fill-current opacity-80" />
                            ))}
                        </div>

                        {/* Result Pill */}
                        <span className="self-start text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 px-3 py-1.5 rounded-full border border-[var(--theme-accent)]/20">
                            {t.result}
                        </span>

                        {/* Quote */}
                        <p className="font-sans text-base leading-relaxed font-light opacity-85 text-[var(--theme-text)] italic flex-1">
                            &ldquo;{t.text}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-[var(--theme-text)]/10">
                            <div className="w-10 h-10 rounded-full bg-[var(--theme-accent)]/20 flex items-center justify-center font-serif-display text-lg text-[var(--theme-accent)] font-bold">
                                {t.name[0]}
                            </div>
                            <div>
                                <p className="font-sans font-semibold text-sm text-[var(--theme-text)]">{t.name}</p>
                                <p className="font-sans text-xs opacity-50 text-[var(--theme-text)]">{t.age} ans</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
