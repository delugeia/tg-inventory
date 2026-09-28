# Data import and legacy data review

Document state: **Draft**. Review authorized 2026-09-28 by D-121. All design/import-policy recommendations below are **Agent Suggestions**, not approved requirements. No application development or mockup changes were made.

[Import package and data dictionary](../_data/data-for-import/README.md) · [Open Questions](../status/Open%20Questions.md) · [Future Ideas](../status/Future%20Ideas.md) · [Catalog](Catalog.md) · [Location inventory and ledger](Location%20Inventory%20and%20Item%20Ledger.md) · [Purchase entry](Purchase%20Entry%20and%20Receiving.md).

The import package is local-only under ignored `_data/`. Its links require a local copy. This document contains aggregate findings and source coordinates so it remains useful in the public repository without publishing the source workbooks.

## Outcome and scope

Reviewed all 17 sheets across `main-inventory.xlsx`, `shipping-materials.xlsx` and `games.xlsx`, including table extents, non-table populated cells, duplicate identifiers, formulas and cached results. Created linked CSVs with source hashes and exact worksheet/row/cell provenance. Preserved source files unchanged. No real stock, cost, order or application user was changed.

Limited ULINE browser review covered the two recent visible orders (nine lines) and three model pages. No other shipping-material websites were consulted. The product observations and order excerpts are supplemental evidence, not a full account export or replacements for historical costs.

| Source | Catalog result | Other retained evidence |
| --- | --- | --- |
| Main inventory | 136 distinct items from 158 Catalog rows: 21 headings and 137 item occurrences, with one repeated identifier | Five location sheets; inventory summary; 80 purchase lines; 79 Shopify rows; side-copy and costing/lookup scratch areas |
| Shipping materials | 31 types, including six models not beginning `S-` | Current sheet, OLD, overlapping order exports, PurchasedProducts price summary, weight research |
| Donated games | 26 titles, three with zero available | 341 units recorded 2025-02-01; MSRP extended value $9,678.62; organization aliases; US-state lookup |
| Combined draft | **193 distinct items** | **326 main location opening candidates**, **104 historical purchase lines** in **32 provisional order groups**, all 9,904 populated workbook cells |

These counts refine the earlier rough scale estimate in D-084/Q-024; they do not prove that the spreadsheets contain every item currently held. The draft has 31 CSV files, most for optional reference/evidence. Start a future staging test with catalog, location and provenance files; do not create permanent database tables for every audit CSV.

## Findings and proposed handling

### 1. Identity and catalog grouping

**Evidence.** Main `Catalog!126` and `Catalog!157` both identify `DN_SQTR`. Summary rows 127/128 repeat it. Several location sheets repeat it too. `AAAA` suffix rows are section headings, not item types. The RS prefix has a Sponsor item but no dedicated heading. Labels such as Ally and Gaymer are repeated legitimately across Buttons, Wristbands and ribbon groups.

**Agent Suggestion.** Use a permanent item identity distinct from SKU and retain legacy aliases. Consolidate exact duplicate catalog identifiers into one draft item with all source links, but require review of every duplicate item/location count. Treat legacy CatID as a proposed Collection grouping because D-099 makes the SKU prefix Collection-owned. Use a reversible broad Category for the old catalog until the user chooses a meaningful hierarchy. Preserve the underscore separator in old SKUs unless the user approves migration. Shipping supplier models and future internal SKUs are separate fields.

**Design impact.** Catalog import/review needs source identifier, candidate target and duplicate resolution; ordinary Catalog editing need not show migration fields. The currently demonstrated prefix validation excludes underscores, and required prefixes/suffixes leave 57 shipping/game items without approved SKUs. Settle Q-015 before turning the CSV proposal into final application records. Source descriptions should be retained; decide separately whether to build contextual Full Names and varieties. Do not merge same-name products across collections.

### 2. Counts, blanks, duplicate lookups and migration date

**Evidence.** Summing main `Inventory` gives 202,994 units; the unique-item total is 202,992. The extra two come from the repeated terminal row. Raw location numeric rows total 203,164. The additional 172 are in the second Indianapolis Gaming Safe Space block: `Indy!D132=1`, `D133=86`, `D134=85`, while the first matching rows 106–108 are blank. Summary XLOOKUP selects the earlier matches. The draft excludes those ambiguous pairs rather than choosing a count. See `duplicate_identifiers.csv` and all 680 comparisons in `quantity_reconciliation.csv`.

