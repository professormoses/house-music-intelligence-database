// AUTO-GENERATED — 50 tiered house record labels (Tier 1 powerhouse -> Tier 5 underground)
// and every artist on their rosters, deduped into an artist->labels graph. Researched from
// label sites, Beatport, Discogs, Bandcamp and RA. 2026-06-11. Ingestion is merge-safe.
export interface Label50 {
  slug: string;
  labelName: string;
  tier: number;
  country: string | null;
  city: string | null;
  genres: string[];
  artistRoster: string[];
  sourceUrls: string[];
  confidenceScore: number;
}
export interface LabelArtist { name: string; labels: string[]; genres: string[]; }

export const LABELS_50: Label50[] = [
 {
  "slug": "lost-miracle",
  "labelName": "Lost Miracle",
  "tier": 3,
  "country": "United States",
  "city": null,
  "genres": [
   "Melodic House",
   "Organic House"
  ],
  "artistRoster": [
   "Sébastien Léger",
   "Roy Rosenfeld",
   "Shai T",
   "Tim Green",
   "Raw Main",
   "Kasper Koman",
   "Eli Nissan",
   "Khen",
   "AWEN"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Lost%20Miracle"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "when-stars-align",
  "labelName": "When Stars Align",
  "tier": 3,
  "country": "United States",
  "city": null,
  "genres": [
   "Melodic House",
   "Organic House"
  ],
  "artistRoster": [
   "CamelPhat",
   "ELDON",
   "Henri Bergmann",
   "Samm & Ajna",
   "Fahlberg",
   "Samantha Loveridge",
   "Vintage Culture",
   "Mathame",
   "Shimza",
   "Maz",
   "Kölsch",
   "Adana Twins",
   "Josh Gigante",
   "John Cala",
   "Fred Lenix",
   "Rafael Cerato",
   "Mike Trix",
   "Amarha",
   "Misha",
   "Re.you",
   "Barbie Mak",
   "FOTN"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=When%20Stars%20Align"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "shall-not-fade",
  "labelName": "Shall Not Fade",
  "tier": 3,
  "country": "United Kingdom",
  "city": "Bristol",
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ],
  "artistRoster": [
   "Mall Grab",
   "Laurence Guy",
   "Contours",
   "Earth Boys",
   "Ron Elliot",
   "Felipe Gordon",
   "Tilman",
   "Soela",
   "Ray Kandinski",
   "Main Phase",
   "Kolter",
   "Rick Wade",
   "Lake Haze",
   "Ejeca",
   "Byron the Aquarius",
   "Baltra",
   "1-800 GIRLS",
   "Black Loops",
   "Otik",
   "Earth Trax",
   "Interplanetary Criminal",
   "dj poolboi",
   "DJ Boring",
   "Cinthie",
   "Ruf Dug",
   "Kessler",
   "Kassian",
   "BAKEY",
   "Barry Can't Swim",
   "Third Son",
   "Soul Mass Transit System",
   "Tour-Maubourg",
   "Fouk",
   "Theo Kottis",
   "Ell Murphy",
   "Jacques Renault"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Shall%20Not%20Fade"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "wolf-music",
  "labelName": "Wolf Music",
  "tier": 3,
  "country": "United Kingdom",
  "city": null,
  "genres": [
   "Deep House",
   "House"
  ],
  "artistRoster": [
   "Medlar",
   "Greymatter",
   "KRL",
   "Ishmael",
   "Frits Wentink",
   "Francis Inferno Orchestra",
   "Ron Basejam",
   "Bicep",
   "Session Victim",
   "Manuel Tur",
   "Brothers Rice",
   "Fantastic Man",
   "Gene Tellem",
   "Casino Times",
   "Retromigration",
   "FatDog",
   "CJ Raine",
   "Sean Roman",
   "Toronto Hustle",
   "Chicago Damn"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Wolf%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "freerange-records",
  "labelName": "Freerange Records",
  "tier": 3,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Deep House",
   "House"
  ],
  "artistRoster": [
   "Jimpster",
   "Crackazat",
   "Black Loops",
   "Manuel Tur",
   "Milton Jackson",
   "Josh Wink",
   "Aroop Roy",
   "Laroye",
   "Dam Swindle",
   "Massiande",
   "Shur-i-kan",
   "Don Carlos",
   "Soul Of Hex",
   "Greg Paulus",
   "Taylor Bense",
   "Ralph Session",
   "Darran Nugent",
   "Tony Lionni",
   "Matt Masters",
   "Sam Irl",
   "Manuel Sahagun",
   "APOENA",
   "Lovebirds",
   "Rocco Rodamaal",
   "The Black 80s",
   "Andreas Saag",
   "Whitesquare",
   "Ewan Jansen",
   "Simbad",
   "Brett Johnson",
   "James Teej",
   "Chrissy",
   "Bruce Loko"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Freerange%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "defected",
  "labelName": "Defected Records",
  "tier": 1,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ],
  "artistRoster": [
   "Sam Divine",
   "Dames Brown",
   "Purple Disco Machine",
   "Hannah Wants",
   "Low Steppa",
   "John Summit",
   "Duck Sauce",
   "Solardo",
   "YOURS",
   "Darius Syrossian",
   "Riva Starr",
   "Arielle Free",
   "Catz 'n Dogz",
   "Marco Faraone",
   "CamelPhat",
   "Marshall Jefferson",
   "Boys Noize",
   "Luke Solomon",
   "Deetron",
   "Mr V.",
   "Sandy Rivera",
   "Kings Of Tomorrow",
   "Amine Edge & DANCE",
   "Franky Rizardo",
   "Dario D'Attis",
   "Josh Butler",
   "Sonny Fodera",
   "DJ S.K.T",
   "Obas Nenor",
   "HiFi Sean",
   "The Vision",
   "Hilit Kolet",
   "Soulsearcher",
   "Makèz",
   "MK",
   "Dennis Ferrer"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Defected%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "toolroom",
  "labelName": "Toolroom Records",
  "tier": 1,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "Mark Knight",
   "Martin Ikin",
   "Weiss",
   "Wh0",
   "Illyus & Barrientos",
   "ESSEL",
   "Low Steppa",
   "Gene Farris",
   "Tony Romera",
   "David Penn",
   "David Tort",
   "Prok & Fitch",
   "CASSIMM",
   "Crusy",
   "James Hurr",
   "Siege",
   "Reza",
   "Ferreck Dawn",
   "Ronnie Spiteri",
   "Bruno Furlan",
   "D.Ramirez",
   "Sharam Jey",
   "Marco Lys",
   "CID",
   "Qubiko",
   "Katy Alex",
   "Roland Clark",
   "Nicole Moudaber",
   "SIDEPIECE",
   "Piero Pirupa",
   "Thomas Newson",
   "Earth n Days",
   "Stadiumx",
   "Jewel Kid",
   "Adrian Hour"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Toolroom%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "dirtybird",
  "labelName": "Dirtybird Records",
  "tier": 1,
  "country": "United States",
  "city": "San Francisco",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "Claude VonStroke",
   "Justin Martin",
   "Christian Martin",
   "J. Phlip",
   "Justin Jay",
   "Worthy",
   "Eats Everything",
   "Shiba San",
   "Walker & Royce",
   "Nikki Nair",
   "Ardalan",
   "Sacha Robotti",
   "Kill Frenzy",
   "Jesse Perez",
   "Sage Armstrong",
   "Steve Darko",
   "VNSSA",
   "Westend",
   "Will Clarke",
   "Billy Kenny",
   "Kevin Knapp",
   "Catz 'n Dogz",
   "Riva Starr",
   "Tim Green",
   "Shadow Child",
   "Breach",
   "Green Velvet",
   "Cajmere",
   "Mikey Lion",
   "Gettoblaster",
   "Lubelski",
   "Bruno Furlan",
   "Mary Droppinz",
   "Get Real",
   "Sammy D",
   "Barclay Crenshaw"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Dirtybird%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "crosstown-rebels",
  "labelName": "Crosstown Rebels",
  "tier": 1,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Tech House",
   "Melodic House"
  ],
  "artistRoster": [
   "Damian Lazarus",
   "Jamie Jones",
   "Seth Troxler",
   "Maceo Plex",
   "Art Department",
   "Luciano",
   "Ricardo Villalobos",
   "Guy Gerber",
   "Dubfire",
   "Black Coffee",
   "Acid Pauli",
   "Adana Twins",
   "Audiofly",
   "Audiojack",
   "Bedouin",
   "Carl Craig",
   "DJ Tennis",
   "Eli & Fur",
   "Fur Coat",
   "Francesca Lombardo",
   "Frankey & Sandrino",
   "Guti",
   "Krust",
   "Kölsch",
   "Mathew Jonson",
   "Radio Slave",
   "Raxon",
   "Red Axes",
   "Satori",
   "Soul Clap",
   "Subb-an",
   "The Martinez Brothers",
   "THEMBA",
   "Yousef",
   "Patrice Bäumel",
   "Moscoman"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Crosstown%20Rebels"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "nervous-records",
  "labelName": "Nervous Records",
  "tier": 1,
  "country": "United States",
  "city": "New York",
  "genres": [
   "House",
   "Garage House"
  ],
  "artistRoster": [
   "Louie Vega",
   "Kenny Dope",
   "Oscar G",
   "Anané",
   "Todd Terry",
   "Kerri Chandler",
   "Harry Romero",
   "David Morales",
   "Junior Sanchez",
   "Armand Van Helden",
   "Todd Edwards",
   "Masters At Work",
   "Frankie Knuckles",
   "DJ Chus",
   "Doug Gomez",
   "Mark Lower",
   "Lauren Flax",
   "Matthias Vogt",
   "Jaymie Silk",
   "Arielle Free",
   "Bodysync",
   "LOVEFOXY",
   "Daisybelle",
   "Marcos Carnaval",
   "youANDme"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Nervous%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "go-deeva-records",
  "labelName": "Go Deeva Records",
  "tier": 4,
  "country": "Italy",
  "city": null,
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ],
  "artistRoster": [
   "Simone Vitullo",
   "Danny Slim",
   "Cari Golden",
   "Newman (I Love)",
   "MAXI MERAKI",
   "Joezi",
   "Fancy Inc",
   "Liva K",
   "MR.BLACK",
   "Tayllor",
   "Darksidevinyl",
   "Moonwalk",
   "Aaron Sevilla",
   "Anorre",
   "Rockin Moroccan",
   "Peppe Fiordalisi",
   "Mirco Caruso",
   "Dario D'Attis",
   "Jerome Robins",
   "Vanilla Ace",
   "Roland Clark",
   "Kaiser Souzai",
   "Kenny Brian",
   "Enzo Siffredi"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Go%20Deeva%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "abracadabra-music",
  "labelName": "Abracadabra Music",
  "tier": 4,
  "country": "Germany",
  "city": null,
  "genres": [
   "Afro House",
   "Melodic House"
  ],
  "artistRoster": [
   "BLOND:ISH",
   "Francis Mercier",
   "Emvafaya",
   "Moojo",
   "Nico de Andrea",
   "Hyenah",
   "AMEME",
   "Wilson Kentura",
   "The Soul Brothers",
   "Chambord",
   "MALÓNE",
   "Oluhle",
   "Kapibara",
   "Cameron Jack",
   "Gab Rhome",
   "Archila",
   "West & Hill",
   "Baron (FR)",
   "Sasson (FR)",
   "Nii Tei",
   "Raw Main",
   "MIICHII",
   "Savage & SHē",
   "Arkadyan",
   "Demayä"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Abracadabra%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "caiiro-music",
  "labelName": "Caiiro Music",
  "tier": 4,
  "country": "South Africa",
  "city": null,
  "genres": [
   "Afro House",
   "Afro Tech"
  ],
  "artistRoster": [
   "Caiiro",
   "Da Capo",
   "Pixie L",
   "Awen",
   "Wunmi",
   "Black Motion",
   "Mpumi",
   "Xoli M",
   "VITOTO",
   "Anda Cassandra",
   "Malumz on Decks",
   "Shimza",
   "Deena G",
   "Xolani Guitars",
   "Ami Faku",
   "Simmy",
   "Biishop",
   "Von Boch",
   "Deidre",
   "Fanzo",
   "Jordan Arts",
   "Kali Mija",
   "KB Motsilanyane",
   "Thabz Da Mos Hi"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Caiiro%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "redolent-music",
  "labelName": "Redolent Music",
  "tier": 4,
  "country": "United States",
  "city": null,
  "genres": [
   "Afro House",
   "Organic House"
  ],
  "artistRoster": [
   "CHUS",
   "La Santa",
   "Joeski",
   "Anturage",
   "Leo Guardo",
   "Toshi",
   "Craig Leo",
   "Les Castizos",
   "Nolek",
   "Randoree",
   "SAHAR SAX",
   "Dean Mickoski",
   "Nicinha",
   "CLAVÉ (US)",
   "Claudia León",
   "Edgar Aguirre",
   "Alexey Union",
   "Sparrow & Barbossa"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Redolent%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "get-physical",
  "labelName": "Get Physical Music",
  "tier": 4,
  "country": "Germany",
  "city": "Berlin",
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ],
  "artistRoster": [
   "M.A.N.D.Y.",
   "Booka Shade",
   "DJ T.",
   "Dixon",
   "DJ Koze",
   "Heidi",
   "Audiofly",
   "Matthew Dear",
   "Junior Boys",
   "Nôze",
   "Modeselektor",
   "Damian Lazarus",
   "Pan-Pot",
   "Anja Schneider",
   "Patrice Bäumel",
   "Riva Starr",
   "Reboot",
   "Pezzner",
   "Nico Stojan",
   "Jazzuelle",
   "Lazarusman",
   "Karol XVII & MB Valence",
   "BLOND:ISH",
   "John Monkman",
   "Fiora",
   "Chelonis R. Jones"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Get%20Physical%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "papa-records",
  "labelName": "Papa Records",
  "tier": 5,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Soulful House",
   "Deep House"
  ],
  "artistRoster": [
   "Reel People",
   "Oli Lazarus",
   "Angela Johnson",
   "Alison David",
   "Tony Momrelle",
   "Imaani",
   "Simon Grey",
   "Aaries",
   "DJ Spinna",
   "Selan",
   "Eli Escobar",
   "Osunlade",
   "Maiya James",
   "Dalminjo",
   "Da Lata",
   "Diabel Cissokho",
   "Jag",
   "Domu",
   "Pete Simpson",
   "Vanessa Freeman",
   "Sarah Anne Webb",
   "Monkey Brothers",
   "Monique Bingham",
   "Matthias Heilbronn",
   "Dyanna Fearon",
   "Frank McComb",
   "Sharlene Hector",
   "Richard Earnshaw",
   "The Layabouts",
   "Heidi Vogel",
   "Deborah Bond",
   "Portia Monique",
   "Jon Cutler",
   "Faze Action",
   "Atjazz",
   "Darien Dean"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Papa%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "quantize-recordings",
  "labelName": "Quantize Recordings",
  "tier": 5,
  "country": "United States",
  "city": "Baltimore",
  "genres": [
   "Soulful House",
   "Deep House"
  ],
  "artistRoster": [
   "DJ Spen",
   "Thommy Davis",
   "Greg Lewis",
   "Roland Clark",
   "MicFreak",
   "Reelsoul",
   "Tee Smith",
   "Sahib Muhammad",
   "Gianni Junior",
   "Tracy Hamlin",
   "Sheree Hicks",
   "Dawn Tallman",
   "Tasha LaRae",
   "Cleveland P. Jones",
   "Melissa B",
   "Steal Vybe",
   "Sonic Soul Orchestra",
   "Fonda Rae",
   "Ron Hall",
   "Ronnie Herel",
   "Barbara Tucker",
   "Kenny Bobien",
   "Michelle Weeks",
   "Kathy Brown",
   "Mr. V",
   "DJ Fudge",
   "Fil Straughan",
   "Spencer Morales",
   "Demarkus Lewis",
   "Sebas Ramis",
   "Geoffrey C",
   "Richard Burton",
   "Inaya Day",
   "Marc Evans"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Quantize%20Recordings"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "moulton-music",
  "labelName": "Moulton Music",
  "tier": 5,
  "country": "United States",
  "city": "San Francisco",
  "genres": [
   "Soulful House",
   "Deep House"
  ],
  "artistRoster": [
   "Homero Espinosa",
   "David Harness",
   "Chris Lum",
   "Allen Craig",
   "Franky Boissy",
   "The SyntheTigers",
   "Cubase Dan",
   "Reelsoul",
   "Roland Clark",
   "Tobirus Mozelle",
   "Inaya Day",
   "Lady Alma",
   "Tony Soul",
   "Sergio Fedasz",
   "Ivan Ruiz",
   "Anish Acharya",
   "Andrea Love",
   "Della",
   "Sean McCabe",
   "Soledrifter",
   "Sebb Junior",
   "Moon Rocket",
   "Micky More & Andy Tee",
   "Dahrio Wonder"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Moulton%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "nu-groove",
  "labelName": "Nu Groove Records",
  "tier": 5,
  "country": "United States",
  "city": "New York",
  "genres": [
   "Garage House",
   "Deep House"
  ],
  "artistRoster": [
   "Rheji Burrell",
   "Ronald Burrell",
   "Burrell Brothers",
   "N.Y. House'n Authority",
   "Tech Trax Inc.",
   "Metro",
   "K.A.T.O.",
   "Equation",
   "Houz' Neegroz",
   "Utopia Project",
   "Aphrodisiac",
   "Bas Noir",
   "Lisa Lee",
   "Roqui",
   "Emjay",
   "Bobby Konders",
   "Basil Hardhouse",
   "Masters At Work",
   "Kenny Dope",
   "Joey Beltram",
   "Peter Daou",
   "Joey Negro",
   "Frankie Bones"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Nu%20Groove%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "house-salad-music",
  "labelName": "House Salad Music",
  "tier": 5,
  "country": "United States",
  "city": "Chicago",
  "genres": [
   "Soulful House",
   "House"
  ],
  "artistRoster": [
   "Joss Moog",
   "Barbara Alvarez",
   "Jason Merle",
   "Cuillère",
   "Barry Sound",
   "Tree Threes",
   "Alex Maiz",
   "Alfredo Ávila",
   "Martha Dark",
   "Jacssen",
   "Hotevilla",
   "Swing Duke",
   "Drunk At Vogue",
   "Jaemus",
   "Funkbrothas"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=House%20Salad%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "razor-n-tape",
  "labelName": "Razor-N-Tape",
  "tier": 5,
  "country": "United States",
  "city": "New York",
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ],
  "artistRoster": [
   "JKriv",
   "Underground System",
   "Midnight Magic",
   "Yuksek",
   "Felipe Gordon",
   "Jungle Fire",
   "Diogo Strausz",
   "The Juan Maclean",
   "Ron Basejam",
   "Eli Escobar",
   "Luvless",
   "Michael The Lion",
   "Fouk",
   "Kraak & Smaak",
   "Fatnotronic",
   "Dimitri From Brooklyn",
   "Nebraska",
   "Son Of Sound",
   "Tom of Brooklyn",
   "Loz Goddard",
   "Lay-Far",
   "Ben Sun",
   "Delfonic",
   "Chrissy",
   "Golden Dawn Arkestra",
   "Cody Currie",
   "Frank Booker",
   "Jacques Renault",
   "Peter Croce",
   "Mr. V",
   "Clive From Accounts",
   "Mytron & Ofofo",
   "Patrick Gibin",
   "DJ Vas",
   "Body Music",
   "79.5",
   "The Phenomenal Handclap Band",
   "Tigerbalm",
   "Flamingo Pier",
   "Amy Douglas",
   "Eddie C",
   "Elado"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Razor-N-Tape"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "toy-tonics",
  "labelName": "Toy Tonics",
  "tier": 5,
  "country": "Germany",
  "city": "Berlin",
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ],
  "artistRoster": [
   "Kapote",
   "Cody Currie",
   "Coeo",
   "Sam Ruffillo",
   "Barbara Boeing",
   "Joel Holmes",
   "Gee Lane",
   "Kosmo Kint",
   "Sound Support",
   "Demuja",
   "Luke Solomon",
   "The Phenomenal Handclap Band",
   "Baby's Berserk",
   "Elado",
   "Alma Negra",
   "Pat Kalla",
   "Jose Barranquero",
   "Dante Lucero",
   "Marla Kether",
   "Arpy Brown",
   "Melon Bomb",
   "Daniel Monaco",
   "Candy Voice",
   "Sano"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Toy%20Tonics"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "local-talk",
  "labelName": "Local Talk",
  "tier": 5,
  "country": "Sweden",
  "city": "Stockholm",
  "genres": [
   "Deep House",
   "Soulful House"
  ],
  "artistRoster": [
   "Mad Mats",
   "Tooli",
   "Crackazat",
   "HNNY",
   "DJ Steaw",
   "Dirtytwo",
   "Fulbert",
   "Wil Maddams",
   "Deymare",
   "Tanzlife",
   "Adesse Versions",
   "Andreas Saag",
   "Art of Tones",
   "Ashley Beedle",
   "Boddhi Satva",
   "Coflo",
   "Felipe Gordon",
   "Fouk",
   "Fred Everything",
   "Glenn Davis",
   "Jamie 3:26",
   "Keita Sano",
   "Kiko Navarro",
   "Kyodai",
   "Laroye",
   "Lay-Far",
   "Mark de Clive-Lowe",
   "Opolopo",
   "Ralph Session",
   "S3A",
   "Sean McCabe",
   "Soulphiction",
   "Shuya Okino",
   "Son of Sound",
   "Turbojazz",
   "Vick Lavender",
   "Willie Graff",
   "Zepherin Saint",
   "Nico Lahs"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Local%20Talk"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "large-music",
  "labelName": "Large Music",
  "tier": 5,
  "country": "United States",
  "city": "New York",
  "genres": [
   "Deep House",
   "Soulful House"
  ],
  "artistRoster": [
   "Kerri Chandler",
   "Roy Davis Jr.",
   "Robert Owens",
   "DJ Sneak",
   "Mateo & Matos",
   "Dennis Ferrer",
   "Rasoul",
   "Miguel Migs",
   "Julius Papp",
   "Halo",
   "Fred Everything",
   "Saison",
   "Chris Stussy",
   "James Dexter",
   "Roland Nights",
   "Evan Iff",
   "Matthias Vogt",
   "Demarkus Lewis",
   "Jeff Craven"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Large%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "groove-culture",
  "labelName": "Groove Culture",
  "tier": 5,
  "country": "Italy",
  "city": null,
  "genres": [
   "Soulful House",
   "Disco House"
  ],
  "artistRoster": [
   "Micky More & Andy Tee",
   "Incognito",
   "Dave Lee",
   "The Sunburst Band",
   "Dimitri From Paris",
   "David Penn",
   "Miguel Migs",
   "Richard Earnshaw",
   "Ron Carroll",
   "Michele Chiavarini",
   "Full Intention",
   "Angelo Ferreri",
   "Opolopo",
   "Dr Packer",
   "John Morales",
   "Angela Johnson",
   "Roland Clark",
   "DJ James Ingram",
   "Funkatomic",
   "Serge Funk",
   "Kathy Brown",
   "Reverendos Of Soul",
   "Cevin Fisher",
   "Lee Wilson",
   "Fatimah Provillon"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Groove%20Culture"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "moblack",
  "labelName": "MoBlack Records",
  "tier": 4,
  "country": "Italy",
  "city": null,
  "genres": [
   "Afro House",
   "Afro Tech"
  ],
  "artistRoster": [
   "MoBlack",
   "M. Caporale",
   "De Cave Man",
   "Enoo Napa",
   "Savio De Simone",
   "Armonica",
   "Spellband",
   "FNX OMAR",
   "Sobek",
   "Idd Aziz",
   "Toshi",
   "Dele Sosimi",
   "Emmanuel Jal",
   "Mariam Zawose",
   "Fatoumata Diawara",
   "Christos Fourkis",
   "Stones & Bones",
   "Mattei & Omich",
   "Moon Rocket",
   "Paki Palmieri",
   "Mabiisi",
   "Zipho",
   "Mulya",
   "Said Rifai",
   "Jackson Brainwave",
   "DJ Spen",
   "Dave Anthony",
   "Doug Gomez",
   "Breyth",
   "Cee ElAssaad",
   "Kususa",
   "Young DJ",
   "Ancestral Invaders",
   "DJ Habias",
   "Mpumi",
   "Alou Sangare",
   "Bel-Ami",
   "Saliva Commandos",
   "Mark Di Meo",
   "Peppe Citarella"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=MoBlack%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "offering-recordings",
  "labelName": "Offering Recordings",
  "tier": 4,
  "country": "United States",
  "city": null,
  "genres": [
   "Afro House",
   "Organic House"
  ],
  "artistRoster": [
   "Boddhi Satva",
   "Eustace Jahari",
   "Bria 83 Orchestra",
   "Hadja Samako",
   "IFrika",
   "ZORÉ",
   "Nyah Noor",
   "Velho Da Banda",
   "Solah Mae",
   "Abdul Champion",
   "Ochanique",
   "The French Twins",
   "Ivan Diaz"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Offering%20Recordings"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "connected",
  "labelName": "Connected Frontline",
  "tier": 4,
  "country": "United Kingdom",
  "city": null,
  "genres": [
   "Afro House",
   "Afro Tech"
  ],
  "artistRoster": [
   "Da Mike",
   "Mr Joe",
   "MÖW",
   "Yamil",
   "G.Zamora",
   "Lazarusman",
   "AUGUSTE",
   "Kreative Nativez",
   "Antonio Lyons",
   "Oluwadamvic",
   "Nicolas Nohra",
   "Bástian V",
   "Kawtar Sadik",
   "Toshi",
   "Apo",
   "Djolee",
   "Vini Pistori",
   "LevyM",
   "Carlos Francisco",
   "Nipkoss",
   "Kieran Apter",
   "Nikos Diamantopoulos",
   "Carlos Barbero",
   "Astrosoul",
   "Valer den Bit",
   "Bayaka (IT)",
   "Darksidevinyl",
   "Jalal Ramdani",
   "Kapibara",
   "WAHM (FR)",
   "MANQO",
   "Connected Soundsystem"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Connected%20Frontline"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "madorasindahouse",
  "labelName": "Madorasindahouse Records",
  "tier": 4,
  "country": "Germany",
  "city": null,
  "genres": [
   "Afro House",
   "Soulful House"
  ],
  "artistRoster": [
   "DJ Kent",
   "Maleh",
   "OSFUR",
   "UVITA",
   "The Scripture",
   "Mont Rouge",
   "Cee ElAssaad",
   "Le Croque",
   "Fideles",
   "Moeaike",
   "Sandhaus",
   "Misha",
   "Manoo",
   "Rockin Morrocin",
   "Yass",
   "Collé",
   "DJ Kabila",
   "Dr. Feel",
   "Nsha",
   "Gumz",
   "Caiiro",
   "Sparrow & Barbossa",
   "Joezi",
   "Fahlberg",
   "Sasson (FR)",
   "JUNO (DE)",
   "Kasango",
   "Shimza"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Madorasindahouse%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "deep-root-tribe",
  "labelName": "Deep Root Tribe",
  "tier": 4,
  "country": "United States",
  "city": null,
  "genres": [
   "Afro House",
   "Afro Tech"
  ],
  "artistRoster": [
   "Francis Mercier",
   "Nitefreak",
   "Lenny Auguste",
   "Auguste",
   "Kasango",
   "Tayllor",
   "AVÖ (PT)",
   "QT-High",
   "Syon",
   "Amour Propre",
   "Idd Aziz",
   "Enoo Napa",
   "Warm",
   "Claudia León",
   "Bibi Den's Tshibayi",
   "Badbox",
   "Bun Xapa",
   "Daytona",
   "Massala",
   "Kususa",
   "Breyth",
   "Divolly & Markward",
   "Choujaa",
   "Imad",
   "clubhouse",
   "Shammalee",
   "MP3 (DE)"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Deep%20Root%20Tribe"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "desolat",
  "labelName": "Desolat",
  "tier": 2,
  "country": "Germany",
  "city": "Düsseldorf",
  "genres": [
   "Tech House",
   "Minimal House"
  ],
  "artistRoster": [
   "Loco Dice",
   "Martin Buttrich",
   "Livio & Roby",
   "tINI",
   "Guti",
   "Cuartero",
   "Butch",
   "Robert Dietz",
   "Reboot",
   "Francisco Allendes",
   "Yaya",
   "Hector",
   "Audiofly",
   "DJ Sneak",
   "Dubfire",
   "Shlomi Aber",
   "Mathias Kaden",
   "Andrea Oliva",
   "wAFF",
   "Cassy",
   "Alexkid",
   "Premiesku",
   "Basti Grub",
   "Benny Rodrigues",
   "Dragosh",
   "Alli Borem",
   "Sante",
   "Davide Squillace",
   "Mendo",
   "Marco Faraone",
   "Carlo Lio",
   "Argy",
   "Luciano",
   "Ricardo Villalobos",
   "Marco Carola",
   "Franck Roger",
   "William Djoko",
   "Traumer",
   "Enzo Siragusa",
   "Eats Everything"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Desolat"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "black-book-records",
  "labelName": "Black Book Records",
  "tier": 2,
  "country": "United States",
  "city": null,
  "genres": [
   "Tech House"
  ],
  "artistRoster": [
   "Chris Lake",
   "Green Velvet",
   "Solardo",
   "Cloonee",
   "Walker & Royce",
   "Mochakk",
   "Chris Lorenzo",
   "HoneyLuv",
   "Noizu",
   "Eli Brown",
   "Wade",
   "Sosa",
   "Riva Starr",
   "Prok & Fitch",
   "Marco Strous",
   "Hank",
   "TOBEHONEST",
   "Aluna",
   "Chloé Robinson",
   "High Jinx",
   "Aatig",
   "Goooey Vuitton"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Black%20Book%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "realm-records",
  "labelName": "Realm Records",
  "tier": 2,
  "country": "United Kingdom",
  "city": null,
  "genres": [
   "Tech House"
  ],
  "artistRoster": [
   "Gorgon City",
   "Danny Howard",
   "Eats Everything",
   "Sonny Fodera",
   "Charlie Boon",
   "Azzecca",
   "Dreya V",
   "Chris Luno",
   "Kitty Amor",
   "Lazarusman",
   "Leftwing : Kody",
   "Rafael Cerato",
   "GENESI",
   "Damian Lazarus",
   "Michael Bibi",
   "Solomun",
   "Third Culture",
   "Soraya",
   "Arielle Free",
   "NADIAH",
   "Danny P",
   "Scrappa",
   "Mak & Pasteman",
   "Taet"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Realm%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "insomniac-records",
  "labelName": "Insomniac Records",
  "tier": 2,
  "country": "United States",
  "city": "Los Angeles",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "John Summit",
   "HUGEL",
   "Disco Lines",
   "James Hype",
   "Vintage Culture",
   "Mau P",
   "Francis Mercier",
   "Goodboys",
   "MoBlack",
   "Odd Mob",
   "Morgan Seatree",
   "Sonny Fodera",
   "Chris Lake",
   "Eli Brown",
   "Sammy Virji",
   "Westend",
   "Tiësto",
   "Alok",
   "MEDUSA",
   "Noizu"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Insomniac%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "experts-only",
  "labelName": "Experts Only",
  "tier": 2,
  "country": "United States",
  "city": null,
  "genres": [
   "House",
   "Tech House"
  ],
  "artistRoster": [
   "John Summit",
   "Odd Mob",
   "OMNOM",
   "Westend",
   "Silver Panda",
   "Sub Focus",
   "GUZ",
   "Disco Lines",
   "Roddy Lima",
   "Tini Gessler",
   "Layton Giordani",
   "Max Styler",
   "Chris Avantgarde",
   "Kevin de Vries",
   "Green Velvet",
   "Gorgon City",
   "Subtronics",
   "Tape B",
   "JØRD",
   "Dansyn",
   "OMRI.",
   "Hayla",
   "Stevie Appleton"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Experts%20Only"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "anjunadeep",
  "labelName": "Anjunadeep",
  "tier": 3,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ],
  "artistRoster": [
   "Above & Beyond",
   "Jody Wisternoff",
   "James Grant",
   "Yotto",
   "Luttrell",
   "Ben Böhmer",
   "Eli & Fur",
   "Tinlicker",
   "Qrion",
   "Lycoriscoris",
   "Marsh",
   "CRi",
   "Jon Gurd",
   "Moon Boots",
   "Cubicolor",
   "Way Out West",
   "Dusky",
   "Lane 8",
   "Jaytech",
   "Dosem",
   "Ryan Davis",
   "Nox Vahn",
   "Jerro",
   "il:lo",
   "Franky Wah",
   "Durante",
   "Leaving Laurel",
   "boerd",
   "Nikola Melnikov",
   "James Shinra",
   "Andrew Bayer",
   "Spencer Brown",
   "Nils Hoffmann",
   "16 Bit Lolitas",
   "Croquet Club",
   "David Hohme",
   "Amtrac",
   "Edu Imbernon",
   "Catching Flies",
   "Juno Mamba",
   "Ezequiel Arias",
   "Blake.08"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Anjunadeep"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "all-day-i-dream",
  "labelName": "All Day I Dream",
  "tier": 3,
  "country": "United States",
  "city": "Brooklyn",
  "genres": [
   "Melodic House",
   "Organic House"
  ],
  "artistRoster": [
   "Lee Burridge",
   "Matthew Dekay",
   "Lost Desert",
   "YokoO",
   "Tim Green",
   "Bedouin",
   "Lauren Ritter",
   "AMÉMÉ",
   "Amonita",
   "Arina Mur",
   "Cameron Jack",
   "Christian Löffler",
   "Curol",
   "Dim Kelly",
   "Double Touch",
   "Facundo Mohrr",
   "Fulltone",
   "Igor Marijuan",
   "Jim Rider",
   "Sébastien Léger",
   "Enamour",
   "Pippi Ciez",
   "Squire",
   "Audiofly",
   "DOTB"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=All%20Day%20I%20Dream"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "this-never-happened",
  "labelName": "This Never Happened",
  "tier": 3,
  "country": "United States",
  "city": "Denver",
  "genres": [
   "Melodic House",
   "Deep House"
  ],
  "artistRoster": [
   "Lane 8",
   "Sultan + Shepard",
   "Massane",
   "Luttrell",
   "Le Youth",
   "Klur",
   "PARIS",
   "Kasbo",
   "Township Rebellion",
   "Anderholm",
   "Avoure",
   "Anakim",
   "Jerro",
   "Simon Doty",
   "Rinzen",
   "Tinlicker",
   "Yotto",
   "Kasablanca",
   "Marsh",
   "Robby East",
   "Mees Salomé",
   "Kidnap",
   "ATTLAS",
   "Paraleven",
   "Nimino",
   "Tishmal",
   "OCULA",
   "Forester",
   "Helsloot",
   "Spada",
   "Qrion"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=This%20Never%20Happened"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "colorize",
  "labelName": "Colorize",
  "tier": 3,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Melodic House",
   "Progressive House"
  ],
  "artistRoster": [
   "Estiva",
   "EMBRZ",
   "PRAANA",
   "Kaskade",
   "mölly",
   "Mees Salomé",
   "Klur",
   "Icarus",
   "Braxton",
   "Fejká",
   "Lipless",
   "Dosem",
   "Boxer",
   "Marsh",
   "L.GU.",
   "Modera",
   "MXV",
   "Just Her",
   "Robby East",
   "Jack Willard",
   "Guy Didden",
   "Hessian",
   "Datskie",
   "Lili Chan",
   "VEHA",
   "VisionV",
   "Dezza",
   "Matt Fax",
   "Sound Quelle",
   "Andrew Benson",
   "Schodt"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Colorize"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "purified-records",
  "labelName": "Purified Records",
  "tier": 3,
  "country": "Netherlands",
  "city": "Amsterdam",
  "genres": [
   "Melodic House",
   "Deep House"
  ],
  "artistRoster": [
   "Nora En Pure",
   "Corren Cavini",
   "Jack Emery",
   "Lexer",
   "Aplexo",
   "Garlington",
   "Return Of The Jaded",
   "Glusko",
   "ARIV3",
   "Eli Brown",
   "Moonwalk",
   "Paradoks",
   "PARAFRAME",
   "Nicky Elisabeth",
   "Dosem",
   "SOHMI",
   "Jonas Saalbach",
   "Tommy Farrow",
   "Danito",
   "Alex Breitling",
   "Alex Rusin",
   "Chris Howard",
   "Juno Stone",
   "Milan Steenwinkel",
   "RIKO & GUGGA",
   "Sky Garden"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Purified%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "repopulate-mars",
  "labelName": "Repopulate Mars",
  "tier": 2,
  "country": "United States",
  "city": "Los Angeles",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "Lee Foss",
   "Eli Brown",
   "John Summit",
   "Andre Salmon",
   "Latmun",
   "SPNCR",
   "Volkoder",
   "Mason Maynard",
   "Martin Ikin",
   "Joshwa",
   "CID",
   "Cloonee",
   "Mau P",
   "NightFunk",
   "Steingold",
   "Kolombo",
   "Federico Ambrosi",
   "Mhod",
   "Reblok",
   "Wise D & Kobe",
   "KC Wray",
   "G. Felix",
   "Lubelski",
   "SYAP",
   "MKJAY",
   "BLACK GIRL / WHITE GIRL",
   "SOSA (UK)",
   "Baum",
   "Monoky",
   "POLOVICH",
   "Lee Curtiss",
   "Hayley May",
   "Max Reals",
   "Red Weeller",
   "itsbilly"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Repopulate%20Mars"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "solid-grooves-records",
  "labelName": "Solid Grooves Records",
  "tier": 2,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Tech House"
  ],
  "artistRoster": [
   "Michael Bibi",
   "PAWSA",
   "Dennis Cruz",
   "Ben Sterling",
   "Blackchild (ITA)",
   "Silvie Loto",
   "Reelow",
   "Ramin Rezaie",
   "KinAhau",
   "Bassel Darwish",
   "Darius Syrossian",
   "Wade",
   "wAFF",
   "Wheats",
   "Detlef",
   "Eddy M",
   "Endor",
   "Franz Costa",
   "Josh Butler",
   "Leon",
   "Leftwing : Kody",
   "Sabb",
   "Sable Sheep",
   "Shokë",
   "Anek",
   "ANOTR",
   "Brett Gould",
   "Carloh",
   "Classmatic",
   "Dateless",
   "Dimmish",
   "DJ W!ld",
   "Kolter",
   "Okain",
   "Onno",
   "Pirate Copy",
   "Prok & Fitch",
   "Rendher",
   "Route 94",
   "Skream",
   "Tiger Stripes",
   "Luuk Van Dijk",
   "JUST2",
   "MANT",
   "Richard Ulh"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Solid%20Grooves%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "snatch-records",
  "labelName": "Snatch! Records",
  "tier": 2,
  "country": "Italy",
  "city": "Naples",
  "genres": [
   "Tech House"
  ],
  "artistRoster": [
   "Riva Starr",
   "Paolo Martini",
   "Paul C",
   "Federico Grazzini",
   "Mihalis Safras",
   "M.in",
   "David Keno",
   "Dennis Cruz",
   "Mat.Joe",
   "Roberto Surace",
   "DJ Sneak",
   "Cajmere",
   "Green Velvet",
   "Carl Cox",
   "Fatboy Slim",
   "Major Lazer",
   "Hector Couto",
   "Latmun",
   "Kolombo",
   "LouLou Players",
   "Thomas Schumacher",
   "Tapesh",
   "Ramon Tapia",
   "KiNK",
   "Reboot",
   "wAFF",
   "Russ Yallop",
   "Steve Bug",
   "Solardo",
   "Neverdogs",
   "Robert Owens",
   "Roland Clark",
   "Todd Terry",
   "Coyu",
   "Demuir",
   "Donk Boys",
   "Butch",
   "Jon Rundell",
   "Danny Serrano",
   "Guti",
   "Hollen",
   "Ron Costa",
   "Phil Weeks"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Snatch!%20Records"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "moon-harbour",
  "labelName": "Moon Harbour",
  "tier": 2,
  "country": "Germany",
  "city": "Leipzig",
  "genres": [
   "Tech House",
   "Minimal House"
  ],
  "artistRoster": [
   "Matthias Tanzmann",
   "Ninetoes",
   "Sven Tasnadi",
   "Dan Drastic",
   "Luna City Express",
   "Dennis Cruz",
   "Mathias Kaden",
   "Daniel Stefanik",
   "Re.You",
   "Audio Werner",
   "Audiojack",
   "Adam Port",
   "Steve Bug",
   "Nick Curly",
   "DJ T.",
   "Butch",
   "Detlef",
   "Cuartero",
   "wAFF",
   "Marco Faraone",
   "CamelPhat",
   "Cloonee",
   "Dennis Ferrer",
   "Booka Shade",
   "Catz 'n Dogz",
   "East End Dubs",
   "Eli Brown",
   "Patrick Topping",
   "Hot Since 82",
   "Huxley",
   "Hauswerks",
   "Ekkohaus",
   "Sidney Charles",
   "Kerri Chandler",
   "Kaiserdisco",
   "Gregor Tresher",
   "Andhim",
   "Sabb",
   "Mendo",
   "Nico Cabeza",
   "Ray Okpara",
   "Reboot",
   "Steve Lawler",
   "Yousef"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Moon%20Harbour"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "elrow-music",
  "labelName": "Elrow Music",
  "tier": 2,
  "country": "Spain",
  "city": "Barcelona",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "De La Swing",
   "Toni Varga",
   "Eddy M",
   "Marc Maya",
   "Bastian Bux",
   "Andres Campo",
   "Andrea Oliva",
   "Paco Osuna",
   "Technasia",
   "CamelPhat",
   "Solardo",
   "Latmun",
   "Mason Maynard",
   "Cloonee",
   "Hector Couto",
   "Dennis Cruz",
   "Danny Serrano",
   "David Herrero",
   "Chus & Ceballos",
   "Mele",
   "Rafa Barrios",
   "Franky Rizardo",
   "Jesse Perez",
   "Wade",
   "wAFF",
   "Nathan Barato",
   "Mar-T",
   "Manu Gonzalez",
   "Detlef",
   "Dennis Ferrer",
   "Harry Romero",
   "Junior Sanchez",
   "Kevin Knapp",
   "Max Chapman",
   "Metodi Hristov",
   "Mendo",
   "Roberto Surace",
   "Sidney Charles",
   "Supernova",
   "Tomi&Kesh",
   "Vidaloca",
   "Reelow",
   "Piero Pirupa",
   "Guille Placencia",
   "Francisco Allendes",
   "Shermanology"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Elrow%20Music"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "strictly-rhythm",
  "labelName": "Strictly Rhythm",
  "tier": 1,
  "country": "United States",
  "city": "New York",
  "genres": [
   "House",
   "Garage House"
  ],
  "artistRoster": [
   "Roger Sanchez",
   "Todd Terry",
   "Masters At Work",
   "Josh Wink",
   "Armand Van Helden",
   "Kenny Dope",
   "Erick Morillo",
   "George Morel",
   "Sandy Rivera",
   "DJ Pierre",
   "Frankie Feliciano",
   "MK",
   "David Morales",
   "Rasoul",
   "DJ Sneak",
   "Ian Pooley",
   "Cevin Fisher",
   "Roy Davis Jr.",
   "Ultra Naté",
   "Barbara Tucker",
   "Reel 2 Reel",
   "Mood II Swing",
   "Junior Sanchez",
   "Frankie Knuckles",
   "Osunlade",
   "Riva Starr",
   "Ben Westbeech",
   "Motor City Drum Ensemble",
   "Afrojack"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Strictly%20Rhythm"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "king-street-sounds",
  "labelName": "King Street Sounds",
  "tier": 1,
  "country": "United States",
  "city": "New York",
  "genres": [
   "Soulful House",
   "Garage House"
  ],
  "artistRoster": [
   "Kerri Chandler",
   "Dennis Ferrer",
   "Ultra Naté",
   "Mood II Swing",
   "Louie Vega",
   "Blaze",
   "Masters At Work",
   "Frankie Knuckles",
   "Barbara Tucker",
   "Kathy Brown",
   "Roland Clark",
   "DJ Spen",
   "DJ Pierre",
   "DJ Vivona",
   "Kenny Bobien",
   "Ananda Project",
   "Tiger Stripes",
   "Big Moses",
   "Johnny Dangerous",
   "Mateo & Matos",
   "Stones & Bones",
   "Antonello Ferrari",
   "Heather Johnson",
   "Dam Swindle",
   "Aaron K. Gray",
   "James Deron",
   "Less Hate"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=King%20Street%20Sounds"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "glitterbox",
  "labelName": "Glitterbox",
  "tier": 1,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Disco House",
   "Soulful House"
  ],
  "artistRoster": [
   "Mousse T.",
   "Purple Disco Machine",
   "Folamour",
   "The Shapeshifters",
   "Cassius",
   "Candi Staton",
   "Kelly G",
   "Melvo Baptiste",
   "Dr Packer",
   "Joey Negro",
   "Crackazat",
   "Debbie Jacobs",
   "Mark Knight",
   "Simon Dunmore",
   "David Penn",
   "Dimitri From Paris",
   "Horse Meat Disco",
   "Roisin Murphy",
   "Barbara Tucker",
   "Teni Tinks",
   "Hifi Sean"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Glitterbox"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "hot-creations",
  "labelName": "Hot Creations",
  "tier": 1,
  "country": "United Kingdom",
  "city": "Cardiff",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "Jamie Jones",
   "Lee Foss",
   "Patrick Topping",
   "Richy Ahmed",
   "Detlef",
   "Darius Syrossian",
   "Joshwa",
   "Solardo",
   "Cuartero",
   "The Martinez Brothers",
   "Alan Fitzpatrick",
   "Danny Tenaglia",
   "Nicole Moudaber",
   "Josh Butler",
   "Paul Woolford",
   "Seb Zito",
   "Mason Maynard",
   "Skream",
   "East End Dubs",
   "Nathan Barato",
   "Miguel Campbell",
   "Kevin Knapp",
   "Waff",
   "Hot Natured",
   "Maceo Plex",
   "Art Department",
   "Matador",
   "Ninetoes",
   "Shadow Child",
   "Popof",
   "Deetron",
   "Riton"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Hot%20Creations"
  ],
  "confidenceScore": 70
 },
 {
  "slug": "saved-records",
  "labelName": "Saved Records",
  "tier": 1,
  "country": "United Kingdom",
  "city": "London",
  "genres": [
   "Tech House",
   "House"
  ],
  "artistRoster": [
   "Nic Fanciulli",
   "Mark Fanciulli",
   "Mark Broom",
   "Santos",
   "Robert Dietz",
   "Carlo Lio",
   "Gary Beck",
   "Julien Chaptal",
   "Lauren Lane",
   "Stacey Pullen",
   "Spencer Parker",
   "Subb-an",
   "Steve Mac",
   "Terrence Parker",
   "Philip Bader",
   "&ME",
   "Alex Tepper",
   "Josh Butler",
   "Joeski",
   "Funkerman",
   "Butch",
   "Leon"
  ],
  "sourceUrls": [
   "https://www.beatport.com/search?q=Saved%20Records"
  ],
  "confidenceScore": 70
 }
];

export const LABEL_ARTISTS: LabelArtist[] = [
 {
  "name": "Sébastien Léger",
  "labels": [
   "Lost Miracle",
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Roy Rosenfeld",
  "labels": [
   "Lost Miracle"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Shai T",
  "labels": [
   "Lost Miracle"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Tim Green",
  "labels": [
   "Lost Miracle",
   "Dirtybird Records",
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Raw Main",
  "labels": [
   "Lost Miracle",
   "Abracadabra Music"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Afro House"
  ]
 },
 {
  "name": "Kasper Koman",
  "labels": [
   "Lost Miracle"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Eli Nissan",
  "labels": [
   "Lost Miracle"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Khen",
  "labels": [
   "Lost Miracle"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "AWEN",
  "labels": [
   "Lost Miracle",
   "Caiiro Music"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "CamelPhat",
  "labels": [
   "When Stars Align",
   "Defected Records",
   "Moon Harbour",
   "Elrow Music"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "ELDON",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Henri Bergmann",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Samm & Ajna",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Fahlberg",
  "labels": [
   "When Stars Align",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Samantha Loveridge",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Vintage Culture",
  "labels": [
   "When Stars Align",
   "Insomniac Records"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mathame",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Shimza",
  "labels": [
   "When Stars Align",
   "Caiiro Music",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Afro House",
   "Afro Tech",
   "Soulful House"
  ]
 },
 {
  "name": "Maz",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Kölsch",
  "labels": [
   "When Stars Align",
   "Crosstown Rebels"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Tech House"
  ]
 },
 {
  "name": "Adana Twins",
  "labels": [
   "When Stars Align",
   "Crosstown Rebels"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Tech House"
  ]
 },
 {
  "name": "Josh Gigante",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "John Cala",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Fred Lenix",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Rafael Cerato",
  "labels": [
   "When Stars Align",
   "Realm Records"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Tech House"
  ]
 },
 {
  "name": "Mike Trix",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Amarha",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Misha",
  "labels": [
   "When Stars Align",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Re.you",
  "labels": [
   "When Stars Align",
   "Moon Harbour"
  ],
  "genres": [
   "Melodic House",
   "Organic House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Barbie Mak",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "FOTN",
  "labels": [
   "When Stars Align"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Mall Grab",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Laurence Guy",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Contours",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Earth Boys",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Ron Elliot",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Felipe Gordon",
  "labels": [
   "Shall Not Fade",
   "Razor-N-Tape",
   "Local Talk"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House",
   "Disco House",
   "Nu-Disco",
   "Soulful House"
  ]
 },
 {
  "name": "Tilman",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Soela",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Ray Kandinski",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Main Phase",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Kolter",
  "labels": [
   "Shall Not Fade",
   "Solid Grooves Records"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House",
   "Tech House"
  ]
 },
 {
  "name": "Rick Wade",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Lake Haze",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Ejeca",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Byron the Aquarius",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Baltra",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "1-800 GIRLS",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Black Loops",
  "labels": [
   "Shall Not Fade",
   "Freerange Records"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Otik",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Earth Trax",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Interplanetary Criminal",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "dj poolboi",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "DJ Boring",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Cinthie",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Ruf Dug",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Kessler",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Kassian",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "BAKEY",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Barry Can't Swim",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Third Son",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Soul Mass Transit System",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Tour-Maubourg",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Fouk",
  "labels": [
   "Shall Not Fade",
   "Razor-N-Tape",
   "Local Talk"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House",
   "Disco House",
   "Nu-Disco",
   "Soulful House"
  ]
 },
 {
  "name": "Theo Kottis",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Ell Murphy",
  "labels": [
   "Shall Not Fade"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Jacques Renault",
  "labels": [
   "Shall Not Fade",
   "Razor-N-Tape"
  ],
  "genres": [
   "House",
   "Deep House",
   "Garage House",
   "Disco House",
   "Nu-Disco"
  ]
 },
 {
  "name": "Medlar",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Greymatter",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "KRL",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Ishmael",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Frits Wentink",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Francis Inferno Orchestra",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Ron Basejam",
  "labels": [
   "Wolf Music",
   "Razor-N-Tape"
  ],
  "genres": [
   "Deep House",
   "House",
   "Disco House",
   "Nu-Disco"
  ]
 },
 {
  "name": "Bicep",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Session Victim",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Manuel Tur",
  "labels": [
   "Wolf Music",
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Brothers Rice",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Fantastic Man",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Gene Tellem",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Casino Times",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Retromigration",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "FatDog",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "CJ Raine",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Sean Roman",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Toronto Hustle",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Chicago Damn",
  "labels": [
   "Wolf Music"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Jimpster",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Crackazat",
  "labels": [
   "Freerange Records",
   "Local Talk",
   "Glitterbox"
  ],
  "genres": [
   "Deep House",
   "House",
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Milton Jackson",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Josh Wink",
  "labels": [
   "Freerange Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "Deep House",
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Aroop Roy",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Laroye",
  "labels": [
   "Freerange Records",
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "House",
   "Soulful House"
  ]
 },
 {
  "name": "Dam Swindle",
  "labels": [
   "Freerange Records",
   "King Street Sounds"
  ],
  "genres": [
   "Deep House",
   "House",
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Massiande",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Shur-i-kan",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Don Carlos",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Soul Of Hex",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Greg Paulus",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Taylor Bense",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Ralph Session",
  "labels": [
   "Freerange Records",
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "House",
   "Soulful House"
  ]
 },
 {
  "name": "Darran Nugent",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Tony Lionni",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Matt Masters",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Sam Irl",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Manuel Sahagun",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "APOENA",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Lovebirds",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Rocco Rodamaal",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "The Black 80s",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Andreas Saag",
  "labels": [
   "Freerange Records",
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "House",
   "Soulful House"
  ]
 },
 {
  "name": "Whitesquare",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Ewan Jansen",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Simbad",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Brett Johnson",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "James Teej",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Chrissy",
  "labels": [
   "Freerange Records",
   "Razor-N-Tape"
  ],
  "genres": [
   "Deep House",
   "House",
   "Disco House",
   "Nu-Disco"
  ]
 },
 {
  "name": "Bruce Loko",
  "labels": [
   "Freerange Records"
  ],
  "genres": [
   "Deep House",
   "House"
  ]
 },
 {
  "name": "Sam Divine",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Dames Brown",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Purple Disco Machine",
  "labels": [
   "Defected Records",
   "Glitterbox"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Disco House"
  ]
 },
 {
  "name": "Hannah Wants",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Low Steppa",
  "labels": [
   "Defected Records",
   "Toolroom Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "John Summit",
  "labels": [
   "Defected Records",
   "Insomniac Records",
   "Experts Only",
   "Repopulate Mars"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "Duck Sauce",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Solardo",
  "labels": [
   "Defected Records",
   "Black Book Records",
   "Snatch! Records",
   "Elrow Music",
   "Hot Creations"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "YOURS",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Darius Syrossian",
  "labels": [
   "Defected Records",
   "Solid Grooves Records",
   "Hot Creations"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "Riva Starr",
  "labels": [
   "Defected Records",
   "Dirtybird Records",
   "Get Physical Music",
   "Black Book Records",
   "Snatch! Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House",
   "Afro House",
   "Garage House"
  ]
 },
 {
  "name": "Arielle Free",
  "labels": [
   "Defected Records",
   "Nervous Records",
   "Realm Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Garage House",
   "Tech House"
  ]
 },
 {
  "name": "Catz 'n Dogz",
  "labels": [
   "Defected Records",
   "Dirtybird Records",
   "Moon Harbour"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Marco Faraone",
  "labels": [
   "Defected Records",
   "Desolat",
   "Moon Harbour"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Marshall Jefferson",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Boys Noize",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Luke Solomon",
  "labels": [
   "Defected Records",
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Deetron",
  "labels": [
   "Defected Records",
   "Hot Creations"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "Mr V.",
  "labels": [
   "Defected Records",
   "Quantize Recordings",
   "Razor-N-Tape"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Deep House",
   "Disco House",
   "Nu-Disco"
  ]
 },
 {
  "name": "Sandy Rivera",
  "labels": [
   "Defected Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Garage House"
  ]
 },
 {
  "name": "Kings Of Tomorrow",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Amine Edge & DANCE",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Franky Rizardo",
  "labels": [
   "Defected Records",
   "Elrow Music"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "Dario D'Attis",
  "labels": [
   "Defected Records",
   "Go Deeva Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Josh Butler",
  "labels": [
   "Defected Records",
   "Solid Grooves Records",
   "Hot Creations",
   "Saved Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "Sonny Fodera",
  "labels": [
   "Defected Records",
   "Realm Records",
   "Insomniac Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Tech House"
  ]
 },
 {
  "name": "DJ S.K.T",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Obas Nenor",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "HiFi Sean",
  "labels": [
   "Defected Records",
   "Glitterbox"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Disco House"
  ]
 },
 {
  "name": "The Vision",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Hilit Kolet",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Soulsearcher",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "Makèz",
  "labels": [
   "Defected Records"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House"
  ]
 },
 {
  "name": "MK",
  "labels": [
   "Defected Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Garage House"
  ]
 },
 {
  "name": "Dennis Ferrer",
  "labels": [
   "Defected Records",
   "Large Music",
   "Moon Harbour",
   "Elrow Music",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Soulful House",
   "Vocal House",
   "Deep House",
   "Tech House",
   "Minimal House",
   "Garage House"
  ]
 },
 {
  "name": "Mark Knight",
  "labels": [
   "Toolroom Records",
   "Glitterbox"
  ],
  "genres": [
   "Tech House",
   "House",
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Martin Ikin",
  "labels": [
   "Toolroom Records",
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Weiss",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Wh0",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Illyus & Barrientos",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "ESSEL",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Gene Farris",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Tony Romera",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "David Penn",
  "labels": [
   "Toolroom Records",
   "Groove Culture",
   "Glitterbox"
  ],
  "genres": [
   "Tech House",
   "House",
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "David Tort",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Prok & Fitch",
  "labels": [
   "Toolroom Records",
   "Black Book Records",
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "CASSIMM",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Crusy",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "James Hurr",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Siege",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Reza",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Ferreck Dawn",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Ronnie Spiteri",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Bruno Furlan",
  "labels": [
   "Toolroom Records",
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "D.Ramirez",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sharam Jey",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Marco Lys",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "CID",
  "labels": [
   "Toolroom Records",
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Qubiko",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Katy Alex",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Roland Clark",
  "labels": [
   "Toolroom Records",
   "Go Deeva Records",
   "Quantize Recordings",
   "Moulton Music",
   "Groove Culture",
   "Snatch! Records",
   "King Street Sounds"
  ],
  "genres": [
   "Tech House",
   "House",
   "Afro House",
   "Latin House",
   "Tribal House",
   "Soulful House",
   "Deep House",
   "Disco House",
   "Garage House"
  ]
 },
 {
  "name": "Nicole Moudaber",
  "labels": [
   "Toolroom Records",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "SIDEPIECE",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Piero Pirupa",
  "labels": [
   "Toolroom Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Thomas Newson",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Earth n Days",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Stadiumx",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Jewel Kid",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Adrian Hour",
  "labels": [
   "Toolroom Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Claude VonStroke",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Justin Martin",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Christian Martin",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "J. Phlip",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Justin Jay",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Worthy",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Eats Everything",
  "labels": [
   "Dirtybird Records",
   "Desolat",
   "Realm Records"
  ],
  "genres": [
   "Tech House",
   "House",
   "Minimal House"
  ]
 },
 {
  "name": "Shiba San",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Walker & Royce",
  "labels": [
   "Dirtybird Records",
   "Black Book Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Nikki Nair",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Ardalan",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sacha Robotti",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Kill Frenzy",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Jesse Perez",
  "labels": [
   "Dirtybird Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sage Armstrong",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Steve Darko",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "VNSSA",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Westend",
  "labels": [
   "Dirtybird Records",
   "Insomniac Records",
   "Experts Only"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Will Clarke",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Billy Kenny",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Kevin Knapp",
  "labels": [
   "Dirtybird Records",
   "Elrow Music",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Shadow Child",
  "labels": [
   "Dirtybird Records",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Breach",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Green Velvet",
  "labels": [
   "Dirtybird Records",
   "Black Book Records",
   "Experts Only",
   "Snatch! Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Cajmere",
  "labels": [
   "Dirtybird Records",
   "Snatch! Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mikey Lion",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Gettoblaster",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Lubelski",
  "labels": [
   "Dirtybird Records",
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mary Droppinz",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Get Real",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sammy D",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Barclay Crenshaw",
  "labels": [
   "Dirtybird Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Damian Lazarus",
  "labels": [
   "Crosstown Rebels",
   "Get Physical Music",
   "Realm Records"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House",
   "Afro House"
  ]
 },
 {
  "name": "Jamie Jones",
  "labels": [
   "Crosstown Rebels",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House"
  ]
 },
 {
  "name": "Seth Troxler",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Maceo Plex",
  "labels": [
   "Crosstown Rebels",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House"
  ]
 },
 {
  "name": "Art Department",
  "labels": [
   "Crosstown Rebels",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House"
  ]
 },
 {
  "name": "Luciano",
  "labels": [
   "Crosstown Rebels",
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Minimal House"
  ]
 },
 {
  "name": "Ricardo Villalobos",
  "labels": [
   "Crosstown Rebels",
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Minimal House"
  ]
 },
 {
  "name": "Guy Gerber",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Dubfire",
  "labels": [
   "Crosstown Rebels",
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Minimal House"
  ]
 },
 {
  "name": "Black Coffee",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Acid Pauli",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Audiofly",
  "labels": [
   "Crosstown Rebels",
   "Get Physical Music",
   "Desolat",
   "All Day I Dream"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House",
   "Afro House",
   "Minimal House",
   "Organic House"
  ]
 },
 {
  "name": "Audiojack",
  "labels": [
   "Crosstown Rebels",
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Minimal House"
  ]
 },
 {
  "name": "Bedouin",
  "labels": [
   "Crosstown Rebels",
   "All Day I Dream"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Carl Craig",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "DJ Tennis",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Eli & Fur",
  "labels": [
   "Crosstown Rebels",
   "Anjunadeep"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Deep House",
   "Organic House"
  ]
 },
 {
  "name": "Fur Coat",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Francesca Lombardo",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Frankey & Sandrino",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Guti",
  "labels": [
   "Crosstown Rebels",
   "Desolat",
   "Snatch! Records"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Minimal House"
  ]
 },
 {
  "name": "Krust",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Mathew Jonson",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Radio Slave",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Raxon",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Red Axes",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Satori",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Soul Clap",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Subb-an",
  "labels": [
   "Crosstown Rebels",
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House"
  ]
 },
 {
  "name": "The Martinez Brothers",
  "labels": [
   "Crosstown Rebels",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House"
  ]
 },
 {
  "name": "THEMBA",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Yousef",
  "labels": [
   "Crosstown Rebels",
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "Minimal House"
  ]
 },
 {
  "name": "Patrice Bäumel",
  "labels": [
   "Crosstown Rebels",
   "Get Physical Music"
  ],
  "genres": [
   "Tech House",
   "Melodic House",
   "House",
   "Afro House"
  ]
 },
 {
  "name": "Moscoman",
  "labels": [
   "Crosstown Rebels"
  ],
  "genres": [
   "Tech House",
   "Melodic House"
  ]
 },
 {
  "name": "Louie Vega",
  "labels": [
   "Nervous Records",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Soulful House"
  ]
 },
 {
  "name": "Kenny Dope",
  "labels": [
   "Nervous Records",
   "Nu Groove Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Oscar G",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Anané",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Todd Terry",
  "labels": [
   "Nervous Records",
   "Snatch! Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House",
   "Tech House"
  ]
 },
 {
  "name": "Kerri Chandler",
  "labels": [
   "Nervous Records",
   "Large Music",
   "Moon Harbour",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Deep House",
   "Soulful House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Harry Romero",
  "labels": [
   "Nervous Records",
   "Elrow Music"
  ],
  "genres": [
   "House",
   "Garage House",
   "Tech House"
  ]
 },
 {
  "name": "David Morales",
  "labels": [
   "Nervous Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Junior Sanchez",
  "labels": [
   "Nervous Records",
   "Elrow Music",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House",
   "Tech House"
  ]
 },
 {
  "name": "Armand Van Helden",
  "labels": [
   "Nervous Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Todd Edwards",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Masters At Work",
  "labels": [
   "Nervous Records",
   "Nu Groove Records",
   "Strictly Rhythm",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Frankie Knuckles",
  "labels": [
   "Nervous Records",
   "Strictly Rhythm",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Soulful House"
  ]
 },
 {
  "name": "DJ Chus",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Doug Gomez",
  "labels": [
   "Nervous Records",
   "MoBlack Records"
  ],
  "genres": [
   "House",
   "Garage House",
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mark Lower",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Lauren Flax",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Matthias Vogt",
  "labels": [
   "Nervous Records",
   "Large Music"
  ],
  "genres": [
   "House",
   "Garage House",
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Jaymie Silk",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Bodysync",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "LOVEFOXY",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Daisybelle",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Marcos Carnaval",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "youANDme",
  "labels": [
   "Nervous Records"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Simone Vitullo",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Danny Slim",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Cari Golden",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Newman (I Love)",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "MAXI MERAKI",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Joezi",
  "labels": [
   "Go Deeva Records",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House",
   "Soulful House"
  ]
 },
 {
  "name": "Fancy Inc",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Liva K",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "MR.BLACK",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Tayllor",
  "labels": [
   "Go Deeva Records",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House",
   "Afro Tech"
  ]
 },
 {
  "name": "Darksidevinyl",
  "labels": [
   "Go Deeva Records",
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House",
   "Afro Tech"
  ]
 },
 {
  "name": "Moonwalk",
  "labels": [
   "Go Deeva Records",
   "Purified Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House",
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Aaron Sevilla",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Anorre",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Rockin Moroccan",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Peppe Fiordalisi",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Mirco Caruso",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Jerome Robins",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Vanilla Ace",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Kaiser Souzai",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Kenny Brian",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "Enzo Siffredi",
  "labels": [
   "Go Deeva Records"
  ],
  "genres": [
   "Afro House",
   "Latin House",
   "Tribal House"
  ]
 },
 {
  "name": "BLOND:ISH",
  "labels": [
   "Abracadabra Music",
   "Get Physical Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House",
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Francis Mercier",
  "labels": [
   "Abracadabra Music",
   "Deep Root Tribe",
   "Insomniac Records"
  ],
  "genres": [
   "Afro House",
   "Melodic House",
   "Afro Tech",
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Emvafaya",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Moojo",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Nico de Andrea",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Hyenah",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "AMEME",
  "labels": [
   "Abracadabra Music",
   "All Day I Dream"
  ],
  "genres": [
   "Afro House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Wilson Kentura",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "The Soul Brothers",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Chambord",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "MALÓNE",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Oluhle",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Kapibara",
  "labels": [
   "Abracadabra Music",
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Melodic House",
   "Afro Tech"
  ]
 },
 {
  "name": "Cameron Jack",
  "labels": [
   "Abracadabra Music",
   "All Day I Dream"
  ],
  "genres": [
   "Afro House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Gab Rhome",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Archila",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "West & Hill",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Baron (FR)",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Sasson (FR)",
  "labels": [
   "Abracadabra Music",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Melodic House",
   "Soulful House"
  ]
 },
 {
  "name": "Nii Tei",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "MIICHII",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Savage & SHē",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Arkadyan",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Demayä",
  "labels": [
   "Abracadabra Music"
  ],
  "genres": [
   "Afro House",
   "Melodic House"
  ]
 },
 {
  "name": "Caiiro",
  "labels": [
   "Caiiro Music",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech",
   "Soulful House"
  ]
 },
 {
  "name": "Da Capo",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Pixie L",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Wunmi",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Black Motion",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mpumi",
  "labels": [
   "Caiiro Music",
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Xoli M",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "VITOTO",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Anda Cassandra",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Malumz on Decks",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Deena G",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Xolani Guitars",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Ami Faku",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Simmy",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Biishop",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Von Boch",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Deidre",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Fanzo",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Jordan Arts",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Kali Mija",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "KB Motsilanyane",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Thabz Da Mos Hi",
  "labels": [
   "Caiiro Music"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "CHUS",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "La Santa",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Joeski",
  "labels": [
   "Redolent Music",
   "Saved Records"
  ],
  "genres": [
   "Afro House",
   "Organic House",
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Anturage",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Leo Guardo",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Toshi",
  "labels": [
   "Redolent Music",
   "MoBlack Records",
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Organic House",
   "Afro Tech"
  ]
 },
 {
  "name": "Craig Leo",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Les Castizos",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Nolek",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Randoree",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "SAHAR SAX",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Dean Mickoski",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Nicinha",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "CLAVÉ (US)",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Claudia León",
  "labels": [
   "Redolent Music",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Organic House",
   "Afro Tech"
  ]
 },
 {
  "name": "Edgar Aguirre",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Alexey Union",
  "labels": [
   "Redolent Music"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Sparrow & Barbossa",
  "labels": [
   "Redolent Music",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Organic House",
   "Soulful House"
  ]
 },
 {
  "name": "M.A.N.D.Y.",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Booka Shade",
  "labels": [
   "Get Physical Music",
   "Moon Harbour"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "DJ T.",
  "labels": [
   "Get Physical Music",
   "Moon Harbour"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Dixon",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "DJ Koze",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Heidi",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Matthew Dear",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Junior Boys",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Nôze",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Modeselektor",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Pan-Pot",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Anja Schneider",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Reboot",
  "labels": [
   "Get Physical Music",
   "Desolat",
   "Snatch! Records",
   "Moon Harbour"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Pezzner",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Nico Stojan",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Jazzuelle",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Lazarusman",
  "labels": [
   "Get Physical Music",
   "Connected Frontline",
   "Realm Records"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House",
   "Afro Tech"
  ]
 },
 {
  "name": "Karol XVII & MB Valence",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "John Monkman",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Fiora",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Chelonis R. Jones",
  "labels": [
   "Get Physical Music"
  ],
  "genres": [
   "House",
   "Afro House",
   "Tech House"
  ]
 },
 {
  "name": "Reel People",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Oli Lazarus",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Angela Johnson",
  "labels": [
   "Papa Records",
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Disco House"
  ]
 },
 {
  "name": "Alison David",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Tony Momrelle",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Imaani",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Simon Grey",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Aaries",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "DJ Spinna",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Selan",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Eli Escobar",
  "labels": [
   "Papa Records",
   "Razor-N-Tape"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Osunlade",
  "labels": [
   "Papa Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Maiya James",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Dalminjo",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Da Lata",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Diabel Cissokho",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Jag",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Domu",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Pete Simpson",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Vanessa Freeman",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sarah Anne Webb",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Monkey Brothers",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Monique Bingham",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Matthias Heilbronn",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Dyanna Fearon",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Frank McComb",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sharlene Hector",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Richard Earnshaw",
  "labels": [
   "Papa Records",
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Disco House"
  ]
 },
 {
  "name": "The Layabouts",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Heidi Vogel",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Deborah Bond",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Portia Monique",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Jon Cutler",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Faze Action",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Atjazz",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Darien Dean",
  "labels": [
   "Papa Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "DJ Spen",
  "labels": [
   "Quantize Recordings",
   "MoBlack Records",
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Afro House",
   "Afro Tech",
   "Garage House"
  ]
 },
 {
  "name": "Thommy Davis",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Greg Lewis",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "MicFreak",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Reelsoul",
  "labels": [
   "Quantize Recordings",
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Tee Smith",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sahib Muhammad",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Gianni Junior",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Tracy Hamlin",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sheree Hicks",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Dawn Tallman",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Tasha LaRae",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Cleveland P. Jones",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Melissa B",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Steal Vybe",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sonic Soul Orchestra",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Fonda Rae",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Ron Hall",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Ronnie Herel",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Barbara Tucker",
  "labels": [
   "Quantize Recordings",
   "Strictly Rhythm",
   "King Street Sounds",
   "Glitterbox"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "House",
   "Garage House",
   "Disco House"
  ]
 },
 {
  "name": "Kenny Bobien",
  "labels": [
   "Quantize Recordings",
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Garage House"
  ]
 },
 {
  "name": "Michelle Weeks",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Kathy Brown",
  "labels": [
   "Quantize Recordings",
   "Groove Culture",
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Disco House",
   "Garage House"
  ]
 },
 {
  "name": "DJ Fudge",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Fil Straughan",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Spencer Morales",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Demarkus Lewis",
  "labels": [
   "Quantize Recordings",
   "Large Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sebas Ramis",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Geoffrey C",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Richard Burton",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Inaya Day",
  "labels": [
   "Quantize Recordings",
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Marc Evans",
  "labels": [
   "Quantize Recordings"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Homero Espinosa",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "David Harness",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Chris Lum",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Allen Craig",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Franky Boissy",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "The SyntheTigers",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Cubase Dan",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Tobirus Mozelle",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Lady Alma",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Tony Soul",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sergio Fedasz",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Ivan Ruiz",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Anish Acharya",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Andrea Love",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Della",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sean McCabe",
  "labels": [
   "Moulton Music",
   "Local Talk"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Soledrifter",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Sebb Junior",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Moon Rocket",
  "labels": [
   "Moulton Music",
   "MoBlack Records"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Micky More & Andy Tee",
  "labels": [
   "Moulton Music",
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Deep House",
   "Disco House"
  ]
 },
 {
  "name": "Dahrio Wonder",
  "labels": [
   "Moulton Music"
  ],
  "genres": [
   "Soulful House",
   "Deep House"
  ]
 },
 {
  "name": "Rheji Burrell",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Ronald Burrell",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Burrell Brothers",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "N.Y. House'n Authority",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Tech Trax Inc.",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Metro",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "K.A.T.O.",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Equation",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Houz' Neegroz",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Utopia Project",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Aphrodisiac",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Bas Noir",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Lisa Lee",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Roqui",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Emjay",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Bobby Konders",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Basil Hardhouse",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Joey Beltram",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Peter Daou",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Joey Negro",
  "labels": [
   "Nu Groove Records",
   "Glitterbox"
  ],
  "genres": [
   "Garage House",
   "Deep House",
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Frankie Bones",
  "labels": [
   "Nu Groove Records"
  ],
  "genres": [
   "Garage House",
   "Deep House"
  ]
 },
 {
  "name": "Joss Moog",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Barbara Alvarez",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Jason Merle",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Cuillère",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Barry Sound",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Tree Threes",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Alex Maiz",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Alfredo Ávila",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Martha Dark",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Jacssen",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Hotevilla",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Swing Duke",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Drunk At Vogue",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Jaemus",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "Funkbrothas",
  "labels": [
   "House Salad Music"
  ],
  "genres": [
   "Soulful House",
   "House"
  ]
 },
 {
  "name": "JKriv",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Underground System",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Midnight Magic",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Yuksek",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Jungle Fire",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Diogo Strausz",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "The Juan Maclean",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Luvless",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Michael The Lion",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Kraak & Smaak",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Fatnotronic",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Dimitri From Brooklyn",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Nebraska",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Son Of Sound",
  "labels": [
   "Razor-N-Tape",
   "Local Talk"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House",
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Tom of Brooklyn",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Loz Goddard",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Lay-Far",
  "labels": [
   "Razor-N-Tape",
   "Local Talk"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House",
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Ben Sun",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Delfonic",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Golden Dawn Arkestra",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Cody Currie",
  "labels": [
   "Razor-N-Tape",
   "Toy Tonics"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House",
   "Deep House"
  ]
 },
 {
  "name": "Frank Booker",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Peter Croce",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Clive From Accounts",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Mytron & Ofofo",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Patrick Gibin",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "DJ Vas",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Body Music",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "79.5",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "The Phenomenal Handclap Band",
  "labels": [
   "Razor-N-Tape",
   "Toy Tonics"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House",
   "Deep House"
  ]
 },
 {
  "name": "Tigerbalm",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Flamingo Pier",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Amy Douglas",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Eddie C",
  "labels": [
   "Razor-N-Tape"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House"
  ]
 },
 {
  "name": "Elado",
  "labels": [
   "Razor-N-Tape",
   "Toy Tonics"
  ],
  "genres": [
   "Disco House",
   "Nu-Disco",
   "House",
   "Deep House"
  ]
 },
 {
  "name": "Kapote",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Coeo",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Sam Ruffillo",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Barbara Boeing",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Joel Holmes",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Gee Lane",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Kosmo Kint",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Sound Support",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Demuja",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Baby's Berserk",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Alma Negra",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Pat Kalla",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Jose Barranquero",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Dante Lucero",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Marla Kether",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Arpy Brown",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Melon Bomb",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Daniel Monaco",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Candy Voice",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Sano",
  "labels": [
   "Toy Tonics"
  ],
  "genres": [
   "House",
   "Disco House",
   "Deep House"
  ]
 },
 {
  "name": "Mad Mats",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Tooli",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "HNNY",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "DJ Steaw",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Dirtytwo",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Fulbert",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Wil Maddams",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Deymare",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Tanzlife",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Adesse Versions",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Art of Tones",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Ashley Beedle",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Boddhi Satva",
  "labels": [
   "Local Talk",
   "Offering Recordings"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Coflo",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Fred Everything",
  "labels": [
   "Local Talk",
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Glenn Davis",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Jamie 3:26",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Keita Sano",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Kiko Navarro",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Kyodai",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Mark de Clive-Lowe",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Opolopo",
  "labels": [
   "Local Talk",
   "Groove Culture"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "S3A",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Soulphiction",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Shuya Okino",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Turbojazz",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Vick Lavender",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Willie Graff",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Zepherin Saint",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Nico Lahs",
  "labels": [
   "Local Talk"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Roy Davis Jr.",
  "labels": [
   "Large Music",
   "Strictly Rhythm"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Robert Owens",
  "labels": [
   "Large Music",
   "Snatch! Records"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "Tech House"
  ]
 },
 {
  "name": "DJ Sneak",
  "labels": [
   "Large Music",
   "Desolat",
   "Snatch! Records",
   "Strictly Rhythm"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "Tech House",
   "Minimal House",
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Mateo & Matos",
  "labels": [
   "Large Music",
   "King Street Sounds"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Rasoul",
  "labels": [
   "Large Music",
   "Strictly Rhythm"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Miguel Migs",
  "labels": [
   "Large Music",
   "Groove Culture"
  ],
  "genres": [
   "Deep House",
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Julius Papp",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Halo",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Saison",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Chris Stussy",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "James Dexter",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Roland Nights",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Evan Iff",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Jeff Craven",
  "labels": [
   "Large Music"
  ],
  "genres": [
   "Deep House",
   "Soulful House"
  ]
 },
 {
  "name": "Incognito",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Dave Lee",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "The Sunburst Band",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Dimitri From Paris",
  "labels": [
   "Groove Culture",
   "Glitterbox"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Ron Carroll",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Michele Chiavarini",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Full Intention",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Angelo Ferreri",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Dr Packer",
  "labels": [
   "Groove Culture",
   "Glitterbox"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "John Morales",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "DJ James Ingram",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Funkatomic",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Serge Funk",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Reverendos Of Soul",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Cevin Fisher",
  "labels": [
   "Groove Culture",
   "Strictly Rhythm"
  ],
  "genres": [
   "Soulful House",
   "Disco House",
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Lee Wilson",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "Fatimah Provillon",
  "labels": [
   "Groove Culture"
  ],
  "genres": [
   "Soulful House",
   "Disco House"
  ]
 },
 {
  "name": "MoBlack",
  "labels": [
   "MoBlack Records",
   "Insomniac Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech",
   "Tech House",
   "House"
  ]
 },
 {
  "name": "M. Caporale",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "De Cave Man",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Enoo Napa",
  "labels": [
   "MoBlack Records",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Savio De Simone",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Armonica",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Spellband",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "FNX OMAR",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Sobek",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Idd Aziz",
  "labels": [
   "MoBlack Records",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Dele Sosimi",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Emmanuel Jal",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mariam Zawose",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Fatoumata Diawara",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Christos Fourkis",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Stones & Bones",
  "labels": [
   "MoBlack Records",
   "King Street Sounds"
  ],
  "genres": [
   "Afro House",
   "Afro Tech",
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Mattei & Omich",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Paki Palmieri",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mabiisi",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Zipho",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mulya",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Said Rifai",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Jackson Brainwave",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Dave Anthony",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Breyth",
  "labels": [
   "MoBlack Records",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Cee ElAssaad",
  "labels": [
   "MoBlack Records",
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech",
   "Soulful House"
  ]
 },
 {
  "name": "Kususa",
  "labels": [
   "MoBlack Records",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Young DJ",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Ancestral Invaders",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "DJ Habias",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Alou Sangare",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Bel-Ami",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Saliva Commandos",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mark Di Meo",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Peppe Citarella",
  "labels": [
   "MoBlack Records"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Eustace Jahari",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Bria 83 Orchestra",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Hadja Samako",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "IFrika",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "ZORÉ",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Nyah Noor",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Velho Da Banda",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Solah Mae",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Abdul Champion",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Ochanique",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "The French Twins",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Ivan Diaz",
  "labels": [
   "Offering Recordings"
  ],
  "genres": [
   "Afro House",
   "Organic House"
  ]
 },
 {
  "name": "Da Mike",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Mr Joe",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "MÖW",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Yamil",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "G.Zamora",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "AUGUSTE",
  "labels": [
   "Connected Frontline",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Kreative Nativez",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Antonio Lyons",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Oluwadamvic",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Nicolas Nohra",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Bástian V",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Kawtar Sadik",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Apo",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Djolee",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Vini Pistori",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "LevyM",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Carlos Francisco",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Nipkoss",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Kieran Apter",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Nikos Diamantopoulos",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Carlos Barbero",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Astrosoul",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Valer den Bit",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Bayaka (IT)",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Jalal Ramdani",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "WAHM (FR)",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "MANQO",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Connected Soundsystem",
  "labels": [
   "Connected Frontline"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "DJ Kent",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Maleh",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "OSFUR",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "UVITA",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "The Scripture",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Mont Rouge",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Le Croque",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Fideles",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Moeaike",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Sandhaus",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Manoo",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Rockin Morrocin",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Yass",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Collé",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "DJ Kabila",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Dr. Feel",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Nsha",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Gumz",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "JUNO (DE)",
  "labels": [
   "Madorasindahouse Records"
  ],
  "genres": [
   "Afro House",
   "Soulful House"
  ]
 },
 {
  "name": "Kasango",
  "labels": [
   "Madorasindahouse Records",
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Soulful House",
   "Afro Tech"
  ]
 },
 {
  "name": "Nitefreak",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Lenny Auguste",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "AVÖ (PT)",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "QT-High",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Syon",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Amour Propre",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Warm",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Bibi Den's Tshibayi",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Badbox",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Bun Xapa",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Daytona",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Massala",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Divolly & Markward",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Choujaa",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Imad",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "clubhouse",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Shammalee",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "MP3 (DE)",
  "labels": [
   "Deep Root Tribe"
  ],
  "genres": [
   "Afro House",
   "Afro Tech"
  ]
 },
 {
  "name": "Loco Dice",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Martin Buttrich",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Livio & Roby",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "tINI",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Cuartero",
  "labels": [
   "Desolat",
   "Moon Harbour",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Butch",
  "labels": [
   "Desolat",
   "Snatch! Records",
   "Moon Harbour",
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Robert Dietz",
  "labels": [
   "Desolat",
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Francisco Allendes",
  "labels": [
   "Desolat",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Yaya",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Hector",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Shlomi Aber",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Mathias Kaden",
  "labels": [
   "Desolat",
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Andrea Oliva",
  "labels": [
   "Desolat",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "wAFF",
  "labels": [
   "Desolat",
   "Solid Grooves Records",
   "Snatch! Records",
   "Moon Harbour",
   "Elrow Music",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Cassy",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Alexkid",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Premiesku",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Basti Grub",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Benny Rodrigues",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Dragosh",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Alli Borem",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Sante",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Davide Squillace",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Mendo",
  "labels": [
   "Desolat",
   "Moon Harbour",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Carlo Lio",
  "labels": [
   "Desolat",
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Argy",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Marco Carola",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Franck Roger",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "William Djoko",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Traumer",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Enzo Siragusa",
  "labels": [
   "Desolat"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Chris Lake",
  "labels": [
   "Black Book Records",
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Cloonee",
  "labels": [
   "Black Book Records",
   "Repopulate Mars",
   "Moon Harbour",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House",
   "Minimal House"
  ]
 },
 {
  "name": "Mochakk",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Chris Lorenzo",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "HoneyLuv",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Noizu",
  "labels": [
   "Black Book Records",
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Eli Brown",
  "labels": [
   "Black Book Records",
   "Insomniac Records",
   "Purified Records",
   "Repopulate Mars",
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "House",
   "Melodic House",
   "Deep House",
   "Minimal House"
  ]
 },
 {
  "name": "Wade",
  "labels": [
   "Black Book Records",
   "Solid Grooves Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sosa",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Marco Strous",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Hank",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "TOBEHONEST",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Aluna",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Chloé Robinson",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "High Jinx",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Aatig",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Goooey Vuitton",
  "labels": [
   "Black Book Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Gorgon City",
  "labels": [
   "Realm Records",
   "Experts Only"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Danny Howard",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Charlie Boon",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Azzecca",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Dreya V",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Chris Luno",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Kitty Amor",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Leftwing : Kody",
  "labels": [
   "Realm Records",
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "GENESI",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Michael Bibi",
  "labels": [
   "Realm Records",
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Solomun",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Third Culture",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Soraya",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "NADIAH",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Danny P",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Scrappa",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Mak & Pasteman",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Taet",
  "labels": [
   "Realm Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "HUGEL",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Disco Lines",
  "labels": [
   "Insomniac Records",
   "Experts Only"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "James Hype",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mau P",
  "labels": [
   "Insomniac Records",
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Goodboys",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Odd Mob",
  "labels": [
   "Insomniac Records",
   "Experts Only"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Morgan Seatree",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sammy Virji",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Tiësto",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Alok",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "MEDUSA",
  "labels": [
   "Insomniac Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "OMNOM",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Silver Panda",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Sub Focus",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "GUZ",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Roddy Lima",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Tini Gessler",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Layton Giordani",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Max Styler",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Chris Avantgarde",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Kevin de Vries",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Subtronics",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Tape B",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "JØRD",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Dansyn",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "OMRI.",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Hayla",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Stevie Appleton",
  "labels": [
   "Experts Only"
  ],
  "genres": [
   "House",
   "Tech House"
  ]
 },
 {
  "name": "Above & Beyond",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Jody Wisternoff",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "James Grant",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Yotto",
  "labels": [
   "Anjunadeep",
   "This Never Happened"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Luttrell",
  "labels": [
   "Anjunadeep",
   "This Never Happened"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Ben Böhmer",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Tinlicker",
  "labels": [
   "Anjunadeep",
   "This Never Happened"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Qrion",
  "labels": [
   "Anjunadeep",
   "This Never Happened"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Lycoriscoris",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Marsh",
  "labels": [
   "Anjunadeep",
   "This Never Happened",
   "Colorize"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House",
   "Progressive House"
  ]
 },
 {
  "name": "CRi",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Jon Gurd",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Moon Boots",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Cubicolor",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Way Out West",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Dusky",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Lane 8",
  "labels": [
   "Anjunadeep",
   "This Never Happened"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Jaytech",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Dosem",
  "labels": [
   "Anjunadeep",
   "Colorize",
   "Purified Records"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House",
   "Progressive House"
  ]
 },
 {
  "name": "Ryan Davis",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Nox Vahn",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Jerro",
  "labels": [
   "Anjunadeep",
   "This Never Happened"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "il:lo",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Franky Wah",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Durante",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Leaving Laurel",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "boerd",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Nikola Melnikov",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "James Shinra",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Andrew Bayer",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Spencer Brown",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Nils Hoffmann",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "16 Bit Lolitas",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Croquet Club",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "David Hohme",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Amtrac",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Edu Imbernon",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Catching Flies",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Juno Mamba",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Ezequiel Arias",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Blake.08",
  "labels": [
   "Anjunadeep"
  ],
  "genres": [
   "Deep House",
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Lee Burridge",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Matthew Dekay",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Lost Desert",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "YokoO",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Lauren Ritter",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Amonita",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Arina Mur",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Christian Löffler",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Curol",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Dim Kelly",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Double Touch",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Facundo Mohrr",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Fulltone",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Igor Marijuan",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Jim Rider",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Enamour",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Pippi Ciez",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Squire",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "DOTB",
  "labels": [
   "All Day I Dream"
  ],
  "genres": [
   "Melodic House",
   "Organic House"
  ]
 },
 {
  "name": "Sultan + Shepard",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Massane",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Le Youth",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Klur",
  "labels": [
   "This Never Happened",
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Deep House",
   "Progressive House"
  ]
 },
 {
  "name": "PARIS",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Kasbo",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Township Rebellion",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Anderholm",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Avoure",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Anakim",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Simon Doty",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Rinzen",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Kasablanca",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Robby East",
  "labels": [
   "This Never Happened",
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Deep House",
   "Progressive House"
  ]
 },
 {
  "name": "Mees Salomé",
  "labels": [
   "This Never Happened",
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Deep House",
   "Progressive House"
  ]
 },
 {
  "name": "Kidnap",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "ATTLAS",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Paraleven",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Nimino",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Tishmal",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "OCULA",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Forester",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Helsloot",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Spada",
  "labels": [
   "This Never Happened"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Estiva",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "EMBRZ",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "PRAANA",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Kaskade",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "mölly",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Icarus",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Braxton",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Fejká",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Lipless",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Boxer",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "L.GU.",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Modera",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "MXV",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Just Her",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Jack Willard",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Guy Didden",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Hessian",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Datskie",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Lili Chan",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "VEHA",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "VisionV",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Dezza",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Matt Fax",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Sound Quelle",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Andrew Benson",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Schodt",
  "labels": [
   "Colorize"
  ],
  "genres": [
   "Melodic House",
   "Progressive House"
  ]
 },
 {
  "name": "Nora En Pure",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Corren Cavini",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Jack Emery",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Lexer",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Aplexo",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Garlington",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Return Of The Jaded",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Glusko",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "ARIV3",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Paradoks",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "PARAFRAME",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Nicky Elisabeth",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "SOHMI",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Jonas Saalbach",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Tommy Farrow",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Danito",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Alex Breitling",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Alex Rusin",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Chris Howard",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Juno Stone",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Milan Steenwinkel",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "RIKO & GUGGA",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Sky Garden",
  "labels": [
   "Purified Records"
  ],
  "genres": [
   "Melodic House",
   "Deep House"
  ]
 },
 {
  "name": "Lee Foss",
  "labels": [
   "Repopulate Mars",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Andre Salmon",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Latmun",
  "labels": [
   "Repopulate Mars",
   "Snatch! Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "SPNCR",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Volkoder",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mason Maynard",
  "labels": [
   "Repopulate Mars",
   "Elrow Music",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Joshwa",
  "labels": [
   "Repopulate Mars",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "NightFunk",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Steingold",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Kolombo",
  "labels": [
   "Repopulate Mars",
   "Snatch! Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Federico Ambrosi",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mhod",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Reblok",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Wise D & Kobe",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "KC Wray",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "G. Felix",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "SYAP",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "MKJAY",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "BLACK GIRL / WHITE GIRL",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "SOSA (UK)",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Baum",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Monoky",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "POLOVICH",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Lee Curtiss",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Hayley May",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Max Reals",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Red Weeller",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "itsbilly",
  "labels": [
   "Repopulate Mars"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "PAWSA",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Dennis Cruz",
  "labels": [
   "Solid Grooves Records",
   "Snatch! Records",
   "Moon Harbour",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Ben Sterling",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Blackchild (ITA)",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Silvie Loto",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Reelow",
  "labels": [
   "Solid Grooves Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Ramin Rezaie",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "KinAhau",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Bassel Darwish",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Wheats",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Detlef",
  "labels": [
   "Solid Grooves Records",
   "Moon Harbour",
   "Elrow Music",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Eddy M",
  "labels": [
   "Solid Grooves Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Endor",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Franz Costa",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Leon",
  "labels": [
   "Solid Grooves Records",
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Sabb",
  "labels": [
   "Solid Grooves Records",
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Sable Sheep",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Shokë",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Anek",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "ANOTR",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Brett Gould",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Carloh",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Classmatic",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Dateless",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Dimmish",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "DJ W!ld",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Okain",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Onno",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Pirate Copy",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Rendher",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Route 94",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Skream",
  "labels": [
   "Solid Grooves Records",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Tiger Stripes",
  "labels": [
   "Solid Grooves Records",
   "King Street Sounds"
  ],
  "genres": [
   "Tech House",
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Luuk Van Dijk",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "JUST2",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "MANT",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Richard Ulh",
  "labels": [
   "Solid Grooves Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Paolo Martini",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Paul C",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Federico Grazzini",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Mihalis Safras",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "M.in",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "David Keno",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Mat.Joe",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Roberto Surace",
  "labels": [
   "Snatch! Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Carl Cox",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Fatboy Slim",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Major Lazer",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Hector Couto",
  "labels": [
   "Snatch! Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "LouLou Players",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Thomas Schumacher",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Tapesh",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Ramon Tapia",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "KiNK",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Russ Yallop",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Steve Bug",
  "labels": [
   "Snatch! Records",
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Neverdogs",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Coyu",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Demuir",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Donk Boys",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Jon Rundell",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Danny Serrano",
  "labels": [
   "Snatch! Records",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Hollen",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Ron Costa",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Phil Weeks",
  "labels": [
   "Snatch! Records"
  ],
  "genres": [
   "Tech House"
  ]
 },
 {
  "name": "Matthias Tanzmann",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Ninetoes",
  "labels": [
   "Moon Harbour",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Sven Tasnadi",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Dan Drastic",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Luna City Express",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Daniel Stefanik",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Audio Werner",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Adam Port",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Nick Curly",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "East End Dubs",
  "labels": [
   "Moon Harbour",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Patrick Topping",
  "labels": [
   "Moon Harbour",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Hot Since 82",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Huxley",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Hauswerks",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Ekkohaus",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Sidney Charles",
  "labels": [
   "Moon Harbour",
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "Minimal House",
   "House"
  ]
 },
 {
  "name": "Kaiserdisco",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Gregor Tresher",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Andhim",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Nico Cabeza",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Ray Okpara",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "Steve Lawler",
  "labels": [
   "Moon Harbour"
  ],
  "genres": [
   "Tech House",
   "Minimal House"
  ]
 },
 {
  "name": "De La Swing",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Toni Varga",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Marc Maya",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Bastian Bux",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Andres Campo",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Paco Osuna",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Technasia",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "David Herrero",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Chus & Ceballos",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mele",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Rafa Barrios",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Nathan Barato",
  "labels": [
   "Elrow Music",
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mar-T",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Manu Gonzalez",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Max Chapman",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Metodi Hristov",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Supernova",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Tomi&Kesh",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Vidaloca",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Guille Placencia",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Shermanology",
  "labels": [
   "Elrow Music"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Roger Sanchez",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Erick Morillo",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "George Morel",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "DJ Pierre",
  "labels": [
   "Strictly Rhythm",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Soulful House"
  ]
 },
 {
  "name": "Frankie Feliciano",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Ian Pooley",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Ultra Naté",
  "labels": [
   "Strictly Rhythm",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Soulful House"
  ]
 },
 {
  "name": "Reel 2 Reel",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Mood II Swing",
  "labels": [
   "Strictly Rhythm",
   "King Street Sounds"
  ],
  "genres": [
   "House",
   "Garage House",
   "Soulful House"
  ]
 },
 {
  "name": "Ben Westbeech",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Motor City Drum Ensemble",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Afrojack",
  "labels": [
   "Strictly Rhythm"
  ],
  "genres": [
   "House",
   "Garage House"
  ]
 },
 {
  "name": "Blaze",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "DJ Vivona",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Ananda Project",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Big Moses",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Johnny Dangerous",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Antonello Ferrari",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Heather Johnson",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Aaron K. Gray",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "James Deron",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Less Hate",
  "labels": [
   "King Street Sounds"
  ],
  "genres": [
   "Soulful House",
   "Garage House"
  ]
 },
 {
  "name": "Mousse T.",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Folamour",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "The Shapeshifters",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Cassius",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Candi Staton",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Kelly G",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Melvo Baptiste",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Debbie Jacobs",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Simon Dunmore",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Horse Meat Disco",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Roisin Murphy",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Teni Tinks",
  "labels": [
   "Glitterbox"
  ],
  "genres": [
   "Disco House",
   "Soulful House"
  ]
 },
 {
  "name": "Richy Ahmed",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Alan Fitzpatrick",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Danny Tenaglia",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Paul Woolford",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Seb Zito",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Miguel Campbell",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Hot Natured",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Matador",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Popof",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Riton",
  "labels": [
   "Hot Creations"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Nic Fanciulli",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mark Fanciulli",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Mark Broom",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Santos",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Gary Beck",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Julien Chaptal",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Lauren Lane",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Stacey Pullen",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Spencer Parker",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Steve Mac",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Terrence Parker",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Philip Bader",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "&ME",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Alex Tepper",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 },
 {
  "name": "Funkerman",
  "labels": [
   "Saved Records"
  ],
  "genres": [
   "Tech House",
   "House"
  ]
 }
];
