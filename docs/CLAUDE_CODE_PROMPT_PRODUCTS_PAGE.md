# Claude Code prompt: Products page (`/boutique`)

Read `CLAUDE.md`, `config/site.ts`, `stores/cart-store.ts`, `components/ui/*` and the existing sections in `components/home/` first (especially the new-arrivals product card). Reuse the brand tokens, container and the existing product card. Match the design exactly.

## Stack rules (mandatory)
- Next.js App Router, Tailwind 4, Inter only, lucide-react icons, shadcn components (`Button`, `Select`, `Checkbox`, `Slider`, `Switch`, `Sheet`, `Skeleton`, `Badge`). Add missing shadcn components by hand if the CLI is blocked (this project uses base-ui: no `asChild`, use the `render` prop).
- **Data fetching with TanStack Query.** Reading products uses `useQuery` / `useInfiniteQuery`; any write (add to cart, wishlist) uses `useMutation`. Never fetch with `useEffect`.
- **Sonner** (`sonner`, shadcn `<Toaster />`) for every success and error message. Wrap async work in try/catch and show a toast with the error.
- Axios instance in `lib/api.ts`, Zod to validate query params and API responses, Zustand for the cart (already exists).
- Loading states: `Skeleton` cards that match the product card size (no layout shift). Error state: a friendly message with a "Réessayer" button.
- SEO: `generateMetadata`, canonical URL, add `/boutique` to `app/sitemap.ts`.

## Files to create
- `app/boutique/page.tsx` (server component): validates `searchParams` with Zod, sets metadata (title "Toute la collection | Meyla Shop"), renders the header and `<ShopClient />`.
- `components/shop/shop-client.tsx` (client): toolbar, filters, grid.
- `components/shop/product-card.tsx`: reuse/extend the existing card (see below).
- `components/shop/filters.tsx`: sidebar content (also used inside a `Sheet` on mobile).
- `app/api/products/route.ts`: GET handler that returns mock data from `lib/products.ts` with pagination and filtering. Validate query with Zod, return `{ items, total, page, pageSize }`.
- `lib/products.ts`: typed product array (id, slug, name, category, price, compareAtPrice?, badge?, colors, sizes, material, images, createdAt). 12 products to start, copied from the list below. Prices stay `null` and render as `[PRIX] MAD` until real prices exist.
- `hooks/use-products.ts`: `useInfiniteQuery` hook keyed by the filters; `hooks/use-add-to-cart.ts`: `useMutation` that updates the Zustand cart and shows a Sonner toast ("Ajouté au panier") or an error toast.

## Page head
Section background ivory-100 `#F6EEE0`, `relative overflow-hidden`, padding `40px 0 72px`. A decorative 700px circle in blush-100 at `right:-180px; top:-260px` (`aria-hidden`).
- Breadcrumb (13px, muted-ink): Accueil > **Boutique** (current, wine-700, weight 500), `aria-label="Fil d'Ariane"`, lucide `ChevronRight` separators.
- Tag: "Collection Hiver 2026" (12px uppercase, tracking 0.14em, cognac, with a 40px line before it).
- `h1`: "Toute la collection." 80px (64px under 1100px, 44px on mobile), weight 500, line-height 1, letter-spacing -0.04em, wine-700; "collection." is cognac.
- Intro (18px, muted-ink, max-w 480px): "Hijabs, abayas, pyjamas et ensembles : des pièces pensées pour la pudeur, la douceur et l'élégance au quotidien."
- On the right (hidden under 1100px): three arch tiles 132 x 176px, border-radius `66px 66px 2px 2px`, staggered down by 0 / 36 / 72px, with label under each (12px uppercase). Images: `/images/category-abayas.jpg`, `/images/category-pyjamas.jpg`, `/images/category-ensembles.jpg`. Each links to the matching filtered page.

## Toolbar
Background ivory-50, `border-bottom: 1px solid wine-700/14`, padding `20px 0`.
- Left: category pills (Tout, Hijabs, Abayas & robes, Pyjamas, Ensembles), 44px high, rounded-full; active = wine-700 background with ivory text, inactive = 1px wine-700/30 border. `aria-pressed`.
- Right: "{n} articles" (14px muted-ink), the "Filtres" button (only under 1100px, opens the `Sheet` with the filters), and a shadcn `Select` "Trier par : Nouveautés" (options: Nouveautés, Prix croissant, Prix décroissant, Populaires).
- All filters live in the URL query string (`?categorie=&couleur=&taille=&prix=&matiere=&promo=&tri=`) so pages are shareable and the back button works. Update with `router.replace(..., { scroll: false })`.

## Listing
Container `max-w-[1440px] px-6 min-[900px]:px-12`, padding `56px 0 112px`. Grid `260px 1fr`, gap 56px (single column under 1100px, sidebar hidden).

