"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegalesClient() {
    return (
        <main className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] pt-32 pb-24 font-sans">
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[var(--theme-text)]/40 hover:text-[var(--theme-accent)] transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-widest font-black">Retour à l'accueil</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="font-serif-display text-5xl md:text-7xl mb-12 tracking-tighter">Mentions <span className="italic text-[var(--theme-accent)]">Légales</span></h1>

                    <div className="space-y-12 text-[var(--theme-text)]/70 leading-relaxed font-light">
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">1. Éditeur du site</h2>
                            <p>
                                Le présent site web est édité par la société <strong>SARL P3C</strong>.<br />
                                Siège social : Carantec, Bretagne, France.<br />
                                Capital social : 1 000 €<br />
                                SIRET : 921 837 472 00015<br />
                                Responsable de la publication : <strong>Péguy Casteloot</strong><br />
                                Contact : <a href="mailto:contact@peguycasteloot.fr" className="text-[var(--theme-accent)] underline">contact@peguycasteloot.fr</a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">2. Propriété Intellectuelle</h2>
                            <p>
                                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                            <p className="mt-4">
                                <strong>Marque et Contenus :</strong> La marque "Péguy Casteloot", le logo, les textes, les audios du "Voyage Auditif", et l'ensemble des contenus graphiques sont la propriété exclusive de Péguy Casteloot.
                                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Péguy Casteloot.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">3. Hébergement</h2>
                            <p>
                                Le site est hébergé par Vercel Inc.<br />
                                Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">4. Responsabilité</h2>
                            <p>
                                Péguy Casteloot s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site.
                                Toutefois, les séances d'hypnose et de sophrologie ainsi que les audios vendus constituent un accompagnement au bien-être et ne se substituent en aucun cas à un avis ou un traitement médical.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
