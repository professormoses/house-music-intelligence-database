import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'House Music Labels' };

const TIER_NAMES: Record<number, string> = {
  1: 'Tier 1 — Global Powerhouse Labels',
  2: 'Tier 2 — Tech House & Festival Giants',
  3: 'Tier 3 — Deep / Melodic House Leaders',
  4: 'Tier 4 — Afro House Leaders',
  5: 'Tier 5 — Underground & Artist-Development',
};

function tierOf(profile: string): number | null {
  try {
    const t = JSON.parse(profile || '{}').tier;
    return typeof t === 'number' ? t : null;
  } catch {
    return null;
  }
}

export default async function LabelsPage() {
  const labels = await prisma.label.findMany({ orderBy: { labelName: 'asc' } });
  const withTier = labels.map((l) => ({ l, tier: tierOf(l.profile), roster: JSON.parse(l.artistRoster || '[]').length as number }));

  const tiers = [1, 2, 3, 4, 5];
  const untiered = withTier.filter((x) => x.tier == null);

  const Row = ({ l, roster }: { l: (typeof labels)[number]; roster: number }) => (
    <tr className="border-b border-edge/40 hover:bg-panel/40">
      <td className="p-3 font-medium"><Link href={`/label/${l.slug}`} className="hover:text-accent">{l.labelName}</Link></td>
      <td className="p-3 text-muted">{l.country ? <Link href={`/?country=${encodeURIComponent(l.country)}`} className="hover:text-accent hover:underline">{l.country}</Link> : ''}</td>
      <td className="p-3 text-right tabular-nums text-accent2">{roster || ''}</td>
      <td className="p-3 text-muted">
        {l.genresCsv.split(',').filter(Boolean).slice(0, 4).map((g, i, arr) => (
          <span key={g}>
            <Link href={`/?genre=${encodeURIComponent(g)}`} className="hover:text-accent hover:underline">{g.replace(/\b\w/g, (c) => c.toUpperCase())}</Link>
            {i < arr.length - 1 ? ', ' : ''}
          </span>
        ))}
      </td>
      <td className="p-3 font-mono text-xs space-x-2"><a href={`/label/${l.slug}.md`}>md</a><a href={`/api/labels/${l.slug}.json`}>json</a></td>
    </tr>
  );

  const Table = ({ rows }: { rows: { l: (typeof labels)[number]; roster: number }[] }) => (
    <div className="border border-edge rounded-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-muted border-b border-edge"><th className="p-3">Label</th><th className="p-3">Country</th><th className="p-3 text-right">Roster</th><th className="p-3">Genres</th><th className="p-3">Formats</th></tr></thead>
        <tbody>{rows.map(({ l, roster }) => <Row key={l.id} l={l} roster={roster} />)}</tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">House Music Labels</h1>
          <p className="text-muted text-sm mt-1">{labels.length} labels. Click any roster name to open the artist — and every artist links back to their labels.</p>
        </div>
        <a href="/labels.md" className="font-mono text-xs px-2 py-1 border border-edge rounded">.md</a>
      </div>

      {tiers.map((tier) => {
        const rows = withTier.filter((x) => x.tier === tier).sort((a, b) => a.l.labelName.localeCompare(b.l.labelName));
        if (!rows.length) return null;
        return (
          <section key={tier} className="space-y-3">
            <h2 className="text-lg font-semibold text-accent2">{TIER_NAMES[tier]}</h2>
            <Table rows={rows} />
          </section>
        );
      })}

      {untiered.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-accent2">More labels</h2>
          <Table rows={untiered.sort((a, b) => a.l.labelName.localeCompare(b.l.labelName))} />
        </section>
      )}
    </div>
  );
}
