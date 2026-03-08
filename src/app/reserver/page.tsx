import CalendlyWidget from "./CalendlyWidget";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prendre Rendez-Vous | Péguy Casteloot",
    description: "Réservez votre séance d'hypnose ou de sophrologie à Lannion ou en visioconférence directement en ligne.",
};

export default function ReserverPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[var(--theme-bg)]">
            {/* Grain Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-12">
                <h1 className="font-serif-display text-4xl md:text-6xl tracking-tighter text-[var(--theme-text)] mb-6">
                    Prendre <span className="text-[var(--theme-accent)] italic">Rendez-Vous</span>
                </h1>
                <p className="font-sans text-lg text-[var(--theme-text)]/60 font-light max-w-2xl mx-auto">
                    Sélectionnez le créneau qui vous convient pour une consultation au cabinet à Lannion ou en visioconférence.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Info & Map Column */}
                    <div className="lg:col-span-2 flex flex-col h-full min-h-[500px]">
                        <div className="glass-ovni p-8 rounded-[2.5rem] flex-grow flex flex-col bg-[var(--theme-text)]/5 backdrop-blur-md">
                            <h2 className="font-serif-display text-3xl italic mb-6 text-[var(--theme-text)]">Le Cabinet</h2>
                            <p className="font-sans font-light opacity-80 mb-8 max-w-[200px] leading-relaxed">
                                1 bis Rue de la Madeleine<br />
                                22300 Lannion
                            </p>

                            <div className="flex-grow w-full rounded-[1.5rem] overflow-hidden relative border border-[var(--theme-accent)]/20 mb-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.4975549072975!2d-3.465191023758253!3d48.73030297131821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48122ce9cbefc2e3%3A0xcf82ad3ff3fc345a!2s1%20Bis%20Rue%20de%20la%20Madeleine%2C%2022300%20Lannion!5e0!3m2!1sfr!2sfr!4v1714000000000!5m2!1sfr!2sfr"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0, filter: "grayscale(100%) invert(90%) hue-rotate(180deg) opacity(80%)" }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                            <a
                                href="https://maps.app.goo.gl/p7tx93TzHm6GVheE6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-5 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs md:text-sm text-center hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl shadow-[var(--theme-accent)]/20 flex items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <MapPin className="w-4 h-4 relative z-10" /> <span className="relative z-10">Ouvrir dans Maps</span>
                            </a>
                        </div>
                    </div>

                    {/* Calendly Column */}
                    <div className="lg:col-span-3">
                        <div className="glass-ovni rounded-[2.5rem] p-2 md:p-6 border border-[var(--theme-text)]/10 backdrop-blur-sm">
                            <CalendlyWidget />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
