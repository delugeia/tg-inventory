# TG Inventory User’s Guide — outline

Document state: **Draft**. Created 2026-09-27 UTC.

This is a rough guide to the planned application, with reference points for expanding it after workflow review. The application has not been implemented. The chapter structure and proposed examples are **Agent Suggestions**; this guide neither approves specifications nor settles open policies. Button names describe current drafts and may change.

Use the [mockup index](../public/README.md) to explore examples. The [Decisions](../status/Decisions.md) and current linked specifications govern behavior; unresolved matters remain in [Open Questions](../status/Open%20Questions.md), rather than becoming a second question register here.

## 1. Getting started

- What the system tracks: catalog items, storage balances, event supplies, relocations, purchases, and the history of inventory/cost changes.
- Use a desktop or laptop for substantial entry. Phones/tablets should remain usable, but wide inventory and pricing tables are less convenient.
- Sign in with Microsoft Account. Edit your own first and last name; email and your access information are read-only.
- Role orientation: Officers view inventory and create relocation requests; any authenticated user can create purchase requests. Managers can update/reconcile any storage location and collaborate on events. Procurement handles purchase preparation and later stages. Admin authority does not permit editing historical records.
- **Potential hang-up:** a disabled control in a mockup may illustrate an undecided permission. It is not proof of your eventual access. Who grants permissions and who directly edits Unit Cost remain postponed; account eligibility/onboarding also needs definition.

Reference: [User Management](../_specifications/User%20Management.md), D-104, Q-009–Q-011. Add sign-in and access-help instructions only when those workflows are settled.

## 2. Understand the inventory numbers

| Term | What it means |
| --- | --- |
| Available | Stock at central and remote storage locations only |
| Active event stock | Supplies held at an active event; excluded from Available |
| In Transit | Shipped relocation stock awaiting receipt; excluded from Available |
| Ordered | Expected purchase quantities, not yet received; excluded from Available |
| Held quantity for costing | Storage + active events + relocation In Transit; excludes Ordered |
| Unit Cost | Current catalog cost per individual item, shared across locations |

- Example: 100 central + 20 remote + 30 at an event + 40 In Transit + 50 Ordered means **120 Available** and **190 held for costing**.
- Negative recorded balances are allowed. A request or event plan does not reserve stock; requested quantities can exceed Available.
- Inventory counts are individual items, not boxes/packs. Do not multiply physical-count entries by a bundle size.
- **Potential hang-up:** a zero quantity appears as a dash in the index, but exports as numeric zero. Zero Unit Cost displays as `n/a`; this is different from a blank field. Production missing-cost details remain under review.

Reference: [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), D-032–D-039; costing exceptions in [Purchase Entry and Receiving](../_specifications/Purchase%20Entry%20and%20Receiving.md).

## 3. Find items and export a listing

- Enter a search term, optionally choose collections, then select Search or press Enter. Nothing loads on initial opening until Search or Show All.
- Show All clears the search text but retains collection filters. Clear filters retains text and does not rerun the search. Reset clears both and returns to the initial screen.
- Use location filters to select displayed columns; no selection shows areas with nonzero balances. Explicit selections exclude all unselected areas. Item details retain all locations. Read grouped results and the full-storage Available total. Open an item name for its details; use Category/Collection links for related searches.
- Return from details to restore submitted criteria and position with current quantities. Reopening the application restores settings but waits for a new search.
- Download exports the whole displayed listing, including rows below the screen, in displayed order.
- **Potential hang-up:** changing filters does not immediately change displayed results or the download. Submit the new search first. Show All can still be restricted by selected collections.
- **Potential hang-up:** inactive items disappear by default only when every current balance is zero. An inactive item with pending stock, negative stock, or offsetting balances can remain visible. Use the inactive-zero inclusion option when needed.

Reference: [Inventory Index and Search](../_specifications/Inventory%20Index%20and%20Search.md), D-076–D-090/D-101/D-102; [index example](../public/inventory-index/index.html).

