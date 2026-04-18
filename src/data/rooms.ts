import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomGarden from "@/assets/room-garden.jpg";

export type Room = {
  id: "deluxe" | "executive" | "garden";
  name: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
};

export const ROOMS: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    price: 850,
    image: roomDeluxe,
    description:
      "Sink into a plush queen-size bed surrounded by sleek grey interiors and warm gold accents. The perfect retreat after a long day — refined, restful and entirely yours.",
    highlights: [
      "Queen-size bed with premium linen",
      "Private en-suite bathroom",
      "Smart TV with DStv & high-speed WiFi",
      "Air conditioning & blackout curtains",
    ],
    amenities: ["En-suite", "Smart TV", "WiFi", "AC"],
  },
  {
    id: "executive",
    name: "Executive Suite",
    price: 1350,
    image: roomExecutive,
    description:
      "Our most prestigious space — a king-size bed, a generous sitting area, and exclusive spa access combine to create an experience of pure indulgence. This is where you come to truly unwind.",
    highlights: [
      "King-size bed with luxury bedding",
      "Private sitting lounge area",
      "Complimentary spa treatment included",
      "Smart TV, WiFi & premium minibar",
    ],
    amenities: ["King Bed", "Spa Access", "Smart TV", "Minibar"],
  },
  {
    id: "garden",
    name: "Garden Room",
    price: 750,
    image: roomGarden,
    description:
      "Wake up to the gentle sounds of nature from your private patio. The Garden Room blends the tranquility of the outdoors with modern comforts — a breath of fresh air in every sense.",
    highlights: [
      "Double bed with quality linen",
      "Private patio with garden views",
      "Smart TV with DStv & high-speed WiFi",
      "Air conditioning & en-suite shower",
    ],
    amenities: ["Garden View", "Smart TV", "WiFi", "Patio"],
  },
];
