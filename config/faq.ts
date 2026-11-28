export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "taille",
    question: "Comment choisir ma taille ?",
    answer:
      "Nos coupes sont amples. Consultez le guide des tailles sur chaque fiche produit, et écrivez-nous sur WhatsApp si vous hésitez entre deux tailles.",
  },
  {
    id: "livraison",
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nous livrons partout au Maroc. Les délais sont de [24 à 72 h] selon votre ville. Vous recevez un message dès l'expédition de votre commande.",
  },
  {
    id: "paiement",
    question: "Puis-je payer à la livraison ?",
    answer:
      "Oui. Le paiement à la livraison est disponible sur toutes les commandes : vous payez en main propre au livreur, après avoir reçu votre colis.",
  },
  {
    id: "retour",
    question: "Comment retourner un article ?",
    answer:
      "Vous avez 7 jours après la réception pour demander un retour ou un échange. L'article doit être non porté, avec son étiquette. Contactez-nous et nous vous guidons.",
  },
  {
    id: "entretien",
    question: "Comment entretenir le satin et le velours ?",
    answer:
      "Lavage délicat à froid, à l'envers, sans sèche-linge. Repassez à basse température et rangez les pièces à plat ou sur cintre.",
  },
];
