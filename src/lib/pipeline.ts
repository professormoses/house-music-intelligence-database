import { prisma } from './db';
import { serializeArtist } from './serialize';
import { normalizeGenres } from './genres';
import { enrichmentConnectors } from '../connectors/registry';
import type { EnrichmentField } from '../connectors/base';
import type { ArtistProfile, FieldSource } from './types';

export interface RepopulateOptions {
  limit?: number;
  slugs?: string[];
  refreshExisting?: boolean; // re-run even if recently verified
}

export interface RepopulateSummary {
  startedAt: string;
  finishedAt: string;
  connectorsUsed: string[];
  artistsProcessed: number;
  fieldsUpdated: number;
  releasesAdded: number;
  reviewQueued: number;
  deadLinksFound: number;
  errors: { slug: string; error: string }[];
}

const LINK_FIELDS = new Set([
  'website', 'instagram', 'tiktok', 'spotify', 'apple_music', 'youtube', 'soundcloud',
  'bandcamp', 'discogs', 'musicbrainz', 'beatport', 'traxsource', 'resident_advisor', 'wikidata',
]);
const NUMERIC_FIELDS = new Set(['spotify_followers', 'instagram_followers', 'monthly_listeners', 'youtube_subscribers']);

// Apply one connector field to the profile, honoring the data-quality rule:
// never overwrite higher-confidence data with lower-confidence data.
function applyField(
  profile: ArtistProfile,
  f: EnrichmentField,
): { changed: boolean; conflict: boolean } {
  const existing = profile.field_sources[f.field];
  const incoming: FieldSource = {
    value: f.value,
    source_name: f.sourceName,
    source_url: f.sourceUrl,
    last_verified_date: new Date().toISOString().slice(0, 10),
    confidence_score: f.confidence,
  };

  if (existing && (existing.confidence_score ?? 0) > f.confidence) {
    // Lower-confidence incoming: keep existing, flag if values differ.
    const conflict = String(existing.value) !== String(f.value);
    return { changed: false, conflict };
  }

  profile.field_sources[f.field] = incoming;
  if (f.sourceUrl && !profile.source_urls.includes(f.sourceUrl)) profile.source_urls.push(f.sourceUrl);

  if (f.field === 'genres' && typeof f.value === 'string') {
    const merged = normalizeGenres([...(profile.genres ?? []), ...f.value.split(/,\s*/)]);
    profile.genres = merged;
  } else if (LINK_FIELDS.has(f.field) && typeof f.value === 'string') {
    (profile as any)[f.field] = f.value;
  } else if (NUMERIC_FIELDS.has(f.field)) {
    (profile as any)[f.field] = typeof f.value === 'number' ? f.value : Number(f.value) || null;
  } else if (f.field === 'origin_city' || f.field === 'origin_country') {
    if (!(profile as any)[f.field]) (profile as any)[f.field] = f.value;
  }
  return { changed: true, conflict: false };
}

async function checkDeadLinks(profile: ArtistProfile): Promise<number> {
  let dead = 0;
  const urls = [profile.website, profile.spotify, profile.soundcloud].filter(Boolean) as string[];
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      if (res.status >= 400) dead++;
    } catch {
      dead++;
    }
  }
  return dead;
}

export async function repopulate(opts: RepopulateOptions = {}): Promise<RepopulateSummary> {
  const startedAt = new Date().toISOString();
  const connectors = enrichmentConnectors();
  const summary: RepopulateSummary = {
    startedAt,
    finishedAt: startedAt,
    connectorsUsed: connectors.map((c) => c.name),
    artistsProcessed: 0,
    fieldsUpdated: 0,
    releasesAdded: 0,
    reviewQueued: 0,
    deadLinksFound: 0,
    errors: [],
  };

  const where = opts.slugs?.length ? { slug: { in: opts.slugs } } : {};
  const rows = await prisma.artist.findMany({ where, take: opts.limit ?? 1000 });

  for (const row of rows) {
    try {
      const profile = serializeArtist(row);
      let touched = false;

      for (const c of connectors) {
        const result = await c.enrich!({ name: row.artistName });
        if (!result) continue;

        for (const f of result.fields) {
          const { changed, conflict } = applyField(profile, f);
          if (changed) {
            summary.fieldsUpdated++;
            touched = true;
            await prisma.fieldVerification.create({
              data: {
                artistId: row.id, entityType: 'artist', entityId: row.id, fieldName: f.field,
                fieldValue: String(f.value ?? ''), sourceName: f.sourceName, sourceUrl: f.sourceUrl ?? null,
                extractionMethod: f.method, confidenceScore: f.confidence,
                lastVerifiedDate: new Date().toISOString().slice(0, 10),
              },
            });
          }
          if (conflict) {
            summary.reviewQueued++;
            await prisma.reviewQueue.create({
              data: {
                entityType: 'artist', entityId: row.id, entitySlug: row.slug,
                reason: `Conflict on "${f.field}" from ${f.sourceName}`,
                payload: JSON.stringify({ field: f.field, incoming: f.value, source: f.sourceUrl }),
                confidence: f.confidence,
              },
            });
          }
        }

        // merge new links
        for (const [k, v] of Object.entries(result.links ?? {})) {
          if (LINK_FIELDS.has(k) && !(profile as any)[k]) {
            (profile as any)[k] = v;
            touched = true;
          }
        }

        // new releases
        for (const r of result.releases ?? []) {
          const exists = await prisma.artistRelease.findFirst({ where: { artistId: row.id, title: r.title } });
          if (!exists) {
            await prisma.artistRelease.create({
              data: { artistId: row.id, title: r.title, label: r.label ?? null, releaseDate: r.release_date ?? null, type: r.type ?? null, url: r.url ?? null, sourceUrl: r.url ?? null },
            });
            summary.releasesAdded++;
            touched = true;
          }
        }
      }

      const dead = await checkDeadLinks(profile);
      summary.deadLinksFound += dead;

      if (touched) {
        // recompute overall confidence as mean of field confidences
        const confs = Object.values(profile.field_sources).map((f) => f.confidence_score ?? 0);
        const overall = confs.length ? Math.round(confs.reduce((a, b) => a + b, 0) / confs.length) : row.confidenceScore;

        await prisma.artist.update({
          where: { id: row.id },
          data: {
            profile: JSON.stringify(profile),
            genresCsv: profile.genres.join(',').toLowerCase(),
            spotifyFollowers: profile.spotify_followers ?? row.spotifyFollowers,
            instagramFollowers: profile.instagram_followers ?? row.instagramFollowers,
            confidenceScore: overall,
            lastVerifiedDate: new Date().toISOString().slice(0, 10),
          },
        });
        await prisma.changeLog.create({
          data: { entityType: 'artist', entityId: row.id, entitySlug: row.slug, changeType: 'refresh', source: summary.connectorsUsed.join('+'), newValue: `Enriched (${summary.connectorsUsed.length} connectors)` },
        });
      }
      summary.artistsProcessed++;
    } catch (e: any) {
      summary.errors.push({ slug: row.slug, error: String(e?.message ?? e) });
    }
  }

  // update source health
  for (const c of connectors) {
    await prisma.source.updateMany({
      where: { sourceName: c.name },
      data: { status: 'ok', lastCrawledAt: new Date().toISOString() },
    });
  }

  summary.finishedAt = new Date().toISOString();
  return summary;
}
