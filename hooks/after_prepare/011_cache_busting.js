#!/usr/bin/env node

// Add Platform Class
// v1.0
// Automatically adds the platform class to the body tag
// after the `prepare` command. By placing the platform CSS classes
// directly in the HTML built for the platform, it speeds up
// rendering the correct layout/style for the specific platform
// instead of waiting for the JS to figure out the correct classes.

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];
var config = require("../cache-busting-conf.json");

function applyCacheBustingVersion(path) {
  // add the platform class to the body tag
  try {
    var fileContent = fs.readFileSync(path, 'utf8');

    fileContent = fileContent.replace(/%CACHE_BUSTING_VERSION%/g, config.version);

    fs.writeFileSync(path, fileContent, 'utf8');

    process.stdout.write('cache busting applied to file ' + path);
  } catch(e) {
    process.stdout.write(e);
  }
}

function processFiles(dir) {
  fs.readdir(dir, function (error, list) {
    if (error) {
      console.log("An error ocurred while reading directories: \n " + error);
      return;
    }
    else {
      list.forEach(function (file) {
        file = path.join(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat.isDirectory()) {
            processFiles(file);
          }
          else {
            applyCacheBustingVersion(file);
          }
        });
      });
    }
  });
}

if (rootdir) {

  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for(var x=0; x<platforms.length; x++) {
    // open up the index.html file at the www root
    try {
      var platform = platforms[x].trim().toLowerCase();
      var indexPath;

      if(platform == 'android') {
        indexPath = path.join('platforms', platform, 'assets', 'www');
      } else {
        indexPath = path.join('platforms', platform, 'www');
      }

      if(fs.existsSync(indexPath)) {

        applyCacheBustingVersion(indexPath + '/index.html');
        processFiles(indexPath + '/js');

      }

    } catch(e) {
      process.stdout.write(e);
    }
  }

}
