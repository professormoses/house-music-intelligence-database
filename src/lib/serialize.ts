import type { Artist } from '@prisma/client';
import type { ArtistProfile } from './types';
import { computeScores } from './scoring';
import { computePopularity } from './popularity';
import { suggestedCitation } from './citation';
import { abs } from './site';

const EMPTY: Partial<ArtistProfile> = {
  aliases: [],
  genres: [],
  specific_house_subgenres: [],
  labels_affiliated: [],
  top_tracks: [],
  top_releases: [],
  collaborators: [],
  labels_released_on: [],
  recent_shows: [],
  upcoming_shows: [],
  venues_played: [],
  festivals_played: [],
  countries_played: [],
  cities_played: [],
  dj_support: [],
  playlist_support: [],
  chart_positions: [],
  press_mentions: [],
  interview_links: [],
  boiler_room_links: [],
  mix_links: [],
  live_set_links: [],
  source_urls: [],
  field_sources: {},
};

// Build the full public artist contract from a DB row. Scores and the
// suggested citation are computed fresh on every read so they never drift.
export function serializeArtist(row: Artist): ArtistProfile {
  let stored: Partial<ArtistProfile> = {};
  try {
    stored = JSON.parse(row.profile || '{}');
  } catch {
    stored = {};
  }

  const merged: ArtistProfile = {
    ...(EMPTY as ArtistProfile),
    ...stored,
    artist_id: row.id,
    slug: row.slug,
    artist_name: row.artistName,
    real_name: row.realName ?? stored.real_name ?? null,
    origin_city: row.originCity ?? stored.origin_city ?? null,
    origin_country: row.originCountry ?? stored.origin_country ?? null,
    current_city: row.currentCity ?? stored.current_city ?? null,
    current_country: row.currentCountry ?? stored.current_country ?? null,
    primary_scene: row.primaryScene ?? stored.primary_scene ?? null,
    monthly_listeners: row.monthlyListeners ?? stored.monthly_listeners ?? null,
    spotify_followers: row.spotifyFollowers ?? stored.spotify_followers ?? null,
    instagram_followers: row.instagramFollowers ?? stored.instagram_followers ?? null,
    confidence_score: row.confidenceScore ?? stored.confidence_score ?? 0,
    last_verified_date: row.lastVerifiedDate ?? stored.last_verified_date ?? null,
  };

  // Guard against redundant city == country (e.g. MusicBrainz country-level area).
  if (merged.origin_city && merged.origin_city === merged.origin_country) merged.origin_city = null;
  if (merged.current_city && merged.current_city === merged.current_country) merged.current_city = null;

  merged.scores = computeScores(merged);
  merged.popularity_score = computePopularity(merged).score;
  merged.suggested_citation = suggestedCitation({
    title: `${merged.artist_name} — House Music Artist Profile`,
    path: `/artist/${merged.slug}`,
    lastVerified: merged.last_verified_date,
  });

  return merged;
}

export interface ArtistSummary {
  slug: string;
  artist_name: string;
  origin_city?: string | null;
  origin_country?: string | null;
  primary_scene?: string | null;
  genres: string[];
  monthly_listeners?: number | null;
  confidence_score: number;
  house_crew_priority_score: number;
  popularity_score: number;
  url: string;
  markdown_url: string;
  json_url: string;
}

export function toSummary(p: ArtistProfile): ArtistSummary {
  return {
    slug: p.slug,
    artist_name: p.artist_name,
    origin_city: p.origin_city,
    origin_country: p.origin_country,
    primary_scene: p.primary_scene,
    genres: p.genres,
    monthly_listeners: p.monthly_listeners,
    confidence_score: p.confidence_score,
    house_crew_priority_score: p.scores.house_crew_priority_score,
    popularity_score: p.popularity_score ?? 0,
    url: abs(`/artist/${p.slug}`),
    markdown_url: abs(`/artist/${p.slug}.md`),
    json_url: abs(`/api/artists/${p.slug}.json`),
  };
}
