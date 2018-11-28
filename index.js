'use strict';

const Anticaptcha = require('./lib/anticaptcha');
const Proxy       = require('./lib/proxy');
const Tasks       = require('./lib/tasks');
const Form        = require('./lib/form');
const Errors      = require('./lib/errors');

module.exports             = Anticaptcha;
module.exports.Anticaptcha = Anticaptcha;
module.exports.Proxy       = Proxy;
module.exports.Form        = Form;
module.exports.Errors      = Errors;
module.exports.ApiError    = Errors.ApiError;

Object.keys(Tasks).forEach(task => {
  module.exports[task] = Tasks[task];
});
