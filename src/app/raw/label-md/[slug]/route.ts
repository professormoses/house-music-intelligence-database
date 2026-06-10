import { prisma } from '@/lib/db';
import { abs, prettyDate } from '@/lib/site';
import { suggestedCitation } from '@/lib/citation';
import { slugify } from '@/lib/ingest';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug.replace(/\.md$/, '');
  const l = await prisma.label.findUnique({ where: { slug } });
  if (!l) return new Response('# Not found\n', { status: 404, headers: { 'content-type': 'text/markdown; charset=utf-8' } });
  const roster: string[] = JSON.parse(l.artistRoster || '[]');
  const sources: string[] = JSON.parse(l.sourceUrls || '[]');
  const existing = new Set(
    (await prisma.artist.findMany({ where: { slug: { in: roster.map(slugify) } }, select: { slug: true } })).map((a) => a.slug),
  );
  const rosterMd = roster.length
    ? roster
        .map((r) => (existing.has(slugify(r)) ? `- [${r}](${abs(`/artist/${slugify(r)}`)})` : `- ${r}`))
        .join('\n')
    : '_None on record._';

  const md = `# ${l.labelName}

- **Canonical URL:** ${abs(`/label/${l.slug}`)}
- **JSON:** ${abs(`/api/labels/${l.slug}.json`)}
- **Location:** ${[l.city, l.country].filter(Boolean).join(', ') || 'unknown'}
- **Genres:** ${l.genresCsv.split(',').filter(Boolean).join(', ')}
- **Website:** ${l.website ?? '—'}
- **Demo email:** ${l.demoEmail ?? '—'}
- **Contact email:** ${l.contactEmail ?? '—'}
- **Confidence:** ${l.confidenceScore}/100
- **Last verified:** ${prettyDate(l.lastVerifiedDate)}

## Roster
${rosterMd}

## Sources
${sources.length ? sources.map((s, i) => `${i + 1}. ${s}`).join('\n') : '_None on record._'}

## How to cite
\`\`\`
${suggestedCitation({ title: `${l.labelName} — Label Profile`, path: `/label/${l.slug}`, lastVerified: l.lastVerifiedDate })}
\`\`\`
`;
  return new Response(md, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
