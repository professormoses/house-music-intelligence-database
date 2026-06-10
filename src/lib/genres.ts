// Controlled house-music genre taxonomy. All free-text genre strings are
// normalized against this list so filtering and faceting stay consistent.

export const HOUSE_GENRES = [
  'House',
  'Deep House',
  'Soulful House',
  'Afro House',
  'Afro Tech',
  'Tech House',
  'Chicago House',
  'Detroit House',
  'NY House',
  'Garage House',
  'UK Garage',
  'Jackin House',
  'Disco House',
  'Funky House',
  'Classic House',
  'Progressive House',
  'Melodic House',
  'Organic House',
  'Minimal House',
  'Acid House',
  'Tribal House',
  'Latin House',
  'Gospel House',
  'Vocal House',
  'French House',
  'Bass House',
  'Future House',
  'Ghetto House',
  'Amapiano',
  'Underground House',
  'Lo-Fi House',
] as const;

export type HouseGenre = (typeof HOUSE_GENRES)[number];

const ALIASES: Record<string, HouseGenre> = {
  'afrohouse': 'Afro House',
  'afro-house': 'Afro House',
  'afro tech': 'Afro Tech',
  'afrotech': 'Afro Tech',
  'deephouse': 'Deep House',
  'soulful': 'Soulful House',
  'soul house': 'Soulful House',
  'techhouse': 'Tech House',
  'jackin': 'Jackin House',
  "jackin' house": 'Jackin House',
  'jacking house': 'Jackin House',
  'melodic': 'Melodic House',
  'melodic house & techno': 'Melodic House',
  'organic': 'Organic House',
  'nu disco': 'Disco House',
  'nu-disco': 'Disco House',
  'lofi house': 'Lo-Fi House',
  'lo fi house': 'Lo-Fi House',
  'new york house': 'NY House',
  'ny house': 'NY House',
  'microhouse': 'Minimal House',
  'micro house': 'Minimal House',
  'amapiano': 'Amapiano',
  'french touch': 'French House',
  'filter house': 'French House',
  'juke': 'Ghetto House',
  'footwork': 'Ghetto House',
  'booty house': 'Ghetto House',
};

export function normalizeGenre(input: string): HouseGenre | null {
  const raw = input.trim();
  if (!raw) return null;
  const exact = HOUSE_GENRES.find((g) => g.toLowerCase() === raw.toLowerCase());
  if (exact) return exact;
  const alias = ALIASES[raw.toLowerCase()];
  if (alias) return alias;
  // last resort: substring against canonical list
  const sub = HOUSE_GENRES.find(
    (g) => raw.toLowerCase().includes(g.toLowerCase()) && g !== 'House',
  );
  return sub ?? (raw.toLowerCase().includes('house') ? 'House' : null);
}

export function normalizeGenres(list: string[] | undefined): HouseGenre[] {
  if (!list) return [];
  const out = new Set<HouseGenre>();
  for (const g of list) {
    const n = normalizeGenre(g);
    if (n) out.add(n);
  }
  return [...out];
}

export function genreSlug(g: string): string {
  return g.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Maps a canonical genre to its history / encyclopedia topic page (if one exists).
export const GENRE_HISTORY_TOPIC: Partial<Record<HouseGenre, string>> = {
  'Deep House': 'deep-house',
  'Soulful House': 'soulful-house',
  'Afro House': 'history-of-afro-house',
  'Afro Tech': 'afro-tech',
  'Tech House': 'tech-house',
  'Chicago House': 'chicago-house',
  'Detroit House': 'detroit-house',
  'Garage House': 'garage-house',
  'Jackin House': 'jackin-house',
  'Disco House': 'disco-house',
  'Funky House': 'funky-house',
  'Progressive House': 'progressive-house',
  'Minimal House': 'minimal-house',
  'Acid House': 'acid-house',
  'Tribal House': 'tribal-house',
  'Latin House': 'latin-house',
  'Gospel House': 'gospel-house',
  'French House': 'french-house',
  'Bass House': 'bass-house',
  'Future House': 'future-house',
  'Ghetto House': 'ghetto-house',
  'Amapiano': 'amapiano',
};

export function genreHistoryTopic(g: string): string | null {
  return (GENRE_HISTORY_TOPIC as Record<string, string>)[g] ?? null;
}
