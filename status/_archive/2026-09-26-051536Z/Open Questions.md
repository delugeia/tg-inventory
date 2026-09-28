# Open questions

Single working question register, updated 2026-09-26. Entries are open unless explicitly marked resolved or partially resolved. Review findings are documented in [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md). Questions identify undecided behavior; they do not introduce approved requirements.

## Next questions

Keep this file open in Typora. This section is the live discussion queue; the full register below retains the details and decision references. The order is an Agent Suggestion and can change as the user directs the discussion. Answer any question when ready.

Inventory Behavior and the main purchase rules are settled for this requirements pass. The purchase mockup interactions were accepted; the assembled specifications remain Draft or Ready for review, without complete specification approval. See the [purchase handoff](../handoff/2026-09-25-191253Z-handoff.md) for completed work.

### Current topic — inventory viewing and navigation

On 2026-09-26, the user chose inventory viewing and navigation and postponed permissions discussion for now. This changes the discussion order, not release scope or existing permission decisions.

Current question (Q-040, Agent Suggestion): when opening Inventory, should the starting view be a list of items across storage locations, inventory for a chosen location, or another arrangement?

Existing decisions to build on: item pages distinguish Available, each storage location, active-event holdings, In Transit, and Ordered (D-033/D-039), with linked transaction history (D-069–D-072). Location inventory supports Category/Collection/search-term filters and personal criteria-only saved searches (D-029–D-032). See [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md). The general browsing layout and navigation remain undecided.

Upcoming queue (Agent Suggestion within the user-selected topic):

1. Q-040 — choose the Inventory starting view and movement between item and location views.
2. Q-040 / Q-024 — define list columns, filters, sorting, and what opens when a user selects an item or quantity.
3. Q-018 / Q-022 / Q-024 — location-page details and browsing-related print/export or device needs, as relevant.

Parked for later: Q-010/Q-011 permissions (by user direction); Q-039/Q-019 purchase specification review; Q-012/Q-038 remaining relocation details. No feature is deferred from release scope by this topic change.

## Full question register

## Inventory viewing and navigation

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-040 | What is the Inventory starting view, and how should users navigate between item lists, location inventories, item details, and related transactions? Define browsing columns, filters, sorting, and link behavior while preserving D-029–D-033/D-039 and D-069–D-072. | Active topic by user direction on 2026-09-26. Existing balance and history decisions do not establish the overall browsing layout. Permissions discussion is postponed, not resolved. |


### Inventory behavior


| ID | Question | Why it matters |
| --- | --- | --- |
| Q-001 | Resolved — actual shipped quantities move source to In Transit; receipt moves received quantities to destination (D-036). Requests do not reserve or move stock (D-035). | Remaining relocation lifecycle details are in Q-012. |
| Q-002 | Resolved — Planning has no inventory effect; activation moves initial stock (D-037); additional deliveries to an active event post immediately (D-038). Remaining counts stay provisional until one-time finalization; later corrections are report-only (D-028). | Incoming deliveries and remaining-count entry have different posting rules. |
| Q-003 | Resolved — requests and planned events do not reserve stock; negative recorded balances are allowed (D-035). | Do not block a permitted movement/adjustment solely for insufficient recorded stock. |
| Q-004 | Resolved for Inventory Behavior — count/review/save and optional per-item notes (D-029), criteria-only searches (D-031), personal criteria/item inclusion and individual counts (D-032), and starting inventory as a correction with note "starting inventory" (D-039). Inventory mistakes use further correction entries. | Detailed role permissions/imports remain in Q-011/Q-021; no snapshots or movement-conflict workflow. |

Q-001 timing is now confirmed in D-036. P-001's remaining date/lifecycle details are separate; purchase timing is governed by D-008.

