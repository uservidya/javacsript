/* Insertion Sort
 * ==============
 *
 * Best-case Time Complexity: O(n?)
 * Worst-case Time Complexity: O(n^2)
 * Average Time Complexity: O(n^2)
 * Worst-case Space Complexity: O(n)
 */
var insertionSort = (function() {
  var defaultComparator = function(a, b) {
    return a - b;
  };

  var swap = function(array, ix1, ix2) {
    var temp = array[ix1];
    array[ix1] = array[ix2];
    array[ix2] = temp;
  };


  return function(array, comparator) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new TypeError('Target must be an array but is: ' + typeof array);
    }

    comparator = (typeof comparator === 'function') ? comparator : defaultComparator;

    var i, j, min,
        len = array.length;

    for (i = 0; i < len; i++) {
      min = i;
      for (j = i + 1; j < len; j++) {
        if (comparator(array[min], array[j]) > 0) {
          min = j;
        }
      }

      if (min !== i) {
        swap(array, min, i);
      }
    }

    return array;
  };
}());

module.exports = insertionSort;
