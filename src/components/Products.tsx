import { motion } from "framer-motion";
import { Database, Package, Truck } from "lucide-react";

const PRODUCTS = [
  {
    icon: Package,
    title: "Water Pouches",
    text: "Ideal for events and daily quick hydration.",
  },
  {
    icon: Database,
    title: "20L Water Containers",
    text: "Perfect for homes and offices.",
  },
  {
    icon: Truck,
    title: "Custom Event Supplies",
    text: "Bulk orders for weddings and corporate gatherings.",
  },
];

export function Products() {
  return (
    <section id="products" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-3 text-base text-brand-navy/70">
            Everything you need, delivered fresh and pure.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
          {PRODUCTS.map(({ icon: Icon, title, text }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl bg-card p-8 shadow-md ring-1 ring-border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <span className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-brand-soft">
                <Icon className="size-7 text-brand" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-brand-navy/70">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
