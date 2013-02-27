/*jshint node:true*/
/*globals define: true*/
'use strict';

module.exports = {
  nodeRequire: require,
  paths: {
    bubblesort : __dirname + '/src/sorting/bubblesort',
    quicksort  : __dirname + '/src/sorting/quicksort'
  }
};
