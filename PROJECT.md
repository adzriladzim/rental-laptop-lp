# PROJECT: Laptop Rental Landing Page

**Date:** 2026-08-23  
**Status:** Phase 1 Implementation  
**Reference:** Savanna Bromo rental system + PRD laptop-rental-prd.md

## Project Overview

Landing page untuk platform rental laptop dengan focus anti-AI-slop design dan WhatsApp integration.

## Tech Stack

- **Frontend:** Next.js 16.3.2 + React 19.2.8 + TypeScript
- **Styling:** Tailwind CSS v4 + Hallmark design system
- **Design:** Anti-AI-slop (no purple gradients, asymmetric layouts, display+body fonts)
- **Integration:** WhatsApp Web API (free) + structured message templates

## Key Features (Phase 1)

1. **Recommendation Quiz** — 5 pertanyaan → suggest laptop sesuai kebutuhan
2. **Real-time Availability** — calendar view unit tersedia/tidak
3. **WhatsApp Integration** — generate structured booking message
4. **Smart Template** — pre-filled customer details + rental info + pricing

## Architecture

```
Landing Page Flow:
1. Hero + Value Prop
2. Recommendation Quiz (Developer/Designer/Student/Gaming)
3. Availability Calendar
4. Customer Details Form
5. Generate WhatsApp Template
6. Redirect to wa.me with structured message
```

## Design System (Hallmark)

- **Genre:** Editorial (anti-AI-slop default)
- **Typography:** Display font + Body font pairing (NOT single Inter)
- **Color:** OKLCH palette, single anchor hue, <5% accent
- **Layout:** Asymmetric bias (NOT centered everything)
- **Motion:** Exponential ease-out, reduced-motion alternatives

## Key Files

- `src/app/page.tsx` — Homepage
- `src/app/rekomendasi/page.tsx` — Recommendation quiz
- `src/app/ketersediaan/page.tsx` — Availability calendar  
- `src/components/WhatsAppBooking.tsx` — WhatsApp integration
- `src/lib/laptops.ts` — Laptop data + recommendation logic
- `src/lib/whatsapp.ts` — WhatsApp template generator

## Business Requirements

- **Target:** Expand from Instagram-only to web platform
- **Goal:** Structured lead generation → WhatsApp conversion
- **Advantage:** Real-time availability + smart recommendations
- **Reference:** Savanna Bromo trail rental system

## Development Commands

```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # ESLint check
```

## Next Steps

- [ ] Setup Hallmark design system
- [ ] Create recommendation quiz logic
- [ ] Build availability calendar
- [ ] Implement WhatsApp integration
- [ ] Deploy to Vercel/Netlify