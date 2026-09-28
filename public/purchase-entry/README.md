# Purchase workflow mockup

2026-09-27: the separate [Purchase Requests mockup](../purchase-requests/index.html) adds optional-information Drafts, requests, permanent owners, Procurement preparation, cancellation, status/activity logs, and the expanded lifecycle. See [its notes](../purchase-requests/README.md) and [Purchase Requests specification](../../_specifications/Purchase%20Requests.md). This original pricing/receipt example remains available with independent demo data; its Ordered-first entry scope is no longer the whole purchase workflow. New D-107 controls request stages; this file's notes describe the older focused example.

State: Draft planning mockup. The user has confirmed the current item interactions (D-074/D-075); sample data and unconfirmed guardrails remain illustrative. This is not approval of the assembled specification or application implementation.

Developer reference: [Purchase Entry and Receiving](../../_specifications/Purchase%20Entry%20and%20Receiving.md) fully describes fields, actions, calculations, validation, inventory effects, exceptions, and acceptance examples. Implement from that behavioral specification; reusing this mockup’s HTML, CSS, or JavaScript is not required.

Open [index.html](index.html) in a modern browser. No installation or server is required. Choose an example at the top to start fresh at Create, Ordered, Shipped, or Received. Loading an example replaces this browser’s demo data. Changes are remembered locally when browser storage is available; nothing is sent to a server.

## Try the workflow

1. Create a purchase: enter quantities with both Unit and Cost visible, then Mark ordered. Bonus units belong in the quantity. Calculations update on committed field changes (normally leaving the field), without rebuilding the active input while typing.
2. Modify: Edit purchase, revise details, then Save changes. Only the Ordered quantities change; held stock and catalog costs remain unchanged. Discard changes returns to the saved order.
3. Optionally mark shipped: verify the shipped date and save. A purchase can also go directly to receiving without a shipped date.
4. Receive: verify actual quantities and final costs, removing missing lines if necessary. Review receipt shows projected stock and catalog unit costs. Back returns to receipt details; Confirm receipt posts once and finalizes the purchase. Received purchases are read-only except for adding notes. Later corrections are separate adjustments.
5. Add Notes at the bottom in any state. Notes are plain text, newest first, with actor/date, without pagination or editing/deleting. Corrections use another note.

Other Fees are split equally by line count, with leftover cents assigned in line order. Each share joins merchandise and that line’s Item fee before proportional discount and tax allocation. Shipping follows the saved line-total or quantity choice (D-123). The breakdown shows all shares and reconciles to the order total. General Setup Fee is now called Other Fees (D-073); the allocation rule is unchanged (D-052). Item-specific fees remain assigned to their own line (D-045).

The Items table uses Catalog Item, QTY, Unit, Cost, Fee, and calculated Line (Cost + Fee, before order-wide charges). Editing Unit recalculates Cost; editing Cost recalculates Unit. Changing QTY always preserves the full-precision Unit and recalculates Cost and Line, including after a Cost edit. Derived Unit displays six decimals while retaining full precision; entered Unit precision is preserved. The row’s ↻ button recalculates from Cost after a Cost edit, or from full-precision Unit after a Unit or QTY edit; Fee edits preserve that source. Save and receipt validation reject a row if QTY × internal Unit, rounded to cents, differs from Cost rounded to cents. The offending item is named in the error. These interactions are confirmed in D-074, with QTY behavior revised by D-075.

## Sample data and scope

The wristband order has 5,200 GAYMER units/$900 and 3,100 ALLY units/$600, discount $236.25, tax $88.46, shipping $124.16, and zero initial fees: total $1,476.37. Set shipping to zero for the original $1,352.21 invoice. Manufacturer and receiving location are editable example text, not database selectors.

Illustrative existing stock is 1,000 GAYMER wristbands at $0.200 and 500 ALLY wristbands with unknown cost. Receipt averages the GAYMER cost with current stock; unknown ALLY cost uses only the new purchase to establish cost for all units. Catalog costs display three decimals or n/a; purchase calculations show six decimals and retain internal precision. Receipt adds stock only after confirmation; reload cannot post it again. Demo inventory shows organization-wide held totals, pending Ordered quantities, and current costs, rather than a complete location ledger. Purchase dates are separate from the receipt posting timestamp.

This mockup assumes Procurement permission. Real authentication, permission management, purchase history rows, cancellation, catalog selection, and independent inventory/admin adjustments are outside its demonstrated scope. Notes are permanent within the example; resetting the demo replaces all sample data.

## Source and validation

For maintenance of the planning demonstration only, edit [index.html](index.html), [shared style.css](../css/style.css), and [mockup.js](mockup.js) directly. There is no generated wrapper or export step. The previous fragment is retained in [archive](../../archive/mockups/purchase-entry-2026-09-25/purchase-entry.fragment.html) as superseded material.

Validated in headless Microsoft Edge: typing retains focus and delays calculation until commit; bidirectional Unit/Cost edits, quantity changes preserving Unit, refresh, rejection of inconsistent row values, equal-fee cent remainder; create/edit/optional shipping/receipt; back from receipt confirmation; single posting and reload persistence; received read-only fields; plain-text newest-first notes; all example states; mobile page width. No browser script errors were observed.

Related planning: [costing review](../../_specifications/Rough%20Notes%20Review.md#cost-arithmetic-needs-explicit-definitions), [decisions](../../status/Decisions.md) (D-040–D-075), and [purchase questions](../../status/Open%20Questions.md#purchase-costs-and-receiving).

[All mockups](../README.md) · [Project overview](../../README.md)

The grading pass added a small Draft/request lifecycle link to the separate [purchase-request example](../purchase-requests/index.html). Pricing/form logic and existing sample data were preserved. See the [assessment](../README.md#agent-assessment--2026-09-27).

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.


D-123 (2026-09-28): Shipping allocation is saved per purchase: By line total (new-purchase default, discounted merchandise excluding fees) or By quantity. Tax remains based on discounted cost including fees. See the purchase costing specification for discount-component and zero-value handling. Existing local samples without a saved choice retain quantity allocation; finalized receipts remain read-only.
