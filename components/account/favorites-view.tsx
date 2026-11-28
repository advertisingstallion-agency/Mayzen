"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { shopProducts, toCardProduct } from "@/lib/products";
import { useWishlistStore } from "@/stores/wishlist-store";

export function FavoritesView() {
  const hydrated = useHydrated();
  const ids = useWishlistStore((s) => s.ids);
  const items = hydrated ? shopProducts.filter((p) => ids.includes(p.id)) : [];

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 min-[900px]:px-12 min-[900px]:py-24">
      <h1 className="text-[44px] leading-none tracking-[-0.04em] text-wine-700 min-[700px]:text-[64px]">
        Mes <span className="text-cognac">favoris.</span>
      </h1>

      {hydrated && items.length === 0 ? (
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-md text-lg text-muted-ink">
            Vous n&apos;avez pas encore de favoris. Touchez le cœur sur un article pour le retrouver ici.
          </p>
          <Button size="brand" nativeButton={false} render={<Link href="/boutique" />}>
            Voir la collection
            <ArrowRight />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 min-[900px]:grid-cols-3 min-[900px]:gap-x-6 min-[1100px]:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={toCardProduct(p)} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
