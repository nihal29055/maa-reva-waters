import { Building2, CalendarCheck, Users } from "lucide-react";

const STATS = [
  { icon: CalendarCheck, value: "12+", label: "Years serving Jabalpur" },
  { icon: Building2, value: "2", label: "RO purification plants" },
  { icon: Users, value: "8,000+", label: "Homes & offices served" },
];

export function TrustStrip() {
  return (
    <section aria-label="Our track record" className="bg-background pb-4 pt-10 sm:pt-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 sm:grid-cols-3 sm:px-6">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl bg-brand-soft px-5 py-5 transition-all duration-300 hover:shadow-md"
          >
            <Icon className="size-8 shrink-0 text-brand" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-2xl font-extrabold text-brand-navy">{value}</p>
              <p className="text-sm text-brand-navy/70">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
