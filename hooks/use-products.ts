import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { products, type Product, type ProductCategory } from "@/config/products";
import { getErrorMessage } from "@/lib/errors";

export type ProductFilter = ProductCategory | "all";

async function fetchProducts(category: ProductFilter): Promise<Product[]> {
  try {
    // No API yet. When it exists, replace with:
    // const { data } = await api.get<Product[]>("/products", { params: { category } }); return data;
    await new Promise((resolve) => setTimeout(resolve, 400));
    return category === "all" ? products : products.filter((p) => p.category === category);
  } catch (error) {
    toast.error(getErrorMessage(error));
    throw error;
  }
}

export function useProducts(category: ProductFilter) {
  return useQuery({
    queryKey: ["products", { category }],
    queryFn: () => fetchProducts(category),
  });
}
