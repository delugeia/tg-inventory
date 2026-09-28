# Inventory index and search

Document state: Draft

Created: 2026-09-26. The assembled specification has not been approved. Accepted behaviors and planning context are recorded in D-076–D-090 in [Decisions](../status/Decisions.md). The [original user draft](../drafts/Inventory%20Index%20and%20Search.md) is preserved.

## Purpose and access

Interactive reference: [first inventory index mockup](../public/inventory-index/index.html), with [usage/source notes](../public/inventory-index/README.md). Created at the user's request on 2026-09-26. D-102 links every item name to the same separate [item-view mockup](../public/item-view/index.html); the samples remain independent and no per-row data binding is implied. Use browser Back to test restoration. This Draft demonstration has no application header/navigation and does not approve unaccepted design details.

Browse inventory across items and locations, open item/location details, and download matching results. Viewing permissions remain in Q-011; permissions discussion is postponed. Browsing and CSV export have no inventory or cost effects.

Expected catalog size is approximately 225 items: 160 tracked items, 30 shipping box/envelope/mailer types, and 35 Gayme Night games (D-084). This is a planning estimate, not a hard limit or a performance measurement. Show all matching items in one scrollable listing without pagination, retaining fixed names/headings and the bottom Download button (D-085).

The entire application is desktop-first (D-086). Optimize this index for desktop/laptop screens; phones and tablets must remain usable, though a clunkier experience is acceptable. Search, filters, navigation, and Download must remain reachable on smaller screens. Agent Suggestion: retain the table on smaller screens with horizontal scrolling rather than introducing a separate mobile layout; exact responsive behavior is not yet approved.

## Search and filters

The alphabetical collection checklist reads down each column, then continues at the top of the next: three columns on desktop, two on narrower screens, and one on phones (D-090). Column breaks adapt to width; reading and keyboard order remain alphabetical.

Search (including Enter submission) and Show All close the filter panel after applying the selected criteria. Retain the selections and the trigger's count/active highlighting (D-089). Reset also closes the panel, while clearing criteria as previously specified.

Place a search box and Show All above the results, with a collapsed filter panel. Search matches category, collection, or item name without case sensitivity. Use an alphabetized flat list of Category : Collection checkboxes. Selecting several collections includes any selected collection; the search narrows those results. No collection selection means no collection restriction.

Show the selected collection/location count on the collapsed control, e.g. Filters (3), and provide Clear filters. Show All clears search text and retains collection and location selections. Reset clears search and filters. Add an Include inactive zero-stock items option, off by default. Normally include all active items, including zero. Exclude an inactive item only when every current location, event, In Transit, and Ordered balance is zero (D-080). Any nonzero balance keeps it eligible, including pending purchases, negative quantities, or offsetting balances. Do not use Available or a net total to determine exclusion. Search and collection restrictions still apply. The checkbox extends index browsing, not the count workflow in D-032.

Open without loading item results, showing search, Show All, collapsed filters, and “Search inventory or choose Show All.” Run the query only when the user clicks Search, presses Enter in the search box, or selects Show All (D-078). Editing text or filters does not automatically query or refresh results; users may select several filters before submitting. No performance bottleneck has been measured, and no category is automatically excluded.

Clear filters unchecks all collection/location choices and Include inactive zero-stock items while retaining search text. It does not query or refresh existing results. Reset clears search text and all filters and returns to the initial no-results screen with its search prompt. Neither control runs a query; subsequent Search/Enter or Show All applies the criteria (D-081).

## Results and navigation

Remember search/filter settings across closing and reopening the application (D-088). Restore the settings without loading results until Search/Enter or Show All. Preserve the distinction between submitted criteria and pending edits; do not persist inventory quantity snapshots. Retention duration and storage mechanism are unspecified.

On return from item/location details or reopening, always restore the filter panel closed, regardless of its previous expanded state. Retain all selections. The closed trigger shows the selected collection/location count, e.g. “Filters — 5 selected,” and is visually highlighted when any filter is set, including the inactive-zero option alone. Exact styling remains a design detail. Agent Suggestion: add “Include inactive zero-stock items” to the closed summary when enabled, making that state explicit alongside the collection count.

