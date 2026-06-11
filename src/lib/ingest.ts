import { prisma } from './db';
import { normalizeGenres } from './genres';
import { today } from './site';
import { serializeArtist } from './serialize';
import { CONNECTORS, enrichmentConnectors } from '../connectors/registry';
import type { Connector } from '../connectors/base';
import type { FieldSource } from './types';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export interface IngestArtistInput {
  name: string;
  realName?: string;
  country?: string;
  city?: string;
  currentCity?: string;
  currentCountry?: string;
  region?: string;
  scene?: string;
  genres?: string[];
  subgenres?: string[];
  flags?: Partial<{ isEmerging: boolean; isFemale: boolean; isLabelOwner: boolean; isLegend: boolean; blackLineage: boolean }>;
  sourceName: string;
  sourceUrl?: string;
  confidence?: number;
}

export interface IngestResult {
  slug: string;
  created: boolean;
  updated: boolean;
}

// Create an artist from a name + light metadata, with provenance. If the artist
// already exists, optionally enrich missing scalar fields (never overwrites).
export async function ingestArtist(input: IngestArtistInput): Promise<IngestResult> {
  const slug = slugify(input.name);
  if (!slug) return { slug: '', created: false, updated: false };
  const conf = input.confidence ?? 45;
  const genres = normalizeGenres(input.genres);
  const existing = await prisma.artist.findUnique({ where: { slug } });

  const fieldSources: Record<string, FieldSource> = {};
  const mkfs = (value: string): FieldSource => ({
    value,
    source_name: input.sourceName,
    source_url: input.sourceUrl,
    last_verified_date: today(),
    confidence_score: conf,
  });
  if (input.country) fieldSources.origin_country = mkfs(input.country);
  if (genres.length) fieldSources.genres = mkfs(genres.join(', '));

  if (existing) {
    // Light enrichment only — fill blanks, never clobber.
    const data: any = {};
    if (input.country && !existing.originCountry) data.originCountry = input.country;
    if (input.city && !existing.originCity) data.originCity = input.city;
    if (input.currentCity && !existing.currentCity) data.currentCity = input.currentCity;
    if (input.currentCountry && !existing.currentCountry) data.currentCountry = input.currentCountry;
    if (input.region && !existing.region) data.region = input.region;
    if (input.scene && !existing.primaryScene) data.primaryScene = input.scene;
    if (genres.length && !existing.genresCsv) data.genresCsv = genres.join(',').toLowerCase();
    if (Object.keys(data).length === 0) return { slug, created: false, updated: false };
    await prisma.artist.update({ where: { slug }, data });
    await prisma.changeLog.create({
      data: { entityType: 'artist', entityId: existing.id, entitySlug: slug, changeType: 'update', source: input.sourceName, newValue: 'enriched from ' + input.sourceName },
    });
    return { slug, created: false, updated: true };
  }

  const profile = {
    artist_name: input.name,
    real_name: input.realName ?? null,
    origin_country: input.country ?? null,
    origin_city: input.city ?? null,
    primary_scene: input.scene ?? null,
    genres,
    specific_house_subgenres: normalizeGenres(input.subgenres),
    bio_short: null,
    source_urls: input.sourceUrl ? [input.sourceUrl] : [],
    field_sources: fieldSources,
    confidence_score: conf,
    last_verified_date: today(),
    notes: `Added via ${input.sourceName}. Awaiting enrichment.`,
  };

  await prisma.artist.create({
    data: {
      slug,
      artistName: input.name,
      realName: input.realName ?? null,
      originCountry: input.country ?? null,
      originCity: input.city ?? null,
      currentCity: input.currentCity ?? null,
      currentCountry: input.currentCountry ?? null,
      region: input.region ?? null,
      primaryScene: input.scene ?? null,
      genresCsv: genres.join(',').toLowerCase(),
      subgenresCsv: normalizeGenres(input.subgenres).join(',').toLowerCase(),
      isEmerging: input.flags?.isEmerging ?? false,
      isFemale: input.flags?.isFemale ?? false,
      isLabelOwner: input.flags?.isLabelOwner ?? false,
      isLegend: input.flags?.isLegend ?? false,
      blackLineage: input.flags?.blackLineage ?? false,
      confidenceScore: conf,
      lastVerifiedDate: today(),
      profile: JSON.stringify(profile),
    },
  });
  await prisma.changeLog.create({
    data: { entityType: 'artist', entitySlug: slug, changeType: 'create', source: input.sourceName, newValue: input.name },
  });
  return { slug, created: true, updated: false };
}

