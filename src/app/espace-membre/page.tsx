import MonProfilClient from "./MonProfilClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mon Espace Personnel | Péguy Casteloot",
    description: "Accédez à vos audios d'hypnose, vos rendez-vous et vote suivi personnalisé.",
};

export const dynamic = "force-dynamic";

export default function MonProfilPage() {
    return <MonProfilClient />;
}
