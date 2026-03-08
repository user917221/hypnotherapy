"use client";

import { motion } from "framer-motion";

interface SvgDrawingEffectProps {
    className?: string;
    path: string;
    width?: number;
    height?: number;
    delay?: number;
}

export default function SvgDrawingEffect({ className, path, width = 300, height = 300, delay = 0.5 }: SvgDrawingEffectProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d={path}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                    duration: 3,
                    delay: delay,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2
                }}
            />
        </svg>
    );
}
