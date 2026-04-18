import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { ROOMS } from "@/data/rooms";

type SearchParams = { room?: string; type?: string };

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Stay | Cosy Corner Guest House & Spa" },
      {
        name: "description",
        content:
          "Reserve your room or spa treatment at Cosy Corner Guest House & Spa in eMalahleni. Day, night and full day bookings available.",
      },
      { property: "og:title", content: "Book Your Stay | Cosy Corner" },
      { property: "og:description", content: "Reserve your room or spa treatment online. Confirmation within hours." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    room: typeof s.room === "string" ? s.room : undefined,
    type: typeof s.type === "string" ? s.type : undefined,
  }),
  component: BookingPage,
});

// EmailJS configuration — replace with your actual IDs
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const schema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name").max(100),
    email: z.string().trim().email("Please enter a valid email").max(255),
    phone: z
      .string()
      .trim()
      .regex(/^(\+27|0)[6-8][0-9]{8}$/, "Please enter a valid SA phone number"),
    bookingType: z.string().min(1, "Please select a booking type"),
    room: z.string().min(1, "Please select a room"),
    guests: z.string().min(1),
    checkIn: z.string().min(1, "Please select a check-in date"),
    checkOut: z.string().optional(),
    notes: z.string().max(1000).optional(),
  })
  .refine((d) => !d.checkOut || d.checkOut >= d.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

function BookingPage() {
  const search = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; msg?: string }>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "idle" });
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0]?.toString() ?? "form";
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      if (EMAILJS_SERVICE_ID.startsWith("YOUR_")) {
        // Not configured yet — open WhatsApp as fallback
        const summary =
          `New Booking Request:\n\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\n` +
          `Type: ${parsed.data.bookingType}\nRoom: ${parsed.data.room}\nGuests: ${parsed.data.guests}\n` +
          `Check-in: ${parsed.data.checkIn}\nCheck-out: ${parsed.data.checkOut ?? "—"}\nNotes: ${parsed.data.notes ?? "—"}`;
        window.open(`https://wa.me/27641236760?text=${encodeURIComponent(summary)}`, "_blank");
        setStatus({
          kind: "success",
          msg: "Email service not configured yet — your booking has been opened in WhatsApp instead. We'll confirm shortly!",
        });
      } else {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, parsed.data, { publicKey: EMAILJS_PUBLIC_KEY });
        setStatus({ kind: "success", msg: "Thank you! Your booking request has been sent. We'll confirm within a few hours." });
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error(err);
      setStatus({
        kind: "error",
        msg: "Could not send right now. Please WhatsApp us on 064 123 6760 — we'll confirm immediately.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-24 px-6 bg-bg2">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-tag">Reserve Your Stay</p>
        <h1 className="section-title mb-3">
          Make a <em>Booking</em>
        </h1>
        <p className="text-[0.85rem] text-muted-foreground mb-2">
          Fill in your details and we'll confirm your reservation within a few hours
        </p>

        <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-6 mt-10 text-left" noValidate>
          <Field label="Full Name" name="name" error={errors.name} required />
          <Field label="Email Address" name="email" type="email" error={errors.email} required />
          <Field label="Phone / WhatsApp" name="phone" type="tel" placeholder="0xx xxx xxxx" error={errors.phone} required />

          <SelectField label="Booking Type" name="bookingType" error={errors.bookingType} defaultValue={search.type === "spa" ? "spa" : ""}>
            <option value="">Select…</option>
            <option value="day">Day Time Booking</option>
            <option value="night">Night Time Booking</option>
            <option value="full">Full Day Booking</option>
            <option value="spa">Spa Treatment Only</option>
          </SelectField>

          <SelectField label="Room Type" name="room" error={errors.room} defaultValue={search.room ?? ""}>
            <option value="">Select…</option>
            {ROOMS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — R{r.price.toLocaleString()}/night
              </option>
            ))}
            <option value="spa-only">Spa Treatment (No Room)</option>
          </SelectField>

          <SelectField label="Number of Guests" name="guests" defaultValue="1">
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4+ Guests</option>
          </SelectField>

          <Field label="Check-in / Arrival Date" name="checkIn" type="date" error={errors.checkIn} required />
          <Field label="Check-out / Departure Date" name="checkOut" type="date" error={errors.checkOut} />

          <div className="sm:col-span-2 flex flex-col gap-2">
            <label className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">Special Requests or Notes</label>
            <textarea
              name="notes"
              rows={3}
              className="bg-transparent border-b border-input text-foreground py-3 outline-none focus:border-gold transition-colors resize-y min-h-24 text-[0.8rem]"
            />
          </div>

          <div className="sm:col-span-2 text-center mt-3">
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? "Sending…" : "✦ Reserve Now ✦"}
            </button>
          </div>

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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
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
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.58rem] tracking-[0.25em] uppercase text-gold">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
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
