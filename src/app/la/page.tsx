import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { serializeArtist, toSummary } from '@/lib/serialize';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'LA House Scene — Los Angeles, San Diego & Inland Empire DJs',
  description:
    'The Southern California house music directory: DJs and producers across Greater LA, San Diego and the Inland Empire, with links for outreach.',
};

const REGIONS = ['Greater LA', 'San Diego', 'Inland Empire'] as const;

function igHandle(url?: string | null) {
  if (!url) return null;
  const m = url.match(/instagram\.com\/([^/?#]+)/i);
  return m ? `@${m[1]}` : null;
}

export default async function LAPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const area = REGIONS.includes(searchParams.area as any) ? (searchParams.area as string) : undefined;
  const q = searchParams.q?.trim();

  const where: any = { region: area ? area : { in: REGIONS as unknown as string[] } };
  if (q) where.AND = [{ OR: [{ artistName: { contains: q } }, { realName: { contains: q } }, { currentCity: { contains: q } }, { originCity: { contains: q } }] }];

  const rows = await prisma.artist.findMany({ where });
  const artists = rows
    .map((r) => {
      const p = serializeArtist(r);
      return { ...toSummary(p), region: r.region, current_city: p.current_city, instagram: p.instagram, soundcloud: p.soundcloud, website: p.website };
    })
    .sort((a, b) => b.popularity_score - a.popularity_score);

  const counts: Record<string, number> = {};
  for (const r of REGIONS) counts[r] = await prisma.artist.count({ where: { region: r } });
  const totalLA = counts['Greater LA'] + counts['San Diego'] + counts['Inland Empire'];
  const withIg = artists.filter((a) => a.instagram).length;

  const pill = (label: string, value?: string) => {
    const active = value === area || (!value && !area);
    const params = new URLSearchParams();
    if (value) params.set('area', value);
    if (q) params.set('q', q);
    return (
      <Link
        href={`/la${params.toString() ? `?${params}` : ''}`}
        className={`px-4 py-1.5 rounded-full text-sm border transition ${active ? 'bg-accent border-accent text-white' : 'border-edge text-muted hover:border-accent hover:text-white'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent2">World Famous House Crew · Client radar</p>
        <h1 className="text-3xl font-bold">LA House Scene</h1>
        <p className="text-muted max-w-3xl">
          Our home turf. Every house DJ and producer we&apos;ve mapped across{' '}
          <strong className="text-zinc-200">Greater Los Angeles, San Diego and the Inland Empire</strong> — built so we
          can find them, follow them, and turn them into clients. New artists are added every week automatically.
        </p>
        <p className="text-sm font-mono text-muted">
          {totalLA} SoCal artists · {withIg} with Instagram for outreach ·{' '}
          <a href={`/la.csv${area ? `?area=${encodeURIComponent(area)}` : ''}`} className="text-accent2">download CSV →</a>
        </p>
      </section>

      <div className="grid sm:grid-cols-3 gap-3">
        {REGIONS.map((r) => (
          <Link key={r} href={`/la?area=${encodeURIComponent(r)}`} className="glass rounded-2xl p-5 hover:border-accent transition">
            <span className="block text-2xl font-bold text-white tabular-nums">{counts[r]}</span>
            <span className="text-sm text-muted">{r}</span>
          </Link>
        ))}
      </div>

      <form action="/la" method="get" className="flex gap-2 flex-wrap items-center">
        {area && <input type="hidden" name="area" value={area} />}
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name or city…"
          className="flex-1 min-w-[220px] bg-ink border border-edge rounded-full px-5 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">Search</button>
      </form>

      <div className="flex gap-2 flex-wrap">
        {pill('All SoCal')}
        {pill('Greater LA', 'Greater LA')}
        {pill('San Diego', 'San Diego')}
        {pill('Inland Empire', 'Inland Empire')}
      </div>

      <div>
        <p className="text-sm text-muted mb-2">{artists.length} result{artists.length === 1 ? '' : 's'}</p>
        <div className="overflow-x-auto border border-edge rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-edge">
                <th className="p-3">Artist</th>
                <th className="p-3">Area</th>
                <th className="p-3">City</th>
                <th className="p-3">Genres</th>
                <th className="p-3">Instagram</th>
                <th className="p-3">Links</th>
                <th className="p-3 text-right">Priority</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((a) => (
                <tr key={a.slug} className="border-b border-edge/40 hover:bg-panel/40">
                  <td className="p-3 font-medium">
                    <Link href={`/artist/${a.slug}`} className="hover:text-accent">{a.artist_name}</Link>
                  </td>
                  <td className="p-3 text-muted">
                    <Link href={`/la?area=${encodeURIComponent(a.region || '')}`} className="hover:text-accent">{a.region}</Link>
                  </td>
                  <td className="p-3 text-muted">{a.origin_city || a.current_city || ''}</td>
                  <td className="p-3 text-muted">
                    {a.genres.slice(0, 3).map((g, i, arr) => (
                      <span key={g}>
                        <Link href={`/?genre=${encodeURIComponent(g)}`} className="hover:text-accent hover:underline">{g}</Link>
                        {i < arr.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="p-3">
                    {a.instagram ? (
                      <a href={a.instagram} target="_blank" rel="noreferrer" className="text-accent2 hover:underline">{igHandle(a.instagram)}</a>
                    ) : (
                      <span className="text-edge">—</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-xs space-x-2">
                    {a.soundcloud && <a href={a.soundcloud} target="_blank" rel="noreferrer" className="hover:text-accent">sc</a>}
                    {a.website && <a href={a.website} target="_blank" rel="noreferrer" className="hover:text-accent">web</a>}
                    <a href={`/api/artists/${a.slug}.json`} className="hover:text-accent">json</a>
                  </td>
                  <td className="p-3 text-right tabular-nums text-accent2">{a.house_crew_priority_score}</td>
                </tr>
              ))}
              {!artists.length && (
                <tr><td colSpan={7} className="p-6 text-center text-muted">No SoCal artists match. New ones are discovered weekly.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
