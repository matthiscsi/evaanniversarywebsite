(function () {
  const firstParts = [
    "Star",
    "Moon",
    "Sun",
    "Snow",
    "Frost",
    "Storm",
    "Sky",
    "Night",
    "Dawn",
    "Dusky",
    "Silver",
    "Golden",
    "Rose",
    "Cherry",
    "Honey",
    "Velvet",
    "River",
    "Willow",
    "Meadow",
    "Forest",
    "Thunder",
    "Shadow",
    "Dream",
    "Lucky",
    "Crystal",
    "Misty",
    "Cloud",
    "Wind",
    "Echo",
    "Fire",
    "Ember",
    "Sugar",
    "Lady",
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
    "Raven",
    "Ivy",
    "Lilac",
    "Falcon",
    "Wolf",
    "Midnight",
    "Sunset",
    "Morning",
    "Twilight",
    "Ice",
    "Rain",
    "Thunder",
    "Lightning",
    "Copper",
    "Jade",
    "Ruby",
    "Sapphire",
    "Opal",
    "Ash",
    "Birch",
    "Cedar",
    "Fox",
    "Wild",
    "Spirit",
    "Ghost",
    "Royal",
    "Prince",
    "Princess",
    "Captain",
    "Major",
    "Tiny",
    "Mega",
    "Cosmic",
    "Galaxy",
    "Nebula",
    "Novaheart",
    "Butter",
    "Toffee",
    "Caramel",
    "Pumpkin",
    "Apple",
    "Peach"
  ];

  const middleParts = [
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
    "river",
    "berry",
    "mist",
    "dust",
    "flare",
    "flame",
    "glitter",
    "petal",
    "leaf",
    "stone",
    "echo",
    "trail",
    "sprint",
    "beam",
    "wish",
    "dream",
    "cloud",
    "snow",
    "storm",
    "wild",
    "soft",
    "bright",
    "twinkle",
    "star",
    "moon",
    "sun",
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
    "thorn",
    "mellow",
    "shimmer",
    "fizz",
    "drift",
    "drizzle",
    "dash",
    "flash",
    "charm",
    "spirit",
    "ray",
    "drop",
    "lily",
    "honey",
    "velvet",
    "magic",
    "mystic",
    "rider",
    "saddle",
    "stable",
    "comet",
    "orbit",
    "daisy",
    "rainbow",
    "glimmer",
    "wonder"
  ];

  const lastParts = [
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
    "Ravenhill",
    "Brightwood",
    "Shadowbrook",
    "Cloudmere",
    "Meadowglen",
    "Goldspire",
    "Windhollow",
    "Moonridge",
    "Northvale",
    "Southgrove",
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
    "Wolfgrove",
    "Falconridge",
    "Skyhaven",
    "Starhaven",
    "Moonhaven",
    "Sunhaven",
    "Goldmeadow",
    "Winterbrook",
    "Autumnvale",
    "Springfield",
    "Summerford",
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
    "Blueriver",
    "Redwillow",
    "Greenhollow",
    "Stonefield",
    "Fogmeadow",
    "Oakhaven",
    "Birchgrove",
    "Cedardale",
    "Ivorypond",
    "Pearlmeadow",
    "Rubyford",
    "Jadebrook",
    "Sapphirehill",
    "Opalridge",
    "Rainbowford"
  ];

  const titleParts = [
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
    "the Barn Prince",
    "the Stable Ghost",
    "the Hay Destroyer",
    "the Hoof Whisperer",
    "the Saddle Snatcher",
    "the Zoom Machine",
    "the Biscuit Bandit",
    "the Drama Queen",
    "the Fluffy Menace",
    "the Chaos Potato",
    "the Glitter Goblin",
    "the Soft Menace",
    "the Crowned Baby",
    "the Pasture Boss",
    "the Wind Chaser",
    "the Gate Jumper",
    "the Cozy Criminal",
    "the Heart Stealer",
    "the Main Character",
    "of Hollow Woods",
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
  ];

  const nameEl = document.getElementById("horseName");
  const statusEl = document.getElementById("copyStatus");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const partFirstEl = document.getElementById("partFirst");
  const partMiddleEl = document.getElementById("partMiddle");
  const partLastEl = document.getElementById("partLast");
  const partTitleEl = document.getElementById("partTitle");
  let lastName = "";

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function generateHorse() {
    let name = "";
    let attempts = 0;

    do {
      attempts += 1;
      const baseParts = [];

      if (partFirstEl.checked) {
        baseParts.push(pick(firstParts));
      }

      if (partMiddleEl.checked) {
        if (baseParts.length) {
          baseParts[baseParts.length - 1] += pick(middleParts);
        } else {
          baseParts.push(pick(middleParts));
        }
      }

      if (partLastEl.checked) {
        baseParts.push(pick(lastParts));
      }

      if (!baseParts.length) {
        nameEl.textContent = "Niks aangevinkt";
        statusEl.textContent = "Zet minstens 1 naamstuk aan.";
        return "";
      }

      const baseName = baseParts.join(" ");
      if (partTitleEl.checked) {
        const title = pick(titleParts);
        name = title ? baseName + " " + title : baseName;
      } else {
        name = baseName;
      }
    } while (name === lastName && attempts < 30);

    nameEl.textContent = name;
    lastName = name;
    statusEl.textContent = "";
    return name;
  }

  async function copyCurrentName() {
    const text = nameEl.textContent.trim();
    if (!text || text === "Druk op genereer") {
      statusEl.textContent = "Genereer eerst een naam.";
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Gekopieerd: " + text;
    } catch (error) {
      statusEl.textContent = "Clipboard geblokkeerd. Kopieer handmatig.";
    }
  }

  generateBtn.addEventListener("click", generateHorse);
  copyBtn.addEventListener("click", copyCurrentName);

  generateHorse();
})();
