// Shared enemy metadata for synthetic JG_DB generation.
// duel: early-game (lv 1-5) 1v1 threat — 2 strong, 1 moderate, 0 weak. Validated vs community consensus.
const ENEMY_DUEL = {
  "Bel'Veth":2,"Diana":1,"Ekko":0,"Elise":2,"Evelynn":0,"Graves":2,"Kayn":1,"Kha'Zix":2,"Kindred":2,"Lee Sin":2,
  "Naafiri":2,"Nidalee":2,"Nocturne":1,"Rengar":2,"Shaco":1,"Talon":1,"Viego":2,"Wukong":2,
  "Briar":2,"Jax":1,"Master Yi":0,"Olaf":2,"Qiyana":1,"Shyvana":0,"Trundle":2,"Udyr":2,"Vi":1,"Xin Zhao":2,
  "Amumu":0,"Hecarim":1,"Jarvan IV":1,"Maokai":1,"Nunu & Willump":0,"Rammus":1,"Rek'Sai":2,"Sejuani":0,"Skarner":1,"Volibear":2,"Warwick":2,"Zac":0,
  "Brand":1,"Fiddlesticks":0,"Gragas":1,"Ivern":0,"Karthus":1,"Lillia":1,"Morgana":0,"Taliyah":1,"Zyra":1
};

