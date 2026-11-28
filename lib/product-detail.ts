import { z } from "zod";
import { categoryKeys } from "@/lib/products";
import {
  categoryLabels,
  colorOptions,
  shopProducts,
  type ShopProduct,
} from "@/lib/products";

export const productDetailSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  category: z.enum(categoryKeys),
  categoryLabel: z.string(),
  badge: z.string().optional(),
  // null until real prices exist.
  price: z.number().nullable(),
  compareAtPrice: z.number().nullable().optional(),
  description: z.string(),
  details: z.object({
    description: z.string(),
    care: z.string(),
    delivery: z.string(),
  }),
  images: z.array(z.object({ src: z.string(), alt: z.string() })).min(1),
  colors: z.array(z.object({ name: z.string(), hex: z.string() })),
  sizes: z.array(z.object({ label: z.string(), inStock: z.boolean() })),
  // null until real reviews exist: the page then shows "[4,9] / 5 · [NN] avis".
  rating: z.number().nullable(),
  reviewCount: z.number().nullable(),
});

export type ProductDetail = z.infer<typeof productDetailSchema>;

const imagePool = [
  "/images/story-journee.jpg",
  "/images/product-abaya.jpg",
  "/images/category-abayas.jpg",
  "/images/product-pyjama-satin.jpg",
  "/images/story-matin.jpg",
  "/images/product-ensemble.jpg",
];

const DELIVERY =
  "Livraison partout au Maroc en [24 à 72 h]. Paiement à la livraison. Retours et échanges sous 7 jours pour tout article non porté, avec son étiquette.";

// Hand-written content for the first product. TODO: replace the placeholder photos with real ones.
const abaya = {
  description:
    "Une abaya ample au tombé fluide, en crêpe doux et opaque. Manches bouffantes, fermeture discrète et ceinture fine pour structurer la silhouette sans perdre en confort.",
  details: {
    description:
      "Abaya ample en crêpe fluide, opaque et légère. Manches bouffantes à poignets boutonnés, fermeture devant discrète et ceinture fine en option. Longueur cheville, pensée pour une couverture complète.",
    care: "Crêpe de polyester [100 %]. Lavage délicat à froid, à l'envers, sans sèche-linge. Repassage à basse température. Ne pas utiliser d'eau de Javel.",
    delivery: DELIVERY,
  },
  images: [
    { src: "/images/story-journee.jpg", alt: "Femme portant une abaya bordeaux avec ceinture en cuir" },
    { src: "/images/product-abaya.jpg", alt: "Abaya bordeaux en crêpe avec hijab assorti" },
    { src: "/images/category-abayas.jpg", alt: "Abaya bordeaux sur des marches en pierre" },
    { src: "/images/product-pyjama-satin.jpg", alt: "Photo produit temporaire" },
  ],
  colors: [
    { name: "Bordeaux", hex: "#581C26" },
    { name: "Noir", hex: "#2A1215" },
    { name: "Ivoire", hex: "#F6EEE0" },
    { name: "Rose poudré", hex: "#EECBC5" },
  ],
  sizes: [
    { label: "S", inStock: true },
    { label: "M", inStock: true },
    { label: "L", inStock: true },
    { label: "XL", inStock: true },
    { label: "XXL", inStock: false },
  ],
};

function build(p: ShopProduct): ProductDetail {
  const isAbaya = p.slug === "abaya-crepe-fluide";
  const generic = {
    description: `[DESCRIPTION] ${p.name}.`,
    details: {
      description: `[DESCRIPTION DÉTAILLÉE] ${p.name}.`,
      care: `${p.material} [100 %]. Lavage délicat à froid, à l'envers, sans sèche-linge. Repassage à basse température.`,
      delivery: DELIVERY,
    },
    images: [
      { src: p.image, alt: p.alt },
      ...imagePool
        .filter((src) => src !== p.image)
        .slice(0, 3)
        .map((src, i) => ({ src, alt: `${p.name}, photo ${i + 2} (temporaire)` })),
    ],
    colors: p.colors.map((c) => ({ name: colorOptions[c].label, hex: colorOptions[c].hex })),
    sizes: p.sizes.map((label) => ({ label, inStock: true })),
  };
  const content = isAbaya ? abaya : generic;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryLabel: categoryLabels[p.category],
    badge: p.badge,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    ...content,
    rating: null,
    reviewCount: null,
  };
}

export function getProductDetail(slug: string): ProductDetail | undefined {
  const product = shopProducts.find((p) => p.slug === slug);
  return product ? build(product) : undefined;
}

export function getRelatedProducts(slug: string, limit = 4): ShopProduct[] {
  const current = shopProducts.find((p) => p.slug === slug);
  if (!current) return [];
  const others = shopProducts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
