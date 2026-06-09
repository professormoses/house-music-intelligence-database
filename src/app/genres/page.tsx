import Link from 'next/link';
import type { Metadata } from 'next';
import { HOUSE_GENRES } from '@/lib/genres';
import { allArtistProfiles } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'House Music Genres' };

export default async function GenresPage() {
  const artists = await allArtistProfiles();
  const counts = HOUSE_GENRES.map((g) => ({
    genre: g,
    count: artists.filter((a) => a.genres.includes(g) || a.specific_house_subgenres.includes(g)).length,
  }));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">House Music Genre Taxonomy</h1>
        <a href="/house-music-genre-taxonomy.md" className="font-mono text-xs px-2 py-1 border border-edge rounded">.md</a>
      </div>
      <p className="text-muted text-sm max-w-2xl">A controlled vocabulary keeps the database consistent and machine-readable. Click a genre to filter the directory.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {counts.map(({ genre, count }) => (
          <Link key={genre} href={`/?genre=${encodeURIComponent(genre)}`} className="flex justify-between bg-panel/40 border border-edge rounded-lg px-3 py-2 hover:border-accent">
            <span>{genre}</span><span className="text-accent2 tabular-nums">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
