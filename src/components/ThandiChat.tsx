import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = ["Rooms", "Spa", "Loadshedding", "Parking", "Check-in"];

export function ThandiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Warm welcome to Cosy Corner Guest House & Spa! 🌟 I'm Lindo, your digital concierge. I'm here to help with rooms, the spa, bookings, directions or any questions about your stay. How may I assist you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [showHandover, setShowHandover] = useState(false);
  const [exchanges, setExchanges] = useState(0);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const time = () => new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setShowQuick(false);
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
        body: JSON.stringify({ messages: next }),
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
        const newExchanges = exchanges + 1;
        setExchanges(newExchanges);
        if (newExchanges === 3) setTimeout(() => setShowHandover(true), 800);
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

  const summary = encodeURIComponent(
    "Hi! I was just chatting with Lindo on the Cosy Corner website. Here's my conversation so far:\n\n" +
      messages.map((m) => `${m.role === "user" ? "Guest" : "Lindo"}: ${m.content}`).join("\n")
  );

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
              <div className={`text-[0.55rem] text-muted-foreground mt-1 px-1 ${m.role === "user" ? "text-right" : ""}`}>{time()}</div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-1 px-3 py-3 bg-bg3 border-l-2 border-gold w-fit self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-[typingPulse_1.2s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-[typingPulse_1.2s_ease-in-out_0.2s_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-[typingPulse_1.2s_ease-in-out_0.4s_infinite]" />
            </div>
          )}

          {showHandover && (
            <div className="self-start max-w-[88%]">
              <div className="px-3 py-3 bg-bg3 border-l-2 border-gold text-[0.76rem] text-foreground">
                Would you like to continue this conversation on WhatsApp? 📱
              </div>
              <a
                href={`https://wa.me/27641236760?text=${summary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center bg-[#25D366] text-white px-4 py-2.5 text-[0.62rem] tracking-[0.15em] uppercase mt-2 hover:bg-[#1fad55] transition-colors"
              >
                💬 Continue on WhatsApp
              </a>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-[oklch(0.76_0.13_85/0.15)] flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
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
