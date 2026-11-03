export const TYPES = { day: 'Day Booking', night: 'Night Booking', short: 'Short Stay', full: 'Full Day & Night', pool: 'Pool Access Only' };
export function todaySA(now = new Date()) {
  return new Date(now.getTime() + 7200000).toISOString().slice(0, 10);
}
export const INCLUDED_BREAKFAST_DRINKS = ['Juice', 'Tea', 'Coffee', 'Cappuccino'];
export const HOT_CHOCOLATE = 'Hot Chocolate';
const DRINK_CHOICES = [...INCLUDED_BREAKFAST_DRINKS, HOT_CHOCOLATE];

// A separate drink is selected for each breakfast serving. This is only used by
// the standalone booking form; older chat drafts without this field still work.
function readBreakfastDrinks(value) {
  if (typeof value !== 'string' || value.length > 2000) return null;
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) ||
        !Array.isArray(parsed.healthy) || !Array.isArray(parsed.classic)) return null;
    return parsed;
  } catch { return null; }
}
function validDrinkList(values, expected) {
  return values.length === expected && values.every((drink) => typeof drink === 'string' && DRINK_CHOICES.includes(drink));
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
  if (data.healthyQty !== undefined || data.classicQty !== undefined) {
    const h = Number(data.healthyQty || 0), c = Number(data.classicQty || 0);
    if (![h,c].every(n => Number.isInteger(n) && n >= 0 && n <= 20) || h + c > Number(data.guests)) errors.breakfastQty = 'Breakfast quantities must not exceed guest count';
    if (h + c > 0 && !overnight) errors.breakfastQty = 'Breakfast is for overnight stays only';
  }
  if (data.breakfastDrinks !== undefined) {
    const drinks = readBreakfastDrinks(data.breakfastDrinks);
    const h = Number(data.healthyQty || 0), c = Number(data.classicQty || 0);
    if (!drinks || !validDrinkList(drinks.healthy, h) || !validDrinkList(drinks.classic, c)) {
      errors.breakfastDrinks = 'Choose one drink for each breakfast';
    }
  }
  if (data.notes && (typeof data.notes !== 'string' || data.notes.length > 1000)) errors.notes = 'Notes must be under 1,000 characters';
  return errors;
}
export function bookingSummary(data) {
  const h = Number(data.healthyQty || 0), c = Number(data.classicQty || 0);
  const mixed = h + c > 0 || ((data.healthyQty !== undefined || data.classicQty !== undefined) && (!data.breakfast || data.breakfast === 'none'));
  const nights = ['night','full'].includes(data.bookingType) ? Math.round((Date.parse(data.checkOut)-Date.parse(data.checkIn))/86400000) : 1;
  const rate = { short: 200, day: 350, night: 450, full: 625 }[data.bookingType];
  const drinks = data.breakfastDrinks === undefined ? null : readBreakfastDrinks(data.breakfastDrinks);
  const drinkLines = drinks ? [
    ...drinks.healthy.map((drink, index) => `Healthy Breakfast #${index + 1}: ${drink}`),
    ...drinks.classic.map((drink, index) => `Classic Breakfast #${index + 1}: ${drink}`)
  ] : [];
  const hotChocolateCount = drinks ? [...drinks.healthy, ...drinks.classic].filter((drink) => drink === HOT_CHOCOLATE).length : 0;
  const drinkSurcharge = hotChocolateCount * 11;
  const breakfastText = mixed ? [h ? h + ' Healthy Breakfast (R' + (h*70) + ')' : '', c ? c + ' Classic Breakfast (R' + (c*90) + ')' : ''].filter(Boolean).join(', ') || 'None requested' : data.breakfast && data.breakfast !== 'none' ? data.breakfast + ' (price to be confirmed)' : 'None requested';
  return [
    'New booking request (not confirmed)',
    `Name: ${data.name.trim()}`, `WhatsApp: ${data.phone}`,
    `Booking: ${TYPES[data.bookingType]}`, `Preferred room: ${data.bookingType === 'pool' ? 'Pool access only' : data.room.replace('room-', 'Room ')}`,
    `Guests: ${String(data.guests) === '4' ? '4+' : data.guests}`,
    ...(Number(data.guests) > 2 && data.bookingType !== 'pool' ? ['Group request: please advise on rooms and the final price.'] : []),
    `Arrival: ${data.checkIn}`, `Departure: ${data.checkOut || 'Same day'}`,
    `Breakfast: ${breakfastText}`,
    ...(drinkLines.length ? [`Drinks: ${drinkLines.join('; ')}`] : []),
    ...(hotChocolateCount ? [`Hot chocolate surcharge: R${drinkSurcharge} (${hotChocolateCount} at R11 each)`] : []),
    ...(mixed ? [`Estimated total: ${rate !== undefined && Number(data.guests) <= 2 ? 'R' + (rate*nights+h*70+c*90+drinkSurcharge) : 'Owner to confirm'} (subject to owner confirmation)`] : []),
    ...(data.breakfastDrinks === undefined ? ['Hot chocolate, if requested: an extra R11 per serving.'] : []),
    ...(data.notes ? [`Notes: ${data.notes}`] : []),
    'Please confirm availability, room arrangements, the final price and payment details. The owner confirms the booking after payment.'
  ].join('\n');
}
export function whatsappUrl(data) { return `https://wa.me/27641236760?text=${encodeURIComponent(bookingSummary(data))}`; }

