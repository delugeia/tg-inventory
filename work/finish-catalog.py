from pathlib import Path
root=Path(__file__).resolve().parents[1]
def edit(path, old, new):
 p=root/path; s=p.read_text(encoding='utf-8-sig'); assert old in s, (path,old[:60]); p.write_text(s.replace(old,new),encoding='utf-8')
def append(path,text):
 p=root/path; p.write_text(p.read_text(encoding='utf-8-sig').rstrip()+'\n\n'+text+'\n',encoding='utf-8')
edit('public/item-view/inventory-model.js',"  if(catalogId && typeof document!=='undefined'){", """  if(catalogId && typeof document!=='undefined'){
    const preview=document.querySelector('.preview-note span');if(preview){for(const node of [...preview.childNodes])if(node.nodeType===3)node.textContent='Catalog sample · Saved in this browser ';}
    const note=document.querySelector('.action-preview');if(note)note.textContent='Catalog shares this item. Other mockups use separate data.';
    document.querySelectorAll('.section-heading span').forEach(node=>{if(node.textContent==='Individual ribbons')node.textContent='Individual units';});""")
edit('public/catalog/mockup.js',"<td><a href=\"${esc(itemURL(r))}\" target=\"_blank\" rel=\"noopener\">Item &amp; History ↗</a></td>","<td>${storageWarning?'Unavailable until saved':`<a href=\"${esc(itemURL(r))}\" target=\"_blank\" rel=\"noopener\">Item &amp; History ↗</a>`}</td>")
edit('public/catalog/mockup.js',"C.setStatus(state,kind,id,status);", "const wasArchived=r.status==='Archived';C.setStatus(state,kind,id,status);")
edit('public/catalog/mockup.js',"status==='Inactive'&&r.status==='Archived'", "status==='Inactive'&&wasArchived")
edit('public/css/style-guide.html','  <section id="maintenance">','''  <section id="catalog-navigation">
    <h2>Catalog section navigation</h2>
    <nav class="catalog-tabs" aria-label="Catalog example sections"><button aria-pressed="true">Categories</button><button aria-pressed="false">Collections</button><button aria-pressed="false">Items</button></nav>
    <p>Use a purple selected state and aria-pressed for local section buttons. Place the create action at the right of the section heading. Use linked names for detail views, compact status badges in tables, and the shared enlarged badge beside a detail title.</p>
    <div class="section-heading"><h3>Collections</h3><button class="primary">Create collection</button></div>
    <div class="scroll"><table><thead><tr><th>Collection</th><th>Category</th><th>SKU prefix</th><th>Items</th><th>Status</th></tr></thead><tbody><tr><td>Pronouns</td><td>Ribbons</td><td>RP_</td><td>0</td><td><span class="badge status-active">Active</span></td></tr></tbody></table></div>
    <p>Inactive and Archived badges use the neutral treatment. Keep lifecycle actions with the selected record; changing a parent status does not demonstrate a child cascade in this draft.</p>
  </section>
  <section id="maintenance">''')
