# Development roadmap: from setup to the first production release

**Document state: Draft**  
**Prepared:** September 30, 2026  
**Purpose:** A proposed sequence of development tasks and observable checks for our Tabletop Gaymers inventory application.

This roadmap authorizes no implementation. We must approve the required specifications and explicitly authorize development before executing it. The phase sequence, release baseline, and technical arrangements below are proposals unless already settled by our decisions or the selected authentication specification. Planning a task does not complete it; all execution checkboxes start unchecked.

## Proposed release baseline

Our first fully functional release should let eligible volunteers sign in, maintain our catalog, find and count supplies, correct inventory, request and receive purchases, relocate stock, reconcile events, and inspect or export the resulting records. It should use approved starting data and have tested deployment, access control, backup, and recovery arrangements. A screen that only displays sample data or a disabled action is not a delivered feature.

This is a **proposed baseline**, not an approved release commitment. Final scope is Q-020 in our [question register](../status/Open%20Questions.md). Partial purchase deliveries remain explicitly deferred from initial scope. Catalog lifecycle effects and broader permission rules are postponed discussions, not features we can silently leave out. Equipment loans, special donation/reward workflows, shipping automation, request-list text search, extra reports, and integrations are not mandatory additions unless selected. See [feature overview](../docs/features-revised.md), [decisions](../status/Decisions.md), and [future scope](../status/Future%20Ideas.md).

## Sequence and dependencies

| Phase | Working result | Depends on |
| --- | --- | --- |
| 1. Confirm implementation boundaries | Approved scope and setup direction | Owner review |
| 2. Establish local and public development | Repeatable install and deployment of the same application | 1 |
| 3. Integrate Microsoft sign-in | Real identity, protected access, profile, and logout | 2 and authentication policy choices |
| 4. Build shared foundations and one complete stock correction | A real screen-to-database-to-history path | 3 and core data/permission decisions |
| 5. Complete daily inventory work | Catalog maintenance, browsing, counting, and history | 4 |
| 6. Build request intake and collaboration | Persistent drafts, ownership, notes, and preparation | 5 and request rules |
| 7. Complete fulfillment, movement, and costing | Real relocations and purchase receipt share tested posting behavior | 6 and exception decisions |
| 8. Complete event accounting and reports | Event supply, finalization, and report-only correction | 7 |
| 9. Rehearse initial data migration | Approved import mapping and repeatable load | 5 for preparation; 7–8 before final rehearsal |
| 10. Prove integration and operating readiness | Reliable workflows, recovery, security, and deployable release candidate | 3–9 |
| 11. Volunteer acceptance and release rehearsal | Accepted release and a practiced cutover | 10 |
| 12. Release and verify production | Working first production release with named support | 11 and explicit release approval |

Phases are checkpoints, not rigid work silos. Import mapping can progress while workflows are built; backup, accessibility, and security work begins early and is proven in Phase 10. Within Phase 7, relocation and purchasing can progress independently after their common prerequisites. An unresolved feature decision blocks its dependent work, not unrelated approved groundwork. No schedule or staffing assumptions are implied.

For each completed checkbox, retain concise evidence such as a test result, commit, deployment result, or acceptance note. Keep evidence with the relevant work; do not create another decision register. Never include credentials, real personal data, or token captures in public evidence.

## Existing work and platform checks

| Area | What we know | Roadmap treatment |
| --- | --- | --- |
| Current project | Local Git branch `main` uses `https://github.com/delugeia/tg-inventory.git`, checked September 30. | Preserve it; it is our public planning repository. |
| Current hosted walkthrough | Project records describe a working Forge-hosted static site at `tg-inventory.delugeia.com` and verified push deployment on September 28. | Historical evidence, not a live recheck or proof that a Laravel application is deployed. Preserve this site. |
| Proposed application repository | `https://github.com/tabletopgaymers/inventory` is the requested target. Its existence, access, and ownership have not been checked. | Confirm reuse versus creation and how approved planning material reaches it. Do not retarget the existing remote automatically. |
| Proposed development addresses | `https://dev-inventory.test/` locally and `https://dev-inventory.tabletopgaymers.org/` publicly. | Targets, not verified installations. Production hostname is still to choose. |
| Authentication | The supplied specification selects Socialite with the Microsoft adapter and records a documentation/source compatibility review. | Reuse that design. Its verification limit does not establish application runtime acceptance; perform the listed checks in our deployment. |

