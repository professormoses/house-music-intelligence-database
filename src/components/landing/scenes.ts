// Iconic house-music scenes around the globe. Coordinates drive the 3D globe,
// and each links into the directory filtered by city so visitors can travel the map.
export interface Scene {
  name: string;
  city: string; // value used for /?city=
  lat: number;
  lng: number;
  origin?: boolean;
  note: string;
}

export const SCENES: Scene[] = [
  { name: 'Chicago', city: 'Chicago', lat: 41.88, lng: -87.63, origin: true, note: 'Where house was born — The Warehouse, 1977' },
  { name: 'Detroit', city: 'Detroit', lat: 42.33, lng: -83.05, note: 'Deep, soulful & machine-soul house' },
  { name: 'New York', city: 'New York', lat: 40.71, lng: -74.01, note: 'Garage, soulful & Latin house' },
  { name: 'Los Angeles', city: 'Los Angeles', lat: 34.05, lng: -118.24, note: 'World Famous House Crew' },
  { name: 'Toronto', city: 'Toronto', lat: 43.65, lng: -79.38, note: 'Jackin house — Demuir' },
  { name: 'London', city: 'London', lat: 51.51, lng: -0.13, note: 'Acid, tech & funky house' },
  { name: 'Manchester', city: 'Manchester', lat: 53.48, lng: -2.24, note: 'Acid house & the Haçienda' },
  { name: 'Paris', city: 'Paris', lat: 48.86, lng: 2.35, note: 'French touch / filter house' },
  { name: 'Berlin', city: 'Berlin', lat: 52.52, lng: 13.4, note: 'Minimal & club culture' },
  { name: 'Cologne', city: 'Cologne', lat: 50.94, lng: 6.96, note: 'Microhouse — Kompakt' },
  { name: 'Ibiza', city: 'Ibiza', lat: 38.91, lng: 1.43, note: 'The island that globalized house' },
  { name: 'Amsterdam', city: 'Amsterdam', lat: 52.37, lng: 4.9, note: 'Future & dutch house' },
  { name: 'Johannesburg', city: 'Johannesburg', lat: -26.2, lng: 28.05, note: 'Afro house & amapiano' },
  { name: 'Pretoria', city: 'Pretoria', lat: -25.75, lng: 28.19, note: 'Amapiano ground zero' },
  { name: 'Lagos', city: 'Lagos', lat: 6.52, lng: 3.38, note: 'Afro house & afrobeats crossover' },
  { name: 'São Paulo', city: 'São Paulo', lat: -23.55, lng: -46.63, note: 'Brazilian house & funk' },
  { name: 'Tokyo', city: 'Tokyo', lat: 35.68, lng: 139.69, note: 'Deep & soulful house devotion' },
];

// Arcs drawn on the globe — the lineage spreading from Chicago and a few cross-links.
export const ARCS: [string, string][] = [
  ['Chicago', 'Detroit'],
  ['Chicago', 'New York'],
  ['Chicago', 'London'],
  ['Chicago', 'Los Angeles'],
  ['Chicago', 'Toronto'],
  ['New York', 'Ibiza'],
  ['London', 'Berlin'],
  ['London', 'Manchester'],
  ['Paris', 'London'],
  ['Berlin', 'Cologne'],
  ['Ibiza', 'Johannesburg'],
  ['Johannesburg', 'Lagos'],
  ['Johannesburg', 'Pretoria'],
  ['Amsterdam', 'Ibiza'],
  ['New York', 'São Paulo'],
  ['Detroit', 'Tokyo'],
];
