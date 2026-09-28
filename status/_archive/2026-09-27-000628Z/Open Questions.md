# Open questions

Single working question register, updated 2026-09-26. Entries are open unless explicitly marked resolved or partially resolved. Review findings are documented in [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md). Questions identify undecided behavior; they do not introduce approved requirements.

## Next questions

Keep this file open in Typora. This section is the live discussion queue; the full register below retains the details and decision references. The order is an Agent Suggestion and can change as the user directs the discussion. Answer any question when ready.

Inventory Behavior and the main purchase rules are settled for this requirements pass. The purchase mockup interactions were accepted; the assembled specifications remain Draft or Ready for review, without complete specification approval. See the [purchase handoff](../handoff/2026-09-25-191253Z-handoff.md) for completed work.

### Next topic — Mockup drafts of other functionalities

The user is moving on from this session's item-view/edit/history mockup pass. The specific functionality has not yet been selected. Read the [current handoff](../handoff/2026-09-26-232644Z-handoff.md), acknowledge completed work, and wait for the user's direction before making a new mockup.

Current question: which functionality does the user want to mock up next? Do not infer a choice or assign a duplicate feature question ID before it is named.

Upcoming queue (Agent Suggestion, after the user selects the functionality):

1. Read the relevant existing specification/rough notes and identify the requested mockup scope.
2. Draft the requested workflow while preserving settled inventory/cost/history rules; record answers against existing question IDs where applicable.
3. Return to parked item/index/purchase questions when the user chooses, not as a prerequisite to other mockups.

Q-041 is partially resolved by D-091–D-102: compact Inventory edit with pre-save review, Details fields and blank/zero behavior, grouped read-only Adjustment records, layout/search links, and light index interlinking. Remaining catalog validation/lifecycle, missing-cost semantics, History presentation and multi-item grouping remain open. Production timezone and History sorting/pagination are not settled by the mockup.

Parked for later: Q-015–Q-019 catalog follow-ups; Q-034/Q-038/Q-041 History/corrections follow-ups; Q-040 index error/persistence; Q-039 purchase notes before first Save; Q-012/Q-038 relocation details. Broader permissions Q-010/Q-011, including who may edit Unit Cost (D-097), are explicitly user-postponed. This is discussion order, not new release-scope deferral; FI-001 partial purchase deliveries remains unchanged.

## Full question register

## Inventory viewing and navigation

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-040 | Partially resolved — D-076/D-077 settle index search/filter combination, grouping, balance labels, zero display, item/location links, CSV, conditional Ordered, and optional inactive-zero inclusion. D-078 settles no automatic initial results and explicit search/filter submission; D-079 settles conditional columns using nonzero quantities among matching items. D-080 settles inactive-zero exclusion using every current balance, including Ordered and offsetting balances. D-081 settles Clear filters/Reset without querying. D-082 settles return navigation with submitted criteria, scroll position, and refreshed quantities. D-083 settles the pending-input notice, displayed-result CSV, empty-table instructions, and visible disabled Download without results. D-084 records approximately 225 items; D-085 settles one scrollable listing without pagination and export of the entire listing. D-086 settles desktop-first priority across the application with usable phone/tablet access. D-087 preserves pending search/filter edits separately on return while results use submitted criteria. D-088 remembers settings across reopening without auto-querying and restores the filter panel closed on return/reopening, with selection count and active highlighting. Still open: detailed responsive/error behavior and any necessary persistence/indicator details. | User concerns: potential initial-load expense and categories mainly relevant to Central. A no-results initial screen and explicit submission are confirmed in D-078. See the Draft Inventory Index and Search specification; permissions remain postponed. |


## Item View, Edit, History, and Corrections

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-041 | Partially resolved — D-091–D-102 establish section edit entry points, compact Set/Adjust with optional rationale, pre-save Cancel/Edit/Save review (D-096 supersedes D-095), blank-aware Details with permission examples, grouped read-only Adjustment records including actor/time, Full Name and collection-owned SKU prefix, two donation asks, desktop layout, and Category/Collection search links. Remaining: field validation/lifecycle, exceptional cases, History sorting/pagination and other source views, multi-item grouping, and production timezone policy. Catalog specifics remain Q-015–Q-019; cost/history specifics Q-034/Q-038. | Current mockup pass completed; parked while the user chooses other functionality mockups. Permissions remain postponed; no application implementation or complete specification approval. |

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
| Q-011 | Partially resolved — multiple managers may edit events (D-012); any manager may make reporting-only corrections to any finalized event, without reopening or admin approval (D-028). Still open: who may directly edit Unit Cost (explicitly postponed by D-097), initial finalization permissions, other location/role permissions, and visibility of costs, contacts, addresses, and history. | Finalized-event correction permission is settled; it does not imply unrestricted permissions for unrelated operations. |

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
| Q-034 | D-097 preserves blank separately from zero on Edit Details; downstream missing-cost handling and who may edit cost remain to clarify (permission policy in Q-011). Existing cost behavior is recorded in D-058/D-059; catalog quantity/cost history is defined by D-069, including an Adjustment row with `—` quantity for authorized direct cost changes; D-097 postpones who receives that permission. | Existing actor attribution/optional rationale remain in transaction details. No purchase-history recosting. |

