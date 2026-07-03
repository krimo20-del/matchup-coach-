// MatchupCoach — CHAMPS engine configs batch 2 for off-meta/new top picks: Locke (patch 26.13).
// Wrapped in a short retry so the merge survives regardless of helmet load order or a stale
// cached fetch of this file (the app re-runs Object.assign(CHAMPS, CHAMP_CONFIGS_EXTRA) every
// render, so re-asserting the key for a few ticks guarantees Locke's top-lane view config sticks).
(function () {
  var LOCKE_CFG = {
  Locke: {
    dataKey: 'locke', sub: 'Assassin · Execute Totem · Ashen Exorcist', label: '#b8a4d4', tint: 'rgba(155,140,255,0.5)',
    classLabel: 'Assassin', winStyle: 'Marks / Purgatory Execute', ultVerdict: 'PURGATORY',
    lateSwing: 'Late Locke is a debt collector — every sealed soul raised the floor, and the totem forecloses on anyone who fights below it.',
    spikeLine: 'Lich Bane online — every blink-consume double-dips Spellblade on marked targets.',
    spikeItem: 'Lich Bane spike — hunt marked targets below half.',
    lvl6Spike: 'Purgatory online — top lane’s long brawls now end at YOUR floor, not theirs.',
    fbVerb: 'stack the nails and cash the first blink window',
    fbAction: 'sidestep his pattern and counter-bite with marks loaded',
    fbDo: 'Bank 2-3 marks before every commit — a blink without nails is a taxi, not a kill.',
    dosTail: 'Your E resets on takedowns and your passive scales with missing health — low-HP wars are always your war; just never volunteer for one before 6.',
    buildStart: ['Doran’s Ring + 2 Health Potions', 'Sheen'],
    buildCore: ['Sorcerer’s Shoes / Mercs / Steelcaps', 'Lich Bane', 'Shadowflame / Zhonya’s'],
    skillSeq: ['Q','E','W','Q','Q','R','Q','E','Q','E','R','E','E','W','W','R','W','W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Ritual Nails', note: 'Max 1st · marks + slow' },
      { k: 'W', color: '#9b8cff', label: 'Soul Ignition', note: 'Max last · grey-health engine' },
      { k: 'E', color: '#e8b84b', label: 'Ashen Pursuit', note: 'Max 2nd · blink + reset' },
      { k: 'R', color: '#ff5d6c', label: 'Purgatory', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Nail Tax', keys: ['Q','Q','Q'], tone: '#46c6f5', tier: 'Poke', when: 'Wave contacts: thread the recasts through the gaps — three stacks is a loaded gun, not poke.' },
      { name: 'Stake Bite', keys: ['Q','E','AA'], tone: '#e8b84b', tier: 'Trade', when: 'Two marks banked: blink-auto the consume and walk — the refund pays the mana bill.' },
      { name: 'Soul All-In', keys: ['Q','W','E','AA','R'], tone: '#ff5d6c', tier: 'All-in', when: 'Kill window: nails, ignite the soul, blink the dash-through, and drop the totem on the exit path.' },
      { name: 'Grey Rewind', keys: ['W','AA','W'], tone: '#9b8cff', tier: 'Sustain', when: 'Eating a brawler’s combo: open W early, recast as their burst ends — half the trade never happened.' },
      { name: 'Chain Collection', keys: ['R','E','AA','E'], tone: '#ff5d6c', tier: 'Cleanup', when: 'Teamfight cleanup: totem first, then blink-reset through every marked kill — each seal raises the next floor.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights at the bottom of the health bars — mark the pile, drop Purgatory, and let the floor collect what the poke war started.',
    teamLookFor: [
      { label: 'Enemies below the execute floor', tone: '#ff5d6c' },
      { label: 'Marks stacked on their carry', tone: '#46c6f5' },
      { label: 'E reset available off a kill', tone: '#e8b84b' },
      { label: 'Their hard CC spent elsewhere', tone: '#9b8cff' }
    ],
    teamPositioning: [
      'Enter second — the totem referees fights, it doesn’t start them.',
      'Blink resets are the plan: kill order goes squishiest-first.'
    ],
    teamFlank: [
      'Hold the flank until their engage commits.',
      'Nail the backline contact, ignite the soul.',
      'Blink the marked carry — consume, reset, repeat.',
      'Drop Purgatory where the fight ENDS, not where it starts.'
    ]
  }
  };
  function assert() {
    window.CHAMP_CONFIGS_EXTRA = window.CHAMP_CONFIGS_EXTRA || {};
    if (!window.CHAMP_CONFIGS_EXTRA.Locke) window.CHAMP_CONFIGS_EXTRA.Locke = LOCKE_CFG.Locke;
    if (window.CHAMPS && !window.CHAMPS.Locke) window.CHAMPS.Locke = LOCKE_CFG.Locke;
  }
  assert();
  if (typeof setInterval === 'function') { var n = 0, t = setInterval(function () { assert(); if (++n >= 20) clearInterval(t); }, 250); }
})();
