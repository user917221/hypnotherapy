import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.prenom = (user as { prenom?: string }).prenom;
                token.genre = (user as { genre?: string }).genre;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as { id?: string }).id = token.id as string;
                (session.user as { prenom?: string }).prenom = token.prenom as string;
                (session.user as { genre?: string }).genre = token.genre as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
