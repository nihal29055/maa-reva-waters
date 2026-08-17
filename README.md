# Aqua Purity Project

# Lovable Build Prompt — Maa Rewa Water Supply

Build a modern, responsive, single-page landing website for a water delivery business called "Maa Rewa Water Supply", using React + React Router + TypeScript + Tailwind CSS + lucide-react. Structure it as a proper Lovable project with routing (even though it's a single page, set up react-router-dom with a "/" route pointing to the Home page, so future pages like /products or /contact can be added later without refactoring).

Design reference: Use bisleri.com as a loose reference for credibility patterns — not for visual style (ours stays cyan/aqua, not Bisleri's red), but for these UX cues: a trust-stat strip (years in service / plants / customers served), a clear "quality process" callout, a visible phone number in the header, multiple always-reachable contact channels in the footer, and a delivery-availability feel (e.g., a "Check delivery in your area" touch near the order flow). Adapt these ideas at the scale of a local Jabalpur water supply business, not a national brand — keep it lean, not corporate-bloated.

## Tech & Project Setup
- React + TypeScript + Vite
- React Router DOM (BrowserRouter, single "/" route rendering Home.tsx)
- Tailwind CSS for all styling — no inline styles, no CSS modules
- lucide-react for all icons (no emoji as icons in code, only in hero pills as specified below)
- Framer Motion for scroll-triggered fade-in animations (fallback to Tailwind animate- utilities if Framer Motion isn't available)
- Component-based structure: Navbar.tsx, Hero.tsx, Products.tsx, WhyChooseUs.tsx, Footer.tsx, all imported into Home.tsx
- Fully responsive, mobile-first (test breakpoints: 375px, 768px, 1024px, 1440px)

## Design System
- Primary colors: deep aqua blue #0083b0, bright cyan #00b4db, crisp white #ffffff, soft light-blue section background #f0f8ff
- Typography: Inter or Roboto (import via Google Fonts in index.html), bold and readable headings (font-weight 700–800 for H1/H2), regular body text with good line-height (1.6+)
- Vibe: refreshing, pure, trustworthy, professional — generous whitespace, soft rounded corners (rounded-xl/2xl), subtle shadows, no clutter
- Buttons: all buttons get smooth hover transitions (transition-all duration-300) — slight scale or shadow lift on hover, never an abrupt color snap

---

## 1. Navigation Bar (Sticky)
- Sticky to top (sticky top-0 z-50), white background with subtle shadow on scroll
- Left: blue water-drop icon (lucide Droplet or Droplets) + "Maa Rewa Water Supply" wordmark in bold
- Center/Right links: Home, Products, Quality, Contact — smooth-scroll to their respective section IDs (#products, #quality, #contact)
- Far right: solid blue "Order Now" button (bg-[#0083b0] hover bg-[#00b4db], white text, rounded-full or rounded-lg)
- On mobile: collapse links into a hamburger menu that opens a slide-down panel; keep the "Order Now" button visible or inside the mobile menu

## 2. Hero Section
- Full-width section with a smooth CSS linear-gradient(135deg, #00b4db, #0083b0) background
- Headline (H1): "Pure & Healthy Water, Delivered to You."
- Subheadline: "Delivering the essence of purity straight to your doorstep."
- Pills row (frosted-glass style: bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white text-sm):
  - "💧 Water Pouches"
  - "🛢️ Water Containers"
  - "✨ 100% Pure"
- CTA buttons (horizontal row, stack vertically on mobile):
  - "Order Now" — white background, blue text (#0083b0), rounded-lg, hover slightly darker white/shadow
  - "Explore Products" — transparent background, white border, white text, hover fills with white/10
- Wave divider: animated SVG wave pinned to the absolute bottom of the hero, transitioning smoothly into the white background of the Products section below. Use a layered SVG wave (viewBox="0 0 1440 120") with a subtle looping horizontal drift animation (CSS @keyframes translateX, 15–20s ease-in-out infinite)
- Hero should be tall enough to feel like a proper hero (min-h-[85vh] on desktop, min-h-[70vh] on mobile) with content vertically centered

## 3. Our Products Section (id="products")
- White background, section heading: "Our Products" with a short one-line subheading like "Everything you need, delivered fresh and pure."
- 3-column grid on desktop (grid-cols-3), stacking to 1 column on mobile, with generous gap
- Each card: white background, rounded-2xl, soft shadow, padding, icon in a colored circular badge at the top, title, short description
- Hover effect on all cards: lift (hover:-translate-y-2) + deeper shadow, smooth transition
- Card 1 — Water Pouches: icon Package — "Ideal for events and daily quick hydration."
- Card 2 — 20L Water Containers: icon Database — "Perfect for homes and offices."
- Card 3 — Custom Event Supplies: icon Truck — "Bulk orders for weddings and corporate gatherings."
- Fade-in-up animation on scroll (staggered per card, ~100ms delay between each)

## 4. Why Choose Us Section (id="quality")
- Background color #f0f8ff
- Section heading: "Why Choose Us"
- 3-column layout on desktop (stack on mobile), each column centered with a large icon, bold title, short supporting text:
  - RO Purified — icon ShieldCheck — "Advanced filtration for maximum health."
  - Timely Delivery — icon Truck (or Clock) — "Fast, reliable logistics to keep you hydrated."
  - Eco-Friendly — icon Leaf (or Recycle) — "Reusable containers and safe packaging."
- Fade-in animation on scroll, same staggered pattern as Products section

## 5. Footer / Contact Section (id="contact")
- Dark blue background (#012f42 or similar deep navy-blue, not pure black)
- Two-column layout on desktop: left = contact info, right = contact form; stack on mobile
- Contact info (left):
  - Address: "123 Rewa Road, Civil Lines, Jabalpur, Madhya Pradesh, 482001"
  - Phone: "+91 98765 43210" (clickable tel: link)
  - Email: "contact@maarewawater.in" (clickable mailto: link)
  - Small social icons row (lucide Facebook, Instagram, Phone) — decorative placeholder links (#) are fine
- Contact form (right) — wired to a real enquiry pipeline, not just UI:
  - Fields: Name (text), Phone Number (tel, with basic validation), Requirement (dropdown: "Water Pouches", "20L Container", "Bulk/Event Supply", "Other")
  - On submit, send the enquiry using EmailJS (@emailjs/browser) so form submissions land as real emails without needing a custom backend — set up the integration with clearly marked placeholder values (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) as constants at the top of the component/file, with a comment explaining where to plug in real EmailJS credentials
  - Show a success state (toast or inline confirmation message: "Thanks! We'll contact you shortly.") after submission, and a loading state on the submit button while sending
  - Basic client-side validation: required fields, phone number format check, disable submit button until valid
- Bottom bar: thin divider line, centered copyright text: "© 2026 Maa Rewa Water Supply. All rights reserved."

## 6. Order Now Button — Real Order Flow
- Both "Order Now" buttons (navbar and hero) should trigger a real ordering action rather than a dead link. Implement it as a WhatsApp order flow, the standard approach for local delivery businesses in India:
  - On click, open https://wa.me/919876543210?text= + a URL-encoded pre-filled message like "Hi, I'd like to order water from Maa Rewa Water Supply. Please share details on pricing and delivery." in a new tab
  - Store the WhatsApp number as a single constant (WHATSAPP_NUMBER) near the top of the app so it's a one-line change to update later
  - Add a code comment noting this can be swapped for a full checkout/cart flow (e.g., connected to a Razorpay or a custom orders API) once the business is ready to accept online payments — structure the button's onClick as its own handler function (handleOrderNow) so replacing WhatsApp with a real order API later is a drop-in change, not a rewrite

## 7. WhatsApp & Live Chat Access Points
- Floating WhatsApp button: fixed-position circular button (bottom-right, fixed bottom-6 right-6 z-50), WhatsApp-green background, MessageCircle icon from lucide-react (or an inline WhatsApp glyph), visible on every scroll position across the whole page — not just in the footer. Links to the same wa.me deep link as the Order Now button, with a slightly different pre-filled message ("Hi, I have a question about your water delivery service."). Add a subtle pulse/bounce animation to draw attention without being obnoxious
- Live chat button: a second floating button stacked just above the WhatsApp button (or toggled from the same cluster), opening a simple live-chat widget. Implement this as a lightweight custom chat UI (a slide-up panel with a header, message list, and input box) that's visually wired up and functional in the UI even if it just echoes a canned auto-reply for now — structure it so a real provider (Tawk.to, Crisp, Intercom, etc.) can be dropped in later via a single script/component swap. Add a code comment marking exactly where the real live-chat SDK would be initialized
- In the footer contact section, also add clearly labeled "Chat on WhatsApp" and "Live Chat" buttons/links alongside the phone and email, so contact methods aren't only floating — they're discoverable in-context too

## 8. Animation & Interaction Details
- Scroll-triggered fade-in (opacity 0→1, translateY 20px→0) for Products and Why Choose Us sections — trigger once when section enters viewport (~20% threshold)
- All buttons and cards use transition-all duration-300 ease-in-out — no jarring snaps
- Wave divider animation should be subtle and continuous, not distracting
- Keep overall motion tasteful and premium — this is a trust-and-purity brand, not a playful one

## Final Notes for Build
- Prioritize clean, semantic HTML structure and accessible markup (proper heading hierarchy, alt text on icons where relevant, labeled form inputs)
- No placeholder Lorem Ipsum — use the exact copy provided above throughout
- Optimize for a fast first impression: hero should render immediately with no layout shift

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/07c0f543-42ad-43b2-ae9e-b089c9f2f004).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
