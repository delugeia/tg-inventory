# Purchase requests

State: Draft. Created 2026-09-27 UTC. Requirements: D-107, with settled costing/receiving in [Purchase Entry and Receiving](Purchase%20Entry%20and%20Receiving.md). [New mockup](../public/purchase-requests/index.html) · [Usage/source notes](../public/purchase-requests/README.md) · [Original pricing mockup](../public/purchase-entry/index.html).

## Access and ownership

Any authenticated person can create a request, see current/past requests and details, and add immutable notes. Every request permanently belongs to its creator. The owner saves/edits their own Draft. Procurement can create requests, continue any Draft, modify pre-receipt requests/orders, add catalog items and merchants, and return work to the owner in Draft for information. Broad assignment authority and direct cost-editing authority remain postponed. The mockup actor switch demonstrates known workflow differences; it is not permission assignment or authentication implementation.

## Request workflow

No request fields are required. Title, suggested merchant and freeform details can all be blank. Free text may describe an uncataloged item, a merchant absent from reference data, or a vague idea. Owner comes from sign-in. A blank title is displayed as Untitled request (Agent Suggestion). Saving creates a persistent Draft; Submit changes it to Request. Index shows created date, last updated, owner, title and status, with a stable request identifier in the draft.

Procurement can add notes and return a Request to Draft; ownership remains fixed. No automatic notification is required. Notes are appended with actor/time, newest first, with no edit/delete controls; any correction is a new note (D-063). The current demo uses optional editable request details before receipt, and immutable notes after creation. A user can Save a blank Draft before adding notes; the exact first-save note presentation remains Q-039.

## States and inventory effects

| Stage/action | Who | Inventory and cost |
| --- | --- | --- |
| Save Draft / submit Request | Owner; Procurement can continue | None |
| Prepare order | Procurement | No posting until Ordered |
| Mark Ordered | Procurement | Establish pending Ordered quantities only |
| Mark Shipped (optional) | Procurement | No additional quantity or cost effect |
| Verify/review receipt | Procurement | Preview only |
| Confirm Received | Procurement | Finalize once, clear pending, add actual units and recalculate catalog cost |
| Cancel own Draft | Owner | None; preserve record/logs |
| Cancel any pre-receipt record | Procurement | Remove only its pending expectation if present; preserve held stock/cost/history |
| Move status backward | Procurement only | Exact permitted transitions require review; see below |

Every status change logs authenticated actor and timestamp. Logs, notes, and item History are immutable for everyone, including Admin. All existing pricing/receipt rules carry forward: per-item fields, actual quantities, full-precision arithmetic, allocation, no partial deliveries, one-time finality, and separate corrections afterward.

## Unresolved transitions and demo assumptions

Q-042: does the instruction permitting Procurement to move backward alter any Received/Cancelled rule? The mockup preserves settled Received finality (D-065), shows no reopening or Received cancellation, and treats Cancelled as terminal. Agent Suggestion: demonstrate Request → Draft, Ordered → Request, Shipped → Ordered. Crossing back out of Ordered removes pending expectations via appended bracketed deltas; returning to Ordered creates new expectations without changing historical entries. Existing real-world date fields stay as recorded unless edited, even after a backward status change. Whether dates should be cleared/amended and which further backward paths are useful is unresolved.

Mockup guardrails for Mark Ordered/receipt are Agent Suggestions carried from the established order demo, not required request fields. New catalog entries in this draft are name-only placeholders with zero stock/cost; full classification, collection-owned SKU and uniqueness remain Q-015/Q-041. Merchant additions are local sample reference entries. Neither is a production reference-data specification.

## Observable acceptance examples

- Save/submit a completely blank request: it exists, has the signed-in owner, and creates no Ordered quantity.
- Request a new item from a new merchant using only free text: no catalog/merchant lookup is required for submission.
- Another Officer sees the Draft but cannot edit it; Procurement adds notes, prepares it, or returns it to the owner; owner identity is unchanged.
- Ordered → Shipped adds no stock. Ordered → Request removes only pending expectation, appends History, and preserves old rows. A subsequent Ordered action establishes pending quantity again.
- Owner cannot cancel a submitted Request; Procurement can cancel Request/Ordered/Shipped but not Received. Owner may cancel their own Draft.
- Confirm receipt applies final quantities/cost once and makes details read-only; reload/view cannot post again. Notes remain available for all authenticated users.
- Every status transition displays the actor/time; no state control rewrites old log records.


D-123 (2026-09-28): Shipping allocation is saved per purchase: By line total (new-purchase default, discounted merchandise excluding fees) or By quantity. Tax remains based on discounted cost including fees. See the purchase costing specification for discount-component and zero-value handling. Existing local samples without a saved choice retain quantity allocation; finalized receipts remain read-only.
