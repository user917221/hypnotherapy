import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    try {
                        return cookieStore.getAll();
                    } catch (e) {
                        console.error("[Supabase] Failed to get cookies:", e);
                        return [];
                    }
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch (e) {
                        // The `setAll` method was called from a Server Component or error handled
                    }
                },
            },
        }
    );
}