// Best-effort search URL for a source, used as provenance when we add an artist
// "one website at a time" before a connector enriches it.
export function searchUrlFor(source: string, query: string): string {
  const q = encodeURIComponent(query);
  const map: Record<string, string> = {
    Discogs: `https://www.discogs.com/search/?q=${q}&type=artist`,
    MusicBrainz: `https://musicbrainz.org/search?query=${q}&type=artist`,
    Beatport: `https://www.beatport.com/search?q=${q}`,
    Traxsource: `https://www.traxsource.com/search?term=${q}`,
    Spotify: `https://open.spotify.com/search/${q}`,
    'Apple Music': `https://music.apple.com/us/search?term=${q}`,
    YouTube: `https://www.youtube.com/results?search_query=${q}`,
    SoundCloud: `https://soundcloud.com/search?q=${q}`,
    Bandcamp: `https://bandcamp.com/search?q=${q}`,
    'Resident Advisor': `https://ra.co/search?searchTerm=${q}`,
    Songkick: `https://www.songkick.com/search?query=${q}`,
    Bandsintown: `https://www.bandsintown.com/?searched_query=${q}`,
    Wikipedia: `https://en.wikipedia.org/w/index.php?search=${q}`,
    'Last.fm': `https://www.last.fm/search?q=${q}`,
    'Google Search': `https://www.google.com/search?q=${q}+house+music+DJ`,
  };
  return map[source] ?? `https://www.google.com/search?q=${q}`;
}

export interface SourceIngestResult {
  slug: string;
  created: boolean;
  enriched: boolean;
  fieldsApplied: number;
  note: string;
}

// Add/enrich one artist from one specific source — the engine behind the
// "search a site → database grows" tool. Uses that source's connector when
// one is configured + compliant; otherwise records a provenance stub.
const LINK_FIELDS = new Set(['website', 'instagram', 'tiktok', 'spotify', 'apple_music', 'soundcloud', 'beatport', 'traxsource', 'discogs', 'musicbrainz', 'youtube', 'bandcamp', 'resident_advisor', 'wikidata', 'wikipedia']);

// Sources that have no compliant automated access (no API + anti-bot / ToS).
// We store a provenance link to them but never scrape them.
const NO_SCRAPE = new Set(['1001tracklists', 'beatport', 'traxsource', 'resident advisor', 'instagram', 'tiktok', 'dice', 'boiler room', 'mixmag', 'dj mag', 'shazam charts', 'soundcloud', 'bandcamp', 'apple music', 'youtube music', 'linktree', 'beacons', 'hypeddit', 'toneden', 'facebook event pages', 'allmusic']);

