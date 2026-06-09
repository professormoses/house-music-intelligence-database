// Labels, events, venues, contacts and the source registry.

const V = '2026-06-08';

export const SEED_LABELS = [
  {
    slug: 'defected',
    labelName: 'Defected Records',
    website: 'https://defected.com',
    country: 'United Kingdom',
    city: 'London',
    genres: ['House', 'Soulful House', 'Deep House'],
    artistRoster: ['Honey Dijon', 'Sam Divine', 'Low Steppa'],
    contactEmail: 'info@defected.com',
    demoEmail: 'demos@defected.com',
    instagram: 'https://www.instagram.com/defectedrecords',
    beatport: 'https://www.beatport.com/label/defected/1',
    discogs: 'https://www.discogs.com/label/1066',
    confidenceScore: 80,
    sourceUrls: ['https://defected.com', 'https://en.wikipedia.org/wiki/Defected_Records'],
  },
  {
    slug: 'kaoz-theory',
    labelName: 'Kaoz Theory',
    website: 'https://kaoztheory.com',
    country: 'United States',
    genres: ['Deep House', 'House'],
    artistRoster: ['Kerri Chandler'],
    instagram: 'https://www.instagram.com/kaoztheory',
    confidenceScore: 70,
    sourceUrls: ['https://ra.co/labels/kaoztheory'],
  },
  {
    slug: 'soulistic-music',
    labelName: 'Soulistic Music',
    country: 'South Africa',
    genres: ['Afro House', 'Deep House'],
    artistRoster: ['Black Coffee'],
    confidenceScore: 68,
    sourceUrls: ['https://www.discogs.com/label/57803'],
  },
  {
    slug: 'cuttin-headz',
    labelName: 'Cuttin Headz',
    country: 'United States',
    genres: ['Tech House', 'House'],
    artistRoster: ['The Martinez Brothers'],
    confidenceScore: 66,
    sourceUrls: ['https://ra.co/labels/cuttinheadz'],
  },
  {
    slug: 'anjunadeep',
    labelName: 'Anjunadeep',
    website: 'https://anjunadeep.com',
    country: 'United Kingdom',
    city: 'London',
    genres: ['Deep House', 'Melodic House', 'Organic House'],
    artistRoster: ['Lane 8', 'Yotto'],
    demoEmail: 'demos@anjunadeep.com',
    confidenceScore: 75,
    sourceUrls: ['https://anjunadeep.com'],
  },
];

export const SEED_EVENTS = [
  {
    slug: 'hi-ibiza-black-coffee-2026',
    eventName: 'Black Coffee at Hï Ibiza',
    date: '2026-07-04',
    city: 'Ibiza',
    country: 'Spain',
    venue: 'Hï Ibiza',
    promoter: 'Ushuaïa Entertainment',
    lineup: ['Black Coffee'],
    ticketLink: 'https://www.hiibiza.com',
    genres: ['Afro House', 'Deep House'],
    confidenceScore: 65,
    sourceUrl: 'https://www.hiibiza.com',
  },
  {
    slug: 'defected-croatia-2026',
    eventName: 'Defected Croatia 2026',
    date: '2026-08-05',
    city: 'Tisno',
    country: 'Croatia',
    venue: 'The Garden Tisno',
    promoter: 'Defected',
    lineup: ['Honey Dijon', 'Sam Divine'],
    ticketLink: 'https://defected.com/croatia',
    genres: ['House', 'Soulful House'],
    confidenceScore: 62,
    sourceUrl: 'https://defected.com/croatia',
  },
];

export const SEED_VENUES = [
  {
    slug: 'hi-ibiza',
    venueName: 'Hï Ibiza',
    city: 'Ibiza',
    country: 'Spain',
    website: 'https://www.hiibiza.com',
    instagram: 'https://www.instagram.com/hiibizaofficial',
    genresSupported: ['House', 'Tech House', 'Afro House'],
    artistsBooked: ['Black Coffee'],
    confidenceScore: 70,
    sourceUrls: ['https://www.hiibiza.com'],
  },
  {
    slug: 'the-garden-tisno',
    venueName: 'The Garden Tisno',
    city: 'Tisno',
    country: 'Croatia',
    website: 'https://thegardentisno.com',
    genresSupported: ['House', 'Deep House', 'Soulful House'],
    artistsBooked: ['Honey Dijon'],
    confidenceScore: 60,
    sourceUrls: ['https://thegardentisno.com'],
  },
];

export const SEED_CONTACTS = [
  {
    artistSlug: 'black-coffee',
    name: 'Management (public)',
    role: 'management',
    company: 'Soulistic Music',
    email: null,
    sourceUrl: 'https://www.realblackcoffee.com',
    confidenceScore: 40,
  },
  {
    artistSlug: 'honey-dijon',
    name: 'Booking (public)',
    role: 'booking',
    company: 'Defected',
    email: null,
    sourceUrl: 'https://defected.com',
    confidenceScore: 35,
  },
];

