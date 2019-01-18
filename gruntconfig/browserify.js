'use strict';

const config = require('./config');

const EXPORTS = [
  'lib/Devices',
  'lib/Footer',
  'lib/Header',
  'lib/Tools',
  'lib/Spinner'
].map((path) => `./${config.htdocs}/js/${path}:${path}`).concat([
  'd3',
  'bootstrap',
  'jquery',
  'axios'
]);


const browserify = {
  options: {
    browserifyOptions: {
      paths: [
        `./${config.htdocs}`, 
      ]
    }
  },
  source: {
    src: [  ],
    dest: `${config.build}/${config.src}/${config.mainJS}`,
    options: {
      alias: EXPORTS
    }
  }
};

module.exports = browserify;
