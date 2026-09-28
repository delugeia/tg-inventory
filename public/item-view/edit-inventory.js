'use strict';
const model = ItemInventory;
const form = document.querySelector('#inventory-form');
const error = document.querySelector('#form-error');
const dialog = document.querySelector('#discard-dialog');
let state;
let dirty = false;
let loaded = false;
let continuing = false;
let draft = null;
const draftId = new URLSearchParams(location.search).get('draft');
let rows = [];
function showError(message) { error.textContent = message; error.hidden = false; }
try {
  state = model.load();
  document.querySelector('header .eyebrow').textContent = model.details(state).name;
  if (draftId && !state.batches?.some(batch => batch.id === draftId)) draft = model.loadDraft(draftId);
  loaded = true;
}
catch { state = model.initial(); showError('The saved demo could not be loaded. Return to Item view and reset the demo before editing.'); }
const originals = draft ? draft.originals.slice() : state.quantities.slice();
model.locations.forEach((name, index) => {
  const row = document.createElement('div');
  row.className = 'location-editor';
  row.innerHTML = `<div class="inventory-columns"><h3 id="location-${index}"></h3><label><span class="sr-only" id="set-label-${index}">Set</span><input type="number" step="1" required id="set-${index}" aria-labelledby="location-${index} set-label-${index}"></label><label><span class="sr-only" id="adjust-label-${index}">Adjust</span><input type="number" step="1" id="adjust-${index}" aria-labelledby="location-${index} adjust-label-${index}"></label><label><span class="sr-only" id="rationale-label-${index}">Rationale (optional)</span><input type="text" id="rationale-${index}" aria-labelledby="location-${index} rationale-label-${index}"></label><span class="current-value number" aria-label="Current quantity"></span><output class="new-value number" aria-live="polite" aria-label="New quantity" for="set-${index} adjust-${index}"></output></div><p class="row-error" id="row-error-${index}" hidden></p>`;
  row.querySelector('h3').textContent = name;
  const [set, adjust, rationale] = row.querySelectorAll('input');
  set.value = draft ? draft.fields[index].set : originals[index];
  adjust.value = draft ? draft.fields[index].adjust : 0;
  rationale.value = draft ? draft.fields[index].rationale : '';
  row.querySelector('.current-value').textContent = model.format(originals[index]);
  set.setAttribute('aria-describedby', `row-error-${index}`);
  adjust.setAttribute('aria-describedby', `row-error-${index}`);
  rows.push({ row, set, adjust, rationale, output: row.querySelector('output') });
  document.querySelector('#location-inputs').append(row);
});
// Keep rows indexed by the saved model; only the DOM display order changes.
document.querySelector('#location-inputs').append(...model.locations.map((name,index)=>({name,index})).sort((a,b)=>InventoryOrder.compare(a.name,b.name)).map(({index})=>rows[index].row));
function refresh() {
  const results = rows.map(({ row, set, adjust, rationale, output }, index) => {
    const result = model.calculate(originals[index], set.value, adjust.value);
    if (set.validity.badInput || adjust.validity.badInput) result.valid = false;
    const rowError = row.querySelector('.row-error');
    rowError.hidden = result.valid;
    rowError.textContent = result.message || 'Enter whole numbers.';
    set.setAttribute('aria-invalid', String(!result.valid));
    adjust.setAttribute('aria-invalid', String(!result.valid));
    output.textContent = result.valid ? model.format(result.next) : '—';
    row.classList.toggle('changed', result.valid && result.delta !== 0);
    return result;
  });
  dirty = rows.some(({ set, adjust, rationale }, index) => set.validity.badInput || adjust.validity.badInput || set.value !== String(originals[index]) || (adjust.value !== '0' && adjust.value !== '') || rationale.value !== '');
  const total = results.reduce((sum, result) => sum + result.next, 0);
  const valid = results.every(result => result.valid) && Number.isSafeInteger(total);
  document.querySelector('#new-total').textContent = valid ? model.format(total) : '—';
  return { results, valid };
}
document.querySelector('#original-total').textContent = model.format(originals.reduce((a, b) => a + b, 0));
form.addEventListener('input', refresh);
refresh();
if (!loaded) form.querySelectorAll('input, button[type="submit"]').forEach(element => element.disabled = true);
function leave() {
  if (dirty) dialog.showModal();
  else location.href = ItemInventory.url('index.html');
}
document.querySelector('#back-link').addEventListener('click', event => { event.preventDefault(); leave(); });
document.querySelector('#cancel').addEventListener('click', leave);
document.querySelector('#keep-editing').addEventListener('click', () => dialog.close());
document.querySelector('#discard').addEventListener('click', () => {
  try { model.clearDraft(); } catch { showError('The demo could not discard its saved draft. Please try again.'); dialog.close(); return; }
  dirty = false; location.href = ItemInventory.url('index.html');
});
window.addEventListener('beforeunload', event => {
  if (dirty) { event.preventDefault(); event.returnValue = ''; }
});
// A restored browser-Back page must load the newly saved demo values.
window.addEventListener('pageshow', event => { if (event.persisted) { dirty = false; location.reload(); } });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!loaded || continuing) return;
  const { results, valid } = refresh();
  if (!valid) {
    showError('Check the quantities below. Use whole numbers within the supported range.');
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  continuing = true;
  const nextDraft = {
    id: draft?.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    originals,
    fields: rows.map(({ set, adjust, rationale }) => ({ set: set.value, adjust: adjust.value, rationale: rationale.value }))
  };
  try { model.saveDraft(nextDraft); }
  catch { continuing = false; showError('The browser could not prepare the review. Your edits are still here; allow browser storage and try again.'); return; }
  dirty = false;
  location.href = ItemInventory.url(`inventory-review.html?draft=${encodeURIComponent(nextDraft.id)}`);
});
