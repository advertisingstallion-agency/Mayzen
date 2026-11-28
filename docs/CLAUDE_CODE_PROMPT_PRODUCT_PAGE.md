# Claude Code prompt: Single product page (`/produits/[slug]`)

Read `CLAUDE.md`, `lib/products.ts` (created for the products page), `stores/cart-store.ts`, `hooks/use-add-to-cart.ts` and the existing product card first. Reuse the brand tokens and container. Match the design exactly.

## Stack rules (mandatory)
- Next.js App Router, Tailwind 4, Inter only, lucide-react icons, shadcn components (`Button`, `Accordion` or `Collapsible`, `Skeleton`, `Badge`, `Tooltip`).
- **TanStack Query** for all data: `useQuery` for the product (hydrate from the server with `HydrationBoundary` / `prefetchQuery`), `useMutation` for add to cart, wishlist and any form. Never `useEffect` for fetching.
- **Sonner** for every success and error message ("Ajouté au panier", "Choisissez une taille", API errors). try/catch around async work.
- Zod validates params and the API response; Axios instance from `lib/api.ts`; Zustand cart store.
- SEO: `generateMetadata` (title, description, OpenGraph image from the first product image), `generateStaticParams`, `notFound()` for unknown slugs, **Product JSON-LD** (name, image, description, offers with `priceCurrency: "MAD"`, aggregateRating if reviews exist), add product URLs to `app/sitemap.ts`.

## Files
- `app/produits/[slug]/page.tsx` (server): fetches the product, metadata, JSON-LD, renders `<ProductView />` and `<RelatedProducts />`.
- `app/api/products/[slug]/route.ts`: returns one product (mock data from `lib/products.ts`), 404 if missing.
- `components/product/product-view.tsx` (client): gallery + info. Split into `gallery.tsx`, `product-info.tsx`, `purchase-panel.tsx` if it gets long.
- `components/product/related-products.tsx`: "Complétez le look" row.
- `app/produits/[slug]/loading.tsx`: skeleton matching the layout.
- Extend the product type with: `description`, `details` (composition/entretien text), `images[]` (4), `colors[{name, hex}]`, `sizes[{label, inStock}]`, `rating`, `reviewCount`.

## Layout
Breadcrumb row (padding `28px 0`, 13px, muted-ink): Accueil > Catégorie (link) > **Nom du produit** (current). Then the main section (padding-bottom 112px): grid `7fr 5fr`, gap 72px, `items-start`. Under 1100px it is a single column, gap 48px.

### Gallery (left)
Grid `96px 1fr`, gap 16px (under 700px: single column, thumbnails in a row **below** the main image).
- **Thumbnails:** 96 x 120px buttons, 2px radius, blush-300 background, `object-cover`. Active: 2px wine-700 border and full opacity; inactive: transparent border and 70% opacity. `aria-pressed`, `aria-label="Photo n"`.
- **Main image:** `aspect-ratio: 4/5`, `next/image` `fill`, `priority` on the first image, `object-cover object-top`, background blush-300, border-radius `2px 2px 2px 150px` (one big curved bottom-left corner). Overlays: badge top-left ("Nouveau", wine-700/ivory, 11px uppercase), a 48px heart button top-right (wishlist mutation + Sonner toast), and a bottom-right pill (ivory-50/92, rounded-full, 13px, lucide `Maximize` icon) showing "1 / 4". Clicking the image opens a full-screen lightbox (shadcn `Dialog`) with arrow-key navigation. Swipe on mobile.

