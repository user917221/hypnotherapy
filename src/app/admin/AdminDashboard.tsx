"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    Users,
    ShoppingBag,
    Sparkles,
    ArrowUpRight,
    TrendingUp,
    MessageSquare,
    BrainCircuit,
    Loader2
} from "lucide-react";

// Données Mockées pour la démo
const stats = [
    { label: "Ventes Audios", value: "1,240 €", trend: "+12%", icon: ShoppingBag },
    { label: "Nouveaux Membres", value: "48", trend: "+5%", icon: Users },
    { label: "Taux de Conversion", value: "3.2%", trend: "+0.8%", icon: TrendingUp },
];

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Données Mockées enrichies
const visitorStats = {
    day: [12, 18, 15, 25, 32, 28, 40],
    week: [120, 150, 180, 140, 210, 190, 250],
    month: [450, 520, 600, 580, 720, 800, 950]
};

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [period, setPeriod] = useState<"day" | "week" | "month">("month");
    const [isAuditing, setIsAuditing] = useState(false);
    const [aiReport, setAiReport] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated" || (status === "authenticated" && (session?.user as any)?.role !== "ADMIN")) {
            router.push("/");
        }
    }, [status, session, router]);

    const runAiAudit = () => {
        setIsAuditing(true);
        setTimeout(() => {
            setAiReport("L'analyse comportementale indique une hausse de 25% de l'intérêt pour l'hypnose de régression cette semaine. Cependant, 40% des visiteurs quittent la page avant d'atteindre le bouton de réservation. Recommandation : Intégrer un bouton d'appel magnétique à mi-page pour capturer l'intention plus tôt.");
            setIsAuditing(false);
        }, 3000);
    };

    if (status === "loading") return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--theme-accent)]" /></div>;
    if (!session || (session?.user as any)?.role !== "ADMIN") return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 pt-24 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-serif-display tracking-tight">Panel <span className="text-[var(--theme-accent)]">Stratégique</span></h1>
                        <p className="text-white/40 text-sm mt-2">Bienvenue Péguy. Analyse de l'écosystème en temps réel.</p>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        {["day", "week", "month"].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p as any)}
                                className={`px-4 py-2 rounded-lg text-[10px] uppercase font-black tracking-widest transition-all ${period === p ? "bg-[var(--theme-accent)] text-black" : "text-white/40 hover:text-white"}`}
                            >
                                {p === "day" ? "Jour" : p === "week" ? "Semaine" : "Mois"}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] md:col-span-2 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Affluence Visiteurs</p>
                                <h2 className="text-3xl font-serif-display">{visitorStats[period].reduce((a, b) => a + b, 0)} <span className="text-sm font-sans text-green-400">+14%</span></h2>
                            </div>
                            <BarChart3 className="text-[var(--theme-accent)] opacity-20 w-8 h-8" />
                        </div>

                        {/* Simple SVG Chart */}
                        <div className="h-40 w-full flex items-end gap-2 px-2">
                            {visitorStats[period].map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(val / Math.max(...visitorStats[period])) * 100}%` }}
                                    className="flex-1 bg-gradient-to-t from-[var(--theme-accent)]/40 to-[var(--theme-accent)] rounded-t-md opacity-60 hover:opacity-100 transition-opacity"
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-[#4ade80]/10 flex items-center justify-center text-[#4ade80] mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-2">Conversion Globale</p>
                            <h2 className="text-4xl font-serif-display">4.8%</h2>
                        </div>
                        <button
                            onClick={runAiAudit}
                            disabled={isAuditing}
                            className="w-full py-4 rounded-2xl bg-[var(--theme-accent)] text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {isAuditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            Audit IA Comportement
                        </button>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {aiReport && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 p-8 rounded-[2.5rem] relative"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <BrainCircuit className="text-[var(--theme-accent)] w-6 h-6" />
                                <h3 className="text-xl font-serif-display">Rapport d'Intention Visiteurs</h3>
                            </div>
                            <p className="text-white/70 leading-relaxed italic">"{aiReport}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
                    <div className="p-8 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-serif-display text-xl">Détails du Comportement</h3>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-[10px] uppercase font-bold text-white/40"><Users className="w-3 h-3" /> {visitorStats[period].reduce((a, b) => a + b, 0)} sessions</span>
                        </div>
                    </div>
                    <div className="p-0">
                        {["Page Accueil", "Voyage Auditif", "Hypnose", "Sophrologie"].map((page, i) => (
                            <div key={i} className="flex justify-between items-center p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs text-white/20">{i + 1}</div>
                                    <p className="text-sm font-bold">{page}</p>
                                </div>
                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <p className="text-xs font-mono">{Math.floor(Math.random() * 200 + 50)} vues</p>
                                        <p className="text-[10px] text-white/30">Moy. 2m 45s</p>
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-green-400 opacity-40" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
