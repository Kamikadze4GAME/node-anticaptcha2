'use strict';

const VALID_PROXY_TYPES = ['http', 'socks4', 'socks5'];

class Proxy {
  constructor(data = {/* type, address, port, ?login, ?password, agent, ?cookies */}) {
    this._data = {};
    
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
      ['type', 'address', 'port', 'login', 'password', 'agent', 'cookies'].forEach(key => {
        this._data[key] = typeof data[key] !== 'undefined' ? data[key] : this._data[key];
      });
    }
    else {
      // Nothing...
    }
  }

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

    if(typeof data.login !== 'undefined') {
      res.proxyLogin = data.login;
    }

    if(typeof data.password!== 'undefined') {
      res.proxyPassword = data.password;
    }

    res.userAgent = data.agent;

    if(typeof data.cookies !== 'undefined') {
      res.cookies = data.cookies;
    }

    return res;
  }

  static checkProxy(proxyData = {}) {
    if(proxyData instanceof Proxy) {
      proxyData = proxyData.get();
    }

    if(VALID_PROXY_TYPES.indexOf(proxyData.type) === -1) {
      throw new Error(`Invalid proxy type '${res.type}'. Valid: ${VALID_PROXY_TYPES.join(', ')}. `);
    }

    if(typeof proxyData.address === 'undefined') {
      throw new Error('No proxy address');
    }

    if(typeof proxyData.port === 'undefined') {
      throw new Error('No proxy port');
    }

    if(typeof proxyData.agent === 'undefined') {
      throw new Error('No agent');
    }

    return true;
  }

}

module.exports = Proxy;
