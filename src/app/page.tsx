import Link from 'next/link';
import { listArtists, type ArtistFilter } from '@/lib/queries';
import { HOUSE_GENRES } from '@/lib/genres';
import { SITE, abs } from '@/lib/site';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function num(v?: string) {
  const n = v ? parseInt(v, 10) : NaN;
  return isNaN(n) ? undefined : n;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const filter: ArtistFilter = {
    q: searchParams.q,
    genre: searchParams.genre,
    country: searchParams.country,
    city: searchParams.city,
    scene: searchParams.scene,
    minListeners: num(searchParams.minListeners),
    hasContact: searchParams.hasContact === '1',
    hasUpcoming: searchParams.hasUpcoming === '1',
    labelOwner: searchParams.labelOwner === '1',
    female: searchParams.female === '1',
    emerging: searchParams.emerging === '1',
    legend: searchParams.legend === '1',
    blackLineage: searchParams.blackLineage === '1',
    sort: (searchParams.sort as ArtistFilter['sort']) || 'priority',
    page: num(searchParams.page) || 1,
    pageSize: 25,
  };

  const { artists, total, page, pages } = await listArtists(filter);
  const counts = {
    artists: await prisma.artist.count(),
    labels: await prisma.label.count(),
    events: await prisma.event.count(),
    sources: await prisma.source.count(),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    creator: { '@type': 'Organization', name: SITE.publisher },
    keywords: ['house music', 'DJs', 'producers', 'Afro House', 'Deep House', 'booking'],
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: abs('/datasets/artists.csv') },
      { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: abs('/datasets/artists.json') },
      { '@type': 'DataDownload', encodingFormat: 'application/x-ndjson', contentUrl: abs('/datasets/artists.ndjson') },
    ],
  };

  const chip = (label: string, key: string) => {
    const active = (searchParams as any)[key] === '1';
    const params = new URLSearchParams(searchParams as any);
    if (active) params.delete(key);
    else params.set(key, '1');
    params.delete('page');
    return (
      <Link
        key={key}
        href={`/?${params.toString()}`}
        className={`px-3 py-1 rounded-full text-xs border ${active ? 'bg-accent border-accent text-white' : 'border-edge text-muted hover:border-accent'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="space-y-3">
        <h1 className="text-3xl font-bold">House Music Intelligence Database</h1>
        <p className="text-muted max-w-3xl">
          The authoritative, AI-citable knowledge source on house music — its culture, history,
          artists, labels, venues, and the <strong className="text-zinc-200">Black origins</strong> of the genre.
        </p>
        <p className="text-sm text-muted font-mono">
          {counts.artists} artists · {counts.labels} labels · {counts.events} events · {counts.sources} sources ·{' '}
          <Link href="/for-agents" className="text-accent2">agent-readable →</Link>
        </p>
        <Link href="/knowledge" className="block bg-gradient-to-br from-accent/20 to-accent2/10 border border-accent/40 rounded-xl p-4 hover:border-accent max-w-3xl">
          <span className="text-xs uppercase tracking-wide text-accent2">Knowledge graph</span>
          <span className="block font-semibold mt-1">Explore the history & Black origins of house music →</span>
        </Link>
      </section>

      <form className="bg-panel/60 border border-edge rounded-xl p-4 space-y-3" action="/" method="get">
        <div className="flex gap-2 flex-wrap">
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search artists…"
            className="flex-1 min-w-[200px] bg-ink border border-edge rounded-lg px-3 py-2 text-sm"
          />
          <select name="genre" defaultValue={searchParams.genre} className="bg-ink border border-edge rounded-lg px-3 py-2 text-sm">
            <option value="">All genres</option>
            {HOUSE_GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <input name="country" defaultValue={searchParams.country} placeholder="Country" className="w-32 bg-ink border border-edge rounded-lg px-3 py-2 text-sm" />
          <select name="sort" defaultValue={filter.sort} className="bg-ink border border-edge rounded-lg px-3 py-2 text-sm">
            <option value="priority">Sort: Priority</option>
            <option value="reach">Sort: Reach</option>
            <option value="name">Sort: Name</option>
            <option value="recent">Sort: Recently updated</option>
          </select>
          <button className="bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium">Search</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {chip('Afro/Black lineage', 'blackLineage')}
          {chip('Has contact', 'hasContact')}
          {chip('Label owner', 'labelOwner')}
          {chip('Female', 'female')}
          {chip('Emerging', 'emerging')}
          {chip('Legend', 'legend')}
          {chip('Upcoming shows', 'hasUpcoming')}
        </div>
      </form>

      <section>
        <p className="text-sm text-muted mb-2">{total} result{total === 1 ? '' : 's'}</p>
        <div className="overflow-x-auto border border-edge rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-edge">
                <th className="p-3">Artist</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Scene</th>
                <th className="p-3">Genres</th>
                <th className="p-3 text-right">Listeners</th>
                <th className="p-3 text-right">Priority</th>
                <th className="p-3">Formats</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((a) => (
                <tr key={a.slug} className="border-b border-edge/40 hover:bg-panel/40">
                  <td className="p-3 font-medium">
                    <Link href={`/artist/${a.slug}`} className="hover:text-accent">{a.artist_name}</Link>
                  </td>
                  <td className="p-3 text-muted">{[a.origin_city, a.origin_country].filter(Boolean).join(', ')}</td>
                  <td className="p-3 text-muted">
                    {a.primary_scene ? (
                      <Link href={`/?scene=${encodeURIComponent(a.primary_scene)}`} className="hover:text-accent">{a.primary_scene}</Link>
                    ) : ''}
                  </td>
                  <td className="p-3 text-muted">
                    {a.genres.slice(0, 3).map((g, i) => (
                      <span key={g}>
                        <Link href={`/?genre=${encodeURIComponent(g)}`} className="hover:text-accent hover:underline">{g}</Link>
                        {i < Math.min(3, a.genres.length) - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="p-3 text-right tabular-nums">{a.monthly_listeners?.toLocaleString() ?? '—'}</td>
                  <td className="p-3 text-right tabular-nums text-accent2">{a.house_crew_priority_score}</td>
                  <td className="p-3 font-mono text-xs space-x-2">
                    <Link href={`/artist/${a.slug}`}>html</Link>
                    <a href={`/artist/${a.slug}.md`}>md</a>
                    <a href={`/api/artists/${a.slug}.json`}>json</a>
                  </td>
                </tr>
              ))}
              {!artists.length && (
                <tr><td colSpan={7} className="p-6 text-center text-muted">No artists match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex gap-2 mt-4 justify-center text-sm">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => {
              const params = new URLSearchParams(searchParams as any);
              params.set('page', String(p));
              return (
                <Link key={p} href={`/?${params.toString()}`} className={`px-3 py-1 rounded border ${p === page ? 'bg-accent border-accent' : 'border-edge text-muted'}`}>{p}</Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
