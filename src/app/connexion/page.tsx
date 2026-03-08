"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Headphones } from "lucide-react";

export default function ConnexionPage() {
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to Podia for actual auth
        window.open("https://peguycasteloot.podia.com/login", "_blank");
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden text-[var(--theme-text)]">
            {/* Ambient */}
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[var(--theme-accent)]/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--theme-accent-alt)]/6 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
                            <Headphones className="w-5 h-5" />
                        </div>
                        <span className="font-sans font-black tracking-tighter text-lg">Péguy Casteloot</span>
                    </Link>
                    <h1 className="font-serif-display text-4xl tracking-tighter mb-3">Bon retour.</h1>
                    <p className="font-sans text-[var(--theme-text)]/50 font-light">Accédez à votre espace bien-être.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-ovni p-8 rounded-[2.5rem] space-y-5">
                    {/* Email */}
                    <div className="relative">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40 font-sans block mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="vous@email.com"
                                required
                                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans focus:outline-none focus:border-[var(--theme-accent)]/50 focus:bg-[var(--theme-accent)]/5 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40 font-sans block mb-2">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/30" />
                            <input
                                type={showPwd ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-11 pr-12 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans focus:outline-none focus:border-[var(--theme-accent)]/50 focus:bg-[var(--theme-accent)]/5 transition-all"
                            />
                            <button type="button" onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text)]/30 hover:text-[var(--theme-text)]/60 transition-colors">
                                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <a href="https://peguycasteloot.podia.com/password/reset" target="_blank" rel="noopener noreferrer"
                            className="text-[11px] font-sans text-[var(--theme-accent)]/70 hover:text-[var(--theme-accent)] mt-2 inline-block transition-colors">
                            Mot de passe oublié ?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[var(--theme-accent)]/25 flex items-center justify-center gap-3"
                    >
                        Se connecter <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="relative flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-[var(--theme-text)]/10" />
                        <span className="text-[11px] font-sans text-[var(--theme-text)]/30 uppercase tracking-widest">ou</span>
                        <div className="flex-1 h-px bg-[var(--theme-text)]/10" />
                    </div>

                    <a href="https://peguycasteloot.podia.com/login" target="_blank" rel="noopener noreferrer"
                        className="w-full py-4 rounded-2xl border border-[var(--theme-text)]/15 text-[var(--theme-text)] font-sans font-medium text-sm hover:border-[var(--theme-accent)]/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                        Continuer avec Podia
                    </a>
                </form>

                <p className="text-center mt-6 font-sans text-sm text-[var(--theme-text)]/40">
                    Pas encore de compte ?{" "}
                    <Link href="/inscription" className="text-[var(--theme-accent)] hover:underline font-medium">
                        S'inscrire
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}
