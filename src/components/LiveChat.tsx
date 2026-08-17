import { useEffect, useRef, useState } from "react";
import { Droplets, MessageCircle, MessageSquareText, Send, X } from "lucide-react";

import { SUPPORT_MESSAGE, whatsappLink } from "@/lib/business";

export const OPEN_LIVE_CHAT_EVENT = "maarewa:open-live-chat";

export function openLiveChat() {
  window.dispatchEvent(new CustomEvent(OPEN_LIVE_CHAT_EVENT));
}

type ChatMessage = { id: number; from: "bot" | "user"; text: string };

const GREETING: ChatMessage = {
  id: 0,
  from: "bot",
  text: "Hi! You're chatting with Maa Rewa Water Supply. How can we help you today?",
};

const AUTO_REPLY =
  "Thanks for your message! Our team will reply here shortly. For an instant response, tap Chat on WhatsApp.";

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // --- REAL LIVE-CHAT SDK GOES HERE ---------------------------------------
  // To switch to Tawk.to / Crisp / Intercom, initialise the provider script in
  // this effect and render their widget instead of the panel below. Every
  // "Live Chat" entry point in the app calls openLiveChat(), so a single swap
  // here is enough.
  // ------------------------------------------------------------------------
  useEffect(() => {
    const handler = () => setChatOpen(true);
    window.addEventListener(OPEN_LIVE_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_LIVE_CHAT_EVENT, handler);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatOpen]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setMessages((prev) => [
      ...prev,
      { id: prev.length, from: "user", text },
      { id: prev.length + 1, from: "bot", text: AUTO_REPLY },
    ]);
  };

  return (
    <>
      {chatOpen ? (
        <div className="fixed bottom-24 right-4 z-50 flex h-[26rem] w-[min(21rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border sm:bottom-28 sm:right-6">
          <div className="flex items-center gap-3 bg-brand px-4 py-3">
            <Droplets className="size-5 shrink-0 text-brand-foreground" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-brand-foreground">Live Chat</p>
              <p className="truncate text-xs text-brand-foreground/80">Typically replies quickly</p>
            </div>
            <button
              type="button"
              aria-label="Close live chat"
              onClick={() => setChatOpen(false)}
              className="ml-auto rounded-md p-1 text-brand-foreground transition-all duration-300 hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-brand-soft px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "user"
                    ? "ml-auto bg-brand text-brand-foreground"
                    : "bg-card text-brand-navy shadow-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
            <label htmlFor="live-chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="live-chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message…"
              className="min-w-0 flex-1 rounded-full bg-brand-soft px-4 py-2 text-sm text-brand-navy outline-none ring-brand transition-all duration-300 focus:ring-2"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition-all duration-300 hover:bg-brand-light"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open live chat"
          className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-brand-light"
        >
          <MessageSquareText className="size-6" />
        </button>
        <a
          href={whatsappLink(SUPPORT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-14 animate-soft-pulse place-items-center rounded-full bg-whatsapp text-brand-foreground shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="size-7" />
        </a>
      </div>
    </>
  );
}
