"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryTile } from "@/components/home/category-tile";
import { useCategories } from "@/hooks/use-categories";

const gridClass =
  "grid grid-cols-1 gap-6 min-[561px]:grid-cols-2 min-[901px]:grid-cols-[1.1fr_1fr_1.1fr] min-[901px]:grid-rows-[308px_308px]";

const skeletonClasses = [
  "min-[901px]:col-start-1 min-[901px]:row-span-2 min-[901px]:row-start-1",
  "min-[901px]:col-start-2 min-[901px]:row-span-2 min-[901px]:row-start-1",
  "min-[561px]:max-[900px]:col-span-2 min-[901px]:col-start-3 min-[901px]:row-span-2 min-[901px]:row-start-1",
];

export function CategoriesSection() {
  const { data, isPending } = useCategories();

  return (
    <section aria-labelledby="categories-title" className="bg-ivory-50 py-16 min-[900px]:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 min-[900px]:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-cognac">
              <span className="h-px w-10 shrink-0 bg-cognac" />
              Acheter par catégorie
            </p>
            <h2
              id="categories-title"
              className="text-[34px] leading-[1.05] tracking-[-0.02em] text-wine-700 min-[560px]:text-[52px]"
            >
              Trouvez votre style
            </h2>
          </div>
          <Button
            variant="link"
            nativeButton={false}
            render={<Link href="/collections" />}
            className="h-11 gap-2 px-0 text-[13px] font-medium uppercase tracking-[0.08em] text-wine-700 underline underline-offset-[6px] [&_svg]:size-4 [&_svg]:stroke-[1.5]"
          >
            Toute la collection
            <ArrowRight />
          </Button>
        </div>

        <div className={gridClass}>
          {isPending
            ? skeletonClasses.map((c, i) => (
                <Skeleton key={i} className={`min-h-[460px] rounded-[2px] bg-blush-100 min-[901px]:min-h-0 ${c}`} />
              ))
            : data?.map((category, i) => (
                <CategoryTile key={category.slug} category={category} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
