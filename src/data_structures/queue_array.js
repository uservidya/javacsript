// An array-backed queue! ZZZ

var Queue = function() {
  return Object.create(Queue.prototype, {
    _head: { value: 0, enumerable: false, writable: true },
    _tail: { value: 0, enumerable: false, writable: true },
    _storage: { value: [], enumerable: false, writable: true }
  });
};

Queue.prototype = Object.create(null);

Queue.prototype.clear = function() {
  this._head = 0;
  this._tail = 0;
  this._storage.length = 0;

  return true;
};

Queue.prototype.contains = function(element) {
  return this._storage.indexOf(element) !== -1;
};

Queue.prototype.dequeue = function() {
  if (this.isEmpty()) {
    return undefined;
  }

  var element = this._storage[this._head];

  delete this._storage[this._head];
  this._head += 1;

  return element;
};

Queue.prototype.enqueue = function(element) {
  if (element === undefined) {
    return false;
  }

  this._storage[this._tail] = element;
  this._tail += 1;

  return true;
};

Queue.prototype.isEmpty = function() {
  return this.size() === 0;
};

Queue.prototype.peek = function() {
  if (this.isEmpty()) {
    return undefined;
  }

  return this._storage[this._head];
};

Queue.prototype.size = function() {
  return this._tail - this._head;
};

Queue.prototype.toArray = function() {
  return this._storage.slice(this._head, this._tail).reverse();
};

Queue.prototype.toString = function() {
  return Array.prototype.toString.call(this.toArray());
};

module.exports = Queue;
