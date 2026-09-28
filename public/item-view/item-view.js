'use strict';
function renderInventory() {
  const notice = document.querySelector('#demo-notice');
  let state;
  try { state = ItemInventory.load(); }
  catch { notice.hidden = false; notice.textContent = ItemInventory.isCatalogItem ? 'Catalog item unavailable. Return to Catalog to choose an item.' : 'Saved demo data is unavailable. Reset demo to restore the sample.'; if(ItemInventory.isCatalogItem){document.querySelector('h1').textContent='Item unavailable';document.querySelectorAll('main section, .sku, .status').forEach(el=>el.hidden=true);} return; }
  if(ItemInventory.isCatalogItem){document.querySelector('tbody').replaceChildren();document.querySelector('.related-stock').hidden=true;document.querySelector('.inventory .section-heading span').textContent='Individual units';document.querySelector('.preview-note').textContent='Draft item view · Catalog sample saved in this browser';document.querySelector('.action-preview').textContent='Catalog shares this item. Other mockups use separate data.';}
  const details = ItemInventory.details(state);
  document.querySelector('h1').textContent = details.name;
  document.title = `${details.name} · Item view`;
  document.querySelector('header .eyebrow').textContent = details.collection;
  document.querySelector('.sku strong').textContent = details.sku || 'Not set';
  document.querySelector('.status').textContent = details.active ? 'Active' : 'Inactive';
  document.querySelector('.status').classList.toggle('is-inactive', !details.active);
  const cells = document.querySelectorAll('.details > .detail-list dd');
  cells[0].textContent = details.variety || 'Not set'; cells[1].textContent = details.purpose;
  cells[2].textContent = details.programs.join(', ') || 'Not set';
  cells[3].textContent = details.bundleType || details.bundleQuantity !== '' ? `${details.bundleType || 'Bundle'}${details.bundleQuantity !== '' ? ' of ' + details.bundleQuantity : ' · quantity not set'}` : 'Not set';
  const [category, collection] = details.collection.split(' / ');
  const categoryLink = document.querySelector('#category-search');
  const collectionLink = document.querySelector('#collection-search');
  categoryLink.textContent = category;
  categoryLink.href = '../inventory-index/index.html?' + new URLSearchParams({category});
  collectionLink.textContent = collection || 'Not set';
  collectionLink.href = '../inventory-index/index.html?' + new URLSearchParams({category, collection: collection || ''});
  const money = value => value === '' ? 'Not set' : '$' + Number(value).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:6});
  const costs = document.querySelectorAll('.costs dd');
  const unitCost = ItemInventory.costValue(details.unitCost);
  costs[0].textContent = unitCost === null ? 'Not set' : unitCost === 0 ? 'n/a' : '$' + unitCost.toFixed(3);
  costs[1].textContent = money(details.irsValue); costs[2].textContent = money(details.inPersonAsk); costs[3].textContent = money(details.onlineAsk);
  document.querySelector('.notes p').textContent = details.notes || 'Not set';
  if (new URLSearchParams(location.search).has('detailsSaved')) {
    notice.hidden = false; notice.textContent = 'Item details saved in this demo.'; history.replaceState(null, '', ItemInventory.url('index.html'));
  }
  document.querySelector('.available strong').textContent = ItemInventory.format(state.quantities.reduce((a,b) => a+b, 0));
  document.querySelectorAll('.storage dd > span').forEach(cell => {
    const name = cell.closest('div').querySelector('dt').textContent;
    cell.textContent = ItemInventory.format(state.quantities[ItemInventory.locations.indexOf(name)]);
  });
  document.querySelectorAll('[data-demo-correction]').forEach(row => row.remove());
  const fragment = document.createDocumentFragment();
  state.corrections.forEach(correction => {
    const row = document.createElement('tr');
    row.dataset.demoCorrection = 'true';
    row.classList.add('adjustment-history-row');
    row.dataset.adjustmentUrl = `adjustment.html?batch=${encodeURIComponent(ItemInventory.adjustmentId(correction))}`;
    row.title = `${correction.before} → ${correction.after}${correction.rationale ? '\nRationale: ' + correction.rationale : ''}`;
    ItemInventory.historyCells(correction).forEach((value,index) => {
      const cell = document.createElement('td');
      if (index === 1) { const link = document.createElement('a'); link.href = ItemInventory.url(row.dataset.adjustmentUrl); link.textContent = value; cell.append(link); }
      else cell.textContent = value;
      if (index > 1) cell.className = 'number'; row.append(cell);
    });
    fragment.append(row);
  });
  document.querySelector('tbody').prepend(fragment);
  if(ItemInventory.isCatalogItem&&!state.corrections.length){const row=document.createElement('tr');const cell=document.createElement('td');cell.colSpan=4;cell.textContent='No inventory or cost changes recorded.';row.append(cell);document.querySelector('tbody').append(row);}
  const saved = new URLSearchParams(location.search).get('saved');
  if (saved !== null) {
    notice.hidden = false;
    notice.textContent = Number(saved) ? 'Inventory saved in this demo. Corrections have been added to History.' : 'No quantity changes to save.';
    history.replaceState(null, '', ItemInventory.url('index.html'));
  }
}
document.querySelector('#reset-demo').addEventListener('click', () => {
  if (!confirm('Reset the illustrative inventory and remove demo corrections?')) return;
  try { ItemInventory.reset(); location.href = ItemInventory.url('index.html'); }
  catch { document.querySelector('#demo-notice').hidden = false; document.querySelector('#demo-notice').textContent = 'Browser storage is unavailable.'; }
});
window.addEventListener('pageshow', renderInventory);

document.querySelector('tbody').addEventListener('click', event => {
  const row = event.target.closest('[data-adjustment-url]');
  if (row && !event.target.closest('a') && !window.getSelection().toString()) location.href = ItemInventory.url(row.dataset.adjustmentUrl);
});

const fmvTrigger = document.querySelector('.help-trigger');
fmvTrigger.addEventListener('keydown', event => { if (event.key === 'Escape') fmvTrigger.parentElement.classList.add('dismissed'); });
fmvTrigger.addEventListener('focus', () => fmvTrigger.parentElement.classList.remove('dismissed'));
fmvTrigger.parentElement.addEventListener('mouseenter', () => fmvTrigger.parentElement.classList.remove('dismissed'));
