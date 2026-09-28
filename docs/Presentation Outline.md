# TG Inventory presentation outline

Document state: **Draft**. Created 2026-09-27 UTC.

**Agent Suggestion:** a 35–45 minute introduction and guided review for officers, managers, Procurement, and other project reviewers. Allow additional discussion afterward. This is an editable presentation outline with presenter notes, not a finished slide deck. The proposed sequence does not approve any unsettled product behavior.

## Presentation purpose

Give a newcomer enough context to understand the project, follow all nine mockups, and offer useful workflow feedback. Finish with a shared understanding of when stock changes and which decisions still need review.

## Presenter preparation

- Start from the [mockup index](../public/README.md). Open each example in its own tab and keep its usage notes available.
- Use **New sample** for the five newer examples: user management, relocation, location reconciliation, purchase requests, and event reconciliation. Preserve those URLs during the presentation. These examples keep separate browser-local records.
- The earlier inventory index, item view, and purchase-entry examples may contain existing review work. Rehearse in a separate demo browser profile before editing them. Do not reset someone’s draft to prepare a talk. Where that is inconvenient, show existing values or use read-only screens.
- Rehearse the purchase and event finalization demonstrations on disposable samples. Create fresh samples for the live walkthrough so a previous finalization does not block the intended sequence.
- Explain once that the examples have separate data. Following an item link does not carry that item’s data into the shared item-view example. Return to the originating tab to continue the transaction.
- Keep the [User’s Guide outline](Users%20Guide.md) available for explanations. Use the [specifications linked from README](../README.md) for precise requirements.

## Slide 1. Tabletop Gaymers Inventory

**On slide:** Project overview and mockup walkthrough. Draft for review.

**Presenter notes:** Introduce the planned tool for understanding supplies across storage locations and events, handling purchases and relocations, and preserving a readable inventory history. Explain that this session reviews workflows before development.

**Show:** [Project overview](../README.md).

## Slide 2. Project scope and current stage

**On slide:**

- Inventory visibility across storage, events, transit, and pending purchases
- Simple counting and corrections with optional explanations
- Purchase and relocation workflows with recorded history
- Requirements planning and interactive drafts

**Presenter notes:** The planned application is desktop-first, with usable smaller-screen layouts. Laravel and MariaDB are the planned stack, but application implementation has not begun. Individual decisions are recorded. Assembled specifications still await approval. Other officers will review and revise, and the project’s user has final approval authority before development.

**Show:** [Current Status](../status/Current%20Status.md). Do not promise a release date or treat every proposed feature as initial-release scope.

## Slide 3. Where inventory is recorded

**On slide:**

| Quantity | Meaning |
| --- | --- |
| Available | Stock in storage locations |
| Active event | Stock currently held at an event |
| In Transit | Shipped relocation stock awaiting receipt |
| Ordered | Expected purchase stock awaiting receipt |

**Presenter notes:** Available excludes the other three categories. Requests and event plans reserve nothing. Negative recorded balances are allowed. Transfers preserve catalog Unit Cost. Purchase receipt is the automatic cost-recalculation point.

**Example:** 100 in central storage and 20 in remote storage means 120 Available, even with another 30 at an event, 40 In Transit, and 50 Ordered.

**Reference:** [Inventory and ledger specification](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md).

## Slide 4. User management

**On slide:** User directory and roles, draft Admin preview, editable own name and read-only Microsoft identity.

**Demo:** Open [User Management](../public/user-management/index.html) in a New sample. Show the default User view, then select Admin in mockup-info. Open the draft role reference and edit/cancel a role assignment. Reload to demonstrate the default User view. Open My profile to demonstrate own-name Save/Discard and read-only Microsoft email/access.

**Presenter notes:** Officers can view inventory and create relocation requests. Any authenticated user can create purchase requests. Managers can reconcile any storage location. Procurement handles purchase preparation and later stages. Showing an action in a demo does not grant production access.

**Hang-up to explain:** Permission assignment and who directly edits Unit Cost remain postponed. Role editing is a draft review interaction; it does not approve production permission policy or implement Microsoft authentication.

