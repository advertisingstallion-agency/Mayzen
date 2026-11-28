import type { Metadata } from "next";
import { CartView } from "@/components/account/cart-view";

export const metadata: Metadata = {
  title: "Mon panier",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <main className="flex-1 bg-ivory-50">
      <CartView />
    </main>
  );
}
