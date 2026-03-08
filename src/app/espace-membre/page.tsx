"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

// ─── SVG Avatar Homme ───────────────────────────────────────────────
function AvatarHomme({ selected }: { selected: boolean }) {
    return (
        <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Corps */}
            <rect x="30" y="90" width="60" height="65" rx="12"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.9 : 0.12}
                className="transition-all duration-400"
            />
            {/* Tête */}
            <ellipse cx="60" cy="52" rx="26" ry="30"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.9 : 0.15}
                className="transition-all duration-400"
            />
            {/* Cou */}
            <rect x="48" y="78" width="24" height="16" rx="6"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.85 : 0.12}
            />
            {/* Épaules larges */}
            <rect x="10" y="86" width="26" height="20" rx="8"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.7 : 0.1}
                className="transition-all duration-400"
            />
            <rect x="84" y="86" width="26" height="20" rx="8"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.7 : 0.1}
                className="transition-all duration-400"
            />
            {/* Yeux */}
            <ellipse cx="49" cy="48" rx="4" ry="4.5" fill={selected ? "var(--theme-bg)" : "var(--theme-text)"} opacity={selected ? 0.9 : 0.4} />
            <ellipse cx="71" cy="48" rx="4" ry="4.5" fill={selected ? "var(--theme-bg)" : "var(--theme-text)"} opacity={selected ? 0.9 : 0.4} />
            {/* Sourcils droits */}
            <line x1="44" y1="41" x2="54" y2="41" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="2.5" strokeLinecap="round" opacity={selected ? 0.8 : 0.4} />
            <line x1="66" y1="41" x2="76" y2="41" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="2.5" strokeLinecap="round" opacity={selected ? 0.8 : 0.4} />
            {/* Nez */}
            <path d="M57 52 Q60 60 63 52" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={selected ? 0.6 : 0.3} />
            {/* Bouche neutre */}
            <line x1="51" y1="65" x2="69" y2="65" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="2" strokeLinecap="round" opacity={selected ? 0.7 : 0.35} />
            {/* Cheveux courts */}
            <path d="M34 44 Q36 22 60 20 Q84 22 86 44" fill={selected ? "var(--theme-accent)" : "currentColor"} opacity={selected ? 1 : 0.2} />
            {/* Cravate / détail costume */}
            <path d="M55 93 L60 118 L65 93" fill={selected ? "var(--theme-bg)" : "var(--theme-text)"} opacity={selected ? 0.25 : 0.08} />
        </svg>
    );
}

// ─── SVG Avatar Femme ────────────────────────────────────────────────
function AvatarFemme({ selected }: { selected: boolean }) {
    return (
        <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Robe / corps */}
            <path d="M25 95 Q30 88 60 88 Q90 88 95 95 L100 155 H20 Z" rx="8"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.85 : 0.12}
                className="transition-all duration-400"
            />
            {/* Tête */}
            <ellipse cx="60" cy="50" rx="24" ry="28"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.9 : 0.15}
                className="transition-all duration-400"
            />
            {/* Cou */}
            <rect x="50" y="74" width="20" height="18" rx="6"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.85 : 0.12}
            />
            {/* Épaules douces */}
            <ellipse cx="28" cy="93" rx="14" ry="9"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.6 : 0.09}
            />
            <ellipse cx="92" cy="93" rx="14" ry="9"
                fill={selected ? "var(--theme-accent)" : "currentColor"}
                opacity={selected ? 0.6 : 0.09}
            />
            {/* Cheveux longs */}
            <path d="M36 40 Q30 80 28 130" stroke={selected ? "var(--theme-accent)" : "currentColor"} strokeWidth="10" strokeLinecap="round" opacity={selected ? 1 : 0.2} />
            <path d="M84 40 Q90 80 92 130" stroke={selected ? "var(--theme-accent)" : "currentColor"} strokeWidth="10" strokeLinecap="round" opacity={selected ? 1 : 0.2} />
            <path d="M36 32 Q60 18 84 32" fill={selected ? "var(--theme-accent)" : "currentColor"} opacity={selected ? 1 : 0.2} />
            {/* Yeux en amande */}
            <ellipse cx="49" cy="47" rx="5" ry="4" fill={selected ? "var(--theme-bg)" : "var(--theme-text)"} opacity={selected ? 0.9 : 0.4} />
            <ellipse cx="71" cy="47" rx="5" ry="4" fill={selected ? "var(--theme-bg)" : "var(--theme-text)"} opacity={selected ? 0.9 : 0.4} />
            {/* Cils haut */}
            <path d="M44 43 Q49 39 54 43" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="2" fill="none" opacity={selected ? 0.8 : 0.4} />
            <path d="M66 43 Q71 39 76 43" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="2" fill="none" opacity={selected ? 0.8 : 0.4} />
            {/* Nez délicat */}
            <path d="M58 53 Q60 59 62 53" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={selected ? 0.5 : 0.25} />
            {/* Sourire doux */}
            <path d="M51 63 Q60 70 69 63" stroke={selected ? "var(--theme-bg)" : "var(--theme-text)"} strokeWidth="2" strokeLinecap="round" fill="none" opacity={selected ? 0.75 : 0.35} />
            {/* Bijou / collier */}
            <circle cx="60" cy="82" r="3" fill={selected ? "var(--theme-bg)" : "var(--theme-text)"} opacity={selected ? 0.4 : 0.12} />
        </svg>
    );
}

