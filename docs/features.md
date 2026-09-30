# Tabletop Gaymers inventory features

Document state: Draft · September 30, 2026

Our inventory system should help volunteers find supplies, move them where they are needed, record purchases, and account for what we distribute. It should be practical for occasional users, with straightforward screens, saved work, and as little administrative effort as possible.

This overview describes our planned functionality, not an available application or a release commitment. Individual behaviors have been agreed, but the complete feature set and first-release scope still need approval.

## How to read the feature status

- **Well defined:** we have agreed the main behavior. Some implementation details may remain.
- **Partly defined—decisions pending:** we understand the purpose and some behavior, but important choices remain.
- **Identified—not yet explored:** we have recognized the need or possibility without defining a workflow.
- **Proposal—not agreed:** an optional idea for consideration, not a requirement.
- **Deferred:** we have deliberately postponed either a discussion or initial-release work; the distinction is stated.

These labels describe our planning progress, not approval of this document. Where a feature contains settled and unsettled parts, both are identified.

## 1. Sign-in, people, and access

**Partly defined—decisions pending.** We plan to use our organizational Microsoft accounts. People can view a user directory and edit their own first and last names; their Microsoft email and permissions are not self-editable.

Officers can view inventory and create relocation requests. Any signed-in person can create purchase requests, view purchases, and add purchase notes. Location Managers can update and count inventory at any storage location. Procurement handles purchasing. Administrative access does not permit rewriting inventory history or saved logs.

We still need to decide account eligibility, how we add or disable people, who assigns permissions, who can directly change Unit Cost, and who can first finalize an event.

## 2. Catalog and reference information

**Partly defined—decisions pending.** Categories contain Collections, and Collections contain Items. We can create and maintain these records separately from the quantities held at each location. A Collection provides the prefix for an item's SKU, our stock identifier; each item supplies its own suffix.

Item information includes a full name, variety, purpose, programs, notes, and optional bundle information. We distinguish Unit Cost from IRS FMV (Fair Market Value), In-Person Ask, and Online Ask. The two asks are separate amounts. Blank optional values remain distinguishable from an entered zero. Related Category and Collection navigation helps us find similar items.

New item records begin without stock. Editing descriptive information does not move inventory. We have explored inactive and archived records so we can retain older catalog information.

We still need field validation, SKU uniqueness and change rules, bundle and mixed-kit behavior, catalog-editing permissions, and clear retirement/deletion rules. Effects of inactive or archived items on other workflows are **deferred for discussion**, not excluded from a release.

Storage locations, merchants/manufacturers, purposes, and programs also need manageable reference information. Their required fields, retirement rules, and any merging of duplicates remain partly defined. Procurement needs to be able to add an item or merchant while preparing a purchase.

## 3. Find inventory and understand quantities

**Well defined for routine browsing; some details pending.** We can search item names and catalog groups, filter by Collection, and view grouped results. Search or Show All loads results explicitly. Show All retains Collection restrictions. Changing a filter does not silently replace the displayed results.

The inventory listing shows storage balances and relevant event, transit, and purchase quantities. We can choose which location columns to show. Available always means stock across storage locations, even when only selected columns are visible.

| Quantity | Meaning |
| --- | --- |
| Available | Stock held in storage locations |
| Active event | Stock held at an event, outside Available |
| In Transit | Relocation stock shipped but not yet completed at its destination |
| Ordered | Expected purchase quantities not yet received |

Requests and planned events do not reserve stock. Negative recorded balances are allowed, so a permitted correction or movement is not blocked solely because the recorded count is too low.

Results appear in one scrollable listing. We can open an item for its details, balances, and history, then return to our browsing context. Search settings are remembered, including submitted criteria and unfinished filter edits, without automatically loading results on reopening. CSV download includes the entire displayed result set, not an unsubmitted search.

Storage locations appear with Central first, then other storage locations alphabetically, relevant events alphabetically, In Transit, and Ordered. Detailed error handling and smaller-screen behavior still need refinement; later catalog retirement rules also need to be reconciled with search behavior.

## 4. Correct stock and perform physical counts

**Well defined.** Managers can make a simple item adjustment by setting a location's count or adding/removing a quantity. We review the proposed change before saving. Explanations are optional. Starting inventory is recorded as a correction identified as starting inventory.

