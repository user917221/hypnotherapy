import type { Metadata } from "next";
import CarteCadeauClient from "./CarteCadeauClient";

export const metadata: Metadata = {
    title: "Carte Cadeau Bien-être | Offrez de l'Hypnose ou Sophrologie",
    description: "Offrez une transformation durable à vos proches. Carte cadeau pour séances d'hypnose, sophrologie ou nutrition IG Bas à Lannion et à distance.",
    openGraph: {
        title: "Carte Cadeau Bien-être | Péguy Casteloot",
        description: "Le cadeau qui change une vie. Offrez des séances d'hypnose ou de sophrologie à Lannion.",
        images: [{ url: "/og-gift.jpg" }],
    }
};

export default function CarteCadeauPage() {
    return <CarteCadeauClient />;
}
