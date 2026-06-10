'use client';
import { useState } from 'react';

export default function BuildPanel({ token, sources }: { token: string; sources: string[] }) {
  const [source, setSource] = useState(sources[0] ?? 'MusicBrainz');
  const [query, setQuery] = useState('');
  const [log, setLog] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  async function post(label: string, url: string, body: object) {
    setBusy(label);
    setLog(`Running ${label}…`);
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'x-admin-token': token, 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      setLog(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setLog('Error: ' + String(e?.message ?? e));
    } finally {
      setBusy(null);
    }
  }

  // Search MusicBrainz and add new artists, looping until ~250 are added.
  async function discover() {
    setBusy('discover');
    let cum = 0, total = 0, guard = 0;
    try {
      while (guard++ < 6 && cum < 250) {
        setLog(`Searching MusicBrainz for new house artists… added ${cum} so far (this can take a minute)…`);
        const res = await fetch('/api/discover', { method: 'POST', headers: { 'x-admin-token': token, 'content-type': 'application/json' }, body: JSON.stringify({ limit: 250 - cum }) });
        const text = await res.text();
        let d: any;
        try { d = JSON.parse(text); } catch { setLog(`Server timeout mid-search — ${cum} added so far are saved. Click again to continue.`); break; }
        if (d.error) { setLog('Error: ' + d.error); break; }
        cum += d.added || 0; total = d.total || total;
        setLog(`Added ${cum} new artists (database total ${total}). ${d.added === 0 ? 'No more new matches found.' : ''}`);
        if (!d.added) break;
      }
      setLog((p) => p + `\nDone. Tip: now run "Enrich links (MusicBrainz)" in the Pipeline section to fill their socials & streaming.`);
    } catch (e: any) { setLog('Error: ' + String(e?.message ?? e)); } finally { setBusy(null); }
  }

  return (
    <div className="space-y-5">
      {/* Discover new artists from the web */}
      <div className="bg-panel/40 border border-accent/40 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold">🔎 Find &amp; add new artists (search MusicBrainz)</h3>
        <p className="text-xs text-muted">
          Searches MusicBrainz across the house family (deep, tech, afro, soulful, melodic, disco, garage,
          acid and more) and adds <strong>up to 250 brand-new artists</strong> not already in your database —
          each tagged with city, style/genre, and man/woman where known, so the web connects itself.
        </p>
        <button onClick={discover} disabled={!!busy} className="bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50">
          {busy === 'discover' ? 'Searching…' : 'Find & add 250 new artists'}
        </button>
      </div>

      {/* Search a site → grow the database */}
      <div className="bg-panel/40 border border-edge rounded-xl p-4 space-y-3">
        <h3 className="font-semibold">Search a source → add to database</h3>
        <p className="text-xs text-muted">
          Pick a source, type an artist, and add it. It stores that source's link and auto-enriches
          from compliant sources (MusicBrainz, Wikidata, Wikipedia — links, bio, country; + Spotify/Discogs
          with API keys). Sites with no API / anti-bot (1001Tracklists, Beatport, RA, Instagram) aren't
          scraped — their link is saved and the artist is enriched from the compliant chain.
        </p>
        <div className="flex gap-2 flex-wrap">
          <select value={source} onChange={(e) => setSource(e.target.value)} className="bg-ink border border-edge rounded-lg px-3 py-2 text-sm min-w-[180px]">
            {sources.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && query) post('ingest', '/api/ingest', { source, query }); }}
            placeholder="Artist name or term…"
            className="flex-1 min-w-[200px] bg-ink border border-edge rounded-lg px-3 py-2 text-sm"
          />
          <button onClick={() => query && post('ingest', '/api/ingest', { source, query })} disabled={!!busy || !query} className="bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50">
            {busy === 'ingest' ? '…' : 'Search & add'}
          </button>
        </div>
      </div>

      {/* Grow from curated roster */}
      <div className="bg-panel/40 border border-edge rounded-xl p-4 space-y-3">
        <h3 className="font-semibold">Grow the database (curated roster)</h3>
        <p className="text-xs text-muted">
          Bulk-add real, top house DJs &amp; producers up to a target count, then enrich them with the
          Repopulate button. Climb: 200 → 500 → 1,000 → 2,000 → the most extensive house database in the world.
        </p>
        <div className="flex gap-2 flex-wrap">
          {[200, 500, 1000, 2000].map((t) => (
            <button key={t} onClick={() => post(`grow-${t}`, '/api/import-roster', { target: t })} disabled={!!busy} className="border border-edge hover:border-accent rounded-lg px-4 py-2 text-sm disabled:opacity-50">
              {busy === `grow-${t}` ? '…' : `Grow to ${t.toLocaleString()}`}
            </button>
          ))}
        </div>
      </div>

      {log && <pre className="bg-ink border border-edge rounded-lg p-3 text-xs overflow-auto max-h-80 whitespace-pre-wrap font-mono text-zinc-300">{log}</pre>}
    </div>
  );
}
