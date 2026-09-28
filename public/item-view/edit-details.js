'use strict';
const model = ItemInventory;
const form = document.querySelector('#details-form');
const error = document.querySelector('#details-error');
const dialog = document.querySelector('#details-discard');
let initialDetails;
let dirty = false;
let ready = false;
// Illustrative reference values, not a production taxonomy.
const collections = model.catalogCollections() || [
  { category: 'Ribbons', name: 'Pronouns', prefix: 'RP' },
  { category: 'Ribbons', name: 'Pride', prefix: 'RPR' },
  { category: 'Buttons', name: 'Pronouns', prefix: 'BP' }
];
const categoryField = form.elements.namedItem('category');
const collectionField = form.elements.namedItem('collection');
if(model.isCatalogItem){categoryField.replaceChildren(...[...new Set(collections.map(c=>c.category))].sort().map(c=>new Option(c,c)));}
function selectedCollection() { return collections.find(c => `${c.category} / ${c.name}` === collectionField.value); }
function updatePrefix() { document.querySelector('#sku-prefix').textContent = selectedCollection() ? `${selectedCollection().prefix}_` : '—'; }
function populateCollections(selected = '') {
  collectionField.replaceChildren(new Option('Select collection', ''));
  for (const c of collections.filter(c => c.category === categoryField.value)) {
    collectionField.add(new Option(`${c.name} (${c.prefix})`, `${c.category} / ${c.name}`));
  }
  collectionField.value = selected;
  updatePrefix();
}
function showError(message) { error.textContent = message; error.hidden = false; }
try {
  initialDetails = model.details(model.load());
  categoryField.value = initialDetails.collection.split(' / ')[0];
  populateCollections(initialDetails.collection);
  form.elements.namedItem('skuSuffix').value = initialDetails.sku.includes('_') ? initialDetails.sku.slice(initialDetails.sku.indexOf('_') + 1) : initialDetails.sku;
  for (const [name, value] of Object.entries(initialDetails)) {
    if (name === 'programs') form.querySelectorAll('[name="programs"]').forEach(input => input.checked = value.includes(input.value));
    else if (name === 'active') form.elements.namedItem(name).checked = value;
    else if (form.elements.namedItem(name)) form.elements.namedItem(name).value = value;
  }
  document.querySelector('#cost-disabled').value = initialDetails.unitCost;
  document.querySelector('#item-caption').textContent = initialDetails.name;
  ready = true;
} catch { showError('The saved demo could not be loaded. Return to the item view and reset the demo before editing.'); form.querySelectorAll('input,select,textarea,button[type="submit"]').forEach(input => input.disabled = true); }
function values() {
  const data = new FormData(form);
  return {
    name: data.get('name'), collection: data.get('collection'), variety: data.get('variety'), sku: (selectedCollection() ? `${selectedCollection().prefix}_` : '') + data.get('skuSuffix'),
    purpose: data.get('purpose'), programs: data.getAll('programs'), active: data.has('active'),
    bundleType: data.get('bundleType'), bundleQuantity: data.get('bundleQuantity'), notes: data.get('notes'),
    unitCost: data.get('unitCost'), irsValue: data.get('irsValue'), inPersonAsk: data.get('inPersonAsk'), onlineAsk: data.get('onlineAsk')
  };
}
form.addEventListener('input', event => {
  if (event.target === categoryField) populateCollections();
  if (event.target === collectionField) updatePrefix();
  event.target.setCustomValidity?.('');
  dirty = JSON.stringify(values()) !== JSON.stringify(initialDetails);
  document.querySelector('#cost-disabled').value = form.elements.namedItem('unitCost').value;
});
function leave() { if (dirty) dialog.showModal(); else location.href = ItemInventory.url('index.html'); }
document.querySelector('#details-back').addEventListener('click', event => { event.preventDefault(); leave(); });
document.querySelector('#details-cancel').addEventListener('click', leave);
document.querySelector('#details-keep').addEventListener('click', () => dialog.close());
document.querySelector('#details-confirm-discard').addEventListener('click', () => { dirty = false; location.href = ItemInventory.url('index.html'); });
window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
form.addEventListener('submit', event => {
  event.preventDefault(); if (!ready) return;
  const next = values();
  for (const name of ['unitCost', 'irsValue', 'inPersonAsk', 'onlineAsk', 'bundleQuantity']) {
    const input = form.elements.namedItem(name);
    const text = next[name].trim();
    const valid = text === '' || (name === 'bundleQuantity' ? /^\d+$/.test(text) && Number.isSafeInteger(Number(text)) : /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text) && Number.isFinite(Number(text)));
    input.setCustomValidity(valid ? '' : name === 'bundleQuantity' ? 'Enter a whole quantity or leave blank.' : 'Enter a nonnegative decimal value or leave blank.');
    if (!valid) { input.reportValidity(); return; }
    next[name] = text;
  }
  if (!next.name.trim()) { form.elements.namedItem('name').setCustomValidity('Enter a full name.'); form.elements.namedItem('name').reportValidity(); return; }
  try {
    const state = model.load();
    const oldCost = model.costValue(model.details(state).unitCost);
    const newCost = model.costValue(next.unitCost);
    const corrections = oldCost === newCost ? state.corrections : [{
      actor: 'Jarod Nash (sample manager)', itemName: next.name, itemSku: next.sku, batchId: `cost-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      kind: 'cost', date: new Date().toISOString(), location: 'Unit cost', delta: null,
      before: oldCost, after: newCost, cost: newCost, rationale: ''
    }, ...state.corrections];
    model.save({ ...state, details: next, corrections });
  } catch { showError('The demo could not save your details. Your edits are still here; please try again.'); return; }
  dirty = false; location.href = ItemInventory.url('index.html?detailsSaved=1');
});
