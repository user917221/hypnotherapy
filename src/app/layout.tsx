import type { Metadata, Viewport } from "next";
import { Poppins, Instrument_Serif, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingNavbar from "@/components/FloatingNavbar";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peguycasteloot.fr";

export const viewport: Viewport = {
  themeColor: "#00483d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Péguy Casteloot | Hypnose & Sophrologie à Lannion",
    template: "%s | Péguy Casteloot",
  },
  description: "Cabinet de bien-être à Lannion. Hypnothérapie, sophrologie, équilibre nutritionnel IG Bas. Séances en cabinet et à distance. ⭐ 4.9/5 sur Google (87 avis).",
  keywords: ["hypnose Lannion", "sophrologie Lannion", "hypnothérapie Bretagne", "arrêter de fumer hypnose", "stress anxiété", "perte de poids hypnose", "Péguy Casteloot"],
  authors: [{ name: "Péguy Casteloot", url: siteUrl }],
  creator: "Péguy Casteloot",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Péguy Casteloot — Hypnose & Sophrologie",
    title: "Péguy Casteloot | Hypnose & Sophrologie à Lannion",
    description: "Hypnothérapie et sophrologie à Lannion. Transformez votre vie dès la 1ère séance. ⭐ 4.9/5 sur Google.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Péguy Casteloot — Hypnose & Sophrologie à Lannion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Péguy Casteloot | Hypnose & Sophrologie",
    description: "Transformez votre vie avec l'hypnose et la sophrologie. Cabinet à Lannion, séances à distance disponibles.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${instrumentSerif.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <LocalBusinessSchema />
        <CustomCursor />
        <Preloader />
        <div className="ovni-grain" />
        <FloatingNavbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
