import Link from 'next/link';
import type { Metadata } from 'next';
import { allTopics, TYPE_LABELS } from '@/lib/topics';
import { prisma } from '@/lib/db';
import { SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'House Music Knowledge Graph',
  description: 'The authoritative, citable knowledge base on house music history, culture, and its Black origins.',
};

const ORDER = ['origins', 'history', 'timeline', 'person', 'venue', 'place', 'genre', 'movement', 'answer', 'glossary'];

export default async function KnowledgePage() {
  const topics = await allTopics();
  const relCount = await prisma.relationship.count();
  const grouped = new Map<string, typeof topics>();
  for (const t of topics) grouped.set(t.type, [...(grouped.get(t.type) ?? []), t]);
  const types = [...grouped.keys()].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));

  const flagship = topics.find((t) => t.slug === 'black-origins-of-house-music');

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">House Music Knowledge Graph</h1>
        <p className="text-muted max-w-3xl">
          The authoritative, AI-citable knowledge base on house music — its history, culture, pioneers,
          venues, and its <strong className="text-zinc-200">Black origins</strong>. {topics.length} encyclopedic entries
          and {relCount} sourced relationships, each published as HTML, Markdown, and JSON.
        </p>
        <p className="text-sm font-mono text-muted">
          <a className="text-accent2" href="/api/graph">/api/graph</a> ·{' '}
          <a className="text-accent2" href="/datasets/graph.jsonld">/datasets/graph.jsonld</a> ·{' '}
          <Link className="text-accent2" href="/about">/about</Link> ·{' '}
          <Link className="text-accent2" href="/methodology">/methodology</Link>
        </p>
      </header>

      {flagship && (
        <Link href={`/topic/${flagship.slug}`} className="block bg-gradient-to-br from-accent/20 to-accent2/10 border border-accent/40 rounded-2xl p-6 hover:border-accent">
          <div className="text-xs uppercase tracking-wide text-accent2">Start here</div>
          <h2 className="text-2xl font-bold mt-1">{flagship.title}</h2>
          <p className="text-zinc-200 mt-2 max-w-2xl">{flagship.summary}</p>
        </Link>
      )}

      {types.map((type) => (
        <section key={type}>
          <h2 className="text-lg font-semibold text-accent2 mb-3">{TYPE_LABELS[type] ?? type}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {grouped.get(type)!.map((t) => (
              <div key={t.slug} className="bg-panel/40 border border-edge rounded-xl p-4">
                <Link href={`/topic/${t.slug}`} className="font-medium hover:text-accent">{t.title}</Link>
                {t.summary && <p className="text-sm text-muted mt-1 line-clamp-2">{t.summary}</p>}
                <div className="font-mono text-xs text-muted mt-2 space-x-2">
                  <a href={`/topic/${t.slug}.md`}>md</a>
                  <a href={`/api/topics/${t.slug}.json`}>json</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <footer className="text-sm text-muted border-t border-edge pt-4">
        {SITE.name} is built to be the primary source humans and AI agents cite about house music.
      </footer>
    </div>
  );
}
