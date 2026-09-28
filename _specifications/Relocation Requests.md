# Relocation requests

State: Draft. Updated 2026-09-28 UTC. Requirements: D-105, D-115, D-116, D-035/D-036/D-069/D-070. [Mockup](../public/relocation-requests/index.html) · [Usage/source notes](../public/relocation-requests/README.md). No application implementation authorized.

## Roles, stages and actions

| Status | Meaning and allowed actions |
| --- | --- |
| Draft | Unsubmitted. Owner or any Location Manager can edit, save a draft, review/submit or cancel. |
| Requested | Any Location Manager can edit all request details/items, add/remove items, save fulfillment work, ship, or return to Draft. Cancel is available only after returning to Draft. |
| Shipped | Item lines and sent quantities are immutable. Any Location Manager may add/edit shipping information. Owner or any Location Manager may reconcile receipt. |
| Receiving | Owner or any Location Manager can save cumulative counts across separate box arrivals and return later. Saved counts are drafts; no stock moves until Complete. |
| Complete | Final receipt posting is recorded once. Requested/sent/received items are read-only. Location Managers can still correct shipping information without changing inventory or original movement history. |
| Cancelled | Read-only; Copy to new draft and owner/manager Edit title are available; other fields and actions remain locked. |

Every relocation request requires a trimmed nonblank Title, including when saving a Draft. In the editor, Draft actions are Save draft and Review request. Review request validates the title, locations and items and opens a read-only summary; Edit draft returns with entered values intact, and Submit request alone saves/submits. A saved Draft's Review request action also goes through this review. Existing Requested edits retain ordinary Save.

The owner or any Location Manager may edit Title at every stage, including Complete and Cancelled, through a separate Edit title dialog. Save changes the title/update timestamp and appends request activity, without modifying ownership, status, item lines, shipping data, inventory or past movement records. This is an explicit exception to Cancelled's earlier copy-only rule. Existing untitled saved demo records remain readable and can be repaired; no synthetic title is assigned.

The index has one checkbox per status. Initial/reloaded defaults select Draft, Requested, Shipped and Receiving; Complete/Cancelled are off. Choices combine as alternatives, apply immediately and survive navigation within the open mockup; no selections yields no rows.

One request has one source and one destination; all five approved sample storage locations are available. Officers can create and view requests. The request index is Last Updated, Title, Source, Destination, Status, Request ID. Broader permission assignment/direct Unit Cost authority remain postponed.

## Item selection and common table

Inventory-style explicit Search/Show all/Reset, collapsible Category : Collection checklists, and alphabetical grouped results are used to add items. Text matches item/category/collection; multiple collection choices are alternatives. Source/destination are the request's selected locations, not separate search filters. Results exclude items already requested and show name, current source stock, current destination stock, and a Request input. Add Selected above the results adds every nonblank entry. A valid numeric quantity carries over; nonnumeric text such as x, yes or xyzzy creates a zero request. Negative quantities are invalid. Whole-unit validation is retained as an Agent Suggestion for this count-based mockup.

Requested Items is a visually distinct section above Search. All requested-item tables share grouped Category : Collection dividers and Item, Source (current → after requested), Destination (current → after requested), Request columns. Editors update the projections immediately when a request quantity changes; quantities may be zero or positive. Negative balances at a location remain allowed. Source is current stock minus requested; destination is current stock plus requested. These are hypothetical projections, even on later read-only stages, and never reserve or post stock. Fulfillment adds Sent inputs, receiving adds cumulative Received inputs, and review/view screens show the same values read-only. The packing worksheet adds a blank Sent column.

Copy carries only requested items and quantities. It clears title, source, destination and notes, creates a new owner from the current actor on save, and copies no status, dates, shipping/tracking, saved fulfillment/receipt counts, logs or original-record relationship.

## Shipment and tracking

Record shipment is a separate workflow page. Save persists entered fulfillment counts without shipping or changing Requested. Blank entries may be saved during preparation. Mark as Shipped validates actual sent counts/date and opens Review Shipment; Edit quantities preserves entered values, and Confirm shipment posts once. Requested and actually sent may differ; at least one unit must ship in the current draft. Unit costs do not change.

Location Managers can add/edit shipping information before or after shipment, including after Complete, except on Cancelled requests. Tracking uses multiple independent lines with USPS, UPS, FedEx, DHL or Other; viewed tracking numbers open the carrier's tracking page. Other supports an optional HTTPS tracking URL. Shipping-info edits append activity history and never modify item lines, sent quantities or earlier inventory postings.

## Receiving, inventory and history

Drafts, requested edits, copies, printing, fulfillment saves and receipt-count saves change no stock and reserve nothing. Confirm shipment moves actual sent units source → In Transit. Saved partial receiving counts keep those units In Transit. Complete moves all confirmed received units In Transit → destination once. Counts are cumulative, not incremental per Save. Organization-wide held quantity and Unit Cost remain unchanged. Inventory History retains immutable ± shipment/receipt rows, posting-time actor/date/cost, and request association. Request activity records saves and transitions. A second confirmation or reload cannot repost either movement.

Q-012 still covers shortages/damage/discrepancies, substitutions, additional outbound shipments and unfulfilled requested remainder. **Agent Suggestion / retained mockup boundary:** completion requires received counts to equal actual sent counts; save partial counts while awaiting boxes. This is not a newly approved rule for resolving a permanent discrepancy. Required distinct locations on submission, whole units and at-least-one-sent validation are draft validation choices, not expansion of release scope.

## Observable acceptance examples

- As owner, save/submit/edit/cancel a Draft; as another Officer, none of those actions are offered. Any Location Manager can perform them.
- As a manager, edit a Requested record, add items and change zero/positive quantities; Save retains Requested. Cancel requires Return to Draft first.
- Enter 2,000 beside an item with 7,500 source and 150 destination: requested table shows 7,500 → 5,500 and 150 → 2,150. Enter xyzzy for another item: it appears with Request 0. Added items disappear from search results. A negative request cannot save.
- Save 900 fulfillment units, reload, and resume as a different Location Manager: 900 remains, status Requested and stock unchanged. Review/confirm shipping posts exactly 900, then item editing is absent.
- Save 300 of 900 received units: Receiving, destination unchanged. Reload and update cumulative count to 900; review/Complete moves 900 once. A partial count cannot complete under the current discrepancy boundary.
- Manager edits two different carrier lines after shipment: tracking links change but inventory/history posting quantities do not.
- Copy a Cancelled or Complete request: only item IDs/request quantities carry over; the new draft's owner is the copying actor when saved.

The assembled specification remains Draft; production authentication, concurrency and security enforcement are not implemented by the mockup.
