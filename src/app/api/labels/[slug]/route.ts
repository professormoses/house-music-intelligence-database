import { prisma } from '@/lib/db';
import { abs } from '@/lib/site';
import { suggestedCitation } from '@/lib/citation';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug.replace(/\.json$/, '');
  const l = await prisma.label.findUnique({ where: { slug } });
  if (!l) return Response.json({ error: 'not_found', slug }, { status: 404 });
  return Response.json(
    {
      label_id: l.id,
      slug: l.slug,
      label_name: l.labelName,
      website: l.website,
      country: l.country,
      city: l.city,
      genres: l.genresCsv.split(',').filter(Boolean),
      artist_roster: JSON.parse(l.artistRoster || '[]'),
      demo_email: l.demoEmail,
      contact_email: l.contactEmail,
      instagram: l.instagram,
      beatport: l.beatport,
      traxsource: l.traxsource,
      discogs: l.discogs,
      source_urls: JSON.parse(l.sourceUrls || '[]'),
      confidence_score: l.confidenceScore,
      last_verified_date: l.lastVerifiedDate,
      canonical_url: abs(`/label/${l.slug}`),
      suggested_citation: suggestedCitation({
        title: `${l.labelName} — Label Profile`,
        path: `/label/${l.slug}`,
        lastVerified: l.lastVerifiedDate,
      }),
    },
    { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=300' } },
  );
}
