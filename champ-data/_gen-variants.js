// MatchupCoach — de-boilerplate variant pass. Seeded per (champ, enemy) so every page reads differently.
// Used by run_script post-processing over generated *.full.js files. {K}=key ability, {S}=safety tool, {E}=enemy.
window.GEN_VARIANTS = (function () {
  function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return Math.abs(h); }
  // Each rule: { find: exact raw substring (may contain {K}/{S}/{E} to expand per entry), vars: [replacements with same placeholders] }
  const RULES = [
    { find: "Skill-based; spikes decide it. See the level-by-level chart for the swing points.",
      vars: [
        "The chart below maps the swing points — neither side owns this lane until a spike says so.",
        "Phase by phase this matchup changes hands; the chart marks exactly when.",
        "No permanent owner here — the level chart shows where momentum tilts and tilts back.",
        "Spikes, not ceilings, decide this one. Plan recalls around the rows below.",
        "Momentum trades sides at the timings below — read them like a bus schedule.",
        "The lane has chapters — the chart is the table of contents."
      ] },
    { find: ". Track {K} before every commit and keep the wave where your pattern works.",
      vars: [
        ". Every commit starts with one question: is {K} down?",
        ". {K} is the clock this lane runs on — read it before every step forward.",
        ". Shorthand: {K} down, wave right, go.",
        ". Nothing here works through {K} — schedule your pattern around its cooldown.",
        ". Keep one eye on {K} and one on the wave, in that order."
      ] },
    { find: ". Track {K} before every commit and keep the lane where your duo\u2019s pattern works.",
      vars: [
        ". Every duo commit starts with one question: is {K} down?",
        ". {K} is the 2v2\u2019s metronome — read it before stepping up.",
        ". Shorthand: {K} spent, duo synced, go.",
        ". The lane runs on {K}\u2019s cooldown — book your windows against it."
      ] },
    { find: " Don\u2019t spend your ultimate on chip damage \u2014 it is the kill window.",
      vars: [
        " And keep the ultimate holstered until a kill is actually on the table.",
        " The R buys fights, not poke — spend it like the last one in stock.",
        " Treat your ultimate as a verdict, never as harassment.",
        " Save the R for moments with names on them.",
        " Chip damage doesn\u2019t get to borrow the ultimate."
      ] },
    { find: " Don\u2019t spend your ultimate on chip damage \u2014 it is the fight-decider.",
      vars: [
        " And hold the ultimate for the fight it was drafted to decide.",
        " The R settles fights — it doesn\u2019t open negotiations.",
        " Keep the ultimate for the swing moment, not the spacing war.",
        " Your R is the tiebreak — don\u2019t cash it on chip."
      ] },
    { find: " Track it before every step-up. - Your {S}: never waste it on chip damage \u2014 it is your survival button. - Your ultimate: spend it on kill windows, not on waves.",
      vars: [
        " Check it before every step-up. - {S} is the lifeline; chip damage never gets it. - The ult answers fights, not waves.",
        " Read it like a second minimap. - Guard your {S} like a fifth summoner spell. - Ultimate goes to kill windows only.",
        " It governs your forward steps. - {S} spent on poke is a death you scheduled. - Hold the R for the fight that decides something.",
        " Count it out loud if you must. - Your {S} has one job: the moment it all goes wrong. - The R has one too: the moment it all goes right.",
        " Step up only on its downtime. - Budget {S} for emergencies and the R for opportunities — never swap them."
      ] },
    { find: " Track it before every step-up. - Your {S}: never waste it on chip damage \u2014 it is your fight-saver. - Your ultimate: spend it on fight windows, not on waves.",
      vars: [
        " It writes your spacing rules. - {S} is for saving fights, not seasoning trades. - The R opens or closes fights — pick one per cast.",
        " Read it before every duo step-up. - Your {S} answers exactly one disaster per cooldown. - Spend the R on swing moments only.",
        " The duo\u2019s tempo bends around it. - Keep {S} banked for their best play. - The ultimate is a fight decision, not a habit."
      ] },
    { find: "forcing the all-in before your pattern comes online.",
      vars: [
        "cashing the all-in before your pattern matures.",
        "starting the fight your kit wanted ten seconds later.",
        "turning your every misstep into the all-in you hadn\u2019t budgeted.",
        "front-loading the violence while your kit is still stretching."
      ] },
    { find: "winning the range war and denying your tempo.",
      vars: [
        "owning the spacing war until your tempo starves.",
        "keeping the fight at a distance your kit resents.",
        "out-ranging your plan one polite trade at a time.",
        "renting you the lane at a range markup."
      ] },
    { find: "winning the DPS race and denying your scaling curve.",
      vars: [
        "out-shooting the duel and taxing your curve per wave.",
        "winning the stat check now so your scaling never testifies.",
        "racing your curve to the finish line with a head start.",
        "pricing your power spike out of the game."
      ] },
    { find: "winning the poke war and denying your duo\u2019s tempo.",
      vars: [
        "out-chipping the 2v2 until your windows close.",
        "billing your duo per wave until the all-in is unaffordable.",
        "owning the chip ledger and the tempo it buys."
      ] },
    { find: "out-sustaining your trades and denying your engage windows.",
      vars: [
        "healing through your math until your windows expire.",
        "refunding every trade and out-waiting your engage.",
        "making the sustain war boring on purpose — and winning it."
      ] },
    { find: "landing the engage chain and snowballing your carry\u2019s lane.",
      vars: [
        "starting one clean chain and letting it pay the whole lane.",
        "converting a single landed engage into your carry\u2019s bad week.",
        "running the playbook once, perfectly, at your duo\u2019s expense."
      ] },
    { find: " Only commit once it is down or baited.",
      vars: [
        " Commit on its cooldown, never into it.",
        " Its cooldown is the green light — wait for it.",
        " Until it\u2019s spent, every commit is a coin flip.",
        " Bait it, count it, then go."
      ] },
    { find: " wastes {K} \u2014 that is your full-commit window.",
      vars: [
        " burns {K} on nothing — take the fifteen-second invitation.",
        " whiffs {K} and the lane briefly belongs to you.",
        " spends {K} early — the closest thing this matchup has to a guarantee."
      ] },
    { find: "\u2019s favourite window \u2014 refusing it removes half his win condition.",
      vars: [
        "\u2019s rehearsed moment — don\u2019t audition for it.",
        "\u2019s bread-and-butter play \u2014 deny it and they run out of answers.",
        "\u2019s whole plan in one window — decline politely and watch it retire."
      ] },
    { find: " gets one kill, respect {K} and reset to farming. Two kills: play for the team, not for solo redemption \u2014 ",
      vars: [
        " takes first blood, tighten up: {K} is now always up in your head. A second kill means the duel is over and the game isn\u2019t — ",
        " gets a kill, the lane gets honest — give {K} extra room and farm it back. Two kills: stop dueling your tilt — ",
        " opens the score, reset expectations and respect {K} doubly. After a second, your job description changes — "
      ] },
    { find: "\u2019s duo gets a kill, respect {K} and reset to vision work. Two kills: peel only \u2014 ",
      vars: [
        "\u2019s duo draws first blood, trade ambition for wards and respect {K}. Two kills: you are a bodyguard now — ",
        "\u2019s duo opens the ledger, reset to vision and patience. A second kill retires your engage button — "
      ] },
    { find: " - Engage only on {K}\u2019s cooldown. - Spend your ultimate on kill windows only.",
      vars: [
        " - Fights start when {K} ends. - The R is for endings, not openings.",
        " - {K} down is the green light. - Hold the ult for names, not waves.",
        " - No commits into {K}. - The ultimate closes arguments; it doesn\u2019t open them."
      ] },
    { find: " - Engage only on {K}\u2019s cooldown. - Spend your ultimate on fight windows only.",
      vars: [
        " - The duo goes when {K} is down. - The R decides fights; it doesn\u2019t advertise them.",
        " - {K} spent means windows open. - Keep the ult for the swing moment."
      ] },
    { find: " Great trade: {E} wastes {K} \u2014 commit immediately.",
      vars: [
        " Great trade: {K} hits air — go before it\u2019s back.",
        " Great trade: anything that starts the second {K} misses.",
        " Great trade: the whiffed {K} and everything you do about it."
      ] },
    { find: " Commit only while it is down.",
      vars: [
        " It\u2019s down or you don\u2019t go.",
        " The whole green-light system is its cooldown.",
        " Forward steps wait for its downtime."
      ] },
    { find: " Bait his answer first.",
      vars: [
        " Bait the answer, then sign.",
        " Make him flinch first.",
        " His answer goes first; yours goes last."
      ] },
    { find: "Crash timing: crash to reset, take plates, or set up a roam \u2014 mid is a roam-timer lane, never shove on autopilot.",
      vars: [
        "Crash timing: every crash should buy something — a reset, a plate, a roam. Autopilot shoving buys ganks.",
        "Crash timing: shove with a destination in mind; mid waves are bus tickets, not chores.",
        "Crash timing: the crash is a timer you set — reset, plate, or roam, but never just because."
      ] },
    { find: "Crash timing: bot is a 2v2 on a drake timer \u2014 crash to reset, take plates, or rotate; never shove into a loaded all-in.",
      vars: [
        "Crash timing: bot waves answer to drake timers — crash for resets and plates, never into a loaded all-in.",
        "Crash timing: every bot crash is a bet on the next two minutes; make it before objectives, not into engages.",
        "Crash timing: shove with the drake clock in view — a crash into their all-in window pays their team."
      ] },
    { find: "Crash timing: the wave belongs to your carry \u2014 your job is the river vision and roam timers around its crashes.",
      vars: [
        "Crash timing: your carry owns the wave; you own everything the crash exposes — rivers, timers, fog.",
        "Crash timing: read the crash as a calendar entry — your vision work books the minutes around it.",
        "Crash timing: when the wave crashes, your job starts — wards out, roams tracked, windows called."
      ] }
  ];
  function apply(serialized, ctx, seedBase) {
    let out = serialized;
    for (let r = 0; r < RULES.length; r++) {
      const rule = RULES[r];
      const findRaw = rule.find.replace(/\{K\}/g, ctx.K).replace(/\{S\}/g, ctx.S).replace(/\{E\}/g, ctx.E);
      const needle = JSON.stringify(findRaw).slice(1, -1);
      if (out.indexOf(needle) === -1) continue;
      const pick = rule.vars[hash(seedBase + '|' + r) % rule.vars.length]
        .replace(/\{K\}/g, ctx.K).replace(/\{S\}/g, ctx.S).replace(/\{E\}/g, ctx.E);
      out = out.split(needle).join(JSON.stringify(pick).slice(1, -1));
    }
    return out;
  }
  return { hash, apply };
})();
