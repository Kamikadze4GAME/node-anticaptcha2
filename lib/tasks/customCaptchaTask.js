'use strict';

const clone = require('clone');

const Task = require('./task');
const Form = require('../form');

class CustomCaptchaTask extends Task {
  constructor(opts = {/*url, assignment, form*/}) {
    let form = opts.forms;

    if(form instanceof Form) {
      form = form.toJSON();
    }

    super('CustomCaptchaTask', {
      url       : opts.url,
      assignment: opts.assignment,
      form      : form
    }, false, 5*1000);
  }

  toJSON() {
    let data = this.data;
    return super.toJSON({
      imageUrl  : data.url,
      assignment: data.assignment,
      forms     : data.form
    });
  }

  static parseResult(data = {}) {
    return clone(data.answers);
    // return {
    //   taskId    : data.taskId,
    //   imageUrl  : data.imageUrl,
    //   assignment: data.assignment,
    //   status    : data.status,
    //   answers   : clone(data.answers)
    // };
  }
}

module.exports = CustomCaptchaTask;
