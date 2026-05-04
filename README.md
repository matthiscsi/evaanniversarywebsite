# Eva Anniversary Website (Silly aap site)

Een persoonlijk, zacht, grappig en romantisch React-siteke voor Eva.

## Wat zit erin

- Lou foto generator met random, vorige/volgende en favoriet pin
- Peirt naam generator met copy en kleine history
- Love hub met mood-switching, affirmaties, pinned zinnen en ademrondje
- Hash-routing (`#/...`) zodat refresh op subpagina's blijft werken op static hosting
- Geen backend, geen tracking, geen ads

## Tech stack

- React 19 + TypeScript
- Vite
- Vitest (utility tests)

## Snel lokaal starten

```powershell
npm install
npm run dev
```

Open daarna de URL van Vite (meestal `http://localhost:5173`).

## Scripts

- `npm run dev` - lokale dev server
- `npm run typecheck` - TypeScript check
- `npm run lint` - alias naar typecheck (geen ESLint setup nu)
- `npm run test` - Vitest test run
- `npm run test:watch` - Vitest watch mode
- `npm run build` - typecheck + production build
- `npm run preview` - lokale preview van build

## Build & preview

```powershell
npm run build
npm run preview
```

## Navigatie

Deze site gebruikt hash routes:

- `#/` home
- `#/photos` Lou generator
- `#/horse` Peirt generator
- `#/love` Love hub

Onbekende hashes vallen veilig terug op `#/`.

## Foto's toevoegen/verwijderen

1. Zet foto's in de map `photos/`.
2. Ondersteunde formaten: `jpg`, `jpeg`, `png`, `webp` (ook met hoofdletters).
3. De app laadt automatisch alle foto's via `import.meta.glob`.
4. Kapotte foto's worden runtime overgeslagen met een zachte fallbackmelding.

### Privacy voor foto's

- Let op EXIF metadata (locatie/toestel info) als je publiek deployt.
- Aanbevolen: strip EXIF voor public uploads met een tool zoals ImageMagick.

Voorbeeld (optioneel, lokaal):

```powershell
magick input.jpg -strip -quality 85 output.jpg
```

## LocalStorage gebruik

Alle data blijft lokaal in de browser:

- `lou.favorite.v1`: gepinde favoriete foto-id
- `loveHub.pinned.v2`: lijst van gepinde affirmaties

Als localStorage geblokkeerd/faalt, werkt de app verder zonder crash.

## Deployment

### GitHub Pages

Werkt met hash routing zonder server rewrites.

Basis flow:

1. `npm ci`
2. `npm run build`
3. Publish de `dist/` map

### Netlify / Vercel / static hosts

- Gewoon `npm run build`
- Deploy `dist/`
- Geen backend of env vars nodig

## Mini release checklist

1. `npm install`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. Snel checken op mobiel (nav, knoppen, foto stage, Love hub)
6. Check dat er geen persoonlijke metadata in nieuwe foto's zit

## Troubleshooting

- Lege foto generator: check of `photos/` effectief afbeeldingsbestanden bevat.
- Clipboard werkt niet: browser/security blokkeert soms; handmatige copy fallback is ingebouwd.
- Pinned zinnen weg: private/incognito mode of storage-blocking kan data wissen.

## Bekende grenzen

- Geen service worker/offline cache (bewust, om stale-update issues te vermijden)
- Geen analytics (bewust)
