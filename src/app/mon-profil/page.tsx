"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Headphones, Calendar, ShoppingBag, BarChart2, Play, ChevronRight, Clock, CheckCircle, AlertCircle, ArrowLeft, User } from "lucide-react";

const tabs = [
    { id: "audios", label: "Mes Audios", icon: <Headphones className="w-4 h-4" /> },
    { id: "rdv", label: "Mes Rendez-vous", icon: <Calendar className="w-4 h-4" /> },
    { id: "commandes", label: "Commandes", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "suivi", label: "Mon Suivi", icon: <BarChart2 className="w-4 h-4" /> },
];

// Demo data
const myAudios = [
    { title: "Le Sommeil Profond", duration: "35 min", progress: 100, tag: "Sommeil", podiaUrl: "https://peguycasteloot.podia.com/sommeil" },
    { title: "Gestion du Stress", duration: "40 min", progress: 65, tag: "Stress & Anxiété", podiaUrl: "https://peguycasteloot.podia.com/gestion-du-stress" },
];

const myRdv = [
    { date: "Mardi 12 Mars 2026", heure: "10h00", service: "Hypnothérapie", statut: "confirmé", calendlyUrl: "https://calendly.com" },
    { date: "Jeudi 27 Mars 2026", heure: "14h30", service: "Sophrologie", statut: "à venir", calendlyUrl: "https://calendly.com" },
];

const myOrders = [
    { date: "05 Mars 2026", item: "Le Sommeil Profond", prix: "19 €", statut: "payé" },
    { date: "01 Mars 2026", item: "Gestion du Stress", prix: "19 €", statut: "payé" },
];

const suiviData = [
    { semaine: "S1", score: 5 },
    { semaine: "S2", score: 6 },
    { semaine: "S3", score: 7 },
    { semaine: "S4", score: 8 },
    { semaine: "S5", score: 8 },
    { semaine: "S6", score: 9 },
];

