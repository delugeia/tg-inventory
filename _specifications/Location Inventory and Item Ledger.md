# Location inventory and item ledger

Document state: Draft

Created: 2026-09-22

Basis: user-defined workflow, recorded in D-029 through D-039 and D-068–D-072 in [Decisions](../status/Decisions.md). The requirements below capture user direction; the assembled document has not yet been approved as a complete specification. Unsettled details remain in the single [Open Questions](../status/Open%20Questions.md) register.

## Purpose and users

2026-09-27 update, D-104/D-106: any manager may reconcile any Storage Location. [Location reconciliation mockup](../public/location-reconciliation/index.html) and [usage/source notes](../public/location-reconciliation/README.md) demonstrate select/search, personal criteria saving, print worksheet, blank count entry, pre-save review and immutable corrections. All count inputs start empty; Tab and Enter advance through counts; comma-separated actual counts are accepted. Blank is unchanged and zero is an explicit count. This adds no stored result/quantity snapshots or intervening-movement warnings. Multi-item source-record layout and demo validation remain Agent Suggestions; specifications remain Draft.

Managers periodically count selected items at a location, compare actual counts with recorded quantities, review differences, and save individual correction entries. Keep the process simple; rationale is optional for each change. D-104/D-106 permit any manager to reconcile any Storage Location; permission assignment remains in Q-010/Q-011. Item pages expose quantities by location, a total across locations, and a ledger of inventory changes; precise viewing permissions remain in Q-011.

## 1. Select and save a search

Select a location and the items to inventory. Support all items or filtering by Category, Collection, or search term. Allow naming and saving the search for reuse when returning from the physical count. A saved search is not itself an inventory update.

Save criteria only, never result sets or quantity snapshots (D-031). Reusing the search runs those criteria again against current data. Counts are occasional, typically a few times a year, and usually entered by one person per location; this is context for a simple workflow, not an exclusive-user lock.

Saved searches are personal and not shared. Store every selected criterion, including location and search terms (D-032). Within the chosen filters/location, include all active items, including zero-stock items, plus inactive items with stock. The only excluded matching items are inactive items with zero stock. Apply the same inclusion rule to the worksheet and reconciliation results.

## 2. Print Inventory Worksheet

From the results, select **Print Inventory Worksheet**. Print the selected results, ordered and labeled by Category, then Collection, then item name. Show a recorded inventory quantity column and a blank column for handwritten findings. The worksheet is carried to the inventory location for counting.

The entry form mirrors the worksheet's organization so the manager can transfer counts easily. Rerun the saved criteria; do not retain the paper's results or quantities as a snapshot. Matching means consistent Category/Collection/item organization, not a guaranteed identical historical result set (D-031).

Agent Suggestion: include the location, saved search name, and printing date on the worksheet so the paper can be matched to its count entry. These extra headings are not yet approved.

## 3. Reconcile Inventory

After counting, reopen the saved search and select **Reconcile Inventory**. Show a form mirroring the printed page and enter the actual quantity found for each selected item.

| Entry | Meaning |
| --- | --- |
| Blank | No change; skip this item |
| 0 | Actual count is zero; compare against the recorded quantity |
| Positive count | Actual count found, not a signed adjustment |

Unlike event finalization, a location inventory run does not require a count for every selected item. Never convert blanks into zero. The entered number is the actual counted total, not a delta. Compare it with recorded inventory to calculate the correction. Do not adjust the user's count based on intervening movements or compare it with a stored print-time balance. No movement warnings or stale-count/conflict workflow are required (D-031).

## 4. Next: review only changes

Selecting **Next** displays a second page containing only items whose entered count differs from the applicable recorded balance. Blank inputs and matching counts produce no change row. Each displayed item has its own blank, optional **Rationale** text field. Do not require an explanation or a reason category.

Agent Suggestion: show item, recorded quantity, actual count, and signed change on the review page. The exact review columns are not yet approved.

## 5. Save Updates

Starting inventory uses this correction workflow with the note **starting inventory** (D-039). Later mistakes can be fixed with a further correction entry using the same workflow, preserving earlier change history.