For a larger count, choose one storage location and search for the items to count. Save personal search criteria for reuse, print a worksheet, enter actual counts, review differences, and save corrections. Saved searches retain criteria only; they do not freeze quantities or results.

Counts use individual items, even when supplies are physically packed in boxes. Count fields begin empty, and Tab or Enter advances entry. A blank skips that item; zero means we counted none. For example, if the system shows 100 and we count 92, it records a correction of minus eight. Counts do not require a separate movement-conflict procedure.

Ordinary quantity corrections preserve Unit Cost. An authorized direct cost correction is a separate capability whose permission rules remain undecided.

## 5. Move supplies between storage locations

**Partly defined—normal workflow well defined; exceptions pending.** A relocation request has a required title, one source, one destination, and requested items. We can select several items together and see projected source and destination balances without reserving stock. Copying an earlier request carries only its requested items and quantities into an independent new draft.

The stages are Draft, Requested, Shipped, Receiving, Complete, and Cancelled. Drafts can be saved, reviewed, edited again, and submitted. The owner or any Location Manager can handle a Draft; managers can edit a Requested record and save fulfillment work. A packing worksheet provides space to record actual quantities sent.

Confirming shipment moves actual sent quantities from the source into In Transit. Shipped item lines are then fixed. Multiple carrier/tracking entries can be recorded; managers can correct shipping information later, including after completion, without changing past movements.

The owner or a manager can save cumulative receiving counts across separate box arrivals. Those saves are drafts: destination stock changes only when receipt is confirmed as Complete. Transfers preserve Unit Cost. Titles remain editable by the owner or any manager at every stage, including Complete and Cancelled.

Status filters help us focus on active requests; Complete and Cancelled are initially excluded. Cancellation is performed from Draft; a Requested record can first return to Draft. We still need rules for permanent shortages, damage, substitutions, additional outbound shipments, and requested quantities left unfulfilled. A requirement that every shipment arrive perfectly is not a settled solution.

## 6. Request, purchase, and receive supplies

**Partly defined—ordering and receipt are well defined; some transitions pending.** Anyone signed in can save or submit a purchase request without required request fields. Free text can describe a new item, an unfamiliar supplier, or an idea that needs more work. Requests permanently belong to their creators. Owners edit their Drafts; Procurement can continue any Draft or return work for clarification. Actual ordering still requires usable order information.

Procurement prepares purchases with one merchant/manufacturer, one receiving location, and multiple items. Purchase approvals happen outside the system. No automatic notifications are currently required.

Draft and Request do not affect inventory. Ordered creates a separate pending quantity. Shipped is optional and adds no stock. After checking actual quantities and final costs, Procurement reviews and confirms Received once. This clears pending quantities, adds received stock at the destination, and updates Unit Cost.

Before receipt, missing-item or supplier disputes are resolved outside the application and reflected in final order details. Cancellation removes that purchase's pending quantities while preserving its record and existing stock. Received purchases stay final under our current rules; later notes and separate stock or cost corrections handle mistakes.

Purchase notes retain author and time and cannot be edited or deleted; corrections are added as new notes. Any signed-in person can add notes even after receipt or cancellation. Status changes also record who acted and when.

We still need the exact permitted backward transitions, treatment of Cancelled records, and first-save note presentation. **Partial purchase deliveries are deferred from initial scope.** This is separate from saving relocation receiving counts while boxes arrive.

## 7. Purchase costing and item values

**Well defined for normal purchases; exceptional cases pending.** We enter individual-item quantities and either unit prices or line totals, including bonus units in the quantity. Supplier prices quoted per hundred are converted to an individual-item price by the person entering the purchase.

Costs are in US dollars. Item-specific fees stay with their items; Other Fees are divided across purchase lines. Order discounts and invoice tax are allocated across lines, including the applicable fees. The purchase keeps a shipping allocation choice: By line total is the default, using discounted merchandise value excluding fees; By quantity is also available. Allocated amounts reconcile to the entered totals, retaining precision for inexpensive supplies.

Receipt updates an item's average Unit Cost using the stock we still hold and the new receipt. Held stock includes storage, active events, and relocation In Transit, but excludes unreceived purchases. If existing stock is nonpositive, or its current cost is recorded as zero, the receipt alone supplies the new cost. We do not need to identify which purchase batch each remaining unit came from. Transfers, event movements, and ordinary count corrections do not recalculate cost.

