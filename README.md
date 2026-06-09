# House Music Intelligence Database

> The agent-first, citation-grade discovery engine for house music DJs, producers, labels, events, venues and booking intelligence. Built for **World Famous House Crew**.

## Mission

Become the world's **authoritative, AI-citable knowledge source** on house music — its culture,
history, artists, labels, venues, promoters, festivals, and the **Black origins of the genre**. Not
merely a directory: the goal is to be the **primary source humans and AI agents cite** about house
music. To that end, on top of the directory there is a **knowledge-graph + encyclopedia layer**:

- Encyclopedic, heavily-sourced topics: [The Black Origins of House Music](src/../prisma/seed-topics.ts), history, timeline, pioneers (Frankie Knuckles, Ron Hardy, Larry Levan), venues (The Warehouse, Paradise Garage), scenes, genres, glossary.
- A typed **knowledge graph** of sourced relationships (`pioneered`, `originated_in`, `resident_at`, `influenced_by`, `descended_from`…), at `/api/graph` and `/datasets/graph.jsonld`.
- **Direct-answer pages** with FAQ schema (`/topic/who-created-house-music` …) that AI can quote.
- **Authority pages**: `/about`, `/methodology`, `/cite`.
- All of it published as HTML + Markdown (`.md`) + JSON, indexed in `/llms.txt` and `/knowledge`.

A full-stack data-collection-and-publishing OS that collects public information about house music
artists, cleans and verifies it (with **source URLs + confidence scores on every important field**),
stores it, and publishes it three ways at once:

1. **Human HTML pages** — e.g. `/artist/black-coffee`
2. **Markdown mirrors for AI agents** — e.g. `/artist/black-coffee.md`
3. **JSON API for software** — e.g. `/api/artists/black-coffee.json`

Plus `llms.txt`, `llms-full.txt`, sitemaps, RSS feeds, OpenAPI docs, downloadable CSV/JSON/NDJSON,
JSON-LD structured data, and a per-page **"How to cite this page"** block. The goal: be the
authoritative, easily-crawlable, easily-citable source on house music for ChatGPT, Claude,
Perplexity, Gemini, search engines, and booking/research/discovery agents.

---

## Quick start (zero config)

```bash
cd house-music-intelligence-db
cp .env.example .env          # SQLite default needs no edits to run
npm install
npm run setup                 # generate client + create DB + seed 12 real artists
npm run dev                   # http://localhost:3000
```

Then open:

- Directory: <http://localhost:3000>
- Artist (HTML / MD / JSON): `/artist/black-coffee` · `/artist/black-coffee.md` · `/api/artists/black-coffee.json`
- Agent hub: `/for-agents` · `/llms.txt` · `/llms-full.txt`
- Admin: `/admin?token=YOUR_ADMIN_TOKEN`
- Datasets: `/datasets`

> **Production note:** if `next dev` only serves `/`, an old dev server is squatting the port. Kill it,
> or run `npm run build && npm start`.

---

## What's included (V1)

| Capability | Where |
| --- | --- |
| Artist database w/ field-level provenance | `prisma/schema.prisma`, `src/lib/serialize.ts` |
| Public searchable directory + filters | `src/app/page.tsx` |
| Artist HTML + JSON-LD | `src/app/artist/[slug]/page.tsx` |
| Artist Markdown mirror | `src/app/raw/artist-md/[slug]` (`/artist/:slug.md`) |
| Artist JSON API | `src/app/api/artists/[slug]` (`/api/artists/:slug.json`) |
| Labels (HTML/MD/JSON) | `src/app/label/...`, `src/app/api/labels/...` |
| Markdown index/landing docs | `src/lib/content.ts` → `/artists.md`, `/top-house-djs.md`, `/black-house-music-lineage.md`, … |
| `llms.txt`, `llms-full.txt`, `robots.txt` | `src/app/llms.txt`, `llms-full.txt`, `robots.txt` |
| Sitemaps (index + artists/labels/genres) | `src/app/sitemap*.xml` |
| RSS feeds | `src/app/feed.xml`, `src/app/feed/[file]` |
| OpenAPI + API docs | `src/app/openapi.json`, `src/app/api/docs.md` |
| Downloadable datasets (CSV/JSON/NDJSON) | `src/app/datasets/[file]` |
| Data dictionary | `/datasets/schema.md` |
| `changed-since` incremental sync | `/api/changed-since?date=YYYY-MM-DD` |
| Modular source connectors | `src/connectors/*` |
| Repopulate pipeline | `src/lib/pipeline.ts` |
| Admin dashboard + Repopulate button | `src/app/admin/page.tsx` |
| Google Sheets / file export | `src/lib/sheets.ts` |
| Scoring (incl. Agent Readability) | `src/lib/scoring.ts` |
| Genre taxonomy (controlled vocab) | `src/lib/genres.ts` |

