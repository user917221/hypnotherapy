import IgBasClient from "./IgBasClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "IG Bas — Équilibre Nutritionnel | Péguy Casteloot",
    description: "Mincir durablement avec la méthode IG Bas et l'hypnose à Lannion. Dites adieu aux compulsions alimentaires et au sucre. ⭐ 4.9/5.",
    openGraph: {
        title: "IG Bas — Équilibre Nutritionnel | Péguy Casteloot",
        description: "L'alliance puissante de la nutrition IG Bas et de l'hypnose pour transformer votre silhouette durablement.",
        images: [{ url: "/og-igbas.jpg" }],
    }
};

export default function IgBasPage() {
    return <IgBasClient />;
}
