# Purchase entry and receiving

State: Draft. Updated: 2026-09-28.

This is the developer-facing behavioral specification for the [purchase mockup](../public/purchase-entry/index.html). It is intended to be usable without reading or reusing its HTML, CSS, or JavaScript. The presentation and interactions have been reviewed with the user; the assembled specification has not been formally approved. Confirmed requirements are grounded in D-123 and [D-040–D-075](../status/Decisions.md). Demo-only behavior and remaining proposals are identified below. Current decisions take precedence over historical proposals.

## Users and state

**2026-09-27 update — D-107:** the workflow now begins Draft → Request → Ordered → Shipped (optional) → Received, with Cancelled before receipt. See [Purchase Requests](Purchase%20Requests.md) and its [mockup](../public/purchase-requests/index.html). Any authenticated person creates optional-information requests and edits their own Draft; ownership is permanent. Procurement continues drafts, prepares orders, and manages later stages. Status changes log actor/time. The earlier statements below describing first creation only at ordering and no persistent Draft are superseded. All detailed order arithmetic and one-time receipt/correction rules remain. Backward-status scope is Q-042; the draft preserves Received finality pending clarification. Permission to directly edit Unit Cost remains postponed (D-097), despite older admin terminology below.

Users with Procurement permission can create, edit, record shipment, receive, and cancel purchases within the state rules. All authenticated users can view purchases and add notes in every state. Procurement does not confer the separate admin ability to override catalog cost. Approvals happen outside the application (D-066/D-067).

A purchase is recorded when the order is placed. Ordered quantities are pending expectations, separate from held stock and relocation In Transit. Shipment information is optional; entering it does not move stock or change cost. Received purchases are finalized and cannot be reopened or edited. Cancelled purchases retain their recorded details and contribute zero Ordered quantity. Permission-granting policy is still in the [open question register](../status/Open%20Questions.md).

## Form structure and fields

Present order details, Items, order charges, a calculated cost breakdown, workflow actions, and Notes. The mockup's exact layout is a reference, not a dependency on its markup or styling.

Order details include purchase name, manufacturer/vendor, one receiving location, Ordered date, optional Shipped date, and Received date during receiving and after receipt. Dates describe when the real-world events happened; stock and history posting times describe when the corresponding action was committed (D-068). The mockup supplies today's date for convenience; this does not replace the actual date or establish an application-wide date-default policy.

Items use these column headers and meanings:

| Column | Meaning and interaction |
| --- | --- |
| Catalog Item | Identify the catalog item being purchased. The mockup uses text as a placeholder for actual item selection. Editing this display is not a catalog-renaming workflow. |
| QTY | Total individual units, including bonus units. No separate Bonus field. |
| Unit | Editable merchandise price per individual unit, excluding fees and order charges. Keep internal precision. |
| Cost | Editable merchandise subtotal for the line, excluding Fee and order charges. Includes any item-specific discount already negotiated with the vendor. |
| Fee | Editable fee attributable only to this item line. |
| Line | Read-only calculated Cost + Fee. This is not the final allocated acquisition cost. |

Keep Add Item and a Remove button for each editable row. Add Item creates another entry row; Remove removes that line from the working purchase and recalculates allocations across the remaining lines. These actions are available during creation, modification, and receipt verification, not on a finalized purchase. Merely adding/removing a row does not post inventory. Do not show the old secondary “Merchandise … Unit price …” text or a Unit/Cost selection dropdown.

## Item editing and recalculation

Commit numerical edits when the field loses focus, including Tab or clicking elsewhere. Do not recalculate/rebuild inputs on each keypress or interrupt typing/focus. Clicking a save/review/refresh action must use the most recent committed field contents.

| Committed change | Preserve | Recalculate |
| --- | --- | --- |
| Unit | Entered Unit, QTY, Fee | Cost = QTY × Unit rounded to cents; Line = Cost + Fee |
| Cost | Entered Cost, QTY, Fee | Unit = Cost ÷ QTY at internal precision; Line = Cost + Fee |
| QTY | Current full-precision Unit, Fee | Cost = new QTY × Unit rounded to cents; Line = Cost + Fee |
| Fee | QTY, Unit, Cost | Line = Cost + Fee |

