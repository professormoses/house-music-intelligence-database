import { PrismaClient } from '@prisma/client';
import { SEED_ARTISTS, type SeedArtist } from './seed-data';
import {
  SEED_LABELS,
  SEED_EVENTS,
  SEED_VENUES,
  SEED_CONTACTS,
  SEED_SOURCES,
} from './seed-aux';
import { SEED_TOPICS, SEED_RELATIONSHIPS } from './seed-topics';
import { ENCYCLOPEDIA_TOPICS, ENCYCLOPEDIA_LABELS } from './seed-encyclopedia';
import { LABELS_50, LABEL_ARTISTS } from './seed-labels-50';
import { LA_ROSTER } from './seed-la';
import {
  HISTORY_ARTISTS,
  SUBGENRE_TOPICS,
  HISTORY_RELATIONSHIPS,
  DEMUIR_LABELS,
  MOVEMENT_EVENTS,
} from './seed-history';
import { normalizeGenres } from '../src/lib/genres';
import type { ArtistProfile, FieldSource } from '../src/lib/types';

const prisma = new PrismaClient();

function buildFieldSources(a: SeedArtist): Record<string, FieldSource> {
  const primary = a.wikipedia || a.source_urls?.[0] || a.resident_advisor || a.website;
  const conf = a.confidence_score ?? 60;
  const fs: Record<string, FieldSource> = {};
  if (a.origin_country)
    fs.origin_country = {
      value: a.origin_country,
      source_name: a.wikipedia ? 'Wikipedia' : 'Official / public',
      source_url: primary,
      last_verified_date: a.last_verified_date,
      confidence_score: conf,
    };
  if (a.genres?.length)
    fs.genres = {
      value: a.genres.join(', '),
      source_name: a.resident_advisor ? 'Resident Advisor' : 'Public sources',
      source_url: a.resident_advisor || primary,
      last_verified_date: a.last_verified_date,
      confidence_score: Math.max(40, conf - 10),
    };
  if (a.labels_affiliated?.length)
    fs.labels_affiliated = {
      value: a.labels_affiliated.join(', '),
      source_name: a.discogs ? 'Discogs' : 'Public sources',
      source_url: a.discogs || primary,
      last_verified_date: a.last_verified_date,
      confidence_score: Math.max(40, conf - 15),
    };
  if (a.monthly_listeners)
    fs.monthly_listeners = {
      value: a.monthly_listeners,
      source_name: 'Spotify (approx. public figure)',
      source_url: a.spotify,
      last_verified_date: a.last_verified_date,
      confidence_score: 50,
    };
  return fs;
}

function toProfile(a: SeedArtist): ArtistProfile {
  return {
    artist_id: '',
    slug: a.slug,
    artist_name: a.artist_name,
    real_name: a.real_name ?? null,
    aliases: a.aliases ?? [],
    pronouns_if_publicly_listed: null,
    origin_city: a.origin_city ?? null,
    origin_country: a.origin_country ?? null,
    current_city: a.current_city ?? null,
    current_country: a.current_country ?? null,
    genres: normalizeGenres(a.genres),
    specific_house_subgenres: normalizeGenres(a.specific_house_subgenres),
    primary_scene: a.primary_scene ?? null,
    bio_short: a.bio_short ?? null,
    bio_long: a.bio_long ?? null,
    black_house_music_relevance: a.black_house_music_relevance ?? null,
    cultural_lineage: a.cultural_lineage ?? null,
    years_active: a.years_active ?? null,
    labels_affiliated: a.labels_affiliated ?? [],
    record_label_owned: a.record_label_owned ?? null,
    management_company: null,
    booking_agency: a.booking_agency ?? null,
    manager_name: null,
    manager_email: null,
    booking_email: null,
    press_email: null,
    general_contact_email: null,
    website: a.website ?? null,
    instagram: a.instagram ?? null,
    tiktok: null,
    spotify: a.spotify ?? null,
    apple_music: null,
    youtube: null,
    youtube_music: null,
    soundcloud: a.soundcloud ?? null,
    bandcamp: null,
    discogs: a.discogs ?? null,
    musicbrainz: a.musicbrainz ?? null,
    beatport: a.beatport ?? null,
    traxsource: a.traxsource ?? null,
    resident_advisor: a.resident_advisor ?? null,
    songkick: null,
    bandsintown: null,
    linktree: null,
    beacons: null,
    hypeddit: null,
    toneden: null,
    wikipedia: a.wikipedia ?? null,
    wikidata: a.wikidata ?? null,
    top_tracks: (a.top_releases ?? []).map((r) => r.title),
    top_releases: a.top_releases ?? [],
    latest_release: (a.top_releases ?? [])[0] ?? null,
    release_count: a.top_releases?.length ?? 0,
    remix_count: 0,
    collaborators: a.collaborators ?? [],
    labels_released_on: a.labels_affiliated ?? [],
    monthly_listeners: a.monthly_listeners ?? null,
    spotify_followers: a.spotify_followers ?? null,
    youtube_subscribers: null,
    instagram_followers: a.instagram_followers ?? null,
    tiktok_followers: null,
    soundcloud_followers: null,
    bandcamp_followers: null,
    recent_shows: [],
    upcoming_shows: [],
    venues_played: [],
    festivals_played: a.festivals_played ?? [],
    countries_played: [],
    cities_played: [],
    dj_support: [],
    playlist_support: [],
    chart_positions: [],
    press_mentions: a.wikipedia ? [a.wikipedia] : [],
    interview_links: [],
    boiler_room_links: [],
    mix_links: [],
    live_set_links: [],
    scores: {} as ArtistProfile['scores'], // computed at read time
    source_urls: a.source_urls ?? [],
    field_sources: buildFieldSources(a),
    confidence_score: a.confidence_score ?? 60,
    last_verified_date: a.last_verified_date ?? null,
    notes: null,
  };
}

