import VoyageAuditifClient from "./VoyageAuditifClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voyage Auditif — Audios d'Hypnose | Péguy Casteloot",
    description: "Bibliothèque d'audios d'hypnose pour le sommeil, l'anxiété et la confiance. Ma voix vous accompagne partout. ⭐ 4.9/5.",
    openGraph: {
        title: "Voyage Auditif — Audios d'Hypnose | Péguy Casteloot",
        description: "Fermez les yeux. Branchez vos écouteurs. Accédez à vos séances d'hypnose guidées en illimité.",
        images: [{ url: "/og-auditif.jpg" }],
    }
};

export default function VoyageAuditifPage() {
    return <VoyageAuditifClient />;
}
