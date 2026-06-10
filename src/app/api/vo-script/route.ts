import { isAuthorized } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getArtist, topUnprofiledArtists } from '@/lib/queries';
import { generateVoScript } from '@/lib/voscript';
import { computePopularity } from '@/lib/popularity';
import type { ArtistProfile } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function generateAndStore(p: ArtistProfile) {
  const result = await generateVoScript(p);
  const row = await prisma.voScript.create({
    data: {
      artistSlug: p.slug,
      artistName: p.artist_name,
      title: result.title,
      body: result.body,
      wordCount: result.wordCount,
      durationSec: result.durationSec,
      popularity: computePopularity(p).score,
      generator: result.generator,
      status: 'complete',
    },
  });
  return { id: row.id, artist: p.artist_name, slug: p.slug, wordCount: result.wordCount, durationSec: result.durationSec, generator: result.generator };
}

// POST { slug } -> one script ; POST { batch:true, count:5 } -> top unprofiled.
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }

  if (body.batch) {
    const count = Math.min(5, Math.max(1, parseInt(body.count ?? '5', 10)));
    const artists = await topUnprofiledArtists(count);
    const results = [];
    for (const p of artists) results.push(await generateAndStore(p));
    return Response.json({ batch: true, generated: results.length, results });
  }

  const slug = (body.slug ?? '').toString().trim();
  if (!slug) return Response.json({ error: 'missing_slug' }, { status: 400 });
  const p = await getArtist(slug);
  if (!p) return Response.json({ error: 'not_found', slug }, { status: 404 });
  // Regenerate replaces any prior script for this artist (no duplicates).
  await prisma.voScript.deleteMany({ where: { artistSlug: slug } });
  const result = await generateAndStore(p);
  return Response.json({ batch: false, ...result });
}
