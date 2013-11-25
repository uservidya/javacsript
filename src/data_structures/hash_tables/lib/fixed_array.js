'use strict';

var verifyIndex = function(index, maxSize) {
  if (index < 0 || index >= maxSize) {
    throw new Error('Attempting to access an out-of-bounds index');
  }

  if (!(typeof index === 'number' || index instanceof Number)) {
    throw new TypeError('Cannot use a non-numeric index to access LimitedArray');
  }
};

// Generates an array of fixed size. Any attempt to set or get against an
// out-of-bounds index will throw an error.
var FixedArray = function(maxSize) {
  var storage = new Array(maxSize);
  var size = 0;

  Object.defineProperties(this, {
    _maxSize: { value: maxSize },
    _storage: {
      // Give read-only access to storage by returning only a copy of it
      get: function() { return storage.slice(); }
    },
    size: {
      get: function() { return size;  }
    }
  });

  this.forEach = function(iterator) {
    storage.forEach(function(item, index, array) {
      if (item === undefined) {
        return;
      }
      iterator(item, index, array);
    });
  };

  this.get = function(index) {
    verifyIndex(index, this._maxSize);

    return storage[index];
  };

  this.set = function(index, value) {
    verifyIndex(index, this._maxSize);

    storage[index] = value;
    size += 1;

    return storage[index];
  };

  this.remove = function(index) {
    verifyIndex(index, this._maxSize);

    if (storage[index] === undefined) {
      return false;
    }

    delete storage[index];
    size -= 1;

    return true;
  };

  Object.freeze(this);
};

module.exports = FixedArray;
