"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Ne l'activer que sur desktop (pas de touch devices)
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Centre le curseur de 32px (16px de rayon)
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Si on est sur mobile/touch, on ne rend rien du tout
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <motion.div
            style={{
                x: smoothX,
                y: smoothY,
            }}
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center bg-white hidden md:flex"
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: isHovered ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}
