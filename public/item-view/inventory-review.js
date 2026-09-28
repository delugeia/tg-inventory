'use strict';
const model = ItemInventory;
const draftId = new URLSearchParams(location.search).get('draft');
const dialog = document.querySelector('#discard-dialog');
const error = document.querySelector('#review-error');
let draft = null;
let pending = false;
let saving = false;
function showError(message) { error.textContent = message; error.hidden = false; }
function renderReview() {
  const summary = document.querySelector('#review-summary');
  const section = document.querySelector('#review-section');
  const body = document.querySelector('#proposed-changes');
  section.hidden = true;
  body.replaceChildren();
  pending = false;
  document.querySelector('#review-save').disabled = true;
  document.querySelector('#review-edit').disabled = true;
  try {
    const state = model.load();
    document.querySelector('header .eyebrow').textContent = model.details(state).name;
    if (state.batches?.some(batch => batch.id === draftId)) {
      summary.textContent = 'These changes have already been saved. Return to the item view to see History.';
      document.querySelector('#review-cancel').textContent = 'Item view';
      return;
    }
    draft = model.loadDraft(draftId);
    if (!draft) { summary.textContent = 'No pending review is available. Return to the item and select Edit Inventory.'; return; }
    const { corrections } = model.preview(draft);
    pending = true;
    document.querySelector('#review-save').disabled = false;
    document.querySelector('#review-edit').disabled = false;
    summary.textContent = corrections.length ? 'These entries will be recorded in History if you select Save. Nothing has been saved yet.' : 'No quantities changed. Saving will return to the item without creating History entries.';
    [...corrections].sort((a,b)=>InventoryOrder.compare(a.location,b.location)).forEach(change => {
      const row = document.createElement('tr');
      const values = model.historyCells({ ...change, date: new Date().toISOString() });
      values[0] = 'On Save';
      values.forEach((value, index) => {
        const cell = document.createElement('td'); cell.textContent = value;
        if (index > 1) cell.className = 'number';
        if (index === 1 && change.rationale) {
          const note = document.createElement('span'); note.className = 'result-rationale';
          note.textContent = `Rationale: ${change.rationale}`; cell.append(note);
        }
        row.append(cell);
      });
      body.append(row);
    });
    section.hidden = corrections.length === 0;
  } catch { showError('The pending demo could not be read. Return to the item view and try again.'); }
}
document.querySelector('#review-edit').addEventListener('click', () => {
  if (!pending) return;
  pending = false;
  location.href = ItemInventory.url(`edit-inventory.html?draft=${encodeURIComponent(draftId)}`);
});
document.querySelector('#review-cancel').addEventListener('click', () => {
  if (pending) dialog.showModal(); else location.href = ItemInventory.url('index.html');
});
document.querySelector('#keep-reviewing').addEventListener('click', () => dialog.close());
document.querySelector('#discard').addEventListener('click', () => {
  try { model.clearDraft(); }
  catch { dialog.close(); showError('The draft could not be discarded. Please try again.'); return; }
  pending = false;
  location.href = ItemInventory.url('index.html');
});
document.querySelector('#review-save').addEventListener('click', () => {
  if (!pending || saving) return;
  saving = true;
  let corrections;
  try {
    const state = model.load();
    if (state.batches?.some(batch => batch.id === draftId)) { saving = false; renderReview(); return; }
    const currentDraft = model.loadDraft(draftId);
    if (!currentDraft) throw new Error('Missing draft');
    const preview = model.preview(currentDraft);
    const postedAt = new Date().toISOString();
    corrections = preview.corrections.map(change => ({ ...change, date: postedAt, batchId: draftId, actor: 'Jarod Nash (sample manager)', itemName: model.details(state).name, itemSku: model.details(state).sku }));
    model.save({ ...state, quantities: preview.quantities, corrections: [...corrections, ...state.corrections], batches: [{ id: draftId }, ...(state.batches || [])] });
  } catch { saving = false; showError('The demo could not be saved. Your review is still available; please try again.'); return; }
  pending = false;
  // The saved batch remains authoritative even if clearing temporary draft storage fails.
  try { model.clearDraft(); } catch {}
  location.href = ItemInventory.url(`index.html?saved=${corrections.length}`);
});
window.addEventListener('beforeunload', event => { if (pending) { event.preventDefault(); event.returnValue = ''; } });
window.addEventListener('pageshow', renderReview);
