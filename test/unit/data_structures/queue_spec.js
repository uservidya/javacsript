'use strict';

var queues = {
  Queue: require(srcPath + '/data_structures/queue'),
  ArrayQueue: require(srcPath + '/data_structures/queue_array')
};

_.each(queues, function(Queue) {
  describe('Queue constructor', function() {
    it('should be a function', function() {
      expect(Queue).to.be.a('function');
    });
  });

  describe('Queue', function() {
    var queue;

    beforeEach(function() {
      queue = new Queue();
    });

    describe('instance', function() {
      it('should be an object', function() {
        expect(queue).to.be.an('object');
      });
    });

    describe('#clear', function() {
      it('should empty out the queue\'s storage', function() {
        var elements = [1, 2, 3];

        _.each(elements, function(element) {
          queue.enqueue(element);
          expect(queue.contains(element)).to.be.true;
        });

        queue.clear();

        _.each(elements, function(element) {
          expect(queue.contains(element)).to.be.false;
        });
      });

      it('should set the size of the queue back to zero', function() {
        var elements = [1, 2, 3];
        _.each(elements, function(element) {
          queue.enqueue(element);
        });

        expect(queue.size()).to.equal(elements.length);

        queue.clear();

        expect(queue.size()).to.equal(0);
      });

      it('should not break the queue\'s functionality', function() {
        var elements = [1, 2, 3];
        _.each(elements, function(element) {
          queue.enqueue(element);
        });

        queue.clear();

        expect(queue.isEmpty()).to.be.true;

        _.each(elements, function(element, index) {
          queue.enqueue(element);
          expect(queue.contains(element)).to.be.true;
          expect(queue.size()).to.equal(index + 1);
        });

        _(elements.length).times(function() {
          queue.dequeue();
        });

        expect(queue.isEmpty()).to.be.true;
      });
    });

    describe('#contains', function() {
      it('should return true when the queue contains a given item', function() {
        queue.enqueue(1);

        expect(queue.contains(1)).to.be.true;
      });

      it('should return true even when the queue contains multiple identical items', function() {
        var element = {};

        _(3).times(function() {
          queue.enqueue(element);
        });

        expect(queue.contains(element)).to.be.true;
      });

      it('should return true even when the queue contains multiple different items', function() {
        _(3).times(function(iteration) {
          queue.enqueue(iteration);
        });

        _(3).times(function(iteration) {
          expect(queue.contains(iteration)).to.be.true;
        });
      });

      it('should return false if the queue doesn\'t contain a given item', function() {
        var doesntContain = {};

        expect(queue.contains(doesntContain)).to.be.false;
      });
    });

    describe('#dequeue', function() {
      it('should remove an item from the queue', function() {
        var element = {};

        queue.enqueue(element);


        expect(queue.dequeue()).to.equal(element);
      });

      it('should remove items in first-in, last out order', function() {
        var uniqueElements = [{}, [], new Date()];

        _.each(uniqueElements, function(element) {
          queue.enqueue(element);
        });

        _.each(uniqueElements, function(element, index) {
          expect(queue.dequeue()).to.equal(uniqueElements[index]);
        });
      });

      it('should not decrease the size of the queue when called on an empty queue', function() {
        queue.dequeue();

        expect(queue.size()).to.equal(0);
      });
    });

    describe('#enqueue', function() {
      it('should add a single item to the queue', function() {
        var element = {};

        queue.enqueue(element);

        expect(queue.contains(element)).to.be.true;
      });

      it('should add multiple items to the queue', function() {
        var uniqueElements = [{}, [], new Date()];

        _.each(uniqueElements, function(element) {
          queue.enqueue(element);
        });

        _.each(uniqueElements, function(element) {
          expect(queue.contains(element)).to.be.true;
        });
      });

      it('should not increase the size of the queue when no argument is passed', function() {
        var element = {};

        queue.enqueue();
        expect(queue.size()).to.equal(0);
        queue.enqueue(element);
        expect(queue.size()).to.equal(1);
        queue.enqueue();
        expect(queue.size()).to.equal(1);
      });
    });

    describe('#isEmpty', function() {
      it('should return true when the queue is empty', function() {
        expect(queue.size()).to.equal(0);
        expect(queue.isEmpty()).to.be.true;
      });

      it('should return false when the queue is not empty', function() {
        queue.enqueue({});
        expect(queue.isEmpty()).to.be.false;
      });
    });

    describe('#peek', function() {
      it('should return undefined when the queue is empty', function() {
        expect(queue.isEmpty()).to.be.true;
        expect(queue.peek()).to.be.undefined;
      });

      it('should return the oldest item in the queue item', function() {
        var elements = [{}, [], new Date()];

        _.each(elements, function(element) {
          queue.enqueue(element);
        });

        expect(queue.peek()).to.equal(_.first(elements));
      });

      it('should not be destructive', function() {
        var item = {};

        queue.enqueue(item);

        expect(queue.peek()).to.equal(item);
        expect(queue.dequeue()).to.equal(item);
      });
    });

    describe('#size', function() {
      it('should return the current size of the queue', function() {
        expect(queue.size()).to.be.a.number;
      });

      it('should report 0 when the queue is empty', function() {
        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.equal(0);
      });

      it('should increase as elements are enqueued', function() {
        var elements = ['one', 'two', 'three'];

        _.each(elements, function(element, index) {
          queue.enqueue(element);
          expect(queue.size()).to.equal(index + 1);
        });
      });

      it('should decrease as elements are removed from the queue', function() {
        var elements = ['one', 'two', 'three'];

        _.each(elements, function(element) {
          queue.enqueue(element);
        });

        _(3).times(function(iteration) {
          expect(queue.size()).to.equal(elements.length - iteration);
          queue.dequeue();
        });
      });
    });

    describe('#toArray', function() {
      it('should return an array version of the queue', function() {
        expect(queue.toArray()).to.be.an('array');
      });

      it('should be in newest-first-oldest-last order', function() {
        var elements = [1, 2, 3];

        _.each(elements, function(element) {
          queue.enqueue(element);
        });

        _.each(queue.toArray(), function(element, index) {
          // The return order should be the inverse of insertion order, so use
          // .reverse() to emulate that
          expect(element).to.equal(elements.reverse()[index]);
        });
      });

      it('should return the original, unmodified data', function() {
        var uniqueElements = [{}, [], new Date()];

        _.each(uniqueElements, function(element) {
          queue.enqueue(element);
        });

        _.each(queue.toArray(), function(element, index) {
          expect(element).to.equal(uniqueElements.reverse()[index]);
        });
      });

      it('should not modify the queue', function() {
        queue.enqueue(1);
        queue.toArray();
        expect(queue.peek()).to.equal(1);
      });
    });

    describe('#toString', function() {
      it('should act identically to an array\'s .toString method call', function() {
        var elements = [1, 2, 3, 4];

        _.each(elements, function(element) {
          queue.enqueue(element);
        });

        expect(Array.prototype.toString.call(elements.reverse())).to.equal(queue.toString());
      });
    });
  });
});
