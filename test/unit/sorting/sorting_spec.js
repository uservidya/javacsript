/*jshint -W053*/
// Allow `new Number()` for stable sorting tests, below

'use strict';

var sortingAlgorithms = {
  bubbleSort: require(srcPath + '/sorting/bubble_sort/bubble_sort'),
  insertionSort: require(srcPath + '/sorting/insertion_sort/insertion_sort'),
  mergeSort: require(srcPath + '/sorting/merge_sort/merge_sort'),
  quickSort: require(srcPath + '/sorting/quick_sort/quick_sort')
};

_.each(sortingAlgorithms, function(sort, name) {
  describe(name, function() {
    var sampleArrays, sortedArrays;
    var randomArray = chai.create('randomArray');
    var comparators = chai.create('comparators');

    before(function() {
      sampleArrays = randomArray.create(10, 100);

      sortedArrays = {
        ascending: _.map(sampleArrays, function(array) {
          return array.sort(comparators.ascending);
        }),

        descending: _.map(sampleArrays, function(array) {
          return array.sort(comparators.descending);
        })
      };
    });

    it('should sort arrays in ascending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(sort(array)).to.eql(sortedArrays.ascending[i]);
      });
    });

    it('should sort arrays in descending order', function() {
      _.each(sampleArrays, function(array, i) {
        expect(sort(array)).to.eql(sortedArrays.descending[i]);
      });
    });

    it('should be a destructive sort', function() {
      _.each(sampleArrays, function(array) {
        expect(sort(array)).to.equal(array);
      });
    });

    if (['bubbleSort', 'insertionSort', 'mergeSort'].indexOf(name) !== -1) {
      it('should be a stable sort', function() {
        var stableElement0 = new Number(1);
        var stableElement1 = new Number(1);
        var stableElement2 = new Number(1);
        var stableArray = [stableElement0, stableElement1, stableElement2];

        sort(stableArray);

        expect(stableArray[0]).to.equal(stableElement0);
        expect(stableArray[1]).to.equal(stableElement1);
        expect(stableArray[2]).to.equal(stableElement2);
      });
    }
  });
});
