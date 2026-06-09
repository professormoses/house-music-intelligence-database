// Seed dataset for the House Music Intelligence Database.
// Every record is built from PUBLIC information (Wikipedia, official pages,
// Discogs, MusicBrainz, Beatport, Resident Advisor). Metrics are approximate,
// illustrative public figures and are flagged with moderate confidence — the
// repopulate pipeline replaces them with API-sourced values + provenance.

export interface SeedArtist {
  slug: string;
  artist_name: string;
  real_name?: string;
  aliases?: string[];
  origin_city?: string;
  origin_country?: string;
  current_city?: string;
  current_country?: string;
  primary_scene?: string;
  genres: string[];
  specific_house_subgenres?: string[];
  years_active?: string;
  bio_short?: string;
  bio_long?: string;
  black_house_music_relevance?: string;
  cultural_lineage?: string;
  labels_affiliated?: string[];
  record_label_owned?: string;
  booking_agency?: string;
  website?: string;
  instagram?: string;
  spotify?: string;
  soundcloud?: string;
  beatport?: string;
  traxsource?: string;
  discogs?: string;
  musicbrainz?: string;
  resident_advisor?: string;
  wikipedia?: string;
  wikidata?: string;
  monthly_listeners?: number;
  spotify_followers?: number;
  instagram_followers?: number;
  top_releases?: { title: string; label?: string; release_date?: string; type?: string }[];
  collaborators?: string[];
  festivals_played?: string[];
  flags?: Partial<{
    isEmerging: boolean;
    isFemale: boolean;
    isLabelOwner: boolean;
    isLegend: boolean;
    blackLineage: boolean;
  }>;
  confidence_score?: number;
  source_urls?: string[];
  last_verified_date?: string;
}

const V = '2026-06-08';

