/*globals _: true, chai: true, expect: true, sinon: true, rootPath: true, srcPath: true*/

'use strict';

var path = require('path');

global._ = require('lodash');
global.chai = require('chai');
global.expect = global.chai.expect;
global.sinon = require('sinon');

// Chai plugins
global.chai.use(require('sinon-chai'));
global.chai.use(require('chai-factories'));

// Fixtures and factories
require('./factories');

// Helpers for easier loading
global.rootPath = function() {
  var args = _.toArray(arguments);
  return path.join.apply(null, [__dirname, '..'].concat(args));
};

global.srcPath = function() {
  var args = _.toArray(arguments);
  return global.rootPath.apply(null, ['src'].concat(args));
};
