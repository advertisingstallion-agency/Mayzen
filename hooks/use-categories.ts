import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { shopCategories, type Category } from "@/config/categories";

async function fetchCategories(): Promise<Category[]> {
  try {
    // No API yet. When it exists, replace with:
    // const { data } = await api.get<Category[]>("/categories"); return data;
    return shopCategories;
  } catch {
    toast.error("Impossible de charger les catégories. Veuillez réessayer.");
    return shopCategories;
  }
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
