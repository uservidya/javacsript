'use strict';

var stacks = {
  Stack: require(srcPath + '/data_structures/stacks/stack'),
  ArrayStack: require(srcPath + '/data_structures/stacks/stack_array')
};

_.each(stacks, function(Stack) {
  describe('Stack factory', function() {
    it('should be a function', function() {
      expect(Stack).to.be.a('function');
    });
  });

  describe('Stack', function() {
    var stack;

    beforeEach(function() {
      stack = new Stack();
    });

    describe('instance', function() {
      it('should be an object', function() {
        expect(stack).to.be.an('object');
      });
    });

    describe('#add', function() {
      it('should be a function', function() {
        expect(stack.add).to.be.a('function');
      });

      it('should add an individual item to storage', function() {
        stack.add(1);

        expect(stack.contains(1)).to.be.true;
      });

      it('should be able to add multiple items to storage', function() {
        stack.add(1);
        stack.add(2);

        expect(stack.contains(1)).to.be.true;
        expect(stack.contains(2)).to.be.true;
      });

      it('should always add items to the top of the stack', function() {
        stack.add(1);

        expect(stack.peek()).to.equal(1);

        stack.add(2);

        expect(stack.peek()).to.equal(2);
      });

      it('should not allow you to add undefined to the stack', function() {
        expect(stack.add(undefined)).to.be.false;
      });
    });

    describe('#clear', function() {
      it('should empty out the stack\'s storage', function() {
        var elements = [1, 2, 3];

        _.each(elements, function(element) {
          stack.add(element);
          expect(stack.contains(element)).to.be.true;
        });

        stack.clear();

        _.each(elements, function(element) {
          expect(stack.contains(element)).to.be.false;
        });
      });

      it('should set the size of the stack back to zero', function() {
        var elements = [1, 2, 3];

        _.each(elements, function(element) {
          stack.add(element);
        });

        expect(stack.size()).to.equal(elements.length);

        stack.clear();

        expect(stack.size()).to.equal(0);
      });

      it('should not break the stack\'s functionality', function() {
        var elements = [1, 2, 3];
        _.each(elements, function(element) {
          stack.add(element);
        });

        stack.clear();

        expect(stack.isEmpty()).to.be.true;

        _.each(elements, function(element, index) {
          stack.add(element);
          expect(stack.contains(element)).to.be.true;
          expect(stack.size()).to.equal(index + 1);
        });

        _(elements.length).times(function() {
          stack.pop();
        });

        expect(stack.isEmpty()).to.be.true;
      });
    });

    describe('#contains', function() {
      it('should return true when the stack contains a given item', function() {
        stack.add(1);

        expect(stack.contains(1)).to.be.true;
      });

      it('should return true even when the stack contains multiple identical items', function() {
        var element = {};

        _(3).times(function() {
          stack.add(element);
        });

        expect(stack.contains(element)).to.be.true;
      });

      it('should return true even when the stack contains multiple different items', function() {
        _(3).times(function(iteration) {
          stack.add(iteration);
        });

        _(3).times(function(iteration) {
          expect(stack.contains(iteration)).to.be.true;
        });
      });

      it('should return false if the stack doesn\'t contain a given item', function() {
        var doesntContain = {};

        expect(stack.contains(doesntContain)).to.be.false;
      });
    });

    describe('#isEmpty', function() {
      it('should return true when the stack is empty', function() {
        expect(stack.size()).to.equal(0);
        expect(stack.isEmpty()).to.be.true;
      });

      it('should return false when the stack is not empty', function() {
        stack.add({});
        expect(stack.isEmpty()).to.be.false;
      });
    });

    describe('#peek', function() {
      it('should return undefined when the stack is empty', function() {
        expect(stack.isEmpty()).to.be.true;
        expect(stack.peek()).to.be.undefined;
      });

      it('should return the topmost item from the stack', function() {
        var elements = [{}, [], new Date()];

        _.each(elements, function(element) {
          stack.add(element);
          expect(stack.peek()).to.equal(element);
        });

        stack.pop();

        expect(stack.peek()).to.equal(elements[1]);
      });

      it('should not be destructive', function() {
        var item = {};

        stack.add(item);

        expect(stack.peek()).to.equal(item);
        expect(stack.pop()).to.equal(item);
      });
    });

    describe('#pop', function() {
      it('should return undefined when there are no elements in the stack', function() {
        expect(stack.isEmpty()).to.be.true;
        expect(stack.pop()).to.be.undefined;
      });

      it('should return the most recently added element from the stack', function() {
        var uniqueElement = {};

        stack.add(uniqueElement);
        expect(stack.pop()).to.equal(uniqueElement);
      });

      it('should be destructive', function() {
        var uniqueElement1 = {};
        var uniqueElement2 = {};

        stack.add(uniqueElement1);
        stack.add(uniqueElement2);
        expect(stack.pop()).to.equal(uniqueElement2);
        expect(stack.peek()).to.equal(uniqueElement1);
      });

      it('should not decrease the size when called on an empty stack', function() {
        expect(stack.size()).to.equal(0);

        stack.pop();

        expect(stack.size()).to.equal(0);
      });
    });

    describe('#size', function() {
      it('should return the current size of the stack', function() {
        expect(stack.size()).to.be.a.number;
      });

      it('should report 0 when the stack is empty', function() {
        expect(stack.isEmpty()).to.be.true;
        expect(stack.size()).to.equal(0);
      });

      it('should increase as elements are added to the stack', function() {
        var elements = ['one', 'two', 'three'];

        _.each(elements, function(element, index) {
          stack.add(element);
          expect(stack.size()).to.equal(index + 1);
        });
      });

      it('should decrease as elements are removed from the stack', function() {
        var elements = ['one', 'two', 'three'];

        _.each(elements, function(element) {
          stack.add(element);
        });

        _(3).times(function(iteration) {
          expect(stack.size()).to.equal(elements.length - iteration);
          stack.pop();
        });
      });
    });

    describe('#toArray', function() {
      it('should return an array version of the stack', function() {
        expect(stack.toArray()).to.be.an('array');
      });

      it('should be in oldest-first-newest-last order', function() {
        var elements = [1, 2, 3];

        _.each(elements, function(element) {
          stack.add(element);
        });

        _.each(stack.toArray(), function(element, index) {
          expect(element).to.equal(elements[index]);
        });
      });

      it('should return the original, unmodified data', function() {
        var uniqueElements = [{}, [], new Date()];

        _.each(uniqueElements, function(element) {
          stack.add(element);
        });

        _.each(stack.toArray(), function(element, index) {
          expect(element).to.equal(uniqueElements[index]);
        });
      });

      it('should not modify the stack', function() {
        stack.add(1);
        stack.toArray();
        expect(stack.peek()).to.equal(1);
      });
    });

    describe('#toString', function() {
      it('should act identically to an array\'s .toString method call', function() {
        var elements = [1, 2, 3, 4];

        _.each(elements, function(element) {
          stack.add(element);
        });

        expect(Array.prototype.toString.call(elements)).to.equal(stack.toString());
      });
    });
  });
});
