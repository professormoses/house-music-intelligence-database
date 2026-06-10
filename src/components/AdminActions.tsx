'use client';
import { useState } from 'react';

export default function AdminActions({ token }: { token: string }) {
  const [log, setLog] = useState<string>('');
  const [busy, setBusy] = useState<string | null>(null);

  async function run(label: string, url: string) {
    setBusy(label);
    setLog(`Running ${label}…`);
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'x-admin-token': token, 'content-type': 'application/json' }, body: '{}' });
      const data = await res.json();
      setLog(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setLog('Error: ' + String(e?.message ?? e));
    } finally {
      setBusy(null);
    }
  }

  // Loop the batched link-enricher across the whole DB until done.
  async function enrichLinks() {
    setBusy('Enrich links');
    let offset = 0, totalUpdated = 0, total = 0, guard = 0;
    try {
      while (guard++ < 100) {
        setLog(`Enriching links from MusicBrainz… offset ${offset}${total ? ` / ${total}` : ''} (updated ${totalUpdated})`);
        const res = await fetch(`/api/enrich-links`, { method: 'POST', headers: { 'x-admin-token': token, 'content-type': 'application/json' }, body: JSON.stringify({ offset, limit: 12 }) });
        const d = await res.json();
        if (d.error) { setLog('Error: ' + d.error); break; }
        totalUpdated += d.updated || 0; total = d.total || total; offset = d.nextOffset;
        if (d.done) { setLog(`Done. Enriched links for ${totalUpdated} of ${total} artists from MusicBrainz.`); break; }
      }
    } catch (e: any) { setLog('Error: ' + String(e?.message ?? e)); } finally { setBusy(null); }
  }

  const Btn = ({ label, url, primary }: { label: string; url: string; primary?: boolean }) => (
    <button
      onClick={() => run(label, url)}
      disabled={!!busy}
      className={`px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 ${primary ? 'bg-accent text-white' : 'border border-edge text-zinc-200 hover:border-accent'}`}
    >
      {busy === label ? '…' : label}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <Btn label="Repopulate Database" url="/api/repopulate" primary />
        <button onClick={enrichLinks} disabled={!!busy} className="px-4 py-2 rounded-lg text-sm font-medium border border-edge text-zinc-200 hover:border-accent disabled:opacity-50">
          {busy === 'Enrich links' ? '…' : 'Enrich links (MusicBrainz)'}
        </button>
        <Btn label="Export to Sheets / Files" url="/api/export" />
        <Btn label="Export to Files only" url="/api/export?target=files" />
      </div>
      {log && (
        <pre className="bg-ink border border-edge rounded-lg p-3 text-xs overflow-auto max-h-80 whitespace-pre-wrap font-mono text-zinc-300">{log}</pre>
      )}
      <p className="text-xs text-muted">
        Repopulate runs all configured + compliant connectors, refreshes links, finds new releases,
        re-scores, logs every change, and queues uncertain data for review. MusicBrainz runs without a key;
        add API keys in <code>.env</code> to enable Spotify, Discogs and more.
      </p>
    </div>
  );
}
