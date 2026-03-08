"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// SVG icons inline (lucide n'a pas LinkedIn/TikTok)
const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.154 9.217 7.573 10.876v-7.695H5.57v-3.181h1.993V9.594c0-1.974 1.174-3.066 2.976-3.066.858 0 1.757.154 1.757.154v1.934h-.99c-.975 0-1.28.607-1.28 1.23v1.47H12.3l-.34 3.181h-1.956v7.695C20.846 21.29 24 17.064 24 12.073z" />
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.54V6.77a4.85 4.85 0 01-1.07-.08z" />
    </svg>
);

const socialLinks = [
    {
        icon: <FacebookIcon className="w-5 h-5" />,
        href: "https://www.facebook.com/beyou.1rst/",
        label: "Facebook",
        themeColor: true,
    },
    {
        icon: <InstagramIcon className="w-5 h-5" />,
        href: "https://www.instagram.com/peguy.casteloot/",
        label: "Instagram",
        themeColor: true,
    },
    {
        icon: <LinkedInIcon className="w-5 h-5" />,
        href: "https://www.linkedin.com/in/p%C3%A9guy-coudray-casteloot",
        label: "LinkedIn",
        themeColor: false, // garde couleur LinkedIn bleue
        staticColor: "#0A66C2",
    },
    {
        icon: <TikTokIcon className="w-5 h-5" />,
        href: "https://www.tiktok.com/@peghypnose?_t=ZN-8xIAd1nxQik&_r=1",
        label: "TikTok",
        themeColor: false, // garde TikTok noir
        staticColor: "currentColor",
    },
];

function SocialIcon({ icon, href, label, themeColor, staticColor }: {
    icon: React.ReactNode;
    href: string;
    label: string;
    themeColor: boolean;
    staticColor?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full border border-[var(--theme-text)]/15 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[var(--theme-accent)]/50 group"
            style={themeColor ? {} : { color: staticColor ?? "currentColor" }}
        >
            <span className={themeColor ? "text-[var(--theme-text)]/50 group-hover:text-[var(--theme-accent)] transition-colors" : "group-hover:opacity-80 transition-opacity"}>
                {icon}
            </span>
        </a>
    );
}

function ContactItem({ icon, text, href, noWrap }: { icon: React.ReactNode; text: string; href?: string; noWrap?: boolean }) {
    const content = (
        <div className="flex gap-3 items-start group">
            <div className="text-[var(--theme-accent)]/60 mt-0.5 shrink-0 group-hover:text-[var(--theme-accent)] transition-colors">{icon}</div>
            <p className={`font-sans text-sm font-light text-[var(--theme-text)]/60 group-hover:text-[var(--theme-text)]/80 transition-colors ${noWrap ? "whitespace-nowrap" : ""}`}>{text}</p>
        </div>
    );
    if (href) return <a href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} className="block">{content}</a>;
    return <div>{content}</div>;
}

export default function FooterImmersif() {
    return (
        <footer className="relative bg-[var(--theme-bg)] text-[var(--theme-text)] py-12 md:py-16 overflow-hidden border-t border-[var(--theme-accent)]/20">
            {/* Soft glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--theme-accent)]/5 rounded-[100%] blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-32 lg:gap-x-64 gap-y-16"
            >
                {/* Contact Column */}
                <div className="order-2 lg:order-1">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-6 text-[var(--theme-accent)]">Contact</h4>
                    <ul className="space-y-4">
                        <ContactItem
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
                            text="contact@peguycasteloot.fr"
                            href="mailto:contact@peguycasteloot.fr"
                        />
                        <ContactItem
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>}
                            text="07 49 31 05 90"
                            href="tel:0749310590"
                        />
                        <ContactItem
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
                            text="1 bis Rue de la Madeleine, 22300 Lannion"
                            href="https://www.google.com/maps/search/?api=1&query=1+bis+Rue+de+la+Madeleine+22300+Lannion"
                            noWrap
                        />
                    </ul>
                </div>

                {/* Services Column */}
                <div className="order-3 lg:order-2">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-6 text-[var(--theme-accent)]">Services</h4>
                    <ul className="space-y-3 font-sans font-medium text-base text-[var(--theme-text)]/80">
                        <li><Link href="/hypnose" className="hover:text-[var(--theme-accent)] hover:translate-x-1 inline-block transition-all">Hypnothérapie</Link></li>
                        <li><Link href="/sophrologie" className="hover:text-[var(--theme-accent)] hover:translate-x-1 inline-block transition-all">Sophrologie</Link></li>
                        <li><Link href="/ig-bas" className="hover:text-[var(--theme-accent)] hover:translate-x-1 inline-block transition-all">Équilibre IG Bas</Link></li>
                        <li><Link href="/voyage-auditif" className="hover:text-[var(--theme-accent)] hover:translate-x-1 inline-block transition-all">Bibliothèque Audio</Link></li>
                        <li><Link href="/carte-cadeau" className="hover:text-[var(--theme-accent)] hover:translate-x-1 inline-block transition-all">Carte Cadeau 🎁</Link></li>
                        <li><Link href="/reserver" className="text-[var(--theme-accent)] font-bold hover:translate-x-1 inline-block transition-all">Prendre RDV</Link></li>
                    </ul>
                </div>

                {/* Brand Column */}
                <div className="lg:col-span-2 space-y-6 order-1 lg:order-3 lg:text-right flex flex-col lg:items-end">
                    <Link href="/">
                        <h3 className="font-serif-display italic text-4xl tracking-tighter text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors duration-500">Harmonie & Sérénité</h3>
                    </Link>
                    <p className="font-sans font-light text-lg text-[var(--theme-text)]/60 max-w-md leading-relaxed">
                        L'hypnose et la sophrologie sont des voyages vers vous-même.
                        Je vous accompagne à chaque étape pour transformer vos blocages en forces.
                    </p>
                    {/* Social icons */}
                    <div className="flex gap-3 flex-wrap lg:justify-end">
                        {socialLinks.map((link) => (
                            <SocialIcon key={link.label} {...link} />
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-[var(--theme-text)]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-[var(--theme-text)]/40">
                <p>© 2026 Péguy Casteloot — Tous droits réservés</p>
                <div className="flex gap-8">
                    <Link href="/mentions-legales" className="cursor-pointer hover:text-[var(--theme-accent)] transition-colors">Mentions Légales</Link>
                    <Link href="/confidentialite" className="cursor-pointer hover:text-[var(--theme-accent)] transition-colors">Confidentialité</Link>
                </div>
            </div>
        </footer>
    );
}
