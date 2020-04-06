# Shell injections write up {-}

# Description
An attack where client input is put into a shell by the web application. This allows clients to execute arbitrary shell commands on the server by injecting them into responses.

# Capabilities
Run any command the system shell can. 

- Interfere with system state
  - Can be very powerful with very few statements
  - `pkill -9 -u $USER`
- Add or remove software 
  - Install remote access tools
  - Add new services (ex: cryptominers)
- Establish connections to other servers and systems
  - Upload private data in server to other locations (ex: source code)
  - Have server run commands from unauthorized systems

# Limitations
Runs processes using operating system calls.

- Runs as the user of the web application.
- May not have immediate access to all web app resources.
    - Exits the context of the application process. 
    - Additional work may be needed to expose things like database objects.
- Platform dependent.
  - Attacks may fail with little or no warning
  - Desired resources may not be discoverable or usable
- Highly invasive and therefore detectable


# Mitigations
## Application level
Prevent user input from escaping characters, and limit the capability of started processes.

- Sanitize user data to prevent more commands
- Do not allow the user to reference system variables
- Application level sandboxing and restrictions
  - `seccomp-bpf()`, `setuid()`
  - Design application to be run within a container
- Avoid using APIs that use a system shell to launch processes
  - **Bad:** `require('child_process').exec("ls " + unsanitizedStr)` 
  - **Okay:** `require('child_process').execFile("ls ", [unsanitizedStr])`
  - **Okay:** `require('child_process').spawn("ls ", [unsanitizedStr])`
  - While okay and best prevents the user from directly jumping into a shell it still exposes the external program.
