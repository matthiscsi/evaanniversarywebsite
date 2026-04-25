export type Page = "home" | "photos" | "horse" | "love";
export type Mood = "sad" | "boos" | "druk";

export interface MoodPack {
  label: string;
  comfort: string[];
  affirmations: string[];
  reasons: string[];
  tinyJoy: string[];
  steps: string[];
}

export const navItems: Array<{ page: Page; label: string }> = [
  { page: "home", label: "Home" },
  { page: "photos", label: "Lou generator" },
  { page: "horse", label: "Peirt generator" },
  { page: "love", label: "Love hub" }
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
      "Je bent niet te veel. Je bent iemand die liefde verdient.",
      "Ook op stille en moeilijke dagen ben jij prachtig voor mij bb.",
      "Je waarde zakt niet omdat je energie vandaag laag is.",
      "Je mag traag ademen, traag denken en traag voelen. Dat is nog steeds meer dan genoeg schatje.",
      "Ik hoef geen vrolijke versie van jou om van jou te houden."
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
      "Jouw boosheid betekent niet dat jij verkeerd bent.",
      "Je mag ruimte krijgen zonder je te verontschuldigen voor je gevoel.",
      "Onder de frustratie ben jij nog steeds mijn favoriete mens ooit bb.",
      "Ook als je angy bent, blijf jij iemand die liefde verdient schatje."
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
      "Je hoeft vandaag niet productief te zijn om waardevol te zijn bb.",
      "Rust is geen luxe voor jou, het is ook liefde.",
      "Je mag vertragen zonder achter te lopen in mijn ogen.",
      "Je bent geen machine. Pauze nemen is goed bab.",
      "Ook een vol hoofd verdient een zachte plek."
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
