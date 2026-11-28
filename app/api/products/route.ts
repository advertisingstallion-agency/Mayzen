import { NextResponse, type NextRequest } from "next/server";
import { apiQuerySchema, type ProductsResponse } from "@/lib/shop-params";
import { materialKeys, shopProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const parsed = apiQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ message: "Paramètres invalides." }, { status: 400 });
  }
  const { categorie, couleur, taille, matiere, prix, promo, tri, page, pageSize } = parsed.data;

  // Small delay to behave like a real API (and show the skeletons).
  await new Promise((resolve) => setTimeout(resolve, 300));

  let items = shopProducts.filter((p) => {
    if (categorie && p.category !== categorie) return false;
    if (couleur.length && !p.colors.some((c) => couleur.includes(c))) return false;
    if (taille.length && !p.sizes.some((s) => taille.includes(s))) return false;
    if (matiere.length && !matiere.includes(p.material)) return false;
    if (promo && !p.badge?.startsWith("−")) return false;
    // Products without a price yet are not filtered out by the price range.
    if (p.price !== null && (p.price < prix[0] || p.price > prix[1])) return false;
    return true;
  });

  items = [...items].sort((a, b) => {
    if (tri === "prix-asc") return (a.price ?? 0) - (b.price ?? 0);
    if (tri === "prix-desc") return (b.price ?? 0) - (a.price ?? 0);
    if (tri === "populaires") return a.popularity - b.popularity;
    return b.createdAt.localeCompare(a.createdAt);
  });

  const total = items.length;
  const start = (page - 1) * pageSize;
  const materials = Object.fromEntries(
    materialKeys.map((m) => [m, shopProducts.filter((p) => p.material === m).length]),
  );

  const body: ProductsResponse = {
    items: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    facets: { materials },
  };
  return NextResponse.json(body);
}