Selecting **Save Updates** applies the reviewed corrections. Create one separate inventory change record per changed item at the selected location, carrying that line's optional rationale and normal actor/date/change information. Do not replace the individual changes with only one overall count-run record. Choosing a search, printing, entering counts, and selecting Next do not themselves post the corrections.

Examples comparing recorded inventory with actual counts:

| Recorded | Entered count | Correction |
| ---: | ---: | --- |
| 17,000 | 18,000 | +1,000 |
| 17,000 | 16,000 | -1,000 |
| 17,000 | 0 | -17,000 |
| 17,000 | Blank | None |
| 17,000 | 17,000 | None |

Enter actual individual item counts (D-032), not boxes or packs. Do not multiply reconciliation input by a bundle quantity. Request-bundle behavior is separate and remains in Q-016.

## Item page and common change ledger

Planning reference: [interactive item-view mockup](../public/item-view/index.html), with [usage/source notes](../public/item-view/README.md). Created at the user's request on 2026-09-26; specific user decisions are recorded in D-091–D-102; remaining demo choices are Agent Suggestions. Linked editors, adjustment records, and index navigation are demonstrated, without application implementation or complete specification approval.

D-091 places **Edit Inventory** beside Storage locations and **Edit Details** in the details heading. Edit Inventory leads to storage-location quantities for this item together, preserving manual correction history and optional explanations. Active Events is shown lower, outside that editing scope. Edit Details includes current unit cost, editable with cost permission and disabled without it (D-097 postpones who receives that permission); saved cost changes retain the established Adjustment history behavior. Remove individual correction and cost-adjustment controls from the view. These entry-point decisions do not settle edit-form/save details or broader permissions (Q-041/Q-011).

Recorded inventory balances may be negative (D-035). Do not block an otherwise permitted adjustment solely because the balance would become negative. Requests and planned events do not reserve stock. Matching inactive items with nonzero negative balances remain visible under D-032's rule excluding only inactive zero-stock items.

An item page shows these quantities (D-033):

| Column/detail | Meaning |
| --- | --- |
| Available | Sum held at central and remote storage locations |
| Each Location | Separate location quantities, excluding In Transit and purchasing-ordered pseudo locations |
| In Transit | Shipped relocation request quantities awaiting receipt |
| Ordered | Ordered purchase quantities awaiting receipt |

Do not combine Ordered into the shipped-request In Transit figure or Available. These distinct figures refine the earlier generic all-location total request. Each active event appears as an additional entry in the location breakdown, excluded from Available (D-039).

## Item Edit Inventory sub-page

D-092 defines the item-page editor separately from the saved-search count workflow above. See the [interactive mockup](../public/item-view/edit-inventory.html) and [usage notes](../public/item-view/README.md). The user requested this mockup and its layout; the assembled specification remains Draft.

For each storage location, show its name, Set, Adjust, an optional Rationale input, and separate non-editable right-aligned Current and New columns (D-093). Set begins at that location's current item quantity. New Value = Set + Adjust, so either or both inputs can change. Keep the single-line Rationale input on the same row. Separate locations with dividers. Below all locations use a final H3 labeled Total Available. Show original Available and proposed Available after Save as non-focusable spans aligned under Current and New, without repeated Total Current/Total New labels (D-094). Available sums only storage quantities. Provide Cancel and Continue on the form (D-096); warn before leaving with unsaved edits. Continue validates and opens a proposed-History review without changing inventory or History.

Save applies manual location corrections, preserving earlier history and the current catalog cost. Each changed location produces its own correction for this item with optional rationale; unchanged quantities produce no correction. Event stock, In Transit, and Ordered stay outside this editor. Broader access policy remains Q-011; listing all sample locations does not grant all users editing rights.

