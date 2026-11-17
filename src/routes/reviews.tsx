import { createFileRoute } from "@tanstack/react-router";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL } from "@/data/googleReviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Google Reviews | Cosy Corner Guest House" },
      {
        name: "description",
        content: "See Cosy Corner Guest House guest reviews on Google Maps.",
      },
      { property: "og:title", content: "Google Reviews | Cosy Corner" },
      {
        property: "og:description",
        content: "Find the latest guest feedback for Cosy Corner Guest House on Google.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-tag">Guest Experiences</p>
        <h1 className="section-title mb-8">
          Guest <em>Reviews</em>
        </h1>
        <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
          <span className="text-gold text-3xl" aria-hidden="true">★</span>
          <span className="font-display text-6xl text-gold">{GOOGLE_RATING}</span>
          <span className="text-[0.72rem] tracking-[0.14em] uppercase text-muted-foreground">
            / 5.0 · {GOOGLE_REVIEW_COUNT} Google reviews
          </span>
        </div>
        <p className="text-muted-foreground leading-[2] text-[0.83rem] max-w-xl mx-auto mb-8">
          Read guest experiences directly on our Google Maps business listing.
          Ratings and review totals may change as guests leave new feedback.
        </p>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          View All Reviews on Google
        </a>
        <p className="mt-4 text-[0.7rem] text-muted-foreground">
          Opens Google Maps. Tap Reviews on the business listing to read all feedback.
        </p>
      </div>
    </section>
  );
}
