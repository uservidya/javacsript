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

module.exports = Tree;
