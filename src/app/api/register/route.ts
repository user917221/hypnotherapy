import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email("Email invalide").max(255),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").max(128),
    prenom: z.string().min(1, "Prénom requis").max(100).trim(),
    nom: z.string().min(1, "Nom requis").max(100).trim(),
    genre: z.enum(["femme", "homme", "autre"]).default("femme"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            const firstError = result.error.issues[0]?.message || "Données invalides";
            return NextResponse.json({ error: firstError }, { status: 400 });
        }

        const { email, password, prenom, nom, genre } = result.data;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: { email, password: hashed, prenom, nom, genre },
        });

        return NextResponse.json(
            { id: user.id, email: user.email, prenom: user.prenom, genre: user.genre },
            { status: 201 }
        );
    } catch (err: unknown) {
        console.error("Erreur serveur lors de l'enregistrement:", err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
