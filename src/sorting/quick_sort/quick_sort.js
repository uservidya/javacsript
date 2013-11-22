'use strict';

var quickSort = (function() {
  var defaultComparator = function(a, b) {
    return a - b;
  };

  var medianOfThree = function(a, b, c) {
    return (a + b + c) - Math.min(a, b, c) - Math.max(a, b, c);
  };

  var getPivotIndex = function(left, right) {
    return medianOfThree(left, Math.floor((left + right) / 2), right);
  };

  var swap = function(array, ix1, ix2) {
    var temp = array[ix1];
    array[ix1] = array[ix2];
    array[ix2] = temp;
  };

  var partition = function(array, comparator, left, right) {
    var pivot = array[getPivotIndex(left, right)];

    while (left <= right) {
      while (comparator(array[left], pivot) < 0) {
        left += 1;
      }

      while (comparator(array[right], pivot) > 0) {
        right -= 1;
      }

      if (left <= right) {
        swap(array, left, right);
        left += 1;
        right -= 1;
      }
    }

    return left;
  };

  return function quickSort(array, comparator, left, right) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new TypeError('Target must be an array but is: ' + typeof array);
    }

    right = typeof right === 'number' ? right : array.length - 1;
    left = typeof left === 'number' ? left : 0;
    comparator = typeof comparator === 'function' ? comparator : defaultComparator;

    var index;

    if (array.length > 1) {
      index = partition(array, comparator, left, right);

      if (left < index - 1) {
        quickSort(array, comparator, left, index - 1);
      }

      if (right > index) {
        quickSort(array, comparator, index, right);
      }
    }

    return array;
  };
}());

module.exports = quickSort;
