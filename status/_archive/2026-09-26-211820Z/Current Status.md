# Current status

Last updated: 2026-09-26

## Stage

Requirements planning. The next user-selected topic is Item View, Edit, History, and Corrections (Q-041), to begin in a new chat. Inventory index planning/mockup work is handed off; permissions discussion remains postponed. Inventory Behavior and the main purchase rules are settled for this pass. The user has tested and accepted the latest purchase mockup interactions. Assembled specifications remain Draft or Ready for review; no complete specification or application implementation has been approved.

## Start here

- [Current handoff](../handoff/2026-09-26-074617Z-handoff.md): completed inventory-index work and transition to Item View, Edit, History, and Corrections; includes constraints, verification limits, and the next-chat directive.
- [Purchase Entry and Receiving](../_specifications/Purchase%20Entry%20and%20Receiving.md): standalone Draft developer specification for fields, actions, calculations, receipt, notes, validation, and acceptance examples. No mockup source reuse is assumed.
- [Inventory Index and Search](../_specifications/Inventory%20Index%20and%20Search.md): Draft covering accepted browsing suggestions and explicit-search behavior; preserves the original user draft.
- [Decisions](Decisions.md): authoritative log, D-001 through D-090.
- [Open Questions](Open%20Questions.md): live Next questions queue and full register; keep current for Typora.
- [Future Ideas](Future%20Ideas.md): deferrals, including partial deliveries FI-001.
- [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md): broader requirements review.
- [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md): counts, balances, history, and checked ribbon example.
- [Mockup index](../mockups/README.md) and [purchase usage/source notes](../mockups/purchase-entry/README.md).

## Inventory viewing progress

The first [inventory index mockup](../mockups/inventory-index/index.html) is ready for user testing, with [usage/source notes](../mockups/inventory-index/README.md). It follows the purchase styling without application headers/navigation, contains 225 illustrative items, and links every item to the same minimal placeholder. Search/filter behavior, CSV serialization, Back restoration, persistence, and desktop/narrow layouts were checked; actual file-save completion was not verified in the in-app browser. User feedback on the first mockup was positive. D-089 now closes filters on Search/Enter or Show All while retaining selections and the active count. D-090 changes the checklist to alphabetical order down columns, responsive across three/two/one columns. All work remains a Draft planning mockup.

The Draft index specification records accepted search/filter behavior, grouped balance columns, inactive-zero inclusion, and explicit submission (D-076–D-080). Clear filters/Reset do not query; return navigation preserves submitted criteria and position while refreshing quantities (D-081/D-082). Retaining filters is an explicit user priority. D-088 remembers settings across reopening without loading results until submission; return/reopening always closes the filter panel while retaining selections and showing a count plus active highlighting. D-087 also preserves pending search/filter edits separately on return, retaining the changed-settings notice while results refresh using submitted criteria.

D-083 keeps pending input edits separate from displayed results with a short notice. Download remains at the bottom, exports displayed results and values without running a search, and is visible but disabled when no items are displayed. The empty table shows instructions. D-084 records approximately 225 catalog items (160 tracked items, 30 shipping container types, 35 Gayme Night games). D-085 confirms all matching rows in one scrollable listing without pagination; Download exports the entire listing, including rows below the visible screen. Original notes are preserved, and no implementation or complete specification is approved.

## Completed purchase work

The runnable [purchase mockup](../mockups/purchase-entry/index.html) covers create/edit, optional shipment, receipt review and confirmation, item and Other Fees, immutable notes, and illustrative catalog-cost averaging. Field-commit calculation preserves typing focus. Active source is index.html, styles.css, and mockup.js; the prior fragment is archived and no export step is required.

D-073 renames General Setup Fee to Other Fees, still divided equally by line count before discount/tax. D-074 introduces simultaneous Unit/Cost entry and calculated Line = Cost + Fee, row refresh, and save consistency validation. D-075 changes QTY behavior: always preserve full-precision Unit and recalculate Cost and Line, regardless of the last price field edited. Nonzero catalog costs display three decimals; purchasing may display calculated unit values to six while retaining internal precision.

D-040–D-059 settle costing, allocation, unknown costs, and admin overrides. Current catalog cost is authoritative. Only receipt automatically recalculates using current held quantity/cost plus that purchase. Unknown cost or nonpositive held quantity uses the receipt alone; other stock changes preserve cost. Held quantity includes events and relocation In Transit, but excludes pending Ordered purchases.

D-060–D-068 settle final actual receipt quantities/costs, cancellation, immutable notes, exceptions, Procurement permission, external approvals, and actual purchase dates versus posting timestamps. Receipt clears Ordered and adds location stock once; finalized purchases cannot reopen. Later changes use notes and separate inventory/admin-cost adjustments. Cancellation preserves details and affects pending expectations only.

D-069–D-072 settle append-only catalog history: initial bracketed expectation, signed bracketed order-edit deltas, negative remaining expectation on cancellation, and separate receipt additions. Every row retains its own historical values and transaction link. Ordinary relocations have distinct Shipped and Received history rows.

The documentation audit now describes intended actions independently of mockup source, with demo conveniences and unaccepted proposals labeled. Q-039 records the unresolved handling of notes before an order is first saved. Mockup guardrails are not automatically approved production policy. Documentation links/action coverage and targeted headless Edge interactions were checked; there is no application test suite yet.

## Other constraints to preserve

- Laravel/MariaDB on the TG webserver; continue planning before application development.
- D-086: the entire application is desktop-first. Optimize for desktop/laptop use; phones/tablets must remain usable, though a clunkier experience is acceptable.
- D-028: events finalize once; subsequent flagged corrections update reports only. Inventory corrections are separate manual adjustments; explanations remain optional.
- D-029–D-032: simple count/review/save flow, individual units, personal criteria-only saved searches; no count snapshots, intervening-movement warnings, or stale-count reconciliation. Include active items at zero and inactive items with stock.
- D-033/D-039: Available is central/remote storage; active events appear separately. Purchase Ordered is distinct from shipped-relocation In Transit. Starting stock uses corrections noted “starting inventory.”
- D-035: no reservations; negative balances and requests exceeding available stock are allowed.
- D-036: ordinary relocation stock moves to In Transit at shipment and to destination at receipt. D-037/D-038: event activation/additional deliveries move stock into the event, including during unfinished reconciliation.
- Checked ribbon history ends at 20,738: Central 16,550; Indianapolis 2,188; Madison 2,000; Gen Con 0, assuming the February relocation was received. At $0.160, value is $3,318.08. See the linked ledger specification for assumptions.

## Next steps and blockers

User-directed next topic: Item View, Edit, History, and Corrections (Q-041) in a new chat. Read the current handoff and the existing Location Inventory and Item Ledger specification. Start with the user's direction; do not build a new item mockup or begin application implementation automatically. Preserve settled item balances, history notation, simple manual corrections, and desktop-first design.

Keep Q-040's remaining error/persistence details for later index review. Broader permissions Q-010/Q-011 remain postponed; purchase Q-039/Q-019 and relocation Q-012/Q-038 retain their existing follow-ups. These are discussion-order changes, not release-scope deferrals. FI-001 remains unchanged. No complete specification has been approved.

No blocker prevents further requirements discussion. A new agent should follow AGENTS, read the current handoff, and snapshot the top-level status files before its first status update. Preserve the single working decision/question/future-idea lists and original rough notes. Complete specifications require explicit user approval before development.

