define(function() {
  // Creates a quicksort function and a few utility functions.
  return function() {
    // Takes an array and a left/right index. Performs an in-place swap of the
    // elements located at those indices.
    var swap = function(array, left, right) {
      var temp = array[left];
      array[left] = array[right];
      array[right] = temp;
    };

    // Takes an array and splits it into two subarrays. Swaps values between those
    // subarrays around a pivot value so that values in the left subarray are less
    // than the pivot, and values in the right half are greater than or equal to
    // the pivot. Returns an array so we can know when to stop recursing.
    var partition = function(array, left, right) {
      // Make sure to grab hold of the pivot value rather than referring to an ix.
      // The pivot is a value; its location in the array will move during the sort.
      //
      // Pick a pivot in the center of the array to prevent worst-case performance
      // on presorted arrays; a random value is also a good choice. Beginning or end
      // of array is not a good choice.
      var pivot = array[Math.floor((left + right) / 2)],
          // Set up pointers that will track progress through the subarrays
          l = left,
          r = right;

      // Loop through the array until the pointers meet
      while (l <= r) {
        // Loop through the left subarray until we find a value less than the pivot
        while (array[l] < pivot) {
          l++;
        }

        // Loop through the right subarray until we find a value greater than the pivot
        while (pivot < array[r]) {
          r--;
        }

        // If the pointers haven't run over each other, swap the values at their
        // indices
        if (l <= r) {
          swap(array, l, r);
          // Set up for the next iteration
          l++;
          r--;
        }
      }

      return l;
    };

    // Sort an array in O(n log n) average time, O(n^2) worst case time on presorted
    // arrays. Picking a pivot from the center of the array (or a random pivot) helps
    // us mitigate that worst-case scenario.
    var quicksort = function(array, left, right) {
      // Set default values for left and right indices
      left = typeof left === 'number' ? left : 0;
      right = typeof right === 'number' ? right : array.length - 1;

      // For performance, only perform a sort if the array has two or more elements
      if (array.length > 1) {
        // Grab the left index value given by partition. We'll use this to track
        // whether or not we're done sorting.
        var index = partition(array, left, right);

        if (left < index - 1) {
          quicksort(array, left, index - 1);
        }

        if (index < right) {
          quicksort(array, index, right);
        }
      }

      // Return the sorted array
      return array;
    };

    return quicksort;
  };
});
