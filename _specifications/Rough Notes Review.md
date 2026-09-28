# Rough notes review

Document state: Ready for review

Created: 2026-09-22

Approval: Not yet approved by the user.

Source: [2026-09-22 Rough Notes.md](../drafts/2026-09-22%20Rough%20Notes.md). The source has not been edited. This is a requirements review, not a final specification or database design. Extracted statements reflect the rough notes; they do not imply formal approval. Open issues are maintained only in [Open Questions](../status/Open%20Questions.md), referenced below by ID.

## Requirements extracted from the source

Subsequent decision D-008 changes the source's purchase quantity timing: Ordered puts quantities in In Transit; the shipped date is optional, and receipt moves received quantities to the receiving location. The source extraction below remains a description of the original notes. D-061 confirms order entry at ordering, pre-receipt editing of pending quantities without current-cost changes, viewing by all authenticated users, and stock/current-cost posting at verified receipt finalization. Pending purchases display as Ordered under D-033; shipped relocations display as In Transit. See [Decisions](../status/Decisions.md).

| Area | Stated intent | Source section | Related questions |
| --- | --- | --- | --- |
| Platform | Laravel application with MariaDB on the TG webserver; follow platform conventions rather than treating draft table names as binding. | Introduction | Q-023 |
| Sign-in | Organizational Microsoft sign-in; default officer access includes viewing and relocation requests. | Overview, Roles, Features | Q-009, Q-011 |
| Managers | Manage assigned locations; may assign themselves to any location and promote officers to managers, with those actions logged. Multiple managers may share a location. | Roles, Features | Q-010, Q-011 |
| Admins | Manage high-level reference data, all locations, and all user permissions. | Roles | Q-008, Q-011 |
| Catalog | Maintain item definitions independently of quantities and locations; create, view, update, and archive; delete only items never used. Inactive items retain inventory. | Overview, Catalog, Features | Q-015–Q-019 |
| Organization | Categories group collections; each item belongs to exactly one collection, has one purpose, and may relate to multiple programs. | Data Structure | Q-017, Q-019 |
| Item attributes | Names, variety and collection-based SKU, derived stored unit cost, optional value, In-Person Ask and Online Ask (D-100 replaces the original donation-price field), active flag, request bundle type/quantity, notes. | Catalog | Q-005, Q-015, Q-016, Q-019 |
| Locations | Central storage in Ames, Iowa, plus remote locations; quantities and notes per location; not every location holds every item. | Overview, Features | Q-018 |
| History | Log inventory quantity changes with actor, date, and action. | Features | Q-004, Q-011 |
| Relocation | Request multiple items between locations; copy prior requests as editable templates; print a blank sent column; record actual quantities, shipment date, and tracking numbers. Actual sent quantities drive inventory changes. | Overview, Relocation Request | Q-001, Q-003, Q-012 |
| Purchasing | One manufacturer and receiving location per purchase; multiple catalog items; draft/order/receipt process. Inventory and item costs update only on receipt. | Overview, Purchases, Purchase Entry | Q-005–Q-008 |
| Purchase details | Actor, dates, totals, tax, shipping/handling, status; lines contain item, optional description/product code, quantity, subtotal, and optional setup fee. Manufacturer details may be changed on an order without changing the manufacturer record. | Manufacturers, Purchases, Purchase Entry | Q-006–Q-008 |
| Event reconciliation | Record event details and material taken; quantities may change; count leftovers and reconcile inventory. Overview allows reconciliation during events; detailed example describes after-event reconciliation. | Overview, Event Reconciliation | Q-002, Q-013, Q-014 |
| Usability | Prefer many rows per page, printable tables, and printed worksheets matching entry screens. | Features, Relocation Request | Q-024 |

The source also proposes initial purpose and program values, collection URL stubs, and manufacturer contact fields. Preserve these during later field-level specification; example records and suggested fields are not validated production data.

## Findings that materially affect the specifications

### Inventory timing is incomplete

