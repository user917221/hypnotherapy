"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar, CheckCircle2, Send } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function ContactClient() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", services: [] as string[] });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submit
        setSubmitted(true);
    };

    const services = ["Hypnothérapie", "Sophrologie", "Équilibre IG Bas", "Voyage Auditif", "Je ne sais pas encore"];

    return (
        <main className="min-h-screen text-[var(--theme-text)] pt-32 pb-24 relative overflow-hidden">
            {/* Grain Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--theme-accent-alt)]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24 px-4"
                >
                    <span className="inline-block py-1 px-4 mb-6 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5 text-[var(--theme-accent)] text-xs md:text-sm font-medium tracking-wide">
                        Premier Contact
                    </span>
                    <h1 className="font-serif-display text-5xl sm:text-6xl md:text-8xl tracking-tighter mb-6 md:mb-8 text-[var(--theme-text)]">
                        Prenons <span className="italic text-[var(--theme-accent)]">Rendez-Vous</span>
                    </h1>
                    <p className="font-sans text-lg sm:text-xl font-light opacity-80 max-w-2xl mx-auto leading-relaxed">
                        Chaque transformation commence par une conversation. Décrivez-moi ce que vous traversez, je vous répondrai sous 24h.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="glass-ovni p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-8">
                            <h2 className="font-serif-display text-3xl italic text-[var(--theme-text)]">Informations</h2>

                            <div className="space-y-6">
                                {[
                                    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "contact@peguycasteloot.fr", href: "mailto:contact@peguycasteloot.fr" },
                                    { icon: <Phone className="w-5 h-5" />, label: "Téléphone", value: "07 49 31 05 90", href: "tel:0749310590" },
                                    { icon: <MapPin className="w-5 h-5" />, label: "Cabinet", value: "1 bis Rue de la Madeleine\n22300 Lannion", href: null },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 items-start group">
                                        <div className="w-12 h-12 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] shrink-0 group-hover:scale-110 group-hover:bg-[var(--theme-accent)]/20 transition-all duration-300">
                                            {item.icon}
                                        </div>
                                        <div className="pt-1">
                                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[var(--theme-text)]/40 mb-1.5">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="font-sans text-sm md:text-base font-medium text-[var(--theme-text)]/90 hover:text-[var(--theme-accent)] transition-colors whitespace-pre-line">{item.value}</a>
                                            ) : (
                                                <p className="font-sans text-sm md:text-base font-medium text-[var(--theme-text)]/90 whitespace-pre-line">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendly CTA */}
                        <div className="glass-ovni p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center mb-6">
                                <Calendar className="w-8 h-8 text-[var(--theme-accent)]" />
                            </div>
                            <h3 className="font-serif-display text-2xl italic mb-4">Préférez la réservation directe ?</h3>
                            <p className="font-sans text-sm md:text-base font-light opacity-80 mb-8 max-w-[250px]">Choisissez un créneau en ligne, immédiatement.</p>
                            <MagneticButton className="w-full">
                                <a
                                    href="https://calendly.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-6 py-4 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-[10px] md:text-xs tracking-[0.2em] uppercase hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[var(--theme-accent)]/20"
                                >
                                    Réserver sur Calendly
                                </a>
                            </MagneticButton>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="lg:col-span-3"
                    >
                        {submitted ? (
                            <div className="glass-ovni p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                >
                                    <CheckCircle2 className="w-16 h-16 text-[var(--theme-accent)] mb-6 mx-auto" />
                                </motion.div>
                                <h2 className="font-serif-display text-3xl italic mb-4 text-[var(--theme-text)]">Message envoyé !</h2>
                                <p className="font-sans font-light opacity-70 max-w-sm leading-relaxed">
                                    Je vous réponds sous 24h. En attendant, prenez soin de vous.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-ovni p-8 md:p-12 rounded-[2.5rem] space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField label="Votre prénom *" id="name" type="text" placeholder="Sophie" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
                                    <FormField label="Email *" id="email" type="email" placeholder="sophie@email.fr" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
                                </div>
                                <FormField label="Téléphone" id="phone" type="tel" placeholder="06 00 00 00 00" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />

                                {/* Service selector */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--theme-text)]/50 mb-4">Ce qui m'intéresse</label>
                                    <div className="flex flex-wrap gap-3">
                                        {services.map(s => {
                                            const isSelected = form.services.includes(s);
                                            return (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => {
                                                        setForm(f => {
                                                            const newServices = f.services.includes(s)
                                                                ? f.services.filter(srv => srv !== s)
                                                                : [...f.services, s];
                                                            // Limit to a reasonable amount, e.g. 3 max to avoid picking all
                                                            return { ...f, services: newServices.slice(0, 3) };
                                                        });
                                                    }}
                                                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${isSelected
                                                        ? "bg-[var(--theme-accent)] text-[var(--theme-bg)] border-[var(--theme-accent)] shadow-[0_0_15px_color-mix(in_srgb,var(--theme-accent)_40%,transparent)]"
                                                        : "border-[var(--theme-text)]/20 text-[var(--theme-text)]/70 hover:border-[var(--theme-accent)]/50 hover:bg-[var(--theme-accent)]/5"}`}
                                                >
                                                    {s}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--theme-text)]/50 mb-2">Votre message *</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        required
                                        placeholder="Décrivez-moi ce que vous traversez..."
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        className="w-full bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 focus:border-[var(--theme-accent)]/50 rounded-2xl px-5 py-4 font-sans text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="flex justify-center w-full mt-8">
                                    <MagneticButton type="submit" fullWidth>
                                        <div className="w-full px-8 py-5 md:py-6 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase flex items-center justify-center gap-4 md:gap-6 hover:brightness-110 transition-all shadow-xl shadow-[var(--theme-accent)]/30">
                                            <span>Envoyer mon message</span> <Send className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    </MagneticButton>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

function FormField({ label, id, type, placeholder, value, onChange, required }: {
    label: string; id: string; type: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--theme-text)]/50 mb-3 ml-1">{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-[var(--theme-text)]/[0.03] border border-[var(--theme-text)]/10 focus:border-[var(--theme-accent)]/50 focus:bg-[var(--theme-text)]/[0.05] rounded-[1.5rem] px-6 py-4 font-sans text-sm md:text-base text-[var(--theme-text)] placeholder:text-[var(--theme-text)]/30 outline-none transition-all shadow-inner"
            />
        </div>
    );
}
