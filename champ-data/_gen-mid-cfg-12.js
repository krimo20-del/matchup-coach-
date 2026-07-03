// MatchupCoach — MID generator configs batch 12: Locke (new champion, patch 26.13).
// Diff verdicts are WR-driven from lolalytics emerald+ (see _locke-wr.json in repo root).
window.GEN_MID_CFGS_12 = [

// ============================== LOCKE ==============================
{
  key:'locke', name:'Locke',
  curve:[-0.2,-0.1,0.1,0.1,0.6,0.7,0.2],
  lvl:[
    "Q only — throw the nails at wave contacts and bank the mark stacks. You are a melee mana champ at level 1: chip, don't brawl.",
    "E online — blink-auto through a 2-stack target is a real chunk, but your escape is now spent. Trade only when the exit math works.",
    "Full kit: W's speed makes the E-in stick. Stack nails, ignite the soul, and take the first genuine trade of the lane on YOUR timer.",
    "Q max ramps — the recast slows chain and every consumed mark refunds mana. Chip {E} toward half; that's where your passive starts doing the accounting.",
    "Purgatory online — a totem that turns 'almost dead' into 'dead'. Anyone at the wave below a quarter HP is now a soul waiting for the seal.",
    "Lich Bane spike: blink-auto now double-dips Spellblade on every mark consume. This is your kill window — cash it before their second item answers.",
    "Sealed souls keep raising the execute floor — you're a cleanup engine now. Enter fights second, blink the resets, and let the totem do the arithmetic."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ hwei:'FAVOURED', malzahar:'FAVOURED', orianna:'FAVOURED', ryze:'FAVOURED', swain:'FAVOURED', taliyah:'FAVOURED',
    karma:'FAVOURED', lux:'FAVOURED', mel:'FAVOURED', neeko:'FAVOURED', qiyana:'FAVOURED',
    kassadin:'TRICKY', katarina:'TRICKY' },
  vs:{
    control:{
      tldr:"A stationary spell-battery vs a blink with an execute — survive the poke tax pre-6, then every low-HP recall becomes a Purgatory receipt.",
      breakdown:"He out-ranges you early, so pay the toll: last-hit with Q nails, bank marks, and keep the wave off his poke pattern. Post-6 the maths flip — one landed nail string means your E-in threatens lethal, and {K} is the only button standing between him and the totem. Track it like rent.",
      dos:["Stack nails on him every time he steps up to CS","Blink in only with 2-3 marks banked","R the moment he drops below a third — the totem finishes what your passive starts"],
      donts:["Walk at him through open lane pre-6","Spend E to farm when he has prio","Trade while {K} is up and your marks are zero"],
      win:"Tax the marks early, then convert one nail string into an execute the moment {K} is spent."
    },
    burst:{
      tldr:"Two burst kits, but yours has a rewind — grey health refunds his best combo and the execute floor punishes his 'almost'.",
      breakdown:"His full rotation hurts, but W stores the damage as grey health: recast after his combo ends and half of it never happened. That asymmetry is the lane — bait the rotation, heal the bill, then blink the counter-window with marks loaded. Post-6 his 'you survived at 15%' is your 'executed at 15%'.",
      dos:["Cast W as his combo starts, recast as it ends","Hold E strictly for the after-combo window","Keep a nail stack on him so your counter-trade is loaded"],
      donts:["Blink in while his full rotation is up","Ignite the soul just to push a wave","Respect his poke so much you stop stacking marks"],
      win:"Eat the combo on grey health, refund it, and execute the counter-window he can't answer."
    },
    assassin:{
      tldr:"An assassin mirror-war where your passive votes last — whoever hits 40% first is playing YOUR game, not his.",
      breakdown:"You both want the same all-in windows, but missing-health on-hit plus the R floor means every close fight tilts your way at the bottom of the health bars. Track {K} obsessively: his kill pattern starts there, and the ten seconds after it whiffs is your whole lane. Never blink in first without marks — second player wins the assassin dance.",
      dos:["Dodge or minion-block {K} before anything else","Blink AFTER his engage tool is spent","Force fights at 40-50% HP where your passive out-maths him"],
      donts:["Coin-flip the level 2 all-in","Burn E while his kill combo is up","Stay in Purgatory range of HIS burst at low HP — the execute game cuts both ways"],
      win:"Make him engage first, out-execute the low-HP war, and reset E through the takedown."
    },
    fighter:{
      tldr:"He wants long brawls, you want short receipts — nail, blink, chunk, leave, and only stay when the execute floor says stay.",
      breakdown:"Extended trades feed his stat-check, so never give him one: stack nails at range, blink-auto the chunk, and walk before his pattern answers. W's grey health makes your short trades cheaper than they look. Post-6, his all-in bravado is a liability — brawlers love fighting at 30% HP, and 30% is where Purgatory lives.",
      dos:["Trade in one-blink bites, never brawls","Recast W after his counter-swing to bank the refund","Let him coin-flip at low HP — the totem referees it your way"],
      donts:["Stand and trade autos with a stat-checker","Blink into him with {K} waiting","Chase past the wave when he can turn with his all-in"],
      win:"Short bites, grey-health refunds, and an execute floor that turns his brawler math against him."
    }
  },
  mirror:{
    tldr:"Nail mirror — whoever stacks marks first blinks second and wins. The passive means the loser of the poke war loses the all-in too.",
    breakdown:"Identical kits, one rule: marks decide everything. Chip the nail war, dodge his recasts, and never blink first — the counter-blink with stacks loaded wins the exchange. Both Purgatories share a floor: at the bottom of the health bars it's pure who-sealed-more.",
    dos:["Win the Q accuracy war — it IS the lane","Blink second, always","Bank W for his ignite window, not yours"],
    donts:["Blink in without a mark advantage","Trade at even stacks with his E up","Enter the totem zone behind on souls"],
    win:"Out-stack, counter-blink, and let the shared execute floor favour the cleaner mechanics.",
    winS:"His nails whiffed — blink the counter-window and out-execute the mirror."
  },
  winS:"His answer is spent — nails in, blink the mark, and let the passive do the closing argument.",
  tradeGood:"Two-plus marks on him, {K} down, E ready: blink-auto the consume, walk out before his answer.",
  tradeBad:"Blinking in with zero marks while {K} is up — that's donating your only escape to his kill pattern.",
  waveBest:"slow-push a big wave, then blink-in as it crashes — he has to choose between the CS tax and the mark tax.",
  waveWorst:"a frozen wave near his tower with your E on cooldown — a melee champ with no blink farms with his face.",
  early:"Levels 1-3 are the mark economy: throw nails at every wave contact, bank stacks, and take exactly one trade per E cooldown. You're mana-hungry — wasted recasts are wasted lane.",
  mid:"Level 6 through first item is the kill zone: Purgatory turns every gank, dive, and skirmish into an execute check. Shove and roam when {E} plays safe — a sealed soul from another lane raises YOUR floor forever.",
  late:"You're the cleanup act: enter second, blink the marked target, and chain E resets through the fight. The sealed-soul stacks decide whether late-game Locke is a menace or a mascot — collect them all game.",
  safetyTool:"E blink (your only exit — spend it in is spending it away)",
  spikesLine:"Spikes: level 6 (Purgatory floor), Q max at 9, Lich Bane, and every permanent seal along the way.",
  carryLine:"Carry pattern: snowball seals — each execute raises the floor permanently, so a fed {ME} literally lowers the bar for the next kill.",
  behindShort:"farm with Q, stack grey-health trades, and wait for the totem to referee a fight you didn't start.",
  loadingRule:"Never blink in without marks banked.",
  dontDetail:"E is engage AND escape in one button — the moment it's spent for damage, every gank and counter-engage is lethal arithmetic.",
  aheadTpl:"Snowball the seals: every executed soul permanently raises Purgatory's floor and refunds the cooldown. Ahead means diving {E} on repeat — blink in, consume, reset, and make the next lane's execute even easier.",
  behindTpl:"Behind, you're still a scaling execute: farm safely with Q nails, take only grey-health-backed trades, and re-enter the game through Purgatory cleanups in team fights — you don't need to be ahead to seal souls, just present.",
  spikeName:"Lich Bane",
  runeReport:"Electrocute — the blink-auto-consume pattern procs it instantly. Sudden Impact off E, Ultimate Hunter for more Purgatory windows; Bone Plating + Revitalize secondary to survive the melee mid life.",
  summReport:"Ignite for the execute-adjacent kill threat; Flash is non-negotiable — E is your only dash and it's also your engage.",
  itemReport:"Lich Bane first — Spellblade double-dips every mark consume. Shadowflame second for the low-HP crunch (it stacks with your entire identity). Sorcerer's Shoes standard.",
  jungleLine:"Your ganks are execute setups: nail the slow, blink the dash-through, and Purgatory means 'they burned Flash at 40%' is a kill call, not a shrug. Ping your jungler every time {E} shoves past half HP.",
  redditLine:"stack the nails before you ever blink in, treat E as a one-way door, and remember the totem executes THEIR way too — don't int at 10% into his team.",
  load:{
    sub:"Locke Mid",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Sheen (≈900g) — the Spellblade pattern starts here",
    antihealBack:"Oblivion Orb (≈800g) — cut the sustain before the execute war",
    antihealNote:"Anti-heal matters double for Locke: sustain drags enemies back above the Purgatory floor.",
    firstItem:"Lich Bane",
    secondItem:"Shadowflame / Mejai's (if sealing)",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's Shoes",
    bootsVsAD:"Plated Steelcaps / Sorcerer's Shoes",
    spike:"Lich Bane + level 9 (Q max) — the blink-consume chunk becomes a one-shot threat on marked squishies.",
    runes:"Electrocute · Sudden Impact · Sixth Sense · Ultimate Hunter · Bone Plating · Revitalize"
  }
}
];
