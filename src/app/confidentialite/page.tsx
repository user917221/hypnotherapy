import type { Metadata } from "next";
import ConfidentialiteClient from "./ConfidentialiteClient";

export const metadata: Metadata = {
    title: "Politique de Confidentialité | Péguy Casteloot",
    description: "Protection de vos données personnelles et respect de votre vie privée. Péguy Casteloot.",
    robots: { index: false }
};

export default function ConfidentialitePage() {
    return <ConfidentialiteClient />;
}
