"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-midnight overflow-hidden bg-noise">
            {/* Deep Space / Void center */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-midnight via-midnight to-[#020308] opacity-80" />

            {/* Fast radial gradients without filter: blur() */}
            <motion.div
                animate={{
                    x: ["-5%", "5%", "-5%"],
                    y: ["-5%", "10%", "-5%"],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    background: "radial-gradient(circle, rgba(42, 72, 65, 0.4) 0%, transparent 60%)",
                    willChange: "transform"
                }}
                className="absolute -top-[30%] -left-[20%] w-[120vw] h-[120vw] opacity-60 mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: ["5%", "-10%", "5%"],
                    y: ["10%", "-5%", "10%"],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                    background: "radial-gradient(circle, rgba(24, 37, 58, 0.5) 0%, transparent 60%)",
                    willChange: "transform"
                }}
                className="absolute top-[20%] -right-[30%] w-[130vw] h-[130vw] opacity-50 mix-blend-screen"
            />

            {/* Ambient light source */}
            <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80vw] h-[40vh] bg-[radial-gradient(ellipse_at_center,_rgba(232,220,196,0.05)_0%,_transparent_70%)]" />
        </div>
    );
}
