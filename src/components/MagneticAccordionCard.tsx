"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface MagneticAccordionCardProps {
    title: string;
    desc: string;
    extendedDesc: string;
    icon?: React.ReactNode;
}

export default function MagneticAccordionCard({ title, desc, extendedDesc, icon }: MagneticAccordionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Mouse tracking values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springing for the magnetic pull
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Mapping mouse position to limited movement (-15px to 15px)
    const moveX = useTransform(springX, [-1, 1], [-15, 15]);
    const moveY = useTransform(springY, [-1, 1], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        // Calculate mouse position relative to center of card (-1 to 1)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) / (rect.width / 2));
        y.set((e.clientY - centerY) / (rect.height / 2));
    };

    const handleMouseLeave = () => {
        // Reset position on leave
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: moveX, y: moveY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsOpen(!isOpen)}
            className="group relative p-8 border border-seafoam/20 rounded-3xl bg-teal-deep/50 backdrop-blur-sm text-left cursor-pointer transition-colors hover:border-seafoam/50"
            layout
        >
            <motion.div layout className="flex items-center gap-4 mb-4">
                {icon && <span className="text-seafoam">{icon}</span>}
                <motion.h3 layout className="text-2xl font-serif-display text-seafoam">
                    {title}
                </motion.h3>
            </motion.div>

            <motion.p layout className="font-sans text-mint-cream/70 leading-relaxed font-light">
                {desc}
            </motion.p>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 border-t border-seafoam/10 font-sans text-mint-cream/80 leading-relaxed font-light text-sm">
                            {extendedDesc}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Visual indicator of interactivity */}
            <motion.div
                layout
                className="absolute top-4 right-4 w-6 h-6 rounded-full border border-seafoam/30 flex items-center justify-center text-seafoam opacity-50 group-hover:opacity-100 transition-all font-serif-display"
            >
                {isOpen ? "-" : "+"}
            </motion.div>
        </motion.div>
    );
}
