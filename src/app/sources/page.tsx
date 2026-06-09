import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { prettyDate } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Data Sources',
  description: 'Every source the House Music Intelligence Database is built from, with API and compliance status.',
};

const TYPE_ORDER = ['catalog', 'streaming', 'charts', 'playlists', 'events', 'label', 'press', 'tracklists', 'reference', 'social', 'links', 'community', 'web', 'search'];

export default async function SourcesPage() {
  const sources = await prisma.source.findMany({ orderBy: { sourceName: 'asc' } });
  const grouped = new Map<string, typeof sources>();
  for (const s of sources) grouped.set(s.sourceType, [...(grouped.get(s.sourceType) ?? []), s]);
  const types = [...grouped.keys()].sort((a, b) => {
    const ai = TYPE_ORDER.indexOf(a), bi = TYPE_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const apiCount = sources.filter((s) => s.apiAvailable).length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Data Sources</h1>
          <a href="/sources.md" className="font-mono text-xs px-2 py-1 border border-edge rounded">.md</a>
        </div>
        <p className="text-muted max-w-3xl">
          The {sources.length} sources the House Music Intelligence Database is built from —{' '}
          {apiCount} with official APIs. We are <strong className="text-zinc-200">API-first and compliance-first</strong>:
          we use official APIs where available, respect robots.txt, rate limits and Terms of Service,
          and never bypass logins, paywalls, or anti-bot systems. We collect only public information.
        </p>
      </header>

      {types.map((type) => (
        <section key={type}>
          <h2 className="text-lg font-semibold text-accent2 mb-2 capitalize">{type}</h2>
          <div className="overflow-x-auto border border-edge rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-edge">
                  <th className="p-2">Source</th>
                  <th className="p-2">API</th>
                  <th className="p-2">Automated access</th>
                  <th className="p-2">Rate limit</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {grouped.get(type)!.map((s) => (
                  <tr key={s.id} className="border-b border-edge/40">
                    <td className="p-2 font-medium">{s.baseUrl ? <a href={s.baseUrl} className="hover:text-accent">{s.sourceName}</a> : s.sourceName}</td>
                    <td className="p-2">{s.apiAvailable ? <span className="text-accent2">API</span> : <span className="text-muted">—</span>}</td>
                    <td className="p-2">{s.scrapingAllowed ? '✅ allowed' : s.apiAvailable ? 'via API' : 'manual / per-site'}</td>
                    <td className="p-2 text-muted">{s.rateLimit}</td>
                    <td className="p-2 text-muted">{s.status}{s.lastCrawledAt ? ` · ${prettyDate(s.lastCrawledAt.slice(0, 10))}` : ''}</td>
                    <td className="p-2 text-muted text-xs max-w-md">{s.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
