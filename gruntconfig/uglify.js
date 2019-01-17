'use strict';

const config = require('./config');

const uglify = {
  dist: {
    src: `${config.build}/${config.src}/${config.mainJS}`,
    dest: `${config.dist}/${config.mainJS}`,
  }
};

module.exports = uglify;