## Purchase costs and receiving

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-005 | Averaging method resolved — blend remaining quantity at current average cost with the new receipt's cost and quantity (D-040/D-041); if previous stock is gone, use the new receipt alone. Stock coverage resolved in D-056: storage, relocation In Transit, and active events included; unreceived Ordered purchases excluded. Nonpositive combined existing stock uses the new receipt alone (D-057). D-059 adds zero current cost → new receipt alone, stored catalog cost, and admin overrides. Recalculate only at purchase receipt from current values, never full history. | Managers do not track purchase batches for remaining units. Precision is in Q-006; later purchase corrections are in Q-007. |
| Q-006 | Partially resolved — tax by discounted merchandise cost, shipping by quantity (D-042); quantity plus unit price or line total, bonus units included in quantity (D-043). Order-wide discount allocation includes merchandise plus setup fees (D-044/D-046). Item-specific setup-fee attribution is resolved (D-045). Tax allocation includes discounted setup fees (D-047). Other Fees (formerly General Setup Fee) is split equally across purchase lines (D-052/D-073). Item-specific discounts are included in entered prices/subtotals (D-053). Tax is spread across all lines with no per-item exemptions (D-054). Purchasing calculated unit-cost display is up to six decimals (D-055). Any additional item-specific charges remain to clarify if needed. Allocation rounding is resolved in D-051. Currency is USD (D-049); internal precision is retained and nonzero outside-purchasing unit prices display exactly three decimals (D-050); zero current unit cost displays `n/a` (D-059). | Known invoices provide quantity and line subtotal; no special combined-total workflow is required for this pass (D-048). |
| Q-007 | Resolved for this pass — actual receipt quantities/final costs (D-060), cancellation (D-062), missing items resolved externally and reflected in pre-receipt edits with notes (D-064), and post-receipt notes plus separate manual stock/cost corrections (D-065). Partial deliveries remain deferred (D-009). | No integrated return/refund, zero-receipt-line costing, or post-receipt recosting workflow. |
| Q-008 | Resolved — Procurement permission manages purchases (D-066); all authenticated users may view/add notes (D-061/D-063). All approvals occur outside the app (D-067). | Permission assignment belongs to Q-010/Q-011; admin cost overrides and manual stock adjustments retain their separate permissions. |
| Q-025 | Resolved — purchases contribute to the separate Ordered bucket when placed (D-033/D-061), not relocation In Transit. This refines the earlier D-008 naming. | Receipt transfers received quantities to the receiving location without double-counting; cost timing remains separate. |
| Q-026 | Purchase dates resolved — record Ordered/Shipped/Received as they happen; inventory/history dates reflect triggering system actions (D-068). Shipped date remains optional (D-008). Partial purchase deliveries remain deferred (D-009). Relocation split-shipment dates remain with Q-012. | Do not backdate inventory posting from purchase-event dates. |
| Q-039 | For a new, unsaved purchase, should notes be entered only after Save as Ordered, or attached when the order is first saved? | Documentation-review finding: the local mockup permits notes before creation; D-063 covers existing purchases in every state, not persistence of an unsaved entry. No persistent Draft feature is implied. |

## Access and accountability

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-009 | May every organizational Microsoft account sign in, or only current officers? How are departed officers disabled and the first admin appointed? | The notes alternate between officers and anyone with the domain. |
| Q-010 | Confirm manager self-assignment to any location and promotion of other officers to manager. Who can remove assignments, demote managers, or disable users? | These are explicitly described powers whose exact boundaries need confirmation. |
| Q-011 | Partially resolved — multiple managers may edit events (D-012); any manager may make reporting-only corrections to any finalized event, without reopening or admin approval (D-028). Still open: initial finalization permissions, other location/role permissions, and visibility of costs, contacts, addresses, and history. | Finalized-event correction permission is settled; it does not imply unrestricted permissions for unrelated operations. |

## Relocations and events

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-012 | Does each request have exactly one source and destination? Who chooses the source, approves or cancels the request, and handles partial shipments, substitutions, backorders, and receipt discrepancies? | Completes the request lifecycle. |
| Q-013 | Resolved — same-event replenishment (D-010), multiple managers/sources (D-012), split leftover destinations (D-017), and loss included in distribution (D-024). Notable exceptions are included in leftovers for later destination reconciliation. Remaining destination mechanics are tracked in Q-032. | No separate event damage/loss breakdown. Destination adjustment details remain in Q-004. |
| Q-027 | Resolved for the described workflow — record supplies already brought, potentially that evening or near event end, without an advance request (D-011). | An additional request option has not been required or ruled out; it must not block retrospective entry. |
| Q-028 | Partially resolved — finalized events cannot reopen; any manager may make flagged corrections that update reports, with automatic dated text logging and no inventory effects (D-028). Still open: actual movement dates and unknown dates for pre-finalization entries. | Any necessary location inventory correction is a separate manual adjustment. |
| Q-014 | Are reusable equipment, loans, consumables, donated goods, online donor rewards, and non-event distributions tracked through separate workflows? Are equipment units individually identified? | Catalog purposes describe stock flows that are not yet specified. |

