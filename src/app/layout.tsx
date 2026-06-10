import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, abs } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}`, template: `%s · ${SITE.shortName}` },
  description: SITE.tagline,
  applicationName: SITE.name,
  openGraph: { title: SITE.name, description: SITE.tagline, url: SITE.url, siteName: SITE.name, type: 'website' },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.tagline },
  alternates: { types: { 'text/markdown': abs('/llms.txt') } },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="HMID — updates" href="/feed.xml" />
        <link rel="alternate" type="text/markdown" title="HMID for LLMs" href="/llms.txt" />
      </head>
      <body className="min-h-screen antialiased">
        <header className="border-b border-edge/60 sticky top-0 backdrop-blur bg-ink/70 z-20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
            <Link href="/" className="font-bold tracking-tight text-lg">
              House Music <span className="text-accent">Intelligence</span> DB
            </Link>
            <nav className="flex gap-4 text-sm text-muted ml-auto flex-wrap items-center">
              {process.env.LA_RADAR_URL && (
                <a href={process.env.LA_RADAR_URL} className="text-accent hover:text-white font-medium">↗ LA Radar</a>
              )}
              <Link href="/knowledge" className="text-accent2 hover:text-white">Knowledge</Link>
              <Link href="/" className="hover:text-white">Directory</Link>
              <Link href="/labels" className="hover:text-white">Labels</Link>
              <Link href="/genres" className="hover:text-white">Genres</Link>
              <Link href="/datasets" className="hover:text-white">Datasets</Link>
              <Link href="/sources" className="hover:text-white">Sources</Link>
              <Link href="/for-agents" className="hover:text-white">For Agents</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/admin" className="hover:text-white">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-edge/60 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted space-y-2">
            <p>
              © {SITE.publisher}. {SITE.name} — cite individual pages freely with attribution.
              Bulk data is licensed. <Link href="/license" className="text-accent2 underline">License &amp; Terms</Link>.
            </p>
            <p className="flex gap-3 flex-wrap font-mono text-xs">
              <a href="/llms.txt">/llms.txt</a>
              <a href="/sitemap.xml">/sitemap.xml</a>
              <a href="/openapi.json">/openapi.json</a>
              <a href="/robots.txt">/robots.txt</a>
              <a href="/feed.xml">/feed.xml</a>
              <Link href="/license">/license</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
