// api-client.js — thin client for the MatchupCoach backend (/api on same origin).
// window.MC_API.available() resolves true when the backend answers /api/health;
// the app falls back to its localStorage demo mode when it doesn't (file://,
// plain static hosting). Token lives in localStorage (remember-me) or
// sessionStorage, sent as a Bearer header.
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
          throw err;
        }
        return j;
      });
    });
  }

  function available() {
    if (!availP) {
      availP = fetch(BASE + '/health').then(function (r) { return r.ok; }).catch(function () { return false; });
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
