# Item view and Edit Inventory mockup

State: Draft. Created 2026-09-26. Open [index.html](index.html) directly in a browser or use the localhost preview. No installation or build is required. This is specification planning, not application implementation.

The view shows He/Him Pronoun Ribbon identity, storage Available, location balances, active-event stock, In Transit, Ordered, details, cost/value fields, notes, and History. Edit Inventory is interactive. [Edit Details](edit-details.html) is also interactive; Adjustment History rows now open grouped, view-only records; non-adjustment History navigation remains a placeholder. Pending-stock sections now offer light links to independent event, relocation, and purchase examples. Broader permissions remain postponed. The inventory-index mockup is independent; every item-name link there opens this same shared item view (D-102).

## Current flow — D-091 through D-096

1. Select **Edit Inventory**. Compact rows contain Location, Set, Adjust, optional Rationale, Current, and New. New = Set + Adjust. Current/New are right-aligned. Total Available is the final H3; its totals are non-focusable spans.
2. Enter either or both numeric fields. Set starts at current stock and Adjust at 0. Negative balances and explicit zero are allowed. Demo validation requires whole safe integers; blank Adjust is 0, while blank Set is invalid.
3. **Continue** opens [inventory-review.html](inventory-review.html) for the temporary draft. Nothing is posted. The table shows proposed History entries, optional rationale, and On Save in the Date column. Actual posting time is assigned only at Save.
4. On review, **Edit** returns with Set, Adjust, and rationales intact. **Cancel** opens a warning modal offering Keep reviewing or Discard changes. Discard returns to the item view without posting.
5. **Save** on review records only changed-location corrections, updates storage quantities, and returns to item view with a saved notice. Unit cost, events, In Transit, and Ordered stay unchanged. A repeated visit to a committed review cannot post again.
6. **Reset demo** on the item view restores the original sample and clears corrections/draft data.

Form Cancel/Item view warns when dirty. Browser navigation/reload/close uses beforeunload; browsers control its presentation. Native warning text was not exposed by the in-app browser during verification. Approved Edit/Continue transitions do not show departure warnings. No stock-movement or stale-count warnings are introduced.

## Sample data and scope

All quantities, SKU, dates, descriptions, and classifications are illustrative. Initial held quantity is 3,050: Central 2,000 + Indianapolis IN 550 + active event 300 + In Transit 200. Storage Available is 2,550; Ordered is a separate 1,500. Starting inventory has source rationale “starting inventory.” The 1,000-unit receipt illustrates $160 acquisition cost with previously unknown catalog cost, producing $0.160. Corrections preserve that cost.

Current decisions are D-091–D-102; D-096 replaces the post-save results/OK flow. Superseded results source is in [archive](../../archive/mockups/item-view-saved-results/). Remaining layout/validation choices are Agent Suggestions, not complete specification approval. Showing all sample locations grants no production permissions.

Session storage is demo-only, scoped to this tab and origin. Draft inputs are stored separately from posted inventory/history. No-change review produces no history rows. Unavailable or already-saved reviews disable saving; errors do not claim success. Direct local-file storage behavior depends on the browser; localhost was tested. New adjustment History rows retain rationale tooltips and open their grouped source record. Non-adjustment transaction detail navigation remains out of scope.

## Sources and verification

Active source: index.html, edit-inventory.html, inventory-review.html, ../css/style.css, inventory-model.js, item-view.js, edit-inventory.js, inventory-review.js, edit-details.html, edit-details.js, adjustment.html, and adjustment.js.

Sources: [Location Inventory and Item Ledger](../../_specifications/Location%20Inventory%20and%20Item%20Ledger.md), [Purchase Entry and Receiving](../../_specifications/Purchase%20Entry%20and%20Receiving.md), and Q-041 in [Open Questions](../../status/Open%20Questions.md).

Checked calculation edge cases (combined Set/Adjust, negative, zero, blank, fractional, overflow), syntax, desktop layout, live totals, and Tab skipping total spans. Current-flow browser verification: Set 1,900 plus Adjust 50 previewed a −50 Central correction; Edit restored both inputs and rationale; Continue then Cancel/Discard left Available 2,550 with the original nine History entries; a separate final review Save changed Available to 2,500 and added exactly one entry. Tests used an isolated tab. Browser warning presentation limits remain as noted above.

## Edit Details — D-097

Open Edit Details from the item view. The form includes descriptive/catalog fields, bundle settings, notes, and monetary values. Unit Cost appears twice, disabled and editable, mirroring one proposed value. These are permission examples only; the user explicitly postponed who may edit cost. Numeric values use text inputs (with keyboard input hints), not number controls. Blank and zero remain distinct on save/reopen.