Location dates are inconsistent: Ames records 2025-02-05 in K2, Indianapolis 2026-03-04 in F2, Milwaukee 2025-10-05 in F2, and Central/Boston have no equivalent explicit date. Dates are worksheet metadata, not evidence that each cell was physically counted then. Games Updated is 2025-02-01. The current Shipping sheet is undated; OLD has dated entries. File modification time is not a stock date.

**Agent Suggestion.** Retain observation dates and uncertainty in staging. Require a confirmed cutover count or an explicitly selected historical baseline before production posting. Keep blank distinct from explicit zero: an all-blank pack formula yielding zero is not proof of a zero physical count. Use unique item/location candidates and D-039's existing correction workflow with `starting inventory`; post on the actual execution date. The 326 rows are useful as an isolated historical test fixture, not a current stock assertion.

**Design impact.** A one-time import preview should show unresolved duplicates and missing mappings. No new ongoing snapshot, intervening-movement warning or stale-count reconciliation workflow is proposed; D-031 remains unchanged. Quantity entry stays in individual units under D-032. Opening stock and history replay must be mutually exclusive strategies; this draft selects opening stock plus non-posting historical references.

### 3. Historical cost is not a current weighted average

**Evidence.** Main `Inventory!L` uses the last matching purchase row's UnitValue; it is not weighted averaging. **82 summary rows** have no matching purchase and therefore receive the lookup's default zero. `Purchases!8` has neither TotalCost nor TotalQty; IFERROR returns zero UnitValue. The main purchase ledger stops in May 2024 while the catalog/count evidence extends later. **88 summary rows** have negative Purchased-minus-remaining `Dist`, including duplicated summary rows; this is an arithmetic residual, not a movement journal.

**Agent Suggestion.** Preserve explicit zero-cost source lines, missing inputs and absent purchase records as different cases. Keep unknown opening Unit Cost blank. Present last recorded acquisition rate as an optional reference, never silently call it the current average. Do not reconstruct distributions or recalculate current Unit Cost from the incomplete ledger. Resolve opening costs separately from quantity posting with the already postponed authority/valuation questions.

**Design impact.** The existing blank-versus-zero details behavior fits. Import review needs a cost-basis choice, not a new valuation algorithm in ordinary item screens. Keep historical price evidence out of In-Person Ask/Online Ask. Sponsor token denomination in its description is not a donation ask, market value or cash balance.

### 4. Donations and MSRP

**Evidence.** Games has Description, Donor, Avail, MSRP and Value. Per the user's explicit description, manufacturers donated these games and MSRP is used for insurance and IRS value. There are no gift receipt dates, original donated quantities, acquisition expenses or locations. The source's Updated date cannot supply those missing facts.

**Agent Suggestion.** Preserve the organization alias, source MSRP, valuation date/basis and source quantity independently. Draft `items.csv` maps the given MSRP to IRS FMV following the described practice, while `item_values.csv` preserves its identity as MSRP. Unit Cost and both asks remain blank. Insurance reference valuation can use that same MSRP basis without inventing a replacement-cost or tax formula. Retain donor abbreviations for review rather than expanding them by guesswork.

**Design impact.** Optional donor/manufacturer organization association and dated MSRP/valuation basis are the meaningful gaps. A future donation receipt workflow would need separate facts and authorization; a donated item must not be fabricated as an old Received purchase with guessed dates or quantities. This is a data-model recommendation, not tax guidance.

### 5. Shipping supplies, dimensions and price units

**Evidence.** Current `Shipping!K` sums I+J, totaling 62. All I entries are blank. H (`OR`) is omitted and includes negative entries; its meaning is unresolved. Do not map the person-labelled column to Ames or the storage-labelled column to Central by assumption. Stock yes/NO/blank and acquisition labels such as upcycled/free also do not define application lifecycle, cost or purchase status.

The data includes internal/external dimensions, adjustable depths, outside cubic feet, empty/padded weight estimates and informal intended-use notes. Shipping F/G apply one corrugated-box formula, including a 10% packed-weight allowance, even to padded and flat mailers. Five mailers have height zero. The Box Weight worksheet contains three sample models and a fitted estimate, not a verified weighing system for all packaging.

Two `PurchasedProducts` rows label 64 and 92 as Unit Price for 100-count mailer purchases. Matching order lines establish 0.64 and 0.92 per individual mailer (`PurchasedProducts!C8:D8`, `C14:D14`; `ULINE!F8:G8`, `F7:G7`). Preserve the source label and normalized price basis in import evidence. Do not multiply already individual order quantities by bundle size.

