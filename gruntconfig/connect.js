'use strict';

const config = require('./config');

const connect = {
  dev: {
    options: {
      base: [
        config.htdocs,
        `${config.build}/${config.src}`,
      ],
      keepalive: false,
      port: 3000,
    }
  },
  dist: {
    options: {
      useAvailablePort: true,
      base: [
        config.htdocs,
        config.dist,
      ],
      keepalive: true,
      port: process.env.PORT,
    }
  }
};

module.exports = connect;
