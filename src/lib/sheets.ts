import { prisma } from './db';
import { allArtistProfiles } from './queries';
import { abs } from './site';
import type { ArtistProfile } from './types';

export interface Tab {
  name: string;
  headers: string[];
  rows: (string | number)[][];
}

function artistRow(a: ArtistProfile): (string | number)[] {
  return [
    a.slug, a.artist_name, a.real_name ?? '', a.origin_city ?? '', a.origin_country ?? '',
    a.primary_scene ?? '', a.genres.join('; '), a.record_label_owned ?? '', a.labels_affiliated.join('; '),
    a.booking_agency ?? '', a.booking_email ?? '', a.website ?? '', a.instagram ?? '', a.spotify ?? '',
    a.monthly_listeners ?? '', a.scores.house_crew_priority_score, a.scores.booking_potential_score,
    a.confidence_score, a.last_verified_date ?? '', abs(`/artist/${a.slug}`), abs(`/artist/${a.slug}.md`),
    abs(`/api/artists/${a.slug}.json`), a.suggested_citation ?? '',
  ];
}

const ARTIST_HEADERS = [
  'slug', 'artist_name', 'real_name', 'origin_city', 'origin_country', 'primary_scene', 'genres',
  'record_label_owned', 'labels_affiliated', 'booking_agency', 'booking_email', 'website', 'instagram',
  'spotify', 'monthly_listeners', 'priority_score', 'booking_score', 'confidence', 'last_verified',
  'canonical_url', 'markdown_url', 'json_url', 'suggested_citation',
];

// Build every spreadsheet tab from the spec.
export async function buildTabs(): Promise<Tab[]> {
  const artists = await allArtistProfiles();
  const labels = await prisma.label.findMany();
  const events = await prisma.event.findMany();
  const venues = await prisma.venue.findMany();
  const contacts = await prisma.contact.findMany({ include: { artist: true } });
  const sources = await prisma.source.findMany();
  const review = await prisma.reviewQueue.findMany({ orderBy: { createdAt: 'desc' } });
  const dups = await prisma.duplicateMatch.findMany();
  const changes = await prisma.changeLog.findMany({ orderBy: { createdAt: 'desc' }, take: 1000 });

  const top = (pred: (a: ArtistProfile) => boolean) => artists.filter(pred).map(artistRow);

  return [
    { name: 'Artists', headers: ARTIST_HEADERS, rows: artists.map(artistRow) },
    {
      name: 'Labels',
      headers: ['slug', 'label_name', 'country', 'genres', 'contact_email', 'demo_email', 'website', 'confidence', 'url'],
      rows: labels.map((l) => [l.slug, l.labelName, l.country ?? '', l.genresCsv, l.contactEmail ?? '', l.demoEmail ?? '', l.website ?? '', l.confidenceScore, abs(`/label/${l.slug}`)]),
    },
    {
      name: 'Contacts',
      headers: ['artist', 'name', 'role', 'email', 'company', 'source_url', 'confidence', 'last_verified'],
      rows: contacts.map((c) => [c.artist?.artistName ?? '', c.name ?? '', c.role ?? '', c.email ?? '', c.company ?? '', c.sourceUrl ?? '', c.confidenceScore, c.lastVerifiedDate ?? '']),
    },
    {
      name: 'Events',
      headers: ['slug', 'event_name', 'date', 'city', 'venue', 'promoter', 'ticket_link', 'genres', 'confidence'],
      rows: events.map((e) => [e.slug, e.eventName, e.date ?? '', e.city ?? '', e.venue ?? '', e.promoter ?? '', e.ticketLink ?? '', e.genresCsv, e.confidenceScore]),
    },
    {
      name: 'Venues',
      headers: ['slug', 'venue_name', 'city', 'country', 'website', 'booking_email', 'genres', 'confidence'],
      rows: venues.map((v) => [v.slug, v.venueName, v.city ?? '', v.country ?? '', v.website ?? '', v.bookingEmail ?? '', v.genresSupported, v.confidenceScore]),
    },
    {
      name: 'Sources',
      headers: ['source_name', 'type', 'base_url', 'api_available', 'scraping_allowed', 'rate_limit', 'status', 'last_crawled', 'notes'],
      rows: sources.map((s) => [s.sourceName, s.sourceType, s.baseUrl ?? '', String(s.apiAvailable), String(s.scrapingAllowed), s.rateLimit ?? '', s.status, s.lastCrawledAt ?? '', s.notes ?? '']),
    },
    {
      name: 'Review Queue',
      headers: ['entity', 'slug', 'reason', 'confidence', 'status', 'created'],
      rows: review.map((r) => [r.entityType, r.entitySlug ?? '', r.reason, r.confidence, r.status, r.createdAt.toISOString()]),
    },
    {
      name: 'Duplicate Matches',
      headers: ['entity', 'primary', 'candidate', 'score', 'status'],
      rows: dups.map((d) => [d.entityType, d.primaryId, d.candidateId, d.score, d.status]),
    },
    {
      name: 'Change Log',
      headers: ['when', 'entity', 'slug', 'field', 'change', 'new_value', 'source'],
      rows: changes.map((c) => [c.createdAt.toISOString(), c.entityType, c.entitySlug ?? '', c.fieldName ?? '', c.changeType, c.newValue ?? '', c.source ?? '']),
    },
    { name: 'Top Priority Artists', headers: ARTIST_HEADERS, rows: top((a) => a.scores.house_crew_priority_score >= 60) },
    { name: 'Black House Music Lineage', headers: ARTIST_HEADERS, rows: top((a) => !!a.black_house_music_relevance) },
    { name: 'Emerging Artists', headers: ARTIST_HEADERS, rows: top((a) => a.scores.emerging_artist_score >= 55) },
    { name: 'Booking Targets', headers: ARTIST_HEADERS, rows: top((a) => a.scores.booking_potential_score >= 50) },
    { name: 'Interview Targets', headers: ARTIST_HEADERS, rows: top((a) => a.scores.interview_potential_score >= 50) },
    { name: 'Sponsor-Friendly Artists', headers: ARTIST_HEADERS, rows: top((a) => a.scores.sponsorship_potential_score >= 50) },
    {
      name: 'Agent Crawl Pages',
      headers: ['artist', 'html', 'markdown', 'json'],
      rows: artists.map((a) => [a.artist_name, abs(`/artist/${a.slug}`), abs(`/artist/${a.slug}.md`), abs(`/api/artists/${a.slug}.json`)]),
    },
  ];
}

