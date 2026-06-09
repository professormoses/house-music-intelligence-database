/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pretty agent-first URLs. Internally these map to route handlers.
  async rewrites() {
    return [
      // Per-entity markdown mirrors:  /artist/black-coffee.md
      { source: '/artist/:slug.md', destination: '/raw/artist-md/:slug' },
      { source: '/label/:slug.md', destination: '/raw/label-md/:slug' },
      { source: '/topic/:slug.md', destination: '/raw/topic-md/:slug' },
      // Per-entity JSON:  /api/artists/black-coffee.json
      { source: '/api/artists/:slug.json', destination: '/api/artists/:slug' },
      { source: '/api/labels/:slug.json', destination: '/api/labels/:slug' },
      { source: '/api/topics/:slug.json', destination: '/api/topics/:slug' },
      // Top-level markdown index/landing docs:  /top-house-djs.md
      // Restricted to a single segment so it never shadows /artist/:slug.md
      // or /datasets/schema.md.
      { source: '/:doc([^/]+\\.md)', destination: '/raw/doc/:doc' },
    ];
  },
  async headers() {
    return [
      {
        // Agents and crawlers may fetch any machine-readable artifact freely.
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'all' }],
      },
    ];
  },
};

module.exports = nextConfig;
