export type Review = {
  id: number;
  label: string;
  quote: string;
  name: string;
  city: string;
};

// Example reviews: replace with real customer reviews before launch.
export const reviews: Review[] = [
  {
    id: 1,
    label: "Un toucher incroyable",
    quote: "Le tissu est incroyablement doux et la coupe tombe parfaitement. Je me sens élégante et à l'aise.",
    name: "Prénom N.",
    city: "Casablanca",
  },
  {
    id: 2,
    label: "Livraison rapide",
    quote:
      "Le set pyjama en satin est un vrai plaisir à porter. Livraison rapide et paiement à la livraison : rassurant.",
    name: "Prénom N.",
    city: "Rabat",
  },
  {
    id: 3,
    label: "Un coloris sublime",
    quote:
      "La couleur du hijab est magnifique et le tombé est parfait. Je l'ai déjà commandé dans un deuxième coloris.",
    name: "Prénom N.",
    city: "Marrakech",
  },
  {
    id: 4,
    label: "Confort au quotidien",
    quote: "Je porte mon ensemble du matin au soir : il reste élégant et ne se froisse pas.",
    name: "Prénom N.",
    city: "Tanger",
  },
  {
    id: 5,
    label: "Finitions soignées",
    quote:
      "Tout est soigné, des coutures jusqu'aux boutons. On sent que chaque pièce est pensée avec soin.",
    name: "Prénom N.",
    city: "Fès",
  },
  {
    id: 6,
    label: "Retour sans stress",
    quote: "Une taille à échanger, et tout s'est réglé en deux messages. Un service très agréable.",
    name: "Prénom N.",
    city: "Agadir",
  },
  {
    id: 7,
    label: "Pudique et élégante",
    quote: "Enfin une abaya ample, fluide et jamais transparente. Je la recommande à toutes mes amies.",
    name: "Prénom N.",
    city: "Meknès",
  },
  {
    id: 8,
    label: "Un cadeau parfait",
    quote: "Offert à ma sœur, le pyjama en velours l'a ravie. Le colis était très soigné.",
    name: "Prénom N.",
    city: "Oujda",
  },
];
