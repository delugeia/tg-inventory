# Decisions

This is the single working decision log. Approval of planning rules does not approve the rough notes or an implementation design.

| ID | Date | Decision | Authority / state |
| --- | --- | --- | --- |
| D-001 | 2026-09-22 | Plan the Tabletop Gaymers inventory application before writing code; target Laravel and MariaDB on the TG webserver. | User direction and source notes; implementation not authorized |
| D-002 | 2026-09-22 | The user approves the first specification pass. Other officers review and make changes later. The user is final approval authority before development. | User approved |
| D-003 | 2026-09-22 | Use Draft, Ready for review, and Approved document states. Label agent concepts Agent Suggestion or Agent Idea until accepted by the user. | User approved |
| D-004 | 2026-09-22 | Maintain a single working set of status, decision, and question documents in status/. New agents snapshot these into timestamped folders under status/_archive/ before updating them. | User approved |
| D-005 | 2026-09-22 | Determine first-release scope during requirements review. Aim for exhaustive specifications and gather constraints as work proceeds. | User approved |
| D-006 | 2026-09-22 | Each feature eventually specifies authorized users, workflow, inventory changes, exceptions, and observable acceptance criteria. | User approved |
| D-007 | 2026-09-22 | Keep current handoff specifications and active drafts in _specifications/; exclude obsolete material. Use timestamped handoff/ notes to support separate task chats. | User direction |
| D-008 | 2026-09-22 | Marking a purchase Ordered puts its ordered quantities in In Transit. Shipped date is optional; receipt must be possible without it. Receipt moves received quantities from In Transit to the receiving location rather than adding them a second time. | User direction; resolves Q-025 and the purchase missing-date part of Q-026 |

Implementation convention for D-004: snapshot all top-level status files into `status/_archive/YYYY-MM-DD-HHmmssZ/` (UTC), once before a new agent/chat's first update. See AGENTS.md for the procedure.

### D-009 — Defer partial purchase deliveries

Date: 2026-09-22. Authority: User direction.

Place partial purchase deliveries in the single working [Future Ideas](Future%20Ideas.md) list as FI-001, outside initial scope. This defers receiving a purchase incrementally across multiple deliveries; final receipt discrepancies and relocation split shipments remain undecided. Inclusion is not a commitment to implement the feature later.

Individual behavior decisions are recorded above; no complete specification or implementation design has been approved. D-008 supersedes the original notes' receipt-only quantity entry rule. It does not authorize recalculating unit cost at ordering; the source's receipt-time cost rule remains the working baseline pending costing review.

### D-010 — One temporary inventory location per event

Date: 2026-09-22. Authority: User accepted the temporary event-location concept and required a simple ongoing update interface.

An event holds inventory in a temporary location. Replenishments during the same event use that existing event/location, without requiring the officer to create another temporary location. The interface must make these updates simple. Example: Unai brings initial supplies to Gen Con, realizes on day two that more Gaymer Ribbons are needed, and updates the existing Gen Con event.

This accepts event-location tracking and replenishment within the same event. D-011 further clarifies retrospective entry. Exact transfer timing, permissions, and reconciliation behavior remain open. See Q-002, Q-013, and Q-027. This replenishment requirement is separate from deferred partial purchase deliveries (D-009).

### D-011 — Allow retrospective event replenishment entry

Date: 2026-09-22. Authority: User's operational clarification.

Officers may physically bring additional supplies to an event and record the movement later that evening or near the end of the event. The existing event must support recording these completed replenishments without requiring an advance request or contemporaneous entry. Unai's example is an actual delivery of ribbons from home to Gen Con, entered later, not a request for someone to supply them.

Recorded balances can lag physical reality until entry; do not promise live physical accuracy. This does not settle historical balance recalculation, dates, entry after event closure, or permissions. See Q-028. Advance requests may still be discussed separately but are not required for this workflow.

### D-012 — Shared event management and multiple supply sources

Date: 2026-09-22. Authority: User direction.

Other managers must be able to modify the same event; it is not restricted to its creator or the officer who initially supplied it. Managers can record contributions from different storage locations against that event. Example: Justin brings 100 calendars from central storage and adds them to the existing Gen Con event alongside Unai's supplies.

Retain the actor for each inventory change, as required by the source notes. This decision establishes shared editing and multiple sources; it does not settle source-location assignment requirements, editing another manager's prior entries, or who may initially finalize an event. Those details remain in Q-011 and Q-013.

### D-013 — Save and resume event reconciliation

Date: 2026-09-22. Authority: User direction and operational scenario.

Event reconciliation must support saving progress without finalizing. At a large event such as Gen Con, officers sort and count remaining supplies while an operator enters counts on a laptop. Some items may have counts recorded while others have not yet been counted. An uncounted item is distinct from an explicitly entered zero; saving or resuming an unfinished reconciliation must preserve that distinction and entered counts.

Supplies may arrive from elsewhere in the convention center while reconciliation is in progress. The existing reconciliation must accommodate further counts or revisions without requiring finalization or a new event. Items already belonging to the event must not be treated as new incoming stock merely because they are brought into the counting room.

D-018 subsequently confirms that all event sizes use the same reconciliation interface. D-014 resolves inventory posting on draft saves versus finalization; D-015 requires a count for every event item. D-016 settles handling newly discovered versus previously recorded supplies; detailed finalization calculations remain open in Q-029.

### D-014 — Separate saving from finalizing reconciliation

Date: 2026-09-22. Authority: Explicit user approval of the preceding Agent Suggestion.

Provide separate Save progress and Finalize reconciliation actions. Saved remaining counts stay provisional and can be revised as more supplies appear. Saving counts does not post reconciliation changes to inventory or finalized distribution figures; finalization applies the reconciliation effects. Preserve the distinction between uncounted items and explicit zero counts.

Approval covers these actions, provisional counts, and revision before finalization. It does not approve the entire review document or settle who can initially finalize or the detailed finalization calculations. D-015 separately settles count completeness. Recording actual incoming supplies remains a separate movement and must not be confused with saving a remaining count.

### D-015 — Require every event item to be counted before finalization

Date: 2026-09-22. Authority: Explicit user approval.

Every item in the event reconciliation must have an explicit remaining count before the event can be finalized. Zero is a valid count; blank means uncounted and blocks finalization. Incomplete counts can still be saved through Save progress (D-014). This requirement applies to event items, not unrelated items in the full catalog.

### D-016 — Correct supplies brought while reconciling an event

Date: 2026-09-22. Authority: User clarification and direction.

Supplies gathered from elsewhere in the convention center should normally already be recorded as brought to the event. They contribute to the remaining count without increasing total brought a second time. A missed delivery from another storage location is also possible. During unfinished reconciliation, Unai or another authorized manager must be able to update the existing event location to record that delivery, show the corrected total brought, and enter or revise the amount remaining.

Maintain distinct total-brought and remaining quantities. Recording a previously missed delivery and counting remaining stock are different operations even when performed from the same page. Remaining counts stay provisional until finalization (D-014), and all event items require a count (D-015). Preserve inventory-change attribution; the interface must not silently overwrite movement history. Exact total-edit interaction, source attribution when unknown, and incoming movement posting timing remain open in Q-031.

### D-017 — Default destination and split event leftovers

Date: 2026-09-22. Authority: User direction.

The reconciliation page defaults leftover material to a set destination location but allows choosing a different location. Leftovers need not return to their original source and may be handed to officers for a subsequent event. A single item's remaining quantity can be split among multiple destination locations. Example: Jeff takes 100 enamel pins to central storage and Jessiye takes 50 to her location for the next event.

Default location and allocation checks are settled in D-018. Whether another event can be selected directly as a destination and destination posting/receipt timing remain open in Q-032. Split event leftovers are required behavior, separate from deferred partial purchase deliveries (D-009).

### D-018 — Destination default, complete allocation, and a shared event interface

Date: 2026-09-22. Authority: Explicit user approval and direction.

- Before finalization, destination quantities for each event item must sum to that item's total remaining count. Over-allocation or under-allocation blocks finalization; incomplete work can still be saved.
- Set the event's default destination to its source location when the event is first created. Destination overrides and splits remain available under D-017. Do not infer that later replenishments from other locations change this initial default.
- Large and small events use the same reconciliation interface. For a small event, the officer can count and enter remaining inventory after returning home. No separate small-event workflow is needed.

This resolves Q-030 and the default/validation portions of Q-032. If creation permits multiple initial sources, choosing the source used for the default remains a detail to specify; later contributions from multiple sources are already supported.

### D-019 — Any manager may correct a reconciled event (partially superseded)

Date: 2026-09-22. Authority: User direction; revised by D-028.

Any manager may correct any finalized event without admin approval. Dated plain-text logging remains required and is generated automatically (D-025). The earlier permission to reopen the event is superseded: D-028 prohibits reopening and makes post-finalization corrections reporting-only, with separate manual location inventory adjustments.
### D-020 — Reconcile each item across all event contributions

Date: 2026-09-22. Authority: User clarification and worked example.

Multiple people may supply the same catalog item from different locations, including deliveries recorded on the last day. Combine those contributions into one total brought for that item at the event. Reconcile one remaining count against that total, not separate remaining counts per contributor or source. Keep source contributions identifiable for location inventory/history. Leftover destinations are independent of the original contributors and quantities.

User's Gen Con example: Unai brings 5,000 Gaymer Ribbons from Indy Storage; Justin brings 1,000 from Central Storage; Jessiye brings 250 from Milwaukee Storage; Jeff brings 2,000 from Shopify Storage and records them on the last day. Total brought is 8,250. A remaining count of 1,800 gives 6,450 distributed (total brought minus remaining). Jessiye takes 1,000 to Milwaukee Storage and Unai takes 800 to Indy Storage. No contributor-level reconciliation is required.

This establishes the distribution calculation and item-level aggregation. D-024 subsequently confirms that event loss is included in distribution; notable exceptions are handled through leftovers and later destination inventory reconciliation. The example does not decide incoming movement posting dates; D-022 settles leftover destination posting.

### D-021 — Add missed deliveries; adjust inventory for unknown or external sources

Date: 2026-09-22. Authority: User direction.

A missed delivery can be added during reconciliation as an additional contribution to the same event/item total. When the source is a known tracked location, retain that source for the movement. When the source is unknown or outside tracked storage, enter the material as a positive inventory adjustment to the event rather than requiring a fictional source location.

User example: a vendor drops off 2,000 ribbons left over from Long Ago Con. Record an inventory adjustment adding 2,000 ribbons to the event and its total brought, so subsequent reconciliation includes them. Do not deduct them from an arbitrary storage location. The remaining count is still entered separately and remains provisional until finalization.

Existing actor/date/action history requirements apply. This decides the missed-delivery and unknown-source approach, not the unit cost/value of recovered material or exact adjustment posting timing. Those details remain in Q-034 and Q-031.

