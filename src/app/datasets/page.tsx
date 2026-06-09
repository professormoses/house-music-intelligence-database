import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Datasets & Downloads' };

const FILES = [
  ['Artists (CSV)', '/datasets/artists.csv'],
  ['Artists (JSON)', '/datasets/artists.json'],
  ['Artists (NDJSON)', '/datasets/artists.ndjson'],
  ['Labels (CSV)', '/datasets/labels.csv'],
  ['Labels (JSON)', '/datasets/labels.json'],
  ['Events (CSV)', '/datasets/events.csv'],
  ['Events (JSON)', '/datasets/events.json'],
  ['Contacts (CSV)', '/datasets/contacts.csv'],
  ['Sources (CSV)', '/datasets/sources.csv'],
  ['Change log (CSV)', '/datasets/change-log.csv'],
  ['Knowledge graph (JSON)', '/datasets/graph.json'],
  ['Knowledge graph (JSON-LD)', '/datasets/graph.jsonld'],
  ['Topics / encyclopedia (JSON)', '/datasets/topics.json'],
  ['Data dictionary (MD)', '/datasets/schema.md'],
];

export default function DatasetsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Datasets & Downloads</h1>
      <p className="text-muted max-w-2xl text-sm">
        Bulk exports of the entire database. Free to reuse with attribution. Every row links back to
        its canonical page and carries confidence + last-verified metadata. See the{' '}
        <a href="/datasets/schema.md" className="text-accent underline">data dictionary</a>.
      </p>
      <div className="grid sm:grid-cols-2 gap-2">
        {FILES.map(([label, href]) => (
          <a key={href} href={href} className="flex justify-between items-center bg-panel/40 border border-edge rounded-lg px-4 py-3 hover:border-accent">
            <span>{label}</span><span className="font-mono text-xs text-accent2">{href}</span>
          </a>
        ))}
      </div>
      <div className="text-sm text-muted">
        Programmatic access: <a className="text-accent underline" href="/api/docs.md">/api/docs.md</a> ·{' '}
        <a className="text-accent underline" href="/openapi.json">/openapi.json</a>
      </div>
    </div>
  );
}
