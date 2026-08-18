export type Page = "home" | "photos" | "horse" | "food" | "love" | "bucketlist" | "wishlist";
export type Mood = "sad" | "boos" | "druk";

export interface MoodPack {
  label: string;
  comfort: string[];
  affirmations: string[];
  reasons: string[];
  tinyJoy: string[];
  steps: string[];
}

export interface FoodOption {
  id: "frietjes" | "piesta" | "pokebowl";
  name: string;
  emoji: string;
  color: string;
  textColor: string;
  subtitle: string;
  hype: string[];
}

export interface BucketItem {
  id: string;
  text: string;
  done: boolean;
  category?: "movies" | "food" | "trips" | "fun" | "cozy";
}

export interface WishItem {
  id: string;
  title: string;
  note?: string;
  priority?: "must" | "nice" | "dream";
  done?: boolean;
  createdAt: number;
}

export const navItems: Array<{ page: Page; label: string }> = [
  { page: "home", label: "Home" },
  { page: "photos", label: "Lou generator" },
  { page: "horse", label: "Peirt generator" },
  { page: "food", label: "WTF gaan wij eten" },
  { page: "love", label: "Love hub" },
  { page: "bucketlist", label: "Bucketlist" },
  { page: "wishlist", label: "Wishlist" }
];

export const initialBucketlist: BucketItem[] = [
  { id: "contrex", text: "contrex drinken", done: false, category: "food" },
  { id: "got", text: "game of thrones", done: true, category: "movies" },
  { id: "death-note", text: "death note (half)", done: true, category: "movies" },
  { id: "van-gogh", text: "van gogh film", done: true, category: "movies" },
  { id: "boba", text: "bubbal thee", done: true, category: "food" },
  { id: "monster", text: "monstar energi", done: true, category: "food" },
  { id: "gent-antwerpen", text: "gent & antwerpen tour", done: true, category: "trips" },
  { id: "minecraft", text: "minecraft kopen", done: true, category: "fun" },
  { id: "strand-olijf", text: "strand feat olijfjes", done: true, category: "trips" },
  { id: "nice", text: "nice bezoekje", done: false, category: "trips" },
  { id: "museum", text: "museum naar keuze", done: true, category: "trips" },
  { id: "makeup-matjas", text: "makeup matjas", done: false, category: "fun" },
  { id: "fase-2022", text: "2022 fase herbeleving", done: false, category: "fun" },
  { id: "sloefjes", text: "sloefjes kopen", done: false, category: "cozy" },
  { id: "eva-handtekening", text: "eva handtekening maken", done: false, category: "fun" },
  { id: "my-brilliant-friend", text: "my brilliant friend", done: true, category: "movies" },
  { id: "evangelion", text: "evangelion", done: true, category: "movies" },
  { id: "wenkbrauwen-hk", text: "wenkbrauwen plukken met hello kitty", done: true, category: "cozy" },
  { id: "schreeuwen-tunnel", text: "schreeuwen in tunnel", done: false, category: "fun" },
  { id: "dekentje-matjas", text: "dekentje voor matjas", done: false, category: "cozy" },
  { id: "feety-promise", text: "feety promise", done: true, category: "cozy" },
  { id: "get-out", text: "get out", done: true, category: "movies" },
  { id: "leon", text: "leon the professional", done: true, category: "movies" },
  { id: "coraline", text: "coraline", done: true, category: "movies" },
  { id: "dancer-dark", text: "dancer in the dark", done: true, category: "movies" },
  { id: "sjokolat", text: "sjokolat delen", done: true, category: "food" },
  { id: "appletiser", text: "appletiser sippen in warm weer", done: false, category: "food" },
  { id: "cinema", text: "cinema", done: true, category: "fun" },
  { id: "piesa-hut", text: "piesa hut", done: true, category: "food" },
  { id: "ferrero-smoothie", text: "ferrero rocher + chiazaad smoothie", done: true, category: "food" },
  { id: "suprabazar", text: "suprabazar", done: true, category: "trips" },
  { id: "alcohol-tipsy", text: "alcoholisering van eva minstens tipysy", done: true, category: "fun" },
  { id: "pretpark", text: "pretpark", done: false, category: "trips" },
  { id: "aquarium", text: "aquarium", done: false, category: "trips" },
  { id: "veld-bloemen", text: "veld met bloemetjes vinden zonder mensen", done: false, category: "trips" },
  { id: "teotfw", text: "the end of the fucking world", done: true, category: "movies" },
  { id: "pen15", text: "pen15", done: false, category: "movies" },
  { id: "derry-girls", text: "derry girls", done: false, category: "movies" },
  { id: "skins", text: "skins", done: true, category: "movies" },
  { id: "minecraft-film", text: "minkreft film", done: true, category: "movies" },
  { id: "breakfast-club", text: "the breakfast club", done: true, category: "movies" },
  { id: "milksjeek", text: "milksjeek maken", done: false, category: "food" },
  { id: "sterren", text: "plek om duidelijk sterren te zien zonder artificieel licht", done: false, category: "trips" },
  { id: "dierentuin", text: "dierentuin", done: false, category: "trips" },
  { id: "brussel", text: "brussel bezoek", done: true, category: "trips" },
  { id: "zwemmen", text: "samen zwemmen", done: true, category: "fun" },
  { id: "bowlen", text: "bowlen", done: true, category: "fun" },
  { id: "kathedraal", text: "kathedraal", done: false, category: "trips" },
  { id: "escape-room", text: "escape room", done: false, category: "fun" },
  { id: "alcohol-extreme", text: "alcoholisering extreme versie", done: true, category: "fun" },
  { id: "fishing-lvl5", text: "irl fishing lvl5 worden", done: false, category: "fun" },
  { id: "chernobyl", text: "chernobul", done: true, category: "movies" },
  { id: "requiem", text: "requiem for a drem", done: true, category: "movies" },
  { id: "nightcrawler", text: "nightcrawler", done: true, category: "movies" },
  { id: "fleabag", text: "fleabag", done: true, category: "movies" },
  { id: "ww2-museum", text: "canada & poland ww2 museum?", done: false, category: "trips" },
  { id: "ergo-proxy", text: "ergo proxy", done: true, category: "movies" },
  { id: "fight-club", text: "fight club", done: false, category: "movies" },
  { id: "fallen-angels", text: "fallen angels", done: true, category: "movies" },
  { id: "jumpsky", text: "jumpsky", done: false, category: "fun" }
];

