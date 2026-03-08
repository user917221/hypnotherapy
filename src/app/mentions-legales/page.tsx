import type { Metadata } from "next";
import MentionsLegalesClient from "./MentionsLegalesClient";

export const metadata: Metadata = {
    title: "Mentions Légales | Péguy Casteloot",
    description: "Informations légales concernant l'activité de Péguy Casteloot, hypnothérapeute et sophrologue à Lannion.",
    robots: { index: false } // No need to index legal pages intensely, but allowed
};

export default function MentionsLegalesPage() {
    return <MentionsLegalesClient />;
}
