// MatchupCoach — generator configs batch 4: Locke TOP (new champion, patch 26.13).
// Off-meta flex: 48.1% WR over 40k games (lolalytics emerald+). Diff verdicts WR-driven
// where fetched (_locke-wr-topjg.json); group defaults for the rest.
window.GEN_CFGS_4 = [

// ============================== LOCKE (TOP) ==============================
{
  key:'locke', name:'Locke',
  curve:[-0.3,-0.2,0.0,0.0,0.5,0.6,0.1],
  lvl:[
    "Q nails on the wave contacts only — you are a 125-range mana champ in a lane of stat-checkers. Chip, mark, and touch nothing.",
    "E online, but spending it to trade means walking home without an exit. Blink-auto only when his engage tool is already down.",
    "Full kit: W speed makes short trades stick. Stack nails at max range, bite once, and leave before the lane's HP bars start negotiating.",
    "Q max ramps the recast slows — kite the melee war and tax every step he takes toward the wave. Your passive quietly wins the sub-50% zone.",
    "Purgatory online: top lane's long brawls now end at YOUR floor. Anyone who all-ins you under a third is volunteering for the totem.",
    "Lich Bane spike — the blink-consume chunk finally out-numbers their sustain. Cash kill windows before their second item re-rigs the math.",
    "You out-execute but they out-stat: split where the totem punishes 1v1 greed, and never brawl at full HP — your kit votes at the bottom of the bar."
  ],
  diffBase:{ jugg:'EVEN', diver:'HARD', tank:'TRICKY', ranged:'EVEN' },
  diffEx:{ aatrox:'EVEN', camille:'TRICKY', darius:'EVEN', fiora:'TRICKY', garen:'HARD', gwen:'EVEN', irelia:'HARD',
    jax:'HARD', ksante:'FAVOURED', malphite:'TRICKY', mordekaiser:'EVEN', olaf:'HARD', ornn:'HARD', renekton:'EVEN',
    riven:'HARD', sett:'TRICKY', shen:'TRICKY', teemo:'EVEN', tryndamere:'HARD', urgot:'HARD', volibear:'EVEN', yorick:'EVEN' },
  vs:{
    jugg:{
      tldr:"A slow fist vs a fast needle — nail the marks at range, bite once per E window, and let Purgatory referee his all-in bravado.",
      breakdown:"He wants one long brawl; you want six short receipts. Stack Q marks off the wave contacts, blink-bite when {K} is down, and walk before his pattern answers. Post-6 his 'I stat-check you at 40%' becomes your execute — juggernauts live in exactly the HP band the totem forecloses on.",
      dos:["Kite the nail slows — never stand in his trade range","Bite once per E cooldown, exit before the counter-swing","Drop R where his all-in ENDS, not where it starts"],
      donts:["Brawl a juggernaut with your blink spent","Trade into {K} with zero marks banked","Chase past the wave into his stat-check zone"],
      win:"Short bites and slow taxes until 6 — then his own all-in walks him under your floor."
    },
    diver:{
      tldr:"He dives better than you duel — this lane is a mark tax and a totem trap, not a fair fight. Respect the stat-check and farm the execute.",
      breakdown:"Divers out-trade you in every honest exchange, so don't offer one: Q from max range, hold E strictly as the exit, and give up CS you'd pay HP for. Your passive plus Purgatory means his dive math breaks at low HP — bait the all-in near your tower and let the floor do the arguing.",
      dos:["Hold E as an escape until the lane genuinely turns","Nail the wave contacts and bank Manaflow-style patience","Fight ONLY inside your totem with tower behind you"],
      donts:["Blink in first against a stat-checker","Trade while {K} is up — that's his whole kill script","Contest early prio your kit hasn't earned"],
      win:"Survive the dive windows, then out-execute the low-HP war his aggression keeps starting."
    },
    tank:{
      tldr:"He out-lasts, you out-floor — the lane is a farm-off where your execute eventually makes his HP bar a rounding error.",
      breakdown:"You can't chew through a tank's stats with short trades, and he can't kill a target that leaves. Farm with nails, poke the sub-50% zone where your passive ramps, and win the lane at 6: tanks fight long, and long fights end at the Purgatory floor. Track {K} — it's the only button that turns his lane into a kill threat.",
      dos:["Poke him below half and KEEP him there","Save R for his committed engage — it can't leave","Shove and roam when he hard-camps the freeze"],
      donts:["Waste mana chipping a full-HP tank","Blink into his CC chain for pride","Let him free-scale without paying the nail tax"],
      win:"Tax the lane to half HP, then let every extended fight end at your floor instead of his."
    },
    ranged:{
      tldr:"A poke war you enter at 125 range — pay the toll early, then one blink turns his kite into a coffin the moment the nails land.",
      breakdown:"Pre-6 he pokes free and you last-hit sad — accept it, bank marks when he steps up, and keep W's grey health for his best rotation. One landed Q string flips everything: blink-auto with marks consumes half his bar, and the R floor deletes the retreat. The lane is five bad minutes for one lethal window.",
      dos:["Bank W's refund for his poke rotation","Blink ONLY off a landed 2-3 stack nail string","R the retreat path, not the fight's start"],
      donts:["Trade autos at his range for free","Burn E to farm what patience farms cheaper","Dive a full-HP kiter without the marks loaded"],
      win:"Survive the poke tax, land one string, and cash the whole lane in a single blink window."
    }
  },
  mirror:{
    tldr:"Nail mirror on a long lane — whoever stacks first blinks second and wins; the passive means the poke loser loses the all-in too.",
    breakdown:"Identical kits, one rule: marks decide everything. Win the Q accuracy war, never blink first, and remember both Purgatories share a floor — at the bottom of the bars it's pure who-sealed-more.",
    dos:["Win the nail accuracy war","Blink second, always","Bank W for his ignite window"],
    donts:["Blink in without a mark advantage","Trade at even stacks with his E up","Enter the totem zone behind on souls"],
    win:"Out-stack, counter-blink, out-execute.",
    winS:"His nails whiffed — blink the counter-window and out-execute the mirror."
  },
  winS:"His answer is spent — nails in, blink the mark, and let the passive close the argument.",
  tradeGood:"Two-plus marks on him, {K} down, E ready: blink-auto the consume and walk out before the counter-swing.",
  tradeBad:"Blinking in with zero marks while {K} is up — donating your only exit to a top-laner's kill script.",
  waveBest:"a slow-push you cash with a blink-bite as it crashes — he pays the CS tax or the mark tax.",
  waveWorst:"a frozen wave outside your tower with E down — a 125-range champ farming a top-laner's freeze with his face.",
  early:"Levels 1-3 are the mark economy: nail the wave contacts, respect every stat-check window, and treat E as an exit you haven't earned the right to spend.",
  mid:"Level 6 through first item is the flip: Purgatory turns top lane's long brawls into execute checks, and Lich Bane makes the blink-bite genuinely lethal. Take one real kill window per totem.",
  late:"Split where the totem punishes 1v1 greed — most top-laners fight long, and long fights end at your floor. In teamfights, enter second and chain E resets through the marked cleanup.",
  safetyTool:"E blink (your only exit — spending it in is spending it away)",
  spikesLine:"Spikes: level 6 (Purgatory floor), Q max at 9, Lich Bane, and every permanent seal along the way.",
  carryLine:"Carry pattern: seals snowball — each execute permanently raises the floor, so a fed {ME} lowers the bar for the next kill, and the next.",
  behindShort:"farm with Q at max range, take only grey-health-backed trades, and let the totem referee fights you didn't start.",
  loadingRule:"Never blink in without marks banked.",
  dontDetail:"E is engage AND escape in one button — top lane punishes a spent exit harder than any lane in the game.",
  aheadTpl:"Snowball the seals: dive {E} on repeat — blink in, consume, reset — and every executed soul makes the next lane's floor higher and your roams scarier.",
  behindTpl:"Behind, you're still a scaling execute: farm safely with nails, stack grey-health trades, and re-enter through Purgatory cleanups — you don't need a lead to seal souls, just presence.",
  spikeName:"Lich Bane",
  runeReport:"Electrocute — blink-auto-consume procs it instantly. Sudden Impact off E, Ultimate Hunter for more totems; Bone Plating + Second Wind/Revitalize secondary to survive the top-lane brawls.",
  summReport:"Ignite pairs with the execute identity; Teleport is defensible for the lane's punish windows, but Flash is non-negotiable — E is your only dash and it's also your engage.",
  itemReport:"Lich Bane first — Spellblade double-dips every mark consume. Shadowflame second (low-HP crunch stacks with your entire identity). Boots by lane: Mercs into AP/CC, Steelcaps into the AD brawlers.",
  jungleLine:"Your ganks-received defense is E — so track THEIR jungler before spending it in lane. Your own dive setups are elite: nail slow, blink-through, and Purgatory means 'he burned Flash at 40%' is a kill call.",
  redditLine:"stack the nails before you ever blink in, treat E as a one-way door, and remember top-laners live in exactly the HP band Purgatory forecloses on — but they also stat-check you for free before 6.",
  load:{
    sub:"Locke Top",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Sheen (≈900g) — the Spellblade pattern starts here",
    antihealBack:"Oblivion Orb (≈800g) — sustain drags them back above your floor",
    antihealNote:"Anti-heal matters double for Locke: lifesteal and drain pull enemies back above the Purgatory threshold.",
    firstItem:"Lich Bane",
    secondItem:"Shadowflame / Zhonya's (vs dive)",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Lich Bane + level 9 (Q max) — the blink-consume chunk becomes lethal on marked targets.",
    runes:"Electrocute · Sudden Impact · Sixth Sense · Ultimate Hunter · Bone Plating · Second Wind"
  }
}
];
