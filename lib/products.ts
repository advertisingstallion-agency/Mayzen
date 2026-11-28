import type { CardProduct } from "@/lib/card-product";

export const categoryKeys = ["abayas", "hijabs", "pyjamas", "ensembles"] as const;
export type ShopCategory = (typeof categoryKeys)[number];

export const colorKeys = ["wine", "black", "ivory", "blush", "cognac", "blush100"] as const;
export type ColorKey = (typeof colorKeys)[number];

export const colorOptions: Record<ColorKey, { label: string; hex: string }> = {
  wine: { label: "Bordeaux", hex: "#581C26" },
  black: { label: "Noir", hex: "#2A1215" },
  ivory: { label: "Ivoire", hex: "#F6EEE0" },
  blush: { label: "Rose poudré", hex: "#EECBC5" },
  cognac: { label: "Cognac", hex: "#8A4A2E" },
  blush100: { label: "Rose pâle", hex: "#F7E4E0" },
};

export const sizeKeys = ["XS", "S", "M", "L", "XL"] as const;
export type SizeKey = (typeof sizeKeys)[number];

export const materialKeys = ["Satin", "Velours", "Crêpe", "Lin", "Mousseline"] as const;
export type Material = (typeof materialKeys)[number];

export const categoryLabels: Record<ShopCategory, string> = {
  abayas: "Abayas & robes",
  hijabs: "Hijabs",
  pyjamas: "Pyjamas",
  ensembles: "Ensembles",
};

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  category: ShopCategory;
  image: string;
  alt: string;
  badge?: string;
  // null until real prices exist.
  price: number | null;
  compareAtPrice?: number | null;
  colors: ColorKey[];
  sizes: SizeKey[];
  // TODO: placeholder materials, confirm with the real product data.
  material: Material;
  createdAt: string;
  // Lower is more popular. TODO: replace with real sales data.
  popularity: number;
};

const CLOTHING_SIZES: SizeKey[] = ["XS", "S", "M", "L", "XL"];

export const shopProducts: ShopProduct[] = [
  { id: "p01", slug: "abaya-crepe-fluide", name: "Abaya crêpe fluide", category: "abayas", image: "/images/product-abaya.jpg", alt: "Abaya bordeaux en crêpe avec hijab assorti", badge: "Nouveau", price: null, colors: ["wine", "black", "ivory"], sizes: CLOTHING_SIZES, material: "Crêpe", createdAt: "2026-11-20", popularity: 1 },
  { id: "p02", slug: "ensemble-lin-jupe-plissee", name: "Ensemble lin & jupe plissée", category: "ensembles", image: "/images/product-ensemble.jpg", alt: "Chemise ivoire et jupe plissée rose poudré avec hijab ivoire", badge: "Nouveau", price: null, colors: ["ivory", "wine", "blush"], sizes: CLOTHING_SIZES, material: "Lin", createdAt: "2026-11-18", popularity: 3 },
  { id: "p03", slug: "pyjama-en-velours", name: "Pyjama en velours", category: "pyjamas", image: "/images/product-pyjama-velours.jpg", alt: "Pyjama en velours bordeaux", badge: "−20 %", price: null, compareAtPrice: null, colors: ["wine", "blush", "cognac"], sizes: CLOTHING_SIZES, material: "Velours", createdAt: "2026-10-30", popularity: 2 },
  { id: "p04", slug: "hijab-satin", name: "Hijab satin", category: "hijabs", image: "/images/product-hijab-satin.jpg", alt: "Hijab en satin couleur cognac", price: null, colors: ["blush", "ivory", "wine"], sizes: [], material: "Satin", createdAt: "2026-11-02", popularity: 4 },
  { id: "p05", slug: "set-pyjama-satin", name: "Set pyjama en satin", category: "pyjamas", image: "/images/product-pyjama-satin.jpg", alt: "Pyjama en satin ivoire avec liseré bordeaux", price: null, colors: ["wine", "blush100"], sizes: CLOTHING_SIZES, material: "Satin", createdAt: "2026-10-22", popularity: 5 },
  { id: "p06", slug: "jupe-plissee-vin", name: "Jupe plissée vin", category: "ensembles", image: "/images/product-ensemble.jpg", alt: "Jupe plissée couleur vin", price: null, colors: ["wine", "black"], sizes: CLOTHING_SIZES, material: "Crêpe", createdAt: "2026-10-15", popularity: 9 },
  { id: "p07", slug: "abaya-ceinturee-bordeaux", name: "Abaya ceinturée bordeaux", category: "abayas", image: "/images/story-journee.jpg", alt: "Femme portant une abaya bordeaux avec ceinture en cuir", badge: "Nouveau", price: null, colors: ["wine", "black"], sizes: CLOTHING_SIZES, material: "Crêpe", createdAt: "2026-11-15", popularity: 6 },
  { id: "p08", slug: "ensemble-doux-rose-poudre", name: "Ensemble doux rose poudré", category: "ensembles", image: "/images/story-matin.jpg", alt: "Ensemble rose poudré avec hijab ivoire", price: null, colors: ["blush", "ivory"], sizes: CLOTHING_SIZES, material: "Lin", createdAt: "2026-10-08", popularity: 7 },
  { id: "p09", slug: "abaya-manches-bouffantes", name: "Abaya manches bouffantes", category: "abayas", image: "/images/product-abaya.jpg", alt: "Abaya bordeaux à manches bouffantes", price: null, colors: ["wine", "ivory", "black"], sizes: CLOTHING_SIZES, material: "Crêpe", createdAt: "2026-09-28", popularity: 8 },
  { id: "p10", slug: "pyjama-velours-bordeaux", name: "Pyjama velours bordeaux", category: "pyjamas", image: "/images/category-pyjamas.jpg", alt: "Pyjama en velours bordeaux plié sur un lin ivoire", price: null, colors: ["wine", "blush"], sizes: CLOTHING_SIZES, material: "Velours", createdAt: "2026-09-20", popularity: 10 },
  { id: "p11", slug: "ensemble-deux-pieces", name: "Ensemble deux pièces", category: "ensembles", image: "/images/category-ensembles.jpg", alt: "Chemise ivoire et jupe plissée bordeaux", badge: "−15 %", price: null, compareAtPrice: null, colors: ["wine", "ivory"], sizes: CLOTHING_SIZES, material: "Mousseline", createdAt: "2026-09-10", popularity: 11 },
  { id: "p12", slug: "robe-fluide-longue", name: "Robe fluide longue", category: "abayas", image: "/images/category-abayas.jpg", alt: "Femme portant une robe fluide bordeaux", price: null, colors: ["black", "wine"], sizes: CLOTHING_SIZES, material: "Mousseline", createdAt: "2026-09-01", popularity: 12 },
];

export function toCardProduct(p: ShopProduct): CardProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    image: p.image,
    alt: p.alt,
    badge: p.badge,
    price: p.price,
    oldPrice: p.compareAtPrice,
    colors: p.colors.map((c) => colorOptions[c].hex),
    sizes: p.sizes.length > 0 ? p.sizes : undefined,
  };
}
