import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact & Rendez-vous | Hypnose & Sophrologie Lannion",
    description: "Prenez rendez-vous avec Péguy Casteloot à Lannion ou à distance. Hypnothérapie, sophrologie et nutrition IG Bas. Réponse sous 24h. ⭐ 4.9/5.",
    openGraph: {
        title: "Contact & Rendez-vous | Péguy Casteloot",
        description: "Une question ? Envie d'entamer votre transformation ? Contactez-moi directement ou réservez votre créneau.",
        images: [{ url: "/og-contact.jpg" }],
    }
};

export default function ContactPage() {
    return <ContactClient />;
}
