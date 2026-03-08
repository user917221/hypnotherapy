import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const signatureHeader = req.headers.get("calendly-webhook-signature");
        const secret = process.env.CALENDLY_WEBHOOK_SECRET || "";

        if (!signatureHeader) {
            return NextResponse.json({ error: "Missing signature" }, { status: 401 });
        }

        // Calendly envoie une signature de type: t=timestamp,v1=signature
        const parts = signatureHeader.split(",");
        const tPart = parts.find(p => p.startsWith("t="));
        const v1Part = parts.find(p => p.startsWith("v1="));

        if (!tPart || !v1Part) {
            return NextResponse.json({ error: "Invalid signature format" }, { status: 401 });
        }

        const t = tPart.split("=")[1];
        const v1 = v1Part.split("=")[1];
        const data = t + "." + rawBody;

        // Vérification de la signature HMAC
        const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("hex");

        if (expectedSignature !== v1 && secret !== "") {
            // Si on a un secret et qu'il ne matche pas, on rejette.
            // Si le secret est vide (dev sans secret), on peut temporairement laisser passer ou rejeter.
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const payload = JSON.parse(rawBody);

        // Quand un invité (client) prend rendez-vous
        if (payload.event === "invitee.created") {
            const email = payload.payload.email;
            const eventUri = payload.payload.event; // L'URI exact de l'événement Calendly
            const name = payload.payload.name;

            const supabase = createAdminClient();

            // On cherche si un User correspond à l'email du client
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", email)
                .single();

            if (profile) {
                // Enregistrement de la séance dans la base de données de l'espace membre
                await supabase.from("appointments").insert({
                    user_id: profile.id,
                    event_uri: payload.payload.uri || eventUri,
                    event_name: "Séance Réservée au Cabinet / en Visio", // Idéalement "Hypnothérapie" en récupérant via l'API Calendly
                    start_time: payload.payload.scheduled_event?.start_time || new Date().toISOString(),
                    end_time: payload.payload.scheduled_event?.end_time || new Date().toISOString(),
                    status: "active"
                });
            } else {
                console.warn(`Réservation Calendly sans compte membre associé : ${email}`);
            }
        }

        // Gestion de l'annulation d'un RDV
        if (payload.event === "invitee.canceled") {
            const email = payload.payload.email;
            const eventUri = payload.payload.event;

            const supabase = createAdminClient();
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", email)
                .single();

            if (profile) {
                await supabase.from("appointments")
                    .update({ status: 'canceled' })
                    .eq('user_id', profile.id)
                    .eq('event_uri', payload.payload.uri || eventUri);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Calendly Webhook Error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
