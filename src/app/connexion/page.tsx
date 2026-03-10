"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Headphones } from "lucide-react";

import { Suspense } from "react";

function ConnexionForm() {
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam === "Configuration") {
            setError("Le login social n'est pas encore configuré (Client IDs manquants).");
        } else if (errorParam) {
            setError("Une erreur est survenue lors de la connexion sociale.");
        }
    }, [searchParams]);

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
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/40 font-sans focus:outline-none focus:border-[var(--theme-accent)]/30 focus:bg-[var(--theme-text)]/10 transition-all"
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
                                className="w-full pl-11 pr-12 py-3 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/40 font-sans focus:outline-none focus:border-[var(--theme-accent)]/30 focus:bg-[var(--theme-text)]/10 transition-all"
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

                <div className="flex justify-center">
                    <button type="button" onClick={() => signIn("google", { callbackUrl: "/espace-membre", redirect: true })} className="flex items-center justify-center py-3.5 px-8 rounded-2xl bg-[#0a0a0a]/20 border border-[var(--theme-text)]/5 hover:bg-[#0a0a0a]/40 transition-all gap-3 group">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                        <span className="text-xs font-sans text-[var(--theme-text)]/60">Continuer avec Google</span>
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
    );
}

export default function ConnexionPage() {
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

            <Suspense fallback={<div className="font-sans opacity-20">Chargement...</div>}>
                <ConnexionForm />
            </Suspense>
        </main>
    );
}
