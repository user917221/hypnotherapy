"use client";

import MagneticAccordionCard from "@/components/MagneticAccordionCard";
import KineticText from "@/components/KineticText";
import SophroDetails from "@/components/SophroDetails";
import TypewriterReviews from "@/components/TypewriterReviews";
import { Wind, Activity, Brain } from "lucide-react";

export default function SophrologieClient() {
    return (
        <main className="min-h-screen text-[var(--theme-text)] selection:bg-[var(--theme-accent)]/30 pt-32 pb-24 relative overflow-hidden">
            {/* Grain Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-seafoam/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
                <h1 className="font-serif-display text-5xl md:text-8xl mb-6 tracking-tighter">
                    <KineticText text="L'Ancrage et le" className="block" />
                    <KineticText text="Corps" delay={0.4} className="text-[var(--theme-accent)] italic block" />
                </h1>
                <p className="font-sans text-xl md:text-2xl opacity-80 max-w-3xl mx-auto font-light leading-relaxed mb-16">
                    Redécouvrez la puissance du souffle et de la visualisation pour ramener le calme intérieur au cœur de votre quotidien tempétueux.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
                    {[
                        {
                            title: "Respiration Consciente",
                            desc: "Se reconnecter à son souffle pour dissiper l'anxiété immédiate.",
                            extendedDesc: "La respiration est le seul système autonome sur lequel nous avons un contrôle direct. En modifiant notre rythme respiratoire, nous envoyons un signal de sécurité clair physiologique au cerveau. Lors des séances, nous pratiquons des respirations ventrales profondes, la cohérence cardiaque et des exercices qui coupent net les montées de stress, d'angoisses ou d'attaques de panique.",
                            icon: <Wind strokeWidth={1.5} className="w-6 h-6" />
                        },
                        {
                            title: "Détente Musculaire",
                            desc: "Relâcher les tensions accumulées dans la mémoire corporelle.",
                            extendedDesc: "Le corps mémorise le stress : mâchoires serrées, boules au ventre, maux de dos, épaules hautes. Par la relaxation dynamique et des suggestions de relâchement profond, nous chassons littéralement ces blocages somatisés. C'est le grand nettoyage corporel, indispensable avant d'apaiser l'esprit.",
                            icon: <Activity strokeWidth={1.5} className="w-6 h-6" />
                        },
                        {
                            title: "Visualisation Positive",
                            desc: "Créer un espace mental sécurisant et préparer l'avenir sereinement.",
                            extendedDesc: "Une fois le corps relâché, votre conscience s'ouvre (ondes alpha). Dans cet état doux, les visualisations projettent votre imagination vers des scénarios de réussite, d'apaisement ou vers un « lieu refuge » inébranlable. Le cerveau ne faisant pas la différence entre l'imagination intense et la réalité, cette étape reprogramme votre réaction au stress.",
                            icon: <Brain strokeWidth={1.5} className="w-6 h-6" />
                        }
                    ].map((item, idx) => (
                        <MagneticAccordionCard
                            key={idx}
                            title={item.title}
                            desc={item.desc}
                            extendedDesc={item.extendedDesc}
                            icon={item.icon}
                        />
                    ))}
                </div>

                <SophroDetails />
            </div>

            {/* Témoignages */}
            <div className="border-t border-[var(--theme-text)]/5 relative z-10">
                <TypewriterReviews />
            </div>

            {/* CTA Réserver */}
            <div className="relative z-10 py-20 flex flex-col items-center gap-5 text-center">
                <p className="font-sans text-[var(--theme-text)]/40 font-light text-sm uppercase tracking-widest">Prêt(e) à commencer ?</p>
                <h2 className="font-serif-display text-4xl md:text-6xl tracking-tighter text-[var(--theme-text)]">Réservez votre séance.</h2>
                <a
                    href="https://peguycasteloot.fr/reserver"
                    className="mt-4 inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-[var(--theme-accent)]/20"
                >
                    Prendre rendez-vous
                </a>
                <a href="tel:+33749310590" className="font-sans text-sm text-[var(--theme-text)]/35 hover:text-[var(--theme-accent)] transition-colors">
                    +33 7 49 31 05 90
                </a>
            </div>
        </main>
    );
}
