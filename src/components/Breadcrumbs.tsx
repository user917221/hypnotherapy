import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peguycasteloot.fr";

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const allItems = [{ label: "Accueil", href: "/" }, ...items];

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${siteUrl}${item.href === "/" ? "" : item.href}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <nav aria-label="Fil d'Ariane" className="py-4 px-6 md:px-12">
                <ol className="flex items-center gap-2 font-sans text-xs text-[var(--theme-text)]/40 tracking-wide">
                    {allItems.map((item, i) => (
                        <li key={item.href} className="flex items-center gap-2">
                            {i > 0 && <span className="text-[var(--theme-text)]/20">/</span>}
                            {i === allItems.length - 1 ? (
                                <span className="text-[var(--theme-text)]/70 font-medium" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-[var(--theme-accent)] transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
