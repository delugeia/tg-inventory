'use strict';

// Keep every mockup here, ordered by its first appearance in the presentation.
// Add future mockups to this list and to README.md when they are created.
const mockups = [
  { id: 'users', label: 'Users', folder: 'user-management' },
  { id: 'catalog', label: 'Catalog', folder: 'catalog' },
  { id: 'inventory', label: 'Inventory', folder: 'inventory-index' },
  { id: 'item', label: 'Item & History', folder: 'item-view' },
  { id: 'counts', label: 'Location Counts', folder: 'location-reconciliation' },
  { id: 'relocations', label: 'Relocations', folder: 'relocation-requests' },
  { id: 'purchases', label: 'Purchase Requests', folder: 'purchase-requests' },
  { id: 'pricing', label: 'Purchase Pricing', folder: 'purchase-entry' },
  { id: 'events', label: 'Events', folder: 'event-reconciliation' }
];

const nav = document.querySelector('#mockup-nav');
const panes = document.querySelector('#preview-panes');
const frames = new Map();
const links = new Map();

for (const mockup of mockups) {
  const link = document.createElement('a');
  link.href = `#${mockup.id}`;
  link.textContent = mockup.label;
  nav.append(link);
  links.set(mockup.id, link);
}

function selectMockup() {
  const selected = mockups.find(mockup => `#${mockup.id}` === location.hash) || mockups[0];
  // Keep visited workflows alive so switching the sidebar preserves unsaved inputs.
  // No child DOM, data, history, or storage is changed by this wrapper.
  if (!frames.has(selected.id)) {
    const frame = document.createElement('iframe');
    frame.title = `${selected.label} mockup and workflow`;
    frame.src = `${selected.folder}/index.html`;
    frames.set(selected.id, frame);
    panes.append(frame);
  }
  for (const [id, frame] of frames) frame.hidden = id !== selected.id;
  for (const [id, link] of links) {
    if (id === selected.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.querySelector('#selection-title').textContent = selected.label;
  document.querySelector('#selection-open').href = `${selected.folder}/index.html`;
  document.title = `${selected.label} · TG Inventory Mockups`;
}

window.addEventListener('hashchange', selectMockup);
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#preview').focus();
});
selectMockup();
