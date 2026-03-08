"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Map each route to a distinct transition color accent
const routeAccents: Record<string, string> = {
    "/hypnose": "var(--theme-accent)",
    "/sophrologie": "var(--theme-accent)",
    "/ig-bas": "var(--theme-accent)",
    "/voyage-auditif": "var(--theme-accent)",
    "/": "var(--theme-accent)",
};

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Use accent if we match a specific route, otherwise default
    const _accent = routeAccents[pathname] || "var(--theme-accent)";

    return (
        <>
            {/* Layer 1: Solid color wipe — raises from bottom */}
            <motion.div
                className="fixed inset-0 w-full h-screen z-[9999] origin-bottom pointer-events-none"
                style={{ backgroundColor: "var(--theme-bg)" }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Layer 2: Accent line sweep */}
            <motion.div
                className="fixed bottom-0 left-0 w-full z-[9998] pointer-events-none origin-bottom"
                style={{ backgroundColor: "var(--theme-accent)", height: "3px" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1, 0] }}
                transition={{
                    duration: 0.9,
                    times: [0, 0.4, 0.6, 1],
                    ease: "easeInOut",
                }}
            />

            {/* Content entry */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
                {children}
            </motion.div>
        </>
    );
}
