import { createFileRoute, Link } from "@tanstack/react-router";
import spaImg from "@/assets/spa.jpg";

const SERVICES = [
  { icon: "💆", name: "Full Body Massage", desc: "60 or 90-minute sessions to melt away tension and restore vitality." },
  { icon: "✨", name: "Facial Treatments", desc: "Customised facials using premium skincare for radiant, glowing skin." },
  { icon: "💅", name: "Manicure & Pedicure", desc: "Luxurious nail treatments with premium polishes and hand care." },
  { icon: "🌸", name: "Aromatherapy", desc: "Essential oil blends tailored to your mood and wellness needs." },
];

export const Route = createFileRoute("/spa")({
  head: () => ({
    meta: [
      { title: "Spa & Wellness | Cosy Corner Guest House" },
      {
        name: "description",
        content:
          "Massages, facials, manicures, pedicures and aromatherapy. Premium spa treatments delivered by expert therapists.",
      },
      { property: "og:title", content: "Spa & Wellness | Cosy Corner" },
      {
        property: "og:description",
        content: "Indulge in our world-class spa treatments — restore balance and rejuvenate the body.",
      },
      { property: "og:image", content: spaImg },
      { name: "twitter:image", content: spaImg },
    ],
  }),
  component: SpaPage,
});

function SpaPage() {
  return (
    <section className="py-24 px-6 bg-bg4 relative overflow-hidden">
      <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,oklch(0.76_0.13_85/0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
        <div>
          <img
            src={spaImg}
            alt="Luxury spa treatment room"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-[500px] object-cover border border-border"
          />
        </div>
        <div>
          <p className="section-tag">Wellness &amp; Relaxation</p>
          <h1 className="section-title mb-6">
            Our Signature <em>Spa Experience</em>
          </h1>
          <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-8">
            Indulge in our world-class spa treatments designed to restore balance, rejuvenate the body, and calm
            the mind. Our expert therapists use premium products to deliver truly transformative experiences.
          </p>
          <Link to="/booking" search={{ type: "spa" }} className="btn-primary">Book a Treatment</Link>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="p-5 border border-[oklch(0.76_0.13_85/0.12)] bg-white/[0.02] hover:border-gold hover:bg-[oklch(0.76_0.13_85/0.04)] transition-all"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <h3 className="font-display text-lg mb-1">{s.name}</h3>
                <p className="text-[0.68rem] text-muted-foreground leading-[1.7]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
