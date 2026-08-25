// Room photos
import room1_1 from "@/assets/rooms/room-1/room-1-1.jpg";
import room1_2 from "@/assets/rooms/room-1/room-1-2.jpg";
import room1_3 from "@/assets/rooms/room-1/room-1-3.jpg";
import room1_4 from "@/assets/rooms/room-1/room-1-4.jpg";
import room1_5 from "@/assets/rooms/room-1/room-1-5.jpg";
import room1_6 from "@/assets/rooms/room-1/room-1-6.jpg";

import room2_1 from "@/assets/rooms/room-2/room-2-1.jpg";
import room2_2 from "@/assets/rooms/room-2/room-2-2.jpg";
import room2_3 from "@/assets/rooms/room-2/room-2-3.jpg";
import room2_4 from "@/assets/rooms/room-2/room-2-4.jpg";
import room2_5 from "@/assets/rooms/room-2/room-2-5.jpg";

import room3_1 from "@/assets/rooms/room-3/room-3-1.jpg";
import room3_2 from "@/assets/rooms/room-3/room-3-2.jpg";
import room3_3 from "@/assets/rooms/room-3/room-3-3.jpg";

import room4_1 from "@/assets/rooms/room-4/room-4-1.jpg";
import room4_2 from "@/assets/rooms/room-4/room-4-2.jpg";
import room4_3 from "@/assets/rooms/room-4/room-4-3.jpg";
import room4_4 from "@/assets/rooms/room-4/room-4-4.jpg";
import room4_5 from "@/assets/rooms/room-4/room-4-5.jpg";

import room5_1 from "@/assets/rooms/room-5/room-5-1.jpg";
import room5_2 from "@/assets/rooms/room-5/room-5-2.jpg";
import room5_3 from "@/assets/rooms/room-5/room-5-3.jpg";

// Bathroom (shared, Room 3 & 5)
import bathroom35_1 from "@/assets/rooms/bathroom-3-5/bathroom-3-5-1.jpg";
import bathroom35_2 from "@/assets/rooms/bathroom-3-5/bathroom-3-5-2.jpg";

// Inside hall
import hall1 from "@/assets/rooms/inside-hall/inside-hall-1.jpg";
import hall2 from "@/assets/rooms/inside-hall/inside-hall-2.jpg";
import hall3 from "@/assets/rooms/inside-hall/inside-hall-3.jpg";

// Outside / grounds / rondavel
import outside1 from "@/assets/rooms/outside/outside-1.jpg";
import outside2 from "@/assets/rooms/outside/outside-2.jpg";
import outside3 from "@/assets/rooms/outside/outside-3.jpg";
import outside4 from "@/assets/rooms/outside/outside-4.jpg";
import outside5 from "@/assets/rooms/outside/outside-5.jpg";

// Pool
import pool1 from "@/assets/rooms/pool/pool-1.jpg";
import pool2 from "@/assets/rooms/pool/pool-2.jpg";

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

export type BreakfastOption = {
  name: string;
  price: number;
  items: string[];
};

// NOTE: prices updated per client feedback — Healthy R65→R70,
// Classic R80→R90.
export const BREAKFAST_OPTIONS: BreakfastOption[] = [
  {
    name: "Healthy Breakfast",
    price: 70,
    items: ["Muesli & yoghurt", "Served with fresh fruits"],
  },
  {
    name: "Classic Breakfast",
    price: 90,
    items: [
      "2 slices brown or white toast",
      "Eggs",
      "Bacon or cheese grillers",
      "Potato fries",
      "Beans & tomatoes",
    ],
  },
];

// Juice, Tea, Coffee and Cappuccino are included free with either
// breakfast option. Hot Chocolate carries a small surcharge.
export const BREAKFAST_DRINKS_INCLUDED = ["Juice", "Tea", "Coffee", "Cappuccino"];
export const BREAKFAST_DRINK_SURCHARGE = { name: "Hot Chocolate", extra: 11 };

// Kept for anywhere that just needs the full drink list as plain text
export const BREAKFAST_DRINKS = [...BREAKFAST_DRINKS_INCLUDED, "Hot Chocolate (+R11)"];

export const HOUSE_RULES = [
  "Check-in time: 10:00 AM",
  "Check-out time: 9:00 AM",
  "A 14% cancellation fee applies to all cancelled bookings",
  "No refunds once the guest has checked in",
  "Early departure or shortening of stay after check-in does not qualify for a refund",
  "Guests are responsible for any damages caused to property or equipment",
  "Smoking is only permitted in designated smoking areas",
  "No loud music or noise after 10:00 PM",
  "Visitors allowed only by prior arrangement",
  "Guests must respect other visitors and maintain a peaceful environment",
  "Bookings are only confirmed after payment is received",
];

export type Room = {
  id: string;
  name: string;
  ensuite: boolean;
  images: string[];
  description: string;
};

// NOTE: descriptions are intentionally understated to match the real
// photos — comfortable and clean, not "luxury resort" language.
export const ROOMS: Room[] = [
  {
    id: "room-1",
    name: "Room 1",
    ensuite: true,
    images: [room1_1, room1_2, room1_3, room1_4, room1_5, room1_6],
    description:
        "A comfortable double room with its own toilet and shower, a small lounge area, TV and bar fridge.",
  },
  {
    id: "room-2",
    name: "Room 2",
    ensuite: true,
    images: [room2_1, room2_2, room2_3, room2_4, room2_5],
    description:
        "A comfortable double room with its own toilet and shower, TV and bar fridge — everything you need for a relaxed stay.",
  },
  {
    id: "room-3",
    name: "Room 3",
    ensuite: false,
    images: [room3_1, room3_2, room3_3],
    description:
        "A comfortable double room that shares a toilet with Room 5, with TV and bar fridge included.",
  },
  {
    id: "room-4",
    name: "Room 4",
    ensuite: true,
    images: [room4_1, room4_2, room4_3, room4_4, room4_5],
    description:
        "A comfortable double room with its own toilet and shower, TV and bar fridge — clean and well kept.",
  },
  {
    id: "room-5",
    name: "Room 5",
    ensuite: false,
    images: [room5_1, room5_2, room5_3],
    description:
        "A comfortable double room that shares a toilet with Room 3, with TV and bar fridge included.",
  },
];

export const SHARED_BATHROOM_IMAGES = [bathroom35_1, bathroom35_2];
export const HALL_IMAGES = [hall1, hall2, hall3];
export const GROUNDS_IMAGES = [outside1, outside2, outside3, outside4, outside5];
export const POOL_IMAGES = [pool1, pool2];

// The property includes two thatched rondavels on the grounds —
// a distinctive local feature, shown here honestly as "on the grounds"
// rather than a separate bookable unit, until confirmed otherwise.
export const RONDAVEL_IMAGES = [outside2, outside3, outside5];