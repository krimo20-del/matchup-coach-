// MatchupCoach — Iconic matchups: the free daily showcase.
//
// Each UTC day one matchup per role is free for everyone (no account needed), both
// directions. It rotates through the ten pairs below, so every lane repeats every ten
// days. These are the flagship guides: the most famous rivalries in each lane, weighted
// by how many real games are played (which tracks how often they are searched), and
// they get the deepest, most carefully verified content on the site.
//
// Kris's ruling 2026-09-13: "1 top, mid, jg, adc and supt — about the best 10 matchups
// from each on rotation". This replaced the rotating free champion per role and the
// daily sample pairing. Free accounts still pick one extra matchup of their own per day.
//
// Names are the app's display names (window.ROSTERS for lanes, JG_DB keys for jungle);
// order inside a pair is the direction shown on the home tile. Pools may grow or shrink —
// the rotation adapts to the length — but keep them in sync with the flagship content.
window.MC_ICONIC = {
  top: [
    ['Darius', 'Garen'],
    ['Aatrox', 'Darius'],
    ['Sett', 'Darius'],
    ['Riven', 'Renekton'],
    ['Fiora', 'Camille'],
    ['Jax', 'Fiora'],
    ['Irelia', 'Riven'],
    ['Garen', 'Teemo'],
    ['Malphite', 'Yasuo'],
    ['Nasus', 'Teemo']
  ],
  jungle: [
    ['Lee Sin', "Kha'Zix"],
    ["Kha'Zix", 'Rengar'],
    ['Graves', 'Kindred'],
    ['Elise', 'Lee Sin'],
    ['Master Yi', 'Rammus'],
    ['Nidalee', 'Lee Sin'],
    ['Viego', 'Lee Sin'],
    ["Bel'Veth", "Kha'Zix"],
    ['Evelynn', 'Shaco'],
    ['Jarvan IV', 'Lee Sin']
  ],
  mid: [
    ['Yasuo', 'Yone'],
    ['Ahri', 'Zed'],
    ['Zed', 'Yasuo'],
    ['Zed', 'Syndra'],
    ['Ahri', 'Yasuo'],
    ['Fizz', 'Syndra'],
    ['Sylas', 'Lux'],
    ['Katarina', 'Diana'],
    ['Talon', 'Zed'],
    ['LeBlanc', 'Syndra']
  ],
  bot: [
    ['Jinx', 'Caitlyn'],
    ['Jhin', 'Caitlyn'],
    ['Ezreal', "Kai'Sa"],
    ['Xayah', "Kai'Sa"],
    ['Vayne', 'Caitlyn'],
    ['Ashe', 'Jinx'],
    ['Ezreal', 'Jinx'],
    ['Draven', 'Lucian'],
    ['Samira', 'Draven'],
    ['Ezreal', 'Caitlyn']
  ],
  support: [
    ['Thresh', 'Blitzcrank'],
    ['Leona', 'Nautilus'],
    ['Pyke', 'Thresh'],
    ['Lulu', 'Leona'],
    ['Rakan', 'Thresh'],
    ['Braum', 'Leona'],
    ['Nautilus', 'Thresh'],
    ['Lux', 'Blitzcrank'],
    ['Nami', 'Blitzcrank'],
    ['Morgana', 'Blitzcrank']
  ]
};
