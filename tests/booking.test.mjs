import test from 'node:test';
import assert from 'node:assert/strict';
import { todaySA, validateBooking, bookingSummary, whatsappUrl } from '../shared/booking.mjs';

const today = '2026-10-09';
const booking = { name: 'Test Guest', phone: '060 811 1526', bookingType: 'night', room: 'room-1', guests: '2', checkIn: today, checkOut: '2026-10-10', breakfast: 'Classic Breakfast', notes: '' };
test('South African date rolls over before UTC midnight', () => assert.equal(todaySA(new Date('2026-10-08T22:01:00Z')), today));
test('valid overnight request accepts spaced SA phone', () => assert.deepEqual(validateBooking(booking, today), {}));
test('past arrivals and impossible dates are rejected', () => {
  for (const checkIn of ['2026-10-08', '2026-02-30', 'tomorrow']) assert.ok(validateBooking({ ...booking, checkIn }, today).checkIn);
});
test('night and full stays require departure strictly after arrival', () => {
  for (const bookingType of ['night', 'full']) for (const checkOut of ['', today, '2026-10-08', '2026-13-01']) assert.ok(validateBooking({ ...booking, bookingType, checkOut }, today).checkOut);
});
test('day, short and pool visits allow same day departure or none', () => {
  for (const bookingType of ['day', 'short', 'pool']) for (const checkOut of ['', today]) assert.deepEqual(validateBooking({ ...booking, bookingType, checkOut }, today), {});
});
test('3 and 4+ group requests remain valid and ask owner for arrangements', () => {
  for (const guests of ['3', '4']) {
    assert.deepEqual(validateBooking({ ...booking, guests }, today), {});
    assert.match(bookingSummary({ ...booking, guests }), /Group request/);
  }
});
test('pool requests do not need a room', () => assert.deepEqual(validateBooking({ ...booking, bookingType: 'pool', room: '' }, today), {}));
test('tampered choices and long notes are rejected', () => {
  const errors = validateBooking({ ...booking, bookingType: 'unknown', room: 'room-99', guests: '99', breakfast: 'free dinner', notes: 'x'.repeat(1001) }, today);
  for (const key of ['bookingType', 'room', 'guests', 'breakfast', 'notes']) assert.ok(errors[key]);
});
test('WhatsApp handover encodes a clean request with surcharge and no confirmation claim', () => {
  const url = new URL(whatsappUrl({ ...booking, name: 'Guest & Friend', notes: 'Late arrival? #thanks' }));
  const summary = url.searchParams.get('text');
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/27641236760');
  assert.match(summary, /Guest & Friend/);
  assert.match(summary, /extra R11/);
  assert.match(summary, /not confirmed/);
  assert.match(summary, /Late arrival\? #thanks/);
  assert.doesNotMatch(summary, /Email:|Lindo:/);
});