// Push to Google Sheets if googleapis + credentials are present.
export async function exportToGoogleSheets(): Promise<{ ok: boolean; detail: string; tabs: number }> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const credPath = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!spreadsheetId || !credPath) return { ok: false, detail: 'GOOGLE_SHEETS_SPREADSHEET_ID / GOOGLE_SERVICE_ACCOUNT_JSON not set', tabs: 0 };

  let google: any;
  try {
    ({ google } = await import('googleapis'));
  } catch {
    return { ok: false, detail: 'googleapis not installed (npm i googleapis)', tabs: 0 };
  }

  const fs = await import('fs');
  const credentials = JSON.parse(fs.readFileSync(credPath, 'utf8'));
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

  const tabs = await buildTabs();
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = new Set((meta.data.sheets ?? []).map((s: any) => s.properties.title));

  for (const tab of tabs) {
    if (!existing.has(tab.name)) {
      await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: tab.name } } }] } });
    }
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab.name}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [tab.headers, ...tab.rows] },
    });
  }
  return { ok: true, detail: `Exported to spreadsheet ${spreadsheetId}`, tabs: tabs.length };
}

// Always-available fallback: write CSV + JSON to ./exports
export async function exportToFiles(): Promise<{ ok: boolean; detail: string; files: string[] }> {
  // Vercel's filesystem is read-only at runtime. Use the live dataset endpoints
  // (/datasets/*.csv|json|ndjson) or the Google Sheets export instead.
  if (process.env.VERCEL)
    return {
      ok: false,
      detail: 'File export is disabled on Vercel (read-only filesystem). Use /datasets/*.csv|json or configure Google Sheets export.',
      files: [],
    };
  const fs = await import('fs');
  const path = await import('path');
  const dir = path.join(process.cwd(), 'exports');
  fs.mkdirSync(dir, { recursive: true });
  const tabs = await buildTabs();
  const files: string[] = [];
  const esc = (v: string | number) => {
    const s = String(v ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  for (const tab of tabs) {
    const csv = [tab.headers.join(','), ...tab.rows.map((r) => r.map(esc).join(','))].join('\n') + '\n';
    const fname = tab.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.csv';
    fs.writeFileSync(path.join(dir, fname), csv);
    files.push(`exports/${fname}`);
  }
  fs.writeFileSync(path.join(dir, 'artists.json'), JSON.stringify(await allArtistProfiles(), null, 2));
  files.push('exports/artists.json');
  return { ok: true, detail: `Wrote ${files.length} files to ./exports`, files };
}
