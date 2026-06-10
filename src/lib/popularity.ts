import type { ArtistProfile } from './types';

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const log = (n: number) => (n > 0 ? Math.log10(n) : 0);

export interface PopularityBreakdown {
  score: number;
  parameters: {
    spotify_monthly_listeners: number;
    spotify_followers: number;
    instagram_followers: number;
    youtube_subscribers: number;
    catalog_depth: number;
    live_footprint: number;
    press_chart_footprint: number;
  };
  weights: Record<string, number>;
}

// 7 verifiable parameters → a 0-100 popularity score used to rank the whole DB.
// Follower-type metrics are log-scaled (audiences span orders of magnitude);
// count-type metrics are linear with a cap. Every input maps to a real,
// searchable field (Spotify, Instagram, YouTube, Discogs/Beatport, RA/Songkick,
// DJ Mag/Mixmag/Beatport charts).
export function computePopularity(p: Partial<ArtistProfile>): PopularityBreakdown {
  const ml = p.monthly_listeners ?? 0; // Spotify
  const sf = p.spotify_followers ?? 0; // Spotify
  const ig = p.instagram_followers ?? 0; // Instagram
  const yt = p.youtube_subscribers ?? p.soundcloud_followers ?? 0; // YouTube / SoundCloud

  const catalog = (p.release_count ?? p.top_releases?.length ?? 0); // Discogs/Beatport
  const live =
    (p.festivals_played?.length ?? 0) + (p.venues_played?.length ?? 0) + (p.upcoming_shows?.length ?? 0); // RA/Songkick
  const press =
    (p.press_mentions?.length ?? 0) + (p.chart_positions?.length ?? 0) + (p.interview_links?.length ?? 0); // DJ Mag/Mixmag/charts

  const parameters = {
    spotify_monthly_listeners: clamp((log(ml) / 7) * 100), // ~10M -> 100
    spotify_followers: clamp((log(sf) / 6.3) * 100), // ~2M -> 100
    instagram_followers: clamp((log(ig) / 7) * 100), // ~10M -> 100
    youtube_subscribers: clamp((log(yt) / 6.7) * 100), // ~5M -> 100
    catalog_depth: clamp(catalog * 4), // 25 releases -> 100
    live_footprint: clamp(live * 8),
    press_chart_footprint: clamp(press * 12),
  };

  const weights = {
    spotify_monthly_listeners: 0.25,
    instagram_followers: 0.2,
    spotify_followers: 0.12,
    youtube_subscribers: 0.1,
    catalog_depth: 0.12,
    live_footprint: 0.12,
    press_chart_footprint: 0.09,
  };

  const score = clamp(
    Object.entries(weights).reduce((acc, [k, w]) => acc + (parameters as any)[k] * w, 0),
  );

  return { score, parameters, weights };
}
