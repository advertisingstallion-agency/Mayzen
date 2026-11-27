export type ProductCategory = "abayas" | "hijabs" | "pyjamas" | "ensembles";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  image: string;
  alt: string;
  badge?: "Nouveau" | "-20 %";
  price: number;
  oldPrice?: number;
  colors: string[];
  sizes?: string[];
};

const SIZES = ["S", "M", "L", "XL"];

export const products: Product[] = [
  {
    id: "ensemble-chemise-jupe",
    slug: "ensemble-chemise-jupe-plissee",
    name: "Ensemble chemise & jupe plissée",
    category: "ensembles",
    image: "/images/product-ensemble.jpg",
    alt: "Chemise ivoire et jupe plissée rose poudré avec hijab ivoire",
    badge: "Nouveau",
    price: 389, // TODO: real price
    colors: ["#F6EEE0", "#EECBC5", "#581C26"],
    sizes: SIZES,
  },
  {
    id: "abaya-crepe-fluide",
    slug: "abaya-crepe-fluide",
    name: "Abaya crêpe fluide",
    category: "abayas",
    image: "/images/product-abaya.jpg",
    alt: "Abaya bordeaux en crêpe avec hijab assorti",
    price: 459, // TODO: real price
    colors: ["#581C26", "#2A1215", "#EECBC5"],
    sizes: SIZES,
  },
  {
    id: "set-pyjama-satin",
    slug: "set-pyjama-satin",
    name: "Set pyjama en satin",
    category: "pyjamas",
    image: "/images/product-pyjama-satin.jpg",
    alt: "Pyjama en satin ivoire avec liseré bordeaux",
    badge: "-20 %",
    price: 279, // TODO: real price
    oldPrice: 349, // TODO: real price
    colors: ["#F6EEE0", "#EECBC5", "#581C26"],
    sizes: SIZES,
  },
  {
    id: "hijab-satin",
    slug: "hijab-satin",
    name: "Hijab satin",
    category: "hijabs",
    image: "/images/product-hijab-satin.jpg",
    alt: "Hijab en satin couleur cognac",
    badge: "Nouveau",
    price: 99, // TODO: real price
    colors: ["#8A4A2E", "#581C26", "#EECBC5"],
  },
];
