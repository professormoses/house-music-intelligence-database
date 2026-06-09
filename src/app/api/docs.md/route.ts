import { SITE, abs } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  const md = `# ${SITE.name} — API Documentation

> ${SITE.tagline}

Base URL: \`${SITE.url}\` · OpenAPI: [${abs('/openapi.json')}](${abs('/openapi.json')})
All endpoints are public, read-only, CORS-enabled (\`access-control-allow-origin: *\`) and cacheable.

## Endpoints

### \`GET /api/artists\`
List and filter artists. Query params: \`q, genre, country, city, scene, minListeners,
hasContact, hasUpcoming, labelOwner, female, emerging, legend, blackLineage, sort, page, pageSize\`.

Example: ${abs('/api/artists?genre=Afro%20House&sort=reach')}

### \`GET /api/artists/{slug}.json\`
Full artist profile including \`field_sources\`, \`scores\`, \`source_urls\`, \`confidence_score\`,
\`last_verified_date\` and \`suggested_citation\`.

Example: ${abs('/api/artists/black-coffee.json')}

### \`GET /artist/{slug}.md\`
The same profile as clean Markdown, ideal for LLM ingestion.

Example: ${abs('/artist/black-coffee.md')}

### \`GET /api/labels/{slug}.json\`
Full label record.

### \`GET /api/changed-since?date=YYYY-MM-DD\`
All records changed on/after a date — for incremental sync.

Example: ${abs('/api/changed-since?date=2026-01-01')}

## Bulk data

- ${abs('/datasets/artists.json')} · ${abs('/datasets/artists.csv')} · ${abs('/datasets/artists.ndjson')}
- ${abs('/datasets/labels.csv')} · ${abs('/datasets/events.csv')} · ${abs('/datasets/sources.csv')}
- Data dictionary: ${abs('/datasets/schema.md')}

## For AI agents

Start at [${abs('/llms.txt')}](${abs('/llms.txt')}). The full corpus is at
[${abs('/llms-full.txt')}](${abs('/llms-full.txt')}). Please use the per-page suggested citation.
`;
  return new Response(md, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