The original relocation notes left posting timing unclear. D-036 now confirms source to In Transit on shipment and In Transit to destination on receipt, using actual quantities. Receipt discrepancies and other lifecycle details remain in Q-012.

Events use one temporary inventory location (D-010). D-037 adds an explicit Planning state: quantities can be entered/revised without inventory effects or reservations. Manager activation moves initial planned quantities directly from their source locations into the event. Later reconciliation saves remain provisional until one-time finalization. D-038 confirms immediate posting for additional deliveries recorded while active, including during unfinished reconciliation; the original plan is not posted again.

User scenario: Unai brings initial supplies to Gen Con, then on day two realizes more Gaymer Ribbons are needed. He goes home, collects ribbons, and hands them to someone at the event. He may record this that evening or near the end of the event. D-011 requires a simple retrospective entry against the existing Gen Con event, without requiring an advance request. Recorded stock can lag reality until he enters it. Q-027 is resolved for this scenario.

Shared event scenario (D-012): Justin, another manager, brings 100 calendars from central storage and records them against that same Gen Con event. Event modifications cannot be limited to the creator or initial contributing officer. Supplies can come from multiple locations, and inventory history identifies the actor for each change. Exact source-location assignment and correction/closure permissions remain open in Q-011.

Agent Suggestion: when different managers add supplies, preserve each contribution and combine the resulting totals without overwriting another manager's work. For Justin's completed delivery, the expected movement is 100 calendars out of central storage and into Gen Con, attributed to Justin; exact posting steps remain subject to the event transfer rules.

Agent Suggestion: after activation, offer an Add supplies action on the existing event screen with item, additional quantity, and source location, plus an optional actual movement date. Saving the already-completed delivery would move only the additional quantity from source to event, without separate shipment/receipt forms or repeating initial plan movements. D-038 approves immediate post-activation delivery posting; labels, dates, and exact form details remain proposals (Q-028). Initial planning quantities must instead wait for activation under D-037.

Starting inventory, corrections, physical counts, and damage/loss are not described. The quantity-change log is a stated requirement, but it does not itself define these operations (Q-004).

### Event reconciliation in progress

User requirement (D-013): for a large event, officers sort and count supplies while an operator records remaining quantities on a laptop. The page must save and resume without finalization. Each item must distinguish not yet counted from explicitly counted with zero remaining. Saving a partially completed reconciliation must preserve that distinction and all entered counts.

Confirmed behavior (D-016): supplies brought into the counting room from elsewhere in the venue should normally already belong to recorded event stock. Counting them updates remaining quantities without increasing total brought a second time. If someone brought supplies from another storage location but never recorded them, Unai or another authorized manager must be able to record that missed delivery during reconciliation, show the corrected total brought, and enter or revise the remaining quantity on the same event. D-021 specifies inventory adjustments for unknown/external sources and D-038 specifies immediate incoming posting while active. Remaining counts are still provisional. D-018 confirms that all event sizes use the same interface, including counting and entry at home after a small event.

Approved behavior (D-014): provide separate Save progress and Finalize reconciliation actions. Saved remaining counts stay provisional and revisable until finalization; saving them does not post reconciliation changes to inventory or finalized distribution figures. Uncounted items remain distinct from explicit zero counts (D-013). Actual incoming supplies are separate movements, not merely changes to a remaining count.

Approved behavior (D-015): every event item must have an explicit remaining count before finalization. Zero is valid; an uncounted item blocks finalization but does not block Save progress. This is not a requirement to count unrelated catalog items.

Agent Suggestion: show Not counted and Count entered states per row and visibly flag outstanding counts. Exact labels and layout remain proposals. Approval of individual decisions does not approve this entire review document.

Agent Suggestion: acceptance scenarios should cover saving an explicit zero beside an uncounted row, resuming the unfinished reconciliation without changing either, and revising a count when another box of already-recorded event stock arrives without adding another incoming movement. All event sizes use the same interface (D-018).

