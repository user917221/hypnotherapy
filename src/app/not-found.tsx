import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--theme-bg)]">
            <div className="max-w-xl mx-auto">
                <h1 className="font-serif-display italic text-8xl md:text-[12rem] text-[var(--theme-accent)] leading-none mb-4">
                    404
                </h1>
                <h2 className="font-serif-display italic text-3xl md:text-5xl text-[var(--theme-text)] mb-6 tracking-tight">
                    Page introuvable
                </h2>
                <p className="font-sans text-lg text-[var(--theme-text)]/50 font-light mb-12 max-w-md mx-auto leading-relaxed">
                    Cette page n'existe pas ou a ete deplacee. Revenez vers un espace familier.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="px-10 py-4 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-black text-xs tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-lg shadow-[var(--theme-accent)]/20"
                    >
                        Retour a l'accueil
                    </Link>
                    <Link
                        href="/contact"
                        className="px-10 py-4 rounded-full border border-[var(--theme-accent)]/30 text-[var(--theme-text)] font-sans font-bold text-xs tracking-[0.2em] uppercase hover:bg-[var(--theme-accent)]/10 transition-all"
                    >
                        Me contacter
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-12 font-sans text-[10px] text-[var(--theme-text)]/20 uppercase tracking-[0.3em]">
                Peguy Casteloot — Hypnose & Sophrologie
            </div>
        </main>
    );
}
