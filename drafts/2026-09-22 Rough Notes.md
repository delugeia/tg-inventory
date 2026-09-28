# Tabletop Gaymers Inventory

Please help me create technical specifications, roadmap, and milestones for developing an inventory system for Tabletop Gaymers (TG) to keep track of our buttons, ribbons, pins, etc. It should behave like a typical inventory software. **The application will be created using Laravel and storage in MariaDb on the TG webserver**; so use the best practices and standards for those platforms (e.g. if the standard is plural for table and single for object, follow that standard instead of whatever is listed below)

## Overview

Any officer can sign into the inventory app using their Microsoft (tabletopgaymers.org) account and are given, by default, view access.

TG maintains a catalog of all items that it keeps in storage. The catalog is independent of the actual quantities and locations of the items.

TG has a central storage location (in Ames IA) as well as remote locations where officers volunteer to hold material that is used for nearby events. Not all catalog items are available in every location.

Relocation Request are when an officer requests items to be moved from one location (source) to another (destination). An officer in a source location gathers up the items in the request and records what was actually sent to the destination. The changes to the inventory should be based on what was actually sent, not what was requested.

Purchase Orders are when Tabletop Gaymers makes a purchase that needs to be added to the inventory. Items are added to a single location, sometimes new catalog need to be added to the inventory. A per unit cost is determined for the items added to the inventory. For example, if we order 1,000 gaymer ribbons and 2,000 ally ribbons then the total cost of the order is divided proportionally, so shipping would be divided into 1/3 for gaymer and 2/3 for ally ribbons. Items may have multiple purchase orders. The per unit cost is the average of all orders for that item.

Event Reconciliation can happen throughout an actual event. For example, you might take 4,000 gaymer ribbons from one location, distribute 2,550 of them, and return the remainder to the location.

## Roles

Any officer can sign into the application using their Microsoft (tabletopgaymers.org) account.

- Officer - default role, can view everything, can make Relocation Requests
- Manager - Officer + able to manage inventory for the locations they've been assigned, can assign themselves to any location (logged), and can change other officers into Managers (logged).
- Admin - Manager+ able to manage Programs, Collections, Locations and other high level data; can manage and modify any location; can modify permissions of any user

## Data Structure

The following are rough ideas of how the data should be organized. These are *ideas* and if there are better ways to organize the data, please do so.

### Purpose (reference data)

This is a reference table used to track the purpose of the catalog item. Admins are able to modify entries. Would include at least these fields: ID, Name, Description. Current entries include:

- Visibility - we give these away for free in person and online as a "Donor Reward"
- Fundraising - these are "Donor Reward Only" items
- Consumable - things like tape, shipping boxes, other consumables
- Equipment - durable goods like SquareSpace readers, banners, etc. that are used over and over
- Miscellaneous - because who doesn't need a miscellaneous

### Program (reference data)

This is a reference table used to track the which programs the catalog item belongs to. Admins are able to modify entries. Would include at least these fields: ID, Name, Description. Current entries include:

- Gaming Safe Space - program for retailer diversity

- Gayme Night - program for community centers, typically giving away board games
- Conventions - used or distributed at conventions

### Categories (table/object)

This is a high-level organization of the catalog used only to group Collections. Admins are able to modify entries. Would include at least these fields:

- Name - e.g. "Badge Ribbon"

### Collections (table/object)

This is the top level organization of the catalog. Every item should belong to one and only one collection. Admins are able to modify entries. Would include at least these fields:

- Name - e.g. "Pride Flag"
- Category *(FK)* - 123 (Badge Ribbon) - foreign key to Category
- Collection SKU - "RF" - this is the prefix to the SKU used in the Catalog
- Collection Stub (optional) - "pride-flag-badge-ribbons" - this correlates to the Shopify URL for the collection:
  - e.g. https://rewards.tabletopgaymers.org/collections/pride-flag-badge-ribbons

### Catalog (table/object)

This is a catalog (without actual inventory numbers) of the items that we have. Would include at least these fields:

- Name - e.g. "Bisexual Pride Flag Ribbon"

- Collection *(FK)* - 234 (Pride Flag) - foreign key to Collections

- Variety Name (optional) - "Bisexual" - this is the short name used for this variety of the item

- Variety SKU - "GYMR" - this is the second half of the SKU; note that items in the catalog may have the same Variety SKU (e.g. GYMR for both Gaymer Button and Gaymer Ribbon)
- SKU - "BU_GYMR" - this is a derived field, but for speed it should be a local text field on update; it is derived from:
  - Collection SKU - "BU" (determined by which category is selected)
  - Variety SKU - "GYMR"
