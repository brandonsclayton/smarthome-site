'use strict';

const config = require('./config');

const watch = {
  scripts: {
    files: [
      `${config.src}/**/*.js`
    ],
    tasks: ['browserify']
  },
  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntconfig/**/*.js',
    ]
  }
};

module.exports = watch;