// The source registry doubles as the compliance ledger: which sources have
// APIs, which permit automated access, and the rate limits we respect.
export const SEED_SOURCES = [
  { sourceName: 'Discogs', sourceType: 'catalog', baseUrl: 'https://api.discogs.com', apiAvailable: true, scrapingAllowed: false, rateLimit: '60/min (authenticated)', notes: 'Use official API + token. Respect 429s.' },
  { sourceName: 'MusicBrainz', sourceType: 'catalog', baseUrl: 'https://musicbrainz.org/ws/2', apiAvailable: true, scrapingAllowed: false, rateLimit: '1 req/sec', notes: 'Requires descriptive User-Agent with contact.' },
  { sourceName: 'Beatport', sourceType: 'catalog', baseUrl: 'https://www.beatport.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'No public API for V1. Use public chart pages only where robots.txt permits; otherwise manual.' },
  { sourceName: 'Traxsource', sourceType: 'catalog', baseUrl: 'https://www.traxsource.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Public charts only; check robots.txt.' },
  { sourceName: 'Spotify', sourceType: 'streaming', baseUrl: 'https://api.spotify.com/v1', apiAvailable: true, scrapingAllowed: false, rateLimit: 'rolling 30s window', notes: 'Client-credentials flow. No monthly-listener field in API (use followers/popularity).' },
  { sourceName: 'YouTube', sourceType: 'streaming', baseUrl: 'https://www.googleapis.com/youtube/v3', apiAvailable: true, scrapingAllowed: false, rateLimit: 'quota units/day', notes: 'YouTube Data API v3.' },
  { sourceName: 'Resident Advisor', sourceType: 'events', baseUrl: 'https://ra.co', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'GraphQL endpoint exists but is unofficial; respect robots.txt and ToS.' },
  { sourceName: 'SoundCloud', sourceType: 'streaming', baseUrl: 'https://api.soundcloud.com', apiAvailable: true, scrapingAllowed: false, rateLimit: 'varies', notes: 'API registration is gated; link-only in V1.' },
  { sourceName: 'Bandcamp', sourceType: 'streaming', baseUrl: 'https://bandcamp.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'No general public API; link-only.' },
  { sourceName: 'Wikidata', sourceType: 'catalog', baseUrl: 'https://query.wikidata.org/sparql', apiAvailable: true, scrapingAllowed: true, rateLimit: 'fair use', notes: 'SPARQL endpoint. Great for cross-IDs.' },
  { sourceName: 'Wikipedia', sourceType: 'press', baseUrl: 'https://en.wikipedia.org/w/api.php', apiAvailable: true, scrapingAllowed: true, rateLimit: 'fair use', notes: 'MediaWiki API.' },
  { sourceName: 'Last.fm', sourceType: 'streaming', baseUrl: 'https://ws.audioscrobbler.com/2.0', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'Needs API key.' },
  { sourceName: 'Bandsintown', sourceType: 'events', baseUrl: 'https://rest.bandsintown.com', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'Needs app_id.' },
  { sourceName: 'Songkick', sourceType: 'events', baseUrl: 'https://api.songkick.com/api/3.0', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'Needs API key (request access).' },
  { sourceName: 'Instagram', sourceType: 'social', baseUrl: 'https://www.instagram.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Collect only public profile URLs linked from official artist/label pages. No login, no scraping of private data.' },

  // Streaming & catalog
  { sourceName: 'Apple Music', sourceType: 'streaming', baseUrl: 'https://api.music.apple.com', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'MusicKit API — requires Apple developer token.' },
  { sourceName: 'YouTube Music', sourceType: 'streaming', baseUrl: 'https://music.youtube.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'No official API; reachable via YouTube Data API for some data.' },
  { sourceName: '1001Tracklists', sourceType: 'tracklists', baseUrl: 'https://www.1001tracklists.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'No public API and strict ToS; use only with permission / manual.' },
  { sourceName: 'AllMusic', sourceType: 'reference', baseUrl: 'https://www.allmusic.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'No public API; reference only.' },

  // Events & ticketing
  { sourceName: 'EDM Train', sourceType: 'events', baseUrl: 'https://edmtrain.com', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'API available with key.' },
  { sourceName: 'Dice', sourceType: 'events', baseUrl: 'https://dice.fm', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'No public API; public event pages only where permitted.' },
  { sourceName: 'Eventbrite', sourceType: 'events', baseUrl: 'https://www.eventbriteapi.com/v3', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'Official API with OAuth token.' },
  { sourceName: 'Festival websites', sourceType: 'events', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: lineup pages of major festivals; per-site robots.txt + ToS.' },
  { sourceName: 'Venue calendars', sourceType: 'events', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: club/venue event calendars; per-site compliance.' },
  { sourceName: 'Promoter websites', sourceType: 'events', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: promoter event listings; per-site compliance.' },
  { sourceName: 'Facebook event pages', sourceType: 'events', baseUrl: 'https://www.facebook.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Public event info only; no login/scraping of private data.' },

  // Press & video
  { sourceName: 'Boiler Room', sourceType: 'press', baseUrl: 'https://boilerroom.tv', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Set/interview links; manual or via YouTube.' },
  { sourceName: 'Mixmag', sourceType: 'press', baseUrl: 'https://mixmag.net', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Press mentions; manual citation.' },
  { sourceName: 'DJ Mag', sourceType: 'press', baseUrl: 'https://djmag.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Press mentions / Top 100; manual citation.' },

  // Labels
  { sourceName: 'Defected Records', sourceType: 'label', baseUrl: 'https://defected.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Roster + release pages.' },
  { sourceName: 'Glitterbox', sourceType: 'label', baseUrl: 'https://defected.com/glitterbox', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Defected sub-brand.' },
  { sourceName: 'Toolroom Records', sourceType: 'label', baseUrl: 'https://www.toolroomrecords.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Roster + demo policy.' },
  { sourceName: 'Anjunadeep', sourceType: 'label', baseUrl: 'https://anjunadeep.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Roster + demo policy.' },
  { sourceName: 'Nervous Records', sourceType: 'label', baseUrl: 'https://www.nervousrecords.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'NYC house catalog.' },
  { sourceName: 'Strictly Rhythm', sourceType: 'label', baseUrl: 'https://www.strictly.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'NYC house catalog.' },
  { sourceName: 'Kaoz Theory', sourceType: 'label', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Kerri Chandler label.' },
  { sourceName: 'Spinnin Deep', sourceType: 'label', baseUrl: 'https://spinninrecords.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Spinnin sub-label.' },
  { sourceName: 'Afro House labels', sourceType: 'label', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: Afro House labels (e.g. MoBlack, Get Physical AfroBros, Offering Recordings).' },
  { sourceName: 'Artist websites', sourceType: 'web', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: official artist sites — booking/management/contact links.' },
  { sourceName: 'Label websites', sourceType: 'web', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: official label sites — roster/demo/contact.' },
  { sourceName: 'Booking agency websites', sourceType: 'web', baseUrl: '', apiAvailable: false, scrapingAllowed: false, rateLimit: 'per-site', notes: 'Category: agency rosters + booking contacts.' },

  // Charts & playlists
  { sourceName: 'Beatport Charts', sourceType: 'charts', baseUrl: 'https://www.beatport.com/charts', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Discovery seed for top tracks/artists.' },
  { sourceName: 'Traxsource Charts', sourceType: 'charts', baseUrl: 'https://www.traxsource.com/charts', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Discovery seed for soulful/deep/Afro house.' },
  { sourceName: 'Spotify Playlists', sourceType: 'playlists', baseUrl: 'https://api.spotify.com/v1', apiAvailable: true, scrapingAllowed: false, rateLimit: 'rolling window', notes: 'Discovery via editorial house playlists (Spotify API).' },
  { sourceName: 'Apple Music Playlists', sourceType: 'playlists', baseUrl: 'https://api.music.apple.com', apiAvailable: true, scrapingAllowed: false, rateLimit: 'fair use', notes: 'Discovery via Apple editorial playlists (MusicKit).' },
  { sourceName: 'Shazam Charts', sourceType: 'charts', baseUrl: 'https://www.shazam.com/charts', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Trend signal; limited access.' },

  // Social & link-in-bio (public links only)
  { sourceName: 'TikTok', sourceType: 'social', baseUrl: 'https://www.tiktok.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Public profile URLs only; no private data.' },
  { sourceName: 'Linktree', sourceType: 'links', baseUrl: 'https://linktr.ee', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Public link-in-bio pages; extract official links only.' },
  { sourceName: 'Beacons', sourceType: 'links', baseUrl: 'https://beacons.ai', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Public link-in-bio pages.' },
  { sourceName: 'Hypeddit', sourceType: 'links', baseUrl: 'https://hypeddit.com', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Marketing/link pages.' },
  { sourceName: 'ToneDen', sourceType: 'links', baseUrl: 'https://www.toneden.io', apiAvailable: false, scrapingAllowed: false, rateLimit: 'n/a', notes: 'Marketing/link pages.' },
  { sourceName: 'Reddit communities', sourceType: 'community', baseUrl: 'https://oauth.reddit.com', apiAvailable: true, scrapingAllowed: false, rateLimit: 'per Reddit API terms', notes: 'r/house, r/DeepHouse etc. via official API.' },

  // Search
  { sourceName: 'Google Search', sourceType: 'search', baseUrl: 'https://www.googleapis.com/customsearch/v1', apiAvailable: true, scrapingAllowed: false, rateLimit: 'quota/day', notes: 'Programmable Search Engine / SerpAPI with advanced operators for discovery.' },
];

export { V };