The selected target is Laravel 13.x, PHP 8.5, and MariaDB 11.8. The supplied [authentication requirements and compatibility baseline](tg-laravel-microsoft-authentication.md#2-requirements) support those versions at the documented dependency level; resolve and lock actual stable packages during setup. No additional authentication research was used to prepare this roadmap.

Environment documentation checked September 30:

- [Herd for Windows](https://herd.laravel.com/windows) advertises PHP through 8.5. Its [Windows service matrix](https://herd.laravel.com/docs/windows/herd-pro-services/service-versions) lists MariaDB 10.11, not 11.8, and describes separately supplied versions as an option.
- [Forge database documentation](https://laravel.com/forge/docs/resources/databases) lists MariaDB 10.11 and 11.4 for provisioning, not 11.8. This does not establish that 11.8 is incompatible with Laravel; it leaves the provisioning method unresolved. Forge does not automatically upgrade database servers.
- [Forge PHP management](https://laravel.com/forge/docs/servers/php) distinguishes site PHP from command-line PHP. Both need verification in our chosen environment.

**Proposed approach:** retain PHP 8.5 and MariaDB 11.8. Use Herd for local PHP/HTTPS with a separately installed MariaDB 11.8 if necessary, and select an explicitly maintained 11.8 database arrangement for public environments. Confirm available versions in the actual tools first. Do not upgrade a shared database or change other sites to satisfy this plan. A Forge-provisioned MariaDB 11.4 is a possible simpler alternative only if we explicitly approve changing the 11.8 target; there is no silent substitution. This choice is tracked with Q-023.

## 1. Confirm implementation boundaries

**Purpose and result:** Establish what we are building, which infrastructure we may use, and which decisions must precede execution.

**Prerequisites and decisions:** Owner review. Q-020 governs release scope; Q-023 covers infrastructure; Q-009–Q-011 cover access. Feature-specific questions remain in their existing register rather than being duplicated here.

**Resources:** [Current status](../status/Current%20Status.md), [feature overview](../docs/features-revised.md), [question register](../status/Open%20Questions.md), [selected authentication architecture](tg-laravel-microsoft-authentication.md#1-overview).

### Tasks

- [ ] Approve the first specification pass and proposed release scope, recording scope, date, and explicit authorization to implement.
- [ ] Confirm application repository ownership/access, whether it exists, and the separate local checkout. Decide which current planning material is copied or linked while preserving the existing public repository and walkthrough.
- [ ] Confirm local/public development names, production naming responsibility, Forge organization/server access, DNS access, and tenant administration contacts.
- [ ] Resolve the MariaDB 11.8 provisioning method and responsibility for its maintenance; agree compatible stable runtime/dependency targets.
- [ ] Identify the existing question IDs that block each approved workflow. Schedule their resolution before the dependent phase; do not turn unsettled behavior into requirements through code.

### Validation

- [ ] The owner can identify what the first release includes, what is explicitly deferred, and what still needs a decision.
- [ ] Repository and hosting ownership are checked without changing the planning repository or existing site.
- [ ] Every unresolved prerequisite has a question-register reference and a phase that cannot complete without it.

**Completion criteria:** Implementation has been explicitly authorized and the immediate setup direction is approved. Later feature questions may remain open with clear dependencies.

**Notes:** Public repository visibility does not authorize publishing source data. Preserve `_data/`, `_private/`, and `_secrets/` exclusions wherever project material is carried forward.

## 2. Establish local and public development

**Purpose and result:** Create a reproducible application installation and deployment path before building business features.

**Prerequisites and decisions:** Phase 1; approved database provisioning method. Choose the simplest frontend consistent with our server-rendered authentication architecture. A separate SPA is not assumed. Decide supported Node/build tooling only if the chosen frontend needs it.

**Resources:** [Herd for Windows](https://herd.laravel.com/windows), [Herd service matrix](https://herd.laravel.com/docs/windows/herd-pro-services/service-versions), [Forge deployments](https://laravel.com/forge/docs/sites/deployments), [Laravel deployment guidance](https://laravel.com/framework/docs/deployment).

### Tasks

- [ ] Set up Laravel 13.x on PHP 8.5 with the approved MariaDB 11.8 service, required extensions, dependency lockfiles, and an HTTPS Herd site at the approved local address.
- [ ] Initialize or clone the confirmed application repository; commit a clean application baseline and sanitized setup instructions. Preserve ignores and keep credentials/source data outside tracked files.
- [ ] Configure an isolated Forge development site, database account, HTTPS/DNS, private settings, and the Laravel `public/` web root. Restrict unfinished development access using a mechanism compatible with later sign-in callbacks.
- [ ] Establish deployment from `main` to public development, with dependency installation, asset build where needed, safe migrations, configuration refresh, and a visible deployed revision.
- [ ] Add an automated check runner for the application tests, code checks, and build as applicable. Prevent failed checks from becoming a successful deployment; confirm the chosen trigger arrangement actually enforces that order.
- [ ] Define local/test/development separation, safe database reset commands for disposable environments only, and basic pre-deployment recovery. Configure initial backups before retaining meaningful development data.

### Validation

- [ ] A clean checkout installs from lockfiles; the browser and command line use PHP 8.5 and connect to the intended MariaDB 11.8 instance.
- [ ] Both approved HTTPS development addresses display the Laravel baseline and a successful database-backed check, without exposing database configuration.
- [ ] A harmless visible change works locally, is committed/pushed, passes checks, and appears at public development with the matching revision. Remove the temporary demonstration afterward.
- [ ] A deliberately failing automated check prevents deployment under the chosen setup. A failed deployment is visible and recoverable.
- [ ] Requests for private configuration, source-data paths, and dependency files cannot retrieve them; environment credentials and database contents are absent from Git.

**Completion criteria:** Another developer can reproduce the baseline, and the same revision runs locally and publicly against separate databases.

**Notes:** The existing static site's deployment is not reused without deliberate configuration. Pushing code does not update another developer's local checkout or synchronize database contents. No production auto-deploy is implied by the development `main` trigger.

## 3. Integrate Microsoft sign-in, profile, and protected access

**Purpose and result:** Apply our selected sign-on solution to this application, with real sessions and access checks.

**Prerequisites and decisions:** Phase 2. Resolve eligibility and provisioning before opening access (Q-009), plus a minimal approved role/bootstrap policy (Q-010/Q-011). Set session lifetimes, revocation, and logout behavior before accepting this phase. Production credentials must be resolved before Phase 10 completes. Do not reopen the selected library without a concrete blocker.

**Resources:** [Authentication requirements](tg-laravel-microsoft-authentication.md#2-requirements), [accepted boundaries](tg-laravel-microsoft-authentication.md#3-accepted-tradeoffs-and-boundaries), [Entra registration](tg-laravel-microsoft-authentication.md#4-register-the-application-in-microsoft-entra), [Laravel integration](tg-laravel-microsoft-authentication.md#5-laravel-installation-and-configuration), [acceptance and operations](tg-laravel-microsoft-authentication.md#6-general-use-and-acceptance), [user management](User%20Management.md).

### Tasks

- [ ] Follow authentication Sections 4.1–4.4 to confirm the TG tenant, application ownership, environment registrations, exact callback URLs, and sign-out return URLs. Include both approved local and public development hosts in the chosen registration arrangement.
- [ ] Apply Sections 4.5–4.8 for the exact delegated scopes, consent, member/guest eligibility, development credentials, and private installation record. Tenant membership alone must not bypass the approved application policy.
- [ ] Follow Sections 5.1–5.3 to install and lock Socialite and `socialiteproviders/microsoft`, configure private settings, and register the driver.
- [ ] Create the minimal user, external-identity, and chosen session-store migrations before implementing login. Enforce unique provider/tenant/object identity in MariaDB; Phase 4 extends this schema rather than creating a second user model.
- [ ] Implement Sections 5.4–5.5: session-based redirect/callback routes, PKCE on both requests, safe failures, tenant/object identity checks, eligibility before provisioning, unique external identities, and session regeneration. Never merge accounts by email.
- [ ] Implement Section 5.6 and Section 6 operations: sessions, CSRF-protected logout, passive signed-out page, disablement/revocation, and the approved local-only or combined sign-out experience.
- [ ] Implement the user directory and own-name profile edits with read-only Microsoft email and permissions. Preserve local name edits across subsequent sign-ins under an agreed profile-sync rule; do not rewrite historical attribution.
- [ ] Enforce server-side authorization on protected routes and writes. Keep unfinished role-assignment actions unavailable until their policy is approved.

### Validation

- [ ] Execute the authentication specification's full acceptance checklist locally and in public development; retain sanitized results rather than treating the side-project evaluation as our deployment test.
- [ ] Eligible members and approved guests resolve to the correct local identity. An outsider, ineligible tenant account, or disabled local user cannot reach protected data under the chosen policy.
- [ ] Cancellation, wrong state, stale/replayed callback, provider failure, and simultaneous login attempts neither grant access incorrectly nor duplicate users.
- [ ] Login regenerates the session; logout requires a valid POST/CSRF token; a delayed signed-out page does not clear a newer login. Revocation affects an already-established session as agreed.
- [ ] Editing our name cannot change email, role, or recorded historical actor information. Credentials, codes, and tokens do not appear in public responses or logs.

**Completion criteria:** Sign-in works in our actual environments, the profile persists, and both authentication and minimum authorization checks pass.

**Notes:** Reuse the supplied specification's section-level instructions instead of creating a second authentication procedure. No local passwords, broader Graph scopes, token storage for background access, or custom authentication library are part of this integration.

## 4. Build shared foundations and one complete stock correction

**Purpose and result:** Prove the core architecture with a small real workflow before expanding all features.

**Prerequisites and decisions:** Phase 3. Resolve the minimum catalog identity/location rules and correction permissions needed for this slice (Q-015/Q-018/Q-019/Q-041). Decide persistent identity, quantity representation, money precision, and transaction boundaries from the agreed inventory/cost rules.

**Resources:** [Catalog](Catalog.md), [inventory and item ledger](Location%20Inventory%20and%20Item%20Ledger.md), [shared presentation guide](../public/css/style-guide.html), [decisions](../status/Decisions.md).

### Tasks

- [ ] Extend the Phase 3 schema with reversible development migrations for reference records, items, locations, balances, and attributed history. Reuse the existing users/external identities and apply stable identities and appropriate uniqueness/reference constraints.
- [ ] Add safe synthetic fixtures using the approved local sample-name source; exclude historical real identities and restricted source text from public fixtures.
- [ ] Build shared navigation, page layouts, statuses, validation messages, review/confirm controls, and loading/error behavior. Keep the current design provisional; choose implementation technology without copying independent browser-demo storage into production.
- [ ] Establish a shared server-side stock-posting path that writes balances and history together, checks authorization, and prevents repeated confirmation from applying twice. Use database transactions and an explicit concurrency strategy.
- [ ] Complete one item page → inventory edit → review → save → history workflow against MariaDB, including optional rationale, unchanged Unit Cost, and a view-only user.
- [ ] Add only useful future navigation placeholders. Label unfinished areas and disable their writes; associate each with its completion phase below rather than building an entire speculative schema.

### Validation

- [ ] A clean test database can be built from migrations and synthetic fixtures; the correction survives reload and is visible to a second permitted user.
- [ ] Cancel/review alone changes no balance. Saving a correction changes the correct location and creates attributed, read-only history; a view-only user is denied through a direct request as well as the UI.
- [ ] A forced failure between balance/history writes leaves neither partially saved. Double submission posts once; simultaneous permitted updates produce consistent balances and history.
- [ ] Negative balances remain allowed; descriptive edits do not create stock movements, and nobody can edit old inventory history through application endpoints.

**Completion criteria:** A complete authenticated stock correction works end to end with reliable persistence and history, not merely a collection of scaffolded screens.

**Notes:** Concurrency protection is an internal consistency mechanism. Do not add the rejected print-time snapshots, stale-count reconciliation, or intervening-movement warnings to volunteer workflows.

## 5. Complete catalog, browsing, and physical counting

**Purpose and result:** Make daily inventory management useful before adding longer transaction workflows.

**Prerequisites and decisions:** Phase 4. Settle included catalog validation/lifecycle rules and authority (Q-015–Q-019), missing-value treatment, and any direct cost-editing permission (Q-011/Q-034). Postponed catalog decisions must be resolved or explicitly scoped before claiming full completion.

**Resources:** [Catalog](Catalog.md), [inventory index and search](Inventory%20Index%20and%20Search.md), [location counts and history](Location%20Inventory%20and%20Item%20Ledger.md), [question register](../status/Open%20Questions.md).

### Tasks

- [ ] Complete approved Category, Collection, Item, location, and supplier/reference maintenance; collection-owned SKU behavior; optional values; and the agreed inactive/archive behavior.
- [ ] Complete explicit search/filter submission, grouped results, location columns, independent Available/active-event/In Transit/Ordered balances, item navigation, and preserved browsing state.
- [ ] Implement full-result inventory CSV export and useful real transaction/history navigation. Future source-record links remain clearly unavailable until their workflows exist.
- [ ] Complete personal criteria-only saved searches, printed count worksheets, blank-aware actual-count entry, keyboard navigation, review, and attributed per-item corrections.
- [ ] Implement authorized direct cost adjustment only after permission and missing-value policy are resolved; preserve quantity and append the distinct cost history entry.
- [ ] Complete the approved role-assignment and user-disablement controls once Q-010/Q-011 are settled, replacing any temporary operator-only setup from Phase 3. Test their effect on existing sessions and subsequent workflow actions.

### Validation

- [ ] Created catalog records are the same records used in inventory and subsequent edits; blank values remain distinct from zero, and SKU changes follow the approved rules.
- [ ] Search changes do not silently query; returning preserves the submitted results context and pending edits. CSV contains all displayed rows, not unsent criteria or only visible screen rows.
- [ ] Column choices preserve quantity associations and the organization-wide Available total. Negative stock and the agreed inactive-item inclusion rules behave correctly.
- [ ] A printed count can be entered with Tab/Enter. Blank skips, zero counts none, unchanged counts post nothing, and optional explanations never become mandatory.
- [ ] Any Location Manager can count any storage location; unauthorized writes fail. Saved searches contain criteria only, and corrections retain Unit Cost unless an authorized separate cost adjustment is made.
- [ ] Only the approved authority can grant/remove access or disable an account; a user's profile cannot grant permissions, and removed access takes effect under the agreed session policy.

**Completion criteria:** Volunteers can maintain approved reference data, find an item, print/count supplies, and inspect the resulting history using real shared records.

**Notes:** Test print output on an actual supported browser/printer or print-to-PDF path. A screenshot is not evidence that page breaks and printed columns are usable.

## 6. Build request intake and collaboration

**Purpose and result:** Establish persistent request workflows, ownership, and preparation before enabling stock-changing completion actions.

**Prerequisites and decisions:** Phase 5; resolve the applicable Draft/request permissions and first-save notes (Q-039). Shared controls may be reused, but purchase and relocation rules remain distinct.

**Resources:** [purchase requests](Purchase%20Requests.md), [relocation requests](Relocation%20Requests.md), [user management](User%20Management.md).

### Tasks

- [ ] Build both request indexes, detail views, status filtering, and persistent drafts against shared catalog/users rather than separate sample records.
- [ ] Implement purchase requests with optional fields, free text for uncataloged needs, permanent creator ownership, owner Draft edits, and Procurement continuation/return for clarification.
- [ ] Implement relocation required titles, one source/destination, bulk item selection, projected balances, Draft review/edit/submit, manager Requested edits, and item-only independent copies.
- [ ] Add immutable purchase notes in every state and attributed request activity/status logs. Preserve the distinct permissions and cancellation paths of each request type.
- [ ] Implement saved preparation/fulfillment work and packing worksheets. Keep shipment/receipt posting unavailable until Phase 7 is implemented and tested.

### Validation

- [ ] A blank purchase request can be saved/submitted; an untitled relocation Draft cannot. Reload and navigation preserve saved work and ownership.
- [ ] Another Officer cannot edit someone else's purchase Draft; Procurement can continue it. Relocation owner/manager actions follow their separate rules.
- [ ] Copying a relocation copies requested items/quantities only, with no inherited source/destination, owner, history, sent counts, or tracking.
- [ ] Saving, submitting, copying, printing, and editing requests reserve or move no stock. Notes retain author/time and remain immutable even to administrators.

**Completion criteria:** Both request types support real collaboration and durable preparation. They are not represented as complete purchasing/relocation workflows until Phase 7 passes.

**Notes:** Reuse patterns for notes, tables, and confirmation only where behavior matches. Do not create a single generic status engine that erases the differences between these workflows. Automatic notifications remain outside the current requirement.

## 7. Complete stock movements and purchase costing

**Purpose and result:** Connect requests to reliable postings using the shared inventory/history foundation.

**Prerequisites and decisions:** Phase 6. Resolve included relocation discrepancy/remainder policies (Q-012), purchase backward/cancelled transitions (Q-042), and exceptional costing rules, including D-123's zero-value/discount interpretation. Resolve permissions required for receipt and cost correction before exposing those actions.

**Resources:** [relocation stages](Relocation%20Requests.md), [purchase entry and costing](Purchase%20Entry%20and%20Receiving.md), [purchase requests](Purchase%20Requests.md), [ledger](Location%20Inventory%20and%20Item%20Ledger.md).

### Tasks

- [ ] Complete relocation shipment review/confirmation, actual-sent movement to In Transit, immutable shipped items, multi-carrier tracking, and permitted title/shipping edits.
- [ ] Complete cumulative relocation receiving drafts and reviewed Complete posting to the destination; implement the approved discrepancy/remainder handling rather than assuming sent and received always match.
- [ ] Implement purchase preparation, contextual item/supplier creation, Ordered expectations, optional shipment, permitted pre-receipt edits/cancellation, and approved backward paths with appended history.
- [ ] Implement precise quantity/unit/line-total behavior and cent-reconciled fees, discounts, tax, and saved shipping allocation. Use By line total as the new-purchase default and support By quantity.
- [ ] Complete purchase receipt review and one-time finalization using actual quantities/final costs and current held-stock averaging. Keep Received immutable; support notes and separately authorized corrections afterward.
- [ ] Complete source transaction links and route every posting through the shared consistency controls. Apply appropriate locking/retry behavior when two receipts affect the same item's average cost.

### Validation

- [ ] Relocation saves move nothing; shipment moves actual sent units source → In Transit; receiving saves keep stock there; Complete moves it to the destination once. Overall held stock and Unit Cost are preserved except for any separately approved discrepancy handling.
- [ ] A title/tracking correction cannot unlock shipped items or alter past movement quantities; final-state exceptions match the agreed permissions.
- [ ] Ordered adds pending stock only; Shipped adds nothing further; cancellation removes only that order's expectation. Receipt clears pending and adds actual stock exactly once.
- [ ] Cost examples cover fee/discount/tax allocation, both shipping methods, bonus units, per-individual-item prices, cent leftovers, and approved zero-value behavior. Totals reconcile without feeding rounded display values back into calculations.
- [ ] Held-stock averaging includes storage/events/relocation transit, excludes Ordered, and uses the receipt alone for agreed zero/nonpositive cases. Concurrent receipts yield a consistent accepted cost and complete history rather than a lost update.
- [ ] Duplicate confirmation, two competing completion attempts, and a mid-posting database failure cannot produce extra stock or partial records. Denied actions and post-receipt edits leave quantities/cost unchanged.

**Completion criteria:** Purchases and relocations complete through the UI and database with correct stock, cost, and immutable source history, including the approved exception policies.

**Notes:** Partial purchase deliveries remain deferred. That does not defer relocation split-arrival draft counts. Test costing against synthetic active-event balances until Phase 8 adds the event workflow, then repeat that integration case with real event actions. Existing JavaScript calculation checks provide useful examples, but passing them alone does not test the Laravel/MariaDB implementation.

## 8. Complete event accounting and distribution reports

**Purpose and result:** Reuse tested posting behavior for event supply, one-time finalization, and later report-only corrections.

**Prerequisites and decisions:** Phase 7. Resolve initial finalization authority, unusual remaining counts, applicable dates/destinations, external-stock valuation, and report scope (Q-011/Q-028/Q-029/Q-032/Q-034/Q-035).

**Resources:** [event reconciliation](Event%20Reconciliation.md), [inventory ledger](Location%20Inventory%20and%20Item%20Ledger.md), [decisions D-028/D-037/D-038](../status/Decisions.md).

### Tasks

- [ ] Implement event creation/Planning and activation with one temporary event location and shared manager access; activate initial supply movements once.
- [ ] Implement known-source replenishment and unknown/external-source adjustments, including retrospective entry during unfinished reconciliation.
- [ ] Implement aggregate per-item remaining counts, saved progress, blank/zero distinction, default/split leftover destinations, and review of complete allocations.
- [ ] Implement prominent one-time finalization, distribution accounting, and direct leftover postings without In Transit or destination receipt.
- [ ] Implement print/CSV distribution summaries and flagged manager corrections with automatic before/after logs, leaving inventory postings untouched.

### Validation

- [ ] Planning changes no stock. Activation and additional active-event deliveries post once; supplies moved within the venue are not counted as another delivery.
- [ ] Multiple managers' contributions persist without overwriting each other. Incomplete counts save/resume, but uncounted event items or incomplete allocations cannot finalize.
- [ ] A 1,000-brought/250-remaining example produces 750 distributed, with all 250 assigned to destinations exactly once. Approved unusual-count cases behave as decided.
- [ ] Concurrent or repeated finalization cannot duplicate distribution/returns. Finalized events never reopen.
- [ ] A manager's report correction changes the report and correction log only; balances, Unit Cost, and original inventory history remain identical. Print/CSV output reflects the agreed corrected report.

**Completion criteria:** An event can be planned, supplied, counted, finalized, reported, and corrected using real shared inventory while preserving the report/inventory distinction.

**Notes:** Do not add automatic reversal, recosting, or inventory-difference posting to later event report corrections. Managers use separate manual stock adjustments when needed.

## 9. Rehearse initial data migration

**Purpose and result:** Turn the existing audit into a controlled, approved starting dataset without replaying uncertain history.

**Prerequisites and decisions:** Mapping preparation can start after Phase 5; final rehearsal requires Phases 7–8 so imported data can be exercised across workflows. Resolve Q-015–Q-021 and Q-043–Q-046 as relevant. Obtain explicit approval for records, mappings, quantities, cost basis, and import authority.

**Resources:** [legacy data review](Data%20Import%20and%20Legacy%20Data%20Review.md), [local import package](../_data/data-for-import/README.md), [starting inventory and corrections](Location%20Inventory%20and%20Item%20Ledger.md), [question register](../status/Open%20Questions.md).

### Tasks

- [ ] Review source provenance and resolve duplicate catalog/location rows, item identities, location mappings, unknown values, and selected reference/history fields. Preserve original local sources.
- [ ] Approve opening quantities and Unit Cost independently. Decide whether historical purchase material remains non-posting reference data; never add historic movements on top of opening balances by accident.
- [ ] Build a one-time import preview with actionable rejection details, approved mappings, and a recoverable execution record. Keep it an operator tool unless a reusable product importer is separately approved.
- [ ] Implement controlled load/retry behavior, referential validation, and opening-history records using the agreed starting-inventory treatment. Do not map every audit CSV to a permanent application table.
- [ ] Rehearse on a disposable or privately restricted database, reconcile item/location counts and cost bases, then exercise representative imported records through purchase, relocation, count, and event workflows.

### Validation

- [ ] Every loaded record traces to an approved source/mapping; unresolved duplicates or locations are rejected or explicitly resolved, not silently guessed.
- [ ] Loaded totals match the approved opening dataset, not a historical spreadsheet summary by default. Unknown and explicit zero values remain distinct as required.
- [ ] A repeat execution cannot duplicate stock/history. A failed load is rolled back or resumed under the documented safe procedure, and a clean re-run gives the expected result.
- [ ] Historical reference purchases create no new Ordered or held stock unless a different treatment was explicitly approved. Representative real item shapes work across all included workflows.
- [ ] Restricted data remains in private storage and protected databases; public development fixtures, Git history, logs, and screenshots contain no copied identities or source text.

**Completion criteria:** We have an approved migration input, reconciled rehearsal evidence, and a repeatable load/recovery procedure ready for cutover.

**Notes:** The current candidate package is evidence, not approved current stock. Private migration evidence stays outside Git. No ongoing count snapshot or stale-count reconciliation procedure is introduced by this one-time import review.

## 10. Prove integration and operating readiness

**Purpose and result:** Turn working features into a release candidate we can safely operate and recover.

**Prerequisites and decisions:** Phases 3–9 complete for the agreed baseline. Resolve session/offboarding and production credential strategy from the authentication specification; define support ownership, retention, acceptable data loss/recovery time, and realistic device/performance targets (Q-023/Q-024). These checks consolidate work started earlier.

**Resources:** [authentication operations and acceptance](tg-laravel-microsoft-authentication.md#6-general-use-and-acceptance), [production credential boundary](tg-laravel-microsoft-authentication.md#3-accepted-tradeoffs-and-boundaries), [Forge backups](https://laravel.com/forge/docs/resources/database-backups), [Forge deployment](https://laravel.com/forge/docs/sites/deployments), [Laravel deployment](https://laravel.com/framework/docs/deployment).

### Tasks

- [ ] Run an integrated scenario using the same items/users across opening stock, purchase, relocation, event, count correction, report correction, and export. Finish real source links and replace every included placeholder with working behavior; removing an included feature requires explicit scope approval.
- [ ] Review server-side authorization, CSRF, output escaping, safe error/log behavior, dependency advisories, session protections, and isolation of development and production data/settings. Protect CSV exports from executable spreadsheet-formula content without corrupting intended numeric values.
- [ ] Check keyboard navigation, focus/error messages, readable statuses beyond color alone, narrow-screen usability, and all print/export outputs with representative catalog/transaction volumes.
- [ ] Establish production backup scheduling, retention, failure reporting, restore responsibility, and secure recovery of required configuration/keys and any included files—not just the database.
- [ ] Prepare the production deployment procedure and recoverability rules for code, schema migrations, assets, and configuration. Prefer compatible staged schema changes; do not assume reversing a migration safely undoes live data changes.
- [ ] Configure health/error monitoring and named operational response. A basic Laravel health response is not a database or inventory-integrity check; include the necessary dependency checks without disclosing private details.

### Validation

- [ ] The integrated scenario reconciles balances, Ordered, In Transit, cost, and immutable history across all included workflows, with no duplicate posting from retries or concurrent actions.
- [ ] Direct unauthorized requests fail even when buttons are hidden. Denial, validation failure, and transient errors preserve database consistency and give users a useful recovery path.
- [ ] Representative volunteers can use keyboard controls, read statuses, print usable worksheets, and download correct complete exports on the supported devices. Agreed performance targets are measured, not inferred from small fixtures.
- [ ] Restore a real backup into an isolated environment; confirm schema, balances, history, required configuration, and login under designated test credentials. Record measured recovery time and achievable data-loss window.
- [ ] Rehearse a failed application deployment and a migration failure. Demonstrate the chosen code rollback or forward-fix path without discarding newer legitimate records. Backup failure and application failure reach the named operator.
- [ ] Production credential and rotation/offboarding arrangements meet the selected authentication specification; secrets remain private and public debug output is off.

**Completion criteria:** A reproducible release candidate passes integrated correctness, security, usability, and demonstrated recovery checks. No unresolved release-blocking defect remains hidden behind a completion checkbox.

**Notes:** Prove recovery and deployment on a production-equivalent isolated environment here; Phase 11 applies and checks those arrangements on the actual production host. Use a modest operating setup proportionate to our scale. Queues, schedulers, external error services, and extra infrastructure are added only when the chosen implementation needs them. Operational failure alerts are separate from unrequested product notifications.

## 11. Volunteer acceptance and production rehearsal

**Purpose and result:** Confirm the release works for the people who will use it and practice the complete launch sequence.

**Prerequisites and decisions:** Phase 10; confirmed production hostname, owners, data-cutover responsibility, and proposed launch window. The owner retains final release approval.

**Resources:** [feature overview](../docs/features-revised.md), [user guide starting point](../docs/Users%20Guide.md), [authentication registration URLs](tg-laravel-microsoft-authentication.md#41-prepare-names-urls-and-access), [question register](../status/Open%20Questions.md).

### Tasks

- [ ] Have representative Officer, Location Manager, and Procurement users complete realistic tasks without developer coaching. Include an interruption, a correction, a denied action, and each major confirmation.
- [ ] Record usability findings, fix release-blocking defects, and rerun affected acceptance scenarios. Obtain acceptance of the actual release scope rather than approval of screenshots alone.
- [ ] Replace draft guide assumptions with concise instructions for the implemented behavior, including blank versus zero, receipt/finalization consequences, corrections, and where to get help.
- [ ] Prepare production HTTPS, isolated database/configuration, approved Entra registration/credentials, backup/monitoring, and an explicit deployment of the selected release revision. Keep production closed to ordinary use until cutover approval.
- [ ] Rehearse deployment, final-data selection, import, reconciliation, access checks, opening service, and abort/recovery using a production-equivalent isolated environment. Agree how source changes between rehearsal and launch are incorporated.
- [ ] Record the go/no-go criteria, support contacts, cutover responsibilities, and the owner's explicit release approval for the identified revision and dataset.

### Validation

- [ ] Volunteers complete the approved core tasks and explain what will happen before stock-changing confirmation; practical blockers have been fixed or explicitly removed from scope by the owner.
- [ ] Production callbacks, sign-out return, secure cookies, application URL, and database connections point to production—not development—and match the selected registration.
- [ ] The rehearsal reproduces the approved opening totals and cost basis from clean inputs, without test users/fixtures or duplicate opening entries in the release dataset.
- [ ] The team can execute the written launch and abort steps, identify who can approve release/recovery, and locate the needed private configuration without exposing it.

**Completion criteria:** The release candidate and migration are accepted, the cutover has been rehearsed, and the owner has approved production launch.

**Notes:** A late feature request goes through scope review; it does not silently bypass acceptance. All included placeholders must be replaced with real behavior or explicitly removed from the approved release before this gate.

## 12. Release and verify production

**Purpose and result:** Put the approved application into service and establish that it is working with the correct data.

**Prerequisites and decisions:** Phase 11 approval for the exact release and data. Reconfirm approval if a material change occurs after acceptance. Use the practiced cutover and recovery procedure.

**Resources:** [Forge deployment](https://laravel.com/forge/docs/sites/deployments), [authentication acceptance](tg-laravel-microsoft-authentication.md#6-general-use-and-acceptance), [approved stock/receipt rules](Location%20Inventory%20and%20Item%20Ledger.md). The execution record identifies the approved revision, import input, and private operational instructions created in Phases 9–11.

### Tasks

- [ ] Preserve final source files and take the required pre-cutover backup. Establish the agreed stop/change-control point for legacy entries so the approved opening dataset is not immediately out of date.
- [ ] Deploy the approved revision, apply reviewed migrations/settings, run the controlled import, and reconcile opening records before allowing ordinary writes.
- [ ] Run production sign-in/access, browsing, history, print/export, and configuration checks. Use an approved test plan for any stock-changing smoke test; do not invent movements in genuine starting inventory.
- [ ] Open access after the launch criteria pass; communicate the operating instructions and support path through the approved human communication process.
- [ ] Confirm scheduled backups and failure monitoring actually run, check early errors and critical stock/cost behavior, and handle problems through the established recovery or correction procedure.
- [ ] Record the release revision/date, validation results, remaining accepted limitations, and support ownership; update current project status to reflect the actual release outcome.

### Validation

- [ ] The production domain serves the approved release with valid HTTPS, correct environment identity, and no public debug/private configuration exposure.
- [ ] An eligible member and designated guest can perform their allowed actions; a denied account cannot access protected records. Production authorization matches the accepted policy.
- [ ] Opening totals, Unit Cost bases, pending quantities if any, and source/history links match the approved dataset. Development fixtures are absent.
- [ ] Non-destructive checks and any explicitly authorized controlled workflow confirm that the deployed release functions; no test transaction is disguised as real inventory activity.
- [ ] The first scheduled production backup succeeds, failure reporting is operational, early critical errors are addressed, and the support owner can locate the recovery instructions.

**Completion criteria:** The approved baseline is live, its data and access checks pass, and backup/support arrangements are operating. Report a failed or rolled-back cutover accurately rather than marking the first release complete.

**Notes:** Reverting code is not permission to discard data created since launch. Stop affected writes and use the rehearsed recovery/forward-fix plan if a release problem threatens inventory integrity.

## Roadmap review

Reviewed once for execution order, missing prerequisites, observable evidence, and scope. The revision puts identity/session migrations in Phase 3 before login, makes Phase 4 extend that schema, explicitly completes approved user-administration controls in Phase 5, and distinguishes synthetic event balances used for early costing tests from later real event integration. It also separates recovery rehearsal from actual production configuration and prevents hiding a placeholder from counting as delivered scope.

No development task is marked complete. The main constraints are explicit implementation approval, release scope, repository/environment ownership, MariaDB 11.8 provisioning, the authentication specification's remaining access/session/credential decisions, workflow exceptions, and approved opening data. These remain in the existing question and decision registers; this review creates no separate decision list and approves no product behavior.
