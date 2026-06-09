// Connector framework. Every data source implements the Connector interface.
// The system is API-first and compliance-first: connectors must respect
// robots.txt, rate limits, ToS, and never bypass logins/paywalls/anti-bot.

export interface ArtistSeed {
  name: string;
  source: string;
  externalId?: string;
  url?: string;
}

export interface EnrichmentField {
  field: string;
  value: string | number | null;
  sourceName: string;
  sourceUrl?: string;
  confidence: number; // 0-100
  method: 'api' | 'parsed_html' | 'manual' | 'derived';
}

export interface Enrichment {
  slug?: string;
  name: string;
  fields: EnrichmentField[];
  links?: Record<string, string>;
  releases?: { title: string; label?: string; release_date?: string; type?: string; url?: string }[];
}

export interface Connector {
  name: string;
  /** True when credentials/config are present and the connector can run. */
  isConfigured(): boolean;
  /** Whether automated access to this source is permitted (per ToS/robots). */
  compliant(): boolean;
  /** Discover candidate artists (e.g. from charts/playlists). */
  discover?(opts: { limit?: number }): Promise<ArtistSeed[]>;
  /** Enrich a known artist by name (and optional external id). */
  enrich?(artist: { name: string; externalId?: string }): Promise<Enrichment | null>;
}

// ---- polite fetch: descriptive UA + global rate limit per host ----
const lastHit = new Map<string, number>();
const RATE_MS = parseInt(process.env.CRAWLER_RATE_LIMIT_MS || '1100', 10);
const UA =
  process.env.CRAWLER_USER_AGENT ||
  'HouseMusicIntelligenceDB/1.0 (+http://localhost:3000; compliance-first crawler)';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function politeFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const host = new URL(url).host;
  const since = Date.now() - (lastHit.get(host) ?? 0);
  if (since < RATE_MS) await sleep(RATE_MS - since);
  lastHit.set(host, Date.now());
  return fetch(url, {
    ...init,
    headers: { 'user-agent': UA, accept: 'application/json', ...(init.headers || {}) },
  });
}

// Lightweight robots.txt check (cached). Conservative: on any error, disallow.
const robotsCache = new Map<string, string>();
export async function robotsAllows(url: string, path = '/'): Promise<boolean> {
  try {
    const origin = new URL(url).origin;
    let txt = robotsCache.get(origin);
    if (txt === undefined) {
      const res = await fetch(`${origin}/robots.txt`, { headers: { 'user-agent': UA } });
      txt = res.ok ? await res.text() : '';
      robotsCache.set(origin, txt);
    }
    // Minimal parse: look for a global Disallow that matches path.
    const lines = txt.split('\n').map((l) => l.trim().toLowerCase());
    let applies = false;
    for (const line of lines) {
      if (line.startsWith('user-agent:')) applies = line.includes('*');
      else if (applies && line.startsWith('disallow:')) {
        const rule = line.slice('disallow:'.length).trim();
        if (rule && path.startsWith(rule)) return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}
