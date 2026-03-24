(function () {
  const STORAGE_KEY = "loveHubPinnedAffirmation";
  const comfortMessageEl = document.getElementById("comfortMessage");
  const affirmationTextEl = document.getElementById("affirmationText");
  const reasonTextEl = document.getElementById("reasonText");
  const tinyJoyTextEl = document.getElementById("tinyJoyText");
  const pinnedAffirmationEl = document.getElementById("pinnedAffirmation");
  const hugPanelEl = document.getElementById("hugPanel");
  const hugMessageEl = document.getElementById("hugMessage");
  const hugActionEl = document.getElementById("hugAction");
  const miniStepsEl = document.getElementById("miniSteps");
  const breathingPromptEl = document.getElementById("breathingPrompt");
  const newAffirmationBtn = document.getElementById("newAffirmationBtn");
  const pinAffirmationBtn = document.getElementById("pinAffirmationBtn");
  const newReasonBtn = document.getElementById("newReasonBtn");
  const newTinyJoyBtn = document.getElementById("newTinyJoyBtn");
  const newHugMsgBtn = document.getElementById("newHugMsgBtn");
  const doHugResetBtn = document.getElementById("doHugResetBtn");
  const breathingBtn = document.getElementById("breathingBtn");
  const hugModeBtn = document.getElementById("hugModeBtn");
  const moodButtons = Array.from(document.querySelectorAll("[data-mood]"));

  const content = {
    sad: {
      comfort: [
        "Je hoeft niet eerst ok te zijn om geliefd te zijn bb.",
        "Sad zijn maakt jou niet zwak. Het maakt je mens en nog altijd mijn liefste mens schattig aapje.",
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
      comfort: [
        "Je mag boos zijn. Ik sta nooit tegenover jou, ik sta naast jou bb.",
        "Boos voelt groot, maar jij hoeft het niet alleen te dragen.",
        "Een bui maakt jou niet minder lief of minder veilig bb.",
        "Je hoeft je gevoelens niet netjes te verpakken om liefde te verdienen, je mag altijd dingen zeggen bb."
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
        "Stamp 5 seconden met je voeten ofzo en maak heel het huis bang (niet na 22u).",
        "Schud je armen los en doe 1 dramatische zucht voor de show.",
        "Slaag mijn knuffel tegen de muur (ni te hard pls).",
        "Kijk naar buiten en laat je hoofd 10 seconden niks oplossen."
      ],
      steps: [
        "Adem eerst uit voordat je nog iets probeert uit te leggen.",
        "Ontspan je handen even bewust."
      ]
    },
    druk: {
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
        "Ik weet dat ik soms een ratje ben bb. Sorry.",
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

  const lastIndexes = Object.create(null);
  const breathingSequence = [
    { text: "Inademen... 1 2 3 4", delay: 4000 },
    { text: "Vasthouden... 1 2 3 4", delay: 4000 },
    { text: "Uitademen... 1 2 3 4 5 6", delay: 6000 },
    { text: "Schouders los.", delay: 2500 }
  ];
  const hugMessages = [
    "Je hoeft nu echt even niks te bewijzen. Knuffelmodus is gemaakt voor daarvoor.",
    "Als ik kon, trok ik je nu direct in een verstikkende knuffel aapje.",
    "Je bent niet lastig, te veel of vermoeiend. Je bent gewoon mijn aapje en je hebt even liefde nodig.",
    "99999999999999999999999999999999999999999999999 meer knuffels."
  ];
  const hugActions = [
    "Pak iets zachts vast en sjill maar eventjes hier bab.",
    "Lees maar 1 zin tegelijk.",
    "Laat je hood achteruit zakken en hangen, adem wat en kijk naar het plafond <3.",
    "Drink 3 slokjes water en kies daarna pas of je nog iets anders wil doen."
  ];

  let currentMood = "sad";
  let breathingTimeout = null;
  let pinResetTimeout = null;

  function pickRandomItem(list, key) {
    if (!Array.isArray(list) || !list.length) {
      return "";
    }

    if (list.length === 1) {
      lastIndexes[key] = 0;
      return list[0];
    }

    let nextIndex = Math.floor(Math.random() * list.length);
    while (nextIndex === lastIndexes[key]) {
      nextIndex = Math.floor(Math.random() * list.length);
    }

    lastIndexes[key] = nextIndex;
    return list[nextIndex];
  }

  function currentPack() {
    return content[currentMood];
  }

  function renderSteps() {
    miniStepsEl.replaceChildren();

    currentPack().steps.forEach(function (step) {
      const item = document.createElement("li");
      item.textContent = step;
      miniStepsEl.appendChild(item);
    });
  }

  function renderComfort() {
    comfortMessageEl.textContent = pickRandomItem(
      currentPack().comfort,
      currentMood + ":comfort"
    );
  }

  function renderAffirmation() {
    affirmationTextEl.textContent = pickRandomItem(
      currentPack().affirmations,
      currentMood + ":affirmation"
    );
  }

  function renderReason() {
    reasonTextEl.textContent = pickRandomItem(
      currentPack().reasons,
      currentMood + ":reason"
    );
  }

  function renderTinyJoy() {
    tinyJoyTextEl.textContent = pickRandomItem(
      currentPack().tinyJoy,
      currentMood + ":tinyJoy"
    );
  }

  function renderPinnedAffirmation() {
    let pinnedText = "";

    try {
      pinnedText = window.localStorage.getItem(STORAGE_KEY) || "";
    } catch (error) {
      pinnedText = "";
    }

    pinnedAffirmationEl.textContent = pinnedText || "Nog niks gepind. Als een zin goed is kan je er hier eentje zetten bb.";
  }

  function renderHugSupport() {
    hugMessageEl.textContent = pickRandomItem(hugMessages, "hug:message");
    hugActionEl.textContent = pickRandomItem(hugActions, "hug:action");
  }

  function doHugReset() {
    document.body.classList.add("hug-mode");
    hugPanelEl.hidden = false;
    hugModeBtn.setAttribute("aria-pressed", "true");
    hugModeBtn.textContent = "Knuffelmodus aan";
    renderHugSupport();
    renderComfort();
    renderAffirmation();
    breathingPromptEl.textContent = "Ok bb. 1 keer samen: in 4, hou 4, uit 6. Meer hoeft niet.";
  }

  function setMood(nextMood) {
    currentMood = nextMood;

    moodButtons.forEach(function (button) {
      const isActive = button.dataset.mood === currentMood;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    renderComfort();
    renderAffirmation();
    renderReason();
    renderTinyJoy();
    renderSteps();
  }

  function pinCurrentAffirmation() {
    const currentAffirmation = affirmationTextEl.textContent.trim();
    if (!currentAffirmation) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, currentAffirmation);
    } catch (error) {
      return;
    }

    renderPinnedAffirmation();

    window.clearTimeout(pinResetTimeout);
    pinAffirmationBtn.textContent = "Gepind";
    pinResetTimeout = window.setTimeout(function () {
      pinAffirmationBtn.textContent = "Pin deze";
    }, 1500);
  }

  function runBreathingStep(stepIndex) {
    breathingPromptEl.textContent = breathingSequence[stepIndex].text;

    breathingTimeout = window.setTimeout(function () {
      const nextStep = stepIndex + 1;

      if (nextStep >= breathingSequence.length) {
        breathingTimeout = null;
        breathingBtn.disabled = false;
        breathingBtn.textContent = "Nog een rondje";
        return;
      }

      runBreathingStep(nextStep);
    }, breathingSequence[stepIndex].delay);
  }

  function startBreathing() {
    if (breathingTimeout !== null) {
      return;
    }

    breathingBtn.disabled = true;
    breathingBtn.textContent = "Ademen...";
    runBreathingStep(0);
  }

  function toggleHugMode() {
    document.body.classList.toggle("hug-mode");
    const isActive = document.body.classList.contains("hug-mode");
    hugPanelEl.hidden = !isActive;
    hugModeBtn.setAttribute("aria-pressed", isActive ? "true" : "false");
    hugModeBtn.textContent = isActive ? "Knuffelmodus aan" : "Knuffelmodus";

    if (isActive) {
      renderHugSupport();
      renderComfort();
      renderAffirmation();
      breathingPromptEl.textContent = "Ok bb. 1 keer samen: in 4, hou 4, uit 6. Meer hoeft nu niet.";
    }
  }

  moodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setMood(button.dataset.mood);
    });
  });

  newAffirmationBtn.addEventListener("click", renderAffirmation);
  pinAffirmationBtn.addEventListener("click", pinCurrentAffirmation);
  newReasonBtn.addEventListener("click", renderReason);
  newTinyJoyBtn.addEventListener("click", renderTinyJoy);
  newHugMsgBtn.addEventListener("click", renderHugSupport);
  doHugResetBtn.addEventListener("click", doHugReset);
  breathingBtn.addEventListener("click", startBreathing);
  hugModeBtn.addEventListener("click", toggleHugMode);

  renderPinnedAffirmation();
  setMood(currentMood);
})();
