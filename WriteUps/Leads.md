# Leads

## Alt-0.18.6

[github](https://github.com/goatslacker/alt)

### /dist/alt.js
##### 30:
```
 	function __webpack_require__(moduleId) {

 		if(installedModules[moduleId])
 			return installedModules[moduleId].exports;

 		var module = installedModules[moduleId] = {
 			exports: {},
 			id: moduleId,
 			loaded: false
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);


 		module.loaded = true;

 		return module.exports;
 	}

```

## Angular-1.7.8
[github website](https://github.com/angular/angular.js)
### /angular.js
##### 5030:

```
function runInvokeQueue(queue) {
        var i, ii;
        for (i = 0, ii = queue.length; i < ii; i++) {
          var invokeArgs = queue[i],
              provider = providerInjector.get(invokeArgs[0]);

          provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
        }
```
False Positive

##### 19648:

```
$emit: function(name, args) {
        var empty = [],
            namedListeners,
            scope = this,
            stopPropagation = false,
            event = {
              name: name,
              targetScope: scope,
              stopPropagation: function() {stopPropagation = true;},
              preventDefault: function() {
                event.defaultPrevented = true;
              },
              defaultPrevented: false
            },
            listenerArgs = concat([event], arguments, 1),
            i, length;

        do {
          namedListeners = scope.$$listeners[name] || empty;
          event.currentScope = scope;
          for (i = 0, length = namedListeners.length; i < length; i++) {
            if (!namedListeners[i]) {
              namedListeners.splice(i, 1);
              i--;
              length--;
              continue;
            }
            try {
              namedListeners[i].apply(null, listenerArgs);
            } catch (e) {
              $exceptionHandler(e);
            }
          }
          if (stopPropagation) {
            break;
          }
          scope = scope.$parent;
        } while (scope);
        event.currentScope = null;
        return event;
      },
```
FP?

##### 19720:

```
            try {
              listeners[i].apply(null, listenerArgs);
            } catch (e) {
              $exceptionHandler(e);
            }
```
FP?

##### 6372, 6376:
```
      then: function(resolveHandler, rejectHandler) {
        return this.getPromise().then(resolveHandler, rejectHandler);
      },
      'catch': function(handler) {
        return this.getPromise()['catch'](handler);
      },
      'finally': function(handler) {
        return this.getPromise()['finally'](handler);
      },
```
False positive

##### 6630:

```
if ($sniffer.history && (!sameBase || !sameState)) {
        history[replace ? 'replaceState' : 'pushState'](state, '', url);
        cacheState();
      } 
```
False Positive
##### 11382:

```
emoveWatch = scope[definition.collection ? '$watchCollection' : '$watch'](parentGet, function parentValueWatchAction(newValue, oldValue) {
```

False Positive

##### 13976:

```
        return extend(function interpolationFn(context) {
            var i = 0;
            var ii = expressions.length;
            var values = new Array(ii);

            try {
              for (; i < ii; i++) {
                values[i] = parseFns[i](context);
              }

              return compute(values);
            } catch (err) {
              $exceptionHandler($interpolateMinErr.interr(text, err));
            }

          }
```

FP?

##### 16930:

```
        function(scope, locals, assign, inputs) {
          var values = [];
          for (var i = 0; i < args.length; ++i) {
            values.push(args[i](scope, locals, assign, inputs));
          }
          var value = right.apply(undefined, values, inputs);
          return context ? {context: undefined, name: undefined, value: value} : value;
        }
```

FP?

##### 16941:

```
if (rhs.value != null) {
            var values = [];
            for (var i = 0; i < args.length; ++i) {
              values.push(args[i](scope, locals, assign, inputs));
            }
            value = rhs.value.apply(rhs.context, values);
          }
```

FP?

##### 16964:

```
return function(scope, locals, assign, inputs) {
        var value = [];
        for (var i = 0; i < args.length; ++i) {
          value.push(args[i](scope, locals, assign, inputs));
        }
        return context ? {value: value} : value;
      };
```

FP?

##### 17449:

```
for (var i = 0, ii = inputExpressions.length; i < ii; i++) {
          var newInputValue = inputExpressions[i](scope);
          if (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i], inputExpressions[i].isPure))) {
            oldInputValues[i] = newInputValue;
            oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue);
          }
        }
```

FP?

##### 22787:

```
paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) +
                padNumber(Math.abs(zone % 60), 2);
```

False Positive

##### 30768:

```
    if (this.$$parserValid) {
      for (var i = 0; i < this.$parsers.length; i++) {
        modelValue = this.$parsers[i](modelValue);
        if (isUndefined(modelValue)) {
          this.$$parserValid = false;
          break;
        }
      }
    }
```

FP?

##### 31072:

```
/**
   * This method is called internally to run the $formatters on the $modelValue
   */
  $$format: function() {
    var formatters = this.$formatters,
        idx = formatters.length;

    var viewValue = this.$modelValue;
    while (idx--) {
      viewValue = formatters[idx](viewValue);
    }

    return viewValue;
  },
```

FP?

##### 34148:

```
$animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
```

False Positive

##### 34365:

```
$animate[value ? 'addClass' : 'removeClass'](element,NG_HIDE_CLASS, {
```

False Positive

## Angular-mocks-1.7.8
[github](https://github.com/angular/angular.js/tree/master/src/ngMock)

### /angular-mocks.js
##### 1103:

```
angular.forEach(
     ['animate','enter','leave','move','addClass','removeClass','setClass'], function(method) {
        animate[method] = function() {
          animate.queue.push({
            event: method,
            element: arguments[0],
            options: arguments[arguments.length - 1],
            args: arguments
          });
          return $delegate[method].apply($delegate, arguments);
        };
      });
```

Looks like a false positive

##### 2126:

```
    angular.forEach(['GET', 'DELETE', 'JSONP', 'HEAD'], function(method) {
     $httpBackend[prefix + method] = function(url, headers, keys) {
        assertArgDefined(arguments, 0, 'url');
        if (angular.isUndefined(url)) url = null;
       return $httpBackend[prefix](method, url, undefined, headers, keys);
     };
    });
```

FP?

##### 2137:

```
return $httpBackend[prefix](method, url, data, headers, keys);
```

within same larger function as above.

## Angular-resource-1.7.8
[github](https://github.com/angular/angular.js/tree/master/src/ngResource)

### /angular-resources.js
##### 898:

```
Resource.prototype['$' + name] = function(params, success, error) {
            if (isFunction(params)) {
              error = success; success = params; params = {};
            }
            var result = Resource[name].call(this, params, this, success, error);
            return result.$promise || result;
          };
```



## Backbone-1.4.0
[github](https://github.com/jashkenas/backbone)

### /backbone.js
##### 1463, 1466, 1469, 1474: 

```
var addMethod = function(base, length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return base[method](this[attribute]);
      };
      case 2: return function(value) {
        return base[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return base[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return base[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return base[method].apply(base, args);
      };
    }
  };
```

This is a suspect sink because the base, method, and attribute can all be given as input to this function. Reading the [documentation](https://backbonejs.org) further will explain if this is vulnerable code and worth looking into.



##### 1059:
```var method = options.reset ? 'reset' : 'set'; 
collection[method](resp, options);
```

This find is a false positive because the method in this case can only ever be one of the two literals. There is no way to inject another method on collection.



##### 1999:
```this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);```

Similar to the previous example, this find is a false positive. This is a false positive because the values for the attribute of the object `history` can only ever be one of two literals. Because of this, there is no way to inject any other method.

## Depot-0.1.6

[npm](https://www.npmjs.com/package/depot) namespaced localStorage wrapper with a simple API

###/specs/vendor/chai.js
##### 2333:
already documented true positive

### /specs/vendor/mocha.js
##### 521:

```
lse if (isArray(handler)) {
    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
  }
```



## Director-1.2.8
[github](https://github.com/flatiron/director)

### /build/director.js
##### 519:

```
else {
    apply = function(fn) {
      if (Array.isArray(fn)) {
        return _every(fn, apply);
      } else if (typeof fn === "function") {
        return fn.apply(thisArg, fns.captures || []);
      } else if (typeof fn === "string" && self.resource) {
        self.resource[fn].apply(thisArg, fns.captures || []);
      }
    };
    _every(fns, apply);
  }
```



##### 58:

```
    function onchange(onChangeEvent) {
      for (var i = 0, l = Router.listeners.length; i < l; i++) {
        Router.listeners[i](onChangeEvent);
      }
    }
```

FP?

##### 338:

```
function paramifyString(str, params, mod) {
  mod = str;
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      mod = params[param](str);
      if (mod !== str) {
        break;
      }
    }
  }
  return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
}
```



### /lib/director/browser.js
##### 49:

```
    function onchange(onChangeEvent) {
      for (var i = 0, l = Router.listeners.length; i < l; i++) {
        Router.listeners[i](onChangeEvent);
      }
    }
```

FP?

### /lib/director/http/index.js
##### 144:

```
  if (this._attach) {
    for (var i = 0; i < this._attach.length; i++) {
      this._attach[i].call(thisArg);
    }
  }
```

FP?

###  /lib/director/router.js
##### 451:

```
  else {
    apply = function(fn){
      if (Array.isArray(fn)) {
        return _every(fn, apply);
      }
      else if (typeof fn === 'function') {
        return fn.apply(thisArg, fns.captures || []);
      }
      else if (typeof fn === 'string' && self.resource) {
        self.resource[fn].apply(thisArg, fns.captures || []);
      }
    }
    _every(fns, apply);
  }
```



##### 81:

```
function paramifyString(str, params, mod) {
  mod = str;
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      mod = params[param](str);
      if (mod !== str) { break; }
    }
  }

  return mod === str
    ? '([._a-zA-Z0-9-%()]+)'
    : mod;
}
```

## Flot-3.2.5 (most current version is 3.2.9)
[github](https://github.com/flot/flot) used for plotting

### /source/jquery.flot.js
##### 370:
```
function executeHooks(hook, args) {
	args = [plot].concat(args);
	for (var i = 0; i < hook.length; ++i) {
		hook[i].apply(this, args);
	}
}
```

### /source/jquery.flot.hover.js
##### 289:
```
octx.beginPath();
var symbol = series.points.symbol;
if (symbol === 'circle') {
	octx.arc(x, y, radius, 0, 2 * Math.PI, false);
} else if (typeof symbol === 'string' && plot.drawSymbol && plot.drawSymbol[symbol]) {
	plot.drawSymbol[symbol](octx, x, y, radius, false);
}
```

False Positive

### /source/jquery.flot.time.js
##### 174:
```
function addProxyMethod(sourceObj, sourceMethod, targetObj, targetMethod) {
	sourceObj[sourceMethod] = function() {
		return targetObj[targetMethod].apply(targetObj, arguments);
	};
}
```

False Positive (Function local to another function)

### /source/jquery.flot.touch.js
##### 62, 65, 71, 74:
```
function executeAction(e, gesture) {
	switch (gesture) {
		case 'pan':
			pan[e.type](e);
			break;
		case 'pinch':
			pinch[e.type](e);
			break;
		case 'doubleTap':
			doubleTap.onDoubleTap(e);
			break;
		case 'longTap':
			longTap[e.type](e);
			break;
		case 'tap':
			tap[e.type](e);
			break;
	}
}
```

False Positive (?) (Function calls statically defined functions with arbitrary args)

### /lib/jquery.event.drag.js
##### 141:
```
// toggles text selection attributes
function selectable ( elem, bool ){
	if ( !elem ) return; // maybe element was removed ?
	elem = elem.ownerDocument ? elem.ownerDocument : elem;
	elem.unselectable = bool ? "off" : "on"; // IE
	if ( elem.style ) elem.style.MozUserSelect = bool ? "" : "none"; // FF
	$.event[ bool ? "remove" : "add" ]( elem, "selectstart mousedown", dontStart ); // IE/Opera
};
```

False Positive

### /lib/globalize.js
##### 380:
```
truncate = function( value ) {
	if ( isNaN( value ) ) {
		return NaN;
	}
	return Math[ value < 0 ? "ceil" : "floor" ]( value );
};
```

False Positive (Function calls unexploitable function)


## Jade-1.11.0
Used by developers

## Jquery-3.4.1
### /dist/jquery.js

11

### /dist/jquery.slim.js

7

### /external/sizzle/dist/sizzle.js

5

### /src/deferred.js

1

### /src/effects/Tween.js

2

### /src/effects.js

2

### /src/manipulation.js

1

## Jquery-migrate-3.1.0

### /build/release.js

2

## Mocha-6.2.0
[github](https://github.com/mochajs/mocha) A test framework

### /mocha.js
##### 1:
```
// Unminified
function r(e, n, t) {
    function o(i, f) {
        if (!n[i]) {
            if (!e[i]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i, !0);
                if (u) return u(i, !0);
                var a = new Error("Cannot find module '" + i + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var p = n[i] = {
                exports: {}
            };
            e[i][0].call(p.exports, function(r) {
                var n = e[i][1][r];
                return o(n || r)
            }, p, p.exports, r, e, n, t)
        }
        return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
}
```

False Positive (?) (Heavily Obfuscated)


##### 10860:
```
// The require function
function __webpack_require__(moduleId) {
	if(installedModules[moduleId])
		return installedModules[moduleId].exports;

	var module = installedModules[moduleId] = {
		exports: {},
		id: moduleId,
		loaded: false
	};

	modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	module.loaded = true;

	return module.exports;
}
```

Also found in Alt.js.

##### 12751:
```
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
```

##### 12761:
```
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
```

##### 12771:
```
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
```

##### 12781:
```
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}
```

##### 12792:
```
function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}
```

##### 8405:
```
// ...
}).call(this,require('_process'))
},{"_process":69,"stream":84,"util":89}],42:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
```

False Positive (?) 

##### 15613:
```
for (var i in stream) {
	if (this[i] === undefined && typeof stream[i] === 'function') {
	  this[i] = function (method) {
		return function () {
		  return stream[method].apply(stream, arguments);
		};
	  }(i);
	}
}
```

False Positive (?) (Seems like legacy support)

### /lib/cli/run.js
##### 255:
```
Object.keys(ONE_AND_DONES).forEach(opt => {
	if (argv[opt]) {
	  ONE_AND_DONES[opt].call(null, yargs);
	  process.exit();
	}
});
```

False Positive (Function calls statically defined functions)

## Pako-1.0.10
[github](https://github.com/nodeca/pako) done to understand how fast JS can be and is it necessary to develop native C modules for CPU-intensive tasks

### /dist/pako.js
##### 649:
```
if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {
        if (this.options.to === 'string') {
		// ...
```

False Positive

### /dist/pako_deflate.js
##### 649:
```
var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0
```

False Positive

### dist/pako_inflate.js
##### 649:
```
wsize = state.wsize;
whave = state.whave;
wnext = state.wnext;
s_window = state.window;
```

False Positive

## Prototype-0.0.5
(would have to check with prototypeJS)

### /lib.Class.js
##### 59: (apply)
### /lib.Enumerable.js
##### 128: (apply)
### .lib.String.js
evalScripts documented. evalJSON?

## Should-13.2.3
[github](https://github.com/shouldjs/should.js) used for testing, like "assertions"

### /as-function.js, /cjs/should.js, /es6/should.js
##### 387/387/383:
```
Object.defineProperty(PromisedAssertion.prototype, name, {
	enumerable: true,
	configurable: true,
	value: function() {
	  var args = arguments;
	  this.obj = this.obj.then(function(a) {
		return a[name].apply(a, args);
	  });

	  return this;
	}
});
```

FP?

### /should.js
##### 157:
```
getFirstMatch: function(obj) {
	var typeOf = typeof obj;
	var cls = toString.call(obj);

	for (var i = 0, l = this.checks.length; i < l; i++) {
	  var res = this.checks[i].call(this, obj, typeOf, cls);
	  if (typeof res !== 'undefined') {
		return { result: res, func: this.checks[i], index: i };
	  }
	}
}
```

##### 1788:
```
Object.defineProperty(PromisedAssertion.prototype, name, {
	enumerable: true,
	configurable: true,
	value: function() {
	  var args = arguments;
	  this.obj = this.obj.then(function(a) {
		return a[name].apply(a, args);
	  });

	  return this;
	}
});
```

Same as in the dist files.

##### 2898:
```
function addOneOf(name, message, method) {
	Assertion.add(name, function(vals) {
	  if (arguments.length !== 1) {
		vals = Array.prototype.slice.call(arguments);
	  } else {
		should(vals).be.Array();
	  }

	  this.params = { operator: message, expected: vals };

	  var obj = this.obj;
	  var found = false;

	  forEach(vals, function(val) {
		try {
		  should(val)[method](obj);
		  found = true;
		  return false;
		} catch (e) {
		  if (e instanceof should.AssertionError) {
			return; //do nothing
		  }
		  throw e;
		}
	  });

	  this.assert(found);
	});
}
```

FP?


## Sizzle-2.3.4
[github](https://github.com/jquery/sizzle) A pure-JavaScript CSS selector engine designed to be easily dropped in to a host library.

### /dist/sizzle.js
##### 1549:
```
"parent": function( elem ) {
	return !Expr.pseudos["empty"]( elem );
}
```

False Positive

##### 1682:
```
for ( type in Expr.filter ) {
	if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
		(match = preFilters[ type ]( match ))) ) {
		matched = match.shift();
		tokens.push({
			value: matched,
			type: type,
			matches: match
		});
		soFar = soFar.slice( matched.length );
	}
}
```

False Positive

##### 1788:
```
function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}
```

False Positive

##### 1989:
```
var elem, j, matcher,
	matchedCount = 0,
	i = "0",
	unmatched = seed && [],
	setMatched = [],
	contextBackup = outermostContext,
	// We must always have either seed elements or outermost context
	elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
	// Use integer dirruns iff this is the outermost matcher
	dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
	len = elems.length;
```

False Positive

##### 2144:
```
context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
```

False Positive

## Twitter-bootstrap-2.1.1
[github](https://github.com/twbs/bootstrap) sleek, intuitive, and powerful front-end framework for faster and easier web development

### /docs/assests/js/bootstrap-alert.js
#### 76:

```
if (typeof option == 'string') data[option].call($this)
```

### /docs/assests/js/bootstrap-dropdown.js

#### 131:

```
if (typeof option == 'string') data[option].call($this)
```



### /docs/assests/js/bootstrap-popover.js

#### 46,47:

```
$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
$tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)
```

False Positive

### /docs/assests/js/bootstrap-tooltip.js

#### 157:

```
$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
```

False Positive

### /docs/assests/js/bootstrap.js
#### 135:

```
if (typeof option == 'string') data[option].call($this)
```



#### 706

```
if (typeof option == 'string') data[option].call($this)
```



#### 1119:

```
$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
```

False Positive

#### 1283, 1284:

```
$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
$tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)
```

False Positive

### /docs/assests/js/jquery.js

2
{"line":3,"column":11381},"end":{"line":3,"column":11385}}],"obj":[{"start":{
"line":2,"column":2259},"end":{"line":2,"column":2260}},{"start":
{"line":2,"column":2615},"end":{"line":2,"column":2616}},{"start":
{"line":2,"column":26893},"end":{"line":2,"column":26894}},{"start":
{"line":2,"column":28719},"end":{"line":2,"column":28723}},{"start":
{"line":3,"column":13693},"end":{"line":3,"column":13703}},{"start":
{"line":3,"column":14498},"end":{"line":3,"column":14504}},{"start":
{"line":3,"column":14948},"end":{"line":3,"column":14959}},{"start":
{"line":3,"column":21520},"end":{"line":3,"column":21532}},{"start":
{"line":4,"column":3476},"end":{"line":4,"column":3483}},{"start":
4


### /js/bootstrap-alert.js


### /js/bootstrap-popover.js

### /js/bootstrap-tooltip.js

all are same as file in /docs

9 files

## Vis-4.21.0-EOL (deprecated)
[github](https://github.com/almende/vis)dynamic, browser based visualization library

reccommends using https://github.com/visjs instead

### /dist/vis.js

13

### /docs/js/bootstrap.js

7

### /lib/network/modules/components/nodes/util/ShapeBase.js

1