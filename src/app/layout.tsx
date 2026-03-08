import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { LemonSqueezyLoader } from "@/components/LemonSqueezyLoader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { Metadata, Viewport } from "next";
import { Poppins, Instrument_Serif, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingNavbar from "@/components/FloatingNavbar";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import { Providers } from "@/components/Providers";

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
    default: "Péguy Casteloot | Hypnose, Sophrologie & IG Bas à Lannion",
    template: "%s | Péguy Casteloot",
  },
  description: "Cabinet de bien-être à Lannion. Hypnothérapie (arrêt tabac, anxiété, sommeil), sophrologie (stress, confiance) et équilibre nutritionnel IG Bas. Séances en cabinet et à distance. Expertise certifiée. ⭐ 4.9/5 sur Google.",
  keywords: [
    "hypnose Lannion", "sophrologie Lannion", "hypnothérapie Bretagne",
    "arrêter de fumer hypnose lannion", "gestion du stress sophrologie",
    "perte de poids hypnose", "IG Bas Lannion", "équilibre nutritionnel",
    "méditation guidée", "voyage auditif hypnose", "Péguy Casteloot"
  ],
  authors: [{ name: "Péguy Casteloot", url: siteUrl }],
  creator: "Péguy Casteloot",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Péguy Casteloot — Bien-être & Transformation",
    title: "Péguy Casteloot | Hypnose & Sophrologie à Lannion",
    description: "Transformez votre quotidien avec l'hypnose et la sophrologie. Expertise en arrêt du tabac, gestion du stress et nutrition IG Bas à Lannion.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cabinet Péguy Casteloot Lannion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Péguy Casteloot | Hypnose & Sophrologie",
    description: "Expertise en hypnothérapie et sophrologie à Lannion. Séances personnalisées en cabinet ou à distance.",
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
        <Providers>
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID || ""} />
          <LocalBusinessSchema />
          <CustomCursor />
          <Preloader />
          <div className="ovni-grain" />
          <FloatingNavbar />
          <LemonSqueezyLoader />
          <Analytics />
          <SpeedInsights />
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
