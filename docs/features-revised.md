# Tabletop Gaymers inventory features

Document state: Draft · September 30, 2026

Our inventory system should make it easy to answer four questions: What do we have? Where is it? How do we get it where it is needed? What did we use or distribute?

We are volunteers, often doing inventory work between other responsibilities. The system should support occasional use, let us save unfinished work, and make routine corrections easy. Explanations should be optional where agreed, and a small task should not require a complicated procedure.

This is an overview of planned features. It does not describe a finished application or promise that everything will be in the first release. Our complete feature set still needs approval.

## Our planning labels

| Label | Meaning |
| --- | --- |
| Well defined | We have agreed the main behavior; finishing details may remain. |
| Partly defined | We know the purpose and core approach, but important decisions remain. |
| Identified | We have discussed the area without defining a complete workflow. |
| Proposal | An optional idea we have not agreed to include. |

These labels describe how far we have worked through a feature, not approval of this overview. We separately identify discussions we have postponed and functionality deferred from initial scope.

## 1. Find supplies and see where they are

**Well defined.** Search for items, narrow the list by Category or Collection, and see quantities grouped in one scrollable table. Open an item to see its details, location balances, and history.

We choose Search or Show All to load results. Show All keeps our Collection restrictions. Changing controls does not silently change the displayed results, and we can return from an item without losing our browsing context. Search settings are remembered without automatically loading results when we reopen the inventory listing.

| Quantity | What it tells us |
| --- | --- |
| Available | How much we have across storage locations |
| Active event | How much is held at an event, outside Available |
| In Transit | How much has shipped on relocations and is awaiting completed receipt |
| Ordered | How much we expect from purchases that have not been received |

We can choose visible location columns without changing the meaning of Available. Locations follow a consistent order: Central, other storage locations alphabetically, relevant events alphabetically, In Transit, then Ordered. A CSV download, usable in a spreadsheet, includes all displayed results, including rows below the screen.

Requests and event plans do not reserve stock. Negative recorded balances are allowed, so an otherwise permitted movement or correction is not blocked solely by an inaccurate recorded quantity.

**Still to refine:** error handling, smaller-screen details, and how later catalog retirement decisions affect visibility.

## 2. Keep the catalog organized

**Partly defined.** Categories group Collections, and Collections group Items. We maintain an item's description separately from its stock at each location. Collections supply the prefix for a SKU, our stock identifier; each item supplies its suffix.

An item can have a full name, variety, purpose, associated programs, notes, and optional bundle information. Category and Collection navigation helps us find related items. Creating an item does not create stock, and changing its description does not move inventory.

We keep different monetary values distinct:

| Value | Purpose |
| --- | --- |
| Unit Cost | Our current recorded acquisition cost per item |
| IRS FMV | A separate Fair Market Value field |
| In-Person Ask | Our suggested in-person donation amount |
| Online Ask | Our separate suggested online donation amount |

Blank optional values remain distinguishable from an explicit zero. Our donated-game records use MSRP, or manufacturer's suggested retail price, for our stated IRS and insurance valuation practice; that does not make MSRP a purchase cost or establish an automatic calculation.

Catalog management includes creating and editing Categories, Collections, and Items, with inactive/archive concepts to retain older information. We also need to maintain storage locations, merchants/manufacturers, purposes, and programs. Procurement can add an item or merchant while preparing an order.

**Decisions pending:** required fields, editing authority, SKU uniqueness and changes, bundle or mixed-kit behavior, location details, and retirement/deletion or duplicate-merging rules. Effects of inactive and archived items on searches and other workflows are **postponed for discussion**, not excluded from a release.

## 3. Count stock and fix mistakes

**Well defined.** A Location Manager can update any storage location, either correcting an individual item or working through a physical count. We enter actual numbers, review the resulting changes, and save. Explanations are optional.

For an individual correction, we can set a count or add/remove a quantity. For a location count, we choose one storage location, search for the relevant items, and optionally print a worksheet. Personal saved searches remember criteria, so they work against current inventory when reused; they do not store frozen result lists or quantities.

Counts use individual items, even when supplies are packed in boxes. Entry starts blank and supports Tab or Enter to advance. A blank skips an item; zero records none found. If the recorded count is 100 and we count 92, the system prepares a correction of minus eight.

We review differences before saving, without a separate stale-count or intervening-movement procedure. Starting inventory uses the same correction approach with a starting-inventory note. Routine quantity corrections preserve Unit Cost; permission to make a separate direct cost correction remains undecided.

## 4. Relocate supplies between storage locations

**Partly defined: the normal workflow is well defined; exceptions remain.** Officers can create relocation requests with a required title, one source, one destination, and multiple requested items. Bulk selection and projected balances help us prepare a request. Copying a previous request carries only its requested items and quantities into an independent new draft.

