"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Headphones, Moon, Wind, Heart, Sparkles, Leaf, ArrowRight, Lock, Play } from "lucide-react";

const PODIA_BASE = "https://peguycasteloot.podia.com";

const audioProducts = [
    {
        id: "sommeil",
        title: "Le Sommeil Profond",
        subtitle: "Séance d'hypnose guidée",
        description: "Une séance d'hypnose pour retrouver un sommeil profond et réparateur. Idéal pour les insomnies, réveils nocturnes et pensées envahissantes avant de dormir.",
        duration: "~35 min",
        price: 19,
        tag: "Sommeil",
        icon: <Moon className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        podiaUrl: `${PODIA_BASE}/sommeil`,
        tracks: ["Induction douce", "Relaxation corps entier", "Programmation du sommeil"],
    },
    {
        id: "stress",
        title: "Gestion du Stress",
        subtitle: "Sophrologie & hypnose",
        description: "Un protocole audio combinant sophrologie et hypnose pour désamorcer le stress chronique, les tensions physiques et l'anxiété du quotidien.",
        duration: "~40 min",
        price: 19,
        tag: "Stress & Anxiété",
        icon: <Wind className="w-6 h-6" />,
        color: "var(--theme-accent)",
        podiaUrl: `${PODIA_BASE}/gestion-du-stress`,
        tracks: ["Respiration calmante", "Relâchement musculaire", "Ancrage sécurisant"],
    },
    {
        id: "estime",
        title: "Amour & Estime de Soi",
        subtitle: "Hypnose transformatrice",
        description: "Renouer avec sa valeur intérieure. Cette séance travaille en profondeur sur l'estime de soi, l'amour propre et la libération des croyances limitantes.",
        duration: "~45 min",
        price: 22,
        tag: "Confiance",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent)",
        podiaUrl: `${PODIA_BASE}/amour-et-estime-de-soi`,
        tracks: ["Reconnexion à soi", "Dissolution des croyances", "Ancrage de l'estime"],
        highlight: true,
    },
    {
        id: "elegie",
        title: "Retrouver l'Élégie",
        subtitle: "Voyage intérieur guidé",
        description: "Un voyage sonore unique pour retrouver la légèreté, l'émerveillement et la joie de vivre. Une séance poétique et profondément régénératrice.",
        duration: "~38 min",
        price: 22,
        tag: "Énergie & Joie",
        icon: <Sparkles className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        podiaUrl: `${PODIA_BASE}/retrouver-l-elegie`,
        tracks: ["Induction par la nature", "Voyage mémoriel positif", "Resurface en légèreté"],
    },
    {
        id: "nutrition",
        title: "Nutrition & Perte de Poids",
        subtitle: "Hypnose comportementale",
        description: "Reprogrammer ses comportements alimentaires par l'hypnose. Réduire les compulsions, retrouver le signal de satiété, et aimer nourrir son corps sainement.",
        duration: "~42 min",
        price: 24,
        tag: "Corps & Alimentation",
        icon: <Leaf className="w-6 h-6" />,
        color: "var(--theme-accent)",
        podiaUrl: `${PODIA_BASE}/nutrition-perte-de-poid`,
        tracks: ["Désamorçage des compulsions", "Hypnose de satiété", "Nouveau rapport au corps"],
    },
];

const tags = ["Tous", "Sommeil", "Stress & Anxiété", "Confiance", "Énergie & Joie", "Corps & Alimentation"];

