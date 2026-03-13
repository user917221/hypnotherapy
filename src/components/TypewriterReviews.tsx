"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ExternalLink } from "lucide-react";
import { typewriterReviews } from "@/constants/reviews";

const MAPS_URL = "https://maps.app.goo.gl/p7tx93TzHm6GVheE6";
const TYPING_SPEED_MS = 28;
const DELETING_SPEED_MS = 12;
const PAUSE_AFTER_TYPING_MS = 5000;

export default function TypewriterReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentReview = typewriterReviews[currentIndex].text;

        let timer: NodeJS.Timeout;

        if (!isDeleting && displayedText !== currentReview) {
            timer = setTimeout(() => {
                setDisplayedText(currentReview.substring(0, displayedText.length + 1));
            }, TYPING_SPEED_MS);
        } else if (!isDeleting && displayedText === currentReview) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, PAUSE_AFTER_TYPING_MS);
        } else if (isDeleting && displayedText !== "") {
            timer = setTimeout(() => {
                setDisplayedText(currentReview.substring(0, displayedText.length - 1));
            }, DELETING_SPEED_MS);
        } else if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % typewriterReviews.length);
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
                                {[...Array(typewriterReviews[currentIndex].stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[var(--theme-accent)] text-[var(--theme-accent)]" />
                                ))}
                            </div>
                            <p className="text-[var(--theme-text)]/40 font-sans tracking-[0.2em] uppercase text-xs font-bold">
                                — {typewriterReviews[currentIndex].author} —
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-sans text-[var(--theme-text)]/25 group-hover:text-[var(--theme-accent)]/60 transition-colors tracking-widest uppercase">
                                Voir sur Google Maps <ExternalLink className="w-3 h-3" />
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </a>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-14" role="tablist" aria-label="Navigation des avis">
                {typewriterReviews.map((review, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === currentIndex}
                        aria-label={`Avis de ${review.author}`}
                        onClick={() => { setCurrentIndex(i); setDisplayedText(""); setIsDeleting(false); }}
                        className={`rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-accent)] ${i === currentIndex
                            ? "w-6 h-2 bg-[var(--theme-accent)]"
                            : "w-2 h-2 bg-[var(--theme-text)]/15 hover:bg-[var(--theme-text)]/35"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