export async function ingestFromSource(source: string, query: string, confidence = 42): Promise<SourceIngestResult> {
  const url = searchUrlFor(source, query);
  const stub = await ingestArtist({ name: query, sourceName: source, sourceUrl: url, confidence });
  const slug = stub.slug;
  if (!slug) return { slug: '', created: false, enriched: false, fieldsApplied: 0, note: 'invalid name' };

  // Whichever source the user picks, store its link, then enrich via the
  // COMPLIANT chain (MusicBrainz, Wikidata, Wikipedia + any keyed API sources).
  const chain: Connector[] = [];
  const matched = CONNECTORS.find((c) => c.name.toLowerCase() === source.toLowerCase());
  if (matched?.enrich && matched.isConfigured() && matched.compliant()) chain.push(matched);
  for (const c of enrichmentConnectors()) if (!chain.includes(c)) chain.push(c);

  const row = await prisma.artist.findUnique({ where: { slug } });
  if (!row) return { slug, created: stub.created, enriched: false, fieldsApplied: 0, note: 'artist vanished' };
  const profile: any = serializeArtist(row);
  let applied = 0;
  const used: string[] = [];

  for (const connector of chain) {
    let result;
    try {
      result = await connector.enrich!({ name: query });
    } catch {
      continue;
    }
    if (!result) continue;
    let any = false;
    for (const f of result.fields) {
      const existing = profile.field_sources[f.field];
      if (existing && (existing.confidence_score ?? 0) >= f.confidence) continue;
      profile.field_sources[f.field] = { value: f.value, source_name: f.sourceName, source_url: f.sourceUrl, last_verified_date: today(), confidence_score: f.confidence };
      if (f.sourceUrl && !profile.source_urls.includes(f.sourceUrl)) profile.source_urls.push(f.sourceUrl);
      if (f.field === 'genres' && typeof f.value === 'string') profile.genres = normalizeGenres([...(profile.genres ?? []), ...f.value.split(/,\s*/)]);
      else if (LINK_FIELDS.has(f.field) && typeof f.value === 'string') profile[f.field] = f.value;
      else if ((f.field === 'bio_short' || f.field === 'bio_long') && typeof f.value === 'string') { if (!profile[f.field]) profile[f.field] = f.value; }
      else if (f.field === 'gender' && typeof f.value === 'string') { profile.gender = f.value; }
      else if (f.field === 'origin_country' || f.field === 'origin_city') { if (!profile[f.field]) profile[f.field] = f.value; }
      else if (f.field.endsWith('_followers')) profile[f.field] = typeof f.value === 'number' ? f.value : Number(f.value) || null;
      applied++;
      any = true;
    }
    for (const [k, v] of Object.entries(result.links ?? {})) if (LINK_FIELDS.has(k) && !profile[k]) { profile[k] = v; applied++; any = true; }
    if (any) used.push(connector.name);
  }

  await prisma.artist.update({
    where: { slug },
    data: {
      profile: JSON.stringify(profile),
      originCountry: profile.origin_country ?? row.originCountry,
      originCity: profile.origin_city ?? row.originCity,
      genresCsv: (profile.genres ?? []).join(',').toLowerCase() || row.genresCsv,
      spotifyFollowers: profile.spotify_followers ?? row.spotifyFollowers,
      gender: profile.gender ?? row.gender,
      isFemale: profile.gender ? profile.gender === 'female' : row.isFemale,
      confidenceScore: Math.max(row.confidenceScore, confidence),
      lastVerifiedDate: today(),
    },
  });
  await prisma.changeLog.create({ data: { entityType: 'artist', entityId: row.id, entitySlug: slug, changeType: 'refresh', source, newValue: `Enriched via ${used.join(', ') || 'no source'} (${applied} fields)` } });

  const scrapeNote = NO_SCRAPE.has(source.toLowerCase())
    ? ` Note: ${source} has no compliant API/anti-bot — its link is stored, but data was pulled from ${used.join(', ') || 'compliant sources'}.`
    : '';
  return {
    slug,
    created: stub.created,
    enriched: applied > 0,
    fieldsApplied: applied,
    note: applied > 0 ? `Added & enriched ${query} via ${used.join(', ')} (${applied} fields).${scrapeNote}` : `Added ${query}. No compliant source had a match to enrich from.${scrapeNote}`,
  };
}

export interface CustomArtistInput {
  name: string;
  realName?: string;
  country?: string;
  city?: string;
  currentCity?: string;
  currentCountry?: string;
  region?: string;
  scene?: string;
  genres?: string[];
  subgenres?: string[];
  bioShort?: string;
  gender?: 'male' | 'female' | 'non-binary';
  recordLabelOwned?: string;
  labelsAffiliated?: string[];
  links?: Partial<Record<'instagram' | 'spotify' | 'soundcloud' | 'bandcamp' | 'beatport' | 'traxsource' | 'apple_music' | 'youtube' | 'website' | 'tiktok' | 'discogs', string>>;
  flags?: Partial<{ isLabelOwner: boolean; isEmerging: boolean; blackLineage: boolean }>;
  confidence?: number;
  sourceName?: string;
}

