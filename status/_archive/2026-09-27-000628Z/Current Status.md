# Current status

Last updated: 2026-09-26

## Stage and next activity

Requirements planning. This session completed the current pass of Item View, Edit, History, and Corrections mockups (Q-041). The user is moving to **mockup drafts of other functionalities**, with the specific functionality to be named next. A new thread should acknowledge completed work, then wait for instructions before creating another mockup. No application implementation is authorized. Specific decisions are confirmed; assembled specifications/mockups remain Draft or Ready for review, not fully Approved.

## Start here

- [Current handoff](../handoff/2026-09-26-232644Z-handoff.md): this session's final behavior, sources, pending questions, verification limits, and next-thread directive.
- [Decisions](Decisions.md): authoritative log through D-102.
- [Open Questions](Open%20Questions.md): current queue and full register; Q-041 remains partially resolved and parked for later review.
- [Future Ideas](Future%20Ideas.md): FI-001 partial purchase deliveries remains the only release-scope deferral.
- [Mockup index](../mockups/README.md): separate item-view, inventory-index, and purchase-entry mockups and usage notes.
- [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), [Inventory Index and Search](../_specifications/Inventory%20Index%20and%20Search.md), [Purchase Entry and Receiving](../_specifications/Purchase%20Entry%20and%20Receiving.md), and [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md).

## Item view, editing, and History — D-091–D-102

- Desktop main view uses 1/3 Inventory and 2/3 Item details, a highlighted final Total Available storage row, two-column descriptive/cost groups, full-width Notes, and separate event/In Transit/Ordered information. IRS FMV has Fair Market Value help. Category/Collection links submit matching index searches.
- Edit Inventory uses compact Set/Adjust/optional Rationale rows and Current/New values; Total Available uses spans. Cancel/Continue leads to pre-save review with Cancel (warning), Edit, and Save. Only final Save posts changed-location corrections and returns to item; cost is preserved. The superseded post-save results flow is archived.
- Edit Details has Full Name, dependent Category/Collection, fixed collection SKU prefix with editable suffix, blank-aware text inputs, and separate In-Person Ask/Online Ask. Unit Cost has disabled/editable permission examples; who can edit it remains postponed. Descriptive and ask changes create no inventory/cost History; cost changes create — quantity Adjustments.
- Adjustment records are immutable and read-only for everyone, grouping changes from one save with actor, timestamp, before/after values, captured cost, and optional rationale. Per-location History rows remain separate.
- Every inventory-index item-name link opens the same item-view page. The mockups retain independent data/state. Browser Back restoration works; index location links remain placeholders. The old item placeholder is archived.

See [item-view usage/source notes](../mockups/item-view/README.md) for exact files, Agent Suggestions, checks, and demo-only behavior. User feedback accepted specific refinements; the complete specification is still Draft.

## Existing index and purchase work

Inventory index (D-076–D-090) preserves explicit search, grouped balances, criteria retention, pending edits distinct from displayed results, collapsed filters on submit/return, alphabetical filter flow down columns, one scrollable listing, and CSV of displayed rows/values. Unparameterized opening waits for explicit submission; Category/Collection links are explicit submitted searches. There are 225 illustrative fixtures. See [index notes](../mockups/inventory-index/README.md).

Purchase work (D-040–D-075) covers create/edit, shipment, receipt confirmation, immutable notes, cancellation, costing/allocation, and append-only history. Other Fees, simultaneous Unit/Cost entry, and quantity changes preserving full-precision Unit are settled. Only receipt automatically recalculates catalog cost; finalization does not reopen. See [purchase specification](../_specifications/Purchase%20Entry%20and%20Receiving.md) and [mockup notes](../mockups/purchase-entry/README.md).

## Constraints to preserve

- Laravel/MariaDB on the TG webserver; planning before application code. Desktop-first throughout (D-086).
- D-028: events finalize once; later flagged corrections update reports only. Inventory corrections are separate manual adjustments; explanations optional.
- D-029–D-032: simple physical counts, individual units, criteria-only saved searches; no stale-count/movement-warning workflows or stored count snapshots.
- Storage Available excludes active events, relocation In Transit, and purchase Ordered. Events/In Transit count toward held stock for costing; Ordered does not (D-033/D-039).
- No reservations; negative balances and requests exceeding available are allowed (D-035). Preserve relocation/event stock posting rules D-036–D-038 and immutable history D-069–D-072.
- D-097 postpones the permission-holder decision for direct cost edits; earlier admin-only assumptions must not settle it. All other settled cost behavior remains.

## Reserved for later and verification limits

The live queue now awaits the next functionality. Q-041 retains catalog/validation/History exceptional cases; Q-015 retains SKU migration/uniqueness/identity; Q-019/Q-034 retain downstream blank/missing-cost semantics. Broader permissions Q-010/Q-011 are user-postponed. Q-040 index error/persistence, Q-039 purchase notes before first Save, and Q-012/Q-038 relocation details remain open. These are discussion-order changes, not new release-scope deferrals; FI-001 is unchanged.

Targeted browser and syntax checks covered the current item workflows, layout, grouped records, search links, and Back restoration. Browser-controlled unload-warning presentation and actual CSV file-save completion remain unverified. No application test suite exists. Preview last used localhost port 8766; verify it before use and preserve any user demo edits/drafts.

No blocker prevents the next mockup discussion. New agents must snapshot top-level status files once before their first status edit, preserve original rough notes, and keep the single working registers. Complete specifications require explicit approval before development.
