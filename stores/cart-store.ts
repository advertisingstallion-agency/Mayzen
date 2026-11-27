import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { z } from "zod";

const cartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => {
        const valid = cartItemSchema.parse(item);
        set((state) => {
          const existing = state.items.find((i) => i.id === valid.id);
          if (!existing) return { items: [...state.items, valid] };
          return {
            items: state.items.map((i) =>
              i.id === valid.id ? { ...i, quantity: i.quantity + valid.quantity } : i,
            ),
          };
        });
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "meyla-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);
