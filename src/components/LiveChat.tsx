import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-950/20 ring-1 ring-gray-100 sm:bottom-28 sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-950 to-blue-900 px-5 py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 ring-1 ring-cyan-500/50">
                <Droplets className="size-5 text-cyan-400" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-white">Live Chat</p>
                <p className="truncate text-xs text-blue-200">Typically replies quickly</p>
              </div>
              <button
                type="button"
                aria-label="Close live chat"
                onClick={() => setChatOpen(false)}
                className="ml-auto rounded-full p-2 text-blue-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "ml-auto rounded-br-sm bg-cyan-500 text-white"
                      : "mr-auto rounded-bl-sm border border-gray-100 bg-white text-slate-700"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={send} className="flex items-center gap-3 border-t border-gray-100 bg-white p-4">
              <label htmlFor="live-chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="live-chat-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message..."
                className="min-w-0 flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-500/50"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!draft.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan-500 text-white shadow-md transition-all duration-300 hover:bg-cyan-400 active:scale-95 disabled:opacity-50 disabled:hover:bg-cyan-500"
              >
                <Send className="size-4 ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open live chat"
          className="grid size-14 place-items-center rounded-full bg-blue-950 text-white shadow-xl shadow-blue-900/20 transition-colors hover:bg-blue-900"
        >
          <MessageSquareText className="size-6" />
        </motion.button>

        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={whatsappLink(SUPPORT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative grid size-16 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/20"
        >
          {/* Subtle ping animation for WhatsApp */}
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 group-hover:animate-none" />
          <MessageCircle className="size-8" />
        </motion.a>
      </div>
    </>
  );
}