"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Headphones, CheckCircle } from "lucide-react";

const benefits = [
    "Accédez à vos audios achetés en illimité",
    "Gérez et décalez vos rendez-vous",
    "Suivez votre progression bien-être",
    "Recevez du contenu exclusif chaque mois",
];

export default function InscriptionPage() {
    const [showPwd, setShowPwd] = useState(false);
    const [form, setForm] = useState({ prenom: "", nom: "", email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.open("https://peguycasteloot.podia.com/signup", "_blank");
    };

    return (
        <main className="min-h-screen flex items-start justify-center px-6 py-20 relative overflow-hidden text-[var(--theme-text)]">
            <div className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[var(--theme-accent)]/8 rounded-full blur-[130px] pointer-events-none" />

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 mt-8">

                {/* Left — Benefits */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
                        <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
                            <Headphones className="w-5 h-5" />
                        </div>
                        <span className="font-sans font-black tracking-tighter text-lg">Péguy Casteloot</span>
                    </Link>

                    <h1 className="font-serif-display text-4xl md:text-5xl tracking-tighter leading-tight mb-6">
                        Commencez votre <span className="italic text-[var(--theme-accent)]">voyage intérieur.</span>
                    </h1>
                    <p className="font-sans font-light text-[var(--theme-text)]/60 leading-relaxed mb-10">
                        Créez votre espace personnel pour accéder à l'ensemble des programmes audio et gérer votre suivi avec Péguy.
                    </p>

                    <div className="space-y-4">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                                <p className="font-sans text-sm font-light text-[var(--theme-text)]/70">{b}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} className="glass-ovni p-8 rounded-[2.5rem] space-y-5">
                        <h2 className="font-serif-display text-2xl text-[var(--theme-text)] mb-2">Créer un compte</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40 font-sans block mb-2">Prénom</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/30" />
                                    <input type="text" placeholder="Marie" required value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                                        className="w-full pl-10 pr-3 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40 font-sans block mb-2">Nom</label>
                                <input type="text" placeholder="Dupont" required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40 font-sans block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/30" />
                                <input type="email" placeholder="vous@email.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40 font-sans block mb-2">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/30" />
                                <input type={showPwd ? "text" : "password"} placeholder="Min. 8 caractères" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-11 pr-12 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                                <button type="button" onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text)]/30 hover:text-[var(--theme-text)]/60 transition-colors">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit"
                            className="w-full py-4 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[var(--theme-accent)]/25 flex items-center justify-center gap-3 mt-2">
                            Créer mon compte <ArrowRight className="w-4 h-4" />
                        </button>

                        <p className="text-center text-[11px] font-sans text-[var(--theme-text)]/30 leading-relaxed">
                            En vous inscrivant, vous acceptez les{" "}
                            <a href="https://peguycasteloot.podia.com" target="_blank" className="text-[var(--theme-accent)]/60 hover:text-[var(--theme-accent)] transition-colors">conditions générales</a>.
                        </p>
                    </form>

                    <p className="text-center mt-5 font-sans text-sm text-[var(--theme-text)]/40">
                        Déjà un compte ?{" "}
                        <Link href="/connexion" className="text-[var(--theme-accent)] hover:underline font-medium">
                            Se connecter
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
