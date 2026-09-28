# Event reconciliation and report correction

State: Draft. Created 2026-09-27 UTC. **Agent Suggestion** for a very useful additional mockup under D-103, grounded in already-confirmed event decisions. [Open](index.html). Separate local sample; files: index.html, ../css/style.css, mockup.js. No implementation authorization.

The sample starts with an **already-active** Gen Con event, 8,250 ribbons and 150 pins. Its source deductions have conceptually happened before the demo begins. Creation, planning, activation and full event management are outside this focused reconciliation draft; their D-037 rules are unchanged. Fictional contributions are illustrative, not an exact reproduction of D-020's four-source example.

## Try it

1. Enter zero remaining for pins; leave ribbons blank. Save progress and reload: zero remains distinct from uncounted; nothing is finalized.
2. Enter 1,800 ribbons. Default destination is the initial source, Indianapolis IN. Add a destination; allocate 800 Indianapolis IN and 1,000 Milwaukee WI. After manual edits/splits, count changes do not silently rebalance allocations. Incomplete allocation saves but blocks finalization.
3. Record an additional known-source delivery if needed. It immediately moves stock into this event and updates total brought; remaining counts are separate. Unknown/external source illustrates an Adjustment without a fictional source deduction. Recovered-material cost is unresolved; this known-cost sample preserves current catalog cost as an Agent Suggestion.
4. Review finalization. Explicit final confirmation records distribution, moves leftovers directly to storage (no In Transit), and finalizes once.
5. Print/download the distribution-only report. Correct report quantities with an optional explanation: the report is flagged, changes are logged, and original inventory History stays untouched. View posting record before/after to compare.

Confirmed: D-013–D-025, D-028, D-038. **Agent Suggestions**: row layout; counts default the single untouched allocation; nonnegative integer/remaining≤brought guardrails; correction form fields; sample timestamps/actors and zero-distribution omission; minimal delivery interaction. Initial finalization authority is still Q-011; no new permission is granted by showing the control. Direct event destinations and excess-count exceptions remain Q-029/Q-032. No separate loss/damage category or reopening.

Storage key `tg-event-reconciliation-v2`; other mockups stay independent. The original posting and corrected report are separate demo objects. This event's saved provisional counts are appropriate to D-013 and are not location worksheet snapshots. Saved correction logs and stock/cost History have no edit/delete control. The report links lightly to independent location/item adjustments without auto-posting corrections there.

Sources: [Event Reconciliation specification](../../_specifications/Event%20Reconciliation.md), [Decisions](../../status/Decisions.md), [Rough Notes Review](../../_specifications/Rough%20Notes%20Review.md), [Mockup index](../README.md). Verification limits are recorded in the staged handoff.

## Verification — 2026-09-27

Browser checked saved blank/zero, incomplete allocation blocking, split finalization, corrected-report flag/log and unchanged posting record. Model checks additionally confirm unchanged storage/event quantities, costs/history and original posting after report correction. JavaScript syntax passed. See the [staged handoff](../../handoff/2026-09-27-002618Z-handoff.md) for full scope and limits. Physical printing and completed CSV file-save were not verified. Existing mockups were not reset.

## Grading refinements — 2026-09-27

Additional delivery uses a modal that preserves unsaved reconciliation counts and their dirty state. Storage errors remain visible. The posting record shows the saved actor and optional explanation. Confirmation buttons name their action. These UI refinements are Agent Suggestions for review. See the [shared assessment](../README.md#agent-assessment--2026-09-27) for the grade and remaining considerations.

**New sample** opens an independent example in a new tab without clearing existing work. The added source file `sample-session.js` selects a storage-key suffix from the `sample` URL parameter; preserve that URL to revisit its sample. Existing base-key examples remain available at the ordinary URL. All sample storage is browser-local, not application storage.

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.
