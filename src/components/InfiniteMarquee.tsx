"use client";

const benefits = [
    "Stop tabac · 1 séance",
    "Sommeil profond retrouvé",
    "Fini le grignotage du soir",
    "Anxiété apaisée durablement",
    "−12 kg sans régime",
    "Confiance en soi reconstruite",
    "Libération des traumas silencieux",
    "Doux détachement du sucre",
    "Dérouler les nœuds intérieurs",
    "Dialogue avec l'inconscient",
    "Sophrologie · Ancrage immédiat",
    "Un cocon à Lannion & partout",
];

export default function InfiniteMarquee() {
    return (
        <section className="py-10 bg-[var(--theme-bg)] text-[var(--theme-text)] overflow-hidden border-y border-[var(--theme-text)]/5 select-none relative z-10">
            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="animate-marquee-seamless flex gap-16 items-center">
                    {[...benefits, ...benefits].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] opacity-40 shrink-0" />
                            <span className="font-serif-display italic text-2xl md:text-4xl tracking-tighter text-[var(--theme-text)]/80 hover:text-[var(--theme-accent)] transition-colors duration-700 cursor-default">
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

