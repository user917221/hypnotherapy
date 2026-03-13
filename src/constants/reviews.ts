export interface DashboardReview {
    id: number;
    name: string;
    text: string;
    stars: number;
}

export interface TypewriterReview {
    author: string;
    text: string;
    stars: number;
}

export const dashboardReviews: DashboardReview[] = [
    { id: 1, name: "Antonella", text: "Me libérer de poids physique et émotionnel que je portais depuis trop longtemps.", stars: 5 },
    { id: 2, name: "ChrysB", text: "Professionnelle douce, investie et surprenante par la justesse de son accompagnement.", stars: 5 },
    { id: 3, name: "Paul", text: "Je prends à nouveau énormément plaisir à jouer, libéré de mes angoisses de performance.", stars: 5 },
    { id: 4, name: "Laurie", text: "Je me sens enfin libérée de vieux poids, plus légère et ancrée.", stars: 5 },
];

export const typewriterReviews: TypewriterReview[] = [
    {
        author: "Antonella M.",
        text: "Grâce à l'hypnose j'ai pu me retrouver, me libérer de poids autant physique qu'émotionnel. Péguy est une thérapeute exceptionnelle, bienveillante et à l'écoute.",
        stars: 5,
    },
    {
        author: "ChrysB",
        text: "Péguy est une professionnelle douce, investie et surprenante. Sa maîtrise de l'hypnose et de la sophrologie m'a permis de me libérer de blocages que je trainais depuis des années. Je revis pleinement.",
        stars: 5,
    },
    {
        author: "Laurie",
        text: "Je me sens enfin libérée de vieux poids, en profondeur. Je dors mieux, je suis apaisée. Péguy a su créer un espace de confiance absolue dès la première séance.",
        stars: 5,
    },
    {
        author: "Marie-Claire D.",
        text: "J'avais des réserves sur l'hypnose avant de consulter Péguy. Après deux séances, mes insomnies chroniques ont quasiment disparu. Un travail profond et doux à la fois.",
        stars: 5,
    },
    {
        author: "Thomas R.",
        text: "Arrêt du tabac en une seule séance. Ça fait maintenant 8 mois, toujours aucune envie. Je recommande à tous ceux qui cherchent à arrêter sans souffrir.",
        stars: 5,
    },
    {
        author: "Sandrine L.",
        text: "Programme IG Bas + hypnose = une combinaison redoutable. J'ai perdu 11 kg en 4 mois sans me priver, sans compter les calories. Et l'hypnose a traité ce que le régime n'aurait jamais pu toucher.",
        stars: 5,
    },
];
