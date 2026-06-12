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

  function start() {
    queueScan();
    new MutationObserver(queueScan).observe(document.body, {
      subtree: true, childList: true, attributes: true, attributeFilter: ['placeholder']
    });
    // Safety-net rescan (same idempotent retry pattern as the data fix files):
    // catches anything a missed mutation or wedged preload left unfilled.
    setInterval(scan, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