edit('README.md','all eight','all nine')
append('README.md','The [Catalog draft](public/catalog/index.html) manages Categories and Collections and creates Items. Created items link to their own Item & History record. See [Catalog specification](_specifications/Catalog.md) and [usage notes](public/catalog/README.md). Lifecycle effects on searches and other workflows remain deferred (D-117).')
edit('public/README.md','| User management |','| Catalog | Draft | Create/view/edit Categories and Collections, inactive/archive actions, new Items linked to their own Item & History record. | [Open](catalog/index.html) · [Notes](catalog/README.md) · [Specification](../_specifications/Catalog.md) |\n| User management |')
append('public/README.md','Catalog is the ninth mockup, positioned after Users and before Inventory in the walkthrough. Its browser-local records are shared only with contextual Item & History links; other mockups remain independent. The earlier eight-mockup grading table predates Catalog. Serve Catalog and Item & History from the same origin for the shared-record handoff.')
p=root/'docs/Presentation Outline.md'; s=p.read_text(encoding='utf-8-sig'); import re
s=re.sub(r'## Slide (\d+)\.',lambda m:f"## Slide {int(m[1])+1 if int(m[1])>=5 else m[1]}.",s).replace('all eight','all nine')
s=s.replace('## Slide 6. Inventory index and search','''## Slide 5. Catalog

**On slide:** Categories contain Collections; Collections contain Items and own their SKU prefix.

**Demo:** Open [Catalog](../public/catalog/index.html). Create a Category and Collection, view/edit their details, set one inactive and archive it. Create an Item, then open its Item & History link to view/edit that actual item or change inventory.

**Presenter notes:** New items start with zero stock and blank Unit Cost. Catalog records persist in this browser and are separate from other workflow fixtures. Parent lifecycle changes do not cascade in this draft. Restore-to-Inactive and validation choices are Agent Suggestions. Effects of inactive/archived Items on searches and other usage remain postponed, as do broader permissions.

**Reference:** [Catalog draft](../_specifications/Catalog.md), D-117.

## Slide 6. Inventory index and search''');p.write_text(s,encoding='utf-8')
append('docs/Users Guide.md','''## Catalog — new mockup reference

Open [Catalog](../public/catalog/index.html) to create, view and edit Categories and Collections. Select a name to see its details and child records. Set inactive or Archive changes the selected record only in this draft; Restore returns an archived record to Inactive (Agent Suggestion).

Choose Items → Create item, select Category/Collection, and enter the full name and SKU suffix. The Collection supplies the prefix. Optional values preserve blank versus explicit zero. New items have zero inventory and no Unit Cost; use their Item & History link for viewing, editing, setting inactive and inventory adjustments.

**Potential hang-ups:** These records persist in this browser; New sample starts a separate Catalog. Other mockups do not receive new Catalog items. Prefix changes for populated Collections and downstream inactive/archive behavior remain undecided. Refresh the Catalog list after changing an item in another tab. See [Catalog notes](../public/catalog/README.md).''')
edit('status/Current Status.md','through D-116','through D-117')
edit('status/Current Status.md','All eight mockups are included.','All nine mockups are included, with Catalog after Users and before Inventory.')
append('status/Current Status.md','''## Catalog draft

Added [Catalog](../public/catalog/index.html) and its [Draft specification](../_specifications/Catalog.md) (D-117): Category/Collection create, view, edit, inactive/archive actions and new-item creation. New items share their own browser-local record with Item & History; the existing ribbon fixture and other workflows remain independent. Central styles, walkthrough, presentation and guide references are updated. Downstream lifecycle/search effects and broader permissions remain postponed. Restore behavior and validation are labeled Agent Suggestions in the notes.''')
append('status/Decisions.md','''## D-117 — Catalog mockup scope

Date: 2026-09-28. User-directed mockup scope; assembled specification remains Draft.

- Create a Catalog mockup for Categories, Collections and Items.
- Categories and Collections support create, view, update, set inactive and archive.
- Catalog creates new Items; viewing, editing, setting inactive and inventory changes use Item & History for now.
- Ignore inactive/archived Items’ effects on searches and other places they are used for this pass. This is a discussion deferral, not a release exclusion.
- No broader permission or direct Unit Cost authority decision is implied.

The [draft](../_specifications/Catalog.md) labels validation, restoring an archived record as Inactive and local non-cascading lifecycle behavior as Agent Suggestions/conveniences. They are not approved production policies.''')
append('status/Future Ideas.md','''## FI-003 — Catalog lifecycle effects

- Added: 2026-09-28; **user-directed discussion deferral**, not a release-scope exclusion (D-117).
- For now, ignore inactive/archived Items’ effects on searches and other usage while reviewing Catalog creation/management.
- Revisit Q-017 and related catalog questions before specifying downstream visibility, references, and parent/child lifecycle rules. The local mockup does not establish cascading behavior.''')
edit('status/Open Questions.md','### Next topic — Review evening mockup drafts','### Next topic — Review Catalog and existing workflow drafts')
edit('status/Open Questions.md','Current question for later review:', 'Current review: the [Catalog draft](../public/catalog/index.html) now covers Category/Collection management and Item creation (D-117). Validation and restore choices remain Agent Suggestions. Lifecycle effects on searches/other usage are explicitly postponed (FI-003); no answer is required to try the draft.\n\nNext workflow question for later review:')
append('public/item-view/README.md','''## Catalog item handoff

Catalog links use catalogItem and optional sample query parameters to open an actual newly created record. Details and inventory edits save to the same browser-local Catalog sample; navigation and review retain that context. New items have no fixture History or pending-stock rows. The default URL still opens the independent ribbon fixture. Other mockups, including inventory search links, remain separate datasets. Serve both folders from the same origin.''')
append('AGENTS.md','- D-117: keep Catalog in the walkthrough after Users/before Inventory. Catalog-created Items share their own browser-local record with contextual Item & History links; preserve the independent default ribbon fixture. Item lifecycle/search effects are user-postponed; do not infer cascading lifecycle or permission policies from the draft.')