QTY always preserves Unit, even immediately after a Cost edit. D-075 supersedes D-074's earlier suggestion to preserve whichever price field was last edited. Derived Unit can be displayed to six decimals within purchasing; an explicitly entered Unit retains its available precision. Do not feed rounded display text back into arithmetic unless the user explicitly changes that value.

Provide a small row Recalculate control (reload-style icon, with a meaningful accessible name and tooltip). It repeats the last applicable calculation without posting or saving the purchase: after a Cost edit, derive Unit from that Cost; after a Unit or QTY edit, derive Cost from Unit. A Fee/name edit does not switch the price source. Refresh also updates Line, charge allocation, and the order total. It must not change correct amounts merely because the displayed Unit was shortened.

All money is USD. Currency totals and allocated charges are reconciled in cents. Nonzero catalog unit cost outside purchasing is displayed with exactly three decimals; zero catalog cost is displayed as n/a. Zero invoice amounts remain numeric and are not an unknown-price marker in the purchase form (D-049/D-050/D-055/D-059).

## Charges and cost breakdown

Show editable order-wide Discount, Tax, Shipping, and Other Fees below Items. Other Fees replaces the earlier General Setup Fee label; the allocation method remains the same. Treat Discount as a positive deduction. Item-specific discounts are already reflected in Unit/Cost and must not also be entered as order-wide discounts.

Apply these steps in order:

1. Split Other Fees equally across the number of purchase lines, not quantities. Reconcile to cents.
2. For each line, allocation base = Cost + Fee + its Other Fees share.
3. Allocate the order-wide Discount proportionally to those bases. Subtract the allocated discount to obtain each discounted base.
4. Allocate Tax proportionally to discounted bases, including fees. No per-line tax-exemption controls are required.
5. Allocate Shipping using the purchase's saved **Shipping allocation** choice (D-123): **By line total** defaults for new purchases and weights discounted merchandise only, excluding all fees; **By quantity** weights QTY including bonus units. Tax and shipping do not enter either weight. Save the choice with order details, recalculate when it changes, show it in review, and lock it with the finalized receipt.

   Draft implementation: line-total weight = `Cost × discounted base / allocation base`, or zero for a zero base. This keeps only the merchandise portion after the already-allocated discount; the fee portion and its discount are excluded. Item-specific discounts are already reflected in Cost. **Agent Suggestion:** positive shipping with no positive merchandise weight produces a validation message asking for quantity allocation or corrected amounts. Zero shipping needs no positive weight. Never silently switch allocation methods.
6. Final line acquisition cost = discounted base + allocated Tax + allocated Shipping. Purchase cost per unit = final line acquisition cost ÷ QTY.

For proportional allocations, compute exact shares in cents, take whole cents, and assign remaining cents in descending fractional-remainder order. Break ties by line order. The same method applied to equal weights gives the first lines any leftover Other Fees cents. Recalculate allocations when rows, quantities, or charges change (D-042/D-044–D-054/D-073).

Show a review breakdown with item, merchandise Cost, Fee, Other Fees share, Discount share, Tax share, Shipping share, final order cost for that item, and acquisition cost per unit. Show total order cost. The breakdown must reconcile to sum(Cost + Fee) + Other Fees − Discount + Tax + Shipping. Distinguish Items' Unit (merchandise price), acquisition cost per unit, and the catalog's current average cost.

## Actions and observable effects

