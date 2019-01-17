'use strict';

const config = require('./config');

const clean = {
  build: [ config.build ],
  dist: [ config.dist ]
};

module.exports = clean;
