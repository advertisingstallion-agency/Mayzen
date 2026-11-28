import { NextResponse } from "next/server";
import { getProductDetail } from "@/lib/product-detail";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) {
    return NextResponse.json({ message: "Produit introuvable." }, { status: 404 });
  }
  return NextResponse.json(product);
}
