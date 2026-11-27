import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      // Returns true when the product was added, false when it was removed.
      toggle: (id) => {
        const added = !get().ids.includes(id);
        set((state) => ({
          ids: added ? [...state.ids, id] : state.ids.filter((i) => i !== id),
        }));
        return added;
      },
    }),
    {
      name: "meyla-wishlist",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
