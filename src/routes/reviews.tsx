import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Guest Reviews | Cosy Corner Guest House" },
      {
        name: "description",
        content: "Guest feedback and contact information for Cosy Corner Guest House in eMalahleni.",
      },
      { property: "og:title", content: "Guest Reviews | Cosy Corner" },
      {
        property: "og:description",
        content: "Ask the guest house about guest feedback and experiences.",
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
        <h1 className="section-title mb-6">
          Guest <em>Reviews</em>
        </h1>
        <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-8">
          We're keeping this page available for guest feedback that the guest house can confirm
          and has permission to share. For questions about the rooms, facilities or recent
          guest experiences, you're welcome to ask the owner directly.
        </p>
        <a
          href="https://wa.me/27641236760"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          Ask the Owner on WhatsApp
        </a>
      </div>
    </section>
  );
}
