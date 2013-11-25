'use strict';

var Tree = require(srcPath + '/data_structures/trees/tree');

describe('Tree', function() {
  var tree, uniqueObject1, uniqueObject2, uniqueObject3,
  uniqueObject4, uniqueObject5, uniqueObject6, uniqueObject7;

  beforeEach(function() {
    tree = new Tree();

    uniqueObject1 = chai.create('uniqueObject');
    uniqueObject2 = chai.create('uniqueObject');
    uniqueObject3 = chai.create('uniqueObject');
    uniqueObject4 = chai.create('uniqueObject');
    uniqueObject5 = chai.create('uniqueObject');
    uniqueObject6 = chai.create('uniqueObject');
    uniqueObject7 = chai.create('uniqueObject');
  });

  it('should add a value to the root node when passed in at construction time', function() {
    tree = new Tree(uniqueObject1);

    expect(tree.value).to.equal(uniqueObject1);
  });

  describe('#addChild', function() {
    it('should add an element to a given node\'s children array', function() {
      tree.addChild(uniqueObject1);

      expect(tree.children[0].value).to.equal(uniqueObject1);
    });
  });

  describe('#contains', function() {
    beforeEach(function() {
      tree = new Tree(uniqueObject1);
    });

    it('should return false when the tree does not contain a given element', function() {
      expect(tree.contains(uniqueObject2)).to.be.false;
    });

    it('should return true when the tree contains a given element at the root level', function() {
      expect(tree.contains(uniqueObject1)).to.be.true;

    });

    it('should return true when the tree contains a given element at a child level', function() {
      tree.addChild(uniqueObject2);
      tree.addChild(uniqueObject3);

      expect(tree.contains(uniqueObject2)).to.be.true;
      expect(tree.contains(uniqueObject3)).to.be.true;
    });

    it('should return true when the tree contains a given element at a deeply nested child level', function() {
      tree.addChild(uniqueObject2);
      tree.addChild(uniqueObject3);
      tree.children[1].addChild(uniqueObject4);
      tree.children[1].addChild(uniqueObject5);

      expect(tree.contains(uniqueObject4)).to.be.true;
      expect(tree.contains(uniqueObject5)).to.be.true;

      tree.children[1].children[0].addChild(uniqueObject6);
      tree.children[1].children[1].addChild(uniqueObject7);

      expect(tree.contains(uniqueObject6)).to.be.true;
      expect(tree.contains(uniqueObject7)).to.be.true;
    });
  });

  describe('#forEach', function() {
    var bfTree, dfTree;

    beforeEach(function() {
      var trees = chai.create('trees');

      bfTree = trees.breadth;
      dfTree = trees.depth;
    });

    it('should traverse the tree in a depth-first fashion', function() {
      var result = [];

      dfTree.forEach(function(value) {
        result.push(value);
      });

      expect(result).to.eql(_.range(17));
    });

    it('should optionally traverse the tree in a breadth-first fashion', function() {
      var result = [];

      bfTree.forEach(function(value) {
        result.push(value);
      }, true);

      expect(result).to.eql(_.range(17));
    });
  });
});
