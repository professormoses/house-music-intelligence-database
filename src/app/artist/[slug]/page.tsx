import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getArtist } from '@/lib/queries';
import { redactContacts } from '@/lib/serialize';
import { checkTokenValue, ADMIN_COOKIE } from '@/lib/auth';
import { abs, prettyDate } from '@/lib/site';
import { prisma } from '@/lib/db';
import { edgesForSlug } from '@/lib/graph';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getArtist(params.slug);
  if (!a) return { title: 'Not found' };
  const title = `${a.artist_name} — House Music Artist Profile`;
  const desc = a.bio_short || `${a.artist_name}: ${a.genres.join(', ')} artist from ${a.origin_country ?? ''}.`;
  return {
    title,
    description: desc,
    alternates: { canonical: abs(`/artist/${a.slug}`), types: { 'text/markdown': abs(`/artist/${a.slug}.md`) } },
    openGraph: { title, description: desc, url: abs(`/artist/${a.slug}`), type: 'profile' },
  };
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) =>
  children ? (
    <div className="flex gap-2 text-sm py-1 border-b border-edge/30">
      <span className="text-muted w-40 shrink-0">{label}</span>
      <span className="text-zinc-200">{children}</span>
    </div>
  ) : null;

const ext = (url?: string | null, label?: string) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 mr-3 inline-block">
      {label ?? url}
    </a>
  ) : null;

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  let a = await getArtist(params.slug);
  if (!a) notFound();
  // Contact emails are private — only admins (signed in) see them on the page.
  const isAdmin = checkTokenValue(cookies().get(ADMIN_COOKIE)?.value);
  if (!isAdmin) a = redactContacts(a);

  const releases = await prisma.artistRelease.findMany({
    where: { artist: { slug: params.slug } },
    orderBy: { releaseDate: 'desc' },
  });
  const edges = await edgesForSlug(params.slug);

  const sameAs = [
    a.website, a.instagram, a.spotify, a.soundcloud, a.beatport, a.discogs,
    a.musicbrainz, a.resident_advisor, a.wikipedia, a.wikidata, a.bandcamp, a.youtube,
  ].filter(Boolean) as string[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'MusicGroup'],
    name: a.artist_name,
    alternateName: a.aliases,
    url: abs(`/artist/${a.slug}`),
    sameAs,
    genre: a.genres,
    description: a.bio_short,
    foundingLocation: a.origin_city ? { '@type': 'Place', name: [a.origin_city, a.origin_country].filter(Boolean).join(', ') } : undefined,
    memberOf: a.record_label_owned ? { '@type': 'Organization', name: a.record_label_owned } : undefined,
    subjectOf: a.wikipedia ? { '@type': 'WebPage', url: a.wikipedia } : undefined,
    mainEntityOfPage: abs(`/artist/${a.slug}`),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Directory', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: a.artist_name, item: abs(`/artist/${a.slug}`) },
    ],
  };

  return (
    <article className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="text-sm text-muted"><Link href="/">Directory</Link> / <span className="text-white">{a.artist_name}</span></nav>

      <header className="space-y-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">{a.artist_name}</h1>
            {a.real_name && a.real_name !== a.artist_name && <p className="text-muted">{a.real_name}</p>}
          </div>
          <div className="font-mono text-xs space-x-3 pt-2">
            <a href={`/artist/${a.slug}.md`} className="px-2 py-1 border border-edge rounded">.md</a>
            <a href={`/api/artists/${a.slug}.json`} className="px-2 py-1 border border-edge rounded">.json</a>
          </div>
        </div>
        {a.bio_short && <p className="text-zinc-200 max-w-3xl">{a.bio_short}</p>}
        <div className="flex gap-2 flex-wrap text-xs">
          {a.genres.map((g) => (
            <Link key={g} href={`/?genre=${encodeURIComponent(g)}`} className="px-2 py-1 rounded-full bg-panel border border-edge text-muted hover:border-accent hover:text-white">{g}</Link>
          ))}
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {a.bio_long && (
            <section>
              <h2 className="text-xl font-semibold text-accent2 mb-2">Biography</h2>
              <p className="text-zinc-200 leading-relaxed">{a.bio_long}</p>
            </section>
          )}

          {(a.black_house_music_relevance || a.cultural_lineage) && (
            <section className="bg-panel/40 border border-edge rounded-xl p-4">
              <h2 className="text-xl font-semibold text-accent2 mb-2">Cultural lineage</h2>
              {a.black_house_music_relevance && <p className="text-zinc-200">{a.black_house_music_relevance}</p>}
              {a.cultural_lineage && <p className="text-muted mt-2 text-sm">{a.cultural_lineage}</p>}
            </section>
          )}

          {releases.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-accent2 mb-2">Releases</h2>
              <table className="w-full text-sm">
                <thead><tr className="text-muted text-left border-b border-edge"><th className="py-2">Title</th><th>Label</th><th>Year</th><th>Type</th></tr></thead>
                <tbody>
                  {releases.map((r) => (
                    <tr key={r.id} className="border-b border-edge/30">
                      <td className="py-2">{r.title}</td><td className="text-muted">{r.label}</td>
                      <td className="text-muted">{(r.releaseDate ?? '').slice(0, 4)}</td><td className="text-muted">{r.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-accent2 mb-2">Scores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {Object.entries(a.scores).map(([k, v]) => (
                <div key={k} className="bg-panel/40 border border-edge rounded-lg p-2">
                  <div className="text-muted text-xs">{k.replace(/_/g, ' ')}</div>
                  <div className="text-accent2 tabular-nums font-semibold">{v}<span className="text-muted text-xs">/100</span></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-accent2 mb-2">Sources & provenance</h2>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {a.source_urls.map((u) => <li key={u}><a href={u} className="text-accent underline break-all">{u}</a></li>)}
              {!a.source_urls.length && <li className="text-muted">No sources on record.</li>}
            </ul>
            {Object.keys(a.field_sources).length > 0 && (
              <table className="w-full text-xs mt-3">
                <thead><tr className="text-muted text-left border-b border-edge"><th className="py-1">Field</th><th>Value</th><th>Source</th><th>Verified</th><th>Conf.</th></tr></thead>
                <tbody>
                  {Object.entries(a.field_sources).map(([f, fs]) => (
                    <tr key={f} className="border-b border-edge/30">
                      <td className="py-1 font-mono">{f}</td>
                      <td className="text-muted">{String(fs.value ?? '')}</td>
                      <td>{fs.source_url ? <a href={fs.source_url} className="text-accent underline">{fs.source_name ?? 'source'}</a> : fs.source_name}</td>
                      <td className="text-muted">{prettyDate(fs.last_verified_date)}</td>
                      <td className="text-muted tabular-nums">{fs.confidence_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className="bg-panel/60 border border-accent/40 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">How to cite this page</h2>
            <pre className="text-xs whitespace-pre-wrap font-mono text-zinc-300">{a.suggested_citation}</pre>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="bg-panel/40 border border-edge rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Facts</h3>
            <Row label="Origin">{[a.origin_city, a.origin_country].filter(Boolean).join(', ')}</Row>
            <Row label="Based in">{[a.current_city, a.current_country].filter(Boolean).join(', ')}</Row>
            <Row label="Years active">{a.years_active}</Row>
            <Row label="Scene">{a.primary_scene}</Row>
            <Row label="Subgenres">{a.specific_house_subgenres.join(', ')}</Row>
            <Row label="Owns label">{a.record_label_owned}</Row>
            <Row label="Labels">{a.labels_affiliated.join(', ')}</Row>
            <Row label="Monthly listeners">{a.monthly_listeners?.toLocaleString()}</Row>
            <Row label="Confidence">{a.confidence_score}/100</Row>
            <Row label="Last verified">{prettyDate(a.last_verified_date)}</Row>
          </div>

          <div className="bg-panel/40 border border-edge rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Links</h3>
            <div className="text-sm">
              {ext(a.website, 'Website')}{ext(a.instagram, 'Instagram')}{ext(a.spotify, 'Spotify')}
              {ext(a.soundcloud, 'SoundCloud')}{ext(a.beatport, 'Beatport')}{ext(a.discogs, 'Discogs')}
              {ext(a.resident_advisor, 'RA')}{ext(a.wikipedia, 'Wikipedia')}
              {sameAs.length === 0 && <span className="text-muted">None on record.</span>}
            </div>
          </div>

          {edges.length > 0 && (
            <div className="bg-panel/40 border border-edge rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Knowledge graph</h3>
              <ul className="text-sm space-y-2">
                {edges.map((e) => (
                  <li key={e.id} className="leading-snug">
                    {e.direction === 'out' ? (
                      <>
                        <span className="text-muted">{e.predicateLabel}</span>{' '}
                        {e.objectUrl ? <a className="text-accent underline" href={e.objectUrl}>{e.objectName}</a> : <span>{e.objectName}</span>}
                      </>
                    ) : (
                      <>
                        <a className="text-accent underline" href={abs(`/topic/${e.subjectSlug}`)}>{e.subjectSlug.replace(/-/g, ' ')}</a>{' '}
                        <span className="text-muted">{e.predicateLabel} {a.artist_name}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {a.booking_agency || a.booking_email ? (
            <div className="bg-panel/40 border border-edge rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Booking</h3>
              <Row label="Agency">{a.booking_agency}</Row>
              <Row label="Booking email">{a.booking_email}</Row>
              <Row label="Management">{a.management_company}</Row>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
