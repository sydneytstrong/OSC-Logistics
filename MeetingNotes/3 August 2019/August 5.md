# Meeting notes for {8-5-19}
Everyone met to discuss the progress on the leads and new pattern. Ahmad did the depot/chai lead. Alex showed that the prototype and jade packages had exploits that weren't in their dependencies. Next would be to find an example of how prototype is typically used and alter it slightly so we could exploit it for Comcast. 

Next Alex showed the results of how common these patterns: (`](` , `].call(`, `].apply(`) , to hide functions in the comcast 50. Each had about 30ish, but we need to develop the tool to find these to remove comments and false positives. 

Since only JavaScript injections came up, we need to find more patterns for exec and query exploits to add to the tool from packages with known exploits and make sure the tool can find them. Once they work the tool should be run on the Comcast packages again.

### New Deliverables for Next Meeting (8-7-19 @ 0900 hrs)
- Document the leads and their payloads on GitHub (Alex)
  - Find if it's client or server side
  - An example program so we can minimally change to exploit
- Add the new patterns (`](` , `].call(`, `].apply(`) to the search tool (Alex)
- Find packages with existing command injection and SQL injections and try and add to the current patterns (Alex)