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

// By default, traverses the tree depth-first.
Tree.prototype.dfForEach = function(iterator /*, bf */) {
  // var bf = arguments[1] === undefined ? false : arguments[1];
  // if (bf) {
  // } else {
  // }

  iterator(this.value);

  this.children.forEach(function(node) {
    node.dfForEach(iterator);
  });
};

Tree.prototype.bfForEach = function(iterator /*, current */) {
  var next;
  var current = [this];

  var it = function(node) {
    iterator(node.value);

    node.children.forEach(function(node) {
      next.push(node);
    });
  };


  while (true) {
    next = [];

    current.forEach(it);

    if (!next.length) {
      break;
    }

    current = next;
  }
};

module.exports = Tree;
