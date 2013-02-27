// Configure Require.js
var requirejs = require("requirejs");
requirejs.config(require("../../require-config"));

requirejs(['buster', 'quicksort'], function(buster, createQuicksort) {
  // Setup for expect-style assertations
  var expect = buster.assertions.expect;
  buster.spec.expose();

  describe('Quicksort', function() {
    var array, array2, quicksort;

    before(function() {
      array = [34, 203, 3, 746, 200, 984, 198, 764, 9];

      // Sort the array numerically/ascending using JavaScript's native sorting function
      array2 = [34, 203, 3, 746, 200, 984, 198, 764, 9].sort(
        function(a, b) { return a - b; }
      );

      // Create an instance of the quicksort function
      quicksort = createQuicksort();
    });


    // TODO: Break each function out into separate modules so each can be tested
    it('should sort an input array in ascending numerical order', function() {
      expect(quicksort(array)).toEqual(array2);
    });

  });
});
