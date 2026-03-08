"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Headphones } from "lucide-react";

export default function ConnexionPage() {
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email: email === "admin" ? "contact@peguycasteloot.fr" : email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Email ou mot de passe incorrect.");
        } else {
            router.push("/espace-membre");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden text-[var(--theme-text)]">
            {/* Ambient */}
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[var(--theme-accent)]/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--theme-accent-alt)]/6 rounded-full blur-[100px] pointer-events-none" />

            <style jsx global>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus {
                    -webkit-text-fill-color: var(--theme-text);
                    -webkit-box-shadow: 0 0 0px 1000px #0a0a0a inset;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Header text */}
                <div className="text-center mb-8">
                    <h1 className="font-serif-display text-4xl tracking-tighter mb-2 italic">Bon retour.</h1>
                    <p className="font-sans text-[var(--theme-text)]/40 font-light text-sm">Accédez à votre espace bien-être.</p>
                </div>

                {/* Glass Container */}
                <div className="glass-ovni p-7 rounded-[2.5rem] relative">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans block mb-1.5 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/20" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="vous@email.com ou 'admin'"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0a0a0a]/40 border border-[var(--theme-text)]/5 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/20 font-sans focus:outline-none focus:border-[var(--theme-accent)]/20 focus:bg-[#0a0a0a]/60 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans block mb-1.5 ml-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/20" />
                                <input
                                    type={showPwd ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-11 pr-12 py-3 rounded-2xl bg-[#0a0a0a]/40 border border-[var(--theme-text)]/5 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/20 font-sans focus:outline-none focus:border-[var(--theme-accent)]/20 focus:bg-[#0a0a0a]/60 transition-all"
                                />
                                <button type="button" onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text)]/20 hover:text-[var(--theme-text)]/40 transition-colors">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-xs px-2">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg shadow-[var(--theme-accent)]/20 flex items-center justify-center gap-3 mt-2"
                        >
                            Se connecter <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="relative flex items-center gap-4 py-5">
                        <div className="flex-1 h-px bg-[var(--theme-text)]/5" />
                        <span className="text-[10px] font-sans text-[var(--theme-text)]/20 uppercase tracking-widest">ou</span>
                        <div className="flex-1 h-px bg-[var(--theme-text)]/5" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <button type="button" onClick={() => signIn("google", { callbackUrl: "/espace-membre" })} className="flex items-center justify-center py-3.5 rounded-2xl bg-[#0a0a0a]/20 border border-[var(--theme-text)]/5 hover:bg-[#0a0a0a]/40 transition-all">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        </button>
                        <button type="button" onClick={() => signIn("apple", { callbackUrl: "/espace-membre" })} className="flex items-center justify-center py-3.5 rounded-2xl bg-[#0a0a0a]/20 border border-[var(--theme-text)]/5 hover:bg-[#0a0a0a]/40 transition-all">
                            <svg className="w-5 h-5 fill-[var(--theme-text)]/60" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-82.3-20.1-41.9.8-80.5 24.3-102.1 61.9-44 76.5-11.3 190.4 31.4 252 21 30.1 46.1 63.6 78.4 62.1 31.1-1.4 42.9-20.5 80.5-20.5 37.5 0 48.5 20.5 81 20.1 33-.3 54.4-30 75.4-60.8 24.3-35.4 34.3-69.8 34.7-71.5-1.1-.4-66.6-25.6-67-101.5V268.7zM233 102.5c16.1-19.4 27.1-46.5 24.1-73.4-23.3 1-51.4 15.5-68.1 35.1-15 17.6-28.1 45.4-24.6 71.3 26.2 2 52.8-14.1 68.6-33z" />
                            </svg>
                        </button>
                        <button type="button" onClick={() => signIn("facebook", { callbackUrl: "/espace-membre" })} className="flex items-center justify-center py-3.5 rounded-2xl bg-[#0a0a0a]/20 border border-[var(--theme-text)]/5 hover:bg-[#0a0a0a]/40 transition-all">
                            <svg className="w-6 h-6 text-[#1877F2] opacity-70 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <p className="text-center mt-6 font-sans text-xs text-[var(--theme-text)]/30 tracking-tight">
                    Pas encore de compte ?{" "}
                    <Link href="/inscription" className="text-[var(--theme-accent)] hover:underline font-medium">
                        S'inscrire
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}
