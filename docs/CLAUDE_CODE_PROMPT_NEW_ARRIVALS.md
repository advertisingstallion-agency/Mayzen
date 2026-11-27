# Build the "New arrivals" section (Meyla Shop)

## Before you write any code
1. Read `AGENTS.md` and the relevant guides in `node_modules/next/dist/docs/` (Next.js 16, breaking changes).
2. Read what already exists: `app/globals.css` (brand tokens), `components/ui/*`, `config/*`, `components/providers.tsx`, `stores/*`, and the navbar, hero and categories components. **Reuse them. Do not create new tokens, fonts or buttons.** Same rules as before: Inter only, shadcn base-nova (no `asChild`, use the `render` prop), lucide-react only.
3. Build ONLY this section, add it to the home page right after the categories section, then stop.

## Stack rules (always follow)
- shadcn components (add what you need with the CLI, for example `toggle-group`, `popover`, `skeleton`), `lucide-react` icons, Tailwind only.
- Data: TanStack Query hook `hooks/use-products.ts` with `queryKey: ["products", { category }]`. There is no API yet, so the `queryFn` (through the Axios instance) returns the static list from `config/products.ts`, filtered by category and simulating a short delay. Keep the shape ready for a real API.
- Writes: "Ajout rapide" uses a TanStack **Mutation** (`hooks/use-add-to-cart.ts`) that calls the Zustand cart store. On success show `toast.success("Ajouté au panier")` (Sonner). On error show `toast.error(...)` with the shared `getErrorMessage` helper. Wrap async work in try/catch.
- Favourites: a small Zustand store `stores/wishlist-store.ts` (persisted). Toggling shows a Sonner toast.
- Loading: shadcn `Skeleton` cards (same grid). Empty state: "Aucun article pour le moment." plus a button "Voir tout" that resets the filter.
- Responsive, mobile first. Check 390, 768, 1024, 1440 px.

## Assets (already in `public/images/`)
All 3:4 portrait, 1086 × 1448:
- `product-ensemble.jpg`: ivory shirt + blush pleated skirt, ivory hijab
- `product-abaya.jpg`: wine crêpe abaya with matching hijab
- `product-pyjama-satin.jpg`: ivory satin pyjama set with wine piping
- `product-hijab-satin.jpg`: cognac satin hijab portrait

Use `next/image` with `fill` and `sizes="(min-width: 1100px) 25vw, 50vw"`. None of these are above the fold, so no `priority`.

## Product data (`config/products.ts`)
Type: `{ id, slug, name, category: "abayas" | "hijabs" | "pyjamas" | "ensembles", image, alt, badge?: "Nouveau" | "-20 %", price, oldPrice?, colors: string[], sizes?: string[] }`. Prices are **placeholders** (mark them with `// TODO: real price`). Do not invent anything else.

| Name | Category | Image | Badge | Colour dots | Sizes |
|---|---|---|---|---|---|
| Ensemble chemise & jupe plissée | ensembles | product-ensemble.jpg | Nouveau | #F6EEE0, #EECBC5, #581C26 | S, M, L, XL |
| Abaya crêpe fluide | abayas | product-abaya.jpg | none | #581C26, #2A1215, #EECBC5 | S, M, L, XL |
| Set pyjama en satin | pyjamas | product-pyjama-satin.jpg | -20 % (also set `oldPrice`) | #F6EEE0, #EECBC5, #581C26 | S, M, L, XL |
| Hijab satin | hijabs | product-hijab-satin.jpg | Nouveau | #8A4A2E, #581C26, #EECBC5 | none (one size) |

Alt texts (French): "Chemise ivoire et jupe plissée rose poudré avec hijab ivoire", "Abaya bordeaux en crêpe avec hijab assorti", "Pyjama en satin ivoire avec liseré bordeaux", "Hijab en satin couleur cognac".

## Layout