export function parseBookingDraft(raw, today = todaySA()) {
  const fields = ['name', 'phone', 'bookingType', 'room', 'guests', 'checkIn', 'checkOut', 'breakfast', 'healthyQty', 'classicQty', 'notes'];
  const data = Object.fromEntries(fields.map((key) => [key, typeof raw?.[key] === 'string' ? raw[key].trim() : '']));
  const errors = validateBooking(data, today);
  return { booking: Object.keys(errors).length ? null : data, errors };
}

// Chat handover: phone and room are optional (owner confirms on WhatsApp). Form validation above is unchanged.
const BASE = { day: 350, night: 450, short: 200, full: 625 };
const BREAKFAST = { 'Healthy Breakfast': 70, 'Classic Breakfast': 90 };
export function parseHandoverDraft(raw, today = todaySA()) {
  const fields = ['name', 'phone', 'bookingType', 'room', 'guests', 'checkIn', 'checkOut', 'breakfast', 'breakfastQty', 'healthyQty', 'classicQty', 'notes'];
  const data = Object.fromEntries(fields.map((key) => [key, typeof raw?.[key] === 'string' ? raw[key].trim() : '']));
  const errors = validateBooking(data, today);
  if (!data.phone) delete errors.phone;
  if (!data.room) delete errors.room;
  const h = Number(data.healthyQty || 0), c = Number(data.classicQty || 0);
  const hasMixed = h + c > 0;
  const hasBreakfast = !hasMixed && Object.hasOwn(BREAKFAST, data.breakfast);
  const qty = Number(data.breakfastQty);
  if (hasBreakfast && !(Number.isInteger(qty) && qty >= 1 && qty <= 20)) errors.breakfastQty = 'Please tell me how many breakfasts you would like';
  if (Object.keys(errors).length) return { summary: null, errors };
  const nights = ['night', 'full'].includes(data.bookingType) ? Math.round((Date.parse(data.checkOut) - Date.parse(data.checkIn)) / 86400000) : 1;
  const base = Object.hasOwn(BASE, data.bookingType) ? BASE[data.bookingType] * nights : null;
  const addOn = hasMixed ? h * 70 + c * 90 : hasBreakfast ? BREAKFAST[data.breakfast] * qty : 0;
  const addOnText = hasMixed
    ? [h ? `${h}x Healthy Breakfast (R${h * 70})` : '', c ? `${c}x Classic Breakfast (R${c * 90})` : ''].filter(Boolean).join(', ')
    : hasBreakfast ? `${qty}x ${data.breakfast} (R${BREAKFAST[data.breakfast]} each, R${addOn})` : 'None';
  const lines = [
    `Name: ${data.name}`,
    `Booking Type: ${TYPES[data.bookingType]}`,
    `Arrival: ${data.checkIn}`,
    `Departure: ${data.checkOut || 'Same day'}`,
    `Guests: ${data.guests === '4' ? '4+' : data.guests}`,
    ...(data.room ? [`Preferred room: ${data.room.replace('room-', 'Room ')}`] : []),
    ...(data.phone ? [`WhatsApp: ${data.phone}`] : []),
    `Add-ons: ${addOnText}`,
    `Estimated total: ${base === null ? 'Owner to confirm' : `R${base + addOn}`}`,
    ...(data.notes ? [`Notes: ${data.notes.slice(0, 300)}`] : []),
  ];
  return { summary: lines.join('\n'), errors };
}
