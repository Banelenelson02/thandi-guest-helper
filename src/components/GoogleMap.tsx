/**
 * Free Google Maps embed for Cosy Corner Guest House & Spa.
 *
 * Uses Google's classic embeddable map (no API key, no billing account,
 * no cost — ever). Pinned to exact GPS coordinates for accuracy.
 *
 * No setup required — this works immediately, nothing to configure.
 */

const GUESTHOUSE_COORDS = "-25.8398924,29.1078382";
const GUESTHOUSE_ADDRESS = "4763 Phase 4, Hlalanikahle, eMalahleni, 1045, South Africa";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${GUESTHOUSE_COORDS}`;
const EMBED_URL = `https://www.google.com/maps?q=${GUESTHOUSE_COORDS}&output=embed`;

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