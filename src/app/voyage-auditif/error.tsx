"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function VoyageAuditifError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Voyage auditif error:", error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-md">
                <h2 className="font-serif-display italic text-4xl text-[var(--theme-text)] mb-4">
                    Oups, un souci technique
                </h2>
                <p className="font-sans text-[var(--theme-text)]/50 font-light mb-8">
                    La bibliotheque audio rencontre un probleme temporaire.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="px-8 py-3 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        Reessayer
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-full border border-[var(--theme-accent)]/30 text-[var(--theme-text)] font-sans font-bold text-sm uppercase tracking-widest hover:bg-[var(--theme-accent)]/10 transition-all"
                    >
                        Accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
