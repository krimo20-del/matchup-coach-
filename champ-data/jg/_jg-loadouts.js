// MatchupCoach — Jungle loadouts (items + rune pages) for all 50 junglers.
// Shape matches the lane loadout "first box": start / firstBack / firstItem / secondItem /
// boots / spike / runes { primaryTree, keystone, primary[3], tree, secondary[2], shards[3] }.
// The per-matchup FIRST ITEM from JG_DB (stage 5) overrides `firstItem` at render time.
// Entries after Bel'Veth: items from each jungler's JG_DB stage-5 label and own lane loadouts; runes from the
// champion's own lane page where it is not lane-only (Grasp + Demolish, Comet + Biscuit), otherwise from a
// same-archetype jungler above. The six engage tanks (Amumu, Maokai, Nunu & Willump, Rammus, Sejuani, Zac)
// carry a Resolve/Aftershock page of their own: each one opens a gank with hard crowd control, which is the
// keystone's trigger. Every jungler now has a runes block, so the build card never drops the row.
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
  },
  "Amumu": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Giant's Belt — start Sunfire Aegis",
    firstItem: "Sunfire Aegis / Liandry's Torment",
    secondItem: "Thornmail / Heartsteel",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sunfire Aegis or Liandry's Torment turns Despair into real camp clear, and Bandage Toss is only 3s, so you can throw it twice in one gank. Hold Curse of the Sad Mummy (150s at rank 1) for two targets, not one.",
    runes: {
      primaryTree: "RESOLVE", keystone: "Aftershock",
      primary: ["Font of Life", "Bone Plating", "Unflinching"],
      tree: "SORCERY", secondary: ["Manaflow Band", "Transcendence"],
      shards: ["Ability Haste", "Health Scaling", "Health"]
    }
  },
  "Brand": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Lost Chapter (≈1300g)",
    firstItem: "Liandry's Torment",
    secondItem: "Rylai's Crystal Scepter",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: "Liandry's Torment stacks on Blaze, so a Sear stun and one Pillar of Flame (10s at rank 1) already clear a camp. Save Pyroclasm (100s at rank 1) for fights where the bounces hit three people.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Sudden Impact", "Grisly Mementos", "Ultimate Hunter"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Briar": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Long Sword + boots",
    firstItem: "Eclipse",
    secondItem: "Sundered Sky (after Eclipse)",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Eclipse makes Blood Frenzy's heal worth the danger, and Head Rush (13s at rank 1) plus a charged Chilling Scream into a wall is your gank. Certain Death travels 12000 units, so at level 6 look for a low target anywhere on the map.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Fiddlesticks": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Amplifying Tome + boots",
    firstItem: "Liandry's Torment",
    secondItem: "Zhonya's Hourglass (after Liandry's)",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: "Liandry's Torment makes Bountiful Harvest drain a camp in one channel, and Zhonya's Hourglass is how you survive the Crowstorm landing. At 6, Crowstorm's 800-range blink from fog is worth waiting a full minute for.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Sudden Impact", "Grisly Mementos", "Ultimate Hunter"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Gragas": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Giant's Belt — start Sunfire Aegis",
    firstItem: "Sunfire Aegis",
    secondItem: "Riftmaker",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Your first tank item lets Body Slam (14s at rank 1) start fights you walk away from with Drunken Rage's damage reduction. Explosive Cask's 1000 range is a gank tool: throw it behind the laner, not at him.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Coup de Grace"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Hecarim": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Caulfield's Warhammer + boots (≈1300g)",
    firstItem: "Spear of Shojin",
    secondItem: "Black Cleaver",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Spear of Shojin lowers Rampage's already-short 4s cooldown, so your clear and your duel both speed up. Onslaught of Shadows fears on arrival; ride Devastating Charge (20s at rank 1) into the knockback after it.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "SORCERY", secondary: ["Celerity", "Waterwalking"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Ivern": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Ionian Boots of Lucidity — groves pay for the back, so buy early and keep roaming",
    firstItem: "Imperial Mandate",
    secondItem: "Echoes of Helia / Redemption",
    boots: "Ionian Boots of Lucidity",
    spike: "Imperial Mandate turns every Rootcaller (Q) into bonus damage for whoever follows up, and Triggerseed (E) marks the same target again. Your camps are free, so this item lands earlier than any real jungler's — spend the tempo on 2v2s, not on farming.",
    runes: {
      primaryTree: "SORCERY", keystone: "Summon Aery",
      primary: ["Manaflow Band", "Transcendence", "Gathering Storm"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Jarvan IV": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Long Sword + boots",
    firstItem: "Eclipse",
    secondItem: "Black Cleaver",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Eclipse makes the Demacian Standard into Dragon Strike combo (770 range) a kill on any laner at half health. Cataclysm (120s at rank 1) walls a target in; cast it after the knock-up, not before.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Jax": {
    start: "Scorchclaw Pup + Health Potion",
    firstItem: "Sundered Sky",
    secondItem: "Trinity Force",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sundered Sky plus Grandmaster-at-Arms makes you the best one-item duelist in most games, so invade openly. Counter Strike (17s at rank 1) dodges an enemy jungler's autos while you Leap Strike onto the laner.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Karthus": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Lost Chapter (≈1300g)",
    firstItem: "Liandry's Torment",
    secondItem: "Rabadon's Deathcap",
    boots: "Sorcerer's Shoes",
    spike: "Liandry's Torment on Defile's 0.5s toggle melts camps and anyone who contests them. Requiem (200s at rank 1) hits the whole map, so check every lane's health before you press it.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Cheap Shot", "Grisly Mementos", "Ultimate Hunter"],
      tree: "SORCERY", secondary: ["Manaflow Band", "Transcendence"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Lillia": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Fated Ashes (≈900g)",
    firstItem: "Liandry's Torment",
    secondItem: "Riftmaker / Rylai's Crystal Scepter",
    boots: "Boots of Swiftness / Plated Steelcaps",
    spike: "Liandry's Torment makes Blooming Blows (6s at rank 1) a full-camp clear and a kiting duel. Lilting Lullaby only sleeps champions you already hit with Dream-Laden Bough, so poke first and ult second.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Coup de Grace"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Locke": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Sheen (≈900g)",
    firstItem: "Lich Bane",
    secondItem: "Shadowflame / Zhonya's Hourglass (vs dive)",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: "Lich Bane turns every Ashen Pursuit blink into a Spellblade hit on a target marked by Ritual Nails. Throw Purgatory (120s at rank 1) at the low target after the chunk; every seal makes you stronger.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Electrocute",
      primary: ["Sudden Impact", "Sixth Sense", "Ultimate Hunter"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Revitalize"]
    }
  },
  "Maokai": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Giant's Belt — start Sunfire Aegis",
    firstItem: "Sunfire Aegis",
    secondItem: "Heartsteel / Thornmail",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sunfire Aegis burns camps while Sapling Toss (18s at rank 1) clears the small ones, and Sap Magic heals you between them. Nature's Grasp travels 3000 units, so start fights with it from behind your team.",
    runes: {
      primaryTree: "RESOLVE", keystone: "Aftershock",
      primary: ["Font of Life", "Second Wind", "Overgrowth"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Ability Haste", "Health Scaling", "Health"]
    }
  },
  "Master Yi": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Noonquiver (≈1000g)",
    firstItem: "Kraken Slayer",
    secondItem: "Blade of the Ruined King / Wit's End",
    boots: "Berserker's Greaves",
    spike: "Kraken Slayer plus Double Strike clears camps fast and wins most skirmishes after it. Alpha Strike (20s at rank 1) dodges the burst on entry, and Highlander (85s) resets on takedowns, so join fights second.",
    runes: {
      primaryTree: "PRECISION", keystone: "Lethal Tempo",
      primary: ["Triumph", "Legend: Alacrity", "Coup de Grace"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Overgrowth"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Morgana": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Amplifying Tome + boots",
    firstItem: "Liandry's Torment",
    secondItem: "Zhonya's Hourglass (after Liandry's)",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: "Liandry's Torment makes Tormented Shadow (12s at rank 1) clear camps on its own. Dark Binding reaches 1250, so gank from fog, and pair Soul Shackles with Zhonya's Hourglass when you dive in.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Sudden Impact", "Grisly Mementos", "Ultimate Hunter"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Naafiri": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Serrated Dirk (≈1100g)",
    firstItem: "Profane Hydra",
    secondItem: "Serylda's Grudge",
    boots: "Ionian Boots of Lucidity / Plated Steelcaps",
    spike: "Profane Hydra plus Darkin Daggers (900 range) chunks a laner before Eviscerate lands. Save The Call of the Pack (110s at rank 1) for the dive itself, not the chase.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Electrocute",
      primary: ["Sudden Impact", "Grisly Mementos", "Relentless Hunter"],
      tree: "PRECISION", secondary: ["Presence of Mind", "Coup de Grace"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Nidalee": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Sheen (≈900g)",
    firstItem: "Lich Bane",
    secondItem: "Shadowflame (after Lich Bane)",
    boots: "Sorcerer's Shoes",
    spike: "Lich Bane makes a landed Javelin Toss (1500 range) followed by Pounce and Swipe a kill. Aspect Of The Cougar has a 3s swap, so poke in human form, then finish in cougar.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Electrocute",
      primary: ["Sudden Impact", "Grisly Mementos", "Relentless Hunter"],
      tree: "SORCERY", secondary: ["Transcendence", "Gathering Storm"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Nocturne": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Long Sword + boots",
    firstItem: "Eclipse",
    secondItem: "Hexplate (after Eclipse)",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Eclipse makes Umbra Blades plus Duskbringer (8s) a real duel. Paranoia (140s at rank 1) has 2500 range at rank 1, so pick the lane where Unspeakable Horror's fear will land before they flash.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Nunu & Willump": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Amplifying Tome + boots",
    firstItem: "Liandry's Torment",
    secondItem: "Sunfire Aegis / Thornmail",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Liandry's Torment puts a burn on every Consume, and Consume (13s at rank 1) takes camps and scuttle faster than any contester. Biggest Snowball Ever! rolls 7500 units, so gank from far away.",
    runes: {
      primaryTree: "RESOLVE", keystone: "Aftershock",
      primary: ["Font of Life", "Bone Plating", "Unflinching"],
      tree: "SORCERY", secondary: ["Nimbus Cloak", "Celerity"],
      shards: ["Ability Haste", "Health Scaling", "Health"]
    }
  },
  "Olaf": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Tiamat",
    firstItem: "Ravenous Hydra",
    secondItem: "Sundered Sky / Sterak's Gage",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Ravenous Hydra and Reckless Swing's true damage win camp fights at full speed. Throw Undertow (9s) to slow and pick it back up, and cast Ragnarok (100s at rank 1) before the enemy's crowd control.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Qiyana": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Serrated Dirk (≈1100g)",
    firstItem: "Profane Hydra",
    secondItem: "Serylda's Grudge",
    boots: "Ionian Boots of Lucidity / Plated Steelcaps",
    spike: "Profane Hydra plus a Terrashape element (7s) chunks a laner before Audacity even lands. Supreme Display of Talent (120s) stuns off walls and river, so gank lanes that have terrain behind the target.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Electrocute",
      primary: ["Sudden Impact", "Grisly Mementos", "Relentless Hunter"],
      tree: "PRECISION", secondary: ["Presence of Mind", "Coup de Grace"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Rammus": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Bramble Vest (≈800g)",
    firstItem: "Thornmail / Sunfire Aegis",
    secondItem: "The other of Thornmail and Sunfire Aegis",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Thornmail or Sunfire Aegis stacks on Defensive Ball Curl, so auto-attackers hurt themselves. Powerball (12s at rank 1) into Frenzying Taunt is your whole gank; approach from the side the laner cannot walk away from.",
    runes: {
      primaryTree: "RESOLVE", keystone: "Aftershock",
      primary: ["Font of Life", "Bone Plating", "Unflinching"],
      tree: "PRECISION", secondary: ["Triumph", "Legend: Haste"],
      shards: ["Ability Haste", "Health Scaling", "Health"]
    }
  },
  "Rek'Sai": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Tiamat / Phage + boots (≈1300g)",
    firstItem: "Stridebreaker",
    secondItem: "Black Cleaver",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Stridebreaker's slow keeps the target in range after Un-burrow knocks it up. Void Rush (120s at rank 1) has 1500 range, so finish a fleeing laner with it rather than chasing.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Rengar": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Serrated Dirk (≈1100g)",
    firstItem: "Profane Hydra",
    secondItem: "Edge of Night / Hubris",
    boots: "Ionian Boots of Lucidity",
    spike: "Profane Hydra makes a stealthed leap plus Savagery a one-shot on squishy laners. Thrill of the Hunt (100s at rank 1) gives you 2500-range stealth, and Bola Strike's 1000 range stops the escape.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Sudden Impact", "Grisly Mementos", "Ultimate Hunter"],
      tree: "PRECISION", secondary: ["Triumph", "Legend: Alacrity"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Sejuani": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Giant's Belt (≈900g) — start Sunfire Aegis",
    firstItem: "Sunfire Aegis",
    secondItem: "Thornmail / Kaenic Rookern (by damage type)",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sunfire Aegis plus Winter's Wrath (9s at rank 1) melts camps and gives every gank a Permafrost stun. Glacial Prison reaches 1300, so open fights from outside their range.",
    runes: {
      primaryTree: "RESOLVE", keystone: "Aftershock",
      primary: ["Font of Life", "Second Wind", "Unflinching"],
      tree: "PRECISION", secondary: ["Triumph", "Legend: Haste"],
      shards: ["Ability Haste", "Health Scaling", "Health"]
    }
  },
  "Shaco": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Serrated Dirk (≈1100g)",
    firstItem: "Profane Hydra",
    secondItem: "Edge of Night / Hubris",
    boots: "Ionian Boots of Lucidity",
    spike: "Profane Hydra plus Backstab makes Deceive (13s at rank 1) into Two-Shiv Poison a kill on a squishy laner. Plant Jack In The Box on the escape path before you blink in.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Sudden Impact", "Grisly Mementos", "Ultimate Hunter"],
      tree: "PRECISION", secondary: ["Triumph", "Legend: Alacrity"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Shyvana": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Caulfield's Warhammer + boots (≈1300g)",
    firstItem: "Spear of Shojin",
    secondItem: "Titanic Hydra (after Spear of Shojin)",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Spear of Shojin shortens Emberstrike (10s at rank 1), so your clear and trades both speed up. Dragon's Descent flies 1050 into the fight, so dive over the laner to knock them back toward your team.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Skarner": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Giant's Belt",
    firstItem: "Heartsteel",
    secondItem: "Sunfire Aegis (after Heartsteel)",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Heartsteel or Sunfire Aegis turns Shattered Earth's boulders into a fast clear. Ixtal's Impact (22s at rank 1) runs 1700 units into a wall stun, and Impale drags the target back to your team.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Taliyah": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Lost Chapter (≈1300g)",
    firstItem: "Luden's Companion",
    secondItem: "Shadowflame",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: "Luden's Companion makes Threaded Volley (7s at rank 1) clear a camp in one cast and chunk a laner in one gank. Weaver's Wall runs 2500 units at rank 1, so gank from across the map.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Electrocute",
      primary: ["Cheap Shot", "Grisly Mementos", "Ultimate Hunter"],
      tree: "SORCERY", secondary: ["Manaflow Band", "Transcendence"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Talon": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Serrated Dirk (≈1100g)",
    firstItem: "Profane Hydra",
    secondItem: "Serylda's Grudge",
    boots: "Ionian Boots of Lucidity / Plated Steelcaps",
    spike: "Profane Hydra plus Rake (9s at rank 1) clears camps and one-rotates squishy laners. Assassin's Path lets you vault walls, so gank from angles nobody wards.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Electrocute",
      primary: ["Sudden Impact", "Grisly Mementos", "Relentless Hunter"],
      tree: "PRECISION", secondary: ["Presence of Mind", "Coup de Grace"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Trundle": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Tiamat",
    firstItem: "Ravenous Hydra",
    secondItem: "Trinity Force / Sterak's Gage",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Ravenous Hydra and Chomp (3.5s) steal AD from anyone who contests a camp. Subjugate (120s at rank 1) takes a tank's resists, so use it on the frontline, not the squishy.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Udyr": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Sheen (Trinity Force) or Amplifying Tome (Liandry’s)",
    firstItem: "Trinity Force / Liandry's Torment",
    secondItem: "Black Cleaver (Trinity path) / Sunfire Aegis (Liandry's path)",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Trinity Force or Liandry's Torment turns stance swaps (6s) into your whole clear. Blazing Stampede stuns on the next hit, so run in with it, then switch to Wilding Claw or Wingborne Storm.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Vi": {
    start: "Gustwalker Hatchling + Health Potion",
    firstItem: "Sundered Sky",
    secondItem: "Black Cleaver",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sundered Sky plus Denting Blows shreds a target's armour in three hits. Cease and Desist (140s at rank 1) cannot be stopped, so target the carry behind the frontline.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Viego": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Noonquiver (≈1000g)",
    firstItem: "Kraken Slayer",
    secondItem: "Blade of the Ruined King",
    boots: "Berserker's Greaves / Plated Steelcaps",
    spike: "Kraken Slayer makes your Blade of the Ruined King (5s at rank 1) stabs win duels. Heartbreaker (120s at rank 1) blinks you onto a low target, and Sovereign's Domination lets you possess the kill and keep fighting.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Volibear": {
    start: "Mosstomper Seedling + Health Potion",
    firstItem: "Sundered Sky",
    secondItem: "Spirit Visage",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sundered Sky plus Frenzied Maul (5s) heals you through camps and duels. Stormbringer (160s at rank 1) disables towers, so it is your tower-dive ult.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "SORCERY", secondary: ["Celerity", "Waterwalking"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Warwick": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Recurve Bow + boots",
    firstItem: "Blade of the Ruined King / Stridebreaker",
    secondItem: "Sterak's Gage",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Blade of the Ruined King or Stridebreaker makes Jaws of the Beast (8s at rank 1) healing win every duel. Blood Hunt's 4000-range scent finds low targets, so gank the lane that just traded.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Wukong": {
    start: "Scorchclaw Pup + Health Potion",
    firstItem: "Sundered Sky",
    secondItem: "Black Cleaver / Sterak's Gage",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Sundered Sky plus Crushing Blow (8s at rank 1) wins camps and short fights. Cyclone (130s at rank 1) knocks everyone up twice, so fly in with Nimbus Strike first.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "RESOLVE", secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  },
  "Xin Zhao": {
    start: "Gustwalker Hatchling + Health Potion",
    firstBack: "Long Sword + boots",
    firstItem: "Eclipse / Sundered Sky",
    secondItem: "Black Cleaver",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Eclipse or Sundered Sky makes Three Talon Strike's knock-up a kill threat at level 3. Audacious Charge (650 range) closes the gap, and Crescent Guard (120s at rank 1) blocks damage from anyone outside the circle.",
    runes: {
      primaryTree: "PRECISION", keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "DOMINATION", secondary: ["Sudden Impact", "Relentless Hunter"],
      shards: ["Attack Speed", "Adaptive Force", "Health"]
    }
  },
  "Zac": {
    start: "Mosstomper Seedling + Health Potion",
    firstBack: "Giant's Belt (≈900g) — start the HP stack",
    firstItem: "Heartsteel",
    secondItem: "Spirit Visage / Thornmail",
    boots: "Plated Steelcaps / Mercury's Treads",
    spike: "Heartsteel makes Unstable Matter (5s) clear camps while bloblets heal you. Elastic Slingshot (21s at rank 1) reaches farther with every rank, so gank from fog beyond the laner's wards.",
    runes: {
      primaryTree: "RESOLVE", keystone: "Aftershock",
      primary: ["Font of Life", "Bone Plating", "Overgrowth"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Ability Haste", "Health Scaling", "Health"]
    }
  },
  "Zyra": {
    start: "Scorchclaw Pup + Health Potion",
    firstBack: "Amplifying Tome + boots",
    firstItem: "Liandry's Torment",
    secondItem: "Rylai's Crystal Scepter",
    boots: "Sorcerer's Shoes / Mercury's Treads",
    spike: "Liandry's Torment makes Garden of Thorns plants melt camps. Grasping Roots (1100 range) roots from far away, and Stranglethorns (110s at rank 1) knocks up everyone in your garden.",
    runes: {
      primaryTree: "DOMINATION", keystone: "Dark Harvest",
      primary: ["Sudden Impact", "Grisly Mementos", "Ultimate Hunter"],
      tree: "INSPIRATION", secondary: ["Magical Footwear", "Cosmic Insight"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    }
  }
};
