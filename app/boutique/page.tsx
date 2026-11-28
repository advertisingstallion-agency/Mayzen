import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";
import { ShopHead } from "@/components/shop/shop-head";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Toute la collection",
    description:
      "Hijabs, abayas, pyjamas et ensembles : des pièces pensées pour la pudeur, la douceur et l'élégance au quotidien.",
    alternates: { canonical: "/boutique" },
  };
}

export default function ShopPage() {
  return (
    <main className="flex-1">
      <ShopHead />
      {/* The filters live in the URL (useSearchParams), so the client part sits in Suspense. */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1440px] px-6 py-14 min-[900px]:px-12">
            <Skeleton className="h-[600px] rounded-[2px] bg-blush-100" />
          </div>
        }
      >
        <ShopClient />
      </Suspense>
    </main>
  );
}
