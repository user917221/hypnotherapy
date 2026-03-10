"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Headphones, CheckCircle, AlertCircle } from "lucide-react";

const benefits = [
    "Accédez à vos audios achetés en illimité",
    "Gérez et décalez vos rendez-vous",
    "Suivez votre progression bien-être",
    "Recevez du contenu exclusif chaque mois",
];

import { Suspense } from "react";

function InscriptionForm() {
    const [form, setForm] = useState({ prenom: "", nom: "", email: "", password: "", genre: "femme" });
    const [showPwd, setShowPwd] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Une erreur est survenue");
            }

            // Automatiquement connecter après inscription
            await signIn("credentials", {
                email: form.email,
                password: form.password,
                callbackUrl: "/espace-membre",
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 mt-8">
            {/* Left — Benefits */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
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
                <form onSubmit={handleSubmit} className="glass-ovni p-8 rounded-[2.5rem] space-y-6">
                    <h2 className="font-serif-display text-2xl text-[var(--theme-text)] mb-2">Créer un compte</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, genre: "femme" })}
                            className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${form.genre === "femme" ? "bg-[var(--theme-accent)]/10 border-[var(--theme-accent)]" : "bg-[var(--theme-text)]/5 border-transparent hover:border-[var(--theme-text)]/10"}`}
                        >
                            <svg className={`w-12 h-12 ${form.genre === "femme" ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/20"}`} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6h-2v-13h-6v-2h18v2z" />
                            </svg>
                            <span className={`text-[10px] uppercase tracking-widest font-black ${form.genre === "femme" ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/30"}`}>Femme</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, genre: "homme" })}
                            className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${form.genre === "homme" ? "bg-[var(--theme-accent)]/10 border-[var(--theme-accent)]" : "bg-[var(--theme-text)]/5 border-transparent hover:border-[var(--theme-text)]/10"}`}
                        >
                            <svg className={`w-12 h-12 ${form.genre === "homme" ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/20"}`} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 7h-4v3h-4v-3h-4v-2h12v2zm-2 13h-2v-7h-2v7h-2v-13h6v13z" />
                            </svg>
                            <span className={`text-[10px] uppercase tracking-widest font-black ${form.genre === "homme" ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/30"}`}>Homme</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans block mb-1.5 ml-1">Prénom</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/20" />
                                <input type="text" placeholder="Marie" required value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/40 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/30 focus:bg-[var(--theme-text)]/10 transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans block mb-1.5 ml-1">Nom</label>
                            <input type="text" placeholder="Dupont" required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/40 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/30 focus:bg-[var(--theme-text)]/10 transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans block mb-1.5 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/20" />
                            <input type="email" placeholder="vous@email.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/40 font-sans focus:outline-none focus:border-[var(--theme-accent)]/30 focus:bg-[var(--theme-text)]/10 transition-all appearance-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans block mb-1.5 ml-1">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text)]/20" />
                            <input type={showPwd ? "text" : "password"} placeholder="Min. 8 caractères" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                                className="w-full pl-11 pr-12 py-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/40 font-sans focus:outline-none focus:border-[var(--theme-accent)]/30 focus:bg-[var(--theme-text)]/10 transition-all appearance-none" />
                            <button type="button" onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text)]/20 hover:text-[var(--theme-text)]/40 transition-colors">
                                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        className="w-full py-4 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[var(--theme-accent)]/25 flex items-center justify-center gap-3 mt-2 disabled:opacity-50 disabled:scale-100">
                        {loading ? "Création en cours..." : <>Créer mon compte <ArrowRight className="w-4 h-4" /></>}
                    </button>

                    <div className="relative flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-[var(--theme-text)]/5" />
                        <span className="text-[10px] font-sans text-[var(--theme-text)]/20 uppercase tracking-widest">ou avec</span>
                        <div className="flex-1 h-px bg-[var(--theme-text)]/5" />
                    </div>

                    <div className="flex justify-center">
                        <button type="button" onClick={() => signIn("google", { callbackUrl: "/espace-membre" })} className="flex items-center justify-center py-3.5 px-8 rounded-2xl bg-[#0a0a0a]/20 border border-[var(--theme-text)]/5 hover:bg-[#0a0a0a]/40 transition-all gap-3 group">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                            <span className="text-xs font-sans text-[var(--theme-text)]/60">Continuer avec Google</span>
                        </button>
                    </div>

                    <p className="text-center text-[11px] font-sans text-[var(--theme-text)]/30 leading-relaxed">
                        En vous inscrivant, vous acceptez les{" "}
                        <Link href="/conditions-generales" className="text-[var(--theme-accent)]/60 hover:text-[var(--theme-accent)] transition-colors">conditions générales</Link>.
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
    );
}

export default function InscriptionPage() {
    return (
        <main className="min-h-screen flex items-start justify-center px-6 py-20 relative overflow-hidden text-[var(--theme-text)]">
            <div className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[var(--theme-accent)]/8 rounded-full blur-[130px] pointer-events-none" />

            <style jsx global>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus {
                    -webkit-text-fill-color: var(--theme-text);
                    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
                    transition: background-color 5000s ease-in-out 0s;
                    background-color: transparent !important;
                }
            `}</style>

            <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-sans opacity-20">Chargement...</div>}>
                <InscriptionForm />
            </Suspense>
        </main>
    );
}
