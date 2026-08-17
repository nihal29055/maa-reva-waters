import { motion } from "framer-motion";
import { Beaker, Droplets, ShieldCheck, Truck } from "lucide-react";

const STEPS = [
  {
    icon: Beaker,
    title: "Source Testing",
    text: "Every water source is checked for TDS, taste, and safety before purification.",
  },
  {
    icon: ShieldCheck,
    title: "RO + UV Purification",
    text: "Advanced multi-stage RO with UV finishing ensures consistently pure drinking water.",
  },
  {
    icon: Droplets,
    title: "Hygienic Filling",
    text: "Pouches and containers are cleaned, sealed, and batch tagged in sanitized lines.",
  },
  {
    icon: Truck,
    title: "Fast Local Dispatch",
    text: "Orders are packed and dispatched quickly for same-day local delivery in Jabalpur.",
  },
];

export function QualityProcess() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Our Quality Process
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-brand-navy/70">
            A clear, transparent process that keeps Maa Rewa water clean, fresh, and trusted.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-2xl bg-brand-soft p-6 ring-1 ring-brand/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon className="size-6 text-brand" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-sm text-brand-navy/75">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
