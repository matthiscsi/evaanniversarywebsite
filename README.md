# Eva Anniversary Website

A tiny soft-playful anniversary site in Dutch, now rebuilt as a React + TypeScript app with Vite.

## What this is

- A romantic/funny mini website
- A random Lou photo generator
- A Peirt name generator
- A Love hub for sad, angy, and overstimulated moments

## Tech

- React
- TypeScript
- Vite
- No backend
- Hash-based navigation for static hosting

## Local usage

Install dependencies:

```powershell
npm install
```

Run locally:

```powershell
npm run dev
```

Build:

```powershell
npm run build
```

Photos are still read from `photos/`. Add or remove image files there and Vite will include them through `import.meta.glob`.
