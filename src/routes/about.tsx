import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Cosy Corner Guest House & Spa" },
      {
        name: "description",
        content:
          "Discover Cosy Corner — a modern guest house and spa in Hlalanikahle, eMalahleni, blending sleek design with warm South African hospitality.",
      },
      { property: "og:title", content: "About Cosy Corner Guest House & Spa" },
      {
        property: "og:description",
        content: "A sanctuary in the heart of Mpumalanga — modern luxury, warm hospitality, refined comfort.",
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
            alt="Cosy Corner interior lounge"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-[450px] object-cover border border-border"
          />
        </div>
        <div>
          <p className="section-tag">Our Story</p>
          <h1 className="section-title mb-6">
            A Sanctuary in the <em>Heart of Mpumalanga</em>
          </h1>
          <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-5">
            Nestled in the vibrant community of Hlalanikahle, Cosy Corner Guest House &amp; Spa offers a rare
            blend of modern luxury and warm South African hospitality. Our sleek contemporary grey design
            creates an atmosphere of refined comfort that feels both exclusive and welcoming.
          </p>
          <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-5">
            From our serene spa treatments to our thoughtfully designed rooms with Smart TV and WiFi, every
            detail has been crafted to ensure your stay is nothing short of extraordinary — whether for a day
            visit, overnight, or a full day escape.
          </p>

          <div className="grid grid-cols-3 gap-5 mt-10 pt-10 border-t border-border">
            <div>
              <div className="font-display text-4xl text-gold">4.9★</div>
              <div className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-1">Guest Rating</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold">26+</div>
              <div className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-1">Reviews</div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold">3</div>
              <div className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase mt-1">Booking Options</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/rooms" className="btn-primary">View Rooms</Link>
            <Link to="/booking" className="btn-outline">Book Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
