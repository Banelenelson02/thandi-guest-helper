import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions | Cosy Corner Guest House" },
      {
        name: "description",
        content:
          "Get in touch with Cosy Corner Guest House & Spa. Address: 4763 Hlalanikahle, eMalahleni, Mpumalanga. Call or WhatsApp 064 123 6760.",
      },
      { property: "og:title", content: "Contact Cosy Corner Guest House" },
      { property: "og:description", content: "Find us in Hlalanikahle, eMalahleni. Call or WhatsApp 064 123 6760." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="py-24 px-6 bg-bg4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="section-tag">Find Us</p>
          <h1 className="section-title mb-6">
            Get in <em>Touch</em>
          </h1>
          <p className="text-[0.8rem] text-muted-foreground leading-[2] mb-8">
            We'd love to hear from you. Whether you have a question about our rooms, spa services, or want to make
            a special arrangement, our team is here to help.
          </p>

          <div className="flex flex-col gap-5">
            <ContactItem icon="📍" title="Address" body="4763, Hlalanikahle, eMalahleni, 1045, Mpumalanga, South Africa" />
            <ContactItem icon="📞" title="Phone & WhatsApp" body="064 123 6760" />
            <ContactItem icon="🕐" title="Booking Options" body="Day Time · Night Time · Full Day Bookings" />
            <ContactItem icon="📺" title="In Every Room" body="High-Speed WiFi · Smart TV · DStv" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-72 bg-bg3 border border-border flex items-center justify-center font-display text-muted-foreground italic">
            📍 Hlalanikahle, eMalahleni
          </div>
          <div className="flex gap-3">
            <Link to="/booking" className="btn-primary flex-1 text-center">Book Now</Link>
            <a
              href="https://wa.me/27641236760"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-1 text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-gold text-base mt-0.5">{icon}</div>
      <div>
        <h4 className="text-[0.62rem] tracking-[0.2em] uppercase text-gold mb-1">{title}</h4>
        <p className="text-[0.8rem] text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
