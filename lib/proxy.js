'use strict';

const VALID_PROXY_TYPES = ['http', 'socks4', 'socks5'];

class Proxy {
  constructor(data = {}) {
    if(data instanceof Proxy) {
      data = data.get();
    }
    this.set(data, true);
  }

  set(data, reset = false) {
    if(reset) {
      this._data = {}
    }

    if(typeof data !== 'undefined') {
      this._data.type     = data.type     || VALID_PROXY_TYPES[0];
      this._data.address  = data.address  || null;
      this._data.port     = data.port     || null;
      this._data.login    = data.login    || null;
      this._data.password = data.password || null;
      this._data.agent    = data.agent    || null;
      this._data.cookies  = data.cookies  || null;
    }
    else {
      // TODO: what to do?
    }
  }

  // TODO: shoud clone object?
  get() {
    return this._data;
  }

  toJSON(check = false) {
    let res = {};
    let data = this._data;

    if(check) {
      Proxy.checkProxy(data);
    }

    res.proxyType    = data.type;
    res.proxyAddress = data.address;
    res.proxyPort    = data.port;
    res.userAgent   = data.agent;

    if(typeof this._login !== 'undefined') {
      res.proxyLogin = data.login;
    }

    if(typeof this._password !== 'undefined') {
      res.proxyPassword = data.password;
    }

    if(typeof this._cookies !== 'undefined') {
      res.cookies = data.cookies;
    }

    return res;
  }

  static checkProxy(proxyData = {}) {
    if(VALID_PROXY_TYPES.indexOf(proxyData.type) === -1) {
      throw new Error(`Invalid proxy type '${res.type}'. Valid: ${VALID_PROXY_TYPES.join(', ')}. `);
    }

    if(typeof proxyData.address === 'undefined') {
      throw new Error('No proxy address');
    }

    if(typeof proxyData.port === 'undefined') {
      throw new Error('No proxy port');
    }

    return true;
  }

}

module.exports = Proxy;
