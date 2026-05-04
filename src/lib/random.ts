export function pickRandom<T>(items: readonly T[], previous?: T): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  if (items.length === 1) {
    return items[0];
  }

  let next = items[Math.floor(Math.random() * items.length)];
  while (next === previous) {
    next = items[Math.floor(Math.random() * items.length)];
  }

  return next;
}
