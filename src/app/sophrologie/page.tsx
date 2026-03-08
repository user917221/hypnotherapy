import SophrologieClient from "./SophrologieClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sophrologie — Ancrage Corps & Esprit | Péguy Casteloot",
    description: "Retrouvez calme et équilibre avec la sophrologie à Lannion. Gestion du stress, sommeil, confiance en soi. ⭐ 4.9/5 (87 avis).",
    openGraph: {
        title: "Sophrologie — Ancrage Corps & Esprit | Péguy Casteloot",
        description: "Anxiété, stress, sommeil : retrouvez l'ancrage et le calme intérieur avec la sophrologie à Lannion ou à distance.",
        images: [{ url: "/og-sophro.jpg" }],
    }
};

export default function SophrologiePage() {
    return <SophrologieClient />;
}
