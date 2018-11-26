'use strict';

const Task = require('./task');

class FunCaptchaTask extends Task {
  constructor(data = {/*url, publickey*/}, proxy) {
    super(['FunCaptchaTaskProxyless', 'FunCaptchaTask'], {
      url      : data.url,
      publickey: data.publickey
    }, proxy, 10*1000);
  }

  toJSON() {
    let data = this.data;
    return super.toJSON({
      websiteURL      : data.url,
      websitePublicKey: data.publickey
    });
  }

  static parseResult(data = {}) {
    return data.token;
  }
}

module.exports = FunCaptchaTask;
