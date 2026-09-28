'use strict';

// Shared display order. Never reorder positional inventory data to change a view.
(function (root) {
  const events = new Set(['Gen Con', 'Origins', 'Gamehole Con', 'Gary Con', 'PAX Unplugged']);
  function rank(name, kind) {
    if (name === 'Central') return 0;
    if (name === 'In Transit') return 3;
    if (name === 'Ordered') return 4;
    if (name === 'Unknown / external') return 5;
    return kind === 'event' || events.has(name) ? 2 : 1;
  }
  function compare(a, b, kindA = 'storage', kindB = 'storage') {
    return rank(a, kindA) - rank(b, kindB) || a.localeCompare(b, 'en', { sensitivity: 'base' });
  }
  const api = { compare, sorted: names => [...names].sort(compare) };
  root.InventoryOrder = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
