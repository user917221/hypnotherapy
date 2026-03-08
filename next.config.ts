import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  // Vercel — les packages natifs Prisma/bcrypt restent côté serveur
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  transpilePackages: ["lenis"],
};

export default nextConfig;
