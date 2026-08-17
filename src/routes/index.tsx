import { createFileRoute } from "@tanstack/react-router";

import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { FloatingActions } from "@/components/LiveChat";
import { Navbar } from "@/components/Navbar";
import { Products } from "@/components/Products";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";

const TITLE = "Maa Rewa Water Supply — Pure RO Water Delivery in Jabalpur";
const DESCRIPTION =
  "RO purified water pouches, 20L containers and bulk event supply delivered across Jabalpur. Order on WhatsApp for same-day doorstep delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Products />
        <WhyChooseUs />
      </main>
      <ContactFooter />
      <FloatingActions />
    </div>
  );
}