export const foodOptions: FoodOption[] = [
  {
    id: "frietjes",
    name: "frietjes",
    emoji: "🍟",
    color: "#f6be74",
    textColor: "#573611",
    subtitle: "Goudgeel, vettig, 0 spijt",
    hype: [
      "Frietjes it is! Mayo erbij en niet zagen bb.",
      "Het lot heeft gesproken: frietjes halen en lekker in de zetel kruipen.",
      "Geen discussie meer mogelijk, frietkot time."
    ]
  },
  {
    id: "piesta",
    name: "piesta",
    emoji: "🍝",
    color: "#e26482",
    textColor: "#4f1624",
    subtitle: "Comfort food deluxe",
    hype: [
      "Piesta baby! Lekker binnenspelen en saus overal.",
      "Piesta gekozen! Dikke portie voor ons twee.",
      "Piesta it is. Berg kaas erover en genieten bab."
    ]
  },
  {
    id: "pokebowl",
    name: "pokebowl",
    emoji: "🥗",
    color: "#88b28f",
    textColor: "#1d3d23",
    subtitle: "Gezond doen & lekker fris",
    hype: [
      "Pokebowl it is! Doen alsof we gezonde mensen zijn vandaag.",
      "Fresh & crunchy, pokebowl time!",
      "Lekker fris kommeke en chillen maar bab."
    ]
  }
];