Confirmed behavior (D-017): the reconciliation page provides a default destination for leftover supplies and allows overriding it. Leftovers may go to locations other than their original source, including handoffs to officers preparing for the next event. A single item's leftovers can be split among destinations: for 150 enamel pins remaining, Jeff takes 100 to central storage and Jessiye takes 50 to her location. This is required event behavior, not deferred partial purchase receiving.

Approved behavior (D-018): initialize the default destination to the event's source location when creating the event. Require allocated destination quantities to equal each item's remaining count before finalization. Use the same reconciliation interface for large and small events, including later entry at home.

Agent Suggestion: show the default destination for each item and a Split action to enter destination/quantity rows. Do not silently discard an allocation or move an unallocated remainder when a count changes. Exact interface details remain proposals; D-022 and D-028 settle direct, one-time destination posting at finalization.

Approved behavior (D-028, D-025): finalized events cannot reopen. Any manager may make corrections to any finalized event; flag corrections and update the report without altering inventory. Generate dated plain-text correction logs automatically with actor attribution. Manager explanations are optional. Make any necessary location stock corrections separately using simple inventory adjustments.

### Combined item reconciliation — confirmed example (D-020)

Missed-delivery clarification (D-021): a delivery can be added during reconciliation. Use its source location when known; unknown or external-source stock is entered as a positive inventory adjustment to the event and included in total brought. For example, a vendor drops off 2,000 ribbons left over from Long Ago Con: add 2,000 by adjustment without deducting from an arbitrary tracked location. The remaining count is entered separately. D-038 establishes immediate posting while active. Valuation remains open; no zero-cost assumption is approved.

Contributions retain their source details but combine into one reconciliation row per catalog item. Late additions update that same total. No separate count of leftovers is required for each contributor.

| Contributor | Source | Gaymer Ribbons brought |
| --- | --- | ---: |
| Unai | Indy Storage | 5,000 |
| Justin | Central Storage | 1,000 |
| Jessiye | Milwaukee Storage | 250 |
| Jeff | Shopify Storage; entered on the last day | 2,000 |
| Total | Gen Con | 8,250 |

The single remaining count is 1,800. Distributed is 8,250 minus 1,800 = 6,450. Of the leftovers, Jessiye takes 1,000 to Milwaukee Storage and Unai takes 800 to Indy Storage. The destination allocation totals 1,800 and is independent of the source contributions: Jessiye can take more than she originally brought. Source movement dates remain to be specified; leftover destination posting happens once at finalization (D-022, D-028).

### Event finalization and distribution reporting

Confirmed behavior (D-024): item loss is included in distribution, with no separate event damage/loss tracking. For a notable exception, include the quantity in leftovers and reconcile it from destination inventory later. Event distributed totals and the post-convention report use total brought minus recorded remaining. This avoids adding event-specific exception categories; general destination adjustment behavior remains in Q-004.

Confirmed behavior (D-022): finalization transfers leftover allocations directly into selected destination locations. There is no In Transit stage or separate destination receipt confirmation for these leftovers. Saving unfinished counts does not perform these transfers. After finalization, event corrections never adjust inventory; managers make separate manual location adjustments as needed (D-028).

User requirement (D-023): provide a simple after-convention distribution summary showing final quantities for all items distributed at the event, with no incoming/outgoing movement details. Support a printable view and CSV download. This is the inventory portion of the executive-requested after-convention report; other sections are not defined. For the confirmed Gen Con example, Gaymer Ribbons would show 6,450 distributed, without the four source contributions or leftover destination allocations.

Agent Suggestion: use item name, SKU, and quantity distributed as columns, with event identification. Saved corrections update the report without reopening (D-028); exact fields and any historical report-version needs remain in Q-035. Provisional counts must not be presented as final.

Current finalization behavior (D-028): show a prominent Are you sure? warning explaining that leftovers are added to selected locations once only, the event cannot reopen, and later event corrections affect reports only. Cancellation changes nothing. Repeated submission must not duplicate the transfers. There is no re-finalization or automatic inventory posting from corrections.

