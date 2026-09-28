# Catalog mockup

Document state: **Draft**. [Open](index.html) · [Specification](../../_specifications/Catalog.md) · [All mockups](../README.md).

Use Categories, Collections and Items to navigate. Category and Collection names open detail pages with Edit, Set inactive/Set active and Archive. Archive retains the record and children; Restore returns it to Inactive. Create a Collection within a Category, then create an Item within that Collection, or use the corresponding top-level section.

New Items start at zero inventory with no Unit Cost. Their Item & History link opens their own data, with existing details/inventory editors and immutable adjustment History. These contextual records do not replace the default ribbon example or enter the Inventory index, purchase, relocation or count fixtures. Refresh/reselect the Items section after editing in another tab.

## Draft choices and limits

- **Agent Suggestions:** required unique Category names, Collection names unique within their Category, required Collection prefix, unique Item SKU, archive confirmation, and Restore-to-Inactive. Prefix characters are letters/numbers/hyphens; existing item value validation follows the details editor.
- Prefix changes on Collections containing Items are disabled pending the existing SKU migration question. Renaming Category/Collection retains stable child associations.
- Lifecycle actions change only the selected record. All statuses stay visible/selectable here; child propagation and effects on searches/other workflows are not specified by this prototype.
- Item inactive/archive effects are explicitly deferred by the user. No Item archive workflow is introduced. Existing Item & History can set inactive.
- Permissions and who directly edits Unit Cost remain postponed. Controls here demonstrate functionality, not role authority. Unit Cost is not entered during creation.
- Browser-local storage uses `tg-catalog-draft-v1`, scoped by the optional sample query. New sample opens an independent sample. Serve Catalog and Item & History from the same origin; storage support for direct file URLs varies. Storage errors are shown rather than silently claiming a save.

## Sources and verification

`catalog-model.js` holds the small local data model; `mockup.js` renders workflows; `sample-session.js` scopes demo samples. `../item-view/inventory-model.js` handles contextual Item & History persistence. Presentation uses only `../css/style.css` and the shared layout adapter; maintain the [style guide](../css/style-guide.html) alongside changes.

Verification: `work/check-catalog.cjs` covers lifecycle preservation, validation, zero/blank values, contextual persistence and separation from the default item fixture. Chrome walkthrough covers create/edit, lifecycle actions and Item & History handoff. This is a planning artifact, not application implementation.
