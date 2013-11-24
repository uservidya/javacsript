'use strict';

var bfTree, dfTree;
var Tree = require(srcPath + '/data_structures/trees/tree');

bfTree = new Tree(0);
bfTree.addChild(1);
bfTree.addChild(2);
bfTree.children[0].addChild(3);
bfTree.children[0].addChild(4);
bfTree.children[1].addChild(5);
bfTree.children[1].addChild(6);
bfTree.children[0].children[0].addChild(7);
bfTree.children[0].children[0].addChild(8);
bfTree.children[0].children[1].addChild(9);
bfTree.children[1].children[0].addChild(10);
bfTree.children[1].children[1].addChild(11);
bfTree.children[1].children[1].addChild(12);
bfTree.children[0].children[1].children[0].addChild(13);
bfTree.children[0].children[1].children[0].addChild(14);
bfTree.children[0].children[1].children[0].addChild(15);
bfTree.children[1].children[1].children[0].addChild(16);

dfTree = new Tree(0);
dfTree.addChild(1);
dfTree.children[0].addChild(2);
dfTree.children[0].children[0].addChild(3);
dfTree.children[0].children[0].addChild(4);
dfTree.children[0].addChild(5);
dfTree.children[0].children[1].addChild(6);
dfTree.children[0].children[1].children[0].addChild(7);
dfTree.children[0].children[1].children[0].addChild(8);
dfTree.children[0].children[1].children[0].addChild(9);
dfTree.addChild(10);
dfTree.children[1].addChild(11);
dfTree.children[1].children[0].addChild(12);
dfTree.children[1].addChild(13);
dfTree.children[1].children[1].addChild(14);
dfTree.children[1].children[1].children[0].addChild(15);
dfTree.children[1].children[1].addChild(16);

chai.factory('trees', {
  breadth: bfTree,
  depth: dfTree
});
