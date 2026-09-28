# Mockup index

[Open the interactive walkthrough](index.html). The walkthrough initially shows a brief project introduction explaining that all examples are mockups with no live data and no synchronization between independent mockups. Clicking the TG Inventory brand returns to it; it has no separate sidebar entry. The narrow sidebar follows the presentation order and opens each independent mockup in the right pane. Visited workflows stay loaded when switching sections, preserving in-memory edits until navigation/reload closes them. Internal links continue within that workflow. Open separately starts that mockup at its entry page in a new tab, not a copy of unsaved work.

Wrapper sources: `index.html` (shell), [css/style.css](css/style.css) (shared theme and shell layout), `index.js` (ordered navigation and lazy-loaded preview panes). Add every future mockup to the `mockups` list in `index.js` and the table below, following its first appearance in [Presentation Outline](../docs/Presentation%20Outline.md). The wrapper does not synchronize sample data.

Interactive examples for specification planning and review. Open each mockup's `index.html` in a modern browser; these mockups require no installation or server. Mockups demonstrate workflows and may include unaccepted Agent Suggestions. Their behavior does not replace the [decision log](../status/Decisions.md) or approve a complete specification.

Sample people, storage locations, and events come from [the approved sample-name list](../_data/sample-names.md). Keep future fixtures consistent with that list. The 2026-09-28 name refresh uses new storage-key versions for the seven stateful workflow/profile mockups; existing browser drafts under older keys are retained but are no longer loaded. Inventory search preferences stay in place. Reopen or reload a mockup to load the refreshed fixtures. Historical screenshots and archived examples may show the former names.

| Mockup | State | Coverage | Open / documentation |
| --- | --- | --- | --- |
| Catalog | Draft | Create/view/edit Categories and Collections, inactive/archive actions, new Items linked to their own Item & History record. | [Open](catalog/index.html) · [Notes](catalog/README.md) · [Specification](../_specifications/Catalog.md) |
| User management | Draft | Sample user directory, User/Admin preview and draft-role editing; separate own-name profile. | [Open](user-management/index.html) · [Notes](user-management/README.md) · [Specification](../_specifications/User%20Management.md) |
| Relocation requests | Draft | Current/past index, Draft/submit, item picker, independent copies, packing worksheet, shipment/receipt previews and History. | [Open](relocation-requests/index.html) · [Notes](relocation-requests/README.md) · [Specification](../_specifications/Relocation%20Requests.md) |
| Location reconciliation | Draft | Personal criteria-only searches, printable counts, blank keyboard entry, review and immutable per-item corrections. | [Open](location-reconciliation/index.html) · [Notes](location-reconciliation/README.md) · [Specification](../_specifications/Location%20Inventory%20and%20Item%20Ledger.md) |
| Purchase requests | Draft | Optional-information Draft/Request, permanent owner, Procurement order preparation, full cost/receipt preview, status reversal/cancellation and immutable logs. | [Open](purchase-requests/index.html) · [Notes](purchase-requests/README.md) · [Specification](../_specifications/Purchase%20Requests.md) |
| Event reconciliation | Draft · Agent Suggestion | Active-event provisional counts, split leftovers, one-time finalization, report print/CSV and report-only corrections. | [Open](event-reconciliation/index.html) · [Notes](event-reconciliation/README.md) · [Specification](../_specifications/Event%20Reconciliation.md) |
| Item view | Draft | He/Him Pronoun Ribbon view plus linked Edit Inventory: SET/ADJUST, live previews, optional rationale, Cancel/Continue, pre-save review with Cancel/Edit/Save, demo correction history, and unsaved-change handling. Main view uses 1/3 Inventory and 2/3 details, grouped fields, highlighted storage total, FMV help, and Category/Collection search links. Edit Details includes blank-aware values and permission examples; Adjustment History opens grouped read-only records with actor and timestamp. | [Open mockup](item-view/index.html) · [Usage and source notes](item-view/README.md) |
| Inventory index | Draft | Explicit search, collection filters, 225 sample items, grouped balances, conditional columns, remembered settings, Back restoration, CSV, and links from every item name to the separate shared item-view mockup. No application header/navigation. | [Open mockup](inventory-index/index.html) · [Usage and source notes](inventory-index/README.md) · [Behavioral specification](../_specifications/Inventory%20Index%20and%20Search.md) |
| Purchase entry | Draft | Create, modify, optional shipment, and confirmed receipt; blur-based calculation; line and Other Fees, discount, tax, shipping; permanent notes; simulated receipt averaging. Uses the wristband invoice example. | [Open mockup](purchase-entry/index.html) · [Usage and source notes](purchase-entry/README.md) · [Behavioral specification](../_specifications/Purchase%20Entry%20and%20Receiving.md) |

## Agent assessment — 2026-09-27

These are subjective grades for **planning-demo quality within each mockup's stated scope**, not production readiness or specification approval. Scores weigh clarity, useful workflow coverage, fidelity to decisions, recovery from mistakes, and keyboard/readability. The five evening drafts received source/interaction review and targeted regression checks; the three earlier mockups received a lighter visual/documentation consistency review using their existing verification evidence.

