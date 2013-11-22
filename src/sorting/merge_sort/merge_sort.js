'use strict';

var mergeSort = (function() {
  var defaultComparator = function(a, b) {
    return a - b;
  };

  var merge = function(left, right, comparator) {
    var result = [];
    var leftIndex = 0;
    var rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (comparator(left[leftIndex], right[rightIndex]) > -1) {
        result.push(left[leftIndex]);
        leftIndex += 1;
      } else {
        result.push(right[rightIndex]);
        rightIndex += 1;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  // Allow the user to pass in a comparator function, but keep the function's
  // arity at 1
  return function mergeSort(array /*, comparator */) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new TypeError('Target must be an array but is: ' + typeof array);
    }

    if (array.length < 2) {
      return array;
    }

    var comparator = typeof arguments[1] === 'function' ? arguments[1] : defaultComparator;
    var middle = Math.floor(array.length / 2);
    var left = array.slice(0, middle);
    var right = array.slice(middle);
    var result = merge(mergeSort(left), mergeSort(right), comparator);

    result.unshift(0, array.length);
    Array.prototype.splice.apply(array, result);

    return array;
  };
}());

module.exports = mergeSort;