Keep the table area visible when no item results are shown, with a default instruction message inside it and the bottom Download button visible but disabled (D-083). This applies to initial opening, Reset, and searches returning no matches. The initial instruction is “Search inventory or choose Show All.” Agent Suggestion for a completed empty search: “No items match. Change your search or filters, then select Search, or choose Show All.”

When edited search text or filters differ from the submitted criteria, retain existing results and show “Search settings changed — select Search to update results.” These pending inputs do not change the displayed rows or download contents. Download remains enabled if item results are still displayed.

Sort by Category, Collection, then full item name. Display the full name and lightly shaded collection headings spanning the table, labeled unambiguously, e.g. Ribbons : Pronouns. No quantity placeholders are needed in heading rows.

| Column | Meaning |
| --- | --- |
| Name | Full item name; opens the item page |
| Available | Sum at central and remote storage locations |
| Each storage location | Quantity at that location; heading opens its location inventory |
| Each active event | Event-held quantity, excluded from Available; only when nonzero for a matching item; no Planning or finalized-event columns |
| In Transit | Shipped relocation quantities awaiting receipt, excluded from Available; only when nonzero for a matching item |
| Ordered | Pending purchase quantities, excluded from Available; only when nonzero for a matching item |

D-079 confirms conditional columns use all current matching items, not unrelated inventory or only a displayed page. Show each active-event column, In Transit, or Ordered only if at least one matching item has a nonzero quantity in that column; negative quantities qualify. This does not change storage-location column visibility. Do not infer stock quantity links or event-heading destinations from approved item/storage-location links.

Use `—` consistently for zero item quantities; display negative balances explicitly. Keep the name column and column headings fixed during scrolling. The table has no pagination (D-085). Small-screen details and performance targets remain in Q-024/Q-040. The item page retains the established balance breakdown and linked History Table in [Location Inventory and Item Ledger](Location%20Inventory%20and%20Item%20Ledger.md).

Returning from an item or location page restores the last submitted search, all submitted filters (including inactive-zero inclusion), and scroll position, refreshing quantities from current inventory (D-082). Retaining filters is an explicit user priority. Preserve criteria and position, not a saved quantity snapshot. This return refresh is distinct from the fresh initial opening and unsubmitted edits, which do not query under D-078.

Also preserve pending search text and filter edits separately from submitted criteria (D-087). On return, refresh the results using the submitted criteria, restore pending inputs in the controls, and retain the changed-settings notice. Restore the filter panel closed, with its count and active indicator (D-088). Do not apply pending edits until Search/Enter or Show All. Download continues to export displayed results. Reopening the application restores settings but no results until explicit submission, unlike return navigation within the current browsing flow.

## CSV download

Always show Download at the bottom of the listing. Enable it only when item results are displayed. Export the displayed result set and values in displayed order, with separate Category and Collection columns instead of heading rows, plus the displayed item/quantity fields. Export numeric zeros as `0`, not dashes. Download does not apply pending search/filter edits or run a fresh inventory search (D-083); the user reviews results before downloading them. Matching the displayed values is not a requirement to persist quantity snapshots in saved searches or count worksheets.

Download exports the entire displayed listing, including rows below the visible screen (D-085). There are no separate result pages. This reconciles D-076's all-matching-items scope with D-083's requirement to export the reviewed result set and values.

## Observable acceptance examples

- With the filter panel expanded, Search/Enter or Show All applies the criteria and closes the panel, retaining selections and the active count (D-089).
- Collection labels read alphabetically down each column, then continue in the next. Desktop/narrow/phone layouts use three/two/one columns while retaining alphabetical keyboard order (D-090).