**Section:** background **ivory-100** (#F6EEE0), vertical padding 112px (64px on mobile). Container max width 1440px, horizontal padding 48px (24px below 900px), flex column, gap 48px.

**Header:** flex, space-between, items end, wraps, gap 24px.
- Left (gap 16px): eyebrow = a 40px × 1px cognac line + "NOUVEAUTÉS" (12px, weight 500, uppercase, letter-spacing 0.14em, cognac, gap 12px); H2 "Fraîchement arrivées" (52px, 34px below 560px, weight 500, line-height 1.05, letter-spacing -0.02em, wine-700).
- Right: filter group (shadcn `ToggleGroup`, type single, `aria-label="Filtrer par catégorie"`, wraps, gap 8px). Items: **Tout, Abayas & robes, Hijabs, Pyjamas, Ensembles**. Each is a pill: height 44px, padding 0 20px, radius full, 14px, weight 500. Selected: wine-700 background, ivory-100 text, wine border. Not selected: transparent, wine text, 1px border `rgba(88,28,38,0.3)`. Never allow an empty selection (fall back to "Tout"). Changing the filter updates the query key.

**Grid:** 4 columns, gap 24px. At 1100px and below: 2 columns. Use the same grid for the skeletons.

**Product card** (`article`, flex column, gap 16px):
- Image box: `aspect-ratio: 3/4`, `overflow: hidden`, radius 2px, background blush-300. Image `object-cover`. On hover the image scales to 1.04 over 600ms ease-out (not with `prefers-reduced-motion`).
- The image and the product name link to `/produits/{slug}`. Do not nest buttons inside links: use one stretched link and place the buttons above it.
- Badge, top-left 16px: padding 6px 12px, 11px, weight 500, uppercase, letter-spacing 0.12em. "Nouveau": wine-700 background, ivory-100 text. "-20 %": blush-300 background, wine-700 text. Show nothing when there is no badge.
- Heart button, top-right 8px: 44px circle, ivory-50 at 92%, wine-700 `Heart` icon 18px stroke 1.5, `aria-label` "Ajouter aux favoris" / "Retirer des favoris", `aria-pressed`. Filled icon when active.
- "Ajout rapide" button, bottom 12px, left and right 12px: height 48px, wine-700 background, ivory-100 text, 13px, weight 500, uppercase, letter-spacing 0.08em, 2px radius, `ShoppingBag` icon 18px, gap 10px. It is hidden by default (opacity 0, translateY 8px) and appears on card hover and on keyboard focus (`group-hover` and `focus-within`), 300ms ease-out. On touch screens and below 560px it is always visible. Behaviour: if the product has `sizes`, open a shadcn `Popover` with the size buttons (S, M, L, XL, 44px squares, selected = wine background) and a confirm button; selecting a size and confirming runs the mutation. If it has no sizes (the hijab), run the mutation directly.
- Info row, flex, space-between, items start, gap 12px:
  - Left (gap 8px): product name (`h3`, 17px, weight 500, line-height 1.3, ink) and colour dots (14px circles, gap 6px, `box-shadow: inset 0 0 0 1px rgba(88,28,38,0.2)`; give each an `aria-label`, or hide them as decorative and add an `sr-only` list of colours).
  - Right: price "{price} MAD" (15px, weight 500, wine-700, no wrapping). When there is an `oldPrice`, show it first, struck through, 13px, muted.

**CTA (bottom, centred):** outline button "Voir toutes les nouveautés" + `ArrowRight` (18px) linking to `/nouveautes`. Style: 52px high, padding 0 28px, 1px wine-700 border, wine-700 text, 13px, weight 500, uppercase, letter-spacing 0.08em, 2px radius; hover fills with wine-700 and ivory text.

**Entrance:** cards fade up (translateY 16px to 0, 400ms ease-out, 60ms stagger) the first time they enter the viewport. Skip it with `prefers-reduced-motion`.

## Rules
- No new colours outside the token table, no emoji, no other icon library, no extra sections.
- Add the section to `app/page.tsx` below the categories section.
- Keyboard: the filter, links, heart, quick add and popover must all work with Tab, Enter, Space and Escape, with a visible focus ring (2px wine-500, offset 2px).

## Done means
1. `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
2. Screenshots at 1440, 768 and 390 px wide look like the spec. Test each filter (including that Hijabs shows 1 card), the quick add on a product with sizes and on the hijab, and the favourite toggle.
3. A short summary of what you built and which files you changed.
