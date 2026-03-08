"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    href?: string;
    fullWidth?: boolean;
    disabled?: boolean;
}

export default function MagneticButton({
    children,
    className = "",
    onClick,
    type = "button",
    href,
    fullWidth,
    disabled = false,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const innerClass = `whitespace-nowrap flex items-center justify-center ${className}`;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`cursor-pointer ${fullWidth ? "w-full block" : "inline-block"}`}
        >
            {href ? (
                <a href={href} className={innerClass}>{children}</a>
            ) : (
                <button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    className={innerClass}
                    style={fullWidth ? { width: "100%" } : {}}
                >
                    {children}
                </button>
            )}
        </motion.div>
    );
}
