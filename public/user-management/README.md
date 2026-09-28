# User management

State: Draft. Created 2026-09-27 UTC. [Open](index.html). Standalone HTML/CSS/JavaScript; no server, sign-in connection, or application implementation.

The index lists all 21 people from [sample-names.md](../../_data/sample-names.md) and their draft roles. The mockup-info selector starts as **User** on every visit/reload; **Admin** exposes a compact draft-role reference and per-user Edit roles. Save persists the selected roles locally; Cancel/Escape leave them unchanged. Roles are Officer, Manager, Procurement, and Admin. Named managers/admins follow the sample-name document; other fixture assignments are illustrative. No production role policy or direct Unit Cost authority is established.

[My profile](profile.html) retains the original own-name Save/Discard workflow and read-only Microsoft email/access. Its original storage key and saved names remain intact. Role changes use a separate `tg-user-role-draft-v1` key and do not change other mockups or historical actors.

Use Save, change a name again, then Discard changes. Reload retains the saved name when browser local storage is available. The isolated key is `tg-user-profile-draft-v2`; this demo does not change other mockups or historical actors. Unsaved navigation uses the browser's own warning. A storage error is reported rather than claiming persistence. Names are not required in this draft; name validation remains open.

Sources: [User Management specification](../../_specifications/User%20Management.md), D-103/D-104 in [Decisions](../../status/Decisions.md), Q-009–Q-011 in [Open Questions](../../status/Open%20Questions.md). Active files: index.html, ../css/style.css, mockup.js. [Mockup index](../README.md).

Verification is recorded in the final staged handoff and current status. Fictional example.org identities are deliberate.

## Verification — 2026-09-27

Browser checked own-name Save, Discard, reload persistence, disabled permission examples, and desktop layout. JavaScript syntax passed. See the [staged handoff](../../handoff/2026-09-27-002618Z-handoff.md) for full scope and limits. Physical printing and completed CSV file-save were not verified. Existing mockups were not reset.

## Grading refinements — 2026-09-27

Error notices now announce and focus validation; discard buttons name their action. These UI refinements are Agent Suggestions for review. See the [shared assessment](../README.md#agent-assessment--2026-09-27) for the grade and remaining considerations.

**New sample** opens an independent example in a new tab without clearing existing work. The added source file `sample-session.js` selects a storage-key suffix from the `sample` URL parameter; preserve that URL to revisit its sample. Existing base-key examples remain available at the ordinary URL. All sample storage is browser-local, not application storage.

## Shared mockup presentation

Pages use [style.css](../css/style.css) and the [style guide](../css/style-guide.html) and [mockup-layout.js](../mockup-layout.js) for the consistent navigation/title/intro header and compact yellow `mockup-info` banner. Existing demo controls and brief instructions live there; dynamic steps show their own relevant notes. Dialogs may have a local banner when needed. Success, warning, error, and irreversible-action notices retain their workflow context and colors. The shared files do not manage application data. Documentation links appear here rather than in the mockup UI.

The Admin-only draft-role reference is in mockup-info. Production permission boundaries and direct Unit Cost authority remain unresolved.

Keep shared components and theme values in `../css/style.css`. Update `../css/style-guide.html` alongside visual changes; use no local theme stylesheet or inline styling. Page/section actions align right, primary last; Cancel/Discard are red, and page status belongs beside the title. Preserve workflow-specific labels for transitions and irreversible actions.