### Routine inventory count adjustments

Subsequent user-defined workflow (D-029/D-030): see [Location Inventory and Item Ledger](Location%20Inventory%20and%20Item%20Ledger.md) for the current detailed requirements. It specifies named searches, printed worksheets, matching actual-count forms, blank meaning no change, changes-only review with optional per-item rationale, Save Updates creating individual corrections, and item-level location totals and ledger history. These requirements resolve the previously open count-entry and posting steps for location inventory runs; D-031 resolves worksheet continuity: save criteria only, rerun searches, and do not add quantity snapshots or checks for intervening movements.

User requirement (D-027): managers can occasionally count their inventory and record simple additions or removals, with optional explanatory details and actor/date/action history. No elaborate rationale, event, or purchase is required. If 17 boxes represent 17,000 ribbons, finding 18 boxes adds 1,000 individual items; finding 16 removes 1,000. Packaging varies by item; this example does not establish a universal conversion. Exact entry controls and posting rules remain in Q-004. These adjustments also handle notable exceptions included in event leftovers and later reconciled at the destination.

### Cost arithmetic needs explicit definitions

Detailed developer reference: [Purchase Entry and Receiving](Purchase%20Entry%20and%20Receiving.md) consolidates the current fields, interactions, formulas, actions, and acceptance examples independently of the mockup source.

Interactive reference: [purchase entry mockup](../public/purchase-entry/index.html), with [usage/source notes](../public/purchase-entry/README.md). It demonstrates quantity plus unit price or line total with calculations on field commit, line fees and equally divided Other Fees, notes, creation/editing, optional shipment, and receipt review/confirmation with illustrative catalog-cost averaging. The full mockup remains Draft; order-wide discount allocation is approved in D-044, allocation rounding is approved in D-051, while the overall design remains Draft. D-074 confirms simultaneous Unit/Cost entry, Unit preservation on quantity changes (revised in D-075), calculated Line = Cost + Fee, row refresh, and save validation using full-precision values rounded to cents. See the [mockup index](../public/README.md) for current examples.

D-042 confirms shipping allocation by quantity and tax allocation by discounted merchandise cost. D-043 permits quantity plus either unit price or line total and includes bonus units directly in quantity. The wristband example therefore uses 5,200 GAYMER units/$900 and 3,100 ALLY units/$600. Preserve entered line totals instead of rebuilding them from rounded displayed unit prices. D-044 allocates order-wide discounts by merchandise value (the $236.25 wristband discount splits $141.75/$94.50). D-045 assigns an item-specific setup fee entirely to that item. D-046 includes setup fees in the line cost used to allocate any order-wide discount. D-047 includes setup fees in discounted line costs for invoice tax allocation. D-048 clarifies that known invoices provide quantity and subtotal for each line; no special combined-total allocation workflow is needed for this pass. D-049 confirms USD throughout purchase costing. D-050 retains internal unit-price precision and displays exactly three decimals outside purchasing, including trailing zeros. D-051 allocates discount, tax, and shipping in cents, assigning remaining cents by largest fractional remainder with line-order tie-breaking. D-052 adds an order-wide fee (renamed Other Fees in D-073) split equally across purchase lines, with cent reconciliation; each share contributes to that line's setup cost before discount and tax allocation. D-053 includes item-specific discounts in entered unit prices/subtotals; the order Discount field is for order-wide discounts only. D-054 confirms spreading entered tax across all lines without per-item exemptions. D-055 displays calculated unit costs to up to six decimals within purchasing, preserving internal precision and entered values. Any additional item-specific charges remain to clarify if needed (Q-006).

