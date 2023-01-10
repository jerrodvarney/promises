/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {

  const filePromise = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  return filePromise()
    .then(data => {
      // console.log('data: ', data.toString().split(/\n/)[0]);

      return data.toString().split(/\n/)[0];
    })
    .catch(err => { throw (err); });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {

  const requestPromise = () => {
    return new Promise ((resolve, reject) => {
      request.get(url, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  return requestPromise()
    .then(data => data.statusCode)
    .catch(err => { throw (err); });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
