import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHandoverDraft, validateBooking } from '../shared/booking.mjs';
import { extractHandover, cleanChatReply, summaryWhatsAppUrl } from '../shared/handover.mjs';
const today = '2026-10-09';
const banele = { name: 'Banele', phone: '', bookingType: 'full', room: '', guests: '2', checkIn: '2026-10-10', checkOut: '2026-10-11', breakfast: 'Classic Breakfast', breakfastQty: '2', notes: '' };
const asReply = (s) => `Here is your booking summary:\n${s}\n\nReview your booking summary, then open WhatsApp and press Send to share it with the owner.`;
test('Banele summary without phone or room yields a WhatsApp link with quantity and R805', () => {
  const { summary } = parseHandoverDraft(banele, today);
  const draft = extractHandover(asReply(summary));
  assert.match(draft, /2x Classic Breakfast \(R90 each, R180\)/);
  assert.match(draft, /Estimated total: R805/);
  assert.doesNotMatch(draft, /WhatsApp:|Preferred room:/);
  const text = new URL(summaryWhatsAppUrl(draft)).searchParams.get('text');
  assert.equal(text, draft);
  assert.doesNotMatch(cleanChatReply(asReply(summary)) + text, /will (send|forward|contact)|morning/i);
});
test('form validation still requires phone and room', () => {
  const errors = validateBooking(banele, today);
  assert.ok(errors.phone && errors.room);
});
test('invalid overnight dates produce no summary', () => {
  for (const checkOut of ['', '2026-10-10', '2026-10-09']) assert.equal(parseHandoverDraft({ ...banele, checkOut }, today).summary, null);
});
test('missing name, guests or breakfast quantity blocks the summary', () => {
  for (const patch of [{ name: '' }, { guests: '' }, { breakfastQty: '' }]) assert.equal(parseHandoverDraft({ ...banele, ...patch }, today).summary, null);
});
