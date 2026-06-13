// loadouts-by-class.js — one consistent Runes / Summoners / Build preset per
// archetype, shown identically on every matchup page (all roles). Names are
// canonical Riot/Data Dragon names so champ-art.js resolves their icons.
// Picture-forward: the app renders big icons with small labels underneath.
(function () {
  'use strict';

  // Each preset: summoners (2), keystone + primary tree (3 runes), secondary
  // tree (2 runes), 3 shards, starting items, 3 core items, boots, 2 options.
  var A = {
    juggernaut: {
      label: 'Juggernaut', summHigh: ['Flash', 'Teleport'], summLow: ['Flash', 'Ignite'],
      keystone: 'Conqueror', primaryTree: 'Precision', primary: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
      secondaryTree: 'Resolve', secondary: ['Second Wind', 'Unflinching'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
      start: ["Doran's Blade", 'Health Potion'], boots: 'Plated Steelcaps',
      core: ['Eclipse', "Sterak's Gage", 'Death’s Dance'],
      options: [{ label: 'vs Heavy AD', items: ['Thornmail', 'Randuin’s Omen'] }, { label: 'vs Heavy AP', items: ['Maw of Malmortius', 'Spirit Visage'] }]
    },
    diver: {
      label: 'Diver / Skirmisher', summHigh: ['Flash', 'Ignite'], summLow: ['Flash', 'Ignite'],
      keystone: 'Conqueror', primaryTree: 'Precision', primary: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
      secondaryTree: 'Domination', secondary: ['Sudden Impact', 'Treasure Hunter'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
      start: ["Doran's Blade", 'Health Potion'], boots: 'Plated Steelcaps',
      core: ['Eclipse', 'Profane Hydra', "Sterak's Gage"],
      options: [{ label: 'vs Squishy', items: ['Serylda’s Grudge', 'Edge of Night'] }, { label: 'vs Tanks', items: ['Black Cleaver', 'Death’s Dance'] }]
    },
    tank: {
      label: 'Tank / Vanguard', summHigh: ['Flash', 'Teleport'], summLow: ['Flash', 'Teleport'],
      keystone: 'Grasp of the Undying', primaryTree: 'Resolve', primary: ['Demolish', 'Second Wind', 'Overgrowth'],
      secondaryTree: 'Precision', secondary: ['Triumph', 'Legend: Alacrity'],
      shards: ['Adaptive Force', 'Health', 'Health'],
      start: ["Doran's Shield", 'Health Potion'], boots: 'Mercury’s Treads',
      core: ['Sunfire Aegis', 'Jak’Sho, The Protean', 'Thornmail'],
      options: [{ label: 'vs AD', items: ['Frozen Heart', 'Randuin’s Omen'] }, { label: 'vs AP', items: ['Spirit Visage', 'Kaenic Rookern'] }]
    },
    mage: {
      label: 'Mage / Artillery', summHigh: ['Flash', 'Teleport'], summLow: ['Flash', 'Ignite'],
      keystone: 'Electrocute', primaryTree: 'Domination', primary: ['Cheap Shot', 'Eyeball Collection', 'Treasure Hunter'],
      secondaryTree: 'Sorcery', secondary: ['Manaflow Band', 'Scorch'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
      start: ["Doran's Ring", 'Health Potion'], boots: 'Sorcerer’s Shoes',
      core: ['Luden’s Companion', 'Shadowflame', 'Rabadon’s Deathcap'],
      options: [{ label: 'vs Dive', items: ['Zhonya’s Hourglass', 'Banshee’s Veil'] }, { label: 'vs Tanks', items: ['Liandry’s Torment', 'Void Staff'] }]
    },
    assassin: {
      label: 'Assassin', summHigh: ['Flash', 'Ignite'], summLow: ['Flash', 'Ignite'],
      keystone: 'Electrocute', primaryTree: 'Domination', primary: ['Sudden Impact', 'Eyeball Collection', 'Ultimate Hunter'],
      secondaryTree: 'Sorcery', secondary: ['Absolute Focus', 'Gathering Storm'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
      start: ["Doran's Blade", 'Health Potion'], boots: 'Ionian Boots of Lucidity',
      core: ['Hextech Rocketbelt', 'Shadowflame', 'Rabadon’s Deathcap'],
      options: [{ label: 'AD Assassin', items: ['Youmuu’s Ghostblade', 'Profane Hydra'] }, { label: 'vs Squishy', items: ['Void Staff', 'Zhonya’s Hourglass'] }]
    },
    marksman: {
      label: 'Marksman / ADC', summHigh: ['Flash', 'Heal'], summLow: ['Flash', 'Barrier'],
      keystone: 'Press the Attack', primaryTree: 'Precision', primary: ['Presence of Mind', 'Legend: Alacrity', 'Cut Down'],
      secondaryTree: 'Domination', secondary: ['Taste of Blood', 'Treasure Hunter'],
      shards: ['Adaptive Force', 'Attack Speed', 'Health'],
      start: ["Doran's Blade", 'Health Potion'], boots: 'Berserker’s Greaves',
      core: ['Kraken Slayer', 'Infinity Edge', 'Lord Dominik’s Regards'],
      options: [{ label: 'vs Tanks', items: ['Blade of the Ruined King', 'Lord Dominik’s Regards'] }, { label: 'Survivability', items: ['Bloodthirster', 'Phantom Dancer'] }]
    },
    enchanter: {
      label: 'Enchanter Support', summHigh: ['Flash', 'Ignite'], summLow: ['Flash', 'Exhaust'],
      keystone: 'Summon Aery', primaryTree: 'Sorcery', primary: ['Manaflow Band', 'Transcendence', 'Scorch'],
      secondaryTree: 'Inspiration', secondary: ['Biscuit Delivery', 'Cosmic Insight'],
      shards: ['Adaptive Force', 'Adaptive Force', 'Health'],
      start: ['World Atlas', 'Health Potion'], boots: 'Ionian Boots of Lucidity',
      core: ['Moonstone Renewer', 'Ardent Censer', 'Staff of Flowing Water'],
      options: [{ label: 'vs Poke', items: ['Mikael’s Blessing', 'Redemption'] }, { label: 'Peel', items: ['Shurelya’s Battlesong', 'Redemption'] }]
    },
    engage: {
      label: 'Engage Support', summHigh: ['Flash', 'Ignite'], summLow: ['Flash', 'Exhaust'],
      keystone: 'Aftershock', primaryTree: 'Resolve', primary: ['Font of Life', 'Bone Plating', 'Overgrowth'],
      secondaryTree: 'Inspiration', secondary: ['Biscuit Delivery', 'Cosmic Insight'],
      shards: ['Ability Haste', 'Health', 'Health'],
      start: ['World Atlas', 'Health Potion'], boots: 'Mercury’s Treads',
      core: ['Locket of the Iron Solari', 'Knight’s Vow', 'Zeke’s Convergence'],
      options: [{ label: 'vs AD', items: ['Frozen Heart', 'Randuin’s Omen'] }, { label: 'vs AP', items: ['Spirit Visage', 'Kaenic Rookern'] }]
    }
  };

  // Champion overrides where role+class isn't enough to pick the archetype.
  var MID_ASSASSINS = ['Zed', 'Talon', 'Katarina', 'Akali', 'Fizz', 'Qiyana', 'LeBlanc', 'Naafiri', 'Yone', 'Yasuo', 'Sylas', 'Ekko', 'Diana', 'Kassadin'];
  var SUP_ENGAGE = ['Leona', 'Nautilus', 'Blitzcrank', 'Thresh', 'Alistar', 'Rell', 'Rakan', 'Pyke', 'Braum', 'Taric', 'Maokai', 'Pantheon', 'Bard'];
  var JG_AD = ['Graves', 'Kha’Zix', 'Kha\'Zix', 'Lee Sin', 'Rengar', 'Kayn', 'Nidalee', 'Talon', 'Qiyana', 'Naafiri', 'Belveth', 'Bel’Veth', 'Viego', 'Briar', 'Master Yi', 'Xin Zhao', 'Vi', 'Hecarim', 'Wukong', 'Olaf'];
  var JG_AP = ['Elise', 'Evelynn', 'Ekko', 'Diana', 'Lillia', 'Karthus', 'Fiddlesticks', 'Brand', 'Morgana', 'Zyra', 'Taliyah', 'Nidalee'];
  var JG_TANK = ['Sejuani', 'Zac', 'Amumu', 'Maokai', 'Rammus', 'Sion', 'Skarner', 'Nunu & Willump', 'Jarvan IV'];

  function has(list, name) {
    var n = String(name || '').replace(/’/g, "'");
    for (var i = 0; i < list.length; i++) if (String(list[i]).replace(/’/g, "'") === n) return true;
    return false;
  }

  // role: top|jungle|mid|bot|support ; classOf: 'Juggernaut'|'Diver'|'Tank'|'Mage'|'Flex' (top only)
  window.RESOLVE_LOADOUT = function (champ, role, classOf) {
    var key;
    if (role === 'jungle') {
      key = has(JG_TANK, champ) ? 'tank' : has(JG_AP, champ) ? 'mage' : has(JG_AD, champ) ? 'diver' : 'diver';
    } else if (role === 'bot') {
      key = 'marksman';
    } else if (role === 'support') {
      key = has(SUP_ENGAGE, champ) ? 'engage' : 'enchanter';
    } else if (role === 'mid') {
      key = has(MID_ASSASSINS, champ) ? 'assassin' : 'mage';
    } else { // top
      key = classOf === 'Tank' ? 'tank' : classOf === 'Diver' ? 'diver' : classOf === 'Mage' ? 'mage' : 'juggernaut';
    }
    var base = A[key];
    var preset = JSON.parse(JSON.stringify(base));
    if (role === 'jungle') { preset.summHigh = ['Smite', 'Flash']; preset.summLow = ['Smite', 'Flash']; preset.start = ['Jungle Companion', 'Health Potion']; }
    preset.archetype = key;
    return preset;
  };
})();