## 4. View an item, edit details, and read History

- Orient to storage and Available first, then event/transit/ordered balances, descriptive details, Cost & Values, notes, and History.
- Edit Details covers Full Name, Category/Collection, SKU suffix, descriptive fields, and values. Collection owns the fixed SKU prefix.
- Distinguish Unit Cost, IRS FMV (Fair Market Value), In-Person Ask, and Online Ask. The asks are independent values; changing one does not move stock or change cost.
- Preserve blank versus explicit zero in numeric detail fields. Changing descriptive information does not add inventory History.
- Read History: signed quantities are stock changes, brackets are pending Ordered changes, `±` indicates transfers, and `—` indicates no quantity effect. Open the source record for actor, time, and explanation.
- Grouped Adjustment records show changes saved together while retaining individual item/location entries. Earlier descriptions and costs remain captured as they were when posted.
- **Potential hang-up:** History posting dates can differ from the real-world shipment/receipt dates. Old rows are never rewritten, even by Admin; corrections create new records.
- **Potential hang-up:** SKU changes, catalog creation/lifecycle, and cost-edit access are not fully specified. The two cost fields in Edit Details are permission demonstrations, not two separate costs.

Reference: [item/ledger specification](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), D-068–D-072/D-091–D-102; [item example](../public/item-view/index.html). Q-015/Q-019/Q-034/Q-041 retain unsettled details.

## 5. Correct inventory or enter a physical count

### One item across storage locations

- Open Edit Inventory. **New = Set + Adjust**. Set begins at current quantity; review Current and New for each location and the proposed Available total.
- Optionally add a rationale. Continue previews History; Edit returns to the inputs; Save posts changed locations only. Cancel offers a way to discard unsaved work.
- Example: current 2,000, Set 1,900, Adjust +50 gives 1,950 and a −50 correction.
- **Potential hang-up:** Set is a replacement base, not an additional adjustment. This editor does not change event, In Transit, or Ordered balances. Ordinary quantity corrections preserve Unit Cost.

### Several items at one storage location

- Select a location and criteria; optionally save a personal named search. Print the worksheet, count items, rerun the criteria, and enter the actual individual quantities found.
- Tab/Enter advances through entries. Blank skips an item; **0 explicitly means none found**. Review changes, optionally explain individual lines, then Save Updates.
- Example: recorded 17,000 and actual 16,000 posts −1,000. Enter 16,000, not −1,000.
- Saved searches store criteria only. Rerunning them uses current matching data; the paper is not a stored result or balance snapshot.
- Starting inventory uses this correction workflow with the note “starting inventory.” A later mistake is fixed with another correction, retaining the original.
- **Potential hang-up:** location-count blanks mean no change; event-count blanks mean not yet counted and prevent finalization. Do not transfer one meaning to the other.

Reference: [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), D-029–D-032/D-039/D-091–D-096/D-106; [count example](../public/location-reconciliation/index.html).

## 6. Request and record a relocation

- Draft → Requested → Shipped → Receiving → Complete. Cancelled requests can be copied; their title may still be edited by the owner or any Location Manager.
- Every relocation requires a title. Save draft stores a Draft; Review request opens a summary with Edit draft and Submit request. Owners/managers can use Edit title at any stage.
- The relocation index defaults to Draft/Requested/Shipped/Receiving. Check Complete or Cancelled to include older records.
- Owner or any Location Manager edits/submits/cancels Drafts. Any Location Manager edits Requested entries or returns them to Draft before cancelling.
- Choose one source/destination from the sample locations. Search inventory and select collection filters, then enter quantities or nonblank markers and Add Selected. Nonnumeric markers become zero; requested units cannot be negative. Requested items disappear from the search results.
- Read source/destination current → after-requested projections. These do not reserve or move stock. Copy carries only requested items and quantities, with new ownership and blank title/locations/notes.
- Save fulfillment work on the separate Record shipment page. Mark as Shipped opens Review Shipment; confirmation moves actual sent units into In Transit and locks item lines.
- Managers may edit shipping information before/after shipment. Multiple carrier lines link to USPS, UPS, FedEx, DHL or an Other tracking URL.
- Owner or any manager can save cumulative receiving counts as boxes arrive. **Save does not post received inventory. Complete posts the full received quantity once.**
- **Potential hang-up:** enter cumulative received counts, not an additional quantity per Save. The current draft requires received = sent before completion; permanent shortages/damage and unfulfilled requested demand remain unresolved in Q-012. Transfers preserve held quantity and Unit Cost.