| Stage | What we do and when stock changes |
| --- | --- |
| Draft | Save, review, edit, and submit; no stock moves. |
| Requested | Managers edit the request and save quantities to send; no stock moves. |
| Shipped | Review and confirm actual sent quantities; stock moves from the source to In Transit. |
| Receiving | Save cumulative counts as boxes arrive; stock stays In Transit. |
| Complete | Review and confirm receipt; stock moves to the destination once. |
| Cancelled | Keep the record for reference and copying; cancel from Draft, returning a Requested record to Draft first if needed. |

The owner or any Location Manager can manage a Draft and record receipt. Managers handle Requested edits and shipment. A packing worksheet has space for actual quantities sent. Multiple carrier/tracking entries help us follow shipments.

After shipment, item lines and sent quantities are fixed. Managers may correct shipping information, including after completion, except on Cancelled requests. The owner or any manager can edit the title at every stage, including Complete and Cancelled. These edits do not change stock or rewrite movement records. Transfers preserve Unit Cost.

Status filters initially leave out Complete and Cancelled so ongoing work is easier to find.

**Decisions pending:** permanent shortages or damage, substitutions, additional outbound shipments, and requested quantities never fulfilled. Saving partial receiving counts is agreed; resolving a permanent discrepancy still needs a policy.

## 5. Request purchases and receive orders

**Partly defined: purchasing and receipt are well defined; some status changes remain open.** Any signed-in person can start a purchase request with as much or as little information as they have. Request fields are optional, and free text can describe an uncataloged item or unfamiliar supplier. Actual orders still need usable purchasing details.

Requests permanently belong to their creators. Owners edit their Drafts; Procurement can continue any Draft, prepare the order, or return it for clarification. Each order has one merchant/manufacturer, one receiving location, and one or more items. Purchase approvals happen outside the system, and automatic notifications are not currently required.

| Stage | Inventory effect |
| --- | --- |
| Draft / Request | None |
| Ordered | Establish expected quantities in Ordered |
| Shipped, if recorded | No additional stock or cost change |
| Received | Clear pending quantities, add actual received stock, and update Unit Cost once |

Procurement checks actual quantities and final charges before reviewing and confirming receipt. Missing-item disputes are resolved with the supplier outside the application and reflected in the final order details. Pre-receipt cancellation removes that purchase's pending contribution while preserving the record and existing stock.

Under our current rules, Received is final. Later mistakes use notes and separate stock or authorized cost corrections. Any signed-in person can view purchases and add notes, including after receipt or cancellation. Saved notes retain their author and time and cannot be changed or deleted; a correction is another note. Status changes also record who acted and when.

**Decisions pending:** exact backward status transitions available to Procurement, restoration of Cancelled records, and note entry at first save. Current receipt finality remains in place while those questions are reviewed.

**Deferred from initial scope:** receiving a purchase through multiple partial deliveries. This does not remove the agreed ability to save relocation receiving counts as boxes arrive.

## 6. Calculate purchase costs without tracking batches

**Well defined for normal purchases.** We enter individual-item quantities and unit prices or line totals. Bonus units count toward the received quantity. If a supplier quotes a price per hundred, the person entering the purchase converts it to the price per individual item.

The system distributes discounts, tax, and fees across purchase lines and keeps their allocated totals consistent with the amounts entered. Item-specific fees stay with that item; Other Fees are split equally across lines. Invoice tax uses discounted cost including fees. All costing is in US dollars, with enough precision for low-cost supplies.

We choose how to allocate shipping for each purchase:

- **By line total:** the default, based on discounted merchandise value excluding fees.
- **By quantity:** based on individual units, including bonus units.

On receipt, the system updates average Unit Cost using the stock we still hold and the new purchase. Held stock includes storage, events, and relocation In Transit, but not unreceived orders. When existing stock is zero or negative, or its current cost is recorded as zero, the new receipt alone determines cost. We do not identify the purchase batch of each remaining unit.

Transfers, event movements, and ordinary count corrections leave Unit Cost unchanged. Suggested donation asks and valuation fields remain separate from cost.

**Decisions pending:** some missing-value behavior, direct cost-editing authority, and exceptional shipping allocation cases such as positive shipping with no merchandise value.

## 7. Supply an event and account for what we distributed

**Partly defined: the main workflow is well defined; exceptions and some permissions remain.** Each event has one temporary inventory location. Multiple managers can contribute supplies from different storage locations and work on the same event.

1. **Plan supplies.** Record intended quantities without moving or reserving stock. Activating the event moves the initial supplies from their sources into the event.
2. **Add deliveries.** Record additional supplies, including after the delivery actually happened or while counting leftovers. These entries move stock immediately at an active event. Unknown or external sources use an adjustment, not a deduction from an arbitrary storage location.
3. **Count leftovers.** Enter one remaining count per item across all contributions. Save unfinished work and resume later. Supplies moved within the same venue are not another delivery.
4. **Choose destinations.** Use the default return destination or split leftovers among storage locations. Allocate every remaining unit.
5. **Finalize once.** Review a prominent confirmation. Finalization records distribution and sends leftovers directly to their destinations, without In Transit or another receipt step.

