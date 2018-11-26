'use strict';

const Task = require('./task');

class GeeTestTask extends Task {
  constructor(data = {/*url, gt, challenge*/}, proxy) {
    super(['GeeTestTaskProxyless', 'GeeTestTask'], {
      url      : data.url,
      gt       : data.gt,
      challenge: data.challenge
    }, proxy, 10*1000);
  }

  toJSON() {
    let data = this.data;
    return super.toJSON({
      websiteURL: data.url,
      gt        : data.gt,
      challenge : data.challenge
    });
  }

  static parseResult(data = {}) {
    return {
      challenge: data.challenge,
      validate: data.validate,
      seccode: data.seccode
    };
  }
}

module.exports = GeeTestTask;