Reference: [Relocation Requests](../_specifications/Relocation%20Requests.md), D-036/D-105/D-115, Q-012; [relocation example](../public/relocation-requests/index.html).

## 7. Request, order, and receive purchases

### Request something

- Any authenticated user may save a Draft or submit a Request with all fields blank. Free text can describe an uncataloged item, a new merchant, or an early idea.
- The creator remains the owner permanently. Owners edit their Drafts; Procurement can continue Drafts, prepare orders, or return requests for more information.
- Add notes after the record exists. Notes retain author/time and cannot be edited or deleted; add another note to correct one. No automatic notifications are currently required.

### Prepare prices and an order

- Procurement selects the merchant, destination, items, quantities, dates, and charges. Explain the Unit/Cost relationship, line fees, Other Fees, discount, tax, shipping, and final total using a worked invoice.
- Use the detailed pricing reference for charge allocation and retained precision. Values recalculate when leaving a field; a shortened displayed Unit value does not replace its underlying precision.
- Marking Ordered creates pending quantities only. Shipped is optional and does not add stock or recalculate cost.
- **Potential hang-up:** optional request fields do not imply that an order or receipt can be finalized without usable item/quantity/cost details. Current order validation includes Agent Suggestions awaiting review.

### Verify and receive once

- Compare delivered items with the order. Resolve missing/different items with the vendor outside the system, revise to the final actual quantities/costs, and explain with optional notes.
- Review receiving location, actual units, and projected stock/cost changes. Confirm receipt once: pending quantity clears, actual stock arrives, and catalog cost updates. Back from review retains edits without posting.
- Receipt averaging uses current held stock and current catalog cost. If held quantity is zero/negative or catalog cost is zero/unknown, the established fallback uses this receipt’s acquisition cost per received unit. Blank/missing-cost handling still needs final definition.
- **Potential hang-up:** partial purchase deliveries are deferred. After Received, details are read-only; no reopening or repeat receipt. Correct inventory separately and seek an authorized cost adjustment if needed; notes remain available.
- Cancellation preserves the record and removes only its pending expectation. Owners can cancel their own Draft; Procurement handles pre-receipt cancellation. Backward-status choices and Cancelled recovery remain Q-042; current demonstrations are not approved policy changes.

Reference: [Purchase Requests](../_specifications/Purchase%20Requests.md), [Purchase Entry and Receiving](../_specifications/Purchase%20Entry%20and%20Receiving.md), D-040–D-075/D-107, Q-039/Q-042, [FI-001](../status/Future%20Ideas.md); [request example](../public/purchase-requests/index.html) and [pricing example](../public/purchase-entry/index.html).

## 8. Manage event supplies and reconcile afterward

- Planning records quantities without posting or reservation. Activation moves initial quantities directly from sources to the event once. A detailed planning/activation screen is still to be drafted.
- Record additional completed deliveries on the active event, including deliveries discovered during counting. Known-source delivery immediately moves source stock into the event; unknown/external supplies use a positive event adjustment. Their valuation is unresolved.
- Count one combined remaining total per item, regardless of who brought it. Save incomplete progress and resume. Blank and zero remain distinct.
- Allocate leftovers to one or more destinations; allocations must match each remaining count. The default destination is the initial source. Distributed = total brought − remaining.
- Review and finalize once. Finalization records distribution and moves leftovers directly to destinations; there is no In Transit or destination-receipt step for these returns. Print/download the distribution report.
- After finalization, any manager can make a flagged report correction with an automatic before/after log and optional explanation. It changes reports only. Correct location stock separately if necessary.
- **Potential hang-up:** moving supplies from elsewhere in the same venue to the counting room is not another delivery. Recording it again would double-count brought supplies.
- **Potential hang-up:** saving counts is provisional, but adding a delivery posts immediately. Finalization cannot be reopened, and correcting its report does not reverse or repost inventory.
- Initial finalization authority, exceptional counts, external valuation, and report-version presentation remain open. The mockup’s guardrails are not a substitute for those decisions.

