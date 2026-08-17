import { motion } from "framer-motion";
import { Building2, CalendarCheck, Users } from "lucide-react";

const STATS = [
  { icon: CalendarCheck, value: "12+", label: "Years serving Jabalpur" },
  { icon: Building2, value: "2", label: "RO purification plants" },
  { icon: Users, value: "8,000+", label: "Homes & offices served" },
];

// Animation variants for the stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delays the animation of each card slightly
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export function TrustStrip() {
  return (
    <section aria-label="Our track record" className="bg-white pb-12 pt-16 sm:pt-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }} // Triggers when scrolling near the section
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 sm:grid-cols-3 sm:px-6"
      >
        {STATS.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            className="group flex flex-col items-center gap-5 rounded-3xl border border-blue-50 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5 sm:flex-row sm:p-6 sm:text-left"
          >
            {/* Icon Container with Hover Color Swap */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-500 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white">
              <Icon className="size-8" aria-hidden="true" />
            </div>
            
            <div className="min-w-0">
              <p className="text-3xl font-extrabold text-blue-950">{value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}