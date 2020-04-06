# Meeting notes for {8-9-19}

Alex started by showing the log.json now shows the number of hits for everything for each file. He used these numbers to compare to what grep has found. Alex and Ahmad will work on the regex expression for the grep search, but comparing what is missed and why will need to happen.

Alex showed the hits of the new patterns in the top 5 packages. Most where in situations where the call expression resulted in a Boolean and the result would return a string. ie `return obj['a']('b')? "a" : "b"`.  The rest were a little more interesting examples and will need to look more into other files to find global variables. In terms of documentation, everything Alex wrote will need to be put into the notebook Laurent set up on root. He also needs to add the false positives and write a few paragraphs explaining why or why what the tool found is vulnerable.

Chris is back and can help create realistic examples for each of the exploitable packages.


### New Deliverables for Next Meeting (8-12-19 @ 1400 hrs)
- Document False Positives and True Positives in the notebook on Git (Alex)
- Fix up the examples of payloads to look more real (Alex/Chris)