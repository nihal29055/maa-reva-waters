import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FloatingActions } from "@/components/LiveChat";
import { Navbar } from "@/components/Navbar";
import { Products } from "@/components/Products";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Products />
        <WhyChooseUs />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
