"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Gallery } from "@/components/product/gallery";
import { ProductInfo } from "@/components/product/product-info";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/use-product";
import type { ProductDetail } from "@/lib/product-detail";

export function ProductView({ slug, initialProduct }: { slug: string; initialProduct?: ProductDetail }) {
  const { data: product, isPending, isError, refetch } = useProduct(slug, initialProduct);

  if (isPending) return <ProductSkeleton />;

  if (isError || !product) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-28 text-center">
        <p className="text-lg text-muted-ink">Impossible de charger ce produit.</p>
        <Button type="button" variant="outline-wine" size="brand" onClick={() => refetch()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 min-[900px]:px-12">
      <nav aria-label="Fil d'Ariane" className="py-7">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-ink">
          <li>
            <Link href="/" className="rounded-[2px] hover:text-wine-700 focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:outline-none">
              Accueil
            </Link>
          </li>
          <ChevronRight aria-hidden="true" className="size-3.5 stroke-[1.5]" />
          <li>
            <Link
              href={`/boutique?categorie=${product.category}`}
              className="rounded-[2px] hover:text-wine-700 focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:outline-none"
            >
              {product.categoryLabel}
            </Link>
          </li>
          <ChevronRight aria-hidden="true" className="size-3.5 stroke-[1.5]" />
          <li aria-current="page" className="font-medium text-wine-700">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 pb-28 min-[1100px]:grid-cols-[7fr_5fr] min-[1100px]:gap-[72px]">
        <Gallery product={product} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 min-[900px]:px-12">
      <div className="py-7">
        <Skeleton className="h-4 w-64 rounded-[2px] bg-blush-100" />
      </div>
      <div className="grid items-start gap-12 pb-28 min-[1100px]:grid-cols-[7fr_5fr] min-[1100px]:gap-[72px]">
        <Skeleton className="aspect-[4/5] rounded-[2px_2px_2px_150px] bg-blush-100" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-4 w-40 rounded-[2px] bg-blush-100" />
          <Skeleton className="h-14 w-4/5 rounded-[2px] bg-blush-100" />
          <Skeleton className="h-8 w-48 rounded-[2px] bg-blush-100" />
          <Skeleton className="h-24 w-full rounded-[2px] bg-blush-100" />
          <Skeleton className="h-14 w-full rounded-[2px] bg-blush-100" />
        </div>
      </div>
    </div>
  );
}
