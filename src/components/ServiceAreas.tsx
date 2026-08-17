import { MapPinCheck } from "lucide-react";

const AREAS = [
  "Civil Lines",
  "Wright Town",
  "Napier Town",
  "Gwarighat",
  "Madan Mahal",
  "Adhartal",
  "Ranjhi",
  "Kachnar City",
];

export function ServiceAreas() {
  return (
    <section className="bg-brand-navy py-14 text-brand-foreground sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-light">
            Delivery Coverage
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            We Deliver Across Jabalpur
          </h2>
          <p className="max-w-2xl text-sm text-brand-foreground/80">
            Quick daily routes for homes, offices, shops, events, and institutions.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {AREAS.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 transition-all duration-300 hover:bg-white/15"
            >
              <MapPinCheck className="size-4 text-brand-light" aria-hidden="true" />
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
