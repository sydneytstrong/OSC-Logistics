# Meeting notes for {8-28-19}

Alex, Chris, Micheal, Kerwin, Amir, Laurent, and Ahmad met to discuss the follow up on the leads. The students started by looking in backbone. After some research, they discovered that the patterns we added to the tool: `object['attribute']` only works on the client side because window is the global object that contains eval, and the server's global object, process, does not have this attribute. The remaining sinks our tool found should be looked at, but most likely will not result in a server side vulnerability. PrototypeJS is still a compelling case because the client code can be forked and modified to be ran on a server, and the newest versions have more locations to use the sink. This should be documented further in the Prototype markdown.

A table should be created to keep track of all the leads and their current status. The tool should also be expanded for the other injection types so it can find anything that is concealed intentionally. In order to strengthen the tool, it will have to be tested on known, reported vulnerabilities. This should be an automated process to collect this information and to test our tool. 

The write ups and table will be needed for Laurent to use in the presentation on Friday, so they should be worked on first and an update should be sent when they are done with their location on the git.

### New Deliverables for Next Meeting (8-30-19 @ 1100 hrs)
- Prototype write up / Tool pattern extention (Alex & Micheal)
  - Add information about client code being modified to be server code
  - extend other injection attacks to be able to find hidden method calls like we did for eval
- Automated database searcher documentation / automated database script  (Chris & Kerwin)
  - Write up a document on what this script will do, what it will return, and the reasoning for what we will be doing with it
  - Start writing a script to extract the information from the database
- Table (Alex)
- Meeting slides (Laurent) (Thursday night)
