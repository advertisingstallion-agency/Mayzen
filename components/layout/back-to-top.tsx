"use client";

import { ArrowUp } from "lucide-react";
import { lenisRef } from "@/lib/lenis";

export function BackToTop() {
  function handleClick() {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Retour en haut"
      className="flex size-11 items-center justify-center rounded-full bg-blush-300 text-wine-700 outline-none transition-colors hover:bg-ivory-100 focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 focus-visible:ring-offset-wine-900"
    >
      <ArrowUp className="size-[18px] stroke-[1.5]" />
    </button>
  );
}
