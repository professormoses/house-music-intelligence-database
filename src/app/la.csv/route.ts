import { prisma } from '@/lib/db';
import { serializeArtist } from '@/lib/serialize';

export const dynamic = 'force-dynamic';

const REGIONS = ['Greater LA', 'San Diego', 'Inland Empire'];

function csvCell(v: unknown) {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// Public outreach export for the LA scene OS: names + city + genres + public
// social handles (no private contact emails). Filter with ?area=Greater LA etc.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const areaParam = url.searchParams.get('area');
  const where: any = { region: areaParam && REGIONS.includes(areaParam) ? areaParam : { in: REGIONS } };

  const rows = await prisma.artist.findMany({ where, orderBy: { artistName: 'asc' } });
  const header = ['name', 'region', 'city', 'genres', 'instagram', 'soundcloud', 'website', 'profile_url'];
  const lines = [header.join(',')];
  for (const r of rows) {
    const p = serializeArtist(r);
    lines.push(
      [
        p.artist_name,
        r.region,
        p.origin_city || p.current_city || '',
        (p.genres || []).join(' | '),
        p.instagram || '',
        p.soundcloud || '',
        p.website || '',
        `https://house-music-intelligence-database.vercel.app/artist/${r.slug}`,
      ]
        .map(csvCell)
        .join(','),
    );
  }
  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="la-house-scene${areaParam ? '-' + areaParam.replace(/\s+/g, '-').toLowerCase() : ''}.csv"`,
    },
  });
}
