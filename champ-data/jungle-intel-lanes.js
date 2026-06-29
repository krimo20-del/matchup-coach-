/* Per-lane enemy-jungle intel — MID and BOT point-of-view overrides.
   The base window.JUNGLE_INTEL (jungle-intel.js) is top-laner POV. This file
   redefines ONLY the lane-position-specific fields for mid and bottom; the DC
   merges base + override per role (top->base, mid->mid, bot/support->bot).
   ADC and Support both read the BOT block.

   Lane physics applied:
   - MID: central, shortest path from either jungle entrance -> ganks land
     ~20-40s EARLIER than top; gank can come from BOTH river mouths; mid champs
     are squishy so dives convert harder; ward both river entrances.
   - BOT: it's a 2v2 (ADC + Support). Bot-side scuttle / dragon pit. Timing is
     close to top, but the duo + support CC changes the math; the ADC is the
     dive target; ward tri-bush + dragon-side river.

   Override fields: start, startLabel, startTop, startLeft, startNote, clearSpeed,
   critFrom, critTo, critNote, waveState, laneTell, wardLoc, wardNote, plan.
   Everything else (name, tone, mechanics, dive/gank ratings, spike) inherits. */
window.JUNGLE_INTEL_LANE = {

  /* ============================ MID ============================ */
  mid: {
    leesin: {
      start: 'far', startLabel: 'Either-side leash (Red → river)', startTop: '64%', startLeft: '66%',
      startNote: 'Lee hits a river mouth as scuttle spawns and is one screen from mid either way — the shortest gank on the map.',
      clearSpeed: 'Reaches mid before your 2nd wave bounces — the Q-tag gank arrives the moment you step up.',
      critFrom: '2:45', critTo: '3:30', critNote: 'Mid scuttle + first gank; he can come from EITHER river, so a single ward only covers half.',
      waveState: 'Most dangerous when you shove flat and stand mid-lane with no flank vision. Don’t push past river unwarded before 3:30.',
      laneTell: 'Enemy mid holds the wave / steps to a side-brush instead of farming center — lining up the Lee Q angle from the fog.',
      wardLoc: 'Both mid river entrances (or the side you’re pushing toward)', wardNote: 'Cover the river mouth on your push side first — that’s the gank lane.',
      plan: ['Ward the river you’re pushing toward by 2:45 — the gank comes from that side.', 'Don’t shove flat and stand center unwarded before 3:30.', 'When mid scuttle dies unseen, assume he’s flanking from the dark river.']
    },
    elise: {
      start: 'far', startLabel: 'Fast either-side clear', startTop: '63%', startLeft: '68%',
      startNote: 'Hits level 3 by ~3:00 and is a screen from mid from either entrance — a pushed mid is a magnet.',
      clearSpeed: 'Level 3 by ~2:45 and looking to cocoon a squishy mid instantly.',
      critFrom: '2:30', critTo: '3:15', critNote: 'Her fastest gank window — even earlier vs mid; a 3:00 ward is already late.',
      waveState: 'Lethal when you’re pushed past river with no flank vision; the cocoon deletes a squishy mid.',
      laneTell: 'Enemy mid plays oddly aggressive at low HP or walks at you for a bad trade — the cocoon is loaded from a side-brush.',
      wardLoc: 'Mid river entrances / side-brushes', wardNote: 'Ward by 2:30 — her gank is faster than the standard clock and mid is shorter.',
      plan: ['Ward by 2:30 — mid ganks land earlier and a squishy dies to one cocoon.', 'Keep flash up and don’t cross river before you’ve seen her.', 'If enemy mid over-aggros for no reason, the cocoon is already lined up.']
    },
    jarvaniv: {
      start: 'far', startLabel: 'Either-side leash', startTop: '63%', startLeft: '67%',
      startNote: 'Clears to a river mouth; EQ flag-drag means he ganks mid through a side-wall, not just down the lane.',
      clearSpeed: 'Mid-side by ~3:00 with EQ online.',
      critFrom: '2:45', critTo: '3:30', critNote: 'Scuttle + first-gank window; the EQ closes from either side-brush.',
      waveState: 'Worst when you stand near a mid side-wall he can flag-drag over. Give the walls space.',
      laneTell: 'Enemy mid hugs a side-brush of the wave and holds — setting the EQ-over-wall angle.',
      wardLoc: 'Mid river + respect both side-walls', wardNote: 'River vision stops the flag-drag setup before it starts.',
      plan: ['Don’t hug mid side-walls when shoved — he EQs over them.', 'Ward your push-side river by 2:45.', 'Post-6 never fight inside his cage range — it traps you for the dive.']
    },
    vi: {
      start: 'far', startLabel: 'Either-side leash', startTop: '63%', startLeft: '66%',
      startNote: 'Paths to a river mouth; her charged Q closes the short mid distance through minions and walls.',
      clearSpeed: 'Mid by ~3:00.',
      critFrom: '2:45', critTo: '3:30', critNote: 'First-gank + scuttle window; mid’s short lane means the Q charge reaches you fast.',
      waveState: 'Deadly when you’re past river — the charged Q eats the gap and the R locks you down.',
      laneTell: 'Enemy mid steps up for a free trade and tanks poke — buying the half-second for Vi’s Q to charge.',
      wardLoc: 'Mid river mouths', wardNote: 'See the Q wind-up before it sees you — she must walk in to charge.',
      plan: ['Stay off mid side-walls — her Q pins you against them.', 'Ward your push-side river by 2:45.', 'Dodge on the Q charge, not the R — the ult is un-dodgeable.']
    },
    xinzhao: {
      start: 'far', startLabel: 'Either-side leash', startTop: '63%', startLeft: '67%',
      startNote: 'Clears to a river mouth and commits — his 2v2 (or 1v1 dive) into a squishy mid is decisive.',
      clearSpeed: 'Mid by ~3:00, full combo online.',
      critFrom: '2:45', critTo: '3:25', critNote: 'First-gank window; against a squishy mid his knock-up combo is a near-guaranteed kill.',
      waveState: 'Worst when shoved — his E closes instantly and a mage loses the fight outright.',
      laneTell: 'Enemy mid all-ins you at a HP deficit — they know Xin turns the fight.',
      wardLoc: 'Mid river bush (push side)', wardNote: 'Once E connects on a squishy you cannot disengage — see it first.',
      plan: ['Never fight near unseen river — his gap-close + knock-up kills a mage.', 'Ward push-side river by 2:45.', 'Hold your escape for the E, not after.']
    },
    warwick: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Clears toward whichever lane bled — a chunked mid pings his W from across the river.',
      clearSpeed: 'Mid by ~3:00, healthy.',
      critFrom: '2:45', critTo: '3:45', critNote: 'HP-based, not fixed — he comes the instant a squishy mid drops below half.',
      waveState: 'Any time you’re low — his W gives your location and move speed straight at you.',
      laneTell: 'Enemy mid trades to draw blood then backs off — pinging your HP for the Warwick W.',
      wardLoc: 'Mid river bush; re-ward after every chunk', wardNote: 'Re-ward whenever you drop below half — that’s when he comes.',
      plan: ['Never sit low without vision — his W sees you from across mid.', 'Respect a screen-wide R lockdown at 6.', 'Trade then recall — don’t linger wounded center-lane.']
    },
    wukong: {
      start: 'far', startLabel: 'Either-side leash', startTop: '63%', startLeft: '67%',
      startNote: 'Paths to a river mouth; the clone (W) fakes his approach so you can’t read which side mid he comes from.',
      clearSpeed: 'Mid by ~3:00.',
      critFrom: '2:45', critTo: '3:30', critNote: 'First-gank window — the clone can bait your flash before the real dive.',
      waveState: 'Worst when shoved — his E dash closes fast and the clone hides his real position.',
      laneTell: 'Enemy mid steps up confidently with no jungler shown — the clone is selling a fake recall.',
      wardLoc: 'Mid river mouths', wardNote: 'Confirm the REAL Wukong before you commit — the clone mirrors him.',
      plan: ['Don’t trust a “safe” back-off — it may be the clone.', 'Ward push-side river by 2:45.', 'Save your dash/flash for his E, not the clone.']
    },
    reksai: {
      start: 'far', startLabel: 'Either-side leash', startTop: '63%', startLeft: '67%',
      startNote: 'Tunnels let her surface from a mid side-wall you didn’t ward — watch the walls, not just the river.',
      clearSpeed: 'Mid by ~3:00 with tunnels placed.',
      critFrom: '2:45', critTo: '3:30', critNote: 'First-gank window; tremor sense reveals a squishy mid and the tunnel angle is hard to ward.',
      waveState: 'Worst when shoved near a side-wall she can tunnel through.',
      laneTell: 'Enemy mid holds to fight — and you feel a tremor ping (her burrowed passive reveals you).',
      wardLoc: 'Mid river + both side-walls', wardNote: 'One ward can’t cover her tunnel angles mid — play respectful.',
      plan: ['Watch BOTH mid side-walls — she tunnels in.', 'Ward by 2:45 and keep flash up.', 'Assume she knows your position when her tremor pings.']
    },
    shaco: {
      start: 'near', startLabel: 'Anywhere — box-gank mid', startTop: '52%', startLeft: '55%',
      startNote: 'Shaco can box-gank mid at level 2 from a side-brush — mid’s short lane makes the Deceive approach instant.',
      clearSpeed: 'Can be on mid at ~2:20 for a box cheese — the earliest gank on the map, and mid is closest.',
      critFrom: '2:00', critTo: '3:15', critNote: 'Earliest threat of any jungler, worse mid — play scared from minute 2.',
      waveState: 'Worst any time you’re past river or standing in an unswept mid side-brush.',
      laneTell: 'Enemy mid suddenly stops respecting trades, or you spot a Jack-in-the-Box shimmer in a side-bush.',
      wardLoc: 'Both mid side-brushes + river; carry a sweeper', wardNote: 'Sweep the side-brush before you stand in it — boxes are invisible until you’re feared.',
      plan: ['Play scared from 2:00 — he ganks a level before anyone, and mid is closest.', 'Sweep side-brushes before farming next to them.', 'Don’t cross river unwarded — Deceive hides the whole approach.']
    },
    rengar: {
      start: 'near', startLabel: 'Toward mid side-brushes', startTop: '50%', startLeft: '57%',
      startNote: 'Rengar wants an empowered leap from a mid side-brush — and mid has a brush on each side.',
      clearSpeed: 'Mid by ~2:45, hunting a brush angle.',
      critFrom: '2:30', critTo: '3:30', critNote: 'Any time he reaches an unwarded mid side-brush — two brushes to watch, not one.',
      waveState: 'Worst when you path near a mid bush without sweeping it.',
      laneTell: 'Enemy mid zones you toward a side-brush, or leaves a trade to strand you next to one.',
      wardLoc: 'BOTH mid side-brushes specifically', wardNote: 'Wards in the bushes, not just the river — that’s where he leaps from.',
      plan: ['Ward both mid bushes — he leaps from brush and mid has two.', 'Carry a sweeper; clear a bush before farming beside it.', 'If a bush is dark, treat Rengar as inside it.']
    },
    graves: {
      start: 'far', startLabel: 'Either-side fast clear', startTop: '62%', startLeft: '68%',
      startNote: 'Power-farms and counter-jungles; against mid he contests scuttle and punishes a flat shove, but ganks are opportunistic.',
      clearSpeed: 'Fast enough to contest mid scuttle, but won’t commit unless you’re catchable.',
      critFrom: '3:00', critTo: '3:45', critNote: 'Scuttle contest — if he wins mid river he has the vision to gank off it.',
      waveState: 'Punishes a hard over-extend; more counter-ganker than scripted ganker mid.',
      laneTell: 'Enemy mid plays for a long fight (not a burst combo) — expecting Graves’ sustained damage to clean up.',
      wardLoc: 'Mid river / scuttle', wardNote: 'Watch the scuttle fight — mid-river control is his gank setup.',
      plan: ['Don’t hard over-extend — his counter-gank burst deletes a mage.', 'Contest mid scuttle vision ~3:00.', 'Play short trades — you lose the long fight if he arrives.']
    },
    nidalee: {
      start: 'far', startLabel: 'Either-side fast clear', startTop: '62%', startLeft: '68%',
      startNote: 'Fastest clear in the game — she shows mid ahead of schedule and her spear out-ranges your step-up.',
      clearSpeed: 'Can be on mid before your 2nd wave — the spear hits from screen-edge.',
      critFrom: '2:30', critTo: '3:30', critNote: 'Earlier than most — her clear speed plus mid’s short lane lets her gank ahead of the clock.',
      waveState: 'Worst when you’re already chunked; healthy you side-steps the spear and the gank fizzles.',
      laneTell: 'Enemy mid pokes you down and refuses to let you recall — saving you for a Nidalee spear.',
      wardLoc: 'Mid river bush (push side)', wardNote: 'She arrives early — ward sooner than the standard 3:00.',
      plan: ['Stay healthy — her gank needs you pre-chunked.', 'Ward early (2:30); her clear is the fastest in the game.', 'Don’t stand in the open low — the spear executes from range.']
    },
    briar: {
      start: 'near', startLabel: 'Aggressive — invades or dives mid', startTop: '52%', startLeft: '56%',
      startNote: 'Briar plays for early chaos and a shoved squishy mid is a prime frenzy-dive target.',
      clearSpeed: 'Mid by ~2:45 and itching to all-in.',
      critFrom: '2:30', critTo: '3:30', critNote: 'She wants the early dive — assume she’s coming if you’re shoved mid.',
      waveState: 'Worst when shoved to her side — she frenzies in and lifesteal sustains the dive.',
      laneTell: 'Enemy mid intentionally lets you shove, then plays toward tower — bait for the Briar dive.',
      wardLoc: 'Mid river / side-brushes', wardNote: 'Her dive is high-commit but hard to survive once it starts — see it early.',
      plan: ['Don’t over-shove before 3:15 — she dives squishies happily.', 'Ward by 2:30 — she hunts early and mid is close.', 'Flash early — her frenzy W can’t be kited once started.']
    },
    sejuani: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Standard clear to a river mouth; arrives mid around scuttle with frost stacks ready.',
      clearSpeed: 'Mid by ~3:00, tanky and healthy.',
      critFrom: '3:00', critTo: '3:45', critNote: 'Scuttle + first gank with E permafrost online.',
      waveState: 'Worst when shoved — her tankiness wins the dive on a squishy even through tower.',
      laneTell: 'Enemy mid steps up to stack CC/autos on you — building Sejuani’s permafrost for the stun.',
      wardLoc: 'Mid river bush (push side)', wardNote: 'See her cross — she walks straight in if you don’t.',
      plan: ['Don’t over-shove — her dive succeeds through tower on a mage.', 'Ward push-side river by 2:45.', 'Stacked CC on you = the permafrost stun setting up.']
    },
    maokai: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Clears to a river mouth; the W dash-root lands his mid gank from an awkward side angle.',
      clearSpeed: 'Mid by ~3:00-3:15.',
      critFrom: '2:45', critTo: '3:45', critNote: 'First-gank window with the point-click W root online.',
      waveState: 'Worst when shoved within W-dash range of either mid river entrance.',
      laneTell: 'Enemy mid holds near a river side of the wave to set the root angle.',
      wardLoc: 'Mid river bushes', wardNote: 'Stay outside W-dash range of unwarded river.',
      plan: ['Stay out of W-dash range from mid river when shoved.', 'Ward by 2:45 — the root is hard to dodge up close.', 'Don’t over-extend; his tankiness makes the dive free.']
    },
    viego: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Clears to the killable lane — a low, shoved mid is a reset waiting to happen.',
      clearSpeed: 'Mid by ~3:00.',
      critFrom: '2:45', critTo: '3:30', critNote: 'First-gank window with the W stun — a mid kill resets him to snowball.',
      waveState: 'Worst when you’re low and shoved — killing you fully heals and refreshes him.',
      laneTell: 'Enemy mid trades toward a kill rather than a clean trade — feeding Viego a reset.',
      wardLoc: 'Mid river bush (push side)', wardNote: 'Deny the reset — don’t be the low target near river.',
      plan: ['Don’t sit low and shoved — you’re a free reset.', 'Ward by 2:45 and dodge the charged W.', 'If he kills nearby, expect an instant chain onto you.']
    },
    hecarim: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Builds E speed across the river so his mid gank closes faster than it looks.',
      clearSpeed: 'Mid by ~3:00, ramping speed.',
      critFrom: '2:45', critTo: '3:30', critNote: 'First-gank window; the E ramp eats mid’s short distance instantly.',
      waveState: 'Worst when shoved — the gap closes before you react.',
      laneTell: 'Enemy mid holds you in a trade — Hecarim’s speed lets him arrive mid-fight.',
      wardLoc: 'Deeper mid river / over the wall', wardNote: 'Ward deep — his ramp speed eats a shallow ward’s warning.',
      plan: ['Ward DEEP — his speed shrinks your reaction window.', 'Don’t over-shove; the gap-close is faster than it looks.', 'Respect a long-range R fear + dive at 6.']
    },
    amumu: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Clears to a river mouth; the long-range Q lets him gank mid from a side-brush or over a wall.',
      clearSpeed: 'Mid by ~3:00.',
      critFrom: '2:45', critTo: '3:30', critNote: 'First-gank window — everything hinges on the Q landing on a squishy mid.',
      waveState: 'Worst when shoved in a straight line he can Q down — stand behind minions.',
      laneTell: 'Enemy mid lines up between you and the river — clearing a path for the bandage toss.',
      wardLoc: 'Mid river bush (push side)', wardNote: 'Vision lets you body-block the Q with minions before it’s thrown.',
      plan: ['Body-block his Q with the wave — it’s a skillshot.', 'Ward by 2:45 to see the bandage angle.', 'Dodge the Q and the whole gank fails.']
    },
    khazix: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Farms to 6 — but a mid lane is the easiest place on the map to find an isolated target for evolved Q.',
      clearSpeed: 'Power-farming early; his mid threat switches on at 6, and mid isolation is everywhere.',
      critFrom: '6:00', critTo: '8:00', critNote: 'At 6 + evolve he leap-bursts an isolated mid — and mid is isolated more often than any lane.',
      waveState: 'Early: play normally. Post-6: never be isolated from your wave/team — mid makes that hard.',
      laneTell: 'Enemy mid plays passive early, then steps up the instant Kha hits 6 and you’re alone.',
      wardLoc: 'Mid river before his 6 timing', wardNote: 'His clock starts at 6 — shift vision later, and never roam alone isolated.',
      plan: ['Play the early game freely — he’s farming.', 'At 6, never be the isolated target — mid is the easiest isolation.', 'Track his level: the gank switches on at 6.']
    },
    kayn: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Farms both jungles to his form; uses walls (E) to gank mid only if it’s free.',
      clearSpeed: 'Power-farming — minimal early mid pressure.',
      critFrom: '6:30', critTo: '9:00', critNote: 'After transform — Rhaast all-ins or Shadow bursts a squishy mid. Pre-form he’s soft.',
      waveState: 'Early: free. After his form, respect the all-in like a new champion.',
      laneTell: 'Enemy mid plays for scaling too, knowing no early help is coming.',
      wardLoc: 'Mid river once he’s near transforming', wardNote: 'His clock is his form, not a fixed minute.',
      plan: ['Pressure mid early — he won’t contest it.', 'Watch for his transformation; the threat flips on then.', 'Shadow form bursts a mage — don’t be caught alone post-form.']
    },
    masteryi: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'In his own jungle — he will not come mid early. This is a free lane to snowball.',
      clearSpeed: 'Power-farming; no early mid presence at all.',
      critFrom: '8:00', critTo: '12:00', critNote: 'Only once he has items — then his Q-reset DPS deletes a caught mid. Early he’s a non-factor.',
      waveState: 'Early: shove and roam freely. Late: never get caught alone — his resets shred you.',
      laneTell: 'Enemy mid plays super safe and farm-focused, stalling for the Yi scaling.',
      wardLoc: 'River only once he has items', wardNote: 'Early ward priority is low — he’s farming.',
      plan: ['Play aggressive early — he gives you a free lane.', 'Roam and snowball before he comes online.', 'Late, never get caught alone — his resets melt you.']
    },
    diana: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Power-farms to 6; pre-6 her mid gank needs the Q-slow to land first.',
      clearSpeed: 'Healthy clear; her first real mid gank lands around her 6 timing.',
      critFrom: '5:30', critTo: '7:30', critNote: 'Her 6 timing — the R pull + AoE turns a soft gank into a kill on a squishy mid.',
      waveState: 'Early: respect only the Q-slow. Post-6: don’t be catchable by the R pull.',
      laneTell: 'Enemy mid stalls trades pre-6, then steps up the instant Diana hits 6.',
      wardLoc: 'Mid river; re-ward before her 6', wardNote: 'Her danger timing is the ult — refresh vision around 5-6 min.',
      plan: ['Side-step her Q pre-6 — without it the gank fails.', 'Re-ward before her level-6 timing.', 'Post-6 don’t stand where the R pull reaches.']
    },
    nocturne: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Power-farms to 6; the danger is the unwarnable global ult, and mid is dead-center for it.',
      clearSpeed: 'Healthy clear; the spike is level 6, not a path.',
      critFrom: '6:00', critTo: '8:30', critNote: 'Every minute after 6 — Paranoia darkens the screen and dashes him to a stepped-up mid from anywhere.',
      waveState: 'After 6, any over-extend can be ulted — mid is the most ult-able lane on the map.',
      laneTell: 'The screen darkens (his R) — you have a second before he’s on you. Flash pre-emptively.',
      wardLoc: 'Mid river early, then play the minimap', wardNote: 'A ward won’t stop the ult — manage HP and position post-6.',
      plan: ['Track his level — at 6 the global removes all warning.', 'When the screen darkens, flash/disengage instantly.', 'Don’t over-extend mid post-6 even with vision.']
    },
    evelynn: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Farms to 6 untouched, then becomes invisible — and a squishy mid is her favorite charm target.',
      clearSpeed: 'Power-farming — no early threat at all.',
      critFrom: '6:00', critTo: '8:30', critNote: 'Post-6 her stealth ganks hit a mid with zero minimap warning — charm + burst deletes a mage.',
      waveState: 'Early: free. Post-6: assume she’s in a side-brush — carry a control ward.',
      laneTell: 'Enemy mid steps up confidently with no jungler shown — Eve is stealthed beside them.',
      wardLoc: 'Mid side-brushes — pink wards reveal her', wardNote: 'Only a control ward / sweeper reveals her stealth.',
      plan: ['Pre-6 play freely — she’s the weakest jungler on the map.', 'At 6, buy a control ward — she’s invisible otherwise.', 'Don’t stand in unswept mid bushes once she has stealth.']
    },
    karthus: {
      start: 'far', startLabel: 'Either-side full clear', startTop: '62%', startLeft: '68%',
      startNote: 'Farms relentlessly; he won’t walk mid. The threat is the global R, not his presence.',
      clearSpeed: 'Power-farming — no lane pressure.',
      critFrom: '6:00', critTo: 'all game', critNote: 'His R executes a low mid from anywhere — don’t recall through low HP in the open.',
      waveState: 'Early: shove and pressure — he’s absent. Just don’t roam around low; the global R finishes you.',
      laneTell: 'Enemy mid stalls for scaling; jungle pressure simply never arrives.',
      wardLoc: 'Standard, deprioritized', wardNote: 'He doesn’t gank — vision matters less, HP management matters more.',
      plan: ['Pressure freely — he won’t come mid.', 'Never sit low in the open — his ult executes globally.', 'Punish his lack of ganks by snowballing mid.']
    }
  },

  /* ============================ BOT ============================ */
  bot: {
    leesin: {
      start: 'far', startLabel: 'Top-side leash (Blue → river)', startTop: '26%', startLeft: '30%',
      startNote: 'Standard Lee starts top-side and clears DOWN — he hits bot river right as bot scuttle spawns.',
      clearSpeed: 'Arrives bot-side as your 3rd wave is crashing — and it’s a 2v2, so his gank is a double kill if you’re both up.',
      critFrom: '3:00', critTo: '3:45', critNote: 'Bot scuttle / dragon-side timing. If river scuttle is bot, treat the tri-bush as occupied.',
      waveState: 'Most dangerous when your duo shoves flat past river — the Q-tag picks the over-extended one and the dive snowballs bot.',
      laneTell: 'Enemy bot stops respecting your duo and holds the wave — stalling for the Lee gank with their support’s CC ready.',
      wardLoc: 'Bot river bush / dragon-pit side', wardNote: 'Drop it before scuttle at 3:15 so you see him cross, not after he’s on the ADC.',
      plan: ['Ward bot river / tri-bush by 2:45 — he paths down into scuttle.', 'Don’t both over-extend past river before 3:30 with flashes down.', 'When bot scuttle dies unseen, assume he’s in your tri-bush.']
    },
    elise: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Clears toward the shoved lane — a pushed bot duo is a magnet for the level-3 cocoon.',
      clearSpeed: 'Level 3 by ~3:00, hunting the first 2v2 gank.',
      critFrom: '2:45', critTo: '3:30', critNote: 'Her fastest gank — one cocoon on the ADC plus the support’s CC is a guaranteed kill.',
      waveState: 'Lethal when your duo is pushed past river — she cocoons the ADC out of position.',
      laneTell: 'Enemy bot plays unnaturally aggressive or steps at you for a bad trade — the cocoon is lined up from the tri-bush.',
      wardLoc: 'Tri-bush / bot-river wall', wardNote: 'Ward EARLY — a 3:00 ward is already too late for her gank.',
      plan: ['Assume a level-3 gank and ward by 2:30.', 'Keep the ADC’s flash up; don’t cross river before you’ve seen her.', 'If enemy bot over-aggros for free, the cocoon is loaded.']
    },
    jarvaniv: {
      start: 'far', startLabel: 'Top-side leash', startTop: '27%', startLeft: '29%',
      startNote: 'Clears down toward the open lane; the EQ flag-drag ganks bot through the tri-brush wall.',
      clearSpeed: 'Bot-side by ~3:15 with EQ online.',
      critFrom: '3:00', critTo: '3:45', critNote: 'Scuttle + first-gank window; the EQ over the tri-wall starts the 2v2 dive.',
      waveState: 'Worst when your duo hugs the tri-brush wall while shoved — he flag-drags over it onto the ADC.',
      laneTell: 'Enemy bot holds near the tri-brush side of the wave — setting the EQ-over-wall angle.',
      wardLoc: 'Bot river bush + respect the tri-brush wall', wardNote: 'River vision stops the flag-drag before it starts.',
      plan: ['Don’t hug the tri-brush wall when shoved — he EQs over it.', 'Ward bot river / tri by 2:45.', 'Post-6 his cage traps the ADC for a clean dive — stay back.']
    },
    vi: {
      start: 'far', startLabel: 'Top-side leash', startTop: '27%', startLeft: '28%',
      startNote: 'Paths down to bot river; her charged Q closes through minions and the R locks the ADC for the duo.',
      clearSpeed: 'Bot by ~3:15.',
      critFrom: '3:00', critTo: '3:45', critNote: 'First-gank + scuttle; Q pins the ADC, support follows, R guarantees it.',
      waveState: 'Deadly when your duo is past river — the charged Q reaches the back-line ADC.',
      laneTell: 'Enemy bot steps up to tank poke — buying the half-second for Vi’s Q to charge into your ADC.',
      wardLoc: 'Bot river / tri-bush', wardNote: 'See the Q wind-up — she must walk in to charge it.',
      plan: ['Keep the ADC off the tri-bush wall — her Q pins them.', 'Ward bot river by 2:45.', 'Dodge on the Q charge — the R is un-dodgeable lockdown.']
    },
    xinzhao: {
      start: 'far', startLabel: 'Top-side leash', startTop: '27%', startLeft: '29%',
      startNote: 'Clears down and commits — his 2v2 is the best in the game, so a bot gank is a near-guaranteed double.',
      clearSpeed: 'Bot by ~3:15, full combo online.',
      critFrom: '3:00', critTo: '3:40', critNote: 'First-gank window — he turns the 3v2 into a stomp and kills the ADC outright.',
      waveState: 'Worst when shoved — his E closes instantly and the duo loses the fight even 2v1 with him.',
      laneTell: 'Enemy bot all-ins at a HP deficit — they know Xin turns the bot skirmish.',
      wardLoc: 'Bot river bush', wardNote: 'You must see him — once E connects on the ADC you can’t peel it off.',
      plan: ['Never take a skirmish with Xin near — he wins the 2v2 hard.', 'Ward bot river by 2:45 and play for the dodge.', 'Match the wave so your ADC isn’t the over-extended one.']
    },
    warwick: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Clears toward the lane that bled — a chunked ADC pings his W from across the river.',
      clearSpeed: 'Bot by ~3:15, healthy.',
      critFrom: '3:00', critTo: '4:00', critNote: 'HP-based — he comes the instant the ADC drops below half, not on a fixed clock.',
      waveState: 'Any time the ADC is low — his W points him at the wounded carry with move speed.',
      laneTell: 'Enemy bot trades to draw blood on your ADC then backs off — pinging HP for the Warwick W.',
      wardLoc: 'Bot river bush; re-ward after the ADC takes a chunk', wardNote: 'Re-ward whenever the carry drops below half — that’s when he comes.',
      plan: ['Don’t let the ADC sit low without vision — his W sees them.', 'Respect a screen-wide R suppress on the carry at 6.', 'Trade then reset — don’t leave the ADC lingering wounded.']
    },
    wukong: {
      start: 'far', startLabel: 'Top-side leash', startTop: '27%', startLeft: '29%',
      startNote: 'Paths down toward the shoved duo; the clone (W) fakes his approach to the tri-bush.',
      clearSpeed: 'Bot by ~3:15.',
      critFrom: '3:00', critTo: '3:45', critNote: 'First-gank window — the clone baits a flash, the R knock-up starts the 2v2 dive.',
      waveState: 'Worst when shoved — his E dash reaches the ADC and the clone hides his angle.',
      laneTell: 'Enemy bot steps up with no jungler shown — the Wukong clone is selling a fake recall.',
      wardLoc: 'Bot river / tri-bush', wardNote: 'Confirm the real Wukong — the clone mirrors his walk.',
      plan: ['Don’t trust a “safe” back-off — it may be the clone.', 'Ward bot river by 2:45.', 'Save the ADC’s dash/flash for his E, not the clone.']
    },
    reksai: {
      start: 'far', startLabel: 'Top-side leash', startTop: '27%', startLeft: '29%',
      startNote: 'Tunnels let her surface from the tri-brush wall — watch the wall, not just the river.',
      clearSpeed: 'Bot by ~3:15 with tunnels placed.',
      critFrom: '3:00', critTo: '3:45', critNote: 'First-gank window; her burrowed knock-up on the ADC plus the support’s CC is a kill.',
      waveState: 'Worst when the duo is shoved near the tri-wall she can tunnel through.',
      laneTell: 'Enemy bot holds to fight — and a tremor ping reveals she’s burrowed nearby.',
      wardLoc: 'Bot river + tri-brush wall for tunnels', wardNote: 'One ward can’t cover her tunnel angles — play respectful.',
      plan: ['Watch the tri-wall — she tunnels in onto the ADC.', 'Ward by 2:45 and keep the carry’s flash up.', 'Assume she knows your position when the tremor pings.']
    },
    shaco: {
      start: 'near', startLabel: 'Anywhere — box-gank bot', startTop: '60%', startLeft: '62%',
      startNote: 'Shaco can box-gank bot at level 2-3 with a pre-placed box in the tri-bush. No standard path applies.',
      clearSpeed: 'Can be bot at ~2:40 for a box cheese on the duo — earlier than any normal jungler.',
      critFrom: '2:15', critTo: '3:30', critNote: 'Earliest gank threat of any jungler — in a 2v2 the box fear chains into the support’s CC.',
      waveState: 'Worst any time the duo is past river or sitting in an unswept tri-bush.',
      laneTell: 'Enemy bot stops respecting trades, or you spot a Jack-in-the-Box shimmer in the tri-bush.',
      wardLoc: 'Tri-bush + bot river; carry a sweeper', wardNote: 'Sweep the tri-bush before standing in it — boxes are invisible until you’re feared.',
      plan: ['Play scared from 2:00 — he ganks a level before anyone.', 'Sweep the tri-bush before farming next to it.', 'Don’t cross river unwarded — Deceive hides the approach.']
    },
    rengar: {
      start: 'near', startLabel: 'Toward bot brushes', startTop: '62%', startLeft: '64%',
      startNote: 'Rengar wants an empowered leap from the tri-bush or bot-river bush onto the ADC.',
      clearSpeed: 'Bot by ~3:00, hunting a brush angle on the carry.',
      critFrom: '2:45', critTo: '3:45', critNote: 'Any time he reaches an unwarded bush near your duo — the leap-stun deletes the ADC.',
      waveState: 'Worst when the ADC paths near the tri-bush without sweeping it.',
      laneTell: 'Enemy bot zones your ADC toward the tri-bush, or leaves a trade to strand them next to it.',
      wardLoc: 'Tri-bush and bot-river bush specifically', wardNote: 'Wards in the bushes — that’s where he leaps from onto the carry.',
      plan: ['Ward the bushes, not just the river — he leaps from brush.', 'Carry a sweeper; clear the tri-bush before the ADC farms near it.', 'If a bush is dark, treat Rengar as inside it.']
    },
    graves: {
      start: 'far', startLabel: 'Top-side fast clear', startTop: '28%', startLeft: '28%',
      startNote: 'Power-farms and counter-jungles; bot he contests dragon-side scuttle and punishes an over-extended duo.',
      clearSpeed: 'Fast enough to contest bot scuttle, but won’t commit unless the ADC is catchable.',
      critFrom: '3:15', critTo: '4:00', critNote: 'Scuttle / dragon-side contest — winning bot river gives him gank vision for the 2v2.',
      waveState: 'Punishes a hard over-extend on the carry; more counter-ganker than scripted ganker.',
      laneTell: 'Enemy bot plays for a long fight (not a burst trade) — expecting Graves’ sustained damage to clean up.',
      wardLoc: 'Bot river / dragon-side scuttle', wardNote: 'Watch the scuttle fight — dragon-side river control is his gank setup.',
      plan: ['Don’t hard over-extend the ADC — his counter-gank burst is lethal.', 'Contest bot scuttle vision ~3:15.', 'Play short trades — you lose the long fight if he arrives.']
    },
    nidalee: {
      start: 'far', startLabel: 'Top-side fast clear', startTop: '28%', startLeft: '28%',
      startNote: 'Fastest clear in the game — she shows bot early and the spear out-ranges the lane onto a chunked ADC.',
      clearSpeed: 'Can be bot before your 3rd wave — the spear hits the carry from screen-edge.',
      critFrom: '2:45', critTo: '3:45', critNote: 'Earlier than most — her clear speed lets her gank the duo ahead of schedule.',
      waveState: 'Worst when the ADC is already chunked; a healthy carry side-steps the spear and the gank fizzles.',
      laneTell: 'Enemy bot pokes your ADC down and refuses to let them recall — saving the carry for a spear.',
      wardLoc: 'Bot river bush', wardNote: 'She arrives early — ward sooner than the standard 3:00.',
      plan: ['Keep the ADC healthy — her gank needs them pre-chunked.', 'Ward early (2:45); her clear is the fastest in the game.', 'Don’t let the carry walk in the open low — the spear executes from range.']
    },
    briar: {
      start: 'near', startLabel: 'Aggressive — invades or dives bot', startTop: '58%', startLeft: '60%',
      startNote: 'Briar plays for early chaos and a shoved bot duo is a prime frenzy-dive on the carry.',
      clearSpeed: 'Bot by ~3:00 and itching to all-in the ADC.',
      critFrom: '2:45', critTo: '3:45', critNote: 'She wants the early dive — assume she’s coming if the duo is shoved.',
      waveState: 'Worst when shoved to her side — she frenzies onto the ADC and lifesteal sustains the dive.',
      laneTell: 'Enemy bot lets you shove then plays toward tower — bait for the Briar dive on the carry.',
      wardLoc: 'Bot river / tri-bush', wardNote: 'Her dive is high-commit but hard to survive — see it early.',
      plan: ['Don’t over-shove into her tower before 3:30.', 'Ward by 2:45 — she actively hunts early.', 'The ADC should flash early — her W can’t be kited once frenzied.']
    },
    sejuani: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Standard downward clear; arrives bot around scuttle with frost stacks, and the support’s CC tops off her permafrost.',
      clearSpeed: 'Bot by ~3:15-3:30, tanky and healthy.',
      critFrom: '3:15', critTo: '4:00', critNote: 'Scuttle + first gank — permafrost plus the support’s CC stun-locks the ADC.',
      waveState: 'Worst when shoved — her tankiness wins the 2v2 dive even through tower.',
      laneTell: 'Enemy bot stacks CC/autos on you — building Sejuani’s permafrost for the stun on the carry.',
      wardLoc: 'Bot river bush', wardNote: 'See her cross — she’s tanky enough to walk straight into the 2v2.',
      plan: ['Don’t over-shove — her dive succeeds through tower.', 'Ward bot river by 2:45.', 'Stacked CC from their duo = the permafrost stun setting up.']
    },
    maokai: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Clears down; the W dash-root lands his bot gank on the ADC, and saplings zone the retreat.',
      clearSpeed: 'Bot by ~3:15-3:30.',
      critFrom: '3:00', critTo: '4:00', critNote: 'First-gank window — the point-click W root on the carry plus support CC is a kill.',
      waveState: 'Worst when the duo is shoved within W-dash range of bot river.',
      laneTell: 'Enemy bot holds near the river side of the wave to set the root angle on your ADC.',
      wardLoc: 'Bot river bush', wardNote: 'Keep the ADC outside W-dash range of unwarded river.',
      plan: ['Keep the carry out of W-dash range from bot river.', 'Ward by 2:45 — the root is hard to dodge up close.', 'Don’t over-extend; his tankiness makes the dive free.']
    },
    viego: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Clears toward the killable lane — a low, shoved ADC is a reset that snowballs the whole 2v2.',
      clearSpeed: 'Bot by ~3:15.',
      critFrom: '3:00', critTo: '3:45', critNote: 'First-gank window with the W stun — a kill on the carry resets him to chain the support.',
      waveState: 'Worst when the ADC is low and shoved — the kill fully heals and refreshes him into a 1v1 vs the support.',
      laneTell: 'Enemy bot trades toward a kill rather than a clean trade — feeding Viego a reset.',
      wardLoc: 'Bot river bush', wardNote: 'Deny the reset — don’t let the ADC be the low target near river.',
      plan: ['Don’t let the carry sit low and shoved — it’s a free reset.', 'Ward by 2:45 and dodge the charged W.', 'If he kills bot, expect an instant chain onto the second target.']
    },
    hecarim: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Builds E speed down the river so his bot gank closes on the duo faster than it looks.',
      clearSpeed: 'Bot by ~3:15, ramping speed.',
      critFrom: '3:00', critTo: '3:45', critNote: 'First-gank window; the E ramp eats the distance and knocks the ADC back into the 2v2.',
      waveState: 'Worst when shoved — the gap closes on the carry before you react.',
      laneTell: 'Enemy bot holds you in a trade — Hecarim’s speed lets him arrive mid-fight.',
      wardLoc: 'Deeper bot river / over the wall', wardNote: 'Ward deep — his ramp speed eats a shallow ward’s warning.',
      plan: ['Ward DEEP — his speed shrinks your reaction window.', 'Don’t over-shove; the gap-close is faster than it looks.', 'Respect a long-range R fear + dive on the carry at 6.']
    },
    amumu: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Clears down; the long-range Q ganks bot from the tri-bush or over the wall onto the ADC.',
      clearSpeed: 'Bot by ~3:15.',
      critFrom: '3:00', critTo: '3:45', critNote: 'First-gank window — a landed Q on the carry plus support CC is a guaranteed kill; at 6 the R hits both.',
      waveState: 'Worst when the ADC stands in a straight line he can Q — keep minions between them.',
      laneTell: 'Enemy bot lines up between your ADC and the river — clearing a path for the bandage toss.',
      wardLoc: 'Bot river bush', wardNote: 'Vision lets the ADC body-block the Q with minions before it’s thrown.',
      plan: ['Body-block his Q with the wave — it’s a skillshot.', 'Ward by 2:45 to see the bandage angle.', 'At 6 his R catches both of you — don’t stand stacked.']
    },
    khazix: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Farms to 6 — but post-evolve he loves a bot lane where the ADC steps away from the support to farm.',
      clearSpeed: 'Power-farming early; his bot threat switches on at 6 against an isolated carry.',
      critFrom: '6:00', critTo: '8:00', critNote: 'At 6 + evolve he leap-bursts an ADC that’s split from the support — isolation kills the carry instantly.',
      waveState: 'Early: play normally. Post-6: keep the ADC next to the support — isolation is death.',
      laneTell: 'Enemy bot plays passive early, then steps up the instant Kha hits 6 and your carry is alone.',
      wardLoc: 'Bot river before his 6 timing', wardNote: 'His clock starts at 6 — keep the ADC un-isolated.',
      plan: ['Play the early game freely — he’s farming.', 'At 6, keep the ADC beside the support — isolation kills.', 'Track his level: the threat switches on at 6.']
    },
    kayn: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Farms both jungles to his form; uses walls (E) to gank bot only if it’s free.',
      clearSpeed: 'Power-farming — minimal early bot pressure.',
      critFrom: '6:30', critTo: '9:00', critNote: 'After transform — Rhaast all-ins the duo or Shadow bursts the ADC. Pre-form he’s soft.',
      waveState: 'Early: free. After his form, respect the all-in on the carry like a new champion.',
      laneTell: 'Enemy bot plays for scaling too, knowing no early help is coming.',
      wardLoc: 'Bot river once he’s near transforming', wardNote: 'His clock is his form, not a fixed minute.',
      plan: ['Pressure bot early — he won’t contest it.', 'Watch for his transformation; the threat flips then.', 'Shadow form deletes the ADC — don’t let the carry get caught post-form.']
    },
    masteryi: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'In his own jungle — he will not come bot early. Free lane to pressure for plates and dragon.',
      clearSpeed: 'Power-farming; no early bot presence at all.',
      critFrom: '8:00', critTo: '12:00', critNote: 'Only once he has items — then he resets through your duo onto the ADC. Early he’s a non-factor.',
      waveState: 'Early: shove and pressure freely. Late: never let the ADC get caught — his resets shred the carry.',
      laneTell: 'Enemy bot plays super safe and farm-focused, stalling for the Yi scaling.',
      wardLoc: 'River only once he has items', wardNote: 'Early ward priority is low — he’s farming.',
      plan: ['Play aggressive early — he gives you a free lane.', 'Take plates / dragon priority before he comes online.', 'Late, peel the ADC hard — his resets melt the carry.']
    },
    diana: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Power-farms to 6; pre-6 her bot gank needs the Q-slow to land on the carry first.',
      clearSpeed: 'Healthy clear; her first real bot gank lands around her 6 timing.',
      critFrom: '5:30', critTo: '7:30', critNote: 'Her 6 timing — the R pull + AoE catches the ADC and the support together.',
      waveState: 'Early: respect only the Q-slow. Post-6: don’t let the duo be catchable by the R pull.',
      laneTell: 'Enemy bot stalls trades pre-6, then steps up the instant Diana hits 6.',
      wardLoc: 'Bot river; re-ward before her 6', wardNote: 'Her danger timing is the ult — refresh vision around 5-6 min.',
      plan: ['Side-step her Q pre-6 — without it the gank fails.', 'Re-ward before her level-6 timing.', 'Post-6 don’t stack — the R pull catches both of you.']
    },
    nocturne: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Power-farms to 6; the danger is the unwarnable global ult dropping onto an over-extended ADC.',
      clearSpeed: 'Healthy clear; the spike is level 6, not a path.',
      critFrom: '6:00', critTo: '8:30', critNote: 'Every minute after 6 — Paranoia darkens the screen and dashes him onto the carry from anywhere.',
      waveState: 'After 6, any over-extend on the duo can be ulted — play to the map, not just your bush.',
      laneTell: 'The screen darkens (his R) — the ADC has a second before he’s on them. Flash pre-emptively.',
      wardLoc: 'Bot river early, then play the minimap', wardNote: 'A ward won’t stop the ult — manage the carry’s HP and position post-6.',
      plan: ['Track his level — at 6 the global removes all warning.', 'When the screen darkens, the ADC flashes/disengages instantly.', 'Don’t over-extend bot post-6 even with vision.']
    },
    evelynn: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Farms to 6 untouched, then becomes invisible — a squishy ADC is her ideal charm target.',
      clearSpeed: 'Power-farming — no early threat at all.',
      critFrom: '6:00', critTo: '8:30', critNote: 'Post-6 her stealth gank hits the carry with zero warning — charm + burst deletes the ADC.',
      waveState: 'Early: free. Post-6: assume she’s in the tri-bush — the support should carry a control ward.',
      laneTell: 'Enemy bot steps up confidently with no jungler shown — Eve is stealthed beside them.',
      wardLoc: 'Tri-bush / dragon-side — pink wards reveal her', wardNote: 'Only a control ward / sweeper reveals her stealth — that’s the support’s job.',
      plan: ['Pre-6 play freely — she’s the weakest jungler on the map.', 'At 6, the support buys a control ward — she’s invisible otherwise.', 'Keep the ADC out of unswept bushes once she has stealth.']
    },
    karthus: {
      start: 'far', startLabel: 'Top-side full clear', startTop: '28%', startLeft: '28%',
      startNote: 'Farms relentlessly; he won’t walk bot. The threat is the global R on a low carry, not his presence.',
      clearSpeed: 'Power-farming — no lane pressure.',
      critFrom: '6:00', critTo: 'all game', critNote: 'His R executes a low ADC from anywhere — don’t let the carry recall through low HP in the open.',
      waveState: 'Early: shove and pressure — he’s absent. Just keep the ADC off low-HP walks; the global R finishes them.',
      laneTell: 'Enemy bot stalls for scaling; jungle pressure simply never arrives.',
      wardLoc: 'Standard, deprioritized', wardNote: 'He doesn’t gank — vision matters less, the carry’s HP management matters more.',
      plan: ['Pressure freely — he won’t come bot.', 'Never let the ADC sit low in the open — his ult executes globally.', 'Punish his lack of ganks by taking plates / dragon.']
    }
  }

};
