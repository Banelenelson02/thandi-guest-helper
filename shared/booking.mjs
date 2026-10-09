export const TYPES = { day: 'Day Booking', night: 'Night Booking', short: 'Short Stay', full: 'Full Day & Night', pool: 'Pool Access Only' };
export function todaySA(now = new Date()) {
  return new Date(now.getTime() + 7200000).toISOString().slice(0, 10);
}
function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function validateBooking(data, today = todaySA()) {
  const errors = {};
  if (typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.length > 100) errors.name = 'Please enter your full name';
  if (typeof data.phone !== 'string' || !/^(\+27|0)[6-8][0-9]{8}$/.test(data.phone.replace(/\s/g, ''))) errors.phone = 'Please enter a valid SA phone number';
  if (!Object.hasOwn(TYPES, data.bookingType)) errors.bookingType = 'Please select a booking type';
  if (data.bookingType !== 'pool' && !/^room-[1-5]$/.test(data.room || '')) errors.room = 'Please select a room';
  if (!['1', '2', '3', '4'].includes(String(data.guests))) errors.guests = 'Please select the number of guests';
  if (!validDate(data.checkIn) || data.checkIn < today) errors.checkIn = 'Choose today or a future arrival date';
  const overnight = ['night', 'full'].includes(data.bookingType);
  if (overnight && !data.checkOut) errors.checkOut = 'Please select a departure date for your overnight stay';
  if (data.checkOut && (!validDate(data.checkOut) || data.checkOut < data.checkIn || (overnight && data.checkOut === data.checkIn))) errors.checkOut = overnight ? 'Departure must be after arrival' : 'Departure cannot be before arrival';
  if (data.breakfast && !['none', 'Healthy Breakfast', 'Classic Breakfast'].includes(data.breakfast)) errors.breakfast = 'Please choose a breakfast option';
  if (data.notes && (typeof data.notes !== 'string' || data.notes.length > 1000)) errors.notes = 'Notes must be under 1,000 characters';
  return errors;
}
export function bookingSummary(data) {
  return [
    'New booking request (not confirmed)',
    `Name: ${data.name.trim()}`, `WhatsApp: ${data.phone}`,
    `Booking: ${TYPES[data.bookingType]}`, `Preferred room: ${data.bookingType === 'pool' ? 'Pool access only' : data.room.replace('room-', 'Room ')}`,
    `Guests: ${String(data.guests) === '4' ? '4+' : data.guests}`,
    ...(Number(data.guests) > 2 && data.bookingType !== 'pool' ? ['Group request: please advise on rooms and the final price.'] : []),
    `Arrival: ${data.checkIn}`, `Departure: ${data.checkOut || 'Same day'}`,
    `Breakfast: ${data.breakfast && data.breakfast !== 'none' ? data.breakfast + (data.breakfast === 'Healthy Breakfast' ? ' (R70 per person)' : ' (R90 per person)') : 'None requested'}`,
    'Hot chocolate, if requested: an extra R11 per serving.',
    ...(data.notes ? [`Notes: ${data.notes}`] : []),
    'Please confirm availability, room arrangements, the final price and payment details. The owner confirms the booking after payment.'
  ].join('\n');
}
export function whatsappUrl(data) { return `https://wa.me/27641236760?text=${encodeURIComponent(bookingSummary(data))}`; }

export function parseBookingDraft(raw, today = todaySA()) {
  const fields = ['name', 'phone', 'bookingType', 'room', 'guests', 'checkIn', 'checkOut', 'breakfast', 'notes'];
  const data = Object.fromEntries(fields.map((key) => [key, typeof raw?.[key] === 'string' ? raw[key].trim() : '']));
  const errors = validateBooking(data, today);
  return { booking: Object.keys(errors).length ? null : data, errors };
}

// Chat handover: phone and room are optional (owner confirms on WhatsApp). Form validation above is unchanged.
const BASE = { day: 350, night: 450, short: 200, full: 625 };
const BREAKFAST = { 'Healthy Breakfast': 70, 'Classic Breakfast': 90 };
export function parseHandoverDraft(raw, today = todaySA()) {
  const fields = ['name', 'phone', 'bookingType', 'room', 'guests', 'checkIn', 'checkOut', 'breakfast', 'breakfastQty', 'notes'];
  const data = Object.fromEntries(fields.map((key) => [key, typeof raw?.[key] === 'string' ? raw[key].trim() : '']));
  const errors = validateBooking(data, today);
  if (!data.phone) delete errors.phone;
  if (!data.room) delete errors.room;
  const hasBreakfast = Object.hasOwn(BREAKFAST, data.breakfast);
  const qty = Number(data.breakfastQty);
  if (hasBreakfast && !(Number.isInteger(qty) && qty >= 1 && qty <= 20)) errors.breakfastQty = 'Please tell me how many breakfasts you would like';
  if (Object.keys(errors).length) return { summary: null, errors };
  const nights = ['night', 'full'].includes(data.bookingType) ? Math.round((Date.parse(data.checkOut) - Date.parse(data.checkIn)) / 86400000) : 1;
  const base = Object.hasOwn(BASE, data.bookingType) ? BASE[data.bookingType] * nights : null;
  const addOn = hasBreakfast ? BREAKFAST[data.breakfast] * qty : 0;
  const lines = [
    `Name: ${data.name}`,
    `Booking Type: ${TYPES[data.bookingType]}`,
    `Arrival: ${data.checkIn}`,
    `Departure: ${data.checkOut || 'Same day'}`,
    `Guests: ${data.guests === '4' ? '4+' : data.guests}`,
    ...(data.room ? [`Preferred room: ${data.room.replace('room-', 'Room ')}`] : []),
    ...(data.phone ? [`WhatsApp: ${data.phone}`] : []),
    `Add-ons: ${hasBreakfast ? `${qty}x ${data.breakfast} (R${BREAKFAST[data.breakfast]} each, R${addOn})` : 'None'}`,
    `Estimated total: ${base === null ? 'Owner to confirm' : `R${base + addOn}`}`,
    ...(data.notes ? [`Notes: ${data.notes.slice(0, 300)}`] : []),
  ];
  return { summary: lines.join('\n'), errors };
}
