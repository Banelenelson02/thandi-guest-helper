// Compatibility with the deployed reply-only function as well as structured replies.
// Never send the transcript: accept only labelled booking fields from one reply.
const labels = new Map([
  ['name', 'Name'], ['guest name', 'Name'], ['dates', 'Dates'],
  ['arrival', 'Arrival'], ['check-in', 'Arrival'], ['check in', 'Arrival'],
  ['departure', 'Departure'], ['check-out', 'Departure'], ['check out', 'Departure'],
  ['guests', 'Guests'], ['number of guests', 'Guests'], ['booking type', 'Booking'], ['booking', 'Booking'],
  ['room', 'Preferred room'], ['preferred room', 'Preferred room'], ['phone', 'WhatsApp'], ['whatsapp', 'WhatsApp'],
  ['add-ons', 'Add-ons'], ['addons', 'Add-ons'], ['breakfast', 'Breakfast'], ['total', 'Estimated total'],
  ['estimated total', 'Estimated total'], ['notes', 'Notes'], ['special requests', 'Notes'],
]);
const deliveryPromise = /\b(?:i|we)(?:['’]ll|\s+will)\s+(?:ensure|make sure|send|forward|relay|submit|contact|reach out|follow up)|\b(?:request|message)\s+(?:will be|has been)\s+(?:sent|forwarded|submitted|relayed)|\b(?:first thing|tomorrow)\s+(?:in\s+)?the morning/i;
export function cleanChatReply(text) {
  if (typeof text !== 'string') return 'Please try again or contact the owner on WhatsApp.';
  const cleaned = text.split(/(?<=[.!?])\s+|\n/).filter((part) => !deliveryPromise.test(part)).join('\n').trim();
  return cleaned || 'Review your booking summary, then open WhatsApp and press Send. The owner will confirm availability and payment details.';
}
export function extractHandover(text) {
  if (typeof text !== 'string') return null;
  const fields = new Map();
  for (const line of text.split(/\r?\n/)) {
    const cleaned = line.replace(/\*\*|__/g, '').replace(/^\s*[-*•]\s*/, '').trim();
    const match = cleaned.match(/^([^:]{1,24}):\s*(.+)$/);
    if (!match) continue;
    const label = labels.get(match[1].toLowerCase().trim());
    const value = match[2].trim();
    if (label && value.length <= 500 && !deliveryPromise.test(value)) fields.set(label, value);
  }
  if (!fields.has('Name') || !fields.has('Guests') || !fields.has('Booking') || !(fields.has('Dates') || fields.has('Arrival'))) return null;
  return ['New booking request (not confirmed)', ...Array.from(fields, ([label, value]) => `${label}: ${value}`), 'Please confirm availability, room arrangements, the final price and payment details.'].join('\n');
}
export function summaryWhatsAppUrl(summary) {
  return `https://wa.me/27641236760?text=${encodeURIComponent(summary)}`;
}
