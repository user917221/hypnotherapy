import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.prenom} ${user.nom}`,
                    prenom: user.prenom,
                    genre: user.genre,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/connexion",
        error: "/connexion",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider !== "credentials") {
                if (!user.email) return false;

                try {
                    // Check if user exists in database
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email },
                    });

                    if (!existingUser) {
                        // Create user if they don't exist
                        await prisma.user.create({
                            data: {
                                email: user.email,
                                prenom: (profile as any)?.given_name || user?.name?.split(" ")[0] || "Prénom",
                                nom: (profile as any)?.family_name || user?.name?.split(" ")[1] || "Nom",
                                password: "", // No password for social logins
                                genre: "femme", // Default
                            },
                        });
                    }
                } catch (error) {
                    console.error("Auth Exception in signIn callback:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.prenom = (user as { prenom?: string }).prenom;
                token.genre = (user as { genre?: string }).genre;
                // Force ADMIN role for Péguy
                token.role = user.email === "contact@peguycasteloot.fr" ? "ADMIN" : "USER";
            }

            // Support session update
            if (trigger === "update" && session) {
                return { ...token, ...session };
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as { id?: string }).id = token.id as string;
                (session.user as { prenom?: string }).prenom = token.prenom as string;
                (session.user as { genre?: string }).genre = token.genre as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
