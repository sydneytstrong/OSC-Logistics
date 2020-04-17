# SQL Syntax Pattern

Since SQL database connections are used in NodeJS in the 'mysql' library, using the top down approach to finding the sink will reduce the number of false positives and ensure a path can be found. The path to the sink is a series of function calls. Here is the top down traversal of the AST function calls that lead to the sink:

```require('mysql')``` -> ```createconnection({*})``` -> ```query(*)```  

Each function call returns an object that contains a function call that leads to the sink. SQL Injection could happen whenever the create connection object makes a query function call:

```<connection object>.query(<potential path to user input>)```

If a function or alias is used, the above function will be a subtree in the AST. The path from user input to this vulnerability will then be a step longer, but the path can still be found. The function call may change a little to look this this:

``` <new name> = <object>.query()```

``` <new name>(<path to user input>)```

Where the query method is renamed to make calling it easier in the source code. At execution, the query function is still the function that is being called.

## Query Function Call

The query function can take two or three parameters:

#### query(cmdString, callbackFunction) 
- Here the cmdString parameter could have user input.

#### query(cmdString, valuesArray, callbackFunction) 
- Here cmdString and/or values may have user input.

### Finding User Input

The cmdString needs to be traced to see if user input is concatenated in.

If the cmdString or valuesArray doesn't contain user input, then an injection is not possible. 