// Create OR update an artist with first-party / curated details (full control of
// fields + links). Used for adding artists manually with exact data.
export async function upsertCustomArtist(input: CustomArtistInput): Promise<{ slug: string; created: boolean }> {
  const slug = slugify(input.name);
  if (!slug) throw new Error('invalid name');
  const conf = input.confidence ?? 75;
  const genres = normalizeGenres(input.genres);
  const subgenres = normalizeGenres(input.subgenres);
  const existing = await prisma.artist.findUnique({ where: { slug } });
  const profile: any = existing ? serializeArtist(existing) : { artist_name: input.name, field_sources: {}, source_urls: [] };
  const src = input.sourceName || 'Provided / first-party (World Famous House Crew)';

  profile.artist_name = input.name;
  if (input.realName) profile.real_name = input.realName;
  if (input.city) profile.origin_city = input.city;
  if (input.country) profile.origin_country = input.country;
  if (input.currentCity) profile.current_city = input.currentCity;
  if (input.currentCountry) profile.current_country = input.currentCountry;
  if (input.region) profile.scene_region = input.region;
  if (input.scene) profile.primary_scene = input.scene;
  if (genres.length) profile.genres = genres;
  if (subgenres.length) profile.specific_house_subgenres = subgenres;
  if (input.bioShort) profile.bio_short = input.bioShort;
  if (input.gender) profile.gender = input.gender;
  if (input.recordLabelOwned) profile.record_label_owned = input.recordLabelOwned;
  if (input.labelsAffiliated?.length) profile.labels_affiliated = input.labelsAffiliated;
  for (const [k, v] of Object.entries(input.links || {})) {
    if (!v) continue;
    profile[k] = v;
    profile.field_sources[k] = { value: v, source_name: src, last_verified_date: today(), confidence_score: 90 };
    if (!profile.source_urls.includes(v)) profile.source_urls.push(v);
  }
  profile.confidence_score = Math.max(profile.confidence_score ?? 0, conf);
  profile.last_verified_date = today();

  const data = {
    artistName: input.name,
    realName: input.realName ?? existing?.realName ?? null,
    originCity: input.city ?? existing?.originCity ?? null,
    originCountry: input.country ?? existing?.originCountry ?? null,
    currentCity: input.currentCity ?? existing?.currentCity ?? null,
    currentCountry: input.currentCountry ?? existing?.currentCountry ?? null,
    region: input.region ?? existing?.region ?? null,
    primaryScene: input.scene ?? existing?.primaryScene ?? null,
    genresCsv: genres.length ? genres.join(',').toLowerCase() : existing?.genresCsv ?? '',
    subgenresCsv: subgenres.length ? subgenres.join(',').toLowerCase() : existing?.subgenresCsv ?? '',
    gender: input.gender ?? existing?.gender ?? null,
    isFemale: input.gender ? input.gender === 'female' : existing?.isFemale ?? false,
    isLabelOwner: input.flags?.isLabelOwner ?? existing?.isLabelOwner ?? false,
    isEmerging: input.flags?.isEmerging ?? existing?.isEmerging ?? false,
    blackLineage: input.flags?.blackLineage ?? existing?.blackLineage ?? false,
    confidenceScore: profile.confidence_score,
    lastVerifiedDate: today(),
    profile: JSON.stringify(profile),
  };

  if (existing) await prisma.artist.update({ where: { slug }, data });
  else await prisma.artist.create({ data: { slug, ...data } });
  await prisma.changeLog.create({ data: { entityType: 'artist', entitySlug: slug, changeType: existing ? 'update' : 'create', source: src, newValue: `Custom ${existing ? 'update' : 'add'}: ${input.name}` } });
  return { slug, created: !existing };
}

export interface LAArtistInput {
  name: string;
  region: string; // "Greater LA" | "San Diego" | "Inland Empire"
  city?: string;
  genres?: string[];
  instagram?: string;
  soundcloud?: string;
  note?: string;
  source?: string;
}

// Normalize a possibly-bare handle ("mikeylion", "@mikeylion") into a full URL.
function socialUrl(platform: 'instagram' | 'soundcloud', v?: string): string | undefined {
  if (!v) return undefined;
  const s = v.trim().replace(/^@/, '');
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  return platform === 'instagram' ? `https://instagram.com/${s}` : `https://soundcloud.com/${s}`;
}

