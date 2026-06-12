// _jg-headsup-fixes.js — loaded LAST after all jg/*.js files.
// Rewrites stages 0-2 (Level 1 Clear / Level 2 Skirmish / Level 3 Route) AND stage 4
// (Level 6 Breakpoint) of every JG_DB matchup from ONE shared duel model, so that
// A-vs-B and B-vs-A are always mirror-consistent (if Yi is favored, Naafiri's page
// shows the inverse). Stage 4 labels keep each champ's ult name for flavor
// ("Highlander Favored" / "Respect Yi's R"). Stages 3, 5 (First Item — the app reads
// the item name out of that label), 6 and tldr are left as-is, except the single
// Evelynn/Kha'Zix stage-6 both-green pair which is relabeled to an amber mirror.
// Labels are tuned to the app's advTone() regexes:
//   green: champ-name | dominant/favored/peak/spike/stabilized/absolute...
//   red:   respect/danger/avoid/caution/defensive/concede...
//   amber: anything else (e.g. "Even Skirmish")
(function () {
  // ---- early-duel scores [lvl1, lvl2, lvl3], 0-10, community-consensus -------
  var S = {
    "Olaf": [9, 9, 9],
    "Udyr": [8.5, 9, 9],
    "Trundle": [8, 8.5, 9],
    "Warwick": [8, 8.5, 8.5],
    "Xin Zhao": [7.5, 8.5, 8.5],
    "Lee Sin": [7, 8, 8.5],
    "Graves": [7, 7.5, 8],
    "Bel'Veth": [6.5, 7.5, 8],
    "Briar": [6.5, 7.5, 8.5],
    "Volibear": [7, 7.5, 8],
    "Rek'Sai": [7, 7.5, 8],
    "Shaco": [7, 7.5, 7],
    "Rengar": [6.5, 7, 7.5],
    "Wukong": [6, 6.5, 7],
    "Nidalee": [5.5, 6.5, 7],
    "Kha'Zix": [5.5, 6.5, 7],
    "Kindred": [5.5, 6.5, 7],
    "Viego": [5.5, 6.5, 7],
    "Jarvan IV": [5.5, 6.5, 7],
    "Vi": [5.5, 6, 6.5],
    "Nocturne": [5.5, 6, 6.5],
    "Naafiri": [5.5, 6, 6.5],
    "Jax": [5.5, 6, 6.5],
    "Hecarim": [5, 5.5, 6],
    "Skarner": [5, 5.5, 6],
    "Gragas": [5, 5.5, 6],
    "Qiyana": [5, 5.5, 6],
    "Talon": [5, 5.5, 6],
    "Brand": [5, 5.5, 5.5],
    "Elise": [4.5, 6, 8.5],
    "Kayn": [4.5, 5, 5.5],
    "Taliyah": [4.5, 5, 5.5],
    "Zyra": [4.5, 5, 5.5],
    "Lillia": [4, 4.5, 5.5],
    "Diana": [4, 4.5, 5.5],
    "Master Yi": [4, 4.5, 5],
    "Ekko": [4, 4.5, 5],
    "Maokai": [4, 4.5, 5],
    "Nunu & Willump": [3.5, 4, 4.5],
    "Rammus": [3.5, 4, 5],
    "Sejuani": [3.5, 4, 4.5],
    "Karthus": [3, 3.5, 4],
    "Amumu": [3, 3.5, 4],
    "Zac": [3, 3.5, 4],
    "Shyvana": [3, 3.5, 4],
    "Morgana": [3, 3.5, 4],
    "Evelynn": [2.5, 3, 3.5],
    "Fiddlesticks": [2.5, 3, 3.5],
    "Ivern": [2, 2.5, 3]
  };

  // ---- level-6 ult-on duel scores (index 3 of score model) --------------------
  var S6 = {
    "Bel'Veth": 9, "Olaf": 8.5, "Trundle": 8.5, "Master Yi": 8.5, "Shyvana": 8.5,
    "Evelynn": 8.5, "Udyr": 8, "Warwick": 8, "Xin Zhao": 8, "Jax": 8, "Diana": 8,
    "Fiddlesticks": 8, "Lee Sin": 7.5, "Graves": 7.5, "Briar": 7.5, "Volibear": 7.5,
    "Rek'Sai": 7.5, "Kha'Zix": 7.5, "Kindred": 7.5, "Viego": 7.5, "Jarvan IV": 7.5,
    "Vi": 7.5, "Nocturne": 7.5, "Skarner": 7.5, "Lillia": 7.5, "Ekko": 7.5,
    "Wukong": 7.5, "Rengar": 7, "Naafiri": 7, "Hecarim": 7, "Qiyana": 7, "Talon": 7,
    "Rammus": 7, "Sejuani": 7, "Karthus": 7, "Amumu": 7, "Shaco": 6.5, "Gragas": 6.5,
    "Brand": 6.5, "Kayn": 6.5, "Zyra": 6.5, "Maokai": 6.5, "Zac": 6.5, "Morgana": 6.5,
    "Nidalee": 6, "Elise": 6, "Taliyah": 6, "Nunu & Willump": 6, "Ivern": 6
  };

  // ---- pairwise modifiers (applied symmetrically by score()) ------------------
  var AD_AA = {}; // auto-attack-reliant AD kits
  ["Master Yi", "Trundle", "Udyr", "Warwick", "Briar", "Bel'Veth", "Viego", "Kindred",
   "Xin Zhao", "Wukong", "Olaf", "Volibear", "Nocturne", "Vi", "Rek'Sai", "Rengar",
   "Graves", "Shaco", "Jax"].forEach(function (n) { AD_AA[n] = 1; });
  var NO_DASH_MELEE = {}; // gap-close-less melee that Lillia kites
  ["Trundle", "Udyr", "Olaf", "Volibear"].forEach(function (n) { NO_DASH_MELEE[n] = 1; });

  function score(a, b, i) {
    var v = i === 3 ? (S6[a] != null ? S6[a] : 5) : (S[a] || [5, 5, 5])[i];
    if (a === "Rammus" && AD_AA[b]) v += 2.5;     // W reflect + taunt vs auto-attackers
    if (a === "Jax" && AD_AA[b]) v += 0.75;        // Counter Strike dodges autos
    if (a === "Lillia" && NO_DASH_MELEE[b] && i < 3) v += 1.5; // perma-kite (pre-6 only — Ragnarok/Stormbringer answer it)
    return v;
  }

  // ---- per-champ phrase tables -------------------------------------------------
  // plan: what THIS champ does at lvl 1/2/3 (used when even or ahead)
  // threat: what makes this champ scary (used in the OPPONENT's text when behind)
  // tool: how to play around this champ (used in the OPPONENT's text when behind)
  var P = {
    "Olaf": { plan: [
        "Undertow (Q) spam clears fast and chunks anyone who contests your buff",
        "Vicious Strikes (W) sustain means you leave every camp healthier than they do",
        "full Q-W-E with Reckless Swing true damage means nobody on the roster out-brawls this"],
      threat: "Undertow slows and Reckless Swing true damage win every extended exchange",
      tool: "Keep a wall or camp between you and the axe line and never fight inside his slow" },
    "Udyr": { plan: [
        "a double stance point gives an instant trade pattern most junglers can't answer",
        "Blazing Stampede's stun plus Wingborne Storm shred wins any straight fight",
        "four stance points are online and your awakened trades hit their hardest window"],
      threat: "Blazing Stampede's stun-lock into awakened stance damage runs you down in a straight line",
      tool: "Pre-position toward your tier-two side and dodge the first stun engage" },
    "Trundle": { plan: [
        "Chomp (Q) steals AD on hit, so your level-1 trade is rigged in your favor",
        "Frozen Domain (W) attack speed makes your buff-pit duel one of the best in the game",
        "Pillar (E) cuts the escape; with Q AD-steal and W haste the duel is yours"],
      threat: "Chomp steals your AD mid-fight and Pillar traps you inside his Frozen Domain",
      tool: "Refuse extended trades in his W zone and save your dash until after Pillar lands" },
    "Warwick": { plan: [
        "Eternal Hunger sustain means you win any fight where both sides arrive off full camps",
        "Blood Hunt (W) attack speed plus Q healing out-sustains every trade pattern",
        "Primal Howl (E) damage reduction caps an early kit with no real counter-trade"],
      threat: "Q sustain and Blood Hunt frenzy out-heal your damage the moment you drop below half",
      tool: "Never fight him while low — his W tracks your blood trail; disengage above 50%" },
    "Xin Zhao": { plan: [
        "Three Talon Strike's knock-up plus passive healing wins the first buff-pit duel",
        "Wind Becomes Lightning (W) challenge poke starts trades you finish for free",
        "the full knock-up combo with W slow is among the top three level-3 duels"],
      threat: "the W challenge into Three Talon Strike knock-up chains you down before you can answer",
      tool: "Respect the river bushes and disengage before the third Q hit lands" },
    "Lee Sin": { plan: [
        "Flurry-weaving between Q casts gives a level-1 trade few champions match",
        "the second skill point doubles your trade pattern — Q-W or Q-E both chunk hard",
        "the full E-slow, Q-execute, W-shield kit is at its proportionally strongest point"],
      threat: "Sonic Wave re-cast plus Flurry resets delete half your HP in one rotation",
      tool: "Stand behind your camp so Q can't connect clean, and don't burn your dash early" },
    "Graves": { plan: [
        "End of the Line plus knockback autos shred melees holding a buff pit",
        "Quickdraw (E) True Grit armor stacking lets you out-trade in tight jungle lanes",
        "Smoke Screen's blind caps a kit that wins almost every close-quarters exchange"],
      threat: "True Grit armor plus point-blank double-shot autos win any close-range brawl",
      tool: "Fight him in the open where his pellets spread, never inside a tight buff pit" },
    "Bel'Veth": { plan: [
        "Void Surge dashes make your trades untouchable against slower kits",
        "Above and Below's knock-up sets up a free trade window on cooldown",
        "all four dash directions plus the W knock-up make the extended duel yours"],
      threat: "true-damage Lavender stacks and quadruple dashes out-scale every extra second of a fight",
      tool: "Trade in short bursts only — extended fights feed her passive stacks" },
    "Briar": { plan: [
        "Head Rush's stun gives a clean engage trade at the first buff contest",
        "Blood Frenzy sustain turns level-2 skirmishes into races she usually wins",
        "frenzy healing plus charged Chilling Scream is one of the hardest level-3 all-ins"],
      threat: "Blood Frenzy lifesteal out-heals your full combo once she commits",
      tool: "Disengage cleanly or finish her — half-measures just feed her frenzy healing" },
    "Volibear": { plan: [
        "Frenzied Maul bite trades plus passive attack speed win the buff-pit brawl",
        "Sky Splitter's shield-plus-slow makes your short trades strictly better",
        "Q stun, W reset bite and E shield form a complete early brawling kit"],
      threat: "the Q stun into stacked W bites chunks harder the longer the fight runs",
      tool: "Break line of sight before his Q reaches you and never re-engage into the E shield" },
    "Rek'Sai": { plan: [
        "Fury-fueled Q autos clear fast and win the first raptor fight",
        "the Unburrow knock-up gives a free engage on anyone walking your tunnels",
        "the full tunnel network plus knock-up means you dictate where every fight starts"],
      threat: "an Unburrow knock-up from an unseen tunnel starts every fight on her terms",
      tool: "Ward her tunnel entrances — if you can't see the burrow line, don't walk the river" },
    "Shaco": { plan: [
        "pre-placed Jack in the Boxes turn your level-1 'duel' into a 3-versus-1",
        "Deceive's backstab plus box damage wins any fight near your stacked bushes",
        "boxes plus the E slow keep this exchange yours whenever you choose the bush"],
      threat: "stacked Jack in the Boxes plus a Deceive backstab make bush fights unwinnable",
      tool: "Never fight in unwarded bushes early — drag every contest onto open ground" },
    "Rengar": { plan: [
        "a brush-side Savagery leap is the hardest level-1 opener in the jungle",
        "Battle Roar's heal plus ferocity stacking wins extended buff fights",
        "a 4-ferocity empowered Q already one-shots squishier junglers near any bush"],
      threat: "a brush-leap empowered Savagery removes half your HP before you can react",
      tool: "Hug the centre of corridors away from brush — his entire kit needs a bush to function" },
    "Nidalee": { plan: [
        "max-range Javelin poke decides who enters the scuttle fight healthy",
        "Pounce-reset cat clears let you out-tempo and kite the slower kits",
        "the spear-hunt-pounce execute pattern wins any fight you start at range"],
      threat: "a max-range Javelin into the Hunt pounce executes you before the fight even starts",
      tool: "Keep a camp between you and her spear line — the Javelin is the whole matchup" },
    "Kha'Zix": { plan: [
        "isolation-bonus Taste Their Fear chunks anyone who face-checks alone",
        "Void Spike's heal-poke wins the slow trade war at river entrances",
        "iso Q damage at level 3 already deletes squishier junglers caught solo"],
      threat: "the isolation bonus on Taste Their Fear hits like a truck whenever you're caught alone",
      tool: "Stay near camps or minions to deny the isolation bonus — it halves his damage" },
    "Kindred": { plan: [
        "Dance of Arrows kiting beats melee kits that can't close the gap",
        "Wolf's Frenzy plus Q resets let you skirmish from untouchable range",
        "with three dashes banked you kite backwards and win every disengage fight"],
      threat: "Dance of Arrows kiting means you never actually touch her while she shreds you",
      tool: "Commit only with a hard gap-close ready — chasing her through camps is a lost race" },
    "Viego": { plan: [
        "the Blade of the Ruined King passive sustains you through attrition trades",
        "Spectral Maw's stun threat forces them to trade into your W or back off",
        "the stun-into-Q-reset pattern is a strong duel and stronger off any takedown"],
      threat: "a Spectral Maw stun into Q sustain-resets snowballs the fight off the first landed hit",
      tool: "Dodge the Maw charge-up — without the stun his early all-in falls flat" },
    "Wukong": { plan: [
        "Crushing Blow plus double-Q armor shred wins the opening exchange",
        "the Warrior Trickster clone baits their cooldowns and wins the re-engage",
        "clone plus Nimbus Strike means you control when the fight starts and ends"],
      threat: "the clone bait into a Nimbus Strike re-engage wins both halves of the trade",
      tool: "Hold your key cooldown until the real Wukong commits — the clone deals no ability damage" },
    "Jarvan IV": { plan: [
        "Dragon Strike's flag-toss poke chips anyone holding a buff pit",
        "the E-Q knock-up gives a clean engage-disengage trade most kits can't answer",
        "the full flag-drag combo plus Golden Aegis shield is a flexible level-3 duel"],
      threat: "the E-Q flag knock-up starts the fight on his terms and the Aegis shield finishes it",
      tool: "Stand off-angle from his flag line and the whole engage pattern whiffs" },
    "Vi": { plan: [
        "Vault Breaker charge poke plus the Blast Shield wins the first short trade",
        "Denting Blows shred starts beating slower kits in extended exchanges",
        "the full charge-engage with W shred is a clean, honest duel you slightly favor"],
      threat: "a charged Vault Breaker opens with a knock-back trade you can't refuse",
      tool: "Juke the Q charge behind camp walls — her pattern resets slowly when it misses" },
    "Nocturne": { plan: [
        "Umbra Blades' AoE sustain clears fast and wins the raptor-pit brawl",
        "Duskbringer's trail damage plus speed wins straight-line trades",
        "the fear-tether threat tilts every river skirmish in your favor"],
      threat: "Unspeakable Horror's fear tether turns any extended trade into a lost one",
      tool: "Dash out of the tether's leash range the instant it attaches — never tank the fear" },
    "Naafiri": { plan: [
        "packmates plus the Darkin Daggers bleed win the level-1 numbers game",
        "the Hounds' Pursuit dash trade chunks anyone contesting your second buff",
        "the full pack with W dash and Q reset bleed is a real early kill threat"],
      threat: "double Darkin Daggers bleed plus the packmate swarm wins raw early exchanges",
      tool: "Clear the packmates first — her damage collapses once the hounds are down" },
    "Jax": { plan: [
        "Leap Strike trades onto anyone who steps up to contest your camp",
        "Counter Strike dodges camp autos and stuns whoever commits into you",
        "the Empower-Leap burst plus E stun favors you into any auto-attacker"],
      threat: "Counter Strike dodges your autos and answers with a stun-leap burst",
      tool: "Wait out the two-second dodge window before you swing — never auto into the spin" },
    "Hecarim": { plan: [
        "Rampage spam clears quickly and stacked Q wins camp-side trades",
        "Spirit of Dread sustain plus Q stacks wins the attrition fight",
        "the Devastating Charge knock-back engage rounds out a solid skirmish kit"],
      threat: "stacked Rampage spam plus the E charge knock-back wins fights that start at his pace",
      tool: "Trade when his Q stacks have dropped — off-stack Hecarim hits half as hard" },
    "Skarner": { plan: [
        "Shattered Earth boulder poke chips contests from range",
        "Seismic Bastion shield trades plus the boulder slow win short exchanges",
        "the Ixtal's Impact wall-stun threat makes corridor fights yours"],
      threat: "an E charge through a wall into the boulder combo stuns you for the whole fight",
      tool: "Fight in open spaces — every jungle wall near him is a stun waiting to happen" },
    "Gragas": { plan: [
        "Barrel Roll poke plus passive sustain wins the slow first trade",
        "Drunken Rage damage reduction makes your short trades strictly efficient",
        "the Body Slam stun engage completes a surprisingly strong early brawl kit"],
      threat: "a Body Slam stun into barrel burst wins any trade he starts",
      tool: "Sidestep the E line — without the slam connecting his early damage is modest" },
    "Qiyana": { plan: [
        "river-element Q poke chips anyone pathing through mid-jungle",
        "Terrashape-empowered autos win short trades near your element",
        "brush-element stealth Q sets up ambush trades entirely on your terms"],
      threat: "a brush-empowered Edge of Ixtal ambush chunks you before you ever see her",
      tool: "Track which element she's holding — river slow and brush stealth define her threat" },
    "Talon": { plan: [
        "the Noxian Diplomacy bleed wins short trades at shared entrances",
        "Rake's return damage makes mid-range poke trades free for you",
        "wall-hop pathing means you only pick fights when the numbers favor you"],
      threat: "the Q-W bleed burst plus wall-hop angles start fights you never saw coming",
      tool: "Ward the over-wall paths — his burst needs surprise to actually finish the job" },
    "Brand": { plan: [
        "the Sear into Conflagration point-click burst wins the level-1 stat check",
        "ablaze combo poke chunks half a health bar through a wall",
        "the full E-Q stun rotation is your burst window before sustain kits stabilize"],
      threat: "the E-Q ablaze stun rotation removes half your HP in a single combo",
      tool: "Spread off camp monsters so Conflagration can't bounce, and flinch the Q stun line" },
    "Elise": { plan: [
        "human-form poke is real but the kill threat isn't online yet — trade, don't all-in",
        "Cocoon plus spiderling damage starts winning straight fights",
        "the famous level-3 spike: Cocoon, Rappel, full spider burst — the strongest duel window in the game"],
      threat: "Cocoon into spider-form burst plus Rappel untargetability wins the level-3 window outright",
      tool: "Sidestep the Cocoon and her whole pattern fails — track her, don't coin-flip the stun" },
    "Kayn": { plan: [
        "Reaping Slash resets clear fast, but pre-form trades are modest — pick your spots",
        "W poke from range builds orbs without risking the formless early kit",
        "E ghost-walk lets you choose every engagement angle even while raw stats lag"],
      threat: "wall-phase angles let him start and leave fights entirely at will",
      tool: "He's formless and weak right now — force fights before his orbs come in" },
    "Taliyah": { plan: [
        "Threaded Volley on worked ground still chunks melee contests",
        "boulder-field poke plus the W shove keeps duels at your range",
        "the W-into-Q burst combo plus E mine field wins fights at choke points"],
      threat: "a W toss into a stunning boulder field bursts you at every choke point",
      tool: "Don't chase her across worked ground — the mine slow turns retreats into kills" },
    "Zyra": { plan: [
        "plant pressure makes your buff pits expensive to contest",
        "the E root into seeded plants wins any fight near your garden",
        "double-seed combos turn river chokes into kill zones"],
      threat: "a Grasping Roots snare into spitting plants melts you where you stand",
      tool: "Kill the seeds on sight and never take a fight inside her planted garden" },
    "Lillia": { plan: [
        "the Blooming Blows true-damage edge clears fast — kite, don't brawl",
        "Watch Out! Eep! center-hits plus passive speed kite melee kits apart",
        "dream-dust uptime plus W nukes out-pace anything without a dash"],
      threat: "perma-kiting with passive move speed and the true-damage Q edge means melee never touch her",
      tool: "Commit only with hard CC or a gap-closer in hand — a raw chase is a lost race" },
    "Diana": { plan: [
        "Crescent Strike poke is real, but hold the all-in until your combo completes",
        "Pale Cascade shield trades let you skirmish evenly with most kits",
        "the Q-dash-W full combo comes online — your first genuine kill window"],
      threat: "a landed Crescent Strike into the dash-shield combo trades very hard at three",
      tool: "Punish her before level 3 — the kit is incomplete and her dash needs the Q mark" },
    "Master Yi": { plan: [
        "Alpha Strike speeds your clear, but raw duels are losers — farm, don't fight",
        "Wuju Style helps the clear more than the duel; keep choosing camps over combat",
        "Meditate buys time but wins nothing — your game starts at level six, not three"],
      threat: "Alpha Strike untargetability dodges your key spell and Wuju true damage wins long trades",
      tool: "Hold your main ability until Alpha ends, and force fights before his items arrive" },
    "Ekko": { plan: [
        "Timewinder poke chips contests, but the early all-in isn't there yet",
        "Phase Dive hit-and-run trades are decent — pick spots, avoid straight duels",
        "Parallel Convergence stun setups give you your first real pick threat"],
      threat: "a triggered Parallel Convergence stun into passive burst is his entire kill script",
      tool: "Step off the W ring the moment it draws and his early kill threat disappears" },
    "Maokai": { plan: [
        "Sapling Toss bush-bombs poke contests for free",
        "Twisted Advance root trades keep skirmishes on your schedule",
        "Bramble Smash knock-back plus the W root is a solid pick kit, not a stat-check"],
      threat: "Twisted Advance's untargetable root locks you down for the counter-trade",
      tool: "His damage is front-loaded CC, not DPS — dodge saplings and out-trade after the root" },
    "Nunu & Willump": { plan: [
        "Consume chunks monsters, not champions — clear safe and protect objectives",
        "the snowball is gank pressure, not duel pressure; keep avoiding the 1v1",
        "you still don't win duels — convert W ganks and smite fights instead"],
      threat: "the Biggest Snowball Ever arrives as a knock-up gank, and Consume cheats every smite fight",
      tool: "Never let an objective reach smite range with him alive nearby — he duels poorly otherwise" },
    "Rammus": { plan: [
        "Defensive Ball Curl turns auto-attackers' trades against them, literally",
        "Powerball engage plus the thornmail passive wins fights AD kits start",
        "the taunt-lock plus W reflect means auto-reliant junglers cannot win this"],
      threat: "Defensive Ball Curl plus the taunt means every auto you throw damages you back",
      tool: "Stop attacking during his W — wait out the curl's duration, then trade" },
    "Sejuani": { plan: [
        "Arctic Assault is engage utility, not duel damage — clear and path for ganks",
        "Permafrost trades are workable but you don't out-damage real duelists yet",
        "your kit wins ganks and team skirmishes, not raw buff-pit 1v1s"],
      threat: "the Arctic Assault knock-up into a Permafrost stun chains you into her gank follow-up",
      tool: "She can't duel without the stun chain — dodge the Q engage and trade freely" },
    "Karthus": { plan: [
        "Lay Waste melts camps at record pace — your power is tempo, not duels",
        "Wall of Pain slows cover your disengage; keep refusing the 1v1",
        "your clear speed is the weapon — stay two camps ahead and never fight fair"],
      threat: "isolated Lay Waste double-damage adds up fast if you stand in his Defile zone",
      tool: "Close the gap immediately — at melee range his Q damage halves and he folds" },
    "Amumu": { plan: [
        "Despair tank stats clear fine, but champion duels are losers — farm safe",
        "Bandage Toss is your gank tool, not a duel-winner; avoid the river fights",
        "your stun is for ganks — keep refusing 1v1s until items arrive"],
      threat: "a Bandage Toss stun into Tantrum spam wears you down inside his Despair aura",
      tool: "Sidestep the bandage line — without the stun connecting he has no kill threat" },
    "Zac": { plan: [
        "blob sustain keeps your clear healthy, but champion trades are losers",
        "Elastic Slingshot is for ganks — charge it from fog, never into duels",
        "stay a gank threat, not a duelist; your E from fog wins lanes, not buff pits"],
      threat: "a fog-charged Elastic Slingshot knock-up opens a gank-grade engage onto you",
      tool: "Ward the walls he charges from and step on his blobs to starve the sustain" },
    "Shyvana": { plan: [
        "Burnout clears beautifully — bank the tempo and refuse every fight",
        "Twin Bite trades are below-rate; keep power-farming toward dragon form",
        "you are a farm machine until six — let your clear speed be the duel"],
      threat: "Burnout-stacked clear speed lets her out-farm and out-scale your early pressure",
      tool: "Invade her early and often — she has no CC and no escape before six" },
    "Morgana": { plan: [
        "the W camp-melt is elite tempo; champion fights are not — clear and bank it",
        "Dark Binding is gank bait, not duel material; refuse the river 1v1",
        "Black Shield protects a teammate's gank — your duel stats remain poor"],
      threat: "a three-second Dark Binding root in a jungle corridor is a death sentence",
      tool: "Track the Q cooldown — once Binding whiffs she has nothing to stop you" },
    "Evelynn": { plan: [
        "pre-stealth Evelynn is the weakest level-1 champion in the jungle — farm hidden",
        "keep clearing cross-map; every avoided fight is a won fight right now",
        "survive to six — Demon Shade camouflage flips this entire matchup later"],
      threat: "her early duel is a bluff, but Allure charm setups punish brush face-checks",
      tool: "Invade her relentlessly before six — she cannot contest and loses every straight fight" },
    "Fiddlesticks": { plan: [
        "effigy bluffs and Bountiful Harvest keep your clear healthy — never fight",
        "Terrify plus the Harvest drain only trades okay if they fully commit into you",
        "your game is the level-6 Crowstorm flank, not any fight before it"],
      threat: "Terrify plus a full Bountiful Harvest channel drains you dry if you commit into him",
      tool: "Interrupt the W drain with any damage and he crumbles — the easiest early invade target" },
    "Ivern": { plan: [
        "Friend of the Forest farms without fighting — mark camps and stay invisible",
        "Brushmaker poke from your own brush is your only legal trade",
        "Triggerseed's root protects your escape; you never want the 1v1"],
      threat: "he won't fight you — but a Triggerseed root into his laner's follow-up will",
      tool: "Steal the camps he's marked at half-clear and there is nothing he can do about it" }
  };

  // ---- text builders ------------------------------------------------------------
  var LVL = ["level 1", "level 2", "level 3"];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function low(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

  function buildStage(a, b, i) {
    if (a === b) return { adv: "Even Skirmish",
      why: "Mirror matchup — identical kits on identical timers. Whoever finishes camps first and arrives with the HP lead wins; trade only when both bars and cooldowns agree with you." };
    var d = score(a, b, i) - score(b, a, i);
    var pa = P[a], pb = P[b];
    var v = hash(a + "|" + b + "|" + i) % 2;
    var plan = pa.plan[i], threat = pb.threat, tool = pb.tool;
    if (d >= 2.25) return { adv: a + " Dominant", why: v === 0
      ? cap(plan) + ". " + b + "'s answer simply isn't there at " + LVL[i] + " — if you cross paths at a buff or scuttle, take the fight. Make them path away and tax the camps they leave behind."
      : cap(plan) + ". There is no version of this exchange " + b + " wins right now, so play the aggressor: show on their side of the river and force the concession." };
    if (d >= 0.5) return { adv: a + " Favored", why: v === 0
      ? cap(plan) + ". " + b + " can make this awkward but loses the straight exchange — take short, decisive trades and keep the scuttle line yours."
      : cap(plan) + ". You hold the edge over " + b + " here, not a blowout — commit only when the camp state and HP bars agree with you." };
    if (d > -0.5) return { adv: "Even Skirmish", why: v === 0
      ? "Dead-even window: " + low(plan) + ", while " + low(threat) + ". Whoever arrives with more HP and cooldowns wins — track their clear and choose the moment, not the coin-flip."
      : "Neither side cleanly wins " + LVL[i] + " — " + low(threat) + ", but " + low(plan) + ". Trade only from full health; the first mis-step decides this, not the kits." };
    if (d > -2.25) return { adv: "Respect " + b, why: v === 0
      ? "At " + LVL[i] + " this window belongs to " + b + ", not " + a + ": " + low(threat) + ". " + cap(tool) + ". Concede the first scuttle if they show and bank tempo on the opposite side of the map."
      : cap(threat) + " — " + a + " should not pretend otherwise at " + LVL[i] + ". " + cap(tool) + ", and answer their pressure cross-map instead of contesting it head-on." };
    return { adv: "Danger — Avoid " + b, why: v === 0
      ? "Hard no-contest for " + a + ": " + low(threat) + ", and at " + LVL[i] + " you lose this fight every single time. " + cap(tool) + ". Path opposite, ward your entrances, and let the clock carry you to your own spike."
      : cap(threat) + ". At " + LVL[i] + " this is a lose-every-time stat check for " + a + " — " + low(tool) + ", and give the entire river vision-line respect." };
  }

  // ---- level-6 ult phrase table --------------------------------------------------
  // ult: display name used in stage-4 labels (must contain no advTone keywords)
  // plan: own page when ahead · threat: enemy's R described to you · tool: counterplay
  var U = {
    "Olaf": { ult: "Ragnarok", plan: "Ragnarok's CC immunity turns every post-6 skirmish into a stat check you win", threat: "Ragnarok makes him immune to every form of crowd control while he runs you down", tool: "kite out the ult's duration before committing — he has no gap-closer once it ends" },
    "Udyr": { ult: "Stance Mastery", plan: "awakened stance rotations on four points hit harder than most actual ultimates", threat: "awakened Blazing Stampede chains stuns faster than your cooldowns recover", tool: "break the chase with walls — his power is point-blank and he cannot force the fight" },
    "Trundle": { ult: "Subjugate", plan: "Subjugate drains max health and resists, rigging any extended duel in your favor", threat: "Subjugate steals your health and resists and beats you with your own stats", tool: "disengage the moment the drain lands — deny the follow-up while the stolen stats decay" },
    "Warwick": { ult: "Infinite Duress", plan: "Infinite Duress suppression plus Blood Hunt frenzy ends any duel that starts below full", threat: "Infinite Duress suppresses you through the fight while his sustain out-lasts your burst", tool: "hold a dash or hard CC for the R leap — it is interruptible mid-flight" },
    "Xin Zhao": { ult: "Crescent Guard", plan: "Crescent Guard makes the 1v1 literal — outside help is deleted from your duel", threat: "Crescent Guard isolates you from your team and wins the resulting 1v1", tool: "fight him with numbers before the R cast or poke the duel down from range" },
    "Lee Sin": { ult: "Dragon's Rage", plan: "the Dragon's Rage kick into a Q re-cast adds real burst to an already complete kit", threat: "the R kick into Q execute turns a half-health state into a kill window", tool: "keep your back to open space — the wall-slam follow-up is where the damage lives" },
    "Graves": { ult: "Collateral Damage", plan: "Collateral Damage adds a dash-reset execute to your close-range shred", threat: "the R execute plus True Grit armor closes out any trade he starts ahead", tool: "respect the burst threshold and fight him in the open, never the pit" },
    "Bel'Veth": { ult: "Endless Banquet", plan: "true form turns every objective fight into a feeding frenzy — force them on spawn", threat: "true-form Bel'Veth out-duels everything once she banks a Void coral", tool: "deny the coral procs — fight her before the transformation, not after" },
    "Briar": { ult: "Certain Death", plan: "Certain Death picks the target and the frenzy finishes it — your all-in has no half-measure", threat: "Certain Death locks onto you from across the screen with a self-fearing all-in", tool: "peel her with CC mid-frenzy — she cannot disengage her own ultimate" },
    "Volibear": { ult: "Stormbringer", plan: "the Stormbringer drop plus bonus health wins any fight near a contested pit", threat: "the Stormbringer leap adds a tower-disabling slab of stats to an already strong brawl", tool: "spread off the landing zone and kite the slow out before re-engaging" },
    "Rek'Sai": { ult: "Void Rush", plan: "Void Rush executes anyone you have prey-marked — chunk first, then commit", threat: "Void Rush's untargetable execute finishes any trade that drops you low", tool: "stay above execute range — a marked duel at half HP is already over" },
    "Shaco": { ult: "Hallucinate", plan: "the Hallucinate clone bait eats their key cooldown and doubles your damage", threat: "the clone bait eats your key cooldown, then both Shacos collect the kill", tool: "track which Shaco holds camp aggro — the clone takes extra damage and deals less" },
    "Rengar": { ult: "Thrill of the Hunt", plan: "Thrill of the Hunt opens every fight with an unanswerable stealth leap", threat: "a stealthed R leap opens the fight with a full-ferocity burst you never see coming", tool: "hug control wards when his R pings the map — the reveal radius is your only warning" },
    "Nidalee": { ult: "Form Mastery", plan: "seamless form-swapping makes the spear-hunt-pounce execute loop relentless", threat: "the spear-into-pounce execute loop gets a full extra rotation at six", tool: "the matchup is still the Javelin — deny the poke and the all-in never starts" },
    "Kha'Zix": { ult: "Evolution", plan: "your first evolution means isolated targets simply die — hunt the side brushes", threat: "evolved isolation damage deletes you the moment you are caught alone", tool: "shadow your camps and allies — isolation is a choice you can refuse him" },
    "Kindred": { ult: "Lamb's Respite", plan: "Lamb's Respite un-loses fights — take aggressive duels knowing the floor is undeath", threat: "Lamb's Respite denies your kill at the last second and flips the reset fight", tool: "hold your finishing damage until the Respite expires, or step outside its circle" },
    "Viego": { ult: "Heartbreaker", plan: "the Heartbreaker execute into a possession reset snowballs one kill into two", threat: "the Heartbreaker execute into possession resets snowballs any skirmish he wins", tool: "never fight him over a dying teammate — possession is where this is lost" },
    "Jarvan IV": { ult: "Cataclysm", plan: "Cataclysm cages the duel on your terms — flag-drag in and wall them off", threat: "the flag knock-up into the Cataclysm cage traps you in an arena he chose", tool: "save a dash to vault the terrain or fight where help arrives inside the cage" },
    "Vi": { ult: "Cease and Desist", plan: "Cease and Desist is point-click lockdown — your engage can no longer be juked", threat: "her R is undodgeable lockdown that chains into the full shred combo", tool: "you cannot dodge it — respect the HP threshold where the full chain kills" },
    "Nocturne": { ult: "Paranoia", plan: "Paranoia removes their map and delivers you to any duel you have already chunked", threat: "Paranoia darkens the map and delivers a fear-tether dive straight onto you", tool: "hug terrain near allies on the cast — the darkness punishes whoever stands alone" },
    "Naafiri": { ult: "The Call of the Pack", plan: "The Call of the Pack shields the dive while the hounds finish whoever you touch", threat: "the empowered pack dive shields her engage and swarms your counter-trade", tool: "burst the packmates mid-dive — her ult damage walks on four legs" },
    "Jax": { ult: "Grandmaster's Might", plan: "Grandmaster's Might resists plus Counter Strike make the extended duel unloseable", threat: "the R resists plus Counter Strike out-stat every extended exchange", tool: "trade in the gaps between his E windows and never stack autos into the dodge" },
    "Hecarim": { ult: "Onslaught of Shadows", plan: "the Onslaught fear charge opens fights with their carry running the wrong way", threat: "the R fear charge starts every fight with you running the wrong direction", tool: "spread off his charge line — the fear radius punishes clumped contests" },
    "Skarner": { ult: "Impale", plan: "Impale drags whoever steps up into your team's kill box", threat: "a multi-target Impale drag ends the fight before it starts", tool: "hold your dash for the suppression cast and never duel him between walls" },
    "Gragas": { ult: "Explosive Cask", plan: "Explosive Cask displacement decides objective fights — knock them off the pit", threat: "a Cask knock-back separates you from the objective at the worst possible moment", tool: "expect the displacement at smite timings and pre-position behind the pit wall" },
    "Qiyana": { ult: "Supreme Display of Talent", plan: "Supreme Display of Talent turns every jungle wall into a team-wide stun line", threat: "her R stuns along every wall in the jungle — your own terrain is her weapon", tool: "fight in open river spaces where the shockwave has no wall to detonate" },
    "Talon": { ult: "Shadow Assault", plan: "Shadow Assault stealth plus converging blades burst anyone you touch", threat: "the R stealth burst plus wall-hops mean the fight starts when he says it does", tool: "sweep your jungle entrances — his burst needs the surprise angle to kill clean" },
    "Brand": { ult: "Pyroclasm", plan: "Pyroclasm bounces win every 2v2 — drag skirmishes toward your laners", threat: "Pyroclasm bounces melt any fight you take near teammates", tool: "split off your allies when it is up — the bounce needs a second body" },
    "Elise": { ult: "Spider Form", plan: "your spike came at three — spend the lead now, before real ultimates out-scale Cocoon picks", threat: "Cocoon picks plus Rappel untargetability still cash in any mis-step", tool: "her relative power dips at six — your ultimate out-scales hers, so force the fights she used to win" },
    "Kayn": { ult: "Umbral Trespass", plan: "Umbral Trespass plus an incoming form makes every fight a free engage rehearsal", threat: "Umbral Trespass makes him untargetable mid-fight and his form spike is arriving", tool: "end fights fast — his R buys time for cooldowns and free exits" },
    "Taliyah": { ult: "Weaver's Wall", plan: "Weaver's Wall splits the map — cut their jungle in half and take the orphaned side", threat: "Weaver's Wall cuts your retreat path and ships ganks across the map", tool: "the wall is macro, not murder — the 1v1 still loses if you dodge the boulder field" },
    "Zyra": { ult: "Stranglethorns", plan: "Stranglethorns over the root garden makes any choke a death sentence", threat: "a Stranglethorns knock-up over her plant garden deletes whoever holds the point", tool: "fight her away from her plants — the ultimate without setup is survivable" },
    "Lillia": { ult: "Lilting Lullaby", plan: "Lilting Lullaby sleeps the whole skirmish — your dream-dust damage decides it", threat: "a multi-target Lullaby sleep hands her side a free opening volley", tool: "spread out and break the sleep with planned burst, not panic autos" },
    "Diana": { ult: "Moonfall", plan: "Moonfall's vacuum pull plus the dash-reset combo one-rotations squishier junglers", threat: "the Q-dash-Moonfall rotation deletes you from full health if the orb lands", tool: "everything keys off Crescent Strike — sidestep the orb and the combo stalls" },
    "Master Yi": { ult: "Highlander", plan: "Highlander's slow immunity plus Alpha resets snowball any post-6 cleanup", threat: "Highlander makes him un-kitable and every takedown resets the chase", tool: "hard CC is the only answer — chain stuns or do not take the post-6 fight" },
    "Ekko": { ult: "Chronobreak", plan: "Chronobreak insures every dive — commit, nuke, rewind out", threat: "Chronobreak undoes your best trade and slams you with the rewind nuke", tool: "watch the hologram trail and spend your burst only after the rewind is used" },
    "Maokai": { ult: "Nature's Grasp", plan: "Nature's Grasp roots the whole river — objective fights start on your terms", threat: "a forest of roots arrives ahead of every objective contest", tool: "flank around the root wave — it is slow and dodgeable from the side" },
    "Nunu & Willump": { ult: "Absolute Zero", plan: "a fog-channeled Absolute Zero zones the entire pit — objectives are yours to dictate", threat: "a fog-channeled ult chunks everyone holding the pit at once", tool: "keep interrupt CC ready — the channel cancels and refunds nothing" },
    "Rammus": { ult: "Soaring Slam", plan: "Soaring Slam adds engage range to the taunt-and-thornmail kit autos still cannot solve", threat: "Soaring Slam drops the taunt onto you from over the wall", tool: "the rule has not changed — stop attacking during Ball Curl and walk the taunt off" },
    "Sejuani": { ult: "Glacial Prison", plan: "Glacial Prison turns any pick into a team kill — throw it at whatever your laners can reach", threat: "a cross-map Glacial Prison stun starts a fight you cannot refuse", tool: "the projectile is dodgeable — strafe the cast and her engage evaporates" },
    "Karthus": { ult: "Requiem", plan: "Requiem cashes your farm lead into cross-map kills — press R on every low gank", threat: "Requiem finishes you from anywhere — every low-HP recall is a coin flip now", tool: "base at higher HP thresholds and remember Death Defied still kills over his corpse" },
    "Amumu": { ult: "Curse of the Sad Mummy", plan: "the AoE Curse locks entire contests — bandage in when their dashes are down", threat: "a Bandage Toss into the AoE Curse locks you down for the full follow-up", tool: "the engage is two dodgeable skill-shots — respect the angle, not the mummy" },
    "Zac": { ult: "Let's Bounce!", plan: "Let's Bounce! plus the fog Slingshot starts every objective fight with their team airborne", threat: "the fog Slingshot into Let's Bounce! keeps your whole side airborne", tool: "ward his charge walls — a grounded Zac is just a sad puddle" },
    "Shyvana": { ult: "Dragon's Descent", plan: "Dragon's Descent is one of the biggest six spikes in the jungle — the farm machine just became a duelist", threat: "dragon form turns the farm bot into a stat-checking duelist mid-fight", tool: "her threat is front-loaded in fury — bait the transform, then fight the cooldown" },
    "Morgana": { ult: "Soul Shackles", plan: "Soul Shackles plus Black Shield makes 2v2s near your laners unwinnable for them", threat: "the Shackles' delayed second stun wins any fight you let run long near her", tool: "break the tether range immediately — the second proc is the kill" },
    "Evelynn": { ult: "Demon Shade", plan: "Demon Shade camouflage means you choose every post-6 fight — and they cannot", threat: "from six on she is invisible — every face-check is a charm into Last Caress", tool: "buy sweepers, hug control wards, and never path alone through her quadrant" },
    "Fiddlesticks": { ult: "Crowstorm", plan: "a fog-channeled Crowstorm flank deletes whole contests — your game starts now", threat: "a Crowstorm from unwarded fog erases half your HP before you can turn", tool: "deep wards beat him completely — the channel needs unseen seconds to land" },
    "Ivern": { ult: "Daisy!", plan: "Daisy! adds a knock-up frontline to your poke-and-root game", threat: "Daisy's knock-ups plus triggered roots make diving him expensive", tool: "kill Daisy fast or ignore her — Ivern himself still cannot fight you" },
    "Wukong": { ult: "Cyclone", plan: "double-cast Cyclone knock-ups chain into extended fights nobody out-trades", threat: "two Cyclone knock-ups mean half the fight is spent airborne", tool: "hold your answer until the clone reveals — then dodge the second spin, not the first" }
  };

  // short names for red labels ("Respect Yi's R")
  var SHORT = { "Nunu & Willump": "Nunu", "Jarvan IV": "Jarvan", "Master Yi": "Yi", "Xin Zhao": "Xin", "Lee Sin": "Lee", "Bel'Veth": "Bel'Veth", "Rek'Sai": "Rek'Sai", "Kha'Zix": "Kha'Zix" };
  function shortName(n) { return SHORT[n] || n; }

  function buildUlt(a, b) {
    if (a === b) return { adv: "Even Ult Window",
      why: "Mirror six — the same ultimate hits both sides of the river at the same minute. The spike belongs to whoever banks it first and spends it on an objective; track their level and refuse to fight a full-HP mirror with R up when yours is down." };
    var d = score(a, b, 3) - score(b, a, 3);
    var ua = U[a], ub = U[b];
    var v = hash(a + "|" + b + "|ult") % 2;
    if (d >= 2.25) return { adv: ua.ult + " Domination", why: v === 0
      ? cap(ua.plan) + ". " + b + "'s six does not answer yours — the moment both ultimates are up, force the fight on a spawning objective and make them choose between the pit and their health bar."
      : cap(ua.plan) + ". " + cap(ub.threat) + ", but in a straight post-6 duel that is not enough — you out-spike them at this breakpoint, so play the aggressor while it lasts." };
    if (d >= 0.5) return { adv: ua.ult + " Favored", why: v === 0
      ? cap(ua.plan) + ". " + cap(ub.threat) + " — respect that one window, but the six-spike comparison favors you: take the post-6 duel whenever HP bars start even."
      : cap(ua.plan) + ". You win the breakpoint against " + b + ", not the whole game — cash the advantage on the first objective after both sides hit six." };
    if (d > -0.5) return { adv: "Even Ult Window", why: v === 0
      ? "Both sixes are real: " + low(ua.plan) + ", while " + low(ub.threat) + ". Whoever lands their ultimate first wins the window — track the level race and avoid being the one caught at five and a half."
      : "Neither ultimate cleanly beats the other — " + low(ub.threat) + ", but " + low(ua.plan) + ". The breakpoint goes to whoever reaches it first with an objective on the map." };
    if (d > -2.25) return { adv: "Respect " + shortName(b) + "'s R", why: v === 0
      ? "The six-spike belongs to " + b + ", and " + a + "'s does not bridge the gap: " + low(ub.threat) + ". " + cap(ub.tool) + ". Your own ultimate is a tool here, not a trump card — spend it to escape or equalize, not to start fights."
      : cap(ub.threat) + " — " + a + " loses the straight post-6 duel. " + cap(ub.tool) + ", and shift your pressure to the side of the map their ultimate is not on." };
    return { adv: "Danger — " + shortName(b) + "'s R", why: v === 0
      ? "Hard breakpoint loss for " + a + ": " + low(ub.threat) + ", and your six does not bridge the gap. " + cap(ub.tool) + ". Treat every post-6 river fight as theirs until your items arrive."
      : cap(ub.threat) + ". At this breakpoint " + a + " simply does not duel " + b + " — " + low(ub.tool) + ", trade objectives cross-map, and let item spikes re-open the matchup." };
  }

  // ---- apply (idempotent; retry loop per project convention) ---------------------
  function apply() {
    var DB = window.JG_DB;
    if (!DB) return false;
    var touched = false;
    Object.keys(DB).forEach(function (a) {
      if (!S[a] || !P[a]) return;
      Object.keys(DB[a]).forEach(function (b) {
        if (!S[b] || !P[b]) return;
        var rep = DB[a][b];
        if (!rep || !rep.stages || rep.stages.length < 3) return;
        for (var i = 0; i < 3; i++) {
          var fix = buildStage(a, b, i);
          if (rep.stages[i].adv !== fix.adv || rep.stages[i].why !== fix.why) {
            rep.stages[i].adv = fix.adv;
            rep.stages[i].why = fix.why;
            touched = true;
          }
        }
        if (rep.stages.length > 4 && U[a] && U[b]) {
          var ufix = buildUlt(a, b);
          if (rep.stages[4].adv !== ufix.adv || rep.stages[4].why !== ufix.why) {
            rep.stages[4].adv = ufix.adv;
            rep.stages[4].why = ufix.why;
            touched = true;
          }
        }
      });
    });
    // single stage-6 both-green pair: Evelynn vs Kha'Zix at 2+ items — relabel to amber mirror
    var e1 = DB["Evelynn"] && DB["Evelynn"]["Kha'Zix"], e2 = DB["Kha'Zix"] && DB["Kha'Zix"]["Evelynn"];
    if (e1 && e1.stages[6] && e1.stages[6].adv !== "Hyper-Assassin Mirror") { e1.stages[6].adv = "Hyper-Assassin Mirror"; touched = true; }
    if (e2 && e2.stages[6] && e2.stages[6].adv !== "Hyper-Assassin Mirror") { e2.stages[6].adv = "Hyper-Assassin Mirror"; touched = true; }
    return touched;
  }

  apply();
  var ticks = 0;
  var t = setInterval(function () {
    apply();
    if (++ticks >= 24) clearInterval(t);
  }, 250);
})();
