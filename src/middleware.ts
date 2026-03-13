import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit, cleanupRateLimit } from "@/lib/rate-limit";

const API_RATE_LIMIT = 30;
const AUTH_RATE_LIMIT = 5;

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith("/api/")) return NextResponse.next();

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    cleanupRateLimit();

    const isAuthRoute = pathname.includes("/register") || pathname.includes("/auth");
    const limit = isAuthRoute ? AUTH_RATE_LIMIT : API_RATE_LIMIT;
    const key = `${ip}:${isAuthRoute ? "auth" : "api"}`;

    const { success, remaining } = rateLimit(key, limit);

    if (!success) {
        return NextResponse.json(
            { error: "Trop de requetes. Reessayez dans une minute." },
            {
                status: 429,
                headers: {
                    "Retry-After": "60",
                    "X-RateLimit-Limit": String(limit),
                    "X-RateLimit-Remaining": "0",
                },
            }
        );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(limit));
    response.headers.set("X-RateLimit-Remaining", String(remaining));

    return response;
}

export const config = {
    matcher: "/api/:path*",
};
