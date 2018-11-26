'use strict';

const Task = require('./task');

class NoCaptchaTask extends Task {
  constructor(data = {/*url, sitekey, ?stoken, ?isVisible*/}, proxy) {
    super(['NoCaptchaTaskProxyless', 'NoCaptchaTask'], {
      url      : data.url,
      sitekey  : data.sitekey,
      stoken   : data.stoken,
      isVisible: data.isVisible
    }, proxy, 10*1000);
  }

  toJSON() {
    let data = this.data;
    return super.toJSON({
      websiteURL   : data.url,
      websiteKey   : data.sitekey,
      websiteSToken: data.stoken,
      isInvisible  : data.isVisible
    });
  }

  static parseResult(data = {}) {
    return data.gRecaptchaResponse;
  }

}

module.exports = NoCaptchaTask;
