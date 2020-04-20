# SSJS Syntax Pattern

An SSJS Injection can happen whenever user data is parsed with `eval()`:

```eval(<user input>)```

If a function or alias is used, the above function will be a subtree in the AST. The path from user input to this vulnerability will then be a step longer, but the path can still be found. The function call may change a little to look this this:

``` <new name> = eval()```

``` <new name>(<user input data>)```

A developer may do this to obfuscate the eval function. The eval function may also be nested inside of another function.

## Function Call

The eval function can takes one parameter:

​	eval(javascriptExpressionString) or ``<new name>`(javascriptExpressionString)

​			- Here the expression parameter will have the user input that will be traced to find the entry points.