**Reference:** [User Management specification](../_specifications/User%20Management.md), D-104, Q-009–Q-011.

## Slide 5. Catalog

**On slide:** Categories contain Collections; Collections contain Items and own their SKU prefix.

**Demo:** Open [Catalog](../public/catalog/index.html). Create a Category and Collection, view/edit their details, set one inactive and archive it. Create an Item, then open its Item & History link to view/edit that actual item or change inventory.

**Presenter notes:** New items start with zero stock and blank Unit Cost. Catalog records persist in this browser and are separate from other workflow fixtures. Parent lifecycle changes do not cascade in this draft. Restore-to-Inactive and validation choices are Agent Suggestions. Effects of inactive/archived Items on searches and other usage remain postponed, as do broader permissions.

**Reference:** [Catalog draft](../_specifications/Catalog.md), D-117.

## Slide 6. Inventory index and search

**On slide:** Explicit search, retained filters, grouped quantities, download of displayed results.

**Demo:** Open the [Inventory Index](../public/inventory-index/index.html). Search for ribbons. Open the collection filters, select a collection, and submit the search. Point out Available and any conditional stock columns. Change the search text without submitting and show the changed-settings notice. Open an item, then return with browser Back.

**Presenter notes:** Search or Show All loads results. Editing controls alone does not refresh them. Show All retains collection restrictions. Back restores the browsing context. Download covers the full displayed listing, including rows below the screen.

**Hang-up to explain:** Download follows displayed results, not pending filter edits. All item names in this mockup open the same shared sample item, so its name may differ from the clicked row.

**Reference:** [Index specification](../_specifications/Inventory%20Index%20and%20Search.md), D-076–D-090/D-102.

## Slide 7. Item view and catalog details

**On slide:** Location balances, descriptive details, cost and values, related searches.

**Demo:** Open [Item View](../public/item-view/index.html). Show the highlighted Available total and separate event/transit/ordered sections. Open the FMV help. Follow a Category or Collection link, then return. Open [Edit Details](../public/item-view/edit-details.html) to show Full Name, Collection-owned SKU prefix, optional values, and the two permission examples for Unit Cost.

**Presenter notes:** In-Person Ask and Online Ask are independent values. Blank differs from explicit zero. Descriptive edits do not move stock or add inventory History. A permitted direct cost change would create a separate Adjustment entry, but who gets that permission remains unsettled.

**Hang-up to explain:** The paired cost controls demonstrate access alternatives. They are not two different catalog costs. Catalog lifecycle and SKU validation still need detail.

**Reference:** [Item-view notes](../public/item-view/README.md), D-097–D-102, Q-015/Q-041.

## Slide 8. Item corrections and immutable History

**On slide:** Set plus Adjust, review before Save, read-only source records.

**Demo:** In a separate demo profile, open [Edit Inventory](../public/item-view/edit-inventory.html). Use one location to show how Set and Adjust produce New. Continue to the proposed-History review, choose Edit, and return with inputs intact. Save a small sample correction. Open its Adjustment History row and inspect actor, time, before/after quantities, and optional rationale. If avoiding edits, use the [standalone Adjustment record](../public/item-view/adjustment.html).

**Presenter notes:** For a starting 2,000 units, Set 1,900 and Adjust +50 gives 1,950. Save posts a −50 correction at unchanged cost. Continue alone posts nothing. Each changed location keeps its own History entry, with related entries grouped on the source record.

**Hang-up to explain:** Corrections append records. Even Admin cannot edit old History. Non-adjustment History navigation remains a placeholder in this item mockup.

**Reference:** [Item/ledger specification](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), D-091–D-098.

## Slide 9. Physical counts at a storage location

**On slide:** Select criteria, count actual units, review differences, save corrections.

**Demo:** Open [Location Reconciliation](../public/location-reconciliation/index.html) in a New sample. Choose a location and search. Saved criteria and show the worksheet option. Enter an actual count in one row, zero in another, and leave a third blank. Use Tab or Enter to advance. Review only changed rows and point out optional rationales before saving the sample.

