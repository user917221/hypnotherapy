"use client";

import { motion } from "framer-motion";

export default function PhilosophyManifesto() {
    return (
        <section className="relative py-40 bg-[var(--theme-bg)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* Left: Poetry & Philosophy */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5 }}
                            className="space-y-6"
                        >
                            <span className="font-sans font-black text-[10px] text-[var(--theme-accent)] uppercase tracking-[0.5em]">Mon Approche</span>
                            <h2 className="font-serif-display italic text-6xl md:text-[5vw] text-[var(--theme-text)] leading-[0.9] tracking-tighter">
                                Le Corps ne <span className="text-[var(--theme-accent)] underline decoration-[var(--theme-accent)]/30">ment jamais</span>.
                            </h2>
                        </motion.div>

                        <div className="space-y-8 font-sans font-light text-xl text-[var(--theme-text)]/70 leading-relaxed">
                            <p>
                                "Notre corps se souvient. Il garde la trace du stress, des manques, des blessures qu’on a parfois dû enfouir pour avancer. Mon rôle est de vous aider à transformer ce poids en un message à comprendre plutôt qu’un fardeau à combattre."
                            </p>
                            <p className="italic border-l-2 border-[var(--theme-accent)] pl-8 py-2">
                                Retrouvez la douceur sans dépendance, l'ancrage indispensable quand tout bouge... rester présent, centré, aligné.
                            </p>
                        </div>
                    </div>

                    {/* Right: Immersive Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1.2, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
                        className="glass-ovni rounded-[5rem] p-16 md:p-20 relative flex flex-col items-center text-center"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--theme-accent)] rounded-full blur-[80px] opacity-20" />

                        <h3 className="font-serif-display text-4xl text-[var(--theme-text)] mb-10">L'Éveil de l'Inconscient</h3>
                        <div className="space-y-10 w-full flex flex-col items-center">
                            <StatItem number="1ère" label="Le changement s'opère" sub="Dès la première séance" />
                            <StatItem number="80€" label="Engagement Mutuel" sub="Séance individuelle (1h15)" />
                            <StatItem number="5/5" label="Confiance Totale" sub="87 Avis Google Authentiques" />
                        </div>

                        <div className="mt-16 pt-10 border-t border-[var(--theme-text)]/5 flex flex-col items-center gap-4 w-full">
                            <div className="w-16 h-16 rounded-full bg-[var(--theme-text)]/5 flex items-center justify-center text-[var(--theme-accent)] hover:scale-110 transition-transform">
                                <span className="text-2xl text-red-400">❤</span>
                            </div>
                            <p className="font-sans text-xs uppercase font-black tracking-widest text-[var(--theme-text)]/40">Approche douce & inclusive</p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Background elements */}
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[var(--theme-accent)]/5 to-transparent pointer-events-none" />
        </section>
    );
}

function StatItem({ number, label, sub }: { number: string, label: string, sub: string }) {
    return (
        <div className="flex flex-col items-center gap-2 group w-full">
            <span className="font-serif-display italic text-6xl text-[var(--theme-text)] drop-shadow-md group-hover:scale-110 transition-transform duration-700">{number}</span>
            <div className="flex flex-col items-center text-center">
                <span className="font-sans font-bold text-[var(--theme-text)] uppercase tracking-widest text-xs mt-2">{label}</span>
                <span className="font-sans text-[var(--theme-text)]/60 text-sm">{sub}</span>
            </div>
        </div>
    );
}