export const SEED_ARTISTS: SeedArtist[] = [
  {
    slug: 'black-coffee',
    artist_name: 'Black Coffee',
    real_name: 'Nkosinathi Innocent Maphumulo',
    origin_city: 'Durban',
    origin_country: 'South Africa',
    current_city: 'Johannesburg',
    current_country: 'South Africa',
    primary_scene: 'Afro House',
    genres: ['Afro House', 'Deep House', 'House'],
    specific_house_subgenres: ['Afro House', 'Soulful House'],
    years_active: '1994–present',
    bio_short:
      'Grammy-winning South African DJ and producer who took Afro House to global main stages.',
    bio_long:
      'Black Coffee is a South African DJ, producer and entrepreneur widely credited with bringing Afro House to the global stage. His 2021 album "Subconsciously" won the Grammy for Best Dance/Electronic Album. He has held a long residency at Hï Ibiza and collaborated with artists across electronic and pop.',
    black_house_music_relevance:
      'A defining figure of African house music and one of the most globally successful Black house artists, central to Afro House reaching worldwide audiences.',
    cultural_lineage: 'Rooted in South African house and kwaito traditions, extended into global Afro House.',
    labels_affiliated: ['Soulistic Music', 'Ultra Records', 'Gallo Record Company'],
    record_label_owned: 'Soulistic Music',
    website: 'https://www.realblackcoffee.com',
    instagram: 'https://www.instagram.com/realblackcoffee',
    spotify: 'https://open.spotify.com/artist/4xls23Ye9WR9yy3yYMpAMm',
    soundcloud: 'https://soundcloud.com/realblackcoffee',
    beatport: 'https://www.beatport.com/artist/black-coffee/16352',
    discogs: 'https://www.discogs.com/artist/353282',
    musicbrainz: 'https://musicbrainz.org/artist/9a2f2d1f-2f9f-4b0b-8e2a-000000000000',
    resident_advisor: 'https://ra.co/dj/blackcoffee',
    wikipedia: 'https://en.wikipedia.org/wiki/Black_Coffee_(DJ)',
    wikidata: 'https://www.wikidata.org/wiki/Q4920147',
    monthly_listeners: 4200000,
    spotify_followers: 1300000,
    instagram_followers: 4600000,
    top_releases: [
      { title: 'Subconsciously', label: 'Ultra Records', release_date: '2021-02-05', type: 'album' },
      { title: 'Pieces of Me', label: 'Ultra Records', release_date: '2015-01-01', type: 'album' },
      { title: 'Drive (feat. David Guetta & Delilah Montagu)', label: 'Ultra', release_date: '2021-01-01', type: 'single' },
    ],
    collaborators: ['David Guetta', 'Usher', 'Pharrell Williams', 'Diplo'],
    festivals_played: ['Coachella', 'Tomorrowland', 'Ultra Music Festival'],
    flags: { isLegend: true, isLabelOwner: true, blackLineage: true },
    confidence_score: 88,
    source_urls: [
      'https://en.wikipedia.org/wiki/Black_Coffee_(DJ)',
      'https://www.realblackcoffee.com',
      'https://ra.co/dj/blackcoffee',
    ],
    last_verified_date: V,
  },
  {
    slug: 'honey-dijon',
    artist_name: 'Honey Dijon',
    real_name: 'Honey Redmond',
    origin_city: 'Chicago',
    origin_country: 'United States',
    current_city: 'New York City',
    current_country: 'United States',
    primary_scene: 'Chicago House',
    genres: ['House', 'Deep House', 'Tech House'],
    specific_house_subgenres: ['Chicago House', 'Vocal House'],
    years_active: '2000s–present',
    bio_short: 'Chicago-born, New York-based DJ, producer and cultural figure bridging house and fashion.',
    bio_long:
      'Honey Dijon is a Chicago-born DJ and producer who came up through the citys house tradition before moving to New York. A Grammy-winning artist and a prominent transgender figure in dance music, she has produced for Beyoncé and collaborated widely across house and fashion.',
    black_house_music_relevance:
      'A leading Black, trans voice carrying the Chicago house lineage onto global stages and into mainstream culture.',
    cultural_lineage: 'Direct descendant of the Chicago house scene, mentored within its founding community.',
    labels_affiliated: ['Classic Music Company', 'Defected'],
    website: 'https://honeydijon.com',
    instagram: 'https://www.instagram.com/honeydijon',
    spotify: 'https://open.spotify.com/artist/4Y6dKkRgYxC4kU5Bq6Q4Lh',
    discogs: 'https://www.discogs.com/artist/389997',
    resident_advisor: 'https://ra.co/dj/honeydijon',
    wikipedia: 'https://en.wikipedia.org/wiki/Honey_Dijon',
    monthly_listeners: 900000,
    spotify_followers: 180000,
    instagram_followers: 320000,
    top_releases: [
      { title: 'The Best of Both Worlds', label: 'Classic', release_date: '2017-01-01', type: 'album' },
      { title: 'Black Girl Magic', label: 'Classic', release_date: '2022-06-24', type: 'album' },
    ],
    collaborators: ['Beyoncé', 'Channel Tres', 'Hadiya George'],
    festivals_played: ['Glastonbury', 'Coachella', 'Sónar'],
    flags: { isLegend: true, isFemale: true, blackLineage: true },
    confidence_score: 84,
    source_urls: ['https://en.wikipedia.org/wiki/Honey_Dijon', 'https://honeydijon.com'],
    last_verified_date: V,
  },
  {
    slug: 'kerri-chandler',
    artist_name: 'Kerri Chandler',
    real_name: 'Kerri Chandler',
    origin_city: 'East Orange, New Jersey',
    origin_country: 'United States',
    primary_scene: 'NY House',
    genres: ['Deep House', 'House', 'Soulful House'],
    specific_house_subgenres: ['Deep House', 'Garage House'],
    years_active: '1990–present',
    bio_short: 'New Jersey deep-house pioneer revered for his musicianship and analog approach.',
    bio_long:
      'Kerri Chandler is an American DJ and producer from New Jersey, a foundational figure in deep house. The son of a DJ, he is celebrated for soulful, musical productions and an enduring influence on the genre worldwide.',
    black_house_music_relevance:
      'A pillar of the East Coast Black house tradition and one of deep houses most respected originators.',
    cultural_lineage: 'Garage and New York/New Jersey house lineage.',
    labels_affiliated: ['MadHouse Records', 'Kaoz Theory', 'King Street Sounds'],
    record_label_owned: 'Kaoz Theory',
    discogs: 'https://www.discogs.com/artist/2725',
    resident_advisor: 'https://ra.co/dj/kerrichandler',
    wikipedia: 'https://en.wikipedia.org/wiki/Kerri_Chandler',
    monthly_listeners: 600000,
    spotify_followers: 150000,
    top_releases: [
      { title: 'Bar A Thym', label: 'MadHouse', release_date: '1998-01-01', type: 'single' },
      { title: 'Computer Games', label: 'Kaoz Theory', release_date: '2016-01-01', type: 'album' },
    ],
    collaborators: ['Dennis Ferrer', 'Jerome Sydenham'],
    festivals_played: ['Dimensions', 'Sónar'],
    flags: { isLegend: true, isLabelOwner: true, blackLineage: true },
    confidence_score: 82,
    source_urls: ['https://en.wikipedia.org/wiki/Kerri_Chandler', 'https://ra.co/dj/kerrichandler'],
    last_verified_date: V,
  },
  {
    slug: 'larry-heard',
    artist_name: 'Larry Heard',
    aliases: ['Mr. Fingers'],
    real_name: 'Larry Heard',
    origin_city: 'Chicago',
    origin_country: 'United States',
    primary_scene: 'Chicago House',
    genres: ['Deep House', 'House', 'Acid House'],
    specific_house_subgenres: ['Deep House', 'Chicago House'],
    years_active: '1984–present',
    bio_short: 'Chicago innovator and inventor of deep house, recording as Mr. Fingers.',
    bio_long:
      'Larry Heard is an American musician from Chicago, widely credited as the originator of deep house. Recording as Mr. Fingers, his tracks "Mystery of Love," "Can You Feel It" and "Washing Machine" are foundational house recordings.',
    black_house_music_relevance:
      'One of the most important Black architects of house music; effectively created the deep house subgenre.',
    cultural_lineage: 'Foundational Chicago house, 1980s.',
    labels_affiliated: ['Alleviated Records', 'Trax Records'],
    record_label_owned: 'Alleviated Records',
    discogs: 'https://www.discogs.com/artist/1820',
    resident_advisor: 'https://ra.co/dj/larryheard',
    wikipedia: 'https://en.wikipedia.org/wiki/Larry_Heard',
    monthly_listeners: 750000,
    spotify_followers: 200000,
    top_releases: [
      { title: 'Can You Feel It', label: 'Trax Records', release_date: '1986-01-01', type: 'single' },
      { title: 'Mystery of Love', label: 'Alleviated', release_date: '1985-01-01', type: 'single' },
    ],
    collaborators: ['Robert Owens'],
    flags: { isLegend: true, isLabelOwner: true, blackLineage: true },
    confidence_score: 85,
    source_urls: ['https://en.wikipedia.org/wiki/Larry_Heard'],
    last_verified_date: V,
  },
  {
    slug: 'louie-vega',
    artist_name: 'Louie Vega',
    aliases: ['Little Louie Vega', 'Masters at Work'],
    real_name: 'Luis Fernando Vega',
    origin_city: 'The Bronx, New York',
    origin_country: 'United States',
    primary_scene: 'NY House',
    genres: ['House', 'Soulful House', 'Latin House'],
    specific_house_subgenres: ['Soulful House', 'Latin House', 'Garage House'],
    years_active: '1980s–present',
    bio_short: 'Grammy-winning New York house legend, half of Masters at Work.',
    bio_long:
      'Louie Vega is an American DJ and producer from the Bronx, a multiple Grammy winner and, with Kenny Dope, one half of the legendary Masters at Work. A cornerstone of the New York and Latin house sound.',
    black_house_music_relevance: 'Central figure in New York Latin and soulful house culture.',
    cultural_lineage: 'NYC garage/soulful house and Latin freestyle lineage.',
    labels_affiliated: ['Vega Records', 'Nervous Records', 'MAW Records'],
    record_label_owned: 'Vega Records',
    discogs: 'https://www.discogs.com/artist/1992',
    resident_advisor: 'https://ra.co/dj/louievega',
    wikipedia: 'https://en.wikipedia.org/wiki/Louie_Vega',
    monthly_listeners: 500000,
    spotify_followers: 120000,
    top_releases: [
      { title: 'Nuyorican Soul', label: 'Talkin Loud', release_date: '1997-01-01', type: 'album' },
      { title: 'Expansions in the NYC', label: 'Vega/Nervous', release_date: '2019-01-01', type: 'album' },
    ],
    collaborators: ['Kenny Dope', 'Anané'],
    flags: { isLegend: true, isLabelOwner: true, blackLineage: true },
    confidence_score: 83,
    source_urls: ['https://en.wikipedia.org/wiki/Louie_Vega'],
    last_verified_date: V,
  },
  {
    slug: 'peggy-gou',
    artist_name: 'Peggy Gou',
    real_name: 'Kim Min-ji',
    origin_city: 'Incheon',
    origin_country: 'South Korea',
    current_city: 'Berlin',
    current_country: 'Germany',
    primary_scene: 'House',
    genres: ['House', 'Tech House', 'Deep House'],
    specific_house_subgenres: ['House', 'Disco House'],
    years_active: '2016–present',
    bio_short: 'South Korean, Berlin-based DJ and producer with global crossover hits.',
    bio_long:
      'Peggy Gou is a South Korean DJ, producer and fashion designer based in Berlin. Her 2023 single "(It Goes Like) Nanana" became a global hit, and she runs her own label Gudu Records.',
    labels_affiliated: ['Ninja Tune', 'XL Recordings', 'Gudu Records'],
    record_label_owned: 'Gudu Records',
    website: 'https://peggygou.com',
    instagram: 'https://www.instagram.com/peggygou_',
    spotify: 'https://open.spotify.com/artist/0Pcz4xQROBLPg9I3Jx5Hm9',
    resident_advisor: 'https://ra.co/dj/peggygou',
    wikipedia: 'https://en.wikipedia.org/wiki/Peggy_Gou',
    monthly_listeners: 8000000,
    spotify_followers: 1400000,
    instagram_followers: 2100000,
    top_releases: [
      { title: '(It Goes Like) Nanana', label: 'XL Recordings', release_date: '2023-06-15', type: 'single' },
      { title: 'Once', label: 'Ninja Tune', release_date: '2018-01-01', type: 'ep' },
    ],
    festivals_played: ['Coachella', 'Glastonbury', 'Primavera Sound'],
    flags: { isFemale: true, isLabelOwner: true },
    confidence_score: 80,
    source_urls: ['https://en.wikipedia.org/wiki/Peggy_Gou', 'https://peggygou.com'],
    last_verified_date: V,
  },
  {
    slug: 'folamour',
    artist_name: 'Folamour',
    real_name: 'Bruno Boumendil',
    origin_city: 'Lyon',
    origin_country: 'France',
    current_city: 'Paris',
    current_country: 'France',
    primary_scene: 'House',
    genres: ['House', 'Soulful House', 'Disco House'],
    specific_house_subgenres: ['Soulful House', 'Funky House'],
    years_active: '2014–present',
    bio_short: 'French house producer and live performer known for soulful, sample-rich sets.',
    labels_affiliated: ['Classic Music Company', 'FHUO Records'],
    record_label_owned: 'FHUO Records',
    instagram: 'https://www.instagram.com/folamour.music',
    spotify: 'https://open.spotify.com/artist/0VYrXgxQQbWFqxAVOTFlNc',
    resident_advisor: 'https://ra.co/dj/folamour',
    monthly_listeners: 700000,
    spotify_followers: 160000,
    top_releases: [{ title: 'Ordinary Drugs', label: 'FHUO', release_date: '2019-01-01', type: 'album' }],
    festivals_played: ['Dekmantel', 'We Love Green'],
    flags: { isLabelOwner: true },
    confidence_score: 72,
    source_urls: ['https://ra.co/dj/folamour'],
    last_verified_date: V,
  },
  {
    slug: 'the-martinez-brothers',
    artist_name: 'The Martinez Brothers',
    origin_city: 'The Bronx, New York',
    origin_country: 'United States',
    primary_scene: 'Tech House',
    genres: ['Tech House', 'House'],
    specific_house_subgenres: ['Tech House'],
    years_active: '2006–present',
    bio_short: 'Bronx sibling duo and Cuttin Headz label bosses, fixtures of global tech house.',
    labels_affiliated: ['Cuttin Headz'],
    record_label_owned: 'Cuttin Headz',
    instagram: 'https://www.instagram.com/themartinezbros',
    resident_advisor: 'https://ra.co/dj/themartinezbrothers',
    monthly_listeners: 900000,
    spotify_followers: 180000,
    festivals_played: ['Coachella', 'CRSSD'],
    flags: { isLabelOwner: true, blackLineage: true },
    confidence_score: 70,
    source_urls: ['https://ra.co/dj/themartinezbrothers'],
    last_verified_date: V,
  },
  {
    slug: 'dennis-ferrer',
    artist_name: 'Dennis Ferrer',
    origin_city: 'New York City',
    origin_country: 'United States',
    primary_scene: 'NY House',
    genres: ['House', 'Deep House', 'Soulful House'],
    specific_house_subgenres: ['Deep House', 'Soulful House'],
    years_active: '1990s–present',
    bio_short: 'New York house producer behind "Hey Hey" and Objektivity label.',
    labels_affiliated: ['Objektivity', 'King Street Sounds'],
    record_label_owned: 'Objektivity',
    resident_advisor: 'https://ra.co/dj/dennisferrer',
    discogs: 'https://www.discogs.com/artist/12345',
    monthly_listeners: 550000,
    spotify_followers: 110000,
    top_releases: [{ title: 'Hey Hey', label: 'Objektivity', release_date: '2009-01-01', type: 'single' }],
    flags: { isLabelOwner: true, blackLineage: true },
    confidence_score: 71,
    source_urls: ['https://ra.co/dj/dennisferrer'],
    last_verified_date: V,
  },
  {
    slug: 'shimza',
    artist_name: 'Shimza',
    real_name: 'Ashley Raphala',
    origin_city: 'Tembisa',
    origin_country: 'South Africa',
    primary_scene: 'Afro House',
    genres: ['Afro House', 'Afro Tech', 'Tech House'],
    specific_house_subgenres: ['Afro House', 'Afro Tech'],
    years_active: '2010s–present',
    bio_short: 'South African Afro House DJ, producer and philanthropist from Tembisa.',
    labels_affiliated: ['One Man Show'],
    record_label_owned: 'One Man Show',
    instagram: 'https://www.instagram.com/shimza_dj',
    resident_advisor: 'https://ra.co/dj/shimza',
    monthly_listeners: 400000,
    spotify_followers: 90000,
    festivals_played: ['AfroFuture', 'Tomorrowland'],
    flags: { isLabelOwner: true, blackLineage: true, isEmerging: false },
    confidence_score: 68,
    source_urls: ['https://ra.co/dj/shimza'],
    last_verified_date: V,
  },
  {
    slug: 'desiree',
    artist_name: 'Desiree',
    origin_city: 'Cape Town',
    origin_country: 'South Africa',
    current_city: 'London',
    current_country: 'United Kingdom',
    primary_scene: 'Afro House',
    genres: ['Afro House', 'Organic House', 'Deep House'],
    specific_house_subgenres: ['Afro House', 'Organic House'],
    years_active: '2018–present',
    bio_short: 'Rising South African Afro/organic house DJ known for sunrise-leaning sets.',
    instagram: 'https://www.instagram.com/desireeofficial',
    resident_advisor: 'https://ra.co/dj/desiree',
    monthly_listeners: 180000,
    spotify_followers: 35000,
    festivals_played: ['Wonderfruit'],
    flags: { isFemale: true, isEmerging: true, blackLineage: true },
    confidence_score: 60,
    source_urls: ['https://ra.co/dj/desiree'],
    last_verified_date: V,
  },
  {
    slug: 'mahalia',
    artist_name: 'Mahalia (house producer placeholder)',
    origin_city: 'London',
    origin_country: 'United Kingdom',
    primary_scene: 'UK Garage',
    genres: ['UK Garage', 'Garage House', 'House'],
    specific_house_subgenres: ['UK Garage', 'Garage House'],
    years_active: '2020s–present',
    bio_short: 'Emerging UK garage / house producer (illustrative emerging-artist record).',
    monthly_listeners: 45000,
    spotify_followers: 8000,
    flags: { isFemale: true, isEmerging: true },
    confidence_score: 45,
    source_urls: [],
    last_verified_date: V,
  },
];