**Presenter notes:** A blank skips an item. Zero records none found. The entered number is the total actually counted. A recorded 10,000 and counted 9,000 produces −1,000 automatically.

**Hang-up to explain:** Saved searches keep criteria only. Reopening them runs against current data. There are no stored print-time quantity snapshots or intervening-movement reconciliation warnings.

**Reference:** [Location inventory specification](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), D-029–D-032/D-106.

## Slide 10. Relocation requests

**On slide:** Draft → Requested → Shipped → Receiving → Complete; owner/manager stage actions, saved work and one-time movements.

**Demo:** Open [Relocation Requests](../public/relocation-requests/index.html) in a New sample. Copy a request to show item-only copying and blank locations/notes. Search/group items, add a numeric quantity and a nonnumeric marker, and show live projections. Choose Review request, return with Edit draft to show preserved entries, then Submit request. Switch to either Location Manager and edit the Requested entry. Save fulfillment numbers, return and resume; open packing, then Mark as Shipped to Review Shipment. Show two carrier lines and confirm. Switch to the owner, save partial cumulative receiving counts, and demonstrate that destination stock has not changed. Finish counts and review/Complete.

**Presenter notes:** Any Location Manager can edit Requested entries and shipping information; shipped items are locked. Saved fulfillment and receiving counts do not move inventory. Actual shipment posts source → In Transit; Complete posts In Transit → destination. Requested/actual sent may differ. Cancel requires Draft; Cancelled offers copying and the owner/manager title-only edit exception. Show the status checkboxes, with Complete/Cancelled initially excluded. Broader role assignment is still postponed.

**Hang-up to explain:** Receiving counts are cumulative drafts. Permanent discrepancies, additional outbound shipments and unfulfilled requested remainder remain Q-012. Matching received/sent totals are still required by the draft; do not present this as a decided permanent-discrepancy policy.

**Reference:** [Relocation specification](../_specifications/Relocation%20Requests.md), D-036/D-105/D-115.

## Slide 11. Purchase requests and permanent ownership

**On slide:** Optional-information requests, persistent Drafts, Procurement follow-up, immutable notes.

**Demo:** Open [Purchase Requests](../public/purchase-requests/index.html) in a New sample. As Gabby, save a blank Draft or describe an uncataloged item in free text. Switch to Darrin and show that another Officer can view it and add notes, but cannot edit Gabby’s Draft. Switch to Jarod in Procurement and show continuation or return to the owner for information.

**Presenter notes:** The creator remains the owner. Notes preserve author/time and stay read-only after posting. Correct a note by adding another. No automatic notifications are currently required.

**Hang-up to explain:** The role selector is a demonstration aid. New catalog items and merchants are limited sketches. Optional request fields do not mean an order can be finalized without usable order details.

**Reference:** [Purchase Requests specification](../_specifications/Purchase%20Requests.md), D-107, Q-039/Q-042.

## Slide 12. Purchase pricing and receipt

**On slide:** Precise pricing, allocated charges, pending quantities, one confirmed receipt.

**Demo:** Briefly open the [original Purchase Entry mockup](../public/purchase-entry/index.html) as the focused pricing reference. Point out Unit, Cost, line fees, and order-level charges. Use its existing values without resetting them. Return to the new Purchase Requests tab and open the seeded Wristband resupply Request as Procurement. Inspect its pricing, Mark Ordered, and proceed to receipt review. Show stock/cost effects before confirming once on the disposable sample.

**Presenter notes:** This covers both purchase mockups. The original demonstrates established pricing and receiving interactions. The newer example adds the Draft/request lifecycle. Ordered quantities remain pending until receipt. Shipped is optional and does not add stock. Cost averaging uses current held stock, including events and relocation In Transit, but excludes Ordered.

**Hang-up to explain:** Received is final under current decisions. Resolve vendor discrepancies and enter the final actual outcome before confirmation. Partial purchase deliveries are deferred. Later stock/cost corrections are separate actions. Earlier-stage backward transitions shown in the new demo remain proposals under Q-042.

