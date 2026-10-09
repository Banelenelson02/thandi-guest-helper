import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Notice | Cosy Corner Guest House" }] }),
  component: PrivacyPage,
});
function PrivacyPage() {
  return <section className="py-24 px-6"><article className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
    <h1 className="section-title text-foreground">Privacy <em>Notice</em></h1>
    <p>Cosy Corner Guest House, 4763 Phase 4, Hlalanikahle, eMalahleni, uses the details you choose to share to answer questions and arrange bookings.</p>
    <h2 className="text-xl text-gold">Booking requests</h2>
    <p>The booking form prepares a WhatsApp message containing your name, phone number, preferred room, guest count, dates and optional breakfast or notes. It does not submit these details to a booking database. The owner receives them when you press Send in WhatsApp, and uses them to discuss availability, prices and payment. WhatsApp has its own privacy practices.</p>
    <h2 className="text-xl text-gold">The AI concierge</h2>
    <p>Messages you send to Lindo are processed through Supabase and the Lovable AI gateway using a Google AI model. These providers may process information outside South Africa under their own service terms. Chat history stays in this page while it is open and is sent with your next message. This website does not save a chat transcript to its database. Service providers may retain operational logs under their policies.</p>
    <p>Do not share ID numbers, bank card details, passwords, payment proofs or sensitive personal information in chat. You can use the booking form or contact the owner directly on WhatsApp instead.</p>
    <h2 className="text-xl text-gold">Security and third party services</h2>
    <p>The chat service uses hashed network identifiers and request counts to limit misuse. Rate limit records expire and are cleared during later requests after about two days. Hosting providers may record technical connection information. Embedded Google Maps and Google Fonts connect to Google services and may receive your IP address and browser information.</p>
    <h2 className="text-xl text-gold">Your choices and questions</h2>
    <p>You can choose not to use chat. For questions about your information, or to request access, correction or deletion of details held by the guesthouse, contact the owner on <a className="text-gold underline" href="https://wa.me/27641236760" target="_blank" rel="noopener noreferrer">064 123 6760 on WhatsApp</a>. Booking correspondence is handled by the owner, whose retention practices should be confirmed directly.</p>
  </article></section>;
}
