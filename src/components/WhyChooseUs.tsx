import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Truck } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "RO Purified",
    text: "Advanced filtration for maximum health.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    text: "Fast, reliable logistics to keep you hydrated.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    text: "Reusable containers and safe packaging.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="quality" className="scroll-mt-20 bg-brand-soft py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-brand-navy/70">
            Every batch runs through a 7-stage process — sediment filtering, carbon treatment, RO
            membrane purification and UV finishing — before it is sealed and loaded for delivery.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center px-2 text-center"
            >
              <span className="mb-5 inline-flex size-16 items-center justify-center rounded-full bg-background shadow-sm">
                <Icon className="size-8 text-brand" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-brand-navy/70">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
