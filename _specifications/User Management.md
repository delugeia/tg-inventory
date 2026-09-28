# User management

State: Draft. Created 2026-09-27 UTC. User requirements: D-104. [Interactive mockup](../public/user-management/index.html) · [Usage/source notes](../public/user-management/README.md).

Authenticated users sign in with Microsoft Account and edit only their own first/last name. Email is identity-provider data, shown read-only. Own permissions are read-only. Changes have no inventory or cost effects and must not rewrite historical actor attribution.

Officers default to viewing everything, creating relocations, and drafting purchase requests. Managers update/reconcile any Storage Location. Procurement manages purchase requests and can create or continue Drafts. Admins have broad management authority with no history/log editing exception. Permission-assignment authority and direct Unit Cost editing remain unresolved; the Admin preview now allows editing draft roles for review, without defining production role-granting boundaries.

Workflow: open the Users directory to see all approved sample people and their assigned roles. The mockup-info User/Admin selector always defaults to User; User mode has no role editing controls. Admin mode shows the draft role reference and an Edit roles dialog with Save/Cancel. Saved draft roles persist locally; preview mode does not persist. The My profile sub-page retains own-name Save/Discard and read-only Microsoft email/access. Saving a name cannot change roles or historical records. Managers are not limited to assigned locations. Draft role editing is authorized for the mockup only; production assignment authority, validation and audit policy remain postponed.

Exceptional cases and questions: account eligibility/domain restrictions, onboarding/deactivation and first admin (Q-009); role-granting boundaries and logging (Q-010/Q-011); empty/long name validation and identity-provider refresh conflicts. These remain open and do not require an invented signup/password workflow. Mockup uses optional names and browser-local storage only. Browser navigation warns of unsaved edits; a failed local save is identified. No real authentication or persistence security is demonstrated.
