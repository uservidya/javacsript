'use strict';

// Using an array as storage for our stack? http://youtu.be/X8PyTo6NyXA
var Stack = function() {
  Object.defineProperties(this, {
    _storage: { value: {}, enumerable: false, writable: true },
    _size: { value: 0, enumerable: false, writable: true }
  });
};

Stack.prototype.add = function(element) {
  if (element === undefined) {
    return false;
  }

  this._storage[++this._size] = element;
  return true;
};

Stack.prototype.clear = function() {
  this._storage = {};
  this._size = 0;
  return true;
};

Stack.prototype.contains = function(element) {
  var that = this; // F-*$ you, native reduce
  return Object.keys(that._storage).reduce(function(isFound, key) {
    return isFound || (that._storage[key] === element);
  }, false);
};

Stack.prototype.isEmpty = function() {
  return this.size() === 0;
};

Stack.prototype.peek = function() {
  return this._storage[this._size];
};

Stack.prototype.pop = function() {
  var element = this._storage[this._size];

  if (element !== undefined) {
    delete this._storage[this._size--];
    return element;
  }
};

Stack.prototype.size = function() {
  return this._size;
};

Stack.prototype.toArray = function() {
  var that = this;
  return Object.keys(that._storage).map(function(key) {
    return that._storage[key];
  });
};

Stack.prototype.toString = function() {
  return Array.prototype.toString.call(this.toArray());
};

module.exports = Stack;
