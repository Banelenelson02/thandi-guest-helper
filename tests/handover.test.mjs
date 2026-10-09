import test from 'node:test';
import assert from 'node:assert/strict';
import { extractHandover, cleanChatReply, summaryWhatsAppUrl } from '../shared/handover.mjs';
const reply = `Good morning! I will ensure your message reaches the team first thing in the morning. Here is your summary:
* **Name:** Banele
* **Dates:** 10 October – 11 October 2026 (Check-in 10:00 AM, Check-out 09:00 AM)
* **Guests:** 2
* **Booking Type:** Full Day & Night (R625)
* **Add-ons:** 2x Classic Breakfasts (R180)
* **Total:** R805
We will contact you via WhatsApp shortly to finalize everything.
Warm regards, Lindo`;
test('existing Lindo summary becomes a clean WhatsApp draft, not a transcript', () => {
 const summary = extractHandover(reply);
 assert.match(summary, /Name: Banele/);
 assert.match(summary, /2x Classic Breakfasts \(R180\)/);
 assert.match(summary, /Estimated total: R805/);
 assert.doesNotMatch(summary, /Good morning|first thing|contact you|Warm regards/);
 assert.equal(new URL(summaryWhatsAppUrl(summary)).searchParams.get('text'), summary);
 assert.equal(new URL(summaryWhatsAppUrl(summary)).pathname, '/27641236760');
});
test('partial answers and prose cannot become a sendable booking summary', () => {
 for (const value of [null, {}, 'Rooms cost R450', '**Name:** Banele\n**Guests:** 2', reply.replace('* **Dates:** 10 October – 11 October 2026 (Check-in 10:00 AM, Check-out 09:00 AM)\n','')]) assert.equal(extractHandover(value), null);
});
test('display removes forwarding promises but retains booking details', () => {
 const cleaned = cleanChatReply(reply);
 assert.doesNotMatch(cleaned, /first thing|will ensure|will contact/);
 assert.match(cleaned, /R805/);
 assert.match(cleaned, /Classic Breakfasts/);
});
test('later corrected summary uses only the new reply', () => {
 const corrected = extractHandover(reply.replace('Guests:** 2','Guests:** 4+'));
 assert.match(corrected, /Guests: 4\+/);
 assert.doesNotMatch(corrected, /Guests: 2/);
});
