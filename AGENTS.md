# Guidance for agents

Read `README.md` first for the project overview and then `status/Current Status.md` for the current stage, completed work, and next steps. Follow their links to relevant documents instead of scanning the entire project tree.

At the start of each new agent/chat, before updating any working status documents, copy all top-level files in `status/` into `status/_archive/YYYY-MM-DD-HHmmssZ/` using the UTC creation timestamp. Do not copy the archive recursively. Preserve snapshot contents; use a fresh timestamp if the folder already exists. If the agent makes no status changes, no snapshot is needed. Snapshot once per agent/chat before its first status update, not before every edit.

The single working set is `status/Current Status.md`, `status/Decisions.md`, `status/Open Questions.md`, and `status/Future Ideas.md`. Update these in place; do not create competing decision, question, or future-idea lists. Keep stable IDs and record resolved questions with their decision references. Record deferred features in Future Ideas, distinguishing user-directed deferrals from unaccepted Agent Suggestions or Agent Ideas.

## Planning approval

- Product simplicity is an explicit user priority. Keep manager corrections easy and explanations optional. Current event finalization/correction rules are in D-028: finalize once with a prominent confirmation, never reopen, and make later flagged event corrections update reports only. Inventory corrections are separate manual location adjustments; do not revive superseded D-026 automatic correction posting.

- Keep the Next questions section at the top of `status/Open Questions.md` updated with the current question and a short queue of upcoming questions. The user leaves this file open in Typora to think ahead. Advance the queue as answers are recorded and keep it consistent with the full register and current status. Do not create a separate competing agenda file.

- The user approves the first run of specifications. Other officers will review and revise later; the user has final approval authority before development begins.
- Use document states `Draft`, `Ready for review`, and `Approved`. Only mark a document Approved when the user explicitly approves it; record the approval date and scope.
- Label unaccepted agent-generated proposals `Agent Suggestion` or `Agent Idea`. A document's review state does not imply approval of its proposals.
- Aim for exhaustive specifications; determine release scope during requirements review and gather constraints as planning proceeds.
- Each feature specification must eventually cover authorized users, workflow, inventory effects, exceptional cases, and observable acceptance criteria.

For a task transition, read the handoff linked from current status, or a specific handoff supplied by the user. If neither is provided, inspect only `handoff/` and select the newest relevant handoff by filename. Current user instructions and current status take precedence over historical handoffs.

## Handoff convention

- Store transition notes in `handoff/` using `YYYY-MM-DD-HHmmssZ-handoff.md`, with the UTC timestamp at creation (for example, `2026-09-22-190953Z-handoff.md`). Keep the original filename when updating that note. If a filename already exists, use a fresh timestamp rather than overwriting another handoff.
- When preparing a handoff, include the objective and scope, confirmed decisions and constraints, completed work, relevant file links, open questions or blockers, and the next concrete steps. Clearly label proposals and unverified assumptions.
- Keep handoffs concise and task-specific; link to source documents instead of copying them or reproducing the conversation.
- Update current status with a link to the relevant handoff when transitioning. Handoffs are dated transition records; `status/Current Status.md` remains the current project summary.

## Working rules

