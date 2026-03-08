"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ConfidentialiteClient() {
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
                    <h1 className="font-serif-display text-5xl md:text-7xl mb-12 tracking-tighter">Politique de <span className="italic text-[var(--theme-accent)]">Confidentialité</span></h1>

                    <div className="space-y-12 text-[var(--theme-text)]/70 leading-relaxed font-light">
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">1. Collecte des données</h2>
                            <p>
                                Nous collectons des informations lorsque vous vous inscrivez sur notre site (Espace Membre), lorsque vous achetez un audio ou lorsque vous prenez rendez-vous.
                                Les informations collectées incluent votre nom, prénom, adresse e-mail et éventuellement votre numéro de téléphone.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">2. Utilisation des informations</h2>
                            <p>
                                Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                            </p>
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                <li>Personnaliser votre expérience et répondre à vos besoins individuels.</li>
                                <li>Fournir le contenu audio acheté (via l'Espace Membre ou Podia).</li>
                                <li>Gérer vos rendez-vous de sophrologie et d'hypnose.</li>
                                <li>Vous contacter par e-mail pour le suivi de vos séances ou commandes.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">3. Protection des informations</h2>
                            <p>
                                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Seule Péguy Casteloot a accès aux informations personnelles identifiables sécurisées sur ce site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--theme-accent)] mb-4">4. Droits des utilisateurs (RGPD)</h2>
                            <p>
                                Conformément à la réglementation RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données.
                                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@peguycasteloot.fr" className="text-[var(--theme-accent)] underline">contact@peguycasteloot.fr</a>.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
