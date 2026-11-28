// The minimal product shape the product card needs. Home and shop products both map to it.
export type CardProduct = {
  id: string;
  slug: string;
  name: string;
  image: string;
  alt: string;
  badge?: string;
  // null until real prices exist: the card then shows "[PRIX] MAD".
  price: number | null;
  oldPrice?: number | null;
  colors: string[];
  sizes?: string[];
};
