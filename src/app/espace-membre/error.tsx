"use client";

import { useEffect } from "react";

export default function EspaceMembreError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Espace membre error:", error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-md">
                <h2 className="font-serif-display italic text-4xl text-[var(--theme-text)] mb-4">
                    Une erreur est survenue
                </h2>
                <p className="font-sans text-[var(--theme-text)]/50 font-light mb-8">
                    Impossible de charger votre espace membre. Veuillez reessayer.
                </p>
                <button
                    onClick={reset}
                    className="px-8 py-3 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] font-sans font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                >
                    Reessayer
                </button>
            </div>
        </div>
    );
}