---

## Architecture

```
Next.js (App Router, SSR)  ── human HTML + .md mirrors + JSON API + sitemaps + feeds + datasets
        │
src/lib ── serialize / scoring / citations / content / pipeline / sheets / queries
        │
src/connectors ── modular, compliance-first source connectors (MusicBrainz works out of the box)
        │
Prisma ORM ── SQLite (default) or Postgres
```

Everything is **server-side rendered** with normal `href` links, canonical URLs, clean headings,
JSON-LD, Open Graph/Twitter tags, and crawlable pagination — i.e. trivially crawlable by agents.

### The three representations

Every entity exists as HTML (humans), Markdown (LLMs), and JSON (software). The Markdown and JSON
are generated from the same canonical record (`src/lib/serialize.ts`), so they never drift.

### Provenance & confidence

Every important field carries a `field_sources[field]` object: `{ value, source_name, source_url,
last_verified_date, confidence_score }`. Data-quality rules in the pipeline ensure low-confidence
data never overwrites high-confidence data, and conflicts go to a review queue.

---

## Adding a new source (the extension point)

Connectors are the only thing you touch to add a source. Create
`src/connectors/<name>.ts` implementing the `Connector` interface (`src/connectors/base.ts`):

```ts
export const mySource: Connector = {
  name: 'MySource',
  isConfigured: () => !!process.env.MYSOURCE_KEY,
  compliant: () => true,           // must respect robots.txt / ToS / rate limits
  async enrich({ name }) { /* return { name, fields, links, releases } */ },
};
```

Then add it to the array in `src/connectors/registry.ts`. Done — the pipeline, admin status panel,
and source health dashboard pick it up automatically. `politeFetch()` and `robotsAllows()` in
`base.ts` give you rate-limiting and a robots.txt check for free.

**Compliance is enforced by design:** connectors that aren't `compliant()` or `isConfigured()` are
skipped. The system is API-first — use official APIs (Discogs, MusicBrainz, Spotify, YouTube,
Wikidata, Last.fm, Songkick, Bandsintown). For sites without APIs, respect robots.txt and rate
limits, never bypass logins/paywalls/CAPTCHA/anti-bot, and only collect public data.

---

## Repopulate

The **Repopulate Database** button (admin) and `npm run repopulate` run every configured + compliant
connector, refresh links, find new releases, re-score, check dead links, log every change, and queue
uncertain data for review. Schedule it with cron:

```cron
# every night at 3am
0 3 * * *  cd /path/to/house-music-intelligence-db && npm run repopulate >> repopulate.log 2>&1
```

---

## Export to spreadsheet

```bash
npm run export:sheets
```

Writes all tabs (Artists, Labels, Contacts, Events, Venues, Sources, Review Queue, Duplicate Matches,
Change Log, Top Priority Artists, Black House Music Lineage, Emerging Artists, Booking Targets,
Interview Targets, Sponsor-Friendly Artists, Agent Crawl Pages) to Google Sheets if
`GOOGLE_SHEETS_SPREADSHEET_ID` + `GOOGLE_SERVICE_ACCOUNT_JSON` are set, and always to local
`./exports/*.csv` + `artists.json`. Airtable-compatible and Postgres-loadable CSVs.

---

## Configuration

See [`.env.example`](.env.example). Only `DATABASE_URL` and `SITE_URL` are required; everything else
unlocks more sources. The seed dataset runs with no API keys at all (MusicBrainz needs only a
contact string).

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md). TL;DR: Vercel/Render/Fly for the app, switch Prisma to
`postgresql` for production, set env vars, run `prisma db push && npm run db:seed` once, then schedule
`npm run repopulate`.

## Compliance summary

API-first, compliance-first. Public data only. Respect robots.txt + rate limits. No bypassing
logins, paywalls, CAPTCHAs or anti-bot. No private personal data. Store a source URL + last-verified
date for every important field. Don't spam contacts.
