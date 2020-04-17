# Regular Expression Denial of Service Injection (ReDoS)

# Description
When unsanitized user input is included in or as a regular expression, malicious expressions may be submitted that take much longer to complete, increasing server hang time. An expression is considered "evil" if it will purposely get stuck on user crafted input.

**Evil Regex** patterns contain:

- Grouping with repetition
- Inside the repeated group:
  - Repetition
  - Alternation with overlapping

# Capabilities
This type of attack has the ability to take up server processing time, resulting in a delay of response or Denial of Service to other clients.

Examples of **Evil Regexes** include:
- `^(a+)+$`
- `^([a-zA-Z]+)*$`
- `^(a|aa)+$`
- `^(a|a?)+$`
- `^(.*a){x} | for x > 10$`

All examples above are susceptible to the input `aaaaaaaaaaaaaaaaaaaaaaaa!`, with the input length changing slightly depending on the processing power of the server.

# Limitations
The capabilities of ReDoS attacks are limited to taking up processing time, and are unable to execute arbitrary commands, access files, or spoof the server.

# Mitigations
The best way to avoid this type of attack is to prevent user data from directly entering the Regex, or if this is unavoidable, limiting the input to blacklist any special characters. Another way to avoid this attack is to prevent user access to strings the Regex will be used on, however attacks can still be made regardless of whether this precaution has been taken.

# Examples
`expoitable.js`

```javascript
//Handles GET Request
app.get('/findKey', function(req, res) {
  var key = req.param("key"), input = req.param("input");

  // BAD: Unsanitized user input is used to construct a regular expression
  var re = new RegExp(key);

  res.end(input.search(re).toString())

});
```
### Running the Exploit
#### Starting server
After downloading the source and installing the dependencies you can run the server by doing:

- `foo@bar:~$ cd /path/to/base_packages/`
- `foo@bar:~$ node exploitable.js`

#### Payload Procedure

- Go to `localhost:8080/findkey?key=<insert regex here>&input=<insert input string here>` or whatever port server is hosted on
- Input is entered through url via GET request

#### Example Payload
`localhost:8080/findkey?key=%5E(a%2B)%2B%24%20&input=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaX`

This Regex will create a large search on the server that will cause the application to hang.

# Searching for vulnerability
This kind of vulnerability can be found wherever user input is passed into a regular expression.
