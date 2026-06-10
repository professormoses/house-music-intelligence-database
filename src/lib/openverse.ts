// Creative Commons image lookup via the Openverse API (openverse.org) — free,
// no auth required for light use. Returns commercially-usable, modifiable CC
// images with attribution. Best-effort: returns [] on any network/error so the
// VO generator can fall back to a text-to-image prompt.

export interface CCImage {
  title: string;
  url: string; // direct image url
  landing: string; // foreign landing page (source)
  creator: string;
  license: string; // e.g. "cc-by", "cc0"
  licenseUrl: string;
  attribution: string;
}

export async function searchCC(query: string, limit = 2): Promise<CCImage[]> {
  try {
    const u = new URL('https://api.openverse.org/v1/images/');
    u.searchParams.set('q', query);
    u.searchParams.set('license_type', 'commercial,modification');
    u.searchParams.set('page_size', String(limit));
    u.searchParams.set('mature', 'false');
    const res = await fetch(u.toString(), {
      headers: { 'user-agent': 'HouseMusicIntelligenceDB/1.0 (reel-studio)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any;
    return (data.results ?? []).slice(0, limit).map((r: any) => ({
      title: r.title || query,
      url: r.url,
      landing: r.foreign_landing_url || r.url,
      creator: r.creator || 'Unknown',
      license: `${(r.license || '').toUpperCase()} ${r.license_version || ''}`.trim(),
      licenseUrl: r.license_url || '',
      attribution: r.attribution || `"${r.title}" by ${r.creator} (${(r.license || '').toUpperCase()})`,
    }));
  } catch {
    return [];
  }
}
