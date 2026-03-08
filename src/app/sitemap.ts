import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peguycasteloot.fr';

    const routes = [
        '',
        '/hypnose',
        '/sophrologie',
        '/ig-bas',
        '/voyage-auditif',
        '/carte-cadeau',
        '/espace-membre',
        '/contact',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