### Sidebar (sticky, `top: 24px`)
Header row: "Filtres" (20px, weight 500, wine-700) and a "Réinitialiser" text button, `border-bottom: 1px solid wine-700`. Then blocks separated by 1px wine-700/14 lines, padding `24px 0`, each with a 12px uppercase cognac title:
- **Couleur:** 32px round swatches (`#581C26`, `#2A1215`, `#F6EEE0`, `#EECBC5`, `#8A4A2E`, `#F7E4E0`), selected = 2px wine ring with 2px ivory gap, `aria-pressed` and an accessible name for each.
- **Taille:** chips XS, S, M, L, XL (48px min width, 44px high, 2px radius), selected = wine-700 fill.
- **Prix:** shadcn `Slider` with two thumbs, values shown as "[MIN] MAD" and "[MAX] MAD" (replace with real min/max once prices exist).
- **Matière:** shadcn `Checkbox` list: Satin, Velours, Crêpe, Lin, Mousseline, each with its count on the right (13px muted).
- **Offres:** shadcn `Switch` "En promotion".

### Grid
- `grid-template-columns: repeat(3, 1fr)`, gap `40px 24px` (2 columns under 900px with gap `32px 16px`).
- First 6 products, then the **promo banner**, then the rest (only show the banner when there are more than 3 results; show the second grid only when there are more than 6).
- **Promo banner:** wine-700 background, ivory text, border-radius `2px 2px 2px 140px`, `overflow-hidden`, grid `1.2fr 1fr`, min-height 300px (stacks under 900px). Left: a blush-300 tag "Offre de saison" (11px uppercase), `h2` "Jusqu'à −20 % sur les pyjamas en velours." 40px, weight 500, letter-spacing -0.03em ("−20 %" in blush-300), and an ivory-100 `Button` "Voir l'offre" with an `ArrowRight` icon linking to `/boutique?categorie=pyjamas&promo=1`. Right: `/images/product-pyjama-velours.jpg` cover, position center 30%. A faint 420px ring outline in the top-right corner.
- **Product card** (same as home): 3:4 image on a blush-300 background, 2px radius, hover scale 1.04 over 600ms; badge top-left (11px uppercase; "Nouveau" = wine/ivory, "−x %" = blush/wine); a heart button 44px top-right (toggles wishlist via `useMutation` + Sonner toast); an "Ajout rapide" button sliding up on hover (always visible on touch) that opens a size picker if the product has sizes, or adds directly; below: name (17px, weight 500) with colour dots (14px) and the price `[PRIX] MAD` (15px, weight 500, wine-700) on the right. The whole card links to `/produits/[slug]`.
- Under the grid, centred: "Vous avez vu {n} articles sur {total}" (14px muted), a 240px x 2px progress bar (wine-700 fill), and an outline `Button` "Voir plus d'articles" with `ArrowRight` that calls `fetchNextPage` (disabled with a spinner while loading). Page size 12.

### Empty and error states
- No results: centred message "Aucun article ne correspond à vos filtres." with a "Réinitialiser les filtres" button.
- Error: Sonner error toast plus an inline "Réessayer" button.

## Initial products (`lib/products.ts`)
| Name | Category | Image | Badge | Colours |
|---|---|---|---|---|
| Abaya crêpe fluide | abayas | product-abaya.jpg | Nouveau | wine, black, ivory |
| Ensemble lin & jupe plissée | ensembles | product-ensemble.jpg | Nouveau | ivory, wine, blush |
| Pyjama en velours | pyjamas | product-pyjama-velours.jpg | −20 % | wine, blush, cognac |
| Hijab satin | hijabs | product-hijab-satin.jpg | none | blush, ivory, wine |
| Set pyjama en satin | pyjamas | product-pyjama-satin.jpg | none | wine, blush-100 |
| Jupe plissée vin | ensembles | product-ensemble.jpg | none | wine, black |
| Abaya ceinturée bordeaux | abayas | story-journee.jpg | Nouveau | wine, black |
| Ensemble doux rose poudré | ensembles | story-matin.jpg | none | blush, ivory |
| Abaya manches bouffantes | abayas | product-abaya.jpg | none | wine, ivory, black |
| Pyjama velours bordeaux | pyjamas | category-pyjamas.jpg | none | wine, blush |
| Ensemble deux pièces | ensembles | category-ensembles.jpg | −15 % | wine, ivory |
| Robe fluide longue | abayas | category-abayas.jpg | none | black, wine |

## Responsive and quality bar
- Under 1100px: sidebar becomes a `Sheet` from the left; tiles in the page head are hidden.
- Under 900px: two-column grid; the promo banner stacks.
- Contrast 4.5:1, visible focus rings, keyboard-accessible filters, `prefers-reduced-motion` respected.
- No new dependencies beyond shadcn components. Run `pnpm lint` and `pnpm build`, fix everything, then give me a short summary of the files you changed.
