import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { todaySA, validateBooking, bookingSummary, whatsappUrl } from "../../shared/booking.mjs";
import { ROOMS, BREAKFAST_OPTIONS, BOOKING_TYPES, BREAKFAST_DRINKS_INCLUDED, BREAKFAST_DRINK_SURCHARGE } from "@/data/rooms";

type SearchParams = { room?: string; type?: string };

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Stay | Cosy Corner Guest House" },
      {
        name: "description",
        content:
            "Request your room or pool visit at Cosy Corner Guest House in eMalahleni. Day, night and full day bookings available.",
      },
      { property: "og:title", content: "Book Your Stay | Cosy Corner" },
      { property: "og:description", content: "Request your room or pool visit on WhatsApp. The owner confirms availability and payment details." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    room: typeof s.room === "string" ? s.room : undefined,
    type: typeof s.type === "string" ? s.type : undefined,
  }),
  component: BookingPage,
});

function BookingPage() {
  const search = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; msg?: string }>({ kind: "idle" });
  const [summary, setSummary] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [arrival, setArrival] = useState("");
  const [bookingType, setBookingType] = useState(search.type === "pool" ? "pool" : "");
  const [guests, setGuests] = useState("1");
  const [healthyQty, setHealthyQty] = useState(0);
  const [classicQty, setClassicQty] = useState(0);
  const [healthyDrinks, setHealthyDrinks] = useState<string[]>([]);
  const [classicDrinks, setClassicDrinks] = useState<string[]>([]);
  const drinkOptions = [...BREAKFAST_DRINKS_INCLUDED, BREAKFAST_DRINK_SURCHARGE.name];
  const hotChocolateCount = [...healthyDrinks, ...classicDrinks].filter((drink) => drink === BREAKFAST_DRINK_SURCHARGE.name).length;
  const breakfastAddOn = healthyQty * 70 + classicQty * 90 + hotChocolateCount * BREAKFAST_DRINK_SURCHARGE.extra;
  const overnight = ["night", "full"].includes(bookingType);
  const breakfastCount = healthyQty + classicQty;
  const maxBreakfasts = Number(guests);

  function adjustBreakfast(kind: "healthy" | "classic", delta: number) {
    const current = kind === "healthy" ? healthyQty : classicQty;
    const next = current + delta;
    if (!overnight || next < 0 || next > 20 || (delta > 0 && breakfastCount >= maxBreakfasts)) return;
    if (kind === "healthy") {
      setHealthyQty(next);
      setHealthyDrinks((previous) => delta > 0 ? [...previous, ""] : previous.slice(0, -1));
    } else {
      setClassicQty(next);
      setClassicDrinks((previous) => delta > 0 ? [...previous, ""] : previous.slice(0, -1));
    }
    setSummary("");
    setWhatsapp("");
    setStatus({ kind: "idle" });
    setErrors((previous) => ({ ...previous, breakfastQty: "", breakfastDrinks: "" }));
  }

  function selectDrink(kind: "healthy" | "classic", index: number, drink: string) {
    if (!drinkOptions.includes(drink)) return;
    const setDrinks = kind === "healthy" ? setHealthyDrinks : setClassicDrinks;
    setDrinks((previous) => previous.map((selected, i) => i === index ? drink : selected));
    setSummary("");
    setWhatsapp("");
    setStatus({ kind: "idle" });
    setErrors((previous) => ({ ...previous, breakfastDrinks: "" }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "idle" });
    setSummary(""); setWhatsapp("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const validation = validateBooking(data);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    setSummary(bookingSummary(data));
    setWhatsapp(whatsappUrl(data));
    setStatus({ kind: "success", msg: "Review your request below, then open WhatsApp and press Send. Your booking is only confirmed when the owner confirms availability and payment." });
  }

  return (
      <section className="py-24 px-6 bg-bg2">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-tag">Reserve Your Stay</p>
          <h1 className="section-title mb-3">
            Make a <em>Booking</em>
          </h1>
          <p className="text-[0.85rem] text-muted-foreground mb-2">
            Fill in your details, review your request and send it to the owner on WhatsApp.
          </p>

          <form onChange={() => { setSummary(""); setWhatsapp(""); setStatus({ kind: "idle" }); }} onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-6 mt-10 text-left" noValidate>
            <Field label="Full Name" name="name" error={errors.name} required />
            <Field label="Phone / WhatsApp" name="phone" type="tel" placeholder="0xx xxx xxxx" error={errors.phone} required />

            <SelectField label="Booking Type" name="bookingType" error={errors.bookingType} defaultValue={bookingType} onChange={(value) => {
              setBookingType(value);
              if (!["night", "full"].includes(value)) {
                setHealthyQty(0);
                setClassicQty(0);
                setHealthyDrinks([]);
                setClassicDrinks([]);
              }
            }}>
              <option value="">Select…</option>
              {BOOKING_TYPES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label} — R{b.price} ({b.hours})
                  </option>
              ))}
              <option value="pool">Pool Access Only</option>
            </SelectField>

            <SelectField label="Room Type" name="room" error={errors.room} defaultValue={search.room ?? ""}>
              <option value="">Select…</option>
              {ROOMS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.ensuite ? "En-suite" : "Shared Toilet"}
                  </option>
              ))}
              <option value="pool-only">Pool Access Only</option>
            </SelectField>

            <SelectField label="Number of Guests" name="guests" defaultValue="1" onChange={(value) => {
              setGuests(value);
              const limit = Number(value);
              if (healthyQty + classicQty > limit) {
                const keepHealthy = Math.min(healthyQty, limit);
                const keepClassic = Math.min(classicQty, limit - keepHealthy);
                setHealthyQty(keepHealthy);
                setClassicQty(keepClassic);
                setHealthyDrinks((previous) => previous.slice(0, keepHealthy));
                setClassicDrinks((previous) => previous.slice(0, keepClassic));
              }
            }}>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </SelectField>

            <Field label="Check-in / Arrival Date" name="checkIn" type="date" min={todaySA()} onChange={setArrival} error={errors.checkIn} required />
            <Field label="Check-out / Departure Date" name="checkOut" type="date" min={arrival || todaySA()} required={["night", "full"].includes(bookingType)} error={errors.checkOut} />

            <div className="sm:col-span-2 flex flex-col gap-3 border border-border p-5 bg-bg3">
              <label className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">
                Breakfast Add-On (Available for Night & Full Day & Night Bookings)
              </label>
              {!overnight && (
                <p className="text-sm text-muted-foreground">Choose Night Booking or Full Day & Night to add breakfast.</p>
              )}
              {overnight && (
                <>
                  <input type="hidden" name="healthyQty" value={healthyQty} />
                  <input type="hidden" name="classicQty" value={classicQty} />
                  <input type="hidden" name="breakfastDrinks" value={JSON.stringify({ healthy: healthyDrinks, classic: classicDrinks })} />
                  <p className="text-sm text-muted-foreground">Tap a breakfast to add it. You can choose different breakfasts for different guests.</p>
                </>
              )}
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                {BREAKFAST_OPTIONS.map((b) => {
                  const kind = b.name === "Healthy Breakfast" ? "healthy" : "classic";
                  const count = kind === "healthy" ? healthyQty : classicQty;
                  const canAdd = overnight && breakfastCount < maxBreakfasts;
                  return (
                    <div key={b.name} className={`border p-3 transition-colors ${count > 0 ? "border-gold bg-gold/10" : "border-border/60"}`}>
                      <button
                        type="button"
                        disabled={!canAdd}
                        onClick={() => adjustBreakfast(kind, 1)}
                        aria-label={`Add one ${b.name}`}
                        className="block w-full text-left disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-foreground font-medium text-sm">{b.name}</span>
                          <span className="text-gold font-display text-base">R{b.price}pp</span>
                        </span>
                        <span className="block text-[0.72rem] text-muted-foreground mt-1">{b.items.join(", ")}</span>
                        {overnight && <span className="block text-xs text-gold mt-3">{canAdd ? "Tap to add +" : "Maximum breakfasts selected"}</span>}
                      </button>
                      {overnight && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
                          <span className="text-xs text-muted-foreground">Quantity</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label={`Remove one ${b.name}`}
                              disabled={count === 0}
                              onClick={() => adjustBreakfast(kind, -1)}
                              className="border border-border text-gold w-9 h-9 text-lg disabled:opacity-40"
                            >−</button>
                            <span className="text-sm text-foreground min-w-4 text-center" aria-live="polite">{count}</span>
                            <button
                              type="button"
                              aria-label={`Add one ${b.name}`}
                              disabled={!canAdd}
                              onClick={() => adjustBreakfast(kind, 1)}
                              className="border border-border text-gold w-9 h-9 text-lg disabled:opacity-40"
                            >+</button>
                          </div>
                        </div>
                      )}
                      {overnight && count > 0 && (
                        <div className="mt-4 space-y-4">
                          {(kind === "healthy" ? healthyDrinks : classicDrinks).map((chosen, index) => (
                            <fieldset key={index} className="border-t border-border/60 pt-3">
                              <legend className="sr-only">Drink for {b.name} #{index + 1}</legend>
                              <p className="text-xs text-foreground mb-2 font-medium">Drink for breakfast #{index + 1}</p>
                              <div className="grid grid-cols-2 gap-2" role="group" aria-label={`Drink for ${b.name} #${index + 1}`}>
                                {drinkOptions.map((drink) => (
                                  <button
                                    key={drink}
                                    type="button"
                                    aria-pressed={chosen === drink}
                                    onClick={() => selectDrink(kind, index, drink)}
                                    className={`text-left text-xs min-h-10 p-2 border transition-colors ${chosen === drink ? "border-gold bg-gold/20 text-gold" : "border-border/70 text-foreground hover:border-gold/60"}`}
                                  >
                                    {drink}
                                    {drink === BREAKFAST_DRINK_SURCHARGE.name ? ` (+R${BREAKFAST_DRINK_SURCHARGE.extra})` : " · Included"}
                                  </button>
                                ))}
                              </div>
                              {!chosen && <p className="text-xs text-gold mt-2">Choose one drink for this breakfast.</p>}
                            </fieldset>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {overnight && (
                <p className="text-xs text-muted-foreground">
                  Selected {breakfastCount} of {maxBreakfasts} breakfasts.
                  {breakfastCount > maxBreakfasts ? " Please remove breakfasts to match the guest count." : ""}
                </p>
              )}
              {overnight && breakfastCount > 0 && (
                <div className="border-t border-border/60 pt-3 text-sm text-foreground flex flex-wrap justify-between gap-2">
                  <span>Breakfasts and drinks</span>
                  <span className="font-medium text-gold">R{breakfastAddOn}{hotChocolateCount > 0 ? ` (includes R${hotChocolateCount * 11} for hot chocolate)` : ""}</span>
                </div>
              )}
              {errors.breakfastQty && <p role="alert" className="text-destructive text-sm">{errors.breakfastQty}</p>}
              {errors.breakfastDrinks && <p role="alert" className="text-destructive text-sm">{errors.breakfastDrinks}</p>}
              <p className="text-[0.65rem] text-muted-foreground">
                Juice, tea, coffee or cappuccino is included. Hot chocolate costs an extra R11 per serving. Please order in advance.
              </p>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">Special Requests or Notes</label>
              <textarea
                  name="notes"
                  rows={3}
                  className="bg-transparent border-b border-input text-foreground py-3 outline-none focus:border-gold transition-colors resize-y min-h-24 text-[0.8rem]"
              />
            </div>

            <p className="sm:col-span-2 text-sm text-muted-foreground">For 3 or more guests, the owner will advise on room arrangements and the price. Each room accommodates up to 2 guests. Read our <Link to="/privacy" className="text-gold underline">privacy notice</Link> before sharing personal details.</p>
            <div className="sm:col-span-2 text-center mt-3">
              <button type="submit" className="btn-primary">
                Review Booking Request
              </button>
            </div>

            {summary && <div className="sm:col-span-2 border border-border p-5"><pre className="whitespace-pre-wrap font-sans text-sm">{summary}</pre><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-block">Open WhatsApp to Send</a></div>}
            {status.kind !== "idle" && (
                <div
                    className={`sm:col-span-2 text-center text-[0.78rem] py-3 px-4 mt-2 ${
                        status.kind === "success"
                            ? "text-[#4caf50] border border-[#4caf50]/30 bg-[#4caf50]/5"
                            : "text-destructive border border-destructive/30 bg-destructive/5"
                    }`}
                >
                  {status.msg}
                </div>
            )}
          </form>
        </div>
      </section>
  );
}

function Field({
                 label,
                 name,
                 type = "text",
                 required,
                 error,
                 placeholder,
                 min, onChange,
               }: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: string;
  onChange?: (value: string) => void;
}) {
  return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">{label}</label>
        <input
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            id={name} min={min} onChange={(e) => onChange?.(e.target.value)}
            className={`bg-transparent border-b text-foreground py-3 outline-none focus:border-gold transition-colors text-[0.8rem] ${
                error ? "border-destructive" : "border-input"
            }`}
        />
        {error && <span className="text-[0.6rem] text-destructive">{error}</span>}
      </div>
  );
}

function SelectField({
                       label,
                       name,
                       children,
                       defaultValue,
                       error,
                       onChange,
                     }: {
  label: string;
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
  error?: string;
  onChange?: (value: string) => void;
}) {
  return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">{label}</label>
        <select
            name={name}
            defaultValue={defaultValue}
            id={name} onChange={(e) => onChange?.(e.target.value)}
            className={`bg-transparent border-b text-foreground py-3 outline-none focus:border-gold transition-colors text-[0.8rem] ${
                error ? "border-destructive" : "border-input"
            }`}
        >
          {children}
        </select>
        {error && <span className="text-[0.6rem] text-destructive">{error}</span>}
      </div>
  );
}