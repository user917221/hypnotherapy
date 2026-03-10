import { Moon, Wind, Heart, Sparkles, Shield, Target, Feather, Zap, Coffee, BookOpen, Video, Headphones } from "lucide-react";
import React from "react";

export const audioTags = ["Tous", "Sommeil", "Stress & Anxiété", "Amour & Estime de soi", "Retrouver l'énergie", "Nutrition & Perte de poids"];

export interface AudioProduct {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    price: number;
    tag: string;
    checkoutUrl?: string;
    podiaUrl?: string;
    icon: React.ReactNode;
    color: string;
    tracks: string[];
    highlight?: boolean;
    audioUrl?: string; // URL for playback in member space
}

export const audioProducts: AudioProduct[] = [
    {
        id: "sommeil-endormissement",
        title: "Box Sommeil & Endormissement",
        subtitle: "Hypnose & Sophrologie",
        description: "Retrouver un endormissement naturel. Cette box combine hypnose et sophrologie pour calmer l'esprit, relâcher le corps et t'aider à t'endormir naturellement.",
        duration: "4 fichiers",
        price: 59,
        tag: "Sommeil",
        checkoutUrl: "https://peguycasteloot.lemonsqueezy.com/checkout/buy/6389249e-2c1b-45f8-9a1c-26a55702dd8f",
        icon: <Moon className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["Hypnose guidée", "Séance de sophrologie", "Audio express SOS", "Rituel du soir"],
        audioUrl: "/audios/sommeil-sample.wav"
    },
    {
        id: "sommeil-profond",
        title: "Box Sommeil Profond",
        subtitle: "Nuits réparatrices",
        description: "Retrouver des nuits réparatrices. Relance tes cycles naturels, apaise ton corps, libère les tensions et réactive ton pouvoir de régénération.",
        duration: "4 fichiers",
        price: 59,
        tag: "Sommeil",
        checkoutUrl: "https://peguycasteloot.lemonsqueezy.com/checkout/buy/da8c96fb-2b4e-4101-9910-4e8769cc79c2",
        icon: <Moon className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["3 audios puissants", "Guide pratique"],
        audioUrl: "/audios/sommeil-sample.wav"
    },
    {
        id: "sommeil-agite",
        title: "Box Sommeil Agité",
        subtitle: "Pacifier les nuits",
        description: "Pacifier les nuits agitées, transformer les images perturbantes et créer un cocon de sécurité intérieure pour dormir plus sereinement.",
        duration: "3 fichiers",
        price: 59,
        tag: "Sommeil",
        checkoutUrl: "https://peguycasteloot.lemonsqueezy.com/checkout/buy/45584e0f-2f22-40f6-8324-338774ed670e",
        icon: <Moon className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["3 audios d'hypnose & sophro"],
        audioUrl: "/audios/sommeil-sample.wav"
    },
    {
        id: "sommeil-rythme",
        title: "Box Recaler son Sommeil",
        subtitle: "Rythme naturel",
        description: "Reprends le contrôle de ton rythme naturel. Conçue pour t'aider à retrouver l'équilibre jour/nuit sans forcer.",
        duration: "4 fichiers",
        price: 59,
        tag: "Sommeil",
        checkoutUrl: "https://peguycasteloot.lemonsqueezy.com/checkout/buy/2a707e53-5bec-4fa0-b318-9215f16a118f",
        icon: <Moon className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["4 fichiers audio"],
        audioUrl: "/audios/sommeil-sample.wav"
    },
    {
        id: "sommeil-reveils",
        title: "Box Réveils Nocturnes",
        subtitle: "Se rendormir facilement",
        description: "Pour ceux qui se réveillent en pleine nuit et dont le cerveau s'active. Apprends à trouver le bouton 'off' et à te rendormir facilement.",
        duration: "2 fichiers",
        price: 59,
        tag: "Sommeil",
        checkoutUrl: "https://peguycasteloot.lemonsqueezy.com/checkout/buy/9c8d19ab-adf8-4c64-9097-58d407a2db8f",
        icon: <Moon className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["2 fichiers audio"],
        audioUrl: "/audios/sommeil-sample.wav"
    },
    {
        id: "sommeil-rituel",
        title: "Rituel du Soir",
        subtitle: "Sommeil réparateur",
        description: "Ce rituel de sophrologie favorise un sommeil profond et réparateur. Respiration, relâchement corporel et visualisation t’aident à te détendre totalement avant la nuit.",
        duration: "1 Leçon",
        price: 17,
        tag: "Sommeil",
        icon: <Wind className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Cours audio"],
        audioUrl: "/audios/sommeil-sample.wav"
    },
    {
        id: "stress-emotions",
        title: "Apaiser les émotions vives",
        subtitle: "Douceur intérieure",
        description: "Frustration, peur, irritabilité… Cette séance guidée t’aide à apaiser tes émotions en douceur. Respiration consciente et visualisation pour un calme émotionnel.",
        duration: "1 Leçon",
        price: 14,
        tag: "Stress & Anxiété",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Cours audio"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "stress-charge-mentale",
        title: "Libérer la charge mentale",
        subtitle: "La pause clarté",
        description: "Un mental en surcharge ? Cette séance de sophrologie t’aide à relâcher les tensions, déposer tes pensées envahissantes et retrouver un calme intérieur profond.",
        duration: "1 Leçon",
        price: 17,
        tag: "Stress & Anxiété",
        icon: <Wind className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Séance de sophrologie"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "stress-mindset-zen",
        title: "MINDSET ZEN",
        subtitle: "La box anti-stress",
        description: "Transforme ton stress en clarté. 10 séances courtes d’hypnose et sophrologie, audios express et rituels simples pour te recentrer et recharger ton énergie.",
        duration: "15 fichiers",
        price: 147,
        tag: "Stress & Anxiété",
        icon: <Target className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["10 séances d'hypnose", "Audios express", "E-book interactif"],
        highlight: true,
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "stress-pression-mentale",
        title: "Soulager la pression mentale",
        subtitle: "Pack 3 séances",
        description: "Un pack de 3 séances pour relâcher la pression mentale, calmer les émotions et faciliter le sommeil. Idéal pour amorcer un retour au calme intérieur.",
        duration: "3 Produits",
        price: 39,
        tag: "Stress & Anxiété",
        icon: <Shield className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Pack de 3 audios"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "estime-corps",
        title: "Ton corps, ton allié silencieux",
        subtitle: "🎧 Séance 1",
        description: "Reconnecte-toi à ton corps and retrouve la paix intérieure. Hypnose douce pour libérer les tensions, apaiser le mental et restaurer la confiance envers ton corps.",
        duration: "2 Leçons",
        price: 57,
        tag: "Amour & Estime de soi",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Reconnexion sensorielle", "Apaisement mental", "Ancrage corporel"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "estime-emotions",
        title: "Libérer le poids des émotions",
        subtitle: "🎧 Séance 4",
        description: "Pour les femmes dont le corps stocke le stress. Hypnose de libération émotionnelle profonde pour réduire les tensions et soutenir la régulation corporelle.",
        duration: "2 Leçons",
        price: 57,
        tag: "Amour & Estime de soi",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Libération émotionnelle", "Apaisement nerveux", "Régulation corporelle"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "estime-guerison",
        title: "GUÉRISON & RENOUVEAU AMOUREUX",
        subtitle: "Box Hypnose 💔",
        description: "Libère-toi du passé et ouvre-toi à un amour serein. Aide à couper les liens toxiques, guérir les blessures et reconstruire sa confiance après une rupture.",
        duration: "7 Leçons",
        price: 97,
        tag: "Amour & Estime de soi",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["Coupure liens toxiques", "Guérison du cœur", "Renouveau amoureux"],
        highlight: true,
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "estime-revele",
        title: "RÉVÈLE L’AMOUR EN TOI",
        subtitle: "Box Hypnose 💖",
        description: "Reprogramme ton inconscient pour t’aimer sans condition. Libère tes blocages, renforce ta confiance et attire une relation alignée et authentique.",
        duration: "5 fichiers",
        price: 77,
        tag: "Amour & Estime de soi",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Reprogrammation amour propre", "Confiance magnétique", "Relations saines"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "energy-chakras",
        title: "Équilibre Sacré",
        subtitle: "Box Harmonisation des 7 Chakras",
        description: "Reconnecte-toi à ton énergie intérieure. Purification, activation et équilibrage des chakras via 7 rituels, hypnose, sophrologie et fréquences vibratoires.",
        duration: "9 fichiers",
        price: 127,
        tag: "Retrouver l'énergie",
        icon: <Sparkles className="w-6 h-6" />,
        color: "var(--theme-accent-alt)",
        tracks: ["7 Rituels énergétiques", "Hypnose immersive", "Manuel d'activation"],
        highlight: true,
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "energy-stable",
        title: "L’énergie stable et ancrée",
        subtitle: "🎧 Séance 7",
        description: "Retrouve une énergie durable sans pics de fatigue. Agit sur la régulation du stress, de la glycémie et des automatismes qui perturbent ton rythme interne.",
        duration: "2 Leçons",
        price: 57,
        tag: "Retrouver l'énergie",
        icon: <Zap className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Régulation stress/glycémie", "Ancrage du nouveau normal", "Stabilité interne"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "nutrition-kilos-1",
        title: "Kilos émotionnels & hormonaux",
        subtitle: "🎧 Séance 1",
        description: "Libère le corps du poids émotionnel et hormonal. Reconnecte-toi à tes sensations et réactive ton équilibre naturel pour retrouver légèreté et confiance.",
        duration: "1h",
        price: 57,
        tag: "Nutrition & Perte de poids",
        icon: <Wind className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Libération émotionnelle", "Rééquilibre hormonal", "Stabilité sereine"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "nutrition-kilos-2",
        title: "Kilos émotionnels & hormonaux",
        subtitle: "🎧 Séance 2",
        description: "Stabilise ton équilibre émotionnel et hormonal via une hypnose profonde. Aide à réguler le stress et à ancrer une légèreté durable pour ton corps.",
        duration: "1h",
        price: 57,
        tag: "Nutrition & Perte de poids",
        icon: <Wind className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Harmonisation profonde", "Ancrage stabilité", "Paix intérieure"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "nutrition-ventre-coeur",
        title: "Les deux voix : ventre & cœur",
        subtitle: "🎧 Séance 2",
        description: "Apprends à distinguer la faim émotionnelle de la faim réelle. Harmonisation des messages du corps pour un rapport apaisé à la nourriture.",
        duration: "31 min",
        price: 57,
        tag: "Nutrition & Perte de poids",
        icon: <Headphones className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Clarté intérieure", "Différenciation faim", "Paix alimentaire"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "nutrition-assiette",
        title: "L’assiette du cœur apaisé",
        subtitle: "🎧 Séance 3",
        description: "Réduis les compulsions liées au stress et aux émotions. Instaure un nouveau réflexe d'apaisement profond sans passer par l'alimentation.",
        duration: "30 min",
        price: 57,
        tag: "Nutrition & Perte de poids",
        icon: <Heart className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Désamorçage compulsions", "Apaisement nerveux", "Nouveau réflexe"],
        audioUrl: "/audios/stress-sample.mp3"
    },
    {
        id: "nutrition-sucre",
        title: "Doux détachement du sucre",
        subtitle: "🎧 Séance 6",
        description: "Réduis les envies de sucre liées à la fatigue ou aux émotions. Déprogramme les automatismes inconscients source de grignotage.",
        duration: "30 min",
        price: 57,
        tag: "Nutrition & Perte de poids",
        icon: <Coffee className="w-6 h-6" />,
        color: "var(--theme-accent)",
        tracks: ["Déprogrammation sucre", "Énergie stable", "Liberté de choix"],
        audioUrl: "/audios/stress-sample.mp3"
    }
];

export const landingPacks = [
    {
        title: "Stop Compulsions",
        duration: "20 Min",
        result: "Reprogrammation des fringales",
        icon: <Shield strokeWidth={1.5} className="w-5 h-5 text-[var(--theme-accent)]" />,
        description: "Une séance coup de poing conçue pour être écoutée juste au moment où l'envie irrépressible de sucre ou de grignotage apparaît."
    },
    {
        title: "Sommeil Profond",
        duration: "45 Min",
        result: "Nuit réparatrice",
        icon: <Feather strokeWidth={1.5} className="w-5 h-5 text-[var(--theme-accent-alt)]" />,
        description: "Endormez-vous en étant accompagné(e). Ce long voyage sonore commence par un balayage corporel progressif."
    },
    {
        title: "Confiance & Aura",
        duration: "15 Min",
        result: "Recharge d'estime",
        icon: <Target strokeWidth={1.5} className="w-5 h-5 text-[var(--theme-accent)]" />,
        description: "Parfait le matin avant de commencer la journée. Ce programme installe un ancrage de sécurité intérieure."
    }
];
