type Location = {
  name: string;
  coords: [number, number];
  trip: string;
  image: string;
};

export const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const locations: Location[] = [
  {
    name: "Tokyo",
    coords: [139.6917, 35.6895],
    trip: "3-Day Tokyo Trip",
    image: "/images/tokyo.jpg",
  },
  {
    name: "Paris",
    coords: [2.3522, 48.8566],
    trip: "Romantic Paris Escape",
    image: "/images/paris.jpg",
  },
  {
    name: "Bali",
    coords: [115.1889, -8.4095],
    trip: "Surf & Yoga in Bali",
    image: "/images/bali.jpg",
  },
  {
    name: "New York City",
    coords: [-74.006, 40.7128],
    trip: "Weekend in NYC",
    image: "/images/nyc.jpg",
  },
  {
    name: "Dubai",
    coords: [55.2708, 25.2048],
    trip: "Luxury and fun",
    image: "/images/dubai.jpg",
  },
  {
    name: "Giza",
    coords: [31.1313, 29.9765],
    trip: "Pyramid Adventure",
    image: "/images/giza.jpg",
  },
  {
    name: "Mexico City",
    coords: [-99.1332, 19.4326],
    trip: "Tacos & temples",
    image: "/images/mexicocity.jpg",
  },
  {
    name: "Manaus",
    coords: [-60.0258, -3.119],
    trip: "Rainforest treks",
    image: "/images/manaus.jpg",
  },
  {
    name: "Maasai Mara",
    coords: [35.1436, -1.4931],
    trip: "Big safari adventure",
    image: "/images/maasaimara.jpg",
  },
  {
    name: "Broome",
    coords: [122.2359, -17.9614],
    trip: "Cliffs & beach rides",
    image: "/images/broome.jpg",
  },
];
