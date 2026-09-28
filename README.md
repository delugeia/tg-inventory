# Tabletop Gaymers Inventory

Planning a Laravel web application with MariaDB storage to manage Tabletop Gaymers inventory. Specifications, milestones, and development stages will be prepared before implementation begins.

## GitHub and local-only files

This project is maintained publicly on [GitHub: delugeia/tg-inventory](https://github.com/delugeia/tg-inventory). The local `TG Inventory` folder is the Git repository root; `origin` points to that repository and `main` is the shared branch. Future project work is intended to remain available there.

The [live mockup walkthrough](https://tg-inventory.delugeia.com/) is hosted as a static HTML site on Laravel Forge's `delugeia01` server, isolated under user `tginventory`, with the repository's `public/` directory as its web root. HTTPS is configured through Let's Encrypt, with redirects from `www`. A GitHub push webhook targets Forge for deployment of `main`; its initial ping returned HTTP 200 on 2026-09-28. Push-to-deploy was verified on 2026-09-28: commit `33d48aa` automatically deployed successfully through Forge. Keep the token-bearing deployment URL out of tracked documentation and screenshots.

Keep all future secrets and personally identifiable information (PII) in the root `_secrets/` folder, which is excluded from Git. The root `_private/` folder is also excluded; `_private/shh.txt` is a local-only ignore test. Never force-add either folder or copy their contents into tracked files, screenshots, logs, or documentation. These folders are local storage conventions, not encryption or access controls. `.gitignore` also excludes environment files, credentials, dependencies, generated output, and editor/OS files; sanitized `.env.example` templates may be tracked.

The whole application is desktop-first: optimize for desktops/laptops while keeping phones and tablets usable, even if less convenient (D-086).

The planning mockup pass and subsequent refinements are complete, including [Catalog](public/catalog/index.html). **Next: user-directed review of the separate drafts** for [User Management](public/user-management/index.html), [Relocation Requests](public/relocation-requests/index.html), [Location Reconciliation](public/location-reconciliation/index.html), [Purchase Requests](public/purchase-requests/index.html), and the additional [Event Reconciliation draft](public/event-reconciliation/index.html) (Agent Suggestion). Each has usage notes and specification references in the [mockup index](public/README.md), which now includes grades and improvement notes for the earlier eight mockups. Read the [current handoff](handoff/2026-09-28-091934Z-handoff.md) and let the user choose the next review topic.

The [item-view mockup](public/item-view/index.html) includes [Edit Inventory](public/item-view/edit-inventory.html), [Edit Details](public/item-view/edit-details.html), and [grouped Adjustment records](public/item-view/adjustment.html). D-091–D-102 cover compact pre-save inventory review, blank-aware catalog values, collection-owned SKU prefixes, In-Person Ask/Online Ask, the 1/3–2/3 desktop layout, IRS FMV help, and Category/Collection searches. Every [inventory-index](public/inventory-index/index.html) item name links to the shared item view; these remain separate mockups with independent data. D-104 now confirms the basic role baseline and any-manager storage access; permission assignment and who directly edits Unit Cost remain postponed. No application implementation is authorized.

A rough [User’s Guide outline](docs/Users%20Guide.md) covers major workflows, common hang-ups, and references for later expansion. It describes planned behavior and distinguishes unresolved policies from mockup conveniences.

A [presentation outline](docs/Presentation%20Outline.md) introduces the project and walks through all nine mockups, with slide talking points, demo steps, and presenter notes.

Open the [interactive mockup walkthrough](public/index.html) for a brief introduction and sidebar navigation through all nine examples in presentation order. The TG Inventory brand returns to the introduction.

Use the [approved sample names](_data/sample-names.md) for sample people, storage locations, and events throughout future project work. The root `_data/` directory is local-only and ignored by Git; its links require a local copy. It has been removed from the current repository tree, with prior Git history retained at the user's direction.

## Start here

1. [Agent guidance](AGENTS.md): working rules and directory organization.
2. [Current status](status/Current%20Status.md): current stage, completed work, and next steps.
3. [Original rough notes](drafts/2026-09-22%20Rough%20Notes.md): source requirements and workflow ideas, not yet an approved specification.
4. [Rough notes review](_specifications/Rough%20Notes%20Review.md): extracted requirements, ambiguities, and suggested coverage; ready for user review.
5. [Handoffs](handoff/): dated notes for switching tasks or agents. Follow the relevant link in current status or the handoff specified by the user.
6. [Location inventory and item ledger](_specifications/Location%20Inventory%20and%20Item%20Ledger.md): draft workflow for saved searches, printed counts, reconciliation, and inventory history.
7. [Purchase entry and receiving](_specifications/Purchase%20Entry%20and%20Receiving.md): developer-facing fields, interactions, costing, lifecycle actions, and acceptance examples independent of the mockup source.
8. [Mockup index](public/README.md): interactive planning examples, review states, and usage notes. Includes the five evening drafts plus the preserved item, [purchase entry](public/purchase-entry/index.html), and [inventory index](public/inventory-index/index.html) examples.
9. [Inventory index and search](_specifications/Inventory%20Index%20and%20Search.md): Draft browsing specification for search, filters, grouped quantities, navigation, and CSV export; results load on explicit search or Show All.

New behavioral specifications: [User Management](_specifications/User%20Management.md), [Relocation Requests](_specifications/Relocation%20Requests.md), [Purchase Requests](_specifications/Purchase%20Requests.md), and [Event Reconciliation](_specifications/Event%20Reconciliation.md). Location reconciliation is in the existing location/ledger specification.

The single working planning records are [Decisions](status/Decisions.md), [Open Questions](status/Open%20Questions.md), and [Future Ideas](status/Future%20Ideas.md), alongside current status. Before a new agent updates status documents, it snapshots the existing working set in `status/_archive/` following `AGENTS.md`.

## Directory guide

For a live preview of the discussion, leave [Open Questions](status/Open%20Questions.md) open in Typora. Its Next questions section shows the current question and upcoming topics and is updated as the discussion progresses.

| Directory | Purpose |
| --- | --- |
| `_specifications/` | Current specifications and active handoff drafts |
| `docs/` | Draft user-facing documentation |
| `drafts/` | Original notes and source planning material |
| `handoff/` | Task transition notes named `YYYY-MM-DD-HHmmssZ-handoff.md` (UTC creation time) |
| `work/` | Temporary analysis and supporting work |
| `public/` | Interactive planning mockups in named subfolders; see the [mockup index](public/README.md) |
| `status/` | Current progress and decision tracking |
| `status/_archive/` | Timestamped snapshots of working status documents before a new agent's updates |
| `archive/` | Superseded drafts and material no longer used |
| `backups/` | Recovery copies when needed |

No application code or development commands have been established yet.






The mockups and walkthrough share [one stylesheet](public/css/style.css) and a [living style guide](public/css/style-guide.html) for headers, navigation, actions, forms, tables, statuses, notifications, and dialogs. Update both together for future visual changes. This is a provisional design starting point, not approval of a final design.

The [Catalog draft](public/catalog/index.html) manages Categories and Collections and creates Items. Created items link to their own Item & History record. See [Catalog specification](_specifications/Catalog.md) and [usage notes](public/catalog/README.md). Lifecycle effects on searches and other workflows remain deferred (D-117).
