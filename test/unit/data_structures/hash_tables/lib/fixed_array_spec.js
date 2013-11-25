'use strict';

var FixedArray = require(srcPath + '/data_structures/hash_tables/lib/fixed_array');

describe('FixedArray', function() {
  var fixedArray, uniqueObject1, uniqueObject2;
  var maxSize = 1000;

  beforeEach(function() {
    fixedArray = new FixedArray(maxSize);

    uniqueObject1 = chai.create('uniqueObject');
    uniqueObject2 = chai.create('uniqueObject');
  });

  describe('size#get', function() {
    it('should increase as the number of elements stored grows', function() {
      fixedArray.set(1, 1);
      fixedArray.set(2, 2);
      fixedArray.set(3, 3);
      fixedArray.set(4, 4);
      fixedArray.set(5, 5);

      expect(fixedArray.size).to.equal(5);
    });

    it('should decrease as the number of elements stored decreases', function() {
      fixedArray.set(1, 1);
      fixedArray.set(2, 2);
      fixedArray.set(3, 3);
      fixedArray.set(4, 4);
      fixedArray.set(5, 5);
      fixedArray.remove(1);
      fixedArray.remove(2);
      fixedArray.remove(3);
      fixedArray.remove(4);

      expect(fixedArray.size).to.equal(1);
    });

    it('should not dip below 0', function() {
      fixedArray.remove(0);
      fixedArray.remove(1);
      fixedArray.remove(2);

      expect(fixedArray.size).to.equal(0);
    });
  });

  describe('_storage#get', function() {
    it('should return a copy of the storage', function() {
      var storageCopy;
      var storedValues = [0, 1, 2];

      fixedArray.set(storedValues[0], 0);
      fixedArray.set(storedValues[1], 1);
      fixedArray.set(storedValues[2], 2);

      storageCopy = fixedArray._storage;

      expect(storageCopy).to.eql(storedValues);

      storageCopy.push(1);

      expect(storageCopy).to.not.eql(storedValues);
    });
  });

  describe('#forEach', function() {
    it('should iterate over every item in the array', function() {
      var result = [];

      fixedArray.set(0, 0);
      fixedArray.set(1, 1);
      fixedArray.set(30, 'fdsa');
      fixedArray.set(80, false);

      fixedArray.forEach(function(item) {
        result.push(item);
      });

      expect(result).to.eql([0, 1, 'fdsa', false]);
    });

    it('should skip `undefined` items', function() {
      var count = 0;

      fixedArray.set(0, 0);
      fixedArray.set(1, 0);
      fixedArray.set(30, 0);
      fixedArray.set(31, undefined);
      fixedArray.set(80, 0);

      fixedArray.forEach(function() {
        count += 1;
      });

      expect(count).to.equal(4);
    });
  });

  describe('#set', function() {
    it('should return the set value', function() {
      expect(fixedArray.set(0, uniqueObject1)).to.equal(uniqueObject1);
    });

    it('should insert a key-value pair into storage', function() {
      fixedArray.set(0, uniqueObject1);

      expect(fixedArray.get(0)).to.equal(uniqueObject1);
    });

    it('should overwrite the value contained at an already-existent index', function() {
      fixedArray.set(0, uniqueObject1);

      expect(fixedArray.get(0)).to.equal(uniqueObject1);

      fixedArray.set(0, uniqueObject2);

      expect(fixedArray.get(0)).to.equal(uniqueObject2);
    });

    it('should accept only integers as an index', function() {
      expect(function() { fixedArray.set('bad_index'); }).to.throw(TypeError);
    });

    it('should throw an error when trying to set a value on an out-of-bounds index', function() {
      expect(function() { fixedArray.set(maxSize + 1); }).to.throw(Error);
    });
  });

  describe('#get', function() {
    it('should return undefined when retrieving a value at an empty index', function() {
      expect(fixedArray.get(0)).to.be.undefined;
    });

    it('should return the value stored at a given index', function() {
      fixedArray.set(10, uniqueObject1);

      expect(fixedArray.get(10)).to.equal(uniqueObject1);
    });

    it('should return the value stored at a given index multiple times', function() {
      fixedArray.set(10, uniqueObject1);

      expect(fixedArray.get(10)).to.equal(uniqueObject1);
      expect(fixedArray.get(10)).to.equal(uniqueObject1);
    });

    it('should accept only integers as an index', function() {
      expect(function() { fixedArray.get('bad_index'); }).to.throw(TypeError);
    });

    it('should throw an error when trying to set a value on an out-of-bounds index', function() {
      expect(function() { fixedArray.get(maxSize + 1); }).to.throw(Error);
    });
  });

  describe('#remove', function() {
    it('should return false if there is no stored value at the given index', function() {
      expect(fixedArray.remove(0)).to.be.false;
    });

    it('should return true when deleting the value stored at a given index', function() {
      fixedArray.set(0, uniqueObject1);

      expect(fixedArray.remove(0)).to.be.true;
    });

    it('should remove the value at the given index', function() {
      fixedArray.set(11, uniqueObject1);

      fixedArray.remove(11);

      expect(fixedArray.get(11)).to.be.undefined;
    });

    it('should accept only integers as an index', function() {
      expect(function() { fixedArray.remove('bad_index'); }).to.throw(TypeError);
    });

    it('should throw an error when trying to set a value on an out-of-bounds index', function() {
      expect(function() { fixedArray.remove(maxSize + 1); }).to.throw(Error);
    });
  });
});
