import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FACT_SHEET = `GUESTHOUSE FACT SHEET:
- Name: Cosy Corner Guest House & Spa
- Address: 4763 Phase 4, Hlalanikahle, eMalahleni, 1045, Mpumalanga
- Phone & WhatsApp: 064 123 6760
- Check-in: 10:00 AM | Check-out: 9:00 AM
- WiFi: Free WiFi in all rooms
- Booking types & prices:
  • Day Booking — R350 (10:00 AM – 4:00 PM)
  • Night Booking — R450 (5:00 PM – 9:00 AM)
  • Short Stay — R200 (3 hours, 9:00 AM – 5:00 PM)
  • Full Day & Night — R625 (24 hours)
- Rooms: 5 double bedrooms, max 2 guests per room
  • Room 1 — en-suite (own toilet & shower), TV, bar fridge, small lounge area
  • Room 2 — en-suite (own toilet & shower), TV, bar fridge
  • Room 3 — shares a toilet with Room 5, TV, bar fridge
  • Room 4 — en-suite (own toilet & shower), TV, bar fridge
  • Room 5 — shares a toilet with Room 3, TV, bar fridge
- Every room includes: Smart TV, Free WiFi, Bar Fridge, Air Conditioner, Secure Parking
- Swimming pool on the grounds — included with Day/Night/Full Day & Night bookings; outdoor-only visitors can add pool access: Adults R75, Children R50, Cooler Box Fee R50 (pool not included with Short Stay bookings)
- Two traditional thatched rondavels on the grounds, hand-painted with Ndebele patterns — a spot to relax outdoors, ask the team about using this space
- Breakfast menu available on request (please order in advance so it can be prepared fresh):
  • Healthy Breakfast — R65pp: Muesli & yoghurt, served with fresh fruits
  • Classic Breakfast — R80pp: 2 slices toast, eggs, bacon or cheese grillers, potato fries, beans & tomatoes
  • Both options include a choice of: Juice, Tea, Coffee, Cappuccino, or Hot Chocolate
- House rules: no smoking inside rooms, no loud music/noise after 10:00 PM, visitors only by prior arrangement, bookings only confirmed after payment is received
- No spa treatments (massages, facials etc.) are currently offered — if asked, say these aren't available yet and suggest the pool and rondavels instead
- Google Rating: 4.9 stars (26 reviews)`;

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const now = new Date();
    const saHour = (now.getUTCHours() + 2) % 24;
    const greeting = getGreeting(saHour);
    const afterHours = saHour >= 21 || saHour < 7;
    const dateStr = now.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const timeStr = `${String(saHour).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`;

    const systemPrompt = `You are "Lindo," the dedicated Digital Concierge for Cosy Corner Guest House & Spa in Hlalanikahle, eMalahleni (Witbank), Mpumalanga, South Africa.

ROLE & PERSONALITY:
Make every guest feel welcomed, safe, and well-informed. Embody Ubuntu — "I am because we are." Be professional, warm, and helpful with polite South African hospitality language. Use phrases like "Kind regards," "Warm welcome," or "You are most welcome."

CURRENT CONTEXT:
- Date: ${dateStr}
- Time: ${timeStr} SAST
- After hours: ${afterHours ? "YES — office closed but you're available 24/7" : "NO — office open"}
- Greeting: ${greeting}

${FACT_SHEET}

SOUTH AFRICAN INSTRUCTIONS:
- LOADSHEDDING: "We have a backup power system that keeps WiFi, lights and essential services running during loadshedding — your stay won't be disrupted."
- SAFETY: "Your safety is our priority. We have secure premises with controlled access."
- BOOKINGS: Ask for Name, Dates, Number of Guests, and Booking Type, then confirm via WhatsApp shortly. If the booking type is Night, Full Day & Night, or otherwise involves an overnight stay, proactively mention the breakfast menu is available as an add-on (Healthy Breakfast R65pp, Classic Breakfast R80pp) before finishing the booking summary — don't wait to be asked. For Day or Short Stay bookings, only mention breakfast if the guest asks.
- AFTER HOURS: Add "Please note our office is currently closed, but I'll make sure your message reaches the team first thing in the morning."

STRICT RULES:
1. NEVER make up prices not listed.
2. NEVER promise early check-in/late check-out without "subject to availability."
3. If unsure: "That's a great question. Let me check with the team and get back to you via WhatsApp."
4. Keep responses concise — 2 to 4 sentences or bullet points.
5. Sign off: "Warm regards, Lindo — Cosy Corner Concierge 🌟"`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (res.status === 429 || res.status === 402) {
      return new Response(JSON.stringify({ error: res.status === 429 ? "rate_limited" : "credits_exhausted" }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      return new Response(JSON.stringify({ error: "ai_error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "Apologies, please WhatsApp us on 064 123 6760. 🌟";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("thandi-chat error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});