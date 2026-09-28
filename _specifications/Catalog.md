# Catalog

Document state: **Draft**. Scope authorized 2026-09-28 (D-117); assembled specification not approved.

[Mockup](../public/catalog/index.html) · [Usage/source notes](../public/catalog/README.md) · [Questions](../status/Open%20Questions.md) · [Decisions](../status/Decisions.md).

## Scope and authorized users

Manage Categories and Collections through create, view, update, set inactive and archive. Create Items here; use Item & History for viewing, editing, setting inactive and inventory work. The mockup exposes actions without resolving who may manage catalog records. Broader permissions and direct Unit Cost edit authority remain postponed.

## Workflow and fields

Categories contain Collections. Collections contain Items and provide their SKU prefix. Category details show name, optional description, status and child Collections. Collection details additionally show parent Category, prefix and child Items. Lists show counts and compact statuses; detail titles show enlarged statuses. Create/edit uses separate steps with Cancel and Create/Save actions.

Item creation follows the existing item detail fields: full name, Category, Collection, variety, SKU suffix, purpose, programs, optional request bundle type/quantity, IRS FMV, In-Person Ask, Online Ask and notes. The preview combines the Collection prefix and suffix. Blank optional values stay distinct from zero. Unit Cost starts blank, without choosing edit authority. A new Item starts with zero stock and empty adjustment History.

The contextual Item & History link opens the newly created Item, preserving its identity through details edits, inventory review and saved adjustments. The default Item & History URL continues to show the independent ribbon fixture. No production integration or cross-workflow sample synchronization is implied.

## Lifecycle and exceptional cases

Inactive/archive actions retain records. In this draft they change only the selected Category or Collection; lists and parent selectors continue showing every status. Item lifecycle effects on searches and all other usages are explicitly deferred. Parent/child propagation is not settled. Catalog metadata actions do not move inventory or recalculate cost.

**Agent Suggestions, not approved rules:** require a nonblank name; reject duplicate Category names and duplicate Collection names within the same Category; require a Collection prefix and Item SKU suffix; reject duplicate full Item SKUs; confirm Archive; allow Restore to Inactive. The mockup restricts prefix characters to letters/numbers/hyphens and does not permit changing a populated Collection's prefix while SKU migration remains unresolved (Q-015). Optional numeric values reject negatives/non-numbers; bundle quantity is a whole number.

Cancel warns before discarding changed form values. Invalid input keeps the form and displays an error. Storage failure displays an error and avoids claiming persistence. Local browser persistence is a prototype convenience, not an application storage requirement.

## Observable acceptance examples

1. Create a Category and Collection, then reopen and update each; associations and counts remain correct.
2. Set either inactive and archive it; its record and child data remain available. In this draft, restoring yields Inactive and Set active is a separate action.
3. Create an Item with blank cost and optional explicit zero value; Item & History shows that Item, zero stock, blank cost and the explicit zero without substituting the ribbon fixture.
4. Edit the Item or save a reviewed inventory adjustment in Item & History; reopen its Catalog link and see the saved data. The default ribbon example is unchanged.
5. Lifecycle actions do not change quantities or hide records in other mockups. This pass does not decide downstream lifecycle behavior, permission assignment or release scope.

Unresolved catalog questions remain in the existing Q-015–Q-019 register; the user-directed discussion deferral is FI-003.
