# Current status

Last updated: 2026-09-28 UTC (2026-09-27 local evening).

## Stage and next activity

Requirements planning. The authorized evening mockup pass is complete: four requested functionality drafts plus one useful additional event-reconciliation draft. **Next: user review of the mockups**, starting with whichever functionality they choose. No application implementation. All new specifications and mockups are Draft; confirmed individual requirements do not approve an assembled specification.

[Current handoff](../handoff/2026-09-27-002618Z-handoff.md) · [Mockup index](../public/README.md) · [Style guide](../public/css/style-guide.html) · [Decisions](Decisions.md) through D-118 · [Open Questions](Open%20Questions.md) · [Future Ideas](Future%20Ideas.md).

## Completed stages

| Stage | Draft and notes | Coverage |
| --- | --- | --- |
| 1 | [User Management](../public/user-management/README.md) | User directory, default User/Admin preview, draft-role editing, and separate own-name profile |
| 2 | [Relocation Requests](../public/relocation-requests/README.md) | Six stages, owner/manager actions, grouped bulk item selection, item-only copies, saved fulfillment/receipt counts, carrier tracking and reviewed postings |
| 3 | [Location Reconciliation](../public/location-reconciliation/README.md) | Personal criteria-only searches, print, blank actual-count entry with Tab/Enter, review and immutable corrections |
| 4 | [Purchase Requests](../public/purchase-requests/README.md) | Optional-information requests, permanent owners, Procurement preparation, full pricing/receipt, backwards-state/cancellation examples and logs |
| 5 | [Event Reconciliation](../public/event-reconciliation/README.md) | Agent Suggestion for an additional useful draft: provisional counts, splits, one-time finalization, report-only corrections |

Each has separate workflow HTML/JavaScript, index.html, README and specification links, with light cross-mockup links and independent data. All now share the central stylesheet and walkthrough described below. Existing inventory/form/History logic was preserved. Item-view pending-stock sections link to the independent examples; original purchase entry has a small request-lifecycle link.

## Grading follow-up completed

