import { createFileRoute } from "@tanstack/react-router";
import { ROOMS } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";
import roomDeluxe from "@/assets/room-deluxe.jpg";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites | Cosy Corner Guest House" },
      {
        name: "description",
        content:
          "Deluxe Room, Executive Suite and Garden Room. Modern interiors, Smart TV, WiFi and en-suite bathrooms in every room.",
      },
      { property: "og:title", content: "Rooms & Suites | Cosy Corner Guest House" },
      {
        property: "og:description",
        content: "Three thoughtfully designed rooms from R750/night. Day, night and full day bookings.",
      },
      { property: "og:image", content: roomDeluxe },
      { name: "twitter:image", content: roomDeluxe },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <section className="py-24 px-6 bg-bg4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-tag">Accommodation</p>
          <h1 className="section-title">
            Thoughtfully <em>Designed Rooms</em>
          </h1>
          <p className="text-[0.72rem] tracking-[0.3em] uppercase text-muted-foreground mt-4">
            Day Time · Night Time · Full Day Bookings Available
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-1">
          {ROOMS.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
