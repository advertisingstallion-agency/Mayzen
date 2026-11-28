export type Category = {
  slug: "abayas" | "pyjamas" | "ensembles";
  name: string;
  href: string;
  image?: string;
  alt?: string;
  // Number of articles. Stays undefined until the API provides it.
  count?: number;
};

export const shopCategories: Category[] = [
  {
    slug: "abayas",
    name: "Abayas & robes",
    href: "/boutique?categorie=abayas",
    image: "/images/category-abayas.jpg",
    alt: "Femme portant une abaya bordeaux avec ceinture en cuir",
  },
  {
    slug: "pyjamas",
    name: "Pyjamas",
    href: "/boutique?categorie=pyjamas",
    image: "/images/category-pyjamas.jpg",
    alt: "Pyjama en velours bordeaux plié sur un lin ivoire",
  },
  {
    slug: "ensembles",
    name: "Ensembles",
    href: "/boutique?categorie=ensembles",
    image: "/images/category-ensembles.jpg",
    alt: "Chemise ivoire et jupe plissée bordeaux avec hijab assorti",
  },
];
