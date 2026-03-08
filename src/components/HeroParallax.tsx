"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallax() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const abstractRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: container });
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(
                ".hero-text-line",
                { y: 100, opacity: 0, rotate: 2 },
                { y: 0, opacity: 1, rotate: 0, duration: 1.5, stagger: 0.15 }
            )
                .fromTo(
                    ".hero-fade",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 },
                    "-=1"
                )
                .fromTo(
                    abstractRef.current,
                    { scale: 0.8, opacity: 0, rotate: -15 },
                    { scale: 1, opacity: 1, rotate: 0, duration: 2, ease: "power3.out" },
                    "-=1.5"
                );

            // Scroll Animation (Parallax)
            // The textRef animation is now handled by Framer Motion
            // gsap.to(textRef.current, {
            //     y: "40%",
            //     opacity: 0,
            //     ease: "none",
            //     scrollTrigger: {
            //         trigger: container.current,
            //         start: "top top",
            //         end: "bottom top",
            //         scrub: 0.5,
            //     },
            // });

            gsap.to(abstractRef.current, {
                y: "15%",
                rotate: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, container);

        return () => ctx.revert(); // Cleanup GSAP on unmount
    }, []);

    return (
        <section
            ref={container}
            className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-12 pt-32 pb-20"
        >
            <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Typographic Left Col */}
                <div className="flex-1 text-left" ref={textRef}>
                    <div className="flex items-center gap-4 mb-8 hero-fade opacity-0">
                        <div className="w-12 h-[1px] bg-gold/50" />
                        <span className="uppercase tracking-[0.2em] text-xs font-semibold text-sand/60">
                            Hypnothérapie Profonde
                        </span>
                    </div>

                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] tracking-tighter text-sand mb-8 overflow-hidden">
                        <div className="hero-text-line opacity-0">L'esprit</div>
                        <div className="hero-text-line opacity-0">
                            <span className="italic font-light text-sand/80">déverrouillé.</span>
                        </div>
                    </h1>

                    <p className="font-sans text-lg md:text-xl text-sand/50 max-w-md leading-relaxed mb-12 hero-fade opacity-0">
                        Oubliez la volonté. Transformez vos blocages à la racine. Pour ceux
                        qui ont tout essayé face au stress, au tabac et aux insomnies.
                    </p>

                    <motion.div
                        style={{ y: textY, opacity }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <MagneticButton className="relative overflow-hidden group rounded-full bg-sand text-midnight px-8 py-4 font-sans text-sm font-semibold tracking-wide transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-3">
                                Découvrir l'accompagnement
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
                        </MagneticButton>

                        <button className="text-sand/50 hover:text-sand text-sm uppercase tracking-widest transition-colors">
                            En savoir plus
                        </button>
                    </motion.div>
                </div>

                {/* Abstract Right Col */}
                <div ref={abstractRef} className="flex-1 w-full relative aspect-square max-w-lg hidden md:block opacity-0">
                    <div className="absolute inset-0 rounded-full border border-sand/10 bg-gradient-to-tr from-sand/5 to-transparent backdrop-blur-3xl animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-8 rounded-full border border-gold/20 bg-gradient-to-bl from-gold/5 to-transparent backdrop-blur-3xl animate-[spin_40s_linear_infinite_reverse]" />
                    {/* Central Core */}
                    <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-sage-glow blur-3xl opacity-50 animate-pulse" />
                </div>
            </div>
        </section>
    );
}