Agent Suggestions demonstrated for review: Adjust starts at 0; a blank Adjust counts as zero, while blank Set is invalid. Accept whole individual units including zero and negative balances; reject fractions, invalid numbers, and unsafe arithmetic. These item-editor choices do not replace blank-means-no-change in the separate physical-count worksheet workflow. D-096’s review shows what will be recorded if saved, using the established Date, Description, Quantity, and Unit Cost columns. Its actions are Cancel (warning modal), Edit (return with all Set/Adjust/rationale inputs retained), and Save (commit only now). Mockup choices: display On Save in the Date column until posting, and return to item view with a saved notice after Save. Reopening a committed review must not post again. Cancel/Item view offers Keep editing or Discard changes when dirty, including rationale-only edits. Native browser departure warnings use browser-owned text; support depends on the browser. Session storage and Reset demo are mockup conveniences, not production persistence requirements.

Observable examples:

- Original 2,000, Set 1,900, Adjust +50 previews 2,000 → 1,950. With other storage at 550 and 0, Available previews 2,550 → 2,500. Save creates a −50 correction at unchanged unit cost.
- Original 550, Set 550, Adjust −600 produces −50; a negative result is allowed. Set 0 and Adjust 0 explicitly zero a location.
- Blank rationale does not block saving. A saved rationale accompanies its changed-location correction. Unchanged rows create no quantity/cost history.
- Cancel then Keep editing preserves the form. Discard returns without saving. Continue shows proposed entries while inventory/history remain unchanged. Review Edit restores all fields; review Cancel warns and can discard without posting. Only review Save returns with new storage balances and history, leaving the event/transit/ordered figures and cost unchanged.

## Main-view layout and catalog search links

D-101 uses approximately 1/3 Inventory and 2/3 Item details on desktop, stacking sections on smaller screens. Storage locations precede a highlighted Total Available row: bold normal-sized label, larger strong quantity, and the existing purple highlight. Descriptive details use two columns; Notes spans both. Category links to a submitted search for that category, and Collection links to a search constrained to that collection within its category, retaining normal item-eligibility rules.

One Cost & Values heading covers two columns: Unit Cost and IRS FMV on the left; In-Person Ask and Online Ask on the right. A question-mark indicator beside FMV explains Fair Market Value on hover and keyboard focus. IRS FMV is the existing IRS value field with a clearer view label. No costing or valuation calculation changes.

Observable checks: the storage total still equals the location quantities; related event/transit/ordered figures remain separate. Category results contain only that category; Collection results contain only the selected category/collection pair. The mockup's independent fixtures may legitimately return no matches. FMV help can be opened using keyboard focus and dismissed with Escape. Narrow layouts retain readable fields without compressing the inventory column.

## Item Edit Details mockup

D-097 requests a linked [Edit Details mockup](../public/item-view/edit-details.html). Display two Unit Cost examples together: without permission (disabled) and with permission (editable). Who may edit this value directly remains postponed. All numeric-value controls on this page use text inputs, preserving blank separately from explicit zero. This is not a revision to the inventory editor's Set/Adjust controls.

D-099 labels the name **Full Name**, separates Category and Collection, and filters Collections by Category. Collection owns the fixed SKU prefix; only the suffix is editable for an item. Collection options display illustrative prefixes. The mockup retains the suffix when Category changes, requires a new Collection choice, and previews its prefix (Agent Suggestions). Production migration/uniqueness and prefix-rename behavior remain Q-015.

Agent Suggestions demonstrated for review: variety name, purpose, programs, active status, bundle type/quantity, notes, and monetary field grouping. No identity migration, archive, or deletion policy is implied. Required name, nonnegative decimal money, and whole bundle quantity are demo validation choices, not approved final field constraints. Both Unit Cost examples mirror one proposed value. Save returns to item view; Cancel warns when dirty.

Metadata edits leave balances and quantity/cost History unchanged. A changed cost records an Adjustment with — quantity and the new cost, preserving prior entries. Inventory corrections retain whichever current cost is saved. Demo state stores blank as empty text and explicit zero as zero text; blank renders Not set, other monetary zero as $0.00, and zero catalog cost as n/a under the existing rule. Production missing-cost behavior remains Q-034/Q-019 rather than silently treating blank as zero in receipt calculations.

D-100 replaces Donation Price with independent **In-Person Ask** and **Online Ask** fields on item view and Edit Details. In-Person Ask is the suggested donation at a convention booth; Online Ask is the amount selected for an online Reward. When contacted, the organization can reduce the online ask as far as its cost. This explains current practice; it does not specify an automatic discount or enforce a new cost-floor validation. Both fields are optional text inputs with blank distinct from zero. Changing either alone creates no inventory/cost History entry.

