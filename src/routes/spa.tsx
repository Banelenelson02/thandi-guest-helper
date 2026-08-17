import { createFileRoute, Link } from "@tanstack/react-router";
import { POOL_IMAGES, RONDAVEL_IMAGES, POOL_FEES } from "@/data/rooms";
import { ImageLightbox } from "@/components/ImageLightbox";

export const Route = createFileRoute("/spa")({
  head: () => ({
    meta: [
      { title: "Pool & Grounds | Cosy Corner Guest House" },
      {
        name: "description",
        content:
            "A swimming pool and two hand-painted rondavels on the grounds at Cosy Corner Guest House, Hlalanikahle, eMalahleni.",
      },
      { property: "og:title", content: "Pool & Grounds | Cosy Corner" },
      {
        property: "og:description",
        content: "Swimming pool and traditional rondavels on the grounds.",
      },
      { property: "og:image", content: POOL_IMAGES[0] },
      { name: "twitter:image", content: POOL_IMAGES[0] },
    ],
  }),
  component: PoolPage,
});

function PoolPage() {
  return (
      <>
        {/* POOL */}
        <section className="py-24 px-6 bg-bg4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
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
              <h1 className="section-title mb-6">
                Swimming <em>Pool</em>
              </h1>
              <p className="text-muted-foreground leading-[2] text-[0.83rem] mb-8">
                Cool off in our outdoor pool, set against a private feature wall. Pool access is included with
                day, night and full day & night room bookings — or add it on for a small fee if you're just
                visiting for the day.
              </p>
              <Link to="/booking" search={{ type: "spa" }} className="btn-primary">Book a Visit</Link>

              <div className="flex flex-wrap gap-3 mt-8">
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
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="section-tag">A Local Touch</p>
              <h2 className="section-title mb-6">
                Traditional <em>Rondavels</em>
              </h2>
              <p className="text-muted-foreground leading-[2] text-[0.83rem]">
                Two thatched rondavels sit on the grounds, hand-painted with traditional Ndebele patterns —
                a distinctive spot to sit outdoors and take in the setting. Ask our team about using this
                space during your stay.
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
      </>
  );
}