import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { abs, prettyDate } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const l = await prisma.label.findUnique({ where: { slug: params.slug } });
  if (!l) return { title: 'Not found' };
  return {
    title: `${l.labelName} — House Music Label`,
    description: `${l.labelName}: ${l.country ?? ''} house music label.`,
    alternates: { canonical: abs(`/label/${l.slug}`), types: { 'text/markdown': abs(`/label/${l.slug}.md`) } },
  };
}

export default async function LabelPage({ params }: { params: { slug: string } }) {
  const l = await prisma.label.findUnique({ where: { slug: params.slug } });
  if (!l) notFound();
  const roster: string[] = JSON.parse(l.artistRoster || '[]');
  const sources: string[] = JSON.parse(l.sourceUrls || '[]');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: l.labelName,
    url: l.website ?? abs(`/label/${l.slug}`),
    sameAs: [l.instagram, l.discogs, l.beatport].filter(Boolean),
    address: l.country ? { '@type': 'PostalAddress', addressCountry: l.country } : undefined,
    mainEntityOfPage: abs(`/label/${l.slug}`),
  };

  return (
    <article className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-muted"><Link href="/labels">Labels</Link> / <span className="text-white">{l.labelName}</span></nav>
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">{l.labelName}</h1>
          <p className="text-muted">{[l.city, l.country].filter(Boolean).join(', ')}</p>
        </div>
        <div className="font-mono text-xs space-x-3 pt-2">
          <a href={`/label/${l.slug}.md`} className="px-2 py-1 border border-edge rounded">.md</a>
          <a href={`/api/labels/${l.slug}.json`} className="px-2 py-1 border border-edge rounded">.json</a>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-panel/40 border border-edge rounded-xl p-4 space-y-2 text-sm">
          <p><span className="text-muted">Genres:</span> {l.genresCsv.split(',').filter(Boolean).join(', ')}</p>
          <p><span className="text-muted">Website:</span> {l.website ? <a className="text-accent underline" href={l.website}>{l.website}</a> : '—'}</p>
          <p><span className="text-muted">Demo email:</span> {l.demoEmail ?? '—'}</p>
          <p><span className="text-muted">Contact:</span> {l.contactEmail ?? '—'}</p>
          <p><span className="text-muted">Confidence:</span> {l.confidenceScore}/100</p>
          <p><span className="text-muted">Last verified:</span> {prettyDate(l.lastVerifiedDate)}</p>
        </div>
        <div className="bg-panel/40 border border-edge rounded-xl p-4">
          <h2 className="font-semibold mb-2">Roster</h2>
          <ul className="text-sm space-y-1">
            {roster.map((r) => <li key={r}>{r}</li>)}
            {!roster.length && <li className="text-muted">None on record.</li>}
          </ul>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">Sources</h2>
        <ul className="text-sm list-disc pl-5">
          {sources.map((s) => <li key={s}><a className="text-accent underline break-all" href={s}>{s}</a></li>)}
          {!sources.length && <li className="text-muted">None on record.</li>}
        </ul>
      </section>
    </article>
  );
}
