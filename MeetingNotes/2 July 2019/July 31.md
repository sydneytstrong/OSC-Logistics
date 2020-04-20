# Meeting notes for {7-31-19}
Alex started by updating us on the bug where the syntax search tool wouldn't find eval calls that Ahmad found with grep. He fixed this by changing how the tool checks directories recursively. The tool was able to find the same eval calls as Ahmad found where it should. The tool also now outputs only files that have any potential vulnerable entry points.  

Next Chris talked about the other cases. The `window["eval"]` case is hard and complex to track down. The `(1,eval)(variable)` is much easier and more interesting to find.

Laurent doesn't think we should worry about ``$eval and $evalASync`` unless he can write up a unique pattern that binds to eval and can be exploitable. 

Chris leaves for Cali on the 1st and will be back on the 10th of August.

### New Deliverables for Next Meeting (8-1-19 @ 1600 hrs)
- Finish debugging the syntax search tool and rerun on the 50 packages (Alex)
- Try and create payloads for two results Laurent discussed in his emails to show comcast (Alex)
- Add the ```(1,eval) (variable)``` pattern to the tool (Chris)
- Work on the slide deck for the comcast meeting on Friday (Professors)