**Reference:** [Purchase Entry and Receiving](../_specifications/Purchase%20Entry%20and%20Receiving.md), [Purchase Requests](../_specifications/Purchase%20Requests.md), FI-001.

## Slide 13. Event reconciliation and finalization

**On slide:** Save provisional counts, split leftovers, finalize once, report distribution.

**Demo:** Open [Event Reconciliation](../public/event-reconciliation/index.html) in a New sample. Enter zero remaining pins and leave ribbons blank. Save progress, then enter 1,800 remaining ribbons. Split those into 800 for Indianapolis IN and 1,000 for Milwaukee WI. Review and finalize. With the untouched starting total of 8,250 ribbons, the report shows 6,450 distributed.

**Presenter notes:** Every event item needs a count before finalization. Saving incomplete counts is allowed. Finalization transfers leftovers directly to destinations without In Transit or a separate destination receipt. The focused example starts with an active event. Planning and activation screens are not included.

**Hang-up to explain:** A blank event count prevents finalization, unlike a blank location count that skips an item. The additional-delivery form records supplies newly brought into the event. Moving supplies within the venue is not another delivery. If demonstrating an additional delivery, use another fresh sample so this worked total stays consistent.

**Reference:** [Event specification](../_specifications/Event%20Reconciliation.md), D-013–D-025/D-037/D-038. The choice of this additional mockup is an Agent Suggestion. Initial finalization authority remains open.

## Slide 14. Event report corrections

**On slide:** Flagged report changes, automatic correction log, separate inventory adjustments.

**Demo:** On the finalized sample, view the original posting record. Correct a remaining quantity in the report with an optional explanation. Show the flagged report and correction log, then revisit the original posting to demonstrate that inventory History did not change.

**Presenter notes:** Any manager can correct a finalized report. The event never reopens. Report corrections do not automatically reverse or repost distribution or returned stock. A needed storage correction uses the separate adjustment workflow.

**Hang-up to explain:** A corrected report and original inventory posting can differ by design. Explain the correction log and any separate inventory adjustment together when reviewing the record.

**Reference:** [Event specification](../_specifications/Event%20Reconciliation.md), D-028. Optional fallback visual: [corrected report example](../work/evening-mockup-verification/event-corrected-report.png).

## Slide 15. Decisions still awaiting review

**On slide:**

- Relocation fulfillment and discrepancy handling
- Purchase backward transitions and Cancelled recovery
- Catalog details and event exception policies
- Broader permissions remain postponed

**Presenter notes:** Use the existing [Open Questions](../status/Open%20Questions.md) register, especially Q-012, Q-042, Q-015/Q-041, and the event questions referenced in its specification. Keep proposed request-index text search in [Future Ideas](../status/Future%20Ideas.md) as unaccepted FI-002. Partial purchase deliveries remain the user-directed FI-001 deferral. Do not expand the permissions discussion unless the user chooses to resume it.

**Review prompts:** Which normal task is difficult to complete? Which label or preview could cause an incorrect entry? Which unresolved exception needs attention before implementation? These prompts gather feedback without creating a second decision register.

## Slide 16. Review materials and next steps

**On slide:** Focused workflow review, specification revisions, explicit approval before development.

**Presenter notes:** Invite reviewers to choose the next functionality to discuss. Record accepted requirements and unresolved questions in the existing registers. Mockup feedback can refine the specifications, but a demonstrated control or a successful walkthrough does not approve the full specification. Release scope remains part of requirements review.

**Leave with the audience:**

- [Mockup index and assessment](../public/README.md)
- [User’s Guide outline](Users%20Guide.md)
- [Current Status](../status/Current%20Status.md)
- [Open Questions](../status/Open%20Questions.md)

## Optional shorter walkthrough

For an introduction of about 20 minutes, use slides 1–3 briefly, then give one-minute views of profile, index, and item details. Demonstrate physical count review, a relocation movement, purchase receipt review, and the event finalization/report distinction. Show the original purchase-entry screen briefly to identify its focused pricing role. Leave detailed edits, role switching, and exception discussion for a follow-up session. The full sequence above remains the reference for all nine mockups.
