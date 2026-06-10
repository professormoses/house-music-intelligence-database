import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { checkTokenValue, adminToken, ADMIN_COOKIE } from '@/lib/auth';
import { connectorStatus } from '@/connectors/registry';
import AdminActions from '@/components/AdminActions';
import BuildPanel from '@/components/BuildPanel';
import ReelStudio from '@/components/ReelStudio';
import { prettyDate } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin', robots: { index: false } };

export default async function AdminPage({ searchParams }: { searchParams: { token?: string; error?: string } }) {
  const cookieToken = cookies().get(ADMIN_COOKIE)?.value;
  const token = searchParams.token ?? cookieToken ?? '';
  const isDev = process.env.NODE_ENV !== 'production';
  if (!checkTokenValue(token)) {
    return (
      <div className="max-w-md mx-auto bg-panel/40 border border-edge rounded-xl p-6 space-y-4 mt-10">
        <h1 className="text-xl font-bold">Admin sign in</h1>
        {searchParams.error && <p className="text-sm text-red-400">Incorrect token — try again.</p>}
        <form action="/api/admin-login" method="post" className="space-y-3">
          <input
            name="token"
            type="password"
            defaultValue={isDev ? adminToken() : ''}
            placeholder="Admin token"
            autoFocus
            className="w-full bg-ink border border-edge rounded-lg px-3 py-2 text-sm"
          />
          <button className="w-full bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium">Sign in</button>
        </form>
        <p className="text-xs text-muted">
          {isDev
            ? 'The token is pre-filled in development — just click Sign in. You stay signed in via a cookie.'
            : 'Enter the ADMIN_TOKEN from your .env. You stay signed in via a cookie.'}
        </p>
      </div>
    );
  }

  const [artists, labels, events, venues, contacts, sources, review, dups, changes] = await Promise.all([
    prisma.artist.count(),
    prisma.label.count(),
    prisma.event.count(),
    prisma.venue.count(),
    prisma.contact.count(),
    prisma.source.findMany({ orderBy: { sourceName: 'asc' } }),
    prisma.reviewQueue.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.duplicateMatch.findMany({ where: { status: 'pending' }, take: 20 }),
    prisma.changeLog.findMany({ orderBy: { createdAt: 'desc' }, take: 15 }),
  ]);

  const connectors = connectorStatus();
  const lowConfidence = await prisma.artist.findMany({ where: { confidenceScore: { lt: 60 } }, select: { slug: true, artistName: true, confidenceScore: true }, orderBy: { confidenceScore: 'asc' } });

  const Stat = ({ label, value }: { label: string; value: number | string }) => (
    <div className="bg-panel/40 border border-edge rounded-xl p-4">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <a href="/api/admin-login?logout=1" className="text-xs text-muted hover:text-white border border-edge rounded px-3 py-1">Sign out</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <Stat label="Artists" value={artists} />
        <Stat label="Labels" value={labels} />
        <Stat label="Events" value={events} />
        <Stat label="Venues" value={venues} />
        <Stat label="Contacts" value={contacts} />
        <Stat label="Review queue" value={review.length} />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-accent2">🎬 Reel Studio — 55s VO scripts</h2>
        <ReelStudio token={token} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-accent2">Build the database</h2>
        <BuildPanel token={token} sources={sources.map((s) => s.sourceName)} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-accent2">Pipeline</h2>
        <AdminActions token={token} />
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold text-accent2 mb-2">Connector status</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-muted text-left border-b border-edge"><th className="py-1">Connector</th><th>Configured</th><th>Compliant</th><th>Enrich</th></tr></thead>
            <tbody>
              {connectors.map((c) => (
                <tr key={c.name} className="border-b border-edge/30">
                  <td className="py-1">{c.name}</td>
                  <td>{c.configured ? '✅' : '—'}</td>
                  <td>{c.compliant ? '✅' : '⛔'}</td>
                  <td>{c.can_enrich ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-accent2 mb-2">Source health</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-muted text-left border-b border-edge"><th className="py-1">Source</th><th>API</th><th>Status</th><th>Last crawled</th></tr></thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} className="border-b border-edge/30">
                  <td className="py-1">{s.sourceName}</td>
                  <td>{s.apiAvailable ? '✅' : '—'}</td>
                  <td>{s.status}</td>
                  <td className="text-muted text-xs">{s.lastCrawledAt ? prettyDate(s.lastCrawledAt.slice(0, 10)) : 'never'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold text-accent2 mb-2">Review queue ({review.length})</h2>
          {review.length ? (
            <ul className="text-sm space-y-1">
              {review.map((r) => <li key={r.id} className="border-b border-edge/30 py-1">{r.entitySlug} — {r.reason} <span className="text-muted">({r.confidence})</span></li>)}
            </ul>
          ) : <p className="text-muted text-sm">Empty.</p>}
        </section>
        <section>
          <h2 className="text-lg font-semibold text-accent2 mb-2">Low-confidence artists</h2>
          <ul className="text-sm space-y-1">
            {lowConfidence.map((a) => <li key={a.slug} className="border-b border-edge/30 py-1 flex justify-between"><span>{a.artistName}</span><span className="text-muted">{a.confidenceScore}</span></li>)}
            {!lowConfidence.length && <li className="text-muted">None.</li>}
          </ul>
        </section>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-accent2 mb-2">Recent changes</h2>
        <table className="w-full text-sm">
          <thead><tr className="text-muted text-left border-b border-edge"><th className="py-1">When</th><th>Entity</th><th>Type</th><th>Detail</th></tr></thead>
          <tbody>
            {changes.map((c) => (
              <tr key={c.id} className="border-b border-edge/30">
                <td className="py-1 text-muted text-xs">{c.createdAt.toISOString().slice(0, 16).replace('T', ' ')}</td>
                <td>{c.entityType}{c.entitySlug ? ` (${c.entitySlug})` : ''}</td>
                <td>{c.changeType}</td>
                <td className="text-muted">{c.newValue ?? c.fieldName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="text-sm text-muted">
        <h2 className="text-lg font-semibold text-accent2 mb-2">Agent crawlability</h2>
        <p>Quick checks: <a className="text-accent underline" href="/llms.txt">/llms.txt</a> · <a className="text-accent underline" href="/sitemap.xml">/sitemap.xml</a> · <a className="text-accent underline" href="/openapi.json">/openapi.json</a> · <a className="text-accent underline" href="/datasets/schema.md">/datasets/schema.md</a> · {dups.length} duplicate candidates pending.</p>
      </section>
    </div>
  );
}
