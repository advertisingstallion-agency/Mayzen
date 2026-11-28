import type { Metadata } from "next";
import { FavoritesView } from "@/components/account/favorites-view";

export const metadata: Metadata = {
  title: "Mes favoris",
  robots: { index: false },
};

export default function FavoritesPage() {
  return (
    <main className="flex-1 bg-ivory-50">
      <FavoritesView />
    </main>
  );
}