Observable checks: either ask left blank remains blank after Save/reopen; IRS Value entered as 0 remains 0 and displays $0.00. Clearing Unit Cost remains distinct from setting it to 0. The disabled example cannot be edited or tabbed into; the editable example is usable. A cost-only change creates one — History entry without changing quantities; a description-only save creates none. Cancel discards unsaved edits after warning.

## View Adjustment record

D-098 provides an immutable source-record page, [demonstrated here](../public/item-view/adjustment.html). It is view-only for every viewer, including users with adjustment permissions. Group all adjustment changes made together in one save, while preserving each individual item/location correction and its separate History entry. Related adjustment History rows lead to the same group. Viewing does not update inventory, cost, or History.

Show the actor and posting date/time, along with what changed. Quantity changes show location, before quantity, after quantity, signed difference, captured unit cost, and optional rationale. Cost-only changes show previous and new unit cost without a quantity effect. Capture item identity and historical values with the record; later descriptive edits or cost overrides do not rewrite it. The item History table still displays date only; the source detail includes time.

Agent Suggestions: separate metadata and change sections; timestamp including seconds with explicit America/Chicago zone in this demo; missing-rationale wording; back link to item History. Production timezone/display policy remains open. All sample identities, fixture timestamps, and fixture rationales are illustrative. No admin edit/delete exception is demonstrated or implied. More general grouping across multi-item source transactions remains to be laid out; the current item-page example groups multiple locations of one item.

Observable examples: correcting Central and Madison in one Save creates separate item History rows that both open one view containing those two changes and their shared actor/time. A later cost override opens a cost-only record and leaves the earlier quantity record's costs intact. There are no edit/save/delete controls on either record. Time appears here but not on the item History table.

## Catalog History Table

D-069/D-070 define the table at the bottom of the catalog item page. Automatically record quantity or unit-cost changes as independent plain-text entries. Do not record item-name or other descriptive changes here. Default to newest date first; allow sorting by date and description (other sortable columns are acceptable).

| Visible column | Content |
| --- | --- |
| Date | Date the system posted the quantity/cost change, not a backdated purchase-event date |
| Description | Adjustment, Purchase, Event, or Relocation, plus the relevant location(s), manufacturer, or event |
| Quantity | Signed additions/removals; `[8,000]` for pending ordered quantity; `±` for a transfer; `—` for no quantity effect |
| Unit Cost | Current catalog unit cost at that change, shown to three decimals, or `n/a` for zero |

Store the related transaction-page link for the whole row. Do not display a separate Row Link column. Clicking the row opens its adjustment, purchase, relocation request, or event. Retain the stored historical description and unit cost; later edits or admin overrides do not change previous rows. Purchase rows show the resulting catalog average. Unit-cost overrides appear as Adjustment entries with `—` quantity and the newly set cost. Cost applies to the catalog item across all locations, even when an adjustment description names a location.

This replaces D-030's earlier visible actor/location/rationale-column proposal. Keep actor attribution and optional rationale in the underlying transaction detail. Notes are not required to make a correction. The database representation remains an implementation choice; the History Table is not used to rebuild current cost (D-059).

Purchase Ordered/Shipped/Received dates reflect when those events actually occur. Inventory/history dates reflect the triggering system action (D-068). D-070 adds stage-labeled purchase Ordered and Received rows and ordinary relocation Shipped and Received rows. Log event distribution/leftovers at finalization. Event activation and added supplies already move stock under D-037/D-038 and appear as incoming Relocation rows linked to the event. Merely creating a Planning event posts nothing.

Ordinary relocations still move source → In Transit at shipment and In Transit → destination at receipt (D-036). Each stage has a separate `±` row representing its source/destination movement. Only the Received row confirms posting to the destination; a Shipped row is not destination availability. Do not manufacture a second acquisition or double-count stock by summing transfer quantities.

