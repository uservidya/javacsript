define(function() {
  // Creates a quicksort function and any necessary utility functions.
  return function() {
    // Takes an array and a left/right index. Performs an in-place swap of the
    // elements located at those indices.
    var swap = function(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    };

    // Sorts an array in O(2n) average and worst-case time and ~O(1) space complexity
    var bubblesort = function(array) {
      // Visit each node in the array and compare it to the next node. If the next
      // node is less than the current node, swap the two nodes.
      if (array.length > 1) {
        for (var i = 0, len = array.length; i < len; i++) {
          for (var j = 0; j < len - 1; j++) {
            if (array[j] > array[j + 1]) {
              swap(array, j, j + 1);
            }
          }
        }
      }

      // Return the sorted array.
      return array;
    };

    return bubblesort;
  };
});
