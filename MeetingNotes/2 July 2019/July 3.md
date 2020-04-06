# Meeting notes for {7-3-19}
Met on WebEx to give updates on progress. Alex started with showing the tool he worked on based off of the meeting he had with James and Laurent the day before. He went through the code and explained the components. He was able to run the tool on a directory of test files and find query calls filter back through objects and/or variables to find if it fit the syntax pattern. The tool worked on these simple cases. Moving forward the tool needs to be able to find the previous objects in different scopes and test the input parameter if its a literal or if input was added to it. The source code for the tool also needs to be refactored and cleaned up. 

Next Chris talked about his work on finding a tool to generate a CFG. He ran into a problem with an error and worked with Dr. Jbara to find it. 

Finally, James talked about his work on propagating all instances where the require('child_process') is put into a new variable and however many times that gets repeated. He went through his code and ran an example. Laurent pointed out an issue where a variable could get reassigned and the equivalence is lost. He pointed out that James was using astq while Alex was using the walk function from estree. He stressed the importance of communication and made sure that we picked a method before moving on.

### New Deliverables for Monday
- Refactor code and agree on what tools we're using. Also add more cases and examples and add another vulnerability. (James and Alex)
- Get a CFG tool working. If any help is needed then reach anyone on slack or by email (Chris) 