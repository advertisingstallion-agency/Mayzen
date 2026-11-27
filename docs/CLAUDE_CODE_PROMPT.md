# Build the Meyla Shop navbar + hero

## Before you write any code
1. Read `AGENTS.md`, then the relevant guides in `node_modules/next/dist/docs/`. This is Next.js 16 and it has breaking changes.
2. Open `components/ui/button.tsx` and `components.json`. The project uses shadcn **base-nova** (built on `@base-ui/react`), so there is no `asChild`. To render a button as a link, use the `render` prop, for example `<Button render={<Link href="/" />}>`.
3. Look at `docs/moodboard-reference.jpg` (brand moodboard) and `public/brand` and `public/images` (assets already added).

## What I'm building
Meyla Shop: an e-commerce store for women only, selling hijabi clothing (hijabs, abayas), pyjamas and sets. The site is in French, prices in MAD.

**Build ONLY the announcement bar, navbar and hero section on the home page. Then stop.** No other sections or pages. The links can point to routes that don't exist yet (404 is fine for now).

## Stack rules (always follow)
- Next.js App Router, TypeScript, Tailwind CSS. The project has no `src/` folder and the alias is `@/*`.
- shadcn components only, installed with the CLI (`npx shadcn@latest add sheet sonner`). Restyle them with the tokens below.
- Icons: `lucide-react` only.
- Data and errors: TanStack Query + TanStack Mutation, Axios instance in `lib/axios.ts`, Zod for validation, shadcn **Sonner** for every toast. Mount `QueryClientProvider` and `<Toaster />` once in a `components/providers.tsx`. Wrap every async operation in try/catch and show the error with `toast.error`.
- Zustand for client state (cart count).
- Lenis for smooth scroll (turn it off when `prefers-reduced-motion` is set).
- SEO: Metadata API in `layout.tsx` (title template, description, Open Graph, Twitter, `lang="fr"`), plus `app/robots.ts` and `app/sitemap.ts`.
- Responsive, mobile first. Check 390, 768, 1024 and 1440 px.

## Design tokens
Put them in `app/globals.css`, expose them in the Tailwind theme (`bg-wine-700`, `text-ivory-100`, and so on), and also map shadcn's `--primary`, `--background`, `--foreground`, `--border`, `--ring` to them. Light theme only.

| Token | Hex | Use |
|---|---|---|
| wine-900 | #3E1116 | announcement bar, dark layers |
| wine-700 | #581C26 | brand colour, hero background, buttons |
| wine-500 | #7A2E3B | hover, video placeholder |
| blush-300 | #EECBC5 | accents, badges, headline highlight |
| blush-100 | #F7E4E0 | soft backgrounds |
| ivory-100 | #F6EEE0 | text on wine, logo colour |
| ivory-50 | #FBF7F0 | page background |
| cognac | #8A4A2E | rare accent, eyebrows on light |
| ink | #2A1215 | body text |
| muted | #6E5A5C | secondary text |
| line | rgb(88 28 38 / 0.14) | hairlines |

- **Font:** Inter only (`next/font/google`, variable `--font-inter`). Replace Geist. Headings are Inter 500 with letter-spacing -0.02em. Do not use a serif; only the logo image is serif.
- **Shape:** buttons and cards have a 2px radius. Round shapes (circles, one big curved corner) are the brand motif.
- **Buttons:** height 52px, padding 0 28px, 13px, weight 500, uppercase, letter-spacing 0.08em, 18px icons with stroke 1.5.

## Assets (already in the project)
- `public/brand/logo-cream.png` (logo for dark backgrounds), `logo-wine.png` (for light backgrounds)
- `public/brand/leaf-cream.png`, `leaf-wine.png` (the leaf symbol)
- `public/images/category-abayas.jpg`, `category-pyjamas.jpg`, `category-ensembles.jpg` (round thumbnails)
- `public/images/product-pyjama-velours.jpg` (product card)
- The hero video does NOT exist yet. It will be added later as `public/videos/hero.mp4` (see "Hero video" below).

All photos are temporary crops from the moodboard. Use `next/image` for images.

## Layout (desktop 1440 wide; the whole hero is on a solid wine-700 background)

### 1. Announcement bar
- 40px high, wine-900 background, ivory text, 11px uppercase, weight 500, letter-spacing 0.12em.
- Messages scroll slowly from right to left in a loop (40s linear, seamless): "Livraison partout au Maroc", "Paiement à la livraison", "Retours sous 7 jours". Between messages put `leaf-cream.png` at 14px.
- Duplicate the track for a seamless loop, hide the duplicate from screen readers (`aria-hidden`) and add one `sr-only` line. Stop the animation with `prefers-reduced-motion`.

### 2. Navbar
- 72px high, sticky at the top of the page, wine-700 background, ivory text, 1px bottom border at ivory 15% opacity. Content max width 1440px, horizontal padding 48px (24px on mobile).
- 3-column grid `1fr auto 1fr`.
  - **Left (desktop, 1100px and up):** links Nouveautés, Hijabs, Abayas & robes, Pyjamas, Ensembles. 13px, uppercase, weight 500, letter-spacing 0.08em, gap 28px, underline slides in on hover.
  - **Left (below 1100px):** a menu icon button that opens a shadcn `Sheet` from the left with the same links, large (24px, weight 500), separated by hairlines.
  - **Centre:** `logo-cream.png`, 50px high, linking to `/`.
  - **Right:** icon buttons (44px touch target, lucide, 20px, stroke 1.5): Search, User, Heart, ShoppingBag. User and Heart are hidden below 700px. The cart button shows a small blush-300 circle badge (18px, 10px bold wine text) with the item count from the Zustand cart store. Hide the badge when the count is 0. Avoid hydration mismatch with the persisted store.
