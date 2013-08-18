var _ = require('lodash');

var sortingPath = function() {
  var args = _.toArray(arguments);
  return srcPath.apply(null, ['algorithms', 'sorting'].concat(args));
};

var makeShuffledArray = _.compose(_.shuffle, _.range);

var makeShuffledArrayOfSize = _.partial(makeShuffledArray, 0);

var generateSampleArrays = function(subarrayCount, ceiling) {
  var result = [];

  _(subarrayCount).times(function() {
    result.push(makeShuffledArrayOfSize(_.random(ceiling)));
  });

  return result;
};

var ascendingSort = function(a, b) { return a - b; };

var descendingSort = function(a, b) { return b - a; };

module.exports = {
  sortingPath: sortingPath,
  generateSampleArrays: generateSampleArrays,
  ascendingSort: ascendingSort,
  descendingSort: descendingSort
};
