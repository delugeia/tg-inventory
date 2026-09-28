'use strict';
const model = ItemInventory;
const sampleItem = { itemName: 'He/Him Pronoun Ribbon', itemSku: 'RP_HEHIM', actor: 'Jarod Nash (sample manager)' };
const fixtures = {
  grouped: [
    { location: 'Central', before: 2000, after: 1950, delta: -50, rationale: 'Counted 50 fewer ribbons during the storage check.' },
    { location: 'Indianapolis IN', before: 550, after: 597, delta: 47, rationale: 'Found an additional partial pack.' },
    { location: 'Ames IA', before: 0, after: 1400, delta: 1400, rationale: '' }
  ].map(entry => ({ ...entry, ...sampleItem, date: '2026-09-26T21:30:18Z', cost: 0.160 })),
  'sample-indianapolis': [{ ...sampleItem, date: '2026-09-25T19:14:32Z', location: 'Indianapolis IN', before: 500, after: 550, delta: 50, rationale: 'Additional ribbons found in storage.', cost: 0.160 }],
  'sample-starting': [{ ...sampleItem, date: '2026-09-01T15:08:06Z', location: 'Central', before: 0, after: 2000, delta: 2000, rationale: 'starting inventory', cost: 0 }]
};
function appendCell(row, text, numeric = false) {
  const cell = document.createElement('td'); cell.textContent = text;
  if (numeric) cell.className = 'number'; row.append(cell); return cell;
}
function rationale(cell, text) {
  const note = document.createElement('span'); note.className = 'record-rationale';
  note.textContent = text ? `Rationale: ${text}` : 'No rationale provided'; cell.append(note);
}
const currency = value => value === null ? 'Not set' : '$' + value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 12 });
function renderRecord() {
  const id = new URLSearchParams(location.search).get('batch') || 'grouped';
  let records;
  try {
    records = fixtures[id] || model.load().corrections.filter(entry => model.adjustmentId(entry) === id);
    if (!records.length) throw new Error('Missing record');
    const first = records[0];
    document.querySelector('#record-item').textContent = first.itemName || 'Item name not captured in this earlier demo';
    document.querySelector('#record-sku').textContent = first.itemSku || 'Not captured';
    document.querySelector('#record-actor').textContent = first.actor || 'Not captured in this earlier demo';
    const time = document.querySelector('#record-time'); time.dateTime = first.date;
    time.textContent = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'long', timeZone: 'America/Chicago' }).format(new Date(first.date));
    document.querySelector('#record-summary').textContent = `${records.length} ${records.length === 1 ? 'change recorded' : 'changes recorded together'} in one save.`;
    if (id === 'grouped') document.querySelector('#sample-note').textContent = 'Illustrative grouped record · Does not change demo inventory';
    const quantities = records.filter(entry => entry.kind !== 'cost').sort((a,b)=>InventoryOrder.compare(a.location,b.location));
    const costs = records.filter(entry => entry.kind === 'cost');
    const quantityBody = document.querySelector('#quantity-records'); quantityBody.replaceChildren();
    quantities.forEach(entry => {
      const row = document.createElement('tr');
      rationale(appendCell(row, entry.location), entry.rationale);
      appendCell(row, model.format(entry.before), true); appendCell(row, model.format(entry.after), true);
      appendCell(row, `${entry.delta > 0 ? '+' : '−'}${model.format(Math.abs(entry.delta))}`, true);
      appendCell(row, entry.cost === null ? 'Not set' : entry.cost === 0 ? 'n/a' : '$' + entry.cost.toFixed(3), true);
      quantityBody.append(row);
    });
    document.querySelector('#location-count').textContent = `${quantities.length} ${quantities.length === 1 ? 'location' : 'locations'}`;
    document.querySelector('#quantity-section').hidden = quantities.length === 0;
    const costBody = document.querySelector('#cost-records'); costBody.replaceChildren();
    costs.forEach(entry => {
      const row = document.createElement('tr'); rationale(appendCell(row, 'Unit Cost'), entry.rationale);
      appendCell(row, currency(entry.before), true); appendCell(row, currency(entry.after), true); costBody.append(row);
    });
    document.querySelector('#cost-section').hidden = costs.length === 0;
    document.querySelector('#record-content').hidden = false;
  } catch {
    document.querySelector('#record-summary').textContent = 'This adjustment is not available in the current demo. Return to Item History to choose a record.';
    document.querySelector('#record-content').hidden = true;
  }
}
window.addEventListener('pageshow', renderRecord);
