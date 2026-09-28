# Current status

Last updated: 2026-09-26

## Stage

Requirements planning. The active topic is inventory viewing and navigation (Q-040), selected by the user on 2026-09-26; permissions discussion is postponed for now. Inventory Behavior and the main purchase rules are settled for this pass. The user has tested and accepted the latest purchase mockup interactions. Assembled specifications remain Draft or Ready for review; no complete specification or application implementation has been approved.

## Start here

- [Current handoff](../handoff/2026-09-25-191253Z-handoff.md): completed purchasing work, constraints, verification, and next steps.
- [Purchase Entry and Receiving](../_specifications/Purchase%20Entry%20and%20Receiving.md): standalone Draft developer specification for fields, actions, calculations, receipt, notes, validation, and acceptance examples. No mockup source reuse is assumed.
- [Decisions](Decisions.md): authoritative log, D-001 through D-075.
- [Open Questions](Open%20Questions.md): live Next questions queue and full register; keep current for Typora.
- [Future Ideas](Future%20Ideas.md): deferrals, including partial deliveries FI-001.
- [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md): broader requirements review.
- [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md): counts, balances, history, and checked ribbon example.
- [Mockup index](../mockups/README.md) and [purchase usage/source notes](../mockups/purchase-entry/README.md).

## Completed purchase work

The runnable [purchase mockup](../mockups/purchase-entry/index.html) covers create/edit, optional shipment, receipt review and confirmation, item and Other Fees, immutable notes, and illustrative catalog-cost averaging. Field-commit calculation preserves typing focus. Active source is index.html, styles.css, and mockup.js; the prior fragment is archived and no export step is required.

D-073 renames General Setup Fee to Other Fees, still divided equally by line count before discount/tax. D-074 introduces simultaneous Unit/Cost entry and calculated Line = Cost + Fee, row refresh, and save consistency validation. D-075 changes QTY behavior: always preserve full-precision Unit and recalculate Cost and Line, regardless of the last price field edited. Nonzero catalog costs display three decimals; purchasing may display calculated unit values to six while retaining internal precision.

D-040–D-059 settle costing, allocation, unknown costs, and admin overrides. Current catalog cost is authoritative. Only receipt automatically recalculates using current held quantity/cost plus that purchase. Unknown cost or nonpositive held quantity uses the receipt alone; other stock changes preserve cost. Held quantity includes events and relocation In Transit, but excludes pending Ordered purchases.

D-060–D-068 settle final actual receipt quantities/costs, cancellation, immutable notes, exceptions, Procurement permission, external approvals, and actual purchase dates versus posting timestamps. Receipt clears Ordered and adds location stock once; finalized purchases cannot reopen. Later changes use notes and separate inventory/admin-cost adjustments. Cancellation preserves details and affects pending expectations only.

D-069–D-072 settle append-only catalog history: initial bracketed expectation, signed bracketed order-edit deltas, negative remaining expectation on cancellation, and separate receipt additions. Every row retains its own historical values and transaction link. Ordinary relocations have distinct Shipped and Received history rows.

The documentation audit now describes intended actions independently of mockup source, with demo conveniences and unaccepted proposals labeled. Q-039 records the unresolved handling of notes before an order is first saved. Mockup guardrails are not automatically approved production policy. Documentation links/action coverage and targeted headless Edge interactions were checked; there is no application test suite yet.

## Other constraints to preserve

- Laravel/MariaDB on the TG webserver; continue planning before application development.
- D-028: events finalize once; subsequent flagged corrections update reports only. Inventory corrections are separate manual adjustments; explanations remain optional.
- D-029–D-032: simple count/review/save flow, individual units, personal criteria-only saved searches; no count snapshots, intervening-movement warnings, or stale-count reconciliation. Include active items at zero and inactive items with stock.
- D-033/D-039: Available is central/remote storage; active events appear separately. Purchase Ordered is distinct from shipped-relocation In Transit. Starting stock uses corrections noted “starting inventory.”
- D-035: no reservations; negative balances and requests exceeding available stock are allowed.
- D-036: ordinary relocation stock moves to In Transit at shipment and to destination at receipt. D-037/D-038: event activation/additional deliveries move stock into the event, including during unfinished reconciliation.
- Checked ribbon history ends at 20,738: Central 16,550; Indianapolis 2,188; Madison 2,000; Gen Con 0, assuming the February relocation was received. At $0.160, value is $3,318.08. See the linked ledger specification for assumptions.

## Next steps and blockers

User-directed current topic: inventory viewing and navigation (Q-040). Agent Suggestion: begin with the Inventory starting view, then define navigation between item/location views, list columns, filters, sorting, and relevant print/export needs. Preserve settled balance and history behavior. Permissions (Q-010/Q-011) are parked by user direction, without changing release scope. Later purchase specification review retains Q-039 and Q-019; remaining relocation lifecycle details remain separate. Do not infer new requirements from mockup code.

No blocker prevents further requirements discussion. A new agent should follow AGENTS, read the current handoff, and snapshot the top-level status files before its first status update. Preserve the single working decision/question/future-idea lists and original rough notes. Complete specifications require explicit user approval before development.

