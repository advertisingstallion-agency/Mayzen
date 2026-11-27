"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProductCard } from "@/components/home/product-card";
import { useProducts, type ProductFilter } from "@/hooks/use-products";

const filters: { value: ProductFilter; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "abayas", label: "Abayas & robes" },
  { value: "hijabs", label: "Hijabs" },
  { value: "pyjamas", label: "Pyjamas" },
  { value: "ensembles", label: "Ensembles" },
];

const gridClass = "grid grid-cols-2 gap-x-6 gap-y-10 min-[1101px]:grid-cols-4 max-[560px]:gap-x-4";

const filterItemClass =
  "h-11 rounded-full border border-wine-700/30 bg-transparent px-5 text-sm font-medium text-wine-700 hover:bg-wine-700/10 hover:text-wine-700 aria-pressed:border-wine-700! aria-pressed:bg-wine-700! aria-pressed:text-ivory-100! focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100";

export function NewArrivalsSection() {
  const [filter, setFilter] = useState<ProductFilter>("all");
  const { data, isPending, isError, refetch } = useProducts(filter);

  function handleFilterChange(value: string[]) {
    // Never allow an empty selection: fall back to "Tout".
    setFilter((value[0] as ProductFilter | undefined) ?? "all");
  }

  return (
    <section aria-labelledby="arrivals-title" className="bg-ivory-100 py-16 min-[900px]:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 min-[900px]:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-cognac">
              <span className="h-px w-10 shrink-0 bg-cognac" />
              Nouveautés
            </p>
            <h2
              id="arrivals-title"
              className="text-[34px] leading-[1.05] tracking-[-0.02em] text-wine-700 min-[560px]:text-[52px]"
            >
              Fraîchement arrivées
            </h2>
          </div>
          <ToggleGroup
            aria-label="Filtrer par catégorie"
            value={[filter]}
            onValueChange={handleFilterChange}
            spacing={2}
            className="flex-wrap"
          >
            {filters.map((f) => (
              <ToggleGroupItem key={f.value} value={f.value} className={filterItemClass}>
                {f.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {isPending ? (
          <div className={gridClass} aria-busy="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-[3/4] rounded-[2px] bg-blush-100" />
                <Skeleton className="h-5 w-3/4 rounded-[2px] bg-blush-100" />
                <Skeleton className="h-3.5 w-1/3 rounded-[2px] bg-blush-100" />
              </div>
            ))}
          </div>
        ) : isError || !data || data.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-16 text-center">
            <p className="text-lg text-muted-ink">
              {isError ? "Impossible de charger les articles." : "Aucun article pour le moment."}
            </p>
            <Button
              type="button"
              variant="outline-wine"
              size="brand"
              onClick={() => (isError ? refetch() : setFilter("all"))}
            >
              {isError ? "Réessayer" : "Voir tout"}
            </Button>
          </div>
        ) : (
          <div className={gridClass}>
            {data.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            variant="outline-wine"
            size="brand"
            nativeButton={false}
            render={<Link href="/nouveautes" />}
          >
            Voir toutes les nouveautés
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