| Mockup | Before → After / 10 | Assessment and disposition |
| --- | --- | --- |
| Catalog | Draft | Create/view/edit Categories and Collections, inactive/archive actions, new Items linked to their own Item & History record. | [Open](catalog/index.html) · [Notes](catalog/README.md) · [Specification](../_specifications/Catalog.md) |
| User management | 8.5 → 9 | Appropriately small; own-name versus Microsoft identity/access is clear. Improved error announcement/focus and added independent fresh samples. Account eligibility/permission assignment remain Q-009–Q-011. |
| Relocation requests | 7 → 8 | Strong request/copy/item flow; repeated shipment actions could discard an unfinished entry. Added explicit restart/discard protection, preserved review-to-edit values, clearer confirmations and fresh samples. Fulfillment/shortage policy remains Q-012. |
| Location reconciliation | 8 → 9 | Best new workflow match: blank counts, zero, keyboard progression, criteria-only reuse, review and optional rationales. Validation now receives focus and scrolls into view; discard wording is explicit. Narrow tables are usable but still less convenient than desktop. |
| Purchase requests | 7.5 → 8.5 | Broad coverage with permanent ownership and correct cost/history behavior. Clearer state/discard confirmations, visible validation and repeatable fresh samples improve review. Catalog creation remains a deliberately incomplete sketch; Q-042 backward-state rules need user review. |
| Event reconciliation | 7 → 8.5 | Preserves finalization/report-only rules. Fixed overlapping delivery/count editing with a modal, preserved unsaved counts, kept storage-failure messages visible, and exposed saved actor/explanation in the posting record. Initial-finalization authority and exception policies remain open. |
| Item view/edit/History | 9 → 9 | Mature, legible hierarchy and strong pre-save review. Added light event/relocation/purchase example links in the pending-stock sections; no inventory, form or History logic changes. Non-adjustment History rows remain placeholders. |
| Inventory index | 9 → 9 | Clear explicit-search state, retained criteria, conditional columns and one listing. No change justified in this pass. Real location browsing and production failure/persistence detail remain separate work (Q-040). |
| Original purchase entry | 8.5 → 8.5 | Useful focused pricing/receipt reference with established calculations. Added a small link to the new Draft/request lifecycle example. Its older Ordered-first entry is intentionally not the complete purchase lifecycle. |

Implemented refinements are **Agent Suggestions for review**. New sample links on the five evening drafts open a new browser-local namespace in a new tab; they never clear existing examples or unsaved drafts. In-page confirmation buttons name the action (for example, Discard counts or Mark ordered). Error notices use alert semantics and receive visible keyboard focus. No broader role policy, movement rule, or release-scope decision changed.

Thoughts retained in the single registers: request-index text search is [FI-002](../status/Future%20Ideas.md#fi-002--text-search-for-request-indexes); relocation exception/fulfillment policy remains Q-012; purchase backward transitions Q-042; catalog completeness Q-015/Q-041; event authority/exceptions Q-011/Q-029/Q-032/Q-034. These are not prerequisites to reviewing the current drafts.

## Related planning records

- [Current status](../status/Current%20Status.md): current stage and next steps.
- [Open Questions](../status/Open%20Questions.md): Evening drafts await review; Q-042 covers purchase backwards-state details and Q-012 covers relocation fulfillment. Q-041 retains remaining item questions and Q-040 retains index details. The index and item view are lightly linked but retain separate sample data (D-102).
- [Rough Notes Review — cost arithmetic](../_specifications/Rough%20Notes%20Review.md#cost-arithmetic-needs-explicit-definitions): costing requirements and examples.
- [Decisions](../status/Decisions.md): D-040/D-041 cover receipt averaging; D-042 and D-123 cover tax/shipping allocation, including the saved shipping method and line-total default; D-043 covers flexible price entry and bonus units. The purchase mockup also demonstrates receipt averaging against illustrative existing stock and unknown catalog cost.

## Organization

Keep one descriptive subfolder per mockup, with `index.html` as the runnable entry point and a short `README.md` explaining its scope, sample data, source files, and unresolved proposals. Keep supporting files in that subfolder. Add new mockups to this index and link them from the relevant planning documents.

Use Draft, Ready for review, and Approved states under the project's approval rules. A mockup's state does not imply approval of every behavior it demonstrates. Keep formal requirements in `_specifications/` and decisions/questions in the existing `status/` records; do not create separate decision lists here. Move superseded mockups to `archive/` and update active links.

## Presentation conventions

Every page, including the wrapper, loads [css/style.css](css/style.css). The [living style guide](css/style-guide.html) demonstrates headers, navigation, actions, forms, tables, status indicators, notifications, and dialogs. Individual pages also use `mockup-layout.js` to normalize legacy markup. Keep purple application styling, compact yellow demo-only banners without a banner title, and consistent navigation/title/intro headers on each step. Put documentation links in the relevant README. Preserve normal notification colors and consequential confirmations. Add only existing necessary demo explanations to banners; trim verbose material.

Keep this provisional design centralized: update `css/style.css` and `css/style-guide.html` together for future changes. New mockups must use this stylesheet and join the index. Old per-mockup and wrapper CSS is retained under `archive/mockup-styles-2026-09-27/` outside the public site. The final visual design remains open.


Location display order is shared through `inventory-order.js`: Central; other storage alphabetically; relevant events alphabetically; In Transit; Ordered. Workflow scripts preserve saved data order where indices encode location identity and sort the display instead. Keep selector values, quantities and existing column visibility intact. Collection filters use one checkbox option per line; examples are in the style guide.

Relocation revision (D-115): six statuses, owner/manager stage actions, grouped bulk item selection, item-only copies, saved fulfillment, multi-carrier tracking and cumulative receiving drafts posted only at Complete. See the updated [notes](relocation-requests/README.md) and [specification](../_specifications/Relocation%20Requests.md). Earlier assessment/handoff descriptions remain historical.

Catalog is the ninth mockup, positioned after Users and before Inventory in the walkthrough. Its browser-local records are shared only with contextual Item & History links; other mockups remain independent. The earlier eight-mockup grading table predates Catalog. Serve Catalog and Item & History from the same origin for the shared-record handoff.
