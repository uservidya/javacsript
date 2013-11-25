'use strict';

var Tree = function(value) {
  Object.defineProperties(this, {
    value: {
      value: value === undefined ? null : value,
      writable: true,
      enumerable: true
    },
    children: { value: [], writable: true, enumerable: true }
  });
};

Tree.prototype.addChild = function(value) {
  this.children.push(new Tree(value));

  return this.children[this.children.length - 1].value;
};

Tree.prototype.contains = function(value) {
  var i;

  if (this.value === value) {
    return true;
  }

  for (i = 0; i < this.children.length; i += 1) {
    if (this.children[i].contains(value)) {
      return true;
    }
  }

  return false;
};

Tree.prototype._breadthForEach = (function() {
  var processNodes = function(iterator, current, next) {
    current.forEach(function(node) {
      iterator(node.value);

      node.children.forEach(function(node) {
        next.push(node);
      });
    });
  };

  return function(iterator /*, current */) {
    var current = arguments [1] || [this];
    var next = [];

    processNodes(iterator, current, next);

    if (next.length) {
      this._breadthForEach(iterator, next);
    }
  };
}());

Tree.prototype._depthForEach = function(iterator) {
  iterator(this.value);

  this.children.forEach(function(node) {
    node._depthForEach(iterator);
  });
};

// By default, traverses the tree depth-first. When boolean `true` is passed as
// the second argument, will instead traverse the tree breadth-first.
Tree.prototype.forEach = function(iterator /* breadthFirst */) {
  var breadthFirst = typeof arguments[1] === 'boolean' ? arguments[1] : false;

  if (breadthFirst) {
    this._breadthForEach(iterator);
  } else {
    this._depthForEach(iterator);
  }
};

module.exports = Tree;
