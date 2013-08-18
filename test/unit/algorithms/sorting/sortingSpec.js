var sortUtils = require('./sortUtils'),
    bubbleSort = require(sortUtils.sortingPath('bubbleSort')),
    quickSort = require(sortUtils.sortingPath('quickSort')),
    insertionSort = require(sortUtils.sortingPath('insertionSort'));

describe('Sorting Algorithms', function() {
  var sampleArrays, sortedArrays;

  before(function() {
    sampleArrays = sortUtils.generateSampleArrays(10, 500);
    sortedArrays = {
      ascending: _.map(sampleArrays, function(array) {
        return array.sort(sortUtils.ascendingSort);
      }),

      descending: _.map(sampleArrays, function(array) {
        return array.sort(sortUtils.descendingSort);
      })
    };
  });

  describe('Bubble sort', function() {
    it('should sort arrays in ascending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(bubbleSort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });

    it('should sort arrays in descending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(bubbleSort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });
  });

  describe('Quicksort', function() {
    it('should sort arrays in ascending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(quickSort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });

    it('should sort arrays in descending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(quickSort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });
  });

  describe('insertionSort', function() {
    it('should sort arrays in ascending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(insertionSort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });

    it('should sort arrays in descending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(insertionSort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });
  });
});
