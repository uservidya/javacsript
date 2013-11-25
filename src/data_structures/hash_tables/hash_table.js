'use strict';

var generateHash = require('./lib/hash');
var FixedArray = require('./lib/fixed_array');

var HashTable = function(maxSize) {
  Object.defineProperties(this, {
    _maxSize: { value: typeof maxSize === 'number' ? maxSize : 1000 },
    _storage: { value: new FixedArray(maxSize) }
  });
};

HashTable.prototype.set = function(key, value) {
  var hash;

  if (typeof key !== 'string' || !(key instanceof String)) {
    key = JSON.stringify(key);
  }

  hash = generateHash(key, this._maxSize);

  this._storage.set(hash, value);

  return this._storage.get(hash);
};

HashTable.prototype.get = function(key) {
  if (typeof key !== 'string' || !(key instanceof String)) {
    key = JSON.stringify(key);
  }

  return this._storage.get(generateHash(key, this._maxSize));
};

HashTable.prototype.remove = function(key) {
  var val;

  if (typeof key !== 'string' || !(key instanceof String)) {
    key = JSON.stringify(key);
  }

  val = this._storage.get(generateHash(key, this._maxSize));

  if (val === undefined) {
    return false;
  }

  this._storage.remove(generateHash(key, this._maxSize));

  return true;
};

module.exports = HashTable;
