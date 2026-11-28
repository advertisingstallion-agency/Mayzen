"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedProducts } from "@/hooks/use-related-products";
import { toCardProduct } from "@/lib/products";

const gridClass = "grid grid-cols-2 gap-x-4 gap-y-10 min-[1100px]:grid-cols-4 min-[900px]:gap-x-6";

export function RelatedProducts({ slug }: { slug: string }) {
  const { data, isPending, isError, refetch } = useRelatedProducts(slug);

  return (
    <section aria-labelledby="look-title" className="bg-ivory-100 py-[72px] min-[900px]:py-[104px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 min-[900px]:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-cognac">
              <span aria-hidden="true" className="h-px w-10 bg-cognac" />
              Vous aimerez aussi
            </p>
            <h2
              id="look-title"
              className="text-4xl leading-[1.05] tracking-[-0.035em] text-wine-700 min-[700px]:text-[52px]"
            >
              Complétez <span className="text-cognac">le look.</span>
            </h2>
          </div>
          <Link
            href="/boutique"
            className="flex h-11 items-center gap-2 rounded-[2px] text-[13px] font-medium uppercase tracking-[0.08em] text-wine-700 underline underline-offset-[6px] outline-none focus-visible:ring-2 focus-visible:ring-wine-500"
          >
            Toute la collection
            <ArrowRight className="size-4 stroke-[1.5]" />
          </Link>
        </div>

        {isPending ? (
          <div className={gridClass} aria-busy="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-[3/4] rounded-[2px] bg-blush-100" />
                <Skeleton className="h-5 w-3/4 rounded-[2px] bg-blush-100" />
              </div>
            ))}
          </div>
        ) : isError || !data ? (
          <div className="flex flex-col items-center gap-6 py-10 text-center">
            <p className="text-lg text-muted-ink">Impossible de charger les suggestions.</p>
            <Button type="button" variant="outline-wine" size="brand" onClick={() => refetch()}>
              Réessayer
            </Button>
          </div>
        ) : (
          <div className={gridClass}>
            {data.map((item, i) => (
              <ProductCard key={item.id} product={toCardProduct(item)} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