export const moodPacks: Record<Mood, MoodPack> = {
  sad: {
    label: "Ik ben sad",
    comfort: [
      "Je hoeft niet eerst ok te zijn om geliefd te zijn bb.",
      "Sad zijn maakt jou niet zwak. Het maakt je mens en nog altijd mijn liefste mens.",
      "Vandaag mag ass zijn. Ik blijf evenveel voor jou voelen.",
      "Als alles zwaar voelt, mag jij even rusten in mijn liefde."
    ],
    affirmations: [
      "Ge moogt gerust een zielig klein hoopje wezen vandaag bab, ik hou toch van u.",
      "Niemand verwacht dat ge 24/7 vrolijk zijt. Sad wezen mag gewoon.",
      "Ge zijt het allermooiste aapje, zelfs met wallen en nul energie.",
      "Vandaag hoeft er niks gepresteerd te worden, rot gerust in bed als ge wilt.",
      "Mijn liefde voor u vermindert met 0% ook al voelt alles 100% kut.",
      "Ge zijt een certified cutie pie, vergeet dat niet schatje."
    ],
    reasons: [
      "Omdat jij zelfs gewone momenten zacht maakt.",
      "Omdat jij prachtig bent aapje.",
      "Omdat je lach mijn hele dag maakt.",
      "Omdat jij mij blij maakt zonder dat je daar moeite voor hoeft te doen."
    ],
    tinyJoy: [
      "Pak je deken en doe alsof het een officiele aap-cocon is.",
      "Drink drie slokjes water uit je nieuwe drinkenbus.",
      "Leg je hand op je hart en stel je voor dat ik even meeknuffel.",
      "Kijk 5 minuutjes naar wat fotos van ons bb.",
      "We gaan naar napoli.",
      "Pak mijn hoodie knuffel en lig er 5 minuutjes mee."
    ],
    steps: [
      "Zet je schouders los en ontspan je kaken.",
      "Drink een paar slokken water.",
      "Lees 1 zin opnieuw en geloof ze desnoods maar voor 8 procent."
    ]
  },
  boos: {
    label: "Ik ben angy",
    comfort: [
      "Je mag boos zijn. Ik sta nooit tegenover jou, ik sta naast jou bb.",
      "Boos voelt groot, maar jij hoeft het niet alleen te dragen.",
      "Een bui maakt jou niet minder lief of minder veilig bb.",
      "Je hoeft je gevoelens niet netjes te verpakken om liefde te verdienen."
    ],
    affirmations: [
      "Angy aapje is nog altijd een superschattig aapje (maar ik hou veilige afstand als ge wilt).",
      "Ge moogt kwaad zijn, fack iedereen die u opjaagt eerlijk gezegd.",
      "Gij hebt gelijk en de rest is dom, simpel.",
      "Laat de frustratie er maar uit bb, ge hoeft u niet beleefd in te houden.",
      "Zelfs als ge stoom uit uw oren blaast kies ik nog altijd 100% voor u.",
      "Als iemand u ambeteert kom ik erachteraan bab."
    ],
    reasons: [
      "Omdat jij 1 van de weinige dingen bent dat echt voelt, en dat bewonder ik bb.",
      "Omdat je sterk bent zonder hard te hoeven worden.",
      "Omdat jouw eerlijkheid mooier is dan doen alsof alles ok is.",
      "Omdat ik zelfs in chaos altijd jou kies."
    ],
    tinyJoy: [
      "Stamp 5 seconden met je voeten en doe 1 dramatische zucht voor de show.",
      "Schud je armen los en laat je lijf even boos zijn.",
      "Sla mijn knuffel tegen je kussen, niet te hard pls.",
      "Kijk naar buiten en laat je hoofd 10 seconden niks oplossen."
    ],
    steps: [
      "Adem eerst uit voordat je nog iets probeert uit te leggen.",
      "Ontspan je handen even bewust.",
      "Zeg zacht: ik mag voelen zonder iets kapot te maken."
    ]
  },
  druk: {
    label: "Ik ben overstimulated",
    comfort: [
      "Je hoeft niet alles tegelijk te dragen om goed bezig te zijn.",
      "Als je hoofd lawaai maakt, mag de rest even stil worden.",
      "Een cresi hoofd is geen falen, alleen een signaal dat je liefde nodig hebt."
    ],
    affirmations: [
      "Koptelefoon op, wereld uit, verstand op nul. Ge moet efkes helemaal niks bb.",
      "100 tabbladen open in uw brein? Sluit er 99 en drink iets fris.",
      "Ge zijt geen machine bab, 'fack de to-do list' is een geldig levensmotto vandaag.",
      "Uw hoofd maakt te veel lawaai, tijd om alles te muten en naar het plafond te staren.",
      "Rustig ademen bab, de wereld vergaat echt niet als ge nu gewoon stopt.",
      "In uw dekenfortress raakt niemand aan u."
    ],
    reasons: [
      "Omdat jij zoveel voelt en toch blijft proberen.",
      "Omdat jij zelfs in drukte vaak snel terug lief bent.",
      "Omdat jouw aanwezigheid voor mij al genoeg is.",
      "Omdat je niet hoeft te presteren om speciaal te zijn."
    ],
    tinyJoy: [
      "Zet je gsm 2 minuten weg en kijk naar 3 dingen in je kamer waar je trots op bent.",
      "Maak je handen warm en leg ze even op je wangen.",
      "Tel 5 groene dingen of doe alsof dat officiele therapie is.",
      "Zet wat bork op bb.",
      "Maak een mini nestje van dekentje, mijn hoodie en wat yummy drinken."
    ],
    steps: [
      "Kijk naar 1 ding tegelijk in plaats van naar alles.",
      "Zeg in je hoofd: nu even minder.",
      "Doe 1 taak of stressbrenger later. De wereld overleeft dat bb."
    ]
  }
};

