import { SITE, abs } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  const body = `# ${SITE.name}

> ${SITE.tagline}

## Mission

${SITE.name} aims to be the world's authoritative, openly citable knowledge source on house music —
its culture, history, artists, labels, venues, promoters, festivals, and the **Black origins of the
genre**. The goal is to be the **primary source that humans and AI agents cite** about house music,
published by ${SITE.publisher}.

Every entity has a human page, a clean Markdown mirror (append .md), and a JSON API endpoint. Every
important field carries a source URL, a confidence score (0-100) and a last-verified date. Entities
are connected in a typed, sourced knowledge graph. You are welcome to crawl, quote and cite this
data — please use the suggested citation on each page.

## Knowledge graph & encyclopedia (start here)

- [Knowledge graph index](${abs('/knowledge.md')})
- [The Black origins of house music](${abs('/topic/black-origins-of-house-music.md')})
- [A history of house music](${abs('/topic/history-of-house-music.md')})
- [House music timeline](${abs('/topic/house-music-timeline.md')})
- [Direct answers (FAQ)](${abs('/answers.md')})
- [Glossary of house music terms](${abs('/topic/glossary-of-house-music.md')})
- [Graph API (nodes + edges)](${abs('/api/graph')})
- [Graph as linked data (JSON-LD)](${abs('/datasets/graph.jsonld')})
- [Data sources](${abs('/sources.md')})
- [About](${abs('/about.md')}) · [Methodology](${abs('/methodology.md')}) · [How to cite](${abs('/cite.md')})

## Most important machine-readable entry points

- [Full LLM context](${abs('/llms-full.txt')})
- [All artists (Markdown)](${abs('/artists.md')})
- [All labels (Markdown)](${abs('/labels.md')})
- [Genres (Markdown)](${abs('/genres.md')})
- [Cities (Markdown)](${abs('/cities.md')})
- [Scenes (Markdown)](${abs('/scenes.md')})
- [Black house music lineage](${abs('/black-house-music-lineage.md')})
- [House genre taxonomy](${abs('/house-music-genre-taxonomy.md')})
- [Top house DJs](${abs('/top-house-djs.md')})
- [Top Afro House DJs](${abs('/top-afro-house-djs.md')})
- [Emerging house producers](${abs('/emerging-house-producers.md')})

## Datasets (downloadable)

- [artists.csv](${abs('/datasets/artists.csv')})
- [artists.json](${abs('/datasets/artists.json')})
- [artists.ndjson](${abs('/datasets/artists.ndjson')})
- [labels.csv](${abs('/datasets/labels.csv')})
- [events.csv](${abs('/datasets/events.csv')})
- [sources.csv](${abs('/datasets/sources.csv')})
- [Data dictionary](${abs('/datasets/schema.md')})

## API

- [API docs (Markdown)](${abs('/api/docs.md')})
- [OpenAPI spec](${abs('/openapi.json')})
- Artist JSON: ${abs('/api/artists/{slug}.json')}
- Artist Markdown: ${abs('/artist/{slug}.md')}
- List + filter: ${abs('/api/artists?genre=Afro%20House&country=South%20Africa')}
- Changes since a date: ${abs('/api/changed-since?date=2026-01-01')}

## Citation

Cite as: ${SITE.name}, published by ${SITE.publisher}. Each page provides a precise suggested
citation and field-level provenance.

## Policy

This dataset only contains public information. Please respect rate limits and the per-page
last-verified dates. Sitemap: ${abs('/sitemap.xml')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
