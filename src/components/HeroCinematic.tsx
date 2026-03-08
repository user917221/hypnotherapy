"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import SvgDrawingEffect from "./SvgDrawingEffect";
import KineticText from "./KineticText";

export default function HeroCinematic() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Image scale in
            tl.fromTo(
                ".hero-bg",
                { scale: 1.15, opacity: 0, filter: "blur(20px)" },
                { scale: 1, opacity: 0.8, filter: "blur(0px)", duration: 4, ease: "expo.out" }
            );

            // Staggered text fade up - removed for exact control with KineticText framer motion

            // Subtext fade up
            tl.fromTo(
                ".hero-subtext",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 2.5, ease: "power4.out" },
                "-=1.5"
            );
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-teal-deep">
            {/* Background Image with Filter */}
            <div className="absolute inset-0 z-0">
                <div className="hero-bg relative w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1512438248406-3026367807ec?q=80&w=2070&auto=format&fit=crop"
                        alt="Péguy Casteloot - Sérénité"
                        fill
                        className="object-cover grayscale brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/20 via-transparent to-teal-deep" />
                </div>
            </div>

            {/* Svg Drawing Effects over the photo */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
                <SvgDrawingEffect
                    path="M100,200 C150,150 250,150 300,200 S450,250 500,200"
                    width={1440}
                    height={1024}
                    className="w-full h-full text-seafoam"
                    delay={1}
                />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
                <div className="space-y-6">


                    <h1 className="flex flex-col gap-2 relative z-20">
                        <KineticText
                            text="Péguy Casteloot"
                            delay={1.5}
                            className="block font-serif-display text-7xl md:text-[10vw] text-mint-cream leading-[0.85] tracking-tighter"
                        />
                        <KineticText
                            text="Le Dialogue avec l'Inconscient"
                            delay={2}
                            className="block font-serif-display italic text-4xl md:text-7xl text-seafoam leading-none mt-4 text-glow-seafoam"
                        />
                    </h1>

                    <p className="hero-subtext font-sans text-xl md:text-3xl text-mint-cream/60 max-w-3xl mx-auto font-light leading-relaxed">
                        "Parce que votre corps se souvient des blessures enfouies... <br className="hidden md:block" /> Libérez-vous des poids qui ne vous appartiennent plus."
                    </p>

                    <div className="hero-subtext pt-10 flex flex-col md:flex-row items-center justify-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                        >
                            <MagneticButton className="px-12 py-6 bg-mint-cream text-teal-deep rounded-full font-sans font-black uppercase tracking-widest text-[10px] hover:bg-seafoam transition-all duration-700 shadow-2xl shadow-teal-deep/50 hover:scale-110">
                                Commencer l'exploration
                            </MagneticButton>
                        </motion.div>
                        <span className="font-sans text-xs text-mint-cream/40 uppercase tracking-[0.2em] font-bold">
                            Cabinet — Visioconférence
                        </span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-seafoam to-transparent" />
            </motion.div>
        </section>
    );
}
