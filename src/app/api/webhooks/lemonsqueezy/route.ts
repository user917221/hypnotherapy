import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-signature") || "";
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";

        // Sécurisation globale du webhook en validant la signature LemonSqueezy HMAC
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signatureBuffer = Buffer.from(signature, "utf8");

        if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const eventName = payload.meta.event_name;
        const orderData = payload.data.attributes;

        // Quand une commande est payée avec succès
        if (eventName === "order_created") {
            const email = orderData.user_email;
            // On récupère le variant_id pour savoir quel audio a été acheté
            const variant_id = orderData.first_order_item?.variant_id?.toString() || "";
            const order_id = orderData.order_number?.toString() || payload.data.id;
            const status = orderData.status;

            const supabase = createAdminClient();

            // On cherche si un User correspond à l'email de l'acheteur
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", email)
                .single();

            if (profile) {
                // Le user existe, on lui attache l'achat !
                await supabase.from("purchases").insert({
                    user_id: profile.id,
                    variant_id,
                    order_id,
                    status,
                    amount: orderData.total_formatted
                });
            } else {
                // Si l'utilisateur a acheté SANS avoir de compte, on pourrait créer un profil "guest"
                // ou lui envoyer un email pour qu'il s'inscrive. 
                console.warn(`Achat Lemon Squeezy d'un email sans compte membre : ${email}`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Lemon Squeezy Webhook Error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
