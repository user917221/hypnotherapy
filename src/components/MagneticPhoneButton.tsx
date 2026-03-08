"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Phone } from "lucide-react";

interface MagneticPhoneButtonProps {
    className?: string;
    phone?: string;
}

export default function MagneticPhoneButton({
    className = "",
    phone = "07 49 31 05 90"
}: MagneticPhoneButtonProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const formattedPhone = phone.replace(/\s/g, '');

    return (
        <motion.a
            ref={ref}
            href={`tel:${formattedPhone}`}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--theme-text)]/10 bg-[var(--theme-text)]/5 hover:bg-[var(--theme-accent)]/10 hover:border-[var(--theme-accent)]/30 text-[var(--theme-text)]/60 hover:text-[var(--theme-accent)] transition-colors duration-300 group ${className}`}
        >
            <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                className="w-8 h-8 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-bg)] transition-colors duration-300"
            >
                <Phone className="w-4 h-4" />
            </motion.div>
            <span className="font-sans text-sm font-medium tracking-wider">{phone}</span>
        </motion.a>
    );
}
