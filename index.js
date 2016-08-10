import Promise from 'bluebird';
import _ from 'lodash';
import fs from 'fs';

let txtList = './list.txt';

// Get the whole list of real city names
function getOriginalList() {
  return Promise.promisify(fs.readFile)(txtList, 'utf-8').then((data) => {
    return _.compact(data.split('\n'));
  });
}

// Add one word to an existing tree
function addWordToTree(word, tree) {
  // If no word, nothing to do
  if (!word) {
    return;
  }

  let firstLetter = word.charAt(0).toLowerCase();
  let partialWord = word.substring(1);

  // Add a new branch if not already here
  if (!_.has(tree, firstLetter)) {
    tree[firstLetter] = {
      count: 0,
      branches: {}
    };
  }

  // Update branch
  let branch = tree[firstLetter];
  branch.count++;
  addWordToTree(partialWord, branch.branches);
}

// Given a list of words, will create a deep tree representing the sequence of
// characters. Each branch will contain the list of possible following letters,
// with they count
function getDeepTree(list) {
  let tree = {};

  _.each(list, (word) => {
    addWordToTree(word, tree);
  });

  return tree;
}

// Will flatten a deep tree into one only containing the whole list of possible
// letters, and the probability of each next char for any given char
function flattenTree(tree) {
  let flatTree = {};

  addCounts('START', tree);

  function addCounts(parentLetter, subTree) {
    // Add the entry at the root level if we never saw that letter before
    if (!_.has(flatTree, parentLetter)) {
      flatTree[parentLetter] = {};
    }
    let parentTree = flatTree[parentLetter];

    // Add counts of each deep branch to the root level
    _.each(subTree, (data, letter) => {
      if (!_.has(parentTree, letter)) {
        parentTree[letter] = 0;
      }

      // Increase the count
      parentTree[letter] += data.count;

      // Go recursively in sub branches
      if (!_.isEmpty(data.branches)) {
        addCounts(letter, data.branches);
        return;
      }

      // If last branch, mark it as a leaf
      if (!_.has(parentTree, 'END')) {
        parentTree.END = 0;
      }
      parentTree.END++;
    });
  }

  return flatTree;
}


getOriginalList().then((list) => {
  // Get the full tree of all possible named
  let tree = getDeepTree(list);
  // Count for each letter the number of occurence of each next letter
  let flattenedTree = flattenTree(tree);
  // Convert that into percentages
  
  // Generate a random word

  console.info(JSON.stringify(flattenedTree, null, 2));

});



function debugTree(tree, depth = 0) {
  _.each(tree, (data, letter) => {
    let indent = _.times(depth, () => {
      return ' '
    }).join('');
    console.info(`${indent}${letter}[${data.count}]`);
    debugTree(data.branches, ++depth);
  });
}

