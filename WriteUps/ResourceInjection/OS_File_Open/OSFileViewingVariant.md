# Source Code
The application can open a specified file on the server and return the contents to the client. 

## fileex.js
This file will send a simple html web page that will send a form to the server. The data received from the form is the name of a file to open. The contents of the file are then sent to the client.

```
var express = require('express'); //expressJS web framework
var app = express();
var path = require('path'); //path package finds current directory
app.use(express.urlencoded({extended: true}));
var fs = require('fs'); //fs standard file library
var file = "";

//Initially sends the html file with the form embedded
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/demofile1.html'));
});

//handles recieving the form data and responding with the file data
app.post('/', function(req, res){
	file = req.body.name_field;
	fs.readFile(file, function(err, data){
		res.send(data + err);
	})
});

app.listen(process.env.port || 8080);
console.log('Running on port 8080');

```

## demofile1.html
This file is shown to the client on the web browser. The user data that is inputted is the file they would like to open.

```
<DOCTYPE! html>
<html>
<body>
<h1>Pick a file to cat</h1>
<form action = "" method = "post">
	<label for="test">Enter file here</label>
	<input id="test" type="text" name="name_field" value="">
	<input type="submit" value="OK">
<p id="output"><br>One example is fileex.js</p>
</form>
</body>
</html>
```
## Syntax Searchability
To search for this vulnerability, search for this function call and check for a variable that is an un-sanitized path to the file.
```readFile(#pathToFile)```

# Running the sample

## Dependencies
You can install these with the following command `npm install some-dependencies`

- express 

## Running application
Once the dependencies are installed, run `node fileex.js` and open a web browser. In the url, type `localhost:8080`. This will load the html file. Once loaded, type the name of the file to open and click ok.

# Payload

## Procedure
How do I run the exploit? 

- Input this in the textbox
  - Payload1
    - /etc/hosts
    - This payload can open the list of hosts on the server and their IP address
  - Payload2
    - /home/_found user_/.ssh/id_rsa.pub
    - This payload can open a user's ssh public key
  - Payload3
    - /etc/os-release
    - This payload can open the information about the server's system and version 

## Why it works?
The payloads are working because the input was changed to open files in a different directory. The web app is supposed to open a file for the client that is stored on the server, but with this vulnerability, any important file can be found and opened on the server.