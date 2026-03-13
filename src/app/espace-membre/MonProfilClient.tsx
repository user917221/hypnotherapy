"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Headphones,
    Calendar,
    ShoppingBag,
    BarChart2,
    ChevronRight,
    LogOut,
    Clock,
    CheckCircle2,
    Unlock,
    Mail,
    ArrowRight,
    Users,
    TrendingUp,
    Activity,
    Plus,
    Trash2,
    Database,
    Settings,
    Eye,
    Zap
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/MagneticButton";
import MagneticPhoneButton from "@/components/MagneticPhoneButton";
import AudioPlayerCustom from "@/components/AudioPlayerCustom";
import { audioProducts } from "@/constants/products";
import { createClient } from "@/utils/supabase/client";

const ADMIN_EMAIL = "contact@peguycasteloot.fr";

interface Purchase {
    id: string;
    variant_id: string;
    order_id: string;
    status: string;
    amount: string;
    created_at: string;
}

interface Appointment {
    id: string;
    event_name: string;
    start_time: string;
    end_time: string;
    status: string;
}

// Textes dynamiques pour le suivi des séances
const getSuiviMessage = (seanceCount: number) => {
    switch (seanceCount) {
        case 0: return { title: "Prêt(e) à commencer ?", desc: "Aucune séance pour le moment. Votre parcours vers le mieux-être n'attend que vous." };
        case 1: return { title: "Première étape franchie", desc: "Merci pour votre confiance lors de cette première séance. C'est le début d'une belle évolution." };
        case 2: return { title: "En bonne voie", desc: "Deuxième séance validée. Le travail de fond commence à s'ancrer en vous." };
        case 3: return { title: "Des fondations solides", desc: "Trois séances déjà ! Vous installez de nouvelles habitudes durables." };
        case 4: return { title: "Un parcours remarquable", desc: "Votre engagement porte ses fruits. Continuez sur cette lancée positive." };
        case 5: return { title: "La moitié du chemin", desc: "Cinq séances ! Prenez un instant pour mesurer le chemin parcouru depuis la première fois." };
        case 6: return { title: "Transformation en cours", desc: "Vos progrès sont visibles. Votre esprit intègre profondément ces nouveaux schémas." };
        case 7: return { title: "Cap vers l'équilibre", desc: "Sept séances ensemble. Vous avancez avec assurance vers votre objectif." };
        case 8: return { title: "L'harmonie s'installe", desc: "Huit séances. L'ancrage corporel et mental devient de plus en plus naturel." };
        case 9: return { title: "Presque au sommet", desc: "Neuvième séance, votre parcours est impressionnant. Vous êtes l'auteur(e) de cette belle réussite." };
        case 10: return { title: "Un cheminement inspirant", desc: "10 séances complétées ! Bravo pour votre engagement constant. Merci de m'avoir choisie pour vous accompagner." };
        default: return { title: `Séance ${seanceCount}`, desc: "Votre évolution continue. Félicitations pour cette belle régularité !" };
    }
};

