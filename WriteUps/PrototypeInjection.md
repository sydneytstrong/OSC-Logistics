# Prototype (Server and Client Side JS Injection)
## Purpose of Prototype

The goal of this package is to implement Ruby-like features in JS. This project has forked and has been continued on github as a client side resource. The client side has the same vulnerability with evalScripts, and is used in other functions like replace and update. 

## Server code vs Client code

It is possible to fork the current version of PrototypeJS and convert that code to be able to run on a server. This can be done by rewriting a few lines in the prototype file as shown:

##### Client:

```javascript
  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,
    SelectorsAPI: true,
    ElementExtensions: true,
    SpecificElementExtensions: true
  },
```

Here `document` is used to get the information from the browser. In the server code, however, these values are replaced with false so key words like `document` are never used.

##### Server:

```javascript
  Browser: {
    IE:             false,
    Opera:          false,
    WebKit:         false,
    Gecko:          false,
    MobileSafari:   false
  },
  
  BrowserFeatures: {
    XPath: false,
    SelectorsAPI: false,
    ElementExtensions: false,
    SpecificElementExtensions: false
  },
```

This is exactly how the npm version of prototype was created from the PrototypeJS repository. This process of converting client code to server code could be done by forking the most current version and changing this file as shown. After compiling the `prototype.js`, it can be used as the index file and adding it to a `package.json` will add the ability to install via npm. Any other usage of `document` in other files may need to be removed. The examples used below are from the most current version on npm and github.

## Vulnerabilities
### Server side
##### lib/String.js - evalScripts()

Here is a snippet of exploitable code that our template finder found. This is a true positive of a server side potential vulnerability.

```javascript
function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
}
```
It calls extractScripts:
```javascript
function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }
}
```
Which compares it to this regular expression from Prototype.js.
```javascript
ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
```
If true, it will return the contents of the script tags back to the `evalScripts` functions and be evaluated by `eval`. With the right payload and server code, this API can be exploited.

### Client side
##### src/prototype/lang/string.js - evalScripts()

In the most up to date version of prototype, `evalScripts` is written the same as the npm version.

```javascript
function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
}
```

However, this API is used more in the most recent version, and the implementation of `evalScripts` is not at all obvious. Two other APIs that use this sink are `update` and `replace`.

```javascript
function replace(element, content) {
    element = $(element);
    if (content && content.toElement) {
      content = content.toElement();
    } else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  }
```

```javascript
function update(element, content) {
    element = $(element);
    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;
    while (i--) purgeElement(descendants[i]);
    if (content && content.toElement)
      content = content.toElement();
    if (Object.isElement(content))
      return element.update().insert(content);
    content = Object.toHTML(content);
    var tagName = element.tagName.toUpperCase();
    if (ANY_INNERHTML_BUGGY) {
      if (tagName in INSERTION_TRANSLATIONS.tags) {
        while (element.firstChild)
          element.removeChild(element.firstChild);
        var nodes = getContentFromAnonymousElement(tagName, content.stripScripts());
        for (var i = 0, node; node = nodes[i]; i++)
          element.appendChild(node);
      } else {
        element.innerHTML = content.stripScripts();
      }
    } else {
      element.innerHTML = content.stripScripts();
    }
    content.evalScripts.bind(content).defer();
    return element;
  }
```

In both cases, `evalScripts` evaluates `content`, which may not be obvious to the developer and could be used in a way that leaves the application vulnerable to injection attacks.

## Running the demo (Server Side)

### Dependencies
You can install these with the following command `npm install [dependencies]`

- express
- body-parser
- path
- prototype@0.0.5

### Running the application
Download this [directory](https://github.uconn.edu/cjv17003/OSC-UConn/tree/master/Demo/Prototype) (Credentials are needed to access UConn's GitHub Repository). Run `node evalScripts_exploit.js` in the terminal where that directory is located.

## Payload

### Procedure
How do I run the exploit? 

- Go to `localhost:8080` in a web browser
- Input this payload into the textbox on the webpage: `(console.log('Hello'), 2+2)`. This input string is an expression sequence that will execute all the code in sequence and return the last expression's value. The server will execute the `console.log` first and return the result of the arithmetic. The message 'Hi' will be printed to the server's console while the 2+2 will be returned to the client in the browser. Any JavaScript can be embedded in this payload and this function will execute it on the server.

## Why it works?
Here is a snippet of the code that highlights a vulnerability in this package.

#### evalScripts_exploit.js

```javascript
app.post('/', function(req, res){
        let name = req.body.name_field;
        var val = '<script>'+name+'</script>';
        res.send('<p id="output">'+ val.evalScripts()+'</p>'+
                  '<form action = "" method = "get"><input type="submit" value="return"></form>');
});
```

The `name` variable is the input from the form. That is wrapped around script tags and evaluated by prototype's `evalScripts()` function. Without any built in counter measures, this API can execute anything the developer may not have thought to sanitize. This example is a server side vulnerability. Proper sanitization and avoiding this dangerous function could prevent an unexpected `eval` call.

## Running the demo (Client Side)

### Dependencies

You can install PrototypeJS from github for the most recent version. Once downloaded, follow the steps to ensure it is compiled with Ruby. This package will need to be in the same directory as the exploitable code under the `Prototype` folder.

### Running the application

Download this [directory](https://github.uconn.edu/cjv17003/OSC-UConn/tree/master/Demo/PrototypeJS) (Credentials are needed to access UConn's GitHub Repository). A version of prototype is available and can be assembled by running `git submodule update --init --recursive` in the top directory and `rake dist` in the prototype folder.

## Payload

### Procedure

How do I run the exploit? 

- Open the html file `demofile1.html` in any browser.

- The code is set to exploit `update`, but changing the comments can set it to exploit `replace`.

- Input this payload into the textbox on the webpage: `anything_here <script>console.log('Hi')</script>`. The `anything_here` will get either 'updated' or 'replaced' on the webpage. The script tags are added to run any JavaScript the attacker enters. Examples of payloads are as follows:

  <script>console.log('Hi')</script>
  <script>alert("Hello")</script>
  <script>window.open("secret.txt")</script>
  <script>console.log(document.cookie)</script>


## Why it works?

Here is a snippet of the code that highlights a vulnerability in this package.

#### demofile1.html - searchAndReplace()

```javascript
<script type="text/javascript" src="./prototype/dist/prototype.js"></script>
<script type="text/javascript">
		searchAndReplace = function(){
				let content = $("replace").value;
				let searchName = $("search").value;
				let element = search(searchName);

				if (element){
					$(element.id).replace(content);
					//$(element.id).update(content);
					$("output").update("Replace Complete");
				} else {
					$("output").update("No Results Found");
				}

				$("search").value = "";
				$("replace").value = "";
		};
</script>
```

The `searchAndReplace` function is run whenever the user presses the enter button after entering text into the textbox. By adding script tags from the input, it will be evaluated by prototype's `evalScripts()` function. Without any built in counter measures to prevent users adding these tags, this API can execute anything in script tags that the developer may not have thought is possible. This example is a client side vulnerability. Proper sanitization and avoiding this dangerous function could prevent an unexpected `eval` call.

Here's two screenshots of the browser before and after running `<script>console.log('Hi')</script>` as the payload:

![Screenshot (53)](C:\Users\Alex O'Neill\Pictures\Screenshots\Screenshot (53).png)
![Screenshot (54)](C:\Users\Alex O'Neill\Pictures\Screenshots\Screenshot (54).png)