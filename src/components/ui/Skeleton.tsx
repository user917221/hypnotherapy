"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <motion.div
            animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
            }}
            style={{
                backgroundSize: "400% 100%",
                backgroundImage: "linear-gradient(90deg, var(--theme-text) 0%, color-mix(in srgb, var(--theme-text) 20%, transparent) 50%, var(--theme-text) 100%)",
            }}
            className={`rounded-2xl opacity-10 ${className || ""}`}
        />
    );
}

// Helper pour des listes de Skeletons (Ex: Liste de Réservations ou Audios)
export function CardSkeleton() {
    return (
        <div className="glass-ovni p-8 rounded-3xl border border-[var(--theme-text)]/5 flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <div className="mt-8 flex justify-end">
                <Skeleton className="h-12 w-32 rounded-full" />
            </div>
        </div>
    );
}
