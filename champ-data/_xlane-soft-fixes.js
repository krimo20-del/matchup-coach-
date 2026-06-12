// Top-lane soft diff-asymmetry corrections (June 2026 full-lane review). Resolves the
// ~588 mildly-inconsistent reverse pairs (EVEN/HARD, FAVOURED/EVEN, TRICKY/HARD, etc.) left
// after _xlane-diff-fixes.js, using a midpoint rule: each pair maps to the nearest consistent
// verdict pair (e.g. EVEN/HARD -> FAVOURED-lite/TRICKY... actually -> FAVOURED/TRICKY;
// HARD/TRICKY -> TRICKY/EVEN). Cells owned by the group fix files were edited THERE in place
// (no retry races); this file holds only the remainder. Sets diff+tone ONLY — tldrs stay.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var FIX = {
    aatrox: { darius: 'TRICKY', illaoi: 'TRICKY', mordekaiser: 'TRICKY', volibear: 'TRICKY', yorick: 'TRICKY', gwen: 'TRICKY', irelia: 'TRICKY', jax: 'TRICKY', olaf: 'TRICKY', riven: 'TRICKY', tryndamere: 'TRICKY' },
    akali: { illaoi: 'FAVOURED', trundle: 'EVEN', yorick: 'EVEN', fiora: 'EVEN', kled: 'TRICKY', vayne: 'EVEN', warwick: 'FAVOURED', maokai: 'TRICKY', nautilus: 'FAVOURED', aurora: 'FAVOURED', heimerdinger: 'TRICKY', jayce: 'TRICKY', quinn: 'TRICKY', teemo: 'TRICKY', galio: 'TRICKY', karma: 'EVEN', lillia: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', neeko: 'EVEN', ryze: 'EVEN' },
    akshan: { jax: 'TRICKY', yasuo: 'TRICKY' },
    ambessa: { drmundo: 'EVEN', mordekaiser: 'EVEN', urgot: 'EVEN', volibear: 'FAVOURED', yorick: 'EVEN', olaf: 'TRICKY', vayne: 'EVEN', heimerdinger: 'TRICKY', jayce: 'TRICKY', quinn: 'TRICKY', teemo: 'TRICKY', cassiopeia: 'TRICKY', karma: 'EVEN', lillia: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', neeko: 'EVEN', ryze: 'EVEN' },
    aurora: { garen: 'TRICKY', illaoi: 'FAVOURED', trundle: 'EVEN', yorick: 'EVEN', fiora: 'EVEN', vayne: 'EVEN', malphite: 'EVEN', shen: 'FAVOURED', heimerdinger: 'TRICKY' },
    camille: { illaoi: 'FAVOURED', mordekaiser: 'FAVOURED', sett: 'FAVOURED', fiora: 'TRICKY', jax: 'TRICKY', renekton: 'TRICKY', tryndamere: 'TRICKY', nautilus: 'FAVOURED', shen: 'TRICKY', jayce: 'TRICKY', quinn: 'TRICKY', singed: 'FAVOURED', cassiopeia: 'TRICKY', karma: 'EVEN', lillia: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', neeko: 'EVEN', ryze: 'EVEN' },
    cassiopeia: { ambessa: 'FAVOURED', camille: 'FAVOURED', fiora: 'EVEN', gragas: 'FAVOURED', gwen: 'EVEN', irelia: 'EVEN', jax: 'EVEN', kled: 'FAVOURED', olaf: 'EVEN', pantheon: 'FAVOURED', renekton: 'FAVOURED', riven: 'FAVOURED', tryndamere: 'FAVOURED', warwick: 'FAVOURED', wukong: 'FAVOURED', yasuo: 'FAVOURED', yone: 'FAVOURED', zaahen: 'FAVOURED', ksante: 'FAVOURED', poppy: 'FAVOURED', singed: 'FAVOURED' },
    chogath: { aatrox: 'TRICKY', drmundo: 'TRICKY', garen: 'FAVOURED', illaoi: 'TRICKY', volibear: 'FAVOURED', gragas: 'TRICKY', pantheon: 'EVEN', tryndamere: 'EVEN', warwick: 'TRICKY', yasuo: 'FAVOURED', sion: 'FAVOURED', jayce: 'EVEN', teemo: 'TRICKY', sylas: 'TRICKY' },
    darius: { aatrox: 'FAVOURED', mordekaiser: 'TRICKY', irelia: 'TRICKY', jax: 'TRICKY', renekton: 'TRICKY', riven: 'TRICKY', sion: 'FAVOURED', gnar: 'EVEN', swain: 'TRICKY', vladimir: 'TRICKY', galio: 'FAVOURED' },
    drmundo: { darius: 'FAVOURED', trundle: 'TRICKY', olaf: 'TRICKY', renekton: 'FAVOURED', riven: 'TRICKY', yone: 'TRICKY', sion: 'FAVOURED', heimerdinger: 'TRICKY', teemo: 'TRICKY', swain: 'TRICKY' },
    fiora: { camille: 'FAVOURED', cassiopeia: 'TRICKY', mordekaiser: 'FAVOURED', sett: 'FAVOURED', urgot: 'FAVOURED', volibear: 'FAVOURED', gragas: 'TRICKY', jax: 'TRICKY', renekton: 'TRICKY', riven: 'TRICKY', yasuo: 'FAVOURED', yone: 'FAVOURED', nautilus: 'FAVOURED', poppy: 'TRICKY', gnar: 'EVEN', jayce: 'TRICKY', quinn: 'TRICKY', singed: 'FAVOURED', galio: 'FAVOURED', karma: 'FAVOURED', lillia: 'EVEN', lucian: 'TRICKY', mel: 'FAVOURED', ziggs: 'TRICKY' },
    galio: { akshan: 'TRICKY', darius: 'TRICKY', fiora: 'TRICKY', jax: 'TRICKY', lillia: 'TRICKY' },
    gangplank: { darius: 'EVEN', mordekaiser: 'TRICKY', volibear: 'FAVOURED', renekton: 'EVEN', wukong: 'EVEN', yone: 'FAVOURED' },
    garen: { yorick: 'TRICKY', gragas: 'FAVOURED', irelia: 'TRICKY', kled: 'FAVOURED', olaf: 'TRICKY', riven: 'TRICKY', malphite: 'TRICKY', ornn: 'TRICKY', singed: 'TRICKY', vladimir: 'TRICKY', lucian: 'TRICKY', ziggs: 'TRICKY' },
    gnar: { aurora: 'TRICKY', mordekaiser: 'EVEN', volibear: 'FAVOURED', olaf: 'EVEN', vayne: 'EVEN', maokai: 'TRICKY' },
    gragas: { cassiopeia: 'TRICKY', darius: 'FAVOURED', gangplank: 'EVEN', mordekaiser: 'TRICKY', olaf: 'TRICKY', vayne: 'FAVOURED', ksante: 'TRICKY', heimerdinger: 'TRICKY', jayce: 'TRICKY', quinn: 'TRICKY', lucian: 'TRICKY', ziggs: 'TRICKY' },
    graves: { jax: 'TRICKY', malphite: 'TRICKY' },
    gwen: { aatrox: 'FAVOURED', cassiopeia: 'TRICKY', garen: 'TRICKY', illaoi: 'FAVOURED', mordekaiser: 'FAVOURED', sett: 'FAVOURED', urgot: 'FAVOURED', volibear: 'TRICKY', riven: 'TRICKY', nautilus: 'FAVOURED', heimerdinger: 'TRICKY', jayce: 'TRICKY', quinn: 'TRICKY', karma: 'EVEN', lucian: 'TRICKY', ziggs: 'TRICKY' },
    heimerdinger: { akali: 'EVEN', ambessa: 'FAVOURED', aurora: 'FAVOURED', chogath: 'TRICKY', drmundo: 'EVEN', gnar: 'TRICKY', gragas: 'FAVOURED', gwen: 'FAVOURED', illaoi: 'FAVOURED', trundle: 'EVEN', urgot: 'EVEN', yorick: 'EVEN', kled: 'FAVOURED', riven: 'EVEN', tryndamere: 'EVEN', warwick: 'FAVOURED', wukong: 'EVEN', yone: 'EVEN', nautilus: 'FAVOURED', shen: 'FAVOURED', jayce: 'TRICKY', zaahen: 'FAVOURED' },
    illaoi: { aatrox: 'FAVOURED', akali: 'TRICKY', aurora: 'TRICKY', camille: 'TRICKY', darius: 'TRICKY', drmundo: 'FAVOURED', gwen: 'TRICKY', heimerdinger: 'TRICKY', sett: 'FAVOURED', volibear: 'FAVOURED', yorick: 'TRICKY', irelia: 'TRICKY', jax: 'TRICKY', olaf: 'TRICKY', riven: 'TRICKY', yasuo: 'TRICKY', yone: 'TRICKY' },
    irelia: { aatrox: 'FAVOURED', akali: 'TRICKY', camille: 'TRICKY', cassiopeia: 'TRICKY', darius: 'FAVOURED', drmundo: 'FAVOURED', fiora: 'TRICKY', garen: 'FAVOURED', gragas: 'FAVOURED', illaoi: 'FAVOURED', nasus: 'FAVOURED', urgot: 'FAVOURED', olaf: 'TRICKY', vayne: 'FAVOURED', yasuo: 'FAVOURED', poppy: 'TRICKY', karma: 'EVEN', lillia: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', neeko: 'EVEN', sylas: 'FAVOURED' },
    jax: { aatrox: 'FAVOURED', akali: 'TRICKY', akshan: 'FAVOURED', camille: 'FAVOURED', cassiopeia: 'TRICKY', darius: 'FAVOURED', fiora: 'FAVOURED', galio: 'FAVOURED', graves: 'FAVOURED', illaoi: 'FAVOURED', sett: 'FAVOURED', urgot: 'TRICKY', yorick: 'FAVOURED', olaf: 'TRICKY', tryndamere: 'FAVOURED', warwick: 'FAVOURED', wukong: 'FAVOURED', yasuo: 'FAVOURED', yone: 'FAVOURED', ksante: 'TRICKY', ornn: 'TRICKY', poppy: 'TRICKY', jayce: 'TRICKY', teemo: 'TRICKY', karma: 'EVEN', lucian: 'EVEN', mel: 'EVEN', ziggs: 'TRICKY' },
    jayce: { akali: 'FAVOURED', ambessa: 'FAVOURED', camille: 'FAVOURED', fiora: 'EVEN', gragas: 'FAVOURED', gwen: 'FAVOURED', heimerdinger: 'EVEN', jax: 'FAVOURED', urgot: 'TRICKY', yorick: 'FAVOURED', olaf: 'EVEN', pantheon: 'EVEN', renekton: 'EVEN', riven: 'FAVOURED', tryndamere: 'EVEN', yone: 'FAVOURED', nautilus: 'FAVOURED', shen: 'TRICKY', singed: 'FAVOURED', zaahen: 'FAVOURED' },
    karma: { akali: 'TRICKY', ambessa: 'TRICKY', camille: 'TRICKY', fiora: 'TRICKY', gwen: 'TRICKY', irelia: 'TRICKY', jax: 'TRICKY', kled: 'TRICKY', pantheon: 'TRICKY', wukong: 'TRICKY', yasuo: 'TRICKY', yone: 'TRICKY', zaahen: 'TRICKY', sylas: 'TRICKY' },
    kassadin: { aurora: 'TRICKY', cassiopeia: 'TRICKY', chogath: 'TRICKY', drmundo: 'TRICKY', galio: 'TRICKY', gragas: 'TRICKY', mordekaiser: 'TRICKY', malphite: 'TRICKY', maokai: 'TRICKY', ornn: 'TRICKY', sion: 'TRICKY', kayle: 'TRICKY', kennen: 'TRICKY', rumble: 'TRICKY', singed: 'TRICKY', swain: 'TRICKY', teemo: 'TRICKY', lillia: 'TRICKY', neeko: 'TRICKY' },
    kayle: { akshan: 'TRICKY', aurora: 'TRICKY', graves: 'TRICKY', ksante: 'FAVOURED', shen: 'FAVOURED', singed: 'TRICKY', lucian: 'TRICKY' },
    kennen: { camille: 'TRICKY', chogath: 'TRICKY', galio: 'TRICKY', gwen: 'TRICKY', trundle: 'EVEN', yorick: 'FAVOURED', vayne: 'FAVOURED', yone: 'FAVOURED', nautilus: 'TRICKY', sion: 'TRICKY', singed: 'TRICKY' },
    kled: { cassiopeia: 'TRICKY', heimerdinger: 'TRICKY', karma: 'EVEN', mordekaiser: 'TRICKY', riven: 'FAVOURED', lucian: 'TRICKY', mel: 'EVEN', ziggs: 'TRICKY' },
    ksante: { cassiopeia: 'TRICKY', drmundo: 'TRICKY', renekton: 'TRICKY', vayne: 'TRICKY', teemo: 'TRICKY', lucian: 'TRICKY', ziggs: 'TRICKY' },
    lillia: { akali: 'TRICKY', ambessa: 'TRICKY', camille: 'TRICKY', fiora: 'TRICKY', irelia: 'TRICKY' },
    lucian: { akali: 'EVEN', ambessa: 'FAVOURED', camille: 'EVEN', fiora: 'EVEN', garen: 'FAVOURED', gragas: 'FAVOURED', gwen: 'EVEN', irelia: 'EVEN', jax: 'TRICKY', kled: 'FAVOURED', ksante: 'FAVOURED', urgot: 'FAVOURED', volibear: 'FAVOURED', olaf: 'FAVOURED', renekton: 'FAVOURED', riven: 'FAVOURED', tryndamere: 'FAVOURED', warwick: 'FAVOURED', wukong: 'FAVOURED', yone: 'EVEN', zaahen: 'FAVOURED', malphite: 'FAVOURED', nautilus: 'FAVOURED', poppy: 'FAVOURED', shen: 'EVEN', tahmkench: 'FAVOURED', singed: 'FAVOURED' },
    malphite: { aatrox: 'FAVOURED', aurora: 'TRICKY', chogath: 'TRICKY', graves: 'EVEN', irelia: 'EVEN', lucian: 'TRICKY', olaf: 'TRICKY', pantheon: 'EVEN', warwick: 'TRICKY', yone: 'FAVOURED', rumble: 'TRICKY', singed: 'TRICKY', swain: 'TRICKY', vladimir: 'TRICKY', sylas: 'TRICKY' },
    maokai: { olaf: 'TRICKY', riven: 'EVEN', vayne: 'TRICKY', teemo: 'TRICKY', ziggs: 'TRICKY' },
    mel: { akali: 'TRICKY', ambessa: 'TRICKY', camille: 'TRICKY', fiora: 'TRICKY', irelia: 'TRICKY', jax: 'TRICKY', kled: 'TRICKY', olaf: 'TRICKY', pantheon: 'TRICKY', renekton: 'TRICKY', wukong: 'TRICKY', yasuo: 'TRICKY', yone: 'TRICKY', zaahen: 'TRICKY', sylas: 'TRICKY' },
    mordekaiser: { aatrox: 'FAVOURED', ambessa: 'TRICKY', camille: 'TRICKY', darius: 'FAVOURED', fiora: 'TRICKY', gangplank: 'EVEN', gnar: 'TRICKY', gwen: 'TRICKY', sett: 'FAVOURED', volibear: 'TRICKY', olaf: 'TRICKY', riven: 'TRICKY', yasuo: 'FAVOURED', yone: 'FAVOURED', shen: 'FAVOURED', quinn: 'TRICKY', singed: 'FAVOURED', swain: 'TRICKY', vladimir: 'TRICKY' },
    nasus: { drmundo: 'TRICKY', gnar: 'EVEN', irelia: 'TRICKY', kayle: 'FAVOURED', volibear: 'TRICKY', tryndamere: 'TRICKY', yasuo: 'TRICKY', yone: 'TRICKY', shen: 'TRICKY', sion: 'TRICKY', singed: 'TRICKY', zaahen: 'TRICKY' },
    nautilus: { akali: 'TRICKY', camille: 'TRICKY', fiora: 'TRICKY', gwen: 'TRICKY', heimerdinger: 'TRICKY', jayce: 'TRICKY', lucian: 'TRICKY', olaf: 'TRICKY', quinn: 'TRICKY', rumble: 'TRICKY', teemo: 'TRICKY', ziggs: 'TRICKY' },
    neeko: { akali: 'TRICKY', ambessa: 'TRICKY', camille: 'TRICKY', irelia: 'TRICKY', yasuo: 'TRICKY', yone: 'TRICKY', sylas: 'TRICKY' },
    olaf: { aatrox: 'FAVOURED', ambessa: 'FAVOURED', cassiopeia: 'TRICKY', darius: 'FAVOURED', drmundo: 'FAVOURED', garen: 'FAVOURED', gnar: 'TRICKY', gragas: 'FAVOURED', illaoi: 'FAVOURED', irelia: 'FAVOURED', jax: 'FAVOURED', jayce: 'TRICKY', lucian: 'TRICKY', malphite: 'FAVOURED', maokai: 'FAVOURED', mel: 'FAVOURED', mordekaiser: 'FAVOURED', nautilus: 'FAVOURED', sett: 'TRICKY', urgot: 'FAVOURED', volibear: 'FAVOURED', yorick: 'FAVOURED', riven: 'FAVOURED', yone: 'FAVOURED', shen: 'FAVOURED', sion: 'FAVOURED', zac: 'FAVOURED', singed: 'FAVOURED', swain: 'FAVOURED', vladimir: 'FAVOURED', zaahen: 'FAVOURED', ryze: 'FAVOURED', ziggs: 'TRICKY' },
    ornn: { akali: 'EVEN', gnar: 'EVEN', jayce: 'EVEN', maokai: 'FAVOURED', quinn: 'EVEN', sylas: 'TRICKY' },
    pantheon: { akali: 'FAVOURED', cassiopeia: 'TRICKY', darius: 'TRICKY', jayce: 'TRICKY', karma: 'EVEN', mel: 'EVEN', mordekaiser: 'FAVOURED', ornn: 'TRICKY', renekton: 'FAVOURED', sion: 'TRICKY', singed: 'TRICKY', ryze: 'EVEN', sylas: 'FAVOURED', ziggs: 'TRICKY' },
    poppy: { cassiopeia: 'TRICKY', fiora: 'EVEN', gwen: 'EVEN', jax: 'FAVOURED', lucian: 'TRICKY', mordekaiser: 'EVEN', tryndamere: 'EVEN', warwick: 'TRICKY', teemo: 'TRICKY', ziggs: 'TRICKY' },
    quinn: { akali: 'FAVOURED', ambessa: 'FAVOURED', camille: 'FAVOURED', chogath: 'FAVOURED', drmundo: 'EVEN', fiora: 'FAVOURED', gnar: 'TRICKY', gragas: 'FAVOURED', gwen: 'FAVOURED', mordekaiser: 'EVEN', nautilus: 'FAVOURED', trundle: 'EVEN', yorick: 'FAVOURED', riven: 'FAVOURED', vayne: 'FAVOURED', yone: 'FAVOURED', zaahen: 'FAVOURED' },
    renekton: { camille: 'FAVOURED', cassiopeia: 'TRICKY', darius: 'FAVOURED', jayce: 'TRICKY', ksante: 'FAVOURED', lucian: 'TRICKY', mel: 'EVEN', sett: 'FAVOURED', yorick: 'FAVOURED', sion: 'TRICKY', ryze: 'EVEN', ziggs: 'TRICKY' },
    riven: { aatrox: 'FAVOURED', akali: 'FAVOURED', cassiopeia: 'TRICKY', darius: 'FAVOURED', drmundo: 'FAVOURED', heimerdinger: 'TRICKY', illaoi: 'FAVOURED', jayce: 'TRICKY', lucian: 'TRICKY', mordekaiser: 'FAVOURED', quinn: 'TRICKY', volibear: 'FAVOURED', shen: 'FAVOURED', teemo: 'TRICKY', ziggs: 'TRICKY' },
    rumble: { camille: 'FAVOURED', galio: 'TRICKY', malphite: 'FAVOURED', nautilus: 'FAVOURED', vayne: 'FAVOURED', yasuo: 'FAVOURED' },
    ryze: { akali: 'TRICKY', ambessa: 'TRICKY', camille: 'TRICKY', olaf: 'TRICKY', pantheon: 'TRICKY', renekton: 'TRICKY', urgot: 'TRICKY', zaahen: 'TRICKY', teemo: 'EVEN', vladimir: 'FAVOURED' },
    sejuani: { gragas: 'TRICKY', singed: 'TRICKY' },
    sett: { camille: 'TRICKY', fiora: 'TRICKY', gwen: 'TRICKY', jax: 'TRICKY', renekton: 'TRICKY', yorick: 'TRICKY', vayne: 'TRICKY', warwick: 'FAVOURED', yone: 'FAVOURED', shen: 'FAVOURED', singed: 'TRICKY', vladimir: 'TRICKY' },
    shen: { akali: 'EVEN', lucian: 'TRICKY', olaf: 'TRICKY', tryndamere: 'EVEN', wukong: 'EVEN', teemo: 'TRICKY' },
    singed: { aatrox: 'FAVOURED', cassiopeia: 'TRICKY', fiora: 'TRICKY', irelia: 'EVEN', jax: 'EVEN', lucian: 'TRICKY', olaf: 'TRICKY', renekton: 'EVEN', shen: 'FAVOURED', tryndamere: 'EVEN', yone: 'FAVOURED', ziggs: 'TRICKY' },
    sion: { aatrox: 'TRICKY', akali: 'EVEN', gragas: 'TRICKY', illaoi: 'TRICKY', olaf: 'TRICKY', singed: 'TRICKY', wukong: 'EVEN', sylas: 'TRICKY' },
    swain: { darius: 'FAVOURED', drmundo: 'EVEN', malphite: 'FAVOURED', mordekaiser: 'FAVOURED', olaf: 'TRICKY', trundle: 'EVEN', yorick: 'FAVOURED', vayne: 'FAVOURED' },
    sylas: { garen: 'TRICKY', gragas: 'TRICKY', irelia: 'TRICKY', karma: 'FAVOURED', mel: 'FAVOURED', mordekaiser: 'TRICKY', neeko: 'FAVOURED', pantheon: 'TRICKY', shen: 'TRICKY', singed: 'FAVOURED', vladimir: 'TRICKY', ziggs: 'FAVOURED' },
    tahmkench: { darius: 'EVEN', gragas: 'TRICKY', lucian: 'TRICKY', shen: 'TRICKY', wukong: 'EVEN', yone: 'TRICKY', teemo: 'TRICKY' },
    teemo: { akali: 'EVEN', ambessa: 'FAVOURED', chogath: 'FAVOURED', drmundo: 'EVEN', gnar: 'TRICKY', jax: 'EVEN', ksante: 'FAVOURED', maokai: 'FAVOURED', nautilus: 'FAVOURED', poppy: 'FAVOURED', riven: 'EVEN', shen: 'FAVOURED', singed: 'TRICKY', tahmkench: 'FAVOURED', urgot: 'EVEN', yorick: 'FAVOURED', wukong: 'FAVOURED', yone: 'FAVOURED', zac: 'FAVOURED', zaahen: 'FAVOURED' },
    trundle: { akali: 'TRICKY', aurora: 'TRICKY', drmundo: 'EVEN', heimerdinger: 'TRICKY', irelia: 'FAVOURED', jax: 'TRICKY', kennen: 'TRICKY', kled: 'TRICKY', mordekaiser: 'TRICKY', quinn: 'TRICKY', swain: 'TRICKY', volibear: 'TRICKY', vayne: 'TRICKY', warwick: 'TRICKY', yone: 'FAVOURED', vladimir: 'TRICKY' },
    tryndamere: { aatrox: 'FAVOURED', cassiopeia: 'TRICKY', drmundo: 'FAVOURED', heimerdinger: 'TRICKY', jayce: 'TRICKY', lucian: 'TRICKY', ziggs: 'TRICKY' },
    urgot: { ambessa: 'TRICKY', fiora: 'TRICKY', gragas: 'TRICKY', gwen: 'TRICKY', irelia: 'TRICKY', lucian: 'TRICKY', olaf: 'TRICKY', teemo: 'TRICKY', wukong: 'TRICKY', yasuo: 'TRICKY', yone: 'EVEN', ziggs: 'TRICKY' },
    vayne: { akali: 'TRICKY', ambessa: 'TRICKY', aurora: 'TRICKY', darius: 'FAVOURED', garen: 'FAVOURED', gnar: 'TRICKY', gragas: 'TRICKY', irelia: 'TRICKY', kennen: 'TRICKY', ksante: 'FAVOURED', malphite: 'TRICKY', maokai: 'FAVOURED', quinn: 'TRICKY', rumble: 'TRICKY', sett: 'FAVOURED', swain: 'TRICKY', trundle: 'FAVOURED', yorick: 'FAVOURED', yasuo: 'TRICKY', yone: 'TRICKY', zac: 'TRICKY' },
    vladimir: { darius: 'EVEN', drmundo: 'TRICKY', garen: 'FAVOURED', gragas: 'TRICKY', gwen: 'EVEN', jax: 'EVEN', malphite: 'FAVOURED', mordekaiser: 'EVEN', olaf: 'TRICKY', sett: 'FAVOURED', trundle: 'FAVOURED', yorick: 'EVEN', yone: 'FAVOURED' },
    volibear: { aatrox: 'FAVOURED', fiora: 'TRICKY', irelia: 'FAVOURED', lucian: 'TRICKY', olaf: 'TRICKY', shen: 'TRICKY', tryndamere: 'FAVOURED' },
    warwick: { akali: 'TRICKY', camille: 'FAVOURED', cassiopeia: 'TRICKY', gragas: 'FAVOURED', heimerdinger: 'TRICKY', jax: 'TRICKY', lucian: 'TRICKY', mordekaiser: 'FAVOURED', rumble: 'TRICKY', urgot: 'TRICKY', yone: 'FAVOURED', ziggs: 'TRICKY' },
    wukong: { cassiopeia: 'TRICKY', gangplank: 'TRICKY', gragas: 'FAVOURED', heimerdinger: 'TRICKY', jax: 'TRICKY', karma: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', mordekaiser: 'EVEN', singed: 'FAVOURED', teemo: 'TRICKY', volibear: 'FAVOURED', ziggs: 'TRICKY' },
    yasuo: { akshan: 'EVEN', cassiopeia: 'TRICKY', fiora: 'TRICKY', galio: 'TRICKY', illaoi: 'EVEN', irelia: 'TRICKY', jax: 'TRICKY', karma: 'EVEN', mel: 'EVEN', mordekaiser: 'TRICKY', neeko: 'EVEN', ornn: 'TRICKY', rumble: 'TRICKY', singed: 'TRICKY', vayne: 'FAVOURED', ziggs: 'EVEN' },
    yone: { cassiopeia: 'TRICKY', fiora: 'TRICKY', gangplank: 'TRICKY', heimerdinger: 'TRICKY', illaoi: 'EVEN', jax: 'TRICKY', jayce: 'TRICKY', karma: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', mordekaiser: 'TRICKY', neeko: 'EVEN', olaf: 'TRICKY', ornn: 'TRICKY', quinn: 'TRICKY', sion: 'FAVOURED', teemo: 'TRICKY', trundle: 'TRICKY', urgot: 'TRICKY', vayne: 'EVEN', ziggs: 'EVEN' },
    yorick: { aatrox: 'FAVOURED', akali: 'TRICKY', ambessa: 'TRICKY', aurora: 'TRICKY', drmundo: 'FAVOURED', garen: 'FAVOURED', gragas: 'TRICKY', heimerdinger: 'TRICKY', illaoi: 'FAVOURED', jax: 'TRICKY', jayce: 'TRICKY', kennen: 'TRICKY', olaf: 'TRICKY', pantheon: 'EVEN', quinn: 'TRICKY', renekton: 'TRICKY', sett: 'FAVOURED', swain: 'TRICKY', teemo: 'TRICKY', urgot: 'FAVOURED', vayne: 'TRICKY', vladimir: 'TRICKY', volibear: 'FAVOURED' },
    zaahen: { cassiopeia: 'TRICKY', heimerdinger: 'TRICKY', jayce: 'TRICKY', karma: 'EVEN', lucian: 'TRICKY', mel: 'EVEN', olaf: 'TRICKY', quinn: 'TRICKY', ryze: 'EVEN', teemo: 'TRICKY', ziggs: 'TRICKY' },
    zac: { olaf: 'TRICKY', sylas: 'TRICKY', teemo: 'TRICKY', vayne: 'EVEN', volibear: 'TRICKY', ziggs: 'TRICKY' },
    ziggs: { fiora: 'EVEN', garen: 'FAVOURED', gragas: 'FAVOURED', gwen: 'EVEN', jax: 'EVEN', kled: 'EVEN', ksante: 'FAVOURED', maokai: 'FAVOURED', nautilus: 'FAVOURED', olaf: 'EVEN', pantheon: 'EVEN', poppy: 'FAVOURED', renekton: 'EVEN', riven: 'EVEN', singed: 'FAVOURED', sylas: 'TRICKY', tryndamere: 'EVEN', urgot: 'FAVOURED', warwick: 'FAVOURED', wukong: 'EVEN', yasuo: 'TRICKY', yone: 'TRICKY', zaahen: 'EVEN', zac: 'EVEN' },
  };
  function apply(db) {
    if (!db) return;
    Object.keys(FIX).forEach(function (champ) {
      var entry = db[champ];
      if (!entry) return;
      Object.keys(FIX[champ]).forEach(function (foe) {
        var m = entry[foe];
        if (!m) return;
        m.diff = FIX[champ][foe];
        m.tone = T[FIX[champ][foe]];
      });
    });
  }
  function applyAll() { apply(window.CHAMP_DATA); apply(window.CHAMP_FULL); }
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
