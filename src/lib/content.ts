import { prisma } from './db';
import { allArtistProfiles } from './queries';
import { serializeArtist } from './serialize';
import { abs, SITE, prettyDate, today } from './site';
import { HOUSE_GENRES, genreSlug } from './genres';
import { allTopics, topicsByType, TYPE_LABELS } from './topics';
import { ABOUT_MD, METHODOLOGY_MD, CITE_MD, LICENSE_MD } from './authority';
import type { ArtistProfile } from './types';

function header(title: string, description: string, path: string): string {
  return [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    `- **Canonical URL:** ${abs(path)}`,
    `- **Publisher:** ${SITE.publisher}`,
    `- **Last updated:** ${prettyDate(today())}`,
    `- **Machine-readable index:** ${abs('/llms.txt')}`,
    '',
  ].join('\n');
}

function citationFooter(title: string, path: string): string {
  return [
    '',
    '## How to cite',
    '',
    '```',
    `${SITE.name}. "${title}." Published by ${SITE.publisher}. Last verified ${prettyDate(today())}. URL: ${abs(path)}`,
    '```',
    '',
  ].join('\n');
}

function artistTable(rows: ArtistProfile[]): string {
  const head = '| Artist | Origin | Scene | Priority | Markdown | JSON |\n| --- | --- | --- | --- | --- | --- |';
  const body = rows
    .map(
      (a) =>
        `| [${a.artist_name}](${abs(`/artist/${a.slug}`)}) | ${[a.origin_city, a.origin_country]
          .filter(Boolean)
          .join(', ')} | ${a.primary_scene ?? ''} | ${a.scores.house_crew_priority_score} | [md](${abs(
          `/artist/${a.slug}.md`,
        )}) | [json](${abs(`/api/artists/${a.slug}.json`)}) |`,
    )
    .join('\n');
  return head + '\n' + body + '\n';
}

async function topList(opts: {
  title: string;
  description: string;
  path: string;
  filter?: (a: ArtistProfile) => boolean;
  limit?: number;
}): Promise<string> {
  let artists = await allArtistProfiles();
  if (opts.filter) artists = artists.filter(opts.filter);
  artists = artists
    .sort((a, b) => b.scores.house_crew_priority_score - a.scores.house_crew_priority_score)
    .slice(0, opts.limit ?? 100);
  return (
    header(opts.title, opts.description, opts.path) +
    '\n' +
    artistTable(artists) +
    citationFooter(opts.title, opts.path)
  );
}

