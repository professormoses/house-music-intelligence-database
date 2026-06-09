import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { topicWithEdges, TYPE_LABELS } from '@/lib/topics';
import { renderMarkdown } from '@/lib/md';
import { abs, prettyDate, SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await topicWithEdges(params.slug);
  if (!data) return { title: 'Not found' };
  const { topic } = data;
  return {
    title: topic.title,
    description: topic.summary ?? topic.answer ?? undefined,
    alternates: { canonical: topic.canonical_url, types: { 'text/markdown': topic.markdown_url } },
    openGraph: { title: topic.title, description: topic.summary ?? undefined, url: topic.canonical_url, type: 'article' },
  };
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const data = await topicWithEdges(params.slug);
  if (!data) notFound();
  const { topic, edges } = data;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': topic.type === 'person' ? 'Person' : 'Article',
    headline: topic.title,
    name: topic.title,
    description: topic.summary,
    url: topic.canonical_url,
    inLanguage: 'en',
    dateModified: topic.last_verified_date,
    author: { '@type': 'Organization', name: SITE.publisher },
    publisher: { '@type': 'Organization', name: SITE.publisher },
    citation: topic.sources.map((s) => ({ '@type': 'CreativeWork', name: s.name, url: s.url })),
    isPartOf: { '@type': 'Dataset', name: SITE.name, url: SITE.url },
  };

  const faqLd =
    topic.type === 'answer' && topic.question && topic.answer
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: topic.question, acceptedAnswer: { '@type': 'Answer', text: topic.answer } },
          ],
        }
      : null;

  return (
    <article className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <nav className="text-sm text-muted"><Link href="/knowledge">Knowledge</Link> / <span className="text-white">{topic.title}</span></nav>

      <header className="space-y-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent border border-accent/40">{TYPE_LABELS[topic.type] ?? topic.type}</span>
            <h1 className="text-3xl font-bold mt-2">{topic.title}</h1>
          </div>
          <div className="font-mono text-xs space-x-3 pt-2">
            <a href={topic.markdown_url} className="px-2 py-1 border border-edge rounded">.md</a>
            <a href={topic.json_url} className="px-2 py-1 border border-edge rounded">.json</a>
          </div>
        </div>
        {topic.summary && <p className="text-zinc-200 max-w-3xl text-lg">{topic.summary}</p>}
        <p className="text-xs text-muted font-mono">
          {topic.era ? `${topic.era} · ` : ''}{[topic.city, topic.country].filter(Boolean).join(', ')}
          {topic.city ? ' · ' : ''}confidence {topic.confidence_score}/100 · verified {prettyDate(topic.last_verified_date)}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {topic.type === 'answer' && topic.answer && (
            <div className="bg-panel/60 border border-accent2/40 rounded-xl p-5">
              <h2 className="text-sm uppercase tracking-wide text-muted mb-2">Direct answer</h2>
              <p className="text-zinc-100 text-lg leading-relaxed">{topic.answer}</p>
            </div>
          )}

          {topic.body && (
            <div className="prose-md max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(topic.body) }} />
          )}

          <section className="bg-panel/60 border border-accent/40 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">How to cite this page</h2>
            <pre className="text-xs whitespace-pre-wrap font-mono text-zinc-300">{topic.suggested_citation}</pre>
          </section>
        </div>

        <aside className="space-y-4">
          {edges.length > 0 && (
            <div className="bg-panel/40 border border-edge rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Knowledge graph</h3>
              <ul className="text-sm space-y-2">
                {edges.map((e) => (
                  <li key={e.id} className="leading-snug">
                    {e.direction === 'out' ? (
                      <>
                        <span className="text-muted">{e.predicateLabel}</span>{' '}
                        {e.objectUrl ? <a className="text-accent underline" href={e.objectUrl}>{e.objectName}</a> : <span>{e.objectName}</span>}
                      </>
                    ) : (
                      <>
                        <a className="text-accent underline" href={abs(`/topic/${e.subjectSlug}`)}>{e.subjectSlug}</a>{' '}
                        <span className="text-muted">{e.predicateLabel} this</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-panel/40 border border-edge rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Sources</h3>
            <ul className="text-sm space-y-1 list-disc pl-4">
              {topic.sources.map((s) => <li key={s.url}><a className="text-accent underline" href={s.url}>{s.name}</a></li>)}
              {!topic.sources.length && <li className="text-muted">None on record.</li>}
            </ul>
          </div>

          {topic.related_slugs.length > 0 && (
            <div className="bg-panel/40 border border-edge rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted">Related</h3>
              <ul className="text-sm space-y-1">
                {topic.related_slugs.map((s) => <li key={s}><a className="text-accent underline" href={`/topic/${s}`}>{s.replace(/-/g, ' ')}</a></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
