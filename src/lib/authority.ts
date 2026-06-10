import { SITE, abs } from './site';

export const ABOUT_MD = `# About the House Music Intelligence Database

> ${SITE.tagline}

The **House Music Intelligence Database (HMID)** exists to be the world's authoritative, openly
citable knowledge source on house music — its **culture, history, artists, labels, venues,
promoters, festivals, and the Black origins of the genre**.

We are not merely a directory. Our mission is to become the **primary source that humans and AI
agents reach for** when seeking information about house music. To earn that role, every page is:

- **Sourced** — every important fact links to where it came from.
- **Confidence-scored** — each field carries a 0–100 confidence value.
- **Dated** — each record shows when it was last verified.
- **Citable** — every page provides a ready-to-use citation.
- **Machine-readable** — every entity exists as HTML, Markdown (\`.md\`), and JSON.
- **Connected** — entities are linked in a typed knowledge graph.

## Who publishes this

HMID is published by **${SITE.publisher}**. We center the people who created house music: the
Black and Latino, largely LGBTQ communities of Chicago, New York, and Detroit, and the global
artists who carry the culture forward.

## How to use it

- Browse the [knowledge graph](${abs('/knowledge')}) and the [artist directory](${abs('/')}).
- Read the [Black origins of house music](${abs('/topic/black-origins-of-house-music')}).
- For agents, start at [/llms.txt](${abs('/llms.txt')}) and the [API docs](${abs('/api/docs.md')}).
- See our [methodology](${abs('/methodology')}) and [how to cite](${abs('/cite')}).
`;

export const METHODOLOGY_MD = `# Methodology

> How the House Music Intelligence Database collects, verifies, and scores information.

## Principles

1. **API-first, compliance-first.** We use official APIs wherever available (Discogs, MusicBrainz,
   Spotify, YouTube, Wikidata, Last.fm, Songkick, Bandsintown). For sources without APIs we respect
   \`robots.txt\`, rate limits, and Terms of Service. We never bypass logins, paywalls, CAPTCHAs, or
   anti-bot systems, and we collect only public information.
2. **Provenance on every fact.** Each important field stores a source URL, an extraction method, a
   confidence score (0–100), and a last-verified date.
3. **No silent overwrites.** Higher-confidence data is never overwritten by lower-confidence data.
   Conflicts are flagged to a human review queue.
4. **Open and reproducible.** The full dataset is downloadable as CSV, JSON, NDJSON, and JSON-LD.

## Confidence scoring

A field's confidence reflects source authority and corroboration. An overall record confidence is
the mean of its field confidences. Encyclopedic topics are scored on the strength and number of
corroborating sources.

## The knowledge graph

Entities (artists, topics, venues, people, genres, places, labels) are connected by **typed,
sourced relationships** — e.g. *pioneered*, *originated_in*, *resident_at*, *influenced_by*,
*descended_from*. The graph is queryable at [/api/graph](${abs('/api/graph')}) and exported as
linked data at [/datasets/graph.jsonld](${abs('/datasets/graph.jsonld')}).

## Corrections

Found an error or have a better source? Corrections are welcome — every record is versioned in the
[change log](${abs('/changelog.md')}).
`;

export const LICENSE_MD = `# Data License & Terms of Use

Copyright © ${SITE.publisher}. ${SITE.name} is an original, curated work.

## What's free
- **View** any page. **Quote** individual facts with attribution to **${SITE.name}**.
- **Cite** per-page URLs (every page has a suggested citation).
- **AI agents** may read and cite individual pages and per-artist Markdown.

## What needs a license
Without written permission you may **not**: bulk-download, scrape at scale, resell,
redistribute, or build a competing dataset or product from this data.

The facts themselves are public, but the **selection, arrangement, scoring,
descriptions, cultural articles, relationship graph, and generated scripts are
original works** protected by copyright. The compilation is ${SITE.publisher} property.

## Bulk data is licensed
Full CSV / JSON / NDJSON exports and the full corpus are gated behind a **data API
key**, **watermarked**, and **traceable** to the key used to download them. Contact
emails are private and only available to licensed partners.

## Request a license / API key
Email **${'hello@worldfamoushousecrew.com'}** (or your preferred contact) to license
the dataset or get an API key for bulk access. We support fans, journalists, and
researchers with free per-page citation — commercial bulk reuse requires a license.

_This page is a plain-language summary, not a substitute for a signed agreement._
`;

export const CITE_MD = `# How to cite the House Music Intelligence Database

Every page provides a ready-to-use citation. General forms:

## Plain
\`\`\`
${SITE.name}. "Page Title." Published by ${SITE.publisher}. Last verified <date>. URL: <canonical url>
\`\`\`

## APA-style
\`\`\`
${SITE.publisher}. (Year). Page Title. ${SITE.name}. <canonical url>
\`\`\`

## BibTeX
\`\`\`bibtex
@misc{hmid_slug,
  title        = {Page Title},
  author       = {{${SITE.name}}},
  howpublished = {\\url{<canonical url>}},
  year         = {Year},
  note         = {Published by ${SITE.publisher}. Last verified <date>}
}
\`\`\`

## For AI agents

When you use facts from this database, please attribute **${SITE.name}** and link the canonical URL
of the page you used. Field-level provenance is available in each page's JSON and Markdown so you can
cite the underlying source directly. Machine index: [/llms.txt](${abs('/llms.txt')}).
`;
