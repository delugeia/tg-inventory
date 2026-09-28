# Current status

Last updated: 2026-09-22

## Stage

Requirements review — Inventory Behavior complete for this pass; stopped for the user-requested break. The rough-notes review is Ready for review, not an approved complete specification. No application code has been written or authorized.

## Start here

- [Decisions](Decisions.md): authoritative working decision log, D-001 through D-039. Superseded decisions are labeled.
- [Open Questions](Open%20Questions.md): live Next questions queue for the user's Typora view and the full question register.
- [Future Ideas](Future%20Ideas.md): deferred features; partial purchase deliveries are FI-001.
- [Rough Notes Review](../_specifications/Rough%20Notes%20Review.md): current requirements review and concrete scenarios.

## Session stopping point

Reached the requested break: Q-001 through Q-004 and active-event balance display are resolved. Do not start another section until the user resumes. [Read the handoff](../handoff/2026-09-22-215656Z-handoff.md) for the compact continuation guide.

D-039: starting inventory uses a correction with note "starting inventory"; active events appear as additional location entries but are not Available. Use further correction entries to fix inventory mistakes.
## Latest requirements — D-029 through D-033

D-032: personal searches save all criteria, including location/search terms. Include active items even at zero stock and inactive items with stock; exclude inactive zero-stock items. Managers enter individual item counts.

D-033: show Available (central + remote), each location excluding pseudo locations, shipped-request In Transit, and purchase Ordered separately. Ordered purchases are not part of shipment In Transit or Available. D-039 confirms active events appear in the location breakdown but remain outside Available.

The user defined a complete location count flow: named saved search, Print Inventory Worksheet, Reconcile Inventory with actual counts, Next showing only changes with optional per-line Rationale, then Save Updates creating separate corrections. Blank means no change; zero is an actual count. Item pages need location balances, an all-location total, and a ledger covering all inventory-affecting workflows.

See [Location Inventory and Item Ledger](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), a new Draft specification capturing this workflow. D-031 resolves worksheet continuity: saved searches store criteria only; rerun them without retaining results/quantity snapshots or adding intervening-movement checks. Physical counts are occasional, usually one manager per location. Search rules and count units are now settled in D-032; main totals are settled in D-033.

## Event finalization decision — D-028

The user revised the earlier correction model to keep the application simple:

- Finalize an event once, after a prominent confirmation warning. This adds leftovers directly to selected destination inventories, with no In Transit step. Cancelling does nothing; retries must not add stock again.
- A finalized event cannot reopen or be re-finalized.
- Any manager may make flagged corrections to any finalized event. Corrections update the event and report but never inventory.
- Any needed inventory correction is a separate positive/negative adjustment at the relevant location.
- Correction logs remain automatically generated, dated plain text with actor attribution. Manager explanations are optional and may be as brief or detailed as desired.
- D-026 (re-finalization/difference posting) is superseded. The reopening portion of D-019 is superseded; any-manager correction access remains.

## Current functional direction

- D-036: relocation shipment moves source to In Transit; receipt moves In Transit to destination.
- D-037: event Planning has no inventory effect; manager activation moves initial planned stock directly from source locations into the event. D-038 confirms immediate posting of additional deliveries while active, including during unfinished reconciliation; finalized-event corrections remain report-only.

- D-035 resolves Q-003: requests and planned events do not reserve stock; negative recorded inventory balances are allowed.

- Laravel and MariaDB on the TG webserver; plan before implementing.
- Purchases enter In Transit when Ordered; shipped date is optional. Receipt moves quantities to the receiving location. Receipt-time cost remains the source baseline pending costing review.
- One temporary location per event, shared by managers, with multiple source contributions and retrospective entry. Missed deliveries can be added during unfinished reconciliation; unknown/external sources use inventory adjustments.
- Reconcile one combined total per item. Distributed = total brought minus remaining, including loss. Notable exceptions may remain in leftovers for later destination adjustment.
- Save unfinished reconciliation without posting its effects. Blank is uncounted, not zero. Every event item must have a count before finalization.
- Initialize the default leftover destination from the event's source at creation. Allow overrides and splits; destination quantities must equal each item's remaining count. All event sizes use the same interface.
- Provide a printable/CSV event report of distributed totals without movement details; saved post-finalization corrections update it.
- Managers need simple location inventory additions/removals with optional notes and normal change history. Example: 17 boxes/17,000 ribbons corrected to 18 or 16 boxes means +1,000 or -1,000 individual ribbons.
- Favor low-friction workflows. Do not add mandatory explanations or correction approvals contrary to D-028.

## Planning and organization

The user approves the first specification pass and retains final authority before development; officers review later. Use Draft, Ready for review, and Approved states. Label unaccepted proposals Agent Suggestion or Agent Idea. Aim for exhaustive specifications, with release scope and constraints developed progressively.

Current handoff material and active drafts belong in `_specifications/`; obsolete material belongs outside it. Maintain this single working status set. Before a new agent/chat first updates it, snapshot top-level status files under `status/_archive/YYYY-MM-DD-HHmmssZ/` per AGENTS.md. This chat's initial snapshot is `_archive/2026-09-22-192653Z/`; additional working files were created afterward. Original rough notes remain unchanged.

## Next step after the break

Wait for the user to resume. Agent Suggestion: move to purchase costs/receiving (Q-005/Q-006), then the remaining requirements sections. Inventory Behavior is complete for this pass; no full specification or milestones have been approved.

Keep the user's Typora question queue current. Do not revive worksheet snapshots, movement-conflict warnings, stock reservations, or automatic inventory changes from finalized-event corrections.
## Current handoff

[2026-09-22-215656Z-handoff.md](../handoff/2026-09-22-215656Z-handoff.md) — completed Inventory Behavior, current decisions, and remaining planning work.

## Blockers

None preventing further requirements discussion.







