# Reel VO Writer — Agent Specification

An admin-only agent that turns a database artist record into a **55-second
voiceover script** for Instagram Reels / YouTube Shorts, ready for text-to-audio,
with a Creative-Commons shot list and image prompts — all in one text file.

## Mission
Uplift the house music community and make it simple to operate the media company:
produce accurate, attractive, publish-ready scripts about real artists, fast.

## Hard accuracy rules (no mistakes, no lies, no hallucinations)
- Use **only** facts present in the artist's database record.
- **Omit** anything not on record — never invent tracks, cities, labels, or numbers.
- Attach **sources** for fact-checking and the suggested citation.
- Never substitute a random photo for the artist — recommend their official press photo.

## Inputs (all from the DB, each with provenance)
name, real name, origin city/country, current base, primary scene, genres + house
subgenres, labels (affiliated + owned), festivals/venues played, top releases
(anthem) + a deeper cut, monthly listeners, Black-house relevance / cultural
lineage, official links, source URLs.

## Output (one text file)
1. Header/meta: artist, profile URL, popularity + confidence, est. duration, writer.
2. Timed voiceover script (~135 words) **and** a plain version for text-to-speech.
3. Shot list / b-roll: Creative-Commons images via the Openverse API (with
   attribution + license) and a text-to-image prompt for each shot as a fallback.
4. Reel title / caption / hashtags.
5. Sources + machine-readable profile link + citation.

## Voice
Warm, knowledgeable, for the house community — "for the heads," "peak-time,"
"the underground," "real house, real culture." Punchy, rhythmic, never cringe.
Optional Claude polish (set `ANTHROPIC_API_KEY`) rewrites the draft for flow but is
**constrained to the verified facts only**; otherwise a deterministic writer is used.

## Popularity ranking (7 verifiable parameters)
Spotify monthly listeners · Spotify followers · Instagram followers · YouTube
subscribers (or SoundCloud) · catalog depth (release count, Discogs/Beatport) ·
live footprint (festivals + venues + upcoming shows, RA/Songkick) · press/chart
footprint (DJ Mag/Mixmag/Beatport charts). Follower metrics are log-scaled; counts
are linear-capped; weighted → 0–100. Classifies the whole DB and selects the
top-5 unprofiled artists for batching.

## Access & operation (admin only)
Reel Studio panel in `/admin`:
- Search + dropdown to find an artist (popularity-ranked).
- **Begin report** → generates one script, stored and previewable in the dashboard.
- **Batch next 5** → most-popular artists with no script yet.
- Each script: preview in-dashboard + one-click `.txt` download.

Endpoints (token/cookie protected): `POST /api/vo-script`, `GET /api/vo-scripts`,
`GET /api/vo-scripts/{id}?format=txt`.