export default function MonProfilPage() {
    const [activeTab, setActiveTab] = useState("audios");

    return (
        <main className="min-h-screen text-[var(--theme-text)] pt-28 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--theme-accent)]/6 rounded-full blur-[130px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex items-start justify-between mb-12">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-3xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--theme-accent)]/70 font-sans mb-1">Mon Espace</p>
                            <h1 className="font-serif-display text-3xl md:text-4xl text-[var(--theme-text)]">Bonjour, Marie 👋</h1>
                            <p className="font-sans text-sm text-[var(--theme-text)]/40">membre depuis Mars 2026</p>
                        </div>
                    </div>
                    <Link href="/bibliotheque" className="hidden md:inline-flex items-center gap-2 text-sm font-sans text-[var(--theme-text)]/40 hover:text-[var(--theme-text)]/70 transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Bibliothèque
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-sans text-sm font-medium border transition-all duration-300 ${activeTab === tab.id
                                ? "bg-[var(--theme-accent)]/10 border-[var(--theme-accent)]/40 text-[var(--theme-text)]"
                                : "border-[var(--theme-text)]/10 text-[var(--theme-text)]/40 hover:text-[var(--theme-text)]/70"
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* AUDIOS */}
                        {activeTab === "audios" && (
                            <div className="space-y-4">
                                <p className="font-sans text-sm text-[var(--theme-text)]/40 mb-6">Vos programmes audio achetés. Accédez-y depuis Podia.</p>
                                {myAudios.map((a, i) => (
                                    <div key={i} className="glass-ovni p-6 rounded-[2rem] flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                                            <Play className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-serif-display text-xl text-[var(--theme-text)]">{a.title}</h3>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-sans font-bold">{a.tag}</span>
                                            </div>
                                            <p className="font-sans text-xs text-[var(--theme-text)]/40 mb-3">{a.duration}</p>
                                            <div className="h-1.5 w-full bg-[var(--theme-text)]/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-[var(--theme-accent)] rounded-full" style={{ width: `${a.progress}%` }} />
                                            </div>
                                            <p className="text-[10px] font-sans text-[var(--theme-text)]/30 mt-1">{a.progress}% écouté</p>
                                        </div>
                                        <a href={a.podiaUrl} target="_blank" rel="noopener noreferrer"
                                            className="px-5 py-2.5 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-bold text-sm hover:opacity-90 hover:scale-105 transition-all shrink-0">
                                            Écouter
                                        </a>
                                    </div>
                                ))}
                                <Link href="/bibliotheque" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-dashed border-[var(--theme-text)]/15 text-[var(--theme-text)]/40 font-sans text-sm hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-text)]/70 transition-all mt-2 w-full justify-center">
                                    + Découvrir d'autres programmes
                                </Link>
                            </div>
                        )}

                        {/* RDV */}
                        {activeTab === "rdv" && (
                            <div className="space-y-4">
                                <p className="font-sans text-sm text-[var(--theme-text)]/40 mb-6">Gérez et décalez vos rendez-vous avec Péguy.</p>
                                {myRdv.map((rdv, i) => (
                                    <div key={i} className="glass-ovni p-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                <h3 className="font-serif-display text-xl text-[var(--theme-text)]">{rdv.service}</h3>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-bold flex items-center gap-1 ${rdv.statut === "confirmé"
                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                    : "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]"
                                                    }`}>
                                                    {rdv.statut === "confirmé" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {rdv.statut}
                                                </span>
                                            </div>
                                            <p className="font-sans text-sm text-[var(--theme-text)]/50">{rdv.date} à {rdv.heure}</p>
                                        </div>
                                        <a href={rdv.calendlyUrl} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-[var(--theme-text)]/15 text-[var(--theme-text)]/60 font-sans font-medium text-sm hover:border-[var(--theme-accent)]/40 hover:text-[var(--theme-text)] transition-all shrink-0">
                                            Décaler <ChevronRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                ))}
                                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-sm tracking-wide uppercase hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[var(--theme-accent)]/20 mt-2">
                                    <Calendar className="w-4 h-4" /> Prendre un nouveau rendez-vous
                                </a>
                            </div>
                        )}

                        {/* COMMANDES */}
                        {activeTab === "commandes" && (
                            <div>
                                <p className="font-sans text-sm text-[var(--theme-text)]/40 mb-6">Historique de vos achats.</p>
                                <div className="glass-ovni rounded-[2rem] overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[var(--theme-text)]/10">
                                                <th className="text-left p-5 text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans">Date</th>
                                                <th className="text-left p-5 text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans">Programme</th>
                                                <th className="text-left p-5 text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans">Prix</th>
                                                <th className="text-left p-5 text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/30 font-sans">Statut</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myOrders.map((order, i) => (
                                                <tr key={i} className="border-b border-[var(--theme-text)]/5 last:border-0 hover:bg-[var(--theme-text)]/3 transition-colors">
                                                    <td className="p-5 font-sans text-sm text-[var(--theme-text)]/50">{order.date}</td>
                                                    <td className="p-5 font-sans text-sm font-medium text-[var(--theme-text)]">{order.item}</td>
                                                    <td className="p-5 font-serif-display text-[var(--theme-accent)]">{order.prix}</td>
                                                    <td className="p-5">
                                                        <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold font-sans">
                                                            <CheckCircle className="w-3 h-3" /> {order.statut}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* SUIVI */}
                        {activeTab === "suivi" && (
                            <div className="space-y-6">
                                <p className="font-sans text-sm text-[var(--theme-text)]/40">Votre bien-être semaine après semaine.</p>
                                <div className="glass-ovni p-8 rounded-[2rem]">
                                    <h3 className="font-serif-display text-2xl text-[var(--theme-text)] mb-6">Score de bien-être / 10</h3>
                                    <div className="flex items-end gap-4 h-40">
                                        {suiviData.map((d, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                <span className="font-sans text-xs font-bold text-[var(--theme-accent)]">{d.score}</span>
                                                <div
                                                    className="w-full rounded-t-xl transition-all duration-700"
                                                    style={{
                                                        height: `${(d.score / 10) * 100}%`,
                                                        background: `var(--theme-accent)`,
                                                        opacity: 0.6 + (d.score / 10) * 0.4,
                                                    }}
                                                />
                                                <span className="font-sans text-[10px] text-[var(--theme-text)]/30">{d.semaine}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Séances écoutées", value: "2", sub: "programmes audio" },
                                        { label: "Progression moy.", value: "+80%", sub: "en 6 semaines" },
                                        { label: "Prochain RDV", value: "12 Mars", sub: "10h00" },
                                    ].map((stat, i) => (
                                        <div key={i} className="glass-ovni p-6 rounded-2xl text-center">
                                            <p className="font-serif-display text-3xl text-[var(--theme-accent)] mb-1">{stat.value}</p>
                                            <p className="font-sans text-xs font-bold text-[var(--theme-text)]/60">{stat.label}</p>
                                            <p className="font-sans text-[10px] text-[var(--theme-text)]/30">{stat.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
