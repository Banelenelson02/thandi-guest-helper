import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/rooms/inside-hall/inside-hall-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Cosy Corner Guest House & Spa" },
      {
        name: "description",
        content:
          "Cosy Corner is a family-run guest house in Hlalanikahle, eMalahleni, with five comfortable double rooms, a pool and traditional rondavels on the grounds.",
      },
      { property: "og:title", content: "About Cosy Corner Guest House & Spa" },
      {
        property: "og:description",
        content: "A comfortable, well-kept guest house in Hlalanikahle, eMalahleni.",
      },
      { property: "og:image", content: aboutImg },
      { name: "twitter:image", content: aboutImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src={aboutImg}
            alt="Cosy Corner Guest House hallway"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-[450px] object-cover border border-border"
          />
        </div>
        <div>
          <p className="section-tag">Our Story</p>
          <h1 className="section-title mb-6">
            A Comfortable Stay in <em>Hlalanikahle</em>
          </h1>
          <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-5">
            Cosy Corner Guest House &amp; Spa is set in the community of Hlalanikahle, eMalahleni. We offer
            five double rooms, each with a TV and bar fridge, plus a swimming pool and two hand-painted
            rondavels on the grounds.
          </p>
          <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-5">
            Whether you're stopping in for a few hours, staying the night, or booking a full day and night,
            we aim to keep things clean, comfortable and straightforward — with secure parking and WiFi
            included throughout your stay.
          </p>

          <div className="grid grid-cols-3 gap-5 mt-10 pt-10 border-t border-border">
            <div>
              <div className="font-display text-4xl text-gold">4.9★</div>
              <div className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-1">Guest Rating</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold">5</div>
              <div className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-1">Rooms</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold">4</div>
              <div className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-1">Booking Options</div>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/rooms" className="btn-primary">See Rooms & Prices</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