export const hugMessages = [
  "Je hoeft nu echt even niks te bewijzen. Knuffelmodus is gemaakt voor daarvoor.",
  "Als ik kon, trok ik je nu direct in een verstikkende knuffel aapje.",
  "Je bent niet lastig, te veel of vermoeiend. Je bent gewoon mijn aapje en je hebt even liefde nodig.",
  "99999999999999999999999999999999999999999999999 meer knuffels."
];

export const hugActions = [
  "Pak iets zachts vast en chill maar eventjes hier bab.",
  "Lees maar 1 zin tegelijk.",
  "Laat je hood achteruit zakken en hangen, adem wat en kijk naar het plafond <3.",
  "Drink 3 slokjes water en kies daarna pas of je nog iets anders wil doen."
];

export const breathingSequence = [
  { text: "Inademen... 1 2 3 4", delay: 4000 },
  { text: "Vasthouden... 1 2 3 4", delay: 4000 },
  { text: "Uitademen... 1 2 3 4 5 6", delay: 6000 },
  { text: "Schouders los.", delay: 2500 }
] as const;

export const horseParts = {
  first: [
    "Star",
    "Moon",
    "Sun",
    "Snow",
    "Frost",
    "Storm",
    "Sky",
    "Night",
    "Dawn",
    "Silver",
    "Golden",
    "Rose",
    "Cherry",
    "Honey",
    "Velvet",
    "River",
    "Willow",
    "Meadow",
    "Dream",
    "Lucky",
    "Crystal",
    "Misty",
    "Echo",
    "Ember",
    "Sugar",
    "Nova",
    "Aurora",
    "Ocean",
    "Blossom",
    "Clover",
    "Pearl",
    "Comet",
    "Luna",
    "Stella",
    "Maple",
    "Hazel",
    "Berry",
    "Ivy",
    "Lilac",
    "Midnight",
    "Twilight",
    "Copper",
    "Jade",
    "Ruby",
    "Sapphire",
    "Opal",
    "Tiny",
    "Mega",
    "Cosmic",
    "Toffee",
    "Caramel",
    "Pumpkin",
    "Peach"
  ],
  middle: [
    "shine",
    "song",
    "heart",
    "whisper",
    "feather",
    "spark",
    "glow",
    "dancer",
    "runner",
    "seeker",
    "blossom",
    "breeze",
    "brook",
    "berry",
    "mist",
    "dust",
    "flare",
    "glitter",
    "petal",
    "leaf",
    "stone",
    "echo",
    "trail",
    "beam",
    "wish",
    "dream",
    "cloud",
    "soft",
    "bright",
    "twinkle",
    "mane",
    "hoof",
    "tail",
    "prance",
    "gallop",
    "stride",
    "kick",
    "bloom",
    "kiss",
    "smile",
    "snack",
    "zoom",
    "boop",
    "clover",
    "rose",
    "mellow",
    "shimmer",
    "fizz",
    "drift",
    "dash",
    "charm",
    "magic",
    "comet",
    "orbit",
    "daisy",
    "glimmer",
    "wonder"
  ],
  last: [
    "Dinkleberry",
    "Dingleberry",
    "Moonfield",
    "Pinewood",
    "Silverbrook",
    "Sweetwater",
    "Frostvale",
    "Sunridge",
    "Stormhoof",
    "Glittermane",
    "Rivermoor",
    "Featherglen",
    "Willowdale",
    "Rosegrove",
    "Starlake",
    "Mossfield",
    "Oakriver",
    "Skydale",
    "Brightwood",
    "Shadowbrook",
    "Cloudmere",
    "Meadowglen",
    "Goldspire",
    "Windhollow",
    "Moonridge",
    "Northvale",
    "Echowood",
    "Amberfield",
    "Snowmeadow",
    "Blossomhill",
    "Crystalpond",
    "Cloverford",
    "Hazelgrove",
    "Ivydale",
    "Sunmeadow",
    "Mistyvale",
    "Firebrook",
    "Dreamford",
    "Thunderpeak",
    "Rosefield",
    "Silverpine",
    "Skyhaven",
    "Starhaven",
    "Moonhaven",
    "Sunhaven",
    "Winterbrook",
    "Ambergrove",
    "Crystalvale",
    "Dawnfield",
    "Nightford",
    "Riverglen",
    "Whisperwood",
    "Saddleridge",
    "Manecrest",
    "Hoofhaven",
    "Tailwind",
    "Fogmeadow",
    "Pearlmeadow",
    "Rainbowford"
  ],
  title: [
    "",
    "",
    "",
    "the Brave",
    "the Swift",
    "the Bold",
    "the Shiny",
    "the Chaotic",
    "the Silly",
    "the Magical",
    "the Legendary",
    "the Romantic",
    "the Dinkel",
    "the Snack Hunter",
    "the Barn Queen",
    "the Meadow King",
    "the Stable Ghost",
    "the Hay Destroyer",
    "the Hoof Whisperer",
    "the Saddle Snatcher",
    "the Zoom Machine",
    "the Biscuit Bandit",
    "the Drama Queen",
    "the Fluffy Menace",
    "the Soft Menace",
    "the Crowned Baby",
    "the Pasture Boss",
    "the Wind Chaser",
    "the Gate Jumper",
    "the Cozy Criminal",
    "the Heart Stealer",
    "the Main Character",
    "of Golden Fields",
    "of Moon Valley",
    "of Star Ridge",
    "of Cloud Kingdom",
    "of Sweet Pastures",
    "of Hidden Stables",
    "of Dinkel Valley",
    "of Dinkelberg",
    "of Rose Garden",
    "of Rainbow Ranch",
    "of Whisper Lake",
    "of Cozy Meadows",
    "of Shiny Hooves",
    "of Midnight Trails",
    "of Velvet Skies",
    "of Snack Castle"
  ]
};
