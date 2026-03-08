"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Gift, Heart, Sparkles, ArrowRight, Check } from "lucide-react";

const giftOptions = [
    {
        title: "Séance Découverte",
        service: "Hypnose ou Sophrologie",
        duration: "1h",
        price: "65 €",
        priceNum: 65,
        description: "Le cadeau idéal pour initier un proche à l'hypnose ou la sophrologie. Une séance complète et sur mesure.",
        popular: false,
        icon: <Sparkles className="w-6 h-6" />,
    },
    {
        title: "Offre Sérénité",
        service: "Stop Tabac ou Perte de Poids",
        duration: "1h30",
        price: "120 €",
        priceNum: 120,
        description: "Offrez une véritable transformation. Arrêt du tabac ou perte de poids par hypnose — un cadeau qui change une vie.",
        popular: true,
        icon: <Heart className="w-6 h-6" />,
    },
    {
        title: "Pack Bien-être",
        service: "IG Bas & Hypnose Premium",
        duration: "1h30",
        price: "120 €",
        priceNum: 120,
        description: "Le programme complet : nutrition IG Bas + séance d'hypnose ciblée. Pour offrir un nouveau départ durable.",
        popular: false,
        icon: <Gift className="w-6 h-6" />,
    },
];

export default function CarteCadeauPage() {
    const [selected, setSelected] = useState(1); // Offre Sérénité par défaut
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const selectedOption = giftOptions[selected];

    const handleApplePay = () => {
        // Placeholder — à brancher sur Stripe Payment Request Button
        alert(`Paiement Apple Pay pour "${selectedOption.title}" — ${selectedOption.price}\nCarte envoyée à : ${email || "email non saisi"}`);
    };

    return (
        <main className="min-h-screen text-[var(--theme-text)] pt-32 pb-24 relative overflow-hidden">
            {/* Grain */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5 text-[var(--theme-accent)] text-[11px] font-bold tracking-[0.2em] uppercase font-sans">
                        <Gift className="w-4 h-4" /> Carte Cadeau Bien-être
                    </div>
                    <h1 className="font-serif-display text-5xl md:text-8xl tracking-tighter mb-6">
                        Offrez une <span className="italic text-[var(--theme-accent)]">Transformation</span>
                    </h1>
                    <p className="font-sans text-xl font-light opacity-60 max-w-2xl mx-auto leading-relaxed">
                        La carte cadeau Péguy Casteloot, c'est bien plus qu'un bon de soin — c'est un tournant. Un vrai cadeau qui laisse une trace durable.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT — Gift options */}
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-text)]/40 font-sans mb-6">Choisir une offre</p>
                        {giftOptions.map((option, i) => {
                            const isSelected = i === selected;
                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => setSelected(i)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                                    className={`relative w-full text-left p-6 rounded-[2rem] overflow-hidden flex items-start gap-5 border transition-all duration-400 ${isSelected
                                        ? "bg-[var(--theme-accent)]/10 border-[var(--theme-accent)] shadow-xl shadow-[var(--theme-accent)]/15"
                                        : "border-[var(--theme-text)]/10 hover:border-[var(--theme-accent)]/30 bg-[var(--theme-text)]/4"
                                        }`}
                                >
                                    {/* Populaire ribbon */}
                                    {option.popular && (
                                        <div className="absolute top-0 right-0 bg-[var(--theme-accent)] text-[var(--theme-bg)] text-[9px] font-black tracking-widest uppercase font-sans px-4 py-1.5 rounded-bl-2xl">
                                            Populaire
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-400 ${isSelected ? "bg-[var(--theme-accent)] text-[var(--theme-bg)]" : "bg-[var(--theme-text)]/8 text-[var(--theme-accent)]"}`}>
                                        {option.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0 pr-8">
                                        <p className={`text-[10px] uppercase tracking-[0.2em] font-bold font-sans mb-1 transition-colors ${isSelected ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/40"}`}>
                                            {option.service} · {option.duration}
                                        </p>
                                        <h2 className="font-serif-display text-xl text-[var(--theme-text)] mb-1">{option.title}</h2>
                                        <p className="font-sans text-xs font-light text-[var(--theme-text)]/55 leading-relaxed">{option.description}</p>
                                    </div>

                                    {/* Price + check */}
                                    <div className="shrink-0 flex flex-col items-end gap-2 pt-1">
                                        <p className={`font-serif-display text-2xl transition-colors ${isSelected ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/60"}`}>
                                            {option.price}
                                        </p>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-6 h-6 rounded-full bg-[var(--theme-accent)] flex items-center justify-center"
                                            >
                                                <Check className="w-3.5 h-3.5 text-[var(--theme-bg)] stroke-[3]" />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* RIGHT — Checkout */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="glass-ovni p-8 rounded-[2.5rem] flex flex-col gap-6 sticky top-32"
                    >
                        {/* Summary */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)]/70 font-sans mb-3">Récapitulatif</p>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selected}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <h3 className="font-serif-display text-2xl text-[var(--theme-text)]">{selectedOption.title}</h3>
                                        <p className="font-sans text-sm text-[var(--theme-text)]/40">{selectedOption.duration} · {selectedOption.service}</p>
                                    </div>
                                    <p className="font-serif-display text-3xl text-[var(--theme-accent)]">{selectedOption.price}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="h-px bg-[var(--theme-text)]/10" />

                        {/* Recipient email */}
                        <div>
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--theme-text)]/40 font-sans block mb-2">
                                Email du destinataire
                            </label>
                            <input
                                type="email"
                                placeholder="marie@email.fr"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/25 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 focus:bg-[var(--theme-accent)]/5 transition-all"
                            />
                            <p className="text-[10px] font-sans text-[var(--theme-text)]/30 mt-2 leading-relaxed">
                                La carte cadeau PDF sera envoyée directement à cette adresse sous 24h.
                            </p>
                        </div>

                        {/* Personal message */}
                        <div>
                            <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--theme-text)]/40 font-sans block mb-2">
                                Message personnel <span className="normal-case tracking-normal text-[var(--theme-text)]/25">(optionnel)</span>
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Écris un message à inclure dans l'email — ex. Joyeux anniversaire ! Je pense à toi…"
                                className="w-full px-5 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/25 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 focus:bg-[var(--theme-accent)]/5 transition-all resize-none leading-relaxed"
                            />
                        </div>

                        {/* Apple Pay Button */}
                        <button
                            onClick={handleApplePay}
                            className="w-full py-5 rounded-2xl bg-black text-white font-sans font-bold text-base tracking-wide flex items-center justify-center gap-3 hover:opacity-85 hover:scale-[1.02] transition-all shadow-xl shadow-black/30 select-none"
                            style={{ fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif" }}
                        >
                            {/* Apple logo SVG */}
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            Pay {selectedOption.price}
                        </button>

                        <div className="relative flex items-center gap-4">
                            <div className="flex-1 h-px bg-[var(--theme-text)]/10" />
                            <span className="text-[10px] font-sans text-[var(--theme-text)]/30 uppercase tracking-widest">ou</span>
                            <div className="flex-1 h-px bg-[var(--theme-text)]/10" />
                        </div>

                        {/* Phone / contact alternative */}
                        <a
                            href="tel:+33612345678"
                            className="w-full py-4 rounded-2xl border border-[var(--theme-text)]/15 text-[var(--theme-text)]/60 font-sans font-medium text-sm flex items-center justify-center gap-2 hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-text)] transition-all"
                        >
                            Contacter Péguy directement
                        </a>

                        <p className="text-center text-[10px] font-sans text-[var(--theme-text)]/25 leading-relaxed">
                            Paiement sécurisé · Carte envoyée sous 24h · Valable 1 an
                        </p>
                    </motion.div>
                </div>

                {/* Back CTA */}
                <div className="text-center mt-16">
                    <Link href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-sans text-[var(--theme-text)]/35 hover:text-[var(--theme-text)]/60 transition-colors">
                        Ou passer par la page contact <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