D-108 authorized grading while usage remained above 50%. All eight mockups have a [subjective assessment](../public/README.md#agent-assessment--2026-09-27); the five new drafts received the deeper interaction review. Implemented refinements preserve relocation entries, isolate additional event delivery from unsaved counts, clarify confirmations, focus validation, and offer independent New sample links. FI-002 request-index text search remains an unaccepted Agent Suggestion for consideration. No specification approval or permission policy changed.

## User’s Guide outline completed

The user authorized a rough guide with a new 40% remaining-usage floor. Started at 64% remaining. [User’s Guide](../docs/Users%20Guide.md) is Draft: major workflows, quantity terminology, common hang-ups, linked references, and a separate mockup-use appendix. It preserves open permission/lifecycle questions and adds no product decisions. Review alongside the mockups when the user returns.

## Presentation outline completed

At the user’s request, added a Draft [presentation outline](../docs/Presentation%20Outline.md): 15 proposed slides covering the project overview and all eight mockups, with a suggested 35–45 minute guided tour, demo preparation, presenter notes, common hang-ups, and a shorter option. Began at 63% remaining, above the current 40% floor. This is a Markdown outline, not a rendered slide deck. No product decisions or application/mockup code changed.

## Interactive mockup index

The [interactive walkthrough](../public/index.html) uses separate `index.js` and shared `css/style.css`: narrow left navigation in presentation order, right-side workflow previews, and Open separately links. All nine mockups are included, with Catalog after Users and before Inventory. Visited previews remain loaded when switching to preserve unfinished entries. AGENTS.md and mockup notes require future mockups to join the navigation list. This user-requested review wrapper supersedes the earlier no-shared-navigation constraint for the index only.

## Mockup directory renamed

At the user’s request, the active mockup directory is now `public/`. Documentation and verification-script references use the new path. The interactive entry point is [public/index.html](../public/index.html). Historical status snapshots retain their original contents under the snapshot-preservation rule. Separately archived examples remain under `archive/mockups/`. No workflow behavior changed.

## Mockup presentation cleanup

Updated all eight examples and their standalone sub-pages: removed documentation links, consolidated existing demo controls/instructions into compact yellow `mockup-info` banners, and standardized navigation/title/intro headers. Dynamic steps and dialogs show relevant notes only. Notification colors and finalization confirmations remain distinct. Removed verbose user-role reference/permission-preview panels from the UI, retaining their context in the README. Shared layout files affect presentation only. Browser checks covered all 13 HTML pages, a purchase-request step, and an event delivery validation error; model checks passed.

## Central style guide and Chrome review

D-109: all 15 HTML pages (13 mockup entry/sub-pages, walkthrough, and guide) now load only [public/css/style.css](../public/css/style.css). The [living guide](../public/css/style-guide.html) covers the shared light-purple theme, headers/navigation, title/status rows, actions, forms, numeric tables, notifications, and dialogs. Page/section actions align right with primary last; Cancel/Discard are red; Save is for ordinary edits while state changes retain explicit wording. Final visual design remains open. Ten superseded stylesheets are archived; active docs and AGENTS.md require future updates to maintain the guide and central CSS together.

Chrome-extension review covered all eight mockups, item sub-pages, count review/worksheet, relocation shipment/receipt, purchase preparation/receipt, event finalization/report/correction/posting, the placeholder, guide dialog, and shared wrapper. Fixed repeated demo notes and checkbox layout during review. All 23 JavaScript syntax checks and both targeted model checks pass; all 15 pages reference the same CSS, local source/document links resolve, and no inline styles remain. Browser review was desktop-focused; physical printing and exhaustive responsive/device coverage were not performed in this pass. [Visual evidence](../work/shared-style-review/style-guide.png).

## Newly confirmed scope and open proposals

Sample-name refresh (D-110, 2026-09-28 UTC): all active mockup people, storage locations, and named events now use [_data/sample-names.md](../_data/sample-names.md), including History fixtures, actor selectors, profile/email examples, item views, inventory columns/CSV, requests, events, and the style guide. Related READMEs/presentation instructions and test fixtures match. Seven stateful mockups use new storage-key versions to show the revised fixtures without deleting earlier saved browser drafts. Inventory search preferences are preserved. Chrome verified profile, event contributors/destinations, purchase actors, and inventory headings; JavaScript syntax and targeted inventory/purchase/event model checks pass. Historical screenshots, source notes, and status snapshots are not rewritten by this mockup-only refresh.

Privacy follow-up: the user accepts author metadata/local directory names and reports replacing the vendor contact and removing the unused cash-box combination. The approved sample-name list intentionally includes public places/events. The earlier audit remains a historical finding rather than a statement that those user-reported issues are still present. This refresh is not a new whole-project privacy certification.

D-103–D-107 record the user's evening instructions. Managers may reconcile any storage location. Microsoft identities expose own-name editing only. Broader permission assignment and direct Unit Cost editing remain postponed. Relocations have one owner-selected source/destination and independent copies. Location counts begin empty, accept actual counts, and advance with Tab/Enter. Purchase Drafts/Requests require no fields; owners are permanent; Procurement handles orders and backward status movement; every status change logs actor/time; no notifications now.

Q-042 records backward purchase transitions versus Received finality and Cancelled restoration. Demo retains Received finality; earlier-stage reversals are Agent Suggestions. Q-012 retains relocation fulfillment/partial/discrepancy policies. Q-039 retains first-save note presentation. Existing event exception/finalization-authority questions remain. Candidate permissions, catalog placeholders, exact validation/layout/date policies, and the additional event presentation are unaccepted proposals. FI-001 partial purchase deliveries remains the only user-directed release deferral.

## Preserved decisions

- Desktop-first throughout (D-086); Laravel/MariaDB remains the planned stack only.
- D-028: events finalize once, never reopen; subsequent flagged corrections change reports only. Inventory corrections are separate manual adjustments, explanations optional.
- D-029–D-032: personal criteria-only searches and simple physical counts; no result/quantity snapshots, stale-count reconciliation, or intervening-movement warnings.
- Storage Available excludes active-event stock, relocation In Transit and purchase Ordered. Held stock for receipt costing includes events/In Transit, excludes Ordered. No reservations; negative balances allowed.
- D-036–D-038 posting rules, one-time purchase receipt/averaging, unchanged costs on transfers/corrections, append-only immutable History remain.
- D-091–D-102 item view/edit/History pass remains complete: compact pre-save inventory review, blank-aware details, collection-owned SKU prefix, two asks, grouped read-only adjustments, 1/3–2/3 layout, FMV help, and light index links with independent data. Remaining Q-041 is parked.

## Verification and operational notes

Targeted browser checks and [model checks](../work/evening-mockup-verification/check-models.cjs) passed; all new JavaScript syntax and 34 targeted source/document files checked, with no broken local links. Verified count keyboard/blank/zero semantics, copy independence, actual relocation movements, ownership/role previews, order state/history effects, precision, single receipt, event allocation/finality, and report-only correction preserving stock/history. Desktop layouts and narrow relocation/count layouts were inspected. Details and limits are in the handoff.

Final grading verification: 11 JavaScript syntax checks passed; 37 targeted source/document files checked without broken local links. [Improved delivery dialog screenshot](../work/evening-mockup-verification/review-delivery-dialog.png).

Physical printing, completed CSV file-save, native beforeunload presentation, real authentication/permissions, and production concurrency remain unverified. No application test suite exists. Preview port 8766 was available; verify before reuse. New localhost/127.0.0.1 demo records contain QA edits; older user demo data was not reset.

Usage checkpoints: 78% remaining at start, 76% after initial stages, 72% after core browser checks. Work finished at a clean stage boundary above the user's approximately 50% floor; initial completion reading: **69% remaining**. The subsequent grading pass started at 68%; latest checkpoint **64% remaining**, above the stop threshold. This chat snapshot: `status/_archive/2026-09-27-000628Z/`. New chats snapshot before their first status edit.


## Location order and filter repair

D-111 implemented: Central first, other storage locations alphabetically, relevant events alphabetically, In Transit, Ordered. The shared `public/inventory-order.js` governs index columns, location choices, item edit/review and adjustment rows, event contributions, and destination summaries. Display order preserves stored quantity associations and selected destinations. Existing conditional columns and chronological History remain. Fixed the shared CSS regression that made collection-filter labels inline; each option again occupies a separate line within its column. The style guide now demonstrates both rules. Asset versioning prevents cached workflow scripts from mismatching revised markup.

Chrome verified filter line breaks, ordered columns, unchanged item balances, an Ames-only correction preview, and destination sorting with units retained. Syntax, existing model checks, location ordering/quantity-association checks and local asset/link checks passed. [Screenshot](../work/shared-style-review/location-order-filters.png).

## Shared status presentation

D-112 implemented in the central stylesheet and mockup adapter: Draft/Request yellow; Active/Ordered/Shipped green; Received/Finalized purple. Title badges are 22px (20px on narrow screens), while list/table badges remain 12px. The style guide demonstrates every status and the larger title treatment; maintenance guidance preserves the mapping. Chrome verified the guide and dynamic purchase list/title badges, and the adapter syntax check passed. [Screenshot](../work/shared-style-review/status-colors.png).

## User directory and inventory filters

D-113: Users now lists all 21 approved sample people, with Admin-only draft-role editing and the earlier role reference in mockup-info; every visit defaults to User. Existing own-name editing moved to profile.html. Adjustment metadata uses shared label/value styling and no separate America/Chicago label. Inventory has storage and active-event/pending column checklists; none selected means nonzero columns, explicit selections show only chosen columns. Full-storage Available and item-row eligibility remain unchanged. Item view/edit includes all five storage locations, preserving earlier saved quantity/draft associations. Reconciliation uses the same text/collection/filter controls with one required storage location and criteria-only saved searches. Shared CSS, style guide, source notes and relevant specs now describe these drafts; production permissions remain postponed.

Verification: Chrome checked default User mode, draft-role Save/reload and Cancel, required reconciliation location, category/collection searching, saved-search reload and unchanged count review, no-selection versus storage-only inventory columns, styled adjustment metadata, all five item balances and the retained profile. JavaScript syntax, inventory/model checks, old three-location balance/draft migration and all 16 HTML local-link checks passed. [Filter screenshot](../work/shared-style-review/users-inventory-filters.png).

## Worksheet and request index refinement

D-114 implemented: the location-count Print Worksheet alone has a white root/page background with colored collection rows preserved for printing. Purchase and relocation indexes each start Last Updated, Title, with the user-specified remaining columns and a separate final Request ID. Shared guide and mockup notes updated. Chrome verified both table sequences, white worksheet/root backgrounds and restoration of the normal background on return; JavaScript syntax passed. Physical printer output is not verified. [Worksheet screenshot](../work/shared-style-review/white-count-worksheet.png).

User-requested follow-up: entering the location-count worksheet now automatically invokes browser printing after the view paints. The manual print button remains; cancelling keeps the worksheet visible. No automatic printing was added to other views.

Shared print follow-up: all pages now clear both html and body backgrounds under @media print, including with Background graphics enabled. Content backgrounds remain intact. This fixes the root-document canvas as well as the body; screen backgrounds are unchanged. The style guide and maintenance guidance reflect the rule.

## Relocation stage and item-table revision

D-115 implemented in `public/relocation-requests/` (the user's location-reconciliation heading was a path typo). The six-stage workflow has owner/manager action checks, manager edits on Requested, separate saved fulfillment and Review Shipment, immutable shipped items, multi-carrier tracking editable before/after shipment, saved split-arrival cumulative receiving drafts and reviewed Complete posting. Copies carry only requested items/quantities; all five sample locations are offered. Inventory-style grouped bulk selection accepts nonnumeric markers as zero, rejects negatives and updates projections live. A common requested-item table serves edit/view/packing/shipment/receipt/review. Existing local records are migrated without resetting earlier work. Requested uses yellow, Receiving green and Complete purple.

Chrome verified bulk add, projections, zero/negative handling, any-manager Requested editing, saved fulfillment reload, shipment review/post, shipped item lock, post-shipment tracking edits, owner partial receiving Save/reload with destination unchanged, final completion, item-only copy/new ownership, return to Draft, Cancelled copy-only and packing layout. [Model checks](../work/check-relocation-stages.cjs) verify permissions, immutable copy independence, validation, no posting on draft saves, exactly-once shipment/completion and safe tracking URLs; changed JavaScript syntax passes. [Shipment review screenshot](../work/shared-style-review/relocation-shipment-review.png). Physical printing, live tracking responses, real authentication and concurrency remain unverified. Q-012 now focuses on discrepancies, additional outbound shipments and unfulfilled remainder; broader assignment/Unit Cost permissions remain postponed.

## Relocation draft review and title refinement

D-116: Draft editor uses Save draft / Review request; review has Edit draft / Submit request with inputs preserved and no transition before submission. Titles are required on save/review; a separate owner/manager Edit title dialog works at every stage, including Complete/Cancelled, without unlocking item edits or changing inventory. The index uses status checkboxes, initially all except Complete/Cancelled. Shared guide/specification/notes updated. Chrome verified required/whitespace titles, comma-formatted quantity review and edit preservation, submission, default filters, owner title changes on Complete, manager title changes on Cancelled and denial for an unrelated Officer. Model checks verify title permission/immutability across all six stages. [Review screenshot](../work/shared-style-review/relocation-request-review.png).

## Catalog draft

Added [Catalog](../public/catalog/index.html) and its [Draft specification](../_specifications/Catalog.md) (D-117): Category/Collection create, view, edit, inactive/archive actions and new-item creation. New items share their own browser-local record with Item & History; the existing ribbon fixture and other workflows remain independent. Central styles, walkthrough, presentation and guide references are updated. Downstream lifecycle/search effects and broader permissions remain postponed. Restore behavior and validation are labeled Agent Suggestions in the notes.

Catalog verification: Chrome covered creation, Collection edit/inactive/archive/restore, item details/inactive changes, and a reviewed +7 inventory correction on the actual created item. Model checks passed for validation, lifecycle preservation, persistence and default-fixture isolation; relocation regression checks also passed.

## Public GitHub repository

2026-09-28 UTC: Created the public [delugeia/tg-inventory](https://github.com/delugeia/tg-inventory) repository through the user's signed-in Chrome session. The user subsequently authorized publishing the current project and keeping it available on GitHub (D-118). The local project folder is the Git root, using `main` and the HTTPS `origin` remote. Initial publication completed in commit `65c0a14`; `main` tracks `origin/main`. Chrome verified the published file list and confirmed both `_private/` and `_private/shh.txt` return GitHub 404 responses. Local Git checks also confirm no files from `_private/` or `_secrets/` are tracked. [Browser verification](../work/github-setup/private-file-not-found.png).

The root `.gitignore` excludes `_private/` (including the local `shh.txt` test), `_secrets/`, environment/credential files, dependencies, generated runtime/build output, and editor/OS files. All future secrets or PII must stay in `_secrets/` and must never be copied into tracked material. README and AGENTS.md record this ongoing rule. No application implementation is authorized.

Handoff convention (D-118 follow-up): when the user requests handoff preparation, finish all updates and the handoff directions, then commit and push all Git-eligible changes as the final step, honoring `.gitignore` and verifying the local/remote branches are synced.

## Live mockups and Forge deployment

2026-09-28 UTC: [Live walkthrough](https://tg-inventory.delugeia.com/) verified over HTTPS. Forge site `3401224` on `delugeia01` uses Custom Git (`delugeia/tg-inventory`, `main`), a site-specific read-only GitHub deploy key, isolated user `tginventory`, and `/public` as its web directory. The user enabled redirects from `www`; both hostnames resolve to server IP `135.233.112.7`. Let's Encrypt was installed through Forge. The user submitted all setup forms.

GitHub push-only JSON webhook `687000598` is active with SSL verification enabled. Its initial ping received HTTP 200 from Forge. **Push-to-deploy verified:** the push of commit `33d48aa` automatically produced successful [Forge deployment 78750362](https://forge.laravel.com/tech-for-service/delugeia01/3401224/deployments/78750362) in two seconds. The user authorized committing and pushing all Git-eligible changes, including the handoff rule, hosting documentation, and setup screenshots. Deployment URLs containing tokens and their screenshots belong only in ignored `_secrets/`; never include them in tracked files.

