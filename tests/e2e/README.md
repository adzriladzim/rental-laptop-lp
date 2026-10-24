# E2E Tests — Landing Page (LP)

Playwright E2E test suite untuk landing page Sewaintop (Next.js).

## Prasyarat

1. Landing page jalan di `http://localhost:3000` (otomatis via `webServer`, atau `npm run dev` manual).
2. Backend API jalan di `http://localhost:8787` (`laptop-rental-backend`: `npm run dev` / `wrangler dev`).
   - Test booking happy path & calendar butuh live API (fallback data tanpa API tidak mengembalikan hasil booking).

## Install

```bash
npm install            # install @playwright/test + @axe-core/playwright
npx playwright install # install browser binaries
```

## Jalankan

```bash
npm run test:e2e       # full suite (desktop + tablet + mobile)
npm run test:e2e:list  # list semua test (verifikasi tanpa run)
npm run test:e2e:ui    # interactive UI mode
```

Filter per file/viewport:

```bash
npx playwright test booking        # hanya booking.spec.ts
npx playwright test --project=desktop
```

## Struktur

```
tests/e2e/
  helpers.ts            # util navigasi booking flow
  booking.spec.ts       # happy path: katalog -> detail -> wizard -> submit -> status
  calendar.spec.ts      # booked dates disabled, legend, warning saat API fail
  form-validation.spec.ts # required fields, doc1 != doc2, phone, agree
  responsive.spec.ts    # mobile 375 / tablet 768 / desktop 1280 (via project matrix)
  a11y.spec.ts          # axe-core, keyboard nav, focus
```

## Viewport Matrix

`playwright.config.ts` mendefinisikan 3 project:
- `mobile` — 375x812 (iPhone 13)
- `tablet` — 768x1024 (iPad Pro 11)
- `desktop` — 1280x800 (Desktop Chrome)

Semua test jalan di ketiga viewport. Test yang viewport-spesifik
(contoh responsive) tetap toleran karena assertion-nya berbasaskan
`scrollWidth <= clientWidth`, bukan pixel hardcoded.

## Catatan

- API key publik (`NEXT_PUBLIC_API_KEY`) didefinisikan di `.env` LP — Pastikan sama dengan `PUBLIC_API_KEY` backend (`lpr_public_dev_key` di dev).
- Test booking membuat data sungguhan di backend lokal — gunakan D1 lokal (wrangler dev), bukan production.
