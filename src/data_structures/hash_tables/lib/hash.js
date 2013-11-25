'use strict';

// Hashing algorithm. Source:
// http://pmav.eu/stuff/javascript-hashing-functions/source.html
var generateHash = function(string, tableSize) {
  var i;
  var b = 27183;
  var h = 0;
  var a = 31415;

  if (tableSize > 1) {
    for (i = 0; i < string.length; i++) {
      h = (a * h + string[i].charCodeAt()) % tableSize;
      a = ((a % tableSize) * (b % tableSize)) % (tableSize);
    }
  }

  return h;
};

module.exports = generateHash;
