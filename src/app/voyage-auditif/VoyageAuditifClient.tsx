"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { Headphones, ArrowRight, Lock, Play, ArrowDown } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import MagneticPhoneButton from "@/components/MagneticPhoneButton";

import { audioProducts, audioTags as tags, landingPacks } from "@/constants/products";

export default function VoyageAuditifClient() {
    const [activeTag, setActiveTag] = useState("Tous");
    const [activePack, setActivePack] = useState<number | null>(null);
    const libraryRef = useRef<HTMLDivElement>(null);

    const filtered = activeTag === "Tous"
        ? audioProducts
        : audioProducts.filter(p => p.tag === activeTag);

    const scrollToLibrary = () => {
        libraryRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="min-h-screen text-[var(--theme-text)] bg-[var(--theme-bg)] selection:bg-[var(--theme-accent)]/30 relative overflow-hidden">
            {/* Grain */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-1/4 w-[1000px] h-[1000px] bg-[var(--theme-accent)]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-[var(--theme-accent-alt)]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            {/* --- SECTION 1: LANDING IMMERSIVE --- */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center relative z-10 border-b border-[var(--theme-text)]/5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)]">
                            <Headphones className="w-6 h-6" />
                        </div>
                        <span className="text-[12px] uppercase tracking-[0.4em] font-bold text-[var(--theme-accent)]">Le Dialogue Intérieur</span>
                    </div>

                    <h1 className="font-serif-display text-5xl md:text-[8vw] leading-[0.85] tracking-tighter mb-10">
                        Bibliothèque <br /> <span className="text-[var(--theme-accent)] italic">Voyage Auditif</span>
                    </h1>

                    <p className="font-sans text-xl md:text-2xl text-[var(--theme-text)]/60 max-w-2xl mx-auto font-light leading-relaxed mb-16">
                        Fermez les yeux. Branchez vos écouteurs. Laissez ma voix vous guider vers un espace de ressourcement profond, où vous le souhaitez.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <MagneticButton onClick={scrollToLibrary} className="px-12 py-6 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-full font-sans font-black uppercase tracking-widest text-[10px] hover:opacity-90 shadow-2xl shadow-[var(--theme-accent)]/20">
                            Explorer la Bibliothèque
                        </MagneticButton>
                        <MagneticPhoneButton />
                    </div>
                </motion.div>

                {/* Reader Demo Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-32 w-full max-w-4xl glass-ovni p-6 md:p-10 rounded-[3rem] border border-[var(--theme-accent)]/20 flex items-center gap-6 md:gap-10 shadow-3xl bg-[var(--theme-bg)]/40 relative"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--theme-accent)] flex items-center justify-center text-[var(--theme-bg)] shadow-[0_0_40px_var(--theme-accent)]/40 group cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                    <div className="text-left flex-1">
                        <h3 className="font-serif-display text-2xl md:text-3xl mb-1">Extrait : Sérénité Instantanée</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--theme-text)]/40">12 Min · Ancrage & Souffle</p>
                    </div>
                    <div className="hidden md:flex gap-[4px] h-12 items-end pb-2">
                        {[...Array(24)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                className="w-1 bg-[var(--theme-accent)]/20 rounded-full"
                            />
                        ))}
                    </div>

                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
                        <span className="text-[8px] uppercase tracking-widest font-bold">Découvrir les packs</span>
                        <ArrowDown className="w-4 h-4" />
                    </div>
                </motion.div>
            </section>

            {/* --- SECTION 2: LES PACKS --- */}
            <section className="py-32 px-6 bg-[var(--theme-text)]/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-serif-display text-4xl md:text-6xl text-center mb-20 tracking-tighter">Nos <span className="italic text-[var(--theme-accent-alt)]">Packs Signature</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                        {landingPacks.map((pack, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-ovni p-10 rounded-[3rem] border border-[var(--theme-text)]/10 flex flex-col items-start text-left group hover:border-[var(--theme-accent)]/30 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[var(--theme-text)]/5 flex items-center justify-center mb-8 border border-[var(--theme-text)]/10 group-hover:bg-[var(--theme-accent)]/10 group-hover:text-[var(--theme-accent)] transition-colors">
                                    {pack.icon}
                                </div>
                                <h3 className="font-serif-display text-2xl mb-2">{pack.title}</h3>
                                <p className="text-[10px] uppercase tracking-widest font-black text-[var(--theme-accent)] mb-6">{pack.duration} · {pack.result}</p>
                                <div className="w-10 h-px bg-[var(--theme-text)]/10 mb-6 group-hover:w-full transition-all duration-700" />
                                <p className="font-sans text-sm font-light text-[var(--theme-text)]/60 leading-relaxed">
                                    {pack.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: LA BIBLIOTHÈQUE (LIBRARY) --- */}
            <section ref={libraryRef} className="py-32 px-6 scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="font-serif-display text-5xl md:text-7xl tracking-tighter mb-8 text-center md:text-left">
                            La <span className="italic text-[var(--theme-text)]/40">Boutique</span> Complète
                        </h2>

                        {/* Filter tags */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-10">
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeTag === tag
                                        ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] border-[var(--theme-accent)] shadow-xl shadow-[var(--theme-accent)]/20"
                                        : "border-[var(--theme-text)]/10 text-[var(--theme-text)]/40 hover:border-[var(--theme-accent)]/30"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative flex flex-col rounded-[3rem] overflow-hidden border group transition-all duration-500 shadow-sm ${product.highlight
                                    ? "bg-[var(--theme-accent)]/5 border-[var(--theme-accent)]/30 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                                    : "bg-[var(--theme-text)]/[0.03] border-[var(--theme-text)]/10 hover:bg-[var(--theme-text)]/[0.06]"
                                    } hover:scale-[1.02] hover:shadow-2xl`}
                            >
                                <div className="p-10 flex-1">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--theme-text)]/10"
                                            style={{ background: `${product.color}15`, color: product.color }}>
                                            {product.icon}
                                        </div>
                                        {product.highlight && (
                                            <span className="px-3 py-1 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] text-[10px] font-black tracking-widest uppercase shadow-lg shadow-[var(--theme-accent)]/20">
                                                Populaire
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans mb-3 block" style={{ color: product.color }}>
                                        {product.tag} · {product.duration}
                                    </span>
                                    <h3 className="font-serif-display text-3xl text-[var(--theme-text)] mb-2 leading-tight">{product.title}</h3>
                                    <p className="font-sans text-[15px] font-light text-[var(--theme-text)]/60 leading-relaxed mb-10">
                                        {product.description}
                                    </p>

                                    <div className="space-y-3">
                                        {product.tracks.map((track, j) => (
                                            <div key={j} className="flex items-center gap-3 text-[var(--theme-text)]/40 group-hover:text-[var(--theme-text)]/60 transition-colors">
                                                <Play className="w-3 h-3 shrink-0" style={{ color: product.color }} />
                                                <span className="font-sans text-xs tracking-tight">{track}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-10 pt-0 flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-[var(--theme-text)]/30">Prix unique</span>
                                        <span className="font-serif-display text-4xl" style={{ color: product.color }}>{product.price}€</span>
                                    </div>
                                    <a
                                        href={product.checkoutUrl || product.podiaUrl || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-14 px-8 rounded-full flex items-center gap-3 font-sans font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                                        style={{
                                            backgroundColor: product.color,
                                            color: 'var(--theme-bg)',
                                            boxShadow: `0 10px 30px ${product.color}30`
                                        }}
                                    >
                                        Acheter <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: ESPACE MEMBRE --- */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-ovni p-12 md:p-20 rounded-[4rem] flex flex-col md:flex-row items-center gap-12 justify-between relative overflow-hidden text-center md:text-left"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--theme-accent)_0%,transparent_60%)] opacity-10 pointer-events-none" />
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="w-20 h-20 rounded-[2rem] bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] shrink-0 shadow-inner">
                                <Lock className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="font-serif-display text-4xl text-[var(--theme-text)] mb-4 leading-none">Votre Espace Audio</h3>
                                <p className="font-sans font-light text-[var(--theme-text)]/60 text-lg max-w-sm">
                                    Accédez instantanément à vos achats et suivez votre évolution personnelle.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10 w-full md:w-auto">
                            <Link href="/inscription" className="px-10 py-5 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs tracking-widest uppercase hover:opacity-90 hover:scale-105 transition-all shadow-2xl shadow-[var(--theme-accent)]/20 text-center">
                                Créer un compte
                            </Link>
                            <Link href="/connexion" className="px-10 py-5 rounded-full border border-[var(--theme-text)]/20 text-[var(--theme-text)] font-sans font-bold text-xs tracking-widest uppercase hover:border-[var(--theme-accent)]/50 hover:scale-105 transition-all text-center">
                                Connexion
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-24 text-center">
                <p className="font-sans text-[var(--theme-text)]/30 font-bold text-xs uppercase tracking-widest mb-10">Une question ? Un besoin spécifique ?</p>
                <div className="flex flex-col items-center gap-10">
                    <MagneticPhoneButton />
                    <Link href="/contact" className="font-sans text-sm text-[var(--theme-text)]/40 hover:text-[var(--theme-accent)] transition-colors underline underline-offset-8 decoration-[var(--theme-accent)]/20">
                        Formulaire de contact
                    </Link>
                </div>
            </section>
        </main>
    );
}