- Every icon button has an `aria-label` in French.

### 3. Hero (about 760px tall on desktop)
Two columns inside a relative container.

**Text column (left, 46% wide, vertically centred, left padding aligned with the navbar content):**
- Eyebrow: a 40px blush hairline, then "NOUVELLE COLLECTION · HIVER 2026" (12px, uppercase, 0.14em, weight 500, blush-300).
- `h1` on three lines: "Pudique," / "toujours" / "élégante." at 84px (68px below 1100px, 48px on mobile), weight 500, line-height 1, letter-spacing -0.03em, ivory-100. The last line "élégante." is blush-300.
- Paragraph, 28px below: "Hijabs, abayas, pyjamas et ensembles pensés pour vous : matières douces, coupes fluides, finitions soignées." 18px, line-height 1.6, ivory at 85%, max width 480px.
- Two buttons, 36px below, gap 12px (stacked full width on mobile):
  1. Light button (ivory-100 background, wine text): "Découvrir la collection" + `ArrowRight` → `/collections`
  2. Outline button (1px ivory at 50%, ivory text): "Pyjamas & ensembles" → `/collections/pyjamas`

**Video panel (right, 54% wide, bleeds to the right edge of the screen, full height of the hero):**
- Big curved top-left corner only: `border-radius: 340px 0 0 0`, `overflow: hidden`.
- Contains the video (see below), a pause/play button (44px circle, top-right 24px, ivory 1px border, dark translucent background) and a floating product card at the bottom-left (32px from edges, 340px wide, ivory-50 at 94% opacity, 12px padding, 2px radius): a 56×72 thumbnail (`product-pyjama-velours.jpg`), then "NOUVEAU" (11px uppercase, cognac), "Pyjama velours" (16px, weight 500, wine-700), "[PRIX] MAD" (13px, muted), and a 40px wine circle with an `ArrowUpRight` icon on the right. The whole card is a link to `/collections/pyjamas`.
- A round sticker (116px circle, blush-300) overlaps the left edge of the panel at the curve (`left: calc(46% - 58px)`, `top: 72px`): `leaf-wine.png` at 34px above "HIVER 2026" (10px, bold, uppercase, 0.14em, wine, two lines). Hide it below 900px.
- Below 900px: stack the layout. The text goes first and the video panel goes under it at full width, 520px high (420px on mobile) with `border-radius: 200px 200px 0 0`.

### 4. Category strip (bottom of the hero)
- Full width, 1px top border (ivory 15%), content max width 1440px, padding 20px 48px, flex, wraps, gap 16px.
- "EXPLORER" label (12px, uppercase, 0.14em, blush-300), hidden on mobile.
- Three pills: a round 44px photo (`category-abayas.jpg`, `category-pyjamas.jpg`, `category-ensembles.jpg`) inside a pill with a 1px ivory 30% border (padding 6px 20px 6px 6px, radius full, 14px weight 500). Labels: "Abayas & robes", "Pyjamas", "Ensembles". Hover: ivory 10% background.
- Far right: "TOUT VOIR" + `ArrowRight`, underlined, 13px uppercase.

## Hero video (important)
Build a `HeroVideo` client component.
- Source: `/videos/hero.mp4`. Attributes: `autoPlay muted loop playsInline preload="metadata"`, `object-cover`, fills the panel. Optional poster `/images/hero-poster.jpg` if it exists.
- The file does not exist yet. If the video fails to load (`onError`), show a **placeholder** instead: wine-500 background, a dashed 1px ivory 35% inner outline following the curved corner, a 72px outlined circle with a `Play` icon, "Votre vidéo ici", and below it "Format carré 1:1 · 1440 × 1440 / MP4, sans son, 8 à 15 s".
- Pause/play button toggles the video. If `play()` rejects, call `toast.error("La vidéo ne peut pas être lue pour le moment.")`.
- If the user prefers reduced motion, do not autoplay (pause it and show the poster/placeholder).
- Keep the video `aria-hidden` or give it an `aria-label`, and keep all text readable on top of it.

## Data
Prices and the cart are placeholders. Create `stores/cart-store.ts` (Zustand, persisted, with `addItem`, `removeItem`, `clear` and a count selector) and a small `config/site.ts` for the nav links, announcements and site info. Do not build a real API yet. If you need a data hook as an example, use TanStack Query, but do not invent products.

## Done means
1. `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass.
2. Take screenshots at 1440 and 390 px wide and compare them against this spec. Fix any difference in spacing, sizes or colours.
3. The navbar works with the keyboard (Tab order, visible focus ring in blush or ivory, Escape closes the menu).
4. No emoji, no other icon library, no extra sections, no new colours outside the table.

When finished, give me a short summary and the exact steps to add my real video.
