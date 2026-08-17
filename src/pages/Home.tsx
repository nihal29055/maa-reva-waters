import { useEffect } from "react";

import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FloatingActions } from "@/components/LiveChat";
import { Navbar } from "@/components/Navbar";
import { Products } from "@/components/Products";
import { QualityProcess } from "@/components/QualityProcess";
import { ServiceAreas } from "@/components/ServiceAreas";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";

type HomeProps = {
  focusSection?: "home" | "products" | "quality" | "contact";
};

export default function Home({ focusSection = "home" }: HomeProps) {
  useEffect(() => {
    const sectionId = `#${focusSection}`;
    const id = window.setTimeout(() => {
      document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [focusSection]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Products />
        <WhyChooseUs />
        <QualityProcess />
        <ServiceAreas />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
