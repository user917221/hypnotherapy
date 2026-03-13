import type { Metadata } from "next";
import HypnoseJourneyClient from "@/app/hypnose/HypnoseJourneyClient";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Hypnothérapie — Péguy Casteloot",
    description: "Séances d'hypnothérapie à Lannion et à distance. Tabac, anxiété, sommeil, traumas... Péguy Casteloot vous guide vers votre transformation profonde dès la 1ère séance.",
    openGraph: {
        title: "Hypnothérapie — Péguy Casteloot",
        description: "Stop tabac, anxiété, sommeil, confiance en soi. Séances d'hypnose à Lannion ou à distance.",
        locale: "fr_FR",
    }
};

const hypnoseFAQ = [
    {
        question: "Qu'est-ce que l'hypnose thérapeutique ?",
        answer: "L'hypnose thérapeutique (ou hypnothérapie) est un état modifié de conscience naturel qui permet d'accéder à l'inconscient pour traiter des blocages émotionnels, des comportements limitants ou des douleurs. Ce n'est pas du sommeil ni de la perte de contrôle : vous restez conscient et acteur de votre séance.",
    },
    {
        question: "Combien de séances d'hypnose faut-il ?",
        answer: "La plupart des problématiques se traitent en 1 à 3 séances. L'arrêt du tabac se fait généralement en une seule séance. Pour les traumas profonds ou l'anxiété chronique, un accompagnement de 3 à 5 séances peut être recommandé. Chaque parcours est personnalisé.",
    },
    {
        question: "L'hypnose est-elle dangereuse ?",
        answer: "Non, l'hypnose thérapeutique est sans danger. Vous ne pouvez pas rester « bloqué » en hypnose. C'est un état naturel que vous vivez plusieurs fois par jour (quand vous êtes absorbé dans un film ou perdu dans vos pensées). Le thérapeute vous guide, mais vous gardez le contrôle à tout moment.",
    },
    {
        question: "Comment se déroule une séance d'hypnose à Lannion ?",
        answer: "La séance dure environ 1h. Elle commence par un échange approfondi pour comprendre votre problématique, puis Péguy vous guide dans un état de relaxation profonde pour travailler avec votre inconscient. Vous repartez avec des outils concrets et un enregistrement audio personnalisé.",
    },
    {
        question: "Peut-on faire une séance d'hypnose à distance ?",
        answer: "Oui, les séances en visioconférence sont tout aussi efficaces. De nombreux clients sont accompagnés à distance avec d'excellents résultats. Tout ce dont vous avez besoin est un endroit calme, un casque audio et une connexion internet stable.",
    },
];

export default function HypnosePage() {
    return (
        <>
            <FAQSchema items={hypnoseFAQ} />
            <Breadcrumbs items={[{ label: "Hypnothérapie", href: "/hypnose" }]} />
            <HypnoseJourneyClient />
        </>
    );
}
