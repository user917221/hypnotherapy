"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Headphones,
    Calendar,
    ShoppingBag,
    BarChart2,
    Play,
    ChevronRight,
    LogOut,
    Clock,
    CheckCircle2,
    Pause,
    Unlock,
    Mail,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MagneticButton from "@/components/MagneticButton";
import MagneticPhoneButton from "@/components/MagneticPhoneButton";

// Mock data pour la structure (Sera remplacé par des appels API/Supabase)
const mockUser = {
    prenom: "Péguy",
    nom: "Casteloot",
    genre: "femme",
    email: "contact@peguycasteloot.fr"
};

const mockOrders = [
    { id: "1", produit: "Le Sommeil Profond", prix: 19, date: "08/03/2026", audioUrl: "/audios/sommeil.mp3" },
    { id: "2", produit: "Gestion du Stress", prix: 19, date: "05/03/2026", audioUrl: "/audios/stress.mp3" }
];

const podiaProducts = [
    {
        id: "sommeil",
        title: "Sommeil Profond",
        description: "Retrouvez des nuits paisibles et réparatrices grâce à l'hypnose. Un programme complet pour reprogrammer votre cycle de sommeil.",
        price: 19,
        image: "https://peguycasteloot.podia.com/content-assets/public/eyJhbGciOiJIUzI1NiJ9.eyJvYmplY3Rfa2V5IjoicXJkdno2bm93NjI4cWJjcmNoMmtkejBxNm9xcyIsImRvbWFpbiI6InBlZ3V5Y2FzdGVsb290LnBvZGlhLmNvbSJ9.-2daZfV9ZfAnaDhbsI5JvqGSI5pV3PUtD4tajawsm0A",
        url: "https://peguycasteloot.podia.com/sommeil"
    },
    {
        id: "stress",
        title: "Gestion du Stress",
        description: "Libérez-vous des tensions quotidiennes et retrouvez votre calme intérieur. Apprenez à gérer vos émotions et votre anxiété.",
        price: 19,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
        url: "https://peguycasteloot.podia.com/gestion-du-stress"
    },
    {
        id: "estime",
        title: "Amour & Estime de Soi",
        description: "Renouer avec sa valeur intérieure. Travaillez sur l'amour propre et la libération des croyances limitantes.",
        price: 22,
        image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=800&auto=format&fit=crop",
        url: "https://peguycasteloot.podia.com/amour-et-estime-de-soi"
    },
    {
        id: "energie",
        title: "Retrouver l'Énergie",
        description: "Une séance dynamisante pour sortir de la fatigue chronique. Retrouvez votre vitalité et votre motivation naturelle.",
        price: 22,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        url: "https://peguycasteloot.podia.com/retrouver-l-elegie"
    },
    {
        id: "poids",
        title: "Nutrition & Perte de Poids",
        description: "Reprogrammer ses comportements alimentaires. Réduire les compulsions et retrouver le signal de satiété.",
        price: 24,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
        url: "https://peguycasteloot.podia.com/nutrition-perte-de-poid"
    }
];

const mockRdv = [
    { id: "1", date: "12/03/2026 à 14:00", service: "Hypnose - Première Séance", statut: "confirmé" }
];

