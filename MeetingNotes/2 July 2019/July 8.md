# Meeting notes for {7-8-19}
Met on WebEx to to discuss progress since last meeting on Thursday. Alex started by updating his updated to the syntax search tool. He added some examples and modularized components to be reused for each vulnerability. The tool works on most cases and will need to change what it returns for the CFG to read. 

Next Chris showed his progress on using the ast-flow-graph tool from npm. He managed to fix his issues and create a dot file that can show the flow graph of a specific function from a file. We discussed the tool and talked about using an iterative control flow graph tool and a call graph tool to find paths in and between functions to get a larger picture.

### New Deliverables for Next Meeting (7-9-19 @ 1500 hrs)
- Finish up the syntax search tool (Alex)
- Work on using an ICFG and using a call graph to find paths (Chris)