import { useState } from "react";
import { motion } from "framer-motion";
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
  Map,
  Send
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
 * your EmailJS dashboard.
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
    } catch (sendError) {
      console.error(sendError);
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
    <footer id="contact" className="relative scroll-mt-20 bg-blue-950 text-blue-50">
      {/* Subtle top gradient separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* LEFT COLUMN: Info & Chat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-blue-200">
              Reach us however you like — we answer every enquiry the same day.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900/50 text-cyan-400 ring-1 ring-white/10">
                  <MapPin className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">Visit Us</p>
                  <p className="mt-1 text-sm leading-relaxed text-blue-200">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900/50 text-cyan-400 ring-1 ring-white/10">
                  <Phone className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  <a href={`tel:${PHONE_TEL}`} className="mt-1 block text-sm text-blue-200 transition-colors hover:text-cyan-400">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900/50 text-cyan-400 ring-1 ring-white/10">
                  <Mail className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email Us</p>
                  <a href={`mailto:${EMAIL}`} className="mt-1 block text-sm text-blue-200 transition-colors hover:text-cyan-400">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Chat Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={whatsappLink(SUPPORT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 transition-all hover:bg-[#25D366]/20"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={openLiveChat}
                className="inline-flex items-center gap-2 rounded-full bg-blue-800/50 px-6 py-3 text-sm font-semibold text-cyan-400 ring-1 ring-cyan-500/30 transition-all hover:bg-blue-800"
              >
                <MessageSquareText className="size-4" aria-hidden="true" />
                Live Chat
              </button>
            </div>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
              <span className="text-sm font-medium text-blue-300">Follow us:</span>
              <a href="#" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/5 text-blue-200 transition-all duration-300 hover:bg-cyan-500 hover:text-white">
                <Facebook className="size-4" />
              </a>
              <a href="#" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/5 text-blue-200 transition-all duration-300 hover:bg-cyan-500 hover:text-white">
                <Instagram className="size-4" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Pincode & Form (Elevated White Card) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10"
          >
            {/* Pincode Checker */}
            <form id="delivery-check" onSubmit={checkPincode} className="mb-10 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
              <label htmlFor="pincode" className="flex items-center gap-2 text-sm font-bold text-blue-950">
                <Map className="size-4 text-cyan-500" />
                Check delivery in your area
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="pincode"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 482001"
                  className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-900 active:scale-95"
                >
                  Check
                </button>
              </div>
              {pincodeResult ? (
                <p className={`mt-3 text-xs font-medium ${pincodeResult.includes("Great news") ? "text-green-600" : "text-amber-600"}`}>
                  {pincodeResult}
                </p>
              ) : null}
            </form>

            <h3 className="text-2xl font-bold text-blue-950">Send an enquiry</h3>
            <p className="mt-2 mb-6 text-sm text-slate-500">Fill out the form below and we'll get back to you shortly.</p>

            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-sm font-medium text-green-800 ring-1 ring-green-200"
              >
                <CheckCircle2 className="size-6 shrink-0 text-green-500" aria-hidden="true" />
                <p>Thank you! Your enquiry has been sent successfully. We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-blue-950">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-blue-950">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="+91 98765 43210"
                  />
                  {phone.length > 0 && !phoneValid ? (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      Enter a valid 10-digit Indian mobile number.
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="requirement" className="mb-1.5 block text-sm font-semibold text-blue-950">
                    Requirement <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="requirement"
                    required
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="" disabled>Select an option</option>
                    {REQUIREMENTS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

                <button
                  type="submit"
                  disabled={!valid || sending}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-cyan-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                >
                  {sending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <Send className="size-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-blue-300/80">
            © {new Date().getFullYear()} Maa Rewa Water Supply. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-blue-300/80">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}