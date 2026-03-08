"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ExternalLink } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/p7tx93TzHm6GVheE6";

const reviews = [
    {
        author: "Antonella M.",
        text: "Grâce à l'hypnose j'ai pu me retrouver, me libérer de poids autant physique qu'émotionnel. Péguy est une thérapeute exceptionnelle, bienveillante et à l'écoute.",
        stars: 5,
    },
    {
        author: "ChrysB",
        text: "Péguy est une professionnelle douce, investie et surprenante. Sa maîtrise de l'hypnose et de la sophrologie m'a permis de me libérer de blocages que je trainais depuis des années. Je revis pleinement.",
        stars: 5,
    },
    {
        author: "Laurie",
        text: "Je me sens enfin libérée de vieux poids, en profondeur. Je dors mieux, je suis apaisée. Péguy a su créer un espace de confiance absolue dès la première séance.",
        stars: 5,
    },
    {
        author: "Marie-Claire D.",
        text: "J'avais des réserves sur l'hypnose avant de consulter Péguy. Après deux séances, mes insomnies chroniques ont quasiment disparu. Un travail profond et doux à la fois.",
        stars: 5,
    },
    {
        author: "Thomas R.",
        text: "Arrêt du tabac en une seule séance. Ça fait maintenant 8 mois, toujours aucune envie. Je recommande à tous ceux qui cherchent à arrêter sans souffrir.",
        stars: 5,
    },
    {
        author: "Sandrine L.",
        text: "Programme IG Bas + hypnose = une combinaison redoutable. J'ai perdu 11 kg en 4 mois sans me priver, sans compter les calories. Et l'hypnose a traité ce que le régime n'aurait jamais pu toucher.",
        stars: 5,
    },
];

export default function TypewriterReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentReview = reviews[currentIndex].text;
        const typingSpeed = 28;
        const deletingSpeed = 12;
        const pauseTime = 5000;

        let timer: NodeJS.Timeout;

        if (!isDeleting && displayedText !== currentReview) {
            timer = setTimeout(() => {
                setDisplayedText(currentReview.substring(0, displayedText.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && displayedText === currentReview) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pauseTime);
        } else if (isDeleting && displayedText !== "") {
            timer = setTimeout(() => {
                setDisplayedText(currentReview.substring(0, displayedText.length - 1));
            }, deletingSpeed);
        } else if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }

        return () => clearTimeout(timer);
    }, [currentIndex, displayedText, isDeleting]);

    return (
        <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                <div>
                    <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--theme-accent)] font-sans mb-3 hover:opacity-70 transition-opacity"
                    >
                        Google Maps · 87 avis <ExternalLink className="w-3 h-3" />
                    </a>
                    <h2 className="font-serif-display text-4xl md:text-6xl tracking-tighter text-[var(--theme-text)]">
                        Ce qu'ils <span className="italic text-[var(--theme-text)]/50">en disent.</span>
                    </h2>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[var(--theme-accent)] text-[var(--theme-accent)]" />
                        ))}
                    </div>
                    <span className="font-serif-display text-3xl text-[var(--theme-accent)]">5.0</span>
                </div>
            </div>

            {/* Typewriter Quote */}
            <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block group cursor-pointer"
            >
                <div className="text-center">
                    <h3 className="font-serif-display italic text-3xl md:text-5xl text-[var(--theme-text)] leading-tight min-h-[140px] md:min-h-[120px] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors duration-500">
                        "{displayedText}"
                        <span className="animate-pulse inline-block w-[2px] h-[0.9em] bg-[var(--theme-accent)] ml-2 translate-y-2" />
                    </h3>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.5 }}
                            className="mt-10 flex flex-col items-center gap-3"
                        >
                            <div className="flex gap-1">
                                {[...Array(reviews[currentIndex].stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[var(--theme-accent)] text-[var(--theme-accent)]" />
                                ))}
                            </div>
                            <p className="text-[var(--theme-text)]/40 font-sans tracking-[0.2em] uppercase text-xs font-bold">
                                — {reviews[currentIndex].author} —
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-sans text-[var(--theme-text)]/25 group-hover:text-[var(--theme-accent)]/60 transition-colors tracking-widest uppercase">
                                Voir sur Google Maps <ExternalLink className="w-3 h-3" />
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </a>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-14">
                {reviews.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setCurrentIndex(i); setDisplayedText(""); setIsDeleting(false); }}
                        className={`rounded-full transition-all duration-500 ${i === currentIndex
                            ? "w-6 h-2 bg-[var(--theme-accent)]"
                            : "w-2 h-2 bg-[var(--theme-text)]/15 hover:bg-[var(--theme-text)]/35"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
