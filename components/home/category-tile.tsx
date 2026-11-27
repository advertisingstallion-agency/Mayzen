"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/config/categories";

const placement: Record<Category["slug"], string> = {
  abayas: "min-[901px]:col-start-1 min-[901px]:row-span-2 min-[901px]:row-start-1",
  pyjamas: "min-[901px]:col-start-2 min-[901px]:row-span-2 min-[901px]:row-start-1",
  ensembles: "min-[561px]:max-[900px]:col-span-2 min-[901px]:col-span-1 min-[901px]:col-start-3 min-[901px]:row-span-2 min-[901px]:row-start-1",
};

const imagePosition: Record<Category["slug"], string> = {
  abayas: "object-top",
  pyjamas: "object-center",
  ensembles: "object-[center_30%]",
};

type Props = {
  category: Category;
  index: number;
};

export function CategoryTile({ category, index }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const archTop = category.slug === "abayas" || category.slug === "ensembles";

  return (
    <Link
      ref={ref}
      href={category.href}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
      className={[
        "group relative block overflow-hidden rounded-[2px] outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-500",
        "motion-safe:transition-[opacity,translate] motion-safe:duration-[400ms] motion-safe:ease-out",
        visible ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-4",
        "bg-wine-900",
        "min-h-[460px] min-[901px]:min-h-0",
        archTop && "min-[561px]:rounded-t-[222px] min-[561px]:rounded-b-[2px]",
        placement[category.slug],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <>
          <Image
            src={category.image ?? ""}
            alt={category.alt ?? ""}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            className={`object-cover ${imagePosition[category.slug]} motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.04]`}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-t from-wine-900/80 to-transparent ${
              category.slug === "pyjamas" ? "to-60%" : "to-50%"
            }`}
          />
      </>

      <div
        className="absolute inset-x-8 bottom-8 flex items-end justify-between"
      >
        <div className="flex flex-col gap-1.5">
          {category.count !== undefined && (
            <span
              className="text-xs font-medium uppercase tracking-[0.14em] text-blush-300"
            >
              {category.count} articles
            </span>
          )}
          <h3
            className="text-[30px] font-medium tracking-[-0.02em] text-ivory-100"
          >
            {category.name}
          </h3>
        </div>
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ivory-100 text-wine-700"
        >
          <ArrowUpRight className="size-5 stroke-[1.5]" />
        </span>
      </div>
    </Link>
  );
}
