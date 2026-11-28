import { z } from "zod";
import { categoryKeys, colorKeys, materialKeys, sizeKeys } from "@/lib/products";

export const sortKeys = ["nouveautes", "prix-asc", "prix-desc", "populaires"] as const;
export type SortKey = (typeof sortKeys)[number];

export const sortLabels: Record<SortKey, string> = {
  nouveautes: "Nouveautés",
  "prix-asc": "Prix croissant",
  "prix-desc": "Prix décroissant",
  populaires: "Populaires",
};

// Price slider bounds. TODO: replace with the real min/max once prices exist.
export const PRICE_MIN = 0;
export const PRICE_MAX = 1000;

// Comma separated list, keeping only the allowed values.
function list<T extends readonly [string, ...string[]]>(allowed: T) {
  return z
    .string()
    .optional()
    .catch(undefined)
    .transform((value) =>
      (value ?? "")
        .split(",")
        .filter((item): item is T[number] => (allowed as readonly string[]).includes(item)),
    );
}

const priceRange = z
  .string()
  .optional()
  .catch(undefined)
  .transform((value): [number, number] => {
    const [min, max] = (value ?? "").split("-").map(Number);
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [PRICE_MIN, PRICE_MAX];
    const low = Math.max(PRICE_MIN, Math.min(min, max));
    const high = Math.min(PRICE_MAX, Math.max(min, max));
    return [low, high];
  });

// Shared by the page (URL) and the API route (query string).
export const shopParamsSchema = z.object({
  categorie: z.enum(categoryKeys).optional().catch(undefined),
  couleur: list(colorKeys),
  taille: list(sizeKeys),
  matiere: list(materialKeys),
  prix: priceRange,
  promo: z
    .string()
    .optional()
    .catch(undefined)
    .transform((value) => value === "1"),
  tri: z.enum(sortKeys).catch("nouveautes"),
});

export type ShopFilters = z.output<typeof shopParamsSchema>;

export const apiQuerySchema = shopParamsSchema.extend({
  page: z.coerce.number().int().min(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(48).catch(12),
});

export const productsResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      category: z.enum(categoryKeys),
      image: z.string(),
      alt: z.string(),
      badge: z.string().optional(),
      price: z.number().nullable(),
      compareAtPrice: z.number().nullable().optional(),
      colors: z.array(z.enum(colorKeys)),
      sizes: z.array(z.enum(sizeKeys)),
      material: z.enum(materialKeys),
      createdAt: z.string(),
      popularity: z.number(),
    }),
  ),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  facets: z.object({ materials: z.record(z.string(), z.number()) }),
});

export type ProductsResponse = z.infer<typeof productsResponseSchema>;

export function isDefaultFilters(f: ShopFilters) {
  return (
    !f.categorie &&
    f.couleur.length === 0 &&
    f.taille.length === 0 &&
    f.matiere.length === 0 &&
    !f.promo &&
    f.prix[0] === PRICE_MIN &&
    f.prix[1] === PRICE_MAX
  );
}

// Builds the query string for the URL: only non-default values are written.
export function filtersToSearchParams(f: ShopFilters) {
  const params = new URLSearchParams();
  if (f.categorie) params.set("categorie", f.categorie);
  if (f.couleur.length) params.set("couleur", f.couleur.join(","));
  if (f.taille.length) params.set("taille", f.taille.join(","));
  if (f.matiere.length) params.set("matiere", f.matiere.join(","));
  if (f.prix[0] !== PRICE_MIN || f.prix[1] !== PRICE_MAX) params.set("prix", `${f.prix[0]}-${f.prix[1]}`);
  if (f.promo) params.set("promo", "1");
  if (f.tri !== "nouveautes") params.set("tri", f.tri);
  return params;
}
