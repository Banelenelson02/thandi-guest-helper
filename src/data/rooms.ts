import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomGarden from "@/assets/room-garden.jpg";

export type BookingType = "day" | "night" | "short" | "full";

export const BOOKING_TYPES: { id: BookingType; label: string; hours: string; price: number }[] = [
  { id: "day", label: "Day Booking", hours: "10:00 AM – 4:00 PM", price: 350 },
  { id: "night", label: "Night Booking", hours: "5:00 PM – 9:00 AM", price: 450 },
  { id: "short", label: "Short Stay", hours: "3 Hours · 9:00 AM – 5:00 PM", price: 200 },
  { id: "full", label: "Full Day & Night", hours: "24 Hours", price: 625 },
];

export const POOL_FEES = [
  { label: "Adults", price: 75 },
  { label: "Children", price: 50 },
  { label: "Cooler Box Fee", price: 50 },
];

export const AMENITIES = [
  "Smart TV",
  "Free WiFi",
  "Bar Fridge",
  "Air Conditioner",
  "Secure Parking",
  "Pool Access (except short stays)",
];

export const HOUSE_RULES = [
  "Check-in time: 10:00 AM",
  "Check-out time: 9:00 AM",
  "No smoking inside the rooms",
  "No loud music or noise after 10:00 PM",
  "Visitors allowed only by prior arrangement",
  "Treat our property with respect — right of admission reserved",
  "Bookings are only confirmed after payment is received",
];

export type Room = {
  id: string;
  name: string;
  ensuite: boolean;
  image: string;
  description: string;
};

export const ROOMS: Room[] = [
  {
    id: "room-1",
    name: "Room 1",
    ensuite: true,
    image: roomDeluxe,
    description: "Double bedroom with private toilet & shower, sleeps up to 2 guests.",
  },
  {
    id: "room-2",
    name: "Room 2",
    ensuite: true,
    image: roomExecutive,
    description: "Double bedroom with private toilet & shower, sleeps up to 2 guests.",
  },
  {
    id: "room-3",
    name: "Room 3",
    ensuite: false,
    image: roomGarden,
    description: "Double bedroom sharing a toilet with Room 5, sleeps up to 2 guests.",
  },
  {
    id: "room-4",
    name: "Room 4",
    ensuite: true,
    image: roomDeluxe,
    description: "Double bedroom with private toilet & shower, sleeps up to 2 guests.",
  },
  {
    id: "room-5",
    name: "Room 5",
    ensuite: false,
    image: roomExecutive,
    description: "Double bedroom sharing a toilet with Room 3, sleeps up to 2 guests.",
  },
];
