// MatchupCoach.gg — Aatrox structured loadouts vs every JUGGERNAUT.
// Researched against patches 26.10–26.12 community + meta consensus (Mobalytics,
// Skill-Capped, lolalytics, metabot, r/AatroxMains). Each entry gives the four
// build stages the user cares about + the full rune page.
//   start       : opening item
//   firstBack   : the goal item/component you want completed on your FIRST recall
//   firstItem   : first full (legendary) item
//   secondItem  : second full item
//   boots       : boots choice for this lane
//   spike        : optional later/defensive note
//   runes       : { keystone, primary:[3], tree, secondary:[2], shards:[3] }
//   wr          : recent-patch win-rate snapshot (Emerald+ / GM sources)
//   reddit      : recent-patch community / meta note (what to actually do)
window.AATROX_JUGG_LOADOUTS = Object.assign(window.AATROX_JUGG_LOADOUTS || {}, {
  aatrox: {
    diff: "MIRROR",
    start: "Doran's Blade + Health Potion",
    firstBack: "Caulfield's Warhammer + boots (≈1300g)",
    firstItem: "Spear of Shojin",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "Death's Dance 3rd — out-AD the mirror. Executioner's Calling is optional but tilts the long fight since you both heal.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Haste", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Second Wind"],
      shards: ["Adaptive Force", "Adaptive Force", "Health Scaling"]
    },
    wr: "≈50% — pure skill mirror",
    reddit: "Mains agree it's a Q-spacing and R-timing duel: land outer-edge Q, E through his Q to deny his heal, and ult SECOND. No matchup-specific tech beyond optional anti-heal."
  },

  darius: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion  (Doran's Shield if his bleed-poke is rough)",
    firstBack: "Executioner's Calling (≈800g) — cuts his Q/Conqueror heal",
    firstItem: "Profane Hydra  (Spear of Shojin for the safer sustain line)",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "Upgrade Executioner's → Mortal Reminder; Death's Dance vs his AD. You lose 1–5, win the long fight once anti-heal is online.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "≈50.7% (lolalytics) — Darius edges the first 15 min, Aatrox scales",
    reddit: "Recurring subreddit advice: respect levels 1–5, never trade into his Q sweet-spot, and the swing item is early Grievous Wounds — anti-heal is what flips his execute fight."
  },

  drmundo: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion  (Doran's Shield vs his cleaver poke)",
    firstBack: "Executioner's Calling (≈800g) — mandatory, Mundo is a heal machine",
    firstItem: "Spear of Shojin",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "You out-DPS him ONLY with Grievous up. Add %max-HP / armor-pen later (Serylda's Grudge) since he stacks pure HP.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Haste", "Last Stand"],
      tree: "Resolve",
      secondary: ["Second Wind", "Overgrowth"],
      shards: ["Adaptive Force", "Adaptive Force", "Health Scaling"]
    },
    wr: "Aatrox-favoured late (metasrc lists Mundo as an Aatrox counter pre-anti-heal)",
    reddit: "Consensus: rush anti-heal, dodge cleavers (his only HP cost), and fight only while his Heart Zapper W is down — without Grievous he simply out-sustains every trade."
  },

  garen: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion  (Doran's Shield vs his Q+E poke)",
    firstBack: "Executioner's Calling (≈800g) — denies his passive regen reset",
    firstItem: "Profane Hydra  (waveclear vs his shove; Spear of Shojin alt)",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "Garen is a listed Aatrox counter — bait his W (damage-reduction) before you commit, and anti-heal so his passive can't reset the trade.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Overgrowth"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Garen-favoured short trades; Aatrox wins extended fights with anti-heal",
    reddit: "Top-lane threads stress: never all-in into an active W, and Grievous Wounds + Conqueror beats his out-of-combat regen once you force long fights."
  },

  illaoi: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion",
    firstBack: "Executioner's Calling (≈800g) — her tentacle/vessel heal is enormous",
    firstItem: "Spear of Shojin",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps  (Mercury's Treads if her slow/E is the problem)",
    spike: "Anti-heal turns the only fight she wants — the long one — in your favour. Never stand in her tentacle field.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Haste", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Illaoi-favoured if you fight in tentacles; even after anti-heal",
    reddit: "Mains repeat one rule every patch: dodge Test of Spirit (E) and fight in open ground — plus Grievous early, because her tentacle healing is what makes her unkillable."
  },

  mordekaiser: {
    diff: "TRICKY",
    start: "Doran's Blade + Health Potion  (Doran's Shield + Second Wind vs his Q poke)",
    firstBack: "Hexdrinker (Long Sword + Null-Magic Mantle) — early magic shield",
    firstItem: "Maw of Malmortius  (his damage is magic; build it 1st or finish Shojin → Maw 2nd)",
    secondItem: "Sundered Sky  (Spirit Visage also strong for self-heal amp + MR)",
    boots: "Mercury's Treads",
    spike: "The one juggernaut where you go MR early. Fight grouped — never get isolated with his R (Realm of Death) up.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Haste", "Last Stand"],
      tree: "Resolve",
      secondary: ["Second Wind", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Magic Resist"]
    },
    wr: "Skill/scaling matchup — Aatrox slightly ahead with MR tech",
    reddit: "Subreddit threads: Maw + Mercs + the MR shard, dodge his Q, and avoid solo side-lane fights while his ult is up — that's the whole game."
  },

  nasus: {
    diff: "FAVOURED",
    start: "Doran's Blade + Health Potion  (Doran's Shield + Second Wind if he Q-pokes you)",
    firstBack: "Serrated Dirk / Caulfield's Warhammer — snowball, end early",
    firstItem: "Profane Hydra  (or Hubris if you got a lead)",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "You're favoured — buy aggressive and end before he scales. Executioner's Calling only if the game drags past his Sheen/2-item spike.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Second Wind", "Overgrowth"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Aatrox-favoured — one of his best juggernaut lanes",
    reddit: "Standard line: deny Q stacks, all-in repeatedly 2–6, and close the game out — anti-heal is a LATE concern, not a first-back one."
  },

  sett: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion",
    firstBack: "Caulfield's Warhammer + boots (≈1300g) — no anti-heal needed, Sett shields not heals",
    firstItem: "Spear of Shojin",
    secondItem: "Sundered Sky",
    boots: "Mercury's Treads",
    spike: "Tenacity (Legend + Unflinching) cuts his E stun so your combo isn't wasted. Don't dump damage into his W grit bar.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Tenacity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Tenacity & Slow Resist"]
    },
    wr: "Sett-favoured into his W window; even on his cooldown",
    reddit: "Every Sett thread: fight when Haymaker (W) is down and feed it as little damage as possible — Mercs + tenacity stack so his E pull-stun can't lock your full rotation."
  },

  trundle: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion  (Doran's Shield vs his early bite trades)",
    firstBack: "Executioner's Calling (≈800g) — he sustains hard through trades",
    firstItem: "Spear of Shojin",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "Anti-heal early; NEVER extended-fight with his R (Subjugate) up — it steals your AD + HP. Bait it, then trade.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Overgrowth"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Trundle-favoured drain duel; anti-heal + R-baiting evens it",
    reddit: "Listed among Aatrox's worst lanes (mobafire counter list). Advice is consistent: Grievous Wounds, dodge his pillar, and fight only when Subjugate is on cooldown."
  },

  urgot: {
    diff: "EVEN",
    start: "Doran's Blade + Health Potion  (Doran's Shield + Second Wind vs his W poke)",
    firstBack: "Caulfield's Warhammer / Serrated Dirk + boots",
    firstItem: "Spear of Shojin  (Profane Hydra to match his waveclear)",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "No anti-heal needed. Second Wind eats his Purge (W) poke; dodge his E flip and trade only when W is down.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Haste", "Last Stand"],
      tree: "Resolve",
      secondary: ["Second Wind", "Bone Plating"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Roughly even — decided by who respects the other's trade pattern",
    reddit: "Community take: it's a respect lane — Second Wind for his early poke, dodge Disdain (E), and your scaling beats his once you have Shojin + Sundered Sky."
  },

  volibear: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion",
    firstBack: "Executioner's Calling (≈800g) — his W heal fuels the all-in",
    firstItem: "Spear of Shojin",
    secondItem: "Sundered Sky",
    boots: "Mercury's Treads",
    spike: "Survive his lvl 3–6 power, anti-heal his W, and outscale. Mercs + Unflinching blunt his Q stun engage.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Bone Plating", "Unflinching"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Voli-favoured early; Aatrox-favoured 2+ items with anti-heal",
    reddit: "Threads agree his early all-in beats yours — don't fight the lvl 3 spike, take Grievous + Mercs, and the lane flips once you out-item him."
  },

  yorick: {
    diff: "HARD",
    start: "Doran's Blade + Health Potion  (Doran's Shield + Second Wind vs ghoul poke)",
    firstBack: "Serrated Dirk (→ Profane Hydra) + boots — clearing tools over anti-heal",
    firstItem: "Profane Hydra  (clears ghouls + Maiden and pushes the wave)",
    secondItem: "Sundered Sky",
    boots: "Plated Steelcaps",
    spike: "Profane Hydra is the key buy — the ghoul swarm wins the long fight, so AoE clears it. Dodge the W cage; fight when Maiden is dead.",
    runes: {
      keystone: "Conqueror",
      primary: ["Triumph", "Legend: Alacrity", "Last Stand"],
      tree: "Resolve",
      secondary: ["Second Wind", "Overgrowth"],
      shards: ["Adaptive Force", "Adaptive Force", "Health"]
    },
    wr: "Yorick-favoured (metasrc lists him as a top Aatrox counter)",
    reddit: "One of the most-complained-about Aatrox lanes every patch: you can't out-trade ghouls + Maiden, so clear ghouls with Hydra/Q, dodge Dark Procession (W), and never fight inside the cage."
  }
});
