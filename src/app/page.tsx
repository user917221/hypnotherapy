import HeroCinematic from "../components/HeroCinematic";
import InfiniteMarquee from "../components/InfiniteMarquee";
import FeaturesDashboard from "../components/FeaturesDashboard";
import PhilosophyManifesto from "../components/PhilosophyManifesto";
import ProtocolStack from "../components/ProtocolStack";
import TypewriterReviews from "../components/TypewriterReviews";
import FooterImmersif from "../components/FooterImmersif";

export default function Home() {
  return (
    <main className="relative min-h-screen">

      {/* Hero Impact OVNI */}
      <HeroCinematic />

      {/* Bandeau de bénéfices infini */}
      <InfiniteMarquee />

      {/* Expérience Interactive & Dashboard */}
      <FeaturesDashboard />

      {/* Philosophie & Efficacité dès la 1ère séance */}
      <PhilosophyManifesto />

      {/* Protocoles & Accompagnement */}
      <ProtocolStack />

      {/* Témoignages Clients (Déplacés depuis Sophrologie) */}
      <TypewriterReviews />

      {/* Footer Immersif Monumental */}
      <FooterImmersif />
    </main>
  );
}
