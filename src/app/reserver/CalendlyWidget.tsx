"use client";

import { InlineWidget } from "react-calendly";
import { useEffect, useState } from "react";

export default function CalendlyWidget() {
    // Évite les erreurs d'hydratation (le widget a besoin du DOM)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-[700px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-[700px] rounded-t-[2.25rem] rounded-b-[2.5rem] overflow-hidden relative border border-white/10 shadow-inner">
            <InlineWidget
                // URL DE TEST : À REMPLACER PAR LE LIEN DE PÉGUY QUAND IL SERA FOURNI
                url="https://calendly.com/peguy-casteloot"
                styles={{
                    height: "100%",
                    width: "100%",
                }}
                pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '00483d',
                    textColor: '333333'
                }}
            />
        </div>
    );
}
