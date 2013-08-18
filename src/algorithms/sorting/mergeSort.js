/* Merge sort
 * ==========
 *
 * Best-case Time Complexity: O(n)
 * Worst-case Time Complexity: O(n log n)
 * Average Time Complexity: O(n log n)
 * Worst-case Space Complexity: O(n)
 */
var mergeSort = (function() {
  var defaultComparator = function(a, b) {
    return a - b;
  };

  var merge = function() {
    if (array.length === 1) {
    }
  };

  return function(array) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new TypeError('Target must be an array but is: ' + typeof array);
    }

    comparator = typeof comparator === 'function' ? comparator : defaultComparator;

    if (array.length > 1) {
      // TODO: Body of function here
    }

    return array;
  };
}());
