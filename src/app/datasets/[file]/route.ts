import { prisma } from '@/lib/db';
import { allArtistProfiles } from '@/lib/queries';
import { toCSV, toNDJSON } from '@/lib/format';
import { abs } from '@/lib/site';
import { buildGraph, buildJsonLdGraph } from '@/lib/graph';
import { allTopics } from '@/lib/topics';
import type { ArtistProfile } from '@/lib/types';

export const dynamic = 'force-dynamic';

function flatArtist(a: ArtistProfile) {
  return {
    slug: a.slug,
    artist_name: a.artist_name,
    real_name: a.real_name ?? '',
    origin_city: a.origin_city ?? '',
    origin_country: a.origin_country ?? '',
    current_city: a.current_city ?? '',
    primary_scene: a.primary_scene ?? '',
    genres: a.genres.join('; '),
    specific_house_subgenres: a.specific_house_subgenres.join('; '),
    years_active: a.years_active ?? '',
    record_label_owned: a.record_label_owned ?? '',
    labels_affiliated: a.labels_affiliated.join('; '),
    booking_agency: a.booking_agency ?? '',
    booking_email: a.booking_email ?? '',
    website: a.website ?? '',
    instagram: a.instagram ?? '',
    spotify: a.spotify ?? '',
    soundcloud: a.soundcloud ?? '',
    beatport: a.beatport ?? '',
    discogs: a.discogs ?? '',
    resident_advisor: a.resident_advisor ?? '',
    wikipedia: a.wikipedia ?? '',
    monthly_listeners: a.monthly_listeners ?? '',
    spotify_followers: a.spotify_followers ?? '',
    instagram_followers: a.instagram_followers ?? '',
    house_crew_priority_score: a.scores.house_crew_priority_score,
    booking_potential_score: a.scores.booking_potential_score,
    confidence_score: a.confidence_score,
    last_verified_date: a.last_verified_date ?? '',
    source_urls: a.source_urls.join(' | '),
    canonical_url: abs(`/artist/${a.slug}`),
    markdown_url: abs(`/artist/${a.slug}.md`),
    json_url: abs(`/api/artists/${a.slug}.json`),
    suggested_citation: a.suggested_citation ?? '',
  };
}

function file(body: string, type: string, name: string) {
  return new Response(body, {
    headers: {
      'content-type': type,
      'access-control-allow-origin': '*',
      'content-disposition': `inline; filename="${name}"`,
      'cache-control': 'public, max-age=300',
    },
  });
}

