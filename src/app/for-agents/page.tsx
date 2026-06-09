import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'For AI Agents' };

const GROUPS: [string, [string, string][]][] = [
  ['Start here', [['/llms.txt', 'Entry point + link index'], ['/llms-full.txt', 'Entire corpus inline'], ['/api/docs.md', 'API docs'], ['/openapi.json', 'OpenAPI spec']]],
  ['Knowledge graph', [['/knowledge.md', 'Knowledge index'], ['/topic/black-origins-of-house-music.md', 'Black origins of house'], ['/topic/history-of-house-music.md', 'History'], ['/answers.md', 'Direct answers (FAQ)'], ['/api/graph', 'Graph nodes + edges'], ['/datasets/graph.jsonld', 'Graph as linked data']]],
  ['Markdown indexes', [['/artists.md', 'All artists'], ['/labels.md', 'All labels'], ['/genres.md', 'Genres'], ['/cities.md', 'Cities'], ['/scenes.md', 'Scenes'], ['/black-house-music-lineage.md', 'Black house lineage'], ['/house-music-genre-taxonomy.md', 'Genre taxonomy'], ['/top-house-djs.md', 'Top house DJs'], ['/top-afro-house-djs.md', 'Top Afro House'], ['/emerging-house-producers.md', 'Emerging producers']]],
  ['Per-entity', [['/artist/black-coffee', 'HTML profile'], ['/artist/black-coffee.md', 'Markdown profile'], ['/api/artists/black-coffee.json', 'JSON profile']]],
  ['Datasets', [['/datasets/artists.csv', 'CSV'], ['/datasets/artists.json', 'JSON'], ['/datasets/artists.ndjson', 'NDJSON'], ['/datasets/schema.md', 'Data dictionary']]],
  ['Crawl infrastructure', [['/robots.txt', 'robots'], ['/sitemap.xml', 'sitemap index'], ['/sitemap-artists.xml', 'artist sitemap'], ['/feed.xml', 'updates feed'], ['/api/changed-since?date=2026-01-01', 'incremental sync']]],
];

export default function ForAgentsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Built for AI agents</h1>
        <p className="text-muted max-w-3xl">
          Every entity exists in three forms — a human HTML page, a clean Markdown mirror (append
          <code className="font-mono text-accent2"> .md</code>), and a JSON API endpoint. Every fact carries a
          source URL, a confidence score, and a last-verified date. Quote freely; cite with the block on each page.
        </p>
      </header>
      {GROUPS.map(([title, links]) => (
        <section key={title}>
          <h2 className="text-lg font-semibold text-accent2 mb-2">{title}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="flex justify-between items-center bg-panel/40 border border-edge rounded-lg px-4 py-2 hover:border-accent">
                <span className="text-sm">{label}</span><span className="font-mono text-xs text-muted">{href}</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
