import type { Topic } from '@prisma/client';
import { prisma } from './db';
import { abs, prettyDate } from './site';
import { suggestedCitation } from './citation';
import { edgesForSlug, type Edge } from './graph';

export interface TopicSource {
  name: string;
  url: string;
  note?: string;
}

export interface TopicRecord {
  id: string;
  slug: string;
  title: string;
  type: string;
  summary: string | null;
  body: string;
  era: string | null;
  city: string | null;
  country: string | null;
  question: string | null;
  answer: string | null;
  related_slugs: string[];
  sources: TopicSource[];
  confidence_score: number;
  last_verified_date: string | null;
  canonical_url: string;
  markdown_url: string;
  json_url: string;
  suggested_citation: string;
}

export function toTopicRecord(t: Topic): TopicRecord {
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    type: t.type,
    summary: t.summary,
    body: t.body,
    era: t.era,
    city: t.city,
    country: t.country,
    question: t.question,
    answer: t.answer,
    related_slugs: JSON.parse(t.relatedSlugs || '[]'),
    sources: JSON.parse(t.sources || '[]'),
    confidence_score: t.confidenceScore,
    last_verified_date: t.lastVerifiedDate,
    canonical_url: abs(`/topic/${t.slug}`),
    markdown_url: abs(`/topic/${t.slug}.md`),
    json_url: abs(`/api/topics/${t.slug}.json`),
    suggested_citation: suggestedCitation({ title: t.title, path: `/topic/${t.slug}`, lastVerified: t.lastVerifiedDate }),
  };
}

export async function getTopic(slug: string) {
  const t = await prisma.topic.findUnique({ where: { slug } });
  return t ? toTopicRecord(t) : null;
}

export async function allTopics() {
  const rows = await prisma.topic.findMany({ orderBy: { title: 'asc' } });
  return rows.map(toTopicRecord);
}

export async function topicsByType(type: string) {
  const rows = await prisma.topic.findMany({ where: { type }, orderBy: { title: 'asc' } });
  return rows.map(toTopicRecord);
}

export const TYPE_LABELS: Record<string, string> = {
  origins: 'Origins',
  history: 'History',
  genre: 'Genre',
  place: 'Place / Scene',
  venue: 'Venue',
  person: 'Pioneer',
  movement: 'Movement',
  glossary: 'Reference',
  answer: 'Answer',
  timeline: 'Timeline',
  equipment: 'Equipment & Machines',
  festival: 'Festivals & Events',
  record: 'Classic Records',
  page: 'Page',
};

export function topicToMarkdown(t: TopicRecord, edges: Edge[]): string {
  const lines: string[] = [];
  lines.push(`# ${t.title}`);
  lines.push('');
  if (t.summary) lines.push(`> ${t.summary}`, '');
  lines.push(`- **Type:** ${TYPE_LABELS[t.type] ?? t.type}`);
  lines.push(`- **Canonical URL:** ${t.canonical_url}`);
  lines.push(`- **JSON:** ${t.json_url}`);
  if (t.era) lines.push(`- **Era:** ${t.era}`);
  if (t.city || t.country) lines.push(`- **Place:** ${[t.city, t.country].filter(Boolean).join(', ')}`);
  lines.push(`- **Confidence:** ${t.confidence_score}/100`);
  lines.push(`- **Last verified:** ${prettyDate(t.last_verified_date)}`);
  lines.push('');

  if (t.type === 'answer' && t.answer) {
    lines.push('## Answer', '', t.answer, '');
  }
  if (t.body) lines.push(t.body, '');

  if (edges.length) {
    lines.push('## Knowledge graph', '');
    for (const e of edges) {
      const rel = e.direction === 'out'
        ? `**${t.title}** ${e.predicateLabel} **${e.objectName}**`
        : `**${e.subjectSlug}** ${e.predicateLabel} **${t.title}**`;
      const src = e.sourceUrl ? ` _(source: ${e.sourceUrl})_` : '';
      lines.push(`- ${rel}${src}`);
    }
    lines.push('');
  }

  if (t.related_slugs.length) {
    lines.push('## Related', '');
    lines.push(t.related_slugs.map((s) => `- ${abs(`/topic/${s}`)} (or /artist/${s})`).join('\n'), '');
  }

  lines.push('## Sources', '');
  if (t.sources.length) lines.push(t.sources.map((s, i) => `${i + 1}. [${s.name}](${s.url})${s.note ? ` — ${s.note}` : ''}`).join('\n'));
  else lines.push('_No sources on record._');
  lines.push('');

  lines.push('## How to cite this page', '', '```', t.suggested_citation, '```', '');
  lines.push(`_Part of the [House Music Intelligence Database](${abs('/')}) knowledge graph. See [/llms.txt](${abs('/llms.txt')})._`, '');
  return lines.join('\n');
}

export async function topicWithEdges(slug: string) {
  const t = await getTopic(slug);
  if (!t) return null;
  const edges = await edgesForSlug(slug);
  return { topic: t, edges };
}
