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

Ledger display/entry conventions and pseudo-location total details remain in Q-038. A common history requirement does not yet prescribe the physical database design.

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

## Proposals under discussion

### P-001 — In Transit and shipment dates

Date: 2026-09-22. Origin: User proposal; purchase entry timing is now decided in D-008. Remaining relocation and shipment details are under discussion, not yet an approved specification.

- Use a pseudo location named In Transit for relocations, keeping source and destination balances accurate until receipt.
- Track requested, shipped, and received dates for relocations.
- Similarly track ordered, shipped, and received dates for purchases so other officers can see incoming orders.
- Related questions: Q-001, Q-007, Q-025, Q-026.

Agent Suggestion: a relocation moves the actual shipped quantity from source to In Transit, then the actual received quantity from In Transit to destination. Track each shipment separately behind the combined In Transit view so receipts cannot consume another shipment's stock. Keep the dates on the transaction/shipment records, not on the shared pseudo location.

The earlier Agent Suggestion to exclude ordered purchases from inventory until receipt was not adopted. D-008 puts ordered quantities in In Transit immediately. Recording a shipped date must not add those quantities again. Ordered purchases can proceed directly to Received when no shipping information is supplied.






