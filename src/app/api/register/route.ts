import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, password, prenom, nom, genre } = await req.json();

        if (!email || !password || !prenom || !nom) {
            return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: { email, password: hashed, prenom, nom, genre: genre ?? "femme" },
        });

        return NextResponse.json(
            { id: user.id, email: user.email, prenom: user.prenom, genre: user.genre },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Erreur serveur lors de l'enregistrement:", err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
