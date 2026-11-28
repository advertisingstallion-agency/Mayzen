"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/home/product-card";
import { Filters } from "@/components/shop/filters";
import { PromoBanner } from "@/components/shop/promo-banner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopProducts } from "@/hooks/use-shop-products";
import { categoryLabels, categoryKeys, toCardProduct, type ShopCategory } from "@/lib/products";
import {
  filtersToSearchParams,
  shopParamsSchema,
  sortKeys,
  sortLabels,
  type ShopFilters,
  type SortKey,
} from "@/lib/shop-params";

const gridClass = "grid grid-cols-2 gap-x-4 gap-y-8 min-[900px]:grid-cols-3 min-[900px]:gap-x-6 min-[900px]:gap-y-10";
const focusRing = "outline-none focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50";

const pills: { value: ShopCategory | undefined; label: string }[] = [
  { value: undefined, label: "Tout" },
  ...categoryKeys.map((key) => ({ value: key, label: categoryLabels[key] })),
];

function SkeletonGrid() {
  return (
    <div className={gridClass} aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="aspect-[3/4] rounded-[2px] bg-blush-100" />
          <Skeleton className="h-5 w-3/4 rounded-[2px] bg-blush-100" />
          <Skeleton className="h-3.5 w-1/3 rounded-[2px] bg-blush-100" />
        </div>
      ))}
    </div>
  );
}

export function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // The URL is the single source of truth for the filters.
  const filters = useMemo(
    () => shopParamsSchema.parse(Object.fromEntries(new URLSearchParams(queryString))),
    [queryString],
  );

  function update(patch: Partial<ShopFilters>) {
    const qs = filtersToSearchParams({ ...filters, ...patch }).toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function reset() {
    router.replace(pathname, { scroll: false });
  }

  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useShopProducts(filters);

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const materialCounts = data?.pages[0]?.facets.materials;
  const cards = items.map((item) => toCardProduct(item));

  const filtersProps = { filters, materialCounts, onChange: update, onReset: reset };

  return (
    <>
      <div className="border-b border-wine-700/14 bg-ivory-50 py-5">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 min-[900px]:px-12">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Catégories">
            {pills.map((pill) => {
              const active = filters.categorie === pill.value;
              return (
                <button
                  key={pill.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ categorie: pill.value })}
                  className={`h-11 rounded-full border px-5 text-sm font-medium ${focusRing} ${
                    active
                      ? "border-wine-700 bg-wine-700 text-ivory-100"
                      : "border-wine-700/30 text-wine-700 hover:bg-wine-700/10"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          <div className="flex w-full items-center gap-3 min-[700px]:w-auto min-[700px]:gap-4">
            <p className="shrink-0 text-sm text-muted-ink" aria-live="polite">
              {isPending ? "Chargement…" : `${total} article${total > 1 ? "s" : ""}`}
            </p>

            <div className="shrink-0 min-[1100px]:hidden">
              <Sheet>
                <SheetTrigger
                  render={<Button type="button" variant="outline-wine" className="h-11 gap-2 rounded-[2px] px-4 text-sm" />}
                >
                  <SlidersHorizontal className="size-4 stroke-[1.5]" />
                  Filtres
                </SheetTrigger>
                <SheetContent side="left" className="w-[88%] max-w-[380px] overflow-y-auto bg-ivory-50 px-6 pb-8 pt-12">
                  <SheetTitle className="sr-only">Filtres</SheetTitle>
                  <Filters {...filtersProps} />
                </SheetContent>
              </Sheet>
            </div>

            <Select
              value={filters.tri}
              onValueChange={(value) => update({ tri: value as SortKey })}
              items={sortLabels}
            >
              <SelectTrigger
                aria-label="Trier par"
                className="h-11 min-w-0 flex-1 rounded-[2px] min-[700px]:min-w-[210px] min-[700px]:flex-none border-wine-700/30 bg-transparent px-4 text-sm text-wine-700 focus-visible:border-wine-700 focus-visible:ring-wine-500/40"
              >
                <span className="text-muted-ink max-[699px]:hidden">Trier par :</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {sortLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-28 pt-14 min-[900px]:px-12 min-[1100px]:grid-cols-[260px_1fr]">
        <aside className="hidden min-[1100px]:block">
          <div className="sticky top-24">
            <Filters {...filtersProps} />
          </div>
        </aside>

        <div>
          {isPending ? (
            <SkeletonGrid />
          ) : isError ? (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <p className="text-lg text-muted-ink">Impossible de charger les articles.</p>
              <Button type="button" variant="outline-wine" size="brand" onClick={() => refetch()}>
                Réessayer
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <p className="text-lg text-muted-ink">Aucun article ne correspond à vos filtres.</p>
              <Button type="button" variant="outline-wine" size="brand" onClick={reset}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <>
              <div className={gridClass}>
                {cards.slice(0, 6).map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>

              {cards.length > 3 && <PromoBanner />}

              {cards.length > 6 && (
                <div className={gridClass}>
                  {cards.slice(6).map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}

              <div className="mt-16 flex flex-col items-center gap-4">
                <p className="text-sm text-muted-ink">
                  Vous avez vu {items.length} articles sur {total}
                </p>
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={items.length}
                  aria-label="Articles affichés"
                  className="h-0.5 w-60 bg-wine-700/14"
                >
                  <div
                    className="h-full bg-wine-700"
                    style={{ width: `${total ? (items.length / total) * 100 : 0}%` }}
                  />
                </div>
                {hasNextPage && (
                  <Button
                    type="button"
                    variant="outline-wine"
                    size="brand"
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="mt-2"
                  >
                    Voir plus d&apos;articles
                    {isFetchingNextPage ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
