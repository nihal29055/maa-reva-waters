import { useEffect, useState } from "react";
import { Droplets, Menu, Phone, X } from "lucide-react";

import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL, handleOrderNow } from "@/lib/business";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("#home");
          }}
          className="flex min-w-0 items-center gap-2"
        >
          <Droplets className="size-7 shrink-0 text-brand" aria-hidden="true" />
          <span className="truncate text-base font-extrabold tracking-tight text-brand-navy sm:text-lg">
            {BUSINESS_NAME}
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              className="text-sm font-semibold text-brand-navy/80 transition-all duration-300 hover:text-brand"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 hover:text-brand-light"
          >
            <Phone className="size-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={handleOrderNow}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-brand-light hover:shadow-lg"
          >
            Order Now
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-lg p-2 text-brand-navy transition-all duration-300 hover:bg-brand-soft lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}

        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-navy transition-all duration-300 hover:bg-brand-soft"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand"
            >
              <Phone className="size-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleOrderNow();
              }}
              className="mt-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-all duration-300 hover:bg-brand-light"
            >
              Order Now
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