### Info panel (right, sticky at `top: 24px`, flex column, gap 28px)
1. Tag line: category name (12px uppercase, tracking 0.14em, cognac, 40px line before).
2. `h1`: product name, 52px (38px mobile), weight 500, line-height 1.04, letter-spacing -0.035em, wine-700.
3. Rating: five filled cognac `Star` icons (`role="img"` with `aria-label="5 étoiles sur 5"`) and a link "[4,9] / 5 · [NN] avis" (14px, muted, underlined) that scrolls to the reviews section. Keep the brackets until real data exists.
4. Price row: `[PRIX] MAD` (32px, weight 500, wine-700) and "Taxes incluses · paiement à la livraison" (14px muted). If a `compareAtPrice` exists, show it struck through.
5. Short description (16px, line-height 1.7, muted-ink).
6. **Couleur:** label "Couleur : **Bordeaux**" (selected name in bold wine-700); 40px round swatches, gap 14px; selected = 2px ivory gap + 1px wine-700 ring; `aria-pressed` and `aria-label` = colour name.
7. **Taille:** label "Taille : **M**" and on the right a "Guide des tailles" link with the lucide `Ruler` icon (opens a `Dialog` with a size table). Chips 56px min width, 48px high, 2px radius, gap 8px; selected = wine-700 fill; out of stock = line-through, 40% opacity, `disabled`.
8. **Purchase row:** a 56px-high quantity stepper (1px wine-700/30 border, lucide `Minus` / `Plus`, `aria-live="polite"` on the value, min 1, max 9) and the main `Button` (flex-1, 56px, wine-700 fill, ivory text, 13px uppercase, tracking 0.08em, lucide `ShoppingBag`) "Ajouter au panier". It runs the add-to-cart `useMutation`: if no size is selected, show a Sonner error "Choisissez une taille" and shake/focus the size group; on success show the "Ajouté au panier" toast with a "Voir le panier" action and open the cart drawer if it exists. Disabled with a spinner while pending.
9. Full-width outline `Button` "Commander sur WhatsApp" (56px, 1px wine-700 border, lucide `MessageCircle`) linking to the WhatsApp URL from `config/site.ts` with a prefilled message containing the product name, colour, size and URL.
10. **Reassurance panel:** blush-100 background, 2px radius, padding 24px, 3 columns (1 column under 700px), each with a 24px wine icon, a 14px semibold title and a 13px muted line: `Truck` "Livraison [24 à 72 h]" / "Partout au Maroc"; `Banknote` "Paiement à la livraison" / "Vous payez à la réception"; `RotateCcw` "Retours sous 7 jours" / "Échange facile".
11. **Accordion** (shadcn Accordion, single, first item open by default), top border and row borders 1px wine-700/14, title 17px weight 500 wine-700, `Plus`/`Minus` icon: **Description**, **Composition & entretien**, **Livraison & retours**. Body 15px, line-height 1.7, muted-ink, max-w 520px.

### Mobile sticky bar
Under 900px, show a fixed bottom bar (ivory-50, top border, safe-area padding) with the price and an "Ajouter au panier" button, visible once the main purchase row has scrolled out of view (IntersectionObserver).

## Complétez le look
Section `<section aria-labelledby="look-title">`, background ivory-100, padding `104px 0`. Header row: tag "Vous aimerez aussi", `h2` "Complétez le look." (52px, weight 500, letter-spacing -0.035em, wine-700, "le look." in cognac) and an underlined link "Toute la collection →" to `/boutique`. Then a 4-column grid (2 columns under 1100px) with the standard product card, gap 24px. Load the related products with `useQuery` (same category first, then others, excluding the current product).

## Content for the first product (Abaya crêpe fluide)
- Description: "Une abaya ample au tombé fluide, en crêpe doux et opaque. Manches bouffantes, fermeture discrète et ceinture fine pour structurer la silhouette sans perdre en confort."
- Colours: Bordeaux `#581C26`, Noir `#2A1215`, Ivoire `#F6EEE0`, Rose poudré `#EECBC5`. Sizes: S, M, L, XL in stock; XXL out of stock.
- Images: `story-journee.jpg`, `product-abaya.jpg`, `category-abayas.jpg`, `product-pyjama-satin.jpg` as temporary placeholders (replace with real product photos).
- Accordion: Description "Abaya ample en crêpe fluide, opaque et légère. Manches bouffantes à poignets boutonnés, fermeture devant discrète et ceinture fine en option. Longueur cheville, pensée pour une couverture complète." / Composition & entretien "Crêpe de polyester [100 %]. Lavage délicat à froid, à l'envers, sans sèche-linge. Repassage à basse température. Ne pas utiliser d'eau de Javel." / Livraison & retours "Livraison partout au Maroc en [24 à 72 h]. Paiement à la livraison. Retours et échanges sous 7 jours pour tout article non porté, avec son étiquette."
Keep the bracketed placeholders so they are easy to find.

## Quality bar
- Contrast 4.5:1, visible focus rings, full keyboard support (gallery, swatches, sizes, stepper, accordion, lightbox with Escape), `prefers-reduced-motion` respected.
- No layout shift: the gallery has fixed aspect ratios, the info panel reserves space for the price and buttons.
- One `h1`, accordion titles are `h2`.
- No new dependencies beyond shadcn components. Run `pnpm lint` and `pnpm build`, fix everything, then give me a short summary of the files you changed.
