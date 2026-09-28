# Relocation requests

State: Draft. Updated 2026-09-28 UTC for D-115/D-116. [Open](index.html) · [Specification](../../_specifications/Relocation%20Requests.md) · [Mockup index](../README.md).

## Try the workflow

1. The mockup-info actor selector starts with Gabby Barloon, an Officer and owner of the seeded examples. Darrin Dawson is another Officer; Jarod Nash and Jasmine Davidson are Location Managers. These illustrate the user-confirmed relocation permissions only, not a production access system.
2. Create or copy a request. All five sample storage locations are available. Copy brings only requested item IDs and quantities; title/source/destination/notes are blank and the saving actor becomes owner.
3. Use Search, collection filters, or Show all. Enter quantities or any nonblank marker and Add Selected. Nonnumeric markers become zero. Added items disappear from results. The separate Requested Items section groups collections and updates current → after-requested balances while typing. Zero is allowed; negatives cannot save.
4. Save/submit a Draft as owner or manager. Switch to either manager to edit a Requested record, add/modify items, or return it to Draft before cancelling. Cancelled offers copying plus the title-only exception described below.
5. Record shipment opens a full page. Save partial fulfillment work, leave/reload and resume. Mark as Shipped opens Review Shipment; only Confirm shipment moves actual sent units to In Transit. Afterward items cannot change.
6. Edit shipping information as either manager before or after shipment. Add multiple carrier/number rows, including an optional HTTPS URL for Other. Viewed numbers link to carrier tracking; examples are not live shipments.
7. As owner or manager, reconcile separate arrivals using cumulative counts. Save keeps draft counts and Receiving status; destination inventory is unchanged. Complete opens receipt review and posts once on confirmation. The retained draft boundary requires received totals to match sent totals; permanent shortages and other discrepancies remain Q-012.
8. Packing, request view/edit, fulfillment, receipt and review all use the same grouped Requested Items layout. Packing has a blank Sent column. Printing uses shared page-background clearing.

## Data, persistence and constraints

New sample opens an isolated browser-local example without clearing earlier work. The existing `tg-relocation-requests-v2` key is retained. Older Request and Received records map to Requested and Complete; old single tracking text maps to an Other line, and added storage locations initialize only when absent. Saved quantities, request ownership and existing history remain. Source/destination projections are hypothetical request effects, including on later stages, not actual posting totals. Sample inventories remain independent of the other mockups.

`relocation-model.js` contains testable local stage/quantity rules; `mockup.js` renders the draft and uses the common `../css/style.css`, `../inventory-order.js` and `../mockup-layout.js`. Do not introduce local theme CSS or inline styling; maintain [the style guide](../css/style-guide.html). No real authentication, production role enforcement, notifications or application implementation.

Tracking destinations: [USPS](https://tools.usps.com/go/TrackConfirmAction), [UPS](https://www.ups.com/track), [FedEx](https://www.fedex.com/en-us/tracking.html), [DHL](https://www.dhl.com/us-en/home/tracking.html). Tracking links are encoded and opened separately. No actual package tracking was submitted during QA.

## Verification

[Targeted model checks](../../work/check-relocation-stages.cjs) cover owner/manager permissions, item-only copy independence, zero/negative quantities, saved fulfillment, partial receipt drafts, exactly-once shipment/completion, unchanged costs and safe tracking URLs. Chrome checked bulk numeric/text addition, live projections, negative validation, manager edit/save/reload, multiple carrier lines and post-shipment metadata editing, owner receipt Save/reload/Complete, Cancelled action restrictions, return to Draft and packing format. Physical printing and production concurrency remain unverified.

## Draft review, titles and status filtering — D-116

Draft editing uses Save draft and Review request. Review request shows a read-only summary with Edit draft (preserves entries) and Submit request (changes state only on this action). A title is required to save/review, including for copied requests. A separate Edit title dialog allows the owner or any Location Manager to rename every stage, including Complete and Cancelled; no other final-state fields unlock. Title changes log activity but do not alter item/inventory history.

The index now uses six status checkboxes. Draft/Requested/Shipped/Receiving start checked; Complete/Cancelled start unchecked. Changes filter immediately; none selected shows no rows. Choices survive return navigation within the page and reset to defaults on reload. Earlier untitled records are retained for title repair rather than rewritten automatically.
