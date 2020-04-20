# Meeting notes for {9-20-19}

Alex, Chris, Michael, Kerwin, Amir, and Ahmad met to discuss the scrubber tool progress and leads results.

The Sink Finder Testing tool plan of action and design is complete. The next steps moving forward is to implement the tool in hopes of showing progress on Friday. The implementation consists of three parts
1. Drivers/Data cleaning from NIST NVD/Circl CVE to get CVE and CWE.
2. Data Scrubbing from SourceClear, NPM, Snyk to retrieve essential data missing from the previous step.
3. Installation and testing.

Reviewing the leads, a lot were false positives. The two most common cases was the attribute was actually iterating over a list, or it could be one of two literals. If this is to implemented into the sink finder, a flag should activate the more efficient search so the tool can be measured and compared to previous findings when the scrubber data is going to be added in. The leads should be finished going through and documented in the table in the vulnerability notebook.

### New Deliverables for Next Meeting (9-23-19 @ 1530 hrs)

- Finish looking at leads and put it all in the table in the notebook (Alex & Michael)
- Fix up flow chart for Scrubber and work on getting cases(Chris & Kerwin)
- progress of step 1 of the Sink Finder Testing tool. 
