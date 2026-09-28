# Inventory Index and Search

My initial thought would be a page that has a search box, a show all button, and a collapsed filter.

## Search

The search box would search by category, collection, and item name. If none of the filters are checked, then it would would include all items.

## Show All
Clicking the show all button will display all of the items for the selected filters. If no filters are selected, it literally shows all entries.

## Filter

When you click on the filter you see a list of checkboxes for all the "Category : Collection" names. These could be broken out as a Category/Collection tree, but many of the categories only have one collection; so I'm not sure that'd be useful.

- [ ] Badge Holder : Badge Holder
- [ ] Buttons : Buttons
- [ ] Calendar : Seasons of Pride
- [ ] Enamel Pins : Animals
- [ ] Enamel Pins : Queer Coven
- [ ] Enamel Pins : Special
- [ ] Equipment : Donations
- [ ] Equipment : Banners
- [ ] Equipment : Tablecloth
- [ ] Handouts : Info Sheets
- [ ] Handouts : Partners
- [ ] Program : Gaming Safe Space
- [ ] Program : Gayme Night
- [ ] Program : Gayme Night Games
- [ ] Program : Reroll
- [ ] Ribbons : GA
- [ ] Ribbons : Pride Flag
- [ ] Ribbons : Pronouns
- [ ] Ribbons : Special
- [ ] Ribbons : Trays - Cards
- [ ] RPG : Queer Coven
- [ ] Shipping : Boxes
- [ ] Shipping : Consumables
- [ ] Shipping : Hardware
- [ ] Shipping : Signage
- [ ] Tokens : Sponsor
- [ ] Wristbands : Wristbands

## Items Table
Based on search, filters, and show all, there would be a table that shows the item's full name, total, and then each location, event, and in-transit. The items would be sorted by Category, Collection, and then Full Name (though only the full name is shown). Ideally Collections would be a sub-heading in the table if possible with their row lightly highlighted.
- Events would only be shown if they are active (not draft, not finalized) and values not included in total.
- In-Transit would only be shown if there is material in transit and values not included in total.


| Name                        | Total   | Central | Indy    | Philly  | Shopify | Gen Con | In-Transit |
| --------------------------- | -------: | -------: | -------: | -------: | -------: | -------: | ----------: |
| ***Buttons***               | ***—*** | ***—*** | ***—*** | ***—*** | ***—*** | ***—*** | ***—***    |
| Ally  Button                | 6,386   | 5,500   | 800     | 50      | 36      | 350     |            |
| Gaymer Button               | 8,349   | 7,000   | 1,250   | 27      | 72      | 500     |            |
| Support  Trans Youth Button | 4,235   | 3,500   | 720     | -       | 15      | 1,000   |            |
| I'll Go With You Button     | 4,161   | 4,100   | 34      | 5       | 22      | 500     |            |
| ***GA  Ribbons***           | ***—*** | ***—*** | ***—*** | ***—*** | ***—*** | ***—*** | ***—***    |
| Ally Ribbon                 | 17,800  | 12,000  | 2,300   | 3,000   | 500     | 5,500   | 15,000     |
| Gaymer  Ribbon              | 15,750  | 11,500  | 150     | 3,500   | 600     | 5,260   | 15,000     |
| ***Pronoun Ribbons***       | ***—*** | ***—*** | ***—*** | ***—*** | ***—*** | ***—*** | ***—***    |
| Any-All                     | 1,740   | 1,200   | 240     |         | 300     | 2,000   | 5,000      |
| He-Him                      | 7,700   | 4,000   | 800     | 2,200   | 700     | 3,000   |            |
| He-They                     | 3,100   | 2,000   | 400     |         | 700     | 1,000   |            |
| She-Her                     | 8,600   | 5,500   | 900     | 1,700   | 500     | 3,000   |            |
| She-They                    | 2,200   | 1,750   | 350     |         | 100     | 1,000   | 5,000      |
| They-Them                   | 3,590   | 1,500   | 1,330   | 560     | 200     | 2,000   |            |

## Download Button

At the bottom of the listing, if any items are displayed, there would be a download button that would download the items as a CSV.
