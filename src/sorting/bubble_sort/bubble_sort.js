'use strict';

var bubbleSort = (function() {
  var defaultComparator = function(a, b) {
    return a - b;
  };

  var swap = function(array, ix1, ix2) {
    var temp = array[ix1];
    array[ix1] = array[ix2];
    array[ix2] = temp;
  };

  return function(array, comparator) {
    var i, j, swapped;

    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new TypeError('Target must be an array but is: ' + typeof array);
    }

    comparator = typeof comparator === 'function' ? comparator : defaultComparator;

    do {
      for (i = 0; i < array.length; i++) {
        swapped = false;
        for (j = 0; j < array.length - i; j++) {
          if (comparator(array[j], array[j + 1]) > 0) {
            swapped = true;
            swap(array, j, j + 1);
          }
        }
      }
    } while (swapped);

    return array;
  };
}());

module.exports = bubbleSort;