// Add OR tag a local-scene artist. Merge-safe: ALWAYS sets the region tag and
// fills the current city, never clobbering an existing artist's genres/bio/links.
// New artists are created with full house metadata. This is the primitive used by
// the LA roster seed, the /api/add-artist endpoint, and the weekly LA cron.
export async function upsertLAArtist(input: LAArtistInput): Promise<{ slug: string; created: boolean; tagged: boolean }> {
  const slug = slugify(input.name);
  if (!slug) return { slug: '', created: false, tagged: false };
  const existing = await prisma.artist.findUnique({ where: { slug } });
  const ig = socialUrl('instagram', input.instagram);
  const sc = socialUrl('soundcloud', input.soundcloud);
  const src = input.source ? `LA scene research (${input.source})` : 'LA scene research (World Famous House Crew)';
  const genres = normalizeGenres(input.genres);

  if (existing) {
    const profile: any = serializeArtist(existing);
    profile.scene_region = input.region;
    if (input.city && !profile.current_city) profile.current_city = input.city;
    profile.current_country = profile.current_country || 'United States';
    for (const [k, v] of [['instagram', ig], ['soundcloud', sc]] as const) {
      if (v && !profile[k]) {
        profile[k] = v;
        profile.field_sources = profile.field_sources || {};
        profile.field_sources[k] = { value: v, source_name: src, last_verified_date: today(), confidence_score: 80 };
        profile.source_urls = profile.source_urls || [];
        if (!profile.source_urls.includes(v)) profile.source_urls.push(v);
      }
    }
    const data: any = { region: input.region, profile: JSON.stringify(profile) };
    if (!existing.currentCity && input.city) data.currentCity = input.city;
    if (!existing.currentCountry) data.currentCountry = 'United States';
    if (ig || sc) data.hasContact = true;
    await prisma.artist.update({ where: { slug }, data });
    return { slug, created: false, tagged: true };
  }

  await upsertCustomArtist({
    name: input.name,
    city: input.city,
    country: 'United States',
    currentCity: input.city,
    currentCountry: 'United States',
    region: input.region,
    scene: 'House',
    genres: input.genres && input.genres.length ? input.genres : ['House'],
    bioShort: input.note,
    links: { ...(ig ? { instagram: ig } : {}), ...(sc ? { soundcloud: sc } : {}) },
    confidence: 55,
    sourceName: src,
  });
  if (ig || sc) await prisma.artist.update({ where: { slug }, data: { hasContact: true } });
  return { slug, created: true, tagged: true };
}

// Grow the database from the curated roster up to a target artist count.
export async function importRoster(target: number): Promise<{ added: number; total: number; rosterRemaining: number; exhausted: boolean }> {
  const { ROSTER } = await import('../data/roster');
  let total = await prisma.artist.count();
  let added = 0;
  let remaining = 0;
  for (const entry of ROSTER) {
    if (total >= target) {
      remaining++;
      continue;
    }
    const res = await ingestArtist({
      name: entry.name,
      country: entry.country,
      scene: entry.scene,
      genres: entry.genres,
      flags: entry.flags,
      sourceName: 'Curated editorial seed (World Famous House Crew)',
      sourceUrl: searchUrlFor('Google Search', entry.name),
      confidence: 45,
    });
    if (res.created) {
      added++;
      total++;
    }
  }
  return { added, total, rosterRemaining: remaining, exhausted: remaining === 0 && total < target };
}

// Import the curated Afro House roster (all entries not already in the DB).
export async function importAfroRoster(): Promise<{ added: number; total: number }> {
  const { AFRO_ROSTER } = await import('../data/afro-house-roster');
  let added = 0;
  for (const entry of AFRO_ROSTER) {
    const res = await ingestArtist({
      name: entry.name,
      country: entry.country,
      scene: entry.scene,
      genres: entry.genres,
      flags: entry.flags,
      sourceName: 'Curated Afro House roster (World Famous House Crew)',
      sourceUrl: searchUrlFor('Google Search', entry.name),
      confidence: 45,
    });
    if (res.created) added++;
  }
  return { added, total: await prisma.artist.count() };
}