Finalized-event report-only corrections do not create quantity/cost history entries (D-028). Separate manual stock or cost adjustments do. Purchase notes do not create stock/cost entries. D-070 adds cancellation history for the pending purchase state, without turning cancellation into a receipt. History-table pagination has not been specified; do not import the no-pagination purchase-note rule automatically.

### Stage-specific history — confirmed D-070

| Description example | Quantity | Meaning |
| --- | ---: | --- |
| Purchase Ordered: MARCO Promotional to Central | [8,000] | Pending purchase; no location-stock or current-cost change |
| Purchase Received: MARCO Promotional to Central | +8,000 | Actual receipt; clear pending quantity and apply stock/cost rules |
| Relocation Shipped: Central to In Transit | ±6,000 | Remove from Central and add to In Transit |
| Relocation Received: In Transit to Indianapolis | ±6,000 | Remove from In Transit and add to Indianapolis |

Each row is plain text with its own date and captured current catalog cost, and links to the purchase or relocation request. The two relocation rows move the same units between successive locations; neither is a net acquisition. `—` still means no quantity impact, such as an admin cost override. D-071 preserves initial `[8,000]` as expected quantity and appends separate signed bracketed changes such as `[- 500]` and `[+ 2,000]`, each linked to the same purchase. The current expectation then becomes 9,500; none of these entries changes actual location stock or current cost. D-072 records cancellation as a new Purchase Cancelled row with the negative remaining expectation, such as `[- 9,500]`, linking to the same order. This clears only pending Ordered quantities and preserves order lines, actual stock, current cost, and all earlier history. Do not rewrite earlier rows after a later change.

### Checked ribbon example

The user's original example below is chronological for explanation; the actual table defaults to reverse date. It predates D-070's expanded stage rows: no order dates or ordinary relocation receipt date were supplied, so do not invent those missing entries. The 03 Feb relocation row represents shipment, and purchase rows represent receipt; a full application history now labels those stages explicitly. Transaction destinations are explanatory placeholders, not real records. No quantity arithmetic corrections were needed. The initial event contribution must be posted on activation, not mere Planning creation (D-037).

| Date | Description | Quantity | Unit Cost | Row destination (hidden in actual table) |
| --- | --- | ---: | ---: | --- |
| 25 Sep 2026 | Adjustment: Central | +15,800 | n/a | Adjustment |
| 25 Sep 2026 | Adjustment: Indianapolis | +1,200 | n/a | Adjustment |
| 03 Feb 2027 | Relocation: Central to Indianapolis | ±6,000 | n/a | Relocation request |
| 14 Jun 2027 | Purchase: MARCO Promotional to Central | +8,000 | 0.151 | Purchase |
| 05 Aug 2027 | Relocation: Indianapolis to Gen Con | ±7,000 | 0.151 | Event |
| 07 Aug 2027 | Relocation: Central to Gen Con | ±5,000 | 0.151 | Event |
| 12 Aug 2027 | Event: Gen Con (distributed) | −8,520 | 0.151 | Event |
| 12 Aug 2027 | Event: Gen Con to Madison | ±2,000 | 0.151 | Event |
| 12 Aug 2027 | Event: Gen Con to Indianapolis | ±1,480 | 0.151 | Event |
| 15 Aug 2027 | Adjustment: Indianapolis | +508 | 0.151 | Adjustment |
| 01 Oct 2027 | Purchase: InstaPrint to Central | +3,000 | 0.177 | Purchase |
| 10 Oct 2027 | Adjustment: Central | +750 | 0.177 | Adjustment |
| 15 Nov 2027 | Adjustment: Central | — | 0.160 | Adjustment |

Gen Con: 7,000 + 5,000 = 12,000 brought; 12,000 − 8,520 = 3,480 remaining; 2,000 + 1,480 = 3,480 allocated. The +508 discovery is a later location adjustment and does not revise the finalized event.

Assumption for the ending locations: the 6,000-unit February relocation was received in Indianapolis before the later events, consistent with the narrative. Shipment history alone does not prove receipt. No other stock or pending movements are assumed.

