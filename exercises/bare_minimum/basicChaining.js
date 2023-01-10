/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = require('fs');
var gitHub = require('./promisification');
var file = require('./promiseConstructor');

var writeFile = Promise.promisify(fs.writeFile);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return file.pluckFirstLineFromFileAsync(readFilePath)
    .then(username => gitHub.getGitHubProfileAsync(username.toString()))
    .then(data => writeFile(writeFilePath, JSON.stringify(data)))
    .catch(err => console.log('Oops, error:', err.message));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
