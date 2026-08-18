export interface Upgrade {
  id: string;
  name: string;
  icon: string;
  baseCost: number;
  costMultiplier: number;
  kpsBonus: number; // kroels per second
  kptBonus: number; // kroels per tap
  description: string;
}

export const UPGRADES: Upgrade[] = [
  {
    id: "catnip",
    name: "Kattenkruid snoepje",
    icon: "🌿",
    baseCost: 15,
    costMultiplier: 1.15,
    kpsBonus: 1,
    kptBonus: 0,
    description: "Louli begint zachtjes te spinnen (+1/sec)"
  },
  {
    id: "tweezers",
    name: "Hello Kitty pincet",
    icon: "✨",
    baseCost: 50,
    costMultiplier: 1.18,
    kpsBonus: 0,
    kptBonus: 2,
    description: "Precisie-kroelen voor de wenkbrauwtjes (+2/tap)"
  },
  {
    id: "smoothie",
    name: "Chiazaad smoothie",
    icon: "🥤",
    baseCost: 150,
    costMultiplier: 1.2,
    kpsBonus: 6,
    kptBonus: 1,
    description: "Superfood energie boost (+6/sec, +1/tap)"
  },
  {
    id: "blanket",
    name: "Dekentje voor Matjas",
    icon: "🛋️",
    baseCost: 500,
    costMultiplier: 1.22,
    kpsBonus: 22,
    kptBonus: 0,
    description: "Samen ingeduffeld op de zetel (+22/sec)"
  },
  {
    id: "slippers",
    name: "Gouden sloefjes",
    icon: "🥿",
    baseCost: 1500,
    costMultiplier: 1.25,
    kpsBonus: 75,
    kptBonus: 10,
    description: "Warme voetjes = ultieme kroel power (+75/sec, +10/tap)"
  },
  {
    id: "contrex",
    name: "Contrex Overdrive",
    icon: "💧",
    baseCost: 5000,
    costMultiplier: 1.3,
    kpsBonus: 250,
    kptBonus: 50,
    description: "Maximale hydratatie turbo mode (+250/sec, +50/tap)"
  }
];

export function getUpgradeCost(upgrade: Upgrade, count: number): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, count));
}

export function calculateStats(inventory: Record<string, number>): { kps: number; kpt: number } {
  let kps = 0;
  let kpt = 1; // Base tap is 1

  for (const upgrade of UPGRADES) {
    const count = inventory[upgrade.id] || 0;
    kps += upgrade.kpsBonus * count;
    kpt += upgrade.kptBonus * count;
  }

  return { kps, kpt };
}
