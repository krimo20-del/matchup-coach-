// MatchupCoach — jungle window-label clarity pass. Loaded LAST (after _jg-headsup-fixes.js).
// The parsed PDFs gave every champ vague self-describing labels at stage 3 ("Levels 4-5":
// "Tempo Generation Focus", "Stacking Optimization", "Objective Poke") and stage 6 ("2+ Items":
// "Unstoppable Vanguard", "High-Impact Artillery Asset", "Infinite Scaling Juggernaut", ...) —
// identical for all 49 enemies of a champ and meaningless as matchup advice.
// This rewrites BOTH stages of EVERY JG_DB report with clear who-wins labels + whys:
//   stage 3 (Levels 4-5): verdict = midpoint of the report's own (already-fixed, mirror-
//     consistent) Level-3 and Level-6 verdicts -> mirror-consistent by construction.
//   stage 6 (2+ Items):   verdict from a shared late-game 1v1 scaling table (LS, 0-10),
//     community-consensus -> A-vs-B and B-vs-A agree by construction.
// Labels are tuned to the app's advTone() regexes: green needs the OWNER's name or
// dominant/favou?red; amber must avoid all keywords; red uses respect/danger/avoid.
// Stage 5 (First Item) is untouched — the app parses the item name out of that label.
//
// DE-DUPLICATION (2026-09-08). Both rows were one fixed sentence per verdict band with the
// foe's NAME dropped in, so "Drag the game long, duel for every objective, and force 1v1s"
// shipped on 554 pages and "Every minute past 25 tilts toward" on 537. Each band now has
// three frames and every frame splices a per-champion phrase from the MID and LATE tables
// below. Verdict labels are unchanged, so the mirror construction still holds.
(function () {
  // late-game (2+ items) 1v1 scaling, 0-10 — keys must match JG_DB display names exactly
  var LS = {
    'Master Yi': 10, "Bel'Veth": 10, 'Jax': 9.5, 'Kindred': 9.5, 'Viego': 9,
    'Kayn': 9, 'Shyvana': 9, 'Karthus': 9, 'Ekko': 8.5, 'Evelynn': 8.5,
    'Diana': 8.5, 'Fiddlesticks': 8.5, 'Lillia': 8.5, "Kha'Zix": 8, 'Graves': 8,
    'Brand': 8, 'Zac': 8, 'Nocturne': 7.5, 'Udyr': 7.5, 'Qiyana': 7.5,
    'Rengar': 7.5, 'Briar': 7.5, 'Hecarim': 7.5, 'Amumu': 7.5, 'Skarner': 7.5,
    'Zyra': 7.5, 'Volibear': 7, 'Trundle': 7, 'Wukong': 7, 'Sejuani': 7,
    'Maokai': 7, 'Rammus': 7, 'Taliyah': 7, 'Gragas': 7, 'Olaf': 6.5,
    'Talon': 6.5, 'Naafiri': 6.5, 'Shaco': 6.5, 'Vi': 6.5, 'Jarvan IV': 6.5,
    'Warwick': 6.5, 'Ivern': 6.5, 'Morgana': 6.5, 'Xin Zhao': 6, 'Nidalee': 6,
    "Rek'Sai": 6, 'Nunu & Willump': 6, 'Lee Sin': 5.5, 'Elise': 5,
    'Locke': 6.5
  };

  // verdict score from an already-fixed stage label (stages 0-2 & 4 formats)
  function vOf(adv) {
    var a = (adv || '').toLowerCase();
    if (/dominant|domination/.test(a)) return 2;
    if (/favored|favoured/.test(a)) return 1;
    if (/danger/.test(a)) return -2;
    if (/respect/.test(a)) return -1;
    return 0; // Even Skirmish / Even Ult Window / mirrors
  }

  // ---- per-champion levels 4-5 and 2+ items phrase tables ------------------------
  // Without these the two rows were the foe's NAME dropped into one fixed sentence, which
  // is why "Drag the game long, duel for every objective" shipped on 554 pages and "Every
  // minute past 25 tilts toward" on 537. mid: how that champion actually spends levels 4-5.
  // late: what they are at two items. Both are written from the reader's side of the river
  // and every ability named is checked against champ-data/_kits (Data Dragon 16.15.1).
  var MID = {
    'Amumu': 'levels 4-5 are pure gank-hunting for him — a Bandage Toss into any lane with follow-up beats a full clear',
    "Bel'Veth": 'Void Surge lets her cross the map between camps, so 4-5 is spent stacking Death in Lavender off both jungles',
    'Brand': 'he converts 4-5 into cross-map 2v2s where a Conflagration bounce off a laner does most of the damage',
    'Briar': 'she spends 4-5 looking for a lane with CC, because the Blood Frenzy dive only fails when nobody follows it',
    'Diana': 'she is farming toward six through 4-5 — Pale Cascade keeps the clear safe and the kill threat is not real yet',
    'Ekko': 'he uses 4-5 to plant Parallel Convergence in a lane bush; the stun is the gank and the clear is filler',
    'Elise': 'this is her strongest stretch — 4-5 is a Cocoon-hunting window and every gank is worth more than a camp',
    'Evelynn': 'she is still farming for six and cannot contest anything she does not out-number',
    'Fiddlesticks': 'he farms 4-5 for Crowstorm, and the effigy is worth more as fake vision than as a fight',
    'Gragas': 'he plays 4-5 around Body Slam angles into lanes, softening with Barrel Roll before the engage',
    'Graves': 'he uses 4-5 to take your camps, because True Grit stacking makes him the better invader',
    'Hecarim': 'his 4-5 is a Devastating Charge pattern — long runways into side lanes, not river brawls',
    'Ivern': 'he spends 4-5 marking camps for a laner and setting Brushmaker vision rather than fighting',
    'Jarvan IV': 'he plays 4-5 for the flag-drag gank, which converts almost any lane holding a slow into a kill',
    'Jax': 'he farms 4-5 and takes short duels only where Counter Strike can eat a camp’s autos as well as yours',
    'Karthus': 'he out-farms the map through 4-5 — Defile clears at a rate nobody matches and Requiem is coming',
    'Kayn': 'the whole of 4-5 is a form race, so he takes whichever camps or champions push his orb count',
    "Kha'Zix": 'he hunts the isolated side of the map at 4-5, where the Q bonus turns a trade into a kill',
    'Kindred': 'they spend 4-5 chasing marks, so the side of the map with a live mark is where they will be',
    'Lee Sin': 'he plays 4-5 as an invade window — Sonic Wave vision plus the ward-hop reaches camps he should not',
    'Lillia': 'she farms 4-5 at speed, kiting with Blooming Blows, and commits only where Swirlseed lands first',
    'Locke': 'he uses 4-5 to bank marks at range, then blinks in the moment the nail count says the kill is there',
    'Maokai': 'he plays 4-5 through sapling vision and root ganks into lanes that already hold the wave',
    'Master Yi': 'he is farming through 4-5 and will not contest anything until Highlander and a first item land',
    'Morgana': 'her 4-5 is a Dark Binding gank window beside her laners, with Black Shield making the counter-gank fail',
    'Naafiri': 'she roams 4-5 with the pack up, hunting lanes with a slow so the W dash cannot be walked out of',
    'Nidalee': 'she is at maximum value in 4-5 — spear from fog, hunt the mark, and leave before anyone can turn',
    'Nocturne': 'he spends 4-5 on Duskbringer trails into side lanes and takes camps in the gaps between them',
    'Nunu & Willump': 'he plays 4-5 entirely around snowball ganks and stealing camps out from under a clear',
    'Olaf': 'he spends 4-5 invading — Undertow slows and a full health bar make your jungle his second one',
    'Qiyana': 'she plays 4-5 around whichever element is nearest, and the brush-stealth Q makes lane ganks free',
    'Rammus': 'he rolls 4-5 into lanes on Powerball and takes the taunt fight anywhere a laner can follow up',
    "Rek'Sai": 'he builds a tunnel network through 4-5 that lets him arrive in a lane from an unwarded direction',
    'Rengar': 'he hunts brushes through 4-5, and any lane with an unswept bush is a full-ferocity kill',
    'Sejuani': 'she uses 4-5 to set up Permafrost ganks with a laner, since her own damage is not the threat',
    'Shaco': 'he spends 4-5 boxing his own entrances and invading with Deceive the moment you commit to a camp',
    'Shyvana': 'she simply farms 4-5 faster than anyone else and banks fury for the Dragon’s Descent spike',
    'Skarner': 'he plays 4-5 near walls, where the Ixtal’s Impact stun turns a gank into a guaranteed kill',
    'Taliyah': 'she uses 4-5 to shove waves and cross the map, with worked ground making her the faster rotator',
    'Talon': 'he wall-hops through 4-5 into lanes that have pushed, and the Rake slow closes every remaining gap',
    'Trundle': 'he uses 4-5 to steal camps and contest your jungle, where Pillar of Ice cuts off every retreat',
    'Udyr': 'he farms 4-5 at speed and takes any fight near a wall, since Blazing Stampede needs only a straight line',
    'Vi': 'she spends 4-5 charging Vault Breaker into side lanes, and Denting Blows finishes what the laner starts',
    'Viego': 'he plays 4-5 around Harrowed Path vision and looks for any fight that leaves a body to possess',
    'Volibear': 'he uses 4-5 to bully camps and towers, and the Thundering Smash stun makes long-lane ganks work',
    'Warwick': 'he tracks blood trails through 4-5, so any laner below half is a gank he reaches faster than you expect',
    'Wukong': 'he plays 4-5 through clone bluffs at entrances and takes the camps you leave behind',
    'Xin Zhao': 'he dives lanes through 4-5, since Audacious Charge into the knock-up needs no setup at all',
    'Zac': 'he charges Elastic Slingshot from fog through 4-5 and is more dangerous off your screen than on it',
    'Zyra': 'she seeds lane brushes through 4-5, and a gank that starts on a grown plant is already won'
  };
  var LATE = {
    'Amumu': 'he is a Curse-and-run engager whose value is the ultimate, not the duel',
    "Bel'Veth": 'she is a true-form auto-attacker who out-duels almost anything with room to dash',
    'Brand': 'he deletes a clumped fight with a Pyroclasm bounce and needs no auto-attacks to do it',
    'Briar': 'she heals through most burst and can no longer be duelled below half health',
    'Diana': 'she one-rotations a squishy target and gets a second one free off the Moonfall pull',
    'Ekko': 'he dives, deletes and rewinds, so your punish window is only ever after Chronobreak',
    'Elise': 'she falls off — the Cocoon pick still lands but the follow-up no longer kills',
    'Evelynn': 'she is invisible and lethal, and every unswept corridor is a charm into a delete',
    'Fiddlesticks': 'a Crowstorm from fog ends a whole fight before anyone turns to face it',
    'Gragas': 'he is a displacement engine — the Cask decides objective fights he does no damage in',
    'Graves': 'he shreds anything in a corridor and holds a side lane against most of the map',
    'Hecarim': 'he reaches your back line first and the movement-speed ramp makes him hard to answer',
    'Ivern': 'he is a shield-and-root support, with Daisy as the only real body he brings',
    'Jarvan IV': 'he is a lockdown engager — the cage is the threat, the damage is not',
    'Jax': 'he wins any extended duel on the map and will hold a side lane against two people',
    'Karthus': 'he deals damage from anywhere and keeps dealing it dead — Death Defied buys the fight',
    'Kayn': 'a formed Kayn is either an unkillable brawler or a burst assassin, and both out-scale you',
    "Kha'Zix": 'he deletes an isolated target instantly and evolves out of most of your counter-play',
    'Kindred': 'a stacked Kindred kites for free and Lamb’s Respite un-loses the fight you thought you won',
    'Lee Sin': 'he falls off harder than any other jungler — the burst simply stops killing',
    'Lillia': 'she is untouchable dream damage on a permanent kite, and the sleep decides fights',
    'Locke': 'his execute floor rises with every seal, so any low-health fight inside Purgatory is lost',
    'Maokai': 'he is a root wall with a health bar — hard to kill, and the whole river is his zone',
    'Master Yi': 'he is the strongest 1v1 in the game and hard CC is the only answer left',
    'Morgana': 'the utility wins her fights, not the damage — Black Shield plus a binding is the whole threat',
    'Naafiri': 'she picks one target and the pack removes it before your team can turn',
    'Nidalee': 'she is a poke-and-execute pattern that never actually stands in the fight',
    'Nocturne': 'he removes your vision and arrives on your carry with a spell shield already up',
    'Nunu & Willump': 'he is an objective thief and a channel to interrupt, not a duel to take',
    'Olaf': 'he is a crowd-control-immune diver, so he has to be kited rather than stopped',
    'Qiyana': 'she one-shots a carry and the wall stun makes the follow-up fight unwinnable',
    'Rammus': 'he reflects auto-attack damage faster than most carries can put it out',
    "Rek'Sai": 'he executes anything below the Void Rush threshold from across the map',
    'Rengar': 'he leaps from stealth and removes a squishy before the health bar finishes updating',
    'Sejuani': 'she is unkillable frontline with a cross-map stun that starts every fight',
    'Shaco': 'he is a box-and-clone pick threat who wins on confusion rather than on stats',
    'Shyvana': 'dragon form is a stat check most junglers simply lose',
    'Skarner': 'he drags whoever steps forward into his team and survives your answer to it',
    'Taliyah': 'she zones with mines and splits the map with the wall whenever she wants to',
    'Talon': 'he removes an isolated carry and leaves over a wall before anyone reacts',
    'Trundle': 'he steals your stats mid-fight, so the longer the duel runs the worse it gets',
    'Udyr': 'he is an awakened-stance brawler with sustain, damage and a stun on a short timer',
    'Vi': 'she is point-and-click lockdown on whoever you least want caught',
    'Viego': 'every kill his team gets is a reset, so one lost fight becomes three',
    'Volibear': 'he is a bonus-health diver who disables towers and closes the gap with a leap',
    'Warwick': 'he suppresses a carry for the length of the fight and out-heals your answer',
    'Wukong': 'the double knock-up wins the fight before the clone even resolves',
    'Xin Zhao': 'he isolates one target with Crescent Guard and wins the 1v1 he just created',
    'Zac': 'he is a fog engage with two health bars, so the first kill is only temporary',
    'Zyra': 'she covers a choke in plants and the knock-up ends any fight taken inside it'
  };
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function pick(list, key) { return list[hash(key) % list.length]; }

  function stage3(you, foe, d) {
    var m = MID[foe] || 'they path for camps and cover, not for fights';
    if (d >= 1.5) return { adv: you + ' Dominant — Keep Fighting', why: pick([
      'Levels 4-5 change nothing: you still win every straight duel vs ' + foe + ', and ' + m + '. Sit in their river, take both scuttles, and tax the camps they concede.',
      'You are the stronger side all through 4-5. ' + foe + ' knows it — ' + m + ' — so shadow that side of the map and make them fight you anyway.',
      'Nothing about 4-5 helps ' + foe + ' here: ' + m + ', while you can take any duel you can reach. Invade on the clear-timer, not on a whim.'
    ], you + foe + '3') };
    if (d >= 0.5) return { adv: you + ' Favored — Take Duels', why: pick([
      'Through levels 4-5 you remain the stronger duelist — keep taking short, decisive trades vs ' + foe + ', but only with the HP and cooldown lead.',
      'You hold the edge at 4-5, not a blowout. ' + m.charAt(0).toUpperCase() + m.slice(1) + ', so meet them where the camps are, not where their laners are.',
      'The 4-5 window is yours if you pick it: ' + m + '. Track that pattern, arrive one camp early, and take the fight before the follow-up shows.'
    ], you + foe + '3') };
    if (d > -0.5) return { adv: 'Even — Farm & Track', why: pick([
      'Levels 4-5 are a stalemate vs ' + foe + ' — match their clear speed, keep river vision, and bank gold for the level-6 window instead of coin-flipping.',
      'Even through 4-5. ' + m.charAt(0).toUpperCase() + m.slice(1) + ', so mirror it: farm the same tempo, ward the same crossings, and take the fight only with numbers.',
      'Neither of you owns 4-5. Since ' + m + ', decide this window on vision and objective timers rather than on a duel.'
    ], you + foe + '3') };
    if (d > -1.5) return { adv: 'Respect ' + foe + ' — Path Opposite', why: pick([
      'Levels 4-5 still belong to ' + foe + ' in a straight fight — farm the opposite side, answer their ganks cross-map, and wait for your spike.',
      'Do not trade windows with ' + foe + ' here: ' + m + '. Path opposite, keep your entrances warded, and answer the map, not the champion.',
      'You lose the 4-5 duel. ' + m.charAt(0).toUpperCase() + m.slice(1) + ' — so let them have that half of the map and cash the other half faster.'
    ], you + foe + '3') };
    return { adv: 'Danger — Avoid ' + foe, why: pick([
      'Do not be seen by ' + foe + ' at levels 4-5 — you lose every exchange. Full-clear away from them, ward your entrances, and trade map pressure, not HP.',
      'This is a no-contest window: ' + m + ', and you have nothing that answers it. Full-clear the far side and let the objective timers carry you.',
      foe + ' owns 4-5 outright. ' + m.charAt(0).toUpperCase() + m.slice(1) + ', so treat every crossing as theirs and take the camps they are furthest from.'
    ], you + foe + '3') };
  }

  function stage6(you, foe, d) {
    var l = LATE[foe] || 'they scale into a fight the same way you do';
    if (d >= 1.25) return { adv: you + ' Favored — Wins Late', why: pick([
      foe + ' falls off relative to you — from two items on you win the raw stat check, even though ' + l + '. Drag the game long and force the 1v1s.',
      'From two items you out-scale ' + foe + '. ' + l.charAt(0).toUpperCase() + l.slice(1) + ', but none of that beats your full build in a straight fight.',
      'The late game is yours. Remember what ' + foe + ' still is at full build — ' + l + ' — and take the fights that do not let it matter.'
    ], you + foe + '6') };
    if (d >= 0.5) return { adv: you + ' Favored at Full Build', why: pick([
      'Full-build math leans your way: extended fights and side-lane duels favor you over ' + foe + ' — make late fights about 1v1s, not coin-flips.',
      'You are the better full-build side, narrowly. ' + l.charAt(0).toUpperCase() + l.slice(1) + ', so take the duel with cooldowns up and never mid-rotation.',
      'Two items on, the edge is yours. The one thing to plan around is that ' + l + ' — take that away and the fight is a formality.'
    ], you + foe + '6') };
    if (d > -0.5) return { adv: 'Even Scaling — Prep Decides', why: pick([
      'Both kits pay off at 2+ items — late fights vs ' + foe + ' come down to who enters with cooldowns, vision, and numbers. Win with setup, not stats.',
      'Neither of you out-scales the other. ' + l.charAt(0).toUpperCase() + l.slice(1) + ', so the late game is decided by who starts the fight, not who wins the stat sheet.',
      'Even at full build. Since ' + l + ', win the vision around the pit first and the fight second.'
    ], you + foe + '6') };
    if (d > -1.25) return { adv: 'Respect ' + foe + ' Late — End Early', why: pick([
      foe + ' out-stats you from two items on — stop taking straight 1v1s, close through objectives and picks, and keep the game on a clock.',
      'The full-build comparison goes to ' + foe + ': ' + l + '. Play for picks and objectives, and end before the fight has to be fair.',
      'You do not want the late 1v1 here. ' + l.charAt(0).toUpperCase() + l.slice(1) + ' — so trade the map instead, and keep every fight a numbers fight.'
    ], you + foe + '6') };
    return { adv: 'Danger — ' + foe + ' Outscales', why: pick([
      'Every minute past 25 tilts toward ' + foe + ' — ' + l + '. Force your win condition early or watch it slip away slowly.',
      'You lose the long game outright: ' + l + ', and no build path of yours answers that. Convert every early lead into an objective immediately.',
      'The clock is your enemy. ' + l.charAt(0).toUpperCase() + l.slice(1) + ', so close the game on the first two objectives you actually win.'
    ], you + foe + '6') };
  }

  function apply() {
    var DB = window.JG_DB;
    if (!DB) return false;
    var champs = Object.keys(DB);
    if (!champs.length) return false;
    var did = false;
    champs.forEach(function (you) {
      var reports = DB[you];
      Object.keys(reports).forEach(function (foe) {
        var st = reports[foe] && reports[foe].stages;
        if (!st || st.length < 7 || !st[3] || !st[6]) return;
        // wait until the headsup pass has rewritten stages 0-2 & 4 (its label grammar)
        var probe = ((st[2] && st[2].adv) || '').toLowerCase();
        if (!/dominant|favored|favoured|even skirmish|respect|danger|mirror/.test(probe)) return;
        var d35 = (vOf(st[2].adv) + vOf(st[4].adv)) / 2;
        var s3 = stage3(you, foe, d35);
        if (st[3].adv !== s3.adv) { st[3].adv = s3.adv; st[3].why = s3.why; did = true; }
        if (LS[you] != null && LS[foe] != null) {
          var s6 = stage6(you, foe, LS[you] - LS[foe]);
          if (st[6].adv !== s6.adv) { st[6].adv = s6.adv; st[6].why = s6.why; did = true; }
        }
      });
    });
    return did;
  }

  apply();
  var ticks = 0;
  var t = setInterval(function () {
    apply();
    if (++ticks >= 24) clearInterval(t);
  }, 250);
})();
