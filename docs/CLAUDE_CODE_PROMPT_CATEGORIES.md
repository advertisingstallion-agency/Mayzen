# Build the "Shop by category" section (Meyla Shop)

## Before you write any code
1. Read `AGENTS.md` and the relevant guides in `node_modules/next/dist/docs/` (Next.js 16, breaking changes).
2. Read what already exists: `app/globals.css` (brand tokens: wine-*, blush-*, ivory-*, cognac, ink, muted, line), `components/ui/*`, `config/site.ts`, `components/providers.tsx`, and the navbar and hero components. **Reuse them. Do not create a second set of tokens, buttons or fonts.** Same rules as before: Inter only, shadcn base-nova (no `asChild`, use the `render` prop), lucide-react only.
3. Build ONLY this section, add it to the home page right after the hero, then stop.

## Stack rules (always follow)
- shadcn components, `lucide-react` icons, Tailwind only.
- Category data comes from a TanStack Query hook (`hooks/use-categories.ts`) using the Axios instance. There is no API yet, so the `queryFn` returns the static list from `config/categories.ts`. Keep it shaped so the real API can replace it later.
- While loading, show shadcn `Skeleton` tiles with the same grid. On error, wrap in try/catch and show `toast.error(...)` (Sonner), then render the static list as fallback so the page never looks broken.
- Responsive, mobile first. Check 390, 768, 1024, 1440 px.

## Assets (already in `public/`)
- `public/images/category-abayas.jpg` (2:3 portrait, woman in a wine abaya on stone steps)
- `public/images/category-ensembles.jpg` (2:3 portrait, ivory shirt + wine pleated skirt)
- `public/images/category-pyjamas.jpg` (3:2 landscape, wine velvet pyjama flat lay)
- `public/brand/leaf-wine.png` (leaf symbol, used on the Hijabs tile)
- Hijabs has no photo yet. Its tile is a blush colour block (see below). Use `next/image` with `fill` and proper `sizes`.

## Content (French)
- Eyebrow: "ACHETER PAR CATÉGORIE"
- Title (h2): "Trouvez votre style"
- Link top right: "TOUTE LA COLLECTION" → `/collections`

| Tile | Link | Image alt |
|---|---|---|
| Abayas & robes | `/collections/abayas` | "Femme portant une abaya bordeaux avec ceinture en cuir" |
| Hijabs | `/collections/hijabs` | (decorative, no image) |
| Pyjamas | `/collections/pyjamas` | "Pyjama en velours bordeaux plié sur un lin ivoire" |
| Ensembles | `/collections/ensembles` | "Chemise ivoire et jupe plissée bordeaux avec hijab assorti" |

Each tile also shows an article count: "{n} articles". Counts come from the hook. Until the API exists, hide the count line when the number is undefined (do not show fake numbers).

## Layout

**Section:** background ivory-50, vertical padding 112px (64px on mobile). Inner container max width 1440px, horizontal padding 48px (24px below 900px), flex column, gap 48px.

**Header:** flex, space-between, items end, wraps, gap 24px.
- Left column (gap 16px):
  - Eyebrow: a 40px × 1px cognac line + the text, 12px, weight 500, uppercase, letter-spacing 0.14em, colour cognac, gap 12px.
  - H2: 52px (34px below 560px), weight 500, line-height 1.05, letter-spacing -0.02em, colour wine-700.
- Right: text link with an `ArrowRight` icon (16px, stroke 1.5), 13px, weight 500, uppercase, letter-spacing 0.08em, wine-700, underlined with offset 6px, height 44px.

**Grid (desktop, 901px and up):** 3 columns `1.1fr 1fr 1.1fr`, 2 rows of 308px, gap 24px. Place tiles explicitly and keep DOM order Abayas, Hijabs, Pyjamas, Ensembles:
- Abayas & robes: column 1, rows 1 to 2 (tall)
- Hijabs: column 2, row 1
- Pyjamas: column 2, row 2
- Ensembles: column 3, rows 1 to 2 (tall)

**Tablet (900px and below):** 2 columns, automatic rows, tall tiles min-height 460px, small tiles min-height 300px. **Mobile (560px and below):** 1 column, tall tiles get a plain 2px radius.

## Tile design
Every tile is one `Link` (the whole tile is clickable), `position: relative`, `overflow: hidden`, `border-radius: 2px`, `group` for hover, visible focus ring (2px wine-500, offset 2px).

- **Tall tiles (Abayas, Ensembles):** top corners are a big arch: `border-radius: 222px 222px 2px 2px` on desktop. Photo fills the tile with `object-cover`; Abayas uses `object-position: center top`, Ensembles `center 30%`. Background wine-900 while loading.
- **Pyjamas tile:** photo `object-cover`, `object-position: center`.
- **Scrim on photo tiles:** gradient from the bottom, `rgba(62,17,22,0.8)` at 0% to transparent at 50% (60% on the Pyjamas tile) so the text stays readable.
- **Hijabs tile:** blush-300 background, no photo. Put `leaf-wine.png` at 220px, positioned top -10px / right -20px, opacity 0.18, rotated 12deg, `aria-hidden`.
- **Label (bottom):** absolutely positioned, left and right 32px, bottom 32px (28px on the small tiles), flex, space-between, items end.
  - Left block, gap 6px: article count (12px, weight 500, uppercase, letter-spacing 0.14em; blush-300 on photos, cognac on the Hijabs tile) and the name as `h3` (30px on tall tiles, 28px on small ones, weight 500, letter-spacing -0.02em; ivory-100 on photos, wine-700 on the Hijabs tile).
  - Right: a 48px circle with an `ArrowUpRight` icon (20px, stroke 1.5). On photo tiles: ivory-100 background, wine-700 icon. On the Hijabs tile: wine-700 background, ivory-100 icon.
- **Hover (desktop):** the image scales to 1.04 over 600ms ease-out. Respect `prefers-reduced-motion` (no scale).
- **Entrance:** each tile fades up (translateY 16px to 0, 400ms ease-out, small stagger) when it enters the viewport, only once. Skip it with `prefers-reduced-motion`.

## Rules
- No new colours outside the token table, no emoji, no other icon library, no extra sections.
- Use `next/image` `priority` on none of these images (they are below the fold) and give each a `sizes` value that matches the grid.
- Add the section to `app/page.tsx` below the hero.

## Done means
1. `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
2. Screenshots at 1440, 768 and 390 px wide look like the spec (arch tops, correct grid placement, readable text on every tile).
3. Keyboard: Tab reaches each tile in order, focus ring is visible.
4. Short summary of what you built and which files you changed.
