// champ-art.js — official champion art via Riot Data Dragon (no key needed).
// 1) window.CHAMP_ART.iconCss(name)  -> inline-CSS fragment for 30px picker tiles
//    window.CHAMP_ART.splash(name)   -> splash-art URL (versionless endpoint)
//    window.CHAMP_ART.onReady(cb)    -> fires once the live version/id map is loaded
// 2) Auto-fills every <image-slot placeholder="Drop X splash"> with that champ's
//    splash via the slot's `src` attribute. A user-dropped image always wins over
//    `src` inside the component, so this is a pure fallback. Unknown champs
//    (e.g. custom ones not in Data Dragon) keep the placeholder — the splash is
//    preloaded first and only applied if it actually exists.
(function () {
  'use strict';
  var BASE = 'https://ddragon.leagueoflegends.com';
  var LS_KEY = 'mc_ddragon';
  var WEEK = 7 * 24 * 3600 * 1000;

  // Riot's champion ids are mostly "strip punctuation, lowercase after
  // apostrophes" (Kha'Zix -> Khazix) but not always; these are the known
  // irregulars so art works even before/without the champion.json fetch.
  var EXC = {
    wukong: 'MonkeyKing', reksai: 'RekSai', ksante: 'KSante', leblanc: 'Leblanc',
    nunu: 'Nunu', nunuwillump: 'Nunu', renataglasc: 'Renata',
    fiddlesticks: 'Fiddlesticks', drmundo: 'DrMundo'
  };

  var ver = '';        // cdn version, e.g. "26.11.1" — needed for icons only
  var map = {};        // normalized display name -> ddragon id
  var ready = false;
  var cbs = [];

  function norm(n) { return String(n || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function guessId(name) {
    // Preserve case, drop spaces/periods, lowercase the letter after an apostrophe:
    // "Lee Sin"->LeeSin, "Dr. Mundo"->DrMundo, "Kha'Zix"->Khazix, "Jarvan IV"->JarvanIV
    return String(name || '').replace(/['’]\s*([A-Z])/g, function (_, c) { return c.toLowerCase(); })
      .replace(/[^A-Za-z0-9]/g, '');
  }
  function idFor(name) {
    var k = norm(name);
    return map[k] || EXC[k] || guessId(name);
  }

  function splash(name) {
    var id = idFor(name);
    return id ? BASE + '/cdn/img/champion/splash/' + id + '_0.jpg' : '';
  }
  function iconCss(name) {
    if (!ver) return '';
    var id = idFor(name);
    if (!id) return '';
    return "background-image:url('" + BASE + '/cdn/' + ver + '/img/champion/' + id +
      ".png');background-size:cover;background-position:center;";
  }
  function onReady(cb) { if (ready) cb(); else cbs.push(cb); }
  function fireReady() {
    ready = true;
    var list = cbs.slice(); cbs.length = 0;
    list.forEach(function (cb) { try { cb(); } catch (e) {} });
  }

  window.CHAMP_ART = { iconCss: iconCss, splash: splash, idFor: idFor, onReady: onReady };

  // ---- live version + id map (cached a week in localStorage) ----
  try {
    var cached = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
    if (cached && cached.v && cached.map && (Date.now() - (cached.t || 0)) < WEEK) {
      ver = cached.v; map = cached.map;
      setTimeout(fireReady, 0);
    }
  } catch (e) {}
  if (!ver) {
    fetch(BASE + '/api/versions.json')
      .then(function (r) { return r.json(); })
      .then(function (vs) {
        ver = vs[0];
        return fetch(BASE + '/cdn/' + ver + '/data/en_US/champion.json');
      })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var m = {};
        Object.keys(j.data || {}).forEach(function (id) {
          m[norm(j.data[id].name)] = id;
          m[norm(id)] = id;
        });
        map = m;
        try { localStorage.setItem(LS_KEY, JSON.stringify({ v: ver, t: Date.now(), map: m })); } catch (e) {}
        fireReady();
        scan();
      })
      .catch(function () { fireReady(); }); // offline: EXC + guessId still cover splashes
  }

  // ---- auto-fill <image-slot> splash banners ----
  var loading = {}; // url -> true while preloading

  function fillSlot(slot) {
    var m = /^Drop (.+?) splash$/.exec(slot.getAttribute('placeholder') || '');
    if (!m) return;
    var name = m[1];
    if (slot.getAttribute('data-art-for') === name) return;
    var url = splash(name);
    if (!url) return;
    // Champion changed under us: drop the stale auto-art immediately.
    if (slot.hasAttribute('data-art-for')) { slot.removeAttribute('src'); slot.removeAttribute('data-art-for'); }
    if (loading[url]) return;
    loading[url] = true;
    // Watchdog: a preload interrupted by navigation/reload must not wedge the
    // dedup flag forever — the periodic rescan will retry it.
    var watchdog = setTimeout(function () { delete loading[url]; }, 15000);
    var img = new Image();
    img.onload = function () {
      clearTimeout(watchdog); delete loading[url];
      // Re-check the slot still wants this champ (user may have navigated).
      var cur = /^Drop (.+?) splash$/.exec(slot.getAttribute('placeholder') || '');
      if (cur && cur[1] === name) { slot.setAttribute('src', url); slot.setAttribute('data-art-for', name); }
    };
    img.onerror = function () { clearTimeout(watchdog); delete loading[url]; }; // not in Data Dragon: keep placeholder
    img.src = url;
  }

  var scanQueued = false;
  function scan() {
    scanQueued = false;
    document.querySelectorAll('image-slot[placeholder]').forEach(fillSlot);
  }
  // setTimeout, NOT requestAnimationFrame: rAF never fires in a hidden /
  // backgrounded tab, which left slots empty until the tab was viewed.
  function queueScan() {
    if (scanQueued) return;
    scanQueued = true;
    setTimeout(scan, 50);
  }

  // ===================== ABILITY / ITEM / RUNE / SUMMONER ICONS ============
  // Three declarative markers, filled idempotently by the same rescan loop:
  //   data-ab="ChampName|Slot"   ability (P/Q/W/E/R) or summoner-spell icon
  //                              as the element's background image
  //   data-icontext="items|runes|summs|all"
  //                              scans the element's text for known names and
  //                              appends a small icon strip
  //   data-champ-icon="Name"     champion square as background image

  // -- per-champion ability art (champion/{id}.json, cached per champ) --
  var abil = {};        // id -> {P,Q,W,E,R: image filename} | 'loading'
  function abilFor(name) {
    if (!ver) return null;
    var id = idFor(name);
    if (!id) return null;
    if (abil[id] && abil[id] !== 'loading') return abil[id];
    if (abil[id] === 'loading') return null;
    var lsKey = 'mc_ab_' + ver + '_' + id;
    try {
      var c = JSON.parse(localStorage.getItem(lsKey) || 'null');
      if (c && c.Q) { abil[id] = c; return c; }
    } catch (e) {}
    abil[id] = 'loading';
    fetch(BASE + '/cdn/' + ver + '/data/en_US/champion/' + id + '.json')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var d = j.data[id];
        var m = { P: d.passive.image.full, Q: d.spells[0].image.full, W: d.spells[1].image.full, E: d.spells[2].image.full, R: d.spells[3].image.full };
        abil[id] = m;
        try { localStorage.setItem(lsKey, JSON.stringify(m)); } catch (e) {}
        queueScan();
      })
      .catch(function () { delete abil[id]; });
    return null;
  }
  var SUMM = { flash: 'SummonerFlash', ignite: 'SummonerDot', teleport: 'SummonerTeleport', tp: 'SummonerTeleport', ghost: 'SummonerHaste', heal: 'SummonerHeal', barrier: 'SummonerBarrier', exhaust: 'SummonerExhaust', cleanse: 'SummonerBoost', smite: 'SummonerSmite' };
  function abilityUrl(name, slot) {
    var s = String(slot || '').trim();
    var sm = SUMM[s.toLowerCase()];
    if (sm) return ver ? BASE + '/cdn/' + ver + '/img/spell/' + sm + '.png' : null;
    s = s.toUpperCase();
    if (!/^[PQWER]$/.test(s)) return null;
    var m = abilFor(name);
    if (!m) return null;
    return BASE + '/cdn/' + ver + '/img/' + (s === 'P' ? 'passive' : 'spell') + '/' + m[s];
  }

  // -- item + rune dictionaries (fetched once per version, cached) --
  var items = null, runes = null; // [{n: normalized name, name, url}]
  var normTxt = function (t) { return String(t || '').toLowerCase().replace(/[’']/g, "'"); };
  function loadDicts() {
    if (!ver || items) return;
    items = [];
    try {
      var ci = JSON.parse(localStorage.getItem('mc_items_' + ver) || 'null');
      var cr = JSON.parse(localStorage.getItem('mc_runes_' + ver) || 'null');
      if (ci && cr) { items = ci; runes = cr; return; }
    } catch (e) {}
    fetch(BASE + '/cdn/' + ver + '/data/en_US/item.json').then(function (r) { return r.json(); }).then(function (j) {
      var seen = {}, list = [];
      Object.keys(j.data).forEach(function (id) {
        var it = j.data[id];
        if (!it.gold || !it.gold.purchasable || seen[it.name]) return;
        seen[it.name] = 1;
        list.push({ n: normTxt(it.name), name: it.name, url: BASE + '/cdn/' + ver + '/img/item/' + id + '.png' });
      });
      list.sort(function (a, b) { return b.n.length - a.n.length; });
      items = list;
      try { localStorage.setItem('mc_items_' + ver, JSON.stringify(list)); } catch (e) {}
      queueScan();
    }).catch(function () { items = null; });
    fetch(BASE + '/cdn/' + ver + '/data/en_US/runesReforged.json').then(function (r) { return r.json(); }).then(function (j) {
      var list = [];
      j.forEach(function (tree) {
        list.push({ n: normTxt(tree.name), name: tree.name, url: BASE + '/cdn/img/' + tree.icon });
        tree.slots.forEach(function (sl) { sl.runes.forEach(function (rn) {
          list.push({ n: normTxt(rn.name), name: rn.name, url: BASE + '/cdn/img/' + rn.icon });
        }); });
      });
      list.sort(function (a, b) { return b.n.length - a.n.length; });
      runes = list;
      try { localStorage.setItem('mc_runes_' + ver, JSON.stringify(list)); } catch (e) {}
      queueScan();
    }).catch(function () { runes = null; });
  }
  var SUMM_DICT = Object.keys(SUMM).filter(function (k) { return k !== 'tp'; }).map(function (k) {
    return { n: k, name: k.charAt(0).toUpperCase() + k.slice(1), summ: SUMM[k] };
  });
  function summUrl(file) { return ver ? BASE + '/cdn/' + ver + '/img/spell/' + file + '.png' : null; }

  function fillAb(el) {
    // Carrier is aria-label="ab:Name|Slot" — the DC template engine strips
    // interpolated data-* attrs but passes aria-label through.
    var spec = el.getAttribute('data-ab') || (el.getAttribute('aria-label') || '').replace(/^ab:/, '');
    if (el.getAttribute('data-ab-done') === spec) return;
    var parts = spec.split('|');
    if (parts.length !== 2) return;
    var url = abilityUrl(parts[0], parts[1]);
    if (!url) return;
    el.style.backgroundImage = "url('" + url + "')";
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.textShadow = '0 1px 4px rgba(0,0,0,0.95), 0 0 7px rgba(0,0,0,0.8)';
    el.setAttribute('data-ab-done', spec);
  }
  function fillChampIcon(el) {
    var name = el.getAttribute('data-champ-icon') || '';
    if (!name || el.getAttribute('data-ci-done') === name || !ver) return;
    var id = idFor(name);
    if (!id) return;
    var url = BASE + '/cdn/' + ver + '/img/champion/' + id + '.png';
    // Preload so the fallback initials only disappear if the portrait exists.
    var im = new Image();
    im.onload = function () {
      el.style.backgroundImage = "url('" + url + "')";
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.color = 'transparent'; // hide fallback initials behind the art
    };
    im.src = url;
    el.setAttribute('data-ci-done', name);
  }
  function fillIconText(el) {
    var mode = el.getAttribute('data-icontext') || 'all';
    var text = normTxt(el.textContent).replace(/\s+/g, ' ');
    // strip our own strip's contribution so re-renders don't loop
    var sig = mode + '::' + text.slice(0, 300);
    // re-fill if React re-rendered the children and dropped our strip
    if (el.getAttribute('data-it-done') === sig && el.querySelector(':scope > .mc-ico-strip')) return;
    var found = [], used = {};
    var hunt = function (dict, getUrl) {
      if (!dict) return;
      for (var i = 0; i < dict.length && found.length < 7; i++) {
        var e2 = dict[i];
        var at = text.indexOf(e2.n);
        if (at >= 0 && !used[e2.n]) {
          // word-ish boundary check to avoid "heal" matching inside words
          var before = at === 0 ? ' ' : text.charAt(at - 1);
          var after = text.charAt(at + e2.n.length) || ' ';
          if (/[a-z0-9]/.test(before) || /[a-z0-9]/.test(after)) continue;
          used[e2.n] = 1;
          found.push({ at: at, name: e2.name, url: getUrl(e2) });
        }
      }
    };
    if (mode === 'items' || mode === 'all') hunt(items, function (e2) { return e2.url; });
    if (mode === 'runes' || mode === 'all') hunt(runes, function (e2) { return e2.url; });
    if (mode === 'summs' || mode === 'all') hunt(SUMM_DICT, function (e2) { return summUrl(e2.summ); });
    var old = el.querySelector(':scope > .mc-ico-strip');
    if (old) old.remove();
    if (found.length) {
      found.sort(function (a, b) { return a.at - b.at; });
      var strip = document.createElement('span');
      strip.className = 'mc-ico-strip';
      strip.style.cssText = 'display:inline-flex;gap:4px;align-items:center;margin-left:7px;vertical-align:middle;';
      found.forEach(function (f) {
        if (!f.url) return;
        var im = document.createElement('img');
        im.src = f.url; im.alt = f.name; im.title = f.name;
        im.style.cssText = 'width:20px;height:20px;border-radius:5px;border:1px solid rgba(255,255,255,0.22);display:inline-block;';
        strip.appendChild(im);
      });
      el.appendChild(strip);
    }
    el.setAttribute('data-it-done', sig);
  }

  function start() {
    queueScan();
    new MutationObserver(queueScan).observe(document.body, {
      subtree: true, childList: true, attributes: true, attributeFilter: ['placeholder', 'data-ab', 'data-champ-icon', 'data-icontext']
    });
    // Safety-net rescan (same idempotent retry pattern as the data fix files):
    // catches anything a missed mutation or wedged preload left unfilled.
    setInterval(scan, 1500);
  }
  var scanCore = scan;
  scan = function () {
    scanCore();
    if (!ver) return;
    loadDicts();
    document.querySelectorAll('[data-ab], [aria-label^="ab:"]').forEach(fillAb);
    document.querySelectorAll('[data-champ-icon]').forEach(fillChampIcon);
    document.querySelectorAll('[data-icontext]').forEach(fillIconText);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
