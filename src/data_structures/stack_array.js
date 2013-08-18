// Array-backed stack. (Also known as--tada!--an array.)

var Stack = function() {
  return Object.create(Stack.prototype, {
    _storage: { value: [], enumerable: false, writable: true }
  });
};

Stack.prototype = Object.create(null);

Stack.prototype.add = function(element) {
  if (element === undefined) {
    return false;
  }

  this._storage.push(element);
  return true;
};

Stack.prototype.clear = function() {
  this._storage.length = 0;
  return true;
};

Stack.prototype.contains = function(element) {
  return this._storage.indexOf(element) !== -1;
};

Stack.prototype.isEmpty = function() {
  return this.size() === 0;
};

Stack.prototype.peek = function() {
  return this._storage[this._storage.length - 1];
};

Stack.prototype.pop = function() {
  return this._storage.pop();
};

Stack.prototype.size = function() {
  return this._storage.length;
};

Stack.prototype.toArray = function() {
  return this._storage.slice();
};

Stack.prototype.toString = function() {
  return Array.prototype.toString.call(this.toArray());
};

module.exports = Stack;
