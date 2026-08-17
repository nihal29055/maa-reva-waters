import { useEffect, useState } from "react";
import { Droplets, Menu, Phone, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion

import brandLogo from "@/assets/maa-rewa-logo.jpg";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL, handleOrderNow } from "@/lib/business";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Quality", to: "/quality" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Top Bar */}
      <div className="hidden border-b border-gray-100 bg-gray-50/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-gray-600 sm:px-6">
          <p>Trusted RO water delivery for homes & offices in Jabalpur</p>
          <a href={`tel:${PHONE_TEL}`} className="font-semibold text-cyan-600 transition-colors hover:text-cyan-500">
            Call Now: {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-gray-200">
            <img src={brandLogo} alt="Maa Rewa Water Supply logo" className="size-full object-cover" />
          </span>
          <span className="truncate text-lg font-extrabold tracking-tight text-blue-950 sm:text-xl">
            {BUSINESS_NAME}
          </span>
          <Droplets className="size-5 shrink-0 text-cyan-500" aria-hidden="true" />
        </Link>

        {/* Desktop Links */}
        <div className="ml-auto hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "text-cyan-600" : "text-slate-600 hover:text-cyan-500"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
          
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-500"
          >
            <Phone className="size-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          
          <button
            type="button"
            onClick={handleOrderNow}
            className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-lg"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Menu (Animated with Framer Motion) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-gray-100 bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 pb-6 pt-4">
              {LINKS.map((l) => (
                <button
                  key={l.to}
                  type="button"
                  onClick={() => go(l.to)}
                  className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    location.pathname === l.to
                      ? "bg-cyan-50 text-cyan-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-cyan-600 bg-cyan-50/50"
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
                className="mt-4 w-full rounded-full bg-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-95"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}