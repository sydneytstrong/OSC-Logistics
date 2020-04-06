# Backbone v1.4.0 (Server Side JS Injection)

### /backbone.js

```JavaScript
// Proxy Backbone class methods to Underscore functions, wrapping the model's
// `attributes` object or collection's `models` array behind the scenes.
//
// collection.filter(function(model) { return model.get('age') > 10 });
// collection.each(this.addView);
//
// `Function#apply` can be slow so we use the method's arg count, if we know it.
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