type Genre = "homme" | "femme";

export default function EspaceMembre() {
    const [genre, setGenre] = useState<Genre>("femme");
    const [mode, setMode] = useState<"login" | "register">("login");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        prenom: "", nom: "", email: "", password: "",
    });

    const greeting = genre === "femme"
        ? ["Bienvenue,", "belle âme."]
        : ["Bienvenue,", "cher voyageur."];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (mode === "register") {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, genre }),
                });
                const data = await res.json();
                if (!res.ok) { setError(data.error || "Erreur lors de l'inscription"); return; }
                // Auto-login after register
            }

            // Redirect to mon-profil after successful auth
            const { signIn } = await import("next-auth/react");
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (result?.error) { setError("Email ou mot de passe incorrect."); }
            else { window.location.href = "/mon-profil"; }
        } catch {
            setError("Une erreur est survenue. Réessayez.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden text-[var(--theme-text)]">
            {/* Ambient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--theme-accent)_0%,transparent_60%)] opacity-[0.06] pointer-events-none" />
            <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[var(--theme-accent)]/6 rounded-full blur-[140px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl relative z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* LEFT — Avatar selection */}
                    <div className="flex flex-col items-center gap-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)]/60 font-sans text-center mb-4">
                                Vous êtes
                            </p>
                            <div className="flex gap-6 justify-center">
                                {(["homme", "femme"] as Genre[]).map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setGenre(g)}
                                        className={`relative flex flex-col items-center gap-3 group transition-all duration-400`}
                                    >
                                        <div className={`w-28 h-36 rounded-3xl p-4 border-2 transition-all duration-400 overflow-hidden ${genre === g
                                            ? "border-[var(--theme-accent)] bg-[var(--theme-accent)]/8 shadow-xl shadow-[var(--theme-accent)]/20 scale-105"
                                            : "border-[var(--theme-text)]/10 hover:border-[var(--theme-accent)]/30 hover:scale-[1.02]"
                                            }`}>
                                            {g === "homme"
                                                ? <AvatarHomme selected={genre === "homme"} />
                                                : <AvatarFemme selected={genre === "femme"} />
                                            }
                                        </div>
                                        <span className={`font-sans text-sm font-bold capitalize transition-colors ${genre === g ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/40"}`}>
                                            {g}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Welcome text */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={genre}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-center px-4"
                            >
                                <h1 className="font-serif-display text-4xl md:text-5xl tracking-tighter leading-tight text-[var(--theme-text)]">
                                    {greeting[0]}<br />
                                    <span className="italic text-[var(--theme-accent)]">{greeting[1]}</span>
                                </h1>
                                <p className="font-sans font-light text-[var(--theme-text)]/45 mt-4 text-sm leading-relaxed">
                                    Votre espace personnel pour accéder à vos audios, gérer vos séances et suivre votre transformation.
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT — Form */}
                    <div className="glass-ovni p-8 rounded-[2.5rem]">
                        {/* Mode tabs */}
                        <div className="flex gap-1 p-1 rounded-2xl bg-[var(--theme-text)]/5 mb-7">
                            {(["login", "register"] as const).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    className={`flex-1 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all duration-300 ${mode === m
                                        ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] shadow-md"
                                        : "text-[var(--theme-text)]/40 hover:text-[var(--theme-text)]/70"
                                        }`}
                                >
                                    {m === "login" ? "Se connecter" : "S'inscrire"}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence>
                                {mode === "register" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-2 gap-3 overflow-hidden"
                                    >
                                        <input type="text" placeholder="Prénom" required value={form.prenom}
                                            onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                                            className="px-4 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                                        <input type="text" placeholder="Nom" required value={form.nom}
                                            onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                                            className="px-4 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <input type="email" placeholder="Email" required value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                className="w-full px-4 py-3.5 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />

                            <div className="relative">
                                <input type={showPwd ? "text" : "password"} placeholder="Mot de passe" required value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    className="w-full px-4 py-3.5 pr-11 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 font-sans text-sm focus:outline-none focus:border-[var(--theme-accent)]/50 transition-all" />
                                <button type="button" onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text)]/30 hover:text-[var(--theme-text)]/60 transition-colors">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-400 text-xs font-sans px-1">{error}</p>
                            )}

                            <button type="submit" disabled={loading}
                                className="w-full py-4 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[var(--theme-accent)]/25 flex items-center justify-center gap-3 disabled:opacity-60">
                                {loading ? "..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>

                        {mode === "login" && (
                            <p className="text-center mt-4 text-[11px] font-sans text-[var(--theme-text)]/30">
                                Pas encore de compte ?{" "}
                                <button onClick={() => setMode("register")} className="text-[var(--theme-accent)] hover:underline font-medium">
                                    S'inscrire
                                </button>
                            </p>
                        )}
                    </div>
                </div> {/* end grid */}
            </motion.div>
        </main>
    );
}