- Purpose *(FK)* - the reason we have this item, FK to the Purpose
- Programs *(FK)* (optional, multiple) - programs this item is related to, FK to Programs
- Unit Cost - derived from purchases made, derived from Purchases, stored locally on update
- IRS Value (optional) - IRS estimated value, e.g. MFRP for donated board games
- Donation Price (optional) - the suggested donation for the item on Shopify
- is Active - true (default) - indicates if we actively use or distribute this item; we keep inventory of inactive items but they are not typically promoted
- Request Bundle Type - for internal requests, we send pre-packed bundles, e.g. "pack", "kit", "box"
- Request Bundle Quantity - how many of said items are in a Bundle, e.g. 100 (badge ribbons per pack)
- Notes (optional, multiline) - "example to be determined later"

### Manufacturers (table/object)

This is a collection of manufacturers that are used to procure items at wholesale. Admins are able to modify entries. Would include at least these fields:

- Name - e.g. "MARCO Promotional Products"
- Website - https://www.marcopromos.com/
- Location (optional) - "Harrisburg PA" - just a simple text field, not a formal address
- Rep Name (optional) - "Jane Doe"
- Rep Email (optional) - "Jane.Doe@marcopromost.com"
- Rep Phone (optional) - "800-232-1121 x9999"
- Notes (optional, multiline text) - "We use this manufacturer for badge ribbons and badge holders."

### Purchases

This is a log of purchases that have been made and appear in the catalog. Each purchase should include a manufacturer but may include multiple catalog items. The actual cost is used to determine Unit Cost. In most cases there will be a line item cost for each item, however in some cases it is just a total. The taxes and shipping+handling costs should be divided proportionally to determine unit cost. The unit cost of each item is recalculated but stored locally in the Catalog.

- Name - e.g. "Resupply of Pride Flag Ribbons"
- Actor *(FK)* - the person managing the order
- Order Date - the date the purchase was made
- Received Date (optional if open) - the date the purchase was received
- Manufacturer *(FK)* - 45 (MARCO Promotional Products)
- Line Item Total - total of all the line items, verified against Purchase Line Items 
- Tax - total of all the taxes
- S&H - total of all shipping and handling
- State - the current status of the purchase (e.g. Draft, Ordered, Received)

#### Purchase Line Items

Most purchases will have multiple line items included that need to be separated out to determine inventory and cost.

- Purchase ID (FK) - foreign key to Purchases
- Catalog Item (FK) - foreign key to Catalog
- Description (optional) - for instances where the Description doesn't match our Catalog item.
- Product Code (optional) - whatever the manufacturer's code is for the item
- Quantity - 1,000 - the total number of items for that line
- Sub-Total - the cost for the item (required, but may be zero in some cases)
- Setup (optional) - an additional cost for the item, e.g. badge ribbons typically have a $15 setup fee per design

## Features and Workflows

Here are the notable features of the system, in no particular order:

- uses Laravel as a framework, following best standards and practices
- anyone with a `user@tabletopgaymers.org` should be able to sign in and `view` the inventory
- an administrative role that can do anything on the site
- a set of `locations` where inventory is stored
- the ability to assign multiple users as managers of a location
- inventory items include a unique character id, item name, quantity per location, notes per location
- log of quantity changes to inventory item including the actor, date, and action
- catalog of all items that is separate from their quantity and the ability to create view update archive
- ability to delete items in the catalog if and only if they've never been used, otherwise an archive only
- most tables should have a large pagination so that scrolling is preferable to clicking next page
- pages, notably tables, should be printable and have added functions like a blank "sent" column that will match the table when entering results.

### Relocation Request

An officer signs in and selects 15 different items they want sent to a location. The officer making the request can use past requests as templates for a new request, updating any field or request entry. The local manager prints off the request that has a blank column labeled "sent" which is the number they actually send the person. The local manager comes back into the web app and enters what was sent, when it was sent, tracking numbers, etc.

### Purchase Entry

An admin goes in and records a purchase that was made for 84,000 badge ribbons. They select or add a manufacturer which prefills the form with manufacturer details, that can be changed for this instance without changing the main manufacturer entry. They enter the line item details and save it as draft, confer with the board, make changes, place the order. When they receive the order, they go in and enter/confirm the details, mark it as received. Once received, the system then and only then updates the inventory and recalculates unit costs.

### Event Reconciliation

The officer in charge of the Gen Con convention selects all the material they take to the convention, these are saved as a draft that contains convention information, dates, etc. The entry looks much like a Purchase entry, except they mark how many of an item they took, which may change as more or fewer items are brought. After the event, they count up the items left over and reconcile it with the database, which then updates location inventory entries.