- Initial opening does not load item results and shows the search prompt. Editing text or selecting multiple filters does not run a query; Search/Enter or Show All applies the chosen criteria.
- Initial opening, Reset, and an empty search retain the table with instructions and a visible disabled Download button. Displaying item results enables Download.
- After displaying ribbons, changing the search/filter inputs to buttons without submitting leaves ribbons displayed with the changed-settings notice. Download exports the displayed ribbon rows and quantities; it does not search for buttons or silently refresh quantities.
- Selecting two collections and searching a term returns matches within either selected collection, without case-sensitive exclusions.
- Show All removes a search term while preserving collection restrictions and runs the query. Clear filters unchecks collections and the inactive-zero option while retaining search text and leaving results unrefreshed. Reset clears search/filters and removes results, restoring the initial prompt. Clear filters and Reset run no query.
- An active zero-stock item and an inactive negative-stock item remain eligible. An inactive zero-stock item is excluded by default and becomes eligible when the inclusion option is selected.
- An inactive item with only an Ordered balance remains eligible. An inactive item with +10 at Central and −10 at Indy remains eligible even though its net quantity is zero. Only zero in every current balance permits default exclusion.
- With 100 at Central, 20 at a remote store, 30 at an active event, 40 in relocation In Transit, and 50 Ordered, Available is 120; other quantities remain separate.
- Zero cells show `—`, negatives remain visible, and exported zero cells contain `0`.
- A ribbon-only search hides Ordered when only buttons are on order. Each active-event column and In Transit likewise appear only when a matching item has a nonzero quantity in that column, including a negative quantity.
- Item-name and storage-location-heading links open their respective detail/inventory pages without changing stock.
- After opening an item or location from filtered results, returning restores the last submitted search, collection choices, inactive-zero option, and scroll position, with current quantities. Users do not need to reconstruct their search.
- With ribbon results displayed, edit the inputs to buttons without submitting, then open an item or location page and return. The controls retain the pending button criteria and the changed-settings notice, while the results still show ribbons using current quantities. Download exports those ribbon results until a new query is submitted.
- Export matches the displayed result set and values in their displayed order, retaining Category and Collection as data fields.
- A search matching all approximately 225 items shows every matching row in one scrollable table, with no pagination controls. Download includes every row in that listing, even when only part of it is visible on screen.
- Desktop/laptop use is the primary layout target. On a phone or tablet, users can still reach and use search, filters, results, detail links, and Download; a less convenient layout is acceptable (D-086).
- Select five collections, expand the filter panel, and open an item page. Returning retains the selections and browsing context but closes the panel; its trigger indicates five selected and is highlighted. Reopening the application likewise restores the settings with the panel closed, but shows no results until submission. With only the inactive-zero option enabled, the trigger still indicates an active filter visually.

## Remaining specification work

Use Q-040 in the single [Open Questions](../status/Open%20Questions.md) register for error behavior and any necessary persistence details. Empty-table instructions, disabled Download, and the pending-input notice/export behavior are settled in D-083; D-085 confirms no pagination and export of the full listing. D-082/D-087 settle return navigation; D-088 confirms remembered settings across reopening, a closed filter panel on return/reopening, and an active-filter indicator. Q-024 covers remaining volume/device/performance constraints; Q-011 retains access questions. No application implementation is authorized.



## Item-view Category and Collection links — D-101

Category and Collection values on an item view link to submitted matching searches. A Category link matches that category; a Collection link matches both category and collection. Following the link is an explicit search submission, with results shown and filters closed. Normal item eligibility rules still apply. The mockup demonstrates this with selected collection filters; its independent sample dataset may have no matches for an edited item's classification.


### Location order clarification — D-111

Central is the first storage-location column; all other storage locations follow alphabetically. Relevant active events follow alphabetically, then In Transit and Ordered. Preserve the existing nonzero/matching-item visibility rules. Each collection-filter checkbox remains on its own line within the D-090 column flow. CSV follows the same displayed column order with quantities still associated with the correct location.

## Location column selection — D-113

The filter panel lists all storage locations in one column and active events, In Transit, and Ordered in a separate column, in D-111 order. Location selections control displayed columns, not which items match. With none selected, display only location/event/pending columns with a nonzero balance among matching rows. Explicit selections display exactly those columns, even when all their values are zero; selecting all storage locations does not show unselected events or pending areas. This supersedes earlier always-visible storage-column and conditional-extra-column rules when an explicit selection is made. Available retains its full storage total regardless of visible columns. Search/Show All submit these choices; Clear filters and Reset clear them; pending edits do not alter displayed results or CSV. CSV follows the displayed columns. Item views retain all storage locations and other details, independent of index selections.