export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const f = params.file;

  if (f === 'artists.csv') return file(toCSV((await allArtistProfiles()).map(flatArtist)), 'text/csv; charset=utf-8', f);
  if (f === 'artists.json') return file(JSON.stringify(await allArtistProfiles(), null, 2), 'application/json', f);
  if (f === 'artists.ndjson') return file(toNDJSON(await allArtistProfiles()), 'application/x-ndjson', f);

  if (f === 'labels.csv' || f === 'labels.json') {
    const labels = (await prisma.label.findMany()).map((l) => ({
      slug: l.slug, label_name: l.labelName, website: l.website ?? '', country: l.country ?? '',
      city: l.city ?? '', genres: l.genresCsv, roster: JSON.parse(l.artistRoster || '[]').join('; '),
      contact_email: l.contactEmail ?? '', demo_email: l.demoEmail ?? '',
      confidence_score: l.confidenceScore, last_verified_date: l.lastVerifiedDate ?? '',
      canonical_url: abs(`/label/${l.slug}`),
    }));
    return f.endsWith('.json') ? file(JSON.stringify(labels, null, 2), 'application/json', f) : file(toCSV(labels), 'text/csv; charset=utf-8', f);
  }

  if (f === 'events.csv' || f === 'events.json') {
    const events = (await prisma.event.findMany()).map((e) => ({
      slug: e.slug, event_name: e.eventName, date: e.date ?? '', city: e.city ?? '', country: e.country ?? '',
      venue: e.venue ?? '', promoter: e.promoter ?? '', lineup: JSON.parse(e.lineup || '[]').join('; '),
      ticket_link: e.ticketLink ?? '', genres: e.genresCsv, confidence_score: e.confidenceScore,
      source_url: e.sourceUrl ?? '',
    }));
    return f.endsWith('.json') ? file(JSON.stringify(events, null, 2), 'application/json', f) : file(toCSV(events), 'text/csv; charset=utf-8', f);
  }

  if (f === 'contacts.csv') {
    const contacts = (await prisma.contact.findMany({ include: { artist: true } })).map((c) => ({
      artist: c.artist?.artistName ?? '', name: c.name ?? '', role: c.role ?? '', email: c.email ?? '',
      company: c.company ?? '', source_url: c.sourceUrl ?? '', confidence_score: c.confidenceScore,
      last_verified_date: c.lastVerifiedDate ?? '',
    }));
    return file(toCSV(contacts), 'text/csv; charset=utf-8', f);
  }

  if (f === 'sources.csv') {
    const sources = (await prisma.source.findMany()).map((s) => ({
      source_name: s.sourceName, source_type: s.sourceType, base_url: s.baseUrl ?? '',
      api_available: s.apiAvailable, scraping_allowed: s.scrapingAllowed, rate_limit: s.rateLimit ?? '',
      status: s.status, last_crawled: s.lastCrawledAt ?? '', notes: s.notes ?? '',
    }));
    return file(toCSV(sources), 'text/csv; charset=utf-8', f);
  }

  if (f === 'change-log.csv') {
    const log = (await prisma.changeLog.findMany({ orderBy: { createdAt: 'desc' }, take: 1000 })).map((c) => ({
      created_at: c.createdAt.toISOString(), entity_type: c.entityType, entity_slug: c.entitySlug ?? '',
      field: c.fieldName ?? '', change_type: c.changeType, old_value: c.oldValue ?? '', new_value: c.newValue ?? '',
      source: c.source ?? '',
    }));
    return file(toCSV(log), 'text/csv; charset=utf-8', f);
  }

  if (f === 'graph.json') return file(JSON.stringify(await buildGraph(), null, 2), 'application/json', f);
  if (f === 'graph.jsonld') return file(JSON.stringify(await buildJsonLdGraph(), null, 2), 'application/ld+json', f);
  if (f === 'topics.json') return file(JSON.stringify(await allTopics(), null, 2), 'application/json', f);

  if (f === 'schema.md') return file(SCHEMA_MD, 'text/markdown; charset=utf-8', f);

  return new Response('Unknown dataset. See /datasets', { status: 404 });
}

const SCHEMA_MD = `# Data Dictionary — House Music Intelligence Database

> The field-level contract for every dataset and API response.

## Provenance model

Every important field is backed by a \`field_sources[field]\` object:

\`\`\`
{
  "value": "South Africa",
  "source_name": "Wikipedia",
  "source_url": "https://en.wikipedia.org/wiki/Black_Coffee_(DJ)",
  "last_verified_date": "2026-06-08",
  "confidence_score": 88
}
\`\`\`

- **confidence_score** — 0-100. Higher = more corroborated / more authoritative source.
- **last_verified_date** — ISO date the value was last confirmed against its source.

## artists (CSV columns / JSON keys)

| Field | Type | Notes |
| --- | --- | --- |
| slug | string | stable identifier, used in all URLs |
| artist_name | string | display name |
| real_name | string | if public |
| origin_city / origin_country | string | birthplace / scene origin |
| current_city / current_country | string | if public |
| primary_scene | string | e.g. "Afro House", "Chicago House" |
| genres | string[] | normalized to the controlled taxonomy |
| specific_house_subgenres | string[] | controlled taxonomy |
| labels_affiliated / record_label_owned | string[] / string | |
| booking_agency / booking_email / manager_email / press_email | string | only if public |
| website, instagram, spotify, soundcloud, beatport, discogs, resident_advisor, wikipedia, … | url | official/public links |
| monthly_listeners, spotify_followers, instagram_followers | number | approximate, sourced |
| top_releases | object[] | { title, label, release_date, type } |
| scores | object | see Scores below |
| source_urls | url[] | all sources backing the record |
| field_sources | object | per-field provenance (see above) |
| confidence_score | number | overall record confidence 0-100 |
| last_verified_date | ISO date | |
| suggested_citation | string | ready-to-use citation |

## Scores (0-100 each)

influence_score, reach_score, house_crew_relevance_score, booking_potential_score,
emerging_artist_score, contact_confidence_score, citation_confidence_score,
agent_readability_score, brand_fit_score, interview_potential_score,
sponsorship_potential_score, education_value_score, house_crew_priority_score.

## Genre taxonomy

See [/house-music-genre-taxonomy.md](/house-music-genre-taxonomy.md).
`;
