import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import heroWater from "@/assets/hero-water.jpg";
import waterContainer from "@/assets/water-container.jpg";
import waterPouches from "@/assets/water-pouches.jpg";
import { ScrollReveal } from "@/components/ScrollReveal";
import { handleOrderNow } from "@/lib/business";

const PILLS = ["💧 Water Pouches", "🛢️ Water Containers", "✨ 100% Pure"];

function Wave({ className, opacity }: { className: string; opacity: number }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute bottom-0 left-0 h-[70px] w-[200%] sm:h-[110px] ${className}`}
    >
      <path
        fill="var(--background)"
        fillOpacity={opacity}
        d="M0,64 C180,110 360,10 540,42 C720,74 900,120 1080,96 C1260,72 1380,32 1440,20 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

// NEW: Animated floating droplets background component
function FloatingDroplets() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
          style={{
            width: Math.random() * 40 + 20 + "px",
            height: Math.random() * 40 + 20 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const explore = () =>
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  const checkDelivery = () =>
    document.querySelector("#delivery-check")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative isolate flex min-h-[70vh] items-center overflow-hidden lg:min-h-[85vh] bg-blue-50">
      {/* 1. CLEAN BACKGROUND: Single image with a rich, refreshing gradient overlay */}
      <img
        src={heroWater}
        alt="Premium purified water"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 -z-30 size-full object-cover object-center"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-800/40" 
      />

      {/* 2. BACKGROUND ANIMATIONS: Renders the floating droplets */}
      <FloatingDroplets />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:py-28">
        
        {/* 3. TEXT CONTENT */}
        <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <ScrollReveal width="fit-content" delay={0.1}>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-900/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-100 backdrop-blur-sm">
              <ShieldCheck className="size-4 text-blue-400" aria-hidden="true" />
              Our Brand, Your Trust
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Pure &amp; Healthy Water, <br className="hidden lg:block" />
              <span className="text-cyan-400">Delivered to You.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-blue-100/90 sm:text-xl">
              Delivering the essence of purity straight to your doorstep. Refreshing Jabalpur every single day.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {PILLS.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md"
                >
                  {p}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-950 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-cyan-50 sm:w-auto"
              >
                Order Now
              </button>
              <button
                type="button"
                onClick={explore}
                className="w-full rounded-full border-2 border-white/80 bg-transparent px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 sm:w-auto"
              >
                Explore Products
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <button
              type="button"
              onClick={checkDelivery}
              className="mt-6 text-sm font-medium text-blue-200 underline decoration-blue-400/60 underline-offset-4 transition-colors hover:text-white"
            >
              Check delivery in your area
            </button>
          </ScrollReveal>
        </div>

        {/* 4. PRODUCT DISPLAY */}
        <ScrollReveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 mx-auto h-[22rem] w-full max-w-[28rem] sm:h-[26rem] sm:max-w-[32rem] lg:ml-auto lg:mr-0"
          >
            <img
              src={waterPouches}
              alt="Water pouches ready for supply"
              className="animate-float-slow absolute left-0 top-10 h-48 w-44 rounded-3xl border-4 border-white object-cover shadow-2xl sm:h-56 sm:w-52"
            />
            <img
              src={waterContainer}
              alt="20 litre water containers"
              className="animate-float-fast absolute right-0 top-0 h-64 w-52 rounded-3xl border-4 border-white object-cover shadow-2xl sm:h-72 sm:w-60"
            />
            <img
              src={heroWater}
              alt="Clean bottled water"
              className="animate-float-slow absolute bottom-0 left-16 h-48 w-60 rounded-3xl border-4 border-white object-cover shadow-2xl sm:left-20 sm:h-56 sm:w-64"
            />
          </motion.div>
        </ScrollReveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70px] overflow-hidden sm:h-[110px] z-20">
        <Wave className="animate-wave-slow text-background" opacity={0.45} />
        <Wave className="animate-wave-fast text-background" opacity={1} />
      </div>
    </section>
  );
}