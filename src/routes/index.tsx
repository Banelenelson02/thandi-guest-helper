import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/rooms/outside/outside-2.jpg";
import { ROOMS } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosy Corner Guest House & Spa | eMalahleni" },
      {
        name: "description",
        content:
          "Comfortable double rooms, a swimming pool and traditional rondavels in Hlalanikahle, eMalahleni. Day, night, short stay and full day & night bookings from R200.",
      },
      { property: "og:title", content: "Cosy Corner Guest House & Spa | eMalahleni" },
      {
        property: "og:description",
        content: "Comfortable rooms, pool access and rondavels in eMalahleni. Bookings from R200.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[calc(100vh-60px)] min-h-[640px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cosy Corner Guest House grounds and rondavels"
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg4/85 via-bg4/65 to-bg4/95" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_50px,oklch(0.76_0.13_85/0.02)_50px,oklch(0.76_0.13_85/0.02)_51px)]" />
        </div>

        <div className="relative z-10 text-center px-4 animate-[fadeUp_1.4s_ease_forwards]">
          <div className="inline-flex items-center gap-2 bg-[oklch(0.76_0.13_85/0.12)] border border-[oklch(0.76_0.13_85/0.35)] px-5 py-2 mb-6">
            <span className="text-gold text-sm">★★★★★</span>
            <span className="text-[0.65rem] tracking-[0.15em]">4.9 · 26 Reviews on Google</span>
          </div>
          <p className="text-[0.62rem] tracking-[0.45em] uppercase text-gold mb-5">
            ★ &nbsp; eMalahleni, Mpumalanga &nbsp; ★
          </p>
          <h1 className="font-display font-light text-[clamp(2.8rem,8vw,6.5rem)] leading-[1.05] tracking-[0.05em]">
            Cosy Corner
            <br />
            <em className="italic text-gold">Guest House &amp; Spa</em>
          </h1>
          <p className="text-[0.72rem] tracking-[0.3em] uppercase text-muted-foreground mt-5">
            Comfortable Stays in eMalahleni
          </p>
          <div className="w-[60px] h-px bg-gold mx-auto my-8" />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="btn-primary">Reserve Your Stay</Link>
            <Link to="/rooms" className="btn-outline">Explore Rooms</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="section-tag">Our Story</p>
          <h2 className="section-title mb-8">
            A Comfortable Stay in <em>Hlalanikahle</em>
          </h2>
          <p className="text-muted-foreground leading-[2] text-[0.85rem] max-w-2xl mx-auto mb-10">
            Cosy Corner is a family-run guest house in Hlalanikahle, eMalahleni, offering five comfortable
            double rooms, a swimming pool and two hand-painted rondavels on the grounds. Simple, clean and
            well looked after — with day, night, short stay and full day & night bookings to suit your plans.
          </p>
          <Link to="/about" className="btn-outline">Discover More</Link>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-24 px-6 bg-bg4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-tag">Accommodation</p>
            <h2 className="section-title">
              Our <em>5 Rooms</em>
            </h2>
            <p className="text-[0.72rem] tracking-[0.3em] uppercase text-muted-foreground mt-4">
              Day · Night · Short Stay · Full Day & Night — From R200
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-1">
            {ROOMS.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="section-title mb-6">
          Ready to <em>Book?</em>
        </h2>
        <p className="text-muted-foreground mb-8 text-[0.85rem]">
          Reserve a room, or ask about pool-only access for the day.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/booking" className="btn-primary">Book Now</Link>
          <Link to="/spa" className="btn-outline">Pool & Grounds</Link>
        </div>
      </section>
    </>
  );
}
