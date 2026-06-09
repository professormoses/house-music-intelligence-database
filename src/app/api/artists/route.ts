import { listArtists, type ArtistFilter } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const u = new URL(req.url);
  const g = (k: string) => u.searchParams.get(k) || undefined;
  const b = (k: string) => (u.searchParams.get(k) === '1' || u.searchParams.get(k) === 'true' ? true : undefined);
  const n = (k: string) => {
    const v = u.searchParams.get(k);
    return v ? parseInt(v, 10) : undefined;
  };

  const filter: ArtistFilter = {
    q: g('q'), genre: g('genre'), city: g('city'), country: g('country'), scene: g('scene'),
    label: g('label'), minListeners: n('minListeners'),
    hasContact: b('hasContact'), hasUpcoming: b('hasUpcoming'), labelOwner: b('labelOwner'),
    female: b('female'), emerging: b('emerging'), legend: b('legend'), blackLineage: b('blackLineage'),
    sort: (g('sort') as ArtistFilter['sort']) || 'priority',
    page: n('page') || 1, pageSize: n('pageSize') || 25,
  };

  const result = await listArtists(filter);
  return Response.json(
    { ...result, filter, generated_at: new Date().toISOString() },
    { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=120' } },
  );
}
