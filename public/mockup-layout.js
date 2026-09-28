'use strict';

// Presentation layer: existing controls keep their handlers and form ownership.
// Dynamic notes stay with their source view and appear in the top box only while
// that view is present. No inventory, pricing, or persistence logic lives here.
(() => {
  const main = document.querySelector('main');
  if (!main) return;
  const info = document.createElement('div');
  info.className = 'mockup-info';
  const notes = document.createElement('div');
  notes.className = 'mockup-info-notes';
  main.prepend(info);
  main.querySelectorAll('[data-mockup-controls]').forEach(node => {
    if (node.querySelector('#inventory')) {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = node.querySelector('h2').textContent;
      node.querySelector('h2').remove();
      details.append(summary, node);
      info.append(details);
    } else info.append(node);
  });
  info.append(notes);
  const folder = location.pathname.split('/').slice(-2)[0];
  const contexts = {
    'user-management': 'User management', 'inventory-index': 'Inventory',
    'item-view': 'Inventory / Item', 'location-reconciliation': 'Location inventory',
    'relocation-requests': 'Relocation requests', 'purchase-requests': 'Purchase requests',
    'purchase-entry': 'Purchasing', 'event-reconciliation': 'Event reconciliation'
  };
  const intros = {
    'Edit Details': 'Item identity, classification, and values.',
    'Review inventory changes': 'Proposed changes to storage inventory.',
    'View Adjustment': 'Recorded inventory and cost changes.',
    'He/Him Pronoun Ribbon': 'Inventory balances and item details.'
  };
  const defaultIntros = {
    'item-view': 'Inventory balances and item details.',
    'relocation-requests': 'Request details and recorded movements.',
    'purchase-requests': 'Purchase details and recorded activity.',
    'event-reconciliation': 'Event counts, distribution, and recorded activity.',
    'location-reconciliation': 'Storage counts and inventory corrections.'
  };
  const observer = new MutationObserver(update);
  function update() {
    observer.disconnect();
    main.querySelectorAll('[data-dialog-info]').forEach(node => node.remove());
    const sources = [...main.querySelectorAll('[data-mockup-note], .action-preview, .helper, .field-help, .example-label, p.hint')]
      .filter(node => !node.closest('.mockup-info'));
    notes.replaceChildren();
    for (const node of sources) {
      if (node.closest('.mockup-info')) continue;
      // Confirmation consequences and live empty/error states belong to the action.
      if (node.closest('dialog:not([open]), [hidden], #confirmation, #notes, #inventory') ||
          /finaliz|cannot be undone|never reopens/i.test(node.textContent) && !node.hasAttribute('data-mockup-note')) continue;
      node.classList.add('mockup-note-source');
      const copy = node.cloneNode(true);
      copy.classList.remove('mockup-note-source');
      copy.removeAttribute('id');
      copy.removeAttribute('data-mockup-note');
      copy.querySelectorAll('[id]').forEach(child => child.removeAttribute('id'));
      const dialog = node.closest('dialog[open]');
      if (dialog) {
        let dialogInfo = dialog.querySelector('[data-dialog-info]');
        if (!dialogInfo) {
          dialogInfo = document.createElement('div');
          dialogInfo.className = 'mockup-info';
          dialogInfo.setAttribute('data-dialog-info', '');
          dialog.prepend(dialogInfo);
        }
        dialogInfo.append(copy);
      } else notes.append(copy);
    }
    const header = main.querySelector('#app > header, main > header') ||
      [...main.querySelectorAll('header')].find(node => node.querySelector('h1'));
    if (header) {
      header.classList.add('page-header');
      let nav = header.querySelector('.page-nav');
      if (!nav) {
        nav = document.createElement('nav');
        nav.className = 'page-nav';
        nav.setAttribute('aria-label', 'Page navigation');
        const back = header.previousElementSibling;
        if (back && (back.matches('.back-link') || back.matches('button#back'))) nav.append(back);
        else if (back?.matches('.actions')) {
          [...back.children].filter(node => /^←/.test(node.textContent.trim())).forEach(node => nav.append(node));
          if (back.children.length) header.after(back);
          else back.remove();
        }
        header.querySelectorAll('.back-link,.eyebrow,.section-label').forEach(node => nav.append(node));
        if (!nav.textContent.trim()) nav.textContent = contexts[folder] || 'Inventory';
        header.prepend(nav);
      }
      let intro = header.querySelector('p:not(.eyebrow):not(.sku):not(.page-nav p)');
      const guidance = document.querySelector('#guidance');
      if (guidance && !header.contains(guidance)) { header.append(guidance); intro = guidance; }
      if (!intro) {
        intro = document.createElement('p');
        intro.textContent = intros[header.querySelector('h1')?.textContent] || defaultIntros[folder] || contexts[folder];
        header.append(intro);
      }
      intro.classList.add('page-intro');
      // A page-level status always shares the title row, never its intro/actions.
      const title = header.querySelector('h1');
      if (title) {
        let row = title.closest('.page-title-row');
        if (!row) {
          row = title.closest('.title-row');
          if (!row) { row = document.createElement('div'); title.replaceWith(row); row.append(title); }
          row.classList.add('page-title-row');
        }
        const app = document.querySelector('#app') || main;
        const status = header.querySelector('.badge,.status,.readonly-badge') ||
          app.querySelector(':scope > .bar > .badge, :scope > p > .badge');
        if (status && status.parentElement !== row) {
          const previous = status.parentElement;
          row.append(status);
          if (previous.matches('p') && !previous.textContent.trim() && !previous.children.length) previous.remove();
        }
      }
    }
    // Labels describe the action's effect. Callback and form ownership stay intact.
    const labels = { 'Save name':'Save', 'Save changes':'Save', 'Save order details':'Save',
      'Save as Ordered':'Mark ordered', 'Cancel receiving':'Cancel',
      'Back to receipt details':'Edit receipt', 'Show All':'Show all',
      'Discard unsaved changes':'Discard changes', 'Cancel purchase request':'Cancel request',
      'Edit receipt details':'Edit receipt', 'Finalize reconciliation permanently':'Finalize event' };
    main.querySelectorAll('button').forEach(button => {
      const label = button.textContent.trim();
      if (labels[label]) button.textContent = labels[label];
      const text = button.textContent.trim();
      button.classList.toggle('cancel-action', /^(Cancel|Discard|Start over)(\b|$)/i.test(text));
      if (folder === 'purchase-entry' && button.closest('#actions') && !button.classList.contains('secondary')) button.classList.add('primary');
      if (button.matches('[data-split]')) button.classList.add('row-action');
    });
    main.querySelectorAll('.actions,.form-actions').forEach(actions => {
      const primary = [...actions.children].filter(node => node.matches('button.primary,.button.primary'));
      primary.forEach(button => { if (button !== actions.lastElementChild) actions.append(button); });
    });
    main.querySelectorAll('.badge,.status,.readonly-badge').forEach(status => {
      const text = status.textContent.trim();
      status.dataset.state = /Cancelled/i.test(text) ? 'cancelled' :
        /Received|Finalized|Complete/i.test(text) ? 'complete' :
        /View only|Inactive|Read.only/i.test(text) ? 'readonly' :
        /^(Active|Ordered|Shipped|Receiving)\b/i.test(text) ? 'active' :
        /^(Draft|Request|Requested)\b/i.test(text) ? 'pending' : 'readonly';
    });
    main.querySelectorAll('table').forEach(table => {
      const headers = [...table.querySelectorAll('thead tr:first-child th')];
      headers.forEach((cell, index) => {
        if (!/^(Available|Requested|Sent|Received|Quantity|QTY|Unit Cost|Unit|Cost|Fee|Line|Before|After|Change|Current|Counted|Merchandise|Item fee|Other Fees|Discount|Tax|Shipping|Order cost|Cost \/ unit|Acquisition|Acquisition cost|Pending Ordered|Held now|Receiving|Held after|Current cost|New cost|Brought|Remaining|Distributed)$|\b(units|quantity|distributed preview|total brought|remaining count|remaining \(report\))\b/i.test(cell.textContent.trim())) return;
        cell.classList.add('number');
        table.querySelectorAll('tbody tr').forEach(row => {
          if (row.cells.length === headers.length) row.cells[index].classList.add('number');
        });
      });
    });
    info.hidden = !info.textContent.trim();
    observer.observe(main, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden','open'] });
  }
  update();
})();
