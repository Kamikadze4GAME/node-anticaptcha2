'use strict';

const Proxy = require('../proxy');
const clone = require('clone');

class Task {
  constructor(types /*=[typeProxyLess, typeProxy]*/, data, proxy, waitTime) {
    this._types   = Array.isArray(types) ? types.slice() : [types];
    this._type    = this._types[0];
    this.data     = data  || null;
    this.proxy    = proxy;
    this.waitTime = waitTime;
  }

  get type() {
    return this._type;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = clone(data);
  }

  get proxy() {
    return this._proxy;
  }

  set proxy(proxy) {
    if (proxy) {
      if(proxy === true) {
        this._proxy = true;
      }
      // Object or Proxy instance
      else {
        this._proxy = new Proxy(proxy);
      }

      // If we have typeProxy
      if(typeof this._types[1] !== 'undefined') {
        this._type = this._types[1];
      }
    }
    else {
      this._proxy = false;

      // Set typeProxyLess
      this._type = this._types[0];
    }
  }

  toJSON(data) {
    let res = {
      type: this.type
    };

    if(typeof data === 'undefined') {
      data = this.data || {};
    }

    Object.keys(data).forEach(key => {
      if(typeof data[key] !== 'undefined') {
        res[key] = data[key];
      }
    });

    if(this.proxy) {
      if(this.proxy === true) {
        res.proxy = true;
      }
      else {
        Object.assign(res, this.proxy.toJSON(true));
      }
    }

    return res;
  }
}

module.exports = Task;
