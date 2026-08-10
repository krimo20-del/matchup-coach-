# MatchupCoach — LoL loading-screen coach

## Defaults
- Template champion: **Aatrox** (richest data — `CHAMPS.Aatrox`, `AATROX_JUGG_LOADOUTS`).
- App file: `MatchupCoach.dc.html` — logic class at bottom, `renderVals()` builds UI, data loaded via `<helmet>` scripts.

## Key files
- `champ-data/aatrox.js` / `aatrox.full.js` / `aatrox-jugg-loadouts.js` — Aatrox data (canonical shape).
- `champ-data/_tank-fixes.js` — patches diff/tone/tldr for Tanks (Malphite, Ornn, TK, Cho, K'Sante, Maokai, Shen, Sion, Nautilus). Retry-loop (setInterval 250ms×24) handles non-deterministic load order.
- `champ-data/_diver-fixes.js` — all 17 Divers done. Cross-file shared cells go here (e.g. riven→garen, kled→urgot).
- `champ-data/_juggernaut-fixes.js` — all 12 Juggernauts done. Never override a cell another file owns — make both files agree instead.
- `champ-data/_mage-fixes.js` — all 14 Mages/Marksmen/Specialists done.
- `champ-data/_xlane-diff-fixes.js` — resolves 61 cross-group both-HARD/both-FAV contradictions. Zero cell overlap with group files (no retry races).
- `champ-data/_xlane-soft-fixes.js` — 923 remaining soft-asymmetry cells (diff+tone only, midpoint rule).
- `champ-data/_lane-phase-fixes.js` — fixes all 4,902 top-lane phase-side mirror contradictions using per-champ 7-stage power curves (CV) + live diff bias. Sides written as display names.
- `champ-data/_mbs-fixes.js` — Mid/Bot/Sup: 100 soft-asymmetry cells + 100 phase contradictions, hand-adjudicated.
- `champ-data/_phase-accuracy-fixes.js` — LAST to load. Fills flat "Skill 5/10" cells using CV curves + SIG phrase tables for all 4 lanes. Tuning surface: adjust CV values, don't hand-edit cells.
- `champ-data/jungle-intel.js` — `JUNGLE_INTEL` / `JUNGLE_GROUPS` for the JG cheat-sheet section.
- `champ-data/jg/_jg-headsup-fixes.js` — recomputes JG_DB stages 0-2 & 4 from shared duel model (S scores, S6 ult scores, pairwise modifiers). Mirror-consistent by construction. Stage 5 label parsed by app — do NOT relabel it.
- `champ-data/jg/*.js` — `JG_DB[champ][enemy]` for Lee Sin, Kindred, Kha'Zix, Kayn, Graves, Evelynn, Elise, Ekko, Diana, Bel'Veth (49 reports each). Missing junglers show "SOON".

## Audit state (June 2026)
All 4 lanes: 0 diff inconsistencies, 0 phase-side contradictions. Allowed mirror pairs: FAV/HARD, FAV/TRICKY, EVEN/EVEN, EVEN/TRICKY, TRICKY/TRICKY, MIRROR/MIRROR.

## Conventions
- Fonts: Chakra Petch (headers) · Manrope (body). Dark UI: #0d0f16 bg / #11131c cards.
- Ability colours: Q #46c6f5 · W #9b8cff · E #e8b84b · R #ff5d6c · AA/summoner #c7ccdb.
- No paywall / upsell content. Beta: everything free, $2.99/month after launch, beta users get lifetime free access.
- Preview server: matchupcoach port 8123. QA bypass: set `mc_session` in localStorage.
- Google sign-in: client ID loaded from server `/config` or `window.MC_GOOGLE_CLIENT_ID` fallback.
