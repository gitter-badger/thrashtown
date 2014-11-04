'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 9000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  sendGridUsername: process.env.SENDGRID_USERNAME,
  sendGridPassword: process.env.SENDGRID_PASSWORD
};