// Cross-group top-lane diff corrections — resolves the 61 both-HARD / both-FAVOURED
// reverse-matchup contradictions found in the full-lane audit (June 2026). Each cell here
// is the UNFIXED side of a pair whose other side was already validated in _tank/_diver/
// _juggernaut/_mage-fixes.js (we align with those rather than override them — no races),
// or both sides of pairs none of those files touch. Verdicts validated vs lolalytics /
// mobalytics / counterstats consensus; contested lanes (split stats) set TRICKY/TRICKY.
// Research notes: Aurora is a listed mobalytics counter to Olaf; Aurora/Morde stats split
// 48.8-52.4% by site (true coin flip on his R); TK 51.4% over Cassio top.
// Loaded LAST, after _mage-fixes.js. Same idempotent retry-loop pattern.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var FIX = {
    akali: {
      mordekaiser: ['TRICKY', "Skill matchup with a death clause — you dance around his slow kit all lane, but one R into the death realm strips your shroud crutch and stat-checks you. Track his ult before every extended trade."],
      olaf: ['FAVOURED', "His axes need him to walk to the pickup — shroud the spot and the run-down dies. Energy beats mana in long lanes; just respect ghost-R onto your low health bar."],
      ziggs: ['FAVOURED', "Satchel is his only answer to your 6 — eat the poke pre-6 with passive sustain, then every shroud-R window is a kill. Dodge the minefield, not the mage."]
    },
    mordekaiser: {
      akali: ['TRICKY', "She wins the dance until you press R — the death realm removes her shroud safety net and your stats crush hers 1v1. Land one E pre-6 or simply scale to the realm."],
      aurora: ['TRICKY', "She kites your entire kit between hops, but one landed E or R flips it — the realm is small and her escape pattern dies inside it. Don't chase; make her come to the wave."],
      jayce: ['FAVOURED', "Eat the hammer poke with W up, walk him down, and R deletes his squishy frame — Jayce has no answer inside the death realm and no second health bar."]
    },
    urgot: {
      chogath: ['TRICKY', "He sidesteps the knees, rupture-slows your reposition, and true-damage Feast beats your execute flip at every health checkpoint — his best lane, not yours. Trade only behind a full passive rotation."],
      akali: ['FAVOURED', "Your W shreds her through shroud — she has to dash into shotgun-knee range to do anything. Save E for her R engage and the fear-flip ends her."],
      camille: ['FAVOURED', "Knees out-range her hookshot angles and W melts her mid-dash. Her ult traps her IN your kill zone — fear nothing in this lane before 16."],
      renekton: ['FAVOURED', "Every fury trade eats a shotgun knee — you out-stat his short trades and out-scale his mid game. Just don't get E-flipped under his turret early."]
    },
    malphite: {
      akali: ['FAVOURED', "Armor blunts her whole kit and R catches her mid-dash — her poke is wasted on a rock. Don't int the pre-6 energy windows and this is free."],
      fiora: ['FAVOURED', "The stats side with the rock: passive shield eats vital pokes and W-armor stacks faster than her true damage ramps. Save R to cancel her R window."],
      tryndamere: ['TRICKY', "The classic counter is thinner than it looks — early crit spins through you before W stacks online. Respect levels 1-5, then the AS slow and R turn him off."]
    },
    cassiopeia: {
      akali: ['FAVOURED', "Grounded (W) is her personal nightmare — no E, no R dashes inside it. Poison the shroud and Twin Fang the panic walk-out."],
      tahmkench: ['TRICKY', "Grey health eats your DPS math and one Q-stun devour ends you — but he can never catch you either; the river fish runs a 51% ledger on this lane. Poke the wave, scale, and never face-check his bush."]
    },
    ambessa: {
      ziggs: ['TRICKY', "Pre-6 he satchels every engage and chips you off the wave — post-6 one R chain through the minefield kills him. Pay the poke tax, then collect."]
    },
    ziggs: {
      ambessa: ['TRICKY', "Poke her off the wave pre-6 — but every post-6 crash is a coin flip on your satchel timing. Place the minefield BEFORE she dashes, not after."],
      camille: ['TRICKY', "You own the lane until her hookshot finds a wall angle past your satchel — then plates stop mattering. Poke freely, but bank W for her E, every time."]
    },
    aurora: {
      mordekaiser: ['TRICKY', "You kite him for free until one E or R lands — then the realm deletes your hop pattern. The stat sites genuinely split on this lane (48.8% to 52.4% by source); track his R and never trade inside it."],
      olaf: ['FAVOURED', "Mobalytics lists you among his worst lanes — hops plus the slow re-kite every axe run-down pre-6. Post-6 Ragnarok ignores everything you do: disengage and reset, don't duel it."]
    },
    camille: {
      heimerdinger: ['TRICKY', "The turret nest beats your early — but level 6 R mutes it and isolates the inventor. Farm through the tax pre-6, then dive entirely on your terms."],
      ziggs: ['EVEN', "He pokes, you punish — hookshot through the wave when satchel is down and R locks him off his own minefield. The cooldown ledger decides this lane, not the laners."]
    },
    chogath: {
      renekton: ['FAVOURED', "Sustain through the fury windows, rupture the dash, and true-damage Feast beats his half-health all-in math from 6 on. He must kill you pre-9 or never."]
    },
    fiora: {
      tahmkench: ['HARD', "Grey health un-procs your vitals math and the devour deletes your riposte read. One of your genuinely bad lanes — take the farm matchup and outscale sideways."]
    },
    kayle: {
      fiora: ['FAVOURED', "Survive her levels 1-8 — the aggregators give you the cleaner curve: ranged form kites the parry and your R blanks her R execute. Don't die twice early."],
      urgot: ['FAVOURED', "His knees own the early — give plates, not deaths. Past 11 your ranged form out-DPSes a kit with no gap-close, and his shield math stops working on you."]
    },
    riven: {
      kayle: ['TRICKY', "You get six free levels of bully — convert two kills or the game flips at 11 when her ranged form starts kiting your animation cancels. This is a timer, not a matchup."]
    },
    sylas: {
      kayle: ['TRICKY', "Bully the weakest early laner in the game — but her R is the worst steal in your pool and her ranged form out-duels your mid-game spike. Cash out before 14."],
      maokai: ['TRICKY', "His sustain matches yours, the root interrupts your chain mid-dash, and stealing Nature's Grasp barely helps a 1v1. Trade only when saplings are down."]
    },
    ryze: {
      galio: ['HARD', "Full AP into the anti-mage — his passive eats your rotation and the taunt punishes every root attempt. Farm with Q from max range and drag the game to sieges."],
      maokai: ['TRICKY', "His W-root closes your kite gap and the sustain blunts your poke math — but he can't ever kill a respectful Ryze. Scale, don't duel."],
      shen: ['TRICKY', "Taunt cancels your tempo and his W blanks a full rotation — you can't kill him, he can't kill you, and his R wins the map war. Shove and follow every ult cross-map."],
      sion: ['TRICKY', "He doesn't care about your poke and the Q-knockup punishes your short range. Free farm both ways — just never eat a full charge in a choke."]
    },
    teemo: {
      garen: ['TRICKY', "Post-rework W and MR boots broke the old counter — he silence-flips your kite and regens the blind tax. Keep poking, but hold flash for the Q-speed angle."],
      nasus: ['TRICKY', "You tax his stacks for ten minutes, then MR plus sustain plus wither makes him un-kitable — this is a lease, not a win. Convert the early lead into plates and roams."],
      sett: ['TRICKY', "Blind doesn't stop the W true-damage cone or the E pull through wave — bully from max range but respect every grit bar above half."]
    },
    yorick: {
      gnar: ['FAVOURED', "Maiden plus ghouls out-shove mini Gnar and the cage traps mega's hop — his poke can't stop the split math. Wall off the boomerang angle and grind."],
      chogath: ['TRICKY', "He E-clears your ghouls for free and Feast out-scales the Maiden — but he can't stop the cage pick or match your split tempo. Win the map, not the trade."],
      irelia: ['HARD', "Her Q hops your ghouls like stepping stones and the cage is a dash playground. One of your worst lanes — cage to ESCAPE, not to engage."],
      yasuo: ['FAVOURED', "The ledger leans you ~53%: ghouls feed his dashes but chunk him every wave, the cage forces windwall early, and Maiden out-DPSes his sustain. Never fight his item spike with ghouls down."]
    },
    warwick: {
      gnar: ['FAVOURED', "Q sustain erases mini-form poke and W-frenzy tracks the low health bar mega can't hide. The hop is his only out — hold E fear for exactly that."]
    },
    jax: {
      heimerdinger: ['FAVOURED', "Counter Strike dodges turret autos — the nest that bullies every other melee just feeds your E. Q onto the inventor, stun the trio, kill from there."]
    },
    heimerdinger: {
      camille: ['TRICKY', "Your nest owns her until 6 — then R deletes the turrets from the fight and it's a 1v1 you didn't sign up for. Stack the lead pre-6 and ward the all-in."],
      jax: ['HARD', "His E no-sells your turret autos — the whole zone-control plan dies to one button. Poke with W from range and concede the all-in forever."],
      olaf: ['TRICKY', "Axes clear turrets and his sustain out-grinds your poke — but pre-6 he can't actually reach you through the slow field. Post-6 Ragnarok walks through the whole setup: rebuild deeper each level."],
      vayne: ['TRICKY', "She tumble-dodges turret focus and shoots the nest down at range — but face-checking your full setup is still death. A war of setup versus patience."]
    },
    vayne: {
      heimerdinger: ['TRICKY', "His nest out-zones your early range — kill turrets with Q-resets, not greed. Past three items you shred the whole setup; before that, respect the stun line."],
      nautilus: ['FAVOURED', "Range him forever — every missed hook is a free silver-bolts window and condemn cancels the all-in. Just never trade inside hook range with E down."],
      urgot: ['FAVOURED', "His knees can't catch a tumble and silver bolts melt exactly the stats he stacks — kite the E, condemn the flip attempt, and never get fear-comboed at 6."],
      volibear: ['FAVOURED', "The classic juggernaut-kite — tumble out of his Q stun range, condemn the W bite window, and %-true ignores the stat slab. Only the R tower-disable gank flips this."]
    },
    illaoi: {
      renekton: ['FAVOURED', "His dash is an E-soul donation — every fury trade inside tentacle range goes your way and the W heal beats his burst math. He wins only if you whiff the test."],
      swain: ['FAVOURED', "Your tentacles out-trade his drain in any zone you've set up and E pulls his soul off the wave. He sustains; you amputate."]
    },
    sett: {
      irelia: ['FAVOURED', "Her stacked-Q engine feeds your grit bar and W true damage punishes every extended dance. Bait the stun, pull her back in, cash the cone."],
      nasus: ['FAVOURED', "Stack-denial is your job and you're built for it: E pulls him off the wave, the W cone answers wither windows, and he can't trade back for twenty minutes."]
    },
    irelia: {
      yorick: ['FAVOURED', "His ghouls are your dash network — Q through the wall pieces, break the cage with marks, and the Maiden just feeds your passive. Never let him free-shove, though."],
      ziggs: ['FAVOURED', "Every minion is a flight path to his face — satchel saves him once per ninety seconds and nothing saves him at 6. Eat the poke with lifesteal, then collect."]
    },
    wukong: {
      jayce: ['FAVOURED', "Clone eats the hammer-combo read and E plus armor shred closes the poke gap — he's squishy all game and you spike first. Dodge the accel-gate poke and walk him down."]
    },
    kassadin: {
      vladimir: ['HARD', "Ranged sustain bullies your melee-mage early and his late game matches yours — the rare lane where you're behind at every timestamp. Farm with the Q shield and pray for jungle."]
    },
    vladimir: {
      kassadin: ['FAVOURED', "He's a melee mage with no early game — Q-drain every last-hit attempt and the pool blanks his level-6 gap-close. You out-bully AND out-scale."]
    },
    ksante: {
      olaf: ['FAVOURED', "Mobalytics lists you among his hardest lanes — W tank-dodge eats the axe all-in, Q3 interrupts the run-down, and All Out isolates him from his sustain math."]
    },
    ornn: {
      olaf: ['FAVOURED', "Brittle is the anti-Olaf stat — W proc plus E stun walls the run-down and your item lead compounds his fall-off. Just don't eat axes at levels 1-2, the only window he owns."]
    },
    olaf: {
      quinn: ['FAVOURED', "Ghost-R ignores the blind, the vault, and the kite — one connected run-down per recall timer is lethal. Pre-6, eat the poke and farm axes through the wave."],
      teemo: ['FAVOURED', "The yordle-eater: blind doesn't touch Q axes, W sustain out-grinds the poison tax, and Ragnarok shrugs off every shroom slow. Walk at him forever."],
      heimerdinger: ['TRICKY', "Axes clear the nest but the rebuild tax is real and the E stun interrupts your run-down — grind it patiently pre-6. Post-6 Ragnarok walks through the whole setup."]
    },
    nasus: {
      vladimir: ['FAVOURED', "He pokes, you stack — wither ruins his pool-dodge timing and your sheen spike beats his at every aggregator's mid-game checkpoint. The drain duel past 11 is yours."]
    },
    gragas: {
      illaoi: ['TRICKY', "Your W damage-reduction and E-dodge handle the test — until one E lands during body-slam wind-up and the zone eats you. Trade off cooldown, never inside three tentacles."]
    },
    gwen: {
      chogath: ['TRICKY', "Your %-HP mist loves his stacking — but his E true damage shreds you back and rupture interrupts the W window. Snip the knock-up, not the health bar."]
    },
    yasuo: {
      teemo: ['FAVOURED', "Windwall eats the blind dart AND the shroom face-line; E-dashes make his kite math useless. The only thing that kills you here is greed at his turret."]
    },
    trundle: {
      wukong: ['TRICKY', "Q-steal feeds on his AD but the clone bait wastes your pillar every time — and his armor shred out-paces your W window mid-game. Save pillar for the REAL engage."]
    },
    jayce: {
      kled: ['TRICKY', "Mounted Kled walks through your poke with the Q-pull and bear courage — gate-speed away from EVERY remount window. You win only the dismounted seconds."]
    }
  };
  function apply(db) {
    if (!db) return;
    Object.keys(FIX).forEach(function (champ) {
      var entry = db[champ];
      if (!entry) return;
      Object.keys(FIX[champ]).forEach(function (foe) {
        var f = FIX[champ][foe];
        var m = entry[foe];
        if (!m) return;
        m.diff = f[0];
        m.tone = T[f[0]];
        m.tldr = f[1];
      });
    });
  }
  function applyAll() {
    apply(window.CHAMP_DATA);
    apply(window.CHAMP_FULL);
  }
  applyAll();
  if (typeof setTimeout === 'function') {
    var tries = 0;
    var iv = setInterval(function () { applyAll(); if (++tries >= 24) clearInterval(iv); }, 250);
    setTimeout(applyAll, 0);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', applyAll);
  }
})();
