import type { Connector } from './base';
import { musicbrainz } from './musicbrainz';
import { wikidata } from './wikidata';
import { wikipedia } from './wikipedia';
import { discogs } from './discogs';
import { spotify } from './spotify';

// Register every connector here. Add new sources by dropping a module that
// implements the Connector interface and listing it below — nothing else in
// the pipeline needs to change. This is the single extension point.
export const CONNECTORS: Connector[] = [
  musicbrainz, // works out of the box (no key)
  wikidata, // works out of the box (no key) — official links + socials
  wikipedia, // works out of the box (no key) — bio
  spotify, // needs SPOTIFY_CLIENT_ID/SECRET
  discogs, // needs DISCOGS_TOKEN
  // --- Scaffolds to add next (each its own module):
  // beatport (charts), traxsource (charts), residentAdvisor (events),
  // youtube, lastfm, bandsintown, songkick, wikidata (SPARQL).
];

export function enrichmentConnectors(): Connector[] {
  return CONNECTORS.filter((c) => c.enrich && c.isConfigured() && c.compliant());
}

export function discoveryConnectors(): Connector[] {
  return CONNECTORS.filter((c) => c.discover && c.isConfigured() && c.compliant());
}

export function connectorStatus() {
  return CONNECTORS.map((c) => ({
    name: c.name,
    configured: c.isConfigured(),
    compliant: c.compliant(),
    can_enrich: !!c.enrich,
    can_discover: !!c.discover,
  }));
}
