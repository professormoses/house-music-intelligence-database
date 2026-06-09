import { prisma } from './db';
import { abs } from './site';

export const PREDICATE_LABELS: Record<string, string> = {
  pioneered: 'pioneered',
  originated_in: 'originated in',
  resident_at: 'resident at',
  influenced_by: 'influenced by',
  mentored: 'mentored',
  descended_from: 'descended from',
  part_of: 'part of',
  founded: 'founded',
  released_on: 'released on',
  collaborated_with: 'collaborated with',
  played_at: 'played at',
  popularized: 'popularized',
};

// schema.org property hints per predicate (best-effort mapping for JSON-LD).
const PREDICATE_SCHEMA: Record<string, string> = {
  pioneered: 'knowsAbout',
  popularized: 'knowsAbout',
  originated_in: 'locationCreated',
  resident_at: 'workLocation',
  influenced_by: 'isBasedOn',
  part_of: 'isPartOf',
  descended_from: 'isBasedOn',
  collaborated_with: 'colleague',
};

export interface Edge {
  id: string;
  subjectType: string;
  subjectSlug: string;
  predicate: string;
  predicateLabel: string;
  objectType: string;
  objectSlug: string | null;
  objectLabel: string | null;
  objectName: string;
  objectUrl: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  confidence: number;
  note: string | null;
  direction: 'out' | 'in';
}

function urlFor(type: string, slug?: string | null): string | null {
  if (!slug) return null;
  if (type === 'artist') return abs(`/artist/${slug}`);
  if (type === 'label') return abs(`/label/${slug}`);
  if (['topic', 'venue', 'person', 'place', 'genre', 'movement'].includes(type)) {
    // genres referenced by canonical genre slug may not be a topic; link if topic exists.
    return abs(`/topic/${slug}`);
  }
  return null;
}

function toEdge(r: any, direction: 'out' | 'in'): Edge {
  const objectName = r.objectLabel || r.objectSlug || '';
  return {
    id: r.id,
    subjectType: r.subjectType,
    subjectSlug: r.subjectSlug,
    predicate: r.predicate,
    predicateLabel: PREDICATE_LABELS[r.predicate] ?? r.predicate.replace(/_/g, ' '),
    objectType: r.objectType,
    objectSlug: r.objectSlug,
    objectLabel: r.objectLabel,
    objectName,
    objectUrl: urlFor(r.objectType, r.objectSlug),
    sourceName: r.sourceName,
    sourceUrl: r.sourceUrl,
    confidence: r.confidenceScore,
    note: r.note,
    direction,
  };
}

// All edges touching an entity, both directions.
export async function edgesFor(type: string, slug: string): Promise<Edge[]> {
  const [out, inc] = await Promise.all([
    prisma.relationship.findMany({ where: { subjectType: type, subjectSlug: slug } }),
    prisma.relationship.findMany({ where: { objectType: type, objectSlug: slug } }),
  ]);
  return [...out.map((r) => toEdge(r, 'out')), ...inc.map((r) => toEdge(r, 'in'))];
}

// All edges touching a slug, ignoring entity type (robust for topics whose
// type label differs across edges, e.g. a person who is also a 'topic').
export async function edgesForSlug(slug: string): Promise<Edge[]> {
  const [out, inc] = await Promise.all([
    prisma.relationship.findMany({ where: { subjectSlug: slug } }),
    prisma.relationship.findMany({ where: { objectSlug: slug } }),
  ]);
  return [...out.map((r) => toEdge(r, 'out')), ...inc.map((r) => toEdge(r, 'in'))];
}

// JSON shape of edges for an entity (used in artist/topic JSON APIs).
export function edgesToJson(edges: Edge[]) {
  return edges.map((e) => ({
    predicate: e.predicate,
    direction: e.direction,
    related: e.direction === 'out' ? e.objectName : e.subjectSlug,
    related_type: e.direction === 'out' ? e.objectType : e.subjectType,
    related_url: e.direction === 'out' ? e.objectUrl : urlFor(e.subjectType, e.subjectSlug),
    source_url: e.sourceUrl,
    confidence_score: e.confidence,
    note: e.note,
  }));
}

// Whole-graph dump as nodes + edges.
export async function buildGraph() {
  const [artists, topics, labels, rels] = await Promise.all([
    prisma.artist.findMany({ select: { slug: true, artistName: true } }),
    prisma.topic.findMany({ select: { slug: true, title: true, type: true } }),
    prisma.label.findMany({ select: { slug: true, labelName: true } }),
    prisma.relationship.findMany(),
  ]);

  const nodes = [
    ...artists.map((a) => ({ id: `artist:${a.slug}`, type: 'artist', label: a.artistName, url: abs(`/artist/${a.slug}`) })),
    ...topics.map((t) => ({ id: `${t.type}:${t.slug}`, type: t.type, label: t.title, url: abs(`/topic/${t.slug}`) })),
    ...labels.map((l) => ({ id: `label:${l.slug}`, type: 'label', label: l.labelName, url: abs(`/label/${l.slug}`) })),
  ];

  const edges = rels.map((r) => ({
    id: r.id,
    subject: `${r.subjectType}:${r.subjectSlug}`,
    predicate: r.predicate,
    object: r.objectSlug ? `${r.objectType}:${r.objectSlug}` : r.objectLabel,
    object_label: r.objectLabel,
    source_url: r.sourceUrl,
    confidence_score: r.confidenceScore,
  }));

  return { nodes, edges };
}

// JSON-LD @graph representation for agents/linked-data consumers.
export async function buildJsonLdGraph() {
  const { nodes } = await buildGraph();
  const rels = await prisma.relationship.findMany();
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const graph = nodes.map((n) => {
    const node: any = {
      '@id': n.url,
      '@type': n.type === 'artist' || n.type === 'person' ? 'Person' : n.type === 'label' ? 'Organization' : n.type === 'venue' || n.type === 'place' ? 'Place' : 'CreativeWork',
      name: n.label,
      url: n.url,
    };
    const out = rels.filter((r) => `${r.subjectType}:${r.subjectSlug}` === n.id);
    for (const r of out) {
      const prop = PREDICATE_SCHEMA[r.predicate] ?? 'subjectOf';
      const target = r.objectSlug ? byId.get(`${r.objectType}:${r.objectSlug}`)?.url ?? r.objectLabel : r.objectLabel;
      if (!target) continue;
      if (node[prop] === undefined) node[prop] = target;
      else node[prop] = Array.isArray(node[prop]) ? [...node[prop], target] : [node[prop], target];
    }
    return node;
  });

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