## Catalog and reference data


| ID | Question | Why it matters |
| --- | --- | --- |
| Q-015 | Partially resolved — D-099 confirms Collection owns the prefix and only the suffix is editable per item; Category filters the separate Collection dropdown. What happens to existing SKUs when an item changes collection or a prefix changes? What are suffix/uniqueness rules, and is the unique character ID the SKU or a separate identifier? | Prefix-source conflict resolved by D-099; migration, validation, and permanent identity remain open. |
| Q-016 | Inventory count input is individual item numbers (D-032). Still open for request workflows: bundle convenience versus enforced multiples, partial bundles, and mixed-item kits. | Do not reopen count-entry units when discussing request packaging. |
| Q-017 | How do inactive and archived differ? What counts as ever used for deletion, including draft references? Can used locations, manufacturers, and reference entries be retired or merged? | Preserves history and defines valid future selections. |
| Q-018 | What location details are required, and does an absent item/location entry differ from zero stock? Are location notes shared among all viewers? | Locations and location inventory lack field definitions. |
| Q-019 | Partially resolved — D-097 preserves blank versus zero; D-099 specifies Full Name and collection-owned SKU prefix; D-100 replaces Donation Price with In-Person Ask and Online Ask; D-101 labels the existing IRS value IRS FMV (Fair Market Value) on main view. Still open: required fields, validation, uniqueness, reference vocabularies/rough-note terms such as MFRP and SquareSpace readers, valuation usage, and downstream blank/missing-value behavior. SKU specifics remain Q-015. | Online ask reduction down to cost is documented practice, not an automatic discount or approved cost-floor validation. Do not infer valuation calculations from the label. |

## Scope and operating constraints, to address progressively

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-020 | Which workflows are mandatory in the first release, and what should later phases contain? | Exhaustive coverage does not establish delivery order. |
| Q-021 | What existing records need importing, with what quantities, cost history, and quality checks? | Establishes initial data and launch reconciliation. |
| Q-022 | Partially resolved — a final event distribution summary with print and CSV download is required (D-023). Still open: other reports/exports, notifications, attachments, and whether Shopify/Microsoft require integrations beyond links/sign-in. | Avoids inferring additional integrations or report scope. |
| Q-023 | What hosting resources, supported software versions, Microsoft administration access, deployment process, backup/restore needs, and retention requirements apply? | Supplies evidence for later technical specifications. |
| Q-024 | Partially resolved — approximately 225 catalog items: 160 tracked items, 30 shipping container types, and 35 Gayme Night games (D-084). The inventory index uses one scrollable table without pagination (D-085). D-086 sets desktop/laptop priority across the entire application; phone/tablet use must remain possible but may be clunky. Still open: users, locations, transaction volumes, specific device/browser targets, accessibility, event connectivity, remaining table/print details, and performance targets. | Turns usability preferences into verifiable requirements. |
| Q-035 | Partially resolved — saved corrections update the report without reopening or changing inventory (D-028). Still open: exact report columns and whether historical report versions are needed. | D-023 requires print and CSV without movement details. Agent Suggestion: event identification, item name, SKU, and distributed quantity. |

## Location inventory and ledger follow-up

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-036 | Resolved — saved searches contain criteria only; no result/quantity snapshots, movement-comparison warnings, or stale-count conflict workflow (D-031). The manager enters the actual count. | Mirror worksheet organization, not a frozen result set. Compare entered totals with recorded inventory only to calculate normal correction entries. |
| Q-037 | Resolved — save all selected criteria including location/search terms; searches are personal, not shared. Include matching active items even at zero and inactive items with stock; exclude inactive zero-stock items (D-032). | Save criteria, never results (D-031). |
| Q-038 | Balances resolved in D-033/D-039; History Table columns, snapshots, sorting, and source-row links resolved in D-069; posting dates in D-068. D-070 adds explicit purchase Ordered/Received and relocation Shipped/Received rows. D-071 preserves original expectations and appends signed bracketed deltas for edits. D-072 appends cancellation as a bracketed negative remaining expectation. | Active-event stock is outside Available; a Shipped row does not prove destination receipt; transfer `±` rows never increase total stock. |

Agent Suggestion: follow the Next questions queue above, then continue with access and remaining workflows. Resolved answers are linked to decisions; no unanswered question should be treated as an approved requirement.



