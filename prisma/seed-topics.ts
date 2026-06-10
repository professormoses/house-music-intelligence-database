// Encyclopedic knowledge base + knowledge-graph edges.
// Content is drawn from well-established public history of house music
// (Wikipedia and widely-corroborated references). This is the citable
// "primary source" layer that makes HMID authoritative.

const V = '2026-06-08';

export interface SeedTopic {
  slug: string;
  title: string;
  type: 'origins' | 'history' | 'genre' | 'place' | 'venue' | 'person' | 'movement' | 'glossary' | 'answer' | 'timeline' | 'page';
  summary?: string;
  body?: string;
  era?: string;
  city?: string;
  country?: string;
  question?: string;
  answer?: string;
  relatedSlugs?: string[];
  sources?: { name: string; url: string; note?: string }[];
  confidenceScore?: number;
}

export interface SeedRelationship {
  subjectType: string;
  subjectSlug: string;
  predicate: string;
  objectType: string;
  objectSlug?: string;
  objectLabel?: string;
  sourceName?: string;
  sourceUrl?: string;
  confidenceScore?: number;
  note?: string;
}

const WIKI = (t: string, slug: string) => ({ name: `Wikipedia: ${t}`, url: `https://en.wikipedia.org/wiki/${slug}` });

export const SEED_TOPICS: SeedTopic[] = [
  {
    slug: 'black-origins-of-house-music',
    title: 'The Black Origins of House Music',
    type: 'origins',
    era: '1977–1985',
    city: 'Chicago',
    country: 'United States',
    summary:
      'House music was created in the early 1980s by Black and Latino, largely gay communities in Chicago, evolving out of the post-disco underground. Its founders built it as both an art form and a place of refuge.',
    body: `House music is a Black American art form. It emerged in **Chicago in the early 1980s**, created primarily by **Black and Latino DJs and producers**, many of them gay, who built a new sound out of the ashes of disco after the racist and homophobic "Disco Demolition" backlash of 1979.

The music grew inside clubs that functioned as sanctuaries for marginalized communities. **The Warehouse**, where **Frankie Knuckles** was resident DJ from 1977, is widely credited as the birthplace of the genre — the word "house" is generally traced to "The Warehouse." Knuckles, often called the **"Godfather of House Music,"** re-edited disco, soul, and European electronic records, extended them with drum machines, and forged a continuous, hypnotic dancefloor experience.

Alongside Knuckles, **Ron Hardy** at the **Music Box** pushed a rawer, harder, more experimental sound. A wave of young Black Chicagoans — among them **Jesse Saunders**, whose "On and On" (1984) is frequently cited as one of the first house records pressed to vinyl — began producing original tracks using the Roland TR-808 and TR-909 drum machines and the TB-303 bass synthesizer.

In **New York**, **Larry Levan** at the **Paradise Garage** developed the parallel "garage" sound, and the gospel-rooted, soulful vocal tradition that runs through house to this day. The culture was inseparable from Black gospel, soul, funk, and disco lineages, and from the LGBTQ ballroom and club scenes.

To understand house music honestly is to understand it as **Black music, queer music, and liberation music** first — a culture of joy and community built by people the mainstream had pushed to the margins. Every subgenre that followed — deep house, acid house, garage, Afro house, and beyond — descends from this origin.`,
    relatedSlugs: ['history-of-house-music', 'the-warehouse', 'frankie-knuckles', 'ron-hardy', 'larry-levan', 'jesse-saunders', 'chicago-house'],
    sources: [WIKI('House music', 'House_music'), WIKI('Frankie Knuckles', 'Frankie_Knuckles'), WIKI('The Warehouse (nightclub)', 'The_Warehouse_(nightclub)'), { name: 'Wikipedia: Disco Demolition Night', url: 'https://en.wikipedia.org/wiki/Disco_Demolition_Night' }],
    confidenceScore: 88,
  },
  {
    slug: 'history-of-house-music',
    title: 'A History of House Music',
    type: 'history',
    era: '1977–present',
    summary:
      'From the Warehouse in Chicago to global main stages: how house music developed, spread, and splintered into a family of subgenres over four decades.',
    body: `**Late 1970s — Post-disco Chicago.** After disco's commercial collapse, Chicago DJs kept the dancefloor alive in underground clubs. Frankie Knuckles' residency at **The Warehouse** (from 1977) and Ron Hardy's at the **Music Box** defined a new mixing style built on re-edits, drum machines, and relentless energy.

**Early 1980s — The first records.** Producers began making original tracks. **Jesse Saunders' "On and On" (1984)** is often named one of the first house records. Labels **Trax Records** and **DJ International** released the foundational Chicago catalog.

**1985–1988 — Deep and acid house.** **Larry Heard (Mr. Fingers)** pioneered **deep house** with lush, musical tracks like "Mystery of Love" and "Can You Feel It." **Phuture's "Acid Tracks" (1987)**, built on the squelching Roland TB-303, launched **acid house**.

**1988 — The sound goes global.** House ignited the UK's **"Second Summer of Love,"** fueling rave culture. From there it spread across Europe and the world.

**1990s — New York, garage, and house's golden age.** **Larry Levan's** Paradise Garage legacy and producers like **Masters at Work (Louie Vega & Kenny Dope)** and **Kerri Chandler** carried soulful, vocal, and deep traditions. The decade produced countless classics and global crossover hits.

**2000s–present — A global family.** House fragmented into tech house, melodic house, and more, while **Afro House** — popularized worldwide by South Africa's **Black Coffee** — became one of the most vital strains of the 21st century. House music is now a worldwide language, but its DNA remains Chicago, New York, and the Black communities that created it.`,
    relatedSlugs: ['black-origins-of-house-music', 'acid-house', 'house-music-timeline', 'chicago-house'],
    sources: [WIKI('House music', 'House_music'), WIKI('Acid house', 'Acid_house'), WIKI('Deep house', 'Deep_house')],
    confidenceScore: 86,
  },
  {
    slug: 'the-warehouse',
    title: 'The Warehouse (Chicago)',
    type: 'venue',
    era: '1977–1983',
    city: 'Chicago',
    country: 'United States',
    summary:
      'The Chicago nightclub where Frankie Knuckles held his foundational residency and from which house music takes its name.',
    body: `**The Warehouse** was a members' club in Chicago's West Loop that opened in 1977, catering primarily to Black and Latino gay men. **Frankie Knuckles** was its resident DJ from the opening, and his marathon, emotionally-charged sets there are central to the birth of house music.

The genre's name is widely traced to the club: record stores reportedly advertised the disco and re-edited tracks that Knuckles played as "as heard at The Warehouse," shortened to "house." After Knuckles left in 1982–83 to open the **Power Plant**, the venue continued as the Music Box era took hold elsewhere in the city.

The Warehouse is, in effect, the cradle of house music — a space where a marginalized community built a sound and a culture that would reshape global music.`,
    relatedSlugs: ['frankie-knuckles', 'black-origins-of-house-music', 'chicago-house'],
    sources: [WIKI('The Warehouse (nightclub)', 'The_Warehouse_(nightclub)'), WIKI('Frankie Knuckles', 'Frankie_Knuckles')],
    confidenceScore: 82,
  },
  {
    slug: 'paradise-garage',
    title: 'Paradise Garage (New York)',
    type: 'venue',
    era: '1977–1987',
    city: 'New York City',
    country: 'United States',
    summary:
      'The legendary New York club where Larry Levan defined the "garage" sound and the template for the modern dance club.',
    body: `**Paradise Garage** operated in lower Manhattan from 1977 to 1987 and is one of the most influential nightclubs in history. Its resident DJ, **Larry Levan**, became a near-mythic figure; his eclectic, gospel-tinged, soulful sets gave rise to the **"garage"** style of house and shaped New York dance music for generations.

A members' club rooted in Black and Latino gay nightlife, the Garage prioritized sound quality, community, and the DJ as artist. Its legacy runs directly through soulful and vocal house, and through producers like Masters at Work and Kerri Chandler.`,
    relatedSlugs: ['larry-levan', 'black-origins-of-house-music', 'louie-vega', 'kerri-chandler'],
    sources: [WIKI('Paradise Garage', 'Paradise_Garage'), WIKI('Larry Levan', 'Larry_Levan')],
    confidenceScore: 82,
  },
  {
    slug: 'music-box-chicago',
    title: 'The Music Box (Chicago)',
    type: 'venue',
    era: '1981–1987',
    city: 'Chicago',
    country: 'United States',
    summary: 'The Chicago club where Ron Hardy played a rawer, harder, more experimental strain of early house.',
    body: `**The Music Box** was the Chicago club most associated with **Ron Hardy**, whose intense, fearless, sometimes chaotic sets contrasted with Frankie Knuckles' smoother approach. Hardy championed unreleased local tracks and reportedly played records at extreme volumes and speeds, helping push house toward harder, more hypnotic territory. The Music Box was a proving ground for the first generation of Chicago house producers.`,
    relatedSlugs: ['ron-hardy', 'chicago-house', 'black-origins-of-house-music'],
    sources: [WIKI('Ron Hardy', 'Ron_Hardy'), WIKI('House music', 'House_music')],
    confidenceScore: 76,
  },
  {
    slug: 'frankie-knuckles',
    title: 'Frankie Knuckles',
    type: 'person',
    era: '1955–2014',
    city: 'Chicago',
    country: 'United States',
    summary: 'The "Godfather of House Music," whose Warehouse residency in Chicago is central to the genre\'s birth.',
    body: `**Frankie Knuckles** (1955–2014) was an American DJ and producer, universally known as the **"Godfather of House Music."** Born in the Bronx, he moved to Chicago in 1977 to become resident DJ at **The Warehouse**, where his pioneering blend of disco re-edits, drum machines, and seamless mixing helped birth the genre.

His productions and remixes — including "Your Love" (with Jamie Principle) and "The Whistle Song" — are house standards. In 2004 a stretch of Chicago street was named "Frankie Knuckles Way," and he received a Grammy for remixing. His influence is foundational and global.`,
    relatedSlugs: ['the-warehouse', 'black-origins-of-house-music', 'chicago-house'],
    sources: [WIKI('Frankie Knuckles', 'Frankie_Knuckles')],
    confidenceScore: 88,
  },
  {
    slug: 'ron-hardy',
    title: 'Ron Hardy',
    type: 'person',
    era: '1958–1992',
    city: 'Chicago',
    country: 'United States',
    summary: 'Resident DJ of the Music Box, known for a raw, intense, experimental approach to early house.',
    body: `**Ron Hardy** (1958–1992) was a Chicago DJ whose residency at the **Music Box** made him one of the most important and uncompromising figures of early house. Where Frankie Knuckles was smooth and soulful, Hardy was raw and fearless, breaking new local productions and shaping the harder edge of the Chicago sound. He died young, but his influence on house DJs is immense.`,
    relatedSlugs: ['music-box-chicago', 'black-origins-of-house-music', 'chicago-house'],
    sources: [WIKI('Ron Hardy', 'Ron_Hardy')],
    confidenceScore: 78,
  },
  {
    slug: 'larry-levan',
    title: 'Larry Levan',
    type: 'person',
    era: '1954–1992',
    city: 'New York City',
    country: 'United States',
    summary: 'Resident DJ of Paradise Garage and father of the "garage" sound.',
    body: `**Larry Levan** (1954–1992) was an American DJ whose decade-long residency at New York's **Paradise Garage** made him a legend and gave the **"garage"** subgenre its name. Renowned for emotionally expansive, genre-blending sets and meticulous sound, he influenced generations of DJs and the entire soulful and vocal house tradition.`,
    relatedSlugs: ['paradise-garage', 'black-origins-of-house-music'],
    sources: [WIKI('Larry Levan', 'Larry_Levan')],
    confidenceScore: 84,
  },
  {
    slug: 'jesse-saunders',
    title: 'Jesse Saunders',
    type: 'person',
    era: '1962–present',
    city: 'Chicago',
    country: 'United States',
    summary: 'Chicago producer whose "On and On" (1984) is frequently cited as one of the first house records pressed to vinyl.',
    body: `**Jesse Saunders** is a Chicago DJ and producer often credited with releasing one of the first house records, **"On and On" (1984)**. Built on drum machines and a stripped-down groove, it helped move house from DJ re-edits to original, producer-made tracks, opening the door for the Trax and DJ International generation.`,
    relatedSlugs: ['chicago-house', 'black-origins-of-house-music', 'history-of-house-music'],
    sources: [WIKI('Jesse Saunders', 'Jesse_Saunders'), WIKI('On and On (Jesse Saunders song)', 'On_and_On_(Jesse_Saunders_song)')],
    confidenceScore: 74,
  },
  {
    slug: 'chicago-house',
    title: 'Chicago House',
    type: 'genre',
    era: '1980s',
    city: 'Chicago',
    country: 'United States',
    summary: 'The original strain of house music, born in Chicago clubs and built on drum machines, disco, and Black gospel/soul lineages.',
    body: `**Chicago house** is the foundational form of house music, developed in the city's clubs in the early-to-mid 1980s. Characterized by 4/4 drum-machine rhythms (TR-808/909), basslines, disco and soul samples, and a raw, hypnotic feel, it was created by Black and Latino artists and released on labels like **Trax Records** and **DJ International**. From this root grew deep house, acid house, hip house, and the global house family.`,
    relatedSlugs: ['black-origins-of-house-music', 'acid-house', 'the-warehouse', 'music-box-chicago'],
    sources: [WIKI('Chicago house', 'Chicago_house'), WIKI('House music', 'House_music')],
    confidenceScore: 82,
  },
  {
    slug: 'acid-house',
    title: 'Acid House',
    type: 'movement',
    era: '1987–1990s',
    city: 'Chicago',
    country: 'United States',
    summary: 'A subgenre defined by the squelching Roland TB-303, sparked by Phuture\'s "Acid Tracks" (1987) and central to the UK rave explosion.',
    body: `**Acid house** is a house subgenre built around the distinctive, resonant squelch of the **Roland TB-303** bass synthesizer. Chicago's **Phuture** (DJ Pierre and collaborators) is credited with the seminal **"Acid Tracks" (1987)**. The sound crossed to the UK and powered the **Second Summer of Love (1988)**, becoming a cornerstone of global rave and dance culture.`,
    relatedSlugs: ['chicago-house', 'history-of-house-music'],
    sources: [WIKI('Acid house', 'Acid_house')],
    confidenceScore: 80,
  },
  {
    slug: 'glossary-of-house-music',
    title: 'Glossary of House Music Terms',
    type: 'glossary',
    summary: 'Definitions of key house music terms, instruments, and concepts — a citable reference for fans, journalists, and AI agents.',
    body: `- **House music** — A genre of electronic dance music originating in 1980s Chicago, built on a steady 4/4 beat, typically 115–130 BPM.
- **Four-on-the-floor** — The signature steady bass-drum on every beat that defines house rhythm.
- **TR-808 / TR-909** — Roland drum machines foundational to house's percussion.
- **TB-303** — Roland bass synthesizer whose squelch defines acid house.
- **Re-edit** — A DJ's reworked, extended version of an existing record, a core early-house practice.
- **Deep house** — A soulful, melodic, often jazzy subgenre pioneered by Larry Heard.
- **Acid house** — A subgenre defined by the TB-303's resonant squelch.
- **Garage / garage house** — The soulful, gospel-tinged New York strain named for the Paradise Garage.
- **Afro house** — A subgenre blending house with African rhythms and instrumentation, popularized globally by Black Coffee.
- **Jack / Jacking** — The energetic, spasmodic dance and feel of Chicago house ("Jack your body").
- **Vocal house** — House foregrounding full sung vocals, often gospel/soul-rooted.`,
    relatedSlugs: ['house-music-genre-taxonomy', 'what-is-house-music'],
    sources: [WIKI('House music', 'House_music')],
    confidenceScore: 80,
  },
  {
    slug: 'house-music-timeline',
    title: 'House Music Timeline',
    type: 'timeline',
    era: '1977–present',
    summary: 'Key milestones in the history of house music, from the Warehouse to global main stages.',
    body: `- **1977** — The Warehouse opens in Chicago; Frankie Knuckles becomes resident DJ.
- **1979** — "Disco Demolition Night" backlash accelerates disco's mainstream collapse, pushing the music underground.
- **1981** — The Music Box era begins with Ron Hardy.
- **1984** — Jesse Saunders' "On and On" — among the first house records pressed.
- **1985** — Larry Heard (Mr. Fingers) helps invent deep house ("Mystery of Love").
- **1986** — "Can You Feel It" and the Trax/DJ International catalog define the sound.
- **1987** — Phuture's "Acid Tracks" launches acid house.
- **1988** — The UK's Second Summer of Love takes house global.
- **1990s** — New York garage/soulful house golden age (Masters at Work, Kerri Chandler).
- **2010s–2020s** — Afro House goes worldwide; Black Coffee wins a Grammy (2022) for "Subconsciously."`,
    relatedSlugs: ['history-of-house-music', 'black-origins-of-house-music'],
    sources: [WIKI('House music', 'House_music')],
    confidenceScore: 80,
  },

  // ── Direct-answer pages (FAQ schema) ──
  {
    slug: 'who-created-house-music',
    title: 'Who created house music?',
    type: 'answer',
    question: 'Who created house music?',
    answer:
      'House music was created by Black and Latino DJs and producers in Chicago in the early 1980s. Frankie Knuckles — the "Godfather of House Music" and resident DJ at The Warehouse — is the figure most associated with its birth, alongside Ron Hardy at the Music Box and early producers such as Jesse Saunders. In New York, Larry Levan developed the parallel garage sound.',
    summary: 'House music was created by Black and Latino DJs and producers in early-1980s Chicago, with Frankie Knuckles as its central figure.',
    relatedSlugs: ['frankie-knuckles', 'black-origins-of-house-music', 'ron-hardy'],
    sources: [WIKI('House music', 'House_music'), WIKI('Frankie Knuckles', 'Frankie_Knuckles')],
    confidenceScore: 86,
  },
  {
    slug: 'where-did-house-music-originate',
    title: 'Where did house music originate?',
    type: 'answer',
    question: 'Where did house music originate?',
    answer:
      'House music originated in Chicago, USA, in the early 1980s, primarily within Black and Latino LGBTQ club communities. The genre takes its name from The Warehouse nightclub, where Frankie Knuckles was resident DJ. A parallel "garage" strain developed in New York City at the Paradise Garage under Larry Levan.',
    summary: 'House music originated in Chicago in the early 1980s; its name derives from The Warehouse nightclub.',
    relatedSlugs: ['the-warehouse', 'chicago-house', 'black-origins-of-house-music'],
    sources: [WIKI('House music', 'House_music'), WIKI('The Warehouse (nightclub)', 'The_Warehouse_(nightclub)')],
    confidenceScore: 86,
  },
  {
    slug: 'why-is-it-called-house-music',
    title: 'Why is it called house music?',
    type: 'answer',
    question: 'Why is it called house music?',
    answer:
      'The name "house" is most widely traced to The Warehouse, the Chicago nightclub where Frankie Knuckles was resident DJ from 1977. Records of the style played there were reportedly marketed as "as heard at The Warehouse," shortened to "house music."',
    summary: 'The term "house" comes from The Warehouse nightclub in Chicago.',
    relatedSlugs: ['the-warehouse', 'frankie-knuckles'],
    sources: [WIKI('House music', 'House_music'), WIKI('The Warehouse (nightclub)', 'The_Warehouse_(nightclub)')],
    confidenceScore: 80,
  },
  {
    slug: 'difference-between-house-and-techno',
    title: 'What is the difference between house and techno?',
    type: 'answer',
    question: 'What is the difference between house and techno?',
    answer:
      'House music originated in Chicago and is rooted in disco, soul, and gospel, with a warm, groovy, often vocal-driven 4/4 feel (typically ~120–128 BPM). Techno originated in Detroit and is more futuristic, mechanical, and minimal, with a colder, machine-driven aesthetic (often ~125–145 BPM). Both are Black American electronic dance genres that emerged in the 1980s and deeply influenced each other.',
    summary: 'House came from Chicago (warm, disco/soul-rooted); techno came from Detroit (futuristic, machine-driven). Both are 1980s Black American genres.',
    relatedSlugs: ['history-of-house-music', 'chicago-house'],
    sources: [WIKI('House music', 'House_music'), WIKI('Techno', 'Techno')],
    confidenceScore: 82,
  },

  // ── Afro House ──
  {
    slug: 'history-of-afro-house',
    title: 'The History of Afro House',
    type: 'history',
    era: '1990s–present',
    city: 'Johannesburg',
    country: 'South Africa',
    summary:
      'Afro House emerged in 1990s South Africa, fusing imported Chicago and New York house with kwaito, mbaqanga, traditional rhythms, hand percussion and African-language vocals. South Africa remains its global heartland.',
    body: `**Afro House** is a subgenre of house music that **emerged in South Africa in the 1990s**. Producers in the townships and cities of **Soweto, Johannesburg, Pretoria, Durban and Cape Town** took the imported sound of **Chicago and New York house** and fused it with **kwaito** (the slowed-down, distinctly South African house-rap hybrid of the early 1990s), **mbaqanga**, and traditional rhythms — building a sound that kept house's **4/4, four-on-the-floor pulse** while emphasising **hand percussion (congas, bongos, shakers, djembe)** and **vocals in African languages** like Zulu and Xhosa.

A key nuance: the **sound dates to the 1990s**, but the genre **name "Afro House" was formalised later** — categorised on retailers like **Beatport and Traxsource in the early 2010s**. So the music predates its label.

South Africa is, and remains, the genre's **heartland and dominant scene**. Its global figurehead is **Black Coffee**, born Nkosinathi Innocent Maphumulo (11 March 1976, Umlazi, KwaZulu-Natal) — widely called the **"king of Afro House."** His 2009 album *Home Brewed* (with the breakout "Superman" featuring Bucie) is a landmark, and in 2022 his album *Subconsciously* won the **Grammy for Best Dance/Electronic Album** — the first African artist to win the category.

From this root grew two important offshoots: **Afro Tech** and **3-Step**. Today Afro House is a global movement, carried by South African legends and a new wave, an African diaspora, and a European crossover scene — but its DNA is unmistakably South African.

_Note: published tempo claims for Afro House are inconsistent and unverified; credible practitioner sources loosely cluster it in the low-to-mid 120s BPM, but no precise range is asserted here._`,
    relatedSlugs: ['afro-tech', '3-step', 'black-coffee', 'black-origins-of-house-music', 'chicago-house'],
    sources: [
      WIKI('Afro house', 'Afro_house'),
      { name: 'Gray Area: How South Africa Created the Blueprint for Afro House', url: 'https://grayarea.co/magazine/how-south-africa-created-the-blueprint-for-afro-house' },
      WIKI('Black Coffee (DJ)', 'Black_Coffee_(DJ)'),
      { name: 'EDMProd: What is Afro House?', url: 'https://www.edmprod.com/what-is-afro-house/' },
    ],
    confidenceScore: 86,
  },
  {
    slug: 'afro-tech',
    title: 'Afro Tech',
    type: 'genre',
    era: '2010s–present',
    country: 'South Africa',
    summary:
      'A harder, techno-leaning subgenre of Afro House that originated in South Africa in the 2010s — Afro House plus techno, heavy African percussion, and Xhosa/Zulu vocals.',
    body: `**Afro Tech** (also Afro-tech) is a subgenre of **Afro House** that **originated and is predominantly made in South Africa**, emerging in the **2010s**. Sonically it is a **fusion of Afro House and techno** — harder, more percussive and less melodic than mainline Afro House — built on **African percussion (djembe, congas)** with vocals **predominantly in Xhosa and Zulu**.

Early defining work includes **Caiiro's "Cries of the Motherland" (2016)**, with **Enoo Napa** and **Themba** among the sound's early practitioners. While South African in origin, its commercial infrastructure has grown to include international labels (e.g. Italy's **MoBlack Records**) and European producers — so it is most precisely described as **predominantly, not exclusively, South African**.`,
    relatedSlugs: ['history-of-afro-house', '3-step'],
    sources: [WIKI('Afro tech', 'Afro_tech'), { name: 'Mixmag: South Africa\'s AfroTech sound travels globally', url: 'https://mixmag.net' }],
    confidenceScore: 82,
  },
  {
    slug: '3-step',
    title: '3-Step',
    type: 'movement',
    era: '2020–present',
    city: 'Johannesburg',
    country: 'South Africa',
    summary:
      'An emerging Afro House subgenre created by South African producer Thakzin in Johannesburg during the 2020 lockdowns, defined by a three-kick-drum rhythm.',
    body: `**3-Step** is an emerging subgenre of **Afro House**, created by the South African producer **Thakzin** (from **Ivory Park, Johannesburg**) during the **2020 lockdowns**. Its signature is a **three-kick-drum rhythm** — three kicks per 4/4 bar instead of the standard four-on-the-floor — giving the music a distinctive lilt that has spread rapidly through the new wave of South African Afro House.`,
    relatedSlugs: ['history-of-afro-house', 'afro-tech'],
    sources: [{ name: 'Gray Area: 3-Step, The Next Sound in Afro House', url: 'https://grayarea.co/magazine/3-step-the-next-sound-in-afro-house' }],
    confidenceScore: 78,
  },
];

