'use strict';
document.querySelector('#results-ok').addEventListener('click', () => { location.href = 'index.html'; });
function renderResults() {
  const title = document.querySelector('#results-title');
  const summary = document.querySelector('#results-summary');
  const section = document.querySelector('#results-section');
  const body = document.querySelector('#recorded-changes');
  section.hidden = true;
  body.replaceChildren();
  try {
    const state = ItemInventory.load();
    const id = new URLSearchParams(location.search).get('batch');
    const batch = state.batches?.find(entry => entry.id === id);
    if (!batch) {
      title.textContent = 'Results unavailable';
      summary.textContent = 'There is no saved result for this page in the current demo. Select OK to return to the item.';
      return;
    }
    const changes = state.corrections.filter(entry => entry.batchId === id);
    if (!changes.length) {
      title.textContent = 'No inventory changes';
      summary.textContent = 'Quantities were unchanged. No History entries were created.';
      return;
    }
    title.textContent = 'Inventory saved';
    summary.textContent = `${changes.length} ${changes.length === 1 ? 'correction was' : 'corrections were'} recorded. These entries have been added to this item’s History.`;
    changes.forEach(change => {
      const row = document.createElement('tr');
      ItemInventory.historyCells(change).forEach((value, index) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        if (index > 1) cell.className = 'number';
        if (index === 1 && change.rationale) {
          const note = document.createElement('span');
          note.className = 'result-rationale';
          note.textContent = `Rationale: ${change.rationale}`;
          cell.append(note);
        }
        row.append(cell);
      });
      body.append(row);
    });
    section.hidden = false;
  } catch {
    title.textContent = 'Results unavailable';
    summary.textContent = 'The saved demo could not be read. Select OK to return to the item.';
  }
}
window.addEventListener('pageshow', renderResults);
