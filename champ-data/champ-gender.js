// champ-gender.js — pronoun gender for champions, keyed by the same slug
// (lowercase alphanumeric) used everywhere else. Only female champions are
// listed; anyone not listed defaults to he/him (the app's existing voice).
// window.MC_PRON(name) -> { s: subject, o: object, p: possessive, S, P }.
(function () {
  'use strict';
  var FEMALE = ['ahri','akali','anivia','annie','ashe','aurora','ambessa','belveth','briar','caitlyn','camille','cassiopeia','diana','elise','evelynn','fiora','gwen','illaoi','irelia','janna','jinx','kaisa','kalista','karma','katarina','kindred','leblanc','leona','lillia','lissandra','lulu','lux','mel','missfortune','morgana','nami','neeko','nidalee','nilah','orianna','poppy','qiyana','quinn','rell','renata','renataglasc','riven','samira','sejuani','senna','seraphine','shyvana','sivir','sona','soraka','syndra','taliyah','tristana','vayne','vex','vi','xayah','zeri','zoe','zyra','yuumi','kayle'];
  var SET = {};
  FEMALE.forEach(function (s) { SET[s] = true; });
  var norm = function (n) { return String(n || '').toLowerCase().replace(/[^a-z0-9]/g, ''); };
  window.MC_IS_FEMALE = function (name) { return !!SET[norm(name)]; };
  // Pronoun bundle for templated text about a champion.
  window.MC_PRON = function (name) {
    if (SET[norm(name)]) return { s: 'she', o: 'her', p: 'her', S: 'She', P: 'Her' };
    return { s: 'he', o: 'him', p: 'his', S: 'He', P: 'His' };
  };
})();
