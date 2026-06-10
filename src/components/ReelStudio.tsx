'use client';
import { useEffect, useState } from 'react';

interface Opt { slug: string; artist_name: string; origin_country?: string | null; popularity_score: number }
interface ScriptRow { id: string; artistName: string; title: string; wordCount: number; durationSec: number; popularity: number; generator: string; createdAt: string }

export default function ReelStudio({ token }: { token: string }) {
  const [q, setQ] = useState('');
  const [opts, setOpts] = useState<Opt[]>([]);
  const [slug, setSlug] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [log, setLog] = useState('');
  const [scripts, setScripts] = useState<ScriptRow[]>([]);
  const [viewing, setViewing] = useState<{ id: string; body: string } | null>(null);

  const auth = { 'x-admin-token': token, 'content-type': 'application/json' };

  // Parse a response safely — a timeout/504 returns an empty or HTML body, which
  // would otherwise throw "Unexpected end of JSON input".
  async function safeJson(res: Response): Promise<any> {
    const text = await res.text();
    if (!text) {
      if (res.status === 504 || res.status === 502) throw new Error('The request took too long (server timeout). It may still have saved — refresh the list. Try one artist at a time, or a smaller batch.');
      throw new Error(`Server returned ${res.status} with no body.`);
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Server returned a non-JSON response (${res.status}).`);
    }
  }

  async function loadScripts() {
    try {
      const r = await fetch('/api/vo-scripts', { headers: auth });
      const d = await r.json();
      setScripts(d.scripts || []);
    } catch {/* */}
  }
  useEffect(() => { loadScripts(); }, []);

  // search artists (popularity-ranked)
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/artists?sort=popularity&pageSize=25${q ? `&q=${encodeURIComponent(q)}` : ''}`);
        const d = await r.json();
        setOpts(d.artists || []);
        if (!slug && d.artists?.[0]) setSlug(d.artists[0].slug);
      } catch {/* */}
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  async function begin() {
    if (!slug) return;
    setBusy('one'); setLog(`Generating VO script for ${slug}…`);
    try {
      const r = await fetch('/api/vo-script', { method: 'POST', headers: auth, body: JSON.stringify({ slug }) });
      const d = await safeJson(r);
      setLog(JSON.stringify(d, null, 2));
      await loadScripts();
      if (d.id) view(d.id);
    } catch (e: any) { setLog('Error: ' + e?.message); await loadScripts(); } finally { setBusy(null); }
  }

  async function batch() {
    setBusy('batch'); setLog('Generating top 5 most-popular unprofiled artists…');
    try {
      const r = await fetch('/api/vo-script', { method: 'POST', headers: auth, body: JSON.stringify({ batch: true, count: 5 }) });
      const d = await safeJson(r);
      setLog(JSON.stringify(d, null, 2));
      await loadScripts();
    } catch (e: any) { setLog('Error: ' + e?.message); await loadScripts(); } finally { setBusy(null); }
  }

  async function view(id: string) {
    const r = await fetch(`/api/vo-scripts/${id}`, { headers: auth });
    const d = await r.json();
    setViewing({ id, body: d.body });
  }

  async function del(id: string) {
    await fetch(`/api/vo-scripts/${id}`, { method: 'DELETE', headers: auth });
    if (viewing?.id === id) setViewing(null);
    loadScripts();
  }

  return (
    <div className="space-y-4">
      <div className="bg-panel/40 border border-edge rounded-xl p-4 space-y-3">
        <h3 className="font-semibold">Generate a 55-second VO script</h3>
        <p className="text-xs text-muted">Search the database, pick an artist, and run the report. Output is a ready-to-read text file: timed voiceover, Creative-Commons b-roll + image prompts, caption/hashtags, and sources. 100% from verified data.</p>
        <div className="flex gap-2 flex-wrap">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search artists…" className="flex-1 min-w-[180px] bg-ink border border-edge rounded-lg px-3 py-2 text-sm" />
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 min-w-[220px] bg-ink border border-edge rounded-lg px-3 py-2 text-sm">
            {opts.map((o) => <option key={o.slug} value={o.slug}>{o.artist_name}{o.origin_country ? ` — ${o.origin_country}` : ''} · pop {o.popularity_score}</option>)}
          </select>
          <button onClick={begin} disabled={!!busy || !slug} className="bg-accent text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50">{busy === 'one' ? '…' : 'Begin report'}</button>
        </div>
        <button onClick={batch} disabled={!!busy} className="border border-edge hover:border-accent rounded-lg px-4 py-2 text-sm disabled:opacity-50">{busy === 'batch' ? 'Running…' : 'Batch next 5 (most popular, unprofiled)'}</button>
      </div>

      {log && <pre className="bg-ink border border-edge rounded-lg p-3 text-xs overflow-auto max-h-40 whitespace-pre-wrap font-mono text-zinc-300">{log}</pre>}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Generated scripts ({scripts.length})</h3>
          <div className="space-y-1 max-h-96 overflow-auto">
            {scripts.map((s) => (
              <div key={s.id} className="flex items-center gap-2 text-sm border-b border-edge/40 py-1">
                <button onClick={() => view(s.id)} className="text-left flex-1 hover:text-accent">{s.artistName} <span className="text-muted text-xs">· {s.durationSec}s · {s.generator} · pop {s.popularity}</span></button>
                <a href={`/api/vo-scripts/${s.id}?format=txt&token=${encodeURIComponent(token)}`} className="text-xs text-accent2">.txt</a>
                <button onClick={() => del(s.id)} className="text-xs text-muted hover:text-red-400">✕</button>
              </div>
            ))}
            {!scripts.length && <p className="text-muted text-sm">None yet.</p>}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Preview</h3>
          {viewing ? (
            <pre className="bg-ink border border-edge rounded-lg p-3 text-xs overflow-auto max-h-96 whitespace-pre-wrap font-mono text-zinc-200">{viewing.body}</pre>
          ) : <p className="text-muted text-sm">Select a script to preview.</p>}
        </div>
      </div>
    </div>
  );
}