| Action | Result | Inventory/cost effect |
| --- | --- | --- |
| Save as Ordered | Validate and create the purchase with its ordered details. | Establish its Ordered quantities; no held stock or catalog-cost change. |
| Edit purchase | Enter editable order details and Items before receipt. | None until saved. |
| Save changes | Validate and replace the current unreceived order details. | Update its pending Ordered quantities only; append expectation-change history when quantities change. |
| Discard changes | Return to saved order values. | None; separately added notes remain. |
| Mark shipped (optional) | Enter/verify Shipped date and save; advance to Shipped (D-107), retaining the same pending Ordered quantities. | None; do not add another pending quantity or move stock. |
| Receive purchase | Enter receipt verification using saved order values. Verify actual quantities, prices, fees, and Received date. | None yet. |
| Cancel receiving | Leave receipt verification and restore saved order details. This does not cancel the order. | None; separately added notes remain. |
| Review receipt | Validate final details and show confirmation with projected stock and catalog-cost changes. | None yet. |
| Back to receipt details | Return from confirmation while retaining the current receipt edits. | None. |
| Confirm receipt | Validate, finalize receipt, and show finalized details. | Clear this purchase's Ordered quantities, add actual quantities to receiving location, and update catalog costs once. |
| Add note | Save a separate attributed note and show it first in the list. | None. |

Receipt confirmation must clearly explain the finality and the receiving location, quantities, and cost effects. The mockup shows item, held quantity now, receiving quantity, held quantity after, current cost, and new cost. Double activation or a retry must not apply the same receipt twice. The UI's preview is not an inventory posting.

After receipt, transaction details, Items, charges, and dates are read-only; notes remain available. No repeat receipt, reopening, or automatic recosting. Correct stock separately at the location and current cost through the authorized admin adjustment process.

## Receipt cost and exceptions

For each item, use current catalog unit cost and current total held quantity at receipt, plus the final acquisition cost and actual quantity of this receipt. Held quantity includes central/remote storage, active events, and relocation In Transit, but excludes pending purchases. Do not reconstruct cost from purchase history or identify old purchase batches.

If current held quantity is positive and catalog cost is nonzero:

`new catalog cost = (current held quantity × current catalog cost + receipt acquisition cost) ÷ (current held quantity + received quantity)`

If current held quantity is zero/negative, or current catalog cost is zero/unknown, use `receipt acquisition cost ÷ received quantity`. Do not reset existing quantities; add the receipt normally. An admin cost override remains authoritative until a later receipt uses it as the current cost. Ordinary stock movements and adjustments do not recalculate catalog cost (D-041/D-056–D-060).

For missing or differing items, agree on resolution with the vendor outside the system, revise purchase quantities and costs to the final actual outcome, remove missing lines/fees as appropriate, and use notes to explain. Then finalize one receipt. Partial purchase deliveries are deferred (FI-001); this form must not imply a partial-receipt workflow. After receipt, record further explanations in notes and make separate authorized adjustments (D-064/D-065).

Cancellation is a confirmed purchase action although not demonstrated by this mockup. Preserve order lines/amounts and prior history; mark Cancelled and clear only that purchase's Ordered contribution. No stock, catalog cost, or relocation-request changes. Requests may exceed available stock and are resolved separately. Cancelled purchases continue to accept notes (D-062/D-072).

## Notes

Place the entry field and note list at the bottom of the purchase workflow. Explanations are optional. Any authenticated user can add a plain-text note to an existing purchase in any state, including Received and Cancelled. Record the authenticated author and creation time. Display all notes newest first with no pagination. A saved note cannot be edited or deleted; corrections are new notes. Adding a note is independent of saving order edits or confirming receipt (D-063).

The original mockup clears the entry field after Add note and ignores blank input. Its ability to add a note before first creation is a demo convenience. D-107 now explicitly requires persistent Drafts; the new request demo can Save a completely blank Draft before appending immutable notes. Exact note presentation at the first Save remains Q-039.

## History integration

