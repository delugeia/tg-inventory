# Purchase requests

State: Draft. Created 2026-09-27 UTC. [Open](index.html). Independent sample records; HTML/CSS/JavaScript only. [Original cost/receipt mockup](../purchase-entry/index.html) remains separate, with its prior demo values untouched.

## Review flow

1. Start as Gabby Barloon (Officer). New purchase request has no required fields. Save a blank Draft or submit an idea with a new merchant/item described in free text. Creation permanently assigns the current demo actor as owner.
2. Edit your Draft, add permanent notes, or cancel your own Draft. Switch to Darrin Dawson: all records remain visible, but Gabby's Draft cannot be edited/cancelled. All signed-in actors can add notes in any state.
3. Switch to Jarod Nash (Procurement). Continue any Draft, edit requests, prepare order details, add sample catalog items or merchants, or add a note and Return to owner in Draft. Ownership never changes. The selector is a demonstration fixture, not implemented authentication or permission assignment.
4. The seeded Wristband resupply Request already contains the established sample order. Mark Ordered, optionally Mark Shipped, or go straight to Receive. Record each state transition with actor and time. Request → Draft, Ordered → Request, and Shipped → Ordered illustrate backward transitions available only to Procurement.
5. Verify actual receipt quantities/costs, review held-stock and cost effects, then Confirm receipt once. Received records remain read-only except notes. Cancelled records retain details/notes/history. Owner cancels only their own Draft; Procurement cancels any pre-receipt state.

## Inventory and pricing

Draft/Request have no inventory/cost effects. Ordered/Shipped contribute pending Ordered quantities only. Returning Ordered to Request or cancelling removes its pending quantities with new bracketed negative History; the old entries stay. Moving Shipped to Ordered changes no quantity. Receipt clears pending quantities and increases demo held stock once, recalculating average cost with the established rules. Quantity-only request/order edits preserve current catalog cost.

`costing.js` is copied from the established purchase-entry demo's allocation and validation functions; Unit/Cost, full-precision quantity changes, Other Fees, discount, tax, shipping, and unknown-cost averaging retain their behavior. This demo's stock holds organization-wide quantities (including events/In Transit conceptually), not synchronized balances from other mockups. Original wristband total: $1,476.37 including $124.16 shipping.

## Boundaries and proposals

D-107 confirms the request lifecycle and ownership. **Agent Suggestions**: exact earlier-stage backward transitions and pending-expectation reversal semantics; Cancelled is terminal in the demo; later-stage order/receipt guardrails; name-only new catalog placeholders; immediate directory additions; fictional IDs/actors/date formats; newest-first activity log; sample persona switch. Received stays final under D-065 until Q-042 resolves the broad backward-status wording. No notifications. Catalog classification, SKU uniqueness, unknown costs, and permissions remain in their existing questions.

Creation of a sample catalog/merchant entry is a separate local action and survives cancellation of the order editor. It creates no stock or nonzero cost. Full catalog forms remain in the separate item mockup/specification. Empty order details can be saved in Draft/Request; Mark Ordered and receipt require valid order lines, merchant, location, and dates. No request field is required to save/submit a request. Immutable notes are added only after the request first exists, which is possible with a completely blank Save Draft.

Local storage key: `tg-purchase-requests-v2`. Unsaved edits are in memory and guarded on leaving. This mockup does not reset or synchronize the original `tg-purchase-workflow-v3` data. It does not grant real permissions, place orders, contact merchants, or send notifications.

Sources: [Purchase Requests specification](../../_specifications/Purchase%20Requests.md), [Purchase Entry and Receiving](../../_specifications/Purchase%20Entry%20and%20Receiving.md), D-107 and Q-042 in the single registers. Active files: index.html, ../css/style.css, mockup.js, costing.js. [Mockup index](../README.md). Targeted verification is recorded in the staged handoff.

## Verification — 2026-09-27

Browser checked blank Draft, role visibility, owner preservation, Procurement notes/return, catalog/merchant creation, precise Unit display and blur recalculation, state reversals/cancellation, optional shipping, receipt confirmation and reload without duplication. Model checks cover allocation and posting invariants. JavaScript syntax passed. See the [staged handoff](../../handoff/2026-09-27-002618Z-handoff.md) for full scope and limits. Physical printing and completed CSV file-save were not verified. Existing mockups were not reset.

## Grading refinements — 2026-09-27

State/discard confirmations name their action and validation receives focus. Pricing still commits on blur and preserves explicitly entered unit precision. These UI refinements are Agent Suggestions for review. See the [shared assessment](../README.md#agent-assessment--2026-09-27) for the grade and remaining considerations.

**New sample** opens an independent example in a new tab without clearing existing work. The added source file `sample-session.js` selects a storage-key suffix from the `sample` URL parameter; preserve that URL to revisit its sample. Existing base-key examples remain available at the ordinary URL. All sample storage is browser-local, not application storage.

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.

## Worksheet and request-table refinement — D-114

The index columns are Last Updated, Title, Owner, Status, Request ID. Only the updated date appears; the ID has its own final column, not a second line under Title.


D-123 (2026-09-28): Shipping allocation is saved per purchase: By line total (new-purchase default, discounted merchandise excluding fees) or By quantity. Tax remains based on discounted cost including fees. See the purchase costing specification for discount-component and zero-value handling. Existing local samples without a saved choice retain quantity allocation; finalized receipts remain read-only.