async function main() {
  console.log('Seeding House Music Intelligence Database…');

  for (const a of [...SEED_ARTISTS, ...HISTORY_ARTISTS]) {
    const profile = toProfile(a);
    const hasContact = !!(a.booking_agency || a.website);
    await prisma.artist.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        artistName: a.artist_name,
        realName: a.real_name ?? null,
        originCity: a.origin_city ?? null,
        originCountry: a.origin_country ?? null,
        currentCity: a.current_city ?? null,
        currentCountry: a.current_country ?? null,
        primaryScene: a.primary_scene ?? null,
        genresCsv: normalizeGenres(a.genres).join(',').toLowerCase(),
        subgenresCsv: normalizeGenres(a.specific_house_subgenres).join(',').toLowerCase(),
        monthlyListeners: a.monthly_listeners ?? null,
        spotifyFollowers: a.spotify_followers ?? null,
        instagramFollowers: a.instagram_followers ?? null,
        isEmerging: a.flags?.isEmerging ?? false,
        isFemale: a.flags?.isFemale ?? false,
        isLabelOwner: a.flags?.isLabelOwner ?? false,
        isLegend: a.flags?.isLegend ?? false,
        hasContact,
        hasUpcoming: false,
        blackLineage: a.flags?.blackLineage ?? false,
        confidenceScore: a.confidence_score ?? 60,
        lastVerifiedDate: a.last_verified_date ?? null,
        profile: JSON.stringify(profile),
      },
    });

    // releases
    for (const r of a.top_releases ?? []) {
      const existing = await prisma.artistRelease.findFirst({
        where: { title: r.title, artist: { slug: a.slug } },
      });
      if (!existing) {
        const art = await prisma.artist.findUnique({ where: { slug: a.slug } });
        if (art)
          await prisma.artistRelease.create({
            data: {
              artistId: art.id,
              title: r.title,
              label: r.label ?? null,
              releaseDate: r.release_date ?? null,
              type: r.type ?? null,
              sourceUrl: a.discogs ?? a.source_urls?.[0] ?? null,
            },
          });
      }
    }

    // field verifications
    for (const [field, fsv] of Object.entries(profile.field_sources)) {
      const art = await prisma.artist.findUnique({ where: { slug: a.slug } });
      if (!art) continue;
      const exists = await prisma.fieldVerification.findFirst({
        where: { artistId: art.id, fieldName: field },
      });
      if (!exists)
        await prisma.fieldVerification.create({
          data: {
            artistId: art.id,
            entityType: 'artist',
            entityId: art.id,
            fieldName: field,
            fieldValue: String(fsv.value ?? ''),
            sourceName: fsv.source_name ?? null,
            sourceUrl: fsv.source_url ?? null,
            extractionMethod: 'manual',
            confidenceScore: fsv.confidence_score ?? 0,
            lastVerifiedDate: fsv.last_verified_date ?? null,
          },
        });
    }
  }

  for (const l of [...SEED_LABELS, ...DEMUIR_LABELS, ...ENCYCLOPEDIA_LABELS, ...LABELS_50]) {
    const labelProfile = JSON.stringify({ genres: normalizeGenres(l.genres), tier: (l as any).tier ?? null });
    await prisma.label.upsert({
      where: { slug: l.slug },
      // Refresh roster + genres + sources on re-seed (idempotent).
      update: {
        labelName: l.labelName,
        genresCsv: normalizeGenres(l.genres).join(',').toLowerCase(),
        artistRoster: JSON.stringify(l.artistRoster ?? []),
        website: (l as any).website ?? null,
        country: l.country ?? null,
        sourceUrls: JSON.stringify(l.sourceUrls ?? []),
        confidenceScore: l.confidenceScore ?? 50,
        profile: labelProfile,
      },
      create: {
        slug: l.slug,
        labelName: l.labelName,
        website: (l as any).website ?? null,
        country: l.country ?? null,
        city: (l as any).city ?? null,
        genresCsv: normalizeGenres(l.genres).join(',').toLowerCase(),
        artistRoster: JSON.stringify(l.artistRoster ?? []),
        demoEmail: (l as any).demoEmail ?? null,
        contactEmail: (l as any).contactEmail ?? null,
        instagram: (l as any).instagram ?? null,
        beatport: (l as any).beatport ?? null,
        discogs: (l as any).discogs ?? null,
        profile: labelProfile,
        sourceUrls: JSON.stringify(l.sourceUrls ?? []),
        confidenceScore: l.confidenceScore ?? 50,
        lastVerifiedDate: '2026-06-08',
      },
    });
  }

  for (const e of [...SEED_EVENTS, ...MOVEMENT_EVENTS]) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {},
      create: {
        slug: e.slug,
        eventName: e.eventName,
        date: e.date,
        city: e.city,
        country: e.country ?? null,
        venue: e.venue ?? null,
        promoter: e.promoter ?? null,
        lineup: JSON.stringify(e.lineup ?? []),
        ticketLink: e.ticketLink ?? null,
        sourceUrl: e.sourceUrl ?? null,
        genresCsv: normalizeGenres(e.genres).join(',').toLowerCase(),
        confidenceScore: e.confidenceScore ?? 50,
        lastVerifiedDate: '2026-06-08',
      },
    });
  }

  for (const v of SEED_VENUES) {
    await prisma.venue.upsert({
      where: { slug: v.slug },
      update: {},
      create: {
        slug: v.slug,
        venueName: v.venueName,
        city: v.city ?? null,
        country: v.country ?? null,
        website: v.website ?? null,
        instagram: (v as any).instagram ?? null,
        genresSupported: normalizeGenres(v.genresSupported).join(',').toLowerCase(),
        artistsBooked: JSON.stringify(v.artistsBooked ?? []),
        sourceUrls: JSON.stringify(v.sourceUrls ?? []),
        confidenceScore: v.confidenceScore ?? 50,
        lastVerifiedDate: '2026-06-08',
      },
    });
  }

  for (const c of SEED_CONTACTS) {
    const art = await prisma.artist.findUnique({ where: { slug: c.artistSlug } });
    const exists = await prisma.contact.findFirst({
      where: { artistId: art?.id, role: c.role },
    });
    if (!exists)
      await prisma.contact.create({
        data: {
          artistId: art?.id ?? null,
          name: c.name,
          role: c.role,
          email: c.email,
          company: c.company,
          sourceUrl: c.sourceUrl,
          confidenceScore: c.confidenceScore,
          lastVerifiedDate: '2026-06-08',
        },
      });
  }

  for (const s of SEED_SOURCES) {
    await prisma.source.upsert({
      where: { sourceName: s.sourceName },
      update: {},
      create: {
        sourceName: s.sourceName,
        sourceType: s.sourceType,
        baseUrl: s.baseUrl,
        apiAvailable: s.apiAvailable,
        scrapingAllowed: s.scrapingAllowed,
        rateLimit: s.rateLimit,
        status: 'idle',
        notes: s.notes,
      },
    });
  }

  // Knowledge-graph topics
  for (const t of SEED_TOPICS) {
    await prisma.topic.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        title: t.title,
        type: t.type,
        summary: t.summary ?? null,
        body: t.body ?? '',
        era: t.era ?? null,
        city: t.city ?? null,
        country: t.country ?? null,
        question: t.question ?? null,
        answer: t.answer ?? null,
        relatedSlugs: JSON.stringify(t.relatedSlugs ?? []),
        sources: JSON.stringify(t.sources ?? []),
        confidenceScore: t.confidenceScore ?? 60,
        lastVerifiedDate: '2026-06-08',
      },
    });
  }

  // Subgenre history + encyclopedia (refresh on every re-seed so edits propagate).
  for (const t of [...SUBGENRE_TOPICS, ...ENCYCLOPEDIA_TOPICS]) {
    const fields = {
      title: t.title,
      type: t.type,
      summary: t.summary ?? null,
      body: t.body ?? '',
      era: t.era ?? null,
      city: t.city ?? null,
      country: t.country ?? null,
      relatedSlugs: JSON.stringify(t.relatedSlugs ?? []),
      sources: JSON.stringify(t.sources ?? []),
      confidenceScore: t.confidenceScore ?? 70,
      lastVerifiedDate: '2026-06-10',
    };
    await prisma.topic.upsert({
      where: { slug: t.slug },
      update: fields,
      create: { slug: t.slug, ...fields },
    });
  }

  // Knowledge-graph relationships (no unique key — dedupe on the tuple)
  for (const r of [...SEED_RELATIONSHIPS, ...HISTORY_RELATIONSHIPS]) {
    const exists = await prisma.relationship.findFirst({
      where: {
        subjectType: r.subjectType,
        subjectSlug: r.subjectSlug,
        predicate: r.predicate,
        objectType: r.objectType,
        objectSlug: r.objectSlug ?? null,
        objectLabel: r.objectLabel ?? null,
      },
    });
    if (!exists)
      await prisma.relationship.create({
        data: {
          subjectType: r.subjectType,
          subjectSlug: r.subjectSlug,
          predicate: r.predicate,
          objectType: r.objectType,
          objectSlug: r.objectSlug ?? null,
          objectLabel: r.objectLabel ?? null,
          sourceName: r.sourceName ?? null,
          sourceUrl: r.sourceUrl ?? null,
          confidenceScore: r.confidenceScore ?? 50,
          note: r.note ?? null,
        },
      });
  }

  // Southern California scene roster (Greater LA / San Diego / Inland Empire).
  // Merge-safe: tags region on existing artists, creates new ones with house metadata.
  {
    const { upsertLAArtist } = await import('../src/lib/ingest');
    let la = 0;
    for (const e of LA_ROSTER) {
      const r = await upsertLAArtist(e);
      if (r.tagged) la++;
    }
    console.log(`LA scene roster: ${la}/${LA_ROSTER.length} tagged (region set)`);
  }

  // Label rosters: every artist on the 50 labels, connected both ways.
  // Merge-safe: unions label affiliations onto existing artists, creates missing ones.
  {
    const { upsertLabelArtist } = await import('../src/lib/ingest');
    let created = 0;
    for (const e of LABEL_ARTISTS) {
      const r = await upsertLabelArtist(e);
      if (r.created) created++;
    }
    console.log(`Label rosters: ${LABEL_ARTISTS.length} artists linked, ${created} newly created`);
  }

  // Grow to 200 from the curated roster on a fresh database (idempotent: skips
  // when already populated, so it's safe to run on every Vercel build).
  const artistCount = await prisma.artist.count();
  if (artistCount < 100) {
    const { importRoster } = await import('../src/lib/ingest');
    const grown = await importRoster(200);
    console.log(`Roster import: +${grown.added} artists (total ${grown.total})`);
  }

  await prisma.changeLog.create({
    data: { entityType: 'system', changeType: 'create', source: 'seed', newValue: 'Initial seed' },
  });

  const counts = {
    artists: await prisma.artist.count(),
    labels: await prisma.label.count(),
    events: await prisma.event.count(),
    venues: await prisma.venue.count(),
    sources: await prisma.source.count(),
    topics: await prisma.topic.count(),
    relationships: await prisma.relationship.count(),
  };
  console.log('Seed complete:', counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
