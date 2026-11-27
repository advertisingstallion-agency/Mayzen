# Claude Code prompt: Story section ("Notre histoire")

Read `CLAUDE.md`, `docs/CLAUDE_CODE_PROMPT.md` (brand tokens) and the existing navbar, hero, categories and new-arrivals sections first. Reuse the same tokens, container and section-tag style. Follow the stack rules: Next.js App Router, Tailwind 4, shadcn components, lucide-react icons, Inter only. This section is static, so no API calls are needed. Do not add TanStack Query here.

## Goal
Build `src/components/sections/story.tsx` (server component by default; extract only the spinning badge or any hover logic into a small client component if needed) and add it to `src/app/page.tsx` after the new-arrivals section.

## Layout (desktop >= 1024px)
Section background: **wine-700 `#581C26`**, text ivory-100, `relative overflow-hidden`, padding `120px 0`. Two decorative 1px circle outlines in ivory (10% and 7% opacity): 800px circle at `right:-240px; top:-240px`, 640px circle at `left:-300px; bottom:60px`. Content sits above them in a two-column grid, `0.85fr 1.35fr`, gap 64px, items aligned to the top.

### Left column (text), vertical gap 28px
- Tag pill (not plain text): `rounded-full`, 1px border ivory-100/30, padding `8px 16px 8px 10px`, 12px uppercase, letter-spacing 0.14em, blush-300 text, with `public/brand/leaf-cream.png` (20px wide) before "Notre histoire".
- `h2`: "De l'aube jusqu'au soir, Meyla vous accompagne." 60px / line-height 1.06 / weight 500 / letter-spacing -0.035em, ivory. "Meyla vous accompagne." is blush-300.
- Paragraph (ivory-100/85, 18px, line-height 1.7, max-w 440px): "Chez Meyla, chaque pièce est pensée pour le confort, la douceur d'une belle matière et une allure qui vous ressemble : du premier café au dernier moment de calme."
- Three chips (rounded-full, 1px border ivory-100/30, 14px, ivory text, padding 8px 16px): Douceur, Élégance, Confiance.
- Button: shadcn Button `variant="light"` `size="brand"` (ivory-100 background, wine-700 text), label "Découvrir Meyla" followed by a lucide `ArrowRight` icon, linking to `/a-propos`.
- Next to the button: a 96px circle with a **blush-300 background**, a wine-700 SVG `textPath` rotating slowly (24s linear, none when reduced motion) with the text "PUDIQUE • ÉLÉGANTE • AU QUOTIDIEN •" (viewBox 120, circle r=45, font-size 9, weight 600, letter-spacing 2.4), and a 28px `leaf-wine.png` fixed in the centre.

### Right column (three staggered day cards)
Flex row, gap 20px, `align-items: flex-start`. Each card is `height: 520px`, `overflow: hidden`, `position: relative`, `flex: 1 1 0`. Stagger with margin-top: card 1 = 0, card 2 = 72px, card 3 = 144px.

Each card uses `next/image` with `fill`, `sizes="(min-width:1024px) 22vw, 260px"`, `object-fit: cover`, and a bottom gradient `linear-gradient(to top, rgba(62,17,22,0.85), rgba(62,17,22,0) 55%)`. Top-left pill: `rounded-full`, ivory-50 at 90% opacity, wine-700 text, 12px semibold uppercase, letter-spacing 0.1em, padding 8px 14px, with a lucide icon (16px). Bottom-left: `h3` 26px weight 500 + 14px description in ivory.

| # | Radius | Image | Pill | Title | Description |
|---|--------|-------|------|-------|-------------|
| 1 | `2px` | `/images/story-matin.jpg`, object-position `center 20%` | `Sunrise` icon, "07:00 · Matin" | Ensembles | Des ensembles doux pour bien commencer la journée. |
| 2 | `160px 160px 2px 2px` (arch) | `/images/story-journee.jpg`, object-position `center top` | `Sun` icon, "13:00 · Journée" | Abayas & robes | Fluides et élégantes, du travail aux sorties. |
| 3 | `200px 2px 2px 2px` (big curved corner) | `/images/product-pyjama-satin.jpg` (temporary, replace with the evening photo when it exists), object-position `center` | `Moon` icon, "21:00 · Soir" | Pyjamas | Un satin doux pour finir la journée en beauté. |

Each card links to its category page (`/categories/ensembles`, `/categories/abayas-robes`, `/categories/pyjamas`) with the whole card as the link. On hover: image scale 1.04 over 500ms, no other movement. Add a visible focus ring.

Images are already in `public/images/`: `story-matin.jpg`, `story-journee.jpg`, `story-ensemble.jpg` (blouse + pleated skirt, unused for now), plus the existing product images. All alt text is empty (`alt=""`) because the card titles carry the meaning.

## Responsive
- Below 1024px: stack columns, text first, cards below. Keep the stagger only at >= 1024px.
- Below 700px: horizontal scroll row for the cards (`overflow-x: auto`, `scroll-snap-type: x mandatory`, each card `flex: 0 0 260px`, margin-top 0), h2 38px, section padding `72px 0`.

## Quality bar
- Contrast 4.5:1 for all text (check text on the gradient).
- No layout shift: images use `fill` inside fixed-height cards.
- Keyboard navigable, `h2` is the only heading level 2 in this block, card titles are `h3`.
- No new dependencies. Run `pnpm lint` and `pnpm build` and fix anything that fails, then show me a short summary of the files you changed.