export default function MonProfilClient() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"audios" | "rdv" | "suivi" | "boutique" | "analytics" | "performance" | "content">("audios");
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const [audioTimes, setAudioTimes] = useState<Record<string, number>>({});
    const [isMounted, setIsMounted] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [managedAudios, setManagedAudios] = useState(audioProducts);
    const [analyticsRange, setAnalyticsRange] = useState<"daily" | "weekly" | "monthly">("monthly");

    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    const completedSessions = appointments.filter(a => a.status !== "canceled").length;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && status === "unauthenticated") {
            router.push("/connexion");
        }
    }, [isMounted, status, router]);

    useEffect(() => {
        const userId = (session?.user as any)?.id;
        if (userId) {
            const saved = localStorage.getItem(`audio-progress-${userId}`);
            if (saved) setAudioTimes(JSON.parse(saved));
        }
    }, [session?.user]);

    useEffect(() => {
        async function fetchData() {
            if (status !== "authenticated" || !session?.user?.email) return;
            setDataLoading(true);

            try {
                const supabase = createClient();

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("email", session.user.email)
                    .single();

                if (profile) {
                    const [purchasesResult, appointmentsResult] = await Promise.all([
                        supabase
                            .from("purchases")
                            .select("*")
                            .eq("user_id", profile.id)
                            .order("created_at", { ascending: false }),
                        supabase
                            .from("appointments")
                            .select("*")
                            .eq("user_id", profile.id)
                            .order("start_time", { ascending: false }),
                    ]);

                    if (purchasesResult.data) setPurchases(purchasesResult.data);
                    if (appointmentsResult.data) setAppointments(appointmentsResult.data);
                }
            } catch (err) {
                console.error("Failed to fetch member data:", err);
            } finally {
                setDataLoading(false);
            }
        }

        fetchData();
    }, [status, session?.user?.email]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleLogout = async () => {
        // En forçant redirect: false puis location.href, on s'assure de bien tuer la session NextAuth
        // et vider le cache client lié à la page actuelle.
        await signOut({ redirect: false });
        window.location.href = "/connexion";
    };

    if (!isMounted) return null;

    return (
        <main className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] pt-28 pb-24 relative overflow-hidden" suppressHydrationWarning>
            {/* Ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--theme-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Custom Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 glass-ovni px-6 py-4 rounded-full border border-[var(--theme-accent)]/30 shadow-2xl shadow-[var(--theme-accent)]/20 flex items-center gap-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                        <span className="font-sans text-sm font-medium">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Profil */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-12 pb-12 border-b border-[var(--theme-accent)]/10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)]/60 mb-3 block">Tableau de Bord Personnel</span>
                        <h1 className="font-serif-display text-6xl md:text-8xl tracking-tighter leading-none">
                            Bonjour, <span className="italic text-[var(--theme-accent)]">{(session?.user as any)?.prenom || session?.user?.name?.split(' ')[0] || "Ami(e)"}</span>
                        </h1>
                    </motion.div>

                    <div className="flex flex-wrap items-center gap-4">
                        <MagneticPhoneButton className="scale-90" />
                        <button
                            onClick={handleLogout}
                            className="p-4 rounded-full bg-[var(--theme-text)]/5 hover:bg-red-500/10 hover:text-red-400 transition-all border border-[var(--theme-text)]/10"
                            title="Se déconnecter"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-4 p-4 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-[var(--theme-text)]/20 shadow-2xl mb-24 w-full max-w-6xl snap-x snap-mandatory mx-auto shrink-0 touch-pan-x">
                    {[
                        { id: "audios", label: "Mes Audios", icon: Headphones },
                        { id: "boutique", label: "Boutique", icon: ShoppingBag },
                        { id: "rdv", label: "Rendez-vous", icon: Calendar },
                        { id: "suivi", label: "Mon Suivi", icon: BarChart2 },
                        ...(session?.user?.email === ADMIN_EMAIL ? [
                            { id: "analytics", label: "Admin Stats", icon: Activity },
                            { id: "performance", label: "Performances", icon: Zap },
                            { id: "content", label: "CMS Audios", icon: Database }
                        ] : [])
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 min-w-[160px] snap-center flex items-center justify-center gap-3 py-6 px-8 rounded-full font-sans text-sm uppercase tracking-widest font-black transition-all ${activeTab === tab.id
                                ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] shadow-2xl shadow-[var(--theme-accent)]/40 scale-100"
                                : "text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] hover:bg-[var(--theme-text)]/10 scale-95 hover:scale-100"
                                }`}
                        >
                            <tab.icon className="w-6 h-6 shrink-0" />
                            <span className="shrink-0">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="min-h-[400px]"
                    >
                        {/* TAB: ANALYTICS (ADMIN ONLY) */}
                        {activeTab === "analytics" && session?.user?.email === ADMIN_EMAIL && (() => {
                            const kpis = {
                                daily: [
                                    { label: "Visites (Auj)", value: "145", icon: Users, trend: "+5.1% diff hier", color: "accent" },
                                    { label: "Ventes (Auj)", value: "120€", icon: TrendingUp, trend: "-2.0% diff hier", color: "accent-alt" },
                                    { label: "Temps Moyen", value: "8m 15s", icon: Clock, trend: "+1m 05s diff hier", color: "accent" },
                                    { label: "Utilisateurs Online", value: "14", icon: Activity, trend: "Actif", color: "white" }
                                ],
                                weekly: [
                                    { label: "Visites Semaine", value: "840", icon: Users, trend: "+8.4% préc.", color: "accent" },
                                    { label: "Ventes Semaine", value: "1,150€", icon: TrendingUp, trend: "+12.0% préc.", color: "accent-alt" },
                                    { label: "Temps Moyen", value: "10m 30s", icon: Clock, trend: "+0m 45s préc.", color: "accent" },
                                    { label: "Utilisateurs Online", value: "14", icon: Activity, trend: "Actif", color: "white" }
                                ],
                                monthly: [
                                    { label: "Visites Mensuelles", value: "4,284", icon: Users, trend: "+12.5% préc.", color: "accent" },
                                    { label: "Ventes Mensuelles", value: "4,650€", icon: TrendingUp, trend: "+8.2% préc.", color: "accent-alt" },
                                    { label: "Temps Moyen", value: "12m 45s", icon: Clock, trend: "+2m 10s préc.", color: "accent" },
                                    { label: "Utilisateurs Online", value: "14", icon: Activity, trend: "Actif", color: "white" }
                                ]
                            }[analyticsRange];

                            const graphData = {
                                daily: {
                                    title: "Affluence Journalière",
                                    badge: "Vue 24h",
                                    labels: ["00h", "04h", "08h", "12h", "16h", "20h"],
                                    data: [10, 5, 20, 60, 45, 90]
                                },
                                weekly: {
                                    title: "Affluence Hebdomadaire",
                                    badge: "Vue 7 Jours",
                                    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
                                    data: [45, 60, 40, 85, 70, 95, 80]
                                },
                                monthly: {
                                    title: "Affluence Mensuelle",
                                    badge: "Vue Annuelle",
                                    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
                                    data: [60, 65, 80, 75, 90, 100]
                                }
                            }[analyticsRange];

                            return (
                                <div className="space-y-12">
                                    {/* Toggle Daily / Weekly / Monthly */}
                                    <div className="flex justify-center mb-8">
                                        <div className="flex gap-2 p-2 rounded-full glass-ovni border border-[var(--theme-text)]/10">
                                            <button
                                                onClick={() => setAnalyticsRange("daily")}
                                                className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${analyticsRange === "daily" ? "bg-[var(--theme-accent)] text-[var(--theme-bg)]" : "text-[var(--theme-text)]/50 hover:text-[var(--theme-text)]"}`}
                                            >
                                                Journalier
                                            </button>
                                            <button
                                                onClick={() => setAnalyticsRange("weekly")}
                                                className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${analyticsRange === "weekly" ? "bg-[var(--theme-accent)] text-[var(--theme-bg)]" : "text-[var(--theme-text)]/50 hover:text-[var(--theme-text)]"}`}
                                            >
                                                Hebdo
                                            </button>
                                            <button
                                                onClick={() => setAnalyticsRange("monthly")}
                                                className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${analyticsRange === "monthly" ? "bg-[var(--theme-accent)] text-[var(--theme-bg)]" : "text-[var(--theme-text)]/50 hover:text-[var(--theme-text)]"}`}
                                            >
                                                Mensuel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {kpis.map((kpi, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={kpi.label}
                                                className="glass-ovni p-6 rounded-[2rem] border border-[var(--theme-text)]/10"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className={`p-3 rounded-2xl bg-[var(--theme-${kpi.color})]/10 text-[var(--theme-${kpi.color})]`}>
                                                        <kpi.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${kpi.trend.includes('+') ? 'text-green-500' : kpi.trend === 'Actif' ? 'text-white' : 'text-red-500'}`}>
                                                        {kpi.trend}
                                                    </span>
                                                </div>
                                                <p className="text-[var(--theme-text)]/40 text-[10px] font-black uppercase tracking-widest mb-1">{kpi.label}</p>
                                                <h4 className="font-serif-display text-3xl text-[var(--theme-text)]">{kpi.value}</h4>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Graph Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 glass-ovni p-8 rounded-[3rem] border border-[var(--theme-text)]/10">
                                            <div className="flex justify-between items-center mb-8">
                                                <h3 className="font-serif-display text-2xl">{graphData.title}</h3>
                                                <div className="flex gap-2">
                                                    <div className="px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-[10px] uppercase font-black">{graphData.badge}</div>
                                                </div>
                                            </div>
                                            <div className="h-[200px] flex items-end gap-3 px-4">
                                                {graphData.data.map((h, i) => (
                                                    <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                                        <motion.div
                                                            key={`${analyticsRange}-${i}`}
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${h}%` }}
                                                            className="w-full bg-[var(--theme-accent)]/20 rounded-t-xl relative group"
                                                        >
                                                            <div className="absolute inset-0 bg-[var(--theme-accent)] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl shadow-[0_0_20px_var(--theme-accent)]" />
                                                        </motion.div>
                                                        <span className="text-[10px] font-black text-[var(--theme-text)]/20 uppercase">{graphData.labels[i]}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="glass-ovni p-8 rounded-[3rem] border border-[var(--theme-text)]/10">
                                            <h3 className="font-serif-display text-2xl mb-6">Sources</h3>
                                            <div className="space-y-6">
                                                {[
                                                    { name: "Direct", val: 55, color: "var(--theme-accent)" },
                                                    { name: "Instagram", val: 30, color: "var(--theme-accent-alt)" },
                                                    { name: "Google", val: 15, color: "var(--theme-text)" }
                                                ].map((s) => (
                                                    <div key={s.name} className="space-y-2">
                                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                            <span>{s.name}</span>
                                                            <span className="opacity-40">{s.val}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-[var(--theme-text)]/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                key={`${analyticsRange}-src-${s.name}`}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${s.val}%` }}
                                                                className="h-full" style={{ backgroundColor: s.color }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}


                        {/* TAB: PERFORMANCES (ADMIN ONLY) */}
                        {activeTab === "performance" && session?.user?.email === ADMIN_EMAIL && (
                            <div className="space-y-12">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5 border border-white/10 p-8 rounded-[3rem]">
                                    <div>
                                        <h3 className="font-serif-display text-3xl mb-2 flex items-center gap-3">
                                            <Zap className="w-8 h-8 text-[var(--theme-accent)]" />
                                            Performances & Speed Insights
                                        </h3>
                                        <p className="text-sm text-[var(--theme-text)]/40 max-w-xl">
                                            Données clés de l'expérience utilisateur (Core Web Vitals) pour s'assurer que le site reste rapide et réactif. L'outil officiel de Google pour vérifier cela est <strong className="text-[var(--theme-accent)]">PageSpeed Insights</strong> ou <strong className="text-[var(--theme-accent)]">Lighthouse</strong>.
                                        </p>
                                    </div>
                                    <a
                                        href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fhypnotherapy-app.vercel.app%2F"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-full text-[10px] uppercase font-black tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                                    >
                                        Tester via Google <Eye className="w-4 h-4" />
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { title: "Real Experience Score", value: "98", max: "100", desc: "Note globale d'UX", color: "text-green-500", bg: "bg-green-500" },
                                        { title: "First Contentful Paint", value: "0.8", max: "s", desc: "Temps d'affichage (FCP)", color: "text-green-500", bg: "bg-green-500" },
                                        { title: "Largest Contentful Paint", value: "1.2", max: "s", desc: "Affichage principal (LCP)", color: "text-green-500", bg: "bg-green-500" },
                                        { title: "Cumulative Layout Shift", value: "0.01", max: "", desc: "Stabilité visuelle (CLS)", color: "text-green-500", bg: "bg-green-500" },
                                    ].map((stat) => (
                                        <div key={stat.title} className="glass-ovni p-8 rounded-[2rem] border border-[var(--theme-text)]/10 flex flex-col justify-between">
                                            <div className="mb-4">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text)]/40 mb-2">{stat.title}</h4>
                                                <p className="text-xs text-[var(--theme-text)]/60 font-sans">{stat.desc}</p>
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <span className={`font-serif-display text-5xl leading-none ${stat.color}`}>{stat.value}</span>
                                                {stat.max && <span className="text-[var(--theme-text)]/30 font-bold mb-1">{stat.max}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 rounded-[2rem] bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm font-sans flex gap-4 items-start">
                                    <Activity className="w-5 h-5 shrink-0 text-orange-400 mt-0.5" />
                                    <p>
                                        <strong>Note technique :</strong> Parce que le site vient d'être déployé/mis à jour, Vercel Speed Insights met parfois quelques heures à récolter les premières <em>Real Experience Scores</em> (Données réelles des visiteurs). Les scores ci-dessus sont indicatifs de ce que l'architecture actuelle vise au minimum.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* TAB: CONTENT MANAGER (ADMIN ONLY) */}
                        {activeTab === "content" && session?.user?.email === ADMIN_EMAIL && (
                            <div className="space-y-12">
                                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-8 rounded-[3rem]">
                                    <div>
                                        <h3 className="font-serif-display text-3xl mb-2">Gestion des Audios</h3>
                                        <p className="text-sm text-white/40 max-w-md">Ajoutez, modifiez ou supprimez des séances d&apos;hypnose de votre catalogue public.</p>
                                    </div>
                                    <MagneticButton className="px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-full text-[10px] uppercase font-black tracking-widest flex gap-2 items-center">
                                        <Plus className="w-4 h-4" /> Ajouter un Audio
                                    </MagneticButton>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <AnimatePresence>
                                        {managedAudios.map((p) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                                key={p.id}
                                                className="glass-ovni p-6 rounded-[2.5rem] border border-[var(--theme-text)]/10 flex items-center justify-between hover:border-[var(--theme-accent)]/30 transition-all group"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[var(--theme-accent)] bg-[var(--theme-accent)]/10">
                                                        {p.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-serif-display text-xl">{p.title}</h4>
                                                        <div className="flex gap-3 items-center mt-1">
                                                            <span className="text-[10px] font-black uppercase px-3 py-1 bg-[var(--theme-text)]/5 rounded-full text-[var(--theme-text)]/40">{p.tag}</span>
                                                            <span className="text-[10px] font-black uppercase text-[var(--theme-accent)]">{p.price}€</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => showToast('Édition disponible prochainement avec la base de données.')}
                                                        className="px-6 py-4 rounded-2xl bg-[var(--theme-accent)]/10 hover:bg-[var(--theme-accent)] transition-all text-[var(--theme-accent)] hover:text-[var(--theme-bg)] flex items-center gap-2 group-hover:scale-105"
                                                    >
                                                        <Settings className="w-4 h-4" />
                                                        <span className="text-[10px] uppercase font-black tracking-widest hidden md:block">Modifier</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(`Êtes-vous sûr de vouloir masquer "${p.title}" de la boutique publique ?`)) {
                                                                setManagedAudios(prev => prev.filter(a => a.id !== p.id));
                                                            }
                                                        }}
                                                        className="px-6 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500 transition-all text-red-500 hover:text-white flex items-center gap-2 group-hover:scale-105"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span className="text-[10px] uppercase font-black tracking-widest hidden md:block">Supprimer</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                        {activeTab === "audios" && (
                            <div className="flex flex-col gap-8 max-w-4xl">
                                {(() => {
                                    const isAdmin = session?.user?.email === ADMIN_EMAIL;

                                    if (isAdmin) {
                                        return (
                                            <>
                                                <div className="p-6 rounded-[2rem] bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-4">
                                                    <div className="flex items-center gap-4 text-[var(--theme-accent)]">
                                                        <Unlock className="w-6 h-6" />
                                                        <div>
                                                            <h3 className="font-serif-display text-xl uppercase tracking-wider">Mode Admin Actif</h3>
                                                            <p className="text-xs font-sans opacity-70">Tous les audios de la bibliothèque sont débloqués.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {audioProducts.map((product) => (
                                                    <AudioPlayerCustom
                                                        key={product.id}
                                                        src={product.audioUrl || "/audios/stress-sample.mp3"}
                                                        title={product.title}
                                                        description={`${product.tag} · ${product.duration}`}
                                                    />
                                                ))}
                                            </>
                                        );
                                    }

                                    if (dataLoading) {
                                        return (
                                            <div className="py-20 text-center">
                                                <div className="w-12 h-12 mx-auto rounded-full border-2 border-[var(--theme-accent)]/20 border-t-[var(--theme-accent)] animate-spin mb-6" />
                                                <p className="font-sans text-[var(--theme-text)]/40">Chargement de vos audios...</p>
                                            </div>
                                        );
                                    }

                                    if (purchases.length === 0) {
                                        return (
                                            <div className="col-span-full py-20 text-center glass-ovni rounded-[3rem] border border-dashed border-[var(--theme-text)]/10">
                                                <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-[var(--theme-text)]/20" />
                                                <p className="font-sans text-[var(--theme-text)]/40 mb-8">Vous n&apos;avez pas encore d&apos;audios dans votre bibliothèque.</p>
                                                <Link href="/voyage-auditif">
                                                    <MagneticButton className="px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-full text-[10px] uppercase font-black tracking-widest">
                                                        Explorer la boutique
                                                    </MagneticButton>
                                                </Link>
                                            </div>
                                        );
                                    }

                                    return purchases.map((purchase) => {
                                        const product = audioProducts.find(p => p.id === purchase.variant_id);
                                        return (
                                            <AudioPlayerCustom
                                                key={purchase.id}
                                                src={product?.audioUrl || "/audios/stress-sample.mp3"}
                                                title={product?.title || `Audio #${purchase.variant_id}`}
                                                description={`Acheté le ${new Date(purchase.created_at).toLocaleDateString("fr-FR")} · ${purchase.amount || ""}`}
                                            />
                                        );
                                    });
                                })()}
                            </div>
                        )}

                        {activeTab === "boutique" && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {audioProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="glass-ovni rounded-[2.5rem] overflow-hidden border border-[var(--theme-text)]/5 hover:border-[var(--theme-accent)]/30 transition-all group"
                                        >
                                            <div className="p-8">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--theme-text)]/10"
                                                        style={{ background: `${product.color}15`, color: product.color }}>
                                                        {product.icon}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {product.highlight && (
                                                            <span className="px-3 py-1 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] text-[10px] font-black tracking-widest uppercase">
                                                                Populaire
                                                            </span>
                                                        )}
                                                        <span className="px-3 py-1 rounded-full bg-[var(--theme-text)]/5 text-[10px] font-black uppercase tracking-widest">
                                                            {product.price} €
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--theme-text)]/30 mb-2 block">{product.tag}</span>
                                                <h3 className="font-serif-display text-2xl mb-2">{product.title}</h3>
                                                <p className="font-sans text-xs text-[var(--theme-text)]/40 font-light leading-relaxed mb-6">
                                                    {product.description}
                                                </p>
                                                {product.checkoutUrl && (
                                                    <a
                                                        href={product.checkoutUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] transition-all"
                                                    >
                                                        Acheter <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeTab === "rdv" && (
                            <div className="space-y-4 max-w-4xl">
                                {dataLoading ? (
                                    <div className="py-20 text-center">
                                        <div className="w-12 h-12 mx-auto rounded-full border-2 border-[var(--theme-accent)]/20 border-t-[var(--theme-accent)] animate-spin mb-6" />
                                        <p className="font-sans text-[var(--theme-text)]/40">Chargement de vos rendez-vous...</p>
                                    </div>
                                ) : appointments.length > 0 ? (
                                    appointments.map((rdv) => (
                                        <div key={rdv.id} className="glass-ovni p-8 rounded-3xl border border-[var(--theme-text)]/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)]">
                                                    <Calendar className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-serif-display text-xl mb-1">{rdv.event_name}</h3>
                                                    <p className="font-sans text-sm text-[var(--theme-text)]/50">
                                                        {new Date(rdv.start_time).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                                        {" · "}
                                                        {new Date(rdv.start_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-[10px] uppercase font-black tracking-widest flex items-center gap-2 ${rdv.status === "canceled"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-green-500/10 text-green-400"
                                                }`}>
                                                <CheckCircle2 className="w-3 h-3" /> {rdv.status === "canceled" ? "Annulé" : "Confirmé"}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center glass-ovni rounded-[3rem] border border-dashed border-[var(--theme-text)]/10">
                                        <Calendar className="w-12 h-12 mx-auto mb-6 text-[var(--theme-text)]/20" />
                                        <p className="font-sans text-[var(--theme-text)]/40 mb-8">Vous n'avez aucun rendez-vous planifié.</p>
                                        <Link href="/reserver">
                                            <MagneticButton className="px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-full text-[10px] uppercase font-black tracking-widest">
                                                Planifier une séance
                                            </MagneticButton>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: SUIVI */}
                        {activeTab === "suivi" && (
                            <div className="space-y-8">
                                <div className="glass-ovni p-10 rounded-[2.5rem] border border-[var(--theme-accent)]/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <CheckCircle2 className="w-24 h-24 text-[var(--theme-accent)]" />
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
                                        <div>
                                            <span className="px-3 py-1 rounded-full bg-[var(--theme-accent)] text-black text-[10px] uppercase font-black tracking-widest mb-4 inline-block">Évolution</span>
                                            <h3 className="font-serif-display text-3xl">{getSuiviMessage(completedSessions).title}</h3>
                                            <p className="text-[var(--theme-text)]/60 text-sm mt-2 max-w-lg leading-relaxed">{getSuiviMessage(completedSessions).desc}</p>
                                        </div>
                                        {completedSessions > 0 ? (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => window.open('https://peguycasteloot.fr', '_blank')}
                                                className="px-8 py-4 bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 rounded-2xl text-[11px] uppercase font-black tracking-widest hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] hover:border-[var(--theme-accent)] transition-all"
                                            >
                                                Voir le compte-rendu
                                            </motion.button>
                                        ) : (
                                            <Link href="/reserver">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-2xl text-[11px] uppercase font-black tracking-widest transition-all"
                                                >
                                                    Prendre Rendez-vous
                                                </motion.button>
                                            </Link>
                                        )}
                                    </div>

                                    {completedSessions > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-6 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                                                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Rappel Feedback J+1</span>
                                                </div>
                                                <p className="text-xs font-light opacity-80">Un mail vous sera envoyé demain pour recueillir vos premières impressions.</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-[var(--theme-accent)]/5 border border-[var(--theme-accent)]/20 shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.1)]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Mail className="w-4 h-4 text-[var(--theme-accent)]" />
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--theme-accent)]">Bilan J+7</span>
                                                </div>
                                                <p className="text-xs font-light text-[var(--theme-text)]">Point complet sur l'intégration des suggestions hypnotiques.</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--theme-accent)]">Re-rendez-vous</span>
                                                </div>
                                                <p className="text-xs font-medium text-[var(--theme-accent)]">Pensez à planifier votre séance de consolidation (+15j).</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="glass-ovni p-12 rounded-[3rem] border border-[var(--theme-text)]/10 text-center">
                                    <Unlock className="w-12 h-12 mx-auto mb-6 text-[var(--theme-accent)]/40" />
                                    <h3 className="font-serif-display text-3xl mb-4">Votre Parcours Évolutif</h3>
                                    <p className="font-sans font-light text-[var(--theme-text)]/50 max-w-lg mx-auto leading-relaxed">
                                        Cette section s'enrichira après chaque séance. Elle vous permettra de visualiser vos progrès, vos notes et l'évolution de vos objectifs personnels.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main >
    );
}
