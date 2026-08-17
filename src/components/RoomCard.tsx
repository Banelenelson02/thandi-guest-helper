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
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function RoomCard({ room }: { room: Room }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxApi, setLightboxApi] = useState<CarouselApi>();

  function openLightbox() {
    setLightboxOpen(true);
    setTimeout(() => lightboxApi?.scrollTo(activeIndex), 0);
  }

  return (
      <>
        <article className="bg-bg3 border border-transparent hover:border-border transition-all flex flex-col">
          <div className="relative h-60 group">
            <Carousel
                opts={{ loop: true, watchDrag: false }}
                setApi={(api) => {
                  if (!api) return;
                  api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
                }}
            >
              <CarouselContent>
                {room.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <button
                          type="button"
                          onClick={openLightbox}
                          className="w-full h-60 block cursor-zoom-in"
                          aria-label={`View ${room.name} photo ${i + 1} larger`}
                      >
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
                      </button>
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

            <div className="absolute top-2 right-2 z-10 bg-bg4/80 text-gold text-[0.6rem] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              View Larger
            </div>

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

        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl w-[92vw] p-0 bg-bg2 border-gold/30 overflow-hidden">
            <DialogTitle className="sr-only">{room.name} photos</DialogTitle>
            <Carousel opts={{ loop: true }} setApi={setLightboxApi} className="w-full">
              <CarouselContent>
                {room.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="w-full h-[70vh] flex items-center justify-center bg-bg4">
                        <img
                            src={img}
                            alt={`${room.name} — photo ${i + 1}`}
                            className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-bg4/90 border-gold/40 text-gold hover:bg-bg4" />
              <CarouselNext className="right-4 bg-bg4/90 border-gold/40 text-gold hover:bg-bg4" />
            </Carousel>
            <div className="p-4 text-center border-t border-border">
              <span className="font-display text-lg text-gold">{room.name}</span>
              <span className="text-[0.65rem] text-muted-foreground tracking-[0.15em] uppercase ml-3">
              {room.images.length} photo{room.images.length > 1 ? "s" : ""}
            </span>
            </div>
          </DialogContent>
        </Dialog>
      </>
  );
}