import { NextResponse } from "next/server";
import { getRelatedProducts } from "@/lib/product-detail";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return NextResponse.json({ items: getRelatedProducts(slug) });
}
