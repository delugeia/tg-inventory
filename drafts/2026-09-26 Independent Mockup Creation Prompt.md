Please prepare for a handoff.

Update any documents related to the work done and questions, answers, reserved for later, etc. from this session.

The next thing we'll be working on is mockup drafts of other functionalities.

Please prepare a handoff directive for the next thread similar to the first message I provided you.

----

Continue specification planning in `C:\Users\delug\Documents\ChatGPT\TG Inventory`.

Read AGENTS.md, README.md, `status/Current Status.md`, and handoff/2026-09-26-232644Z-handoff.md. Follow their links to relevant specifications and mockup notes.

The next activity is mockup drafts of other functionalities; I will specify which functionality next. Preserve the existing inventory, history, costing, correction, item-view/edit, and desktop-first decisions. Keep mockups separate and lightly interlinked. Broader permissions, including who can directly edit Unit Cost, remain postponed.

Briefly acknowledge the completed item-view/edit/history mockup work and its links with the inventory index, then wait for my instructions. Do not begin application implementation or create a new mockup yet.

----



I am going to be away for most of the rest of the evening and I would like you to work on mockups in my absence.

I will not be able to answer questions, so use your best judgement and/or note the question and move on.

I am currently at 79% remaining of my weekly usage. Work in stages so that you can stop cleanly if you go below ~50%. Keep track of what you've completed and/or what stage.

**IMPORTANT:** Mockups should be kept separate and should always have a README.md file and other references in the documentation to them. Mockups can "lightly" link to one another, i.e. all "view item" links can go to the same item so there is no need to create multiple examples of the same page. There should be no implementation or development outside of the HTML, JavaScript, and CSS needed for the mockups.

**IMPORTANT:** Keep the design simple, consistent, and focused on the individual functionality. You do not need to create an overarching flow for the site or any navigation, menus, or other material that is outside of the scope of the individual function.

## User Management

This can be a pretty basic system. Anyone who signs in will sign in with their Microsoft Account. The interface ought to allow the person to edit their own first and last name, but not their email address or permissions.

Some yet-to-be-determined role or permission will allow someone to edit the permissions of others. For now, just list a few permissions you think might be used (but don't implement them). Officers, by default, will be able to view anything, make Relocation Requests, and Draft Purchase Requests. Managers will be able to update any Storage Location inventory. Procurement will be able to manage Purchase Requests and either create or continue a user's Draft. And Admins can change the world (other than history/logs).

## Relocation Requests

This is probably the most complicated feature. One limitation is that you can only request ONE source location to ONE destination location. You cannot, for example, say you want 1,000 Gaymer Ribbons from Indy and 2,000 Gaymer Ribbons from Central to be sent to Madison.

The owner will need to select the two locations, choose what they want relocated, and save it as a draft or submit the request. They can view any current or past Relocation Requests, so there should be a history. They can also make a copy of a past request as a starting point for a new draft, from which they would update the request as needed, including the source and destinations. There is no need to link a past request to one that has been created from a copy, they are completely independent once copied.

The request should have a clear status. There should be a index of requests that include a date, title, source, destination, status, and Request ID. 

There needs to be a clean way to add items (and remove items) from a request.

## Location Reconciliation

Location managers need to be able to count and reconcile the inventory at a location. (Any manager can reconcile any location.) This is typically a multistep process… Select the location, search for the things you want to inventory, print off an inventory sheet, take the printed sheet to the location, verify or update the numbers, come back and reload the record and as easily as possible enter the new values.

When performing the reconciliation, the tab and enter key should take you to the next field. That field should always be empty and the person is only recording things that have changed and they are always recording what was counted.

For example, if the person sees 12,000 ribbons on the current inventory and they count 12,000, then the person will leave that field blank and move on to the next. If they see the next field has 10,000 but they only count 9,000, then they enter "9,000"; this creates a reconciliation entry of "-1000" in the item history for the given location.

## Purchase Requests

Expand upon or link to the current `public/purchase-entry/` mockup.

Anyone can make a purchase request. They can request anything, including things that are not currently in the catalog. They can purchase from anyone, including those not in the current manufacturer's list. They need to provide whatever details they can about what they want, but that may be very little information and mostly just a notes field. Nothing should be required. They will be listed as the owner.

Anyone can see the list of current and past purchase requests. There should be a created date, last updated, owner, title, and status. Anyone can view any purchase request details. The owner can save and edit their own drafts. Once an owner, always the owner.

A person with Procurement permissions can take a request and create an order from it. They can add the needed inventory items to the catalog, they can modify the request, add notes, add merchants, etc. They can also just add notes and save it as a draft and pass it back to the owner for more information.

Update the standard purchase workflow to be Draft → Request → Ordered → Shipped (optional) → Received. When a status changes, it should be logged who made the change and when. Only those with procurement permission can move a status backwards. At this time there does not need to be any notifications of changes.

There should be a "Cancelled" status that either the owner of a Draft-state entry or someone with procurement permissions can change for any request that is not yet received.

## Other Mockups

Consider the purpose, weight, and usage of a small inventory system for a small nonprofit. Based on those concepts…

Create any other Mockups that you believe are **necessary** or would be **very useful**.

## Questions?

Do you have any critical questions before I leave you to work on your own?



