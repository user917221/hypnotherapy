"use client";

import { motion } from "framer-motion";
import { Ghost, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";

interface EmptyStateProps {
    title: string;
    description: string;
    actionText?: string;
    actionHref?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function EmptyState({
    title,
    description,
    actionText,
    actionHref,
    icon = <Ghost className="w-10 h-10 text-[var(--theme-text)]/40" />,
    className
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-ovni rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border sm:p-20 border-[var(--theme-text)]/5 ${className || ""}`}
        >
            <div className="w-24 h-24 rounded-full bg-[var(--theme-text)]/5 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_color-mix(in_srgb,var(--theme-text)_5%,transparent)]">
                {icon}
            </div>

            <h3 className="font-serif-display text-3xl md:text-4xl text-[var(--theme-text)] mb-4">{title}</h3>

            <p className="font-sans text-[var(--theme-text)]/60 font-light max-w-md mx-auto mb-10 leading-relaxed text-sm md:text-base">
                {description}
            </p>

            {actionText && actionHref && (
                <Link href={actionHref}>
                    <MagneticButton className="px-8 py-4 rounded-full border border-[var(--theme-text)]/20 text-[var(--theme-text)] bg-[var(--theme-text)]/5 hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-all flex items-center gap-3 active:scale-95">
                        <span className="font-sans font-black uppercase tracking-[0.2em] text-xs">
                            {actionText}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                </Link>
            )}
        </motion.div>
    );
}
