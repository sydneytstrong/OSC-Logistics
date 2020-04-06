# Meeting notes for {8-7-19}

Alex started by showing the updates to the search tool for the three patterns of interest. He showed the log.json file that showed the results. He went over how the tool searches for nodes that are `CallExpressions` and checks that the callee is an object that is computed. Amir focused on the `](` pattern and emphasized their trickiness and how important it is to look through these. The tool flagged 36 files for having that pattern. The number of results from the tool should be compared to the number grep can find when sed is used to remove all comments. Lastly, the documentation for the leads were looked at. Laurent suggested a little paragraph should be added for each on top of the vulnerable code and its payload.

Amir will be unavailable for a little over a week.


### New Deliverables for Next Meeting (8-9-19 @ 1100 hrs)
- Document a little more info for the leads (Alex)
- Look into the hits from the new pattern in the top 5 packages for false positives (Alex)
  - Find how to refine the patterns
- Remove comments and compare grep finds to the tool's number of finds (Alex)