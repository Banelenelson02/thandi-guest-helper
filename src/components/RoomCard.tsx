import { Link } from "@tanstack/react-router";
import type { Room } from "@/data/rooms";
import { AMENITIES } from "@/data/rooms";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="bg-bg3 border border-transparent hover:border-border hover:-translate-y-1.5 hover:shadow-elegant transition-all flex flex-col">
      <div className="h-60 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          width={1280}
          height={960}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-2xl mb-2">{room.name}</h3>
        <p className="text-[0.73rem] text-muted-foreground leading-[1.85] mb-3 flex-1">{room.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[0.58rem] tracking-[0.15em] uppercase px-2 py-1 border border-[oklch(0.76_0.13_85/0.3)] text-gold">
            {room.ensuite ? "En-suite" : "Shared Toilet"}
          </span>
          <span className="text-[0.58rem] tracking-[0.15em] uppercase px-2 py-1 border border-[oklch(0.76_0.13_85/0.3)] text-gold">
            Max 2 Guests
          </span>
          {AMENITIES.slice(0, 2).map((a) => (
            <span
              key={a}
              className="text-[0.58rem] tracking-[0.15em] uppercase px-2 py-1 border border-[oklch(0.76_0.13_85/0.3)] text-gold"
            >
              {a}
            </span>
          ))}
        </div>

        <Link
          to="/booking"
          search={{ room: room.id }}
          className="block w-full bg-gold hover:bg-gold-light text-bg4 text-center py-3 text-[0.62rem] tracking-[0.2em] uppercase font-medium transition-colors"
        >
          Book This Room
        </Link>
      </div>
    </article>
  );
}