D-040 selects an average based on previously purchased inventory still held when a new purchase arrives. Depleted quantities do not continue to weight the average; if previous stock is gone, the new purchase alone determines the new average. For 50 units remaining at $1.00 and 900 new units costing $450, the arithmetic is ($50 + $450) / 950 = approximately $0.526316. The user confirmed this corrected arithmetic. D-041 confirms the formula: (remaining quantity × current average unit cost + new receipt cost) / (remaining quantity + received quantity). Managers do not identify purchase batches for remaining units. D-056 includes central/remote storage, relocation In Transit, and active-event stock in existing quantity while excluding unreceived Ordered purchases. D-057 uses the new receipt alone for average cost when combined existing stock is zero or negative, without resetting recorded quantities. D-058 preserves average unit cost on ordinary count corrections; later receipts use the corrected quantity. D-059 stores authoritative current cost on the catalog item: unknown is zero/`n/a`, receipts use only current cost/quantity and the new purchase, and zero current cost uses the new receipt alone. Admins may override current cost; other inventory changes do not recalculate it. Nonzero display precision remains governed by D-050/D-055; zero current cost displays `n/a`. D-069 defines the catalog cost-change history row and source-adjustment link; precision/display and allocation rounding are covered by D-050/D-051/D-055. The earlier lifetime-average Agent Suggestion was not accepted.

Partial purchase deliveries have subsequently been deferred to FI-001 in [Future Ideas](../status/Future%20Ideas.md), per D-009. D-060 resolves final receipt discrepancies: use actual received quantities and final allocated cost, clear pending Ordered quantities, and apply the established catalog-cost update. D-062 confirms cancellation preserves order details, removes only that purchase's pending contribution, and leaves location stock, unit cost, and relocation requests unchanged. Requests can exceed available inventory. D-064 resolves missing items externally: edit delivered lines and final amounts, remove missing lines/fees as appropriate, explain with notes, then mark Received. D-065 handles post-receipt changes through notes and separate manual stock/admin-cost adjustments, without editing/reprocessing the finalized purchase. Q-007 is resolved for this pass.

### Purchase dates and catalog history — confirmed behavior

