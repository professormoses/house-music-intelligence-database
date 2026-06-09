export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function urlset(entries: { loc: string; lastmod?: string }[]): string {
  const body = entries
    .map((e) => `  <url>\n    <loc>${esc(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapIndex(maps: { loc: string; lastmod?: string }[]): string {
  const body = maps
    .map((m) => `  <sitemap>\n    <loc>${esc(m.loc)}</loc>${m.lastmod ? `\n    <lastmod>${m.lastmod}</lastmod>` : ''}\n  </sitemap>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export function rss(opts: {
  title: string;
  link: string;
  description: string;
  items: { title: string; link: string; description?: string; pubDate?: string; guid?: string }[];
}): string {
  const items = opts.items
    .map(
      (i) =>
        `    <item>\n      <title>${esc(i.title)}</title>\n      <link>${esc(i.link)}</link>\n      <guid isPermaLink="false">${esc(
          i.guid ?? i.link,
        )}</guid>${i.pubDate ? `\n      <pubDate>${new Date(i.pubDate).toUTCString()}</pubDate>` : ''}${
          i.description ? `\n      <description>${esc(i.description)}</description>` : ''
        }\n    </item>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${esc(
    opts.title,
  )}</title>\n    <link>${esc(opts.link)}</link>\n    <description>${esc(
    opts.description,
  )}</description>\n${items}\n  </channel>\n</rss>\n`;
}

export const XML_HEADERS = { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=600' };
