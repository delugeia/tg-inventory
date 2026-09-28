# Inventory index mockup

State: Draft planning mockup. Created 2026-09-26 at the user's request. This is an interactive specification aid, not application implementation or approval of the complete design.

The user reviewed the mockup positively and requested closing filters on submission (D-089) and alphabetical flow down columns (D-090); both refinements are implemented. The current item-view pass is now complete for this session; the next functionality mockup awaits user direction. See the [current handoff](../../handoff/2026-09-26-232644Z-handoff.md). D-102 lightly links every item name to the separate shared item-view mockup.

Open [index.html](index.html) in a modern browser. No installation, build step, or server is required. The preview can also be served over localhost. Styling follows the purchase mockup: simple white sections, muted backgrounds, purple controls, and no application header or navigation.

## Try it

The alphabetical checklist flows down columns: three on desktop, two on narrower screens, and one on phones (D-090).

Search/Enter and Show All automatically close the filter panel while retaining its selections and highlighted count (D-089). Reset closes it and clears selections.

1. Start with the instructional table and disabled Download CSV. Use Show All for 224 normally eligible rows, or expand Filters and select collections before searching.
2. Search for ribbons, buttons, or a collection name. Multiple collection choices combine as alternatives; text narrows them. Conditional event/In Transit/Ordered columns depend on matching rows.
3. Enable Include inactive zero-stock items and Show All to see all 225 fixtures. Search for Retired Button to inspect zero, pending-order-only, and offsetting-balance cases.
4. Change search text or filters without submitting. The earlier results stay visible with a notice; Download CSV uses those displayed rows and values.
5. Click any item name: every item opens the same [item-view page](../item-view/index.html), regardless of the selected row. The two mockups retain separate sample data and behavior. Use browser Back to return with submitted results, pending edits, and scroll position retained; the filter panel closes. Location headings use an equally minimal [location.html](location.html) placeholder.
6. Reload or reopen the index: remembered settings return, filters are closed/highlighted as appropriate, and results wait for Search/Enter or Show All. Reset clears criteria and results; Clear filters clears checkboxes but preserves text and existing results until submission.

## Data and scope

[data.js](data.js) provides 225 illustrative entries, not the real catalog: 160 general tracked items, 30 shipping box/envelope/mailer types, and 35 sample games. Twelve named rows reproduce the user's draft balances; sample pending button orders are added. Other names and quantities are synthetic and mostly labeled Sample. One inactive fully zero item is hidden by default; an inactive ordered-only item and an inactive offsetting-balance item remain visible. Quantities do not change in this mockup.

Settings use browser local storage; return context uses session storage. These are demonstration choices, not a production storage design. Files opened directly and localhost previews have separate browser storage. If browser storage is blocked, a notice explains that persistence is unavailable. Use browser Back to restore index context; the item view also offers Category/Collection searches under D-101.

The bounded table height, horizontal scrolling on small screens, inactive labels, active-filter colors/wording, no-match wording, and location placeholder are demonstration choices. They do not approve unresolved responsive or error behavior. No server-query failure, authentication, editable stock, real location detail, or per-row item-detail data binding is implemented. CSV contains all displayed rows, numeric zero, current displayed columns, and separate Category/Collection fields.

## Source and validation

Edit [index.html](index.html), [shared style.css](../css/style.css), [data.js](data.js), and [mockup.js](mockup.js) directly. Placeholder pages share the stylesheet. No dependencies or generated wrapper are used.

Checked JavaScript syntax and fixture/filter/CSV logic with Node. Browser checks covered initial state, 224/225 row inclusion, case-insensitive search, combined collections, conditional columns, no matches, pending-input notices, item placeholder, Back restoration including table scroll, collapsed filters, and reload persistence without results. Desktop and narrow-screen layouts were inspected. CSV serialization was checked for full row count and example values; the in-app browser's download-event observation timed out, so a completed browser file save was not verified. This is not an application test suite.

Follow-up browser checks verified Search and Show All close the panel without clearing selected filters, and confirmed alphabetical flow down the first column plus responsive three/two/one-column layouts. Preview screenshots and the targeted Node logic check are in work/; they are verification artifacts, not production source.

See [Inventory Index and Search specification](../../_specifications/Inventory%20Index%20and%20Search.md), [original user notes](../../drafts/Inventory%20Index%20and%20Search.md), and [mockup index](../README.md).

## Item-view search links — D-101

The item-view mockup links here with Category and optional Collection criteria. Following a link explicitly submits an exact matching set of collection filters and displays results immediately, with the filter panel closed. This is an explicit search action, unlike ordinary unparameterized index opening. The initial linked search does not overwrite remembered settings; subsequent searches use the existing controls. A collection absent from these independent sample fixtures appears as a selected filter with no matching rows. D-102 replaces item-placeholder links with the separate shared item view; location placeholders remain unchanged. Verified category and collection links from the item view.

D-102 verification: all displayed item-name links share ../item-view/index.html. Opening Any-All displayed the shared He/Him Pronoun Ribbon page; browser Back restored the 12 submitted Pronouns results with filters closed. Linked-search history navigation now restores saved return context as well. JavaScript syntax passed.
The superseded item placeholder is retained in [archive](../../archive/mockups/inventory-index-item-placeholder/item.html).

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.

## Location filters — D-113

Storage locations and active-event/pending areas have separate checklist columns. No selection displays columns with nonzero balances among matching items. Explicit selections display only those columns, including selected zero-balance locations. Selecting all storage locations hides unselected events, In Transit and Ordered. These choices do not filter item rows or change full-storage Available. Search/Show all applies them; CSV follows the displayed columns. Item details always retain all locations and other details. The sample has one active event, Gen Con; Milwaukee WI is a zero-stock fixture.
