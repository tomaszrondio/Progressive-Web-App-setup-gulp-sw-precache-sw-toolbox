'use strict';

var gulp = require('gulp')
var swPrecache = require('sw-precache')
// notice that sw-toolbox has to be installed via npm for runtimeCaching

gulp.task('sw', function(callback) {
  var packageJson = require('./package.json');

  swPrecache.write(
    'PATH_TO_ROOT/sw.js',
    {
      cacheId: packageJson.name,
      // content cache
      runtimeCaching: [{
        urlPattern: /\/content\/articles\//,
        handler: 'fastest',
        options: {
          cache: {
            maxEntries: 100,
            name: 'articles-cache'
          }
        }
      },
      {
        urlPattern: /\/media\//,
        handler: 'cacheFirst',
        options: {
          cache: {
            maxEntries: 50,
            name: 'media-cache'
          }
        }
      }
      ],

      // "/" is app shell, rest is assets precache
      dynamicUrlToDependencies: {
            '/': [
              'PATH_TO_FILE_THAT_GENERATES_CONTENT_ON_ROOT'
            ]
          },
      staticFileGlobs: ['/','dev/something/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
     // replace path from dev/something/ to any production path. Delete if path is the same
      stripPrefixMulti: {
        'dev/something/': 'production/something/'
      }
    },
    callback

    );
});
