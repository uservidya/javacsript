'use strict';

var DoublyLinkedList = require(srcPath + '/data_structures/linked_lists/doubly_linked_list');

describe('DoublyLinkedList', function() {
  var common, doublyLinkedList, uniques, uniqueObject1, uniqueObject2,
    uniqueObject3, uniqueObject4, uniqueObject5;

  beforeEach(function() {
    doublyLinkedList = new DoublyLinkedList();

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
    expect(doublyLinkedList).to.have.interface({
      isEmpty: Boolean,
      contains: Function,
      head: Object,
      tail: Object,
      shift: Function,
      push: Function,
      unshift: Function,
      pop: Function
    });
  });

  describe('#forEach', function() {
    beforeEach(function() {
      _.each(uniques, function(value) {
        doublyLinkedList.push(value);
      });
    });

    it('should visit every node in the linked list, in head-to-tail order', function() {
      var result = [];

      doublyLinkedList.forEach(function(value) {
        result.push(value);
      });

      expect(uniques).to.eql(result);
    });

    it('should throw an error when trying to iterate over a non-node', function() {
      expect(function() {
        doublyLinkedList.forEach(common.noop, null);
      }).to.throw(TypeError);
    });
  });

  describe('isEmpty#get', function() {
    it('should return true when the list has neither a head nor a tail element', function() {
      expect(doublyLinkedList.isEmpty).to.be.true;
    });

    it('should return false when the list has a head element', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.isEmpty).to.be.false;
    });

    it('should return false when the list has a tail element', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList.isEmpty).to.be.false;
    });

    it('should go back to returning false when the list is emptied', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.pop();

      expect(doublyLinkedList.isEmpty).to.be.true;
    });
  });

  describe('#contains', function() {
    it('should return false if the linked list is empty', function() {
      expect(doublyLinkedList.contains('anything')).to.be.false;
    });

    it('should return false if the linked list does not contain a given value', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.contains(uniqueObject2)).to.be.false;
    });

    it('should return true if the linked list contains a given value', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList.contains(uniqueObject1)).to.be.true;
    });
  });

  describe('head#get', function() {
    it('should return the value stored at the head node', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.head).to.equal(uniqueObject1);

      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList.head).to.equal(uniqueObject2);
    });

    it('should return null if the linked list is empty', function() {
      expect(doublyLinkedList.isEmpty).to.be.true;
      expect(doublyLinkedList.head).to.be.null;
    });
  });

  describe('size#get', function() {
    it('should return `0` when the list is empty', function() {
      expect(doublyLinkedList.size).to.equal(0);
    });

    it('should increase as items are added to the head of the list', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.size).to.equal(1);

      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList.size).to.equal(2);
    });

    it('should increase as items are added to the tail of the list', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList.size).to.equal(1);

      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList.size).to.equal(2);
    });

    it('should decrease as items are removed from the head of the list', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList.size).to.equal(2);

      doublyLinkedList.unshift();

      expect(doublyLinkedList.size).to.equal(1);

      doublyLinkedList.unshift();

      expect(doublyLinkedList.size).to.equal(0);
    });

    it('should decrease as items are removed from the tail of the list', function() {
      doublyLinkedList.push(uniqueObject1);
      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList.size).to.equal(2);

      doublyLinkedList.pop();

      expect(doublyLinkedList.size).to.equal(1);

      doublyLinkedList.pop();

      expect(doublyLinkedList.size).to.equal(0);
    });

    it('should not decrease when an attempt is made to remove nodes from an empty list', function() {
      expect(doublyLinkedList.size).to.equal(0);

      doublyLinkedList.unshift();

      expect(doublyLinkedList.size).to.equal(0);

      doublyLinkedList.unshift();

      expect(doublyLinkedList.size).to.equal(0);
    });
  });

  describe('tail#get', function() {
    it('should return the value stored at the tail node', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList.tail).to.equal(uniqueObject1);

      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList.tail).to.equal(uniqueObject2);
    });
  });

  describe('#shift', function() {
    it('should be chainable', function() {
      expect(doublyLinkedList.shift('test')).to.equal(doublyLinkedList);
    });

    it('should add a node as the head of the list', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList._head.value).to.equal(uniqueObject1);
    });

    it('should set the most recently added node as the head', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList._head.value).to.equal(uniqueObject1);

      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList._head.value).to.equal(uniqueObject2);
    });

    it('should have an empty `previous` property', function() {
      doublyLinkedList.shift('fdsa');

      expect(doublyLinkedList._head.previous).to.be.null;
    });

    it('should have an empty `next` property when no next node has been added', function() {
      doublyLinkedList.shift('fdsa');

      expect(doublyLinkedList._head.next).to.be.null;
    });

    it('should assign the old head to the current head\'s next property', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList._head.next).to.equal(null);

      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList._head.next.value).to.equal(uniqueObject1);
    });

    it('should assign the new head to the old head\'s `previous` property', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList._head.next.previous.value).to.equal(uniqueObject2);
    });

    it('should assign the element as the current tail when the list is empty', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList._head.value).to.equal(uniqueObject1);
      expect(doublyLinkedList._tail.value).to.equal(uniqueObject1);
    });
  });

  describe('#push', function() {
    it('should be chainable', function() {
      expect(doublyLinkedList.push('test')).to.equal(doublyLinkedList);
    });

    it('should add a node as the tail of the list', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList._tail.value).to.equal(uniqueObject1);
    });

    it('should set the most recently added node as the tail', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList._tail.value).to.equal(uniqueObject1);

      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList._tail.value).to.equal(uniqueObject2);
    });

    it('should set the head node to the new tail if the list is empty', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList._head.value).to.equal(uniqueObject1);
    });

    it('should set the previous tail as the current tail\'s `previous` property', function() {
      doublyLinkedList.push(uniqueObject1);
      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList._tail.previous.value).to.equal(uniqueObject1);
    });

    it('should not set the head node to the new tail if the list is not empty', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList._head.value).to.equal(uniqueObject1);
    });
  });

  describe('#unshift', function() {
    it('should return undefined if the linked list is empty', function() {
      expect(doublyLinkedList.unshift()).to.be.undefined;
    });

    it('should return the value stored at the head element', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.unshift()).to.equal(uniqueObject1);
    });

    it('should remove the value stored at the head element', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.head).to.equal(uniqueObject1);

      doublyLinkedList.unshift();

      expect(doublyLinkedList.head).to.not.equal(uniqueObject2);
    });

    it('should repeatedly return the value stored at the head element', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.shift(uniqueObject2);

      expect(doublyLinkedList.unshift()).to.equal(uniqueObject2);
      expect(doublyLinkedList.unshift()).to.equal(uniqueObject1);
    });

    it('should set the new head\'s `previous` property to null', function() {
      doublyLinkedList.shift(uniqueObject1);
      doublyLinkedList.shift(uniqueObject2);
      doublyLinkedList.unshift();

      expect(doublyLinkedList._head.previous).to.be.null;
    });

    it('should dereference the tail if the element being removed is the only element in the list', function() {
      doublyLinkedList.shift(uniqueObject1);

      expect(doublyLinkedList.head).to.equal(uniqueObject1);
      expect(doublyLinkedList.tail).to.equal(uniqueObject1);

      doublyLinkedList.unshift();

      expect(doublyLinkedList.head).to.be.null;
      expect(doublyLinkedList.tail).to.be.null;
    });
  });

  describe('#pop', function() {
    it('should return undefined if the linked list is empty', function() {
      expect(doublyLinkedList.pop()).to.be.undefined;
    });

    it('should return the value stored at the tail element', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList.pop()).to.equal(uniqueObject1);
    });

    it('should repeatedly return the value stored at the tail element', function() {
      doublyLinkedList.push(uniqueObject1);
      doublyLinkedList.push(uniqueObject2);

      expect(doublyLinkedList.pop()).to.equal(uniqueObject2);
      expect(doublyLinkedList.pop()).to.equal(uniqueObject1);
    });

    it('should dereference the head if the element being removed is the only element in the list', function() {
      doublyLinkedList.push(uniqueObject1);

      expect(doublyLinkedList.tail).to.equal(uniqueObject1);
      expect(doublyLinkedList.head).to.equal(uniqueObject1);

      doublyLinkedList.pop();

      expect(doublyLinkedList._tail).to.be.null;
      expect(doublyLinkedList._head).to.be.null;
    });
  });
});
