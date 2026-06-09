import { politeFetch, type Connector, type Enrichment } from './base';

// Spotify Web API — client-credentials flow. Set SPOTIFY_CLIENT_ID and
// SPOTIFY_CLIENT_SECRET to enable. Note: the API exposes followers + genres +
// popularity, but NOT monthly listeners (that field stays sourced elsewhere).

let cachedToken: { token: string; exp: number } | null = null;

async function getToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return null;
  if (cachedToken && cachedToken.exp > Date.now()) return cachedToken.token;
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) return null;
  const data = (await res.json()) as any;
  cachedToken = { token: data.access_token, exp: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.token;
}

export const spotify: Connector = {
  name: 'Spotify',
  isConfigured: () => !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET),
  compliant: () => true,

  async enrich({ name }): Promise<Enrichment | null> {
    const token = await getToken();
    if (!token) return null;
    const res = await politeFetch(
      `https://api.spotify.com/v1/search?type=artist&limit=1&q=${encodeURIComponent(name)}`,
      { headers: { authorization: `Bearer ${token}` } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as any;
    const a = data.artists?.items?.[0];
    if (!a) return null;

    const sourceUrl = a.external_urls?.spotify;
    const fields = [
      { field: 'spotify', value: sourceUrl, sourceName: 'Spotify', sourceUrl, confidence: 92, method: 'api' as const },
      { field: 'spotify_followers', value: a.followers?.total ?? null, sourceName: 'Spotify', sourceUrl, confidence: 95, method: 'api' as const },
    ];
    if (a.genres?.length)
      fields.push({ field: 'genres', value: a.genres.join(', '), sourceName: 'Spotify', sourceUrl, confidence: 70, method: 'api' as const });

    return { name: a.name, fields, links: sourceUrl ? { spotify: sourceUrl } : {} };
  },
};
