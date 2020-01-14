'use strict';

const _ = require('lodash');

const env = {
  dev: 'development',
  test: 'testing',
  prod: 'production'
}

const defaultPort = 3000;

let config = {
  env: process.env.NODE_ENV || env.dev,
  port: process.env.PORT || defaultPort
};

let envConfig;

try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}
module.exports = _.merge(config, envConfig);