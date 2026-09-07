// api-client.js — thin client for the MatchupCoach backend (/api on same origin).
// window.MC_API.available() resolves true when the backend answers /api/health;
// the app falls back to its localStorage demo mode when it doesn't — but only
// from file:// (local dev). On the web a "no" means the server is restarting,
// and the app waits for it instead. Token lives in localStorage (remember-me)
// or sessionStorage, sent as a Bearer header.
(function () {
  'use strict';
  var BASE = '/api';
  var availP = null;

  function token() {
    try { return localStorage.getItem('mc_token') || sessionStorage.getItem('mc_token') || ''; } catch (e) { return ''; }
  }
  function setToken(t, remember) {
    try {
      if (remember) { localStorage.setItem('mc_token', t); sessionStorage.removeItem('mc_token'); }
      else { sessionStorage.setItem('mc_token', t); localStorage.removeItem('mc_token'); }
    } catch (e) {}
  }
  function clearToken() {
    try { localStorage.removeItem('mc_token'); sessionStorage.removeItem('mc_token'); } catch (e) {}
  }

  function call(method, path, body) {
    var headers = { 'Content-Type': 'application/json' };
    var t = token();
    if (t) headers.Authorization = 'Bearer ' + t;
    return fetch(BASE + path, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) {
          var err = new Error(j.error || ('Request failed (' + r.status + ')'));
          err.api = true; err.status = r.status;
          // Tell the app a signed-in action was refused, so a stale or
          // token-less mc_session gets dropped wherever the 401 came from.
          if (r.status === 401) {
            try { window.dispatchEvent(new CustomEvent('mc:unauthorized', { detail: { path: path } })); } catch (e2) {}
          }
          throw err;
        }
        return j;
      });
    });
  }

  // One probe of /api/health: 8s timeout, and a non-OK answer (the 502s a
  // restarting Render instance returns for ~40s) is retried with backoff — up
  // to 3 retries, 1s/2s/4s apart. A fetch that fails outright (file://, no
  // network) is not retried, so file:// keeps answering "no" instantly.
  function probe(attempt) {
    var ctl = (typeof AbortController === 'function') ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 8000) : null;
    var opts = { cache: 'no-store' };
    if (ctl) opts.signal = ctl.signal;
    return fetch(BASE + '/health', opts)
      .then(function (r) { return r.ok ? 'ok' : 'bad'; }, function () { return (ctl && ctl.signal.aborted) ? 'bad' : 'fail'; })
      .then(function (res) {
        if (timer) clearTimeout(timer);
        if (res === 'ok') return true;
        if (res === 'fail' || attempt >= 4) return false;
        return new Promise(function (resolve) { setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)); })
          .then(function () { return probe(attempt + 1); });
      });
  }
  // A true answer is memoised for the page lifetime. A false answer is NOT:
  // the promise is dropped, so the next available() call probes again instead
  // of pinning the whole session into demo mode because the backend happened
  // to be restarting when the page loaded.
  function available() {
    if (!availP) {
      availP = probe(1).then(function (ok) { if (!ok) availP = null; return ok; });
    }
    return availP;
  }

  window.MC_API = {
    available: available,
    token: token,
    setToken: setToken,
    clearToken: clearToken,
    get: function (p) { return call('GET', p); },
    post: function (p, b) { return call('POST', p, b); }
  };
})();
