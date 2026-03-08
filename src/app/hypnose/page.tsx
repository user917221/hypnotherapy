import type { Metadata } from "next";
import HypnoseJourneyClient from "@/app/hypnose/HypnoseJourneyClient";

export const metadata: Metadata = {
    title: "Hypnothérapie — Péguy Casteloot",
    description: "Séances d'hypnothérapie à Lannion et à distance. Tabac, anxiété, sommeil, traumas... Péguy Casteloot vous guide vers votre transformation profonde dès la 1ère séance.",
    openGraph: {
        title: "Hypnothérapie — Péguy Casteloot",
        description: "Stop tabac, anxiété, sommeil, confiance en soi. Séances d'hypnose à Lannion ou à distance.",
        locale: "fr_FR",
    }
};

export default function HypnosePage() {
    return <HypnoseJourneyClient />;
}
