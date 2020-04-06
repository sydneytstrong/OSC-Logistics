# Using this template
 Compile this document to pdf with `pandoc --number-sections VariantName.md -o VariantName.pdf` **Remove this section after copying**

# Source Code
Explain the basic premise of the application. 

## FileName1.js
What this file does. You can make it as long or short as you need. 

```
// Make sure you include comments
var http = require('http');
// A decent amount
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node.js World!');
}).listen(8080);
```

## FileName2.js
What this file does. You can make it as long or short as you need. 

```
// Make sure the http library is loaded
var http = require('http');
// Create an http server
http.createServer(function (req, res) {
    // Lambda that defines how the http server reacts to <input
    // Responds with 200 in header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // And a hello world page
    res.end('Hello Node.js World!');
}).listen(8080);
```

## Keep going for as many files as you made
More files go here

# Running the sample

## Dependencies
You can install these with the following command `npm install some dependencies`

- List of 
- some
- dependencies

## Running application
A short guide on how to start the app once dependencies are installed.

# Payload

## Procedure
How do I run the exploit? 

- Go to `exploitable.com/location`
- Input this to textbox, put this in URL
  - Payload1
    - Example payload as plaintext
    - Example payload properly encoded
    - Short explanation of special features of the payload
- How to observe effects 

## Why it works?
A short explanation of what is happening in the procedure.  What was the developer trying to do, and what about that left them vulnerable?
