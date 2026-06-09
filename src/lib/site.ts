export const SITE = {
  name: 'House Music Intelligence Database',
  shortName: 'HMID',
  tagline:
    'The agent-first, citation-grade discovery engine for house music DJs, producers, labels, events, venues and booking intelligence.',
  publisher: 'World Famous House Crew',
  url: (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
};

export function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function today(): string {
  // Deterministic-friendly: callers pass dates where reproducibility matters.
  return new Date().toISOString().slice(0, 10);
}

export function prettyDate(iso?: string | null): string {
  if (!iso) return 'unknown';
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
