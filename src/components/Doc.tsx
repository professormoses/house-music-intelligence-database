import { renderMarkdown } from '@/lib/md';

export default function Doc({ md, mdUrl }: { md: string; mdUrl?: string }) {
  return (
    <div className="space-y-4">
      {mdUrl && (
        <div className="text-right">
          <a href={mdUrl} className="font-mono text-xs px-2 py-1 border border-edge rounded">.md</a>
        </div>
      )}
      <div className="prose-md max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
    </div>
  );
}
