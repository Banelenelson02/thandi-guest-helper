import { createFileRoute } from "@tanstack/react-router";
import {
  ROOMS,
  BOOKING_TYPES,
  POOL_FEES,
  AMENITIES,
  HOUSE_RULES,
  POOL_IMAGES,
  RONDAVEL_IMAGES,
  BREAKFAST_OPTIONS,
  BREAKFAST_DRINKS,
} from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";
import { ImageLightbox } from "@/components/ImageLightbox";
import room1Img from "@/assets/rooms/room-1/room-1-1.jpg";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Pricing | Cosy Corner Guest House" },
      {
        name: "description",
        content:
            "5 double rooms from R200. Day, night, short stay and full day & night bookings, plus a swimming pool and thatched rondavels on the grounds.",
      },
      { property: "og:title", content: "Rooms & Pricing | Cosy Corner Guest House" },
      { property: "og:image", content: room1Img },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
      <>
        {/* PRICING TABLE */}
        <section className="py-24 px-6 bg-bg2">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-tag">Booking Options</p>
              <h1 className="section-title">
                Room <em>Prices</em>
              </h1>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {BOOKING_TYPES.map((b) => (
                  <div key={b.id} className="bg-bg3 border border-border p-5 flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg">{b.label}</div>
                      <div className="text-[0.68rem] text-muted-foreground mt-1">{b.hours}</div>
                    </div>
                    <div className="font-display text-2xl text-gold">R{b.price}</div>
                  </div>
              ))}
            </div>

            <div className="bg-bg3 border border-border p-6">
              <h3 className="text-[0.62rem] tracking-[0.2em] uppercase text-gold mb-4">Pool & Outdoor Access Only</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {POOL_FEES.map((f) => (
                    <div key={f.label} className="flex items-center justify-between text-[0.78rem]">
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="text-gold font-display text-lg">R{f.price}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROOMS GRID */}
        <section className="py-24 px-6 bg-bg4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-tag">Accommodation</p>
              <h2 className="section-title">
                Our <em>5 Rooms</em>
              </h2>
              <p className="text-[0.72rem] tracking-[0.3em] uppercase text-muted-foreground mt-4">
                Double Bedrooms · Max 2 Guests Per Room
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-1">
              {ROOMS.map((r) => (
                  <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </div>
        </section>

        {/* POOL */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ImageLightbox images={POOL_IMAGES} altPrefix="Swimming Pool">
              {(openAt) => (
                  <div className="grid grid-cols-2 gap-1">
                    {POOL_IMAGES.map((img, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => openAt(i)}
                            className="cursor-zoom-in"
                            aria-label={`View pool photo ${i + 1} larger`}
                        >
                          <img
                              src={img}
                              alt={`Swimming pool at Cosy Corner — photo ${i + 1}`}
                              width={800}
                              height={800}
                              loading="lazy"
                              className="w-full h-56 sm:h-72 object-cover border border-border hover:opacity-90 transition-opacity"
                          />
                        </button>
                    ))}
                  </div>
              )}
            </ImageLightbox>
            <div>
              <p className="section-tag">On The Grounds</p>
              <h2 className="section-title mb-5">
                Swimming <em>Pool</em>
              </h2>
              <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-4">
                Cool off in our outdoor pool, set against a private feature wall. Pool access is included with
                day, night and full day & night bookings — short stay guests and outdoor-only visitors can add
                pool access for a small fee below.
              </p>
              <div className="flex flex-wrap gap-3">
                {POOL_FEES.map((f) => (
                    <span
                        key={f.label}
                        className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-2 border border-[oklch(0.76_0.13_85/0.3)] text-gold"
                    >
                  {f.label} — R{f.price}
                </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RONDAVELS */}
        <section className="py-24 px-6 bg-bg4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="section-tag">A Local Touch</p>
              <h2 className="section-title mb-5">
                Traditional <em>Rondavels</em>
              </h2>
              <p className="text-muted-foreground leading-[2] text-[0.83rem]">
                Two thatched rondavels sit on the grounds, hand-painted with traditional Ndebele patterns — a
                distinctive spot to relax outdoors and take in the setting. Ask our team about using this space
                during your stay.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <ImageLightbox images={RONDAVEL_IMAGES} altPrefix="Traditional Rondavels">
                {(openAt) => (
                    <div className="grid grid-cols-2 gap-1">
                      {RONDAVEL_IMAGES.map((img, i) => (
                          <button
                              key={i}
                              type="button"
                              onClick={() => openAt(i)}
                              className={`cursor-zoom-in ${i === 0 ? "col-span-2" : ""}`}
                              aria-label={`View rondavel photo ${i + 1} larger`}
                          >
                            <img
                                src={img}
                                alt={`Thatched rondavel at Cosy Corner — photo ${i + 1}`}
                                width={800}
                                height={800}
                                loading="lazy"
                                className={`w-full object-cover border border-border hover:opacity-90 transition-opacity ${
                                    i === 0 ? "h-56 sm:h-72" : "h-40"
                                }`}
                            />
                          </button>
                      ))}
                    </div>
                )}
              </ImageLightbox>
            </div>
          </div>
        </section>

        {/* BREAKFAST MENU */}
        <section className="py-24 px-6 bg-bg2">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-tag">Available On Request</p>
              <h2 className="section-title">
                Breakfast <em>Menu</em>
              </h2>
              <p className="text-[0.72rem] text-muted-foreground mt-4">
                Please place your breakfast order in advance so it can be prepared fresh
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {BREAKFAST_OPTIONS.map((b) => (
                  <div key={b.name} className="bg-bg3 border border-border p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-display text-lg">{b.name}</div>
                      <div className="font-display text-2xl text-gold">R{b.price}pp</div>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {b.items.map((item) => (
                          <li key={item} className="text-[0.78rem] text-muted-foreground flex items-center gap-2">
                            <span className="text-gold text-[0.6rem]">✦</span> {item}
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>

            <div className="bg-bg3 border border-border p-6">
              <h3 className="text-[0.62rem] tracking-[0.2em] uppercase text-gold mb-4">
                All Options Include Your Choice Of Beverage
              </h3>
              <div className="flex flex-wrap gap-3">
                {BREAKFAST_DRINKS.map((d) => (
                    <span
                        key={d}
                        className="text-[0.65rem] tracking-[0.1em] uppercase px-3 py-2 border border-[oklch(0.76_0.13_85/0.3)] text-gold"
                    >
                  {d}
                </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AMENITIES & HOUSE RULES */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-16">
            <div>
              <p className="section-tag">Included</p>
              <h3 className="section-title mb-6">
                Amenities <em>Included</em>
              </h3>
              <ul className="flex flex-col gap-2">
                {AMENITIES.map((a) => (
                    <li key={a} className="text-[0.8rem] text-muted-foreground flex items-center gap-2">
                      <span className="text-gold text-[0.6rem]">✦</span> {a}
                    </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-tag">Please Note</p>
              <h3 className="section-title mb-6">
                House <em>Rules</em>
              </h3>
              <ul className="flex flex-col gap-2">
                {HOUSE_RULES.map((r) => (
                    <li key={r} className="text-[0.8rem] text-muted-foreground flex items-start gap-2">
                      <span className="text-gold text-[0.6rem] mt-1">✦</span> {r}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </>
  );
}