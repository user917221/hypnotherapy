import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voyage Auditif — Bibliothèque Audio | Péguy Casteloot",
    description: "Explorez notre bibliothèque de séances audio d'hypnose guidée. Confiance, sommeil, anti-stress... Des voyages sonores pour vous transformer où vous êtes.",
    openGraph: {
        title: "Voyage Auditif — Bibliothèque Audio | Péguy Casteloot",
        description: "Séances d'hypnose audio guidée : confiance, sommeil, anti-stress. Transformez-vous où vous êtes.",
        locale: "fr_FR",
    }
};

export default function VoyageAuditifLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