Event reconciliation follow-up questions:

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-029 | Partially resolved — provisional saves and separate finalization (D-014); every item counted (D-015); destination totals equal remaining (D-018); combine contributions per item and calculate distributed = total brought minus remaining (D-020). Still open: exceptions such as remaining greater than recorded brought and final posting mechanics. | One remaining count per item, not per contributor. Blank counts block finalization, not saving progress. |
| Q-030 | Resolved — venue supplies normally are already recorded; missed external deliveries can be recorded during reconciliation (D-016). All event sizes use the same interface, including small-event inventory entry at home afterward (D-018). | Existing event stock affects remaining counts without adding another delivery. Missed deliveries also affect total brought. |
| Q-031 | Resolved — add missed deliveries to the active event and post their incoming quantities immediately (D-038). Unknown/external sources use an inventory adjustment (D-021); finalized-event corrections are report-only (D-028). | No arbitrary source deduction. Incoming totals update independently of provisional remaining counts. |
| Q-032 | Partially resolved — source-based default and allocation totals (D-018); finalization transfers leftovers directly to destinations without In Transit or receipt confirmation (D-022). Still open: direct event destinations and choosing the default source if multiple initial sources are allowed. | Overrides and splits remain supported (D-017). Agent Suggestion: do not silently move a remainder to a default after a split is edited. |
| Q-033 | Resolved — D-028 replaces reopening/re-finalization: one-time finalization with prominent confirmation; later manager corrections are flagged, automatically logged, and update reports only. Inventory corrections are separate manual additions/removals. | No automatic reversal, replay, or difference posting from a finalized event correction. Manager explanation is optional. |
| Q-034 | Cost behavior resolved in D-058/D-059; catalog quantity/cost history is defined by D-069, including an Adjustment row with `—` quantity for admin cost overrides. | Existing actor attribution/optional rationale remain in transaction details. No purchase-history recosting. |

## Catalog and reference data


| ID | Question | Why it matters |
| --- | --- | --- |
| Q-015 | Does the SKU prefix come from the collection or category? What happens to SKUs when an item changes collection or a prefix changes? Is the unique character ID the SKU or a separate identifier? | The source contains conflicting prefix wording and unrelated examples. |
| Q-016 | Inventory count input is individual item numbers (D-032). Still open for request workflows: bundle convenience versus enforced multiples, partial bundles, and mixed-item kits. | Do not reopen count-entry units when discussing request packaging. |
| Q-017 | How do inactive and archived differ? What counts as ever used for deletion, including draft references? Can used locations, manufacturers, and reference entries be retired or merged? | Preserves history and defines valid future selections. |
| Q-018 | What location details are required, and does an absent item/location entry differ from zero stock? Are location notes shared among all viewers? | Locations and location inventory lack field definitions. |
| Q-019 | Confirm required fields, uniqueness, vocabulary, and reference values, including Collection Stub, IRS Value, MFRP, and SquareSpace readers. Are tax-value labels only descriptive fields? | Avoids silently interpreting possible typos or assigning financial meaning. |

## Scope and operating constraints, to address progressively

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-020 | Which workflows are mandatory in the first release, and what should later phases contain? | Exhaustive coverage does not establish delivery order. |
| Q-021 | What existing records need importing, with what quantities, cost history, and quality checks? | Establishes initial data and launch reconciliation. |
| Q-022 | Partially resolved — a final event distribution summary with print and CSV download is required (D-023). Still open: other reports/exports, notifications, attachments, and whether Shopify/Microsoft require integrations beyond links/sign-in. | Avoids inferring additional integrations or report scope. |
| Q-023 | What hosting resources, supported software versions, Microsoft administration access, deployment process, backup/restore needs, and retention requirements apply? | Supplies evidence for later technical specifications. |
| Q-024 | How many users, items, locations, and transactions are expected? What devices, accessibility needs, event connectivity, table filters, print layouts, and performance targets matter? | Turns usability preferences into verifiable requirements. |
| Q-035 | Partially resolved — saved corrections update the report without reopening or changing inventory (D-028). Still open: exact report columns and whether historical report versions are needed. | D-023 requires print and CSV without movement details. Agent Suggestion: event identification, item name, SKU, and distributed quantity. |

## Location inventory and ledger follow-up

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-036 | Resolved — saved searches contain criteria only; no result/quantity snapshots, movement-comparison warnings, or stale-count conflict workflow (D-031). The manager enters the actual count. | Mirror worksheet organization, not a frozen result set. Compare entered totals with recorded inventory only to calculate normal correction entries. |
| Q-037 | Resolved — save all selected criteria including location/search terms; searches are personal, not shared. Include matching active items even at zero and inactive items with stock; exclude inactive zero-stock items (D-032). | Save criteria, never results (D-031). |
| Q-038 | Balances resolved in D-033/D-039; History Table columns, snapshots, sorting, and source-row links resolved in D-069; posting dates in D-068. D-070 adds explicit purchase Ordered/Received and relocation Shipped/Received rows. D-071 preserves original expectations and appends signed bracketed deltas for edits. D-072 appends cancellation as a bracketed negative remaining expectation. | Active-event stock is outside Available; a Shipped row does not prove destination receipt; transfer `±` rows never increase total stock. |

Agent Suggestion: follow the Next questions queue above, then continue with access and remaining workflows. Resolved answers are linked to decisions; no unanswered question should be treated as an approved requirement.











