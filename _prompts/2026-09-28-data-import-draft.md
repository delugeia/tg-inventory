This prompt is saved in `_prompts/2026-09-28-data-import-draft.md`.

I am going to bed. I would like you to work on the following while I am asleep. I will not be around to answer questions, use your judgement and/or take notes for my return.

USAGE: I am currently at 81% remaining. This step is important and work now should save time later, so you may continue working and refining your research until we reach 20% remaining. Keep track of the remaining USAGE and plan your analysis accordingly. Be sure to complete things in a phased approach in case you need to stop before you are finished.

----

I would like you to take a crack at using our current spreadsheets to better understand the inventory data we've attempted to track in the past. Go through this data and create…

* A list of questions, suggestions, and ideas for incorporating or disregarding parts of this data into the current design.
* A list of suggested changes to the model, mockup, or specifications to accommodate important data that you find that doesn't fit.
* A set of CSV files that can be used to import this data as part of an initial testing, and later production load, of the application (for which development should not begin yet).

The sources of data that I would like you to include as part of your review are all found in `_data/current-inventory/`

* `main-inventory.xlsx` - includes most of what we use and distribute
* `shipping-materials.xlsx` - boxes, mailers, envelopes we use to distribute stuff
  * https://www.uline.com/MyAccount/MyOrderHistory - tab open in Chrome that has SOME of the material that has been ordered through ULINE. Don't down the whole website, just look at a few entries and details on a few boxes (all models in spreadsheet begin with `S-`)
    * e.g. https://www.uline.com/Product/Detail/S-4484
  * *don't browse other websites for shipping material information*
* `games.xlsx` - these are games that have been donated to us by the manufacturer, we use the MSRP for insurance and for the IRS value of the games donated.

Create the files for import at `_data/data-for-import`. My fallback is always CSV, but you should create these in a format that you believe will be easiest to digest when uploading them to the future application. Presume that the imports will be designed for a reasonably normalized database structure. The import scripts will be designed to ignore any fields from the files that are not used, so default on making the import files capture as much data as possible. Use a header row for each file. Create a README.md in the same `_data/data-for-import` directory that explains the data.

----

Do you have any important questions before I go to bed?