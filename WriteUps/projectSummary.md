# OSC Project
This is the uconn osc project repository. On this project we working on building a methodology for analyzing javascript projects for security vulnerabilities. We are focusing on SQL, code, and shell injection attacks within the list of packages given to us by Comcast.


## Literature/
Materials uploaded by Jbara explaining security concepts  

## Meeting notes/
Records from each meeting, includes a template. All files are in markdown.

- MeetingNoteTemplate.md - a template which can be used to write meeting notes for each meeting
- Other files are markdown (.md) meeting notes named by the date and if it is a special meeting

## Tools/
A directory which contains tools we have written in subdirectories, writeups and descriptions of other tools, and tests for various tools.

- search/
  - bench/
  A directory containing tests fo the search tools
  - search-estree and linked-estree
  Utility functions using acorn, esprima, and astq, builds an estree style AST which has references to parents, and can search it for symbols and propogate symbols.
  - syntactic_search/
  Early attempts to write syntactic search tools, mostly used as testing how to search ast.
  - syntax-search/ Current tool for testing packages for vulnerabilities.
- ListOfTools.md: An early writeup with a list of some js tools surpassed by SecurityTools.md
- JSParsers.md
A writeup describing each tool we can use to parse js and limitations and capabilities.
- SecurityTools.md
A more comprehensive writeup of many different security tools including research, commerical, and open source tools. Includes an attempt at describing what methodology we will be taking and how the tools fit in.
- TracingModules.md
An incomplete list of tools we can use for tracing and analyzing call structure and bounding of methods.
- ToolTypeWriteUp.md
A writeup template that can be used to descibe tools that have a common function.

## WriteUps/
All write ups are in markdown.

- JSCodeInjections
Contains a writeup and sample exploits for code injection vulnerabilities in javascript
- ResourceInjection/OS_File_Open
Contains a writeup and sample exploit for injecting attacks into file related sys call interfaces in JS
- SQLInjections/
Contains a writeup and sample exploits for SQL injection attacks in javascript mostly using the mysql library
- ShellInjections
Contains a writeup and sample exploits for shell injection attacks in javascript. Samples using the built in libraries are in base_packages, using superchild are in superchild/ and with an http interface with superchild in superchild_http.
- template.md
Contains a markdown template for making a writeup about a specific vulnerability type
- packages.csv and packages.txt
contains a list of packages given to us by comcast.
- VariantTemplate.md
Contains a template for writing up about a specific variant of an attack type.

## Methodology.ipynb
This is the current document describing the progress of the project. Current findings and timeline can be found here.
