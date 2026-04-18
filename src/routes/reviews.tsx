import { createFileRoute } from "@tanstack/react-router";

const REVIEWS = [
  {
    text: "Absolutely stunning place! The rooms are modern and spotlessly clean. The spa treatment was the highlight — I felt completely rejuvenated. Will definitely be back!",
    name: "Nomsa T. — Johannesburg",
  },
  {
    text: "Exceptional service from the moment we arrived. Smart TV in every room was a lovely touch. The staff are warm and professional. Highly recommend!",
    name: "Michael D. — Pretoria",
  },
  {
    text: "Best guest house in eMalahleni by far. Beautiful modern grey design, incredibly comfortable beds, and the spa treatments are divine. Worth every rand!",
    name: "Zanele M. — Durban",
  },
];

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Guest Reviews | Cosy Corner Guest House — 4.9★" },
      {
        name: "description",
        content: "Read what our guests say about Cosy Corner Guest House & Spa. Rated 4.9★ on Google with 26+ reviews.",
      },
      { property: "og:title", content: "Guest Reviews | Cosy Corner" },
      { property: "og:description", content: "4.9★ rating on Google. Hear what our guests say about their stay." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-tag">Guest Experiences</p>
          <h1 className="section-title">
            What Our <em>Guests Say</em>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <span className="text-gold text-xl">★★★★★</span>
            <span className="font-display text-5xl text-gold">4.9</span>
            <span className="text-[0.72rem] tracking-[0.2em] uppercase text-muted-foreground">/ 5.0 · 26 Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="p-7 bg-bg3 border border-[oklch(0.76_0.13_85/0.08)] hover:border-[oklch(0.76_0.13_85/0.3)] transition-colors"
            >
              <div className="font-display text-5xl text-gold opacity-30 leading-none">"</div>
              <p className="text-[0.78rem] text-muted-foreground leading-[1.8] my-3">{r.text}</p>
              <p className="text-[0.62rem] tracking-[0.2em] uppercase text-gold">{r.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
