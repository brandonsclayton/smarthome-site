'use strict';

const config = require('./config');

const browserify = {
  options: {
    browserifyOptions: {
      paths: [
        config.htdocs, 
      ]
    }
  },
  source: {
    src: [
      `${config.src}/**/*.js`,
    ],
    dest: `${config.build}/${config.src}/${config.mainJS}`,
  }
};

module.exports = browserify;
