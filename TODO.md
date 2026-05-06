# TODO: Sidebar Title Button + ICONSAINT Images

## Part 1: Sidebar Title Button
- [x] Update `Sidebar.tsx` — add `titleHref` prop, convert `<h2>` to `<NavLink>` button matching sub-item style
- [x] Update `OrthodoxSidebar.tsx` — pass `titleHref="/orthodox"`
- [x] Update `CatholicSidebar.tsx` — pass `titleHref="/catholic"`

## Part 2: ICONSAINT Data & Utilities
- [x] Create `src/data/iconSaintMap.ts` — mapping ICONSAINT folders → saint slugs
- [x] Create `src/components/IconSaintGallery.tsx` — reusable gallery component

## Part 3: Image Integration
- [x] Update `src/app/orthodox/icons/page.tsx` — real icon gallery with ICONSAINT images
- [x] Update `src/app/catholic/art/page.tsx` — art gallery with ICONSAINT images
- [x] Update `SaintDetailPage` in `src/app/addonPages.tsx` — use real images when available

## Part 4: Build & Test
- [x] Run `npm run build` to verify no errors — **PASSED** (734.92 kB, built in 6.74s)

