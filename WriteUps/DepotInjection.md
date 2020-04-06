# Depot v0.1.6 (Server Side JS Injection)

Depot is a wrapper for the built-in `localStorage` tool with a simplified API, intended to make it easier to create local storage on the browser.

### /specs/vendor/chai.js - assert.operator()

``` javascript
/**
 * ### .operator(val1, operator, val2, [message])
 *
 * Compares two values using `operator`.
 *
 *     assert.operator(1, '<', 2, 'everything is ok');
 *     assert.operator(1, '>', 2, 'this will fail');
 */

assert.operator = function (val, operator, val2, msg) {
  if (!~['==', '===', '>', '>=', '<', '<=', '!=', '!=='].indexOf(operator)) {
    throw new Error('Invalid operator "' + operator + '"');
  }
  var test = new Assertion(eval(val + operator + val2), msg);
  test.assert(
      true === flag(test, 'object')
    , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
    , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
};
```
`assert.operator()` is a method found in an embedded dependency within the npm package `Depot`. The dependent module is called `Chai`. Newer versions of `Chai` available via npm do _not_ suffer from this vulnerability (they no longer use `eval` but favored instead a direct implementation via a switch statement (this demonstrates that the functionality could be completely preserved with a newer version of `Chai` that never calls `eval`.  When the method is called, 3 parameters are passed through an `eval` to test a condition, however only one (the operator) is checked before being passed.

This issue was fixed in later versions of `Chai`, however because the package is locally required, this method was never updated. This method is never  used by the core depot package, however it can be required and accessed from within. Consider the sample:

``` JavaScript
var assert = require('depot/specs/vendor/chai').assert

assert.operator(/*Exploit here*/)
```
## Running the Demo

### Dependencies
- **depot**
  - `~$ npm i depot`

### Running Application
- From this [directory](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/Demo/Depot), run `node chai_exploit.js`

- Vulnerable form should be accessible via `localhost:8080`

## chai_exploit.js

```Javascript
//require package
var ch = require('depot/specs/vendor/chai')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
        res.sendFile(path.join(__dirname+'/demofile1.html'));
});

app.post('/', function(req, res){
        let name = req.body.name_field;
        try {
          ch.assert.operator('10', '<', name);
          res.send(name + ' is greater than 10.')
        } catch (e) {
          res.send(name + ' is not greater than 10')
        }

});

app.listen(process.env.port || 8080);
console.log('Running on port 8080');
```
The example above sends a form to the client, asking for a number as input to check if it is greater than 10.

<img src="https://i.ibb.co/K7Qvx4P/Screen-Shot-2019-08-28-at-8-35-32-AM.png" alt="example" width="400"/>

`assert.operator` will then evaluate the expression `10 < <user input>` with `eval()`, and run any code given with a preceding semicolon.

## Payload

Payload can be injected directly into input box succeeding a semicolon. (Ex. `; console.log("Hello World")` will print "Hello World" into the console of the server.)
