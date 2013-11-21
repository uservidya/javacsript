'use strict';

var _ = require('lodash');

var makeShuffledArray = _.compose(_.shuffle, _.range);
var makeShuffledArrayOfSize = _.partial(makeShuffledArray, 0);

chai.factory('randomArray', {
  create: function(size, subarraySize) {
    var result = [];

    _(size).times(function() {
      result.push(makeShuffledArrayOfSize(_.random(subarraySize)));
    });

    return result;
  }
});

chai.factory('comparators', {
  ascending: function(a, b) { return a - b; },
  descending: function(a, b) { return b - a; }
});
