import { CheckCircle2 } from "lucide-react";

const benefits = [
    "Arrêt du tabac",
    "Gestion du stress",
    "Confiance en soi",
    "Troubles du sommeil",
    "Phobies & Peurs",
    "Deuil & Séparation",
    "Perte de poids",
    "Préparation mentale",
    "Angoisses",
    "Addictions",
];

export default function InfiniteBenefits() {
    return (
        <div className="w-full bg-navy py-12 overflow-hidden flex whitespace-nowrap border-y border-white/10">
            <div className="animate-marquee flex gap-12 items-center">
                {/* We map the array twice to create a seamless infinite loop */}
                {[...benefits, ...benefits].map((benefit, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 text-stone md:text-xl font-medium"
                    >
                        <CheckCircle2 className="w-5 h-5 text-sage" />
                        {benefit}
                    </div>
                ))}
            </div>
        </div>
    );
}
