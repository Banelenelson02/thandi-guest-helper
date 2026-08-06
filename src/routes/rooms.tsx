import { createFileRoute } from "@tanstack/react-router";
import { ROOMS, BOOKING_TYPES, POOL_FEES, AMENITIES, HOUSE_RULES } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";
import roomDeluxe from "@/assets/room-deluxe.jpg";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Pricing | Cosy Corner Guest House" },
      {
        name: "description",
        content:
          "5 double bedrooms from R200. Day, night, short stay and full day & night bookings available at Cosy Corner Guest House & Spa.",
      },
      { property: "og:title", content: "Rooms & Pricing | Cosy Corner Guest House" },
      { property: "og:image", content: roomDeluxe },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <>
      {/* PRICING TABLE */}
      <section className="py-24 px-6 bg-bg2">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-tag">Booking Options</p>
            <h1 className="section-title">
              Room <em>Prices</em>
            </h1>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {BOOKING_TYPES.map((b) => (
              <div key={b.id} className="bg-bg3 border border-border p-5 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg">{b.label}</div>
                  <div className="text-[0.68rem] text-muted-foreground mt-1">{b.hours}</div>
                </div>
                <div className="font-display text-2xl text-gold">R{b.price}</div>
              </div>
            ))}
          </div>

          <div className="bg-bg3 border border-border p-6">
            <h3 className="text-[0.62rem] tracking-[0.2em] uppercase text-gold mb-4">Pool & Outdoor Access Only</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {POOL_FEES.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-[0.78rem]">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="text-gold font-display text-lg">R{f.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS GRID */}
      <section className="py-24 px-6 bg-bg4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-tag">Accommodation</p>
            <h2 className="section-title">
              Our <em>5 Rooms</em>
            </h2>
            <p className="text-[0.72rem] tracking-[0.3em] uppercase text-muted-foreground mt-4">
              Double Bedrooms · Max 2 Guests Per Room
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-1">
            {ROOMS.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES & HOUSE RULES */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-16">
          <div>
            <p className="section-tag">Included</p>
            <h3 className="section-title mb-6">
              Amenities <em>Included</em>
            </h3>
            <ul className="flex flex-col gap-2">
              {AMENITIES.map((a) => (
                <li key={a} className="text-[0.8rem] text-muted-foreground flex items-center gap-2">
                  <span className="text-gold text-[0.6rem]">✦</span> {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-tag">Please Note</p>
            <h3 className="section-title mb-6">
              House <em>Rules</em>
            </h3>
            <ul className="flex flex-col gap-2">
              {HOUSE_RULES.map((r) => (
                <li key={r} className="text-[0.8rem] text-muted-foreground flex items-start gap-2">
                  <span className="text-gold text-[0.6rem] mt-1">✦</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
