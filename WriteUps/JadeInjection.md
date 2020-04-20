# Jade (JS Injection)

## Purpose of Jade
Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node and browsers. This version has been depricated and replaced with pug.

### Jade.js - isExpression()

Here is a snippet of code that our template finder found. This is a false positive that can not be exploited.

```javascript
function isExpression(src) {
  try {
    eval('throw "STOP"; (function () { return (' + src + '); })()');
    return false;
  }
  catch (err) {
    return err === 'STOP';
  }
}
```

This is not exploitable because if the eval doesn't parse, it will catch the error. If the eval parses, then the first thing the eval will evaluate is throwing a stop. In either case, whatever is in `src` will not be evaluated here.

### bin/Jade.js - parseObj()

Here is a snippet of exploitable code that our template finder found. This is a true positive of a potential vulnerability.

```javascript
function parseObj (input) {
  var str, out;
  try {
    str = fs.readFileSync(program.obj);
  } catch (e) {
    return eval('(' + program.obj + ')');
  }
  // We don't want to catch exceptions thrown in JSON.parse() so have to
  // use this two-step approach.
  return JSON.parse(str);
}
```
It is called from:
```javascript
if (program.obj) {
  options = parseObj(program.obj);
}
```
The `program` object comes from parsing the arguments from the command line.
```javascript
program.parse(process.argv);
```
It expects a file name as input. However, if javascript is provided and not a file, then fs.readfileSync will catch and evaluate the javascript given as input. With the right payload , this API can be exploited.
## Running the demo

### Dependencies
You can install these with the following command `npm install [dependencies]`

- express
- body-parser
- path
- jade@1.11.0

### Running the application
To run this, change to the directory where jade can be run from the command line.

## Payload

### Procedure
How do I run the exploit? 

- Run jade from the command line with the `-O` flag like so `jade -O ""`. This is where the input is expected. 
- Input this payload after the flag: `"console.log('Hello')""`. This input string will execute because the `fs.readFileSync` will file beccause the JavaScript is not a file. 

## Why it works?
As explained before, the try catch will catch when the payload is not a file and will be evaluated. Without any built in counter measures, this API can execute anything given at the command line. This example is a server side vulnerability, but not all that likely to occur. Proper sanitization and avoiding this dangerous function could prevent an unexpected `eval` call.