| Location | Calculation | Ending quantity |
| --- | --- | ---: |
| Central | 15,800 − 6,000 + 8,000 − 5,000 + 3,000 + 750 | 16,550 |
| Indianapolis | 1,200 + 6,000 − 7,000 + 1,480 + 508 | 2,188 |
| Madison | 2,000 | 2,000 |
| Gen Con | 7,000 + 5,000 − 8,520 − 2,000 − 1,480 | 0 |
| **Total** | **17,000 initial + 11,000 purchased + 1,258 corrections − 8,520 distributed** | **20,738** |

At the final admin-set unit cost of $0.160, total value is $3,318.08. Earlier quantity/transfer adjustments preserve cost; purchase receipts and the final admin override change it. The shown purchase averages of 0.151 and 0.177 cannot be independently verified without their invoice costs and full-precision current cost. Do not treat rounded historical display values as exact inputs. If 0.151 were exact before the October receipt, an allocated new purchase cost of approximately $972.69 would produce an average displaying as 0.177; this is a consistency illustration, not an invoice fact.

## Verification scenarios derived from user requirements

These scenarios express the requested behavior for later implementation acceptance; they are not executable tests or approval of unresolved design details.

1. A manager names a search, prints its Category/Collection/item worksheet, and returns to a matching reconciliation layout.
2. A blank entry leaves inventory unchanged; an explicit zero generates a reduction if the recorded balance is positive.
3. Next shows only actual changes, with one optional Rationale field per item, and changes no inventory.
4. Save Updates creates a separate correction entry for each changed item and makes those entries visible in its ledger; unchanged and blank items have no correction entries.
5. An item page displays Available, individual locations, shipment In Transit, and purchase Ordered separately, plus changes from all inventory-affecting workflows.
6. Correcting a finalized event changes its report and event correction log but no item/location inventory. A separately saved manual adjustment appears in the ledger.

7. Reusing a saved search reruns its criteria without restoring a historical result set or printed quantities. Entering counts does not trigger movement-comparison warnings or require resolving intervening activity.

8. A quantity-only adjustment captures the unchanged current cost; an admin cost-only adjustment captures the new cost and displays `—` quantity.
9. A later cost override or item-name change leaves prior History Table descriptions/costs unchanged. Name-only edits create no row.
10. History defaults newest first, sorts by date/description, and opens the correct source transaction when a row is clicked.
11. A received purchase is logged when the receipt action posts, even if its actual Received date differs; its row shows the resulting catalog cost.
12. Transfers use `±` and do not increase organization-wide stock. The worked example finishes at 20,738 ribbons and $3,318.08 at $0.160 each.

13. An Ordered purchase logs bracketed quantity and unchanged current cost; its Received row logs actual added quantity and resulting catalog cost. Separate relocation Shipped/Received rows show source → In Transit → destination without increasing the total.

14. Editing an order from 8,000 to 7,500 and then to 9,500 leaves `[8,000]` intact and adds `[- 500]` then `[+ 2,000]`, all linking to the same purchase. The Ordered bucket is 9,500; location stock and current unit cost remain unchanged.

15. Cancelling the revised 9,500-unit order appends Purchase Cancelled with `[- 9,500]`, leaves earlier `[8,000]`, `[- 500]`, and `[+ 2,000]` entries intact, retains order line quantities, and clears only that purchase's pending contribution.




### Location display order — D-111

Location lists, selectors, inventory rows and grouped adjustment details put Central first and other storage locations alphabetically. Where included, relevant events follow alphabetically, then In Transit and Ordered. Apply display ordering without changing quantity associations or the selected location. The chronological Item History ledger remains chronological.

## Choose inventory refinement — D-113

Choose inventory uses the same explicit Search/Show all/Reset and collapsible collection checklist as the Inventory index. Text matches category, collection or item name; multiple collections combine as alternatives, and no collection selection ignores that filter. Exactly one storage location is required, chosen from all five sample locations; events, In Transit and Ordered are not reconciliation destinations. Include inactive zero-stock items is available as an explicit filter, off by default. Saved searches retain these criteria only and rerun current inventory; existing single-category/collection searches remain usable. Count entry, blank/zero behavior, review, immutable corrections and D-031 remain unchanged.
