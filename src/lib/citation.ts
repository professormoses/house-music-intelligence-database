import { SITE, abs, prettyDate } from './site';

export function suggestedCitation(opts: {
  title: string;
  path: string;
  lastVerified?: string | null;
}): string {
  const url = abs(opts.path);
  return `${SITE.name}. "${opts.title}." Published by ${SITE.publisher}. Last verified ${prettyDate(
    opts.lastVerified,
  )}. URL: ${url}`;
}

export function bibtex(opts: {
  key: string;
  title: string;
  path: string;
  lastVerified?: string | null;
}): string {
  const year = (opts.lastVerified || '').slice(0, 4) || new Date().getFullYear().toString();
  return [
    `@misc{${opts.key},`,
    `  title        = {${opts.title}},`,
    `  author       = {{${SITE.name}}},`,
    `  howpublished = {\\url{${abs(opts.path)}}},`,
    `  year         = {${year}},`,
    `  note         = {Published by ${SITE.publisher}. Last verified ${prettyDate(opts.lastVerified)}}`,
    `}`,
  ].join('\n');
}
