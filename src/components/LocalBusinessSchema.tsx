// Composant JSON-LD LocalBusiness — à inclure dans le layout ou la page d'accueil
// https://schema.org/LocalBusiness

export default function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
        "name": "Péguy Casteloot — Hypnose & Sophrologie",
        "description": "Cabinet de bien-être à Lannion spécialisé en hypnothérapie, sophrologie et équilibre nutritionnel IG Bas. Séances en cabinet et à distance.",
        "url": "https://peguycasteloot.fr",
        "telephone": "+33749310590",
        "email": "contact@peguycasteloot.fr",
        "image": "https://peguycasteloot.fr/og-image.jpg",
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Credit Card, Apple Pay",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1 bis Rue de la Madeleine",
            "addressLocality": "Lannion",
            "postalCode": "22300",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.7317,
            "longitude": -3.4569
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "ratingCount": "87",
            "reviewCount": "87"
        },
        "sameAs": [
            "https://www.facebook.com/beyou.1rst/",
            "https://www.instagram.com/peguy.casteloot/",
            "https://www.linkedin.com/in/p%C3%A9guy-coudray-casteloot",
            "https://www.tiktok.com/@peghypnose",
            "https://maps.app.goo.gl/p7tx93TzHm6GVheE6"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services bien-être",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Hypnothérapie",
                        "description": "Séances d'hypnose éricksonienne pour arrêter de fumer, gérer l'anxiété, le sommeil ou perdre du poids."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Sophrologie",
                        "description": "Séances de sophrologie pour réduire le stress, améliorer la confiance en soi et retrouver l'équilibre."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Équilibre nutritionnel IG Bas",
                        "description": "Programme de nutrition à index glycémique bas pour perdre du poids durablement."
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
