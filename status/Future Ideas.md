# Future ideas

Document state: Draft

Maintain this single working list of deferred possibilities. Inclusion does not commit an item to a later release. User-approved deferrals are identified separately from unaccepted Agent Suggestions or Agent Ideas.

## FI-001 — Partial purchase deliveries

- Added: 2026-09-22.
- State: Deferred from initial scope by user direction (D-009).
- Concept: Receive a purchase over multiple deliveries, moving each received quantity from the purchase Ordered bucket to its destination while leaving the outstanding quantity Ordered (current terminology under D-033/D-061).
- Future detail: Individual receipt dates, shipment tracking, completion rules, and effects on unit cost would need specification if selected for development.
- Related questions: Q-007 and Q-026.
- Scope of deferral: Partial purchase deliveries discussed in the current purchasing workflow. This does not decide relocation split shipments or how to handle a final delivery with missing items.

## FI-002 — Text search for request indexes

- Added: 2026-09-27 UTC during the user-authorized grading pass.
- State: **Agent Suggestion — unaccepted; not a user-directed release deferral.**
- Concept: a small search field for relocation/purchase indexes, matching title and Request ID, plus source/destination for relocations or owner for purchases. Combine with the existing status filter; no dashboard, saved query system, or notifications.
- Why consider it: it may help find a past request to view/copy once there are many records. Current examples have only a few rows, so the added control was not necessary for this review pass.
- Scope: only the two request indexes. It does not change the inventory index's settled explicit-search behavior or create a requirement until accepted.

## Discussion deferrals are not release-scope deferrals

2026-09-26 handoff: the user is moving to drafts of other functionality mockups. This does not defer additional features from a release. Broader permissions (including direct Unit Cost editing) remain user-postponed; unresolved catalog, History, index, purchase, and relocation questions remain in [Open Questions](Open%20Questions.md). FI-001 remains the sole release-scope deferral. No new Agent Suggestion or Agent Idea was accepted as future scope this session.

## FI-003 — Catalog lifecycle effects

- Added: 2026-09-28; **user-directed discussion deferral**, not a release-scope exclusion (D-117).
- For now, ignore inactive/archived Items’ effects on searches and other usage while reviewing Catalog creation/management.
- Revisit Q-017 and related catalog questions before specifying downstream visibility, references, and parent/child lifecycle rules. The local mockup does not establish cascading behavior.

## FI-004 — Shipping fit and weight assistance

- Added: 2026-09-28 during D-121's authorized data review.
- State: **Agent Idea — unaccepted; not a user-directed discussion or release deferral.**
- The shipping workbook contains size/use notes and a three-box weight experiment. A future optional helper might suggest a container or estimate packed weight after the dimensions, measurement basis and unit conversions are reviewed.
- Keep simple recorded shipping details in Q-045 separate from this automation idea. The current formula is applied to flat/padded mailers as well as boxes, exterior dimensions have discrepancies, and supplier unit/bundle weights differ. Do not use it to enforce fit, calculate postage or consume inventory without a separately approved workflow.
- No carrier integration, vendor crawling, automated purchasing or recurring price research is approved.
