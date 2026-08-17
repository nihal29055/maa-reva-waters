# Maa Rewa Water Supply — Landing Page

A single-page, mobile-first landing site for a Jabalpur water delivery business: sticky nav, gradient hero with animated wave, products, why-choose-us, dark contact footer, WhatsApp ordering, and a live-chat panel.

## Sections

1. **Navbar** (sticky, white, shadow on scroll) — droplet icon + wordmark, links that smooth-scroll to `#products`, `#quality`, `#contact`, visible phone number, and an "Order Now" button. Hamburger slide-down panel on mobile.
2. **Hero** — cyan/aqua gradient, headline "Pure & Healthy Water, Delivered to You.", subheadline, three frosted-glass pills (Water Pouches, Water Containers, 100% Pure), two CTAs, and an animated looping SVG wave divider into the white section below. `min-h-[85vh]` desktop / `70vh` mobile.
3. **Trust strip** — years in service / purification plant / customers served (Bisleri-style credibility cue, kept lean).
4. **Products** (`#products`) — 3 cards (Water Pouches, 20L Containers, Custom Event Supplies) with circular icon badges, hover lift, staggered scroll fade-in.
5. **Why Choose Us** (`#quality`) — soft blue background, 3 centered columns (RO Purified, Timely Delivery, Eco-Friendly) with a short "our quality process" line.
6. **Footer / Contact** (`#contact`) — deep navy; left: address, tel link, mailto link, social icons, plus "Chat on WhatsApp" and "Live Chat" buttons and a "Check delivery in your area" pincode touch next to the form; right: enquiry form (Name, Phone, Requirement dropdown) with validation, loading state, success confirmation. Bottom bar with copyright.
7. **Floating cluster** — pulsing WhatsApp button (bottom-right) and a live-chat button above it opening a slide-up chat panel with canned auto-reply.

## Order flow

`WHATSAPP_NUMBER` lives in one constants file. `handleOrderNow()` opens a pre-filled `wa.me` link in a new tab; a comment marks where a real cart/payment API would replace it. The floating button uses a different pre-filled message.

## Design system

Tokens added to `src/styles.css` in oklch: deep aqua `#0083b0`, bright cyan `#00b4db`, white, soft `#f0f8ff` section background, deep navy footer. Inter loaded via `<link>` in the root route head. Rounded-xl/2xl, soft shadows, `transition-all duration-300` on every button and card.

## Technical notes

- This project runs on **TanStack Router**, not `react-router-dom` — that package cannot be installed here. The equivalent is already in place: the home page lives at `src/routes/index.tsx`, and future `/products` or `/contact` pages are new files in `src/routes/` with zero refactor. Same outcome, different router.
- Components: `Navbar.tsx`, `Hero.tsx`, `TrustStrip.tsx`, `Products.tsx`, `WhyChooseUs.tsx`, `ContactFooter.tsx`, `FloatingActions.tsx`, `LiveChatPanel.tsx` under `src/components/`, composed in `src/routes/index.tsx`.
- Scroll animations: `framer-motion` (installed) with `whileInView`, once, ~20% threshold.
- Enquiry form: `@emailjs/browser` with `SERVICE_ID` / `TEMPLATE_ID` / `PUBLIC_KEY` placeholder constants at the top of the file and a comment on where to paste real credentials. Until real keys are added the form validates, shows loading, and shows the success message, but no email is actually delivered — if you'd prefer real submissions stored in a database from day one, that's a switch to Lovable Cloud instead.
- Icons: `lucide-react`. Emoji only inside the hero pills, as specified.
- SEO: unique `head()` title/description/og/twitter on the index route.
