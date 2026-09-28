
### Users (user-management/)

- Have the index page be a list of users and assigned role(s). Use the data/sample-names.md file.
- Include in the mockup-info the ability to select user/admin, default always to user. When admin is selected, include the ability to modify roles and list the draft of the roles we had earlier.

### View Adjustment (item-view/adjustment.html?batch=sample-indianapolis)

- Stylize the header "Changed by" to match others, the titles and values appear unformatted.
- remove America/Chicago

### Inventory (inventory-index/index.html)

- Add Locations to the filter, listing all Storage Locations. Also include active events, in-transit, and ordered in a separate column. Having none selected is like having all selected (i.e. they're ignored).

### Location Reconciliation (location-reconciliation/index.html)

* The Choose Inventory should behave similar to the Inventory search/filter except that a single location is required.

### Location Counts – Printed (location-reconciliation/index.html)

For only the "PRINT WORKSHEET" view, remove the page background so that the person can print the page and keep "background graphics" enabled on the print dialog. This way the the sub-header rows ("Ribbons: Identity") print their row background without also printing the page background.

### Standardize Table Data for Specified Tables

For only these two tables…

* /relocation-requests/index.html
* /purchase-requests/index.html

The tables should appear similar in that…

* both should start with and show only one date, "Last Updated"
* followed by "Title" without the ID below (shown in purchase requests)
* Purchase Request should then have…
  * Owner, Status, Request ID
* Relocation Request should then have (no changes)…
  * Source, Destination, Status, Request ID

----

Make the following updates to the mockups, adjusting for consistency as needed.

### Relocation Requests – stage actions and consistency (/location-reconciliation/)

Valid relocation request statuses, typical flow, and the actions that can be done are:

* Draft - request has not yet been submitted
  * Owner or any Location Manager can edit, submit, or cancel a draft
* Requested - request has been made
  * Location Managers can edit, ship, or change back to draft (and then cancel)
  * notably any location manager can edit, add, modify a Requested entry
  * they can also START entering numbers for fulfillment, save, and return without changing state or shipping
* Shipped - request has been shipped
  * no changes can be made to Items
  * any Location manager can add or modify shipping information before or after it is shipped
  * tracking information should include the option for multiple lines, each with a different carrier
    * include carrier options for USPS, UPS, FedEx, DHL, and Other
    * when viewed, these links ought to take the person to the appropriate links for tracking info
* Receiving - Owner or any Location Manager can reconcile a received shipment
  * this may happen in parts if the shipped boxes arrive separately
  * they need to be able to save and return to continue
* Complete - the relocation request is marked as complete
* Cancelled - once cancelled, the request can only be copied (current functionality verified)

Note: The "Copy to new draft" should not copy owner, source, destination, or notes. Only copy the requested items.

### Relocation Requests – New/Edit Request (relocation-requests/)

* update source/destination locations to include all sample locations
* when making a new request, to add items, use a similar search filter to what is used for Inventory
* show search output similar to Inventory, using collection headers as section dividers
  * item lines should include the item name, current source stock, and current destination stock; followed by a request input box
  * have an "Add Selected" button at the to of the search results; clicking it will add all the items where the value is not blank (they can enter a value which is carried up to the request, or anything non-blank [x, yes, xyzzy])
  * the search results is then updated to NOT include anything already in the Requested area
  * have the Requested Items box be visually separated from the Search box
* The Requested Items table should then have the following…
  * use the same Category : Collection headers
  * item rows should include
    * item name
    * source: which contains "current stock → after requested"
      * e.g. 7,500 → 5,500 (if 2,000 requested)
    * destination: which contains the same information (for destination)
      * e.g. 150 → 2,150 (if 2,000 requested)
    * Request number, which should be set to zero if it was copied up from a non-number
      * this number can be zero or positive
      * negatives, implying a "return to source" are not valid
      * updates to this number should dynamically update the shown "after requested" values

### Relocation Requests – New/Edit Request (relocation-requests/)

* all "Requested Item" tables, in all the versions of the form, should use the same format as described above
* this includes the Packing Worksheet except with an extra column for "Sent"

### Relocation Requests – Record Shipment (relocation-requests/)
* layout should be similar to "Enter counted quantities" in that it opens in a new page (not just a section below).
* There should be a Save button on this page where you can save your work (doesn't ship) and a "Mark as Shipped" button that takes you to a "Review Shipment" page before marking it as Shipped.