Use the [catalog History Table specification](Location%20Inventory%20and%20Item%20Ledger.md#catalog-history-table); it is not implemented in this mockup. At order creation, record the expected quantity in brackets, e.g. `[8,000]`. Later changes append signed bracketed deltas, e.g. `[- 500]` or `[+ 2,000]`, rather than editing earlier entries. Cancellation appends the negative remaining expectation. Receipt adds a separate actual-stock `+` entry. Capture posting date and catalog unit-cost snapshot; link each row to the same purchase. Purchase shipment alone changes neither expectation nor stock/cost and does not substitute for receipt (D-069–D-072).

## Validation and implementation boundaries

Confirmed save validation: compare Cost in cents with QTY × the internally retained Unit rounded to cents. A difference beyond that rounding must identify the row and block saving or receipt. Do not silently overwrite inconsistent values while saving. The user may correct or explicitly recalculate. Check the incoming values and calculated totals on the server as well as providing form feedback; JavaScript alone is not the eventual persistence boundary (implementation guidance).

Current mockup guardrails (Agent Suggestions pending assembled-specification review): require a purchase name, vendor, location, Ordered date, at least one named item with positive whole QTY, and a Received date at receiving. Require finite nonnegative prices, fees, and charges; prevent Discount exceeding merchandise plus fees. If Tax is positive but the discounted base is zero, show an allocation error instead of a misleading result. Invalid entries block save/review and show feedback without losing the user's work. Do not interpret these guardrails as an approved policy for refunds, negative invoices, or fully missing orders.

The mockup is deliberately local: example selection, sample stock, browser storage/reload, Demo user, Demo inventory, and today's-date defaults are aids for review. They do not specify production authentication, persistence, catalog selection, or page architecture. Existing catalog identities must replace free-text sample names. Example reset is not a production delete action. No developer is expected to copy the source or use its numeric types, internal state fields, CSS, or browser storage.

Agent Suggestions for implementation: use decimal-safe money arithmetic and authoritative validation; commit order/receipt/history effects together and prevent duplicate receipt posting. Derive receipt averages from current inventory at actual posting, not a saved demo preview. Exact implementation is left to the developer within the agreed behavior.

## Observable acceptance examples

| Scenario | Expected result |
| --- | --- |
| QTY 5,200; Cost 900; Fee 15 | Derived Unit is 900/5,200 internally, displayed 0.173077; Line is 915.00. No secondary summary line. |
| Type Unit 0.25 without leaving the field | Typing and focus remain uninterrupted. After Tab, Cost is 1,300.00 and Line is 1,315.00. |
| Change Cost to 1,040 at QTY 5,200, then QTY to 6,000 | Unit becomes 0.20, then stays 0.20; Cost becomes 1,200.00 and Line 1,215.00 with Fee 15. |
| Change Fee only | Unit and Cost remain unchanged; Line and all relevant allocated amounts update. |
| Refresh the original 900/5,200 row | Cost stays 900.00; shortened displayed Unit does not introduce drift. |
| Internal Unit 900/5,200, Cost 900 | Saving passes. Internal Unit 0.20, QTY 5,200, Cost 900 fails with the affected row identified. |
| Other Fees 10.01 across two lines | Shares are 5.01 and 5.00 in line order, before discount and tax. |
| Wristbands: QTY 5,200/3,100; Cost 900/600; fees zero; Discount 236.25; Tax 88.46; Shipping 124.16 | Default line-total allocation gives acquisition costs 885.83 and 590.54. Selecting quantity gives 889.12 and 587.25. Both total 1,476.37. With Shipping zero: 811.33 and 540.88, total 1,352.21. |
| Save/edit an order or add Shipped date | Ordered quantities reflect saved lines; held stock and current catalog costs are unchanged. |
| Review receipt, go Back, or Cancel receiving | No receipt stock/cost posting; Back retains receipt edits, Cancel receiving returns to saved order. |
| Confirm receipt twice/retry | Actual receipt is applied once; purchase becomes read-only and pending quantity clears. |
| Example current GAYMER: 1,000 at 0.200; receive 5,200 costing 889.12 | Held becomes 6,200; catalog cost is 1,089.12/6,200, displayed $0.176. |
| Example current ALLY: 500 at unknown cost; receive 3,100 costing 587.25 | Held becomes 3,600; all stock uses 587.25/3,100 as catalog cost, displayed $0.189. |
| Add a correction note after receipt | New note appears first; original remains, with no change to receipt/inventory/cost. |
| View as authenticated user without Procurement | View details and add notes; purchase-management actions are unavailable. |
| Cancel an order | Recorded order details remain; pending contribution is zero; negative bracketed history is appended; stock/cost unchanged. |

Remaining production details belong in the existing [Open Questions](../status/Open%20Questions.md) register. This document consolidates behavior for implementation review; it does not authorize application implementation.
