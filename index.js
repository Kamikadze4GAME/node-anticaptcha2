'use strict';

const Tasks = require('./lib/tasks');

module.exports = require('./lib/anticaptcha');

module.exports.Proxy = require('./lib/proxy');

Object.keys(Tasks).forEach(task => {
  module.exports[task] = Tasks[task];
});
