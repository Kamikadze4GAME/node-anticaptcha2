'use strict';

const Task = require('./task');

class CustomCaptchaTask extends Task {
  constructor(opts = {/*url, assignment, forms*/}) {
    super('SquareNetTextTask', {
      url       : opts.url,
      assignment: opts.assignment,
      forms     : opts.forms
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
}

module.exports = CustomCaptchaTask;
