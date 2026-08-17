import { Database, Package, Truck, Droplets } from "lucide-react";

import waterContainer from "@/assets/water-container.jpg";
import waterHeroExtra from "@/assets/water-hero-extra.jpg";
import waterPouches from "@/assets/water-pouches.jpg";
import { ScrollReveal } from "@/components/ScrollReveal";

const PRODUCTS = [
  {
    icon: Package,
    title: "Water Pouches",
    text: "Ideal for events and daily quick hydration.",
    image: waterPouches,
  },
  {
    icon: Database,
    title: "20L Water Containers",
    text: "Perfect for homes and offices.",
    image: waterContainer,
  },
  {
    icon: Truck,
    title: "Custom Event Supplies",
    text: "Bulk orders for weddings and corporate gatherings.",
    image: waterHeroExtra,
  },
];

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section Header */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col items-center text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700">
              <Droplets className="size-4" aria-hidden="true" />
              Our Offerings
            </p>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
              Everything you need, <br className="hidden sm:block" />
              <span className="text-cyan-500">delivered fresh and pure.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              From daily home hydration to large-scale events, our multi-stage purified water is packaged safely to meet all your needs.
            </p>
          </div>
        </ScrollReveal>

        {/* Product Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map(({ icon: Icon, title, text, image }, i) => (
            <ScrollReveal key={title} delay={i * 0.15}>
              <article className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10">
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={image}
                    alt={title}
                    className="h-56 w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-500 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white">
                  <Icon className="size-7" aria-hidden="true" />
                </div>

                <h3 className="text-2xl font-bold text-blue-950 transition-colors group-hover:text-cyan-600">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {text}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}