export default function MonProfilClient() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<"audios" | "rdv" | "suivi" | "boutique">("audios");
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
    const [audioTimes, setAudioTimes] = useState<Record<string, number>>({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Charger la progression au démarrage
    useEffect(() => {
        const userId = (session?.user as any)?.id;
        if (userId) {
            const saved = localStorage.getItem(`audio-progress-${userId}`);
            if (saved) setAudioTimes(JSON.parse(saved));
        }
    }, [session?.user]);

    // Simulation de lecture audio & Sauvegarde
    useEffect(() => {
        let interval: any;
        if (playingAudio) {
            interval = setInterval(() => {
                setAudioTimes(prev => {
                    const newTime = (prev[playingAudio] || 0) + 1;
                    const updated = { ...prev, [playingAudio]: newTime };
                    const userId = (session?.user as any)?.id;
                    if (userId) {
                        localStorage.setItem(`audio-progress-${userId}`, JSON.stringify(updated));
                    }
                    return updated;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [playingAudio, session?.user]);

    const handlePlay = (audioId: string) => {
        setPlayingAudio(prev => prev === audioId ? null : audioId);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isMounted) return null;

    return (
        <main className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] pt-20 pb-24 relative overflow-hidden" suppressHydrationWarning>
            {/* Ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--theme-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Profil */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8 pb-8 border-b border-[var(--theme-accent)]/10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)]/60 mb-2 block">Tableau de Bord Personnel</span>
                        <h1 className="font-serif-display text-5xl md:text-7xl tracking-tighter">
                            Bonjour, <span className="italic text-[var(--theme-accent)]">{(session?.user as any)?.prenom || session?.user?.name?.split(' ')[0] || "Ami(e)"}</span>
                        </h1>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <MagneticPhoneButton className="scale-90" />
                        <button
                            onClick={() => { import('next-auth/react').then(m => m.signOut({ callbackUrl: '/' })) }}
                            className="p-4 rounded-full bg-[var(--theme-text)]/5 hover:bg-red-500/10 hover:text-red-400 transition-all border border-[var(--theme-text)]/10"
                            title="Se déconnecter"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-2 p-1 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 mb-12 max-w-xl">
                    {[
                        { id: "audios", label: "Mes Audios", icon: Headphones },
                        { id: "boutique", label: "Boutique", icon: ShoppingBag },
                        { id: "rdv", label: "Rendez-vous", icon: Calendar },
                        { id: "suivi", label: "Mon Suivi", icon: BarChart2 }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[10px] uppercase tracking-widest font-black transition-all ${activeTab === tab.id
                                ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] shadow-lg shadow-[var(--theme-accent)]/20"
                                : "text-[var(--theme-text)]/40 hover:text-[var(--theme-text)] hover:bg-[var(--theme-text)]/5"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
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
                        {/* TAB: AUDIOS */}
                        {activeTab === "audios" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockOrders.length > 0 ? (
                                    mockOrders.map((order) => (
                                        <div key={order.id} className="glass-ovni p-8 rounded-[2.5rem] border border-[var(--theme-accent)]/10 hover:border-[var(--theme-accent)]/30 transition-all group relative overflow-hidden">
                                            <div className="flex items-center gap-6">
                                                <button
                                                    onClick={() => handlePlay(order.id)}
                                                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${playingAudio === order.id
                                                        ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] shadow-[0_0_30px_var(--theme-accent)]/50"
                                                        : "bg-[var(--theme-text)]/5 text-[var(--theme-text)] hover:scale-105"
                                                        }`}
                                                >
                                                    {playingAudio === order.id ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
                                                </button>
                                                <div className="flex-1">
                                                    <h3 className="font-serif-display text-2xl mb-1">{order.produit}</h3>
                                                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-[var(--theme-text)]/40 tracking-widest">
                                                        <span>Débloqué le {order.date}</span>
                                                        <span className="w-1 h-1 rounded-full bg-[var(--theme-accent)]" />
                                                        <span className="text-[var(--theme-accent)]">Prêt à l'écoute</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Lecteur Intégré */}
                                            {playingAudio === order.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="mt-8 pt-8 border-t border-[var(--theme-text)]/5"
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-[10px] font-mono opacity-40">{formatTime(audioTimes[order.id] || 0)}</span>
                                                        <div className="flex-1 mx-6 h-1 bg-[var(--theme-text)]/5 rounded-full overflow-hidden relative">
                                                            <div
                                                                className="absolute left-0 top-0 h-full bg-[var(--theme-accent)] transition-all duration-1000"
                                                                style={{ width: `${Math.min(100, ((audioTimes[order.id] || 0) / 2100) * 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-mono opacity-40">35:00</span>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => window.location.href = `mailto:${session?.user?.email}?subject=Lien de mon audio : ${order.produit}`}
                                                            className="text-[10px] uppercase tracking-widest font-black text-[var(--theme-accent)] hover:opacity-70 flex items-center gap-2"
                                                        >
                                                            <Mail className="w-3 h-3" /> Recevoir par mail
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center glass-ovni rounded-[3rem] border border-dashed border-[var(--theme-text)]/10">
                                        <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-[var(--theme-text)]/20" />
                                        <p className="font-sans text-[var(--theme-text)]/40 mb-8">Vous n'avez pas encore d'audios dans votre bibliothèque.</p>
                                        <Link href="/voyage-auditif">
                                            <MagneticButton className="px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-full text-[10px] uppercase font-black tracking-widest">
                                                Explorer la boutique
                                            </MagneticButton>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: BOUTIQUE (PODIA OFFERS) */}
                        {activeTab === "boutique" && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {podiaProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => {
                                                setSelectedOffers(prev =>
                                                    prev.includes(product.id)
                                                        ? prev.filter(id => id !== product.id)
                                                        : [...prev, product.id]
                                                );
                                            }}
                                            className={`glass-ovni rounded-[2.5rem] overflow-hidden border transition-all cursor-pointer group ${selectedOffers.includes(product.id)
                                                ? "border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)]/20 shadow-xl shadow-[var(--theme-accent)]/10"
                                                : "border-[var(--theme-text)]/5 hover:border-[var(--theme-accent)]/30"
                                                }`}
                                        >
                                            <div className="h-48 relative overflow-hidden">
                                                <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-transparent to-transparent opacity-60" />
                                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] text-[10px] font-black uppercase tracking-widest">
                                                    {product.price} €
                                                </div>
                                                {selectedOffers.includes(product.id) && (
                                                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[var(--theme-accent)] flex items-center justify-center text-[var(--theme-bg)] z-10">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-8">
                                                <h3 className="font-serif-display text-2xl mb-2">{product.title}</h3>
                                                <p className="font-sans text-xs text-[var(--theme-text)]/40 font-light leading-relaxed mb-6">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${selectedOffers.includes(product.id) ? "text-[var(--theme-accent)]" : "text-[var(--theme-text)]/20"}`}>
                                                        {selectedOffers.includes(product.id) ? "Sélectionné" : "Ajouter au pack"}
                                                    </span>
                                                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedOffers.includes(product.id) ? "text-[var(--theme-accent)] rotate-90" : "text-[var(--theme-text)]/20"}`} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Checkout Bar */}
                                <AnimatePresence>
                                    {selectedOffers.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 100 }}
                                            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50"
                                        >
                                            <div className="glass-ovni p-6 rounded-[2rem] border border-[var(--theme-accent)]/30 shadow-2xl shadow-black/50 flex items-center justify-between gap-8 backdrop-blur-2xl">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--theme-accent)] mb-1">Votre Sélection</p>
                                                    <h4 className="font-serif-display text-xl">{selectedOffers.length} {selectedOffers.length > 1 ? "articles" : "article"} · {selectedOffers.reduce((acc, id) => acc + (podiaProducts.find(p => p.id === id)?.price || 0), 0)} €</h4>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const firstOffer = podiaProducts.find(p => p.id === selectedOffers[0]);
                                                        if (firstOffer) window.open(firstOffer.url, "_blank");
                                                    }}
                                                    className="px-8 py-4 bg-[var(--theme-accent)] text-[var(--theme-bg)] rounded-2xl font-sans text-[11px] uppercase font-black tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
                                                >
                                                    Finaliser ma commande <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                        {activeTab === "rdv" && (
                            <div className="space-y-4">
                                {mockRdv.map((rdv) => (
                                    <div key={rdv.id} className="glass-ovni p-8 rounded-3xl border border-[var(--theme-text)]/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-seafoam/10 flex items-center justify-center text-seafoam">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif-display text-xl mb-1">{rdv.service}</h3>
                                                <p className="font-sans text-sm text-[var(--theme-text)]/50">{rdv.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" /> {rdv.statut}
                                            </span>
                                            <button className="text-[var(--theme-text)]/30 hover:text-[var(--theme-text)] transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <Link href="/reserver" className="block p-8 rounded-3xl border border-dashed border-[var(--theme-text)]/10 hover:border-[var(--theme-accent)]/30 text-center transition-all group">
                                    <span className="font-sans text-sm text-[var(--theme-text)]/40 group-hover:text-[var(--theme-accent)] transition-colors">+ Réserver une nouvelle séance</span>
                                </Link>
                            </div>
                        )}

                        {/* TAB: SUIVI */}
                        {activeTab === "suivi" && (
                            <div className="space-y-8">
                                <div className="glass-ovni p-10 rounded-[2.5rem] border border-[var(--theme-accent)]/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <CheckCircle2 className="w-24 h-24 text-[var(--theme-accent)]" />
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                        <div>
                                            <span className="px-3 py-1 rounded-full bg-[var(--theme-accent)] text-black text-[10px] uppercase font-black tracking-widest mb-4 inline-block">Dernière étape validée</span>
                                            <h3 className="font-serif-display text-3xl">Première séance effectuée</h3>
                                            <p className="text-[var(--theme-text)]/40 text-sm mt-1">Le 12 Mars 2026 • Cabinet de Lannion</p>
                                        </div>
                                        <MagneticButton
                                            onClick={() => window.open('https://peguycasteloot.fr', '_blank')}
                                            className="px-6 py-3 bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 rounded-xl text-[10px] uppercase font-black tracking-widest"
                                        >
                                            Voir le compte-rendu
                                        </MagneticButton>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-6 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/5">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Rappel Feedback J+1</span>
                                            </div>
                                            <p className="text-xs font-light opacity-80">Un mail vous sera envoyé demain pour recueillir vos premières impressions.</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/5 opacity-50">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Bilan J+7</span>
                                            </div>
                                            <p className="text-xs font-light">Point complet sur l'intégration des suggestions hypnotiques.</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--theme-accent)]">Re-rendez-vous</span>
                                            </div>
                                            <p className="text-xs font-medium text-[var(--theme-accent)]">Pensez à planifier votre séance de consolidation (+15j).</p>
                                        </div>
                                    </div>
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
        </main>
    );
}