### D-022 — Finalization transfers leftovers directly to destinations

Date: 2026-09-22. Authority: User direction.

Finalizing event reconciliation puts allocated leftover quantities directly into the selected destination locations. Do not use In Transit or require separate receipt confirmation for these event leftovers. Saving reconciliation progress does not perform these final transfers. This rule applies to event leftovers; it does not replace purchase or ordinary relocation rules.

### D-023 — Printable and CSV post-convention distribution summary

Date: 2026-09-22. Authority: User requirement from executive reporting needs.

Provide a simple after-convention report view showing final quantities distributed for every item distributed at the event. Combine contributions into final item totals and omit incoming/outgoing movement details. The view must be printable and downloadable as CSV. It serves as the inventory distribution portion of the broader after-convention report; no other report sections have yet been specified.

D-028 settles that saved corrections update the report without reopening or changing inventory. Exact columns and any historical report-version needs remain in Q-035. Draft reconciliation counts must not be mislabeled as final report numbers.

### D-024 — Include event loss in distribution

Date: 2026-09-22. Authority: User direction.

Treat item loss as part of event distribution; do not separately track damage/loss specifics in event reconciliation. The event distribution figure, including the post-convention report, remains total brought minus recorded remaining.

For a notable exception, include the affected quantity in leftovers, allocate it to a destination, and reconcile it from that destination's inventory later. Do not introduce a separate event exception category or loss workflow. Destination inventory adjustment details remain part of Q-004. Later destination reconciliation is distinct from correcting the finalized event.

### D-025 — Automatically generate event correction logs

Date: 2026-09-22. Authority: User direction.

The application automatically generates the dated plain-text correction log associated with the event (D-019). Managers do not need to compose the correction log manually. Preserve attribution to the manager under the existing actor-tracking requirement. Exact text formatting remains to be specified; D-028 subsequently establishes that event corrections do not change inventory.

### D-026 — Superseded by D-028

The earlier re-finalization and difference-only inventory posting approach is no longer applicable. Finalized events cannot reopen or finalize again. Use the current correction behavior in D-028.
### D-027 — Simple manager inventory adjustments

Date: 2026-09-22. Authority: User requirement.

Managers need a simple inventory update workflow for occasional counts of their inventory. They can make positive or negative correction entries and provide whatever explanatory details they know, without an elaborate rationale requirement. Treat explanatory notes as optional; keep the existing actor/date/action inventory history.

User example: recorded stock is 17 boxes containing 17,000 Gaymer Ribbons. Finding 18 boxes requires adding 1,000 individual ribbons, yielding 18,000; finding 16 boxes requires removing 1,000, yielding 16,000. The 1,000-per-box conversion is specific to this example, not a universal packaging rule.

This workflow also supports later destination adjustments for event exceptions (D-024). It does not require an event or purchase. Exact form design (quantity change versus counted total), supported packaging entry, adjustment posting timing, and correction of an erroneous adjustment remain to be specified. Location access follows the manager-location model unless changed explicitly; permission to correct any event does not imply unrestricted stock adjustment at every location.

### D-028 — One-time finalization; later corrections update reports only

Date: 2026-09-22. Authority: Explicit user revision. Supersedes D-026 and the reopening portion of D-019.

- Before finalization, show a prominent warning and an explicit Are you sure? confirmation. Explain that this action adds the remainders to selected destination inventories this one time only, cannot be reopened, and that later event corrections will not adjust inventory.
- Confirmed finalization posts the leftover allocations directly to destinations once (D-022). Enforce this even if a user double-clicks, retries, or reloads; cancelling the prompt does not finalize or transfer anything.
- A finalized event stays finalized and cannot be reopened or re-finalized.
- Any manager can make needed corrections to any finalized event. Flag those entries as corrections. Saved corrections update the event report, including its printable/CSV output, but do not alter inventory at source, event, or destination locations and do not replay or reverse prior movements.
- Managers make any needed positive or negative corrections to relevant location inventories separately through the simple adjustment workflow (D-027).
- Generate the dated plain-text correction log automatically (D-025), with actor attribution. Manager-supplied explanation is optional and may contain as little or as much information as they wish; no mandatory rationale or additional approval workflow.
- Favor a useful, simple interface over complicated workflows users might avoid. This is a product requirement guiding further specification work, not a reason to omit basic count/allocation checks already approved.

Agent Suggestion — confirmation wording: "Finalize this event? This will add the remaining quantities to the selected locations ONE TIME ONLY. You cannot reopen this event. Later corrections will update the report only; inventory corrections must be entered separately at each affected location."

### D-029 — Saved-search inventory worksheet and reconciliation

Date: 2026-09-22. Authority: User-defined workflow.

Select a location and all items or a subset by Category, Collection, or search term; save the search with a name. Print Inventory Worksheet shows results ordered/labeled by Category, Collection, and item name, recorded quantities, and a blank actual-count column. Reopen the saved search and choose Reconcile Inventory to enter actual counts in a matching form. Blank means no change; 0 is a real count. Next shows only changes with optional per-line Rationale fields. Save Updates posts a separate correction record for each changed item. This count workflow resolves the counted-total entry choice in Q-004; event reconciliation's all-items-counted rule does not apply here.

See [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md). Saved-search details and stock changes during the count remain in Q-036/Q-037.

### D-030 — Item location totals and common inventory ledger

Date: 2026-09-22. Authority: User requirement.

Each item page shows its locations, quantities, and total across all locations. At the bottom, show an inventory ledger with date, signed quantity, location, who/what made the change, and rationale. All inventory-affecting workflows, including shipped requests, event reconciliations, purchases, and inventory corrections, create appropriate ledger entries. Report-only corrections to finalized events remain excluded from inventory effects under D-028; their separate manual inventory adjustments do create ledger entries.

D-033/D-039 subsequently settle balance display; D-068/D-069 settle posting dates and replace these visible ledger columns with the History Table. Actor attribution and rationale remain in source details. The physical database design remains undecided.

### D-031 — Criteria-only saved searches and simple physical-count updates

Date: 2026-09-22. Authority: User clarification; declines worksheet snapshots and intervening-movement checks.

Saved searches retain search criteria only, not result sets or recorded quantities. Reusing a search runs the criteria again. The reconciliation form mirrors worksheet layout/grouping, not a frozen historical set of results.

Entered counts represent what the manager physically counted. Do not modify those counts based on movements before or after counting, retain worksheet quantity snapshots, or add movement-comparison warnings, stale-count rejection, or reconciliation conflict workflows. Normal comparison with recorded inventory to show and save the resulting correction is still required by D-029; it is not a comparison against stored print results. Blank remains no change and zero remains an actual count.

Physical inventories are expected only a few times a year, with usually one person adjusting a given location. Favor the simple count-and-correct flow over workflows for frequent simultaneous counts. This is an operating expectation, not a restriction preventing another manager from working.

Resolves Q-036 and the saved-results portion of Q-037. Search sharing, filter defaults, and packaging units remain to be specified.

### D-032 — Personal saved criteria, worksheet inclusion, and individual units

Date: 2026-09-22. Authority: User direction.

Saved searches are individual, not shared. Save all selected criteria, including location and search terms; save no results (D-031). Within the selected criteria/location, include all active items even at zero stock and inactive items with stock. Exclude only inactive items with zero stock. Count entry uses actual individual item numbers, not boxes/packs or converted bundle input.

### D-033 — Separate availability, location, shipment, and purchase totals

Date: 2026-09-22. Authority: User direction.

Show Available as the total in central and remote storage locations. Show each location separately, excluding In Transit and purchasing-ordered pseudo locations from that location breakdown. Show In Transit for shipped relocation requests and Ordered for ordered purchases. Keep these quantities separate; do not count ordered purchases in both Ordered and the shipment In Transit figure or include either in Available.

D-008 still establishes that ordered purchases are pending before receipt; this decision refines presentation so ordered purchases have their own Ordered bucket even if earlier notes called their holding location In Transit. Physical storage implementation is not decided here. Event-held stock is excluded from Available's central/remote definition; D-039 confirms it appears as an additional location entry while active.

### D-034 — Stop after Inventory Behavior

Date: 2026-09-22. Authority: User pacing request.

Complete the remaining Inventory Behavior questions (Q-001 through Q-004 and directly related balance-display clarification), then stop for the user's break. Do not continue into purchasing/costing, catalog, or other sections. Prepare a concise timestamped handoff and update current status when that stopping point is reached. Remaining technical details can stay with their appropriate later sections rather than expanding this discussion indefinitely.

### D-035 — No reservations; negative inventory permitted

Date: 2026-09-22. Authority: User direction.

Requests and planned events do not reserve stock or reduce availability merely by being requested/planned. Recorded inventory balances may be negative; do not block an otherwise permitted movement or adjustment solely because it would take a balance below zero. No additional warning or approval workflow has been requested.

Resolves Q-003. This concerns recorded balances, not a requirement to enter negative physical counts. D-032 excludes only inactive zero-stock items, so an inactive item with a negative balance remains visible in matching inventory results; do not hide unresolved balances with a positive-stock-only filter.

### D-036 — Confirm relocation posting timing

Date: 2026-09-22. Authority: Explicit user confirmation.

When a relocation is shipped, move actual shipped quantities from the source to In Transit. When received, move received quantities from In Transit to the destination. Requests themselves do not reserve or move stock (D-035). This resolves Q-001's basic timing; other relocation lifecycle details remain in Q-012.

### D-037 — Event planning and activation

Date: 2026-09-22. Authority: User direction.

Events have a Planning state in which the person can enter and revise desired quantities without changing inventory. Planning does not reserve stock (D-035). When a manager activates the plan, move the planned quantities from the recorded source locations directly into that event's temporary inventory location. Do not post the planned stock movement before activation or post it again merely when viewing/saving the already-active event.

Activation handles the initial plan. D-038 confirms immediate posting of additional deliveries after activation. Planning flexibility does not bypass the established requirements for final reconciliation counts and destination allocations.

### D-038 — Post additional deliveries immediately while an event is active

Date: 2026-09-22. Authority: Explicit user confirmation.

Recording an additional delivery to an active event immediately moves that additional quantity from its known source into the event location and updates total brought. Do not repeat initial planned movements or require a new activation or shipment/receipt steps. This includes late-recorded deliveries during unfinished reconciliation. Unknown/external-source deliveries use the positive inventory adjustment established in D-021, without deducting from an arbitrary source.

Immediate incoming delivery updates are distinct from provisional remaining counts. Saving remaining counts does not distribute or return stock; that happens at one-time finalization. Once finalized, D-028 governs: corrections update reports only and required stock adjustments are separate. Resolves Q-002 and Q-031's incoming posting question.

### D-039 — Starting inventory corrections and active-event balances