- Avoid using a shell or external process at all
  - [ShellJS](https://www.npmjs.com/package/shelljs) reimplements many Unix shell commands within NodeJS
  - Implementing existing utilities in JS is not a catch all
    - Could be vulnerable to other attacks
    - May be of lesser robustness than existing system utilities
    - Possibly difficult or time consuming when possible
    - Not possible for proprietary systems, or impractical due to performance concerns.
  - Be selective of what needs to be done in an external process.
  - Does this need to be executed with user parameters?
  - Provide user input through other mechanisms


## System level 
At the system level, run the application as an unprivileged user and environment. Determine this using principle of least privilege. 

- Limit executables in the path
- Heavily restrict file access
- Avoid running applications as `sudo` or admin users. 
  - Limit power of `sudo` to certain commands
- Start application in a sandbox
  -  `chroot()`, Docker, VM, or other heavily restricted environment
  - SELinux, application firewall, and event logging


# Examples

## Using exec from node libraries
NodeJS includes an interface in the `child_process` module of the standard library to the system shell. If used improperly it allows for attackers to run commands on the host.

### Dependencies 
Download the [`ShellInjections/base_packages`](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/ShellInjections/base_packages) folder. 

Install the following npm packages
- `express` framework used to build the vulnerable web app, not vulnerable itself.

### Exploitable Source

#### [`exploitable.js`](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/ShellInjections/base_packages/exploitable.js)

Uses the `exec` builtin. This is available at the `exploitable_server/1` route, the data is taken as a GET parameter named `file_path`.
```Javascript
app.get('/1', function (req, res) {
  let output = "";
  // Runs ls from the shell with information from the request
  child_process.exec(
    'ls ' + req.query.file_path,
    function (err, data) {
      console.log('err: ', err)
      console.log('data: ', data);
      output += data;
    });
  res.send('Hello World! \n' + output);
})
```

Uses `execSync` a synchronous version of the `exec` builtin. 
```Javascript
app.get('/2', function (req, res) {
  res.send(child_maker.execSync('ls ' + req.query.file_path).toString();
})
```

### Running the exploit

#### Starting Server
After downloading the [source](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/ShellInjections/base_packages) and installing the dependencies you can run the server simply by doing 

- `foo@bar:~$ cd /path/to/base_packages/`
- `foo@bar:~$ node exploitable.js`

#### Payload procedure
- Go to `localhost:3000/1?file_name={exploit content}` serves the exploit using the `exec` function.
- `localhost:3000/2?file_name={exploit content}` serves the exploit using the `execSync` function
- `; pkill -9 -u $USER `
  - Command will kill all processes running as the application's user.

### Why is this present?
The nodeJS `exec` statements are directly passed to the system shell.


## Using `superchild` npm package
`superchild` is a simple wrapper for the `require('child_process')` module functions. It uses the `spawn` function from the `child_process` module in a way that exposes a shell. It also provides some async interfaces to the subprocess' shell state.

### Dependencies
Download the [`ShellInjections/superchild/`](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/ShellInjections/superchild) directory.

npm packages:
  - `express` framework used to build the vulnerable web app, not vulnerable itself.
  - `superchild` module which can be used to run arbitrary shell commands.

### Exploitable Source

#### [`superchild_exploitable.js`](https://github.uconn.edu/jrs12014/OSC-UConn/blob/master/WriteUps/ShellInjections/superchild/superchild_exploitable.js)
``` javascript
// Add dependencies
const express = require('express'),
      superchild = require('superchild');

/* Code to set up serving form and start express app */

// When the form_response HTTP path is encounter run this function
app.post('/form_response', (req, res) => {
  // Sets filePath
  let filePath = req.body.filePath

  // Creates child process for cat
  // Filename is from the filePath parameter in the HTTP Get request directly 
  let child = superchild('cat ' + req.body.filePath);
  // When the child has output put it into the HTTP response.
  child.on('stdout_line', function (line) {
    res.write(line + '\n');
  });
  // When the child exits send the HTTP response
  child.on('exit', function () {
    res.end()
  });
});
```

#### [`node-superchild/lib/respawn.js`](https://github.com/mayanklahiri/node-superchild/blob/6b707b308c12bcead025d9d30f73073cd1b296c2/lib/respawn.js#L35) 
While `superchild` uses the less vulnerable `spawn` interface it does so in a way that ultimately exposes a system shell. Specifically the library will silently set an internal shell option to true, which will cause it to use `spawn` to run the parameters in a shell. This attack also extends to the `execFile` function as well.

```Javascript
var spawn = require('child_process').spawn
  , spawnSync = require('child_process').spawnSync
;
...

exports.spawn = function(commandLine, spawnOpt) {
  ...

  if (!spawnOpt || !spawnOpt.shell) {
    return spawn(commandLine, spawnOpt);
  }
  ...

  var shellBin = IS_WINDOWS ? 'cmd.exe' : '/bin/sh';
  return spawn(shellBin, childArgs, spawnOpt);
};
```


### Running the exploit

#### Starting Server
After downloading the [source](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/ShellInjections/superchild) and installing the packages you can run the server simply by doing 

- `foo@bar:~$ cd /path/to/superchild/`
- `foo@bar:~$ node superchild_exploitable.js`

#### Payload procedure
- Go to `localhost:8080`
- Insert the payload via the form on the site (Ex. `; rm -rf /`)
  - `; cat /etc/passwd`
    - Command will read password folder to client.
  - `; rm -rf /`
    - Command will delete application directory and its contents.
  - `; /System/Library/CoreServices/Menu\ Extras/User.menu/Contents/Resources/CGSession -suspend`
    - If the server is running macOS, the command will lock the server.

### Why is this present?
As a simple wrapper on `require('child_process').spawn` family the `superchild` package provides no security improvements. In fact it introduces more, as it will passively use a shell in some situations. While many wrappers provider useful security benefits, this one does not. It is advised to be particularly scrupulous of wrapper libraries.

# Searching for vulnerable code
- `require('child_process').exec()` or `execSync()`
  - Since these modules use the system shell to evaluate the first argument as a string, they are particularly vulnerable.
  - Any input which is not perfectly sanitized being added anywhere in the first argument will result in a possible shell attack.
  - Recommendation: _The search will look for any calls to these functions where the first argument is based on any non fixed input_.
- `require('child_process').spawn()`, `spawnSync()`, `execFile()`, `execFileSync()` 
  - These functions have a child process directly execute the binary at the path of the first argument, they can be secured, but there are exceptions.
  - Where the first argument is an input without modification. 
  - Modifications will make it difficult to find a desirable binary, but not always impossible.
    - Prepending any folder allows the attacker to traverse directories to find shell binaries.
    - Path statements like `../` are evaluated correctly.
  - While it is possible to secure the first parameter from user input, it is difficult and staticly guaranteeing their efficacy is not always possible.
  - Recommendation: _The search will look for any instances of these functions where the first argument is based on any non fixed input_.