// Configure Require.js
var requirejs = require("requirejs");
requirejs.config(require("../../require-config"));

requirejs(['buster', 'bubblesort'], function(buster, createBubblesort) {
  // Setup for expect-style assertations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  describe('Bubble Sort', function() {
    var array, array2, bubblesort;

    before(function() {
      array = [34, 203, 3, 746, 200, 984, 198, 764, 9];

      // Sort the array numerically/ascending using JavaScript's native sorting
      // function
      array2 = [34, 203, 3, 746, 200, 984, 198, 764, 9].sort(
        function(a, b) { return a - b; }
      );

      // Create an instance of the bubblesort function
      bubblesort = createBubblesort();
    });


    // TODO: Break each function out into separate modules so each can be tested
    it('should sort an input array in ascending numerical order', function() {
      expect(bubblesort(array)).toEqual(array2);
    });

  });
});
