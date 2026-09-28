# Location reconciliation

State: Draft. Created 2026-09-27 UTC. [Open](index.html). Standalone manager workflow with local sample balances, searches, and immutable correction History. Files: index.html, ../css/style.css, mockup.js.

1. Open the seeded **Central ribbons** search, or select any location/category/collection/name criteria. Save a named personal search; only its criteria and label are stored.
2. Open the print worksheet with recorded units and blank handwritten-count column. Native Print is available. Return later and Open search to rerun criteria against current demo inventory.
3. Enter counts: all inputs start empty, including the recorded zero row. Tab and Enter move through count fields. Leave the 12,000 Gaymer Ribbon blank, enter **9,000** for He/Him (recorded 10,000), and optionally **0** for another stocked item.
4. Review only changed rows; add optional per-item rationales. Edit retains inputs. Cancel discards with warning. Save corrections posts once, preserves cost, and shows read-only per-item entries.
5. Reopen the saved search: new recorded counts appear and a new entry pass starts blank. Inactive stocked items are included; inactive zero-stock items excluded; active zero-stock items included.

D-106 reinforces D-029–D-032. No stored worksheet/result quantities, no stale-count checks, and no movement warnings. Demo inventory is persisted separately from the personal criteria records, under `tg-location-reconciliation-v2`; unsaved counts stay in memory only and browser navigation warns. No cross-mockup stock synchronization.

**Agent Suggestions**: print timestamp/name headings; nonnegative safe-integer count validation with well-formed commas; ID/timestamp formatting; grouped source presentation of multiple item corrections (individual item entries remain separate). Post-save record view is specific to this count workflow and does not replace item Edit Inventory's confirmed pre-save flow. Browser-local personal searches illustrate one manager; real access security is not implemented.

Source: [Location Inventory and Item Ledger](../../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), D-106 in [Decisions](../../status/Decisions.md). [Mockup index](../README.md). Verification summary is in the staged handoff. Physical printing/PDF completion is not claimed.

## Verification — 2026-09-27

Browser checked empty inputs, Enter/Tab advancing, comma counts, blank/zero semantics, review/Edit preservation, saved corrections with unchanged cost, refreshed worksheet, and narrow count entry. JavaScript syntax passed. See the [staged handoff](../../handoff/2026-09-27-002618Z-handoff.md) for full scope and limits. Physical printing and completed CSV file-save were not verified. Existing mockups were not reset.

## Grading refinements — 2026-09-27

Validation receives focus and scrolls into view. Discard confirmations explicitly name the counts being discarded; the simple criteria-only and blank-count workflow is unchanged. These UI refinements are Agent Suggestions for review. See the [shared assessment](../README.md#agent-assessment--2026-09-27) for the grade and remaining considerations.

**New sample** opens an independent example in a new tab without clearing existing work. The added source file `sample-session.js` selects a storage-key suffix from the `sample` URL parameter; preserve that URL to revisit its sample. Existing base-key examples remain available at the ordinary URL. All sample storage is browser-local, not application storage.

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.

## Choose inventory refinement — D-113

Choose inventory uses the same explicit Search/Show all/Reset and collapsible collection checklist as the Inventory index. Text matches category, collection or item name; multiple collections combine as alternatives, and no collection selection ignores that filter. Exactly one storage location is required, chosen from all five sample locations; events, In Transit and Ordered are not reconciliation destinations. Include inactive zero-stock items is available as an explicit filter, off by default. Saved searches retain these criteria only and rerun current inventory; existing single-category/collection searches remain usable. Count entry, blank/zero behavior, review, immutable corrections and D-031 remain unchanged.

## Worksheet and request-table refinement — D-114

The Print Worksheet view alone has a white document/page background on screen and in print. Collection sub-header backgrounds retain exact colors, so Background graphics may remain enabled without coloring the page.

The location-count worksheet automatically opens the browser print dialog after rendering. Cancelling leaves the worksheet available; Print worksheet remains for reprinting. This applies only when entering the printable worksheet, not when opening search results or count entry.
