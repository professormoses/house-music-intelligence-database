import { SITE } from '@/lib/site';
import { allArtistProfiles } from '@/lib/queries';
import { artistToMarkdown } from '@/lib/format';
import { renderDoc } from '@/lib/content';
import { allTopics, topicToMarkdown } from '@/lib/topics';
import { edgesForSlug } from '@/lib/graph';
import { isDataAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// The entire corpus inlined as Markdown — a bulk dump, so it's gated behind the
// data API key. Individual pages and /llms.txt stay public for citation.
export async function GET(req: Request) {
  if (!isDataAuthorized(req)) {
    return new Response(
      `# Licensed bulk resource\n\nThe full corpus is available to licensed partners. Individual pages remain public — start at ${SITE.url}/llms.txt and crawl per-artist Markdown (/artist/{slug}.md). Request a data API key: ${SITE.url}/license\n`,
      { status: 401, headers: { 'content-type': 'text/markdown; charset=utf-8' } },
    );
  }
  const parts: string[] = [];
  parts.push(`# ${SITE.name} — Full Corpus\n\n> ${SITE.tagline}\n\nPublished by ${SITE.publisher}. Canonical: ${SITE.url}\n`);

  parts.push('\n---\n\n' + (await renderDoc('house-music-genre-taxonomy')));
  parts.push('\n---\n\n' + (await renderDoc('black-house-music-lineage')));

  // Encyclopedic knowledge base (history, origins, pioneers, venues, answers).
  const topics = await allTopics();
  parts.push(`\n---\n\n# Knowledge Base (${topics.length} entries)\n`);
  for (const t of topics) {
    const edges = await edgesForSlug(t.slug);
    parts.push('\n---\n\n' + topicToMarkdown(t, edges));
  }

  const artists = await allArtistProfiles();
  parts.push(`\n---\n\n# Artist Profiles (${artists.length})\n`);
  for (const a of artists) {
    parts.push('\n---\n\n' + artistToMarkdown(a));
  }

  return new Response(parts.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=600' },
  });
}