// What each enemy jungler wants to do to you (tldr threat clause).
const ENEMY_GANK = {
  "Bel'Veth":"out-pace your first clear, snowball Void Coral off early Heralds, and run you down with dash resets the moment she senses a health lead",
  "Diana":"power-farm to her Moonlight spike, then burst you in fog with Q-E pulls around objective pits",
  "Ekko":"farm safely to his item spikes and use Phase Dive picks plus Chronobreak to erase any mistake you punish",
  "Elise":"cocoon-pick you in river brush before level 6 and convert her early dueling edge into deep invades on your second buff",
  "Evelynn":"farm invisibly to level 6, then charm-execute you mid-clear whenever your health dips below half",
  "Graves":"out-trade you with auto-cancel burst, push you off scuttle, and strip your camps the moment you path away",
  "Kayn":"farm transform stacks off your skirmishes, ambush through walls, and pick whichever form punishes your team hardest",
  "Kha'Zix":"isolate you on a buff, burst you with evolved Q thresholds, and reset through fights you thought were already won",
  "Kindred":"kite you off every camp with Dance of Arrows, stack marks inside your own jungle, and deny your engage with Lamb's Respite",
  "Lee Sin":"win level 2-3 duels, ward-hop over your counter-engage, and convert early kills into a tempo lead before he falls off",
  "Naafiri":"run her pack through lanes for early gank tempo and burst you in side brush with assassin item spikes",
  "Nidalee":"poke you off camps with max-range spears and kite-reset cougar combos before you can ever lock her down",
  "Nocturne":"farm quietly to level 6, then delete a side laner through Paranoia darkness while you are cross-map",
  "Rengar":"ambush you from brush at full ferocity, snowball bot-side dives, and pick your carries through stealth ult",
  "Shaco":"invade your level-1 buff with boxes, cross-map gank while you contest nothing, and dodge every fight you take fairly",
  "Talon":"parkour over walls for lane ganks you cannot track and snowball mid-lane priority into objective control",
  "Viego":"win extended duels with passive resets, possess your fallen teammates, and snowball every skirmish he touches",
  "Wukong":"stat-check you in early duels with clone deception and double knock-ups around objective pits",
  "Briar":"frenzy through her camps and all-in you anywhere on the map, betting her self-healing beats your damage",
  "Jax":"scale through item spikes, dodge your key cooldowns with Counter Strike, and out-duel you from two items onward",
  "Master Yi":"farm safely to his item spikes, then Alpha-dodge your engage and run down your backline in the late game",
  "Olaf":"run you down with axes in early duels, secure every dragon with true-damage execution, and shrug off your crowd control with Ragnarok",
  "Qiyana":"burst-pick you in river brush with element-stacked combos and flip whole teamfights with wall ults",
  "Shyvana":"power-farm to dragon form, avoid all early fighting, then one-shot your mid laner with E bombs from fog",
  "Trundle":"pillar-block your escape routes, chomp your stats in extended duels, and steal the drake pit from you with Subjugate",
  "Udyr":"out-tempo your clear with stance swaps, shred you in early duels, and perma-control scuttle with Blazing Stampede",
  "Vi":"power-spike at level 6 and delete one priority target per fight with point-and-click Cease and Desist",
  "Xin Zhao":"win every early 2v2 with knock-up trades and lock you out of fights entirely with Crescent Guard",
  "Amumu":"farm AoE camps to his Sunfire spike and flip teamfights with chained double-Q curse engages",
  "Hecarim":"out-farm you with Rampage AoE, then run down lanes with Ghost-fueled Devastating Charge from level 6",
  "Jarvan IV":"win early 2v2 skirmishes with knock-up layering and trap your carries inside Cataclysm arenas",
  "Maokai":"sustain through camps with sapling tosses, root-pick you in river brush, and out-scale into an unkillable engage bot",
  "Nunu & Willump":"mirror your pathing, Consume-secure every objective you start, and snowball mid with undodgeable snowball ganks",
  "Rammus":"turtle through your duels with Defensive Ball Curl, taxi between lanes at absurd speed, and turn your own attacks against you",
  "Rek'Sai":"track you through Tremor Sense, tunnel-collapse onto your clears, and burst you with unwarded knock-up flanks",
  "Sejuani":"farm safely to her tank spikes and chain-stun your carries with Glacial Prison engages",
  "Skarner":"drag you out of your own camps with Impale, control objective pits with terrain ults, and out-tank every extended fight",
  "Volibear":"tower-dive your laners with Stormbringer, out-sustain your trades, and stat-check you in every river skirmish",
  "Warwick":"smell your low-health clears from across the map, out-sustain every duel, and suppress your carry the second a fight starts",
  "Zac":"farm passively to his tank spikes, then engage from two screens away with Elastic Slingshot onto your backline",
  "Brand":"chunk you with ability-rotation poke at every objective and stack Blaze for teamfight-wide detonations",
  "Fiddlesticks":"farm effigy-protected camps to level 6, then erase your whole team with fog-of-war Crowstorm flanks",
  "Gragas":"out-sustain your early trades with Happy Hour, body-slam picks in river, and flip your engages with Explosive Cask",
  "Ivern":"free-farm with Friend of the Forest, share your own camps with his laners, and peel your every dive with Daisy and shields",
  "Karthus":"out-farm you with Lay Waste, win raptor-pit standoffs with Defile, and execute your low-health laners cross-map with Requiem",
  "Lillia":"kite you in circles with Watch Out! Eep!, out-pace your clear, and sleep-pick your team at every objective",
  "Morgana":"clear whole camp blocks with Tormented Shadow, Black Shield away your engage, and chain-pick with Dark Binding",
  "Taliyah":"shove mid priority, burst you on Worked Ground in river skirmishes, and wall off your escape with Weaver's Wall",
  "Zyra":"seed-trap river entrances, chunk you with plant poke at scuttle, and zone entire objective pits with Stranglethorns"
};

// Enemy pressure clause for tldr opener, keyed by duel rating.
const PRESSURE = {
  2: "dictates your early routing through raw dueling threat, demanding disciplined first-clear tracking and respect at every river entrance",
  1: "applies steady early pressure that punishes sloppy positioning but cannot hard-invade you without lane backup",
  0: "poses minimal early dueling threat, letting you path on your own terms as long as you respect their gank and objective timers"
};

const ALL_ENEMIES = Object.keys(ENEMY_DUEL);
