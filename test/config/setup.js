/*jshint unused:false*/
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
global.chai.use(require('chai-interface'));

// Helper variables for locating files
global.rootPath = path.join(__dirname, '..', '..');
global.srcPath = path.join(rootPath, 'src');

// Factories
var factoriesPath = path.join(__dirname, '..', 'factories');

_.each(require('fs').readdirSync(factoriesPath), function(file) {
  require(path.join(factoriesPath, file));
});
