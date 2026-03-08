"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function FaqAccordion({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-theme-accent/20 rounded-2xl bg-theme-bg/60 backdrop-blur-xl backdrop-saturate-150 overflow-hidden hover:border-theme-accent/50 transition-all duration-300 shadow-sm relative group/faq">
            <div className="absolute inset-0 bg-theme-accent/5 opacity-0 group-hover/faq:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-6 flex items-start gap-4 justify-between cursor-pointer relative z-10"
            >
                <span className="font-serif-display text-xl text-theme-text group-hover/faq:text-theme-accent transition-colors">{question}</span>
                <ChevronDown className={`w-6 h-6 shrink-0 text-theme-accent transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 pt-2 text-theme-text/80 font-light leading-relaxed relative z-10"
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SophroDetails() {
    return (
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 text-left relative z-10 w-full mx-auto">
            {/* Colonne Gauche : Déroulement & Tarifs */}
            <div className="p-8 md:p-12 rounded-[3.5rem] bg-[var(--theme-text)]/5 text-[var(--theme-text)] overflow-hidden shadow-2xl border border-[var(--theme-accent)]/20 backdrop-blur-3xl relative">
                {/* Perpetual Rotating Beam */}
                <motion.div
                    className="absolute inset-[-2px] rounded-[3.5rem] pointer-events-none z-0"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, var(--theme-accent) 70%, var(--theme-accent) 72%, transparent 82%, transparent 100%)",
                        opacity: 0.5,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner mask */}
                <div className="absolute inset-[2px] rounded-[3.4rem] z-0" style={{ backgroundColor: "color-mix(in srgb, var(--theme-bg) 95%, var(--theme-accent) 5%)" }} />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--theme-accent)_0%,transparent_50%)] opacity-[0.05] pointer-events-none z-0" />

                <h2 className="text-3xl md:text-5xl font-serif-display mb-12 text-[var(--theme-accent)] relative z-10">Déroulement & Tarifs</h2>

                <div className="space-y-10 relative z-10">
                    <div className="flex gap-6 items-start group">
                        <div className="text-5xl md:text-6xl font-serif-display text-[var(--theme-accent)]/20 group-hover:text-[var(--theme-accent)]/60 transition-colors duration-700">1</div>
                        <div className="pt-2 flex-1">
                            <h3 className="text-2xl font-serif-display text-[var(--theme-text)] mb-2">L'Échange Initial</h3>
                            <p className="font-sans text-[17px] opacity-90 font-light leading-relaxed max-w-sm text-[var(--theme-text)]/80">
                                Nous prenons le temps d'échanger sur vos besoins, vos tensions, et l'objectif que vous souhaitez atteindre.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="text-5xl md:text-6xl font-serif-display text-[var(--theme-accent)]/20 group-hover:text-[var(--theme-accent)]/60 transition-colors duration-700">2</div>
                        <div className="pt-2 flex-1">
                            <h3 className="text-2xl font-serif-display text-[var(--theme-text)] mb-2">La Pratique</h3>
                            <p className="font-sans text-[17px] opacity-90 font-light leading-relaxed max-w-sm text-[var(--theme-text)]/80">
                                Exercices de respiration, relâchement musculaire (relaxation dynamique) et visualisations positives guidées par ma voix.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="text-5xl md:text-6xl font-serif-display text-[var(--theme-accent)]/20 group-hover:text-[var(--theme-accent)]/60 transition-colors duration-700">3</div>
                        <div className="pt-2 flex-1">
                            <h3 className="text-2xl font-serif-display text-[var(--theme-text)] mb-4">En Pratique</h3>
                            <ul className="font-sans text-[17px] opacity-90 font-light leading-relaxed space-y-3 max-w-sm text-[var(--theme-text)]/80">
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] opacity-60"></span> Durée de la séance : <strong className="text-[var(--theme-text)] font-medium">1 Heure</strong></li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] opacity-60"></span> Tarif (Adulte) : <strong className="text-[var(--theme-text)] font-medium">60 €</strong></li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] opacity-60"></span> Tarif (Enfant / Ado) : <strong className="text-[var(--theme-text)] font-medium">50 €</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Colonne Droite : FAQ */}
            <div className="flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-serif-display mb-10 text-theme-text px-2">Questions Fréquentes</h2>
                <div className="space-y-4">
                    <FaqAccordion
                        question="Faut-il une tenue spécifique ?"
                        answer="La sophrologie se pratique dans la tenue de tous les jours. Prévoyez de préférence des vêtements confortables dans lesquels vous ne vous sentez pas trop serré(e) pour faciliter la respiration."
                    />
                    <FaqAccordion
                        question="Combien de séances sont nécessaires ?"
                        answer="L'objectif de la sophrologie est de vous rendre autonome avec des outils faciles à intégrer au quotidien. Un accompagnement s'effectue généralement sur 5 à 10 séances selon votre objectif."
                    />
                    <FaqAccordion
                        question="Je n'arrive pas à méditer, est-ce pour moi ?"
                        answer="Absolument. Contrairement à la méditation silencieuse, la sophrologie est très rythmée et guidée par ma voix. Les mouvements corporels empêchent l'esprit de vagabonder."
                    />
                    <FaqAccordion
                        question="Est-ce pris en charge par la mutuelle ?"
                        answer="De plus en plus de mutuelles prennent en charge des séances de sophrologie (forfait médecine douce, ou forfait annuel). Je vous délivrerai une facture à l'issue de notre rencontre."
                    />
                </div>
            </div>
        </div>
    );
}
