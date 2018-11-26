'use strict';

const Anticaptcha = require('./lib/anticaptcha');
const Proxy       = require('./lib/proxy');
const Tasks       = require('./lib/tasks');
const FormBuilder = require('./lib/formBuilder');
const Errors     = require('./lib/errors');

module.exports             = Anticaptcha;
module.exports.Anticaptcha = Anticaptcha;
module.exports.Proxy       = Proxy;
module.exports.Errors      = Errors;
module.exports.FormBuilder = FormBuilder;

Object.keys(Tasks).forEach(task => {
  module.exports[task] = Tasks[task];
});
