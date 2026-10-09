import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

import { bookingSummary, validateBooking, whatsappUrl } from "../../shared/booking.mjs";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = ["Rooms", "Pool", "Loadshedding", "Parking", "Check-in"];

export function ThandiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Warm welcome to Cosy Corner Guest House! 🌟 I'm Lindo, your digital concierge. I'm here to help with rooms, pool access, bookings, directions or any questions about your stay. How may I assist you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [showHandover, setShowHandover] = useState(false);
  const [booking, setBooking] = useState<Record<string, string> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, booking]);

  const time = () => new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

  async function send(text: string, prepareSummary = false) {
    const trimmed = text.trim();
    if (trimmed.length > 2000) return;
    if (!trimmed || loading) return;
    setShowQuick(false);
    setBooking(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/thandi-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next.slice(-24), action: prepareSummary ? "summary" : "chat" }),
        signal: AbortSignal.timeout(25000),
      });

      if (res.status === 429) {
        setMessages([...next, { role: "assistant", content: "We're getting lots of messages right now. Please try again in a moment, or WhatsApp us on 064 123 6760. 🌟" }]);
      } else if (res.status === 402) {
        setMessages([...next, { role: "assistant", content: "Our concierge service is temporarily unavailable. Please WhatsApp us on 064 123 6760 — we reply quickly! 🌟" }]);
      } else if (!res.ok) {
        throw new Error("Chat error");
      } else {
        const data = await res.json();
        const reply: string = data.reply ?? "Apologies — please WhatsApp us on 064 123 6760. 🌟";
        setMessages([...next, { role: "assistant", content: reply }]);
        if (data.booking && typeof data.booking === "object" && Object.keys(validateBooking(data.booking)).length === 0) setBooking(data.booking);
        else if (prepareSummary && data.summaryVersion !== 1) setMessages([...next, { role: "assistant", content: "The booking summary service is not available yet. You can continue asking questions here or contact the owner directly on WhatsApp." }]);
        setShowHandover(true);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "I'm experiencing a small technical difficulty. Please WhatsApp us on 064 123 6760 — our team responds quickly! Warm regards, Lindo 🌟" },
      ]);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[999] w-[54px] h-[54px] rounded-full bg-gold text-bg4 flex items-center justify-center text-xl shadow-[0_4px_30px_oklch(0.76_0.13_85/0.45)] hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        ✨
      </button>

      <div
        className={`fixed bottom-[6.5rem] right-6 z-[998] w-[calc(100vw-3rem)] sm:w-[380px] h-[580px] max-h-[calc(100vh-9rem)] bg-bg2 border border-[oklch(0.76_0.13_85/0.3)] flex flex-col shadow-elegant transition-all ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 bg-gradient-to-br from-[oklch(0.76_0.13_85/0.12)] to-[oklch(0.76_0.13_85/0.04)] border-b border-[oklch(0.76_0.13_85/0.2)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center font-display text-bg4 font-semibold">L</div>
            <div>
              <div className="font-display text-lg text-gold leading-tight">Lindo — Digital Concierge</div>
              <div className="text-[0.58rem] text-[#4caf50] tracking-[0.1em]">● Online · Replies instantly</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-muted-foreground text-lg hover:text-foreground" aria-label="Close">✕</button>
        </div>

        {showQuick && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[0.6rem] px-3 py-1.5 border border-[oklch(0.76_0.13_85/0.3)] text-gold hover:bg-[oklch(0.76_0.13_85/0.1)] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[88%] ${m.role === "assistant" ? "self-start" : "self-end"}`}>
              <div
                className={`px-3 py-3 text-[0.76rem] leading-[1.65] whitespace-pre-wrap ${
                  m.role === "assistant"
                    ? "bg-bg3 border-l-2 border-gold text-foreground"
                    : "bg-[oklch(0.76_0.13_85/0.12)] border border-[oklch(0.76_0.13_85/0.3)] text-foreground"
                }`}
              >
                {m.content}
              </div>
              {mounted && (
                <div className={`text-[0.55rem] text-muted-foreground mt-1 px-1 ${m.role === "user" ? "text-right" : ""}`}>{time()}</div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-1 px-3 py-3 bg-bg3 border-l-2 border-gold w-fit self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-[typingPulse_1.2s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-[typingPulse_1.2s_ease-in-out_0.2s_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-[typingPulse_1.2s_ease-in-out_0.4s_infinite]" />
            </div>
          )}

          {booking && !loading && <div className="border border-gold p-3 bg-bg3 text-[0.76rem]" aria-label="Booking summary">
            <p className="font-semibold text-gold mb-2">Review your booking request</p>
            <p className="whitespace-pre-wrap">{bookingSummary(booking)}</p>
            <p className="my-3">Check these details, then open WhatsApp and press Send. The owner will confirm availability and payment.</p>
            <a href={whatsappUrl(booking)} target="_blank" rel="noopener noreferrer" className="btn-primary block text-center">Open WhatsApp to Send</a>
            <button type="button" onClick={() => { setBooking(null); inputRef.current?.focus(); }} className="text-gold underline mt-3">Correct details in chat</button>
          </div>}
          {showHandover && !booking && (
            <div className="self-start max-w-[88%]">
              <div className="px-3 py-3 bg-bg3 border-l-2 border-gold text-[0.76rem] text-foreground">
                Ready to request a booking? Review a clean summary before sending it to the owner on WhatsApp.
              </div>
              <button type="button" disabled={loading} onClick={() => send("Please prepare my booking summary from the details I have given you. Ask me for anything missing.", true)} className="btn-primary block text-center mt-2 disabled:opacity-50">Prepare Booking Summary</button>
              <a href="https://wa.me/27641236760" target="_blank" rel="noopener noreferrer" className="text-gold underline text-sm inline-block mt-2">Ask the owner directly on WhatsApp</a>
            </div>
          )}
        </div>

        <p className="px-3 text-[0.65rem] text-muted-foreground">AI replies can be incorrect. Please keep sensitive details out of chat. <Link to="/privacy" className="text-gold underline">Privacy notice</Link></p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-[oklch(0.76_0.13_85/0.15)] flex gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            maxLength={2000} aria-label="Message to Lindo"
            className="flex-1 bg-bg3 border border-input text-foreground px-3 py-2.5 text-[0.73rem] outline-none focus:border-gold/50 transition-colors"
          />
          <button type="submit" disabled={loading} className="bg-gold hover:bg-gold-light text-bg4 px-3 py-2.5 transition-colors disabled:opacity-50">
            ➤
          </button>
        </form>
      </div>
    </>
  );
}
