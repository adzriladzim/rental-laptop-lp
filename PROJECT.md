# PROJECT: Laptop Rental Landing Page

**Date:** 2026-08-31
**Status:** Hybrid Booking Flow — Active
**Reference:** Savanna Bromo rental system + PRD laptop-rental-prd.md

## Project Overview

Landing page untuk platform rental laptop dengan hybrid booking flow (web cek ketersediaan + WA sebagai backup).

## Tech Stack

- **Frontend:** Next.js 16.3.2 + React 19.2.8 + TypeScript
- **Styling:** Tailwind CSS v4 + Hallmark design system
- **Design:** Anti-AI-slop (no purple gradients, asymmetric layouts, display+body fonts)
- **Integration:** WhatsApp Web API (free) + structured message templates
- **Backend:** Express API at `localhost:8787` — `/public/availability` endpoint

## Booking Flow (Hybrid — 31 Aug 2026)

Web = opsional cek ketersediaan mandiri. WA bukan channel utama — user bisa langsung pesan via web.

```
Flow:
1. Hero + Value Prop
2. Recommendation Quiz (Developer/Designer/Student/Gaming)
3. /pesan → BookingFlow (step-based)
   S1: Pilih laptop (LaptopMatcher)
   S2: Pilih tanggal (AvailabilityCalendar — auto-fetch GET /public/availability)
   S3: Isi data + submit (race fix: counter, single-day fix, 409 handling)
   S4: Sukses → redirect /berhasil + WA backup (opsional)
4. WA fallback: generate structured message → wa.me redirect
```

## Key Components

- `src/app/pesan/page.tsx` — Booking page (replaced /ketersediaan)
- `src/components/booking/BookingFlow.tsx` — Multi-step booking (~470 lines)
- `src/components/booking/LaptopMatcher.tsx` — Laptop selection (Pesan=primary, WA=secondary)
- `src/components/booking/AvailabilityCalendar.tsx` — Calendar view (auto availability, no mock data)
- `src/components/booking/ContactForm.tsx` — API-only form submission
- `src/components/SiteHeader.tsx` — CTA changed to /pesan
- `src/lib/availability.ts` — DELETED (moved to backend API)
- `src/components/AvailabilityChecker.tsx` — DELETED
- `src/app/ketersediaan/page.tsx` — DELETED

## Dev Servers

| Server | Port | Purpose |
|--------|------|---------|
| LP | 3000 | Landing page (Next.js) |
| BY | 5173 | Backyard (admin) |
| BE | 8787 | Backend API (Express) |

## Review Fixes Applied

- **S2 race condition:** counter-based optimistic lock di BookingFlow
- **S3 single-day booking:** date picker fix + coarse availability check
- **S4 FAQ/metadata:** updated FAQ content + page metadata

## Design System (Hallmark)

- **Genre:** Editorial (anti-AI-slop default)
- **Typography:** Display font + Body font pairing (NOT single Inter)
- **Color:** OKLCH palette, single anchor hue, <5% accent
- **Layout:** Asymmetric bias (NOT centered everything)
- **Motion:** Exponential ease-out, reduced-motion alternatives

## Business Requirements

- **Target:** Expand from Instagram-only to web platform
- **Goal:** Structured lead generation → WhatsApp conversion
- **Advantage:** Real-time availability + smart recommendations
- **Reference:** Savanna Bromo trail rental system
- **Client req:** Web = opsi mandiri cek ketersediaan, WA bukan utama

## Development Commands

```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # ESLint check
```

## Uncommitted Changes (13 files)

Modified/deleted: AvailabilityChecker.tsx, lib/availability.ts, app/ketersediaan/page.tsx, BookingFlow.tsx, AvailabilityCalendar.tsx, LaptopMatcher.tsx, SiteHeader.tsx, ContactForm.tsx, faq.ts, page.tsx metadata, sitemap. **BELUM commit — tunggu instruksi user.**