Date: 2026-09-22. Authority: User confirmation.

Record starting inventory through the correction workflow with the note "starting inventory". The existing correction-entry workflow is also the means to correct inventory mistakes; it does not require rewriting earlier history. This completes the starting-balance/correction behavior in Q-004; detailed permissions and imports belong to later sections.

An active event appears as an additional entry in the item's location breakdown. Its quantities are not included in Available, which remains central plus remote storage. This resolves Q-038's event-stock placement; ledger presentation details remain for later specification.

Inventory Behavior Q-001 through Q-004 and the associated balance-display clarification are complete for this requirements pass. Stop for the user's requested break (D-034); no further section is started.

### D-040 — Base average unit cost on inventory still held

Date: 2026-09-23. Authority: User direction; approves the current-stock basis, not a complete costing specification.

When a new purchase is received, its cost is averaged with the cost of previously purchased items still in inventory. Previously distributed/depleted quantities must not continue to weight the new average. If none of the previous inventory remains, the new purchase alone determines the new average unit cost. The proposed lifetime purchase average was not accepted.

The user described 50 units remaining at $1.00 each plus 900 new units costing $450. Arithmetic clarification: those stated quantities and prices give ($50 + $450) / (50 + 900) = approximately $0.526316 per unit. The user confirmed this arithmetic correction; the numerical example is resolved.

D-041 subsequently confirms blending remaining stock at the existing average unit cost. Stock included in the calculation, negative balances, adjustments, and precision still need definition. Cost components remain in Q-006; purchase corrections in Q-007.

### D-041 — Blend remaining stock at its current average on receipt

Date: 2026-09-23. Authority: Explicit user approval of the proposed calculation and example.

At each purchase receipt, calculate the item's new average unit cost as:

`(remaining quantity × current average unit cost + received purchase cost for the item) / (remaining quantity + received quantity)`

Use the current average to value remaining stock; managers do not need to identify which purchase its units came from. Example: 200 remaining units at approximately $0.526316 contribute approximately $105.26 before adding the next receipt's cost and quantity. These example amounts are illustrative rounding, not approved storage precision. If no previous stock remains, the new receipt's cost divided by its quantity determines the average (D-040).

This resolves Q-005's choice of averaging method. It does not settle included stock locations/states, negative-balance handling, adjustment valuation, cost components, rounding, or retrospective purchase corrections. These remain in Q-005/Q-006/Q-007/Q-034; no full costing specification is approved.

### D-042 — Allocate tax by cost and shipping by quantity

Date: 2026-09-23. Authority: User agreement with the preceding allocation proposal.

Allocate the entered invoice tax among purchase items in proportion to their merchandise cost after discount. Allocate shipping/handling by item quantity. Include these shares in each item's received purchase cost before applying D-041. Enter actual invoice tax; no tax-rate calculation is required by this decision. Mixed tax eligibility and explicit item-specific invoice charges remain details to resolve in Q-006. General discount and rounding rules are not independently approved by this agreement.

### D-043 — Enter quantity with either unit price or line total; include bonus units

Date: 2026-09-23. Authority: User request and operational clarification.

Each purchase line accepts quantity and either unit price or line total. Vendors frequently omit unit prices; the user must be able to enter the provided amount directly. Derive the other price value. The line total is merchandise cost before separately entered order discount, tax, and shipping.

Include vendor bonus units in the entered quantity; do not add a separate Bonus field. In the supplied wristband example, enter GAYMER as 5,200 units with a $900 line total, and ALLY as 3,100 units with a $600 line total. Do not require entering the quoted paid quantities separately. Before order charges, derived unit prices are $900 / 5,200 and $600 / 3,100; avoid using rounded displayed unit prices to reconstruct and alter the entered line total.

The invoice has $1,500 merchandise, $236.25 discount, $88.46 tax, and a $1,352.21 total. No separate shipping amount is listed; the demonstration uses zero additional shipping because the stated amounts already reconcile. This does not establish a default for missing shipping on other invoices or resolve unexpected receipt quantities (Q-007).

Agent Suggestion for interaction: choose Unit price or Line total per row; keep the entered value authoritative when quantity changes and show the other value as calculated. Exact controls and precision remain subject to review.

Illustration for D-042/D-043: [purchase entry mockup](../public/purchase-entry/index.html) and [scope/usage notes](../public/purchase-entry/README.md). D-044 subsequently approves its order-wide discount allocation; rounding and exact controls remain proposals. See the [mockup index](../public/README.md) for current examples.

### D-044 — Allocate order-wide discounts by merchandise value

Date: 2026-09-24. Authority: Explicit user agreement.

Divide an order-wide discount among items in proportion to each item's merchandise value before the discount. For the wristband invoice, $900 GAYMER and $600 ALLY merchandise receive 60% and 40% of the $236.25 discount: $141.75 and $94.50 respectively. Tax allocation then uses the discounted merchandise values under D-042.

This approves the order-wide discount allocation demonstrated in the purchase mockup. D-046 subsequently clarifies that the allocation base includes each line's setup fees. Discounts restricted to particular items and rounding/precision remain in Q-006. No complete specification or mockup is approved by this individual decision.

### D-045 — Assign item-specific setup fees to that item

Date: 2026-09-24. Authority: Explicit user agreement.

An item-specific or design-specific setup fee contributes entirely to that item's purchase cost. Do not spread it among other items in the order. A $15 setup fee for 1,000 Gaymer Ribbons adds $0.015 per ribbon before other charges and contributes nothing to Ally Ribbon cost.

This decides attribution of the setup fee. D-046 includes setup fees in the order-wide discount allocation base, and D-047 includes them in the discounted line totals used for tax allocation. Assignment of shared setup charges remains open in Q-006. The existing purchase mockup does not yet include a setup-fee field; this decision does not approve the full form or authorize application implementation.

### D-046 — Include setup fees in order-wide discount allocation

Date: 2026-09-24. Authority: Explicit user direction; refines D-044.

Apply any order-wide discount proportionally to each line item's cost including its setup fees. Use merchandise cost plus the setup fee attributed to that line as the pre-discount allocation base. This does not spread a line's setup fee to other items; D-045 still assigns it entirely to that item.

For example, lines costing $100 plus $15 setup and $100 with no setup receive 115/215 and 100/215 of the order-wide discount. D-047 subsequently confirms inclusion of setup fees in the discounted tax allocation base. No rounding rule or complete form is approved by this decision.

### D-047 — Allocate tax by discounted line cost including setup fees

Date: 2026-09-24. Authority: Explicit user approval; clarifies D-042.

Allocate the invoice's entered tax proportionally using each line's merchandise cost plus its attributed setup fees, less its allocated discount. Include the resulting tax share in that item's purchase cost. This allocates the actual invoice tax; it does not calculate a tax rate. Shipping continues to be allocated by quantity under D-042.

The ordinary cost sequence is merchandise plus item-specific setup, less allocated order-wide discount, plus allocated tax and shipping. Mixed tax eligibility, shared setup charges, and rounding remain open in Q-006. The current saved mockup has no setup-fee input yet.

### D-048 — Known purchases provide quantities and line subtotals

Date: 2026-09-24. Authority: User clarification of purchasing experience.

The user cannot recall a purchase without quantity and subtotal for each line item. Use the D-043 entry model: quantity plus line subtotal, or quantity plus unit price with the subtotal calculated. No demonstrated need exists for allocating a single merchandise total across items that have no individual amounts.

This closes the combined-total invoice clarification for the current requirements pass. It records the known operating practice, not a guarantee about every future invoice or an approved future feature. Do not introduce a special combined-total allocation workflow without a concrete need. The original rough notes remain preserved.

### D-049 — Use US dollars throughout purchase costing

Date: 2026-09-24. Authority: Explicit user direction: "Always USD."

Record purchase amounts and inventory costs in US dollars. No currency selector, foreign-currency entry, or exchange-rate conversion is needed. Precision and rounding remain separate open details in Q-006.

### D-050 — Preserve internal unit-price precision; display three decimals outside purchasing

Date: 2026-09-25. Authority: Explicit user clarification.

Unit prices/costs may retain the precision available internally. Do not round stored values to match presentation. Outside the purchasing interface, always display unit prices to the nearest tenth of a cent ($0.001), with exactly three decimal places including trailing zeros: $5.000, $0.120, and $23.456 for an internal value of 23.4559123. Calculations use the internally retained value, not the rounded display.

The purchasing interface is exempt from this three-decimal display rule; its exact display precision remains to specify. This replaces the earlier general suggestion to show per-unit costs to six decimals outside purchasing. It does not select a database numeric type, fixed internal scale, rounding tie rule, or approve the separate proposed allocation of leftover cents.

### D-051 — Allocate discount, tax, and shipping in cents with exact reconciliation

Date: 2026-09-25. Authority: Explicit user approval.

Allocate order-wide discount, tax, and shipping amounts in whole cents. For each allocation, calculate proportional shares, take the whole-cent portion of each share, then distribute the remaining cents to lines with the largest fractional remainders. Break equal remainders by line order. Allocate each charge separately so its line shares sum exactly to its invoice amount.

For a $10 charge split equally among three lines, allocate $3.34, $3.33, and $3.33 in line order. The application handles leftover pennies automatically. Unit costs retain internal precision under D-050; this rule does not round stored unit costs to cents or change the three-decimal display outside purchasing. The exact unit-price display inside purchasing remains open.

### D-052 — General Setup Fee split equally by purchase line

Date: 2026-09-25. Authority: Explicit user requirement.

Provide an order-level General Setup Fee. Distribute it equally across purchase item lines by number of lines, regardless of their quantities or merchandise values. This supplements the item-specific setup fee in D-045. The user does not recall a shared-fee invoice but explicitly requests this capability.

Round shares to cents and reconcile exactly using D-051's allocation convention: equal shares have equal fractional remainders, so assign leftover pennies in line order. A $10 General Setup Fee across three lines becomes $3.34, $3.33, and $3.33. Count purchase item lines, not units or unique catalog items.

Each allocated share becomes part of that line's setup cost, included with merchandise and any item-specific setup fee before the D-046 order-wide discount allocation and D-047 tax allocation. The General Setup Fee adds its amount to the order once; its line shares are allocations, not additional duplicate charges. The saved mockup has not yet been updated with setup-fee entry.

### D-053 — Enter item-specific discounts in the item's price

Date: 2026-09-25. Authority: Explicit user agreement.

For a discount applying to a particular item, enter its already-discounted unit price or line subtotal. Do not require a separate item-discount field. Reserve the order's Discount field for order-wide discounts, allocated under D-044/D-046. Do not enter the same discount in both the item amount and the order Discount field.

