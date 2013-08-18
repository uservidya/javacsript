var Queue = function() {
  return Object.create(Queue.prototype, {
    _head: { value: 0, enumerable: false, writable: true },
    _tail: { value: 0, enumerable: false, writable: true },
    _storage: { value: {}, enumerable: false, writable: true }
  });
};

Queue.prototype = Object.create(null);

Queue.prototype.clear = function() {
  this._head = 0;
  this._tail = 0;
  this._storage = {};

  return true;
};

Queue.prototype.contains = function(element) {
  var that = this;

  return Object.keys(that._storage).reduce(function(isFound, key) {
    return isFound || (that._storage[key] === element);
  }, false);
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

  // When the queue is empty, the head and tail should point to the same element
  if (this._storage[this._head] === undefined) {
    this._head += 1;
  }

  this._tail += 1;
  this._storage[this._tail] = element;

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
  // Queue is empty when the head and tail point to the same undefined element
  if ((this._tail === this._head) && (this._storage[this._head] === undefined)) {
    return 0;
  }
  return (this._tail - this._head) + 1;
};

Queue.prototype.toArray = function() {
  var that = this;

  return Object.keys(that._storage).map(function(key) {
    return that._storage[key];
  }).reverse();
};

Queue.prototype.toString = function() {
  return Array.prototype.toString.call(this.toArray());
};

module.exports = Queue;
