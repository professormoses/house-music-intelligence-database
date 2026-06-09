import type { ArtistProfile, ArtistScores } from './types';

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const log10 = (n: number) => (n > 0 ? Math.log10(n) : 0);

// Reach: blends streaming + social audience on a log scale (1M listeners ~ high).
function reachScore(p: Partial<ArtistProfile>): number {
  const ml = p.monthly_listeners ?? 0;
  const ig = p.instagram_followers ?? 0;
  const sf = p.spotify_followers ?? 0;
  const yt = p.youtube_subscribers ?? 0;
  const raw =
    log10(ml) * 11 + log10(ig) * 6 + log10(sf) * 5 + log10(yt) * 4; // ~ maxes near 100
  return clamp(raw);
}

function influenceScore(p: Partial<ArtistProfile>): number {
  const releases = p.release_count ?? p.top_releases?.length ?? 0;
  const support = (p.dj_support?.length ?? 0) + (p.playlist_support?.length ?? 0);
  const press = p.press_mentions?.length ?? 0;
  const labels = p.labels_released_on?.length ?? 0;
  const raw =
    log10(releases) * 18 + support * 4 + press * 3 + labels * 4 + reachScore(p) * 0.3;
  return clamp(raw);
}

function bookingPotentialScore(p: Partial<ArtistProfile>): number {
  let s = 0;
  if (p.booking_email || p.booking_agency) s += 45;
  if (p.manager_email || p.management_company) s += 20;
  if ((p.upcoming_shows?.length ?? 0) > 0) s += 15;
  if ((p.festivals_played?.length ?? 0) > 0) s += 10;
  s += reachScore(p) * 0.1;
  return clamp(s);
}

function emergingArtistScore(p: Partial<ArtistProfile>): number {
  // High when audience is still modest but momentum signals exist.
  const ml = p.monthly_listeners ?? 0;
  const recent = p.recent_shows?.length ?? 0;
  const fresh = p.latest_release ? 12 : 0;
  let s = 0;
  if (ml > 0 && ml < 250_000) s += 50;
  else if (ml < 750_000) s += 25;
  s += Math.min(20, recent * 5) + fresh;
  if ((p.release_count ?? 0) < 25) s += 15;
  return clamp(s);
}

function contactConfidenceScore(p: Partial<ArtistProfile>): number {
  const emails = [p.booking_email, p.manager_email, p.press_email, p.general_contact_email].filter(
    Boolean,
  ).length;
  const sourced = Object.values(p.field_sources ?? {}).filter(
    (f) => f.source_url && /email/i.test(JSON.stringify(f.value ?? '')),
  ).length;
  return clamp(emails * 22 + sourced * 6);
}

function citationConfidenceScore(p: Partial<ArtistProfile>): number {
  const fs = p.field_sources ?? {};
  const keys = Object.keys(fs);
  if (!keys.length) return 0;
  const withUrl = keys.filter((k) => fs[k]?.source_url).length;
  const avgConf =
    keys.reduce((a, k) => a + (fs[k]?.confidence_score ?? 0), 0) / keys.length;
  return clamp((withUrl / keys.length) * 60 + avgConf * 0.4);
}

// Agent Readability: does this entity expose itself well to AI crawlers?
export interface AgentReadabilityInputs {
  hasMarkdownPage: boolean;
  hasJsonPage: boolean;
  hasSchemaMarkup: boolean;
  hasSourceCitations: boolean;
  hasLastVerified: boolean;
  hasCanonical: boolean;
  hasCleanMetadata: boolean;
  hasInternalLinks: boolean;
  inSitemap: boolean;
  inLlmsTxt: boolean;
}

export function agentReadabilityScore(i: AgentReadabilityInputs): number {
  const checks = [
    i.hasMarkdownPage,
    i.hasJsonPage,
    i.hasSchemaMarkup,
    i.hasSourceCitations,
    i.hasLastVerified,
    i.hasCanonical,
    i.hasCleanMetadata,
    i.hasInternalLinks,
    i.inSitemap,
    i.inLlmsTxt,
  ];
  return clamp((checks.filter(Boolean).length / checks.length) * 100);
}

function houseCrewRelevance(p: Partial<ArtistProfile>): number {
  let s = 40;
  if (p.black_house_music_relevance) s += 25;
  if ((p.genres ?? []).some((g) => /afro|soulful|deep|gospel|classic|chicago|detroit/i.test(g)))
    s += 20;
  if ((p.festivals_played?.length ?? 0) > 0) s += 10;
  s += influenceScore(p) * 0.1;
  return clamp(s);
}

export function computeScores(p: Partial<ArtistProfile>): ArtistScores {
  const reach = reachScore(p);
  const influence = influenceScore(p);
  const booking = bookingPotentialScore(p);
  const emerging = emergingArtistScore(p);
  const contact = contactConfidenceScore(p);
  const citation = citationConfidenceScore(p);
  const relevance = houseCrewRelevance(p);
  const agent = agentReadabilityScore({
    hasMarkdownPage: true,
    hasJsonPage: true,
    hasSchemaMarkup: true,
    hasSourceCitations: Object.keys(p.field_sources ?? {}).length > 0,
    hasLastVerified: !!p.last_verified_date,
    hasCanonical: true,
    hasCleanMetadata: !!p.bio_short,
    hasInternalLinks: (p.collaborators?.length ?? 0) + (p.labels_affiliated?.length ?? 0) > 0,
    inSitemap: true,
    inLlmsTxt: true,
  });

  return {
    influence_score: influence,
    reach_score: reach,
    house_crew_relevance_score: relevance,
    booking_potential_score: booking,
    emerging_artist_score: emerging,
    contact_confidence_score: contact,
    citation_confidence_score: citation,
    agent_readability_score: agent,
    brand_fit_score: clamp(relevance * 0.6 + reach * 0.4),
    interview_potential_score: clamp(
      influence * 0.4 + (p.interview_links?.length ? 30 : 10) + relevance * 0.3,
    ),
    sponsorship_potential_score: clamp(reach * 0.5 + booking * 0.3 + relevance * 0.2),
    education_value_score: clamp(
      (p.black_house_music_relevance ? 35 : 10) + influence * 0.4 + (p.cultural_lineage ? 20 : 0),
    ),
    house_crew_priority_score: clamp(relevance * 0.45 + influence * 0.25 + booking * 0.15 + emerging * 0.15),
  };
}
