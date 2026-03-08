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
        '/reserver',
        '/contact',
        '/inscription',
        '/connexion',
        '/mentions-legales',
        '/confidentialite',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 :
            ['/hypnose', '/sophrologie', '/ig-bas', '/voyage-auditif'].includes(route) ? 0.9 : 0.7,
    }));

    return routes;
}