Valuation fields and suggested asks remain separate from acquisition cost. Our donated-game records use MSRP for our stated IRS and insurance valuation practice; this does not establish a purchase cost or an automatic valuation calculation. Missing-value treatment, some valuation uses, and exceptional shipping allocation cases still need decisions.

## 8. Supply events, count leftovers, and report distribution

**Partly defined—main workflow well defined; exceptions and some permissions pending.** Each event has one temporary inventory location. Planning quantities can be entered without moving or reserving stock. Activation moves the initial supplies from their source locations to the event. Multiple managers and supply sources can contribute to the same event.

Additional supplies can be recorded after delivery, including during reconciliation. Recording these deliveries at an active event moves stock immediately. Unknown or external sources use an adjustment rather than a deduction from an arbitrary storage location. Moving already-recorded supplies around the venue does not add them again.

We count remaining stock once per item across all contributions, save incomplete progress, and resume later. Unlike a storage count, every event item needs an explicit count before finalization. Zero is valid; blank means not counted. Leftovers can return to their default destination or be split among storage locations, with every remaining unit allocated.

Finalization has a prominent confirmation and occurs once. It records distribution and sends leftovers directly to their destinations, with no transit or separate destination receipt. Distributed quantity equals total brought minus remaining; loss is included rather than requiring a separate loss breakdown. The same process serves large conventions and small events entered afterward.

The distribution summary can be printed or downloaded as CSV. Later corrections by any manager are flagged and automatically logged, updating the report only. The event never reopens. Any necessary location stock change is a separate manual adjustment.

We still need initial finalization authority, unusual-count handling, some movement dates and destination defaults, external-stock valuation, exact report details, and whether older report versions should be available.

## 9. History, accountability, and practical presentation

**Well defined at the core.** Item history records quantity and direct cost changes, distinguishes expected purchases from held stock and transfers, and opens related transaction details. Adjustments show before/after quantities, actor, time, and optional explanation. Related entries can be viewed together. Descriptive item edits do not become inventory movements.

History is permanent, even for administrators. Corrections append new records instead of rewriting old entries. Order dates and inventory posting times are distinct, so entering a historical purchase date does not backdate a movement.

We prioritize desktops and laptops while keeping phones and tablets usable. Consistent headings, visible statuses, clear save/review/confirm steps, grouped tables, and printable worksheets support occasional volunteers. Detailed accessibility, browser support, time-zone, and performance requirements remain to be settled.

## 10. Bring forward our existing records

**Partly defined—decisions pending.** We have reviewed our inventory, shipping-material, and donated-game spreadsheets and prepared candidate import data. We still need to choose the catalog records, resolve duplicates, identify locations, confirm starting counts, and decide opening costs.

Historical purchase records can provide useful context, but their final import treatment is undecided. A proposal is to retain incomplete purchases as reference information without applying their stock movements on top of opening balances. Historical counts are not automatically our current inventory. Import preparation does not approve loading those quantities into production.

## 11. Areas identified for later planning

**Identified—not yet explored as complete workflows.** We have discussed reusable equipment and loans, donated-goods receipt, donor rewards, non-event distributions, and consumption or reuse of shipping supplies. We need to decide whether any require a dedicated workflow beyond the simple tools already described.

Shipping-material dimensions, weight, supplier references, and pack sizes may be useful optional details. Donor/manufacturer associations and dated game values may also help. These remain proposals or open choices, not required fields for every item. Automatic shipping-supply consumption is not agreed.

Other reports, attachments, channel integrations beyond basic links/sign-in, and any future notifications are not defined. Backup and recovery, retention, support, and launch constraints also need planning. We have not settled first-release scope beyond the stated partial-purchase-delivery deferral.

## 12. Small optional improvements

**Proposals—not agreed.** A simple text search on purchase and relocation lists could help us find older requests by title or identifier. An optional container-size or packed-weight helper might later be useful if our measurements prove reliable, but it is a lower-priority possibility, not a shipping requirement.

We should judge additions by the volunteer time they save. The existing search, count, movement, purchase, and event workflows should remain useful without adding complex approvals, mandatory explanations, or enterprise-scale administration.