**Confirmed clarification — D-122:** ULINE order 9758475 lists 100 S-967 mailers with U/M C and Unit Price 92.00. Enter/store the purchase unit price as **$0.92 per individual mailer**. The user confirms this is understood at data entry and requires **no mockup or process change**. Source pricing-basis evidence is not a requirement for new operational fields, denominator controls or automatic conversion. Existing receipt costing remains unchanged.

**Agent Suggestion.** Model a shipping container as an ordinary counted Item with optional product details: supplier/model, dimension values and unit, internal/external distinction, configurable depths, measured/estimated weight basis, and purchasing pack quantity. Preserve arbitrary fit/use notes as text initially. This supports the data without making every item form require box dimensions. Keep item count, purchase bundle quantity, bundle weight, unit weight and packed shipment weight distinct.

**Design impact.** Suggest a compact optional Shipping details section and a vendor-model reference in a future mockup revision. Do not implement rate shopping, automatic container selection, enforced fit, order scraping or recurring price synchronization. Automated weight/fit ideas remain unaccepted in FI-004. A decision is still needed about when consumed/reused shipping supplies leave inventory; do not silently consume a box when a relocation is shipped.

### 6. Limited ULINE checks

The 2025-06-05 and 2025-09-18 orders contribute eight shipping-item lines absent from the workbook's older order references, plus one promotional item. Historical order-line totals/individual quantities supply their rates. They remain historical references, not missing stock to add today. No freight/tax totals or receipt dates were inferred.

