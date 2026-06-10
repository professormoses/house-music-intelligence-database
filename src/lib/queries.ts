import { prisma } from './db';
import { serializeArtist, toSummary } from './serialize';
import type { Prisma } from '@prisma/client';

export interface ArtistFilter {
  q?: string;
  city?: string;
  country?: string;
  genre?: string; // matched against genresCsv + subgenresCsv
  scene?: string;
  label?: string;
  minListeners?: number;
  hasContact?: boolean;
  hasUpcoming?: boolean;
  labelOwner?: boolean;
  female?: boolean;
  emerging?: boolean;
  legend?: boolean;
  blackLineage?: boolean;
  sort?: 'priority' | 'reach' | 'name' | 'recent' | 'popularity';
  page?: number;
  pageSize?: number;
}

export function buildWhere(f: ArtistFilter): Prisma.ArtistWhereInput {
  const AND: Prisma.ArtistWhereInput[] = [];
  if (f.q)
    AND.push({
      OR: [
        { artistName: { contains: f.q } },
        { realName: { contains: f.q } },
        { slug: { contains: f.q.toLowerCase().replace(/\s+/g, '-') } },
      ],
    });
  if (f.city) AND.push({ OR: [{ originCity: { contains: f.city } }, { currentCity: { contains: f.city } }] });
  if (f.country)
    AND.push({ OR: [{ originCountry: { contains: f.country } }, { currentCountry: { contains: f.country } }] });
  if (f.genre) {
    const g = f.genre.toLowerCase();
    AND.push({ OR: [{ genresCsv: { contains: g } }, { subgenresCsv: { contains: g } }] });
  }
  if (f.scene) AND.push({ primaryScene: { contains: f.scene } });
  if (f.label) AND.push({ profile: { contains: f.label } });
  if (f.minListeners) AND.push({ monthlyListeners: { gte: f.minListeners } });
  if (f.hasContact) AND.push({ hasContact: true });
  if (f.hasUpcoming) AND.push({ hasUpcoming: true });
  if (f.labelOwner) AND.push({ isLabelOwner: true });
  if (f.female) AND.push({ isFemale: true });
  if (f.emerging) AND.push({ isEmerging: true });
  if (f.legend) AND.push({ isLegend: true });
  if (f.blackLineage) AND.push({ blackLineage: true });
  return AND.length ? { AND } : {};
}

export async function listArtists(f: ArtistFilter) {
  const page = Math.max(1, f.page ?? 1);
  const pageSize = Math.min(200, Math.max(1, f.pageSize ?? 25));
  const where = buildWhere(f);

  // Popularity is a computed (log-scaled, 7-parameter) value, so rank globally
  // in JS rather than at the DB level.
  if (f.sort === 'popularity') {
    const rows = await prisma.artist.findMany({ where });
    const all = rows
      .map((r) => toSummary(serializeArtist(r)))
      .sort((a, b) => b.popularity_score - a.popularity_score);
    const total = all.length;
    const start = (page - 1) * pageSize;
    return { total, page, pageSize, pages: Math.ceil(total / pageSize), artists: all.slice(start, start + pageSize) };
  }

  const orderBy: Prisma.ArtistOrderByWithRelationInput =
    f.sort === 'name'
      ? { artistName: 'asc' }
      : f.sort === 'reach'
        ? { monthlyListeners: 'desc' }
        : f.sort === 'recent'
          ? { updatedAt: 'desc' }
          : { confidenceScore: 'desc' };

  const [total, rows] = await Promise.all([
    prisma.artist.count({ where }),
    prisma.artist.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize }),
  ]);

  let summaries = rows.map((r) => toSummary(serializeArtist(r)));
  if (f.sort === 'priority' || !f.sort)
    summaries = summaries.sort((a, b) => b.house_crew_priority_score - a.house_crew_priority_score);

  return { total, page, pageSize, pages: Math.ceil(total / pageSize), artists: summaries };
}

export async function getArtist(slug: string) {
  const row = await prisma.artist.findUnique({ where: { slug } });
  return row ? serializeArtist(row) : null;
}

export async function allArtistProfiles() {
  const rows = await prisma.artist.findMany({ orderBy: { artistName: 'asc' } });
  return rows.map(serializeArtist);
}

export async function allArtistSlugs() {
  return prisma.artist.findMany({ select: { slug: true, updatedAt: true } });
}

// Top-N most popular artists that don't yet have a VO script — for batching.
export async function topUnprofiledArtists(n: number) {
  const [rows, scripts] = await Promise.all([
    prisma.artist.findMany(),
    prisma.voScript.findMany({ select: { artistSlug: true } }),
  ]);
  const profiled = new Set(scripts.map((s) => s.artistSlug));
  return rows
    .map(serializeArtist)
    .filter((p) => !profiled.has(p.slug))
    .sort((a, b) => (b.popularity_score ?? 0) - (a.popularity_score ?? 0))
    .slice(0, n);
}
