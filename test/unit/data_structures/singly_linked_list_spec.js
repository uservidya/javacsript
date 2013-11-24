'use strict';

var LinkedList = require(srcPath + '/data_structures/singly_linked_list');

describe('LinkedList', function() {
  var common, linkedList, uniques, uniqueObject1, uniqueObject2, uniqueObject3,
    uniqueObject4, uniqueObject5;

  beforeEach(function() {
    linkedList = new LinkedList();

    common = chai.create('common');

    uniqueObject1 = chai.create('uniqueObject');
    uniqueObject2 = chai.create('uniqueObject');
    uniqueObject3 = chai.create('uniqueObject');
    uniqueObject4 = chai.create('uniqueObject');
    uniqueObject5 = chai.create('uniqueObject');

    uniques = [
      uniqueObject1,
      uniqueObject2,
      uniqueObject3,
      uniqueObject4,
      uniqueObject5
    ];
  });

  it('should have the following interface', function() {
    expect(linkedList).to.have.interface({
      isEmpty: Boolean,
      contains: Function,
      head: Object,
      tail: Object,
      addToHead: Function,
      push: Function,
      removeHead: Function,
      pop: Function
    });
  });

  describe('#forEach', function() {
    beforeEach(function() {
      _.each(uniques, function(value) {
        linkedList.push(value);
      });
    });

    it('should visit every node in the linked list, in head-to-tail order', function() {
      var result = [];

      linkedList.forEach(function(value) {
        result.push(value);
      });

      expect(uniques).to.eql(result);
    });

    it('should throw an error when trying to iterate over a non-node', function() {
      expect(function() {
        linkedList.forEach(common.noop, null);
      }).to.throw(TypeError);
    });
  });

  describe('isEmpty#get', function() {
    it('should return true when the list has neither a head nor a tail element', function() {
      expect(linkedList.isEmpty).to.be.true;
    });

    it('should return false when the list has a head element', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.isEmpty).to.be.false;
    });

    it('should return false when the list has a tail element', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList.isEmpty).to.be.false;
    });

    it('should go back to returning false when the list\'s is emptied', function() {
      linkedList.addToHead(uniqueObject1);
      linkedList.pop();

      expect(linkedList.isEmpty).to.be.true;
    });
  });

  describe('#contains', function() {
    it('should return false if the linked list is empty', function() {
      expect(linkedList.contains('anything')).to.be.false;
    });

    it('should return false if the linked list does not contain a given value', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.contains(uniqueObject2)).to.be.false;
    });

    it('should return true if the linked list contains a given value', function() {
      linkedList.addToHead(uniqueObject1);
      linkedList.addToHead(uniqueObject2);

      expect(linkedList.contains(uniqueObject1)).to.be.true;
    });
  });

  describe('head#get', function() {
    it('should return the value stored at the head node', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.head).to.equal(uniqueObject1);

      linkedList.addToHead(uniqueObject2);

      expect(linkedList.head).to.equal(uniqueObject2);
    });

    it('should return null if the linked list is empty', function() {
      expect(linkedList.isEmpty).to.be.true;
      expect(linkedList.head).to.be.null;
    });
  });

  describe('size#get', function() {
    it('should return `0` when the list is empty', function() {
      expect(linkedList.size).to.equal(0);
    });

    it('should increase as items are added to the head of the list', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.size).to.equal(1);

      linkedList.addToHead(uniqueObject2);

      expect(linkedList.size).to.equal(2);
    });

    it('should increase as items are added to the tail of the list', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList.size).to.equal(1);

      linkedList.push(uniqueObject2);

      expect(linkedList.size).to.equal(2);
    });

    it('should decrease as items are removed from the head of the list', function() {
      linkedList.addToHead(uniqueObject1);
      linkedList.addToHead(uniqueObject2);

      expect(linkedList.size).to.equal(2);

      linkedList.removeHead();

      expect(linkedList.size).to.equal(1);

      linkedList.removeHead();

      expect(linkedList.size).to.equal(0);
    });

    it('should decrease as items are removed from the tail of the list', function() {
      linkedList.push(uniqueObject1);
      linkedList.push(uniqueObject2);

      expect(linkedList.size).to.equal(2);

      linkedList.pop();

      expect(linkedList.size).to.equal(1);

      linkedList.pop();

      expect(linkedList.size).to.equal(0);
    });

    it('should not decrease when an attempt is made to remove nodes from an empty list', function() {
      expect(linkedList.size).to.equal(0);

      linkedList.removeHead();

      expect(linkedList.size).to.equal(0);

      linkedList.removeHead();

      expect(linkedList.size).to.equal(0);
    });
  });

  describe('tail#get', function() {
    it('should return the value stored at the tail node', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList.tail).to.equal(uniqueObject1);

      linkedList.push(uniqueObject2);

      expect(linkedList.tail).to.equal(uniqueObject2);
    });
  });

  describe('#addToHead', function() {
    it('should be chainable', function() {
      expect(linkedList.addToHead('test')).to.equal(linkedList);
    });

    it('should add a node as the head of the list', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList._head.value).to.equal(uniqueObject1);
    });

    it('should set the most recently added node as the head', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList._head.value).to.equal(uniqueObject1);

      linkedList.addToHead(uniqueObject2);

      expect(linkedList._head.value).to.equal(uniqueObject2);
    });

    it('should have an empty `next` property when no next node has been added', function() {
      linkedList.addToHead('fdsa');

      expect(linkedList._head.next).to.be.null;
    });

    it('should assign the old head to the current head\'s next property', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList._head.next).to.equal(null);

      linkedList.addToHead(uniqueObject2);

      expect(linkedList._head.next.value).to.equal(uniqueObject1);
    });

    it('should assign the element as the current tail when the list is empty', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList._head.value).to.equal(uniqueObject1);
      expect(linkedList._tail.value).to.equal(uniqueObject1);
    });
  });

  describe('#push', function() {
    it('should be chainable', function() {
      expect(linkedList.push('test')).to.equal(linkedList);
    });

    it('should add a node as the tail of the list', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList._tail.value).to.equal(uniqueObject1);
    });

    it('should set the most recently added node as the tail', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList._tail.value).to.equal(uniqueObject1);

      linkedList.push(uniqueObject2);

      expect(linkedList._tail.value).to.equal(uniqueObject2);
    });

    it('should set the head node to the new tail if the list is empty', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList._head.value).to.equal(uniqueObject1);
    });

    it('should not set the head node to the new tail if the list is not empty', function() {
      linkedList.addToHead(uniqueObject1);
      linkedList.push(uniqueObject2);

      expect(linkedList._head.value).to.equal(uniqueObject1);
    });
  });

  describe('#removeHead', function() {
    it('should return undefined if the linked list is empty', function() {
      expect(linkedList.removeHead()).to.be.undefined;
    });

    it('should return the value stored at the head element', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.removeHead()).to.equal(uniqueObject1);
    });

    it('should remove the value stored at the head element', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.head).to.equal(uniqueObject1);

      linkedList.removeHead();

      expect(linkedList.head).to.not.equal(uniqueObject2);
    });

    it('should repeatedly return the value stored at the head element', function() {
      linkedList.addToHead(uniqueObject1);
      linkedList.addToHead(uniqueObject2);

      expect(linkedList.removeHead()).to.equal(uniqueObject2);
      expect(linkedList.removeHead()).to.equal(uniqueObject1);
    });

    it('should dereference the tail if the element being removed is the only element in the list', function() {
      linkedList.addToHead(uniqueObject1);

      expect(linkedList.head).to.equal(uniqueObject1);
      expect(linkedList.tail).to.equal(uniqueObject1);

      linkedList.removeHead();

      expect(linkedList.head).to.be.null;
      expect(linkedList.tail).to.be.null;
    });
  });

  describe('#_getPreviousTail', function() {
    it('should return null when the list is empty', function() {
      expect(linkedList.isEmpty).to.be.true;
      expect(linkedList._getPreviousTail()).to.be.null;
    });

    it('should return null when there is only one element in the list (no previous tail node)', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList._getPreviousTail()).to.be.null;
    });

    it('should retrieve the previous tail node', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList._getPreviousTail()).to.be.null;

      linkedList.push(uniqueObject2);

      expect(linkedList._getPreviousTail().value).to.equal(uniqueObject1);

      linkedList.push(uniqueObject3);

      expect(linkedList._getPreviousTail().value).to.equal(uniqueObject2);
    });
  });

  describe('#pop', function() {
    it('should return undefined if the linked list is empty', function() {
      expect(linkedList.pop()).to.be.undefined;
    });

    it('should return the value stored at the tail element', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList.pop()).to.equal(uniqueObject1);
    });

    it('should repeatedly return the value stored at the tail element', function() {
      linkedList.push(uniqueObject1);
      linkedList.push(uniqueObject2);

      expect(linkedList.pop()).to.equal(uniqueObject2);
      expect(linkedList.pop()).to.equal(uniqueObject1);
    });

    it('should dereference the head if the element being removed is the only element in the list', function() {
      linkedList.push(uniqueObject1);

      expect(linkedList.tail).to.equal(uniqueObject1);
      expect(linkedList.head).to.equal(uniqueObject1);

      linkedList.pop();

      expect(linkedList.tail).to.be.null;
      expect(linkedList.head).to.be.null;
    });
  });
});