Save updates tab-local demo details and returns to the item. Descriptive edits add no inventory History. A changed Unit Cost adds a cost Adjustment with — quantity and its new stored cost, preserving historical values. Inventory corrections use the current saved cost, and inventory Save preserves catalog details. Cancel and navigation protect unsaved edits. Blank values display Not set; zero IRS Value/In-Person Ask/Online Ask display $0.00; zero catalog cost retains n/a. Missing-cost receipt semantics remain open, not implemented in this mockup.

Agent Suggestions: field grouping, fixture choices, direct Save/Cancel details flow, required name, nonnegative decimal money, whole bundle quantity, and blank-display wording. D-099 uses Full Name, separate Category/Collection dropdowns, collection options with prefixes, and a fixed prefix beside an editable SKU suffix. Category filters collections and clears the selection while keeping the suffix; choosing Collection previews its prefix. That interaction and sample prefixes are demo choices; production migration, uniqueness, and prefix renames remain Q-015. No reference management, archive/delete, or new permission policy is implemented.

Verified in an isolated browser tab: linked page load, disabled/editable cost fields, desktop rendering, blank bundle quantity and Donation Price versus zero IRS Value surviving Save/reopen, no History from descriptive/value edits, separate cost adjustments for blank then explicit zero, and Cancel/discard preserving the item name. All details numeric controls are text fields. Original inventory-draft tab is preserved while the new page is displayed separately.

## View Adjustment — D-098

Open [the standalone grouped sample](adjustment.html), or click an Adjustment row in item History. A save affecting several locations produces separate History rows that all open the same read-only source record. The page shows actor, posting date and time (seconds and explicit America/Chicago zone), saved item identity, location before/after/delta, captured cost, and optional rationales. Cost-only records show old/new unit cost without quantity effects. All fields are text; no edit, save, or delete controls exist for anyone.

New demo saves capture the fictional actor “Jarod Nash (sample manager),” timestamp, item name/SKU, and grouping ID. Older demo saves lacking actor/identity show Not captured rather than inventing an audit record. The two original Adjustment fixture rows have illustrative actor/time/rationale data matching their quantity entries. The standalone three-location sample is explicitly illustrative and changes no stored inventory. Metadata and table layout, seconds, and timezone conventions are Agent Suggestions. The grouped source view does not merge or remove individual correction/history entries.

Verified in an isolated tab: a Central −50 and Ames IA +100 save created two History links with the same group ID; either opens one record with both changes, actor, time, rationale, and unchanged $0.160 cost. A later cost change from $0.160 to $0.200 opened its own read-only cost record. Syntax checks passed. User review tabs were left untouched.


D-099 verification: changing Category to Buttons filtered Collection to Pronouns (BP), retained the SKU suffix, and required a Collection selection. Saving suffix TEST displayed BP_TEST on the item view without adding History or changing stock/cost. Browser layout and JavaScript syntax were checked; the user's existing details values and inventory draft were preserved.

## Donation asks — D-100

In-Person Ask is the suggested convention-booth donation. Online Ask is the amount selected for an online Reward; officers may adjust it down to cost when contacted. The two independent text fields replace Donation Price on view/edit, preserve blank versus zero, and create no inventory/cost History when changed alone. Existing demo Donation Price carries into In-Person Ask; Online Ask starts blank. This compatibility choice is an Agent Suggestion. No automated online exception or cost-floor validation is implied.


D-100 verification: isolated browser Save/reopen retained In-Person Ask 0 and Online Ask blank; item view showed $0.00 and Not set with no extra History row. A subsequent save displayed independent $2.50 and $3.50 values. JavaScript syntax checks passed.

## Main-view layout — D-101

The desktop overview is approximately 1/3 Inventory and 2/3 Item details. Total Available is a highlighted final storage row. Descriptive details and Cost & Values each use two columns; Notes spans the details width. Unit Cost/IRS FMV sit left and the two asks right. FMV help is available on hover/focus and dismisses with Escape. Category and Collection links submit exact filters in the inventory-index mockup, which has independent sample data. Unknown fixture collections yield no matches rather than broadening the search. Sections stack below 1000px; details groups stack below 580px (demo breakpoints).

Browser checks verified desktop layout, keyboard FMV help/Escape, Collection search returning only Ribbons : Pronouns (12 fixtures), and Category search returning the five Ribbons collection groups. JavaScript syntax checks passed.

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.

## Directory/filter consistency — D-113

The item view always displays all five storage locations, including zero balances, irrespective of Inventory index column choices. Boston MA and Milwaukee WI are appended as zero balances to earlier three-location saved data/drafts without changing existing associations. Adjustment metadata uses the shared styled definition list and omits the separate America/Chicago label; the timestamp retains its timezone abbreviation.

## Catalog item handoff

Catalog links use catalogItem and optional sample query parameters to open an actual newly created record. Details and inventory edits save to the same browser-local Catalog sample; navigation and review retain that context. New items have no fixture History or pending-stock rows. The default URL still opens the independent ribbon fixture. Other mockups, including inventory search links, remain separate datasets. Serve both folders from the same origin.
