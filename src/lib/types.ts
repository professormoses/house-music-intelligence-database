// Canonical shapes. The ArtistProfile mirrors the public JSON contract
// documented in /datasets/schema.md and served at /api/artists/:slug.json.

export interface FieldSource {
  value: string | number | null;
  source_name?: string;
  source_url?: string;
  last_verified_date?: string;
  confidence_score?: number;
}

export interface Release {
  title: string;
  label?: string;
  release_date?: string;
  type?: string;
  url?: string;
}

export interface Show {
  date?: string;
  venue?: string;
  city?: string;
  country?: string;
  event?: string;
  ticket_link?: string;
  source_url?: string;
}

export interface ArtistScores {
  influence_score: number;
  reach_score: number;
  house_crew_relevance_score: number;
  booking_potential_score: number;
  emerging_artist_score: number;
  contact_confidence_score: number;
  citation_confidence_score: number;
  agent_readability_score: number;
  brand_fit_score: number;
  interview_potential_score: number;
  sponsorship_potential_score: number;
  education_value_score: number;
  house_crew_priority_score: number;
}

// Everything in the public artist contract. Stored in Artist.profile (minus
// the columns promoted for querying, which are merged back in serialize()).
export interface ArtistProfile {
  artist_id: string;
  slug: string;
  artist_name: string;
  real_name?: string | null;
  aliases: string[];
  pronouns_if_publicly_listed?: string | null;
  origin_city?: string | null;
  origin_country?: string | null;
  current_city?: string | null;
  current_country?: string | null;
  genres: string[];
  specific_house_subgenres: string[];
  primary_scene?: string | null;
  bio_short?: string | null;
  bio_long?: string | null;
  black_house_music_relevance?: string | null;
  cultural_lineage?: string | null;
  years_active?: string | null;

  // affiliations & contacts
  labels_affiliated: string[];
  record_label_owned?: string | null;
  management_company?: string | null;
  booking_agency?: string | null;
  manager_name?: string | null;
  manager_email?: string | null;
  booking_email?: string | null;
  press_email?: string | null;
  general_contact_email?: string | null;

  // links
  website?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  spotify?: string | null;
  apple_music?: string | null;
  youtube?: string | null;
  youtube_music?: string | null;
  soundcloud?: string | null;
  bandcamp?: string | null;
  discogs?: string | null;
  musicbrainz?: string | null;
  beatport?: string | null;
  traxsource?: string | null;
  resident_advisor?: string | null;
  songkick?: string | null;
  bandsintown?: string | null;
  linktree?: string | null;
  beacons?: string | null;
  hypeddit?: string | null;
  toneden?: string | null;
  wikipedia?: string | null;
  wikidata?: string | null;

  // catalog
  top_tracks: string[];
  top_releases: Release[];
  latest_release?: Release | null;
  release_count?: number;
  remix_count?: number;
  collaborators: string[];
  labels_released_on: string[];

  // metrics
  monthly_listeners?: number | null;
  spotify_followers?: number | null;
  youtube_subscribers?: number | null;
  instagram_followers?: number | null;
  tiktok_followers?: number | null;
  soundcloud_followers?: number | null;
  bandcamp_followers?: number | null;

  // live & influence
  recent_shows: Show[];
  upcoming_shows: Show[];
  venues_played: string[];
  festivals_played: string[];
  countries_played: string[];
  cities_played: string[];
  dj_support: string[];
  playlist_support: string[];
  chart_positions: string[];
  press_mentions: string[];
  interview_links: string[];
  boiler_room_links: string[];
  mix_links: string[];
  live_set_links: string[];

  // scores
  scores: ArtistScores;
  popularity_score?: number;

  // provenance
  source_urls: string[];
  field_sources: Record<string, FieldSource>;
  confidence_score: number;
  last_verified_date?: string | null;
  suggested_citation?: string;
  notes?: string | null;
}