This preserves D-043's quantity plus unit-price-or-subtotal entry model. The resulting merchandise amount feeds the existing setup, order-discount, tax, and shipping calculations. It does not approve a complete purchase form or settle the remaining tax-eligibility and purchasing-display questions.

### D-054 — Spread entered invoice tax across all purchase lines

Date: 2026-09-25. Authority: Explicit user confirmation.

Spreading the entered invoice tax across all purchase lines is sufficient. Use D-047's proportional allocation by discounted line cost including setup fees, with D-051 cent reconciliation. Do not add per-item taxable/exempt flags or tax-allocation overrides for mixed tax eligibility. The application allocates actual invoice tax; it does not calculate tax liability or tax rates.

This resolves Q-006's mixed-tax-eligibility question for the current requirements pass.

### D-055 — Purchasing displays calculated unit costs to up to six decimals

Date: 2026-09-25. Authority: Explicit user approval.

Within purchasing, show calculated unit prices/costs with up to six decimal places. Preserve available internal precision and the price the user enters; do not round or limit typed values to six decimals merely to match calculated-value presentation. Outside purchasing, continue to show exactly three decimals under D-050. Display rounding never replaces the underlying calculation value or an entered line subtotal.

This resolves Q-006's purchasing display-precision question. The full purchase form remains Draft, and setup-fee entry is still missing from the saved mockup.

### D-056 — Include all held stock in receipt averaging; exclude unreceived orders

Date: 2026-09-25. Authority: Explicit user agreement.

For the existing quantity in D-041's receipt-average calculation, include the item's stock across central and remote storage, shipped relocations In Transit, and active-event locations. Exclude unreceived Ordered purchases. Add the current receipt's quantity and cost once, separately from this existing-stock quantity.

This costing quantity differs from Available, which excludes event and in-transit stock (D-033/D-039). Moving stock among the included locations/states does not change its contribution to receipt averaging. The existing unit-cost average remains the value applied to that quantity; no purchase-batch tracking is required.

This resolves Q-005's stock-coverage question. Treatment of negative balances and valuation of adjustments remain open in Q-005/Q-034.

### D-057 — Use new receipt cost alone when combined existing stock is nonpositive

Date: 2026-09-25. Authority: Explicit user agreement.

Sum the existing recorded quantity across the locations/states included by D-056. If that total is zero or negative, calculate the new average unit cost from the new receipt's cost divided by its received quantity, without assigning weight to the old balance. If the combined existing total is positive, use D-041's normal weighted average, even when an individual location is negative.

This changes only the cost calculation. Do not reset, clamp, or otherwise correct recorded quantities; add the received quantity through the normal receipt workflow. Example: -50 existing units plus 100 received for $20 yields 50 recorded units and a new average cost of $0.200 per unit. Negative balances remain permitted under D-035.

This resolves Q-005's negative-balance costing rule. Valuation of inventory adjustments remains open in Q-034.

### D-058 — Routine count corrections preserve average unit cost

Date: 2026-09-25. Authority: Explicit user approval.

Ordinary physical-count corrections change recorded quantity without changing the item's current average unit cost. This applies both to finding extra items and removing missing items. Example: correcting 1,000 ribbons at $0.120 each to 1,100 ribbons leaves average unit cost at $0.120. A later purchase receipt uses the corrected quantity under D-041/D-056/D-057.

This preserves the simple correction workflow and does not require a new cost entry for routine counts. Starting inventory without an established cost and donated/recovered or unknown-source material remain separate questions in Q-034.

### D-059 — Stored catalog unit cost, unknown values, and admin overrides

Date: 2026-09-25. Authority: Explicit user requirements and worked example. Refines D-041/D-050/D-055/D-058.

- Store the current unit cost on the catalog item. It is the authoritative current value, not a value rebuilt from purchase history.
- When cost is unknown, store zero. When the stored current cost is exactly zero, display `n/a` instead of a currency value. This applies to current unit-cost displays; it does not replace legitimate zero amounts in invoice-entry fields. Nonzero costs retain the agreed display precision, including exactly three decimals outside purchasing. A small nonzero value is not unknown merely because its displayed value rounds to zero.
- Automatically recalculate the current unit cost only as part of purchasing, retaining the established receipt-time update rule. Use the current stored unit cost, current recorded quantity under D-056, and the new receipt's cost and quantity. Never rebuild the average from the entire purchase history.
- If the current stored unit cost is zero, set it from the new receipt alone, even when existing quantity is positive. Do not dilute the new cost by treating existing unknown-cost stock as free. The new current cost applies to all remaining inventory of that catalog item. D-057's new-receipt-only rule for nonpositive existing quantity also remains in force.
- Admins may manually set the current unit cost, overriding the value resulting from past purchases. This changes valuation, not quantities or historical purchase amounts. Subsequent receipts use the overridden current value as their starting cost; it is not a permanent lock against future purchase updates.
- Other stock changes, including counts and non-purchase additions/removals, do not automatically recalculate cost. Starting or recovered/donated stock therefore retains any existing current cost, or zero/`n/a` when no cost is known, unless an admin sets it.

Confirmed example: 1,000 existing Drag Queen Ribbons have unknown cost, stored as zero and displayed as `n/a`. Receiving 2,000 more at a unit cost of 0.142857, with no other charges, sets the current unit cost for all 3,000 to 0.142857, displayed as $0.143 outside purchasing. An admin later uses an old receipt to manually determine and set 0.2000; the 3,000 ribbons then have a value of $600.00, with current unit cost displayed as $0.200.

The example establishes cost behavior; preserve internal precision under D-050 rather than rounding the stored unit cost to its display. Admin cost-edit interaction/history details belong to later permissions and catalog specification. This does not approve automatic historical recosting or settle all purchase-correction behavior in Q-007.

### D-060 — Final purchase receipt uses actual quantity and final cost

Date: 2026-09-25. Authority: Explicit user approval.

When the final delivery contains fewer or more units than ordered, record the actual received quantities and the final amount paid. Complete the purchase receipt and clear its pending Ordered quantities; do not leave shortages pending when no more units are coming. Add only actual received units to the receiving location.

Calculate each item's received unit cost using its final allocated purchase cost divided by its actual received quantity, then update the stored catalog cost under D-041/D-056/D-057/D-059. For 5,000 ordered ribbons with 4,900 delivered and no further delivery expected, receive 4,900 and use 4,900 in the receipt-cost calculation. Excess quantities use the same actual-quantity rule.

This is final-receipt discrepancy handling, not incremental receipt support; partial deliveries remain deferred (D-009). Zero received quantities, cancellations, returns/refunds, late invoices, and later purchase corrections still need applicable rules under Q-007; do not divide by zero or infer those rules from this example.

### D-061 — Purchase ordering, editing, visibility, and receipt finalization

Date: 2026-09-25. Authority: User's explicit workflow clarification.

- Create the purchase entry when placing the order. Its quantities enter the pending purchase bucket; current catalog unit cost and receiving-location stock remain unchanged.
- All authenticated users may view purchase/order details. This grants viewing, not permission to create, edit, receive, cancel, or override costs; action permissions remain in Q-008/Q-011.
- Before receipt, order details can be changed. Update that order's pending quantities to match the revised order; do not post stock to the receiving location or recalculate current catalog unit cost.
- At receipt, verify actual quantities and final purchase details, then finalize receipt. Clear the order's pending quantities, add actual received quantities to the selected location, and calculate/store current catalog unit cost using the agreed receipt rules, including D-060 discrepancies and D-059 current-value-only costing.

Terminology: the user called pending purchase quantities "In Transit" in this workflow recap. D-033's display convention remains Ordered for purchases and In Transit for shipped relocations, avoiding double-counting; the pending behavior described here is the same. No explicit request to rename those display buckets was made.

This does not decide cancellation or editing after finalized receipt. The preceding cancellation proposal remains unapproved. Do not import the event-specific prohibition on reopening into purchases without a separate decision.

### D-062 — Cancel purchases without rewriting order details or other inventory

Date: 2026-09-25. Authority: Explicit user direction.

