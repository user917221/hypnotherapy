import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        // Le service role key permet de bypasser les RLS policies (Row Level Security)
        // C'est indispensable pour insérer/mettre à jour depuis un Webhook sans auth utilisateur complet
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}
