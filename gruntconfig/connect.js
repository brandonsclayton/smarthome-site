'use strict';

const config = require('./config');

const connect = {
  server: {
    options: {
      base: [
        config.htdocs,
        `${config.build}/${config.src}`,
      ],
      keepalive: false,
      port: process.env.PORT || 3000,
    }
  }
};

module.exports = connect;
