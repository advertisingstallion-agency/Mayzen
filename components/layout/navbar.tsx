"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/config/site";
import { selectCartCount, useCartStore } from "@/stores/cart-store";

const noopSubscribe = () => () => {};

function useCartCount() {
  const count = useCartStore(selectCartCount);
  // false on the server and during hydration, true afterwards.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return mounted ? count : 0;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-ivory-100/15 bg-wine-700 text-white">
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-6 min-[1100px]:px-12">
        <div className="flex items-center">
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-7 min-[1100px]:-ml-11 min-[1100px]:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[13px] font-medium uppercase tracking-[0.08em] outline-none focus-visible:ring-2 focus-visible:ring-blush-300"
              >
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="min-[1100px]:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="nav"
                    size="icon-nav"
                    aria-label="Ouvrir le menu"
                    className="-ml-2.5 text-white! hover:bg-white/10! focus-visible:ring-blush-300/60!"
                  />
                }
              >
                <Menu />
              </SheetTrigger>
              <SheetContent
                side="left"
                showCloseButton={false}
                className="w-[88%] max-w-[380px] gap-0 border-0 bg-wine-700 p-0 text-ivory-100"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-ivory-100/15 pl-6 pr-4">
                  <Image
                    src="/brand/logo-cream.png"
                    alt="Meyla Shop"
                    width={728}
                    height={348}
                    className="h-[44px] w-auto"
                  />
                  <SheetClose
                    render={<Button variant="nav" size="icon-nav" aria-label="Fermer le menu" />}
                  >
                    <X />
                  </SheetClose>
                </div>

                <nav aria-label="Menu mobile" className="flex flex-1 flex-col overflow-y-auto px-6 pt-4">
                  {navLinks.map((link, i) => (
                    <SheetClose
                      key={link.href}
                      nativeButton={false}
                      render={<Link href={link.href} />}
                      className="group flex items-center gap-4 border-b border-ivory-100/15 py-5 outline-none transition-colors hover:text-blush-300 focus-visible:text-blush-300"
                    >
                      <span className="w-6 text-xs font-medium tracking-[0.14em] text-blush-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-2xl font-medium tracking-[-0.02em]">{link.label}</span>
                      <ArrowRight className="size-5 stroke-[1.5] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </SheetClose>
                  ))}
                </nav>

                <div className="shrink-0 border-t border-ivory-100/15 px-6 py-6">
                  <div>
                    <SheetClose
                      nativeButton={false}
                      render={<Link href="/favoris" />}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-[2px] border border-ivory-100/30 text-[13px] font-medium uppercase tracking-[0.08em] outline-none transition-colors hover:bg-ivory-100/10 focus-visible:ring-2 focus-visible:ring-blush-300"
                    >
                      <Heart className="size-[18px] stroke-[1.5]" />
                      Favoris
                    </SheetClose>
                  </div>
                  <p className="mt-5 text-center text-[11px] uppercase tracking-[0.14em] text-ivory-100/60">
                    Livraison partout au Maroc
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Link
          href="/"
          aria-label="Meyla Shop, accueil"
          className="outline-none focus-visible:ring-2 focus-visible:ring-blush-300"
        >
          <Image
            src="/brand/logo-cream.png"
            alt="Meyla Shop"
            width={728}
            height={348}
            priority
            className="h-[50px] w-auto brightness-0 invert"
          />
        </Link>

        <div className="flex items-center justify-end">
          <Button
            variant="nav"
            size="icon-nav"
            aria-label="Mes favoris"
            nativeButton={false}
            className="hidden min-[700px]:inline-flex text-white! hover:bg-white/10! focus-visible:ring-blush-300/60!"
            render={<Link href="/favoris" />}
          >
            <Heart />
          </Button>
          <Button
            variant="nav"
            size="icon-nav"
            aria-label={
              count > 0
                ? `Panier, ${count} article${count > 1 ? "s" : ""}`
                : "Panier"
            }
            nativeButton={false}
            className="relative text-white! hover:bg-white/10! focus-visible:ring-blush-300/60!"
            render={<Link href="/panier" />}
          >
            <ShoppingBag />
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-0.5 top-0.5 flex size-[18px] items-center justify-center rounded-full bg-blush-300 text-[10px] font-bold text-wine-700"
              >
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
