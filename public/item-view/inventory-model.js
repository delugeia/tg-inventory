(function (root) {
  'use strict';
  const params = new URLSearchParams(typeof location === 'undefined' ? '' : location.search);
  const catalogId = params.get('catalogItem');
  const sample = params.get('sample');
  const catalogKey = 'tg-catalog-draft-v1' + (sample ? ':sample:' + sample.slice(0,80) : '');
  const key = catalogId ? catalogKey + ':item:' + catalogId : 'tg-item-inventory-demo-v2';
  function catalogData() { const data=JSON.parse(localStorage.getItem(catalogKey)||'null');if(!data?.items?.some(i=>i.id===catalogId))throw Error('Catalog item unavailable');return data; }
  function catalogCollections() { if(!catalogId)return null;const data=catalogData();return data.collections.map(c=>({category:data.categories.find(x=>x.id===c.categoryId).name,name:c.name,prefix:c.prefix})); }
  function url(path) { if(!catalogId)return path;const u=new URL(path,location.href);u.searchParams.set('catalogItem',catalogId);if(sample)u.searchParams.set('sample',sample);return u.href; }
  function save(data) { if(!catalogId){sessionStorage.setItem(key,JSON.stringify(data));return;}const catalog=catalogData(),item=catalog.items.find(i=>i.id===catalogId);const collection=catalog.collections.find(c=>catalog.categories.find(cat=>cat.id===c.categoryId).name+' / '+c.name===data.details.collection);if(!collection)throw Error('Collection unavailable');if(catalog.items.some(i=>i.id!==catalogId&&i.itemState.details.sku.toLowerCase()===data.details.sku.toLowerCase()))throw Error('SKU already used');item.collectionId=collection.id;item.itemState=data;localStorage.setItem(catalogKey,JSON.stringify(catalog)); }
  const draftKey = key + '-draft';
  // Append locations so saved three-location quantities and drafts retain their associations.
  const locations = ['Central', 'Indianapolis IN', 'Ames IA', 'Boston MA', 'Milwaukee WI'];
  const initial = () => ({ quantities: [2000, 550, 0, 0, 0], corrections: [] });
  const defaultDetails = () => ({
    name: 'He/Him Pronoun Ribbon', collection: 'Ribbons / Pronouns', variety: 'He/Him', sku: 'RP_HEHIM',
    purpose: 'Visibility', programs: ['Conventions'], active: true, bundleType: 'Pack', bundleQuantity: '100',
    notes: 'Pronoun badge ribbon for convention and community-event distribution. Stored in packs of 100; inventory is counted as individual ribbons.',
    unitCost: '0.160', irsValue: '', inPersonAsk: '', onlineAsk: ''
  });
  const details = state => {
    const { donationPrice, ...saved } = state.details || {};
    return { ...defaultDetails(), ...saved, inPersonAsk: saved.inPersonAsk ?? donationPrice ?? '' };
  };
  const costValue = text => text.trim() === '' ? null : Number(text);
  function calculate(current, setText, adjustText) {
    const set = setText.trim() === '' ? NaN : Number(setText);
    const adjust = adjustText.trim() === '' ? 0 : Number(adjustText);
    const next = set + adjust;
    if (![current, set, adjust, next, next - current].every(Number.isSafeInteger)) {
      return { valid: false, message: 'Enter whole numbers. Set is required.' };
    }
    return { valid: true, next, delta: next - current };
  }
  function load() {
    let data;
    if(catalogId){const catalog=catalogData(),item=catalog.items.find(i=>i.id===catalogId),collection=catalog.collections.find(c=>c.id===item.collectionId);data=item.itemState;data.details.collection=catalog.categories.find(c=>c.id===collection.categoryId).name+' / '+collection.name;}
    else { const raw = sessionStorage.getItem(key); if (!raw) return initial(); data=JSON.parse(raw); }
    if (!Array.isArray(data.quantities) || ![3, locations.length].includes(data.quantities.length) ||
        !data.quantities.every(Number.isSafeInteger) || !Array.isArray(data.corrections)) {
      throw new Error('Invalid demo data');
    }
    while (data.quantities.length < locations.length) data.quantities.push(0);
    return data;
  }
  function loadDraft(id) {
    const raw = sessionStorage.getItem(draftKey);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (!draft || draft.id !== id) return null;
    if (!Array.isArray(draft.originals) || ![3, locations.length].includes(draft.originals.length) || !draft.originals.every(Number.isSafeInteger) ||
        !Array.isArray(draft.fields) || draft.fields.length !== draft.originals.length || !draft.fields.every(row =>
          typeof row.set === 'string' && typeof row.adjust === 'string' && typeof row.rationale === 'string')) throw new Error('Invalid draft');
    while (draft.originals.length < locations.length) { draft.originals.push(0); draft.fields.push({set:'0',adjust:'',rationale:''}); }
    return draft;
  }
  function preview(draft) {
    const rows = draft.fields.map((field, index) => calculate(draft.originals[index], field.set, field.adjust));
    if (!rows.every(row => row.valid) || !Number.isSafeInteger(rows.reduce((sum, row) => sum + row.next, 0))) throw new Error('Invalid quantities');
    return { quantities: rows.map(row => row.next), corrections: rows.flatMap((row, index) => row.delta === 0 ? [] : [{
      location: locations[index], delta: row.delta, before: draft.originals[index], after: row.next,
      rationale: draft.fields[index].rationale.trim(), cost: costValue(details(load()).unitCost)
    }]) };
  }
  const historyCells = entry => [new Date(entry.date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}), `Adjustment: ${entry.location}`, entry.kind === 'cost' ? '—' : `${entry.delta > 0 ? '+' : '−'}${Math.abs(entry.delta).toLocaleString('en-US')}`, entry.cost === null ? 'Not set' : entry.cost === 0 ? 'n/a' : `$${entry.cost.toFixed(3)}`];
  const adjustmentId = entry => entry.batchId || `legacy-${entry.date}-${entry.kind || 'quantity'}-${entry.location}`;
  const api = { isCatalogItem: Boolean(catalogId), catalogCollections, url, adjustmentId, details, costValue, calculate, load, initial, historyCells, loadDraft, preview,
    saveDraft: draft => sessionStorage.setItem(draftKey, JSON.stringify(draft)),
    clearDraft: () => sessionStorage.removeItem(draftKey), save,
    reset: () => { if(catalogId)throw Error('Reset is unavailable for Catalog items.');sessionStorage.removeItem(key); sessionStorage.removeItem(draftKey); }, locations,
    format: number => number.toLocaleString('en-US') };
  root.ItemInventory = api;
  if(catalogId && typeof document!=='undefined'){
    const preview=document.querySelector('.preview-note span');if(preview){for(const node of [...preview.childNodes])if(node.nodeType===3)node.textContent='Catalog sample · Saved in this browser ';}
    const note=document.querySelector('.action-preview');if(note)note.textContent='Catalog shares this item. Other mockups use separate data.';
    document.querySelectorAll('.section-heading span').forEach(node=>{if(node.textContent==='Individual ribbons')node.textContent='Individual units';});
    document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;const target=new URL(a.href,location.href);if(target.origin===location.origin&&target.pathname.includes('/item-view/'))a.href=url(a.href);},true);
    document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a[href]').forEach(a=>{const target=new URL(a.href,location.href);if(target.origin===location.origin&&target.pathname.includes('/item-view/'))a.href=url(a.href);});const main=document.querySelector('main');if(!main)return;const link=document.createElement('a');link.className='back-link';link.textContent='← Catalog';link.href='../catalog/index.html'+(sample?'?'+new URLSearchParams({sample}):'');const header=main.querySelector('header');if(header)header.before(link);const reset=document.querySelector('#reset-demo');if(reset)reset.hidden=true;});
  }
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