Every event item needs an explicit remaining count before finalization. Zero is a count; blank means unfinished. This differs from a storage count, where a blank skips an item. The same event process works for a convention or a small event entered at home afterward.

Distributed quantity is total brought minus remaining. For example, 1,000 brought and 250 left gives 750 distributed. Loss is included in this total, without a separate loss-reporting procedure.

We can print the distribution summary or download it as CSV. After finalization, any manager can make flagged, automatically logged report corrections with an optional explanation. The event never reopens, and those corrections change reports only. Any needed location inventory correction is a separate manual adjustment.

**Decisions pending:** initial finalization authority, unusual counts, some movement dates and destination defaults, external-stock valuation, exact report details, and whether previous report versions are needed.

## 8. Understand what changed

**Well defined at the core.** Item history shows quantity and direct Unit Cost changes, distinguishes expected orders from stock movements, and provides access to related transaction details. Adjustment records show before/after quantities, who made the change, when it happened, and any explanation. Related adjustments can be viewed together.

Saved history cannot be rewritten, including by administrators. Corrections add entries while preserving earlier records. Descriptive item edits do not create inventory movements. Purchase-event dates and inventory posting times remain distinct, so entering an older order date does not backdate a stock change.

**Still to refine:** some history browsing and grouping details and the production time-zone policy.

## 9. Sign in and give people the right access

**Partly defined.** We plan organizational Microsoft sign-in, a user directory, and a profile where people edit their own first and last names. Microsoft email and personal permissions are read-only to the account holder.

Officers view inventory and create relocation requests. Location Managers update inventory at any storage location. Procurement handles purchase preparation and later stages. Any signed-in person can create purchase requests, view purchases, and add purchase notes. Administrative authority does not include editing saved history or logs.

**Decisions pending:** account eligibility, onboarding and deactivation, the first administrator, role assignment/removal, and remaining action permissions. We have postponed broader permission decisions, including who directly edits Unit Cost; this is not a release-scope exclusion.

## 10. Keep everyday use straightforward

**Partly defined; the design priorities are agreed.** We prioritize desktops and laptops while keeping phones and tablets usable. Consistent headings, clear status labels, grouped tables, simple Save actions, and explicit review/confirmation for consequential steps should help occasional volunteers.

Our practical outputs are the inventory CSV, location-count worksheet, relocation packing worksheet, and printable/CSV event distribution summary. Saved drafts and count progress let us work around interruptions. These tools support ordinary volunteer work without requiring purchase-batch tracking or mandatory explanations for routine corrections.

**Still to define:** accessibility requirements, supported browsers/devices, performance expectations, and detailed error handling. Other reports, attachments, and integrations beyond basic links and Microsoft sign-in are identified possibilities, not promised features.

## 11. Start with trustworthy data and keep it recoverable

**Partly defined for imports; operating arrangements still need planning.** We have reviewed our inventory, shipping-material, and donated-game spreadsheets and prepared candidate data. Before loading it, we need to select records, resolve duplicates, identify storage locations, confirm starting quantities, and choose opening costs. Historical quantities are not automatically today's stock.

**Proposal:** retain incomplete historical purchases as reference information without applying their movements on top of opening balances. The records to retain and final import treatment remain undecided.

Backup and restoration, record retention, support responsibilities, and production launch arrangements need definition. These are practical continuity needs; no specific operating procedure is agreed yet.

## 12. Possibilities we have not fully worked through

The areas below are **identified**, not complete workflows or first-release commitments. We should first determine whether the simple tools above are sufficient.

| Area | What remains to explore |
| --- | --- |
| Reusable equipment and loans | Check-out, return, and whether individual units need identification |
| Donated goods and games | Receipt recording, donor/manufacturer associations, gift dates, and dated values |
| Donor rewards and non-event distribution | How to record fulfillment and stock leaving outside an event |
| Shipping supplies | Useful optional size, weight, supplier, and pack details; when use or reuse changes stock |
| Bundles and mixed-item kits | Convenient requesting quantities versus tracking kit contents |

Two small **proposals** remain available for consideration: text search on purchase and relocation lists to find past requests, and a lower-priority helper for container fit or estimated packed weight if reliable measurements justify it. Neither is required; automatic shipping-supply consumption and carrier integration are not agreed.

Our first-release scope remains to be chosen. Partial purchase deliveries are explicitly deferred from that scope. Catalog lifecycle effects and broader permissions are postponed discussions, not decisions to omit those features. We should add functionality where it saves volunteer effort and keep the core workflows easy to learn.