Reference: [Event Reconciliation](../_specifications/Event%20Reconciliation.md), D-013–D-025/D-028/D-037/D-038, Q-011/Q-028/Q-029/Q-032/Q-034/Q-035; [event example](../public/event-reconciliation/index.html).

## 9. Quick troubleshooting reference

| What seems wrong | First reference point |
| --- | --- |
| No items appear on opening | Submit Search or Show All; inspect retained filters (chapter 3) |
| Download contains the old search | Apply pending criteria first; export follows displayed results (chapter 3) |
| Available seems too low | Check event, In Transit, and Ordered separately (chapter 2) |
| A correction made an unexpected quantity | Check actual-count versus Set/Adjust meanings; make a new correction if already saved (chapter 5) |
| Requested supplies did not reduce storage | Requests reserve nothing; actual shipment posts the movement (chapter 6) |
| Shipped purchase did not increase stock | Stock/cost change at verified receipt (chapter 7) |
| A note or old History entry cannot be edited | Append a correction; historical records remain immutable (chapters 4 and 7) |
| Corrected event report did not fix storage | Report correction and inventory correction are separate (chapter 8) |
| Save shows an error | Keep entered work, read the displayed error, and do not assume posting succeeded; production recovery/support instructions remain to be written |

## Appendix A. Trying the planning mockups

- Open each example from the [mockup index](../public/README.md). The examples have separate sample data and are only lightly linked. They are not one connected application.
- All inventory-index item links open the same shared sample item. Following an example link does not transfer the selected request or item data to another mockup.
- The five new examples offer **New sample**, opening a separate browser-local example without clearing existing drafts. Preserve that tab/URL to revisit it. Browser/origin changes can show different stored examples.
- Demo role switches, paired permission fields, reset controls, and browser storage are review conveniences. They do not define authentication, production permissions, or production backup/recovery.
- Some History navigation and catalog/merchant management are placeholders. Print layouts and CSV controls exist, but physical printing and completed CSV file-save were not fully verified.

## Appendix B. Reference points for expanding this outline

**Agent Suggestion:** add screenshots and short task walkthroughs after review, beginning with one physical count, one relocation, one purchase invoice/receipt, and one event finalization/report correction. Retain plain-language explanations of when stock actually changes.

Consult the existing question register before writing account support, permission assignment, reference-data management, relocation exceptions, or backward purchase transitions as instructions. Donations/rewards, consumables/reusable equipment, and integrations need fuller workflows (Q-014/Q-020/Q-022); their mention here does not promise functionality or release scope. Final support contacts, production save/recovery behavior, and operational instructions should be added when established.

## Catalog — new mockup reference

Open [Catalog](../public/catalog/index.html) to create, view and edit Categories and Collections. Select a name to see its details and child records. Set inactive or Archive changes the selected record only in this draft; Restore returns an archived record to Inactive (Agent Suggestion).

Choose Items → Create item, select Category/Collection, and enter the full name and SKU suffix. The Collection supplies the prefix. Optional values preserve blank versus explicit zero. New items have zero inventory and no Unit Cost; use their Item & History link for viewing, editing, setting inactive and inventory adjustments.

**Potential hang-ups:** These records persist in this browser; New sample starts a separate Catalog. Other mockups do not receive new Catalog items. Prefix changes for populated Collections and downstream inactive/archive behavior remain undecided. Refresh the Catalog list after changing an item in another tab. See [Catalog notes](../public/catalog/README.md).
