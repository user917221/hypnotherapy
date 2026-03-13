import SophrologieClient from "./SophrologieClient";
import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Sophrologie — Ancrage Corps & Esprit | Péguy Casteloot",
    description: "Retrouvez calme et équilibre avec la sophrologie à Lannion. Gestion du stress, sommeil, confiance en soi. ⭐ 4.9/5 (87 avis).",
    openGraph: {
        title: "Sophrologie — Ancrage Corps & Esprit | Péguy Casteloot",
        description: "Anxiété, stress, sommeil : retrouvez l'ancrage et le calme intérieur avec la sophrologie à Lannion ou à distance.",
        images: [{ url: "/og-sophro.jpg" }],
    }
};

const sophrologieFAQ = [
    {
        question: "Quelle est la différence entre sophrologie et hypnose ?",
        answer: "La sophrologie travaille sur la conscience du corps et de la respiration via des exercices actifs (relaxation dynamique, visualisation, respiration dirigée). L'hypnose agit plus profondément sur l'inconscient. Les deux approches sont complémentaires et Péguy les combine souvent pour un accompagnement optimal.",
    },
    {
        question: "Combien de séances de sophrologie faut-il pour voir des résultats ?",
        answer: "Des effets se ressentent dès la première séance (détente, lâcher-prise). Un accompagnement typique comprend 5 à 8 séances pour installer durablement les changements. Chaque séance vous donne des outils à pratiquer en autonomie entre les rendez-vous.",
    },
    {
        question: "La sophrologie aide-t-elle vraiment contre le stress et l'anxiété ?",
        answer: "Oui, c'est l'une des indications principales de la sophrologie. Elle agit sur le système nerveux autonome en réduisant le cortisol et en activant le parasympathique. Les techniques de respiration et de visualisation sont scientifiquement validées pour réduire le stress, améliorer le sommeil et renforcer la confiance en soi.",
    },
    {
        question: "Comment se déroule une séance de sophrologie ?",
        answer: "La séance dure environ 1h. Elle alterne entre des exercices debout ou assis (respiration, mouvements doux, relaxation dynamique) et des phases de visualisation guidée allongé. Aucun contact physique, vous restez habillé. Péguy adapte chaque séance à vos besoins du moment.",
    },
];

export default function SophrologiePage() {
    return (
        <>
            <FAQSchema items={sophrologieFAQ} />
            <Breadcrumbs items={[{ label: "Sophrologie", href: "/sophrologie" }]} />
            <SophrologieClient />
        </>
    );
}