// ---- The registry. Each key maps to "<name>.md" ----
export const DOCS: Record<string, () => Promise<string>> = {
  'artists': () =>
    topList({
      title: 'House Music Artists — Full Index',
      description: 'Every artist in the House Music Intelligence Database, ranked by House Crew priority.',
      path: '/artists.md',
    }),
  'top-house-djs': () =>
    topList({
      title: 'Top House Music DJs',
      description: 'The highest-priority house DJs and producers in the database.',
      path: '/top-house-djs.md',
      limit: 50,
    }),
  'top-afro-house-djs': () =>
    topList({
      title: 'Top Afro House DJs',
      description: 'Leading Afro House artists tracked by the database.',
      path: '/top-afro-house-djs.md',
      filter: (a) => a.genres.some((g) => /afro/i.test(g)),
    }),
  'top-deep-house-producers': () =>
    topList({
      title: 'Top Deep House Producers',
      description: 'Leading Deep House producers tracked by the database.',
      path: '/top-deep-house-producers.md',
      filter: (a) => a.genres.some((g) => /deep house/i.test(g)),
    }),
  'emerging-house-producers': () =>
    topList({
      title: 'Emerging House Producers',
      description: 'Rising house producers with momentum but still-modest audiences.',
      path: '/emerging-house-producers.md',
      filter: (a) => a.scores.emerging_artist_score >= 55,
    }),
  'chicago-house-founders': () =>
    topList({
      title: 'Chicago House Founders & Lineage',
      description: 'Artists rooted in the Chicago house tradition where the genre was born.',
      path: '/chicago-house-founders.md',
      filter: (a) =>
        /chicago/i.test(a.primary_scene ?? '') || a.genres.some((g) => /chicago/i.test(g)),
    }),
  'detroit-house-producers': () =>
    topList({
      title: 'Detroit House Producers',
      description: 'Artists connected to the Detroit house and dance-music lineage.',
      path: '/detroit-house-producers.md',
      filter: (a) => /detroit/i.test(a.primary_scene ?? '') || a.genres.some((g) => /detroit/i.test(g)),
    }),

  'black-house-music-lineage': async () => {
    const artists = (await allArtistProfiles())
      .filter((a) => a.black_house_music_relevance)
      .sort((a, b) => b.scores.education_value_score - a.scores.education_value_score);
    const path = '/black-house-music-lineage.md';
    let md = header(
      'Black House Music Lineage',
      'The Black originators and torchbearers of house music — from Chicago and Detroit to New York, New Jersey and Johannesburg.',
      path,
    );
    md += '\nHouse music was created by Black and Latino communities in Chicago, Detroit and New York. This page tracks artists carrying that lineage forward, with cultural context and sources.\n\n';
    for (const a of artists) {
      md += `### [${a.artist_name}](${abs(`/artist/${a.slug}`)})\n\n`;
      md += `- **Origin:** ${[a.origin_city, a.origin_country].filter(Boolean).join(', ')}\n`;
      md += `- **Relevance:** ${a.black_house_music_relevance}\n`;
      if (a.cultural_lineage) md += `- **Lineage:** ${a.cultural_lineage}\n`;
      md += `- **Profile:** [md](${abs(`/artist/${a.slug}.md`)}) · [json](${abs(`/api/artists/${a.slug}.json`)})\n\n`;
    }
    return md + citationFooter('Black House Music Lineage', path);
  },

  'house-music-genre-taxonomy': async () => {
    const path = '/house-music-genre-taxonomy.md';
    let md = header(
      'House Music Genre Taxonomy',
      'The controlled genre vocabulary used across the House Music Intelligence Database.',
      path,
    );
    md += '\n| Genre | Slug | Artists |\n| --- | --- | --- |\n';
    const artists = await allArtistProfiles();
    for (const g of HOUSE_GENRES) {
      const count = artists.filter((a) => a.genres.includes(g) || a.specific_house_subgenres.includes(g)).length;
      md += `| ${g} | \`${genreSlug(g)}\` | ${count} |\n`;
    }
    return md + citationFooter('House Music Genre Taxonomy', path);
  },

  'genres': async () => {
    const path = '/genres.md';
    let md = header('House Music Genres', 'Browse the database by genre.', path);
    const artists = await allArtistProfiles();
    md += '\n';
    for (const g of HOUSE_GENRES) {
      const n = artists.filter((a) => a.genres.includes(g) || a.specific_house_subgenres.includes(g)).length;
      if (n) md += `- **${g}** — ${n} artist${n === 1 ? '' : 's'} · filter: ${abs(`/api/artists?genre=${encodeURIComponent(g)}`)}\n`;
    }
    return md + citationFooter('House Music Genres', path);
  },

  'cities': async () => {
    const path = '/cities.md';
    const artists = await allArtistProfiles();
    const byCity = new Map<string, number>();
    for (const a of artists) {
      const c = [a.origin_city, a.origin_country].filter(Boolean).join(', ');
      if (c) byCity.set(c, (byCity.get(c) ?? 0) + 1);
    }
    let md = header('House Music by City', 'Cities and scenes represented in the database.', path);
    md += '\n| City | Artists |\n| --- | --- |\n';
    for (const [c, n] of [...byCity.entries()].sort((a, b) => b[1] - a[1])) md += `| ${c} | ${n} |\n`;
    return md + citationFooter('House Music by City', path);
  },

  'scenes': async () => {
    const path = '/scenes.md';
    const artists = await allArtistProfiles();
    const byScene = new Map<string, ArtistProfile[]>();
    for (const a of artists) {
      const s = a.primary_scene ?? 'Unspecified';
      byScene.set(s, [...(byScene.get(s) ?? []), a]);
    }
    let md = header('House Music Scenes', 'Regional and stylistic scenes in house music.', path);
    md += '\n';
    for (const [s, list] of [...byScene.entries()].sort((a, b) => b[1].length - a[1].length)) {
      md += `## ${s}\n\n`;
      md += list.map((a) => `- [${a.artist_name}](${abs(`/artist/${a.slug}`)})`).join('\n') + '\n\n';
    }
    return md + citationFooter('House Music Scenes', path);
  },

  'labels': async () => {
    const path = '/labels.md';
    const labels = await prisma.label.findMany({ orderBy: { labelName: 'asc' } });
    let md = header('House Music Labels', 'Record labels tracked by the database.', path);
    md += '\n| Label | Country | Genres | Website | JSON |\n| --- | --- | --- | --- | --- |\n';
    for (const l of labels) {
      md += `| [${l.labelName}](${abs(`/label/${l.slug}`)}) | ${l.country ?? ''} | ${(l.genresCsv || '')
        .split(',')
        .filter(Boolean)
        .join(', ')} | ${l.website ?? ''} | [json](${abs(`/api/labels/${l.slug}.json`)}) |\n`;
    }
    return md + citationFooter('House Music Labels', path);
  },
  'house-music-labels': () => DOCS['labels'](),

  'sources': async () => {
    const path = '/sources.md';
    const sources = await prisma.source.findMany({ orderBy: [{ sourceType: 'asc' }, { sourceName: 'asc' }] });
    let md = header(
      'Data Sources',
      `The ${sources.length} sources the House Music Intelligence Database is built from. API-first, compliance-first: official APIs where available; robots.txt, rate limits and ToS respected; public data only.`,
      path,
    );
    md += '\n| Source | Type | API | Automated access | Rate limit | Notes |\n| --- | --- | --- | --- | --- | --- |\n';
    for (const s of sources)
      md += `| ${s.sourceName} | ${s.sourceType} | ${s.apiAvailable ? 'yes' : 'no'} | ${s.scrapingAllowed ? 'allowed' : s.apiAvailable ? 'via API' : 'manual/per-site'} | ${s.rateLimit ?? ''} | ${(s.notes ?? '').replace(/\|/g, '/')} |\n`;
    return md + citationFooter('Data Sources', path);
  },

  'about': async () => ABOUT_MD,
  'methodology': async () => METHODOLOGY_MD,
  'cite': async () => CITE_MD,
  'license': async () => LICENSE_MD,

  'knowledge': async () => {
    const path = '/knowledge.md';
    const topics = await allTopics();
    let md = header(
      'House Music Knowledge Graph',
      'The authoritative, citable knowledge base on house music history, culture, pioneers, venues, and its Black origins.',
      path,
    );
    md += `\n${topics.length} encyclopedic entries. Start with the [Black origins of house music](${abs('/topic/black-origins-of-house-music')}).\n\n`;
    const byType = new Map<string, typeof topics>();
    for (const t of topics) byType.set(t.type, [...(byType.get(t.type) ?? []), t]);
    for (const [type, list] of byType) {
      md += `## ${TYPE_LABELS[type] ?? type}\n\n`;
      for (const t of list)
        md += `- [${t.title}](${abs(`/topic/${t.slug}`)}) — [md](${abs(`/topic/${t.slug}.md`)}) · [json](${abs(`/api/topics/${t.slug}.json`)})${t.summary ? ` — ${t.summary}` : ''}\n`;
      md += '\n';
    }
    md += `\nGraph: ${abs('/api/graph')} · linked data: ${abs('/datasets/graph.jsonld')}\n`;
    return md + citationFooter('House Music Knowledge Graph', path);
  },

  'answers': async () => {
    const path = '/answers.md';
    const answers = await topicsByType('answer');
    let md = header('House Music — Direct Answers', 'Authoritative, sourced answers to common questions about house music.', path);
    md += '\n';
    for (const a of answers) {
      md += `## ${a.question}\n\n${a.answer}\n\n_Source-backed: ${a.canonical_url} · ${a.json_url}_\n\n`;
    }
    return md + citationFooter('House Music — Direct Answers', path);
  },

  'changelog': async () => {
    const path = '/changelog.md';
    const log = await prisma.changeLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
    let md = header('Changelog', 'Recent changes to the House Music Intelligence Database.', path);
    md += '\n| When | Type | Entity | Detail |\n| --- | --- | --- | --- |\n';
    for (const c of log)
      md += `| ${c.createdAt.toISOString().slice(0, 10)} | ${c.changeType} | ${c.entityType}${
        c.entitySlug ? ` (${c.entitySlug})` : ''
      } | ${(c.newValue ?? c.fieldName ?? '').slice(0, 80)} |\n`;
    md += `\nMachine-readable: ${abs('/api/changed-since?date=2026-01-01')} · CSV: ${abs('/datasets/change-log.csv')}\n`;
    return md + citationFooter('Changelog', path);
  },
};

export async function renderDoc(name: string): Promise<string | null> {
  const key = name.replace(/\.md$/, '');
  const gen = DOCS[key];
  if (!gen) return null;
  return gen();
}

export const DOC_PATHS = Object.keys(DOCS).map((k) => `/${k}.md`);
