import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Phone,
} from "lucide-react";

import { openLiveChat } from "@/components/LiveChat";
import {
  ADDRESS,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SUPPORT_MESSAGE,
  whatsappLink,
} from "@/lib/business";

/**
 * EmailJS credentials — replace these placeholders with the real values from
 * your EmailJS dashboard (Email Services → Service ID, Email Templates →
 * Template ID, Account → Public Key). Until then the form validates and shows
 * the success state, but no email is actually delivered.
 */
const EMAILJS_SERVICE_ID = "SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "PUBLIC_KEY";

const REQUIREMENTS = ["Water Pouches", "20L Container", "Bulk/Event Supply", "Other"];

const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export function ContactFooter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneValid = PHONE_RE.test(phone.replace(/\s|-/g, "").replace(/^\+91/, "9").slice(-10))
    ? true
    : PHONE_RE.test(phone.trim());
  const valid = name.trim().length > 1 && phoneValid && requirement !== "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, phone, requirement },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSent(true);
    } catch {
      // Placeholder credentials will land here; still confirm to the visitor
      // that we have their enquiry so the UI stays usable before setup.
      setError("We couldn't send that automatically. Please call or WhatsApp us instead.");
    } finally {
      setSending(false);
    }
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPincodeResult("Please enter a valid 6-digit pincode.");
      return;
    }
    setPincodeResult(
      clean.startsWith("482")
        ? "Great news — we deliver in your area, same day."
        : "We're outside this pincode right now. Message us and we'll arrange a bulk drop.",
    );
  };

  return (
    <footer id="contact" className="scroll-mt-20 bg-brand-navy py-16 text-brand-foreground sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Get in Touch</h2>
            <p className="mt-3 text-brand-foreground/70">
              Reach us however you like — we answer every enquiry the same day.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-light" aria-hidden="true" />
                <span className="text-brand-foreground/85">{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-brand-light" aria-hidden="true" />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="transition-all duration-300 hover:text-brand-light"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-brand-light" aria-hidden="true" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="transition-all duration-300 hover:text-brand-light"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink(SUPPORT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={openLiveChat}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <MessageSquareText className="size-4" aria-hidden="true" />
                Live Chat
              </button>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="grid size-9 place-items-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid size-9 place-items-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                aria-label="Call us"
                className="grid size-9 place-items-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
              >
                <Phone className="size-4" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
            <form onSubmit={checkPincode} className="mb-8">
              <label htmlFor="pincode" className="block text-sm font-semibold">
                Check delivery in your area
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="pincode"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="482001"
                  className="min-w-0 flex-1 rounded-lg bg-white/10 px-4 py-2.5 text-sm outline-none ring-brand-light placeholder:text-brand-foreground/40 focus:ring-2"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-brand-light px-4 py-2.5 text-sm font-bold text-brand-navy transition-all duration-300 hover:scale-105"
                >
                  Check
                </button>
              </div>
              {pincodeResult ? (
                <p className="mt-2 text-xs text-brand-foreground/80">{pincodeResult}</p>
              ) : null}
            </form>

            <h3 className="text-xl font-bold">Send an enquiry</h3>

            {sent ? (
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-whatsapp/15 p-4 text-sm ring-1 ring-whatsapp/40">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-whatsapp" aria-hidden="true" />
                <p>Thanks! We&apos;ll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm outline-none ring-brand-light placeholder:text-brand-foreground/40 focus:ring-2"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm outline-none ring-brand-light placeholder:text-brand-foreground/40 focus:ring-2"
                    placeholder="+91 98765 43210"
                  />
                  {phone.length > 0 && !phoneValid ? (
                    <p className="mt-1.5 text-xs text-brand-foreground/70">
                      Enter a valid 10-digit Indian mobile number.
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="requirement" className="block text-sm font-semibold">
                    Requirement
                  </label>
                  <select
                    id="requirement"
                    required
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-brand-foreground outline-none ring-brand-light focus:ring-2"
                  >
                    <option value="" className="text-brand-navy">
                      Select an option
                    </option>
                    {REQUIREMENTS.map((r) => (
                      <option key={r} value={r} className="text-brand-navy">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {error ? <p className="text-xs text-brand-foreground/80">{error}</p> : null}

                <button
                  type="submit"
                  disabled={!valid || sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-light px-6 py-3 text-sm font-bold text-brand-navy transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                  {sending ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6">
          <p className="text-center text-xs text-brand-foreground/70">
            © 2026 Maa Rewa Water Supply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
