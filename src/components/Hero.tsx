import heroWater from "@/assets/hero-water.jpg";
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

export function Hero() {
  const explore = () =>
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-[linear-gradient(135deg,var(--brand-light),var(--brand))] lg:min-h-[85vh]"
    >
      <img
        src={heroWater}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand-light)_75%,transparent),color-mix(in_oklab,var(--brand)_85%,transparent))]"
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-28">
        <h1 className="text-4xl font-extrabold tracking-tight text-brand-foreground sm:text-5xl lg:text-6xl">
          Pure &amp; Healthy Water, Delivered to You.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-brand-foreground/90 sm:text-lg">
          Delivering the essence of purity straight to your doorstep.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {PILLS.map((p) => (
            <li
              key={p}
              className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm text-brand-foreground backdrop-blur-md"
            >
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleOrderNow}
            className="rounded-lg bg-background px-7 py-3.5 text-sm font-bold text-brand shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Order Now
          </button>
          <button
            type="button"
            onClick={explore}
            className="rounded-lg border border-white/70 bg-transparent px-7 py-3.5 text-sm font-bold text-brand-foreground transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            Explore Products
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70px] overflow-hidden sm:h-[110px]">
        <Wave className="animate-wave-slow" opacity={0.45} />
        <Wave className="animate-wave-fast" opacity={1} />
      </div>
    </section>
  );
}