- [S-4484](https://www.uline.com/Product/Detail/S-4484): internal 9×6×4 inches; external 9.375×6.375×4.625, consistent with the sheet. Observed unit weight 0.31 lb differs from 7 lb per 25-box bundle divided by quantity; preserve both separately.
- [S-167](https://www.uline.com/Product/Detail/S-167): 12.5×12.5 inches with adjustable 0.5/1-inch depth and a 100-mailer bundle. The inspected page did not verify external dimensions. `Shipping!Q19=19.75` remains suspect, not automatically corrected.
- [S-4147](https://www.uline.com/Product/Detail/S-4147): external height 10.625 inches, while `Shipping!R8=8.625`. The observations file records both; the original source remains unchanged.

Observed on 2026-09-28. Product-page asking prices are current vendor quotes, not the organization's acquisition costs. [Order history](https://www.uline.com/MyAccount/MyOrderHistory) is an account-dependent partial sample. No other shipping websites were browsed.

### 7. Shopify, packs and kits

**Evidence.** Shopify has 79 rows. Sixty have either an exact main SKU or a numeric pack suffix that can identify a candidate base item; 19 remain unmapped. Variants include `-100`/`-1250`, repeated GA-SAMPLE/PN-SAMPLE kits, missing SKUs, old aliases, and apparent naming mismatches such as BU_GSS/EP_GSS versus the current Gaming Safe Space items. Many source labels contain encoding artifacts. The test lookup column has 79 saved `#REF!` errors.

**Agent Suggestion.** Retain external channel/product/variant identifiers and source labels as alias evidence. Confirm apparent old aliases manually. Preserve numeric pack factors as candidates, without summing multiple listings or converting channel availability into location stock. Mixed-kit composition requires Q-016; do not infer bill-of-material contents or subtract components. Correct mojibake only in a reviewed display label while retaining source text.

**Design impact.** Existing request bundle convenience can cover a simple pack, but an external variant alias and optional quantity-per-listing relation are separate metadata. Shopify synchronization remains Q-022; this import does not authorize it. No additional marketplace APIs are necessary to retain the data now.

### 8. Data to retain as evidence without importing into operational tables

| Data | Draft treatment and reason |
| --- | --- |
| Section headings and SORT/sort strings | Preserve grouping/order clues. Do not create phantom stock items or treat a sort number as identity. |
| Inventory summaries and formula Value/Dist | Keep controls and source provenance. Do not add alongside underlying counts or turn Dist into ledger events. |
| Shipping OLD and Ames M:P side copy | Keep historical evidence; exclude from opening candidates. No assumption that a newer tab date makes every cell more reliable. |
| ULINE/Shipping/MyOrderHistory overlapping lines | Link copies to one historical order line. PurchasedProducts is a summary, not another purchase. |
| Three supplier-only products | Retain unmapped history: promotional calendar, pail and promotional bag. Do not automatically create active catalog items. |
| Games US-state lookup | Preserve as source evidence only. It contains no item/location stock. |
| Purchase scratch areas | Preserve charge components and mappings. Only four adjacent rows align by quantity/total; others stay unassociated. |
| 87 saved formula errors | Retain coordinates/expressions for audit; exclude from numeric import values. Do not repair and resave the user's sources. |
| Person-labelled source headings/access details | Keep restricted crosswalk only in `_secrets`; use neutral references in derivatives. Do not create application users, permissions or public fixtures from source identities. |

None of these dispositions deletes source data. Raw nonempty cells and the originals remain available for a different user decision.

## Proposed future import behavior

**Authorized users:** unresolved. Reuse whatever import/admin authority the user eventually approves in Q-011/Q-021; do not infer it from spreadsheet custodians or sample managers. An authorized reviewer must be able to accept/reject individual mappings and review a batch before posting.

**Workflow (Agent Suggestion):** upload supported CSV package; parse into staging; show concise counts and mapping/errors; resolve only issues relevant to the selected load; preview resulting catalog/stock/cost changes; explicitly confirm; apply a logged batch. Keep explanations optional and default screens simple. Source evidence can be expandable or downloadable rather than cluttering ordinary item pages.

**Inventory effects:** catalog/reference import alone changes no quantities. Approved opening quantities post once as D-039 corrections. Historical purchase/channel/old-count files have none. Reimport of the same approved batch must not duplicate stock or events. Unit Cost changes use the ultimately authorized cost procedure; they are not an incidental side effect of reading reference files.

**Exceptional cases:** duplicate identity/location rows; required SKUs absent; blank versus explicit zero; malformed numeric/date data; unsupported columns; repeated same-model order lines; inconsistent costs; unmapped donor/vendor aliases; partial source coverage; unknown locations; restricted source text. Keep rejected records with a clear reason. Do not turn parse failure or a missing lookup into zero. Negative recorded stock remains allowed by D-035; that does not assign a meaning to the negative OR values.

**Suggested atomicity:** validate the selected batch before posting; if a selected row fails posting, avoid a silently half-applied opening balance. Record source/batch identity and the authenticated actor without manufacturing historical actors. This is a proposed import requirement pending review, not an implementation decision.

## Observable acceptance examples for the future implementation

1. Import this catalog into staging: 193 distinct items, with 21 headings excluded and both DN_SQTR source rows linked to one candidate. Missing shipping/game SKUs remain visible for resolution.
2. Parse `0`, blank, `null` JSON and empty-string JSON without conflating them. An empty-input calculated zero is not offered as a measured count by default.
3. Show Indianapolis duplicate rows together. Neither the first blank nor the later 1/86/85 wins automatically; reviewer resolution is explicit and traceable.
4. Preview 326 historical test openings totaling 202,992 without adding the old Indianapolis duplicate block, games, shipping, channel availability or purchase receipts. Require approved current values or explicit historical-baseline acceptance before production.
5. Load 104 historical purchase lines with no quantity/cost posting. Two overlapping shipping copies point to one line. A repeated order reference on different dates remains reviewable.
6. Display a purchased-product price of 64 per 100 beside the derived 0.64 each without multiplying the individual quantity a second time. Preserve source amounts.
7. Preserve game MSRP and its stated IRS/insurance use, keep Unit Cost blank, and do not invent a donation date from Updated.
8. Load reference files twice without adding physical stock. Submit the same approved opening batch twice without a second posting; changing source identity requires a reviewed new batch.
9. Read every CSV using standard quoting/UTF-8 rules, preserve decimal precision and order/identifier text, and never execute a source formula.
10. Keep source workbooks and their hashes unchanged, show batch-level counts/rejections, and retain imported source links without publishing local-only evidence.

## Verification and limits

The builder's 539 checks cover catalog identifier composition, source pack arithmetic, historical per-unit arithmetic, shipping totals, game MSRP totals, and basic key/foreign-key integrity. Original source hashes are pinned so a changed workbook cannot be silently processed with old table ranges. Saved source errors and deliberate blank formula results remain explicit. No Excel formulas were recalculated in or written back to the originals.

An independent package verifier additionally checks CSV shape/hashes, key/relationship integrity, workbook-cell coverage, source preservation, eligibility exclusions and repeatability. Its results are recorded beside the import package. No end-to-end application importer exists, and no stock count, tax calculation, donation receipt or production valuation is certified by these checks.

Review priorities are maintained only in [Open Questions](../status/Open%20Questions.md). The most valuable next decisions are duplicate/count resolution, shipping/game locations, opening cost policy, and final identity/taxonomy mappings. Source enrichment can follow; no need to broaden the application merely to accommodate every spreadsheet helper column.
