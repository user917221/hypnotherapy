"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Flame, Brain, ShieldCheck, Heart } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

function MagneticListItem({ children, icon: Icon, colorClass }: { children: React.ReactNode, icon: any, colorClass: string }) {
    const ref = useRef<HTMLLIElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLLIElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.li
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="flex items-start gap-4 p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-colors duration-500 cursor-default"
        >
            <Icon className={`w-6 h-6 ${colorClass} shrink-0 mt-0.5`} />
            <span className="opacity-90 leading-relaxed font-light">{children}</span>
        </motion.li>
    );
}

export default function IgBasClient() {
    return (
        <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
            {/* Ambient glow 1 */}
            <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-taupe/20 rounded-full blur-[150px] mix-blend-screen -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-seafoam/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block py-1 pr-4 pl-2 mb-6 rounded-full border border-seafoam/30 bg-seafoam/5 text-seafoam text-sm font-medium tracking-wide backdrop-blur-md"
                >
                    <span className="flex items-center gap-2">
                        <Leaf className="w-4 h-4" /> La Méthode Complète
                    </span>
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                    className="font-serif-display text-5xl md:text-8xl mb-6 tracking-tighter"
                >
                    Accompagnement <br /> <span className="text-seafoam italic">Corps & Esprit</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="font-sans text-xl md:text-2xl opacity-80 max-w-3xl mx-auto font-light leading-relaxed mb-24"
                >
                    L'association puissante de la nutrition à Indice Glycémique Bas et de l'hypnose pour mincir durablement, stopper les compulsions et retrouver votre vitalité.
                </motion.p>

                {/* The Two Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-10 md:p-14 rounded-[3rem] glass-ovni bg-[var(--theme-text)]/5 text-left relative overflow-hidden group hover:border-[var(--theme-accent)]/40 transition-colors duration-500"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-125 duration-700" />
                        <Flame className="w-12 h-12 text-seafoam mb-8" strokeWidth={1} />
                        <h2 className="text-3xl font-serif-display mb-6 relative z-10">Le Corps : Nutrition IG Bas</h2>
                        <ul className="space-y-2 font-sans text-lg relative z-10">
                            <MagneticListItem icon={ShieldCheck} colorClass="text-seafoam">
                                Régulation naturelle de l'insuline pour stopper le stockage des graisses.
                            </MagneticListItem>
                            <MagneticListItem icon={ShieldCheck} colorClass="text-seafoam">
                                Finie la faim constante : satiété prolongée et énergie lissée sur la journée.
                            </MagneticListItem>
                            <MagneticListItem icon={ShieldCheck} colorClass="text-seafoam">
                                Pas de calcul de calories infernal, mais le choix des bons aliments.
                            </MagneticListItem>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 md:p-14 rounded-[3rem] glass-ovni bg-[var(--theme-text)]/5 text-left relative overflow-hidden group hover:border-[var(--theme-accent-alt)]/40 transition-colors duration-500"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent-alt)]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-125 duration-700" />
                        <Brain className="w-12 h-12 text-taupe mb-8" strokeWidth={1} />
                        <h2 className="text-3xl font-serif-display mb-6 relative z-10">L'Esprit : Hypnose</h2>
                        <ul className="space-y-2 font-sans text-lg relative z-10">
                            <MagneticListItem icon={Heart} colorClass="text-taupe">
                                Désamorcer les "mangeurs émotionnels" (manger pour compenser le stress, la tristesse).
                            </MagneticListItem>
                            <MagneticListItem icon={Heart} colorClass="text-taupe">
                                Renforcer la volonté et la motivation inconsciente face aux objectifs.
                            </MagneticListItem>
                            <MagneticListItem icon={Heart} colorClass="text-taupe">
                                Réparer l'estime de soi et accepter son corps pendant sa transformation.
                            </MagneticListItem>
                        </ul>
                    </motion.div>
                </div>

                {/* The deep dive section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-10 md:p-24 rounded-[4rem] bg-[var(--theme-text)]/5 overflow-hidden shadow-2xl text-left border border-[var(--theme-accent)]/20 backdrop-blur-3xl"
                >
                    {/* Perpetual Rotating Glow */}
                    <motion.div
                        className="absolute inset-[-2px] rounded-[4rem] pointer-events-none z-0"
                        style={{
                            background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, var(--theme-accent) 70%, var(--theme-accent) 72%, transparent 82%, transparent 100%)",
                            opacity: 0.5,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-[2px] rounded-[3.9rem] bg-[var(--theme-bg)] z-0" style={{ backgroundColor: "color-mix(in srgb, var(--theme-bg) 95%, var(--theme-accent) 5%)" }} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--theme-accent)_0%,transparent_50%)] opacity-5 pointer-events-none z-0" />

                    <h2 className="text-4xl md:text-6xl font-serif-display mb-16 text-[var(--theme-text)] text-center relative z-10">Le Déroulé du Programme</h2>

                    <div className="max-w-4xl mx-auto space-y-16 relative z-10">
                        <div className="flex flex-col md:flex-row gap-8 items-start group">
                            <div className="text-7xl font-serif-display text-[var(--theme-accent)]/20 group-hover:text-[var(--theme-accent)]/60 transition-colors duration-700">1</div>
                            <div className="pt-2">
                                <h3 className="text-3xl font-serif-display text-[var(--theme-accent)] mb-4">Le Bilan Initial (1h30)</h3>
                                <p className="font-sans text-[17px] md:text-lg opacity-80 font-light leading-relaxed max-w-md text-[var(--theme-text)]">
                                    Nous faisons un état des lieux complet de vos habitudes alimentaires, de votre histoire avec le poids, et surtout de votre état émotionnel. Je vous initie aux bases simples de l'IG Bas (ce n'est pas un régime, c'est un mode de vie).
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start group">
                            <div className="text-7xl font-serif-display text-[var(--theme-accent)]/20 group-hover:text-[var(--theme-accent)]/60 transition-colors duration-700">2</div>
                            <div className="pt-2">
                                <h3 className="text-3xl font-serif-display text-[var(--theme-accent)] mb-4">Séances de Suivi & Hypnose (1h)</h3>
                                <p className="font-sans text-[17px] md:text-lg opacity-80 font-light leading-relaxed max-w-md text-[var(--theme-text)]">
                                    Pendant plusieurs semaines, nous faisons le point sur vos repas sans jugement. Puis, la majeure partie de la séance est consacrée à l'Hypnose pour traiter ce qui bloque en profondeur (addiction au sucre, grignotage du soir, mémoires traumatiques stockées physiquement).
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start group">
                            <div className="text-7xl font-serif-display text-[var(--theme-accent)]/20 group-hover:text-[var(--theme-accent)]/60 transition-colors duration-700">3</div>
                            <div className="pt-2">
                                <h3 className="text-3xl font-serif-display text-[var(--theme-accent)] mb-4">Autonomie & Renouveau</h3>
                                <p className="font-sans text-[17px] md:text-lg opacity-80 font-light leading-relaxed max-w-md text-[var(--theme-text)]">
                                    L'objectif n'est pas de vous peser toutes les semaines, mais de vous rendre autonome. Vous saurez comment composer une assiette IG Bas partout (même au restaurant), et votre cerveau rejettera naturellement l'hyper-sucre artificiel.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <a href="https://peguycasteloot.fr/reserver" className="group no-underline">
                        <MagneticButton className="group relative px-12 py-6 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-theme-accent/20 bg-[var(--theme-accent)] text-[var(--theme-bg)]">
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                            <span className="relative z-10 font-sans font-black tracking-[0.2em] transition-colors uppercase flex items-center gap-4 text-sm md:text-base text-[var(--theme-bg)]">
                                Démarrer l'Accompagnement <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </MagneticButton>
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
