'use strict';

const config = {
  browserify: require('./browserify'),
  clean: require('./clean'),
  connect: require('./connect'),
  watch: require('./watch'),

  tasks: [
    'grunt-browserify',
    'grunt-contrib-clean',
    'grunt-contrib-connect',
    'grunt-contrib-watch',
  ]
};

module.exports = config;