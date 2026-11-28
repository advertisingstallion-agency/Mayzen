"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { lenisRef } from "@/lib/lenis";
import { Toaster } from "@/components/ui/sonner";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -96 } });
    lenisRef.current = lenis;
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);
  return null;
}

// Scrolls to the top (or to the #section) whenever the page changes.
// Only the path is watched, so changing a filter (?query) does not jump.
function ScrollOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait one frame so the new page is laid out, then refresh Lenis' page height.
    const frame = requestAnimationFrame(() => {
      const hash = window.location.hash;
      const target = hash ? document.querySelector(hash) : null;
      const lenis = lenisRef.current;
      lenis?.resize();

      if (target instanceof HTMLElement) {
        if (lenis) lenis.scrollTo(target, { offset: -96, immediate: true });
        else target.scrollIntoView();
        return;
      }
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } }),
  );

  // Load the saved cart after hydration to avoid a server/client mismatch.
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <ScrollOnRouteChange />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
