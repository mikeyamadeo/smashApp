

/***********************************************************************
	Array.prototype.find()
	----------------------
	The find() method returns a value in the array, if an element in 
	the array satisfies the provided testing function. Otherwise 
	undefined is returned.

	This method has been added to the ECMAScript 6 specification and may 
	not be available in all JavaScript implementations yet. 
	However, you can polyfill Array.prototype.find with the following 
	snippet:

	- MDN
************************************************************************/
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
      }
      return undefined;
    }
  });
}