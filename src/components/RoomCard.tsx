import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Room } from "@/data/rooms";
import { AMENITIES } from "@/data/rooms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function RoomCard({ room }: { room: Room }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article className="bg-bg3 border border-transparent hover:border-border transition-all flex flex-col">
      <div className="relative h-60 group">
        <Carousel
          opts={{ loop: true }}
          setApi={(api) => {
            if (!api) return;
            api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
          }}
        >
          <CarouselContent>
            {room.images.map((img, i) => (
              <CarouselItem key={i}>
                <div className="h-60 overflow-hidden">
                  <img
                    src={img}
                    alt={`${room.name} — photo ${i + 1}`}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="w-full h-60 object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {room.images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-bg4/80 border-gold/30 text-gold hover:bg-bg4" />
              <CarouselNext className="right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-bg4/80 border-gold/30 text-gold hover:bg-bg4" />
            </>
          )}
        </Carousel>

        {room.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {room.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-gold" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
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
