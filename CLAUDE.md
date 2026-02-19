# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

БАСТ Недвижимость (BAST Real Estate) is a PropTech landing page and ecosystem platform. The project connects developers (застройщики), real estate agencies (агентства недвижимости), and buyers through QR-code technology for property transactions.

**Primary audiences:** Investors, property developers, real estate agencies, banks
**Business model:** SaaS subscriptions, transaction commissions, partner programs

## Technology Stack (Specified in concept.md)

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion (animations)
- **Forms:** React Hook Form + Zod validation
- **CMS:** Strapi or Contentful (planned)
- **Analytics:** Google Analytics 4 + Yandex Metrika + Hotjar
- **Hosting:** Vercel or AWS

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check (tsc --noEmit)
npm test             # Run tests
```

## Architecture

The landing page follows a section-based structure defined in `concept.md`:

1. **Hero Section** — 3D animated phone mockup, audience-segmented CTAs
2. **Problem Statement** — 3-column layout (developers, agencies, buyers)
3. **Solution** — Interactive QR workflow visualization
4. **Value Proposition** — Tabbed interface (developers, agencies, banks)
5. **How It Works** — 5-stage animated demo
6. **Technology & Security** — Tech stack, compliance (152-ФЗ)
7. **Business Model** — Revenue streams, unit economics (for investors)
8. **Team** — Founder cards
9. **Roadmap** — Timeline visualization
10. **FAQ** — Segmented by audience
11. **CTA Section** — 4 audience-specific conversion paths
12. **Footer** — Contacts, legal links

## Key Implementation Notes

- **Design language:** Premium, minimal, dark blue + gold accent, heavy whitespace
- **Typography:** Inter/Montserrat for headings, Sora for accents
- **Icons:** Linear style (Heroicons or Lucide)
- **Animations:** Scroll-triggered fade-in/slide-up, animated counters, 60 FPS target
- **Performance:** First paint <2s, PageSpeed 90+, lazy loading required

## Forms

Two lead-generation forms with CRM/webhook integration:
- **Partner form:** Company type, name, contact, region, object count
- **Investor form:** Name, fund name, document interest (Pitch Deck/Financial Model)

## Content Reference

All content, metrics, and copy are defined in `concept.md` (Russian). Key statistics to display:
- 2,500 objects
- 150+ realtors
- 40 developers
- ₽1.2B GMV