- This project is maintained in the public GitHub repository [delugeia/tg-inventory](https://github.com/delugeia/tg-inventory), with this folder as the Git root, `origin` as the remote, and `main` as the shared branch. Keep project documentation consistent with its ongoing public availability.
- Keep any future secrets or PII only in the root `_secrets/` folder. Both `_secrets/` and `_private/` are ignored by Git. Never force-add them or copy their contents into tracked files, logs, screenshots, or documentation. Preserve these exclusions in future `.gitignore` edits.

- Location inventory searches store criteria only, not result or quantity snapshots. D-031 explicitly rejects intervening-movement warnings and stale-count reconciliation workflows. Keep physical-count entry simple; do not reintroduce these declined proposals as requirements.

- This project is currently in planning. Do not begin application code until the user authorizes implementation.
- Keep the root small and useful. Top-level orientation, README, agent guidance, and command files are appropriate; put supporting material in subdirectories.
- Use `_specifications/` for current material intended for the developer or Codex, including active working drafts. Move superseded drafts and discarded material to `archive/`; do not retain them in `_specifications/`.
- Keep interactive planning mockups in named subfolders of `public/`, each with an `index.html` entry point and usage/source notes. Add every future mockup to the interactive `public/index.js` navigation list in presentation order. Keep HTML, JavaScript, and CSS separate. All pages, including the wrapper, must use `public/css/style.css`; do not create local theme stylesheets or inline styles. Maintain `public/css/style-guide.html` alongside every visual change, adding examples for new components. Maintain [the mockup index](public/README.md) and references from relevant specifications and status documents. Mockups may demonstrate unaccepted proposals; they do not replace specifications or authorize application implementation. Move superseded mockups to `archive/` and update active links.
- Preserve the original rough notes in `drafts/` unless the user explicitly asks to edit them.
- Use `work/` for temporary analysis, `status/` for current progress and decisions, `archive/` for obsolete material, and `backups/` for recovery copies when needed.
- Avoid redundant documents and unnecessary backups.
- Update `status/Current Status.md` when meaningful progress, decisions, or blockers change. Keep it concise and distinguish approved decisions from proposals.
- Update the README's document links when key entry points change so future agents can orient themselves without inspecting every folder.



- Mockup presentation: use the shared `public/css/style.css`, `public/css/style-guide.html`, and `public/mockup-layout.js` on individual pages. Keep navigation/title/intro headers consistent across steps. Consolidate existing demo controls, instructions, and Agent Suggestions in compact light-yellow `mockup-info` banners with a 1px yellow border and no banner label. Sub-pages/dialogs need their own banner only when relevant. Retain normal success/warning/error/confirmation notices and purple application styling. Keep documentation links in README files, not mockup pages. Do not invent extra banner content.

- Shared presentation conventions: page/section actions align right with the primary action last; local row actions stay with their target. Use red Cancel/Discard controls, concise Save for ordinary edits, explicit verbs for workflow transitions, and statuses beside page titles. The style guide is provisional, not final design approval. Preserve quantity/costing and permission decisions while changing presentation.

- Use [_data/sample-names.md](_data/sample-names.md) as the source for all sample people, storage locations, and events. Use the listed full names and location spellings; respect listed manager associations when illustrating those relationships. Do not copy real identities from historical notes into new fixtures. The listed public places/events are intentional. Do not infer new permission rules from sample roles.

- Location display order: Central first, other storage locations alphabetically, relevant events alphabetically, In Transit, then Ordered. Use `public/inventory-order.js` across rows, columns, selectors, and destination summaries; preserve quantity associations and selected values. Retain chronological transaction History and existing conditional-visibility rules. Collection filter checkboxes each occupy their own line within their column; keep the example in the shared style guide current.

- Status badges (D-112): Draft/Request yellow; Active/Ordered/Shipped green; Received/Finalized purple. Title badges use the same colors at a larger size; table/list badges stay compact. Maintain examples and tokens in the central style guide/CSS.

- Shared print styles clear the html/body page background on every page, even with Background graphics enabled, while retaining content backgrounds. Keep this rule in public/css/style.css; the count worksheet also has its separate white screen background.

- D-115 relocation workflow: Draft/Requested/Shipped/Receiving/Complete/Cancelled. Preserve owner/any-manager Draft and receipt permissions, manager Requested edits/saved fulfillment, immutable shipped items, editable shipping metadata and item-only copies. Receiving saves are drafts; post destination inventory only on Complete. Q-012 retains discrepancies/unfulfilled remainder. Map Requested yellow, Receiving green and Complete purple in the shared style system.

- D-116: relocation Drafts use Save draft → Review request → Submit request, with Edit draft preserving input. Relocation titles are mandatory and editable by owner/any Location Manager in every stage, including Complete/Cancelled; this is the title-only exception to prior final-state action restrictions. Default index status checkboxes exclude Complete/Cancelled.

- D-117: keep Catalog in the walkthrough after Users/before Inventory. Catalog-created Items share their own browser-local record with contextual Item & History links; preserve the independent default ribbon fixture. Item lifecycle/search effects are user-postponed; do not infer cascading lifecycle or permission policies from the draft.
