/**
 * Free Google Maps embed for Cosy Corner Guest House & Spa.
 *
 * Uses Google's classic embeddable map (no API key, no billing account,
 * no cost — ever). Trade-off vs the paid JavaScript API version:
 * the map itself uses Google's default blue/white styling rather than
 * our custom grey/gold theme, and there's no click-to-open info window
 * with a gold marker. Everything else (real pin on the real address,
 * zoom, pan, directions) works the same.
 *
 * No setup required — this works immediately, nothing to configure.
 */

const GUESTHOUSE_ADDRESS = "4763 Hlalanikahle, eMalahleni, 1045, South Africa";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  GUESTHOUSE_ADDRESS
)}`;
const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  GUESTHOUSE_ADDRESS
)}&output=embed`;

export function GoogleMap() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-72 border-2 border-gold overflow-hidden">
        <iframe
          title="Cosy Corner Guest House & Spa location"
          src={EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline text-center"
      >
        🧭 Get Directions
      </a>
    </div>
  );
}