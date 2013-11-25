'use strict';

var HashTable = require(srcPath + '/data_structures/hash_tables/hash_table');

describe('HashTable', function() {
  var hashTable, uniqueObject1, uniqueObject2, uniqueObject3, uniqueObject4;

  beforeEach(function() {
    hashTable = new HashTable();

    uniqueObject1 = chai.create('uniqueObject');
    uniqueObject2 = chai.create('uniqueObject');
    uniqueObject3 = chai.create('uniqueObject');
    uniqueObject4 = chai.create('uniqueObject');
  });

  describe('#set', function() {
    it('should return the set value', function() {
      expect(hashTable.set('key1', uniqueObject1)).to.equal(uniqueObject1);
    });

    it('should insert a key-value pair into the hash table\'s storage', function() {
      hashTable.set('key1', uniqueObject1);

      expect(hashTable.get('key1')).to.equal(uniqueObject1);
    });

    it('should overwrite the value contained at an already-existent key', function() {
      hashTable.set('key1', uniqueObject1);

      expect(hashTable.get('key1')).to.equal(uniqueObject1);

      hashTable.set('key1', uniqueObject2);

      expect(hashTable.get('key1')).to.equal(uniqueObject2);
    });

    it('should convert a non-string key to a string', function() {
      var key1 = { dat: 'object' };
      var key2 = { another: 'object' };
      var key3 = 3;

      hashTable.set(key1, uniqueObject2);
      hashTable.set(key2, uniqueObject4);
      hashTable.set(key3, uniqueObject4);

      expect(hashTable.get(key1)).to.equal(uniqueObject2);
      expect(hashTable.get(key2)).to.equal(uniqueObject4);
      expect(hashTable.get(key3)).to.equal(uniqueObject4);
    });
  });

  describe('#get', function() {
    it('should return undefined when retrieving a value at a nonexistent key', function() {
      expect(hashTable.get('key1')).to.be.undefined;
    });

    it('should return the value stored at a given key', function() {
      hashTable.set('key1', uniqueObject1);

      expect(hashTable.get('key1')).to.equal(uniqueObject1);
    });

    it('should return the value stored at a given key multiple times', function() {
      hashTable.set('key1', uniqueObject1);

      expect(hashTable.get('key1')).to.equal(uniqueObject1);
      expect(hashTable.get('key1')).to.equal(uniqueObject1);
    });

    it('should retrieve values stored using a non-string key', function() {
      var key1 = { dat: 'object' };
      var key2 = { another: 'object' };
      var key3 = 3;

      hashTable.set(key1, uniqueObject2);
      hashTable.set(key2, uniqueObject4);
      hashTable.set(key3, uniqueObject4);

      expect(hashTable.get(key1)).to.equal(uniqueObject2);
      expect(hashTable.get(key2)).to.equal(uniqueObject4);
      expect(hashTable.get(key3)).to.equal(uniqueObject4);
    });
  });

  describe('#remove', function() {
    it('should return false if there is no stored value at the given key', function() {
      expect(hashTable.remove('key2')).to.be.false;
    });

    it('should return true when deleting the value stored at a given key', function() {
      hashTable.set('key1', uniqueObject1);

      expect(hashTable.remove('key1')).to.be.true;
    });

    it('should remove the value at the given key', function() {
      hashTable.set('key1', uniqueObject1);

      hashTable.remove('key1');

      expect(hashTable.get('key1')).to.be.undefined;
    });

    it('should retrieve values stored using a non-string key', function() {
      var key1 = { dat: 'object' };
      var key2 = { another: 'object' };
      var key3 = 3;

      hashTable.set(key1, uniqueObject2);
      hashTable.set(key2, uniqueObject4);
      hashTable.set(key3, uniqueObject4);

      hashTable.remove(key1);
      hashTable.remove(key2);
      hashTable.remove(key3);

      expect(hashTable.get(key1)).to.be.undefined;
      expect(hashTable.get(key2)).to.be.undefined;
      expect(hashTable.get(key3)).to.be.undefined;
    });
  });
});
