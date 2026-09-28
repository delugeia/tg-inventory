# Open questions

Single working question register, updated 2026-09-22. Entries are open unless explicitly marked resolved or partially resolved. Review findings are documented in [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md). Questions identify undecided behavior; they do not introduce approved requirements.

## Next questions

Keep this file open in Typora. This section is the live discussion queue; the full register below retains the details and decision references. The order is an Agent Suggestion and can change as the user directs the discussion. Answer any question when ready.

Inventory Behavior is complete for this requirements pass (Q-001 through Q-004 and the related event-stock display clarification). Paused at the user's requested break. No answer is requested now.

Latest decision (D-039): starting inventory is recorded as a correction with note "starting inventory". Active events appear as additional location entries and are excluded from Available.

[Session handoff](../handoff/2026-09-22-215656Z-handoff.md) captures the completed section and how to resume.

### After the break — suggested next section, not started

Agent Suggestion: purchase costs and receiving, beginning with Q-005 (average unit cost) and Q-006 (shipping/tax/setup allocation). Wait for the user's direction before advancing.
## Full question register

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
| Q-005 | Does average unit cost mean total lifetime acquisition cost divided by total units received, an equal average of order unit costs, or an average based on stock still held? | These produce different values; see the arithmetic example in the review. |
| Q-006 | Should tax and shipping be allocated by quantity, line value, or another rule? How are setup fees, order-only totals, discounts, rounding remainders, currency, and precision handled? | The quantity example is clear, but the general rule and total-only orders remain incomplete. |
| Q-007 | Partially resolved — partial purchase deliveries are deferred to FI-001 (D-009). Still open: shortages, excess quantities, cancellations, returns, refunds, late invoices, and corrections to received purchases and their stock/cost effects. | Deferring incremental receipts does not decide final receipt discrepancies. |
| Q-008 | Who may create, edit, order, and receive purchases, and select the receiving location? Is board consultation outside the app or a recorded approval step? | The example uses an admin; manager capabilities are not explicit. |
| Q-025 | Resolved — purchases enter In Transit when marked Ordered, not only when shipped or received. See D-008. | Receipt transfers received quantities to the receiving location without double-counting; cost timing remains separate. |
| Q-026 | Partially resolved — purchase shipped date is optional (D-008); multiple purchase receipt dates for partial deliveries are deferred to FI-001 (D-009). Still open: date granularity and relocation split-shipment dates. | Keep future purchase receipt complexity outside initial scope. |

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
| Q-034 | How should recovered or unknown-source material affect unit cost/value? Which adjustment fields are needed beyond the existing actor/date/action history? | D-021 permits inventory adjustments for this material; it does not imply zero cost, a purchase, or a new costing rule. |

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
| Q-038 | Balance display resolved — Available = central + remote; individual locations include active events but exclude shipment/purchase pseudo locations; shipment In Transit and purchase Ordered are separate (D-033/D-039). Active-event stock is not Available. Still open for later specification: ledger presentation/date/source-link conventions. | Do not double-count ordered purchases or active-event stock in Available. |

Agent Suggestion: after the active questions above, continue with remaining inventory movement/correction rules, then purchase costing and access. Resolved answers are linked to decisions; no unanswered question should be treated as an approved requirement.










