import { abs } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Agent-first: explicitly welcome AI crawlers and point them at llms.txt.
  const body = `# House Music Intelligence Database — robots.txt
# AI agents and search crawlers are welcome. Start at /llms.txt

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/repopulate
Disallow: /api/export

# Named AI crawlers (all welcome)
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: ${abs('/sitemap.xml')}
Sitemap: ${abs('/sitemap-artists.xml')}
Sitemap: ${abs('/sitemap-labels.xml')}
Sitemap: ${abs('/sitemap-genres.xml')}
Sitemap: ${abs('/sitemap-topics.xml')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