Save the unreceived purchase as Cancelled. Preserve its recorded quantities and other purchase details; users do not zero out order lines. The cancelled purchase contributes zero to the pending purchase bucket (displayed as Ordered under D-033, called In Transit in the user's description). Remove only this purchase's pending contribution, not other orders' quantities.

Cancellation changes no current catalog unit costs, quantities at actual locations, or unrelated records. Do not automatically modify, cancel, or fulfil relocation requests because an expected purchase was cancelled. Any impacted requests are handled separately, just like requests for material not currently held.

Relocation requests may ask for more than exists at the time; insufficient recorded stock does not prevent a request. This reaffirms D-035's no-reservation and negative-balance rules. Cancellation is status-driven, not a zero-quantity edit or receipt.

This resolves pre-receipt cancellation under Q-007. It does not establish cancellation after finalized receipt or a return/refund workflow.

### D-063 — Permanent purchase notes in every state

Date: 2026-09-25. Authority: Explicit user requirement, introduced before resolving remaining purchase exceptions.

Any authenticated user may add a note to any purchase entry, regardless of its state, including Ordered, Received/finalized, and Cancelled. Purchase notes are visible with the purchase details under D-061. Record creation time to support chronological ordering and associate the note with its author.

By default, display all notes in reverse chronological order, newest first, with no pagination. Once created, notes cannot be edited or deleted, including by their author or an admin. Correct an earlier note by adding another note; keep the original intact. No alternative sort control or correction-link mechanism is required by this decision.

Notes provide purchase context; adding one does not itself alter purchase state, quantities, inventory, or current unit cost. The user introduced notes as groundwork for deciding remaining exceptions. Do not infer that notes alone settle zero-receipt lines, returns/refunds, late invoices, or post-receipt corrections. Those remain in Q-007.

### D-064 — Resolve missing purchase items externally before receipt

Date: 2026-09-25. Authority: Explicit user direction.

Agree any missing-item resolution with the vendor outside the application. Before receipt finalization, edit the purchase to reflect the actual delivered items and externally determined final costs. Remove missing-item lines, remove or revise fees, and otherwise record the agreed result. Explain the variation using purchase notes, then mark the updated entry Received.

Do not add a special zero-receipt-line costing or vendor-resolution workflow. The remaining lines and amounts are the authoritative final receipt inputs; normal allocation and receipt posting apply. This resolves Q-007's zero-receipt-line handling and replaces the unaccepted proposal to retain zero-quantity receipt lines. D-060 actual-quantity receipt and D-062 cancellation remain applicable.

### D-065 — Received purchases use notes; corrections are separate

Date: 2026-09-25. Authority: Explicit user direction.

After receipt, document changes, returns/refunds, late invoices, or discovered mistakes by adding a note to the received purchase. Make any required inventory quantity adjustment through the separate location correction workflow and any required unit-cost change through the admin catalog-cost override workflow. The purchase process does not replay, reverse, or recalculate stock/cost for these later changes.

Use notes rather than modifying finalized purchase transaction details or reopening/re-receiving the purchase. No integrated post-receipt return/refund or recosting workflow is required. Existing permissions for stock corrections and admin cost overrides still apply; purchase-note access alone does not grant those powers. This resolves Q-007's post-receipt exceptions for this requirements pass.

### D-066 — Procurement permission controls purchase management

Date: 2026-09-25. Authority: Explicit user requirement.

Provide a Procurement permission. Any user with this permission may manage all aspects of purchases, including creation, pre-receipt editing, selecting the receiving location, receipt/finalization, and cancellation, within the established state rules. All other authenticated users can view purchase entries and add permanent notes under D-061/D-063.

Procurement does not bypass finalized-purchase restrictions. Separate manual location adjustments and admin current-cost overrides remain outside the purchase process under D-065; Procurement does not itself confer those permissions. Who grants/removes Procurement belongs to the broader permission-management specification.

### D-067 — Purchase approvals happen outside the application

Date: 2026-09-25. Authority: Explicit user direction.

All purchase approval processes are handled outside the system. Do not add an in-app approval state, routing, or approval gate to the purchase workflow. Procurement users record and manage purchases under D-066.

### D-068 — Purchase event dates and inventory posting dates are distinct

Date: 2026-09-25. Authority: Explicit user clarification.

Record Ordered, Shipped, and Received dates for when those purchase events actually happen. The shipped date remains optional under D-008. Inventory dates reflect when the system action triggers the change, such as marking a purchase Received, rather than backdating stock/history to a separately entered purchase date. Date-only presentation is shown in the user's history example; underlying timestamp storage is an implementation detail, not a requirement for users to enter times.

### D-069 — Catalog History Table for quantity and unit-cost changes

Date: 2026-09-25. Authority: Explicit user requirements and worked example; refines D-030's visible ledger columns.

Show an item's History Table on its catalog page. Generate entries automatically for quantity or current unit-cost changes; do not log item-name or other descriptive edits in this table. Entries are independent plain-text records with the unit cost captured at the time of each change. Later cost overrides or description edits must not rewrite earlier history. This is history, not a basis for recalculating current catalog cost.

Default to reverse date order (newest first). Support sorting by date and description; sorting other columns is permitted but not specifically required. Purchase-note pagination rules do not establish pagination requirements for this separate table.

Visible columns:

- Date: when the inventory/cost change was posted. Purchase entries occur at receipt; ordinary relocation entries at shipment; event distribution and leftover entries at finalization. Event activation and replenishment are shown as incoming Relocation entries when posted under D-037/D-038. Creating a Planning event alone still changes no stock.
- Description: type (Adjustment, Purchase, Event, Relocation) and relevant location(s), manufacturer, or event as plain text, using the user's example labels.
- Quantity: signed additions/removals; `±` for transfers with no change to organization-wide quantity; an em dash (`—`) when quantity is unaffected, such as an admin cost override.
- Unit Cost: the current unit cost after the recorded change, retained as a historical value, displayed to three decimals or `n/a` for zero under D-050/D-059. A purchase row shows the resulting catalog average, not merely the unit price on that invoice.

Store a transaction destination link for each row without displaying a Row Link column. Clicking anywhere on a row opens the related adjustment, purchase, relocation request, or event. Incoming event contributions link to the event; event distribution/leftover entries also link to that event. A manual unit-cost override is an Adjustment with quantity `—` and links to its adjustment detail.

The new visible columns replace the earlier proposal to show separate location, actor, and rationale columns or linked debit/credit rows in the catalog table. Existing actor attribution and optional adjustment rationale are retained in underlying transaction details; do not introduce mandatory explanations or duplicate visible transfer rows. A relocation still uses the shipment/receipt inventory transitions in D-036; a summary `±` row is not an instruction to make destination stock available before receipt. Precise receipt-state visibility in this history can be clarified with the relocation workflow.

The [Location Inventory and Item Ledger specification](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md) contains the user's checked ribbon example and derived balances. Assuming the February relocation was received, the example ends with Central 16,550, Indianapolis 2,188, Madison 2,000, Gen Con 0: total 20,738. At the final admin-set cost of $0.160, total value is $3,318.08. Purchase-average values cannot be independently verified from quantity history alone without invoice costs.

### D-070 — Stage-specific history with bracketed ordered quantities

Date: 2026-09-25. Authority: User approval of the stage-history recommendation with explicit quantity-display revision. Extends D-069.

Create distinct history entries for Purchase Ordered and Purchase Received, and for ordinary Relocation Shipped and Relocation Received. Identify the stage and relevant parties/locations in the plain-text description so each row is understandable on its own.

- Purchase Ordered shows the pending quantity in square brackets in the Quantity column, such as `[8,000]`, rather than `—`. Brackets identify ordered quantities, not an acquisition of held stock. Only the pending Ordered bucket changes; current catalog cost and location quantities remain unchanged.
- Purchase Received shows `+8,000` (actual received quantity). It clears the pending quantity, adds location stock, and updates current unit cost under the established rules.
- Relocation Shipped shows `±6,000` for source → In Transit.
- Relocation Received shows `±6,000` for In Transit → destination. Each transfer removes from one place and adds to another; neither increases organization-wide stock.

Keep `—` for entries with no quantity impact, such as cost-only adjustments. Every row captures the current catalog unit cost at that stage and links to its transaction. An Ordered row does not substitute the vendor's quoted unit price for current catalog cost.

Include pending-order quantity changes and cancellation in history as accepted with the recommendation; their precise plain-text descriptions and bracket notation still need specification. Preserve prior entries rather than rewriting them. This extends visible history only, not inventory/cost posting rules, and does not declare GAAP compliance.

### D-071 — Preserve purchase history; append bracketed expectation changes

Date: 2026-09-25. Authority: Explicit user clarification.

The initial Purchase Ordered quantity `[8,000]` means 8,000 units are expected. Never change that historical entry when the order is edited. Record each subsequent pending-quantity change as a new history line using the signed difference in brackets, such as `[- 500]` for a reduction or `[+ 2,000]` for an increase. Link every entry to the same purchase.

The bracketed entries describe changes in expected stock, not additions/removals at actual locations. The current order and Ordered bucket reflect the revised quantities while earlier history stays intact; current catalog unit cost is unchanged. Each new row retains its own posting date and current unit-cost snapshot under D-069/D-070.

Example: `[8,000]`, then `[- 500]`, then `[+ 2,000]` yields 9,500 currently expected units. Actual receipt remains a separate `+` inventory entry under D-070. Exact cancellation history notation remains open in Q-038; cancellation's stock/cost behavior remains settled in D-062.

### D-072 — Append a bracketed cancellation of the remaining expectation

Date: 2026-09-25. Authority: Explicit user approval.

When cancelling an unreceived purchase, append a Purchase Cancelled history entry for each affected item showing the negative of its remaining expected quantity in brackets. For a current expectation of 9,500, show `[- 9,500]`, linking to the same purchase. This removes the purchase's pending Ordered contribution while preserving all prior history and the purchase's recorded line quantities/details (D-062/D-071).

Cancellation does not change actual location inventory or current unit cost. Its new history row captures the posting date and unchanged current cost under D-069. This resolves Q-038's cancellation notation; history entries are never rewritten to zero out earlier expectations.

### D-073 — Other Fees label and purchase mockup update

Date: 2026-09-25. Authority: Explicit user request.

Rename the order-wide General Setup Fee to Other Fees. Preserve D-052’s equal allocation by purchase line count, with cent reconciliation, before proportional discount and tax. Item-specific fees remain attributed to their own lines.

Update the planning mockup to calculate after leaving/committing a field instead of on each keypress, include Notes, and demonstrate creation, modification, optional shipment, and receiving with confirmation. This authorizes the mockup update, not application implementation or approval of the complete interface specification.

### D-074 — Simultaneous Unit and Cost entry

Quantity-change behavior partially superseded by D-075; remaining interactions retained.

Date: 2026-09-25. Authority: Explicit user approval and request to update the mockup for testing.

Use Items columns Catalog Item, QTY, Unit, Cost, Fee, and Line. Keep Add Item/Remove and remove the secondary merchandise/unit summary. Line is calculated as Cost + Fee, before order-wide charges. On field commit, editing Unit calculates Cost (QTY × Unit, rounded to cents); editing Cost calculates Unit with full internal precision. QTY changes preserve whichever price field was last edited. A row Recalculate button repeats those rules. Save must reject mismatches between Cost and QTY × internal Unit after rounding to cents; the shortened displayed Unit is not the validation source. Preserve existing unit-precision/display rules. These interactions replace the earlier price-entry selector in the mockup, whose overall design remains Draft.

### D-075 — Quantity changes always preserve Unit

Date: 2026-09-25. Authority: Explicit user revision after testing the mockup.

When QTY changes, treat the current full-precision Unit as correct and recalculate Cost and Line, even if Cost was the last price field edited. This supersedes only D-074's last-edited-price rule for quantity changes. Editing Cost still recalculates Unit; editing Unit still recalculates Cost. Existing rounding and save validation rules remain in effect. Fix the example dropdown's misencoded ellipsis.

### D-076 — Inventory index search, grouping, navigation, and export

Date: 2026-09-26. Authority: User approval of all eight inventory-index review suggestions. Source: [original inventory draft](../drafts/Inventory%20Index%20and%20Search.md).

Use search above a grouped item table, with an initially collapsed, alphabetized flat `Category : Collection` checkbox list. Search category, collection, or item name without case sensitivity. Selected collections combine as alternatives; search narrows those results. No selected collections means no collection restriction. Provide Clear filters and a selected-collection count such as Filters (3). Show All clears search text while retaining collection filters; Reset clears both search and filters. Whether items load on first opening remains undecided (Q-040).

Label the storage sum Available, not Total (D-033). Sort by Category, Collection, then full item name. Show lightly shaded, full-width collection headings such as Ribbons : Pronouns, without quantity-cell dashes on headings. Show zero item quantities consistently as `—`; show negative values explicitly. Freeze item names and column headings while scrolling. Item names open item pages; location headings open the corresponding location inventory.

The download exports all matching items in displayed order, with separate Category and Collection fields instead of decorative heading rows. Export numeric zero as `0`. See the [Draft inventory index specification](../_specifications/Inventory%20Index%20and%20Search.md). This approves the listed behaviors, not the complete specification or implementation.

### D-077 — Conditional Ordered column and inactive-zero filter

Date: 2026-09-26. Authority: Explicit user answers to inventory-index review questions.

Include a separate Ordered column when there are open orders, keeping pending purchases outside Available and relocation In Transit (D-033). Whether column visibility checks all inventory or only current matching items remains to clarify under Q-040.

By default, exclude only inactive items with zero stock; include active zero-stock items and inactive items with nonzero stock, including negative balances. Add an option in the inventory-index filters to include inactive zero-stock items. This extends browsing controls; it does not silently change the physical-count worksheet/reconciliation inclusion rule in D-032.

The user raised potential initial-load expense and categories of limited interest outside Central, such as Shipping and Boxes. Initial-load behavior remains open; no performance measurement, category exclusion, or user-specific default filter was approved.

### D-078 — Explicit inventory search; no automatic initial results

Date: 2026-09-26. Authority: Explicit user approval.

Open Inventory with search, Show All, and collapsed filters, without loading item results. Display “Search inventory or choose Show All.” Run a query when the user clicks Search, presses Enter in the search box, or selects Show All. Editing search text or filters does not automatically query or refresh results; users can choose several filters before submitting. Show All clears search text and applies the selected filters under D-076. This settles initial loading and search/filter submission in Q-040; it does not establish a measured performance limitation or exclude categories automatically.

### D-079 — Conditional columns depend on matching item quantities

Date: 2026-09-26. Authority: Explicit user approval.

Show each active-event column, In Transit, and Ordered only when that column has a nonzero quantity for at least one item in the current matching results. Evaluate across all matching items, not unrelated inventory or only a displayed page. Negative quantities count as nonzero. An open purchase for buttons does not cause Ordered to appear in a ribbon-only result. Event columns still exclude Planning and finalized events. This resolves the conditional-column scope in Q-040 and refines D-077's open-order condition; it does not change storage-location column visibility or inventory balances.

### D-080 — Inactive zero-stock means every balance is zero

Date: 2026-09-26. Authority: Explicit user approval.

For default inventory-index results, exclude an inactive item only when every current location, event, In Transit, and Ordered balance is zero. Any nonzero balance keeps the item eligible, including pending purchases, negative quantities, and offsetting quantities such as +10 at Central and −10 at Indy. Do not use Available or a net sum across balances to decide exclusion. Search and collection filters still apply. The Include inactive zero-stock items option also makes fully zero inactive items eligible (D-077). This resolves the index's zero-stock definition under Q-040; it does not change inventory quantities or the physical-count workflow.

### D-081 — Clear filters and Reset without querying

Date: 2026-09-26. Authority: Explicit user approval.

Clear filters unchecks every collection and Include inactive zero-stock items while retaining search text. Like other filter edits under D-078, it does not run a query or refresh the current results. Reset clears search text and all filters and returns to the initial screen without results. Neither action runs a query. A subsequent Search/Enter or Show All applies the chosen criteria. This resolves the clearing-control behavior in Q-040.

### D-082 — Preserve inventory browsing context on return

Date: 2026-09-26. Authority: Explicit user approval; retaining filters is an expressed usability priority.

Returning from an item or location page restores the last submitted inventory search, all submitted filters (including inactive-zero inclusion), and scroll position, with quantities refreshed from current inventory. Users must not have to reconstruct their filters or find their place again merely because they opened a detail page. Preserve criteria and browsing position, not a saved quantity snapshot. Return navigation may rerun the submitted query to refresh values; D-078's no-automatic-query rule continues to apply to a fresh initial opening and unsubmitted input edits. This does not establish cross-session persistence or handling of unsubmitted edits when leaving the index; those details remain open under Q-040.

### D-083 — Download displayed results; visible disabled control and empty-table instructions

Date: 2026-09-26. Authority: User approval and explicit clarification.

When search text or filters differ from the submitted criteria, retain the existing results and show “Search settings changed — select Search to update results.” Download exports the displayed result set and values, not pending search/filter edits or a newly run search. Keep the button at the bottom of the listing so download follows review of results. Changing inputs and clicking Download must not execute an unreviewed search.

Keep the table area and bottom Download button visible even when no results are shown. Show a default instruction message within the table, and disable Download until item results are displayed. This includes initial opening, Reset, and a submitted search with no matches. The established initial prompt is “Search inventory or choose Show All.” Distinct no-match wording may supplement the instructions; exact wording is not separately approved.

Retain D-076's CSV structure and ordering: Category and Collection as fields, numeric zero as 0, and no decorative heading rows. This clarifies consistency with displayed results; it does not authorize persistent quantity snapshots for saved searches or count worksheets. Pagination remains undecided; reconcile any proposed pagination with this review-before-download requirement rather than silently exporting unseen results.

### D-084 — Expected catalog size is approximately 225 items

Date: 2026-09-26. Authority: User-provided planning estimate.

Expect approximately 160 tracked items, 30 types of shipping boxes/envelopes/mailers, and 35 Gayme Night games: approximately 225 catalog items total. This is a planning estimate, not a hard catalog limit or a measured performance result. It supplies the item-count portion of Q-024. Pagination and other volume/device/performance details remain to decide.

### D-085 — One scrollable inventory listing without pagination

Date: 2026-09-26. Authority: Explicit user approval.

Show all matching inventory items in one scrollable results table without pagination, retaining fixed column headings and item names. Download at the bottom exports the entire displayed listing, including rows below the visible screen, with the displayed values and CSV conventions in D-076/D-083. Keep explicit Search/Enter or Show All; do not load results automatically on a fresh opening. The approximately 225-item estimate in D-084 informs this layout but is not a hard limit. This resolves pagination and download scope for the index under Q-040/Q-024.

### D-086 — Application-wide desktop-first design

Date: 2026-09-26. Authority: Explicit user direction.

Design the entire application primarily for desktop and laptop use. Phone and tablet use must remain possible, but a clunkier experience is acceptable; these devices do not require an equally optimized interface. This applies beyond inventory browsing to all application workflows. Do not treat desktop-first as permission to make essential actions inaccessible on smaller screens. Specific responsive controls and supported device/browser targets remain implementation or later specification details, not separately approved layouts. This resolves device priority under Q-024 without approving implementation or complete specifications.

### D-087 — Preserve pending search/filter edits on return

Date: 2026-09-26. Authority: Explicit user approval.

Preserve unsubmitted search text and filter edits when navigating from inventory results to an item or location page and back. Keep those pending inputs separate from the last submitted criteria. On return, restore browsing position and refresh results using the last submitted criteria under D-082, retaining pending inputs and the changed-settings notice under D-083. Do not automatically apply pending edits. Download continues to export the displayed results. This resolves pending-edit preservation in Q-040; it does not decide persistence across sessions.

### D-088 — Remember search settings; restore filters closed with an active indicator

Date: 2026-09-26. Authority: User approval and explicit direction.

Remember search/filter settings after closing and reopening the application. Restore the controls but wait for Search/Enter or Show All before loading results on reopening. Preserve pending edits separately from submitted criteria under D-087; remembering settings does not mean persisting quantity snapshots. Storage mechanism and retention duration are not specified.

Always restore the filter panel closed when returning from an item/location page or reopening the application, even if it was previously expanded. Closing the panel does not clear its selections. The closed trigger shows a clear selected-collection count, such as “Filters — 5 selected,” extending D-076's collection count. Visually distinguish the trigger when filters are set; exact styling remains a design detail. The inactive-zero option also counts as an active filter for the visual indicator, even with no collections selected. Agent Suggestion: explicitly label that option on the closed trigger when active so a zero collection count is not misleading.

This settles cross-session settings retention and panel restoration in Q-040. It does not change return navigation's refresh of submitted results under D-082/D-087 or automatically submit pending edits.

### D-089 — Close filters after Search or Show All

Date: 2026-09-26. Authority: Explicit user request after reviewing the inventory mockup.

Close the filter panel when Search (including Enter submission) or Show All runs. Apply and retain the selected filters, preserving the closed trigger's count and active highlighting. Reset continues to close the panel and clear criteria under D-081. This refines the inventory index interaction; it does not approve the assembled specification.

### D-090 — Alphabetical filters flow down columns

Date: 2026-09-26. Authority: User approval and request to update the mockup.

Order the collection checklist alphabetically down each column, then continue at the top of the next column. Use three columns on desktop, two on narrower screens, and one on phones. Column breaks may shift with width; preserve alphabetical reading and keyboard order. This replaces the first mockup's row-wise visual order without changing filter behavior.

### D-091 — Item-view editing entry points

Date: 2026-09-26. Authority: User browser annotations and requested mockup refinement; scope is the view's editing entry points, not approval of complete edit workflows or specifications.

Use two section-level entry points: **Edit Inventory** beside Storage locations and **Edit Details** in the Item details heading. Remove the top Edit item button, per-location Correct inventory links, and separate Adjust unit cost link from the view. Edit Inventory leads to one sub-page for this item's storage-location quantities. Move Active Events lower and visually outside that editing scope. Broader location/access permissions remain postponed; this does not grant every editor access to every location.

Current unit cost appears on Edit Details: editable for admins and read-only for non-admins. Preserve existing cost/history rules: a saved admin cost change is still a cost Adjustment with — quantity; ordinary stock corrections preserve cost, and descriptive edits create no quantity/cost history row. Editing location quantities continues to create manual corrections with optional explanations, not rewrite history. Events, In Transit, and Ordered retain their source-workflow rules.

The mockup shows inactive entry-point controls only. The exact edit forms, save/review behavior, and remaining fields are still Q-041 and its linked questions. Agent Suggestion demonstrated in the mockup: group Active Events, In Transit, and Ordered in a separate full-width section below the inventory/details panels.

### D-092 — Item Edit Inventory with SET, ADJUST, previews, and Save/Cancel

Date: 2026-09-26. Authority: Explicit user request to build and link the planning mockup; not approval of a complete specification or application implementation.

The user accepted the simplified item-view arrangement and requested an Edit Inventory sub-page. List each storage location separately: location name, SET prepopulated with its current quantity, ADJUST, and a calculated non-editable Current Value → New Value display. New Value = SET + ADJUST; users can change either or both inputs. Put a single-line optional Rationale underneath each location, with dividers between locations. At the bottom show Available's original total and new total after Save in two read-only text fields. Include Save and Cancel and JavaScript warnings before leaving with unsaved edits.

Preserve existing individual-unit, negative-balance, optional-explanation, and correction-history rules. Only storage quantities change; event stock, In Transit, Ordered, and catalog cost are unaffected. The user permits reasonable mockup design choices; these do not automatically settle all production behavior. Mockup choices: ADJUST starts at 0 and blank ADJUST means 0; SET is required, zero and negative integers are allowed; fractional/invalid/out-of-range values block saving. Save directly returns to the item view and records one correction per changed location; unchanged rows create none. Demo state persists within the browser tab, with a Reset demo control. These choices and browser warning limits are documented in the mockup notes for review. Broader permissions remain postponed.

### D-093 — Compact Edit Inventory rows and aligned totals

Date: 2026-09-26. Authority: User request to streamline the planning mockup; complete specification remains Draft.

Move each optional Rationale onto the location's input row. Show Current and New as separate right-aligned columns, with Total Current and Total New aligned beneath those values. This revises D-092's second-line rationale and arrow-preview presentation, preserving SET + ADJUST arithmetic, original/new totals, save/cancel behavior, and inventory/history effects.

Agent Suggestions demonstrated for review: one shared header row; order Location, SET, ADJUST, Rationale, Current, New; muted Current and emphasis on changed New values; horizontal scrolling on narrow screens. These details do not change broader permissions or add a new workflow.

### D-094 — Total Available heading and non-focusable totals

Date: 2026-09-26. Authority: Explicit user approval of the compact editor layout and requested refinement.

The user strongly preferred the compact layout. Label the final total row **Total Available**, rendered as the final H3. Remove the repeated Total Current and Total New labels; the two totals align under Current and New. Render both totals as spans, not read-only input fields, so keyboard tabbing skips them. Preserve live calculation and accessible identification of current versus new totals. This supersedes D-092/D-093's total-field presentation only. The assembled specification remains Draft.

### D-095 — Title-case Set/Adjust and saved-results page

Date: 2026-09-26. Authority: Explicit user request.

Use **Set** and **Adjust** in title case. After Save successfully records inventory corrections, open a results page showing the entries just recorded in History. Its only action is **OK**, which returns to the item view. This is a post-save result, not another approval or confirmation step; OK does not post inventory. Preserve the existing History columns, signed correction quantities, and unchanged current catalog cost. This supersedes D-092's direct Save-to-item-view mockup navigation.

Mockup choices for review: show a supplied rationale as secondary text beneath its result description, while preserving the established item History columns; if no quantities changed, show that no History entries were created with the same OK action. Reloading results reads the recorded batch and never saves again. The complete specification remains Draft and broader permissions remain postponed.

### D-096 — Continue to pre-save review, then Cancel/Edit/Save

Date: 2026-09-26. Authority: Explicit user revision.

The first Edit Inventory page has **Cancel** and **Continue**. Continue validates and opens a review showing what will be recorded in History if saved; it does not change inventory or append History. The review has **Cancel**, which opens a warning modal; **Edit**, which returns to the form preserving entered values and rationales; and **Save**, which commits the reviewed corrections. This supersedes D-095's post-save results/OK workflow. Preserve title-case Set/Adjust, compact rows, Total Available spans, optional rationales, and existing inventory/cost/history rules.

Mockup choices: review Date says On Save because the actual posting timestamp is assigned at Save. Successful Save returns to item view with a saved notice. Unchanged review explains no History entries will be created; unavailable/already-saved drafts cannot be posted. Separate temporary browser-tab draft storage enables Edit/Continue without posting quantities. These are planning-demo choices, not approval of application persistence design or broader permissions.

### D-097 — Edit Details mockup, permission comparison, and blank versus zero

Date: 2026-09-26. Authority: Explicit user request.

Create and link Edit Details. For this mockup show Unit Cost twice: one genuinely disabled field representing a user without permission, and one editable field representing a user with permission. The user explicitly postpones deciding who may edit cost directly; do not use this demonstration to settle roles. This revises D-091's presentation and reopens the future permission-holder choice previously described as admin-only, without changing the requirement to authorize cost overrides.

Use text inputs rather than number inputs for numeric values on Edit Details. Preserve blank separately from explicit zero; never silently coerce a blank to 0. Keep the existing cost/history behavior: cost changes produce Adjustment entries with — quantity; descriptive edits create no quantity/cost History, and no details edit changes inventory quantities.

Agent Suggestions / demo choices: two-column details and values layout; fields for name, sample category/collection, variety, illustrative editable SKU, purpose, programs, active status, request bundle, notes, Unit Cost, IRS Value, and Donation Price. Both Unit Cost examples mirror the same proposed value; only the editable field participates in saving. Save returns to item view; Cancel/departure protects unsaved edits. Blank displays as Not set and an explicit zero money value as $0.00; zero catalog cost retains existing n/a display. Input text retains blank/zero when reopened. Production rules for missing cost, reference values, SKU derivation, validation, and lifecycle remain Q-015–Q-019/Q-034; permission policy remains postponed under Q-011. No complete specification or application implementation is approved.

### D-098 — Immutable grouped Adjustment record with actor and time

Date: 2026-09-26. Authority: Explicit user request.

Provide a View History Entry for Adjustments page. It is view-only for everyone, including users allowed to make adjustments; existing saved records are never edited here. Show who changed what and when, including the time even though the item History table continues to show only the date. Present adjustment changes made together in one grouped record. Each related item History row opens that same record; retain separate per-location correction entries underneath the group rather than replacing them with one aggregate quantity.

The mockup supports quantity adjustments and cost-only adjustments, capturing the actor, posting timestamp, and item identity at save. Before/after values, signed quantity deltas, historical cost, and optional rationales make the changes reviewable. Later catalog changes must not rewrite earlier saved records. Viewing has no inventory or cost effect; new corrections remain separate actions.

Agent Suggestions demonstrated: metadata panel, separate quantity/cost tables, seconds and America/Chicago time-zone display, and a Back to Item History link. Demo actor Jordan Lee is explicitly fictional sample data; historical fixture times/rationales are illustrative. The standalone three-location example does not post any inventory. Real authentication, production timezone conventions, and broader viewing permissions remain outside this mockup. No complete specification or implementation is approved.

### D-099 — Full Name, dependent Category/Collection, and collection-owned SKU prefix

Date: 2026-09-26. Origin: User feedback on Edit Details. Scope: field labeling and editing behavior, not approval of the complete specification.

Label the item name **Full Name**. Category and Collection are separate dropdowns; Category determines the available Collections. The SKU prefix comes from Collection and cannot be edited on an individual item; only the suffix is editable. This resolves the prefix-source portion of Q-015.

The mockup also shows each collection's prefix in its option label, as suggested by the user. Agent Suggestions: fixed prefix beside the suffix field; changing Category clears Collection until chosen while retaining the suffix; choosing Collection previews its prefix. Sample prefixes are illustrative. Production behavior for moving existing items between collections, renaming collection prefixes, uniqueness, and permanent identifiers remains Q-015. Cost permissions remain postponed.

### D-100 — Separate In-Person Ask and Online Ask

Date: 2026-09-26. Origin: User clarification of donation terminology and catalog fields.

Replace Donation Price with two independent optional values: **In-Person Ask** (the suggested donation at a convention booth) and **Online Ask** (the amount selected for an online Reward). Use these officer-facing terms in item view and Edit Details. The organization can adjust the online ask down as far as its cost when contacted; this describes current practice, not an automatic discount workflow or a new validation/permission rule.

Both values use text inputs and preserve blank separately from explicit zero (D-097). Changing either value alone has no inventory or cost History effect. Agent Suggestion for existing demo data: carry the old single value into In-Person Ask and leave Online Ask blank, without inventing a second amount. Broader permissions and online exception implementation remain unspecified.

### D-101 — Item-view proportions, grouped details, total row, and search links

Date: 2026-09-26. Origin: User-approved layout proposal; scope is the planning mockup and expected item-view behavior, not application implementation or complete specification approval.

Use approximately one third of the desktop overview for Inventory and two thirds for Item details. Keep storage locations first, followed by a highlighted Total Available row with a bold normal-sized label and larger strong quantity. Preserve the purple highlight. Allow adequate width for location names and quantities; stack sections on smaller screens.

Arrange descriptive details in two columns, with Notes across their full width. Include Category and Collection as links to submitted inventory searches: Category matches that category, while Collection matches that specific collection within its category. Existing eligibility/filter rules still apply. Under one Cost & Values heading, the left column contains Unit Cost and IRS FMV; the right contains In-Person Ask and Online Ask. FMV has question-mark help reading Fair Market Value, available by hover and keyboard focus. This renames the view label for the existing IRS value, not a new value or calculation.

The mockup demonstrates exact search scopes using the inventory-index fixtures; these are separate illustrative data, so some edited categories/collections have no matching fixture rows. Breakpoints, tooltip styling/Escape dismissal, and implementation details are Agent Suggestions. Inventory, costing, immutable History, corrections, blank/zero distinctions, and postponed permissions are unchanged.

### D-102 — Lightly interlink inventory-index and item-view mockups

Date: 2026-09-26. Origin: User request; mockup navigation scope only.

Every inventory-index item-name link opens the one shared `public/item-view/index.html` page. Keep the mockups separate, with independent sample data and behavior; do not bind the selected index row to item-view contents or synchronize quantities. Existing item-view Category/Collection searches provide links back into the index. Preserve browser Back restoration of submitted results, pending criteria, and scroll position. Location links remain placeholders. No application implementation is authorized.

### D-103 — Evening mockup scope and review boundaries

Date: 2026-09-27 UTC. Authority: User's evening request (2026-09-26 local).

Create separate User Management, Relocation Requests, Location Reconciliation, and Purchase Requests mockups, each with README and specification references. Keep them simple, focused, desktop-first, and lightly linked without global navigation. Only mockup HTML/JavaScript/CSS is authorized, not application development. Work independently, record questions, and check weekly usage between stages, stopping cleanly around 50% remaining. Additional mockups may be created if necessary or very useful. All assembled specifications remain Draft pending review.

### D-104 — Microsoft identity, own names, and role baseline

Date: 2026-09-27 UTC. Authority: User's evening request.

Sign in with Microsoft Account. Users may edit their own first/last names, but not email or permissions. Officers default to viewing everything, creating relocation requests, and drafting purchase requests. Managers can update inventory at any Storage Location, superseding assignment-only assumptions in the rough notes. Procurement manages purchases and creates or continues another user's Draft. Admins have broad management powers but cannot alter history/logs. Permission-assignment authority is yet to be determined; show candidate permissions without implementing assignment. Direct Unit Cost editing authority and broader unresolved permissions remain postponed.

### D-105 — Relocation request scope, copies, and index

Date: 2026-09-27 UTC. Authority: User's evening request.

Each request has exactly one source and one destination. Its owner chooses these, adds/removes items, then saves a Draft or submits a request. All current/past requests can be viewed; the index shows date, title, source, destination, status, and Request ID. A past request can be copied to a new independent Draft, editable including both locations, with no retained link to the original. Requests reserve and move no stock; actual shipment/receipt retain D-036. Further fulfillment statuses and exceptional cases remain Q-012.

### D-106 — Any-manager location count entry

Date: 2026-09-27 UTC. Authority: User's evening request, reinforcing D-029–D-032.

Any manager may reconcile any location: select location and criteria, save a personal criteria-only search, print, count, reopen the search, enter changes, review, and save corrections. Count entry starts empty. Tab and Enter advance to the next count field. Blank means unchanged; the entered number is the actual counted quantity, including explicit zero, not the adjustment. Accept human-friendly comma-separated counts. Example: recorded 10,000 and counted 9,000 produces −1,000 in that item's location History. No stored result/quantity snapshots or intervening-movement reconciliation.

### D-107 — Purchase requests, permanent ownership, and expanded stages

Date: 2026-09-27 UTC. Authority: User's evening request. Supersedes earlier no-persistent-Draft assumptions and Ordered-only creation scope.

Anyone authenticated may create a purchase request with no required request fields, including unknown catalog items or merchants and minimal notes. The creator remains its owner permanently. Anyone can view current/past requests and details. Index columns include created, last updated, owner, title, and status. Owners edit/save their Drafts; Procurement can create/continue drafts, modify requests, add notes/catalog items/merchants, and return work to the owner in Draft for information. Workflow: Draft → Request → Ordered → Shipped (optional) → Received. Log every status change with actor/time. Only Procurement moves status backward. No notifications are needed now. Owner may cancel their own Draft; Procurement may cancel any not-yet-Received request. Preserve records and immutable notes/logs.

Draft/Request create no Ordered quantity, held stock, or catalog-cost effects. Existing confirmed order costing/receipt rules remain. Scope of backward transitions relative to Received finality and Cancelled recovery is unresolved (Q-042); the mockup preserves Received finality and labels its earlier-stage reversal behavior Agent Suggestion. Freeform request fields need not satisfy later order/receipt validation.

### D-108 — Post-creation grading and usage floor

Date: 2026-09-27 UTC. Authority: User follow-up during the evening task.

After creating the mockups, check usage and, only while above 50% remaining, spend time grading each and considering improvements. Use judgment to implement clear improvements or retain ideas for user consideration. Stop if remaining usage falls below 50%; do not treat this instruction as approval of new product policies or application implementation. The grading pass began at 68% remaining. Grades and implemented presentation changes are Agent assessments/suggestions, not specification approval.

### D-109 — Central mockup styling and living style guide

Date: 2026-09-28 UTC. Authority: User request for a Chrome walkthrough and consistent shared styling.

All mockups and their walkthrough use `public/css/style.css`. Maintain `public/css/style-guide.html` as the developer/designer starting point with navigation, headers, tables, forms, actions, statuses, notifications, and dialog examples. Future visual changes update both files; future mockups use them with minimal inline styling. The final design is explicitly undecided, and this does not authorize application implementation.

The user requested consistent placement, wording, status indicators and colors and favored red Cancel controls. The provisional conventions chosen for this pass are right-aligned page/section actions with the primary action last, local actions beside their targets, status beside the page title, red Cancel/Discard controls, Save for ordinary edits, and explicit labels for workflow transitions. These are a revisable visual starting point, not new inventory, costing, or permission policy.

### D-110 — Approved sample identities and place names

Date: 2026-09-28 UTC. Authority: User-provided sample-name document and mockup refresh request.

Use [_data/sample-names.md](../_data/sample-names.md) for sample people, storage locations, and event names. The people are pseudo-fictional and the listed real places/events are intentionally public. Use that list for future sample data rather than real identities in historical planning notes. This changes fixtures, not permission policy or workflow behavior. The user considers author metadata and local directory names acceptable and reports replacing the vendor contact and removing the unused cash-box combination from the source material.

### D-111 — Location display order and filter line breaks

Date: 2026-09-28 UTC. Authority: User instruction.

Whenever presenting locations, show Central first, the remaining storage locations alphabetically, relevant active/inventory-affecting events alphabetically, then In Transit and Ordered. Apply this to location rows, columns, selectors and destination summaries while preserving quantities, selected values and established conditional visibility. Transaction History remains chronological. Restore one collection-filter checkbox option per line within each alphabetically flowing column.

### D-112 — Status colors and title badge sizing

Date: 2026-09-28 UTC. Authority: User instruction.

Across all mockups, Draft and Request status labels are yellow; Active, Ordered and Shipped are green; Received and Finalized are purple. Title status labels use the same colors but a larger font closer to the page title size. The shared style guide uses 22px title badges beside 28px titles (20px beside 25px on narrow screens), while ordinary list/table badges stay 12px. Cancelled remains red and read-only/inactive labels remain neutral. These changes affect presentation only.

### D-113 — User directory and inventory filter refinements

Date: 2026-09-28 UTC. Authority: User instructions and location-filter clarification.

Users starts with the approved sample-name directory and assigned roles. Mockup-info provides User/Admin preview, always defaulting to User. Admin preview permits draft-role editing and shows the earlier draft role list; this does not settle broader production permissions or direct Unit Cost authority. My profile remains a sub-page. Adjustment metadata is styled consistently and removes the separate America/Chicago label.

Inventory filters list all storage locations separately from active events, In Transit and Ordered. With none selected, only columns with nonzero counts among results appear. Explicit selections show only those columns, including selected zero-count locations; all storage selected does not imply selecting other areas. Item views retain all locations/details. The mockup keeps item eligibility and the full-storage Available total unchanged. Reconciliation uses matching search/collection-filter controls with exactly one required storage location and retains criteria-only saved searches and the established count/review workflow.

### D-114 — Worksheet background and request index columns

Date: 2026-09-28 UTC. Authority: User instruction.

Only the location-reconciliation Print Worksheet view uses a white page background, including the root document canvas, while retaining colored collection sub-headers with print background graphics enabled. Other views retain their normal background. Only the purchase and relocation index tables use one leading Last Updated date, then Title without an ID underneath. Purchase continues Owner, Status, Request ID; relocation continues Source, Destination, Status, Request ID. Detail and History tables are unchanged.

### D-115 — Relocation stages, item selection, fulfillment and receiving drafts

Date: 2026-09-28 UTC. Authority: User instructions and receiving-save clarification.

Statuses: Draft, Requested, Shipped, Receiving, Complete, Cancelled. Owner or any Location Manager may edit/submit/cancel Drafts. Any Location Manager may edit/add/modify Requested items, save fulfillment numbers without shipping, ship, or return to Draft before cancelling. Shipped item lines are immutable. Any Location Manager may add/edit shipping information before/after shipment, including multiple carrier/number lines (USPS, UPS, FedEx, DHL, Other) with viewed tracking links. Owner or any Location Manager reconciles receipt across separate box arrivals and may save/resume. **Receiving saves are draft counts only; inventory remains In Transit until Complete.** Complete records receipt once. Cancelled permits only copying.

Copy only requested items/quantities; do not copy owner, title, source, destination, notes, shipping/count work or history. The current actor owns the new saved draft. All approved sample storage locations are available. Item selection mirrors Inventory search/collection filters and group rows, shows both current balances and a Request input, and adds nonblank entries in bulk. Numeric entries carry over; nonnumeric entries become zero. Requested quantities are nonnegative and projections update live. Already-requested items disappear from results. Requested Items and Search are separate sections. All requested-item tables share Item, Source current → after requested, Destination current → after requested, Request; packing adds blank Sent. Shipment is a full workflow page with Save and Mark as Shipped → Review Shipment → confirmation.

This resolves Q-012's stage authority, submitted edits, cancellation route and split-arrival draft-count behavior, superseding earlier mockup proposals. Permanent discrepancies, additional outbound shipments and unfulfilled remainder remain Q-012. The retained matching-receipt completion boundary and whole-unit validation are mockup choices, not new policy approval. No application implementation or broader role-assignment/Unit Cost authority is approved.

### D-116 — Relocation draft review, required editable titles and status checkboxes

Date: 2026-09-28 UTC. Authority: User instruction.

Draft editing uses Save draft and Review request. Review shows Edit draft and Submit request; preserve draft values when returning and submit only from review. Require a nonblank Title for relocation requests, including saved Drafts. The owner or any Location Manager can edit the title in any stage, explicitly including Complete and Cancelled. This title-only exception supersedes D-115's Cancelled copy-only wording; other fields remain locked and no stock/history posting is rewritten.

The relocation index replaces the Status dropdown with checkboxes for all statuses. Default selected: Draft, Requested, Shipped, Receiving. Default unselected: Complete, Cancelled. The mockup applies choices immediately, preserves them within the open page, resets defaults on reload, and shows no rows when no statuses are checked.

### D-117 — Catalog mockup scope

Date: 2026-09-28. User-directed mockup scope; assembled specification remains Draft.

- Create a Catalog mockup for Categories, Collections and Items.
- Categories and Collections support create, view, update, set inactive and archive.
- Catalog creates new Items; viewing, editing, setting inactive and inventory changes use Item & History for now.
- Ignore inactive/archived Items’ effects on searches and other places they are used for this pass. This is a discussion deferral, not a release exclusion.
- No broader permission or direct Unit Cost authority decision is implied.

The [draft](../_specifications/Catalog.md) labels validation, restoring an archived record as Inactive and local non-cascading lifecycle behavior as Agent Suggestions/conveniences. They are not approved production policies.

### D-118 — Public GitHub project and local-only sensitive files

Date: 2026-09-28. Origin: User decision.

- Publish the current project from the local `TG Inventory` root to the public [delugeia/tg-inventory](https://github.com/delugeia/tg-inventory) repository; maintain its ongoing public availability.
- Use Git with `main` and an `origin` remote pointing to that repository. Include standard ignore patterns even for files/directories not yet present.
- Keep `_private/` and its `shh.txt` test out of Git. Keep any future secrets or PII in the root `_secrets/` folder, also excluded from Git; never force-add or copy that content into tracked material.
- The user confirmed the current project contains no secrets or PII and authorized the initial push. This does not authorize application implementation.
- 2026-09-28 follow-up: a request to prepare for a handoff includes authorization to commit and push all Git-eligible project changes after completing the other updates, handoff note, and directions. Honor all ignore rules and verify synchronization; report any blocker or remaining unpushed work.

## Proposals under discussion




### P-001 — In Transit and shipment dates

Date: 2026-09-22. Origin: User proposal; purchase entry timing is now decided in D-008. Remaining relocation and shipment details are under discussion, not yet an approved specification.

- Use a pseudo location named In Transit for relocations, keeping source and destination balances accurate until receipt.
- Track requested, shipped, and received dates for relocations.
- Similarly track ordered, shipped, and received dates for purchases so other officers can see incoming orders.
- Related questions: Q-001, Q-007, Q-025, Q-026.

Agent Suggestion: a relocation moves the actual shipped quantity from source to In Transit, then the actual received quantity from In Transit to destination. Track each shipment separately behind the combined In Transit view so receipts cannot consume another shipment's stock. Keep the dates on the transaction/shipment records, not on the shared pseudo location.

The earlier Agent Suggestion to exclude ordered purchases from inventory until receipt was not adopted. D-008 puts ordered quantities in In Transit immediately. Recording a shipped date must not add those quantities again. Ordered purchases can proceed directly to Received when no shipping information is supplied.
