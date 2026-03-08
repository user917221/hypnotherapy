"use client";

import { useEffect } from "react";

export function LemonSqueezyLoader() {
    useEffect(() => {
        // Le script natif recommandé par Lemon Squeezy pour créer l'overlay au clic
        const script = document.createElement("script");
        script.src = "https://app.lemonsqueezy.com/js/lemon.js";
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup si nécessaire
            const existingScript = document.head.querySelector("script[src='https://app.lemonsqueezy.com/js/lemon.js']");
            if (existingScript) existingScript.remove();
        };
    }, []);

    // Initialisation du SDK Lemon Squeezy pour intercepter les clics
    useEffect(() => {
        if (typeof window !== "undefined") {
            const lsWindow = window as any;
            lsWindow.lemonSqueezy?.Setup({
                eventHandler: (event: any) => {
                    console.log("Lemon Squeezy Event:", event);
                    // On peut écouter "Checkout.Success" pour rafraîchir la page ou afficher un feu d'artifice
                }
            });
        }
    }, []);

    return null; // Composant invisible qui charge juste le script
}
