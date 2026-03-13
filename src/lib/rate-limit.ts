const windowMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const CLEANUP_THRESHOLD = 500;

export function rateLimit(ip: string, maxRequests: number): { success: boolean; remaining: number } {
    const now = Date.now();
    const entry = windowMap.get(ip);

    if (!entry || now > entry.resetAt) {
        windowMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return { success: true, remaining: maxRequests - 1 };
    }

    entry.count++;

    if (entry.count > maxRequests) {
        return { success: false, remaining: 0 };
    }

    return { success: true, remaining: maxRequests - entry.count };
}

export function cleanupRateLimit() {
    if (windowMap.size < CLEANUP_THRESHOLD) return;

    const now = Date.now();
    for (const [key, value] of windowMap) {
        if (now > value.resetAt) windowMap.delete(key);
    }
}