D-068 distinguishes actual Ordered/Shipped/Received dates from the date inventory actions post. D-069 defines a plain-text, independent History Table for quantity or unit-cost changes: date, description, signed/`±`/`—` quantity, and historical current unit cost, with a hidden transaction link applied to the whole row. Default newest first, sortable by date/description. D-070 adds explicit purchase Ordered/Received and relocation Shipped/Received stages, displaying ordered quantities in brackets (for example `[8,000]`), receipt additions with `+`, and transfers with `±`. D-071 records pending-order changes as new signed bracketed deltas (for example `[- 500]`) without altering earlier entries; each links to the same order. D-072 appends a cancellation row showing the negative remaining expected quantity in brackets, preserving prior entries and order details. Descriptive item edits do not create history entries. See [the detailed History Table and checked ribbon example](Location%20Inventory%20and%20Item%20Ledger.md#catalog-history-table). Existing actor/rationale details remain on the source transactions; the earlier extra visible-column proposal is superseded.

### Purchase notes — confirmed behavior

D-063 adds notes to every purchase entry in every state. Any authenticated user may add a note, including after receipt/finalization or cancellation. Display all notes newest first by default, without pagination. Notes retain their author and creation time. No user may edit or delete a saved note; corrections are new notes and leave the original intact.

Adding a note does not change the purchase state, stock, or unit cost. D-064/D-065 subsequently establish notes as context for pre-receipt resolution edits and post-receipt exceptions. The purchase mockup now includes note entry and an immutable newest-first list.

Observable checks for D-063:

- An authenticated user can add a note to an ordered, finalized, or cancelled purchase; it appears above older notes.
- All purchase notes are accessible in the same list without paging.
- Saved notes cannot be edited or deleted; adding a correction preserves the original and leaves inventory/cost unchanged.

### Role boundaries need an action-by-action definition

D-066 settles purchase-action access: Procurement permission manages purchases within the state rules; all other authenticated users can view and add notes. D-067 keeps approvals outside the system. Separate stock-adjustment permissions and admin unit-cost override rights remain distinct; granting/removing Procurement belongs to broader permission management.

Manager self-assignment and promotion of officers are explicitly present in the rough notes; they are not agent proposals. Their scope should be confirmed. “Manage inventory” does not yet identify who may receive purchases, reconcile events, adjust stock, or edit catalog data. The event example uses an officer while the role list grants officers viewing and requests, leaving reconciliation permission unresolved (Q-008–Q-011).

### Catalog identity and lifecycle need reconciliation

The collection defines the SKU prefix, but the catalog explanation says the prefix is determined by category. Its Bisexual ribbon example also switches to a Gaymer/button SKU. Treat these as inconsistent examples and wording to resolve, rather than silently choosing a rule. Moving items or renaming prefixes may affect identifiers (Q-015).

Inactive items remain tracked, while used items may be archived. The distinction between inactive and archived, and what counts as used, is not defined. Bundles might be a quantity convenience or actual mixed-item kits; the source does not choose between them (Q-016, Q-017).

### Several stock flows have no workflow yet

The notes mention donations, donor rewards, consumables, and reusable equipment, but do not describe their complete receipt, distribution, use, or return procedures. These are coverage gaps to discuss, not automatic additions to the first release (Q-014, Q-020). Shopify links and prices do not establish a synchronization requirement (Q-022).

## Specification coverage to develop

Agent Suggestion: organize later specifications around the areas below. This is a proposed coverage checklist, not an approved document structure or release plan.

| Area | Coverage needed |
| --- | --- |
| Scope and terminology | Goals, boundaries, agreed vocabulary, initial release and later phases |
| Access | Sign-in eligibility, user lifecycle, role/location permissions, permission history |
| Catalog and reference data | Field definitions, validation, identifiers, item lifecycle, location management |
| Inventory behavior | Units, balance definitions, availability, corrections, starting balances, history |
| Workflow specifications | States, actors, transitions, quantities, exceptions, corrections, and completion rules for each stock flow |
| Purchase costing | Allocation formulae, receipt timing, precision, rounding, recalculation, worked examples |
| User experience | Navigation, search/filtering, print worksheets, device and accessibility needs |
| Data and operations | Imports/exports, integrations, reports, hosting, security, recovery, retention, support |
| Delivery and acceptance | Dependencies, phases, milestones, acceptance scenarios, launch checks, and approval gates |

Agent Suggestion: give each eventual requirement a stable identifier so acceptance scenarios and milestone scope can refer to it. This convention has not been approved.

## Acceptance examples to refine

Agent Suggestion: use concrete scenarios like these when drafting feature criteria. These are incomplete illustrations, not approved test cases.

- A request asks for 500 ribbons and the manager records 400 sent. Inventory uses 400, with source and destination posting times determined by Q-001.
- Saving or editing a draft purchase changes neither inventory nor unit cost. Receiving the purchase applies the agreed quantities and costing rules; repeated submission must not duplicate those effects.
- An event has 4,000 ribbons brought and 1,450 recorded remaining. Distribution is 2,550, including item loss (D-024); finalization transfers the allocated 1,450 directly to destinations (D-022).
- A catalog item referenced by completed stock activity cannot be deleted; archival behavior follows the agreed lifecycle.

## Recommended next discussion

Agent Suggestion: begin with Q-001–Q-004 in the question register. Once stock movement and correction rules are clear, review costing and permissions, then complete the remaining workflows and field definitions. Gather operational constraints progressively and decide release boundaries during review, as directed by the user.








## Evening functionality mockups — 2026-09-27

D-103–D-107 add the user-directed role baseline, one-pair relocation requests, location keyboard counts, and optional persistent purchase requests. See [User Management](User%20Management.md), [Relocation Requests](Relocation%20Requests.md), [Purchase Requests](Purchase%20Requests.md), and the [mockup index](../public/README.md). [Event Reconciliation](Event%20Reconciliation.md) consolidates existing event decisions into an additional Agent Suggestion mockup. These current sources supersede older no-Draft/assignment-only assumptions; the original rough notes are preserved.
