# Methodology for Vulnerability DB Scrubber

## Purpose

In order to prove that our tools and methodology have merits in detecting all instances of a given vulnerability,
it should be assessed that they have the capabilities of detecting documented vulnerabilities from older versions of JS packages.
As it currently stands, this process of testing documented vulnerabilities needs to be done manually, which can be tedious and repetitive. One solution to this problem is automating the process. <br/>  <br/> The benefits of automation are:

-   Enhances the speed and efficiency of future development
-   Higher volume of test cases for our tools
-   Facilitates easier tool modifications and simplifies integration of our system

## Process

Currently, performing this process through a REST API does not seem feasible, because there does not exist an available REST API for a vulnerability database that we know of. The solution in progress revolves around scrubbing for relevant data from the database. After the required packages have been determined, our extension attempts to find releases for the packages that predates or comes after this release then form a download source file.  This process is currently done manually, to be automated down the line.  <br/>

Process goes as follows:
 1. Enter online vulnerability database (i.e. [NPM Advisories](https://www.npmjs.com/advisories))
 2. Search for package advisory by type of vulnerability being researched (Ex. "Arbitrary Code Execution")
 3. Obtain the information for these packages, and compile a general flag for the vulnerability
 4. Modify main tool to look for vulnerability flag
 5. Run main tool on the known exploitable packages, then assess if vulnerabilities were found in them.
 6. Attempt to find releases that predates or comes after the documented vulnerability.
 7. Dynamically generates a download source file (similar to src.py in ../Tools/search/)  


## Importance in Project

Intended use is primarily to aid in the development of the main tool, or for researching when adding new capabilities to the tool.

## Current Progress

-   An automated vulnerability scrubber is still in development. <br/>
-   Experimenting with Circl CVE search API to help with database  searching. <br/>
-   Designing the Vulnerability Scrubber to work with NPM Advisories using XPath.
-   Created a JS scrubber to obtain vulnerable versions of JS packages in JSON format.
-   Working on automated methodology of getting data not provided by Circl CVS
