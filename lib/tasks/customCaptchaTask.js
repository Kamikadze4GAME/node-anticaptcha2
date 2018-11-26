'use strict';

const clone = require('clone');

const Task = require('./task');
const FormBuilder = require('../formBuilder');

class CustomCaptchaTask extends Task {
  constructor(opts = {/*url, assignment, forms*/}) {
    let forms = opts.forms;

    if(forms instanceof FormBuilder) {
      forms = forms.toJSON();
    }

    super('SquareNetTextTask', {
      url       : opts.url,
      assignment: opts.assignment,
      forms     : forms
    }, false, 5*1000);
  }

  toJSON() {
    let data = this.data;
    return super.toJSON({
      imageUrl  : opts.url,
      assignment: opts.assignment,
      forms     : opts.forms
    });
  }

  static parseResult(data = {}) {
    return {
      taskId    : data.taskId,
      imageUrl  : data.imageUrl,
      assignment: data.assignment,
      status    : data.status,
      answers   : clone(data.answers)
    };
  }
}

module.exports = CustomCaptchaTask;
