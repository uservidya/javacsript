'use strict';

// An individual node. Used to represent data internally in the linked list
var Node = function(value) {
  value = value === undefined ? null : value;

  Object.defineProperties(this, {
    value: { value: value, writable: true, enumerable: true },
    next: { value: null, writable: true, enumerable: true }
  });
};

Node.prototype = Object.create(null);

Node.prototype.constructor = Node;

// Linked list constructor
var LinkedList = function() {
  Object.defineProperties(this, {
    _head: { value: null, writable: true },
    _size: { value: 0, writable: true },
    _tail: { value: null, writable: true }
  });
};

// Indicated as private because it exposes a raw node, rather than a node's
// stored value
LinkedList.prototype._getPreviousTail = function(/* current, previous */) {
  var current = arguments[0] === undefined ? this._head : arguments[0];
  var previous = arguments[1] === undefined ? null : arguments[1];

  if (current === this._tail) {
    return previous;
  }

  return this._getPreviousTail(current.next, current);
};

Object.defineProperty(LinkedList.prototype, 'head', {
  get: function() {
    return this._head && this._head.value;
  }
});

Object.defineProperty(LinkedList.prototype, 'size', {
  get: function() {
    return this._size;
  }
});

Object.defineProperty(LinkedList.prototype, 'tail', {
  get: function() {
    return this._tail && this._tail.value;
  }
});


Object.defineProperty(LinkedList.prototype, 'isEmpty', {
  get: function() {
    return this._head === null && this._tail === null;
  }
});

LinkedList.prototype.forEach = function(iterator /*, node */) {
  var node = arguments[1] === undefined ? this._head : arguments[1];

  if (node === null || !Object.isPrototypeOf.call(Node.prototype, node)) {
    throw new TypeError('Node must be an instance of the Node class.');
  }

  iterator(node.value, node);

  if (node.next) {
    return this.forEach(iterator, node.next);
  }

  return this;
};

LinkedList.prototype.contains = function(value /*, node */) {
  var node = arguments[1] || this._head;

  if (this.isEmpty) {
    return false;
  }

  if (node.value === value) {
    return true;
  }

  if (node.next) {
    return this.contains(value, node.next);
  }

  return false;
};

LinkedList.prototype.shift = function(value) {
  var oldHead = this._head;

  this._head = new Node(value);
  this._head.next = oldHead;

  if (this._tail === null) {
    this._tail = this._head;
  }

  this._size += 1;

  return this;
};

LinkedList.prototype.push = function(value) {
  var node = new Node(value);

  if (this._head === null) {
    this._head = node;
    this._tail = node;
  } else {
    this._tail.next = node;
    this._tail = node;
  }

  this._size += 1;

  return this;
};

LinkedList.prototype.unshift = function() {
  var result;

  if (this.isEmpty) {
    return undefined;
  }

  result = this._head.value;
  this._head = this._head.next;

  if (this._head === null) {
    this._tail = null;
  }

  this._size -= 1;

  return result;
};

LinkedList.prototype.pop = function() {
  var result;

  if (this.isEmpty) {
    return undefined;
  }

  result = this._tail.value;
  this._tail = this._getPreviousTail();

  if (this._tail === null) {
    this._head = null;
  }

  this._size -= 1;

  return result;
};

module.exports = LinkedList;
