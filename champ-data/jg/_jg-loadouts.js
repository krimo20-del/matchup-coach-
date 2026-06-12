// MatchupCoach — Jungle loadouts (items + full rune pages) for the 10 playable junglers.
// Shape matches the lane loadout "first box": start / firstBack / firstItem / secondItem /
// boots / spike / runes { primaryTree, keystone, primary[3], tree, secondary[2], shards[3] }.
// The per-matchup FIRST ITEM from JG_DB (stage 5) overrides `firstItem` at render time.
window.JG_LOADOUTS = {
  'Lee Sin': {
    start: 'Gustwalker Hatchling + Health Potion',
    firstBack: 'Long Sword + Tier-1 boots — back ~1300g, gank on the way out',
    firstItem: 'Eclipse',
    secondItem: 'Sundered Sky / Black Cleaver',
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: 'Eclipse + Tier-2 boots is your strongest window — force picks and insec plays before three items; Lee falls off, so spend the lead early.',
    runes: {
      primaryTree: 'PRECISION', keystone: 'Conqueror',
      primary: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
      tree: 'INSPIRATION', secondary: ['Magical Footwear', 'Cosmic Insight'],
      shards: ['Attack Speed', 'Adaptive Force', 'Health']
    }
  },
  'Kindred': {
    start: 'Gustwalker Hatchling + Health Potion',
    firstBack: 'Noonquiver / Recurve Bow — path toward the next mark on the back',
    firstItem: 'Kraken Slayer',
    secondItem: "Blade of the Ruined King / Runaan's Hurricane",
    boots: "Berserker's Greaves",
    spike: 'Kraken + Berserker\u2019s with 4+ marks is when duels flip permanently your way — every mark after that compounds the win.',
    runes: {
      primaryTree: 'PRECISION', keystone: 'Press the Attack',
      primary: ['Triumph', 'Legend: Alacrity', 'Coup de Grace'],
      tree: 'DOMINATION', secondary: ['Sudden Impact', 'Treasure Hunter'],
      shards: ['Attack Speed', 'Adaptive Force', 'Health']
    }
  },
  "Kha'Zix": {
    start: 'Scorchclaw Pup + Health Potion',
    firstBack: 'Serrated Dirk + Refillable Potion — isolation duels come online',
    firstItem: 'Eclipse',
    secondItem: 'Edge of Night / Hubris',
    boots: 'Ionian Boots of Lucidity',
    spike: 'Dirk + first evolve is the assassination switch-on; Eclipse + Q-evolve deletes any isolated target — hunt loners, not teamfights.',
    runes: {
      primaryTree: 'DOMINATION', keystone: 'Dark Harvest',
      primary: ['Sudden Impact', 'Grisly Mementos', 'Ultimate Hunter'],
      tree: 'PRECISION', secondary: ['Triumph', 'Legend: Alacrity'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health']
    }
  },
  'Kayn': {
    start: 'Gustwalker Hatchling + Health Potion',
    firstBack: "Long Sword + Caulfield's Warhammer — farm orbs toward your form",
    firstItem: 'Eclipse (Rhaast) / Hubris (Shadow Assassin)',
    secondItem: 'Black Cleaver (Rhaast) / Profane Hydra (SA)',
    boots: "Plated Steelcaps (Rhaast) / Ionian Lucidity (SA)",
    spike: 'The form IS the spike — Rhaast wants extended brawls, Shadow Assassin one-shots from a wall. Until then, farm orbs and decline coin-flips.',
    runes: {
      primaryTree: 'PRECISION', keystone: 'Conqueror',
      primary: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
      tree: 'DOMINATION', secondary: ['Sudden Impact', 'Relentless Hunter'],
      shards: ['Attack Speed', 'Adaptive Force', 'Health']
    }
  },
  'Graves': {
    start: 'Mosstomper Seedling + Health Potion',
    firstBack: 'Serrated Dirk / Cloak of Agility — keep full-clearing into invades',
    firstItem: 'The Collector',
    secondItem: 'Infinity Edge',
    boots: "Plated Steelcaps / Berserker's Greaves",
    spike: 'Collector + crit cloak makes every point-blank shotgun a kill threat — your two-item window is the strongest duel spike of any jungler.',
    runes: {
      primaryTree: 'PRECISION', keystone: 'Fleet Footwork',
      primary: ['Triumph', 'Legend: Alacrity', 'Coup de Grace'],
      tree: 'DOMINATION', secondary: ['Sudden Impact', 'Treasure Hunter'],
      shards: ['Attack Speed', 'Adaptive Force', 'Health']
    }
  },
  'Evelynn': {
    start: 'Gustwalker Hatchling + Health Potion',
    firstBack: "Dark Seal + Amplifying Tome — stay invisible to lanes' mental",
    firstItem: 'Stormsurge',
    secondItem: 'Lich Bane',
    boots: "Sorcerer's Shoes",
    spike: 'Level 6 + Stormsurge is the real game start — perma-stealth picks on anyone walking alone. Pre-6 you are a farm sim; never coin-flip early.',
    runes: {
      primaryTree: 'DOMINATION', keystone: 'Electrocute',
      primary: ['Sudden Impact', 'Grisly Mementos', 'Relentless Hunter'],
      tree: 'SORCERY', secondary: ['Transcendence', 'Gathering Storm'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health']
    }
  },
  'Elise': {
    start: 'Gustwalker Hatchling + Health Potion',
    firstBack: 'Dark Seal + Amplifying Tome — level 3 gank pays for it',
    firstItem: "Liandry's Torment",
    secondItem: "Rylai's Crystal Scepter",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: 'Levels 3–6 are YOUR game — cocoon ganks before enemy junglers come online. Bank that lead into towers; you fall off hard past two items.',
    runes: {
      primaryTree: 'DOMINATION', keystone: 'Electrocute',
      primary: ['Cheap Shot', 'Grisly Mementos', 'Relentless Hunter'],
      tree: 'INSPIRATION', secondary: ['Magical Footwear', 'Cosmic Insight'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health']
    }
  },
  'Ekko': {
    start: 'Scorchclaw Pup + Health Potion',
    firstBack: 'Dark Seal + Sheen component — three-hit passive ganks open up',
    firstItem: 'Lich Bane / Hextech Rocketbelt',
    secondItem: 'Stormsurge',
    boots: "Sorcerer's Shoes",
    spike: 'Lich Bane + level 6 = full assassin mode with a built-in undo button. Snowball mid first — the map follows the mid lane.',
    runes: {
      primaryTree: 'DOMINATION', keystone: 'Dark Harvest',
      primary: ['Sudden Impact', 'Grisly Mementos', 'Ultimate Hunter'],
      tree: 'INSPIRATION', secondary: ['Magical Footwear', 'Cosmic Insight'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health']
    }
  },
  'Diana': {
    start: 'Scorchclaw Pup + Health Potion',
    firstBack: "Fated Ashes / Amplifying Tome — clear speed jumps a tier",
    firstItem: "Stormsurge / Nashor's Tooth",
    secondItem: "Zhonya's Hourglass",
    boots: "Sorcerer's Shoes",
    spike: 'Level 6 + first item: a two-man Moonfall is already worth R. Force fights at objectives where they clump — your AoE wins clumps.',
    runes: {
      primaryTree: 'PRECISION', keystone: 'Conqueror',
      primary: ['Triumph', 'Legend: Alacrity', 'Coup de Grace'],
      tree: 'DOMINATION', secondary: ['Sudden Impact', 'Relentless Hunter'],
      shards: ['Attack Speed', 'Adaptive Force', 'Health']
    }
  },
  "Bel'Veth": {
    start: 'Mosstomper Seedling + Health Potion',
    firstBack: 'Recurve Bow + Dagger — E-sustain duels come online',
    firstItem: 'Kraken Slayer',
    secondItem: 'Blade of the Ruined King',
    boots: "Berserker's Greaves / Wit's End vs heavy AP",
    spike: 'Kraken + your first True Form is the takeover window — every epic monster after that makes you permanently larger. Out-farm, then out-swarm.',
    runes: {
      primaryTree: 'PRECISION', keystone: 'Conqueror',
      primary: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
      tree: 'SORCERY', secondary: ['Celerity', 'Waterwalking'],
      shards: ['Attack Speed', 'Adaptive Force', 'Health']
    }
  }
};
