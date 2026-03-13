import dynamic from "next/dynamic";
import HeroCinematic from "../components/HeroCinematic";
import InfiniteMarquee from "../components/InfiniteMarquee";

const FeaturesDashboard = dynamic(() => import("../components/FeaturesDashboard"), {
  loading: () => <SectionPlaceholder />,
});
const PhilosophyManifesto = dynamic(() => import("../components/PhilosophyManifesto"), {
  loading: () => <SectionPlaceholder />,
});
const ProtocolStack = dynamic(() => import("../components/ProtocolStack"), {
  ssr: false,
  loading: () => <SectionPlaceholder />,
});
const TypewriterReviews = dynamic(() => import("../components/TypewriterReviews"), {
  loading: () => <SectionPlaceholder />,
});
const FooterImmersif = dynamic(() => import("../components/FooterImmersif"), {
  loading: () => <SectionPlaceholder height="h-[50vh]" />,
});

function SectionPlaceholder({ height = "h-[80vh]" }: { height?: string }) {
  return (
    <div className={`${height} w-full flex items-center justify-center`}>
      <div className="w-12 h-12 rounded-full border-2 border-[var(--theme-accent)]/20 border-t-[var(--theme-accent)] animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <HeroCinematic />
      <InfiniteMarquee />
      <FeaturesDashboard />
      <PhilosophyManifesto />
      <ProtocolStack />
      <TypewriterReviews />
      <FooterImmersif />
    </main>
  );
}