export const SEED_RELATIONSHIPS: SeedRelationship[] = [
  // Founders & venues
  { subjectType: 'topic', subjectSlug: 'frankie-knuckles', predicate: 'resident_at', objectType: 'venue', objectSlug: 'the-warehouse', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Frankie_Knuckles', confidenceScore: 88, note: '1977–1982' },
  { subjectType: 'topic', subjectSlug: 'frankie-knuckles', predicate: 'pioneered', objectType: 'genre', objectLabel: 'House', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Frankie_Knuckles', confidenceScore: 90 },
  { subjectType: 'topic', subjectSlug: 'ron-hardy', predicate: 'resident_at', objectType: 'venue', objectSlug: 'music-box-chicago', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Ron_Hardy', confidenceScore: 80 },
  { subjectType: 'topic', subjectSlug: 'larry-levan', predicate: 'resident_at', objectType: 'venue', objectSlug: 'paradise-garage', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Larry_Levan', confidenceScore: 86 },
  { subjectType: 'topic', subjectSlug: 'jesse-saunders', predicate: 'pioneered', objectType: 'genre', objectLabel: 'House', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Jesse_Saunders', confidenceScore: 74 },

  // Genre lineage
  { subjectType: 'genre', subjectSlug: 'house', predicate: 'originated_in', objectType: 'place', objectLabel: 'Chicago, USA', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/House_music', confidenceScore: 90 },
  { subjectType: 'genre', subjectSlug: 'chicago-house', predicate: 'descended_from', objectType: 'genre', objectLabel: 'Disco', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Chicago_house', confidenceScore: 85 },
  { subjectType: 'topic', subjectSlug: 'acid-house', predicate: 'part_of', objectType: 'genre', objectSlug: 'chicago-house', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Acid_house', confidenceScore: 82 },
  { subjectType: 'venue', subjectSlug: 'the-warehouse', predicate: 'part_of', objectType: 'place', objectLabel: 'Chicago house scene', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/The_Warehouse_(nightclub)', confidenceScore: 85 },

  // Living artists into the graph
  { subjectType: 'artist', subjectSlug: 'larry-heard', predicate: 'pioneered', objectType: 'genre', objectLabel: 'Deep House', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Larry_Heard', confidenceScore: 88 },
  { subjectType: 'artist', subjectSlug: 'black-coffee', predicate: 'popularized', objectType: 'genre', objectLabel: 'Afro House', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Black_Coffee_(DJ)', confidenceScore: 84 },
  { subjectType: 'artist', subjectSlug: 'honey-dijon', predicate: 'part_of', objectType: 'genre', objectSlug: 'chicago-house', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Honey_Dijon', confidenceScore: 80, note: 'Chicago-born, raised in the house tradition' },
  { subjectType: 'artist', subjectSlug: 'louie-vega', predicate: 'part_of', objectType: 'venue', objectSlug: 'paradise-garage', sourceName: 'Public sources', sourceUrl: 'https://en.wikipedia.org/wiki/Louie_Vega', confidenceScore: 70, note: 'NYC soulful/garage lineage' },
  { subjectType: 'artist', subjectSlug: 'kerri-chandler', predicate: 'influenced_by', objectType: 'venue', objectSlug: 'paradise-garage', sourceName: 'Public sources', sourceUrl: 'https://en.wikipedia.org/wiki/Kerri_Chandler', confidenceScore: 65 },
  { subjectType: 'artist', subjectSlug: 'honey-dijon', predicate: 'influenced_by', objectType: 'person', objectSlug: 'frankie-knuckles', sourceName: 'Public sources', sourceUrl: 'https://en.wikipedia.org/wiki/Honey_Dijon', confidenceScore: 68 },

  // ── Afro House lineage ──
  { subjectType: 'genre', subjectSlug: 'afro-house', predicate: 'originated_in', objectType: 'place', objectLabel: 'South Africa', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Afro_house', confidenceScore: 90 },
  { subjectType: 'genre', subjectSlug: 'afro-house', predicate: 'descended_from', objectType: 'genre', objectLabel: 'Kwaito + Chicago House', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Afro_house', confidenceScore: 85 },
  { subjectType: 'topic', subjectSlug: 'afro-tech', predicate: 'part_of', objectType: 'genre', objectLabel: 'Afro House', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Afro_tech', confidenceScore: 88 },
  { subjectType: 'topic', subjectSlug: '3-step', predicate: 'part_of', objectType: 'genre', objectLabel: 'Afro House', sourceName: 'Gray Area', sourceUrl: 'https://grayarea.co/magazine/3-step-the-next-sound-in-afro-house', confidenceScore: 80 },
  { subjectType: 'artist', subjectSlug: 'thakzin', predicate: 'pioneered', objectType: 'genre', objectLabel: '3-Step', sourceName: 'Gray Area', sourceUrl: 'https://grayarea.co/magazine/3-step-the-next-sound-in-afro-house', confidenceScore: 82 },
  { subjectType: 'artist', subjectSlug: 'caiiro', predicate: 'pioneered', objectType: 'genre', objectLabel: 'Afro Tech', sourceName: 'Mixmag', sourceUrl: 'https://en.wikipedia.org/wiki/Afro_tech', confidenceScore: 78, note: '"Cries of the Motherland" (2016)' },
  { subjectType: 'artist', subjectSlug: 'enoo-napa', predicate: 'part_of', objectType: 'genre', objectLabel: 'Afro Tech', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Afro_tech', confidenceScore: 76 },
  { subjectType: 'artist', subjectSlug: 'black-coffee', predicate: 'popularized', objectType: 'topic', objectSlug: 'history-of-afro-house', sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Black_Coffee_(DJ)', confidenceScore: 88, note: 'global "king of Afro House"' },
];

export { V as TOPICS_VERSION };
