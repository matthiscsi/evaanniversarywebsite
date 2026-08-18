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
    id: "smoothie",
    name: "Chiazaad smoothie",
    icon: "🥤",
    baseCost: 60,
    costMultiplier: 1.18,
    kpsBonus: 0,
    kptBonus: 2,
    description: "Energie boost voor extra kroelkracht (+2/tap)"
  },
  {
    id: "feather",
    name: "Speelgoed veertje",
    icon: "🪶",
    baseCost: 180,
    costMultiplier: 1.2,
    kpsBonus: 6,
    kptBonus: 1,
    description: "Louli springt vrolijk rond (+6/sec, +1/tap)"
  },
  {
    id: "scratch_post",
    name: "Krabpaal",
    icon: "🪵",
    baseCost: 500,
    costMultiplier: 1.22,
    kpsBonus: 20,
    kptBonus: 0,
    description: "Scherpe nageltjes en tevreden spinnen (+20/sec)"
  },
  {
    id: "cozy_bed",
    name: "Zacht kattenmandje",
    icon: "🛏️",
    baseCost: 1400,
    costMultiplier: 1.25,
    kpsBonus: 60,
    kptBonus: 5,
    description: "Heerlijk diep dutje doen (+60/sec, +5/tap)"
  },
  {
    id: "salmon_snack",
    name: "Zalm traktatie",
    icon: "🐟",
    baseCost: 4000,
    costMultiplier: 1.28,
    kpsBonus: 160,
    kptBonus: 25,
    description: "De ultieme delicatesse voor Louli (+160/sec, +25/tap)"
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