export default function BibliotequePage() {
    const [activeTag, setActiveTag] = useState("Tous");

    const filtered = activeTag === "Tous"
        ? audioProducts
        : audioProducts.filter(p => p.tag === activeTag);

    return (
        <main className="min-h-screen text-[var(--theme-text)] pt-28 pb-24 relative overflow-hidden">
            {/* Grain */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

            {/* Ambient */}
            <div className="absolute top-0 right-1/3 w-[700px] h-[700px] bg-[var(--theme-accent)]/8 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[var(--theme-accent-alt)]/6 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)]">
                            <Headphones className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)] font-sans">L'Essence du Bien-Être · Bibliothèque Audio</span>
                    </div>
                    <h1 className="font-serif-display text-5xl md:text-8xl tracking-tighter leading-[0.9] mb-8">
                        Voyagez vers <span className="italic text-[var(--theme-text)]/50">vous-même.</span>
                    </h1>
                    <p className="font-sans text-xl font-light text-[var(--theme-text)]/50 max-w-2xl leading-relaxed">
                        Hypnose, sophrologie et coaching audio — accessibles chez vous, à votre rythme, quand vous en avez besoin.
                    </p>
                </motion.div>

                {/* Filter tags */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-5 py-2 rounded-full font-sans text-sm font-medium border transition-all duration-300 ${activeTag === tag
                                ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] border-[var(--theme-accent)] shadow-lg shadow-[var(--theme-accent)]/20"
                                : "border-[var(--theme-text)]/15 text-[var(--theme-text)]/50 hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-text)]/80"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
                    {filtered.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className={`relative flex flex-col rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${product.highlight
                                ? "border-[var(--theme-accent)]/40 bg-[var(--theme-accent)]/8 shadow-xl shadow-[var(--theme-accent)]/10"
                                : "border-[var(--theme-text)]/10 bg-[var(--theme-text)]/4 hover:border-[var(--theme-accent)]/30"
                                } group`}
                        >
                            {product.highlight && (
                                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] text-[10px] font-black tracking-widest uppercase z-10">
                                    Populaire
                                </div>
                            )}

                            {/* Header */}
                            <div className="p-8 pb-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-[var(--theme-text)]/10"
                                    style={{ background: `${product.color}15`, color: product.color }}>
                                    {product.icon}
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans mb-2 block" style={{ color: product.color }}>
                                    {product.tag} · {product.duration}
                                </span>
                                <h2 className="font-serif-display text-2xl text-[var(--theme-text)] mb-1">{product.title}</h2>
                                <p className="font-sans text-sm text-[var(--theme-text)]/50">{product.subtitle}</p>
                            </div>

                            {/* Description */}
                            <div className="px-8 pb-6 flex-1">
                                <p className="font-sans text-sm font-light text-[var(--theme-text)]/65 leading-relaxed mb-6">
                                    {product.description}
                                </p>

                                {/* Track list */}
                                <div className="space-y-2">
                                    {product.tracks.map((track, j) => (
                                        <div key={j} className="flex items-center gap-3 text-[var(--theme-text)]/50">
                                            <Play className="w-3 h-3 shrink-0" style={{ color: product.color }} />
                                            <span className="font-sans text-xs">{track}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="p-8 pt-4 border-t border-[var(--theme-text)]/8 flex items-center justify-between">
                                <p className="font-serif-display text-3xl" style={{ color: product.color }}>
                                    {product.price} €
                                </p>
                                <a
                                    href={product.podiaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-sm tracking-wide transition-all hover:scale-105 hover:shadow-lg"
                                    style={{
                                        background: product.color,
                                        color: "var(--theme-bg)",
                                        boxShadow: `0 8px 24px ${product.color}20`,
                                    }}
                                >
                                    Accéder <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Auth CTA banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="glass-ovni p-10 md:p-14 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,var(--theme-accent)_0%,transparent_50%)] opacity-5 pointer-events-none" />
                    <div className="flex items-start gap-6 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                            <Lock className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-serif-display text-3xl text-[var(--theme-text)] mb-2">Accès à votre espace</h3>
                            <p className="font-sans font-light text-[var(--theme-text)]/60 max-w-md">
                                Créez un compte pour accéder à vos audios achetés, suivre vos séances et gérer vos rendez-vous avec Péguy.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
                        <Link href="/inscription" className="px-8 py-4 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.15em] uppercase hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[var(--theme-accent)]/20">
                            Créer un compte
                        </Link>
                        <Link href="/connexion" className="px-8 py-4 rounded-full border border-[var(--theme-text)]/20 text-[var(--theme-text)] font-sans font-medium text-sm hover:border-[var(--theme-accent)]/50 hover:scale-105 transition-all">
                            Se connecter
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
