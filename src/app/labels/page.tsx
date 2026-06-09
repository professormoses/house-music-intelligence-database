import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'House Music Labels' };

export default async function LabelsPage() {
  const labels = await prisma.label.findMany({ orderBy: { labelName: 'asc' } });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">House Music Labels</h1>
        <a href="/labels.md" className="font-mono text-xs px-2 py-1 border border-edge rounded">.md</a>
      </div>
      <div className="border border-edge rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted border-b border-edge"><th className="p-3">Label</th><th className="p-3">Country</th><th className="p-3">Genres</th><th className="p-3">Formats</th></tr></thead>
          <tbody>
            {labels.map((l) => (
              <tr key={l.id} className="border-b border-edge/40 hover:bg-panel/40">
                <td className="p-3 font-medium"><Link href={`/label/${l.slug}`} className="hover:text-accent">{l.labelName}</Link></td>
                <td className="p-3 text-muted">{l.country}</td>
                <td className="p-3 text-muted">{l.genresCsv.split(',').filter(Boolean).join(', ')}</td>
                <td className="p-3 font-mono text-xs space-x-2"><a href={`/label/${l.slug}.md`}>md</a><a href={`/api/labels/${l.slug}.json`}>json</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
