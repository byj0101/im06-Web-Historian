var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var rp = require('request-promise');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, "utf-8", function(err, data){
    var arr = data.split('\n');
    if (callback) callback(arr);
  })
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(arr){
    callback(arr.includes(url))
  })
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, 'utf-8', function(err, data){
    if(!err) callback(data);
  })
};

exports.isUrlArchived = function(url, callback) {
  var urlPath = exports.paths.archivedSites+'/'+url;
  fs.exists(urlPath, function(exists) {
    callback(exists)
  })
};

exports.downloadUrls = function(urls) {
  rp('http://'+urls)
    .then( (htmlString) => {
      fs.writeFile(exports.paths.archivedSites + '/' + urls, htmlString, 'utf-8', (err) => {if (err) throw err} 
      )
    })
    .catch((err) => console.log(err))
      // Crawling failed...
  };
